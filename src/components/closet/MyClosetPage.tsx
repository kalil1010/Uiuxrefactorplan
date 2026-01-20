import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
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
  Calendar
} from 'lucide-react';

export default function MyClosetPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items', icon: Package, count: 48 },
    { id: 'tops', name: 'Tops', icon: Shirt, count: 15 },
    { id: 'bottoms', name: 'Bottoms', icon: Shirt, count: 12 },
    { id: 'dresses', name: 'Dresses', icon: Shirt, count: 8 },
    { id: 'outerwear', name: 'Outerwear', icon: Shirt, count: 6 },
    { id: 'shoes', name: 'Shoes', icon: Shirt, count: 7 }
  ];

  const closetItems = [
    {
      id: 1,
      name: 'White Cotton T-Shirt',
      category: 'tops',
      color: 'White',
      brand: 'Zara',
      season: 'All Season',
      wearCount: 12,
      favorite: true,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'
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
      image: 'https://images.unsplash.com/photo-1542272454315-7f6f6c1d9fcf?w=400'
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
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400'
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
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400'
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
      image: 'https://images.unsplash.com/photo-1624206112431-4e12f463ccac?w=400'
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
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400'
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? closetItems 
    : closetItems.filter(item => item.category === selectedCategory);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">My Digital Closet</h2>
            <Button className="gradient-bg border-0">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search your closet..." className="pl-10" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
            <div className="hidden sm:flex border rounded-lg p-1">
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

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className="flex-shrink-0"
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
          <Card className="p-4">
            <div className="text-2xl font-bold gradient-text">48</div>
            <div className="text-sm text-muted-foreground">Total Items</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold gradient-text">12</div>
            <div className="text-sm text-muted-foreground">Favorites</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold gradient-text">156</div>
            <div className="text-sm text-muted-foreground">Total Outfits</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold gradient-text">$2.5K</div>
            <div className="text-sm text-muted-foreground">Est. Value</div>
          </Card>
        </div>
      </div>

      {/* Items Grid/List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-7xl mx-auto">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden group">
                  <div className="relative aspect-square">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {item.favorite && (
                      <div className="absolute top-2 right-2">
                        <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button size="icon" variant="secondary" className="h-8 w-8">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="h-8 w-8">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-semibold text-sm mb-1 line-clamp-1">{item.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Palette className="w-3 h-3" />
                      {item.color}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Worn {item.wearCount}x</span>
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary">{item.season}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredItems.map((item) => (
                <Card key={item.id} className="p-4 flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{item.name}</h4>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {item.brand}
                      </span>
                      <span className="flex items-center gap-1">
                        <Palette className="w-3 h-3" />
                        {item.color}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Worn {item.wearCount}x
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.favorite && <Heart className="w-5 h-5 fill-red-500 text-red-500" />}
                    <Button size="icon" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* AI Suggestions Banner */}
      <div className="border-t p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-primary" />
            <div>
              <h4 className="font-semibold">AI Insights Ready!</h4>
              <p className="text-sm text-muted-foreground">Get personalized outfit suggestions from your closet</p>
            </div>
          </div>
          <Button className="gradient-bg border-0">
            View Suggestions
          </Button>
        </div>
      </div>
    </div>
  );
}
