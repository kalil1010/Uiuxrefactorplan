import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Logo } from '../Logo';
import { ChevronLeft, Eye, EyeOff, AlertCircle, Loader2, Calendar } from 'lucide-react';
import MobileBirthdayPicker, { calculateAge } from './MobileBirthdayPicker';

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
    calculateAge(formData.dateOfBirth.year, formData.dateOfBirth.month, formData.dateOfBirth.day) >= 13;

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

        {/* OAuth Buttons */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full min-h-11 active:bg-muted"
            onClick={() => {}}
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
            onClick={() => {}}
          >
            <svg className="w-5 h-5 me-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            {t('continueApple')}
          </Button>
        </div>

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

      {/* Bottom Safe Area Spacer */}
      <div className="pb-[env(safe-area-inset-bottom)]" />

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
