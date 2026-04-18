import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Edit2 } from 'lucide-react';
import { ImageCropper } from './image-cropper';
import { cn } from './utils';

interface ImageUploadWithCropProps {
  onImageChange: (imageUrl: string) => void;
  currentImage?: string | null;
  aspectRatio?: number; // e.g., 16/9, 1 for square, undefined for free crop
  className?: string;
  uploadText?: string;
  recommendedSize?: string;
}

export function ImageUploadWithCrop({
  onImageChange,
  currentImage,
  aspectRatio,
  className,
  uploadText = 'Upload image',
  recommendedSize
}: ImageUploadWithCropProps) {
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setTempImage(imageUrl);
        setIsCropperOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImageUrl: string) => {
    onImageChange(croppedImageUrl);
    setTempImage(null);
  };

  const handleRemoveImage = () => {
    onImageChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEditImage = () => {
    if (currentImage) {
      setTempImage(currentImage);
      setIsCropperOpen(true);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className={cn('relative', className)}>
        {currentImage ? (
          <div className="relative aspect-[21/9] rounded-lg overflow-hidden group">
            <img
              src={currentImage}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 gap-2">
              <Button
                onClick={handleEditImage}
                variant="secondary"
                size="icon"
                className="rounded-full"
              >
                <Edit2 className="w-5 h-5" />
              </Button>
              <Button
                onClick={handleRemoveImage}
                variant="destructive"
                size="icon"
                className="rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleUploadClick}
            type="button"
            className="w-full aspect-[21/9] rounded-lg border-2 border-dashed border-border hover:border-primary transition-colors flex flex-col items-center justify-center gap-3 hover:bg-muted/50"
          >
            <Upload className="w-8 h-8 text-muted-foreground" />
            <div className="text-center">
              <p className="font-medium">{uploadText}</p>
              {recommendedSize && (
                <p className="text-sm text-muted-foreground">{recommendedSize}</p>
              )}
            </div>
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {tempImage && (
        <ImageCropper
          isOpen={isCropperOpen}
          onClose={() => {
            setIsCropperOpen(false);
            setTempImage(null);
          }}
          imageSrc={tempImage}
          onCropComplete={handleCropComplete}
          aspectRatio={aspectRatio}
          title="Crop & Edit Image"
        />
      )}
    </>
  );
}
