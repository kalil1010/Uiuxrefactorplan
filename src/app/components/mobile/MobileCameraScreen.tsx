import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { X, Zap, ZapOff, RefreshCw, Image as ImageIcon, Circle } from 'lucide-react';
import { Button } from '../ui/button';

type CameraMode = 'photo' | 'video' | 'square';

export default function MobileCameraScreen() {
  const t = useTranslations('camera');
  const tCommon = useTranslations('common');
  const [flashOn, setFlashOn] = useState(false);
  const [mode, setMode] = useState<CameraMode>('photo');

  return (
    <div className="h-[100dvh] w-full bg-black flex flex-col relative">
      {/* Camera Preview Placeholder */}
      <div className="absolute inset-0 bg-muted flex items-center justify-center">
        {/* TODO(integration): wire to Capacitor Camera plugin with getUserMedia */}
        <p className="text-muted-foreground text-sm">Camera Preview</p>
      </div>

      {/* Top Controls */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-[calc(0.75rem+env(safe-area-inset-top))] pb-3">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full min-h-11 min-w-11 bg-black/50 hover:bg-black/70 active:bg-black/80 text-white"
          aria-label={t('closeAria')}
          onClick={() => {
            // TODO(integration): navigate back
          }}
        >
          <X className="w-6 h-6" />
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full min-h-11 min-w-11 bg-black/50 hover:bg-black/70 active:bg-black/80 text-white"
            aria-label={t('flashAria')}
            onClick={() => setFlashOn(!flashOn)}
          >
            {flashOn ? <Zap className="w-5 h-5" /> : <ZapOff className="w-5 h-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full min-h-11 min-w-11 bg-black/50 hover:bg-black/70 active:bg-black/80 text-white"
            aria-label={t('flipAria')}
            onClick={() => {
              // TODO(integration): flip camera
            }}
          >
            <RefreshCw className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="relative z-10 mt-auto px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
        {/* Mode Selector */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {(['photo', 'video', 'square'] as CameraMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all min-h-11 ${
                mode === m
                  ? 'bg-white text-black'
                  : 'text-white/70 hover:text-white active:text-white'
              }`}
            >
              {t(`modes.${m}`)}
            </button>
          ))}
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-between">
          {/* Gallery */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg min-h-11 min-w-11 bg-black/50 hover:bg-black/70 active:bg-black/80 text-white"
            aria-label={t('galleryAria')}
            onClick={() => {
              // TODO(integration): open gallery picker
            }}
          >
            <ImageIcon className="w-6 h-6" />
          </Button>

          {/* Shutter Button */}
          <button
            className="w-20 h-20 rounded-full bg-white border-4 border-white/30 hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
            aria-label={t('shutterAria')}
            onClick={() => {
              // TODO(integration): capture photo
            }}
          >
            <Circle className="w-16 h-16 fill-white" />
          </button>

          {/* Spacer for symmetry */}
          <div className="w-11" />
        </div>
      </div>
    </div>
  );
}
