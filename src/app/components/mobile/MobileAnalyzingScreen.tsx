import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

type AnalysisStep = 'detectingStyle' | 'analyzingColors' | 'generatingRecommendations' | 'almostDone';

export default function MobileAnalyzingScreen() {
  const t = useTranslations('analyzing');
  const tCommon = useTranslations('common');
  const [currentStep, setCurrentStep] = useState<AnalysisStep>('detectingStyle');
  const [progress, setProgress] = useState(0);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const steps: AnalysisStep[] = ['detectingStyle', 'analyzingColors', 'generatingRecommendations', 'almostDone'];

  // Simulate progress
  useEffect(() => {
    // TODO(integration): replace with actual AI analysis progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 1, 100);

        // Update step based on progress
        if (next >= 75) setCurrentStep('almostDone');
        else if (next >= 50) setCurrentStep('generatingRecommendations');
        else if (next >= 25) setCurrentStep('analyzingColors');

        if (next >= 100) {
          clearInterval(progressInterval);
          // TODO(integration): navigate to preview screen
        }

        return next;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <>
      <div className="h-[100dvh] w-full bg-background flex flex-col items-center justify-center px-6">
        {/* Animated Loader */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full gradient-bg animate-pulse flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-primary-foreground animate-spin" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-2 text-center">{t('title')}</h1>

        {/* Current Step */}
        <p className="text-muted-foreground text-center mb-8">{t(`steps.${currentStep}`)}</p>

        {/* Progress Bar */}
        <div className="w-full max-w-xs mb-8">
          <Progress value={progress} className="h-2" />
          <p className="text-center text-sm text-muted-foreground mt-2">{progress}%</p>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center gap-2 mb-12">
          {steps.map((step, index) => {
            const stepIndex = steps.indexOf(currentStep);
            const isActive = index <= stepIndex;
            return (
              <div
                key={step}
                className={`h-2 rounded-full transition-all ${
                  isActive ? 'w-8 bg-primary' : 'w-2 bg-muted'
                }`}
              />
            );
          })}
        </div>

        {/* Cancel Button */}
        <Button
          variant="ghost"
          className="min-h-11"
          onClick={() => setShowCancelDialog(true)}
        >
          {t('cancel')}
        </Button>
      </div>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('cancelConfirmTitle')}</AlertDialogTitle>
            <AlertDialogDescription>{t('cancelConfirmMessage')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('noStay')}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                // TODO(integration): cancel analysis and navigate back
              }}
            >
              {t('yesCancel')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
