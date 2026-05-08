import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, X, Sun, Moon, Monitor } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '../ui/drawer';

type ThemeKey = 'light' | 'dark' | 'system';

interface MobileThemeSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
  current?: ThemeKey;
  onSelect: (theme: ThemeKey) => void;
}

export default function MobileThemeSwitcher({
  isOpen,
  onClose,
  current = 'system',
  onSelect,
}: MobileThemeSwitcherProps) {
  const t = useTranslations('themeSwitcher');
  const tCommon = useTranslations('common');
  const [selected, setSelected] = useState<ThemeKey>(current);

  const themes: { key: ThemeKey; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'light', icon: Sun },
    { key: 'dark', icon: Moon },
    { key: 'system', icon: Monitor },
  ];

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
          {themes.map(({ key, icon: Icon }) => {
            const isSelected = selected === key;
            return (
              <button
                key={key}
                onClick={() => setSelected(key)}
                aria-pressed={isSelected}
                className={`w-full flex items-center gap-3 px-4 py-3 min-h-11 rounded-lg transition-colors ${
                  isSelected ? 'bg-primary/10 text-primary' : 'hover:bg-muted active:bg-muted'
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="flex-1 text-start font-medium">{t(`options.${key}`)}</span>
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
