import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronLeft, Plus, AlertCircle, FolderHeart } from 'lucide-react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

type Collection = {
  id: string;
  title: string;
  cover: string;
  itemCount: number;
};

export default function MobileCollectionsPage() {
  const t = useTranslations('collections');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [collections, setCollections] = useState<Collection[]>([]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingState('success');
      // TODO(integration): replace with collections API
      setCollections([
        {
          id: '1',
          title: 'Summer 2025',
          cover: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
          itemCount: 24,
        },
        {
          id: '2',
          title: 'Office Looks',
          cover: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400',
          itemCount: 18,
        },
        {
          id: '3',
          title: 'Vintage Inspo',
          cover: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400',
          itemCount: 31,
        },
        {
          id: '4',
          title: 'Wishlist',
          cover: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
          itemCount: 12,
        },
      ]);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRetry = () => {
    setLoadingState('loading');
    setTimeout(() => setLoadingState('success'), 1500);
  };

  const formatNumber = (n: number) => n.toLocaleString(locale);

  const renderLoading = () => (
    <div className="grid grid-cols-2 gap-3 px-4 py-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="w-full aspect-square rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  );

  const renderEmpty = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
        <FolderHeart className="w-10 h-10 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-bold mb-2">{t('empty.title')}</h2>
      <p className="text-muted-foreground mb-6 max-w-sm">{t('empty.description')}</p>
      <Button className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11">
        <Plus className="w-4 h-4 me-2" />
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
    if (collections.length === 0) return renderEmpty();
    return (
      <div className="grid grid-cols-2 gap-3 px-4 py-4">
        {collections.map((c) => (
          <button
            key={c.id}
            className="text-start active:opacity-80 transition-opacity"
          >
            <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-2">
              <ImageWithFallback
                src={c.cover}
                alt={c.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-sm line-clamp-1">{c.title}</h3>
            <p className="text-xs text-muted-foreground">
              {t('items', { count: formatNumber(c.itemCount) })}
            </p>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
      <header className="sticky top-0 z-40 bg-background border-b border-border pt-[env(safe-area-inset-top)] px-2 py-2 flex items-center gap-1">
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
          size="icon"
          className="rounded-full min-h-11 min-w-11"
          aria-label={t('createAria')}
        >
          <Plus className="w-5 h-5" />
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
