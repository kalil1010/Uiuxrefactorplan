import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Calendar } from '../ui/calendar';
import { 
  Plus, 
  Search, 
  Filter, 
  Grid3x3, 
  List,
  Shirt,
  Package,
  Sparkles,
  Trash2,
  Edit,
  Heart,
  Upload,
  Tag,
  Palette,
  Calendar as CalendarIcon,
  X,
  ChevronDown,
  TrendingUp,
  Clock,
  DollarSign,
  Eye,
  Share2,
  MoreVertical,
  Download,
  ShoppingBag,
  Sun,
  Cloud,
  Snowflake,
  Flower2,
  SlidersHorizontal,
  BarChart3,
  ImagePlus,
  CheckCircle2,
  History
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WearEntry {
  id: number;
  date: string;
  occasion?: string;
  notes?: string;
}

interface ClosetItem {
  id: number;
  name: string;
  category: string;
  color: string;
  brand: string;
  season: string;
  wearCount: number;
  favorite: boolean;
  image: string;
  price?: number;
  purchaseDate?: string;
  size?: string;
  occasions?: string[];
  lastWorn?: string;
  notes?: string;
  wearHistory?: WearEntry[];
}

export default function MyClosetPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<ClosetItem | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterSeason, setFilterSeason] = useState('all');
  const [filterColor, setFilterColor] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items', icon: Package, count: 48 },
    { id: 'tops', name: 'Tops', icon: Shirt, count: 15 },
    { id: 'bottoms', name: 'Bottoms', icon: Shirt, count: 12 },
    { id: 'dresses', name: 'Dresses', icon: Shirt, count: 8 },
    { id: 'outerwear', name: 'Outerwear', icon: Shirt, count: 6 },
    { id: 'shoes', name: 'Shoes', icon: Shirt, count: 7 }
  ];

  const closetItems: ClosetItem[] = [
    {
      id: 1,
      name: 'White Cotton T-Shirt',
      category: 'tops',
      color: 'White',
      brand: 'Zara',
      season: 'All Season',
      wearCount: 12,
      favorite: true,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      price: 29.99,
      purchaseDate: '2024-01-15',
      size: 'M',
      occasions: ['Casual', 'Weekend'],
      lastWorn: '2024-02-10',
      notes: 'Goes great with jeans'
    },
    {
      id: 2,
      name: 'Blue Denim Jeans',
      category: 'bottoms',
      color: 'Blue',
      brand: 'Levi\'s',
      season: 'All Season',
      wearCount: 24,
      favorite: true,
      image: 'https://images.unsplash.com/photo-1542272454315-7f6f6c1d9fcf?w=400',
      price: 89.99,
      purchaseDate: '2023-11-20',
      size: '32',
      occasions: ['Casual', 'Work'],
      lastWorn: '2024-02-15'
    },
    {
      id: 3,
      name: 'Floral Summer Dress',
      category: 'dresses',
      color: 'Multi',
      brand: 'H&M',
      season: 'Summer',
      wearCount: 5,
      favorite: false,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
      price: 49.99,
      purchaseDate: '2024-01-05',
      size: 'S',
      occasions: ['Party', 'Date'],
      lastWorn: '2024-01-28'
    },
    {
      id: 4,
      name: 'Black Leather Jacket',
      category: 'outerwear',
      color: 'Black',
      brand: 'AllSaints',
      season: 'Fall/Winter',
      wearCount: 8,
      favorite: true,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
      price: 299.99,
      purchaseDate: '2023-10-10',
      size: 'M',
      occasions: ['Formal', 'Night Out'],
      lastWorn: '2024-02-12'
    },
    {
      id: 5,
      name: 'Striped Blouse',
      category: 'tops',
      color: 'Blue/White',
      brand: 'Mango',
      season: 'Spring/Summer',
      wearCount: 6,
      favorite: false,
      image: 'https://images.unsplash.com/photo-1624206112431-4e12f463ccac?w=400',
      price: 39.99,
      purchaseDate: '2024-01-20',
      size: 'M',
      occasions: ['Work', 'Casual']
    },
    {
      id: 6,
      name: 'White Sneakers',
      category: 'shoes',
      color: 'White',
      brand: 'Nike',
      season: 'All Season',
      wearCount: 45,
      favorite: true,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
      price: 110.00,
      purchaseDate: '2023-09-15',
      size: '9',
      occasions: ['Casual', 'Sport', 'Weekend'],
      lastWorn: '2024-02-17'
    }
  ];

  const seasons = [
    { id: 'all', name: 'All Seasons', icon: Calendar },
    { id: 'spring', name: 'Spring', icon: Flower2 },
    { id: 'summer', name: 'Summer', icon: Sun },
    { id: 'fall', name: 'Fall', icon: Cloud },
    { id: 'winter', name: 'Winter', icon: Snowflake }
  ];

  const colors = [
    { id: 'all', name: 'All Colors' },
    { id: 'white', name: 'White', hex: '#FFFFFF' },
    { id: 'black', name: 'Black', hex: '#000000' },
    { id: 'blue', name: 'Blue', hex: '#3B82F6' },
    { id: 'red', name: 'Red', hex: '#EF4444' },
    { id: 'multi', name: 'Multi' }
  ];

  // Filter and search items
  const filteredItems = closetItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeason = filterSeason === 'all' || 
                          item.season.toLowerCase().includes(filterSeason.toLowerCase());
    const matchesColor = filterColor === 'all' || 
                         item.color.toLowerCase().includes(filterColor.toLowerCase());
    
    return matchesCategory && matchesSearch && matchesSeason && matchesColor;
  });

  const toggleFavorite = (id: number) => {
    // In production, update backend
    console.log('Toggle favorite:', id);
  };

  const deleteItem = (id: number) => {
    // In production, show confirmation and delete from backend
    console.log('Delete item:', id);
  };

  const getSeasonIcon = (season: string) => {
    if (season.includes('Summer')) return <Sun className="w-3 h-3" />;
    if (season.includes('Winter')) return <Snowflake className="w-3 h-3" />;
    if (season.includes('Spring')) return <Flower2 className="w-3 h-3" />;
    if (season.includes('Fall')) return <Cloud className="w-3 h-3" />;
    return <Calendar className="w-3 h-3" />;
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background Orbs */}
      <div className="fixed top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-[#6556C6]/10 to-[#D20EC1]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-[#D20EC1]/10 to-[#6556C6]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold gradient-text mb-1">My Digital Closet</h2>
              <p className="text-sm text-muted-foreground">Organize, style, and track your wardrobe</p>
            </div>
            <Button 
              className="gradient-bg border-0 shadow-lg hover:shadow-xl transition-all"
              onClick={() => setShowAddItem(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, brand, or color..." 
                className="pl-10 glass-effect"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant={showFilters ? 'default' : 'outline'} 
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
            <div className="hidden sm:flex border rounded-lg p-1 glass-effect">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="glass-effect rounded-lg p-4 mb-4 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <Label className="text-xs mb-2 block">Sort By</Label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recent">Recently Added</SelectItem>
                          <SelectItem value="worn">Most Worn</SelectItem>
                          <SelectItem value="price-high">Price: High to Low</SelectItem>
                          <SelectItem value="price-low">Price: Low to High</SelectItem>
                          <SelectItem value="name">Name A-Z</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs mb-2 block">Season</Label>
                      <Select value={filterSeason} onValueChange={setFilterSeason}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {seasons.map(season => (
                            <SelectItem key={season.id} value={season.id}>
                              {season.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs mb-2 block">Color</Label>
                      <Select value={filterColor} onValueChange={setFilterColor}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {colors.map(color => (
                            <SelectItem key={color.id} value={color.id}>
                              <div className="flex items-center gap-2">
                                {color.hex && (
                                  <div 
                                    className="w-4 h-4 rounded-full border"
                                    style={{ backgroundColor: color.hex }}
                                  />
                                )}
                                {color.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className="flex-shrink-0 transition-all"
              >
                <cat.icon className="w-4 h-4 mr-2" />
                {cat.name} ({cat.count})
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="border-b bg-muted/30 px-4 py-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="p-4 glass-effect hover:scale-105 transition-transform cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#6556C6]/20 to-[#D20EC1]/20 group-hover:from-[#6556C6]/30 group-hover:to-[#D20EC1]/30 transition-colors">
                <Package className="w-5 h-5 text-[#6556C6]" />
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text">48</div>
                <div className="text-xs text-muted-foreground">Total Items</div>
              </div>
            </div>
          </Card>
          <Card className="p-4 glass-effect hover:scale-105 transition-transform cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-red-500/20 to-pink-500/20 group-hover:from-red-500/30 group-hover:to-pink-500/30 transition-colors">
                <Heart className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text">12</div>
                <div className="text-xs text-muted-foreground">Favorites</div>
              </div>
            </div>
          </Card>
          <Card className="p-4 glass-effect hover:scale-105 transition-transform cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-colors">
                <Sparkles className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text">156</div>
                <div className="text-xs text-muted-foreground">Total Outfits</div>
              </div>
            </div>
          </Card>
          <Card className="p-4 glass-effect hover:scale-105 transition-transform cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-colors">
                <DollarSign className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text">$2.5K</div>
                <div className="text-xs text-muted-foreground">Est. Value</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Items Grid/List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-7xl mx-auto">
          {filteredItems.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="w-24 h-24 rounded-full gradient-bg flex items-center justify-center mb-6">
                <Package className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No items found</h3>
              <p className="text-muted-foreground mb-6 text-center max-w-md">
                {searchQuery ? 'Try adjusting your search or filters' : 'Start building your digital closet by adding your first item'}
              </p>
              <Button className="gradient-bg border-0" onClick={() => setShowAddItem(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Item
              </Button>
            </motion.div>
          ) : viewMode === 'grid' ? (
            <motion.div 
              layout
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden group cursor-pointer glass-effect hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    <div 
                      className="relative aspect-square"
                      onClick={() => setSelectedItem(item)}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Favorite Badge */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item.id);
                        }}
                        className="absolute top-2 right-2 p-2 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm shadow-lg hover:scale-110 transition-transform"
                      >
                        <Heart 
                          className={`w-4 h-4 transition-all ${
                            item.favorite 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-gray-600 dark:text-gray-400'
                          }`} 
                        />
                      </button>

                      {/* Wear Count Badge */}
                      <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-semibold flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {item.wearCount}x
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end p-4 gap-2">
                        <div className="flex gap-2 w-full">
                          <Button 
                            size="sm" 
                            variant="secondary" 
                            className="flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedItem(item);
                            }}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            variant="secondary"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle edit
                            }}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="secondary"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteItem(item.id);
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <h4 className="font-semibold text-sm mb-2 line-clamp-1">{item.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Tag className="w-3 h-3" />
                        <span className="line-clamp-1">{item.brand}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-muted">
                          <Palette className="w-3 h-3" />
                          {item.color}
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {getSeasonIcon(item.season)}
                          <span className="hidden sm:inline">{item.season.split('/')[0]}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="space-y-3">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card 
                    className="p-4 flex items-center gap-4 glass-effect hover:shadow-lg transition-all cursor-pointer group"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 rounded-lg object-cover group-hover:scale-105 transition-transform"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item.id);
                        }}
                        className="absolute -top-2 -right-2 p-1.5 rounded-full bg-white dark:bg-black shadow-lg hover:scale-110 transition-transform"
                      >
                        <Heart 
                          className={`w-3 h-3 ${
                            item.favorite 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-gray-600 dark:text-gray-400'
                          }`} 
                        />
                      </button>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        {item.name}
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {item.brand}
                        </span>
                        <span className="flex items-center gap-1">
                          <Palette className="w-3 h-3" />
                          {item.color}
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Worn {item.wearCount}x
                        </span>
                        <span className="flex items-center gap-1">
                          {getSeasonIcon(item.season)}
                          {item.season}
                        </span>
                      </div>
                      {item.price && (
                        <div className="mt-2 flex items-center gap-3 text-xs">
                          <Badge variant="secondary">${item.price}</Badge>
                          {item.lastWorn && (
                            <span className="text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Last worn: {new Date(item.lastWorn).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost" onClick={(e) => e.stopPropagation()}>
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={(e) => e.stopPropagation()}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteItem(item.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* AI Suggestions Banner */}
      <div className="border-t p-4 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-blue-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-gradient-to-br from-[#6556C6] to-[#D20EC1] shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold gradient-text">AI Insights Ready!</h4>
                <p className="text-sm text-muted-foreground">Get personalized outfit suggestions from your closet</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="glass-effect">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
              <Button className="gradient-bg border-0 shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                View Suggestions
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Item Detail Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl gradient-text flex items-center gap-3">
                  {selectedItem.name}
                  <button
                    onClick={() => toggleFavorite(selectedItem.id)}
                    className="p-2 rounded-full hover:bg-muted transition-colors"
                  >
                    <Heart 
                      className={`w-5 h-5 ${
                        selectedItem.favorite 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-600'
                      }`} 
                    />
                  </button>
                </DialogTitle>
                <DialogDescription>
                  Manage your wardrobe item details and view insights
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* Image Section */}
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-lg overflow-hidden glass-effect">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="w-full">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" className="w-full text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>

                {/* Details Section */}
                <div className="space-y-6">
                  <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="insights">Insights</TabsTrigger>
                      <TabsTrigger value="outfits">Outfits</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Brand</Label>
                          <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-muted-foreground" />
                            <span className="font-semibold">{selectedItem.brand}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Category</Label>
                          <Badge variant="secondary" className="w-fit">{selectedItem.category}</Badge>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Color</Label>
                          <div className="flex items-center gap-2">
                            <Palette className="w-4 h-4 text-muted-foreground" />
                            <span className="font-semibold">{selectedItem.color}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Size</Label>
                          <span className="font-semibold">{selectedItem.size || 'N/A'}</span>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Season</Label>
                          <div className="flex items-center gap-2">
                            {getSeasonIcon(selectedItem.season)}
                            <span className="font-semibold">{selectedItem.season}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Price</Label>
                          <span className="font-semibold">${selectedItem.price || 'N/A'}</span>
                        </div>
                      </div>

                      {selectedItem.occasions && selectedItem.occasions.length > 0 && (
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">Occasions</Label>
                          <div className="flex flex-wrap gap-2">
                            {selectedItem.occasions.map((occasion) => (
                              <Badge key={occasion} variant="outline">{occasion}</Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedItem.notes && (
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">Notes</Label>
                          <p className="text-sm p-3 rounded-lg bg-muted">{selectedItem.notes}</p>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="insights" className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Card className="p-4 glass-effect">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            <Label className="text-xs text-muted-foreground">Wear Count</Label>
                          </div>
                          <div className="text-2xl font-bold gradient-text">{selectedItem.wearCount}x</div>
                          <p className="text-xs text-muted-foreground mt-1">Total wears</p>
                        </Card>
                        <Card className="p-4 glass-effect">
                          <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="w-4 h-4 text-green-500" />
                            <Label className="text-xs text-muted-foreground">Cost Per Wear</Label>
                          </div>
                          <div className="text-2xl font-bold gradient-text">
                            ${selectedItem.price && selectedItem.wearCount 
                              ? (selectedItem.price / selectedItem.wearCount).toFixed(2)
                              : 'N/A'}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Great value!</p>
                        </Card>
                      </div>

                      {selectedItem.lastWorn && (
                        <Card className="p-4 glass-effect">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <Label className="text-xs text-muted-foreground">Last Worn</Label>
                          </div>
                          <div className="font-semibold">
                            {new Date(selectedItem.lastWorn).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {Math.floor((new Date().getTime() - new Date(selectedItem.lastWorn).getTime()) / (1000 * 60 * 60 * 24))} days ago
                          </p>
                        </Card>
                      )}

                      {selectedItem.purchaseDate && (
                        <Card className="p-4 glass-effect">
                          <div className="flex items-center gap-2 mb-2">
                            <ShoppingBag className="w-4 h-4 text-purple-500" />
                            <Label className="text-xs text-muted-foreground">Purchase Date</Label>
                          </div>
                          <div className="font-semibold">
                            {new Date(selectedItem.purchaseDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Owned for {Math.floor((new Date().getTime() - new Date(selectedItem.purchaseDate).getTime()) / (1000 * 60 * 60 * 24))} days
                          </p>
                        </Card>
                      )}
                    </TabsContent>

                    <TabsContent value="outfits" className="mt-4">
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground text-center py-8">
                          This item appears in 8 saved outfits
                        </p>
                        <div className="grid grid-cols-3 gap-3">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="aspect-square rounded-lg bg-muted animate-pulse" />
                          ))}
                        </div>
                        <Button variant="outline" className="w-full">
                          <Sparkles className="w-4 h-4 mr-2" />
                          Create New Outfit
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Item Modal */}
      <Dialog open={showAddItem} onOpenChange={setShowAddItem}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="gradient-text">Add New Item</DialogTitle>
            <DialogDescription>
              Add a new item to your digital closet
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer group">
              <ImagePlus className="w-12 h-12 mx-auto mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
              <p className="font-semibold mb-1">Upload Item Photo</p>
              <p className="text-xs text-muted-foreground">Click to browse or drag and drop</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Item Name</Label>
                <Input placeholder="e.g., White Cotton T-Shirt" />
              </div>
              <div className="space-y-2">
                <Label>Brand</Label>
                <Input placeholder="e.g., Zara" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tops">Tops</SelectItem>
                    <SelectItem value="bottoms">Bottoms</SelectItem>
                    <SelectItem value="dresses">Dresses</SelectItem>
                    <SelectItem value="outerwear">Outerwear</SelectItem>
                    <SelectItem value="shoes">Shoes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Color</Label>
                <Input placeholder="e.g., White" />
              </div>
              <div className="space-y-2">
                <Label>Size</Label>
                <Input placeholder="e.g., M" />
              </div>
              <div className="space-y-2">
                <Label>Price</Label>
                <Input type="number" placeholder="0.00" />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setShowAddItem(false)}>
                Cancel
              </Button>
              <Button className="flex-1 gradient-bg border-0">
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}