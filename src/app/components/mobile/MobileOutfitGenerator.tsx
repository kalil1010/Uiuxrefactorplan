import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, Wand2, AlertCircle, Save, RefreshCw, Share2, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Skeleton } from '../ui/skeleton';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type StyleKey = 'casual' | 'formal' | 'streetwear' | 'bohemian' | 'minimalist' | 'sporty';
type OccasionKey = 'work' | 'party' | 'date' | 'weekend' | 'travel' | 'wedding';
type WeatherKey = 'warm' | 'mild' | 'cold' | 'rainy';

type LoadingState = 'idle' | 'generating' | 'success' | 'error';

type GeneratedOutfit = {
  image: string;
  description: string;
};

export default function MobileOutfitGenerator() {
  const t = useTranslations('outfitGenerator');
  const tCommon = useTranslations('common');
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<StyleKey | null>(null);
  const [occasion, setOccasion] = useState<OccasionKey | null>(null);
  const [weather, setWeather] = useState<WeatherKey | null>(null);
  const [result, setResult] = useState<GeneratedOutfit | null>(null);

  const styleOptions: StyleKey[] = ['casual', 'formal', 'streetwear', 'bohemian', 'minimalist', 'sporty'];
  const occasionOptions: OccasionKey[] = ['work', 'party', 'date', 'weekend', 'travel', 'wedding'];
  const weatherOptions: WeatherKey[] = ['warm', 'mild', 'cold', 'rainy'];

  const canGenerate = prompt.trim().length > 0 || style || occasion;

  const handleGenerate = async () => {
    if (!canGenerate) return;
    setLoadingState('generating');
    // TODO(integration): replace with actual outfit generation API call
    await new Promise((r) => setTimeout(r, 2000));
    setResult({
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop',
      description:
        'A breezy summer outfit featuring a white linen shirt, beige tailored shorts, and tan leather sandals. Perfect for warm-weather brunches.',
    });
    setLoadingState('success');
  };

  const handleRetry = () => {
    setLoadingState('idle');
    setResult(null);
  };

  const renderChip = <T extends string>(
    key: T,
    label: string,
    selected: T | null,
    setter: (k: T | null) => void
  ) => {
    const isSelected = selected === key;
    return (
      <button
        key={key}
        onClick={() => setter(isSelected ? null : key)}
        className={`min-h-11 px-4 rounded-full border-2 text-sm whitespace-nowrap transition-all active:scale-95 ${
          isSelected
            ? 'border-primary bg-primary/10 text-primary font-semibold'
            : 'border-border bg-card hover:border-primary/50 active:border-primary/50'
        }`}
        aria-pressed={isSelected}
      >
        {label}
      </button>
    );
  };

  const renderGenerating = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="w-20 h-20 rounded-full gradient-bg animate-pulse flex items-center justify-center mb-4">
        <Loader2 className="w-10 h-10 text-primary-foreground animate-spin" />
      </div>
      <h2 className="text-xl font-bold mb-2">{t('generating')}</h2>
      <Skeleton className="w-full max-w-xs h-2 rounded-full mt-4" />
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

  const renderResult = () => {
    if (!result) return null;
    return (
      <div className="px-4 py-6 space-y-4">
        <h2 className="text-xl font-bold">{t('result.title')}</h2>
        <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted">
          <ImageWithFallback
            src={result.image}
            alt={result.description}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-sm text-muted-foreground">{result.description}</p>
        <div className="grid grid-cols-3 gap-2 pt-2">
          <Button
            className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
            onClick={() => {
              // TODO(integration): save to closet
            }}
          >
            <Save className="w-4 h-4 me-2" />
            {t('result.save')}
          </Button>
          <Button variant="outline" className="active:bg-muted min-h-11" onClick={handleGenerate}>
            <RefreshCw className="w-4 h-4 me-2" />
            {t('result.regenerate')}
          </Button>
          <Button
            variant="ghost"
            className="active:bg-muted min-h-11"
            onClick={() => {
              // TODO(integration): wire to Capacitor Share plugin
            }}
          >
            <Share2 className="w-4 h-4 me-2" />
            {t('result.share')}
          </Button>
        </div>
      </div>
    );
  };

  const renderForm = () => (
    <div className="px-4 py-6 space-y-6">
      {/* Prompt */}
      <div className="space-y-2">
        <Label htmlFor="prompt">{t('promptLabel')}</Label>
        <Textarea
          id="prompt"
          placeholder={t('promptPlaceholder')}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-24 resize-none"
        />
      </div>

      {/* Style */}
      <div className="space-y-2">
        <Label>{t('params.style')}</Label>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
          {styleOptions.map((key) => renderChip(key, t(`styleOptions.${key}`), style, setStyle))}
        </div>
      </div>

      {/* Occasion */}
      <div className="space-y-2">
        <Label>{t('params.occasion')}</Label>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
          {occasionOptions.map((key) =>
            renderChip(key, t(`occasionOptions.${key}`), occasion, setOccasion)
          )}
        </div>
      </div>

      {/* Weather */}
      <div className="space-y-2">
        <Label>{t('params.weather')}</Label>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
          {weatherOptions.map((key) =>
            renderChip(key, t(`weatherOptions.${key}`), weather, setWeather)
          )}
        </div>
      </div>
    </div>
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
        <div className="flex-1">
          <h1 className="font-semibold text-lg">{t('title')}</h1>
          <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-[calc(5rem+env(safe-area-inset-bottom))] pb-[env(keyboard-inset-height,0px)]">
        {loadingState === 'idle' && renderForm()}
        {loadingState === 'generating' && renderGenerating()}
        {loadingState === 'error' && renderError()}
        {loadingState === 'success' && renderResult()}
      </div>

      {/* Bottom CTA — only on idle state */}
      {loadingState === 'idle' && (
        <div className="fixed bottom-0 start-0 end-0 z-40 bg-background border-t border-border px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
          <Button
            className="w-full gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
            disabled={!canGenerate}
            onClick={handleGenerate}
          >
            <Wand2 className="w-5 h-5 me-2" />
            {t('generate')}
          </Button>
        </div>
      )}
    </div>
  );
}
