import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronLeft, AlertCircle, Bookmark } from 'lucide-react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type TabKey = 'posts' | 'products' | 'outfits';
type LoadingState = 'idle' | 'loading' | 'success' | 'error';

type SavedItem = {
  id: string;
  image: string;
  title: string;
  tab: TabKey;
};

export default function MobileSavedPage() {
  const t = useTranslations('saved');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [activeTab, setActiveTab] = useState<TabKey>('posts');
  const [items, setItems] = useState<SavedItem[]>([]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingState('success');
      // TODO(integration): replace with saved items API
      const tabs: TabKey[] = ['posts', 'products', 'outfits'];
      setItems(
        tabs.flatMap((tab) =>
          Array.from({ length: 6 }, (_, i) => ({
            id: `${tab}-${i + 1}`,
            image: `https://images.unsplash.com/photo-${1490481651871 + i * 1000 + tabs.indexOf(tab) * 100}?w=400&h=400&fit=crop`,
            title: `${tab} ${i + 1}`,
            tab,
          }))
        )
      );
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRetry = () => {
    setLoadingState('loading');
    setTimeout(() => setLoadingState('success'), 1500);
  };

  const visibleItems = items.filter((i) => i.tab === activeTab);

  const renderLoading = () => (
    <div className="grid grid-cols-3 gap-1 p-1">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Skeleton key={i} className="aspect-square" />
      ))}
    </div>
  );

  const renderEmpty = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
        <Bookmark className="w-10 h-10 text-muted-foreground" />
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
      <div className="grid grid-cols-3 gap-1 p-1">
        {visibleItems.map((item) => (
          <div key={item.id} className="aspect-square bg-muted active:opacity-80 transition-opacity">
            <ImageWithFallback
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
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
        </div>
        <div className="grid grid-cols-3">
          {(['posts', 'products', 'outfits'] as TabKey[]).map((tab) => (
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
