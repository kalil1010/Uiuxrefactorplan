import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import { Logo } from '../Logo';
import { ChevronLeft, Check } from 'lucide-react';
import { Progress } from '../ui/progress';
import { cn } from '../ui/utils';

interface StyleSetupData {
  gender: string[];
  bodyType: string[];
  stylePreferences: string[];
  favoriteColors: string[];
  occasions: string[];
}

interface MobileStyleSetupProps {
  onComplete: (data: StyleSetupData) => void;
  onBack: () => void;
}

export default function MobileStyleSetup({ onComplete, onBack }: MobileStyleSetupProps) {
  const t = useTranslations('auth.styleSetup');
  const tCommon = useTranslations('common');
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<StyleSetupData>({
    gender: [],
    bodyType: [],
    stylePreferences: [],
    favoriteColors: [],
    occasions: [],
  });

  const totalSteps = 5;

  const toggleSelection = (field: keyof StyleSetupData, value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(data);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleSkip = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(data);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return data.gender.length > 0;
      case 1:
        return data.bodyType.length > 0;
      case 2:
        return data.stylePreferences.length > 0;
      case 3:
        return data.favoriteColors.length > 0;
      case 4:
        return data.occasions.length > 0;
      default:
        return false;
    }
  };

  const genderOptions = [
    { value: 'male', label: t('gender.options.male') },
    { value: 'female', label: t('gender.options.female') },
    { value: 'nonBinary', label: t('gender.options.nonBinary') },
    { value: 'preferNotToSay', label: t('gender.options.preferNotToSay') },
  ];

  const bodyTypeOptions = [
    { value: 'petite', label: t('bodyType.options.petite') },
    { value: 'slim', label: t('bodyType.options.slim') },
    { value: 'athletic', label: t('bodyType.options.athletic') },
    { value: 'curvy', label: t('bodyType.options.curvy') },
    { value: 'plus', label: t('bodyType.options.plus') },
  ];

  const styleOptions = [
    { value: 'casual', label: t('style.options.casual'), emoji: '👕' },
    { value: 'formal', label: t('style.options.formal'), emoji: '👔' },
    { value: 'streetwear', label: t('style.options.streetwear'), emoji: '🧢' },
    { value: 'bohemian', label: t('style.options.bohemian'), emoji: '🌸' },
    { value: 'vintage', label: t('style.options.vintage'), emoji: '🕰️' },
    { value: 'minimalist', label: t('style.options.minimalist'), emoji: '⚪' },
    { value: 'sporty', label: t('style.options.sporty'), emoji: '⚽' },
    { value: 'elegant', label: t('style.options.elegant'), emoji: '✨' },
  ];

  const colorOptions = [
    { value: 'black', label: t('colors.options.black'), color: '#000000' },
    { value: 'white', label: t('colors.options.white'), color: '#FFFFFF' },
    { value: 'gray', label: t('colors.options.gray'), color: '#808080' },
    { value: 'beige', label: t('colors.options.beige'), color: '#F5F5DC' },
    { value: 'navy', label: t('colors.options.navy'), color: '#000080' },
    { value: 'red', label: t('colors.options.red'), color: '#FF0000' },
    { value: 'pink', label: t('colors.options.pink'), color: '#FFC0CB' },
    { value: 'orange', label: t('colors.options.orange'), color: '#FFA500' },
    { value: 'yellow', label: t('colors.options.yellow'), color: '#FFFF00' },
    { value: 'green', label: t('colors.options.green'), color: '#008000' },
    { value: 'blue', label: t('colors.options.blue'), color: '#0000FF' },
    { value: 'purple', label: t('colors.options.purple'), color: '#800080' },
  ];

  const occasionOptions = [
    { value: 'work', label: t('occasions.options.work'), emoji: '💼' },
    { value: 'casual', label: t('occasions.options.casual'), emoji: '☕' },
    { value: 'party', label: t('occasions.options.party'), emoji: '🎉' },
    { value: 'date', label: t('occasions.options.date'), emoji: '❤️' },
    { value: 'wedding', label: t('occasions.options.wedding'), emoji: '💒' },
    { value: 'gym', label: t('occasions.options.gym'), emoji: '🏋️' },
    { value: 'travel', label: t('occasions.options.travel'), emoji: '✈️' },
    { value: 'beach', label: t('occasions.options.beach'), emoji: '🏖️' },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">{t('gender.title')}</h2>
              <p className="text-sm text-muted-foreground">{t('gender.subtitle')}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {genderOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleSelection('gender', option.value)}
                  className={cn(
                    'min-h-11 px-4 py-3 rounded-lg border-2 transition-all active:scale-95',
                    data.gender.includes(option.value)
                      ? 'border-primary bg-primary/10 font-semibold'
                      : 'border-border bg-card hover:border-primary/50 active:border-primary/50'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{option.label}</span>
                    {data.gender.includes(option.value) && (
                      <Check className="w-4 h-4 text-primary ms-2" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">{t('bodyType.title')}</h2>
              <p className="text-sm text-muted-foreground">{t('bodyType.subtitle')}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {bodyTypeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleSelection('bodyType', option.value)}
                  className={cn(
                    'min-h-11 px-4 py-3 rounded-lg border-2 transition-all active:scale-95',
                    data.bodyType.includes(option.value)
                      ? 'border-primary bg-primary/10 font-semibold'
                      : 'border-border bg-card hover:border-primary/50 active:border-primary/50'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{option.label}</span>
                    {data.bodyType.includes(option.value) && (
                      <Check className="w-4 h-4 text-primary ms-2" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">{t('style.title')}</h2>
              <p className="text-sm text-muted-foreground">{t('style.subtitle')}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {styleOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleSelection('stylePreferences', option.value)}
                  className={cn(
                    'min-h-11 px-4 py-3 rounded-lg border-2 transition-all active:scale-95',
                    data.stylePreferences.includes(option.value)
                      ? 'border-primary bg-primary/10 font-semibold'
                      : 'border-border bg-card hover:border-primary/50 active:border-primary/50'
                  )}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl">{option.emoji}</span>
                    <span className="text-sm">{option.label}</span>
                    {data.stylePreferences.includes(option.value) && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">{t('colors.title')}</h2>
              <p className="text-sm text-muted-foreground">{t('colors.subtitle')}</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleSelection('favoriteColors', option.value)}
                  className={cn(
                    'min-h-11 px-3 py-3 rounded-lg border-2 transition-all active:scale-95',
                    data.favoriteColors.includes(option.value)
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-card hover:border-primary/50 active:border-primary/50'
                  )}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="w-10 h-10 rounded-full border-2 border-border"
                      style={{ backgroundColor: option.color }}
                    />
                    <span className="text-xs">{option.label}</span>
                    {data.favoriteColors.includes(option.value) && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">{t('occasions.title')}</h2>
              <p className="text-sm text-muted-foreground">{t('occasions.subtitle')}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {occasionOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleSelection('occasions', option.value)}
                  className={cn(
                    'min-h-11 px-4 py-3 rounded-lg border-2 transition-all active:scale-95',
                    data.occasions.includes(option.value)
                      ? 'border-primary bg-primary/10 font-semibold'
                      : 'border-border bg-card hover:border-primary/50 active:border-primary/50'
                  )}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl">{option.emoji}</span>
                    <span className="text-sm">{option.label}</span>
                    {data.occasions.includes(option.value) && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
      {/* Header with Safe Area */}
      <div className="pt-[env(safe-area-inset-top)] px-4 pb-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="min-h-11 min-w-11 active:bg-muted"
            aria-label={tCommon('back')}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Logo size="md" showText={true} />
          <button
            onClick={handleSkip}
            className="text-sm font-medium text-muted-foreground hover:text-foreground active:text-foreground px-3 min-h-11 flex items-center"
          >
            {tCommon('skip')}
          </button>
        </div>
        {/* Progress Bar */}
        <div className="space-y-1">
          <Progress value={progressPercentage} className="h-1" />
          <p className="text-xs text-muted-foreground text-center">
            {t('progress', { current: currentStep + 1, total: totalSteps })}
          </p>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-[env(keyboard-inset-height,0px)]">
        {renderStep()}
      </div>

      {/* Footer with CTA */}
      <div className="px-6 py-4 border-t border-border pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <Button
          onClick={handleNext}
          className="w-full min-h-11 gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80"
          disabled={!canProceed()}
        >
          {currentStep < totalSteps - 1 ? tCommon('next') : tCommon('done')}
        </Button>
      </div>
    </div>
  );
}
