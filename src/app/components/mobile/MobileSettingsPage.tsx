import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  ChevronLeft,
  ChevronRight,
  User,
  Lock,
  Sun,
  Globe,
  Bell,
  Shield,
  UserX,
  KeyRound,
  Download,
  HelpCircle,
  MessageSquare,
  Info,
  FileText,
  ScrollText,
  LogOut,
  Trash2,
} from 'lucide-react';
import { Button } from '../ui/button';
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

type SectionKey = 'account' | 'appearance' | 'preferences' | 'privacy' | 'support' | 'legal';

type Item = {
  id: string;
  labelKey: string;
  icon: React.ComponentType<{ className?: string }>;
  destructive?: boolean;
  trailing?: string;
  onPress?: () => void;
};

interface MobileSettingsPageProps {
  appVersion?: string;
  onOpenLanguage?: () => void;
  onOpenTheme?: () => void;
}

export default function MobileSettingsPage({
  appVersion = '1.0.0',
  onOpenLanguage,
  onOpenTheme,
}: MobileSettingsPageProps) {
  const t = useTranslations('settings');
  const tCommon = useTranslations('common');
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const sections: { key: SectionKey; items: Item[] }[] = [
    {
      key: 'account',
      items: [
        { id: 'editProfile', labelKey: 'editProfile', icon: User },
        { id: 'changePassword', labelKey: 'changePassword', icon: Lock },
      ],
    },
    {
      key: 'appearance',
      items: [
        { id: 'theme', labelKey: 'theme', icon: Sun },
        { id: 'language', labelKey: 'language', icon: Globe },
      ],
    },
    {
      key: 'preferences',
      items: [{ id: 'notifications', labelKey: 'notifications', icon: Bell }],
    },
    {
      key: 'privacy',
      items: [
        { id: 'privacy', labelKey: 'privacy', icon: Shield },
        { id: 'blockedUsers', labelKey: 'blockedUsers', icon: UserX },
        { id: 'twoFactor', labelKey: 'twoFactor', icon: KeyRound },
        { id: 'downloadData', labelKey: 'downloadData', icon: Download },
      ],
    },
    {
      key: 'support',
      items: [
        { id: 'help', labelKey: 'help', icon: HelpCircle },
        { id: 'contact', labelKey: 'contact', icon: MessageSquare },
        { id: 'about', labelKey: 'about', icon: Info },
      ],
    },
    {
      key: 'legal',
      items: [
        { id: 'terms', labelKey: 'terms', icon: ScrollText },
        { id: 'privacyPolicy', labelKey: 'privacyPolicy', icon: FileText },
      ],
    },
  ];

  const renderRow = (item: Item) => {
    const Icon = item.icon;
    return (
      <button
        key={item.id}
        onClick={() => {
          if (item.id === 'language') {
            onOpenLanguage?.();
            return;
          }
          if (item.id === 'theme') {
            onOpenTheme?.();
            return;
          }
          // TODO(integration): wire to navigation
          item.onPress?.();
        }}
        className={`w-full flex items-center gap-3 px-4 py-3 min-h-11 hover:bg-muted/50 active:bg-muted transition-colors ${
          item.destructive ? 'text-destructive' : ''
        }`}
      >
        <Icon className={`w-5 h-5 ${item.destructive ? 'text-destructive' : 'text-muted-foreground'}`} />
        <span className="flex-1 text-start">{t(`items.${item.labelKey}`)}</span>
        {item.trailing && (
          <span className="text-sm text-muted-foreground">{item.trailing}</span>
        )}
        <ChevronRight className="w-4 h-4 text-muted-foreground rtl:rotate-180" />
      </button>
    );
  };

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
      <header className="sticky top-0 z-40 bg-background border-b border-border pt-[env(safe-area-inset-top)] px-2 py-2 flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full min-h-11 min-w-11"
          aria-label={tCommon('back')}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className="flex-1 font-semibold text-lg">{t('title')}</h1>
      </header>

      <div className="flex-1 overflow-y-auto pb-[env(safe-area-inset-bottom)]">
        {sections.map((section) => (
          <section key={section.key} className="border-b border-border">
            <h2 className="px-4 pt-4 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {t(`sections.${section.key}`)}
            </h2>
            <div className="divide-y divide-border">
              {section.items.map(renderRow)}
            </div>
          </section>
        ))}

        {/* Logout */}
        <div className="border-b border-border">
          <button
            onClick={() => setLogoutOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 min-h-11 hover:bg-muted/50 active:bg-muted transition-colors"
          >
            <LogOut className="w-5 h-5 text-muted-foreground" />
            <span className="flex-1 text-start">{t('items.logout')}</span>
          </button>
        </div>

        {/* Delete account */}
        <div className="border-b border-border">
          <button
            onClick={() => setDeleteOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 min-h-11 hover:bg-destructive/5 active:bg-destructive/10 text-destructive transition-colors"
          >
            <Trash2 className="w-5 h-5" />
            <span className="flex-1 text-start">{t('items.deleteAccount')}</span>
          </button>
        </div>

        {/* Version */}
        <p className="text-center text-xs text-muted-foreground py-6">
          {t('version', { version: appVersion })}
        </p>
      </div>

      {/* Logout dialog */}
      <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('logoutConfirmTitle')}</AlertDialogTitle>
            <AlertDialogDescription>{t('logoutConfirmMessage')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{tCommon('cancel')}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                // TODO(integration): clear session and redirect to sign-in
              }}
            >
              {t('logoutConfirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete account dialog */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('deleteConfirmTitle')}</AlertDialogTitle>
            <AlertDialogDescription>{t('deleteConfirmMessage')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{tCommon('cancel')}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                // TODO(integration): delete account API + redirect
              }}
            >
              {t('deleteConfirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
