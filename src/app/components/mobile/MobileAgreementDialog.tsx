import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerFooter,
} from '../ui/drawer';
import { ScrollArea } from '../ui/scroll-area';
import { X } from 'lucide-react';

interface MobileAgreementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
}

export default function MobileAgreementDialog({
  isOpen,
  onClose,
  onAccept,
  onDecline,
}: MobileAgreementDialogProps) {
  const t = useTranslations('auth.agreement');
  const tCommon = useTranslations('common');

  const handleAccept = () => {
    onAccept();
    onClose();
  };

  const handleDecline = () => {
    onDecline();
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        {/* Sticky Header */}
        <DrawerHeader className="sticky top-0 z-10 bg-background border-b border-border">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-lg">{t('title')}</DrawerTitle>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="min-h-11 min-w-11 active:bg-muted"
                aria-label={tCommon('close')}
              >
                <X className="w-5 h-5" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        {/* Scrollable Content */}
        <ScrollArea className="flex-1 px-6 pb-[env(keyboard-inset-height,0px)]">
          <div className="py-6 space-y-4 text-sm">
            <section>
              <h3 className="font-semibold mb-2">{t('introduction.title')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('introduction.content')}
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">{t('dataCollection.title')}</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t('dataCollection.intro')}
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ps-2">
                <li>{t('dataCollection.items.profile')}</li>
                <li>{t('dataCollection.items.photos')}</li>
                <li>{t('dataCollection.items.preferences')}</li>
                <li>{t('dataCollection.items.usage')}</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold mb-2">{t('dataUsage.title')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('dataUsage.content')}
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">{t('userRights.title')}</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ps-2">
                <li>{t('userRights.items.access')}</li>
                <li>{t('userRights.items.delete')}</li>
                <li>{t('userRights.items.export')}</li>
                <li>{t('userRights.items.optOut')}</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold mb-2">{t('thirdParty.title')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('thirdParty.content')}
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">{t('ageRequirement.title')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('ageRequirement.content')}
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">{t('changes.title')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('changes.content')}
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">{t('contact.title')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('contact.content')}
              </p>
            </section>
          </div>
        </ScrollArea>

        {/* Sticky Footer with CTAs */}
        <DrawerFooter className="sticky bottom-0 bg-background border-t border-border pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleDecline}
              className="flex-1 min-h-11 active:scale-[0.98] transition-transform"
            >
              {t('decline')}
            </Button>
            <Button
              onClick={handleAccept}
              className="flex-1 min-h-11 gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80"
            >
              {t('accept')}
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
