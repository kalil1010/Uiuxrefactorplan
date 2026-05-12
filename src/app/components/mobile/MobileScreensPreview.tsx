import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { DrawerContainerProvider } from '../ui/drawer';
import { AlertDialogContainerProvider } from '../ui/alert-dialog';
import MobileSplashScreen from './MobileSplashScreen';
import MobileLandingPage from './MobileLandingPage';
import MobileSignIn from './MobileSignIn';
import MobileSignUp from './MobileSignUp';
import MobileForgotPassword from './MobileForgotPassword';
import MobileAgreementDialog from './MobileAgreementDialog';
import MobileStyleSetup from './MobileStyleSetup';
import MobileBirthdayPicker from './MobileBirthdayPicker';
import MobileFeedsPage from './MobileFeedsPage';
import MobileExplorePage from './MobileExplorePage';
import MobileClosetPage from './MobileClosetPage';
import MobileMessagesPage from './MobileMessagesPage';
import MobileProfilePage from './MobileProfilePage';
import MobileAIHubPage from './MobileAIHubPage';
import MobileServiceSelection from './MobileServiceSelection';
import MobileCameraScreen from './MobileCameraScreen';
import MobileAnalyzingScreen from './MobileAnalyzingScreen';
import MobilePreviewScreen from './MobilePreviewScreen';
import MobileVirtualStylist from './MobileVirtualStylist';
import MobileAiToolEntryPage from './MobileAiToolEntryPage';
import MobileMarketplacePage from './MobileMarketplacePage';
import MobileProductDetailPage from './MobileProductDetailPage';
import MobileVendorShopPage from './MobileVendorShopPage';
import MobileWishlistPage from './MobileWishlistPage';
import MobileCheckoutPage from './MobileCheckoutPage';
import MobileOrderConfirmation from './MobileOrderConfirmation';
import MobileCommunitiesPage from './MobileCommunitiesPage';
import MobileCommunityDetailPage from './MobileCommunityDetailPage';
import MobileCreateCommunityPage from './MobileCreateCommunityPage';
import MobileCollectionsPage from './MobileCollectionsPage';
import MobileCollectionDetailPage from './MobileCollectionDetailPage';
import MobileChallengesPage from './MobileChallengesPage';
import MobileChallengeDetailPage from './MobileChallengeDetailPage';
import MobileSavedPage from './MobileSavedPage';
import MobileCreatePostModal from './MobileCreatePostModal';
import MobileNotificationsPage from './MobileNotificationsPage';
import MobileSettingsPage from './MobileSettingsPage';
import MobileEditProfileSheet from './MobileEditProfileSheet';
import MobileLanguageSwitcher from './MobileLanguageSwitcher';
import MobileThemeSwitcher from './MobileThemeSwitcher';
import MobileContactPage from './MobileContactPage';
import MobileNotFoundPage from './MobileNotFoundPage';
import MobileOfflineState from './MobileOfflineState';

type ScreenDef = {
  id: string;
  label: string;
  group: string;
  render: () => React.ReactNode;
};

function applyPreviewTheme(theme: 'light' | 'dark' | 'system') {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (theme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', prefersDark);
  }
}

