import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronLeft, MoreHorizontal, AlertCircle, Plus, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { formatRelativeTime } from '../../lib/format-time';

type TabKey = 'feed' | 'members' | 'about';
type LoadingState = 'idle' | 'loading' | 'success' | 'error';

type Post = {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  image?: string;
  createdAt: number;
};

type Community = {
  id: string;
  name: string;
  banner: string;
  members: number;
  postsCount: number;
  description: string;
  rules: string[];
  isJoined: boolean;
  posts: Post[];
};

export default function MobileCommunityDetailPage() {
  const t = useTranslations('communityDetail');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [activeTab, setActiveTab] = useState<TabKey>('feed');
  const [community, setCommunity] = useState<Community | null>(null);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingState('success');
      // TODO(integration): replace with community API
      setCommunity({
        id: 'c1',
        name: 'Sustainable Fashion',
        banner: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=400&fit=crop',
        members: 12450,
        postsCount: 1240,
        description:
          'A community of fashion enthusiasts committed to ethical, sustainable, and slow fashion. Share finds, brands, and tips.',
        rules: [
          'Be kind and respectful',
          'No spam or self-promotion',
          'Stay on topic',
          'Credit original creators',
        ],
        isJoined: true,
        posts: [
          {
            id: 'p1',
            authorName: 'Sarah Chen',
            authorAvatar:
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
            content: 'Just thrifted this gorgeous wool coat for $40! 🌿',
            image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600',
            createdAt: Date.now() - 2 * 60 * 60 * 1000,
          },
          {
            id: 'p2',
            authorName: 'Alex Morgan',
            authorAvatar:
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
            content: "What are your favorite slow-fashion brands? Building my list.",
            createdAt: Date.now() - 6 * 60 * 60 * 1000,
          },
        ],
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRetry = () => {
    setLoadingState('loading');
    setTimeout(() => setLoadingState('success'), 1500);
  };

  const handleToggleJoin = () => {
    if (!community) return;
    setCommunity({ ...community, isJoined: !community.isJoined });
  };

  const formatNumber = (n: number) =>
    new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(n);

  const renderLoading = () => (
    <div>
      <Skeleton className="w-full h-32" />
      <div className="px-4 py-4 space-y-3">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-10 w-full rounded-full" />
      </div>
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

  const renderTabContent = () => {
    if (!community) return null;

    if (activeTab === 'feed') {
      if (community.posts.length === 0) {
        return (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <MessageCircle className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold mb-2">{t('empty.title')}</h2>
            <p className="text-muted-foreground mb-6 max-w-sm">{t('empty.description')}</p>
            <Button className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11">
              <Plus className="w-4 h-4 me-2" />
              {t('empty.cta')}
            </Button>
          </div>
        );
      }
      return (
        <div className="divide-y divide-border">
          {community.posts.map((post) => (
            <article key={post.id} className="px-4 py-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  <ImageWithFallback
                    src={post.authorAvatar}
                    alt={post.authorName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{post.authorName}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatRelativeTime(post.createdAt, locale)}
                  </p>
                </div>
              </div>
              <p className="text-sm">{post.content}</p>
              {post.image && (
                <div className="w-full aspect-square rounded-lg overflow-hidden bg-muted">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.content.slice(0, 80)}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      );
    }

    if (activeTab === 'about') {
      return (
        <div className="px-4 py-6 space-y-6">
          <p className="text-sm leading-relaxed">{community.description}</p>
          <div className="space-y-3">
            <h3 className="font-semibold">{t('rules')}</h3>
            <ol className="space-y-2 list-decimal list-inside">
              {community.rules.map((rule, i) => (
                <li key={i} className="text-sm text-muted-foreground">
                  {rule}
                </li>
              ))}
            </ol>
          </div>
        </div>
      );
    }

    // members
    return (
      <div className="px-4 py-6">
        {/* TODO(integration): replace with members API + paginated list */}
        <p className="text-sm text-muted-foreground text-center">
          {t('members', { count: formatNumber(community.members) })}
        </p>
      </div>
    );
  };

  const renderContent = () => {
    if (!community) return null;
    return (
      <>
        <div className="w-full h-32 bg-muted">
          <ImageWithFallback
            src={community.banner}
            alt={community.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="px-4 py-4 space-y-3">
          <h1 className="text-xl font-bold">{community.name}</h1>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{t('members', { count: formatNumber(community.members) })}</span>
            <span>·</span>
            <span>{t('posts', { count: formatNumber(community.postsCount) })}</span>
          </div>
          <Button
            onClick={handleToggleJoin}
            className={`w-full min-h-11 ${
              community.isJoined
                ? 'bg-muted text-foreground hover:bg-muted/80 active:bg-muted/70'
                : 'gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80'
            }`}
          >
            {community.isJoined ? t('joined') : t('join')}
          </Button>
        </div>

        <div className="border-t border-b border-border grid grid-cols-3 sticky top-0 bg-background z-30">
          {(['feed', 'members', 'about'] as TabKey[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              aria-current={activeTab === tab ? 'page' : undefined}
              className={`min-h-11 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground active:text-foreground'
              }`}
            >
              {t(`tabs.${tab}`)}
            </button>
          ))}
        </div>

        {renderTabContent()}
      </>
    );
  };

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur border-b border-border pt-[env(safe-area-inset-top)] px-2 py-2 flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full min-h-11 min-w-11"
          aria-label={tCommon('back')}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className="flex-1 font-semibold text-lg truncate">{community?.name ?? ''}</h1>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full min-h-11 min-w-11"
          aria-label={t('moreOptionsAria')}
        >
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </header>

      <div className="flex-1 overflow-y-auto pb-[env(safe-area-inset-bottom)]">
        {loadingState === 'loading' && renderLoading()}
        {loadingState === 'error' && renderError()}
        {loadingState === 'success' && renderContent()}
      </div>
    </div>
  );
}
