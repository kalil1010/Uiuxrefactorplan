import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronLeft, Share2, Trophy, AlertCircle, Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { formatRelativeTime } from '../../lib/format-time';

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

type Submission = {
  id: string;
  authorName: string;
  authorAvatar: string;
  image: string;
};

type Challenge = {
  id: string;
  title: string;
  cover: string;
  description: string;
  endsAt: number;
  prize: string;
  rules: string[];
  submissions: Submission[];
  hasSubmitted: boolean;
};

export default function MobileChallengeDetailPage() {
  const t = useTranslations('challengeDetail');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingState('success');
      // TODO(integration): replace with challenge API
      setChallenge({
        id: '1',
        title: 'Summer Streetwear',
        cover:
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&h=600&fit=crop',
        description:
          'Show off your best summer streetwear look. Mix and match pieces to create the freshest fit.',
        endsAt: Date.now() + 5 * 24 * 60 * 60 * 1000,
        prize: '$500 cash + featured spot on the home feed',
        rules: [
          'One entry per person',
          'Original photos only',
          'Tag your community for bonus visibility',
          'Respect community guidelines',
        ],
        submissions: Array.from({ length: 6 }, (_, i) => ({
          id: `s-${i + 1}`,
          authorName: `User ${i + 1}`,
          authorAvatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
          image: `https://images.unsplash.com/photo-${1490481651871 + i * 1000}?w=400&h=400&fit=crop`,
        })),
        hasSubmitted: false,
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRetry = () => {
    setLoadingState('loading');
    setTimeout(() => setLoadingState('success'), 1500);
  };

  const handleSubmit = () => {
    if (!challenge) return;
    // TODO(integration): open submission flow (camera/upload + caption)
    setChallenge({ ...challenge, hasSubmitted: true });
  };

  const renderLoading = () => (
    <div>
      <Skeleton className="w-full aspect-[2/1]" />
      <div className="px-4 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
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
    if (!challenge) return null;
    return (
      <>
        {/* Hero */}
        <div className="relative aspect-[2/1] bg-muted">
          <ImageWithFallback
            src={challenge.cover}
            alt={challenge.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-3 start-3 end-3">
            <h1 className="text-primary-foreground text-2xl font-bold">{challenge.title}</h1>
            <p className="text-primary-foreground/90 text-sm mt-1">
              {t('endsIn', { time: formatRelativeTime(challenge.endsAt, locale) })}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="px-4 py-4">
          <p className="text-sm leading-relaxed">{challenge.description}</p>
        </div>

        {/* Prize */}
        <section className="px-4 py-4 border-t border-border">
          <h2 className="font-semibold mb-2 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            {t('prize')}
          </h2>
          <p className="text-sm">{challenge.prize}</p>
        </section>

        {/* Rules */}
        <section className="px-4 py-4 border-t border-border">
          <h2 className="font-semibold mb-2">{t('rules')}</h2>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            {challenge.rules.map((rule, i) => (
              <li key={i}>{rule}</li>
            ))}
          </ol>
        </section>

        {/* Submissions */}
        <section className="px-4 py-4 border-t border-border">
          <h2 className="font-semibold mb-3">{t('submissions')}</h2>
          {challenge.submissions.length === 0 ? (
            <div className="py-8 text-center">
              <p className="font-semibold mb-1">{t('empty.title')}</p>
              <p className="text-sm text-muted-foreground">{t('empty.description')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-1">
              {challenge.submissions.map((s) => (
                <div key={s.id} className="aspect-square bg-muted">
                  <ImageWithFallback
                    src={s.image}
                    alt={s.authorName}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </>
    );
  };

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur border-b border-border pt-[env(safe-area-inset-top)] px-2 py-2 flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full min-h-11 min-w-11"
          aria-label={tCommon('back')}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className="flex-1 font-semibold text-lg truncate">{challenge?.title ?? ''}</h1>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full min-h-11 min-w-11"
          aria-label={t('shareAria')}
        >
          <Share2 className="w-5 h-5" />
        </Button>
      </header>

      <div className="flex-1 overflow-y-auto pb-[calc(5rem+env(safe-area-inset-bottom))]">
        {loadingState === 'loading' && renderLoading()}
        {loadingState === 'error' && renderError()}
        {loadingState === 'success' && renderContent()}
      </div>

      {/* Submit CTA */}
      {loadingState === 'success' && challenge && (
        <div className="fixed bottom-0 start-0 end-0 z-40 bg-background border-t border-border px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
          {challenge.hasSubmitted ? (
            <div className="flex gap-2">
              <Badge className="flex-1 gradient-bg text-primary-foreground border-0 min-h-11 flex items-center justify-center">
                {t('submitted')}
              </Badge>
              <Button variant="outline" className="active:bg-muted min-h-11">
                {t('viewEntry')}
              </Button>
            </div>
          ) : (
            <Button
              className="w-full gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
              onClick={handleSubmit}
            >
              <Upload className="w-5 h-5 me-2" />
              {t('submit')}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
