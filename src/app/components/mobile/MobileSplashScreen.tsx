import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Logo } from '../Logo';

interface MobileSplashScreenProps {
  onComplete?: () => void;
}

export default function MobileSplashScreen({ onComplete }: MobileSplashScreenProps) {
  const t = useTranslations('auth.splash');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 300);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="relative h-[100dvh] w-full bg-background flex flex-col px-6 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      {/* Store listing / brand graphic — very subtle behind content */}
      <div
        className="pointer-events-none absolute inset-0 bg-[length:auto_55%] bg-center bg-no-repeat opacity-[0.07] dark:opacity-[0.12]"
        style={{ backgroundImage: "url('/brand/feature-graphic.png')" }}
        aria-hidden
      />
      {/* Gradient Orbs Background */}
      <div className="absolute top-1/4 start-1/4 w-64 h-64 gradient-bg-purple-pink opacity-20 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 end-1/4 w-64 h-64 gradient-bg-coral-yellow opacity-20 blur-3xl rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Centered Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Logo */}
        <div className="relative z-10 mb-12 animate-fade-in">
          <Logo size="lg" showText={true} />
        </div>

        {/* Loading Bar */}
        <div className="relative z-10 w-full max-w-xs">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full gradient-bg transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            {t('loading')}
          </p>
        </div>
      </div>

      {/* Version */}
      <div className="text-center pb-8">
        <p className="text-xs text-muted-foreground">{t('version')}</p>
      </div>
    </div>
  );
}
