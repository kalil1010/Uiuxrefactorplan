# 🗺️ ZokaiHub Design Migration Roadmap

## Visual Migration Path

This document provides a **visual roadmap** showing exactly where each refactored component goes in the original repository.

---

## 📂 Directory Mapping: Refactored → Original

### Complete Path Reference

```
REFACTORED (This Repo)                          ORIGINAL (ZokaiHub)
══════════════════════════════════════════════════════════════════════════

📁 /styles/
   └── globals.css                       →      src/styles/globals.css (MERGE)

📁 /lib/
   ├── state-manager.ts                  →      src/lib/state-manager.ts
   ├── theme-provider.tsx                →      src/lib/theme-provider.tsx
   └── suppress-warnings.ts              →      src/lib/suppress-warnings.ts

📁 /components/ui/
   ├── accordion.tsx                     →      src/components/ui/accordion.tsx
   ├── alert-dialog.tsx                  →      src/components/ui/alert-dialog.tsx
   ├── alert.tsx                         →      src/components/ui/alert.tsx
   ├── aspect-ratio.tsx                  →      src/components/ui/aspect-ratio.tsx
   ├── avatar.tsx                        →      src/components/ui/avatar.tsx
   ├── badge.tsx                         →      src/components/ui/badge.tsx
   ├── breadcrumb.tsx                    →      src/components/ui/breadcrumb.tsx
   ├── button.tsx                        →      src/components/ui/button.tsx
   ├── calendar.tsx                      →      src/components/ui/calendar.tsx
   ├── card.tsx                          →      src/components/ui/card.tsx
   ├── carousel.tsx                      →      src/components/ui/carousel.tsx
   ├── chart.tsx                         →      src/components/ui/chart.tsx
   ├── checkbox.tsx                      →      src/components/ui/checkbox.tsx
   ├── collapsible.tsx                   →      src/components/ui/collapsible.tsx
   ├── command.tsx                       →      src/components/ui/command.tsx
   ├── context-menu.tsx                  →      src/components/ui/context-menu.tsx
   ├── dialog.tsx                        →      src/components/ui/dialog.tsx
   ├── drawer.tsx                        →      src/components/ui/drawer.tsx
   ├── dropdown-menu.tsx                 →      src/components/ui/dropdown-menu.tsx
   ├── form.tsx                          →      src/components/ui/form.tsx
   ├── hover-card.tsx                    →      src/components/ui/hover-card.tsx
   ├── image-cropper.tsx                 →      src/components/ui/image-cropper.tsx (NEW)
   ├── image-upload-with-crop.tsx        →      src/components/ui/image-upload-with-crop.tsx (NEW)
   ├── input-otp.tsx                     →      src/components/ui/input-otp.tsx
   ├── input.tsx                         →      src/components/ui/input.tsx
   ├── label.tsx                         →      src/components/ui/label.tsx
   ├── menubar.tsx                       →      src/components/ui/menubar.tsx
   ├── navigation-menu.tsx               →      src/components/ui/navigation-menu.tsx
   ├── pagination.tsx                    →      src/components/ui/pagination.tsx
   ├── popover.tsx                       →      src/components/ui/popover.tsx
   ├── progress.tsx                      →      src/components/ui/progress.tsx
   ├── radio-group.tsx                   →      src/components/ui/radio-group.tsx
   ├── resizable.tsx                     →      src/components/ui/resizable.tsx
   ├── scroll-area.tsx                   →      src/components/ui/scroll-area.tsx
   ├── select.tsx                        →      src/components/ui/select.tsx
   ├── separator.tsx                     →      src/components/ui/separator.tsx
   ├── sheet.tsx                         →      src/components/ui/sheet.tsx
   ├── sidebar.tsx                       →      src/components/ui/sidebar.tsx
   ├── skeleton.tsx                      →      src/components/ui/skeleton.tsx
   ├── slider.tsx                        →      src/components/ui/slider.tsx
   ├── sonner.tsx                        →      src/components/ui/sonner.tsx
   ├── switch.tsx                        →      src/components/ui/switch.tsx
   ├── table.tsx                         →      src/components/ui/table.tsx
   ├── tabs.tsx                          →      src/components/ui/tabs.tsx
   ├── textarea.tsx                      →      src/components/ui/textarea.tsx
   ├── toggle-group.tsx                  →      src/components/ui/toggle-group.tsx
   ├── toggle.tsx                        →      src/components/ui/toggle.tsx
   ├── tooltip.tsx                       →      src/components/ui/tooltip.tsx
   ├── use-mobile.ts                     →      src/components/ui/use-mobile.ts
   ├── utils.ts                          →      src/components/ui/utils.ts (or src/lib/utils.ts)
   └── wheel-picker.tsx                  →      src/components/ui/wheel-picker.tsx (NEW)

📁 /components/layout/
   ├── TopBar.tsx                        →      src/components/layout/TopBar.tsx (MERGE i18n)
   └── RoleSidebar.tsx                   →      src/components/layout/RoleSidebar.tsx (MERGE i18n)

📁 /components/
   ├── Logo.tsx                          →      src/components/shared/Logo.tsx (NEW)
   ├── LanguageSwitcher.tsx              →      src/components/shared/LanguageSwitcher.tsx (MERGE)
   └── ThemeToggle.tsx                   →      src/components/ThemeToggle.tsx (REPLACE)

📁 /components/auth/
   ├── SignIn.tsx                        →      src/components/auth/SignIn.tsx (MERGE UI)
   ├── SignUp.tsx                        →      src/components/auth/SignUp.tsx (MERGE UI)
   └── ForgotPassword.tsx                →      src/components/auth/ForgotPassword.tsx (MERGE UI)

📁 /components/onboarding/
   ├── StyleSetup.tsx                    →      src/components/auth/OnboardingFlow.tsx (MERGE)
   └── BirthdayPicker.tsx                →      src/components/shared/BirthdayPicker.tsx (NEW)

📁 /components/feeds/
   ├── FeedsPage.tsx                     →      src/components/home/FeedsPage.tsx (MERGE)
   ├── FeedsPageWrapper.tsx              →      src/components/home/FeedsPageWrapper.tsx (MERGE)
   ├── MainContent.tsx                   →      src/components/home/MainContent.tsx (MERGE)
   ├── PostDetailPage.tsx                →      src/components/post/PostDetailPage.tsx (MERGE)
   └── HashtagPage.tsx                   →      src/components/hashtag/HashtagPage.tsx (NEW)

📁 /components/posts/
   └── CreatePostModal.tsx               →      src/components/post/CreatePostModal.tsx (MERGE)

📁 /components/explore/
   └── ExplorePage.tsx                   →      src/components/social/ExplorePage.tsx (MERGE)

📁 /components/search/
   └── SearchModal.tsx                   →      src/components/search/SearchModal.tsx (MERGE)

📁 /components/notifications/
   └── NotificationsPanel.tsx            →      src/components/notifications/NotificationsPanel.tsx (MERGE)

📁 /components/messages/
   └── MessagesPage.tsx                  →      src/components/messages/MessagesPage.tsx (MERGE)

📁 /components/social/
   ├── CollectionsPage.tsx               →      src/components/collections/CollectionsPage.tsx (MERGE)
   ├── CollectionDetailPage.tsx          →      src/components/collections/CollectionDetailPage.tsx (NEW)
   ├── CommunitiesPage.tsx               →      src/components/community/CommunitiesPage.tsx (MERGE)
   ├── CommunityDetailPage.tsx           →      src/components/community/CommunityDetailPage.tsx (NEW)
   └── CreateCommunityPage.tsx           →      src/components/community/CreateCommunityPage.tsx (NEW)

📁 /components/challenges/
   ├── ChallengesPage.tsx                →      src/components/challenge/ChallengesPage.tsx (MERGE)
   └── ChallengeDetailPage.tsx           →      src/components/challenge/ChallengeDetailPage.tsx (NEW)

📁 /components/closet/
   ├── MyClosetPage.tsx                  →      src/components/closet/MyClosetPage.tsx (MERGE)
   └── ClosetMixerPage.tsx               →      src/components/closet/ClosetMixerPage.tsx (NEW)

📁 /components/ai-hub/
   └── AIHubPage.tsx                     →      src/components/ai/AIHubPage.tsx (MERGE)

📁 /components/tools/
   ├── OutfitGeneratorPage.tsx           →      src/components/ai/OutfitGenerator.tsx (MERGE)
   ├── ColorAnalyzerPage.tsx             →      src/components/analyzer/ColorAnalyzer.tsx (MERGE)
   └── ImageGeneratorPage.tsx            →      src/components/ai/ImageGenerator.tsx (NEW)

📁 /components/marketplace/
   ├── MarketplacePage.tsx               →      src/components/marketplace/MarketplacePage.tsx (MERGE)
   ├── ProductDetailPage.tsx             →      src/components/marketplace/ProductDetailPage.tsx (MERGE)
   └── VendorShopPage.tsx                →      src/components/marketplace/VendorShopPage.tsx (NEW)

📁 /components/checkout/
   └── CheckoutPage.tsx                  →      src/components/cart/CheckoutPage.tsx (NEW)

📁 /components/wishlist/
   └── WishlistPage.tsx                  →      src/components/marketplace/WishlistPage.tsx (NEW)

📁 /components/saved/
   └── SavedPage.tsx                     →      src/components/social/SavedPage.tsx (NEW)

📁 /components/profile/
   ├── ProfilePage.tsx                   →      src/components/profile/ProfilePage.tsx (MERGE)
   └── ProfileViewPage.tsx               →      src/components/profile/ProfileViewPage.tsx (NEW)

📁 /components/settings/
   └── SettingsPage.tsx                  →      src/components/settings/SettingsPage.tsx (MERGE)

📁 /components/dashboards/
   ├── OwnerDashboard.tsx                →      src/components/owner/OwnerDashboard.tsx (MERGE)
   ├── VendorDashboard.tsx               →      src/components/vendor/VendorDashboard.tsx (MERGE)
   └── StarDashboard.tsx                 →      src/components/profile/CreatorDashboard.tsx (NEW)

📁 /components/dashboards/owner/
   ├── UsersTab.tsx                      →      src/components/owner/tabs/UsersTab.tsx (MERGE)
   └── VendorsTab.tsx                    →      src/components/owner/tabs/VendorsTab.tsx (MERGE)

📁 /components/dashboards/vendor/
   ├── ProductsTab.tsx                   →      src/components/vendor/tabs/ProductsTab.tsx (MERGE)
   ├── OrdersTab.tsx                     →      src/components/vendor/tabs/OrdersTab.tsx (MERGE)
   ├── CustomersTab.tsx                  →      src/components/vendor/tabs/CustomersTab.tsx (MERGE)
   ├── AnalyticsTab.tsx                  →      src/components/vendor/tabs/AnalyticsTab.tsx (MERGE)
   ├── ReviewsTab.tsx                    →      src/components/vendor/tabs/ReviewsTab.tsx (MERGE)
   ├── PromotionsTab.tsx                 →      src/components/vendor/tabs/PromotionsTab.tsx (MERGE)
   ├── SupportTab.tsx                    →      src/components/vendor/tabs/SupportTab.tsx (MERGE)
   └── SettingsTab.tsx                   →      src/components/vendor/tabs/SettingsTab.tsx (MERGE)

📁 /components/contact/
   └── ContactPage.tsx                   →      src/app/contact/page.tsx (NEW)

📁 /components/utility/
   └── NotFoundPage.tsx                  →      src/app/not-found.tsx (REPLACE)

📁 /docs/
   ├── COMMUNITY_SYSTEM.md               →      docs/COMMUNITY_SYSTEM.md
   └── IMAGE_CROPPING.md                 →      docs/IMAGE_CROPPING.md

📁 /guidelines/
   └── Guidelines.md                     →      docs/design/Guidelines.md

════════════════════════════════════════════════════════════════════════════
SKIP THESE (Demo/Showcase Only):
   ❌ /App.tsx                           (Single-page app entry)
   ❌ /components/ZokaiHubShowcase.tsx   (Demo navigation)
   ❌ /components/examples/*             (Demo pages)
   ❌ /components/demos/*                (Demo pages)
   ❌ /components/figma/*                (Figma-specific)
   ❌ /components/AIStylistHub.tsx       (Duplicate of AIHubPage)
```

