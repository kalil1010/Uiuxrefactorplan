import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { 
  Search, 
  TrendingUp, 
  Flame, 
  Sparkles,
  Heart,
  MessageCircle,
  Bookmark,
  Filter
} from 'lucide-react';

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All', icon: Sparkles },
    { id: 'trending', name: 'Trending', icon: TrendingUp },
    { id: 'hot', name: 'Hot', icon: Flame },
    { id: 'ootd', name: 'OOTD', icon: null },
    { id: 'vintage', name: 'Vintage', icon: null },
    { id: 'streetwear', name: 'Streetwear', icon: null },
    { id: 'formal', name: 'Formal', icon: null }
  ];

  const explorePosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600',
      user: { name: 'Sarah J.', avatar: '👩‍🦰' },
      likes: 1234,
      comments: 89,
      category: 'trending'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
      user: { name: 'Emma C.', avatar: '👩' },
      likes: 2156,
      comments: 142,
      category: 'hot'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600',
      user: { name: 'Alex M.', avatar: '👨' },
      likes: 987,
      comments: 67,
      category: 'ootd'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600',
      user: { name: 'Mia W.', avatar: '👧' },
      likes: 1876,
      comments: 123,
      category: 'streetwear'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
      user: { name: 'Lisa K.', avatar: '👱‍♀️' },
      likes: 1543,
      comments: 98,
      category: 'vintage'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1624206112431-4e12f463ccac?w=600',
      user: { name: 'James B.', avatar: '👨‍🦱' },
      likes: 2341,
      comments: 187,
      category: 'formal'
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600',
      user: { name: 'Olivia S.', avatar: '👩‍🦳' },
      likes: 1654,
      comments: 112,
      category: 'trending'
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1542272454315-7f6f6c1d9fcf?w=600',
      user: { name: 'Noah D.', avatar: '👦' },
      likes: 1432,
      comments: 95,
      category: 'streetwear'
    },
    {
      id: 9,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600',
      user: { name: 'Sophia R.', avatar: '👩‍🎨' },
      likes: 2089,
      comments: 156,
      category: 'hot'
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h2 className="text-2xl font-bold mb-4">Explore</h2>
          
          {/* Search Bar */}
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search styles, trends, users..." className="pl-10" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                  className="flex-shrink-0"
                >
                  {Icon && <Icon className="w-4 h-4 mr-2" />}
                  {cat.name}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Trending Topics Banner */}
      <div className="border-b bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Trending Now</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {['#FallFashion2024', '#AIFashion', '#Sustainable', '#OOTD', '#StreetStyle', '#Vintage'].map((tag) => (
              <button
                key={tag}
                className="px-3 py-1 rounded-full bg-background border text-sm hover:border-primary transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Explore Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-4">
            {explorePosts.map((post) => (
              <div key={post.id} className="relative group cursor-pointer aspect-square">
                <img
                  src={post.image}
                  alt="Explore post"
                  className="w-full h-full object-cover rounded-none sm:rounded-lg"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 rounded-none sm:rounded-lg">
                  <div className="flex items-center gap-4 text-white">
                    <div className="flex items-center gap-1">
                      <Heart className="w-5 h-5 fill-white" />
                      <span className="font-semibold">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-5 h-5 fill-white" />
                      <span className="font-semibold">{post.comments}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="secondary">
                      View Post
                    </Button>
                    <Button size="icon" variant="secondary" className="h-8 w-8">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* User Badge */}
                <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-sm">
                    {post.user.avatar}
                  </div>
                  <span className="text-white text-xs font-medium truncate">{post.user.name}</span>
                </div>

                {/* Top Right Badge for trending/hot posts */}
                {(post.category === 'trending' || post.category === 'hot') && (
                  <div className="absolute top-2 right-2">
                    {post.category === 'trending' ? (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                        <Flame className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8 mb-4">
            <Button variant="outline" size="lg">
              Load More Posts
            </Button>
          </div>
        </div>
      </div>

      {/* Suggested Users Section */}
      <div className="border-t p-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-semibold mb-4">Suggested Fashion Creators</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Fashion Daily', username: '@fashiondaily', avatar: '👗', followers: '12K' },
              { name: 'Style Tips', username: '@styletips', avatar: '✨', followers: '8.5K' },
              { name: 'Trend Alert', username: '@trendalert', avatar: '🔥', followers: '15K' },
              { name: 'Vintage Vibes', username: '@vintagev', avatar: '🎨', followers: '6.2K' }
            ].map((user, i) => (
              <Card key={i} className="p-4 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-3xl mx-auto mb-2">
                  {user.avatar}
                </div>
                <h4 className="font-semibold text-sm mb-1 truncate">{user.name}</h4>
                <p className="text-xs text-muted-foreground mb-1">{user.username}</p>
                <p className="text-xs text-muted-foreground mb-3">{user.followers} followers</p>
                <Button size="sm" variant="outline" className="w-full">
                  Follow
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
