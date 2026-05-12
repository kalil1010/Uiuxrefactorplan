import React from 'react';
import { useTranslations } from 'next-intl';
import { Sparkles, Scissors, Brush, Shirt } from 'lucide-react';
import { Input } from '../ui/input';
import MobileBottomNav from './MobileBottomNav';

type AIService = {
  id: string;
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
};

/**
 * Hub aligned with ZokaiHub AI workspace tools: stylist, hair_stylist, nail_stylist, virtual_tryon.
 */
export default function MobileAIHubPage() {
  const t = useTranslations('aiHub');

  const services: AIService[] = [
    {
      id: 'stylist',
      icon: <Sparkles className="w-6 h-6" />,
      titleKey: 'cards.stylist.title',
      descriptionKey: 'cards.stylist.description',
    },
    {
      id: 'hairStylist',
      icon: <Scissors className="w-6 h-6" />,
      titleKey: 'cards.hairStylist.title',
      descriptionKey: 'cards.hairStylist.description',
    },
    {
      id: 'nailStylist',
      icon: <Brush className="w-6 h-6" />,
      titleKey: 'cards.nailStylist.title',
      descriptionKey: 'cards.nailStylist.description',
    },
    {
      id: 'virtualTryOn',
      icon: <Shirt className="w-6 h-6" />,
      titleKey: 'cards.virtualTryOn.title',
      descriptionKey: 'cards.virtualTryOn.description',
    },
  ];

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
      <header className="sticky top-0 z-40 bg-background border-b border-border pt-[env(safe-area-inset-top)] px-4 pb-4">
        <h1 className="text-xl font-bold mb-3">{t('title')}</h1>

        <Input
          type="search"
          inputMode="search"
          placeholder={t('searchPlaceholder')}
          className="rounded-full bg-muted border-0 min-h-11"
          enterKeyHint="search"
        />
      </header>

      <div className="flex-1 overflow-y-auto pb-[calc(3.5rem+env(safe-area-inset-bottom))] px-4">
        <div className="grid grid-cols-2 gap-4 py-6">
          {services.map((service) => (
            <button
              key={service.id}
              className="relative flex flex-col items-start p-4 rounded-xl border border-border bg-card hover:bg-muted/50 active:opacity-80 transition-all min-h-[140px]"
              onClick={() => {
                // TODO(integration): navigate to tool ?tool=
              }}
            >
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-primary-foreground mb-3">
                {service.icon}
              </div>

              <h3 className="font-semibold mb-1 text-start">{t(service.titleKey)}</h3>

              <p className="text-xs text-muted-foreground text-start line-clamp-3">
                {t(service.descriptionKey)}
              </p>
            </button>
          ))}
        </div>
      </div>

      <MobileBottomNav
        activeTab="explore"
        onTabChange={(tab) => {
          // TODO(integration): wire to next-intl router
        }}
      />
    </div>
  );
}
