import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Plus, Grid3x3, List, Filter, Search } from 'lucide-react';

type CategoryKey = 'all' | 'tops' | 'bottoms' | 'dresses' | 'shoes' | 'accessories';

const categoryLabels: Record<CategoryKey, string> = {
  all: 'All',
  tops: 'Tops',
  bottoms: 'Bottoms',
  dresses: 'Dresses',
  shoes: 'Shoes',
  accessories: 'Accessories',
};

export default function MobileClosetPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');

  const categories: { id: CategoryKey; count: number }[] = [
    { id: 'all', count: 48 },
    { id: 'tops', count: 12 },
    { id: 'bottoms', count: 10 },
    { id: 'dresses', count: 8 },
    { id: 'shoes', count: 15 },
    { id: 'accessories', count: 3 },
  ];

  const items = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    categoryKey: 'tops' as CategoryKey,
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
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Search closet"
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Filter items"
            >
              <Filter className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              aria-label="Toggle view mode"
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
              className={`cursor-pointer flex-shrink-0 px-4 py-1.5 ${
                activeCategory === cat.id ? 'gradient-bg text-white border-0' : ''
              }`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {categoryLabels[cat.id]} ({cat.count})
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
                className="bg-card rounded-2xl overflow-hidden border cursor-pointer hover:shadow-lg active:opacity-80 transition-all"
              >
                <div className="aspect-[3/4] bg-muted relative">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {item.wornCount > 0 && (
                    <Badge className="absolute top-2 end-2 bg-black/60 text-white border-0 text-xs">
                      Worn {item.wornCount}x
                    </Badge>
                  )}
                </div>
                <div className="p-3">
                  <p className="font-semibold text-sm mb-1">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{categoryLabels[item.categoryKey]}</p>
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
                className="bg-card rounded-2xl overflow-hidden border flex cursor-pointer hover:shadow-lg active:opacity-80 transition-all"
              >
                <div className="w-24 h-32 bg-muted flex-shrink-0">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <p className="font-semibold mb-1">{item.name}</p>
                    <p className="text-sm text-muted-foreground mb-2">{categoryLabels[item.categoryKey]}</p>
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
        <Button className="w-full gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 rounded-full" size="lg">
          <Plus className="w-5 h-5 me-2" />
          Add Item to Closet
        </Button>
      </div>
    </div>
  );
}
