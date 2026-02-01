import React, { useState } from 'react';
import { Plus, Lock, Globe, Heart, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TopBar } from '../layout/TopBar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/components/ui/utils';

const collections = [
  {
    id: 1,
    title: 'Summer Essentials',
    itemCount: 24,
    isPrivate: false,
    coverImage: 'https://images.unsplash.com/photo-1523359346063-d879354c0ea5?w=600&h=400&fit=crop',
    creator: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    },
    likes: 342,
    saves: 89
  },
  {
    id: 2,
    title: 'Formal Wear',
    itemCount: 18,
    isPrivate: true,
    coverImage: 'https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=600&h=400&fit=crop',
    creator: {
      name: 'You',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
    },
    likes: 0,
    saves: 0
  },
  {
    id: 3,
    title: 'Street Style Inspo',
    itemCount: 56,
    isPrivate: false,
    coverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop',
    creator: {
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
    },
    likes: 678,
    saves: 234
  },
  {
    id: 4,
    title: 'Minimalist Wardrobe',
    itemCount: 32,
    isPrivate: false,
    coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop',
    creator: {
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop'
    },
    likes: 891,
    saves: 412
  },
  {
    id: 5,
    title: 'Vintage Finds',
    itemCount: 43,
    isPrivate: false,
    coverImage: 'https://images.unsplash.com/photo-1496217590455-aa63a8350eea?w=600&h=400&fit=crop',
    creator: {
      name: 'Lisa Brown',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
    },
    likes: 523,
    saves: 187
  },
  {
    id: 6,
    title: 'Workout Gear',
    itemCount: 21,
    isPrivate: true,
    coverImage: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=400&fit=crop',
    creator: {
      name: 'You',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
    },
    likes: 0,
    saves: 0
  },
];

export function CollectionsPage() {
  const [filter, setFilter] = useState<'all' | 'my' | 'saved'>('all');

  const filteredCollections = collections.filter(collection => {
    if (filter === 'my') return collection.creator.name === 'You';
    if (filter === 'saved') return collection.saves > 0;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <TopBar title="Collections" />

      {/* Background Orbs */}
      <div className="fixed top-0 right-1/4 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text-purple-pink">Collections</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Organize and curate your favorite fashion items
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              className={cn(filter === 'all' && "gradient-bg text-white")}
              onClick={() => setFilter('all')}
            >
              All Collections
            </Button>
            <Button
              variant={filter === 'my' ? 'default' : 'outline'}
              className={cn(filter === 'my' && "gradient-bg text-white")}
              onClick={() => setFilter('my')}
            >
              My Collections
            </Button>
            <Button
              variant={filter === 'saved' ? 'default' : 'outline'}
              className={cn(filter === 'saved' && "gradient-bg text-white")}
              onClick={() => setFilter('saved')}
            >
              Saved
            </Button>
          </div>

          <Button className="gradient-bg text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Collection
          </Button>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create New Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden border-2 border-dashed">
            <div className="aspect-[3/2] flex flex-col items-center justify-center bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="w-16 h-16 rounded-full gradient-bg-purple-pink flex items-center justify-center mb-4">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <p className="font-semibold">Create New Collection</p>
              <p className="text-sm text-muted-foreground mt-1">Organize your items</p>
            </div>
          </Card>

          {/* Collection Cards */}
          {filteredCollections.map((collection) => (
            <Card 
              key={collection.id}
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
            >
              {/* Cover Image */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={collection.coverImage}
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Privacy Badge */}
                <Badge className="absolute top-3 right-3 glass">
                  {collection.isPrivate ? (
                    <>
                      <Lock className="w-3 h-3 mr-1" />
                      Private
                    </>
                  ) : (
                    <>
                      <Globe className="w-3 h-3 mr-1" />
                      Public
                    </>
                  )}
                </Badge>

                {/* Item Count */}
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="text-2xl font-bold">{collection.itemCount}</p>
                  <p className="text-sm opacity-90">items</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-3 line-clamp-1">{collection.title}</h3>
                
                {/* Creator Info */}
                <div className="flex items-center gap-2 mb-3">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={collection.creator.avatar} />
                    <AvatarFallback>{collection.creator.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    {collection.creator.name}
                  </span>
                </div>

                {/* Stats */}
                {!collection.isPrivate && (
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {collection.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bookmark className="w-4 h-4" />
                      {collection.saves}
                    </span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCollections.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full gradient-bg-purple-pink flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No collections found</h3>
            <p className="text-muted-foreground mb-6">
              {filter === 'my' ? 'Create your first collection to get started' : 'No saved collections yet'}
            </p>
            <Button className="gradient-bg text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Collection
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