---

## 🗓️ Week-by-Week Migration Plan

### Week 1: Foundation & Core

#### Day 1: Design System
```
Tasks:
├── Merge globals.css
│   ├── Copy glass effect utilities
│   ├── Copy blur orb classes
│   ├── Copy gradient utilities
│   └── Update design tokens
├── Copy all UI components (40+)
│   └── Replace src/components/ui/ entirely
└── Test theme system

Files Modified: ~45
Time: 4-6 hours
```

#### Day 2: Layout Components
```
Tasks:
├── Update TopBar.tsx
│   ├── Copy new UI
│   ├── Add i18n support
│   └── Keep auth logic
├── Update RoleSidebar.tsx
│   ├── Copy new UI
│   ├── Add i18n support
│   └── Keep navigation logic
├── Add Logo.tsx component
└── Update ThemeToggle.tsx

Files Modified: 4
Time: 3-4 hours
```

#### Day 3: Authentication Pages
```
Tasks:
├── Update SignIn.tsx
│   ├── Copy UI structure
│   ├── Keep Supabase auth logic
│   └── Add i18n
├── Update SignUp.tsx
│   ├── Copy UI structure
│   ├── Keep Supabase auth logic
│   └── Add i18n
├── Update ForgotPassword.tsx
│   ├── Copy UI structure
│   ├── Keep Supabase auth logic
│   └── Add i18n
└── Test auth flows

Files Modified: 3
Time: 4-6 hours
```