/** Settings is the single entry for language + theme in the wireframe. */
function SettingsScreenWrapper() {
  const [langOpen, setLangOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [themeSheetKey, setThemeSheetKey] = useState(0);

  const themeSheetCurrent =
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light';

  return (
    <>
      <MobileSettingsPage
        onOpenLanguage={() => setLangOpen(true)}
        onOpenTheme={() => {
          setThemeSheetKey((k) => k + 1);
          setThemeOpen(true);
        }}
      />
      <MobileLanguageSwitcher
        isOpen={langOpen}
        onClose={() => setLangOpen(false)}
        onSelect={(loc) => {
          (window as any).__setAppLocale?.(loc);
        }}
      />
      <MobileThemeSwitcher
        key={themeSheetKey}
        isOpen={themeOpen}
        onClose={() => setThemeOpen(false)}
        current={themeSheetCurrent}
        onSelect={(key) => {
          applyPreviewTheme(key);
        }}
      />
    </>
  );
}

const SCREENS: ScreenDef[] = [
  // Pre-auth & Landing
  { id: 'splash', label: 'Splash', group: 'Pre-auth', render: () => <MobileSplashScreen /> },
  {
    id: 'landing',
    label: 'Landing',
    group: 'Pre-auth',
    render: () => <MobileLandingPage onSignIn={() => {}} onSignUp={() => {}} />,
  },
  {
    id: 'signIn',
    label: 'Sign In',
    group: 'Pre-auth',
    render: () => (
      <MobileSignIn
        onBack={() => {}}
        onSignIn={() => {}}
        onForgotPassword={() => {}}
        onSignUp={() => {}}
      />
    ),
  },
  {
    id: 'signUp',
    label: 'Sign Up',
    group: 'Pre-auth',
    render: () => <MobileSignUp onBack={() => {}} onSignUp={() => {}} onSignIn={() => {}} />,
  },
  {
    id: 'forgotPassword',
    label: 'Forgot Password',
    group: 'Pre-auth',
    render: () => <MobileForgotPassword onBack={() => {}} />,
  },
  {
    id: 'agreement',
    label: 'Agreement Dialog',
    group: 'Pre-auth',
    render: () => (
      <AgreementWrapper />
    ),
  },

  // Onboarding
  {
    id: 'styleSetup',
    label: 'Style Setup',
    group: 'Onboarding',
    render: () => <MobileStyleSetup onComplete={() => {}} onBack={() => {}} />,
  },
  {
    id: 'birthdayPicker',
    label: 'Birthday Picker',
    group: 'Onboarding',
    render: () => <BirthdayPickerWrapper />,
  },

  // Main tabs
  { id: 'feeds', label: 'Feeds', group: 'Main Tabs', render: () => <MobileFeedsPage /> },
  { id: 'explore', label: 'Explore', group: 'Main Tabs', render: () => <MobileExplorePage /> },
  { id: 'closet', label: 'Closet', group: 'Main Tabs', render: () => <MobileClosetPage /> },
  { id: 'messages', label: 'Messages', group: 'Main Tabs', render: () => <MobileMessagesPage /> },
  { id: 'profile', label: 'Profile', group: 'Main Tabs', render: () => <MobileProfilePage /> },

  // AI features
  { id: 'aiHub', label: 'AI Hub', group: 'AI', render: () => <MobileAIHubPage /> },
  {
    id: 'serviceSelection',
    label: 'Service Selection',
    group: 'AI',
    render: () => <MobileServiceSelection />,
  },
  { id: 'camera', label: 'Camera', group: 'AI', render: () => <MobileCameraScreen /> },
  { id: 'analyzing', label: 'Analyzing', group: 'AI', render: () => <MobileAnalyzingScreen /> },
  { id: 'previewResult', label: 'Preview Result', group: 'AI', render: () => <MobilePreviewScreen /> },
  {
    id: 'virtualStylist',
    label: 'AI Stylist',
    group: 'AI',
    render: () => <MobileVirtualStylist />,
  },
  {
    id: 'hairStylist',
    label: 'Hair stylist',
    group: 'AI',
    render: () => <MobileAiToolEntryPage tool="hairStylist" />,
  },
  {
    id: 'nailStylist',
    label: 'Nail stylist',
    group: 'AI',
    render: () => <MobileAiToolEntryPage tool="nailStylist" />,
  },
  {
    id: 'virtualTryOn',
    label: 'Virtual try-on',
    group: 'AI',
    render: () => <MobileAiToolEntryPage tool="virtualTryOn" />,
  },

  // Marketplace
  {
    id: 'marketplace',
    label: 'Marketplace',
    group: 'Marketplace',
    render: () => <MobileMarketplacePage />,
  },
  {
    id: 'productDetail',
    label: 'Product Detail',
    group: 'Marketplace',
    render: () => <MobileProductDetailPage />,
  },
  {
    id: 'vendorShop',
    label: 'Vendor Shop',
    group: 'Marketplace',
    render: () => <MobileVendorShopPage />,
  },
  {
    id: 'wishlist',
    label: 'Wishlist',
    group: 'Marketplace',
    render: () => <MobileWishlistPage />,
  },
  { id: 'checkout', label: 'Checkout', group: 'Marketplace', render: () => <MobileCheckoutPage /> },
  {
    id: 'orderConfirm',
    label: 'Order Confirmation',
    group: 'Marketplace',
    render: () => <MobileOrderConfirmation />,
  },

  // Social
  {
    id: 'communities',
    label: 'Communities',
    group: 'Social',
    render: () => <MobileCommunitiesPage />,
  },
  {
    id: 'communityDetail',
    label: 'Community Detail',
    group: 'Social',
    render: () => <MobileCommunityDetailPage />,
  },
  {
    id: 'createCommunity',
    label: 'Create Community',
    group: 'Social',
    render: () => <MobileCreateCommunityPage />,
  },
  {
    id: 'collections',
    label: 'Collections',
    group: 'Social',
    render: () => <MobileCollectionsPage />,
  },
  {
    id: 'collectionDetail',
    label: 'Collection Detail',
    group: 'Social',
    render: () => <MobileCollectionDetailPage />,
  },
  { id: 'challenges', label: 'Challenges', group: 'Social', render: () => <MobileChallengesPage /> },
  {
    id: 'challengeDetail',
    label: 'Challenge Detail',
    group: 'Social',
    render: () => <MobileChallengeDetailPage />,
  },
  { id: 'saved', label: 'Saved', group: 'Social', render: () => <MobileSavedPage /> },

  // Creation
  {
    id: 'createPost',
    label: 'Create Post Modal',
    group: 'Creation',
    render: () => <CreatePostWrapper />,
  },

  // System
  {
    id: 'notifications',
    label: 'Notifications',
    group: 'System',
    render: () => <MobileNotificationsPage />,
  },
  { id: 'settings', label: 'Settings', group: 'System', render: () => <SettingsScreenWrapper /> },
  {
    id: 'editProfile',
    label: 'Edit Profile Sheet',
    group: 'System',
    render: () => <EditProfileWrapper />,
  },
  { id: 'contact', label: 'Contact', group: 'System', render: () => <MobileContactPage /> },
  { id: 'notFound', label: '404', group: 'System', render: () => <MobileNotFoundPage /> },
  { id: 'offline', label: 'Offline', group: 'System', render: () => <MobileOfflineState /> },
];

// --- Sheet wrappers (these are bottom sheets that need an open state) ---

function AgreementWrapper() {
  const [open, setOpen] = useState(true);
  return (
    <div className="h-full w-full flex items-center justify-center bg-muted/30 text-sm text-muted-foreground">
      Tap below to re-open the sheet
      <button className="ms-2 underline" onClick={() => setOpen(true)}>
        Open
      </button>
      <MobileAgreementDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        onAccept={() => setOpen(false)}
        onDecline={() => setOpen(false)}
      />
    </div>
  );
}

function BirthdayPickerWrapper() {
  const [open, setOpen] = useState(true);
  return (
    <div className="h-full w-full flex items-center justify-center bg-muted/30">
      <button
        className="px-4 py-2 rounded-full gradient-bg text-primary-foreground"
        onClick={() => setOpen(true)}
      >
        Open Birthday Picker
      </button>
      <MobileBirthdayPicker
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      />
    </div>
  );
}

function CreatePostWrapper() {
  const [open, setOpen] = useState(true);
  return (
    <div className="h-full w-full flex items-center justify-center bg-muted/30">
      <button
        className="px-4 py-2 rounded-full gradient-bg text-primary-foreground"
        onClick={() => setOpen(true)}
      >
        Open Create Post
      </button>
      <MobileCreatePostModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={async () => setOpen(false)}
      />
    </div>
  );
}

function EditProfileWrapper() {
  const [open, setOpen] = useState(true);
  return (
    <div className="h-full w-full flex items-center justify-center bg-muted/30">
      <button
        className="px-4 py-2 rounded-full gradient-bg text-primary-foreground"
        onClick={() => setOpen(true)}
      >
        Open Edit Profile
      </button>
      <MobileEditProfileSheet
        isOpen={open}
        onClose={() => setOpen(false)}
        initial={{
          avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
          displayName: 'Sarah Chen',
          username: 'sarahc',
          bio: 'Fashion & Lifestyle 🌸',
          website: 'linktr.ee/sarahchen',
        }}
        onSave={async () => setOpen(false)}
      />
    </div>
  );
}

// --- Top-level Preview UI ---

export default function MobileScreensPreview() {
  const [activeId, setActiveId] = useState<string>(SCREENS[0].id);
  const locale = useLocale();
  const [platform, setPlatform] = useState<'ios' | 'android'>('ios');
  const phoneRef = useRef<HTMLDivElement>(null);
  const [phoneEl, setPhoneEl] = useState<HTMLElement | null>(null);

  // Keep portal container in sync when the phone frame remounts (screen / locale / platform)
  useEffect(() => {
    setPhoneEl(phoneRef.current);
  }, [activeId, locale, platform]);

  const groups = useMemo(() => {
    const map = new Map<string, ScreenDef[]>();
    for (const s of SCREENS) {
      if (!map.has(s.group)) map.set(s.group, []);
      map.get(s.group)!.push(s);
    }
    return Array.from(map.entries());
  }, []);

  const active = SCREENS.find((s) => s.id === activeId)!;

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-80 bg-white dark:bg-gray-800 border-b lg:border-b-0 lg:border-e border-gray-200 dark:border-gray-700 lg:max-h-screen lg:overflow-y-auto flex-shrink-0">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <h1 className="text-lg font-bold mb-1">ZokaiHub Mobile</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            {SCREENS.length} screens · click to preview
          </p>

          {/* Device frame (locale & theme: Settings inside the phone preview) */}
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-1 bg-gray-100 dark:bg-gray-900 rounded-full p-1">
              <button
                type="button"
                data-testid="preview-platform-ios"
                className={`text-xs font-semibold py-1.5 rounded-full transition-colors ${
                  platform === 'ios' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-500'
                }`}
                onClick={() => setPlatform('ios')}
              >
                iOS
              </button>
              <button
                type="button"
                data-testid="preview-platform-android"
                className={`text-xs font-semibold py-1.5 rounded-full transition-colors ${
                  platform === 'android' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-500'
                }`}
                onClick={() => setPlatform('android')}
              >
                Android
              </button>
            </div>
          </div>
        </div>

        {/* Screen list */}
        <div className="p-2">
          {groups.map(([group, screens]) => (
            <div key={group} className="mb-4">
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-3 py-2">
                {group}
              </h2>
              <ul className="space-y-1">
                {screens.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => setActiveId(s.id)}
                      aria-current={activeId === s.id ? 'page' : undefined}
                      data-screen-id={s.id}
                      data-screen-group={s.group}
                      data-screen-label={s.label}
                      className={`w-full text-start px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeId === s.id
                          ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-medium'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Phone preview */}
      <main className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            <span className="font-semibold">{active.group}</span> · {active.label}
          </p>
          {/* Phone frame — iOS (notch) vs Android (punch-hole, tighter radius) */}
          <div
            className={
              platform === 'ios'
                ? 'relative bg-gray-900 rounded-[44px] p-2 shadow-2xl'
                : 'relative rounded-[32px] p-[10px] shadow-2xl bg-[#2d2d2d] ring-1 ring-black/40'
            }
            data-testid="phone-shell"
          >
            {platform === 'ios' ? (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-3xl z-[60]" />
            ) : (
              <div className="absolute top-[14px] left-1/2 -translate-x-1/2 z-[60] flex items-center justify-center">
                <div className="h-[10px] w-[10px] rounded-full bg-black ring-2 ring-[#2d2d2d]" aria-hidden />
              </div>
            )}
            <div
              ref={phoneRef}
              data-testid="phone-frame"
              className={
                platform === 'ios'
                  ? // Inset below decorative notch/island so centered header logos aren’t clipped
                    'relative flex min-h-0 flex-col overflow-hidden rounded-[36px] bg-background pt-8'
                  : // Clear punch-hole + status band for centered top bars
                    'relative flex min-h-0 flex-col overflow-hidden rounded-[22px] bg-background pt-4'
              }
              style={{
                width: platform === 'ios' ? 393 : 412,
                height: platform === 'ios' ? 852 : 892,
                // translateZ creates a containing block so position:fixed
                // descendants (BottomNav, sticky CTAs) stay inside the frame.
                transform: 'translateZ(0)',
              }}
              key={`${active.id}-${locale}-${platform}`}
            >
              <DrawerContainerProvider value={phoneEl}>
                <AlertDialogContainerProvider value={phoneEl}>
                  {active.render()}
                </AlertDialogContainerProvider>
              </DrawerContainerProvider>
            </div>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
            {platform === 'ios' ? 'iPhone 15 Pro · 393 × 852' : 'Android reference · 412 × 892'}
          </p>
        </div>
      </main>
    </div>
  );
}
