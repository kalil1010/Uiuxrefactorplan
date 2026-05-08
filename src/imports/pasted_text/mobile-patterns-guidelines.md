Batch 2 mostly approved. TWO remaining issues — fix these AND add a 
guidelines doc so we stop hitting the same patterns.

Issue #1: Locale bug in MobileSignUp.tsx formatDateOfBirth
==========================================================
Same bug pattern as BirthdayPicker had — uses browser locale instead 
of app locale.

Current:
  return new Intl.DateTimeFormat(undefined, { ... }).format(date);

Fix: at the top of MobileSignUp, add useLocale and pass it:

  import { useTranslations, useLocale } from 'next-intl';
  ...
  const locale = useLocale();
  ...
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric', month: 'long', day: 'numeric'
  }).format(date);

Issue #2: Reuse the existing wheel-picker.tsx primitive
========================================================
The custom WheelColumn in MobileBirthdayPicker is missing features 
the existing WheelPicker has (touch drag handlers, opacity/scale 
animations near center). The existing wheel-picker.tsx has the inner 
WheelPicker function but doesn't export it.

Two-step fix:

Step A — In src/app/components/ui/wheel-picker.tsx, ADD an export to 
the inner function:

  // Change:    function WheelPicker(...)
  // To:        export function WheelPicker(...)

Step B — In MobileBirthdayPicker.tsx:
  - Delete the entire local WheelColumn component
  - Import: import { WheelPicker } from '../ui/wheel-picker';
  - For each of the three wheels, wrap WheelPicker with an outer div 
    that carries role="group" and aria-label={t('day') / t('month') / 
    t('year')}:

      <div role="group" aria-label={t('day')} className="flex-1">
        <WheelPicker
          options={dayOptions}
          value={selectedDay}
          onChange={setSelectedDay}
        />
      </div>
      <div role="group" aria-label={t('month')} className="flex-1">
        <WheelPicker
          options={monthOptions}
          value={selectedMonth}
          onChange={setSelectedMonth}
        />
      </div>
      <div role="group" aria-label={t('year')} className="flex-1">
        <WheelPicker
          options={yearOptions}
          value={selectedYear}
          onChange={setSelectedYear}
        />
      </div>

Step C — Add to messages/en.json under auth.birthdayPicker:
    "day": "Day",
    "month": "Month",
    "year": "Year"
  And to messages/ar.json:
    "day": "اليوم",
    "month": "الشهر",
    "year": "السنة"

Step D — Same approach for the Cancel/Done buttons inside the existing 
WheelPickerModal/MultiWheelPickerModal: Replace the hardcoded "Cancel" 
and "Done" with i18n. Inside wheel-picker.tsx:

  import { useTranslations } from 'next-intl';
  ...
  const tCommon = useTranslations('common');
  ...
  // Replace "Cancel" with {tCommon('cancel')}
  // Replace "Done"   with {tCommon('done')}

(both in WheelPickerModal and MultiWheelPickerModal — though we won't 
use those modals here, fixing them prevents the same bug elsewhere.)

ALSO — Create a guidelines doc to lock these patterns
======================================================
Create a new file: guidelines/MOBILE_PATTERNS.md with this content:

  # ZokaiHub Mobile Refactor — Locked Patterns
  
  Do NOT regress on these. Re-read before every batch.
  
  ## Brand identity
  - Primary CTAs use `gradient-bg text-primary-foreground 
    hover:opacity-90 active:opacity-80` — NEVER 
    `bg-gradient-to-r from-primary to-primary/...`
  - Brand palette is the 4-color gradient defined in 
    src/styles/globals.css (purple → pink → coral → yellow)
  
  ## i18n
  - Every user-visible string goes through `useTranslations()`
  - For sibling namespaces, add a SECOND hook 
    (`const tCommon = useTranslations('common')`) — never use relative 
    paths like `t('../common.foo')`
  - Inline JSX in text uses `t.rich()` with HTML-like tags 
    (`<terms>...</terms>`), never `{terms}` with a JSX value
  - Locale-aware Intl APIs MUST get the active locale from 
    `useLocale()`. Never call `Intl.DateTimeFormat(undefined, ...)`.
  
  ## Reuse existing primitives
  - Before building anything, check `src/app/components/ui/` for an 
    existing primitive: button, input, label, dialog, drawer, 
    scroll-area, progress, wheel-picker, image-cropper, etc.
  - Do not rebuild what already exists. If a primitive needs an export 
    or a small extension, add it to the existing file.
  
  ## Layout
  - 100dvh, never 100vh
  - safe-area-inset-* on top headers, bottom nav, fixed bottom CTAs
  - keyboard-inset-height padding on any scrollable form area
  - No `max-w-md mx-auto` on form wrappers
  - No "absolute + mb-* / mt-*" combos — use flex utilities
  - sticky bottom-0 inside an overflow-y-auto parent is unreliable on 
    iOS WebView — use a flex-column layout with a non-scrolling footer
  
  ## Touch & accessibility
  - Every tap target ≥ min-h-11 min-w-11
  - Every interactive button/link has an aria-label or visible text
  - All hover: states have an active: counterpart for touch feedback
  - Loading state shows Loader2 spinner, not just text change
  - Form inputs have enterKeyHint, autoComplete, inputMode where 
    applicable
  
  ## RTL
  - Logical properties only: ms-, me-, ps-, pe-, start-, end-
  - Never ml-, mr-, pl-, pr-, left-, right- in mobile screens
  - text-start, text-end (not text-left, text-right)
  
  ## Tokens
  - Only semantic shadcn tokens: bg-background, bg-card, bg-muted, 
    bg-primary, bg-destructive, text-foreground, 
    text-muted-foreground, border-border, border-input, ring-ring, 
    plus the brand gradient utilities defined in globals.css
  - Never hardcoded hex/rgb values, never bg-blue-500 etc.

After applying both fixes AND creating MOBILE_PATTERNS.md, proceed 
with Batch 3:
  - The 5 main tabs: Feeds, Explore, Closet, Messages, Profile
  - For each: include MobileXxxPage.tsx + a MobileXxxBottomNav 
    integration point. Bottom nav is shared across all 5 — create a 
    single MobileBottomNav.tsx component used by all tabs (avoid 
    duplicating it 5 times).
  - Each page needs Loading skeleton, Empty state, Error state.

Confirm the 2 fixes + the guidelines doc are done, then ship Batch 3.