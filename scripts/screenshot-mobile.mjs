#!/usr/bin/env node
/**
 * Batch screenshot every mobile screen from the live preview.
 *
 * Prereqs: dev server running (default http://localhost:5174).
 *   pnpm install
 *   ./node_modules/.bin/vite
 *
 * Usage:
 *   node scripts/screenshot-mobile.mjs
 *   node scripts/screenshot-mobile.mjs --url http://localhost:5174 --variants en-light,en-dark,ar-light,ar-dark
 *   node scripts/screenshot-mobile.mjs --variants ar-light --only feeds,profile,settings
 *
 * Output:
 *   screenshots/<variant>/<group>/<id>.png
 *   screenshots/index.html  (gallery overview)
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..');

// ─── args ────────────────────────────────────────────────────────────────
const args = parseArgs(process.argv.slice(2));
const URL = args.url ?? 'http://localhost:5174';
const VARIANTS = (args.variants ?? 'en-light').split(',').map((s) => s.trim()).filter(Boolean);
const ONLY = args.only ? args.only.split(',').map((s) => s.trim()) : null;
const SCREEN_SETTLE_MS = Number(args.delay ?? 2200); // wait for setTimeout-based mock data
const OUT_DIR = join(repoRoot, args.outDir ?? 'screenshots');

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        out[key] = next;
        i++;
      } else {
        out[key] = true;
      }
    }
  }
  return out;
}

// ─── main ────────────────────────────────────────────────────────────────
async function main() {
  console.log(`📸 Mobile screenshot batch`);
  console.log(`   URL:      ${URL}`);
  console.log(`   variants: ${VARIANTS.join(', ')}`);
  console.log(`   output:   ${OUT_DIR}`);
  if (ONLY) console.log(`   only:     ${ONLY.join(', ')}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    deviceScaleFactor: 2, // retina-ish
    viewport: { width: 1280, height: 1000 },
  });
  const page = await context.newPage();
  page.on('pageerror', (err) => console.error('  ❌ page error:', err.message));

  await page.goto(URL, { waitUntil: 'networkidle' });

  // wait for sidebar to render
  await page.waitForSelector('[data-screen-id]', { timeout: 15000 });

  // Read all screens from the DOM (more reliable than hardcoding)
  const screens = await page.$$eval('[data-screen-id]', (els) =>
    els.map((el) => ({
      id: el.getAttribute('data-screen-id'),
      group: el.getAttribute('data-screen-group'),
      label: el.getAttribute('data-screen-label'),
    }))
  );
  console.log(`\nFound ${screens.length} screens.\n`);

  const filtered = ONLY ? screens.filter((s) => ONLY.includes(s.id)) : screens;

  // Manifest for the gallery
  const manifest = [];

  for (const variant of VARIANTS) {
    const [locale, theme] = variant.split('-'); // "en-light" → ["en", "light"]
    if (!['en', 'ar'].includes(locale) || !['light', 'dark'].includes(theme)) {
      console.error(`⚠ Skipping invalid variant: ${variant} (use en-light | en-dark | ar-light | ar-dark)`);
      continue;
    }

    console.log(`\n══════ Variant: ${variant} ══════`);

    // set locale
    await page.evaluate((loc) => (window).__setAppLocale?.(loc), locale);
    // set theme
    await page.evaluate((t) => {
      if (t === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    }, theme);
    await page.waitForTimeout(300);

    for (const s of filtered) {
      const slug = `${s.group}/${s.id}`.toLowerCase().replace(/[^a-z0-9/_-]+/g, '-');
      const outFile = join(OUT_DIR, variant, `${slug}.png`);
      await mkdir(dirname(outFile), { recursive: true });

      // Some auto-opened sheets (Agreement, BirthdayPicker, CreatePost…)
      // leave Vaul's body lock / overlay around. Unlock scroll/pointer-events.
      // Do NOT call .remove() on Vaul nodes — that breaks React reconciliation (removeChild errors).
      await page.evaluate(() => {
        document.querySelectorAll('[data-vaul-overlay]').forEach((el) => {
          el.style.setProperty('display', 'none', 'important');
          el.style.setProperty('pointer-events', 'none', 'important');
        });
        document.body.removeAttribute('data-scroll-locked');
        document.body.style.removeProperty('pointer-events');
        document.documentElement.style.removeProperty('pointer-events');
      });
      for (let i = 0; i < 3; i++) {
        await page.keyboard.press('Escape').catch(() => {});
        await page.waitForTimeout(80);
      }

      // Click the sidebar button (force=true bypasses any leftover overlay)
      await page.click(`[data-screen-id="${s.id}"]`, { force: true, timeout: 10000 });
      // Let mock data settle (most pages have ~1500ms setTimeout)
      await page.waitForTimeout(SCREEN_SETTLE_MS);

      const phone = await page.$('[data-testid="phone-frame"]');
      if (!phone) {
        console.error(`  ❌ phone frame not found for ${s.id}`);
        continue;
      }
      await phone.screenshot({ path: outFile });

      const sizeKB = (await stat(outFile)).size / 1024;
      console.log(`  ✓ ${variant.padEnd(10)} ${s.group.padEnd(14)} ${s.id.padEnd(20)} ${sizeKB.toFixed(0)} KB`);

      manifest.push({
        variant,
        locale,
        theme,
        group: s.group,
        id: s.id,
        label: s.label,
        path: `${variant}/${slug}.png`,
      });
    }
  }

  await browser.close();

  // Write a simple gallery HTML
  await writeGallery(OUT_DIR, manifest);

  console.log(`\n✅ Done. Screenshots in: ${OUT_DIR}`);
  console.log(`   Open ${join(OUT_DIR, 'index.html')} in your browser to browse.`);
}

async function stat(path) {
  const { stat } = await import('node:fs/promises');
  return stat(path);
}

async function writeGallery(outDir, manifest) {
  // Group manifest by variant > group
  const byVariant = new Map();
  for (const m of manifest) {
    if (!byVariant.has(m.variant)) byVariant.set(m.variant, new Map());
    const groups = byVariant.get(m.variant);
    if (!groups.has(m.group)) groups.set(m.group, []);
    groups.get(m.group).push(m);
  }

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>ZokaiHub Mobile · Screenshots</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  :root { color-scheme: light dark; }
  * { box-sizing: border-box; }
  body { margin: 0; font: 14px/1.4 -apple-system, system-ui, sans-serif; background: #f5f5f7; color: #111; }
  @media (prefers-color-scheme: dark) { body { background: #1c1c1e; color: #f5f5f7; } }
  header { padding: 24px 32px; border-bottom: 1px solid rgba(127,127,127,.2); }
  h1 { margin: 0 0 4px; font-size: 20px; }
  .meta { opacity: .6; font-size: 13px; }
  nav { display: flex; gap: 8px; padding: 16px 32px; border-bottom: 1px solid rgba(127,127,127,.2); flex-wrap: wrap; }
  nav button { padding: 6px 14px; border-radius: 999px; border: 1px solid rgba(127,127,127,.3); background: transparent; color: inherit; cursor: pointer; font: inherit; }
  nav button.active { background: #0070f3; color: white; border-color: #0070f3; }
  main { padding: 32px; }
  h2 { margin: 24px 0 12px; font-size: 16px; opacity: .7; text-transform: uppercase; letter-spacing: .08em; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 24px; }
  .card { background: white; border-radius: 16px; padding: 8px; box-shadow: 0 4px 12px rgba(0,0,0,.06); }
  @media (prefers-color-scheme: dark) { .card { background: #2c2c2e; box-shadow: 0 4px 12px rgba(0,0,0,.3); } }
  .card img { width: 100%; height: auto; display: block; border-radius: 12px; }
  .card .label { padding: 8px 4px 4px; font-weight: 600; font-size: 13px; }
  .variant { display: none; }
  .variant.active { display: block; }
</style>
</head>
<body>
<header>
  <h1>ZokaiHub · Mobile Screenshots</h1>
  <div class="meta">${manifest.length} images · generated ${new Date().toISOString()}</div>
</header>
<nav id="nav"></nav>
<main id="main"></main>
<script>
  const data = ${JSON.stringify(Object.fromEntries(
    Array.from(byVariant, ([variant, groups]) => [
      variant,
      Object.fromEntries(Array.from(groups, ([g, items]) => [g, items])),
    ])
  ))};
  const variants = Object.keys(data);
  const nav = document.getElementById('nav');
  const main = document.getElementById('main');
  variants.forEach((v, i) => {
    const btn = document.createElement('button');
    btn.textContent = v;
    btn.className = i === 0 ? 'active' : '';
    btn.onclick = () => show(v);
    nav.appendChild(btn);
  });
  function show(v) {
    nav.querySelectorAll('button').forEach((b) => b.classList.toggle('active', b.textContent === v));
    main.innerHTML = '';
    for (const [group, items] of Object.entries(data[v])) {
      const h = document.createElement('h2');
      h.textContent = group;
      main.appendChild(h);
      const grid = document.createElement('div');
      grid.className = 'grid';
      for (const item of items) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = '<img src="' + item.path + '" alt="' + item.label + '" loading="lazy">' +
                         '<div class="label">' + item.label + '</div>';
        grid.appendChild(card);
      }
      main.appendChild(grid);
    }
  }
  show(variants[0]);
</script>
</body>
</html>`;
  await writeFile(join(outDir, 'index.html'), html, 'utf8');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
