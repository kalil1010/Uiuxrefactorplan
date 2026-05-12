import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import { Logo } from '../Logo';
import { Sparkles, Shirt, Users, TrendingUp } from 'lucide-react';

interface MobileLandingPageProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

export default function MobileLandingPage({ onSignIn, onSignUp }: MobileLandingPageProps) {
  const t = useTranslations('auth.landing');

  const features = [
    {
      icon: Sparkles,
      title: t('features.aiStyling.title'),
      description: t('features.aiStyling.description')
    },
    {
      icon: Shirt,
      title: t('features.digitalCloset.title'),
      description: t('features.digitalCloset.description')
    },
    {
      icon: Users,
      title: t('features.community.title'),
      description: t('features.community.description')
    },
    {
      icon: TrendingUp,
      title: t('features.analytics.title'),
      description: t('features.analytics.description')
    }
  ];

  return (
    <div className="flex min-h-0 flex-1 flex-col w-full bg-background">
      {/* Header with Safe Area */}
      <div className="shrink-0 pt-[env(safe-area-inset-top)] px-6 pb-4">
        <div className="flex justify-center pt-6">
          <Logo size="lg" showText={true} />
        </div>
      </div>

      {/* Content — scrolls inside the phone frame (avoid 100dvh: it uses viewport, not frame height) */}
      <div className="min-h-0 flex-1 overflow-y-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3 leading-tight">
            {t('title')}
            <span className="block gradient-text-purple-pink">{t('titleGradient')}</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-3 pb-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-4 text-center"
            >
              <div className="w-12 h-12 rounded-full gradient-bg-purple-pink flex items-center justify-center mx-auto mb-3">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pinned above bottom — inside frame height */}
      <div className="shrink-0 bg-background border-t border-border px-6 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <div className="space-y-3">
          <Button
            onClick={onSignUp}
            className="w-full min-h-11 gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80"
          >
            <Sparkles className="w-5 h-5 me-2" />
            {t('cta.getStarted')}
          </Button>
          <Button
            onClick={onSignIn}
            variant="outline"
            className="w-full min-h-11 active:bg-muted"
          >
            {t('cta.signIn')}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          {t.rich('legal', {
            terms: (chunks) => (
              <a href="/legal/terms" className="text-primary hover:underline active:underline">
                {chunks}
              </a>
            ),
            privacy: (chunks) => (
              <a href="/legal/privacy" className="text-primary hover:underline active:underline">
                {chunks}
              </a>
            )
          })}
        </p>
      </div>
    </div>
  );
}
