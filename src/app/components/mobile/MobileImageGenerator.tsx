import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, Sparkles, AlertCircle, Loader2, Save, RefreshCw, Share2, Download } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type PresetKey = 'editorial' | 'streetwear' | 'runway' | 'vintage' | 'minimalist' | 'avantGarde';
type LoadingState = 'idle' | 'generating' | 'success' | 'error';

type GeneratedImage = {
  id: string;
  src: string;
  prompt: string;
};

export default function MobileImageGenerator() {
  const t = useTranslations('imageGenerator');
  const tCommon = useTranslations('common');
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [prompt, setPrompt] = useState('');
  const [preset, setPreset] = useState<PresetKey | null>(null);
  const [current, setCurrent] = useState<GeneratedImage | null>(null);
  const [recent, setRecent] = useState<GeneratedImage[]>([]);

  const presets: PresetKey[] = ['editorial', 'streetwear', 'runway', 'vintage', 'minimalist', 'avantGarde'];

  const canGenerate = prompt.trim().length > 0;

  const handleGenerate = async () => {
    if (!canGenerate) return;
    setLoadingState('generating');
    // TODO(integration): replace with actual image generation API
    await new Promise((r) => setTimeout(r, 2500));
    const generated: GeneratedImage = {
      id: `${Date.now()}`,
      src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop',
      prompt: prompt.trim(),
    };
    setCurrent(generated);
    setRecent((prev) => [generated, ...prev].slice(0, 6));
    setLoadingState('success');
  };

  const handleRetry = () => {
    setLoadingState('idle');
  };

  const renderGenerating = () => (
    <div className="px-4 py-12 flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full gradient-bg animate-pulse flex items-center justify-center mb-4">
        <Loader2 className="w-10 h-10 text-primary-foreground animate-spin" />
      </div>
      <h2
        role="status"
        aria-live="polite"
        className="text-xl font-bold mb-6"
      >
        {t('generating')}
      </h2>
      <Skeleton className="w-full max-w-sm aspect-[3/4] rounded-lg" />
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
    if (!current) return null;
    return (
      <div className="px-4 py-6 space-y-4">
        <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted">
          <ImageWithFallback
            src={current.src}
            alt={current.prompt}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-sm text-muted-foreground italic">"{current.prompt}"</p>
        <div className="grid grid-cols-2 gap-2">
          <Button
            className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
            onClick={() => {
              // TODO(integration): save to closet
            }}
          >
            <Save className="w-4 h-4 me-2" />
            {t('result.save')}
          </Button>
          <Button
            variant="outline"
            className="active:bg-muted min-h-11"
            onClick={() => {
              // TODO(integration): trigger native download / file save
            }}
          >
            <Download className="w-4 h-4 me-2" />
            {t('result.download')}
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
          className="min-h-32 resize-none"
        />
      </div>

      {/* Style Presets */}
      <div className="space-y-2">
        <Label>{t('presetsLabel')}</Label>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
          {presets.map((key) => {
            const isSelected = preset === key;
            return (
              <button
                key={key}
                onClick={() => setPreset(isSelected ? null : key)}
                className={`min-h-11 px-4 rounded-full border-2 text-sm whitespace-nowrap transition-all active:scale-95 ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary font-semibold'
                    : 'border-border bg-card hover:border-primary/50 active:border-primary/50'
                }`}
                aria-pressed={isSelected}
              >
                {t(`presets.${key}`)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent generations */}
      <div className="space-y-2">
        <h3 className="font-semibold">{t('recent.title')}</h3>
        {recent.length === 0 ? (
          <div className="bg-muted/30 rounded-lg p-6 text-center">
            <p className="text-sm text-muted-foreground">{t('recent.empty')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {recent.map((img) => (
              <button
                key={img.id}
                onClick={() => setCurrent(img)}
                className="aspect-square rounded-lg overflow-hidden bg-muted active:opacity-80 transition-opacity"
              >
                <ImageWithFallback
                  src={img.src}
                  alt={img.prompt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

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
      <div className="flex-1 overflow-y-auto pb-[calc(5rem+env(safe-area-inset-bottom))] pb-[env(keyboard-inset-height,0px)]">
        {loadingState === 'idle' && renderForm()}
        {loadingState === 'generating' && renderGenerating()}
        {loadingState === 'error' && renderError()}
        {loadingState === 'success' && renderResult()}
      </div>

      {/* Bottom CTA — only on idle */}
      {loadingState === 'idle' && (
        <div className="fixed bottom-0 start-0 end-0 z-40 bg-background border-t border-border px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
          <Button
            className="w-full gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11 relative"
            disabled={!canGenerate}
            onClick={handleGenerate}
          >
            <Sparkles className="w-5 h-5 me-2" />
            {t('generate')}
            <Badge className="absolute -top-2 -end-2 bg-primary/10 text-primary border border-primary text-[10px] h-5 px-1.5">
              {t('costHint')}
            </Badge>
          </Button>
        </div>
      )}
    </div>
  );
}
