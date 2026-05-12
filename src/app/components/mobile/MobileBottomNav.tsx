import React from 'react';
import { useTranslations } from 'next-intl';
import { Home, Compass, Shirt, User, Plus } from 'lucide-react';
import { cn } from '../ui/utils';

export type MobileMainTab = 'feeds' | 'explore' | 'closet' | 'profile';

interface MobileBottomNavProps {
  /** Use `null` on secondary routes (e.g. Messages) so no tab shows as current */
  activeTab: MobileMainTab | null;
  onTabChange: (tab: MobileMainTab) => void;
  onCreatePost?: () => void;
  hidden?: boolean;
}

const LEFT_TABS: { id: MobileMainTab; icon: typeof Home; labelKey: 'feeds' | 'explore' }[] = [
  { id: 'feeds', icon: Home, labelKey: 'feeds' },
  { id: 'explore', icon: Compass, labelKey: 'explore' },
];

const RIGHT_TABS: { id: MobileMainTab; icon: typeof Home; labelKey: 'closet' | 'profile' }[] = [
  { id: 'closet', icon: Shirt, labelKey: 'closet' },
  { id: 'profile', icon: User, labelKey: 'profile' },
];

export default function MobileBottomNav({
  activeTab,
  onTabChange,
  onCreatePost,
  hidden = false,
}: MobileBottomNavProps) {
  const t = useTranslations('bottomNav');

  if (hidden) return null;

  const renderTabButton = (tab: (typeof LEFT_TABS)[number] | (typeof RIGHT_TABS)[number]) => {
    const Icon = tab.icon;
    const isActive = activeTab !== null && activeTab === tab.id;
    const label = t(tab.labelKey);

    return (
      <button
        key={tab.id}
        type="button"
        onClick={() => onTabChange(tab.id)}
        className={cn(
          'flex min-h-11 min-w-11 flex-col items-center justify-center gap-0.5 px-2 transition-colors active:bg-muted',
          isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground active:text-foreground'
        )}
        aria-label={label}
        aria-current={isActive ? 'page' : undefined}
      >
        <Icon className={cn('h-5 w-5')} strokeWidth={isActive ? 2 : 1.5} />
        <span className="text-xs font-medium">{label}</span>
      </button>
    );
  };

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background pb-[env(safe-area-inset-bottom)]"
      role="navigation"
      aria-label={t('ariaLabel')}
    >
      <div className="flex h-16 items-end justify-between px-1 pt-1">
        <div className="flex flex-1 justify-around">{LEFT_TABS.map(renderTabButton)}</div>

        <div className="flex w-[4.5rem] shrink-0 flex-col items-center justify-end pb-1">
          <button
            type="button"
            onClick={() => onCreatePost?.()}
            className={cn(
              'flex h-12 w-12 -translate-y-1 items-center justify-center rounded-full shadow-lg',
              'gradient-bg text-primary-foreground',
              'hover:opacity-95 active:opacity-90 active:scale-[0.98]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
            )}
            aria-label={t('createPost')}
          >
            <Plus className="h-6 w-6" strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex flex-1 justify-around">{RIGHT_TABS.map(renderTabButton)}</div>
      </div>
    </nav>
  );
}
