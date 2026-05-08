import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, Camera, Upload, AlertCircle, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import MobileBottomNav from './MobileBottomNav';

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

type SuggestionItem = {
  id: string;
  name: string;
  category: string;
  image: string;
  matchScore: number;
};

export default function MobileVirtualStylist() {
  const t = useTranslations('virtualStylist');
  const tCommon = useTranslations('common');
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);

  const handleTakePicture = () => {
    // TODO(integration): navigate to camera screen
  };

  const handleUploadPhoto = () => {
    // TODO(integration): open file picker
  };

  const handleRetry = () => {
    setLoadingState('loading');
    setTimeout(() => setLoadingState('success'), 1500);
  };

  // Simulate data fetch
  React.useEffect(() => {
    if (loadingState === 'idle') {
      // Auto-load some mock data for demo
      const timer = setTimeout(() => {
        setLoadingState('success');
        // TODO(integration): replace with actual AI suggestions from API
        setSuggestions([
          {
            id: '1',
            name: 'White Linen Shirt',
            category: 'Tops',
            image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=300&fit=crop',
            matchScore: 95,
          },
          {
            id: '2',
            name: 'High-Waist Jeans',
            category: 'Bottoms',
            image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=300&fit=crop',
            matchScore: 92,
          },
          {
            id: '3',
            name: 'Tan Leather Loafers',
            category: 'Shoes',
            image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=300&fit=crop',
            matchScore: 88,
          },
          {
            id: '4',
            name: 'Gold Hoop Earrings',
            category: 'Accessories',
            image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop',
            matchScore: 90,
          },
        ]);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [loadingState]);

  const renderLoadingState = () => (
    <div className="px-4 py-6 space-y-4">
      <Skeleton className="w-full aspect-square rounded-lg" />
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="w-20 h-20 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderIdleState = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mb-4">
        <Sparkles className="w-10 h-10 text-primary-foreground" />
      </div>
      <h2 className="text-xl font-bold mb-2">{t('title')}</h2>
      <p className="text-muted-foreground mb-8 max-w-sm">{t('subtitle')}</p>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Button
          className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
          onClick={handleTakePicture}
        >
          <Camera className="w-5 h-5 me-2" />
          {t('cta.takePicture')}
        </Button>
        <Button
          variant="outline"
          className="min-h-11 active:bg-muted"
          onClick={handleUploadPhoto}
        >
          <Upload className="w-5 h-5 me-2" />
          {t('cta.uploadPhoto')}
        </Button>
      </div>
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

  const renderSuccessState = () => (
    <>
      {/* Result Section */}
      <div className="px-4 py-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-1">{t('result.title')}</h2>
          <p className="text-sm text-muted-foreground">{t('result.subtitle')}</p>
        </div>

        {/* Suggestions Grid */}
        <div>
          <h3 className="font-semibold mb-3">{t('suggestions.title')}</h3>
          <div className="space-y-3">
            {suggestions.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/50 active:bg-muted cursor-pointer"
              >
                {/* Item Image */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Item Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full gradient-bg"
                        style={{ width: `${item.matchScore}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{item.matchScore}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Try Again Button */}
        <Button
          className="w-full mt-6 gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
          onClick={() => setLoadingState('idle')}
        >
          <Camera className="w-5 h-5 me-2" />
          {t('cta.takePicture')}
        </Button>
      </div>
    </>
  );

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
      {/* Header with Safe Area */}
      <header className="sticky top-0 z-40 bg-background border-b border-border pt-[env(safe-area-inset-top)] px-4 py-3 flex items-center gap-3">
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
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-[calc(3.5rem+env(safe-area-inset-bottom))]">
        {loadingState === 'loading' && renderLoadingState()}
        {loadingState === 'idle' && renderIdleState()}
        {loadingState === 'error' && renderErrorState()}
        {loadingState === 'success' && renderSuccessState()}
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
