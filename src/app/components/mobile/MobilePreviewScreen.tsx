import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, Save, RefreshCw, Share2, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export default function MobilePreviewScreen() {
  const t = useTranslations('preview');
  const tCommon = useTranslations('common');
  const [isSaving, setIsSaving] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // TODO(integration): save to closet
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    // TODO(integration): regenerate AI result
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsRegenerating(false);
  };

  const handleShare = () => {
    // TODO(integration): wire to Capacitor Share plugin
  };

  const handleDiscard = () => {
    // TODO(integration): navigate back
  };

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
      {/* Header with Safe Area */}
      <header className="sticky top-0 z-40 bg-background border-b border-border pt-[env(safe-area-inset-top)] px-4 py-3 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full min-h-11 min-w-11"
          aria-label={tCommon('back')}
          onClick={handleDiscard}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className="flex-1 font-semibold text-lg">{t('title')}</h1>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-[calc(5rem+env(safe-area-inset-bottom))]">
        {/* Hero Image */}
        <div className="w-full aspect-square bg-muted">
          {/* TODO(integration): replace with actual AI result image */}
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=800&fit=crop"
            alt={t('heroAlt')}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Result Details */}
        <div className="px-4 py-6 space-y-4">
          {/* TODO(integration): replace with actual AI analysis details from API */}
          <div>
            <h2 className="font-bold text-xl mb-2">Summer Casual Look</h2>
            <p className="text-muted-foreground">
              Perfect for warm weather and outdoor activities. This outfit combines comfort with style,
              featuring breathable fabrics and vibrant colors.
            </p>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="font-semibold mb-3">{t('stylingTips.title')}</h3>
            {/* TODO(integration): replace with actual AI-generated tips */}
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span className="text-sm text-muted-foreground flex-1">
                  Add white sneakers for a casual vibe
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span className="text-sm text-muted-foreground flex-1">
                  Layer with a denim jacket for cooler evenings
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span className="text-sm text-muted-foreground flex-1">
                  Accessorize with simple gold jewelry
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 start-0 end-0 z-40 bg-background border-t border-border p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <div className="grid grid-cols-2 gap-3">
          {/* Save Button */}
          <Button
            className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
            disabled={isSaving}
            onClick={handleSave}
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-4 h-4 me-2 animate-spin" />
                {t('actions.saving')}
              </>
            ) : (
              <>
                <Save className="w-4 h-4 me-2" />
                {t('actions.save')}
              </>
            )}
          </Button>

          {/* Regenerate Button */}
          <Button
            className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11 relative"
            disabled={isRegenerating}
            onClick={handleRegenerate}
          >
            {isRegenerating ? (
              <>
                <RefreshCw className="w-4 h-4 me-2 animate-spin" />
                {t('actions.regenerating')}
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 me-2" />
                {t('actions.regenerate')}
                <Badge className="absolute -top-2 -end-2 bg-primary/10 text-primary border border-primary text-[10px] h-5 px-1.5">
                  {t('costHint')}
                </Badge>
              </>
            )}
          </Button>

          {/* Share Button */}
          <Button
            variant="outline"
            className="min-h-11 active:bg-muted"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4 me-2" />
            {t('actions.share')}
          </Button>

          {/* Discard Button */}
          <Button
            variant="ghost"
            className="min-h-11 active:bg-muted"
            onClick={handleDiscard}
          >
            <X className="w-4 h-4 me-2" />
            {t('actions.discard')}
          </Button>
        </div>
      </div>
    </div>
  );
}
