import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { AlertCircle, Settings, Grid3x3, Bookmark, Heart, ChevronLeft, MoreHorizontal, UserPlus } from 'lucide-react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import MobileBottomNav from './MobileBottomNav';
import { MobileHeaderIconActions } from './MobileMainTopBar';

type TabType = 'posts' | 'saved' | 'liked';
type LoadingState = 'idle' | 'loading' | 'success' | 'error' | 'empty';

type Post = {
  id: string;
  image: string;
};

export default function MobileProfilePage() {
  const t = useTranslations('profile');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [activeTab, setActiveTab] = useState<TabType>('posts');
  const [posts, setPosts] = useState<Post[]>([]);

  const stats = [
    { labelKey: 'posts' as const, value: 127 },
    { labelKey: 'followers' as const, value: 2400 },
    { labelKey: 'following' as const, value: 892 },
  ];

  // Simulate data fetch
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingState('success');
      // TODO(integration): replace with actual post data from API
      setPosts(
        Array.from({ length: 12 }, (_, i) => ({
          id: `post-${i + 1}`,
          image: `https://images.unsplash.com/photo-${1490481651871 + i * 1000}?w=300&h=300&fit=crop`,
        }))
      );
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRetry = () => {
    setLoadingState('loading');
    setTimeout(() => setLoadingState('success'), 1500);
  };

  const formatNumber = (num: number): string => {
    const compactFormatter = new Intl.NumberFormat(locale, {
      notation: 'compact',
      maximumFractionDigits: 1,
    });
    return compactFormatter.format(num);
  };

  const renderLoadingState = () => (
    <div className="px-6 py-6 space-y-6">
      {/* Profile header skeleton */}
      <div className="flex items-center gap-6">
        <Skeleton className="w-24 h-24 rounded-full" />
        <div className="flex-1 grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center">
              <Skeleton className="h-6 w-12 mx-auto mb-1" />
              <Skeleton className="h-3 w-16 mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Bio skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>

      {/* Posts grid skeleton */}
      <div className="grid grid-cols-3 gap-1">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="aspect-square" />
        ))}
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
        <Grid3x3 className="w-10 h-10 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-bold mb-2">{t('empty.title')}</h2>
      <p className="text-muted-foreground mb-6 max-w-sm">{t('empty.description')}</p>
      <Button className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80">
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

  const renderContent = () => (
    <>
      {/* Profile Header */}
      <div className="p-6 space-y-4">
        <div>
          <p className="text-xl font-bold">Sarah Chen</p>
          <p className="text-sm text-muted-foreground">@sarahc</p>
        </div>
        {/* Avatar & Stats */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full gradient-bg-purple-pink p-1">
            <div className="w-full h-full rounded-full border-2 border-background overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
                alt="Sarah Chen"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 grid grid-cols-3 gap-4 text-center">
            {stats.map((stat) => (
              <div key={stat.labelKey}>
                <p className="font-bold text-lg">{formatNumber(stat.value)}</p>
                <p className="text-xs text-muted-foreground">{t(`stats.${stat.labelKey}`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bio */}
        {/* TODO(integration): replace with actual user bio from API */}
        <div>
          <p className="font-semibold mb-1">Fashion & Lifestyle 🌸</p>
          <p className="text-sm text-muted-foreground mb-2">
            Sharing my daily outfits & styling tips ✨
            <br />
            📍 New York City
            <br />
            👗 Fashion Designer
          </p>
          <a href="#" className="text-sm text-primary font-medium">
            linktr.ee/sarahchen
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button className="flex-1 gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 rounded-full min-h-11">
            <UserPlus className="w-4 h-4 me-2" />
            {t('actions.follow')}
          </Button>
          <Button variant="outline" className="flex-1 rounded-full active:bg-muted min-h-11">
            {t('actions.message')}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full active:bg-muted min-h-11 min-w-11"
            aria-label={t('settingsAria')}
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        {/* Highlights */}
        {/* TODO(integration): replace with actual user highlights from API */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {['Fashion', 'Travel', 'Beauty', 'OOTD'].map((highlight) => (
            <div key={highlight} className="flex-shrink-0 text-center">
              <div className="w-16 h-16 rounded-full bg-muted border-2 mb-1" />
              <p className="text-xs">{highlight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t grid grid-cols-3">
        <button
          className={`py-3 flex items-center justify-center border-b-2 transition-colors min-h-11 ${
            activeTab === 'posts'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground active:text-foreground'
          }`}
          onClick={() => setActiveTab('posts')}
          aria-label={t('tabs.posts')}
          aria-current={activeTab === 'posts' ? 'page' : undefined}
        >
          <Grid3x3 className="w-5 h-5" />
        </button>
        <button
          className={`py-3 flex items-center justify-center border-b-2 transition-colors min-h-11 ${
            activeTab === 'saved'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground active:text-foreground'
          }`}
          onClick={() => setActiveTab('saved')}
          aria-label={t('tabs.saved')}
          aria-current={activeTab === 'saved' ? 'page' : undefined}
        >
          <Bookmark className="w-5 h-5" />
        </button>
        <button
          className={`py-3 flex items-center justify-center border-b-2 transition-colors min-h-11 ${
            activeTab === 'liked'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground active:text-foreground'
          }`}
          onClick={() => setActiveTab('liked')}
          aria-label={t('tabs.liked')}
          aria-current={activeTab === 'liked' ? 'page' : undefined}
        >
          <Heart className="w-5 h-5" />
        </button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-1 p-1">
        {posts.map((post) => (
          <div
            key={post.id}
            className="aspect-square bg-muted cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity"
          >
            <ImageWithFallback
              src={post.image}
              alt={`Post ${post.id}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
      {/* Header with Safe Area */}
      <header className="sticky top-0 z-40 bg-background border-b border-border pt-[env(safe-area-inset-top)] px-4 py-3 flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full min-h-11 min-w-11 shrink-0"
          aria-label={t('backAria')}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <div className="min-w-0 flex-1" />
        <MobileHeaderIconActions
          className="shrink-0"
          onSearch={() => {
            // TODO(integration): open global search / Explore
          }}
          onNotifications={() => {
            // TODO(integration): open notifications
          }}
        />
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full min-h-11 min-w-11 shrink-0"
          aria-label={t('moreOptionsAria')}
        >
          <MoreHorizontal className="w-6 h-6" />
        </Button>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-[calc(4rem+env(safe-area-inset-bottom))]">
        {loadingState === 'loading' && renderLoadingState()}
        {loadingState === 'error' && renderErrorState()}
        {loadingState === 'empty' && renderEmptyState()}
        {loadingState === 'success' && renderContent()}
      </div>

      {/* Bottom Navigation */}
      <MobileBottomNav
        activeTab="profile"
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