#### Day 4: Main Feed Pages
```
Tasks:
├── Update FeedsPage.tsx
│   ├── Copy UI layout
│   ├── Keep Supabase queries
│   ├── Keep real-time updates
│   └── Add i18n
├── Update PostDetailPage.tsx
├── Update CreatePostModal.tsx
├── Update ExplorePage.tsx
└── Test all feeds

Files Modified: 4
Time: 5-7 hours
```

#### Day 5: Search, Notifications, Messages
```
Tasks:
├── Update SearchModal.tsx
├── Update NotificationsPanel.tsx
│   └── Keep real-time logic
├── Update MessagesPage.tsx
│   └── Keep real-time logic
└── Test all features

Files Modified: 3
Time: 4-5 hours
```

---

### Week 2: Social Features

#### Day 6: Collections
```
Tasks:
├── Update CollectionsPage.tsx
│   ├── Copy UI
│   ├── Keep Supabase queries
│   └── Add i18n
├── Add CollectionDetailPage.tsx (NEW)
│   ├── Copy from refactored
│   ├── Add Supabase integration
│   ├── Add routing
│   └── Add i18n
└── Test collection flows

Files Modified: 2
Routes Added: 1
Time: 4-5 hours
```

#### Day 7: Communities
```
Tasks:
├── Update CommunitiesPage.tsx
├── Add CommunityDetailPage.tsx (NEW)
│   ├── Copy from refactored
│   ├── Add Supabase integration
│   └── Add routing
├── Add CreateCommunityPage.tsx (NEW)
│   ├── Copy from refactored
│   ├── Add form handling
│   └── Add Supabase mutations
└── Test community features

Files Modified: 3
Routes Added: 2
Time: 5-7 hours
```

