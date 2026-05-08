import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronLeft, MessageCircle, Star, AlertCircle, ShoppingBag } from 'lucide-react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type TabKey = 'products' | 'about' | 'reviews';
type LoadingState = 'idle' | 'loading' | 'success' | 'error' | 'empty';

type VendorProduct = {
  id: string;
  title: string;
  price: number;
  currency: string;
  image: string;
};

type Vendor = {
  id: string;
  name: string;
  banner: string;
  avatar: string;
  followers: number;
  rating: number;
  productsCount: number;
  bio: string;
  established: number;
  city: string;
  isFollowing: boolean;
  products: VendorProduct[];
};

export default function MobileVendorShopPage() {
  const t = useTranslations('vendorShop');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [activeTab, setActiveTab] = useState<TabKey>('products');
  const [vendor, setVendor] = useState<Vendor | null>(null);

  const tabs: TabKey[] = ['products', 'about', 'reviews'];

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingState('success');
      // TODO(integration): replace with vendor API
      setVendor({
        id: 'v1',
        name: 'Nordic Style',
        banner:
          'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=400&fit=crop',
        avatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
        followers: 5240,
        rating: 4.8,
        productsCount: 87,
        bio:
          'Nordic-inspired sustainable fashion. Timeless pieces crafted from natural fibers in small batches.',
        established: 2019,
        city: 'Copenhagen',
        isFollowing: false,
        products: Array.from({ length: 6 }, (_, i) => ({
          id: `p-${i + 1}`,
          title: `Linen Piece ${i + 1}`,
          price: 79 + i * 15,
          currency: 'USD',
          image: `https://images.unsplash.com/photo-${1596755094514 + i * 1000}?w=400`,
        })),
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRetry = () => {
    setLoadingState('loading');
    setTimeout(() => setLoadingState('success'), 1500);
  };

  const handleFollow = () => {
    if (!vendor) return;
    setVendor({ ...vendor, isFollowing: !vendor.isFollowing });
  };

  const formatPrice = (price: number, currency: string) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price);

  const formatNumber = (n: number) =>
    new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(n);

  const renderLoading = () => (
    <div className="space-y-4">
      <Skeleton className="w-full h-32" />
      <div className="px-4 -mt-12 relative">
        <Skeleton className="w-20 h-20 rounded-full" />
        <Skeleton className="h-6 w-1/2 mt-3" />
        <Skeleton className="h-3 w-full mt-2" />
        <Skeleton className="h-3 w-3/4 mt-1" />
      </div>
      <div className="grid grid-cols-2 gap-3 px-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="aspect-[3/4] rounded-lg" />
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

  const renderEmptyProducts = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
        <ShoppingBag className="w-10 h-10 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-bold mb-2">{t('empty.title')}</h2>
      <p className="text-muted-foreground mb-6 max-w-sm">{t('empty.description')}</p>
      <Button className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11">
        {t('empty.cta')}
      </Button>
    </div>
  );

  const renderTabContent = () => {
    if (!vendor) return null;

    if (activeTab === 'products') {
      if (vendor.products.length === 0) return renderEmptyProducts();
      return (
        <div className="grid grid-cols-2 gap-3 px-4 py-4">
          {vendor.products.map((p) => (
            <article
              key={p.id}
              className="bg-card rounded-lg overflow-hidden border border-border active:opacity-80 transition-opacity"
            >
              <div className="aspect-[3/4] bg-muted">
                <ImageWithFallback
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 space-y-1">
                <h3 className="font-semibold text-sm line-clamp-1">{p.title}</h3>
                <p className="font-bold text-sm">{formatPrice(p.price, p.currency)}</p>
              </div>
            </article>
          ))}
        </div>
      );
    }

    if (activeTab === 'about') {
      return (
        <div className="px-4 py-6 space-y-4">
          <p className="text-sm leading-relaxed">{vendor.bio}</p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>{t('about.established', { year: vendor.established })}</p>
            <p>{t('about.location', { city: vendor.city })}</p>
          </div>
        </div>
      );
    }

    // reviews
    return (
      <div className="px-4 py-6">
        {/* TODO(integration): replace with reviews API */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-b border-border pb-4">
              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-current text-yellow-500" />
                ))}
              </div>
              <p className="text-sm">
                Loved the quality and fit! Will definitely order again.
              </p>
              <p className="text-xs text-muted-foreground mt-1">Anonymous · 2 weeks ago</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (!vendor) return null;
    return (
      <>
        {/* Banner */}
        <div className="relative">
          <div className="w-full h-32 bg-muted">
            <ImageWithFallback
              src={vendor.banner}
              alt={vendor.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Avatar */}
          <div className="absolute start-4 -bottom-10 w-20 h-20 rounded-full border-4 border-background overflow-hidden bg-muted">
            <ImageWithFallback
              src={vendor.avatar}
              alt={vendor.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Vendor info */}
        <div className="px-4 pt-12 pb-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold">{vendor.name}</h1>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                <span>{t('followers', { count: formatNumber(vendor.followers) })}</span>
                <span>·</span>
                <span>{t('products', { count: formatNumber(vendor.productsCount) })}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current text-yellow-500" />
                  {vendor.rating.toLocaleString(locale)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleFollow}
              className={`flex-1 min-h-11 ${
                vendor.isFollowing
                  ? 'bg-muted text-foreground hover:bg-muted/80 active:bg-muted/70'
                  : 'gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80'
              }`}
            >
              {vendor.isFollowing ? t('unfollow') : t('follow')}
            </Button>
            <Button
              variant="outline"
              className="flex-1 active:bg-muted min-h-11"
              onClick={() => {
                // TODO(integration): start chat with vendor
              }}
            >
              <MessageCircle className="w-4 h-4 me-2" />
              {t('messageVendor')}
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-b border-border grid grid-cols-3 sticky top-0 bg-background z-30">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              aria-current={activeTab === tab ? 'page' : undefined}
              className={`min-h-11 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground active:text-foreground'
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
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur border-b border-border pt-[env(safe-area-inset-top)] px-2 py-2 flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full min-h-11 min-w-11"
          aria-label={tCommon('back')}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className="flex-1 font-semibold text-lg truncate">{vendor?.name ?? ''}</h1>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-[env(safe-area-inset-bottom)]">
        {loadingState === 'loading' && renderLoading()}
        {loadingState === 'error' && renderError()}
        {loadingState === 'success' && renderContent()}
      </div>
    </div>
  );
}
