import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { X, Camera, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerFooter,
} from '../ui/drawer';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface InitialProfile {
  avatar: string;
  displayName: string;
  username: string;
  bio: string;
  website: string;
}

interface MobileEditProfileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  initial: InitialProfile;
  onSave: (data: InitialProfile) => Promise<void> | void;
}

export default function MobileEditProfileSheet({
  isOpen,
  onClose,
  initial,
  onSave,
}: MobileEditProfileSheetProps) {
  const t = useTranslations('editProfile');
  const tCommon = useTranslations('common');
  const [data, setData] = useState<InitialProfile>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof InitialProfile, string>>>({});
  const [isSaving, setIsSaving] = useState(false);

  const update = (key: keyof InitialProfile, value: string) => {
    setData({ ...data, [key]: value });
    setErrors({ ...errors, [key]: undefined });
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!data.displayName.trim()) e.displayName = t('errors.displayNameRequired');
    if (!data.username.trim()) e.username = t('errors.usernameRequired');
    else if (!/^[a-zA-Z0-9_]+$/.test(data.username)) e.username = t('errors.usernameInvalid');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setIsSaving(true);
    try {
      await onSave(data);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-lg">{t('title')}</DrawerTitle>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full min-h-11 min-w-11 active:bg-muted"
                aria-label={tCommon('close')}
              >
                <X className="w-5 h-5" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="px-4 py-6 space-y-5 overflow-y-auto pb-[env(keyboard-inset-height,0px)]">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={() => {
                // TODO(integration): wire to Capacitor Camera/Gallery picker
              }}
              className="relative w-24 h-24 rounded-full overflow-hidden bg-muted active:opacity-80"
              aria-label={t('avatarAria')}
            >
              <ImageWithFallback
                src={data.avatar}
                alt={data.displayName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Camera className="w-6 h-6 text-primary-foreground" />
              </div>
            </button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ep-displayName">{t('displayName')}</Label>
            <Input
              id="ep-displayName"
              type="text"
              autoComplete="name"
              enterKeyHint="next"
              value={data.displayName}
              onChange={(e) => update('displayName', e.target.value)}
              className="min-h-11"
              aria-invalid={!!errors.displayName}
              aria-describedby={errors.displayName ? 'ep-name-error' : undefined}
            />
            {errors.displayName && (
              <p id="ep-name-error" className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.displayName}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ep-username">{t('username')}</Label>
            <Input
              id="ep-username"
              type="text"
              autoComplete="username"
              enterKeyHint="next"
              value={data.username}
              onChange={(e) => update('username', e.target.value)}
              className="min-h-11"
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? 'ep-uname-error' : undefined}
            />
            {errors.username && (
              <p id="ep-uname-error" className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.username}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ep-bio">{t('bio')}</Label>
            <Textarea
              id="ep-bio"
              placeholder={t('bioPlaceholder')}
              value={data.bio}
              onChange={(e) => update('bio', e.target.value)}
              className="min-h-24 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ep-website">{t('website')}</Label>
            <Input
              id="ep-website"
              type="url"
              inputMode="url"
              enterKeyHint="done"
              placeholder={t('websitePlaceholder')}
              value={data.website}
              onChange={(e) => update('website', e.target.value)}
              className="min-h-11"
            />
          </div>
        </div>

        <DrawerFooter className="border-t border-border pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <Button
            className="w-full gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
            disabled={isSaving}
            onClick={handleSave}
          >
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 me-2 animate-spin" />
                {t('saving')}
              </>
            ) : (
              t('save')
            )}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