#### Day 8: Challenges
```
Tasks:
├── Update ChallengesPage.tsx
├── Add ChallengeDetailPage.tsx (NEW)
│   ├── Copy from refactored
│   ├── Add Supabase integration
│   └── Add routing
└── Test challenge features

Files Modified: 2
Routes Added: 1
Time: 3-4 hours
```

#### Day 9: Profile Pages
```
Tasks:
├── Update ProfilePage.tsx
├── Add ProfileViewPage.tsx (NEW)
│   ├── Copy from refactored
│   ├── Add Supabase queries
│   └── Add routing
└── Update SettingsPage.tsx

Files Modified: 3
Routes Added: 1
Time: 4-5 hours
```

#### Day 10: Additional Social
```
Tasks:
├── Add HashtagPage.tsx (NEW)
│   ├── Copy from refactored
│   ├── Add Supabase queries
│   └── Add routing
├── Add SavedPage.tsx (NEW)
└── Test all social features

Files Modified: 2
Routes Added: 2
Time: 3-4 hours
```

---

### Week 3: Marketplace & AI

#### Day 11: Marketplace Core
```
Tasks:
├── Update MarketplacePage.tsx
│   ├── Copy UI
│   ├── Keep product queries
│   └── Add i18n
├── Update ProductDetailPage.tsx
│   ├── Copy UI
│   ├── Keep product data
│   └── Add i18n
└── Test marketplace

Files Modified: 2
Time: 4-5 hours
```

