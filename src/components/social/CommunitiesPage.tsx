import React, { useState } from 'react';
import { Plus, Users, TrendingUp, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { TopBar } from '../layout/TopBar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/components/ui/utils';

const communities = [
  {
    id: 1,
    name: 'Sustainable Fashion',
    description: 'Eco-friendly fashion lovers sharing tips and sustainable brands',
    memberCount: 12450,
    postCount: 3420,
    coverImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=300&fit=crop',
    category: 'Lifestyle',
    isJoined: true,
    trending: true
  },
  {
    id: 2,
    name: 'Streetwear Society',
    description: 'Urban fashion and street style enthusiasts',
    memberCount: 24800,
    postCount: 8920,
    coverImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&h=300&fit=crop',
    category: 'Style',
    isJoined: false,
    trending: true
  },
  {
    id: 3,
    name: 'Vintage Collectors',
    description: 'Share and discover unique vintage finds and retro styles',
    memberCount: 8920,
    postCount: 2340,
    coverImage: 'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=600&h=300&fit=crop',
    category: 'Vintage',
    isJoined: true,
    trending: false
  },
  {
    id: 4,
    name: 'Minimalist Wardrobe',
    description: 'Less is more - capsule wardrobes and minimal style',
    memberCount: 15600,
    postCount: 4120,
    coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=300&fit=crop',
    category: 'Minimalism',
    isJoined: false,
    trending: true
  },
  {
    id: 5,
    name: 'DIY Fashion',
    description: 'Create, customize, and upcycle your own fashion pieces',
    memberCount: 6720,
    postCount: 1890,
    coverImage: 'https://images.unsplash.com/photo-1558769132-cb1aea628c8d?w=600&h=300&fit=crop',
    category: 'DIY',
    isJoined: false,
    trending: false
  },
  {
    id: 6,
    name: 'Luxury Fashion Hub',
    description: 'High-end fashion discussion and designer collections',
    memberCount: 18900,
    postCount: 5430,
    coverImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=300&fit=crop',
    category: 'Luxury',
    isJoined: true,
    trending: false
  },
];

export function CommunitiesPage() {
  const [filter, setFilter] = useState<'all' | 'joined' | 'discover'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          community.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'joined') return community.isJoined && matchesSearch;
    if (filter === 'discover') return !community.isJoined && matchesSearch;
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <TopBar title="Communities" />

      {/* Background Orbs */}
      <div className="fixed top-0 left-1/3 w-96 h-96 bg-brand-magenta/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/3 w-96 h-96 bg-brand-coral/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h1 className="text-5xl font-bold">
              <span className="gradient-text-purple-pink">Communities</span>
            </h1>
            <Button className="gradient-bg-purple-pink">
              <Plus className="w-4 h-4 mr-2" />
              Create Community
            </Button>
          </div>
          <p className="text-xl text-muted-foreground">
            Connect with like-minded fashion enthusiasts
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search communities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              className={cn(filter === 'all' && "gradient-bg text-white")}
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'joined' ? 'default' : 'outline'}
              className={cn(filter === 'joined' && "gradient-bg text-white")}
              onClick={() => setFilter('joined')}
            >
              Joined
            </Button>
            <Button
              variant={filter === 'discover' ? 'default' : 'outline'}
              className={cn(filter === 'discover' && "gradient-bg text-white")}
              onClick={() => setFilter('discover')}
            >
              Discover
            </Button>
          </div>
        </div>

        {/* Trending Badge */}
        {filter === 'all' && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Trending Communities</h2>
            </div>
          </div>
        )}

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((community) => (
            <Card 
              key={community.id}
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
            >
              {/* Cover Image */}
              <div className="relative h-32 overflow-hidden">
                <img
                  src={community.coverImage}
                  alt={community.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Trending Badge */}
                {community.trending && (
                  <Badge className="absolute top-3 right-3 gradient-bg text-white border-0">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trending
                  </Badge>
                )}

                {/* Category Badge */}
                <Badge className="absolute top-3 left-3 glass">
                  {community.category}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2 line-clamp-1">
                  {community.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {community.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {(community.memberCount / 1000).toFixed(1)}K members
                  </span>
                  <span>•</span>
                  <span>{community.postCount} posts</span>
                </div>

                {/* Action Button */}
                {community.isJoined ? (
                  <Button variant="outline" className="w-full">
                    <Users className="w-4 h-4 mr-2" />
                    Joined
                  </Button>
                ) : (
                  <Button className="w-full gradient-bg text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Join Community
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCommunities.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full gradient-bg-purple-pink flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No communities found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or explore different filters
            </p>
            <Button className="gradient-bg text-white" onClick={() => setSearchQuery('')}>
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}