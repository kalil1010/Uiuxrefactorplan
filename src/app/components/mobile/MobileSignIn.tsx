import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Logo } from '../Logo';
import { ChevronLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import { MobileOAuthIconRow } from './MobileOAuthIconRow';

interface MobileSignInProps {
  onBack: () => void;
  onSignIn: (email: string, password: string) => void;
  onForgotPassword: () => void;
  onSignUp: () => void;
}

export default function MobileSignIn({
  onBack,
  onSignIn,
  onForgotPassword,
  onSignUp
}: MobileSignInProps) {
  const t = useTranslations('auth.signIn');
  const tCommon = useTranslations('common');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = t('errors.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t('errors.emailInvalid');
    }

    if (!password) {
      newErrors.password = t('errors.passwordRequired');
    } else if (password.length < 6) {
      newErrors.password = t('errors.passwordTooShort');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSignIn(email, password);
    }, 1000);
  };

  const isFormValid = email && password && password.length >= 6;

  return (
    <div className="flex min-h-0 flex-1 flex-col w-full bg-background">
      {/* Header — shrink-0; avoid 100dvh (uses viewport height and clips inside phone frame) */}
      <div className="shrink-0 pt-[env(safe-area-inset-top)] px-4 pb-3 border-b border-border">
        <div className="flex items-center justify-between gap-2 min-h-11">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="min-h-11 min-w-11 shrink-0 active:bg-muted"
            aria-label={tCommon('back')}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div className="min-w-0 flex-1 flex justify-center py-0.5">
            <Logo size="md" showText className="max-w-full" />
          </div>
          <div className="w-11 shrink-0" aria-hidden />
        </div>
      </div>

      {/* Content - Scrollable with keyboard inset */}
      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-6 py-6 pb-[max(env(keyboard-inset-height,0px),env(safe-area-inset-bottom),1rem)]">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
          <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">{t('email')}</Label>
            <Input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              enterKeyHint="next"
              placeholder={t('emailPlaceholder')}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: undefined });
              }}
              className="min-h-11"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-destructive">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">{t('password')}</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                enterKeyHint="done"
                placeholder={t('passwordPlaceholder')}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: undefined });
                }}
                className="min-h-11 pe-11"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute end-0 top-0 min-h-11 min-w-11 active:bg-muted"
                aria-label={showPassword ? t('hidePassword') : t('showPassword')}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Eye className="w-5 h-5 text-muted-foreground" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p id="password-error" className="text-sm text-destructive">
                {errors.password}
              </p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="text-end">
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-primary hover:underline active:underline min-h-11 flex items-center justify-end"
            >
              {t('forgot')}
            </button>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            className="w-full min-h-11 gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 me-2 animate-spin" />
                {t('signingIn')}
              </>
            ) : (
              t('cta')
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-background text-muted-foreground">{t('divider')}</span>
          </div>
        </div>

        <MobileOAuthIconRow
          onGoogle={() => {
            /* TODO: Google OAuth */
          }}
          onApple={() => {
            /* TODO: Apple OAuth */
          }}
          googleAriaLabel={t('continueGoogle')}
          appleAriaLabel={t('continueApple')}
        />

        {/* Sign Up Link */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            {t('noAccount')}{' '}
            <button
              type="button"
              onClick={onSignUp}
              className="text-primary font-semibold hover:underline active:underline"
            >
              {t('signUpLink')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
