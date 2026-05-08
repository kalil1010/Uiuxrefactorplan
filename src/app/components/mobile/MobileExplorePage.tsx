import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Search, AlertCircle, TrendingUp, Users, Calendar, Award } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import MobileBottomNav from './MobileBottomNav';

type Category = {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
};

type TrendingItem = {
  id: string;
  title: string;
  image: string;
  likes: number;
  categoryKey: string;
};

type LoadingState = 'idle' | 'loading' | 'success' | 'error' | 'empty';

export default function MobileExplorePage() {
  const t = useTranslations('explore');
  const locale = useLocale();
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('trending');

  const categories: Category[] = [
    { id: 'trending', name: t('categories.trending'), icon: <TrendingUp className="w-4 h-4" />, count: 234 },
    { id: 'communities', name: t('categories.communities'), icon: <Users className="w-4 h-4" />, count: 89 },
    { id: 'events', name: t('categories.events'), icon: <Calendar className="w-4 h-4" />, count: 12 },
    { id: 'challenges', name: t('categories.challenges'), icon: <Award className="w-4 h-4" />, count: 7 },
  ];

  const [items, setItems] = useState<TrendingItem[]>([]);

  // Simulate data fetch
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingState('success');
      // TODO(integration): replace with actual feed data from API
      setItems([
        {
          id: '1',
          title: 'Summer Vibes Collection',
          image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400',
          likes: 1234,
          categoryKey: 'trending',
        },
        {
          id: '2',
          title: 'Minimalist Wardrobe Guide',
          image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
          likes: 892,
          categoryKey: 'trending',
        },
        {
          id: '3',
          title: 'Street Style Inspo',
          image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
          likes: 756,
          categoryKey: 'trending',
        },
        {
          id: '4',
          title: 'Vintage Fashion Finds',
          image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400',
          likes: 645,
          categoryKey: 'trending',
        },
      ]);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRetry = () => {
    setLoadingState('loading');
    setTimeout(() => setLoadingState('success'), 1500);
  };

  const renderLoadingState = () => (
    <div className="px-4 py-6 space-y-6">
      {/* Categories skeleton */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-10 w-32 rounded-full flex-shrink-0" />
        ))}
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="w-full aspect-square rounded-lg" />
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
        <Search className="w-10 h-10 text-muted-foreground" />
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
    <div className="px-4 py-6 space-y-6">
      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 min-h-11 px-4 rounded-full border-2 whitespace-nowrap transition-all active:scale-95 ${
              activeCategory === cat.id
                ? 'border-primary bg-primary/10 text-primary font-semibold'
                : 'border-border bg-card hover:border-primary/50 active:border-primary/50'
            }`}
          >
            {cat.icon}
            <span className="text-sm">{cat.name}</span>
            <Badge variant="secondary" className="text-xs">
              {cat.count}
            </Badge>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <button
            key={item.id}
            className="group text-start active:opacity-80 transition-opacity"
          >
            <div className="relative aspect-square rounded-lg overflow-hidden mb-2">
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-2 start-2 end-2">
                <p className="text-white text-sm font-semibold line-clamp-2">{item.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="text-xs">
                {t(`categories.${item.categoryKey}`)}
              </Badge>
              <span>·</span>
              <span>{item.likes.toLocaleString(locale)} {t('likes')}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
      {/* Header with Safe Area */}
      <header className="sticky top-0 z-40 bg-background border-b border-border pt-[env(safe-area-inset-top)] px-4 pb-4 space-y-3">
        <h1 className="text-xl font-bold">{t('title')}</h1>

        {/* Search */}
        <div className="relative">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            inputMode="search"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="min-h-11 ps-10"
            enterKeyHint="search"
          />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-[calc(3.5rem+env(safe-area-inset-bottom))]">
        {loadingState === 'loading' && renderLoadingState()}
        {loadingState === 'empty' && renderEmptyState()}
        {loadingState === 'error' && renderErrorState()}
        {loadingState === 'success' && renderContent()}
      </div>

      {/* Bottom Navigation */}
      <MobileBottomNav
        activeTab="explore"
        onTabChange={(tab) => {
          // TODO(integration): wire to next-intl router
          // router.push(`/${tab}`)
        }}
      />
    </div>
  );
}