#### Day 12: Vendor & Checkout
```
Tasks:
├── Add VendorShopPage.tsx (NEW)
│   ├── Copy from refactored
│   ├── Add vendor queries
│   └── Add routing
├── Add CheckoutPage.tsx (NEW)
│   ├── Copy from refactored
│   ├── Add payment logic
│   └── Add Stripe integration
└── Test shopping flows

Files Modified: 2
Routes Added: 2
Time: 5-7 hours
```

#### Day 13: Wishlist & Saved
```
Tasks:
├── Add WishlistPage.tsx (NEW)
│   ├── Copy from refactored
│   ├── Add Supabase integration
│   └── Add routing
└── Test wishlist features

Files Modified: 1
Routes Added: 1
Time: 3-4 hours
```

#### Day 14: AI Hub
```
Tasks:
├── Update AIHubPage.tsx
├── Update OutfitGeneratorPage.tsx
├── Update ColorAnalyzerPage.tsx
├── Add ImageGeneratorPage.tsx (NEW)
└── Test all AI features

Files Modified: 4
Time: 4-6 hours
```

#### Day 15: Closet Features
```
Tasks:
├── Update MyClosetPage.tsx
├── Add ClosetMixerPage.tsx (NEW)
│   ├── Copy from refactored
│   ├── Add drag-and-drop
│   └── Add Supabase integration
└── Test closet features

Files Modified: 2
Time: 4-5 hours
```

---

### Week 4: Dashboards & Polish

#### Day 16: Owner Dashboard
```
Tasks:
├── Update OwnerDashboard.tsx
│   ├── Copy UI structure
│   ├── Keep admin queries
│   └── Add i18n
├── Update UsersTab.tsx
│   ├── Copy UI
│   ├── Keep user management
│   └── Add i18n
├── Update VendorsTab.tsx
│   ├── Copy UI
│   ├── Keep vendor management
│   └── Add i18n
└── Test owner features

Files Modified: 3
Time: 5-7 hours
```

#### Day 17-18: Vendor Dashboard (8 Tabs)
```
Tasks:
├── Update VendorDashboard.tsx
├── Update ProductsTab.tsx
├── Update OrdersTab.tsx
├── Update CustomersTab.tsx
├── Update AnalyticsTab.tsx
├── Update ReviewsTab.tsx
├── Update PromotionsTab.tsx
├── Update SupportTab.tsx
├── Update SettingsTab.tsx
└── Test all vendor features

Files Modified: 9
Time: 10-12 hours (2 days)
```

#### Day 19: Star Dashboard
```
Tasks:
├── Add StarDashboard.tsx (NEW)
│   ├── Copy from refactored
│   ├── Add creator analytics
│   ├── Add follower management
│   └── Add earnings tracking
└── Test star features

Files Modified: 1
Time: 4-5 hours
```

#### Day 20: Additional Pages
```
Tasks:
├── Add ContactPage.tsx (NEW)
├── Update NotFoundPage.tsx
└── Test utility pages

Files Modified: 2
Time: 2-3 hours
```

#### Day 21: Internationalization
```
Tasks:
├── Extract all hardcoded text
├── Add to EN translation file
├── Add to AR translation file
├── Update all components with useTranslations
└── Test EN/AR switching + RTL

Files Modified: All migrated files
Time: 6-8 hours
```

