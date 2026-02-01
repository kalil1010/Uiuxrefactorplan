import React, { useState, useCallback, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { 
  RotateCw, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Crop,
  Move,
  Check,
  X,
  FlipHorizontal,
  FlipVertical
} from 'lucide-react';
import { cn } from './utils';

interface ImageCropperProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  onCropComplete: (croppedImageUrl: string) => void;
  aspectRatio?: number; // e.g., 16/9, 1 for square, null for free crop
  title?: string;
}

export function ImageCropper({
  isOpen,
  onClose,
  imageSrc,
  onCropComplete,
  aspectRatio,
  title = 'Edit Image'
}: ImageCropperProps) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 100, height: 100 });
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleRotateLeft = () => {
    setRotation((prev) => (prev - 90) % 360);
  };

  const handleRotateRight = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleFlipHorizontal = () => {
    setFlipHorizontal(!flipHorizontal);
  };

  const handleFlipVertical = () => {
    setFlipVertical(!flipVertical);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getCroppedImage = useCallback(async () => {
    if (!imageRef.current || !canvasRef.current) return;

    const image = imageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    // Create a temporary canvas for the full transformed image
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    
    if (!tempCtx) return;

    // Set temp canvas size based on rotation
    const radians = (rotation * Math.PI) / 180;
    const sin = Math.abs(Math.sin(radians));
    const cos = Math.abs(Math.cos(radians));
    
    tempCanvas.width = image.naturalWidth * cos + image.naturalHeight * sin;
    tempCanvas.height = image.naturalWidth * sin + image.naturalHeight * cos;

    // Apply transformations to temp canvas
    tempCtx.translate(tempCanvas.width / 2, tempCanvas.height / 2);
    tempCtx.rotate(radians);
    tempCtx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1);
    tempCtx.drawImage(
      image,
      -image.naturalWidth / 2,
      -image.naturalHeight / 2,
      image.naturalWidth,
      image.naturalHeight
    );

    // Calculate crop area
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scaleX = tempCanvas.width / (rect.width * zoom);
    const scaleY = tempCanvas.height / (rect.height * zoom);

    // Set output canvas size
    const outputWidth = aspectRatio ? 1200 : rect.width;
    const outputHeight = aspectRatio ? 1200 / aspectRatio : rect.height;
    
    canvas.width = outputWidth;
    canvas.height = outputHeight;

    // Calculate source crop coordinates
    const sourceX = Math.max(0, (tempCanvas.width / 2 - position.x * scaleX));
    const sourceY = Math.max(0, (tempCanvas.height / 2 - position.y * scaleY));
    const sourceWidth = Math.min(tempCanvas.width, rect.width * scaleX);
    const sourceHeight = Math.min(tempCanvas.height, rect.height * scaleY);

    // Draw cropped image
    ctx.drawImage(
      tempCanvas,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      outputWidth,
      outputHeight
    );

    // Convert to blob and return URL
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        onCropComplete(url);
        handleClose();
      }
    }, 'image/jpeg', 0.95);
  }, [zoom, rotation, flipHorizontal, flipVertical, position, aspectRatio, onCropComplete]);

  const handleClose = () => {
    // Reset all states
    setZoom(1);
    setRotation(0);
    setFlipHorizontal(false);
    setFlipVertical(false);
    setPosition({ x: 0, y: 0 });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crop className="w-5 h-5" />
            {title}
          </DialogTitle>
          <DialogDescription>
            Adjust the image to your liking and apply the changes.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Image Preview Area */}
          <div 
            ref={containerRef}
            className={cn(
              "relative bg-black/5 rounded-lg overflow-hidden border-2 border-dashed border-border",
              isDragging ? "cursor-grabbing" : "cursor-grab"
            )}
            style={{
              aspectRatio: aspectRatio || '16/9',
              minHeight: '300px',
              maxHeight: '500px'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              ref={imageRef}
              src={imageSrc}
              alt="Crop preview"
              className="absolute top-1/2 left-1/2 max-w-none select-none"
              style={{
                transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${zoom}) rotate(${rotation}deg) scaleX(${flipHorizontal ? -1 : 1}) scaleY(${flipVertical ? -1 : 1})`,
                transformOrigin: 'center',
                pointerEvents: 'none'
              }}
              draggable={false}
            />
            
            {/* Crop Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="border border-white/30" />
                ))}
              </div>
            </div>

            {/* Drag hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
              <Move className="w-4 h-4" />
              Drag to reposition
            </div>
          </div>

          {/* Zoom Controls */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <ZoomIn className="w-4 h-4" />
              Zoom: {zoom.toFixed(1)}x
            </Label>
            <Slider
              value={[zoom]}
              onValueChange={(value) => setZoom(value[0])}
              min={0.5}
              max={3}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Rotation Controls */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <RotateCw className="w-4 h-4" />
              Rotation: {rotation}°
            </Label>
            <Slider
              value={[rotation]}
              onValueChange={(value) => setRotation(value[0])}
              min={-180}
              max={180}
              step={1}
              className="w-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRotateLeft}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Rotate Left
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRotateRight}
            >
              <RotateCw className="w-4 h-4 mr-2" />
              Rotate Right
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleFlipHorizontal}
            >
              <FlipHorizontal className="w-4 h-4 mr-2" />
              Flip H
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleFlipVertical}
            >
              <FlipVertical className="w-4 h-4 mr-2" />
              Flip V
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setZoom(1);
                setRotation(0);
                setPosition({ x: 0, y: 0 });
                setFlipHorizontal(false);
                setFlipVertical(false);
              }}
            >
              Reset All
            </Button>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button className="gradient-bg-purple-pink" onClick={getCroppedImage}>
            <Check className="w-4 h-4 mr-2" />
            Apply Changes
          </Button>
        </DialogFooter>

        {/* Hidden canvas for processing */}
        <canvas ref={canvasRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
}