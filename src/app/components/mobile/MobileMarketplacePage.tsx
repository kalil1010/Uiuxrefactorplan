import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Search, Heart, Filter, ShoppingBag, AlertCircle, ChevronDown, ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import MobileBottomNav from './MobileBottomNav';
import { MobileHeaderIconActions } from './MobileMainTopBar';

type CategoryKey = 'all' | 'tops' | 'bottoms' | 'dresses' | 'shoes' | 'accessories' | 'bags';
type SortKey = 'trending' | 'newest' | 'priceLow' | 'priceHigh';
type LoadingState = 'idle' | 'loading' | 'success' | 'error' | 'empty';

type Product = {
  id: string;
  title: string;
  vendor: string;
  price: number;
  currency: string;
  image: string;
  isWishlisted: boolean;
  categoryKey: CategoryKey;
};

export default function MobileMarketplacePage() {
  const t = useTranslations('marketplace');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const [sort, setSort] = useState<SortKey>('trending');
  const [products, setProducts] = useState<Product[]>([]);

  const categories: CategoryKey[] = ['all', 'tops', 'bottoms', 'dresses', 'shoes', 'accessories', 'bags'];

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingState('success');
      // TODO(integration): replace with marketplace API
      setProducts([
        {
          id: '1',
          title: 'Linen Summer Shirt',
          vendor: 'Nordic Style',
          price: 79,
          currency: 'USD',
          image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400',
          isWishlisted: false,
          categoryKey: 'tops',
        },
        {
          id: '2',
          title: 'Wide-Leg Trousers',
          vendor: 'Atelier Cairo',
          price: 110,
          currency: 'USD',
          image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400',
          isWishlisted: true,
          categoryKey: 'bottoms',
        },
        {
          id: '3',
          title: 'Silk Midi Dress',
          vendor: 'Maison Bloom',
          price: 195,
          currency: 'USD',
          image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
          isWishlisted: false,
          categoryKey: 'dresses',
        },
        {
          id: '4',
          title: 'Leather Loafers',
          vendor: 'Cobbler & Co',
          price: 145,
          currency: 'USD',
          image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400',
          isWishlisted: false,
          categoryKey: 'shoes',
        },
      ]);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRetry = () => {
    setLoadingState('loading');
    setTimeout(() => setLoadingState('success'), 1500);
  };

  const handleWishlist = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isWishlisted: !p.isWishlisted } : p))
    );
  };

  const formatPrice = (price: number, currency: string) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price);

  const visibleProducts =
    activeCategory === 'all' ? products : products.filter((p) => p.categoryKey === activeCategory);

  const renderLoadingState = () => (
    <div className="px-4 py-6 space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-10 w-20 rounded-full flex-shrink-0" />
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
        <ShoppingBag className="w-10 h-10 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-bold mb-2">{t('empty.title')}</h2>
      <p className="text-muted-foreground mb-6 max-w-sm">{t('empty.description')}</p>
      <Button
        onClick={() => {
          setActiveCategory('all');
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
    if (visibleProducts.length === 0) return renderEmptyState();
    return (
      <div className="px-4 py-4 space-y-4">
        {/* Sort Bar */}
        <button
          onClick={() => {
            // TODO(integration): open sort sheet
          }}
          className="flex items-center gap-1 text-sm text-muted-foreground active:text-foreground min-h-11"
          aria-label={t('sortAria')}
        >
          <span>{t(`sort.${sort}`)}</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3">
          {visibleProducts.map((product) => (
            <article
              key={product.id}
              className="bg-card rounded-lg overflow-hidden border border-border active:opacity-80 transition-opacity"
            >
              <div className="relative aspect-[3/4] bg-muted">
                <ImageWithFallback
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleWishlist(product.id)}
                  className="absolute top-2 end-2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 active:bg-black/70 flex items-center justify-center text-primary-foreground"
                  aria-label={
                    product.isWishlisted ? t('removeFromWishlistAria') : t('addToWishlistAria')
                  }
                >
                  <Heart className={`w-4 h-4 ${product.isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
              <div className="p-3 space-y-1">
                <h3 className="font-semibold text-sm line-clamp-1">{product.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {t('byVendor', { vendor: product.vendor })}
                </p>
                <p className="font-bold text-sm">{formatPrice(product.price, product.currency)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
      <header className="sticky top-0 z-40 bg-background border-b border-border pt-[env(safe-area-inset-top)] px-4 pb-3 space-y-3">
        <div className="flex items-center gap-2">
          <h1 className="min-w-0 flex-1 truncate text-xl font-bold">{t('title')}</h1>
          <MobileHeaderIconActions
            showSearch={false}
            className="shrink-0"
            onMessages={() => {
              // TODO(integration): navigate to messages
            }}
            onNotifications={() => {
              // TODO(integration): open notifications
            }}
          />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full min-h-11 min-w-11 shrink-0"
            aria-label={t('wishlistAria')}
            onClick={() => {
              // TODO(integration): navigate to wishlist
            }}
          >
            <Heart className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full min-h-11 min-w-11 shrink-0"
            aria-label={t('cartAria')}
            onClick={() => {
              // TODO(integration): navigate to cart
            }}
          >
            <ShoppingCart className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
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
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full min-h-11 min-w-11 flex-shrink-0"
            aria-label={t('filterAria')}
            onClick={() => {
              // TODO(integration): open filters sheet
            }}
          >
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <Badge
                key={cat}
                variant={isActive ? 'default' : 'outline'}
                className={`cursor-pointer flex-shrink-0 px-4 py-1.5 min-h-11 flex items-center text-sm ${
                  isActive ? 'gradient-bg text-primary-foreground border-0' : 'active:bg-muted'
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {t(`categories.${cat}`)}
              </Badge>
            );
          })}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pb-[calc(4rem+env(safe-area-inset-bottom))]">
        {loadingState === 'loading' && renderLoadingState()}
        {loadingState === 'empty' && renderEmptyState()}
        {loadingState === 'error' && renderErrorState()}
        {loadingState === 'success' && renderContent()}
      </div>

      <MobileBottomNav
        activeTab={null}
        onTabChange={() => {
          // TODO(integration): wire to next-intl router
        }}
        onCreatePost={() => {
          // TODO(integration): open create-post flow / composer
        }}
      />
    </div>
  );
}
