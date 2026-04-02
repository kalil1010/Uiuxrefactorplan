import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { 
  Shuffle, 
  Save, 
  Share2, 
  Sparkles, 
  Download, 
  Wand2,
  ArrowLeft,
  Calendar,
  Clock,
  Sun,
  Cloud,
  Heart,
  Eye,
  TrendingUp,
  Palette,
  Shirt,
  Grid3x3,
  Filter,
  Search,
  Plus,
  X,
  Copy,
  Check,
  Instagram,
  Twitter,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ClosetItem {
  id: number;
  name: string;
  category: string;
  image: string;
  color?: string;
  season?: string;
}

interface SavedOutfit {
  id: number;
  name: string;
  items: number[];
  createdAt: string;
  wearCount: number;
  favorite: boolean;
  occasion?: string;
}

const closetItems: ClosetItem[] = [
  { id: 1, name: 'White T-Shirt', category: 'Tops', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300', color: 'White', season: 'All Season' },
  { id: 2, name: 'Blue Denim Jeans', category: 'Bottoms', image: 'https://images.unsplash.com/photo-1542272454315-7fbb7cda0d4d?w=300', color: 'Blue', season: 'All Season' },
  { id: 3, name: 'Leather Jacket', category: 'Outerwear', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300', color: 'Black', season: 'Fall/Winter' },
  { id: 4, name: 'Sneakers', category: 'Shoes', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300', color: 'White', season: 'All Season' },
  { id: 5, name: 'Summer Dress', category: 'Dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300', color: 'Floral', season: 'Summer' },
  { id: 6, name: 'Blazer', category: 'Outerwear', image: 'https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=300', color: 'Navy', season: 'All Season' },
  { id: 7, name: 'Striped Blouse', category: 'Tops', image: 'https://images.unsplash.com/photo-1624206112431-4e12f463ccac?w=300', color: 'Blue/White', season: 'Spring' },
  { id: 8, name: 'Black Pants', category: 'Bottoms', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300', color: 'Black', season: 'All Season' },
];

export default function ClosetMixerPage() {
  const [selectedItems, setSelectedItems] = useState<number[]>([1, 2, 3]);
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([
    { id: 1, name: 'Casual Friday', items: [1, 2, 4], createdAt: '2024-02-15', wearCount: 3, favorite: true, occasion: 'Casual' },
    { id: 2, name: 'Summer Vibes', items: [5, 4], createdAt: '2024-02-10', wearCount: 1, favorite: false, occasion: 'Party' },
  ]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [outfitName, setOutfitName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<'mixer' | 'saved'>('mixer');
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);

  const categories = ['all', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes'];

  const filteredItems = closetItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const randomMix = () => {
    const categories = ['Tops', 'Bottoms', 'Shoes'];
    const randomSelection: number[] = [];
    
    categories.forEach(cat => {
      const categoryItems = closetItems.filter(item => item.category === cat);
      if (categoryItems.length > 0) {
        const randomItem = categoryItems[Math.floor(Math.random() * categoryItems.length)];
        randomSelection.push(randomItem.id);
      }
    });
    
    setSelectedItems(randomSelection);
  };

  const saveOutfit = () => {
    if (selectedItems.length === 0) return;
    
    const newOutfit: SavedOutfit = {
      id: Date.now(),
      name: outfitName || `Outfit ${savedOutfits.length + 1}`,
      items: selectedItems,
      createdAt: new Date().toISOString(),
      wearCount: 0,
      favorite: false
    };
    
    setSavedOutfits([newOutfit, ...savedOutfits]);
    setShowSaveDialog(false);
    setOutfitName('');
  };

  const loadOutfit = (outfit: SavedOutfit) => {
    setSelectedItems(outfit.items);
    setCurrentView('mixer');
  };

  const deleteOutfit = (id: number) => {
    setSavedOutfits(savedOutfits.filter(o => o.id !== id));
  };

  const generateShareLink = () => {
    const link = `https://zokaihub.com/outfits/${Date.now()}`;
    setShareLink(link);
    setShowShareDialog(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background Orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#6556C6]/10 to-[#D20EC1]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tr from-[#D20EC1]/10 to-[#6556C6]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="sticky top-0 z-40 glass-effect border-b backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold gradient-text">Closet Mixer</h1>
                  <Badge className="gradient-bg text-white border-0">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI-Powered
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Mix and match items to create the perfect outfit
                </p>
              </div>
            </div>
            <div className="hidden sm:flex gap-2">
              <Button
                variant={currentView === 'mixer' ? 'default' : 'outline'}
                onClick={() => setCurrentView('mixer')}
              >
                <Wand2 className="w-4 h-4 mr-2" />
                Mixer
              </Button>
              <Button
                variant={currentView === 'saved' ? 'default' : 'outline'}
                onClick={() => setCurrentView('saved')}
              >
                <Save className="w-4 h-4 mr-2" />
                Saved ({savedOutfits.length})
              </Button>
            </div>
          </div>

          {/* Mobile View Toggle */}
          <div className="flex sm:hidden gap-2 mb-4">
            <Button
              variant={currentView === 'mixer' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setCurrentView('mixer')}
            >
              <Wand2 className="w-4 h-4 mr-2" />
              Mixer
            </Button>
            <Button
              variant={currentView === 'saved' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setCurrentView('saved')}
            >
              <Save className="w-4 h-4 mr-2" />
              Saved ({savedOutfits.length})
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <AnimatePresence mode="wait">
          {currentView === 'mixer' ? (
            <motion.div
              key="mixer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Left Column - Closet Items */}
              <Card className="glass-effect shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="gradient-text">Your Closet</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedItems.length} items selected
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={randomMix}
                      className="gap-2"
                    >
                      <Shuffle className="w-4 h-4" />
                      Random
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Search and Filter */}
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search items..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Category Filter */}
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map((cat) => (
                      <Button
                        key={cat}
                        variant={selectedCategory === cat ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedCategory(cat)}
                        className="flex-shrink-0"
                      >
                        {cat === 'all' ? 'All' : cat}
                      </Button>
                    ))}
                  </div>

                  {/* Items Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[500px] overflow-y-auto pr-2">
                    {filteredItems.map((item) => (
                      <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative group cursor-pointer"
                        onClick={() => toggleItem(item.id)}
                      >
                        <div className={`aspect-square rounded-lg overflow-hidden border-2 transition-all shadow-lg ${
                          selectedItems.includes(item.id)
                            ? 'border-primary shadow-primary/50 ring-2 ring-primary/20'
                            : 'border-transparent hover:border-muted-foreground/20'
                        }`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          
                          {/* Checkbox */}
                          <div className="absolute top-2 right-2">
                            <div className={`p-1 rounded-full backdrop-blur-sm transition-all ${
                              selectedItems.includes(item.id)
                                ? 'bg-primary shadow-lg'
                                : 'bg-white/90 dark:bg-black/90'
                            }`}>
                              <Checkbox
                                checked={selectedItems.includes(item.id)}
                                className="border-0"
                              />
                            </div>
                          </div>

                          {/* Category Badge */}
                          <div className="absolute bottom-2 left-2">
                            <Badge variant="secondary" className="text-xs backdrop-blur-sm bg-white/90 dark:bg-black/90">
                              {item.category}
                            </Badge>
                          </div>

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        
                        <div className="mt-2 text-center">
                          <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                          {item.color && (
                            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-1">
                              <Palette className="w-3 h-3" />
                              {item.color}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {filteredItems.length === 0 && (
                    <div className="text-center py-12">
                      <Grid3x3 className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                      <p className="text-muted-foreground">No items found</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Right Column - Outfit Preview */}
              <Card className="glass-effect shadow-xl sticky top-24 h-fit">
                <CardHeader>
                  <CardTitle className="gradient-text">Outfit Preview</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'} selected
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedItems.length > 0 ? (
                    <>
                      {/* Outfit Display */}
                      <div className="relative aspect-[3/4] rounded-xl bg-gradient-to-br from-muted/50 to-muted p-6 overflow-hidden">
                        {/* Decorative Background */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-3xl" />
                          <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary rounded-full blur-3xl" />
                        </div>

                        {/* Items Stack */}
                        <div className="relative h-full flex flex-col items-center justify-center gap-3">
                          {closetItems
                            .filter(item => selectedItems.includes(item.id))
                            .map((item, index) => (
                              <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative w-full max-w-xs"
                              >
                                <div className="aspect-square rounded-lg overflow-hidden shadow-2xl ring-2 ring-white/20">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <Badge 
                                  variant="secondary" 
                                  className="absolute -top-2 -right-2 shadow-lg backdrop-blur-sm"
                                >
                                  {item.category}
                                </Badge>
                              </motion.div>
                            ))}
                        </div>
                      </div>

                      {/* Selected Items List */}
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">Outfit Items:</Label>
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                          {closetItems
                            .filter(item => selectedItems.includes(item.id))
                            .map((item) => (
                              <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 rounded object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">{item.category}</p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => toggleItem(item.id)}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </motion.div>
                            ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2 pt-4 border-t">
                        <div className="grid grid-cols-3 gap-2">
                          <Button 
                            variant="outline"
                            onClick={() => setShowSaveDialog(true)}
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Save
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={generateShareLink}
                          >
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </Button>
                          <Button variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                          </Button>
                        </div>
                        <Button className="w-full gradient-bg border-0 shadow-lg">
                          <Zap className="w-4 h-4 mr-2" />
                          Get AI Styling Tips
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="aspect-[3/4] rounded-xl border-2 border-dashed border-border flex items-center justify-center">
                      <div className="text-center p-6">
                        <Sparkles className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                        <p className="font-semibold mb-2">Start Creating</p>
                        <p className="text-sm text-muted-foreground">
                          Select items from your closet to create an outfit
                        </p>
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={randomMix}
                        >
                          <Shuffle className="w-4 h-4 mr-2" />
                          Try Random Mix
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="saved"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="glass-effect shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="gradient-text">Saved Outfits</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {savedOutfits.length} saved outfit{savedOutfits.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentView('mixer')}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create New
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {savedOutfits.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {savedOutfits.map((outfit, index) => (
                        <motion.div
                          key={outfit.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="overflow-hidden group hover:shadow-xl transition-all cursor-pointer">
                            <div 
                              className="relative aspect-square bg-gradient-to-br from-muted/50 to-muted p-4"
                              onClick={() => loadOutfit(outfit)}
                            >
                              <div className="grid grid-cols-2 gap-2 h-full">
                                {closetItems
                                  .filter(item => outfit.items.includes(item.id))
                                  .slice(0, 4)
                                  .map(item => (
                                    <div key={item.id} className="rounded-lg overflow-hidden">
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                      />
                                    </div>
                                  ))}
                              </div>
                              
                              {/* Favorite Button */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSavedOutfits(savedOutfits.map(o => 
                                    o.id === outfit.id ? {...o, favorite: !o.favorite} : o
                                  ));
                                }}
                                className="absolute top-2 right-2 p-2 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm shadow-lg hover:scale-110 transition-transform"
                              >
                                <Heart 
                                  className={`w-4 h-4 ${
                                    outfit.favorite 
                                      ? 'fill-red-500 text-red-500' 
                                      : 'text-gray-600 dark:text-gray-400'
                                  }`} 
                                />
                              </button>

                              {/* Items Count */}
                              <div className="absolute bottom-2 left-2">
                                <Badge className="backdrop-blur-sm bg-white/90 dark:bg-black/90">
                                  {outfit.items.length} items
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold line-clamp-1">{outfit.name}</h4>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Created {new Date(outfit.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                                <span className="flex items-center gap-1">
                                  <TrendingUp className="w-3 h-3" />
                                  Worn {outfit.wearCount}x
                                </span>
                                {outfit.occasion && (
                                  <Badge variant="outline" className="text-xs">
                                    {outfit.occasion}
                                  </Badge>
                                )}
                              </div>

                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1"
                                  onClick={() => loadOutfit(outfit)}
                                >
                                  <Eye className="w-3 h-3 mr-1" />
                                  View
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteOutfit(outfit.id);
                                  }}
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <Save className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-bold mb-2">No Saved Outfits</h3>
                      <p className="text-muted-foreground mb-6">
                        Create and save your first outfit combination
                      </p>
                      <Button
                        className="gradient-bg border-0"
                        onClick={() => setCurrentView('mixer')}
                      >
                        <Wand2 className="w-4 h-4 mr-2" />
                        Start Mixing
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Save Outfit Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="gradient-text">Save Outfit</DialogTitle>
            <DialogDescription>
              Give your outfit a name and save it for later
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Outfit Name</Label>
              <Input
                placeholder="e.g., Casual Friday"
                value={outfitName}
                onChange={(e) => setOutfitName(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowSaveDialog(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 gradient-bg border-0"
                onClick={saveOutfit}
                disabled={selectedItems.length === 0}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Outfit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="gradient-text">Share Outfit</DialogTitle>
            <DialogDescription>
              Share your outfit with friends and the ZokaiHub community
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Share Link</Label>
              <div className="flex gap-2">
                <Input
                  value={shareLink}
                  readOnly
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={copyToClipboard}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Share to Social Media</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" className="gap-2">
                  <Instagram className="w-4 h-4" />
                  Instagram
                </Button>
                <Button variant="outline" className="gap-2">
                  <Twitter className="w-4 h-4" />
                  Twitter
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  More
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
