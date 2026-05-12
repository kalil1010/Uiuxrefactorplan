import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { RefreshCw, AlertCircle, Plus, Grid3x3, List, Filter, Search, Shirt } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import MobileBottomNav from './MobileBottomNav';

type ViewMode = 'grid' | 'list';
type CategoryKey = 'all' | 'tops' | 'bottoms' | 'dresses' | 'shoes' | 'accessories';
type LoadingState = 'idle' | 'loading' | 'success' | 'error' | 'empty';

type ClosetItem = {
  id: string;
  name: string;
  categoryKey: CategoryKey;
  image: string;
  wornCount: number;
  color: string;
};

export default function MobileClosetPage() {
  const t = useTranslations('closet');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const [items, setItems] = useState<ClosetItem[]>([]);

  const categories: { id: CategoryKey; count: number }[] = [
    { id: 'all', count: 48 },
    { id: 'tops', count: 12 },
    { id: 'bottoms', count: 10 },
    { id: 'dresses', count: 8 },
    { id: 'shoes', count: 15 },
    { id: 'accessories', count: 3 },
  ];

  // Simulate data fetch
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingState('success');
      // TODO(integration): replace with actual closet data from API
      setItems(
        Array.from({ length: 12 }, (_, i) => ({
          id: `item-${i + 1}`,
          name: `Item ${i + 1}`,
          categoryKey: 'tops' as CategoryKey,
          image: `https://images.unsplash.com/photo-${1515886657613 + i * 1000}?w=300&h=400&fit=crop`,
          wornCount: Math.floor(Math.random() * 20),
          color: ['Red', 'Blue', 'Black', 'White'][Math.floor(Math.random() * 4)],
        }))
      );
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
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="w-full aspect-[3/4] rounded-2xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
        <Shirt className="w-10 h-10 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-bold mb-2">{t('empty.title')}</h2>
      <p className="text-muted-foreground mb-6 max-w-sm">{t('empty.description')}</p>
      <Button className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80">
        <Plus className="w-4 h-4 me-2" />
        {t('addItem')}
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
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Items Grid/List — only this region scrolls */}
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-2xl overflow-hidden border cursor-pointer hover:shadow-lg active:opacity-80 transition-all"
              >
                <div className="aspect-[3/4] bg-muted relative">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {item.wornCount > 0 && (
                    <Badge className="absolute top-2 end-2 bg-black/60 text-white border-0 text-xs">
                      {t('wornCount', { count: item.wornCount.toLocaleString(locale) })}
                    </Badge>
                  )}
                </div>
                <div className="p-3">
                  <p className="font-semibold text-sm mb-1">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{t(`categories.${item.categoryKey}`)}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: item.color.toLowerCase() }} />
                    <span className="text-xs text-muted-foreground">{item.color}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-2xl overflow-hidden border flex cursor-pointer hover:shadow-lg active:opacity-80 transition-all"
              >
                <div className="w-24 h-32 bg-muted flex-shrink-0">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <p className="font-semibold mb-1">{item.name}</p>
                    <p className="text-sm text-muted-foreground mb-2">{t(`categories.${item.categoryKey}`)}</p>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: item.color.toLowerCase() }} />
                      <span className="text-xs text-muted-foreground">{item.color}</span>
                    </div>
                  </div>
                  {item.wornCount > 0 && (
                    <Badge variant="outline" className="self-start text-xs">
                      {t('wornCount', { count: item.wornCount.toLocaleString(locale) })}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Button — pinned above bottom nav */}
      <div className="shrink-0 border-t bg-background p-4">
        <Button className="w-full gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 rounded-full" size="lg">
          <Plus className="w-5 h-5 me-2" />
          {t('addItem')}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
      {/* Header with Safe Area */}
      <header className="sticky top-0 z-40 bg-background border-b border-border pt-[env(safe-area-inset-top)] px-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold">{t('title')}</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full min-h-11 min-w-11"
              aria-label={t('searchAria')}
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full min-h-11 min-w-11"
              aria-label={t('filterAria')}
            >
              <Filter className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full min-h-11 min-w-11"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              aria-label={t('viewModeAria')}
            >
              {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid3x3 className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
          {categories.map((cat) => (
            <Badge
              key={cat.id}
              variant={activeCategory === cat.id ? 'default' : 'outline'}
              className={`cursor-pointer flex-shrink-0 px-4 py-1.5 min-h-11 ${
                activeCategory === cat.id ? 'gradient-bg text-primary-foreground border-0' : ''
              }`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {t(`categories.${cat.id}`)} ({cat.count.toLocaleString(locale)})
            </Badge>
          ))}
        </div>
      </header>

      {/* Content — flex column + min-h-0 so the add bar stays above the bottom nav (not clipped by overflow-hidden) */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden pb-[calc(3.5rem+env(safe-area-inset-bottom))]">
        {/* Pull-to-refresh indicator */}
        {isRefreshing && (
          <div className="flex items-center justify-center py-4">
            <RefreshCw className="w-5 h-5 animate-spin text-primary" />
          </div>
        )}

        {loadingState === 'loading' && renderLoadingState()}
        {loadingState === 'empty' && renderEmptyState()}
        {loadingState === 'error' && renderErrorState()}
        {loadingState === 'success' && renderContent()}
      </div>

      {/* Bottom Navigation */}
      <MobileBottomNav
        activeTab="closet"
        onTabChange={(tab) => {
          // TODO(integration): wire to next-intl router
          // router.push(`/${tab}`)
        }}
      />
    </div>
  );
}
