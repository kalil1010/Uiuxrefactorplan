import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { X, Plus, AlertCircle, Loader2, Globe, Users, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerFooter,
} from '../ui/drawer';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type Visibility = 'public' | 'followers';

interface MobileCreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { images: string[]; caption: string; tags: string[]; visibility: Visibility }) => Promise<void> | void;
}

export default function MobileCreatePostModal({
  isOpen,
  onClose,
  onSubmit,
}: MobileCreatePostModalProps) {
  const t = useTranslations('createPost');
  const tCommon = useTranslations('common');
  const [images, setImages] = useState<string[]>([]);
  const [caption, setCaption] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<Visibility>('public');
  const [errors, setErrors] = useState<{ image?: string; caption?: string }>({});
  const [isPosting, setIsPosting] = useState(false);

  const handleAddImage = () => {
    // TODO(integration): wire to Capacitor Camera/Gallery picker
    setImages((prev) => [
      ...prev,
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=600&fit=crop',
    ]);
  };

  const handleRemoveImage = (i: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim().replace(/^#/, '');
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (images.length === 0) e.image = t('errors.imageRequired');
    if (!caption.trim()) e.caption = t('errors.captionRequired');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsPosting(true);
    try {
      await onSubmit({ images, caption, tags, visibility });
      // reset
      setImages([]);
      setCaption('');
      setTags([]);
      setVisibility('public');
      onClose();
    } finally {
      setIsPosting(false);
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

        <div className="px-4 py-4 space-y-5 overflow-y-auto pb-[env(keyboard-inset-height,0px)]">
          {/* Images */}
          <div className="space-y-2">
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
              {images.map((src, i) => (
                <div
                  key={i}
                  className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0"
                >
                  <ImageWithFallback
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 end-1 w-6 h-6 min-h-0 min-w-0 rounded-full bg-black/60 hover:bg-black/80 active:bg-black/90 text-primary-foreground"
                    aria-label={t('removeImageAria')}
                    onClick={() => handleRemoveImage(i)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
              <button
                onClick={handleAddImage}
                className="w-24 h-24 rounded-lg border-2 border-dashed border-border bg-card hover:bg-muted/50 active:bg-muted flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors flex-shrink-0"
              >
                <ImageIcon className="w-6 h-6" />
                <span className="text-xs font-medium">{t('uploadImage')}</span>
              </button>
            </div>
            {errors.image && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.image}
              </p>
            )}
          </div>

          {/* Caption */}
          <div className="space-y-2">
            <Label htmlFor="cp-caption">{t('captionLabel')}</Label>
            <Textarea
              id="cp-caption"
              placeholder={t('captionPlaceholder')}
              value={caption}
              onChange={(e) => {
                setCaption(e.target.value);
                setErrors({ ...errors, caption: undefined });
              }}
              className="min-h-24 resize-none"
              aria-invalid={!!errors.caption}
              aria-describedby={errors.caption ? 'cp-caption-error' : undefined}
            />
            {errors.caption && (
              <p id="cp-caption-error" className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.caption}
              </p>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="cp-tag">{t('tagsLabel')}</Label>
            <div className="flex gap-2">
              <Input
                id="cp-tag"
                type="text"
                enterKeyHint="done"
                placeholder={t('tagsPlaceholder')}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                className="min-h-11 flex-1"
              />
              <Button
                onClick={handleAddTag}
                disabled={!tagInput.trim()}
                className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
              >
                <Plus className="w-4 h-4 me-1" />
                {t('addTag')}
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="px-3 py-1 min-h-11 flex items-center gap-1"
                  >
                    #{tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ms-1 -me-1 w-5 h-5 rounded-full hover:bg-muted active:bg-muted flex items-center justify-center"
                      aria-label={t('removeTagAria')}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Visibility */}
          <div className="space-y-2">
            <Label>{t('visibility')}</Label>
            <div className="grid grid-cols-2 gap-2">
              {(['public', 'followers'] as Visibility[]).map((v) => {
                const isSelected = visibility === v;
                const Icon = v === 'public' ? Globe : Users;
                return (
                  <button
                    key={v}
                    onClick={() => setVisibility(v)}
                    aria-pressed={isSelected}
                    className={`min-h-11 px-3 py-2 rounded-lg border-2 flex items-center gap-2 transition-colors active:scale-95 ${
                      isSelected
                        ? 'border-primary bg-primary/10 text-primary font-semibold'
                        : 'border-border bg-card text-muted-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{t(`visibilityOptions.${v}`)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <DrawerFooter className="border-t border-border pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <Button
            className="w-full gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
            disabled={isPosting}
            onClick={handleSubmit}
          >
            {isPosting ? (
              <>
                <Loader2 className="w-5 h-5 me-2 animate-spin" />
                {t('posting')}
              </>
            ) : (
              t('post')
            )}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
