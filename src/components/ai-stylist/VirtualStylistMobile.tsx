import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
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
  ChevronLeft,
  CheckCircle2,
  Star,
  TrendingUp,
  Plus,
  X,
  ShoppingBag,
  MessageCircle,
  Lightbulb,
  Eye,
  Image as ImageIcon,
  RotateCcw,
  Info,
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  Bookmark,
  AlertCircle,
  Zap,
  ThumbsUp,
  Maximize2
} from 'lucide-react';

type ServiceType = 'hair' | 'nails' | 'tryon';
type Step = 'service' | 'upload' | 'analyze' | 'browse' | 'preview';
type ViewMode = 'cards' | 'stack';

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

export default function VirtualStylistMobile() {
  const [service, setService] = useState<ServiceType | null>(null);
  const [step, setStep] = useState<Step>('service');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<StyleOption[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [currentPreview, setCurrentPreview] = useState<StyleOption | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('stack');
  const [showFilters, setShowFilters] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  // Hair styles data
  const hairStyles: StyleOption[] = [
    { id: 'h1', name: 'Long Layers', category: 'Long', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop', popularity: 95, matchScore: 98, description: 'Flowing layers with natural movement', tags: ['versatile', 'elegant', 'easy-maintain'] },
    { id: 'h2', name: 'Bob Cut', category: 'Medium', image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400&h=400&fit=crop', popularity: 92, matchScore: 94, description: 'Classic bob with modern twist', tags: ['professional', 'chic', 'low-maintenance'] },
    { id: 'h3', name: 'Pixie Cut', category: 'Short', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop', popularity: 88, matchScore: 85, description: 'Bold and edgy short style', tags: ['bold', 'modern', 'minimal-styling'] },
    { id: 'h4', name: 'Beach Waves', category: 'Long', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', popularity: 90, matchScore: 96, description: 'Effortless wavy texture', tags: ['casual', 'romantic', 'textured'] },
    { id: 'h5', name: 'Bangs with Layers', category: 'Medium', image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop', popularity: 85, matchScore: 92, description: 'Flattering fringe and layers', tags: ['youthful', 'versatile', 'face-framing'] },
    { id: 'h6', name: 'Sleek Updo', category: 'Upstyle', image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop', popularity: 87, matchScore: 90, description: 'Elegant upstyle for special occasions', tags: ['formal', 'elegant', 'sophisticated'] },
  ];

  // Nail designs data
  const nailDesigns: StyleOption[] = [
    { id: 'n1', name: 'French Tips', category: 'Classic', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop', popularity: 93, matchScore: 95, description: 'Timeless French manicure', tags: ['elegant', 'professional', 'subtle'] },
    { id: 'n2', name: 'Ombre Sunset', category: 'Gradient', image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400&h=400&fit=crop', popularity: 91, matchScore: 93, description: 'Gradient sunset colors', tags: ['vibrant', 'artistic', 'summery'] },
    { id: 'n3', name: 'Glitter Glam', category: 'Sparkle', image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400&h=400&fit=crop', popularity: 89, matchScore: 88, description: 'Sparkling glitter finish', tags: ['party', 'glamorous', 'eye-catching'] },
    { id: 'n4', name: 'Floral Art', category: 'Artistic', image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=400&fit=crop', popularity: 94, matchScore: 97, description: 'Delicate floral patterns', tags: ['feminine', 'artistic', 'detailed'] },
    { id: 'n5', name: 'Minimalist Chic', category: 'Minimal', image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&h=400&fit=crop', popularity: 90, matchScore: 92, description: 'Simple and sophisticated', tags: ['modern', 'clean', 'versatile'] },
    { id: 'n6', name: 'Abstract Geo', category: 'Artistic', image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?w=400&h=400&fit=crop', popularity: 86, matchScore: 89, description: 'Geometric abstract design', tags: ['bold', 'modern', 'unique'] },
  ];

  // Outfits data
  const outfits: StyleOption[] = [
    { id: 'o1', name: 'Summer Dress', category: 'Casual', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop', popularity: 92, matchScore: 96, description: 'Flowy floral sundress', tags: ['casual', 'summery', 'comfortable'] },
    { id: 'o2', name: 'Business Suit', category: 'Formal', image: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=400&h=400&fit=crop', popularity: 88, matchScore: 91, description: 'Professional blazer and pants', tags: ['professional', 'formal', 'powerful'] },
    { id: 'o3', name: 'Streetwear', category: 'Casual', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop', popularity: 95, matchScore: 94, description: 'Urban street style', tags: ['trendy', 'casual', 'youthful'] },
    { id: 'o4', name: 'Evening Gown', category: 'Formal', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=400&fit=crop', popularity: 87, matchScore: 89, description: 'Elegant evening dress', tags: ['formal', 'elegant', 'luxurious'] },
    { id: 'o5', name: 'Athleisure', category: 'Athletic', image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop', popularity: 91, matchScore: 93, description: 'Sporty yet stylish', tags: ['comfortable', 'active', 'versatile'] },
    { id: 'o6', name: 'Boho Chic', category: 'Casual', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=400&fit=crop', popularity: 89, matchScore: 90, description: 'Bohemian style outfit', tags: ['relaxed', 'artistic', 'unique'] },
  ];

  const getCurrentOptions = () => {
    if (!service) return [];
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
    setTimeout(() => {
      setStep('analyze');
      setTimeout(() => {
        setStep('browse');
      }, 2500);
    }, 800);
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

  const handleSwipe = (direction: 'left' | 'right', option: StyleOption) => {
    setSwipeDirection(direction);
    if (direction === 'right') {
      // Like / Add to favorites
      toggleFavorite(option.id);
      handleAddToSelection(option);
    }
    // Move to next card
    setTimeout(() => {
      setCurrentCardIndex(prev => Math.min(prev + 1, sortedOptions.length - 1));
      setSwipeDirection(null);
    }, 300);
  };

  const serviceConfig = {
    hair: {
      title: 'Hair Stylist',
      icon: Scissors,
      color: '#8B5CF6',
      gradient: 'from-purple-500 to-pink-500',
      uploadText: 'Take a selfie',
      analyzeText: 'Analyzing your face shape...',
    },
    nails: {
      title: 'Nail Artist',
      icon: Sparkles,
      color: '#EC4899',
      gradient: 'from-pink-500 to-rose-500',
      uploadText: 'Photo of your hands',
      analyzeText: 'Analyzing nail shape...',
    },
    tryon: {
      title: 'Virtual Try-On',
      icon: Camera,
      color: '#3B82F6',
      gradient: 'from-blue-500 to-purple-500',
      uploadText: 'Full body photo',
      analyzeText: 'Analyzing body type...',
    }
  };

  const config = service ? serviceConfig[service] : null;

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Top Navigation Bar - iOS/Android Style */}
      {step !== 'service' && (
        <div className="safe-area-top bg-background border-b px-4 py-3 flex items-center justify-between z-50">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (step === 'preview') setStep('browse');
              else if (step === 'browse') setStep('upload');
              else if (step === 'upload') setStep('service');
              else if (step === 'analyze') setStep('upload');
            }}
            className="rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <div className="flex-1 text-center">
            {config && (
              <h1 className="font-semibold text-lg">{config.title}</h1>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowActionSheet(true)}
            className="rounded-full"
          >
            <MoreHorizontal className="w-6 h-6" />
          </Button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {/* Service Selection - First Screen */}
          {step === 'service' && (
            <motion.div
              key="service"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col p-6 pb-safe"
            >
              {/* Header */}
              <div className="text-center mb-8 mt-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4"
                >
                  <Sparkles className="w-10 h-10 text-white" />
                </motion.div>
                <h1 className="text-3xl font-bold mb-2">AI Stylist Studio</h1>
                <p className="text-muted-foreground">Choose your styling service</p>
              </div>

              {/* Service Cards */}
              <div className="space-y-4 flex-1">
                {[
                  { id: 'hair' as const, title: 'Hair Stylist', desc: 'Find your perfect hairstyle', icon: Scissors, color: '#8B5CF6' },
                  { id: 'nails' as const, title: 'Nail Artist', desc: 'Design beautiful nails', icon: Sparkles, color: '#EC4899' },
                  { id: 'tryon' as const, title: 'Virtual Try-On', desc: 'Try outfits instantly', icon: Camera, color: '#3B82F6' }
                ].map(({ id, title, desc, icon: Icon, color }, idx) => (
                  <motion.div
                    key={id}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 + 0.3 }}
                  >
                    <Card
                      className="overflow-hidden active:scale-95 transition-transform"
                      onClick={() => {
                        setService(id);
                        setStep('upload');
                      }}
                    >
                      <CardContent className="p-0">
                        <div className="flex items-center gap-4 p-4">
                          <div 
                            className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: color + '20' }}
                          >
                            <Icon className="w-8 h-8" style={{ color }} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{title}</h3>
                            <p className="text-sm text-muted-foreground">{desc}</p>
                          </div>
                          <ChevronRight className="w-6 h-6 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text-purple-pink">98%</div>
                  <div className="text-xs text-muted-foreground">Match Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text-purple-pink">500K+</div>
                  <div className="text-xs text-muted-foreground">Styles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text-purple-pink">4.9★</div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Upload Screen - Mobile Camera UI */}
          {step === 'upload' && config && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="h-full flex flex-col"
            >
              {/* Camera Preview Area */}
              <div className="flex-1 bg-black relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-6">
                    <Camera className="w-20 h-20 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">{config.uploadText}</p>
                    <p className="text-sm opacity-75">Position yourself in the frame</p>
                  </div>
                </div>

                {/* Camera Guides */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 border-2 border-white/30 rounded-3xl" />
                </div>
              </div>

              {/* Bottom Control Panel */}
              <div className="bg-black text-white p-6 pb-safe">
                {/* Tips */}
                <div className="mb-4 p-3 rounded-2xl bg-white/10 backdrop-blur-sm">
                  <div className="flex gap-3">
                    <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Clear photo with good lighting works best</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    size="lg"
                    className="w-full h-14 rounded-full text-base font-semibold"
                    style={{ background: config.color }}
                    onClick={() => handleUpload('camera')}
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Take Photo
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-12 rounded-full border-white/20 text-white hover:bg-white/10"
                      onClick={() => handleUpload('gallery')}
                    >
                      <ImageIcon className="w-5 h-5 mr-2" />
                      Gallery
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-12 rounded-full border-white/20 text-white hover:bg-white/10"
                      onClick={() => handleUpload('sample')}
                    >
                      <Star className="w-5 h-5 mr-2" />
                      Sample
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Analyzing - Loading Screen */}
          {step === 'analyze' && config && (
            <motion.div
              key="analyze"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center p-6"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6"
              >
                <Wand2 className="w-12 h-12 text-white" />
              </motion.div>

              <h2 className="text-2xl font-bold mb-2">Analyzing...</h2>
              <p className="text-muted-foreground text-center mb-8">
                {config.analyzeText}
              </p>

              {/* Progress Dots */}
              <div className="flex gap-2 mb-8">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full bg-primary"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>

              {/* Analysis Steps */}
              <div className="w-full max-w-sm space-y-3">
                {[
                  'Detecting features',
                  'Analyzing proportions',
                  'Matching styles',
                  'Generating results'
                ].map((text, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.4 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-sm">{text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Browse - Swipeable Cards (Tinder-style) */}
          {step === 'browse' && viewMode === 'stack' && (
            <motion.div
              key="browse-stack"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col"
            >
              {/* Top Bar with Filters */}
              <div className="p-4 space-y-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search styles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-12 h-12 rounded-full border-2"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="w-5 h-5" />
                  </Button>
                </div>

                {/* Filter Chips */}
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar"
                  >
                    {getCategories().map(cat => (
                      <Button
                        key={cat}
                        variant={filterCategory === cat ? 'default' : 'outline'}
                        size="sm"
                        className={`rounded-full flex-shrink-0 ${filterCategory === cat ? 'gradient-bg border-0' : ''}`}
                        onClick={() => setFilterCategory(cat)}
                      >
                        {cat === 'all' ? 'All' : cat}
                      </Button>
                    ))}
                  </motion.div>
                )}

                {/* Match Badge */}
                <div className="flex items-center justify-center gap-2">
                  <Badge className="gradient-bg border-0">
                    <Zap className="w-3 h-3 mr-1" />
                    {sortedOptions.length} Perfect Matches
                  </Badge>
                </div>
              </div>

              {/* Swipeable Card Stack */}
              <div className="flex-1 relative px-4 pb-32">
                <AnimatePresence>
                  {sortedOptions.slice(currentCardIndex, currentCardIndex + 3).map((option, idx) => {
                    const isTop = idx === 0;
                    return (
                      <motion.div
                        key={option.id}
                        drag={isTop ? 'x' : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={(e, info: PanInfo) => {
                          if (!isTop) return;
                          if (Math.abs(info.offset.x) > 150) {
                            handleSwipe(info.offset.x > 0 ? 'right' : 'left', option);
                          }
                        }}
                        initial={{ scale: 1 - idx * 0.05, y: idx * 10 }}
                        animate={{ 
                          scale: 1 - idx * 0.05, 
                          y: idx * 10,
                          opacity: 1 - idx * 0.2,
                          rotate: swipeDirection && isTop ? (swipeDirection === 'right' ? 15 : -15) : 0
                        }}
                        exit={{ 
                          x: swipeDirection === 'right' ? 500 : -500,
                          opacity: 0,
                          transition: { duration: 0.3 }
                        }}
                        className="absolute inset-0 cursor-grab active:cursor-grabbing"
                        style={{ zIndex: 10 - idx }}
                      >
                        <Card className="h-full overflow-hidden shadow-2xl">
                          {/* Image */}
                          <div className="relative h-[60%]">
                            <img
                              src={option.image}
                              alt={option.name}
                              className="w-full h-full object-cover"
                            />
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Match Score */}
                            {option.matchScore && option.matchScore >= 90 && (
                              <Badge className="absolute top-4 left-4 gradient-bg border-0 text-lg px-4 py-2">
                                <Star className="w-4 h-4 mr-1 fill-white" />
                                {option.matchScore}% Match
                              </Badge>
                            )}

                            {/* Favorite */}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm hover:bg-black/50 rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(option.id);
                              }}
                            >
                              <Heart
                                className={`w-6 h-6 ${favorites.has(option.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
                              />
                            </Button>

                            {/* Swipe Indicators */}
                            <AnimatePresence>
                              {isTop && (
                                <>
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: swipeDirection === 'right' ? 1 : 0 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                  >
                                    <div className="text-6xl font-bold text-green-500 rotate-12 border-8 border-green-500 rounded-3xl px-8 py-4">
                                      LOVE
                                    </div>
                                  </motion.div>
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: swipeDirection === 'left' ? 1 : 0 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                  >
                                    <div className="text-6xl font-bold text-red-500 -rotate-12 border-8 border-red-500 rounded-3xl px-8 py-4">
                                      PASS
                                    </div>
                                  </motion.div>
                                </>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Content */}
                          <CardContent className="p-6 h-[40%] flex flex-col">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h3 className="text-2xl font-bold mb-1">{option.name}</h3>
                                <p className="text-muted-foreground mb-2">{option.description}</p>
                              </div>
                              <Badge>{option.category}</Badge>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {option.tags.map(tag => (
                                <span
                                  key={tag}
                                  className="text-xs px-3 py-1 rounded-full bg-muted"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>

                            {/* Info Button */}
                            <Button
                              variant="outline"
                              className="w-full rounded-full"
                              onClick={() => handlePreview(option)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* No More Cards */}
                {currentCardIndex >= sortedOptions.length && (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-primary" />
                      <h3 className="text-xl font-bold mb-2">All Done!</h3>
                      <p className="text-muted-foreground mb-4">You've seen all styles</p>
                      <Button
                        className="gradient-bg border-0 rounded-full"
                        onClick={() => setCurrentCardIndex(0)}
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Start Over
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Action Buttons */}
              <div className="absolute bottom-0 left-0 right-0 p-6 pb-safe bg-gradient-to-t from-background via-background to-transparent">
                <div className="flex items-center justify-center gap-6">
                  <Button
                    size="icon"
                    variant="outline"
                    className="w-16 h-16 rounded-full border-2 border-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                    onClick={() => {
                      const current = sortedOptions[currentCardIndex];
                      if (current) handleSwipe('left', current);
                    }}
                  >
                    <X className="w-8 h-8 text-red-500" />
                  </Button>

                  <Button
                    size="icon"
                    className="w-20 h-20 rounded-full gradient-bg border-0 shadow-xl"
                    onClick={() => {
                      const current = sortedOptions[currentCardIndex];
                      if (current) handlePreview(current);
                    }}
                  >
                    <Eye className="w-10 h-10 text-white" />
                  </Button>

                  <Button
                    size="icon"
                    variant="outline"
                    className="w-16 h-16 rounded-full border-2 border-green-500 hover:bg-green-50 dark:hover:bg-green-950"
                    onClick={() => {
                      const current = sortedOptions[currentCardIndex];
                      if (current) handleSwipe('right', current);
                    }}
                  >
                    <Heart className="w-8 h-8 text-green-500" />
                  </Button>
                </div>

                {/* Swipe Instructions */}
                <p className="text-center text-xs text-muted-foreground mt-4">
                  Swipe right to save • Swipe left to skip • Tap to preview
                </p>
              </div>
            </motion.div>
          )}

          {/* Preview - Full Screen */}
          {step === 'preview' && currentPreview && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="h-full flex flex-col bg-background"
            >
              {/* Image Preview */}
              <div className="relative h-[50vh] bg-black">
                <img
                  src={currentPreview.image}
                  alt={currentPreview.name}
                  className="w-full h-full object-contain"
                />
                
                {/* Overlay Controls */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="icon"
                    className="rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70"
                    onClick={() => toggleFavorite(currentPreview.id)}
                  >
                    <Heart
                      className={`w-5 h-5 ${favorites.has(currentPreview.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
                    />
                  </Button>
                  <Button
                    size="icon"
                    className="rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70"
                  >
                    <Share2 className="w-5 h-5 text-white" />
                  </Button>
                  <Button
                    size="icon"
                    className="rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70"
                  >
                    <Maximize2 className="w-5 h-5 text-white" />
                  </Button>
                </div>

                {/* Match Score Badge */}
                {currentPreview.matchScore && (
                  <Badge className="absolute bottom-4 left-4 gradient-bg border-0 text-lg px-4 py-2">
                    <Star className="w-4 h-4 mr-1 fill-white" />
                    {currentPreview.matchScore}% Perfect Match
                  </Badge>
                )}
              </div>

              {/* Scrollable Details */}
              <div className="flex-1 overflow-y-auto pb-32">
                <div className="p-6 space-y-6">
                  {/* Title & Category */}
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h2 className="text-3xl font-bold flex-1">{currentPreview.name}</h2>
                      <Badge className="ml-2">{currentPreview.category}</Badge>
                    </div>
                    <p className="text-muted-foreground text-lg">{currentPreview.description}</p>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium">{currentPreview.popularity}% Popular</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium">Highly Rated</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h4 className="font-semibold mb-3">Style Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentPreview.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-sm px-3 py-1">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Why It Works */}
                  <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-primary" />
                        Why This Works for You
                      </h4>
                      <div className="space-y-2">
                        <div className="flex gap-2 text-sm">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span>Perfectly complements your features</span>
                        </div>
                        <div className="flex gap-2 text-sm">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span>Matches your skin tone beautifully</span>
                        </div>
                        <div className="flex gap-2 text-sm">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span>Easy to maintain and style</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Similar Styles */}
                  <div>
                    <h4 className="font-semibold mb-3">Similar Styles</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {sortedOptions
                        .filter(o => o.id !== currentPreview.id)
                        .slice(0, 3)
                        .map(option => (
                          <div
                            key={option.id}
                            className="aspect-square rounded-xl overflow-hidden active:scale-95 transition-transform"
                            onClick={() => setCurrentPreview(option)}
                          >
                            <img
                              src={option.image}
                              alt={option.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4 pb-safe bg-background border-t">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 rounded-full"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Ask Expert
                  </Button>
                  <Button
                    size="lg"
                    className="h-14 rounded-full gradient-bg border-0"
                    onClick={() => handleAddToSelection(currentPreview)}
                  >
                    <Bookmark className="w-5 h-5 mr-2" />
                    Save Style
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Sheet - Bottom Sheet Modal */}
      <AnimatePresence>
        {showActionSheet && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowActionSheet(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed bottom-0 left-0 right-0 bg-background rounded-t-3xl z-50 pb-safe"
            >
              <div className="p-6 space-y-2">
                <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-6" />
                
                <Button variant="ghost" className="w-full justify-start h-14 text-base">
                  <Share2 className="w-5 h-5 mr-3" />
                  Share Results
                </Button>
                <Button variant="ghost" className="w-full justify-start h-14 text-base">
                  <Download className="w-5 h-5 mr-3" />
                  Download Image
                </Button>
                <Button variant="ghost" className="w-full justify-start h-14 text-base">
                  <Bookmark className="w-5 h-5 mr-3" />
                  Saved Styles ({selectedOptions.length})
                </Button>
                <Button variant="ghost" className="w-full justify-start h-14 text-base">
                  <Heart className="w-5 h-5 mr-3" />
                  Favorites ({favorites.size})
                </Button>
                <Button variant="ghost" className="w-full justify-start h-14 text-base text-red-500">
                  <RotateCcw className="w-5 h-5 mr-3" />
                  Start Over
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full h-14 mt-4 rounded-full"
                  onClick={() => setShowActionSheet(false)}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Saved Items Floating Badge */}
      {selectedOptions.length > 0 && step === 'browse' && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed top-20 right-4 z-40"
        >
          <Button
            size="icon"
            className="w-14 h-14 rounded-full gradient-bg border-0 shadow-xl relative"
            onClick={() => setShowActionSheet(true)}
          >
            <Bookmark className="w-6 h-6 text-white" />
            <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 flex items-center justify-center border-2 border-background">
              {selectedOptions.length}
            </Badge>
          </Button>
        </motion.div>
      )}
    </div>
  );
}