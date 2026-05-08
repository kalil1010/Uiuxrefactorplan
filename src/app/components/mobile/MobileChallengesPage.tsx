import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Trophy, AlertCircle, ChevronLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { formatRelativeTime } from '../../lib/format-time';

type TabKey = 'active' | 'upcoming' | 'past';
type LoadingState = 'idle' | 'loading' | 'success' | 'error';

type Challenge = {
  id: string;
  title: string;
  cover: string;
  startsAt: number;
  endsAt: number;
  entries: number;
  prize: string;
  isJoined: boolean;
};

export default function MobileChallengesPage() {
  const t = useTranslations('challenges');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [activeTab, setActiveTab] = useState<TabKey>('active');
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingState('success');
      const now = Date.now();
      // TODO(integration): replace with challenges API
      setChallenges([
        {
          id: '1',
          title: 'Summer Streetwear',
          cover: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
          startsAt: now - 7 * 24 * 60 * 60 * 1000,
          endsAt: now + 5 * 24 * 60 * 60 * 1000,
          entries: 234,
          prize: '$500 + Featured spot',
          isJoined: true,
        },
        {
          id: '2',
          title: 'Sustainable Style',
          cover: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600',
          startsAt: now - 3 * 24 * 60 * 60 * 1000,
          endsAt: now + 10 * 24 * 60 * 60 * 1000,
          entries: 89,
          prize: 'Eco brand vouchers',
          isJoined: false,
        },
        {
          id: '3',
          title: 'Wedding Guest Look',
          cover: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600',
          startsAt: now + 7 * 24 * 60 * 60 * 1000,
          endsAt: now + 21 * 24 * 60 * 60 * 1000,
          entries: 0,
          prize: 'Designer dress',
          isJoined: false,
        },
      ]);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRetry = () => {
    setLoadingState('loading');
    setTimeout(() => setLoadingState('success'), 1500);
  };

  const formatNumber = (n: number) =>
    new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(n);

  const visible = challenges.filter((c) => {
    const now = Date.now();
    if (activeTab === 'active') return c.startsAt <= now && c.endsAt > now;
    if (activeTab === 'upcoming') return c.startsAt > now;
    return c.endsAt <= now;
  });

  const renderLoading = () => (
    <div className="px-4 py-4 space-y-3">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="w-full h-36 rounded-lg" />
      ))}
    </div>
  );

  const renderEmpty = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
        <Trophy className="w-10 h-10 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-bold mb-2">{t('empty.title')}</h2>
      <p className="text-muted-foreground mb-6 max-w-sm">{t('empty.description')}</p>
      <Button
        onClick={() => setActiveTab('past')}
        className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
      >
        {t('empty.cta')}
      </Button>
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

  const renderContent = () => {
    if (visible.length === 0) return renderEmpty();
    return (
      <div className="px-4 py-4 space-y-3">
        {visible.map((c) => {
          const now = Date.now();
          const isPast = c.endsAt <= now;
          const isUpcoming = c.startsAt > now;
          const timeLabel = isPast
            ? t('ended')
            : isUpcoming
            ? t('startsIn', { time: formatRelativeTime(c.startsAt, locale) })
            : t('endsIn', { time: formatRelativeTime(c.endsAt, locale) });

          return (
            <article
              key={c.id}
              className="relative rounded-lg overflow-hidden border border-border bg-card active:opacity-90 transition-opacity"
            >
              <div className="relative aspect-[2/1] bg-muted">
                <ImageWithFallback
                  src={c.cover}
                  alt={c.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 start-3 end-3">
                  <h3 className="text-primary-foreground font-bold text-lg">{c.title}</h3>
                </div>
                {c.isJoined && (
                  <Badge className="absolute top-3 end-3 gradient-bg text-primary-foreground border-0">
                    {t('joined')}
                  </Badge>
                )}
              </div>
              <div className="p-3 space-y-1">
                <p className="text-xs text-muted-foreground">{timeLabel}</p>
                <p className="text-xs text-muted-foreground">
                  {t('entries', { count: formatNumber(c.entries) })}
                </p>
                <p className="text-xs font-medium">{t('prize', { prize: c.prize })}</p>
              </div>
            </article>
          );
        })}
      </div>
    );
  };

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
      <header className="sticky top-0 z-40 bg-background border-b border-border pt-[env(safe-area-inset-top)] px-2 pb-0 flex flex-col">
        <div className="flex items-center gap-1 py-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full min-h-11 min-w-11"
            aria-label={tCommon('back')}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="flex-1 font-semibold text-lg">{t('title')}</h1>
        </div>
        <div className="grid grid-cols-3">
          {(['active', 'upcoming', 'past'] as TabKey[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              aria-current={activeTab === tab ? 'page' : undefined}
              className={`min-h-11 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground active:text-foreground'
              }`}
            >
              {t(`tabs.${tab}`)}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pb-[env(safe-area-inset-bottom)]">
        {loadingState === 'loading' && renderLoading()}
        {loadingState === 'error' && renderError()}
        {loadingState === 'success' && renderContent()}
      </div>
    </div>
  );
}
