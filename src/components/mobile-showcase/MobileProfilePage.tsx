import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Settings, Grid3x3, Bookmark, Heart, ChevronLeft, MoreHorizontal, UserPlus } from 'lucide-react';

export default function MobileProfilePage() {
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'liked'>('posts');

  const stats = [
    { label: 'Posts', value: '127' },
    { label: 'Followers', value: '2.4K' },
    { label: 'Following', value: '892' },
  ];

  const posts = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    image: `https://images.unsplash.com/photo-${1490481651871 + i * 1000}?w=300&h=300&fit=crop`,
  }));

  return (
    <div className="h-screen bg-background flex flex-col max-w-md mx-auto border-x">
      {/* Header */}
      <div className="bg-background border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <Button variant="ghost" size="icon" className="rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className="font-semibold text-lg">Sarah Chen</h1>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreHorizontal className="w-6 h-6" />
        </Button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Profile Header */}
        <div className="p-6 space-y-4">
          {/* Avatar & Stats */}
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1">
              <div className="w-full h-full rounded-full border-2 border-background overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1 grid grid-cols-3 gap-4 text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-bold text-lg">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div>
            <p className="font-semibold mb-1">Fashion & Lifestyle 🌸</p>
            <p className="text-sm text-muted-foreground mb-2">
              Sharing my daily outfits & styling tips ✨
              <br />
              📍 New York City
              <br />
              👗 Fashion Designer
            </p>
            <a href="#" className="text-sm text-primary font-medium">
              linktr.ee/sarahchen
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button className="flex-1 gradient-bg text-white rounded-full">
              <UserPlus className="w-4 h-4 mr-2" />
              Follow
            </Button>
            <Button variant="outline" className="flex-1 rounded-full">
              Message
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Settings className="w-5 h-5" />
            </Button>
          </div>

          {/* Highlights */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {['Fashion', 'Travel', 'Beauty', 'OOTD'].map((highlight) => (
              <div key={highlight} className="flex-shrink-0 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-muted to-muted-foreground/20 border-2 mb-1" />
                <p className="text-xs">{highlight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t grid grid-cols-3">
          <button
            className={`py-3 flex items-center justify-center border-b-2 transition-colors ${
              activeTab === 'posts'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground'
            }`}
            onClick={() => setActiveTab('posts')}
          >
            <Grid3x3 className="w-5 h-5" />
          </button>
          <button
            className={`py-3 flex items-center justify-center border-b-2 transition-colors ${
              activeTab === 'saved'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground'
            }`}
            onClick={() => setActiveTab('saved')}
          >
            <Bookmark className="w-5 h-5" />
          </button>
          <button
            className={`py-3 flex items-center justify-center border-b-2 transition-colors ${
              activeTab === 'liked'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground'
            }`}
            onClick={() => setActiveTab('liked')}
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-1 p-1">
          {posts.map((post) => (
            <div
              key={post.id}
              className="aspect-square bg-muted cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
