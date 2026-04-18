import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUploadWithCrop } from '@/components/ui/image-upload-with-crop';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Image as ImageIcon, Palette } from 'lucide-react';

export function ImageCropExamplesPage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [postImage, setPostImage] = useState<string | null>(null);
  const [productImage, setProductImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Background Orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-brand-magenta/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-brand-coral/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge className="gradient-bg text-white">
            <Palette className="w-4 h-4 mr-2" />
            Image Cropping Examples
          </Badge>
          <h1 className="text-4xl font-bold gradient-text-purple-pink">
            Smart Image Upload System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload, crop, rotate, and edit images with ease. Works across all upload scenarios in ZokaiHub.
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Picture - Square Crop */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Picture (Square)
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Perfect for profile photos with 1:1 aspect ratio
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ImageUploadWithCrop
                onImageChange={setProfileImage}
                currentImage={profileImage}
                aspectRatio={1}
                uploadText="Upload profile picture"
                recommendedSize="Recommended: 400x400px"
                className="max-w-sm mx-auto"
              />
              
              {profileImage && (
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={profileImage} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Preview</p>
                    <p className="text-sm text-muted-foreground">
                      Your profile picture will look like this
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cover Image - Wide Crop */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Cover Image (21:9)
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Ideal for banners and cover photos
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ImageUploadWithCrop
                onImageChange={setCoverImage}
                currentImage={coverImage}
                aspectRatio={21 / 9}
                uploadText="Upload cover image"
                recommendedSize="Recommended: 1200x512px"
              />
            </CardContent>
          </Card>

          {/* Post Image - 4:3 Crop */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Post Image (4:3)
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Standard post format for social feeds
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ImageUploadWithCrop
                onImageChange={setPostImage}
                currentImage={postImage}
                aspectRatio={4 / 3}
                uploadText="Upload post image"
                recommendedSize="Recommended: 1200x900px"
              />
            </CardContent>
          </Card>

          {/* Product Image - Free Crop */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Product Image (Free Crop)
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Flexible cropping for product photos
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ImageUploadWithCrop
                onImageChange={setProductImage}
                currentImage={productImage}
                uploadText="Upload product image"
                recommendedSize="Any size - Crop to your preference"
              />
            </CardContent>
          </Card>
        </div>

        {/* Features List */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>✨ Image Editor Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold">Editing Tools</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Drag to reposition image within crop area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Zoom slider (0.5x to 3x magnification)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Rotate image from -180° to 180°</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Flip horizontally or vertically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Quick rotate buttons (90° left/right)</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">Smart Features</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Live preview with crop grid overlay</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Preset aspect ratios or free crop</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>High-quality output (JPEG 95% quality)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Edit already uploaded images</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Reset all changes with one click</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Instructions */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>How to Use</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
              <li>
                <strong className="text-foreground">Upload:</strong> Click the upload area and select an image from your device
              </li>
              <li>
                <strong className="text-foreground">Position:</strong> Drag the image to reposition it within the crop frame
              </li>
              <li>
                <strong className="text-foreground">Zoom:</strong> Use the slider to zoom in or out for the perfect framing
              </li>
              <li>
                <strong className="text-foreground">Rotate:</strong> Adjust rotation with slider or quick-rotate buttons
              </li>
              <li>
                <strong className="text-foreground">Flip:</strong> Mirror the image horizontally or vertically if needed
              </li>
              <li>
                <strong className="text-foreground">Apply:</strong> Click "Apply Changes" to save your edited image
              </li>
              <li>
                <strong className="text-foreground">Edit Again:</strong> Hover over uploaded images to edit or remove them
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
