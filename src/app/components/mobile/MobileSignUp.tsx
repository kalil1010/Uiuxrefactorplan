import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Logo } from '../Logo';
import { ChevronLeft, Eye, EyeOff, AlertCircle, Loader2, Calendar } from 'lucide-react';
import MobileBirthdayPicker, { calculateAge } from './MobileBirthdayPicker';
import { MobileOAuthIconRow } from './MobileOAuthIconRow';

interface MobileSignUpProps {
  onBack: () => void;
  onSignUp: (data: {
    email: string;
    password: string;
    displayName: string;
    dateOfBirth: { year: number; month: number; day: number };
  }) => void;
  onSignIn: () => void;
}

export default function MobileSignUp({ onBack, onSignUp, onSignIn }: MobileSignUpProps) {
  const t = useTranslations('auth.signUp');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    dateOfBirth: null as { year: number; month: number; day: number } | null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isBirthdayPickerOpen, setIsBirthdayPickerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Display Name validation
    if (!formData.displayName.trim()) {
      newErrors.displayName = t('errors.displayNameRequired');
    } else if (formData.displayName.trim().length < 2) {
      newErrors.displayName = t('errors.displayNameTooShort');
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = t('errors.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('errors.emailInvalid');
    }

    // Date of Birth validation (COPPA age gate)
    if (!formData.dateOfBirth) {
      newErrors.birthYear = t('errors.birthYearRequired');
    } else {
      const age = calculateAge(
        formData.dateOfBirth.year,
        formData.dateOfBirth.month,
        formData.dateOfBirth.day
      );
      if (age < 13) {
        const maxYear = new Date().getFullYear() - 13;
        newErrors.birthYear = t('errors.birthYearInvalid', { year: maxYear });
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = t('errors.passwordRequired');
    } else if (formData.password.length < 8) {
      newErrors.password = t('errors.passwordTooShort');
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = t('errors.passwordWeak');
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('errors.confirmPasswordRequired');
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('errors.passwordMismatch');
    }

    if (!captchaVerified) {
      newErrors.captcha = t('errors.captchaRequired');
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
      onSignUp({
        email: formData.email,
        password: formData.password,
        displayName: formData.displayName.trim(),
        dateOfBirth: formData.dateOfBirth!,
      });
    }, 1000);
  };

  const updateField = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: undefined });
  };

  const handleBirthdayConfirm = (year: number, month: number, day: number) => {
    setFormData({ ...formData, dateOfBirth: { year, month, day } });
    setErrors({ ...errors, birthYear: undefined });
  };

  const formatDateOfBirth = () => {
    if (!formData.dateOfBirth) return '';
    const { year, month, day } = formData.dateOfBirth;
    const date = new Date(year, month, day);
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const isFormValid =
    formData.displayName.trim() &&
    formData.email &&
    formData.password.length >= 8 &&
    formData.password === formData.confirmPassword &&
    formData.dateOfBirth &&
    calculateAge(formData.dateOfBirth.year, formData.dateOfBirth.month, formData.dateOfBirth.day) >= 13 &&
    captchaVerified;

  return (
    <div className="flex min-h-0 flex-1 flex-col w-full bg-background">
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

      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-6 py-6 pb-[max(env(keyboard-inset-height,0px),env(safe-area-inset-bottom),1rem)]">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
          <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Display Name Field */}
          <div className="space-y-2">
            <Label htmlFor="displayName">{t('displayName')}</Label>
            <Input
              id="displayName"
              type="text"
              autoComplete="name"
              enterKeyHint="next"
              placeholder={t('displayNamePlaceholder')}
              value={formData.displayName}
              onChange={(e) => updateField('displayName', e.target.value)}
              className="min-h-11"
              aria-invalid={!!errors.displayName}
              aria-describedby={errors.displayName ? 'displayName-error' : undefined}
            />
            {errors.displayName && (
              <p id="displayName-error" className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.displayName}
              </p>
            )}
          </div>

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
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="min-h-11"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Date of Birth Field */}
          <div className="space-y-2">
            <Label htmlFor="birthDate">{t('birthYear')}</Label>
            <button
              type="button"
              onClick={() => setIsBirthdayPickerOpen(true)}
              className="w-full min-h-11 px-3 py-2 rounded-md border border-input bg-background text-start flex items-center justify-between hover:bg-accent active:bg-accent transition-colors"
              aria-invalid={!!errors.birthYear}
              aria-describedby={errors.birthYear ? 'birthYear-error' : undefined}
            >
              <span className={formData.dateOfBirth ? 'text-foreground' : 'text-muted-foreground'}>
                {formData.dateOfBirth ? formatDateOfBirth() : t('birthYearPlaceholder', { year: new Date().getFullYear() - 18 })}
              </span>
              <Calendar className="w-5 h-5 text-muted-foreground" />
            </button>
            {errors.birthYear && (
              <p id="birthYear-error" className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.birthYear}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              {t('birthYearHint')}
            </p>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">{t('password')}</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                enterKeyHint="next"
                placeholder={t('passwordPlaceholder')}
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                className="min-h-11 pe-11"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
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
              <p id="password-error" className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.password}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              {t('passwordHint')}
            </p>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                enterKeyHint="done"
                placeholder={t('confirmPasswordPlaceholder')}
                value={formData.confirmPassword}
                onChange={(e) => updateField('confirmPassword', e.target.value)}
                className="min-h-11 pe-11"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute end-0 top-0 min-h-11 min-w-11 active:bg-muted"
                aria-label={showConfirmPassword ? t('hidePasswordConfirmation') : t('showPasswordConfirmation')}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Eye className="w-5 h-5 text-muted-foreground" />
                )}
              </Button>
            </div>
            {errors.confirmPassword && (
              <p id="confirmPassword-error" className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* CAPTCHA — wireframe stand-in for Turnstile / similar (ZokaiHub uses Turnstile when configured) */}
          <div className="space-y-2">
            <Label className="sr-only">{t('captchaAria')}</Label>
            <div
              className={`flex items-start gap-3 rounded-xl border p-4 min-h-[3.25rem] ${
                errors.captcha ? 'border-destructive' : 'border-border bg-muted/30'
              }`}
            >
              <Checkbox
                id="sign-up-captcha"
                checked={captchaVerified}
                onCheckedChange={(v) => {
                  setCaptchaVerified(v === true);
                  setErrors((prev) => ({ ...prev, captcha: undefined }));
                }}
                aria-invalid={!!errors.captcha}
                aria-describedby={errors.captcha ? 'captcha-error' : 'captcha-hint'}
                className="mt-0.5 size-5"
              />
              <div className="min-w-0 flex-1 space-y-1">
                <label htmlFor="sign-up-captcha" className="text-sm font-medium leading-snug cursor-pointer">
                  {t('captchaLabel')}
                </label>
                <p id="captcha-hint" className="text-xs text-muted-foreground">
                  {t('captchaHint')}
                </p>
              </div>
            </div>
            {errors.captcha && (
              <p id="captcha-error" className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errors.captcha}
              </p>
            )}
          </div>

          {/* Sign Up Button */}
          <Button
            type="submit"
            className="w-full min-h-11 gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 me-2 animate-spin" />
                {t('creatingAccount')}
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

        {/* Sign In Link */}
        <div className="text-center mt-8 mb-4">
          <p className="text-sm text-muted-foreground">
            {t('haveAccount')}{' '}
            <button
              type="button"
              onClick={onSignIn}
              className="text-primary font-semibold hover:underline active:underline"
            >
              {t('signInLink')}
            </button>
          </p>
        </div>
      </div>

      {/* Birthday Picker */}
      <MobileBirthdayPicker
        isOpen={isBirthdayPickerOpen}
        onClose={() => setIsBirthdayPickerOpen(false)}
        onConfirm={handleBirthdayConfirm}
        initialYear={formData.dateOfBirth?.year}
        initialMonth={formData.dateOfBirth?.month}
        initialDay={formData.dateOfBirth?.day}
      />
    </div>
  );
}
