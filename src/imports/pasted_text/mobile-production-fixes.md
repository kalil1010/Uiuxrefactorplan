STOP. You worked on the wrong folder. NONE of the production files 
have been fixed and three of them don't exist at all.

VERIFIED CURRENT STATE OF src/app/components/mobile/ (production):

  MobileFeedsPage.tsx     — UNCHANGED. All 4 critical regressions 
                            from my last review are still in this 
                            file:
                            - aria-label="More options" (English)
                            - aria-label="Like"/"Unlike" (English)
                            - aria-label="Comment" (English)
                            - aria-label="Share" (English)
                            - aria-label="Bookmark"/"Remove bookmark" 
                              (English)
                            - <img src={post.image} alt=""> raw tag, 
                              no ImageWithFallback
                            - timestamp: '2h ago' / '5h ago' hardcoded
                            - tCommon declared but unused
                            - ScrollArea imported but unused
                            - console.log(tab) onTabChange placeholder

  MobileExplorePage.tsx   — UNCHANGED. Still has:
                            - items[].category: 'Trending' hardcoded 
                              English shown to the user via Badge
                            - <img> raw tags instead of 
                              ImageWithFallback
                            - item.likes.toLocaleString() without 
                              useLocale()
                            - Tabs/TabsList/TabsTrigger/TabsContent 
                              imported but unused
                            - tCommon declared but unused
                            - console.log(tab) placeholder

  MobileClosetPage.tsx    — DOES NOT EXIST. File not found.
  MobileMessagesPage.tsx  — DOES NOT EXIST. File not found.
  MobileProfilePage.tsx   — DOES NOT EXIST. File not found.

What you actually did: edited files in src/app/components/mobile-showcase/ 
— the LEGACY folder we explicitly told you to ignore in the original 
spec. You also stripped i18n out of those files and put hardcoded 
English back in. That is the OPPOSITE of what we want.

Your final paragraph said: "the production components with full i18n 
support are in the mobile/ folder" — yes, exactly. THAT is the folder 
that needs the fixes. You left it untouched.

DELIVERABLE — DO THESE EXACT STEPS, IN THIS ORDER:

Step 1 — Revert mobile-showcase/ changes
=========================================
Discard your edits to src/app/components/mobile-showcase/. We do not 
care about that folder. Stop touching it. If you cannot revert, 
re-apply next-intl to whatever you broke there — but the priority is 
NOT mobile-showcase, it's mobile/.

Step 2 — Apply Sub-batch 3A fixes to the PRODUCTION files
==========================================================
File: src/app/components/mobile/MobileFeedsPage.tsx
File: src/app/components/mobile/MobileExplorePage.tsx
File: src/app/components/mobile/MobileBottomNav.tsx

Apply EVERY fix from my previous review (the 4 critical + 7 minor). 
I'll repeat them so there is no ambiguity:

  A. Translate all aria-labels via t() / tCommon():
     - moreOptions, like, unlike, comment, share, bookmark, 
       removeBookmark
     Add keys under feeds.actions.* in BOTH messages/en.json and 
     messages/ar.json.
  
  B. Replace <img> with ImageWithFallback in:
     - MobileFeedsPage post images and avatars
     - MobileExplorePage trending grid images
     Import: import { ImageWithFallback } from '../figma/ImageWithFallback';
     Always pass meaningful alt (post content truncated, item title).
  
  C. MobileExplorePage items: store categoryKey not the translated 
     string. In the JSX, render with t(`categories.${item.categoryKey}`).
     Mock English titles can stay with a 
     // TODO(integration): replace with API data
     comment.
  
  D. Locale-aware numbers: 
     - import { useLocale } from 'next-intl';
     - const locale = useLocale();
     - Replace .toLocaleString() with .toLocaleString(locale)
  
  E. Replace timestamp strings with Intl.RelativeTimeFormat(locale):
     const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
     // mock data: createdAt: Date.now() - 2*60*60*1000
     // render: rtf.format(-2, 'hour')
  
  F. Remove dead imports:
     - MobileFeedsPage: ScrollArea, tCommon
     - MobileExplorePage: Tabs/TabsList/TabsTrigger/TabsContent, 
       tCommon (or USE tCommon if you need shared strings)
  
  G. MobileBottomNav: change strokeWidth={isActive ? 2 : 2} to 
     strokeWidth={isActive ? 2 : 1.5}
  
  H. Replace console.log(tab) with:
     // TODO(integration): wire to next-intl router
     // router.push(`/${tab}`)

Step 3 — Create Sub-batch 3B PRODUCTION files
==============================================
Create these THREE new files in src/app/components/mobile/ (NOT 
mobile-showcase):

  - MobileClosetPage.tsx
  - MobileMessagesPage.tsx  
  - MobileProfilePage.tsx

Each must include from the start:
  - useTranslations() with the proper namespace 
    (closet.*, messages.*, profile.*)
  - useTranslations('common') alongside, used for shared strings
  - useLocale() for any Intl.* APIs (numbers, dates)
  - ImageWithFallback for ALL remote images with meaningful alt
  - aria-labels via t() / tCommon() — ZERO hardcoded English
  - Loading + Empty + Error states (Skeleton, illustration, retry CTA)
  - Pull-to-refresh visual hook on Closet and Messages
  - 100dvh, safe-area-inset-*, pb for bottom nav
  - MobileBottomNav with the correct activeTab
  - All keys added to BOTH messages/en.json and messages/ar.json
  - active: states alongside hover:
  - Logical properties only (ms-/me-/ps-/pe-/start-/end-)
  - Brand gradient on primary CTAs (gradient-bg, NOT 
    bg-gradient-to-r from-primary)
  - TODO(integration) comment for all places that need real data

Re-read MOBILE_PATTERNS.md → LESSONS LEARNED before you start, and 
again before you submit.

Confirm you understand this:
  - Target folder: src/app/components/mobile/
  - Do NOT touch src/app/components/mobile-showcase/
  - Files in mobile/ MUST keep next-intl
  - Sub-batch 3A has NOT been fixed yet — fix it FIRST
  - Then Sub-batch 3B as new files in mobile/

Reply with: "Confirmed. Working on src/app/components/mobile/ only." 
before starting, so I know we're on the same page.