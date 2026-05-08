import React from 'react';
import { useTranslations } from 'next-intl';
import { Compass, ChevronLeft } from 'lucide-react';
import { Button } from '../ui/button';

export default function MobileNotFoundPage() {
  const t = useTranslations('notFound');

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col px-6 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 rounded-full gradient-bg-purple-pink flex items-center justify-center mb-6">
          <Compass className="w-12 h-12 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold mb-2">404</h1>
        <h2 className="text-xl font-semibold mb-2">{t('title')}</h2>
        <p className="text-muted-foreground mb-8 max-w-sm">{t('description')}</p>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Button
            className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
            onClick={() => {
              // TODO(integration): navigate home
            }}
          >
            {t('goHome')}
          </Button>
          <Button
            variant="ghost"
            className="active:bg-muted min-h-11"
            onClick={() => {
              // TODO(integration): navigate back
            }}
          >
            <ChevronLeft className="w-4 h-4 me-2" />
            {t('goBack')}
          </Button>
        </div>
      </div>
    </div>
  );
}
