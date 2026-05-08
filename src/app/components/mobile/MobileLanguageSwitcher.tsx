import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Check, X } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '../ui/drawer';

type LocaleKey = 'en' | 'ar';

interface MobileLanguageSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (locale: LocaleKey) => void;
}

export default function MobileLanguageSwitcher({
  isOpen,
  onClose,
  onSelect,
}: MobileLanguageSwitcherProps) {
  const t = useTranslations('languageSwitcher');
  const tCommon = useTranslations('common');
  const currentLocale = useLocale();
  const [selected, setSelected] = useState<LocaleKey>(currentLocale as LocaleKey);

  const locales: LocaleKey[] = ['en', 'ar'];

  const handleConfirm = () => {
    onSelect(selected);
    onClose();
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

        <div className="px-4 py-2 space-y-1 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          {locales.map((loc) => {
            const isSelected = selected === loc;
            return (
              <button
                key={loc}
                onClick={() => setSelected(loc)}
                aria-pressed={isSelected}
                className={`w-full flex items-center justify-between px-4 py-3 min-h-11 rounded-lg transition-colors ${
                  isSelected ? 'bg-primary/10 text-primary' : 'hover:bg-muted active:bg-muted'
                }`}
              >
                <span className="font-medium">{t(`languages.${loc}`)}</span>
                {isSelected && <Check className="w-5 h-5" />}
              </button>
            );
          })}

          <Button
            className="w-full mt-4 gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
            onClick={handleConfirm}
          >
            {tCommon('done')}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
