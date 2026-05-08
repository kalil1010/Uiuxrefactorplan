import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronLeft, Heart, Share2, Star, Minus, Plus, AlertCircle, ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

type Product = {
  id: string;
  title: string;
  vendor: { id: string; name: string };
  price: number;
  currency: string;
  rating: number;
  reviews: number;
  description: string;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: number;
  isWishlisted: boolean;
};

export default function MobileProductDetailPage() {
  const t = useTranslations('productDetail');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [product, setProduct] = useState<Product | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingState('success');
      // TODO(integration): replace with product API call
      setProduct({
        id: '1',
        title: 'Linen Summer Shirt',
        vendor: { id: 'v1', name: 'Nordic Style' },
        price: 79,
        currency: 'USD',
        rating: 4.7,
        reviews: 128,
        description:
          'A breathable linen shirt crafted for warm-weather days. Relaxed fit, mother-of-pearl buttons, and a curved hem.',
        images: [
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop',
          'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=800&h=1000&fit=crop',
          'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop',
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: [
          { name: 'White', hex: '#F8F4EC' },
          { name: 'Sand', hex: '#D4B886' },
          { name: 'Olive', hex: '#5C7A4A' },
        ],
        stock: 8,
        isWishlisted: false,
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRetry = () => {
    setLoadingState('loading');
    setTimeout(() => setLoadingState('success'), 1500);
  };

  const formatPrice = (price: number, currency: string) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price);

  const formatRating = (rating: number) =>
    new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(rating);

  const handleAddToCart = () => {
    // TODO(integration): add to cart via API
  };

  const handleBuyNow = () => {
    // TODO(integration): navigate to checkout with this product
  };

  const renderLoading = () => (
    <div>
      <Skeleton className="w-full aspect-square" />
      <div className="px-4 py-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
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

  const renderProduct = () => {
    if (!product) return null;
    const isInStock = product.stock > 0;
    const isLowStock = isInStock && product.stock <= 5;

    return (
      <>
        {/* Image carousel — using overflow snap */}
        <div className="relative">
          <div
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            onScroll={(e) => {
              const i = Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth);
              if (i !== imageIndex) setImageIndex(i);
            }}
          >
            {product.images.map((src, i) => (
              <div
                key={i}
                className="w-full flex-shrink-0 snap-center aspect-square bg-muted"
                aria-label={t('imageAria', { index: i + 1, total: product.images.length })}
              >
                <ImageWithFallback
                  src={src}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          {/* Page indicators */}
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
            {product.images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === imageIndex ? 'w-6 bg-primary' : 'w-1.5 bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="px-4 py-6 space-y-6">
          {/* Title + price */}
          <div>
            <h1 className="text-2xl font-bold mb-1">{product.title}</h1>
            <button className="text-sm text-primary active:underline">
              {t('byVendor', { vendor: product.vendor.name })}
            </button>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-current text-yellow-500" />
                <span className="text-sm font-medium">
                  {t('rating', { rating: formatRating(product.rating), reviews: product.reviews })}
                </span>
              </div>
            </div>
            <p className="text-2xl font-bold mt-3">{formatPrice(product.price, product.currency)}</p>
            {isLowStock && (
              <Badge variant="outline" className="mt-2 border-destructive text-destructive">
                {t('lowStock', { count: product.stock })}
              </Badge>
            )}
            {!isInStock && (
              <Badge variant="outline" className="mt-2 border-destructive text-destructive">
                {t('outOfStock')}
              </Badge>
            )}
          </div>

          {/* Sizes */}
          <div className="space-y-2">
            <p className="font-semibold">{t('size')}</p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((s) => {
                const selected = size === s;
                return (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`min-h-11 min-w-11 px-3 rounded-lg border-2 text-sm font-medium transition-colors active:scale-95 ${
                      selected
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                    aria-pressed={selected}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-2">
            <p className="font-semibold">{t('color')}</p>
            <div className="flex gap-3 flex-wrap">
              {product.colors.map((c) => {
                const selected = color === c.name;
                return (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    className="flex flex-col items-center gap-1 min-h-11 active:opacity-80"
                    aria-pressed={selected}
                    aria-label={c.name}
                  >
                    <span
                      className={`w-9 h-9 rounded-full border-2 ${
                        selected ? 'border-primary' : 'border-border'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="text-xs text-muted-foreground">{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <p className="font-semibold">{t('quantity')}</p>
            <div className="inline-flex items-center border border-border rounded-full">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="min-h-11 min-w-11 flex items-center justify-center text-muted-foreground active:text-foreground rounded-full"
                aria-label={t('decreaseQuantityAria')}
                disabled={qty <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="min-w-12 text-center font-semibold">
                {qty.toLocaleString(locale)}
              </span>
              <button
                onClick={() => setQty(Math.min(product.stock, qty + 1))}
                className="min-h-11 min-w-11 flex items-center justify-center text-muted-foreground active:text-foreground rounded-full"
                aria-label={t('increaseQuantityAria')}
                disabled={qty >= product.stock}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h2 className="font-semibold">{t('description')}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          {/* Shipping & Returns */}
          <div className="space-y-3 border-t border-border pt-4">
            <div>
              <p className="font-semibold text-sm">{t('shipping')}</p>
              <p className="text-sm text-muted-foreground">{t('shippingDetails')}</p>
            </div>
            <div>
              <p className="font-semibold text-sm">{t('returns')}</p>
              <p className="text-sm text-muted-foreground">{t('returnsDetails')}</p>
            </div>
          </div>
        </div>
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
        <h1 className="flex-1 font-semibold text-lg truncate">
          {product?.title ?? ''}
        </h1>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full min-h-11 min-w-11"
          aria-label={t('shareAria')}
          onClick={() => {
            // TODO(integration): wire to Capacitor Share plugin
          }}
        >
          <Share2 className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full min-h-11 min-w-11"
          aria-label={
            product?.isWishlisted ? t('removeFromWishlist') : t('addToWishlist')
          }
          onClick={() => {
            if (!product) return;
            setProduct({ ...product, isWishlisted: !product.isWishlisted });
          }}
        >
          <Heart className={`w-5 h-5 ${product?.isWishlisted ? 'fill-current text-destructive' : ''}`} />
        </Button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-[calc(5rem+env(safe-area-inset-bottom))]">
        {loadingState === 'loading' && renderLoading()}
        {loadingState === 'error' && renderError()}
        {loadingState === 'success' && renderProduct()}
      </div>

      {/* Bottom CTAs */}
      {loadingState === 'success' && product && (
        <div className="fixed bottom-0 start-0 end-0 z-40 bg-background border-t border-border px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="active:bg-muted min-h-11"
              disabled={product.stock === 0}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4 me-2" />
              {t('addToCart')}
            </Button>
            <Button
              className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
              disabled={product.stock === 0}
              onClick={handleBuyNow}
            >
              {t('buyNow')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
