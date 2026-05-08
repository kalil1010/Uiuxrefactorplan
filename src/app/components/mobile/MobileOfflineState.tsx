import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { WifiOff, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';

interface MobileOfflineStateProps {
  onRetry?: () => Promise<void> | void;
}

export default function MobileOfflineState({ onRetry }: MobileOfflineStateProps) {
  const t = useTranslations('offline');
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      await onRetry?.();
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col px-6 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
          <WifiOff className="w-10 h-10 text-muted-foreground" />
        </div>
        <h1 className="text-xl font-bold mb-2">{t('title')}</h1>
        <p className="text-muted-foreground mb-6 max-w-sm">{t('description')}</p>
        <Button
          onClick={handleRetry}
          disabled={isRetrying}
          className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11 min-w-32"
        >
          {isRetrying ? <Loader2 className="w-5 h-5 animate-spin" /> : t('retry')}
        </Button>
      </div>
    </div>
  );
}
