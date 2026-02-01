# Image Cropping System - Usage Guide

## Overview
The ZokaiHub image cropping system provides a complete solution for uploading, editing, cropping, rotating, and transforming images across the entire application.

## Components

### 1. ImageCropper (`/components/ui/image-cropper.tsx`)
The core modal component that provides the image editing interface.

**Features:**
- ✂️ Drag to reposition image
- 🔍 Zoom (0.5x - 3x)
- 🔄 Rotate (-180° to 180°)
- ↔️ Flip horizontal/vertical
- 📐 Crop grid overlay
- 🎯 Preset aspect ratios
- 🔄 Reset all changes

### 2. ImageUploadWithCrop (`/components/ui/image-upload-with-crop.tsx`)
A wrapper component that combines file upload with the cropper.

**Props:**
```tsx
interface ImageUploadWithCropProps {
  onImageChange: (imageUrl: string) => void;
  currentImage?: string | null;
  aspectRatio?: number; // e.g., 16/9, 1, 4/3, or undefined for free
  className?: string;
  uploadText?: string;
  recommendedSize?: string;
}
```

## Usage Examples

### Profile Picture (Square 1:1)
```tsx
import { ImageUploadWithCrop } from '@/components/ui/image-upload-with-crop';

<ImageUploadWithCrop
  onImageChange={setProfileImage}
  currentImage={profileImage}
  aspectRatio={1}
  uploadText="Upload profile picture"
  recommendedSize="Recommended: 400x400px"
/>
```

### Cover Image (21:9)
```tsx
<ImageUploadWithCrop
  onImageChange={setCoverImage}
  currentImage={coverImage}
  aspectRatio={21 / 9}
  uploadText="Upload cover image"
  recommendedSize="Recommended: 1200x512px"
/>
```

### Post Image (4:3)
```tsx
<ImageUploadWithCrop
  onImageChange={setPostImage}
  currentImage={postImage}
  aspectRatio={4 / 3}
  uploadText="Upload post image"
  recommendedSize="Recommended: 1200x900px"
/>
```

### Free Crop (Any Ratio)
```tsx
<ImageUploadWithCrop
  onImageChange={setProductImage}
  currentImage={productImage}
  uploadText="Upload product image"
  recommendedSize="Any size - Crop to your preference"
/>
```

## Where to Use in ZokaiHub

### 1. **User Profile**
- Profile picture (1:1)
- Cover photo (21:9)
- Bio images

### 2. **Communities**
- Community cover images (21:9) ✅ Already implemented
- Community logo/avatar (1:1)

### 3. **Posts & Feed**
- Post images (4:3 or free)
- Story images (9:16)
- Carousel images

### 4. **Marketplace**
- Product photos (1:1 or 4:3)
- Product detail images
- Vendor shop banners (21:9)

### 5. **Challenges**
- Challenge entry photos (4:3)
- Challenge cover images (16:9)

### 6. **Collections**
- Collection cover images (16:9)
- Collection thumbnails (1:1)

### 7. **Messages**
- Attachment images (free crop)

### 8. **Settings**
- Profile customization
- Theme customization images

### 9. **AI Tools**
- Input images for AI processing
- Generated image variations

### 10. **Star Studio**
- Content uploads
- Portfolio images
- Brand assets

## Integration Steps

To add image cropping to a new feature:

1. **Import the component:**
```tsx
import { ImageUploadWithCrop } from '@/components/ui/image-upload-with-crop';
```

2. **Add state:**
```tsx
const [image, setImage] = useState<string | null>(null);
```

3. **Use the component:**
```tsx
<ImageUploadWithCrop
  onImageChange={setImage}
  currentImage={image}
  aspectRatio={16/9} // Choose appropriate ratio
  uploadText="Upload image"
  recommendedSize="Recommended: 1200x675px"
/>
```

## Technical Details

### Output Format
- Format: JPEG
- Quality: 95%
- Size: Based on aspect ratio (default 1200px width)

### Supported Input Formats
- JPEG/JPG
- PNG
- WebP
- GIF (first frame)

### Browser Compatibility
- Modern browsers with Canvas support
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Best Practices

1. **Choose the right aspect ratio:**
   - Profile pictures: 1:1
   - Banners/Covers: 21:9 or 16:9
   - Posts: 4:3 or free
   - Stories: 9:16

2. **Provide size recommendations:**
   Always include recommendedSize prop to guide users

3. **Optimize for mobile:**
   The component is fully responsive and touch-friendly

4. **Allow re-editing:**
   Users can edit already uploaded images by clicking the edit icon

5. **Validation:**
   Add file size limits (e.g., max 5MB) in parent component

## Future Enhancements

- [ ] Add filters (grayscale, sepia, etc.)
- [ ] Brightness/contrast adjustments
- [ ] Multiple image upload and batch crop
- [ ] Shape crops (circle, custom shapes)
- [ ] Stickers and text overlays
- [ ] Compression options
- [ ] Format selection (JPEG, PNG, WebP)

## Support

For issues or questions about the image cropping system:
1. Check this documentation
2. Review the ImageCropExamplesPage component
3. See CreateCommunityPage for a real implementation example
