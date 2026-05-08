import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronLeft, Edit2, Share2, Plus, X, AlertCircle, FolderHeart } from 'lucide-react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

type Item = {
  id: string;
  image: string;
  title: string;
};

type Collection = {
  id: string;
  title: string;
  cover: string;
  description: string;
  items: Item[];
};

export default function MobileCollectionDetailPage() {
  const t = useTranslations('collectionDetail');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [collection, setCollection] = useState<Collection | null>(null);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingState('success');
      // TODO(integration): replace with collection API
      setCollection({
        id: '1',
        title: 'Summer 2025',
        cover: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop',
        description: 'Light fabrics, soft palette, breezy silhouettes.',
        items: Array.from({ length: 9 }, (_, i) => ({
          id: `item-${i + 1}`,
          image: `https://images.unsplash.com/photo-${1515886657613 + i * 1000}?w=400&h=400&fit=crop`,
          title: `Outfit ${i + 1}`,
        })),
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRetry = () => {
    setLoadingState('loading');
    setTimeout(() => setLoadingState('success'), 1500);
  };

  const handleRemove = (id: string) => {
    if (!collection) return;
    setCollection({ ...collection, items: collection.items.filter((i) => i.id !== id) });
  };

  const formatNumber = (n: number) => n.toLocaleString(locale);

  const renderLoading = () => (
    <div>
      <Skeleton className="w-full aspect-[3/2]" />
      <div className="px-4 py-4 space-y-2">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-3 w-full" />
      </div>
      <div className="grid grid-cols-3 gap-1 p-1">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="aspect-square" />
        ))}
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

  const renderEmpty = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
        <FolderHeart className="w-10 h-10 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-bold mb-2">{t('empty.title')}</h2>
      <p className="text-muted-foreground mb-6 max-w-sm">{t('empty.description')}</p>
      <Button className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11">
        {t('empty.cta')}
      </Button>
    </div>
  );

  const renderContent = () => {
    if (!collection) return null;
    return (
      <>
        <div className="aspect-[3/2] bg-muted">
          <ImageWithFallback
            src={collection.cover}
            alt={collection.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="px-4 py-4 space-y-1">
          <h1 className="text-2xl font-bold">{collection.title}</h1>
          <p className="text-sm text-muted-foreground">
            {t('items', { count: formatNumber(collection.items.length) })}
          </p>
          <p className="text-sm mt-2">{collection.description}</p>
        </div>

        {collection.items.length === 0 ? (
          renderEmpty()
        ) : (
          <div className="grid grid-cols-3 gap-1 p-1">
            {collection.items.map((item) => (
              <div key={item.id} className="relative group aspect-square bg-muted">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-1 end-1 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 active:bg-black/90 flex items-center justify-center text-primary-foreground"
                  aria-label={t('removeAria')}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
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
        <h1 className="flex-1 font-semibold text-lg truncate">{collection?.title ?? ''}</h1>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full min-h-11 min-w-11"
          aria-label={t('shareAria')}
        >
          <Share2 className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full min-h-11 min-w-11"
          aria-label={t('editAria')}
        >
          <Edit2 className="w-5 h-5" />
        </Button>
      </header>

      <div className="flex-1 overflow-y-auto pb-[calc(5rem+env(safe-area-inset-bottom))]">
        {loadingState === 'loading' && renderLoading()}
        {loadingState === 'error' && renderError()}
        {loadingState === 'success' && renderContent()}
      </div>

      {/* Add Item CTA */}
      {loadingState === 'success' && (
        <div className="fixed bottom-0 start-0 end-0 z-40 bg-background border-t border-border px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
          <Button className="w-full gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11">
            <Plus className="w-5 h-5 me-2" />
            {t('addItem')}
          </Button>
        </div>
      )}
    </div>
  );
}