#### Day 22: Final Testing & Deployment
```
Tasks:
├── Visual testing (all pages, all devices)
├── Functional testing (all features)
├── Run automated tests
├── Fix any issues
├── Build for production
├── Deploy to staging
├── Test staging
└── Deploy to production

Time: Full day
```

---

## 📊 Progress Tracking Template

### Copy this to track your progress:

```
WEEK 1: FOUNDATION & CORE
========================
□ Day 1: Design System (45 files)
  □ globals.css merged
  □ All UI components copied
  □ Theme system tested
  
□ Day 2: Layout (4 files)
  □ TopBar updated
  □ RoleSidebar updated
  □ Logo added
  □ ThemeToggle updated
  
□ Day 3: Auth (3 files)
  □ SignIn updated
  □ SignUp updated
  □ ForgotPassword updated
  □ Auth flows tested
  
□ Day 4: Feeds (4 files)
  □ FeedsPage updated
  □ PostDetailPage updated
  □ CreatePostModal updated
  □ ExplorePage updated
  
□ Day 5: Search/Notifications/Messages (3 files)
  □ SearchModal updated
  □ NotificationsPanel updated
  □ MessagesPage updated

WEEK 2: SOCIAL FEATURES
=======================
□ Day 6: Collections (2 files)
  □ CollectionsPage updated
  □ CollectionDetailPage added
  
□ Day 7: Communities (3 files)
  □ CommunitiesPage updated
  □ CommunityDetailPage added
  □ CreateCommunityPage added
  
□ Day 8: Challenges (2 files)
  □ ChallengesPage updated
  □ ChallengeDetailPage added
  
□ Day 9: Profile (3 files)
  □ ProfilePage updated
  □ ProfileViewPage added
  □ SettingsPage updated
  
□ Day 10: Additional (2 files)
  □ HashtagPage added
  □ SavedPage added

WEEK 3: MARKETPLACE & AI
========================
□ Day 11: Marketplace (2 files)
  □ MarketplacePage updated
  □ ProductDetailPage updated
  
□ Day 12: Vendor/Checkout (2 files)
  □ VendorShopPage added
  □ CheckoutPage added
  
□ Day 13: Wishlist (1 file)
  □ WishlistPage added
  
□ Day 14: AI Hub (4 files)
  □ AIHubPage updated
  □ OutfitGeneratorPage updated
  □ ColorAnalyzerPage updated
  □ ImageGeneratorPage added
  
□ Day 15: Closet (2 files)
  □ MyClosetPage updated
  □ ClosetMixerPage added

WEEK 4: DASHBOARDS & POLISH
===========================
□ Day 16: Owner Dashboard (3 files)
  □ OwnerDashboard updated
  □ UsersTab updated
  □ VendorsTab updated
  
□ Day 17-18: Vendor Dashboard (9 files)
  □ VendorDashboard updated
  □ ProductsTab updated
  □ OrdersTab updated
  □ CustomersTab updated
  □ AnalyticsTab updated
  □ ReviewsTab updated
  □ PromotionsTab updated
  □ SupportTab updated
  □ SettingsTab updated
  
□ Day 19: Star Dashboard (1 file)
  □ StarDashboard added
  
□ Day 20: Additional (2 files)
  □ ContactPage added
  □ NotFoundPage updated
  
□ Day 21: i18n
  □ All text extracted
  □ EN translations added
  □ AR translations added
  □ All components updated
  
□ Day 22: Final Testing
  □ Visual testing complete
  □ Functional testing complete
  □ Automated tests passing
  □ Deployed to staging
  □ Deployed to production

TOTALS:
=======
Files Modified: 70+
New Files Added: 15+
New Routes Added: 10+
Total Estimated Time: 85-105 hours
```

---

## 🎯 Quick Reference: Component Status

### Color Code
- 🟢 **Direct Replace** - Just copy UI
- 🟡 **Merge Required** - Copy UI + Keep backend
- 🔵 **New Addition** - Brand new component
- 🟣 **Skip** - Not needed

### Component List with Status

