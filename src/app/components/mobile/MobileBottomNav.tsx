import React from 'react';
import { useTranslations } from 'next-intl';
import { Home, Compass, Shirt, MessageCircle, User } from 'lucide-react';
import { cn } from '../ui/utils';

type TabType = 'feeds' | 'explore' | 'closet' | 'messages' | 'profile';

interface MobileBottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  hidden?: boolean;
}

export default function MobileBottomNav({ activeTab, onTabChange, hidden = false }: MobileBottomNavProps) {
  const t = useTranslations('bottomNav');

  const tabs = [
    { id: 'feeds' as TabType, icon: Home, label: t('feeds') },
    { id: 'explore' as TabType, icon: Compass, label: t('explore') },
    { id: 'closet' as TabType, icon: Shirt, label: t('closet') },
    { id: 'messages' as TabType, icon: MessageCircle, label: t('messages') },
    { id: 'profile' as TabType, icon: User, label: t('profile') },
  ];

  if (hidden) return null;

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 bg-background border-t border-border pb-[env(safe-area-inset-bottom)]"
      role="navigation"
      aria-label={t('ariaLabel')}
    >
      <div className="flex items-center justify-around h-14">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'flex flex-col items-center justify-center min-h-11 min-w-11 px-2 gap-0.5 transition-colors active:bg-muted',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground active:text-foreground'
              )}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon
                className={cn('w-5 h-5', isActive ? 'fill-current' : '')}
                strokeWidth={isActive ? 2 : 1.5}
              />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
