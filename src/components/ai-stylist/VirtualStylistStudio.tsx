import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Scissors, 
  Sparkles, 
  Camera, 
  Upload,
  Wand2,
  Heart,
  Share2,
  Download,
  Search,
  Filter,
  Sliders,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Grid3x3,
  Layers,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Star,
  TrendingUp,
  Clock,
  Palette,
  User,
  Image as ImageIcon,
  Plus,
  X,
  ArrowLeft,
  Save,
  ShoppingBag,
  MessageCircle,
  Info,
  Lightbulb
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type ServiceType = 'hair' | 'nails' | 'tryon';
type Step = 'upload' | 'analyze' | 'browse' | 'preview' | 'finalize';

interface StyleOption {
  id: string;
  name: string;
  category: string;
  image: string;
  popularity: number;
  matchScore?: number;
  description: string;
  tags: string[];
}

export default function VirtualStylistStudio() {
  const [service, setService] = useState<ServiceType>('hair');
  const [step, setStep] = useState<Step>('upload');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<StyleOption[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [currentPreview, setCurrentPreview] = useState<StyleOption | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [compareMode, setCompareMode] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  // Mock data for hair styles
  const hairStyles: StyleOption[] = [
    { id: 'h1', name: 'Long Layers', category: 'Long', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop', popularity: 95, matchScore: 98, description: 'Flowing layers with natural movement', tags: ['versatile', 'elegant', 'easy-maintain'] },
    { id: 'h2', name: 'Bob Cut', category: 'Medium', image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400&h=400&fit=crop', popularity: 92, matchScore: 94, description: 'Classic bob with modern twist', tags: ['professional', 'chic', 'low-maintenance'] },
    { id: 'h3', name: 'Pixie Cut', category: 'Short', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop', popularity: 88, matchScore: 85, description: 'Bold and edgy short style', tags: ['bold', 'modern', 'minimal-styling'] },
    { id: 'h4', name: 'Beach Waves', category: 'Long', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', popularity: 90, matchScore: 96, description: 'Effortless wavy texture', tags: ['casual', 'romantic', 'textured'] },
    { id: 'h5', name: 'Bangs with Layers', category: 'Medium', image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop', popularity: 85, matchScore: 92, description: 'Flattering fringe and layers', tags: ['youthful', 'versatile', 'face-framing'] },
    { id: 'h6', name: 'Sleek Updo', category: 'Upstyle', image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop', popularity: 87, matchScore: 90, description: 'Elegant upstyle for special occasions', tags: ['formal', 'elegant', 'sophisticated'] },
  ];

  // Mock data for nail designs
  const nailDesigns: StyleOption[] = [
    { id: 'n1', name: 'French Tips', category: 'Classic', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop', popularity: 93, matchScore: 95, description: 'Timeless French manicure', tags: ['elegant', 'professional', 'subtle'] },
    { id: 'n2', name: 'Ombre Sunset', category: 'Gradient', image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400&h=400&fit=crop', popularity: 91, matchScore: 93, description: 'Gradient sunset colors', tags: ['vibrant', 'artistic', 'summery'] },
    { id: 'n3', name: 'Glitter Glam', category: 'Sparkle', image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400&h=400&fit=crop', popularity: 89, matchScore: 88, description: 'Sparkling glitter finish', tags: ['party', 'glamorous', 'eye-catching'] },
    { id: 'n4', name: 'Floral Art', category: 'Artistic', image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=400&fit=crop', popularity: 94, matchScore: 97, description: 'Delicate floral patterns', tags: ['feminine', 'artistic', 'detailed'] },
    { id: 'n5', name: 'Minimalist Chic', category: 'Minimal', image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&h=400&fit=crop', popularity: 90, matchScore: 92, description: 'Simple and sophisticated', tags: ['modern', 'clean', 'versatile'] },
    { id: 'n6', name: 'Abstract Geo', category: 'Artistic', image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?w=400&h=400&fit=crop', popularity: 86, matchScore: 89, description: 'Geometric abstract design', tags: ['bold', 'modern', 'unique'] },
  ];

  // Mock data for outfits
  const outfits: StyleOption[] = [
    { id: 'o1', name: 'Summer Dress', category: 'Casual', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop', popularity: 92, matchScore: 96, description: 'Flowy floral sundress', tags: ['casual', 'summery', 'comfortable'] },
    { id: 'o2', name: 'Business Suit', category: 'Formal', image: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=400&h=400&fit=crop', popularity: 88, matchScore: 91, description: 'Professional blazer and pants', tags: ['professional', 'formal', 'powerful'] },
    { id: 'o3', name: 'Streetwear', category: 'Casual', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop', popularity: 95, matchScore: 94, description: 'Urban street style', tags: ['trendy', 'casual', 'youthful'] },
    { id: 'o4', name: 'Evening Gown', category: 'Formal', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=400&fit=crop', popularity: 87, matchScore: 89, description: 'Elegant evening dress', tags: ['formal', 'elegant', 'luxurious'] },
    { id: 'o5', name: 'Athleisure', category: 'Athletic', image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop', popularity: 91, matchScore: 93, description: 'Sporty yet stylish', tags: ['comfortable', 'active', 'versatile'] },
    { id: 'o6', name: 'Boho Chic', category: 'Casual', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=400&fit=crop', popularity: 89, matchScore: 90, description: 'Bohemian style outfit', tags: ['relaxed', 'artistic', 'unique'] },
  ];

  const getCurrentOptions = () => {
    switch (service) {
      case 'hair': return hairStyles;
      case 'nails': return nailDesigns;
      case 'tryon': return outfits;
    }
  };

  const getCategories = () => {
    const options = getCurrentOptions();
    const categories = new Set(options.map(o => o.category));
    return ['all', ...Array.from(categories)];
  };

  const filteredOptions = getCurrentOptions().filter(option => {
    const matchesCategory = filterCategory === 'all' || option.category === filterCategory;
    const matchesSearch = option.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         option.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedOptions = [...filteredOptions].sort((a, b) => {
    if (step === 'browse' && a.matchScore && b.matchScore) {
      return b.matchScore - a.matchScore;
    }
    return b.popularity - a.popularity;
  });

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const handleUpload = (mockImage: string) => {
    setUploadedImage(mockImage);
    // Simulate AI analysis
    setTimeout(() => {
      setStep('analyze');
      setTimeout(() => {
        setStep('browse');
      }, 2000);
    }, 1000);
  };

  const handlePreview = (option: StyleOption) => {
    setCurrentPreview(option);
    setStep('preview');
  };

  const handleAddToSelection = (option: StyleOption) => {
    if (!selectedOptions.find(o => o.id === option.id)) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const serviceConfig = {
    hair: {
      title: 'Hair Stylist AI',
      icon: Scissors,
      color: 'text-purple-500',
      gradient: 'from-purple-500 to-pink-500',
      uploadText: 'Upload a selfie or front-facing photo',
      analyzeText: 'Analyzing your face shape, features, and skin tone...',
      tip: 'For best results, upload a clear photo with your hair pulled back'
    },
    nails: {
      title: 'Nail Artist AI',
      icon: Sparkles,
      color: 'text-pink-500',
      gradient: 'from-pink-500 to-rose-500',
      uploadText: 'Upload a photo of your hands',
      analyzeText: 'Analyzing your nail shape, length, and skin tone...',
      tip: 'Natural lighting works best for accurate color matching'
    },
    tryon: {
      title: 'Virtual Try-On',
      icon: Camera,
      color: 'text-blue-500',
      gradient: 'from-blue-500 to-purple-500',
      uploadText: 'Upload a full-body photo',
      analyzeText: 'Analyzing your body type, proportions, and style preferences...',
      tip: 'Stand straight with arms slightly away from your body'
    }
  };

  const config = serviceConfig[service];
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {step !== 'upload' && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    if (step === 'preview') setStep('browse');
                    else if (step === 'finalize') setStep('preview');
                    else if (step === 'browse') setStep('upload');
                  }}
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              )}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{config.title}</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Virtual Styling</p>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="hidden md:flex items-center gap-2">
              {['Upload', 'Analyze', 'Browse', 'Preview'].map((label, idx) => (
                <React.Fragment key={label}>
                  <div className={`flex items-center gap-2 ${
                    ['upload', 'analyze', 'browse', 'preview'].indexOf(step) >= idx
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                      ['upload', 'analyze', 'browse', 'preview'].indexOf(step) >= idx
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}>
                      {idx + 1}
                    </div>
                    <span className="text-sm font-medium hidden lg:block">{label}</span>
                  </div>
                  {idx < 3 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Service Switcher */}
          <div className="flex gap-2 mt-4">
            {[
              { id: 'hair' as const, label: 'Hair', icon: Scissors },
              { id: 'nails' as const, label: 'Nails', icon: Sparkles },
              { id: 'tryon' as const, label: 'Try-On', icon: Camera }
            ].map(({ id, label, icon: ServiceIcon }) => (
              <Button
                key={id}
                variant={service === id ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setService(id);
                  setStep('upload');
                  setUploadedImage(null);
                  setCurrentPreview(null);
                  setSelectedOptions([]);
                }}
                className={service === id ? 'gradient-bg border-0' : ''}
              >
                <ServiceIcon className="w-4 h-4 mr-2" />
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Upload */}
          {step === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="p-8">
                <div className="text-center mb-8">
                  <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center mb-4`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Get Started</h2>
                  <p className="text-muted-foreground text-lg">{config.uploadText}</p>
                </div>

                {/* Upload Area */}
                <div className="aspect-[4/3] bg-muted/30 rounded-2xl border-2 border-dashed border-border hover:border-primary transition-colors flex items-center justify-center mb-6 cursor-pointer group">
                  <div className="text-center p-8">
                    <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <p className="text-lg font-semibold mb-2">Click to upload or drag & drop</p>
                    <p className="text-sm text-muted-foreground mb-4">PNG, JPG up to 10MB</p>
                    <Button className="gradient-bg border-0" onClick={() => handleUpload('mock-image-url')}>
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                </div>

                {/* Quick Upload Options */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto py-4" onClick={() => handleUpload('mock-camera')}>
                    <div className="flex flex-col items-center gap-2">
                      <Camera className="w-6 h-6" />
                      <span>Take Photo</span>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto py-4" onClick={() => handleUpload('mock-gallery')}>
                    <div className="flex flex-col items-center gap-2">
                      <ImageIcon className="w-6 h-6" />
                      <span>From Gallery</span>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto py-4">
                    <div className="flex flex-col items-center gap-2">
                      <User className="w-6 h-6" />
                      <span>Use Sample</span>
                    </div>
                  </Button>
                </div>

                {/* Tips */}
                <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="flex gap-3">
                    <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Pro Tip</h4>
                      <p className="text-sm text-muted-foreground">{config.tip}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Analyzing */}
          {step === 'analyze' && (
            <motion.div
              key="analyze"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl mx-auto text-center py-20"
            >
              <div className={`w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br ${config.gradient} flex items-center justify-center mb-6 animate-pulse`}>
                <Wand2 className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">AI Analysis in Progress</h2>
              <p className="text-xl text-muted-foreground mb-8">{config.analyzeText}</p>
              
              {/* Progress Animation */}
              <div className="w-full max-w-md mx-auto bg-muted rounded-full h-2 mb-8">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${config.gradient}`}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2 }}
                />
              </div>

              {/* Analysis Points */}
              <div className="space-y-3 text-left max-w-md mx-auto">
                {[
                  'Detecting facial features and proportions',
                  'Analyzing skin tone and undertones',
                  'Identifying style preferences',
                  'Generating personalized recommendations'
                ].map((text, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-sm">{text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Browse Options */}
          {step === 'browse' && (
            <motion.div
              key="browse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="grid lg:grid-cols-4 gap-6">
                {/* Left Sidebar - Filters */}
                <Card className="p-6 h-fit sticky top-24">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filters
                  </h3>

                  {/* Search */}
                  <div className="mb-6">
                    <label className="text-sm font-medium mb-2 block">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search styles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="mb-6">
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <div className="space-y-1">
                      {getCategories().map(cat => (
                        <Button
                          key={cat}
                          variant={filterCategory === cat ? 'default' : 'ghost'}
                          className={`w-full justify-start ${filterCategory === cat ? 'gradient-bg border-0' : ''}`}
                          size="sm"
                          onClick={() => setFilterCategory(cat)}
                        >
                          {cat === 'all' ? 'All Styles' : cat}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Sort Options */}
                  <div className="mb-6">
                    <label className="text-sm font-medium mb-2 block">Sort By</label>
                    <div className="space-y-1">
                      <Button variant="ghost" className="w-full justify-start" size="sm">
                        <Star className="w-4 h-4 mr-2" />
                        Best Match
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" size="sm">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Popular
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" size="sm">
                        <Clock className="w-4 h-4 mr-2" />
                        Newest
                      </Button>
                    </div>
                  </div>

                  {/* My Favorites */}
                  {favorites.size > 0 && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">Favorites ({favorites.size})</label>
                      <Button variant="outline" className="w-full" size="sm">
                        <Heart className="w-4 h-4 mr-2" />
                        View Favorites
                      </Button>
                    </div>
                  )}
                </Card>

                {/* Main Content - Style Grid */}
                <div className="lg:col-span-3">
                  {/* Toolbar */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold">Recommended for You</h2>
                      <p className="text-sm text-muted-foreground">
                        {sortedOptions.length} styles match your features
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setViewMode('grid')}
                        className={viewMode === 'grid' ? 'bg-muted' : ''}
                      >
                        <Grid3x3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setViewMode('list')}
                        className={viewMode === 'list' ? 'bg-muted' : ''}
                      >
                        <Layers className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCompareMode(!compareMode)}
                      >
                        {compareMode ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                        Compare
                      </Button>
                    </div>
                  </div>

                  {/* AI Insights Banner */}
                  {!showAnalysis && (
                    <Card className="p-4 mb-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">AI Analysis Complete</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Based on your features, we've identified your face shape as oval with warm undertones. 
                            These styles will complement you best.
                          </p>
                          <Button size="sm" variant="outline" onClick={() => setShowAnalysis(true)}>
                            <Info className="w-4 h-4 mr-2" />
                            View Full Analysis
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Styles Grid */}
                  <div className={viewMode === 'grid' ? 'grid grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
                    {sortedOptions.map((option) => (
                      <motion.div
                        key={option.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer relative">
                          {/* Match Score Badge */}
                          {option.matchScore && option.matchScore >= 90 && (
                            <Badge className="absolute top-3 left-3 z-10 gradient-bg border-0">
                              <Star className="w-3 h-3 mr-1" />
                              {option.matchScore}% Match
                            </Badge>
                          )}

                          {/* Favorite Button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-3 right-3 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(option.id);
                            }}
                          >
                            <Heart
                              className={`w-4 h-4 ${favorites.has(option.id) ? 'fill-red-500 text-red-500' : ''}`}
                            />
                          </Button>

                          {/* Image */}
                          <div 
                            className="aspect-square overflow-hidden"
                            onClick={() => handlePreview(option)}
                          >
                            <img
                              src={option.image}
                              alt={option.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>

                          {/* Content */}
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h3 className="font-semibold mb-1">{option.name}</h3>
                                <p className="text-xs text-muted-foreground line-clamp-1">
                                  {option.description}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {option.category}
                              </Badge>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-3">
                              {option.tags.slice(0, 2).map(tag => (
                                <span
                                  key={tag}
                                  className="text-xs px-2 py-0.5 rounded-full bg-muted"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="flex-1 gradient-bg border-0"
                                onClick={() => handlePreview(option)}
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                Preview
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddToSelection(option);
                                }}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Preview */}
          {step === 'preview' && currentPreview && (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left - Preview Area */}
                <div>
                  <Card className="p-6 sticky top-24">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Live Preview</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <ZoomIn className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <ZoomOut className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <RotateCw className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Split View - Before/After */}
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4">
                      {/* Your Photo with Applied Style */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <div className="text-center">
                          <Wand2 className="w-16 h-16 mx-auto mb-4 text-primary" />
                          <p className="font-semibold mb-2">Preview Mode</p>
                          <p className="text-sm text-muted-foreground">
                            Seeing how {currentPreview.name} looks on you
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* View Controls */}
                    <div className="flex gap-2 mb-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Camera className="w-4 h-4 mr-2" />
                        Front View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <RotateCw className="w-4 h-4 mr-2" />
                        Side View
                      </Button>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </Card>
                </div>

                {/* Right - Style Details & Actions */}
                <div className="space-y-6">
                  {/* Style Info */}
                  <Card className="p-6">
                    <div className="flex items-start gap-4 mb-6">
                      <img
                        src={currentPreview.image}
                        alt={currentPreview.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h2 className="text-2xl font-bold mb-1">{currentPreview.name}</h2>
                            <p className="text-muted-foreground">{currentPreview.description}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleFavorite(currentPreview.id)}
                          >
                            <Heart
                              className={`w-5 h-5 ${favorites.has(currentPreview.id) ? 'fill-red-500 text-red-500' : ''}`}
                            />
                          </Button>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge>{currentPreview.category}</Badge>
                          {currentPreview.matchScore && (
                            <div className="flex items-center gap-1 text-sm">
                              <Star className="w-4 h-4 text-primary fill-primary" />
                              <span className="font-semibold">{currentPreview.matchScore}% Match</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <TrendingUp className="w-4 h-4" />
                            <span>{currentPreview.popularity}% popularity</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold mb-2">Style Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentPreview.tags.map(tag => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Primary Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        size="lg"
                        className="gradient-bg border-0"
                        onClick={() => {
                          handleAddToSelection(currentPreview);
                          setStep('finalize');
                        }}
                      >
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Select This Style
                      </Button>
                      <Button size="lg" variant="outline">
                        <ShoppingBag className="w-5 h-5 mr-2" />
                        Book Appointment
                      </Button>
                    </div>
                  </Card>

                  {/* Why This Works */}
                  <Card className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-primary" />
                      Why This Works for You
                    </h3>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm mb-1">Complements Your Features</p>
                          <p className="text-xs text-muted-foreground">
                            This style enhances your natural bone structure and facial proportions
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm mb-1">Matches Your Skin Tone</p>
                          <p className="text-xs text-muted-foreground">
                            The color palette works beautifully with your warm undertones
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm mb-1">Suits Your Lifestyle</p>
                          <p className="text-xs text-muted-foreground">
                            Easy to maintain and versatile for various occasions
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Similar Styles */}
                  <Card className="p-6">
                    <h3 className="font-semibold mb-4">You Might Also Like</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {sortedOptions
                        .filter(o => o.id !== currentPreview.id)
                        .slice(0, 3)
                        .map(option => (
                          <div
                            key={option.id}
                            className="cursor-pointer group"
                            onClick={() => setCurrentPreview(option)}
                          >
                            <div className="aspect-square rounded-lg overflow-hidden mb-2">
                              <img
                                src={option.image}
                                alt={option.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                              />
                            </div>
                            <p className="text-xs font-medium text-center line-clamp-1">
                              {option.name}
                            </p>
                          </div>
                        ))}
                    </div>
                  </Card>

                  {/* Get Expert Advice */}
                  <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                    <h3 className="font-semibold mb-2">Need Expert Advice?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Chat with our AI stylist or book a video consultation with a professional
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat with AI
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Camera className="w-4 h-4 mr-2" />
                        Video Call
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Action Bar */}
      {step === 'browse' && selectedOptions.length > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <Card className="px-6 py-4 shadow-2xl border-primary/20">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {selectedOptions.slice(0, 3).map(option => (
                  <img
                    key={option.id}
                    src={option.image}
                    alt={option.name}
                    className="w-10 h-10 rounded-full border-2 border-background object-cover"
                  />
                ))}
              </div>
              <div>
                <p className="font-semibold text-sm">
                  {selectedOptions.length} style{selectedOptions.length > 1 ? 's' : ''} selected
                </p>
                <p className="text-xs text-muted-foreground">Ready to compare or save</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Compare
                </Button>
                <Button size="sm" className="gradient-bg border-0">
                  <Save className="w-4 h-4 mr-2" />
                  Save All
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
