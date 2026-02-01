import React, { useState } from 'react';
import { X, Image as ImageIcon, MapPin, Hash, Users, Globe, Lock, Smile } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { WheelPickerModal } from '../ui/wheel-picker';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [postText, setPostText] = useState('');
  const [privacy, setPrivacy] = useState<'public' | 'followers' | 'private'>('public');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isPrivacyPickerOpen, setIsPrivacyPickerOpen] = useState(false);

  if (!isOpen) return null;

  const privacyOptions = [
    { value: 'public', label: 'Public' },
    { value: 'followers', label: 'Followers' },
    { value: 'private', label: 'Private' },
  ];

  const getPrivacyIcon = () => {
    switch (privacy) {
      case 'public':
        return <Globe className="w-3 h-3" />;
      case 'followers':
        return <Users className="w-3 h-3" />;
      case 'private':
        return <Lock className="w-3 h-3" />;
    }
  };

  const getPrivacyLabel = () => {
    return privacyOptions.find(opt => opt.value === privacy)?.label || 'Public';
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setSelectedImages(prev => [...prev, ...newImages].slice(0, 4)); // Max 4 images
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handlePost = () => {
    // Handle post creation logic here
    console.log('Creating post:', { postText, privacy, images: selectedImages });
    // Reset form
    setPostText('');
    setSelectedImages([]);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <Card 
        className="w-full sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col animate-slide-up sm:animate-scale-in rounded-t-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Create Post</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold">Your Name</p>
              <button
                onClick={() => setIsPrivacyPickerOpen(true)}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {getPrivacyIcon()}
                {getPrivacyLabel()}
              </button>
            </div>
          </div>

          {/* Text Area */}
          <Textarea
            placeholder="What's on your mind? Share your outfit, style tips, or fashion finds..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="min-h-[150px] resize-none border-0 focus-visible:ring-0 text-base"
          />

          {/* Image Preview Grid */}
          {selectedImages.length > 0 && (
            <div className={`grid gap-2 ${
              selectedImages.length === 1 ? 'grid-cols-1' :
              selectedImages.length === 2 ? 'grid-cols-2' :
              'grid-cols-2'
            }`}>
              {selectedImages.map((image, index) => (
                <div key={index} className="relative group aspect-square rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
              <Hash className="w-3 h-3 mr-1" />
              Add Tags
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
              <MapPin className="w-3 h-3 mr-1" />
              Add Location
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
              <Smile className="w-3 h-3 mr-1" />
              Add Emoji
            </Badge>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t">
          <div className="flex gap-2">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                disabled={selectedImages.length >= 4}
              />
              <Button
                variant="ghost"
                size="icon"
                className={selectedImages.length >= 4 ? 'opacity-50 cursor-not-allowed' : ''}
                asChild
              >
                <span>
                  <ImageIcon className="w-5 h-5" />
                </span>
              </Button>
            </label>
            <span className="text-xs text-muted-foreground self-center">
              {selectedImages.length}/4 images
            </span>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="gradient-bg text-white"
              onClick={handlePost}
              disabled={!postText.trim() && selectedImages.length === 0}
            >
              Post
            </Button>
          </div>
        </div>
      </Card>

      {/* Privacy Picker Modal */}
      <WheelPickerModal
        isOpen={isPrivacyPickerOpen}
        onClose={() => setIsPrivacyPickerOpen(false)}
        options={privacyOptions}
        value={privacy}
        onChange={(value) => setPrivacy(value as 'public' | 'followers' | 'private')}
        title="Post Privacy"
      />
    </div>
  );
}