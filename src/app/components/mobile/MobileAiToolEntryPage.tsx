import React from 'react';
import { useTranslations } from 'next-intl';
import { Camera, Upload, Scissors, Brush, Shirt } from 'lucide-react';
import { Button } from '../ui/button';
import MobileBottomNav from './MobileBottomNav';

export type AiToolEntryId = 'hairStylist' | 'nailStylist' | 'virtualTryOn';

const iconMap = {
  hairStylist: Scissors,
  nailStylist: Brush,
  virtualTryOn: Shirt,
} as const;

export default function MobileAiToolEntryPage({ tool }: { tool: AiToolEntryId }) {
  const t = useTranslations('aiTools');
  const Icon = iconMap[tool];

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center pt-[env(safe-area-inset-top)] pb-[calc(3.5rem+env(safe-area-inset-bottom))]">
        <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mb-4">
          <Icon className="w-10 h-10 text-primary-foreground" />
        </div>
        <h2 className="text-xl font-bold mb-2">{t(`${tool}.title`)}</h2>
        <p className="text-muted-foreground mb-8 max-w-sm">{t(`${tool}.subtitle`)}</p>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Button
            className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
            onClick={() => {
              // TODO(integration): open camera for this tool
            }}
          >
            <Camera className="w-5 h-5 me-2" />
            {t(`${tool}.cta.takePicture`)}
          </Button>
          <Button
            variant="outline"
            className="min-h-11 active:bg-muted"
            onClick={() => {
              // TODO(integration): open file picker
            }}
          >
            <Upload className="w-5 h-5 me-2" />
            {t(`${tool}.cta.uploadPhoto`)}
          </Button>
        </div>
      </div>

      <MobileBottomNav
        activeTab="explore"
        onTabChange={() => {
          // TODO(integration): wire to router
        }}
      />
    </div>
  );
}
