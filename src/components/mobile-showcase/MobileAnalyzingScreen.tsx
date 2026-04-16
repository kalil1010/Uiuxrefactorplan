import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function MobileAnalyzingScreen() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    'Detecting features',
    'Analyzing proportions',
    'Matching styles',
    'Generating results',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden max-w-md mx-auto border-x">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Animated Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-pulse shadow-2xl">
            <Sparkles className="w-12 h-12 text-white animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <div className="absolute inset-0 w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 animate-ping opacity-20" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-3 text-center">Analyzing...</h1>
        <p className="text-center text-muted-foreground mb-12 px-4">
          Our AI is analyzing your photo to find perfect matches
        </p>

        {/* Progress Dots */}
        <div className="flex gap-3 mb-12">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                i === activeStep % 3
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-125'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Analysis Steps */}
        <div className="w-full max-w-sm space-y-3">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-500 ${
                index <= activeStep
                  ? 'bg-muted/50 opacity-100 translate-x-0'
                  : 'opacity-40 translate-x-4'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  index <= activeStep
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                    : 'bg-muted'
                }`}
              >
                {index <= activeStep ? (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-background" />
                )}
              </div>
              <p className="text-sm font-medium">{step}</p>
            </div>
          ))}
        </div>

        {/* Bottom Hint */}
        <p className="text-xs text-muted-foreground mt-8 text-center">
          This usually takes just a few seconds...
        </p>
      </div>
    </div>
  );
}
