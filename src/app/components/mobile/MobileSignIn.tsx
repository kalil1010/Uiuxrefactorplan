import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Logo } from '../Logo';
import { ChevronLeft, Eye, EyeOff, Loader2 } from 'lucide-react';

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
          <div className="w-11" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Content - Scrollable with keyboard inset */}
      <div className="flex-1 overflow-y-auto px-6 py-8 pb-[env(keyboard-inset-height,0px)]">
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

        {/* OAuth Buttons */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full min-h-11 active:bg-muted"
            onClick={() => {/* TODO: Google OAuth */}}
          >
            <svg className="w-5 h-5 me-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {t('continueGoogle')}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full min-h-11 active:bg-muted"
            onClick={() => {/* TODO: Apple OAuth */}}
          >
            <svg className="w-5 h-5 me-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            {t('continueApple')}
          </Button>
        </div>

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

      {/* Bottom Safe Area Spacer */}
      <div className="pb-[env(safe-area-inset-bottom)]" />
    </div>
  );
}
