import React from 'react';
import { useTranslations } from 'next-intl';
import { Bell, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../ui/utils';

export type MobileMainTopBarProps = {
  /** Screen title on the leading side; omit for icon-only actions */
  title?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
  /** Unread count for notifications badge (wireframe mock) */
  notificationCount?: number;
  onSearch?: () => void;
  onNotifications?: () => void;
  className?: string;
};

export function MobileHeaderIconActions({
  showSearch = true,
  showNotifications = true,
  notificationCount = 3,
  onSearch,
  onNotifications,
  className,
}: Pick<
  MobileMainTopBarProps,
  'showSearch' | 'showNotifications' | 'notificationCount' | 'onSearch' | 'onNotifications' | 'className'
>) {
  const t = useTranslations('mainHeader');

  const showBadge = showNotifications && notificationCount > 0;
  const badgeLabel =
    notificationCount > 99 ? '99+' : notificationCount.toLocaleString();

  return (
    <div className={cn('flex shrink-0 items-center gap-0.5', className)}>
      {showSearch && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="min-h-11 min-w-11 rounded-full"
          aria-label={t('search')}
          onClick={onSearch}
        >
          <Search className="h-5 w-5" strokeWidth={1.5} />
        </Button>
      )}
      {showNotifications && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="relative min-h-11 min-w-11 rounded-full"
          aria-label={t('notifications')}
          onClick={onNotifications}
        >
          <Bell className="h-5 w-5" strokeWidth={1.5} />
          {showBadge && (
            <span
              className="absolute end-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold leading-none text-destructive-foreground"
              aria-hidden
            >
              {badgeLabel}
            </span>
          )}
        </Button>
      )}
    </div>
  );
}

export function MobileMainTopBar({
  title,
  showSearch = true,
  showNotifications = true,
  notificationCount = 3,
  onSearch,
  onNotifications,
  className,
}: MobileMainTopBarProps) {
  return (
    <div className={cn('flex min-h-11 items-center gap-2', className)}>
      {title ? (
        <h1 className="min-w-0 flex-1 truncate text-lg font-semibold">{title}</h1>
      ) : (
        <div className="min-w-0 flex-1" />
      )}
      <MobileHeaderIconActions
        showSearch={showSearch}
        showNotifications={showNotifications}
        notificationCount={notificationCount}
        onSearch={onSearch}
        onNotifications={onNotifications}
      />
    </div>
  );
}
