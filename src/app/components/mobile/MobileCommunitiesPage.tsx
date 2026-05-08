import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Search, Plus, AlertCircle, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type TabKey = 'joined' | 'discover';
type LoadingState = 'idle' | 'loading' | 'success' | 'error';

type Community = {
  id: string;
  name: string;
  cover: string;
  members: number;
  isJoined: boolean;
};

export default function MobileCommunitiesPage() {
  const t = useTranslations('communities');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [activeTab, setActiveTab] = useState<TabKey>('joined');
  const [searchQuery, setSearchQuery] = useState('');
  const [communities, setCommunities] = useState<Community[]>([]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingState('success');
      // TODO(integration): replace with communities API
      setCommunities([
        {
          id: '1',
          name: 'Sustainable Fashion',
          cover: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
          members: 12450,
          isJoined: true,
        },
        {
          id: '2',
          name: 'Vintage Lovers',
          cover: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400',
          members: 8230,
          isJoined: true,
        },
        {
          id: '3',
          name: 'Streetwear Daily',
          cover: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
          members: 24500,
          isJoined: false,
        },
        {
          id: '4',
          name: 'Minimalist Style',
          cover: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400',
          members: 15600,
          isJoined: false,
        },
      ]);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRetry = () => {
    setLoadingState('loading');
    setTimeout(() => setLoadingState('success'), 1500);
  };

  const handleToggleJoin = (id: string) => {
    setCommunities((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isJoined: !c.isJoined } : c))
    );
  };

  const formatNumber = (n: number) =>
    new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(n);

  const visibleCommunities =
    activeTab === 'joined'
      ? communities.filter((c) => c.isJoined)
      : communities.filter((c) => !c.isJoined);

  const renderLoading = () => (
    <div className="px-4 py-6 space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-9 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );

  const renderEmpty = () => {
    const key = activeTab === 'joined' ? 'empty.joined' : 'empty.discover';
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
          <Users className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-bold mb-2">{t(`${key}.title`)}</h2>
        <p className="text-muted-foreground mb-6 max-w-sm">{t(`${key}.description`)}</p>
        <Button
          onClick={() => setActiveTab(activeTab === 'joined' ? 'discover' : 'joined')}
          className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
        >
          {t(`${key}.cta`)}
        </Button>
      </div>
    );
  };

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
    if (visibleCommunities.length === 0) return renderEmpty();
    return (
      <div className="px-4 py-4 space-y-3">
        {visibleCommunities.map((c) => (
          <article
            key={c.id}
            className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/50 active:bg-muted transition-colors"
          >
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <ImageWithFallback src={c.cover} alt={c.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold line-clamp-1">{c.name}</h3>
              <p className="text-xs text-muted-foreground">
                {t('members', { count: formatNumber(c.members) })}
              </p>
            </div>
            <Button
              size="sm"
              variant={c.isJoined ? 'outline' : 'default'}
              className={`min-h-11 rounded-full px-4 ${
                c.isJoined
                  ? 'active:bg-muted'
                  : 'gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80'
              }`}
              onClick={() => handleToggleJoin(c.id)}
            >
              {c.isJoined ? t('joined') : t('join')}
            </Button>
          </article>
        ))}
      </div>
    );
  };

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
      <header className="sticky top-0 z-40 bg-background border-b border-border pt-[env(safe-area-inset-top)] px-4 pb-3 space-y-3">
        <div className="flex items-center gap-3">
          <h1 className="flex-1 text-xl font-bold">{t('title')}</h1>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full min-h-11 min-w-11"
            aria-label={t('createAria')}
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            inputMode="search"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ps-10 rounded-full bg-muted border-0 min-h-11"
            enterKeyHint="search"
          />
        </div>

        <div className="grid grid-cols-2">
          {(['joined', 'discover'] as TabKey[]).map((tab) => (
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
