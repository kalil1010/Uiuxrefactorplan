import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Logo } from '../Logo';
import { ChevronLeft, Loader2, CheckCircle2 } from 'lucide-react';

interface MobileForgotPasswordProps {
  onBack: () => void;
}

export default function MobileForgotPassword({ onBack }: MobileForgotPasswordProps) {
  const t = useTranslations('auth.forgotPassword');
  const tCommon = useTranslations('common');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const startCountdown = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setCountdown(60);
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError(t('errors.emailRequired'));
      return;
    }

    if (!validateEmail(email)) {
      setError(t('errors.emailInvalid'));
      return;
    }

    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      startCountdown();
    }, 1000);
  };

  const handleResend = () => {
    if (countdown > 0) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      startCountdown();
    }, 1000);
  };

  const isFormValid = email && validateEmail(email);

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
      {/* Header with Safe Area */}
      <div className="pt-[env(safe-area-inset-top)] px-4 pb-4 border-b border-border">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="min-h-11 min-w-11 active:bg-muted"
            aria-label={tCommon('back')}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Logo size="md" showText={true} />
          <div className="w-11" />
        </div>
      </div>

      {/* Content - Scrollable with keyboard inset */}
      <div className="flex-1 overflow-y-auto px-6 py-8 pb-[env(keyboard-inset-height,0px)]">
        {!isSuccess ? (
          <>
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
              <p className="text-muted-foreground">{t('subtitle')}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder={t('emailPlaceholder')}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className="min-h-11"
                  enterKeyHint="send"
                  aria-invalid={!!error}
                  aria-describedby={error ? 'email-error' : undefined}
                />
                {error && (
                  <p id="email-error" className="text-sm text-destructive">
                    {error}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full min-h-11 gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80"
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 me-2 animate-spin" />
                    {t('sending')}
                  </>
                ) : (
                  t('cta')
                )}
              </Button>
            </form>

            {/* Back to Sign In Link */}
            <div className="mt-8 text-center">
              <button
                onClick={onBack}
                className="text-sm text-muted-foreground hover:text-foreground active:text-foreground transition-colors"
              >
                {t('backToSignIn')}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Success State */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-2">{t('successTitle')}</h1>
              <p className="text-muted-foreground">{t('successSubtitle')}</p>
            </div>

            {/* Email Sent Info */}
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <p className="text-sm text-center text-muted-foreground">
                {t('emailSentTo', { email })}
              </p>
            </div>

            {/* Resend Button */}
            <Button
              onClick={handleResend}
              className="w-full min-h-11 gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80"
              disabled={countdown > 0 || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 me-2 animate-spin" />
                  {t('sending')}
                </>
              ) : countdown > 0 ? (
                t('resendCountdown', { seconds: countdown })
              ) : (
                t('resend')
              )}
            </Button>

            {/* Back to Sign In Link */}
            <div className="mt-6 text-center">
              <button
                onClick={onBack}
                className="text-sm text-muted-foreground hover:text-foreground active:text-foreground transition-colors"
              >
                {t('backToSignIn')}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Safe Area Bottom */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </div>
  );
}