```
🟢 All UI Components (40+)          - Direct replace
🟢 Logo.tsx                         - New addition
🟢 ThemeToggle.tsx                  - Direct replace
🟡 TopBar.tsx                       - Merge (keep auth)
🟡 RoleSidebar.tsx                  - Merge (keep nav)
🟡 LanguageSwitcher.tsx             - Merge (keep i18n)
🟡 SignIn.tsx                       - Merge (keep Supabase)
🟡 SignUp.tsx                       - Merge (keep Supabase)
🟡 ForgotPassword.tsx               - Merge (keep Supabase)
🟡 FeedsPage.tsx                    - Merge (keep queries)
🟡 PostDetailPage.tsx               - Merge (keep queries)
🟡 CreatePostModal.tsx              - Merge (keep logic)
🟡 ExplorePage.tsx                  - Merge (keep queries)
🟡 SearchModal.tsx                  - Merge (keep search)
🟡 NotificationsPanel.tsx           - Merge (keep real-time)
🟡 MessagesPage.tsx                 - Merge (keep real-time)
🟡 CollectionsPage.tsx              - Merge (keep queries)
🔵 CollectionDetailPage.tsx         - New + integrate
🟡 CommunitiesPage.tsx              - Merge (keep queries)
🔵 CommunityDetailPage.tsx          - New + integrate
🔵 CreateCommunityPage.tsx          - New + integrate
🟡 ChallengesPage.tsx               - Merge (keep queries)
🔵 ChallengeDetailPage.tsx          - New + integrate
🟡 ProfilePage.tsx                  - Merge (keep queries)
🔵 ProfileViewPage.tsx              - New + integrate
🟡 SettingsPage.tsx                 - Merge (keep settings)
🔵 HashtagPage.tsx                  - New + integrate
🔵 SavedPage.tsx                    - New + integrate
🟡 MarketplacePage.tsx              - Merge (keep queries)
🟡 ProductDetailPage.tsx            - Merge (keep queries)
🔵 VendorShopPage.tsx               - New + integrate
🔵 CheckoutPage.tsx                 - New + integrate
🔵 WishlistPage.tsx                 - New + integrate
🟡 AIHubPage.tsx                    - Merge (keep AI logic)
🟡 OutfitGeneratorPage.tsx          - Merge (keep AI logic)
🟡 ColorAnalyzerPage.tsx            - Merge (keep analyzer)
🔵 ImageGeneratorPage.tsx           - New + integrate
🟡 MyClosetPage.tsx                 - Merge (keep queries)
🔵 ClosetMixerPage.tsx              - New + integrate
🟡 OwnerDashboard.tsx               - Merge (keep admin)
🟡 UsersTab.tsx                     - Merge (keep management)
🟡 VendorsTab.tsx                   - Merge (keep management)
🟡 VendorDashboard.tsx              - Merge (keep vendor)
🟡 ProductsTab.tsx                  - Merge (keep product mgmt)
🟡 OrdersTab.tsx                    - Merge (keep orders)
🟡 CustomersTab.tsx                 - Merge (keep customers)
🟡 AnalyticsTab.tsx                 - Merge (keep analytics)
🟡 ReviewsTab.tsx                   - Merge (keep reviews)
🟡 PromotionsTab.tsx                - Merge (keep promotions)
🟡 SupportTab.tsx                   - Merge (keep support)
🟡 SettingsTab.tsx                  - Merge (keep settings)
🔵 StarDashboard.tsx                - New + integrate
🔵 ContactPage.tsx                  - New + integrate
🟢 NotFoundPage.tsx                 - Direct replace
🟣 ZokaiHubShowcase.tsx             - Skip (demo only)
🟣 ImageCropExamplesPage.tsx        - Skip (demo only)
🟣 WheelPickerDemo.tsx              - Skip (demo only)
```

---

## 📞 Need Help?

Refer back to:
- **[README_MIGRATION.md](README_MIGRATION.md)** - Overview
- **[MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)** - Detailed steps
- **[QUICK_START.md](QUICK_START.md)** - Quick commands
- **[COMPARISON_MATRIX.md](COMPARISON_MATRIX.md)** - Full comparison

---

**This roadmap gives you the complete path from start to finish. Follow it step-by-step and you'll successfully migrate the entire design system!** 🚀
