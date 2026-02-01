import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Users, Lock, Globe, Image as ImageIcon, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ImageUploadWithCrop } from '@/components/ui/image-upload-with-crop';

export default function CreateCommunityPage() {
  const [communityName, setCommunityName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [rules, setRules] = useState(['Be respectful', 'Stay on topic', 'No spam']);

  const handleImageUpload = (image: string) => {
    setCoverImage(image);
  };

  const removeCoverImage = () => {
    setCoverImage(null);
  };

  const addRule = () => {
    setRules([...rules, '']);
  };

  const updateRule = (index: number, value: string) => {
    const newRules = [...rules];
    newRules[index] = value;
    setRules(newRules);
  };

  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      {/* Background Orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-brand-magenta/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-brand-coral/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="sticky top-0 z-40 glass-effect border-b px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold gradient-text-purple-pink">Create Community</h1>
            <p className="text-sm text-muted-foreground">Build your fashion community</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Community Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Minimalist Fashion Lovers"
                    value={communityName}
                    onChange={(e) => setCommunityName(e.target.value)}
                    maxLength={50}
                  />
                  <p className="text-xs text-muted-foreground">
                    {communityName.length}/50 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what your community is about, who should join, and what members can expect..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[120px]"
                    maxLength={500}
                  />
                  <p className="text-xs text-muted-foreground">
                    {description.length}/500 characters
                  </p>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    {isPrivate ? (
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Globe className="w-5 h-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-medium">
                        {isPrivate ? 'Private Community' : 'Public Community'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {isPrivate
                          ? 'Only approved members can see and join'
                          : 'Anyone can discover and join'}
                      </p>
                    </div>
                  </div>
                  <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
                </div>
              </CardContent>
            </Card>

            {/* Cover Image */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Cover Image</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUploadWithCrop
                  onImageChange={setCoverImage}
                  currentImage={coverImage}
                  aspectRatio={21 / 9}
                  uploadText="Upload cover image"
                  recommendedSize="Recommended: 1200x512px"
                />
              </CardContent>
            </Card>

            {/* Community Rules */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Community Rules (Optional)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {rules.map((rule, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        placeholder={`Rule ${index + 1}`}
                        value={rule}
                        onChange={(e) => updateRule(index, e.target.value)}
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeRule(index)}
                      disabled={rules.length === 1}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addRule}
                  className="w-full"
                  disabled={rules.length >= 10}
                >
                  Add Rule
                </Button>
              </CardContent>
            </Card>

            {/* Categories/Tags */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['Streetwear', 'Minimalist', 'Vintage', 'Luxury', 'Sustainable', 'Athletic'].map(
                    (category) => (
                      <button
                        key={category}
                        className="px-4 py-2 rounded-full border-2 border-border hover:border-primary transition-colors text-sm"
                      >
                        {category}
                      </button>
                    )
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Select categories that best describe your community
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            <Card className="glass-effect sticky top-20">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Community Card Preview */}
                <Card className="overflow-hidden border-2">
                  {coverImage ? (
                    <div className="aspect-[21/9] relative">
                      <img
                        src={coverImage}
                        alt="Community cover"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[21/9] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg truncate">
                          {communityName || 'Community Name'}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {description || 'Community description will appear here...'}
                        </p>
                      </div>
                      <Badge variant={isPrivate ? 'secondary' : 'default'}>
                        {isPrivate ? (
                          <>
                            <Lock className="w-3 h-3 mr-1" />
                            Private
                          </>
                        ) : (
                          <>
                            <Globe className="w-3 h-3 mr-1" />
                            Public
                          </>
                        )}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>0 members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>•</span>
                        <span>Just now</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tips */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">💡 Tips for success</h4>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
                    <li>Choose a clear, descriptive name</li>
                    <li>Write an engaging description</li>
                    <li>Add a high-quality cover image</li>
                    <li>Set clear community rules</li>
                    <li>Start with 3-5 posts to attract members</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                className="w-full gradient-bg-purple-pink h-12 text-base font-semibold"
                disabled={!communityName || !description}
              >
                Create Community
              </Button>
              <Button variant="outline" className="w-full">
                Save as Draft
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}