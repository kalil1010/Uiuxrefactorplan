import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, Camera, Upload, AlertCircle, Loader2, Save, RefreshCw, Share2, Palette } from 'lucide-react';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type LoadingState = 'idle' | 'analyzing' | 'success' | 'error';
type ToneKey = 'warm' | 'cool' | 'neutral';
type SeasonKey = 'spring' | 'summer' | 'autumn' | 'winter';

type ColorSwatch = {
  hex: string;
  nameKey: string;
};

type AnalysisResult = {
  photo: string;
  toneKey: ToneKey;
  seasonKey: SeasonKey;
  palette: ColorSwatch[];
  avoid: ColorSwatch[];
};

export default function MobileColorAnalyzer() {
  const t = useTranslations('colorAnalyzer');
  const tCommon = useTranslations('common');
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleStart = async (_source: 'camera' | 'upload') => {
    setLoadingState('analyzing');
    // TODO(integration): wire to Capacitor Camera plugin / file picker, then send to AI
    await new Promise((r) => setTimeout(r, 2000));
    setResult({
      photo:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      toneKey: 'warm',
      seasonKey: 'autumn',
      palette: [
        { hex: '#C26A4A', nameKey: 'terracotta' },
        { hex: '#7E5A3A', nameKey: 'walnut' },
        { hex: '#D4B886', nameKey: 'sand' },
        { hex: '#5C7A4A', nameKey: 'olive' },
        { hex: '#A65A3D', nameKey: 'rust' },
        { hex: '#3F4A3A', nameKey: 'forest' },
      ],
      avoid: [
        { hex: '#FF1493', nameKey: 'hotPink' },
        { hex: '#00FFFF', nameKey: 'cyan' },
        { hex: '#000000', nameKey: 'jetBlack' },
      ],
    });
    setLoadingState('success');
  };

  const handleRetry = () => {
    setLoadingState('idle');
    setResult(null);
  };

  const renderIdle = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="w-20 h-20 rounded-full gradient-bg-purple-pink flex items-center justify-center mb-4">
        <Palette className="w-10 h-10 text-primary-foreground" />
      </div>
      <h2 className="text-xl font-bold mb-2">{t('empty.title')}</h2>
      <p className="text-muted-foreground mb-2 max-w-sm">{t('empty.description')}</p>
      <p className="text-xs text-muted-foreground mb-8 max-w-sm italic">{t('entry.tip')}</p>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Button
          className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
          onClick={() => handleStart('camera')}
        >
          <Camera className="w-5 h-5 me-2" />
          {t('entry.takePhoto')}
        </Button>
        <Button
          variant="outline"
          className="active:bg-muted min-h-11"
          onClick={() => handleStart('upload')}
        >
          <Upload className="w-5 h-5 me-2" />
          {t('entry.uploadPhoto')}
        </Button>
      </div>
    </div>
  );

  const renderAnalyzing = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="w-20 h-20 rounded-full gradient-bg animate-pulse flex items-center justify-center mb-4">
        <Loader2 className="w-10 h-10 text-primary-foreground animate-spin" />
      </div>
      <p
        role="status"
        aria-live="polite"
        className="text-muted-foreground"
      >
        {t('analyzing')}
      </p>
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

  const renderSwatchRow = (label: string, swatches: ColorSwatch[]) => (
    <div className="space-y-2">
      <h3 className="font-semibold">{label}</h3>
      <div className="grid grid-cols-3 gap-3">
        {swatches.map((swatch) => (
          <div key={swatch.hex} className="text-center">
            <div
              className="w-full aspect-square rounded-full border-2 border-border mb-2"
              style={{ backgroundColor: swatch.hex }}
              aria-label={swatch.hex}
            />
            <p className="text-xs text-muted-foreground">{swatch.hex}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderResult = () => {
    if (!result) return null;
    return (
      <div className="px-4 py-6 space-y-6">
        {/* Photo + Tone Summary */}
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-muted flex-shrink-0">
            <ImageWithFallback
              src={result.photo}
              alt={t('result.skinTone')}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">{t('result.skinTone')}</p>
            <p className="font-semibold text-lg mb-1">{t(`tones.${result.toneKey}`)}</p>
            <p className="text-xs text-muted-foreground">{t('result.season')}</p>
            <p className="font-semibold text-lg">{t(`seasons.${result.seasonKey}`)}</p>
          </div>
        </div>

        {/* Best Palette */}
        {renderSwatchRow(t('result.palette'), result.palette)}

        {/* Avoid */}
        {renderSwatchRow(t('result.avoid'), result.avoid)}

        {/* Tip */}
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">{t('result.tip')}</p>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <Button
            className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
            onClick={() => {
              // TODO(integration): persist analysis to user profile
            }}
          >
            <Save className="w-4 h-4 me-2" />
            {t('actions.saveResults')}
          </Button>
          <Button
            variant="outline"
            className="active:bg-muted min-h-11"
            onClick={handleRetry}
          >
            <RefreshCw className="w-4 h-4 me-2" />
            {t('actions.tryAgain')}
          </Button>
          <Button
            variant="ghost"
            className="active:bg-muted min-h-11"
            onClick={() => {
              // TODO(integration): wire to Capacitor Share plugin
            }}
          >
            <Share2 className="w-4 h-4 me-2" />
            {t('actions.share')}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
      {/* Header */}
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
      <div className="flex-1 overflow-y-auto pb-[env(safe-area-inset-bottom)]">
        {loadingState === 'idle' && renderIdle()}
        {loadingState === 'analyzing' && renderAnalyzing()}
        {loadingState === 'error' && renderError()}
        {loadingState === 'success' && renderResult()}
      </div>
    </div>
  );
}
