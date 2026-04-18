import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search, TrendingUp, Sparkles } from 'lucide-react';

export default function MobileExplorePage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'trending', 'new', 'following', 'saved'];
  
  const posts = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    image: `https://images.unsplash.com/photo-${1490481651871 + i * 1000}?w=300&h=300&fit=crop`,
    likes: Math.floor(Math.random() * 500) + 100,
  }));

  return (
    <div className="h-screen bg-background flex flex-col max-w-md mx-auto border-x">
      {/* Header */}
      <div className="bg-background border-b px-4 py-3 space-y-3 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search styles, users, tags..."
              className="pl-10 rounded-full bg-muted border-0"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              className={`cursor-pointer capitalize flex-shrink-0 px-4 py-1.5 ${
                activeCategory === cat ? 'gradient-bg text-white border-0' : ''
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'trending' && <TrendingUp className="w-3 h-3 mr-1.5" />}
              {cat === 'new' && <Sparkles className="w-3 h-3 mr-1.5" />}
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-1">
        <div className="grid grid-cols-3 gap-1">
          {posts.map((post) => (
            <div
              key={post.id}
              className="aspect-square bg-muted relative group cursor-pointer overflow-hidden"
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800" />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="flex items-center gap-1 text-white text-sm font-semibold">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    ❤️ {post.likes}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="p-6 text-center">
          <Button variant="outline" className="rounded-full">
            Load More
          </Button>
        </div>
      </div>
    </div>
  );
}
