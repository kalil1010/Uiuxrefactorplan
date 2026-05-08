import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronLeft, Search, AlertCircle, Heart, Bookmark, Share2, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type FilterKey = 'all' | 'trending' | 'newest' | 'saved';
type LoadingState = 'idle' | 'loading' | 'success' | 'error' | 'empty';

type Outfit = {
  id: string;
  title: string;
  image: string;
  likes: number;
  isLiked: boolean;
  isSaved: boolean;
  filterKey: FilterKey;
};

export default function MobileBrowseScreen() {
  const t = useTranslations('browse');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [outfits, setOutfits] = useState<Outfit[]>([]);

  const filters: FilterKey[] = ['all', 'trending', 'newest', 'saved'];

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingState('success');
      // TODO(integration): replace with actual outfit feed from API
      setOutfits([
        {
          id: '1',
          title: 'Summer Brunch',
          image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=600&fit=crop',
          likes: 1234,
          isLiked: false,
          isSaved: false,
          filterKey: 'trending',
        },
        {
          id: '2',
          title: 'Office Chic',
          image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop',
          likes: 892,
          isLiked: true,
          isSaved: false,
          filterKey: 'newest',
        },
        {
          id: '3',
          title: 'Weekend Casual',
          image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop',
          likes: 645,
          isLiked: false,
          isSaved: true,
          filterKey: 'saved',
        },
        {
          id: '4',
          title: 'Date Night',
          image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=600&fit=crop',
          likes: 1567,
          isLiked: true,
          isSaved: true,
          filterKey: 'trending',
        },
      ]);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRetry = () => {
    setLoadingState('loading');
    setTimeout(() => setLoadingState('success'), 1500);
  };

  const handleLike = (id: string) => {
    setOutfits((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, isLiked: !o.isLiked, likes: o.isLiked ? o.likes - 1 : o.likes + 1 } : o
      )
    );
  };

  const handleSave = (id: string) => {
    setOutfits((prev) => prev.map((o) => (o.id === id ? { ...o, isSaved: !o.isSaved } : o)));
  };

  const handleShare = (_id: string) => {
    // TODO(integration): wire to Capacitor Share plugin
  };

  const visibleOutfits =
    activeFilter === 'all' ? outfits : outfits.filter((o) => o.filterKey === activeFilter);

  const renderLoadingState = () => (
    <div className="px-4 py-6 space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-10 w-24 rounded-full flex-shrink-0" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="w-full aspect-[3/4] rounded-lg" />
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
      <Button
        onClick={() => {
          setActiveFilter('all');
          setSearchQuery('');
        }}
        className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
      >
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
    if (visibleOutfits.length === 0) return renderEmptyState();

    return (
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-3">
          {visibleOutfits.map((outfit) => (
            <article
              key={outfit.id}
              className="bg-card rounded-lg overflow-hidden border border-border active:opacity-80 transition-opacity"
            >
              <div className="relative aspect-[3/4] bg-muted">
                <ImageWithFallback
                  src={outfit.image}
                  alt={outfit.title}
                  className="w-full h-full object-cover"
                />
                {/* Top-right Save */}
                <button
                  onClick={() => handleSave(outfit.id)}
                  className="absolute top-2 end-2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 active:bg-black/70 flex items-center justify-center text-primary-foreground"
                  aria-label={outfit.isSaved ? t('unsaveAria') : t('saveAria')}
                >
                  <Bookmark className={`w-5 h-5 ${outfit.isSaved ? 'fill-current' : ''}`} />
                </button>
              </div>
              <div className="p-3 space-y-2">
                <h3 className="font-semibold text-sm line-clamp-1">{outfit.title}</h3>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleLike(outfit.id)}
                    className={`flex items-center gap-1 min-h-11 -my-2 -ms-1 px-1 ${
                      outfit.isLiked ? 'text-destructive' : 'text-muted-foreground'
                    } hover:text-foreground active:text-foreground transition-colors`}
                    aria-label={outfit.isLiked ? t('unlikeAria') : t('likeAria')}
                  >
                    <Heart className={`w-4 h-4 ${outfit.isLiked ? 'fill-current' : ''}`} />
                    <span className="text-xs">{outfit.likes.toLocaleString(locale)}</span>
                  </button>
                  <button
                    onClick={() => handleShare(outfit.id)}
                    className="min-h-11 min-w-11 -my-2 -me-1 flex items-center justify-center text-muted-foreground hover:text-foreground active:text-foreground rounded-full"
                    aria-label={t('shareAria')}
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
      {/* Header with Safe Area */}
      <header className="sticky top-0 z-40 bg-background border-b border-border pt-[env(safe-area-inset-top)] px-4 pb-3 space-y-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full min-h-11 min-w-11"
            aria-label={tCommon('back')}
            onClick={() => {
              // TODO(integration): navigate back
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="flex-1 font-semibold text-lg">{t('title')}</h1>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full min-h-11 min-w-11"
            aria-label={tCommon('edit')}
            onClick={() => {
              // TODO(integration): open advanced filters sheet
            }}
          >
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        {/* Search */}
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

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <Badge
                key={filter}
                variant={isActive ? 'default' : 'outline'}
                className={`cursor-pointer flex-shrink-0 px-4 py-1.5 min-h-11 flex items-center text-sm ${
                  isActive ? 'gradient-bg text-primary-foreground border-0' : 'active:bg-muted'
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {t(`filters.${filter}`)}
              </Badge>
            );
          })}
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-[env(safe-area-inset-bottom)]">
        {loadingState === 'loading' && renderLoadingState()}
        {loadingState === 'error' && renderErrorState()}
        {loadingState === 'empty' && renderEmptyState()}
        {loadingState === 'success' && renderContent()}
      </div>
    </div>
  );
}
