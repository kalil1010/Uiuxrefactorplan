import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { 
  Settings, 
  Grid3x3, 
  Bookmark, 
  Tag,
  MapPin,
  Link as LinkIcon,
  Calendar,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  UserPlus,
  Sparkles
} from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'tagged'>('posts');

  const userPosts = [
    { id: 1, image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400', likes: 342, comments: 28 },
    { id: 2, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400', likes: 521, comments: 45 },
    { id: 3, image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400', likes: 287, comments: 19 },
    { id: 4, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', likes: 412, comments: 32 },
    { id: 5, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', likes: 356, comments: 24 },
    { id: 6, image: 'https://images.unsplash.com/photo-1624206112431-4e12f463ccac?w=400', likes: 298, comments: 17 },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-5xl">
                  👤
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center border-2 border-background">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-2xl font-bold">fashionista_pro</h1>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              {/* Stats */}
              <div className="flex gap-6 mb-4">
                <div className="text-center sm:text-left">
                  <div className="font-bold">42</div>
                  <div className="text-sm text-muted-foreground">Posts</div>
                </div>
                <button className="text-center sm:text-left hover:opacity-70">
                  <div className="font-bold">1,234</div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </button>
                <button className="text-center sm:text-left hover:opacity-70">
                  <div className="font-bold">856</div>
                  <div className="text-sm text-muted-foreground">Following</div>
                </button>
              </div>

              {/* Bio */}
              <div className="space-y-1">
                <h2 className="font-semibold">Sarah Johnson</h2>
                <p className="text-sm">Fashion enthusiast 👗 | AI stylist advocate ✨</p>
                <p className="text-sm">Helping you find your perfect style 💫</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    New York, USA
                  </span>
                  <a href="#" className="flex items-center gap-1 hover:text-primary">
                    <LinkIcon className="w-4 h-4" />
                    mywebsite.com
                  </a>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Joined Jan 2024
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Story Highlights */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {['OOTD', 'Summer', 'Vintage', 'Casual', 'Events'].map((highlight, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 flex items-center justify-center border-2 border-border">
                  <span className="text-2xl">✨</span>
                </div>
                <span className="text-xs">{highlight}</span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                <span className="text-2xl text-muted-foreground">+</span>
              </div>
              <span className="text-xs text-muted-foreground">New</span>
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        <Card className="p-4 mb-6 gradient-bg-purple-pink/10 border-primary/20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Achievements</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {[
              { icon: '🏆', name: 'Style Master', desc: 'Posted 50+ outfits' },
              { icon: '⭐', name: 'Trendsetter', desc: '1K+ likes' },
              { icon: '💎', name: 'Fashion Elite', desc: 'Premium member' },
              { icon: '🎨', name: 'Creative', desc: '20+ AI designs' },
              { icon: '👥', name: 'Influencer', desc: '500+ followers' }
            ].map((badge, i) => (
              <div key={i} className="flex-shrink-0 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center text-2xl mb-1">
                  {badge.icon}
                </div>
                <p className="text-xs font-medium">{badge.name}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Tabs */}
        <div className="border-b mb-6">
          <div className="flex justify-around">
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === 'posts' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
              <span className="hidden sm:inline">POSTS</span>
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === 'saved' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span className="hidden sm:inline">SAVED</span>
            </button>
            <button
              onClick={() => setActiveTab('tagged')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === 'tagged' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Tag className="w-4 h-4" />
              <span className="hidden sm:inline">TAGGED</span>
            </button>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-1 sm:gap-4">
          {userPosts.map((post) => (
            <div key={post.id} className="relative aspect-square group cursor-pointer">
              <img
                src={post.image}
                alt="Post"
                className="w-full h-full object-cover rounded-none sm:rounded-lg"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 rounded-none sm:rounded-lg">
                <div className="flex items-center gap-1 text-white">
                  <Heart className="w-5 h-5 fill-white" />
                  <span className="font-semibold">{post.likes}</span>
                </div>
                <div className="flex items-center gap-1 text-white">
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span className="font-semibold">{post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {activeTab === 'saved' && (
          <div className="text-center py-12">
            <Bookmark className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No saved posts yet</h3>
            <p className="text-muted-foreground">Save posts to see them here</p>
          </div>
        )}

        {activeTab === 'tagged' && (
          <div className="text-center py-12">
            <Tag className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No tagged posts</h3>
            <p className="text-muted-foreground">When people tag you, they'll appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
