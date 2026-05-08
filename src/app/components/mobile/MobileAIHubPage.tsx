import React from 'react';
import { useTranslations } from 'next-intl';
import { Sparkles, Palette, Wand2, Image, Grid3x3 } from 'lucide-react';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import MobileBottomNav from './MobileBottomNav';

type AIService = {
  id: string;
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
  isPro?: boolean;
};

export default function MobileAIHubPage() {
  const t = useTranslations('aiHub');
  const tCommon = useTranslations('common');

  const services: AIService[] = [
    {
      id: 'virtualStylist',
      icon: <Sparkles className="w-6 h-6" />,
      titleKey: 'cards.virtualStylist.title',
      descriptionKey: 'cards.virtualStylist.description',
    },
    {
      id: 'outfitGenerator',
      icon: <Wand2 className="w-6 h-6" />,
      titleKey: 'cards.outfitGenerator.title',
      descriptionKey: 'cards.outfitGenerator.description',
    },
    {
      id: 'colorAnalyzer',
      icon: <Palette className="w-6 h-6" />,
      titleKey: 'cards.colorAnalyzer.title',
      descriptionKey: 'cards.colorAnalyzer.description',
      isPro: true,
    },
    {
      id: 'imageGenerator',
      icon: <Image className="w-6 h-6" />,
      titleKey: 'cards.imageGenerator.title',
      descriptionKey: 'cards.imageGenerator.description',
      isPro: true,
    },
    {
      id: 'browseOutfits',
      icon: <Grid3x3 className="w-6 h-6" />,
      titleKey: 'cards.browseOutfits.title',
      descriptionKey: 'cards.browseOutfits.description',
    },
  ];

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
      {/* Header with Safe Area */}
      <header className="sticky top-0 z-40 bg-background border-b border-border pt-[env(safe-area-inset-top)] px-4 pb-4">
        <h1 className="text-xl font-bold mb-3">{t('title')}</h1>

        {/* Search */}
        <Input
          type="search"
          inputMode="search"
          placeholder={t('searchPlaceholder')}
          className="rounded-full bg-muted border-0 min-h-11"
          enterKeyHint="search"
        />
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-[calc(3.5rem+env(safe-area-inset-bottom))] px-4">
        {/* AI Services Grid */}
        <div className="grid grid-cols-2 gap-4 py-6">
          {services.map((service) => (
            <button
              key={service.id}
              className="relative flex flex-col items-start p-4 rounded-xl border border-border bg-card hover:bg-muted/50 active:opacity-80 transition-all min-h-[140px]"
              onClick={() => {
                // TODO(integration): navigate to service
              }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-primary-foreground mb-3">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="font-semibold mb-1 text-start">{t(service.titleKey)}</h3>

              {/* Description */}
              <p className="text-xs text-muted-foreground text-start line-clamp-2">
                {t(service.descriptionKey)}
              </p>

              {/* Pro Badge */}
              {service.isPro && (
                <Badge className="absolute top-3 end-3 gradient-bg text-white border-0 text-xs">
                  {t('proBadge')}
                </Badge>
              )}
            </button>
          ))}
        </div>
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
