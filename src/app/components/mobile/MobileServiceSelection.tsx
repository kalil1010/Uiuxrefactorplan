import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, Sparkles, Scissors, Brush, Shirt, Check } from 'lucide-react';
import { Button } from '../ui/button';

type ServiceId = 'stylist' | 'hairStylist' | 'nailStylist' | 'virtualTryOn';

type Service = {
  id: ServiceId;
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
};

export default function MobileServiceSelection() {
  const t = useTranslations('serviceSelection');
  const tCommon = useTranslations('common');
  const [selectedService, setSelectedService] = useState<ServiceId | null>(null);

  const services: Service[] = [
    {
      id: 'stylist',
      icon: <Sparkles className="w-6 h-6" />,
      titleKey: 'services.stylist.title',
      descriptionKey: 'services.stylist.description',
    },
    {
      id: 'hairStylist',
      icon: <Scissors className="w-6 h-6" />,
      titleKey: 'services.hairStylist.title',
      descriptionKey: 'services.hairStylist.description',
    },
    {
      id: 'nailStylist',
      icon: <Brush className="w-6 h-6" />,
      titleKey: 'services.nailStylist.title',
      descriptionKey: 'services.nailStylist.description',
    },
    {
      id: 'virtualTryOn',
      icon: <Shirt className="w-6 h-6" />,
      titleKey: 'services.virtualTryOn.title',
      descriptionKey: 'services.virtualTryOn.description',
    },
  ];

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
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

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-3">
          {services.map((service) => {
            const isSelected = selectedService === service.id;
            return (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`relative w-full flex items-start gap-4 p-4 rounded-xl border transition-all min-h-[88px] ${
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card hover:bg-muted/50 active:bg-muted'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'gradient-bg text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {service.icon}
                </div>

                <div className="flex-1 text-start">
                  <h3 className="font-semibold mb-1">{t(service.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground">{t(service.descriptionKey)}</p>
                </div>

                {isSelected && (
                  <div className="absolute top-4 end-4">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-border p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <Button
          className="w-full gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
          disabled={!selectedService}
          onClick={() => {
            // TODO(integration): navigate to selected tool
          }}
        >
          {t('cta')}
        </Button>
      </div>
    </div>
  );
}
