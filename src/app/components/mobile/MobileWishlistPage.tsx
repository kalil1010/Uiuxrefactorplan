import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronLeft, Heart, ShoppingCart, AlertCircle, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type LoadingState = 'idle' | 'loading' | 'success' | 'error' | 'empty';

type WishlistItem = {
  id: string;
  title: string;
  vendor: string;
  price: number;
  currency: string;
  image: string;
};

export default function MobileWishlistPage() {
  const t = useTranslations('wishlist');
  const tMarketplace = useTranslations('marketplace');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [items, setItems] = useState<WishlistItem[]>([]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingState('success');
      // TODO(integration): replace with wishlist API
      setItems([
        {
          id: '1',
          title: 'Linen Summer Shirt',
          vendor: 'Nordic Style',
          price: 79,
          currency: 'USD',
          image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400',
        },
        {
          id: '2',
          title: 'Wide-Leg Trousers',
          vendor: 'Atelier Cairo',
          price: 110,
          currency: 'USD',
          image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400',
        },
        {
          id: '3',
          title: 'Silk Midi Dress',
          vendor: 'Maison Bloom',
          price: 195,
          currency: 'USD',
          image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
        },
      ]);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRetry = () => {
    setLoadingState('loading');
    setTimeout(() => setLoadingState('success'), 1500);
  };

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const formatPrice = (price: number, currency: string) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price);

  const renderLoading = () => (
    <div className="px-4 py-6 space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-3">
          <Skeleton className="w-24 h-32 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-5 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderEmpty = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
        <Heart className="w-10 h-10 text-muted-foreground" />
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
    if (items.length === 0) return renderEmpty();
    return (
      <div className="px-4 py-4 space-y-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="flex gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/50 active:bg-muted transition-colors"
          >
            <div className="w-24 h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div className="min-w-0">
                <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                  {tMarketplace('byVendor', { vendor: item.vendor })}
                </p>
                <p className="font-bold mt-1">{formatPrice(item.price, item.currency)}</p>
              </div>
              <Button
                size="sm"
                className="self-start gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
                onClick={() => {
                  // TODO(integration): add to cart
                }}
              >
                <ShoppingCart className="w-4 h-4 me-1.5" />
                {t('addToCart')}
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full min-h-11 min-w-11 self-start active:bg-muted"
              aria-label={t('removeAria')}
              onClick={() => handleRemove(item.id)}
            >
              <X className="w-5 h-5" />
            </Button>
          </article>
        ))}
      </div>
    );
  };

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
      {/* Header */}
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
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-[calc(5rem+env(safe-area-inset-bottom))]">
        {loadingState === 'loading' && renderLoading()}
        {loadingState === 'error' && renderError()}
        {loadingState === 'success' && renderContent()}
      </div>

      {/* Bottom CTA */}
      {loadingState === 'success' && items.length > 0 && (
        <div className="fixed bottom-0 start-0 end-0 z-40 bg-background border-t border-border px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
          <Button
            className="w-full gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
            onClick={() => {
              // TODO(integration): move all to cart
            }}
          >
            <ShoppingCart className="w-5 h-5 me-2" />
            {t('moveAllToCart')}
          </Button>
        </div>
      )}
    </div>
  );
}
