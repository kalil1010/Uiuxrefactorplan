import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Plus, Grid3x3, List, Filter, Shirt, Search } from 'lucide-react';

export default function MobileClosetPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All', count: 48 },
    { id: 'tops', label: 'Tops', count: 12 },
    { id: 'bottoms', label: 'Bottoms', count: 10 },
    { id: 'dresses', label: 'Dresses', count: 8 },
    { id: 'shoes', label: 'Shoes', count: 15 },
    { id: 'accessories', label: 'Accessories', count: 3 },
  ];

  const items = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    category: 'Tops',
    image: `https://images.unsplash.com/photo-${1515886657613 + i * 1000}?w=300&h=400&fit=crop`,
    wornCount: Math.floor(Math.random() * 20),
    color: ['Red', 'Blue', 'Black', 'White'][Math.floor(Math.random() * 4)],
  }));

  return (
    <div className="h-screen bg-background flex flex-col max-w-md mx-auto border-x">
      {/* Header */}
      <div className="bg-background border-b px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold">My Closet</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Filter className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid3x3 className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
          {categories.map((cat) => (
            <Badge
              key={cat.id}
              variant={activeCategory === cat.id ? 'default' : 'outline'}
              className={`cursor-pointer capitalize flex-shrink-0 px-4 py-1.5 ${
                activeCategory === cat.id ? 'gradient-bg text-white border-0' : ''
              }`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label} ({cat.count})
            </Badge>
          ))}
        </div>
      </div>

      {/* Items Grid/List */}
      <div className="flex-1 overflow-y-auto p-4">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-2xl overflow-hidden border cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[3/4] bg-muted relative">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800" />
                  {item.wornCount > 0 && (
                    <Badge className="absolute top-2 right-2 bg-black/60 text-white border-0 text-xs">
                      Worn {item.wornCount}x
                    </Badge>
                  )}
                </div>
                <div className="p-3">
                  <p className="font-semibold text-sm mb-1">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: item.color.toLowerCase() }} />
                    <span className="text-xs text-muted-foreground">{item.color}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-2xl overflow-hidden border flex cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="w-24 h-32 bg-muted flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800" />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <p className="font-semibold mb-1">{item.name}</p>
                    <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: item.color.toLowerCase() }} />
                      <span className="text-xs text-muted-foreground">{item.color}</span>
                    </div>
                  </div>
                  {item.wornCount > 0 && (
                    <Badge variant="outline" className="self-start text-xs">
                      Worn {item.wornCount}x
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Button */}
      <div className="p-4 border-t">
        <Button className="w-full gradient-bg text-white rounded-full" size="lg">
          <Plus className="w-5 h-5 mr-2" />
          Add Item to Closet
        </Button>
      </div>
    </div>
  );
}
