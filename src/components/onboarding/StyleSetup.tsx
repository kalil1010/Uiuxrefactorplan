import React, { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Check,
  User,
  Palette,
  Heart,
  Calendar,
  DollarSign,
  Shirt,
  Trophy,
  Camera,
  Upload,
  Cake,
  Ruler,
  Weight,
  Footprints
} from 'lucide-react';

interface StyleSetupProps {
  onComplete: (userData: any) => void;
  onNavigate: (page: any) => void;
}

export default function StyleSetup({ onComplete, onNavigate }: StyleSetupProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    bio: '',
    photo: '',
    birthYear: new Date().getFullYear() - 25,
    birthMonth: 0,
    birthDay: 1,
    gender: '',
    height: 170,
    weight: 70,
    feetSize: 40,
    bodyShape: '',
    skinTone: '',
    favoriteColors: [] as string[],
    stylePreferences: [] as string[],
    occasions: [] as string[],
    budget: ''
  });

  const [photoPreview, setPhotoPreview] = useState('');
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [usernameSuggestions, setUsernameSuggestions] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSteps = 10; // Changed from 11 to 10

  // Mock function to check username availability
  const checkUsername = (username: string) => {
    // Mock taken usernames
    const takenUsernames = ['john', 'sarah', 'alex', 'emma', 'mike', 'fashionista', 'stylequeen'];
    const isTaken = takenUsernames.includes(username.toLowerCase());
    
    setUsernameTaken(isTaken);
    
    if (isTaken) {
      // Generate suggestions
      const suggestions = [
        `${username}_style`,
        `${username}_official`,
        `${username}${Math.floor(Math.random() * 100)}`,
        `the_${username}`,
        `${username}_fashion`
      ];
      setUsernameSuggestions(suggestions);
    } else {
      setUsernameSuggestions([]);
    }
  };

  // Calculate age from birth date
  const calculateAge = () => {
    const today = new Date();
    const birthDate = new Date(formData.birthYear, formData.birthMonth, formData.birthDay);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: string, value: string) => {
    const currentArray = formData[field as keyof typeof formData] as string[];
    if (currentArray.includes(value)) {
      updateField(field, currentArray.filter(item => item !== value));
    } else {
      updateField(field, [...currentArray, value]);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        updateField('photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return true; // Welcome
      case 1: return formData.name !== '' && formData.username !== '' && !usernameTaken;
      case 2: 
        const age = calculateAge();
        return age >= 13; // Minimum age 13
      case 3: return formData.gender !== '';
      case 4: return formData.bodyShape !== '' && formData.skinTone !== '';
      case 5: return formData.favoriteColors.length > 0;
      case 6: return formData.stylePreferences.length > 0;
      case 7: return formData.occasions.length > 0;
      case 8: return formData.budget !== '';
      case 9: return true; // Summary
      default: return false;
    }
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const shoeSizes = Array.from({ length: 21 }, (_, i) => 30 + i); // EU sizes 30-50

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6 py-12">
            <div className="w-24 h-24 mx-auto rounded-3xl gradient-bg flex items-center justify-center mb-6">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold">Welcome to ZokaiHub!</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Let's personalize your fashion journey with AI. We'll ask a few questions to understand your style.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-8">
              <Card className="p-6 text-center">
                <User className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h4 className="font-semibold mb-2">Personal Style</h4>
                <p className="text-sm text-muted-foreground">Tell us about your preferences</p>
              </Card>
              <Card className="p-6 text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h4 className="font-semibold mb-2">AI Recommendations</h4>
                <p className="text-sm text-muted-foreground">Get personalized suggestions</p>
              </Card>
              <Card className="p-6 text-center">
                <Trophy className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h4 className="font-semibold mb-2">Style Success</h4>
                <p className="text-sm text-muted-foreground">Transform your wardrobe</p>
              </Card>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-3xl font-bold mb-3">Set up your profile</h2>
              <p className="text-muted-foreground">This information will be visible on your profile</p>
            </div>
            
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Photo Upload */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                      {photoPreview ? (
                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-12 h-12 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-10 h-10 rounded-full gradient-bg border-2 border-background flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Camera className="w-5 h-5 text-white" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name *</label>
                <Input
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="h-12"
                />
              </div>

              {/* Username */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Username *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                  <Input
                    placeholder="username"
                    value={formData.username}
                    onChange={(e) => {
                      const newUsername = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '');
                      updateField('username', newUsername);
                      checkUsername(newUsername);
                    }}
                    className="h-12 pl-8"
                  />
                </div>
                {usernameTaken && (
                  <div className="text-xs text-red-500">
                    Username is taken. Try:
                    {usernameSuggestions.map((suggestion, index) => (
                      <span key={index} className="ml-1 cursor-pointer" onClick={() => updateField('username', suggestion)}>
                        @{suggestion}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">⚠️ Username cannot be changed later</p>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Bio (Optional)</label>
                <Textarea
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={(e) => updateField('bio', e.target.value)}
                  rows={4}
                  maxLength={150}
                />
                <p className="text-xs text-muted-foreground text-right">{formData.bio.length}/150</p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Cake className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-3xl font-bold mb-3">When's your birthday?</h2>
              <p className="text-muted-foreground">This helps us recommend age-appropriate styles</p>
            </div>

            {/* iOS Style Wheel Picker */}
            <div className="max-w-md mx-auto">
              <div className="flex gap-2 justify-center items-center">
                {/* Month Picker */}
                <div className="flex-1 relative">
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-0 right-0 h-12 -translate-y-1/2 border-y-2 border-primary/20 bg-primary/5" />
                  </div>
                  <select
                    value={formData.birthMonth}
                    onChange={(e) => updateField('birthMonth', parseInt(e.target.value))}
                    className="w-full h-64 text-center text-lg font-medium bg-transparent border-0 focus:outline-none cursor-pointer appearance-none"
                    size={9}
                  >
                    {months.map((month, i) => (
                      <option key={i} value={i} className="py-2">
                        {month}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Day Picker */}
                <div className="flex-1 relative">
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-0 right-0 h-12 -translate-y-1/2 border-y-2 border-primary/20 bg-primary/5" />
                  </div>
                  <select
                    value={formData.birthDay}
                    onChange={(e) => updateField('birthDay', parseInt(e.target.value))}
                    className="w-full h-64 text-center text-lg font-medium bg-transparent border-0 focus:outline-none cursor-pointer appearance-none"
                    size={9}
                  >
                    {days.map((day) => (
                      <option key={day} value={day} className="py-2">
                        {day}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Year Picker */}
                <div className="flex-1 relative">
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-0 right-0 h-12 -translate-y-1/2 border-y-2 border-primary/20 bg-primary/5" />
                  </div>
                  <select
                    value={formData.birthYear}
                    onChange={(e) => updateField('birthYear', parseInt(e.target.value))}
                    className="w-full h-64 text-center text-lg font-medium bg-transparent border-0 focus:outline-none cursor-pointer appearance-none"
                    size={9}
                  >
                    {years.map((year) => (
                      <option key={year} value={year} className="py-2">
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Selected Date Display */}
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">Selected Birthday:</p>
                <p className="text-xl font-semibold">
                  {months[formData.birthMonth]} {formData.birthDay}, {formData.birthYear}
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-3xl font-bold mb-3">What's your style identity?</h2>
              <p className="text-muted-foreground">This helps us recommend the right fashion for you</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                { value: 'womens', label: 'Women\'s Fashion', emoji: '👗' },
                { value: 'mens', label: 'Men\'s Fashion', emoji: '👔' },
                { value: 'unisex', label: 'Unisex/All', emoji: '👕' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateField('gender', option.value)}
                  className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                    formData.gender === option.value
                      ? 'border-primary bg-primary/10 shadow-lg'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-4xl mb-3">{option.emoji}</div>
                  <h4 className="font-semibold text-sm">{option.label}</h4>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <Shirt className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-3xl font-bold mb-3">Tell us about your body</h2>
              <p className="text-muted-foreground">This helps us suggest flattering styles</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-8">
              {/* Height & Weight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Ruler className="w-4 h-4" />
                    Height (cm)
                  </label>
                  <Input
                    type="number"
                    value={formData.height}
                    onChange={(e) => updateField('height', parseInt(e.target.value))}
                    className="h-12 text-lg"
                    min="100"
                    max="250"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Weight className="w-4 h-4" />
                    Weight (kg)
                  </label>
                  <Input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => updateField('weight', parseInt(e.target.value))}
                    className="h-12 text-lg"
                    min="30"
                    max="200"
                  />
                </div>
              </div>

              {/* Feet Size */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Footprints className="w-4 h-4" />
                  Shoe Size (EU)
                </label>
                <select
                  value={formData.feetSize}
                  onChange={(e) => updateField('feetSize', parseInt(e.target.value))}
                  className="w-full h-12 rounded-md border border-input bg-background px-4 text-lg"
                >
                  {shoeSizes.map((size) => (
                    <option key={size} value={size}>
                      EU {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Body Shape */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Body Shape</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { value: 'hourglass', label: 'Hourglass', desc: 'Balanced proportions' },
                    { value: 'pear', label: 'Pear/Triangle', desc: 'Wider hips' },
                    { value: 'apple', label: 'Apple/Oval', desc: 'Fuller midsection' },
                    { value: 'rectangle', label: 'Rectangle', desc: 'Straight silhouette' },
                    { value: 'inverted', label: 'Inverted Triangle', desc: 'Broader shoulders' },
                    { value: 'athletic', label: 'Athletic', desc: 'Muscular build' }
                  ].map((shape) => (
                    <button
                      key={shape.value}
                      onClick={() => updateField('bodyShape', shape.value)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        formData.bodyShape === shape.value
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <h5 className="font-semibold text-sm mb-1">{shape.label}</h5>
                      <p className="text-xs text-muted-foreground">{shape.desc}</p>
                      {formData.bodyShape === shape.value && (
                        <Check className="w-4 h-4 text-primary mt-2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skin Tone */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Skin Tone</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {[
                    { value: 'fair', label: 'Fair', color: 'bg-[#FFE0BD]' },
                    { value: 'light', label: 'Light', color: 'bg-[#F0C690]' },
                    { value: 'medium', label: 'Medium', color: 'bg-[#D9A066]' },
                    { value: 'olive', label: 'Olive', color: 'bg-[#C68642]' },
                    { value: 'tan', label: 'Tan', color: 'bg-[#A57257]' },
                    { value: 'deep', label: 'Deep', color: 'bg-[#6B4423]' }
                  ].map((tone) => (
                    <button
                      key={tone.value}
                      onClick={() => updateField('skinTone', tone.value)}
                      className={`relative rounded-lg transition-all ${
                        formData.skinTone === tone.value
                          ? 'ring-4 ring-primary ring-offset-2'
                          : ''
                      }`}
                    >
                      <div className={`w-full aspect-square rounded-lg ${tone.color}`}>
                        {formData.skinTone === tone.value && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Check className="w-5 h-5 text-white drop-shadow-lg" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs mt-1 font-medium">{tone.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Palette className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-3xl font-bold mb-3">What colors do you love?</h2>
              <p className="text-muted-foreground">Select all that apply</p>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {[
                { value: 'black', label: 'Black', color: 'bg-black' },
                { value: 'white', label: 'White', color: 'bg-white border-2' },
                { value: 'red', label: 'Red', color: 'bg-red-500' },
                { value: 'pink', label: 'Pink', color: 'bg-pink-500' },
                { value: 'purple', label: 'Purple', color: 'bg-purple-500' },
                { value: 'blue', label: 'Blue', color: 'bg-blue-500' },
                { value: 'green', label: 'Green', color: 'bg-green-500' },
                { value: 'yellow', label: 'Yellow', color: 'bg-yellow-400' },
                { value: 'orange', label: 'Orange', color: 'bg-orange-500' },
                { value: 'brown', label: 'Brown', color: 'bg-amber-700' },
                { value: 'gray', label: 'Gray', color: 'bg-gray-500' },
                { value: 'navy', label: 'Navy', color: 'bg-blue-900' }
              ].map((color) => (
                <button
                  key={color.value}
                  onClick={() => toggleArrayItem('favoriteColors', color.value)}
                  className={`relative rounded-xl transition-all hover:scale-110 ${
                    formData.favoriteColors.includes(color.value)
                      ? 'ring-4 ring-primary ring-offset-2'
                      : ''
                  }`}
                >
                  <div className={`w-full aspect-square rounded-xl ${color.color}`}>
                    {formData.favoriteColors.includes(color.value) && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check className="w-6 h-6 text-white drop-shadow-lg" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs mt-2 font-medium">{color.label}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Heart className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-3xl font-bold mb-3">What's your style vibe?</h2>
              <p className="text-muted-foreground">Choose all that resonate with you</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                { value: 'casual', label: 'Casual', emoji: '👕', desc: 'Comfortable & relaxed' },
                { value: 'formal', label: 'Formal', emoji: '👔', desc: 'Professional & polished' },
                { value: 'streetwear', label: 'Streetwear', emoji: '🧢', desc: 'Urban & trendy' },
                { value: 'bohemian', label: 'Bohemian', emoji: '🌸', desc: 'Free-spirited & artsy' },
                { value: 'minimalist', label: 'Minimalist', emoji: '⚪', desc: 'Clean & simple' },
                { value: 'vintage', label: 'Vintage', emoji: '📻', desc: 'Classic & retro' },
                { value: 'athletic', label: 'Athletic', emoji: '⚽', desc: 'Sporty & active' },
                { value: 'elegant', label: 'Elegant', emoji: '💎', desc: 'Sophisticated & chic' },
                { value: 'edgy', label: 'Edgy', emoji: '🖤', desc: 'Bold & daring' }
              ].map((style) => (
                <button
                  key={style.value}
                  onClick={() => toggleArrayItem('stylePreferences', style.value)}
                  className={`p-6 rounded-xl border-2 transition-all hover:scale-105 text-left ${
                    formData.stylePreferences.includes(style.value)
                      ? 'border-primary bg-primary/10 shadow-lg'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-3xl mb-2">{style.emoji}</div>
                  <h4 className="font-semibold mb-1">{style.label}</h4>
                  <p className="text-xs text-muted-foreground">{style.desc}</p>
                  {formData.stylePreferences.includes(style.value) && (
                    <Check className="w-5 h-5 text-primary mt-2" />
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-3xl font-bold mb-3">What do you dress for?</h2>
              <p className="text-muted-foreground">Select the occasions you need outfits for</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                { value: 'work', label: 'Work/Office', emoji: '💼' },
                { value: 'casual', label: 'Everyday Casual', emoji: '☕' },
                { value: 'party', label: 'Parties & Events', emoji: '🎉' },
                { value: 'date', label: 'Date Nights', emoji: '💕' },
                { value: 'workout', label: 'Gym & Sports', emoji: '💪' },
                { value: 'formal', label: 'Formal Events', emoji: '🎩' },
                { value: 'travel', label: 'Travel', emoji: '✈️' },
                { value: 'weekend', label: 'Weekend Outings', emoji: '🌟' },
                { value: 'home', label: 'Loungewear', emoji: '🏠' }
              ].map((occasion) => (
                <button
                  key={occasion.value}
                  onClick={() => toggleArrayItem('occasions', occasion.value)}
                  className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                    formData.occasions.includes(occasion.value)
                      ? 'border-primary bg-primary/10 shadow-lg'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-3xl mb-2">{occasion.emoji}</div>
                  <h4 className="font-semibold text-sm">{occasion.label}</h4>
                  {formData.occasions.includes(occasion.value) && (
                    <Check className="w-5 h-5 text-primary mt-2" />
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <DollarSign className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-3xl font-bold mb-3">What's your budget range?</h2>
              <p className="text-muted-foreground">This helps us recommend suitable brands</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { value: 'budget', label: 'Budget-Friendly', emoji: '💰' },
                { value: 'moderate', label: 'Moderate', emoji: '💵' },
                { value: 'premium', label: 'Premium', emoji: '💎' },
                { value: 'luxury', label: 'Luxury', emoji: '👑' }
              ].map((budget) => (
                <button
                  key={budget.value}
                  onClick={() => updateField('budget', budget.value)}
                  className={`p-6 rounded-xl border-2 transition-all hover:scale-105 text-center ${
                    formData.budget === budget.value
                      ? 'border-primary bg-primary/10 shadow-lg'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-4xl mb-3">{budget.emoji}</div>
                  <h4 className="font-semibold text-sm">{budget.label}</h4>
                  {formData.budget === budget.value && (
                    <Check className="w-5 h-5 text-primary mt-2 mx-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6 py-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto rounded-full gradient-bg flex items-center justify-center mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-4">Welcome to ZokaiHub, {formData.name}! 🎉</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Your personalized fashion profile is ready. Here's what we learned about you:
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {/* Profile Card */}
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-3xl">
                      {formData.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-bold">{formData.name}</h3>
                    <p className="text-muted-foreground">@{formData.username}</p>
                    {formData.bio && <p className="text-sm mt-1">{formData.bio}</p>}
                  </div>
                </div>
              </Card>

              {/* Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Cake className="w-4 h-4 text-primary" />
                    Birthday
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {months[formData.birthMonth]} {formData.birthDay}, {formData.birthYear}
                  </p>
                </Card>

                <Card className="p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Style Identity
                  </h4>
                  <p className="text-sm text-muted-foreground capitalize">{formData.gender}</p>
                </Card>

                <Card className="p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-primary" />
                    Measurements
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {formData.height}cm • {formData.weight}kg • Size {formData.feetSize}
                  </p>
                </Card>

                <Card className="p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Shirt className="w-4 h-4 text-primary" />
                    Body Type
                  </h4>
                  <p className="text-sm text-muted-foreground capitalize">
                    {formData.bodyShape} • {formData.skinTone} skin
                  </p>
                </Card>

                <Card className="p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Palette className="w-4 h-4 text-primary" />
                    Favorite Colors
                  </h4>
                  <p className="text-sm text-muted-foreground capitalize">
                    {formData.favoriteColors.join(', ')}
                  </p>
                </Card>

                <Card className="p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-primary" />
                    Style Vibes
                  </h4>
                  <p className="text-sm text-muted-foreground capitalize">
                    {formData.stylePreferences.join(', ')}
                  </p>
                </Card>

                <Card className="p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Occasions
                  </h4>
                  <p className="text-sm text-muted-foreground capitalize">
                    {formData.occasions.join(', ')}
                  </p>
                </Card>

                <Card className="p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    Budget
                  </h4>
                  <p className="text-sm text-muted-foreground capitalize">{formData.budget}</p>
                </Card>
              </div>

              <Card className="p-6 gradient-bg border-0 text-white text-center">
                <Sparkles className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">You're all set!</h3>
                <p className="text-white/90 mb-4">
                  Our AI is ready to provide personalized fashion recommendations just for you.
                </p>
                <p className="text-sm text-white/80">
                  Click "Finish" to start your style journey!
                </p>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress Bar */}
      <div className="border-b bg-background/95 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Step {currentStep + 1} of {totalSteps}
            </span>
            {currentStep > 0 && currentStep < totalSteps - 1 && (
              <button 
                onClick={() => setCurrentStep(totalSteps - 1)}
                className="ml-auto text-sm text-muted-foreground hover:text-foreground"
              >
                Skip to summary
              </button>
            )}
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full gradient-bg transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {renderStep()}
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t bg-background/95 backdrop-blur-md sticky bottom-0">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="w-24"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="flex gap-1">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentStep
                    ? 'bg-primary w-4'
                    : i < currentStep
                    ? 'bg-primary/50'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={nextStep}
            disabled={!canProceed()}
            className="gradient-bg border-0 w-24"
          >
            {currentStep === totalSteps - 1 ? 'Finish' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}