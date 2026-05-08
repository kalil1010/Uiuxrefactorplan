CONTEXT
=======
ZokaiHub mobile is built with Capacitor 8 (NOT React Native, NOT Expo). 
Architecture: Next.js static export → Capacitor WebView wrapper → 
native iOS/Android shell. The mobile-showcase/ components are visually 
on the right track but need production-grade rework, AND the entire app 
needs mobile-optimized variants for every user-facing screen.

The mobile build serves only the "user" role (no owner/vendor/star 
dashboards on mobile). Authentication uses Bearer token to a remote 
Supabase API. The app supports English + Arabic (RTL) and dark/light 
themes.

GOAL
====
Create / refactor mobile-optimized screens for EVERY user-facing route 
in the app. Where a Mobile* variant already exists in 
components/mobile-showcase/, refactor it. Where it doesn't exist, 
create a new MobileXxxPage.tsx in the appropriate folder following the 
same conventions.

SCREENS TO COVER (group by flow)
================================

1. Pre-auth & Landing
   - MobileSplashScreen        → app launch, logo + loading
   - MobileLandingPage         → welcome / value prop + CTAs (Sign in / Sign up)
   - MobileSignIn              → email + password + OAuth + "forgot password"
   - MobileSignUp              → email + password + display name + age gate
   - MobileForgotPassword      → email input + magic link confirmation
   - MobileAgreementDialog     → terms + privacy bottom sheet, must accept

2. Onboarding (after first sign-up)
   - MobileStyleSetup          → multi-step style preferences picker
   - MobileBirthdayPicker      → wheel-picker date input, COPPA-aware
   - MobileOnboardingComplete  → success + "Let's go" CTA

3. Main app (bottom tabs — 5 tabs: Feeds / Explore / Closet / Messages / Profile)
   - MobileFeedsPage           → vertical feed of posts, pull-to-refresh
   - MobilePostDetailPage      → full post + comments thread
   - MobileHashtagPage         → posts grid filtered by hashtag
   - MobileExplorePage         → discovery grid + categories
   - MobileSearchModal         → full-screen search w/ recent + suggestions
   - MobileClosetPage          → user's wardrobe items grid
   - MobileClosetMixerPage     → outfit builder, drag-to-arrange
   - MobileWearTracking        → calendar + wear stats
   - MobileMessagesPage        → conversations list
   - MobileChatScreen          → individual conversation thread
   - MobileProfilePage         → own profile (edit mode)
   - MobileProfileViewPage     → other users' profiles

4. AI features
   - MobileAIHubPage           → entry to all AI tools
   - MobileVirtualStylist      → camera + AI stylist flow
   - MobileServiceSelection    → pick AI service
   - MobileCameraScreen        → camera capture
   - MobileBrowseScreen        → browse AI suggestions
   - MobileAnalyzingScreen     → loading state with progress
   - MobilePreviewScreen       → AI result preview + save
   - MobileOutfitGenerator     → outfit AI generator
   - MobileColorAnalyzer       → color palette analyzer
   - MobileImageGenerator      → image generation tool

5. Marketplace (user-side only)
   - MobileMarketplacePage     → product feed + filters
   - MobileProductDetailPage   → product photos + description + add to cart
   - MobileVendorShopPage      → vendor's product list (read-only)
   - MobileWishlistPage        → saved products
   - MobileCheckoutPage        → order summary + address + payment intent
   - MobileOrderConfirmation   → success screen with order tracking link

6. Social
   - MobileCommunitiesPage     → joined + discoverable communities
   - MobileCommunityDetailPage → community feed + members + about
   - MobileCreateCommunityPage → form to create new community
   - MobileCollectionsPage     → user's collections list
   - MobileCollectionDetailPage→ collection items grid
   - MobileChallengesPage      → active + upcoming challenges
   - MobileChallengeDetailPage → challenge brief + entries + submit
   - MobileSavedPage           → saved posts/items aggregated

7. Creation
   - MobileCreatePostModal     → bottom sheet w/ image picker + caption + tags

8. System / Account
   - MobileNotificationsPage   → notifications list w/ swipe-to-dismiss
   - MobileSettingsPage        → account, theme, language, privacy, logout
   - MobileEditProfileSheet    → bottom sheet for quick profile edits
   - MobileLanguageSwitcher    → language picker bottom sheet
   - MobileThemeSwitcher       → theme picker bottom sheet
   - MobileContactPage         → support / contact form
   - MobileNotFoundPage        → 404 with "back to home" CTA
   - MobileOfflineState        → offline banner + retry (Capacitor needs this)

GLOBAL DESIGN RULES — apply to EVERY screen above
=================================================

A. Layout & Viewport
   - Remove any max-w-md mx-auto border-x — screens must fill 100vw × 100dvh
   - Use 100dvh (dynamic viewport) instead of 100vh so keyboard doesn't 
     clip content
   - Single-column layouts; no desktop-only multi-column patterns

