import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, Image as ImageIcon, X, Loader2, AlertCircle, Globe, Lock } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type CategoryKey = 'general' | 'sustainable' | 'vintage' | 'streetwear' | 'luxury' | 'diy';
type Privacy = 'public' | 'private';

export default function MobileCreateCommunityPage() {
  const t = useTranslations('createCommunity');
  const tCommon = useTranslations('common');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CategoryKey>('general');
  const [privacy, setPrivacy] = useState<Privacy>('public');
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

  const categories: CategoryKey[] = ['general', 'sustainable', 'vintage', 'streetwear', 'luxury', 'diy'];

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = t('errors.nameRequired');
    else if (name.trim().length < 3) e.name = t('errors.nameTooShort');
    if (!description.trim()) e.description = t('errors.descriptionRequired');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const isFormValid = name.trim().length >= 3 && description.trim().length > 0;

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    // TODO(integration): create community via API
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
  };

  const handleUploadCover = () => {
    // TODO(integration): wire to Capacitor Camera/Gallery picker
    setCoverPreview('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=400&fit=crop');
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

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 pb-[calc(5rem+env(safe-area-inset-bottom))] pb-[env(keyboard-inset-height,0px)]">
        {/* Cover */}
        <div className="space-y-2">
          <Label>{t('coverLabel')}</Label>
          {coverPreview ? (
            <div className="relative aspect-[2/1] rounded-lg overflow-hidden bg-muted">
              <ImageWithFallback
                src={coverPreview}
                alt={t('coverLabel')}
                className="w-full h-full object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 end-2 rounded-full bg-black/60 hover:bg-black/80 active:bg-black/90 text-primary-foreground min-h-11 min-w-11"
                aria-label={t('removeCoverAria')}
                onClick={() => setCoverPreview(null)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          ) : (
            <button
              onClick={handleUploadCover}
              className="w-full aspect-[2/1] rounded-lg border-2 border-dashed border-border bg-card hover:bg-muted/50 active:bg-muted flex flex-col items-center justify-center gap-2 text-muted-foreground transition-colors"
            >
              <ImageIcon className="w-8 h-8" />
              <span className="text-sm font-medium">{t('uploadCover')}</span>
            </button>
          )}
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">{t('name')}</Label>
          <Input
            id="name"
            type="text"
            enterKeyHint="next"
            placeholder={t('namePlaceholder')}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors({ ...errors, name: undefined });
            }}
            className="min-h-11"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">{t('description')}</Label>
          <Textarea
            id="description"
            placeholder={t('descriptionPlaceholder')}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors({ ...errors, description: undefined });
            }}
            className="min-h-24 resize-none"
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? 'description-error' : undefined}
          />
          {errors.description && (
            <p id="description-error" className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.description}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>{t('category')}</Label>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => {
              const isSelected = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`min-h-11 px-4 rounded-full border-2 text-sm transition-colors active:scale-95 ${
                    isSelected
                      ? 'border-primary bg-primary/10 text-primary font-semibold'
                      : 'border-border bg-card text-muted-foreground'
                  }`}
                  aria-pressed={isSelected}
                >
                  {t(`categoryOptions.${cat}`)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Privacy */}
        <div className="space-y-2">
          <Label>{t('privacy')}</Label>
          <div className="space-y-2">
            {(['public', 'private'] as Privacy[]).map((p) => {
              const isSelected = privacy === p;
              const Icon = p === 'public' ? Globe : Lock;
              return (
                <button
                  key={p}
                  onClick={() => setPrivacy(p)}
                  className={`w-full text-start p-4 rounded-lg border-2 flex items-start gap-3 transition-colors min-h-[88px] ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card hover:bg-muted/50 active:bg-muted'
                  }`}
                  aria-pressed={isSelected}
                >
                  <Icon
                    className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      isSelected ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  />
                  <div className="flex-1">
                    <p className={`font-semibold ${isSelected ? 'text-primary' : ''}`}>
                      {t(`privacyOptions.${p}`)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {t(`privacyOptions.${p}Hint`)}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 start-0 end-0 z-40 bg-background border-t border-border px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <Button
          className="w-full gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
          disabled={!isFormValid || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 me-2 animate-spin" />
              {t('creating')}
            </>
          ) : (
            t('cta')
          )}
        </Button>
      </div>
    </div>
  );
}
