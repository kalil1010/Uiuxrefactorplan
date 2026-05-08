Batch 2 APPROVED ✅. All three fixes verified:
- WheelPicker correctly exported and reused (touch handlers preserved)
- MobileSignUp uses useLocale() for date formatting
- BirthdayPicker wheels wrapped with role="group" + localized aria-labels

ONE LAST THING — MOBILE_PATTERNS.md gap
========================================
The doc you created is essentially the original spec, which is good 
but doesn't capture the SPECIFIC anti-patterns from the bugs we hit 
during Batch 1 and Batch 2. Without those, Batches 3-12 will repeat 
the same regressions.

APPEND this section to the END of guidelines/MOBILE_PATTERNS.md 
(don't rewrite, just append):

============================================================
LESSONS LEARNED — DO NOT REGRESS ON THESE
============================================================

These are real bugs we hit and fixed during Batches 1-2. Re-read 
before every batch.

## Brand identity (Batch 1 + 2)
- Primary CTAs MUST use:
    gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80
- NEVER use single-color tailwind gradients like:
    bg-gradient-to-r from-primary to-primary/80
  — this loses the 4-color brand identity (purple→pink→coral→yellow 
  defined in globals.css).

## i18n (Batch 1 + 2)
- For sibling namespaces, declare a SECOND hook:
    const t = useTranslations('auth.signIn');
    const tCommon = useTranslations('common');
- NEVER use relative paths in t() calls:
    t('../../common.back')  ← INVALID, throws MISSING_MESSAGE
- Inline JSX inside translated text uses t.rich() with HTML-like 
  tags, NEVER curly placeholders:
    // message: "<terms>Terms</terms> and <privacy>Privacy</privacy>"
    t.rich('legal', { terms: (c) => <Link>{c}</Link>, ... })
  // NOT:
    // message: "{terms} and {privacy}"
    t('legal', { terms: <Link/>, ... })  ← renders [object Object]
- Locale-aware Intl APIs MUST receive the active locale from 
  useLocale() — NEVER call Intl.DateTimeFormat(undefined, ...) or 
  Intl.NumberFormat(undefined, ...) etc.
    const locale = useLocale();
    new Intl.DateTimeFormat(locale, ...)
- Hardcoded English in aria-label is a recurring bug. Every aria-label 
  goes through tCommon() or t().

## Reuse existing primitives (Batch 2)
- BEFORE writing a new component, scan src/app/components/ui/ for an 
  existing primitive: button, input, label, dialog, drawer, scroll-area, 
  progress, wheel-picker, image-cropper, image-upload-with-crop, 
  sheet, tabs, etc.
- If a primitive needs an extension (e.g. an internal function not 
  exported), add the export to the existing file. Do NOT rebuild the 
  primitive in your screen.
- We hit this 3 times with WheelPicker — don't repeat.

## Layout pitfalls (Batch 1)
- `sticky bottom-0` inside an `overflow-y-auto` parent is unreliable 
  in iOS WebView. Use a flex-column layout with a non-scrolling footer:
    <div className="flex flex-col h-[100dvh]">
      <header />
      <main className="flex-1 overflow-y-auto" />
      <footer />  // not sticky — naturally last child
    </div>
- `position: absolute` + `mb-*`/`mt-*` does NOT work — margin is 
  ignored on absolutely-positioned elements with bottom-0/top-0. 
  Use `bottom-[calc(...)]` or restructure as flex.
- Absolutely-positioned children require the nearest positioned 
  ancestor — add `relative` to the parent.

## Touch feedback (Batch 1)
- Every `hover:` state needs an `active:` counterpart. Hover doesn't 
  fire on touch devices.
- Button loading state shows Loader2 spinner + text, not just text:
    {isLoading ? (
      <><Loader2 className="w-5 h-5 me-2 animate-spin" />{t('sending')}</>
    ) : t('cta')}

## Forms (Batch 1)
- enterKeyHint on every input: "next" mid-form, "done" / "send" / 
  "go" on the last field.
- pb-[env(keyboard-inset-height,0px)] on every scrollable form 
  container (so submit stays visible above the keyboard).

## OAuth brand assets (Batch 1)
- Google "G" logo MUST use the official 4 colors: #4285F4, #34A853, 
  #FBBC05, #EA4335. NOT a single-color currentColor SVG.
- Apple logo uses fill="currentColor" (theme-aware) per HIG.

## Memory / lifecycle (Batch 2)
- setInterval / setTimeout that outlive a single render must be 
  stored in a ref and cleaned up:
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    useEffect(() => () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }, []);

## Anti-patterns to NEVER use (cumulative)
- max-w-md mx-auto on form wrappers
- 100vh (use 100dvh)
- ml-/mr-/pl-/pr-/left-/right-/text-left/text-right (use logical 
  properties)
- bg-gradient-to-r from-primary to-primary/80 (use gradient-bg)
- Intl APIs with `undefined` locale
- Relative paths in t() calls
- onScrollEnd (use onScroll, not all browsers support scrollend)
- aria-label="Close" / "Back" hardcoded (use tCommon)
- Single-color OAuth Google G

============================================================

After appending, proceed with Batch 3:
  Main app — 5 bottom tabs:
    1. MobileFeedsPage
    2. MobileExplorePage  
    3. MobileClosetPage
    4. MobileMessagesPage
    5. MobileProfilePage

  Plus a SINGLE shared component:
    - MobileBottomNav    (one component used by all 5 — z-50, fixed 
                          bottom, safe-area-inset-bottom, swipe-aware)

  Each page MUST have:
    - Loading skeleton (shadcn Skeleton matching the real layout)
    - Empty state (illustration + headline + body + CTA)
    - Error state (icon + message + "Try again" + "Go home")
    - Pull-to-refresh visual hook (Feeds, Messages, Closet)
    - i18n with new namespace per screen (auth.* is for auth flow only)
       → use feeds.*, explore.*, closet.*, messages.*, profile.* 
       and a shared bottomNav.* namespace for the tabs
    - Loading/empty/error strings translated in BOTH en.json and 
      ar.json