B. Safe Area Insets (mandatory)
   - Top: pt-[env(safe-area-inset-top)] on any sticky/fixed header
   - Bottom: pb-[env(safe-area-inset-bottom)] on bottom nav, CTAs, 
     fixed-bottom buttons
   - Left/right: ps-[env(safe-area-inset-left)] me-[env(safe-area-inset-right)] 
     for landscape and notched devices
   - Status bar: every top header needs an opaque background, never 
     transparent over status bar area

C. Touch Targets
   - Minimum 44×44pt (iOS HIG) / 48×48dp (Material)
   - Tailwind: min-h-11 min-w-11 on buttons, icon buttons, list rows, 
     tab items
   - Spacing between adjacent tap targets ≥ 8px

D. Bottom Navigation (5 tabs)
   - position: fixed; bottom: 0; z-index: 50
   - height: 56px content + safe-area-inset-bottom padding
   - Active tab: filled icon + label; inactive: outline icon
   - Hide bottom nav on full-screen flows (Camera, Chat thread, Checkout)

E. Z-Index Hierarchy
   - status overlays / toasts: 70
   - drawers / bottom sheets: 60
   - modals / dialogs: 55
   - bottom navigation: 50
   - sticky top bar: 40
   - in-page elevated cards: 10
   No arbitrary z-index values; pull from this scale only.

F. Keyboard Handling
   - Inputs in long forms: scrollIntoView on focus
   - Use pb-[env(keyboard-inset-height,0)] on the form container
   - Submit / CTA buttons must remain visible above the keyboard
   - "Done" / "Next" key behavior on iOS where applicable

G. Loading / Empty / Error States — REQUIRED for every data screen
   - Loading: shadcn Skeleton shimmer, matching the real layout shape
   - Empty: illustration + headline + body + primary CTA
   - Error: icon + clear message + "Try again" button + secondary "Go home"
   - Pull-to-refresh visual on Feeds, Notifications, Messages, Closet

H. RTL & i18n (mandatory)
   - Use logical properties only: ms-* me-* ps-* pe-* start-* end-*
   - text-start / text-end (never text-left / text-right)
   - Directional icons (back arrows, chevrons, send) must mirror in RTL
   - Test every screen in both LTR (English) and RTL (Arabic)
   - Numbers: keep Western numerals unless locale demands Arabic-Indic

I. Theming
   - Every screen must work in dark and light themes
   - Use semantic CSS tokens (bg-background, text-foreground, 
     border-border, etc.) from globals.css
   - No hardcoded hex values
   - Status bar style adapts to theme (Capacitor StatusBar plugin will 
     handle this — design with both in mind)

J. Modals vs Bottom Sheets
   - Default to bottom sheets (drawer.tsx / vaul) for all secondary flows: 
     filters, language switcher, theme switcher, edit profile, agreement, 
     create post
   - Center dialogs only for destructive confirmations (delete, sign out)
   - Sheets must be swipe-to-dismiss

K. Images & Performance
   - Use ImageWithFallback for all remote images
   - Always specify width/height to prevent CLS
   - lazy loading by default; eager only for above-the-fold hero images
   - Aspect-ratio classes for consistent grids

L. Accessibility
   - Every interactive element has an accessible name (aria-label or 
     visible text)
   - Color contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text and UI 
     components (WCAG 2.1 AA)
   - Focus rings visible (focus-visible:ring-2)
   - Screen reader landmarks: header, nav, main, complementary

M. Capacitor-aware UI affordances
   - Pull-to-refresh visual hooks (Capacitor will wire to native gesture)
   - Haptic feedback hooks on success/error toasts (visual only — 
     Capacitor Haptics plugin handles the buzz)
   - Back button: software back arrow at start (mirrors in RTL); 
     Android hardware back will be wired by Capacitor
   - Deep link awareness: every detail page must work as an entry point 
     (don't assume the user came from a list)

N. Forms
   - Native input types (email, tel, number, url) for correct keyboards
   - inputMode attributes for fine-grained keyboard control
   - autoComplete hints (email, current-password, new-password, etc.)
   - Inline validation messages below each field
   - Submit button disabled until form is valid + loading state on submit

CONSTRAINTS / DON'T
===================
- Don't create vendor or owner dashboard variants for mobile — user role only
- Don't use desktop sidebars on mobile
- Don't use hover-only interactions (no information hidden behind hover)
- Don't use fixed pixel widths > 100% of viewport
- Don't reproduce the same screen twice — if a "Mobile*" already exists, 
  refactor it instead of duplicating

DELIVERABLE
===========
For each screen, deliver:
1. The .tsx file (refactored or new) following the rules above
2. A short note listing the major changes vs the previous web version
3. A loading skeleton, empty state, and error state for any 
   data-driven screen
4. Verification it works in both LTR/RTL and dark/light

Start with the most foundational screens in this order:
  1. MobileSplashScreen + MobileLandingPage
  2. Auth (SignIn, SignUp, ForgotPassword, AgreementDialog)
  3. Onboarding (StyleSetup, BirthdayPicker)
  4. The 5 main tabs (Feeds, Explore, Closet, Messages, Profile)
  5. Then radiate outward to AI features, Marketplace, Social, Settings
  6. End with utility screens (404, Offline, Contact)

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
