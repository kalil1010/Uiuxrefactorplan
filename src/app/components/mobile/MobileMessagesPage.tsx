import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { RefreshCw, AlertCircle, Search, Edit, MoreHorizontal, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { formatRelativeTime } from '../../lib/format-time';
import MobileBottomNav from './MobileBottomNav';
import { MobileHeaderIconActions } from './MobileMainTopBar';

type LoadingState = 'idle' | 'loading' | 'success' | 'error' | 'empty';

type Conversation = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  lastMessage: string;
  lastMessageAt: number;
  unread: number;
  online: boolean;
};

export default function MobileMessagesPage() {
  const t = useTranslations('messages');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  // Simulate data fetch
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingState('success');
      // TODO(integration): replace with actual conversation data from API
      setConversations([
        {
          id: '1',
          user: { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
          lastMessage: 'Love your new outfit! Where did you get it?',
          lastMessageAt: Date.now() - 2 * 60 * 1000,
          unread: 2,
          online: true,
        },
        {
          id: '2',
          user: { name: 'Alex Morgan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
          lastMessage: 'Thanks for the styling tips!',
          lastMessageAt: Date.now() - 1 * 60 * 60 * 1000,
          unread: 0,
          online: true,
        },
        {
          id: '3',
          user: { name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
          lastMessage: 'Check out this collection 👀',
          lastMessageAt: Date.now() - 3 * 60 * 60 * 1000,
          unread: 1,
          online: false,
        },
        {
          id: '4',
          user: { name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
          lastMessage: 'The dress looks amazing!',
          lastMessageAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
          unread: 0,
          online: false,
        },
        {
          id: '5',
          user: { name: 'Sophie Taylor', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
          lastMessage: 'Can you share the link?',
          lastMessageAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
          unread: 0,
          online: true,
        },
      ]);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleRetry = () => {
    setLoadingState('loading');
    setTimeout(() => setLoadingState('success'), 1500);
  };

  const renderLoadingState = () => (
    <div className="px-4 py-6 space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="w-14 h-14 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-full" />
          </div>
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      ))}
    </div>
  );

  const renderEmptyState = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
        <MessageCircle className="w-10 h-10 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-bold mb-2">{t('empty.title')}</h2>
      <p className="text-muted-foreground mb-6 max-w-sm">{t('empty.description')}</p>
      <Button className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 rounded-full">
        <Edit className="w-4 h-4 me-2" />
        {t('empty.cta')}
      </Button>
    </div>
  );

  const renderErrorState = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
        <AlertCircle className="w-10 h-10 text-destructive" />
      </div>
      <h2 className="text-xl font-bold mb-2">{t('error.title')}</h2>
      <p className="text-muted-foreground mb-6 max-w-sm">{t('error.description')}</p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Button
          onClick={handleRetry}
          className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80"
        >
          {t('error.retry')}
        </Button>
        <Button variant="outline" className="active:bg-muted">
          {t('error.goHome')}
        </Button>
      </div>
    </div>
  );

  const renderConversations = () => (
    <div className="flex-1 overflow-y-auto">
      {conversations.map((conv) => (
        <div
          key={conv.id}
          className="flex items-center gap-3 p-4 hover:bg-muted/50 active:bg-muted cursor-pointer border-b transition-colors min-h-[80px]"
        >
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-muted">
              <ImageWithFallback
                src={conv.user.avatar}
                alt={conv.user.name}
                className="w-full h-full object-cover"
              />
            </div>
            {conv.online && (
              <div
                className="absolute bottom-0 end-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background"
                aria-label={t('onlineStatus')}
              />
            )}
          </div>

          {/* Message Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <p className="font-semibold text-sm truncate">{conv.user.name}</p>
              <span className="text-xs text-muted-foreground flex-shrink-0">{formatRelativeTime(conv.lastMessageAt, locale)}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm text-muted-foreground truncate flex-1">
                {conv.lastMessage}
              </p>
              {conv.unread > 0 && (
                <Badge className="gradient-bg text-white border-0 text-xs h-5 min-w-5 flex items-center justify-center px-1.5">
                  {conv.unread.toLocaleString(locale)}
                </Badge>
              )}
            </div>
          </div>

          {/* More Options */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 min-h-11 min-w-11 flex-shrink-0"
            aria-label={t('moreOptionsAria')}
          >
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
      {/* Header with Safe Area */}
      <header className="sticky top-0 z-40 bg-background border-b border-border pt-[env(safe-area-inset-top)] px-4 pb-3">
        <div className="mb-3 flex min-h-11 items-center justify-between gap-2">
          <h1 className="truncate text-lg font-semibold">{t('title')}</h1>
          <div className="flex shrink-0 items-center gap-0.5">
            <MobileHeaderIconActions
              showSearch={false}
              onNotifications={() => {
                // TODO(integration): open notifications inbox
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full min-h-11 min-w-11"
              aria-label={t('newMessageAria')}
            >
              <Edit className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            inputMode="search"
            placeholder={t('searchPlaceholder')}
            className="ps-10 rounded-full bg-muted border-0 min-h-11"
            enterKeyHint="search"
          />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-hidden pb-[calc(4rem+env(safe-area-inset-bottom))]">
        {/* Pull-to-refresh indicator */}
        {isRefreshing && (
          <div className="flex items-center justify-center py-4">
            <RefreshCw className="w-5 h-5 animate-spin text-primary" />
          </div>
        )}

        {loadingState === 'loading' && renderLoadingState()}
        {loadingState === 'empty' && renderEmptyState()}
        {loadingState === 'error' && renderErrorState()}
        {loadingState === 'success' && renderConversations()}
      </div>

      {/* Bottom Navigation */}
      <MobileBottomNav
        activeTab={null}
        onTabChange={(tab) => {
          // TODO(integration): wire to next-intl router
          // router.push(`/${tab}`)
        }}
        onCreatePost={() => {
          // TODO(integration): open create-post flow / composer
        }}
      />
    </div>
  );
}
