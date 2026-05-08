import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

type CategoryKey = 'general' | 'bug' | 'feature' | 'billing' | 'account';
type State = 'form' | 'submitting' | 'sent';

export default function MobileContactPage() {
  const t = useTranslations('contact');
  const tCommon = useTranslations('common');
  const [state, setState] = useState<State>('form');
  const [category, setCategory] = useState<CategoryKey>('general');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ subject?: string; message?: string }>({});

  const categories: CategoryKey[] = ['general', 'bug', 'feature', 'billing', 'account'];

  const validate = () => {
    const e: typeof errors = {};
    if (!subject.trim()) e.subject = t('errors.subjectRequired');
    if (!message.trim()) e.message = t('errors.messageRequired');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setState('submitting');
    // TODO(integration): submit support ticket via API
    await new Promise((r) => setTimeout(r, 1500));
    setState('sent');
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
        <div className="flex-1">
          <h1 className="font-semibold text-lg">{t('title')}</h1>
          <p className="text-xs text-muted-foreground">{t('subtitle')}</p>
        </div>
      </header>

      {state === 'sent' ? (
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-xl font-bold mb-2">{t('sentTitle')}</h2>
          <p className="text-muted-foreground mb-6 max-w-sm">{t('sentDescription')}</p>
          <Button
            onClick={() => {
              setState('form');
              setSubject('');
              setMessage('');
              setCategory('general');
            }}
            variant="outline"
            className="active:bg-muted min-h-11"
          >
            {tCommon('done')}
          </Button>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5 pb-[calc(5rem+env(safe-area-inset-bottom))] pb-[env(keyboard-inset-height,0px)]">
            {/* Category */}
            <div className="space-y-2">
              <Label>{t('categoryLabel')}</Label>
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => {
                  const isSelected = category === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      aria-pressed={isSelected}
                      className={`min-h-11 px-4 rounded-full border-2 text-sm transition-colors active:scale-95 ${
                        isSelected
                          ? 'border-primary bg-primary/10 text-primary font-semibold'
                          : 'border-border bg-card text-muted-foreground'
                      }`}
                    >
                      {t(`categoryOptions.${cat}`)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject">{t('subjectLabel')}</Label>
              <Input
                id="subject"
                type="text"
                enterKeyHint="next"
                placeholder={t('subjectPlaceholder')}
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  setErrors({ ...errors, subject: undefined });
                }}
                className="min-h-11"
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
              />
              {errors.subject && (
                <p id="subject-error" className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.subject}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">{t('messageLabel')}</Label>
              <Textarea
                id="message"
                placeholder={t('messagePlaceholder')}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setErrors({ ...errors, message: undefined });
                }}
                className="min-h-32 resize-none"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.message}
                </p>
              )}
            </div>
          </div>

          <div className="fixed bottom-0 start-0 end-0 z-40 bg-background border-t border-border px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
            <Button
              className="w-full gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
              disabled={state === 'submitting'}
              onClick={handleSubmit}
            >
              {state === 'submitting' ? (
                <>
                  <Loader2 className="w-5 h-5 me-2 animate-spin" />
                  {t('sending')}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 me-2" />
                  {t('send')}
                </>
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
