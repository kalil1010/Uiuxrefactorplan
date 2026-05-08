import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Bell, AlertCircle, Heart, MessageCircle, UserPlus, AtSign, Trophy, X, ChevronLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { formatRelativeTime } from '../../lib/format-time';

type TabKey = 'all' | 'mentions' | 'follows';
type NotificationType = 'like' | 'comment' | 'follow' | 'mention' | 'challenge';
type LoadingState = 'idle' | 'loading' | 'success' | 'error';

type Notification = {
  id: string;
  type: NotificationType;
  user?: string;
  userAvatar?: string;
  title?: string;
  postImage?: string;
  createdAt: number;
  read: boolean;
};

const ICONS: Record<NotificationType, React.ComponentType<{ className?: string }>> = {
  like: Heart,
  comment: MessageCircle,
  follow: UserPlus,
  mention: AtSign,
  challenge: Trophy,
};

export default function MobileNotificationsPage() {
  const t = useTranslations('notifications');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [items, setItems] = useState<Notification[]>([]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingState('success');
      // TODO(integration): replace with notifications API
      setItems([
        {
          id: '1',
          type: 'like',
          user: 'Sarah Chen',
          userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
          postImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200',
          createdAt: Date.now() - 5 * 60 * 1000,
          read: false,
        },
        {
          id: '2',
          type: 'comment',
          user: 'Alex Morgan',
          userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
          postImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200',
          createdAt: Date.now() - 30 * 60 * 1000,
          read: false,
        },
        {
          id: '3',
          type: 'follow',
          user: 'Emma Wilson',
          userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
          createdAt: Date.now() - 2 * 60 * 60 * 1000,
          read: true,
        },
        {
          id: '4',
          type: 'mention',
          user: 'David Kim',
          userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
          createdAt: Date.now() - 6 * 60 * 60 * 1000,
          read: true,
        },
        {
          id: '5',
          type: 'challenge',
          title: 'Summer Streetwear',
          createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
          read: true,
        },
      ]);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRetry = () => {
    setLoadingState('loading');
    setTimeout(() => setLoadingState('success'), 1500);
  };

  const handleDismiss = (id: string) => {
    setItems((prev) => prev.filter((n) => n.id !== id));
  };

  const handleMarkAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const visibleItems = items.filter((n) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'mentions') return n.type === 'mention';
    return n.type === 'follow';
  });

  const renderLoading = () => (
    <div className="px-4 py-6 space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderEmpty = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
        <Bell className="w-10 h-10 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-bold mb-2">{t('empty.title')}</h2>
      <p className="text-muted-foreground mb-6 max-w-sm">{t('empty.description')}</p>
      <Button className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11">
        {t('empty.cta')}
      </Button>
    </div>
  );

  const renderError = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
        <AlertCircle className="w-10 h-10 text-destructive" />
      </div>
      <h2 className="text-xl font-bold mb-2">{t('error.title')}</h2>
      <p className="text-muted-foreground mb-6 max-w-sm">{t('error.description')}</p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Button
          onClick={handleRetry}
          className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
        >
          {t('error.retry')}
        </Button>
        <Button variant="outline" className="active:bg-muted min-h-11">
          {t('error.goHome')}
        </Button>
      </div>
    </div>
  );

  const renderContent = () => {
    if (visibleItems.length === 0) return renderEmpty();
    return (
      <div className="divide-y divide-border">
        {visibleItems.map((n) => {
          const Icon = ICONS[n.type];
          const text = t(`types.${n.type}`, { user: n.user ?? '', title: n.title ?? '' });
          return (
            <div
              key={n.id}
              className={`relative flex items-start gap-3 px-4 py-4 hover:bg-muted/50 active:bg-muted transition-colors ${
                !n.read ? 'bg-primary/5' : ''
              }`}
            >
              {n.userAvatar ? (
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  <ImageWithFallback
                    src={n.userAvatar}
                    alt={n.user ?? ''}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute -bottom-1 -end-1 w-5 h-5 rounded-full gradient-bg flex items-center justify-center">
                    <Icon className="w-3 h-3 text-primary-foreground" />
                  </div>
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full gradient-bg-purple-pink flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm">{text}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {formatRelativeTime(n.createdAt, locale)}
                </p>
              </div>
              {n.postImage && (
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <ImageWithFallback
                    src={n.postImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full min-h-11 min-w-11 -my-2 -me-2 active:bg-muted"
                aria-label={t('dismissAria')}
                onClick={() => handleDismiss(n.id)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
      <header className="sticky top-0 z-40 bg-background border-b border-border pt-[env(safe-area-inset-top)] px-2 pb-0 flex flex-col">
        <div className="flex items-center gap-1 py-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full min-h-11 min-w-11"
            aria-label={tCommon('back')}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="flex-1 font-semibold text-lg">{t('title')}</h1>
          <Button
            variant="ghost"
            className="text-sm text-primary active:bg-muted min-h-11"
            onClick={handleMarkAllRead}
          >
            {t('markAllRead')}
          </Button>
        </div>
        <div className="grid grid-cols-3">
          {(['all', 'mentions', 'follows'] as TabKey[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              aria-current={activeTab === tab ? 'page' : undefined}
              className={`min-h-11 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground active:text-foreground'
              }`}
            >
              {t(`tabs.${tab}`)}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pb-[env(safe-area-inset-bottom)]">
        {loadingState === 'loading' && renderLoading()}
        {loadingState === 'error' && renderError()}
        {loadingState === 'success' && renderContent()}
      </div>
    </div>
  );
}
