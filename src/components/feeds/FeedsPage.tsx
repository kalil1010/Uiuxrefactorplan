import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { LogoFull } from '../Logo';
import { LanguageSwitcher } from '../LanguageSwitcher';
import {
  Home,
  Compass,
  Shirt,
  MessageCircle,
  User,
  Heart,
  MessageSquare,
  Bookmark,
  Send,
  MoreHorizontal,
  Plus,
  Search,
  Bell,
  Settings,
  Sparkles,
  Cloud,
  ShoppingBag,
  TrendingUp
} from 'lucide-react';

interface FeedsPageProps {
  onSignOut: () => void;
}

export default function FeedsPage({ onSignOut }: FeedsPageProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'closet' | 'ai' | 'profile'>('home');

  // Mock feed data
  const feedPosts = [
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        username: '@sarahstyle',
        avatar: '👩‍🦰'
      },
      image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800',
      caption: 'Perfect fall outfit for today\'s weather! 🍂 #OOTD #FallFashion',
      likes: 342,
      comments: 28,
      timeAgo: '2h ago'
    },
    {
      id: 2,
      user: {
        name: 'Emma Chen',
        username: '@emmafashion',
        avatar: '👩'
      },
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
      caption: 'Loving this color combination! AI suggested this and I\'m obsessed 💜',
      likes: 521,
      comments: 45,
      timeAgo: '4h ago'
    },
    {
      id: 3,
      user: {
        name: 'Alex Martinez',
        username: '@alexstyle',
        avatar: '👨'
      },
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
      caption: 'Weekend vibes ✨ #StyleInspo',
      likes: 287,
      comments: 19,
      timeAgo: '6h ago'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b bg-background/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-2">
          <div className="flex-shrink-0">
            <LogoFull />
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <Button variant="ghost" size="icon" onClick={onSignOut} className="h-9 w-9 sm:h-10 sm:w-10">
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex pt-14 sm:pt-16 pb-16 lg:pb-0">
        {/* Sidebar Navigation - Desktop */}
        <aside className="hidden lg:block w-64 fixed left-0 top-14 sm:top-16 bottom-0 border-r p-4 overflow-y-auto">
          <nav className="space-y-2">
            <Button
              variant={activeTab === 'home' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('home')}
            >
              <Home className="w-5 h-5 mr-3" />
              Home Feed
            </Button>
            <Button
              variant={activeTab === 'explore' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('explore')}
            >
              <Compass className="w-5 h-5 mr-3" />
              Explore
            </Button>
            <Button
              variant={activeTab === 'closet' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('closet')}
            >
              <Shirt className="w-5 h-5 mr-3" />
              My Closet
            </Button>
            <Button
              variant={activeTab === 'ai' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('ai')}
            >
              <Sparkles className="w-5 h-5 mr-3" />
              AI Stylist Hub
            </Button>
            <Button
              variant={activeTab === 'profile' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('profile')}
            >
              <User className="w-5 h-5 mr-3" />
              Profile
            </Button>
          </nav>

          <div className="mt-6">
            <Button className="w-full gradient-bg border-0">
              <Plus className="w-5 h-5 mr-2" />
              New Post
            </Button>
          </div>

          {/* Quick Stats */}
          <Card className="mt-6 p-4">
            <h3 className="font-semibold mb-3">Today's Weather</h3>
            <div className="flex items-center gap-3 mb-3">
              <Cloud className="w-8 h-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">72°F</div>
                <div className="text-xs text-muted-foreground">Partly Cloudy</div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              View Outfit Suggestions
            </Button>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 lg:mr-80 w-full max-w-2xl mx-auto px-0 sm:px-4 py-4">
          {/* Stories */}
          <div className="mb-4 sm:mb-6 overflow-x-auto px-4 sm:px-0 scrollbar-hide">
            <div className="flex gap-3 sm:gap-4 pb-2">
              {['Your Story', 'Sarah', 'Emma', 'Alex', 'Mia', 'James'].map((name, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 sm:gap-2 flex-shrink-0">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-xl sm:text-2xl">
                      {i === 0 ? <Plus className="w-5 h-5 sm:w-6 sm:h-6" /> : '👤'}
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-xs text-center max-w-[60px] truncate">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Feed Posts */}
          <div className="space-y-4 sm:space-y-6">
            {feedPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden rounded-none sm:rounded-lg border-x-0 sm:border-x">
                {/* Post Header */}
                <div className="p-3 sm:p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-lg sm:text-xl">
                      {post.user.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-sm sm:text-base">{post.user.name}</div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground">{post.timeAgo}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                    <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>

                {/* Post Image */}
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full aspect-square object-cover"
                />

                {/* Post Actions */}
                <div className="p-3 sm:p-4">
                  <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
                    <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
                      <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
                      <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
                      <Send className="w-5 h-5 sm:w-6 sm:h-6" />
                    </Button>
                    <Button variant="ghost" size="icon" className="ml-auto h-9 w-9 sm:h-10 sm:w-10">
                      <Bookmark className="w-5 h-5 sm:w-6 sm:h-6" />
                    </Button>
                  </div>

                  <div className="font-semibold text-sm sm:text-base mb-1.5 sm:mb-2">{post.likes.toLocaleString()} likes</div>
                  
                  <div className="mb-1.5 sm:mb-2">
                    <span className="font-semibold text-sm sm:text-base mr-2">{post.user.username}</span>
                    <span className="text-xs sm:text-sm">{post.caption}</span>
                  </div>

                  <button className="text-xs sm:text-sm text-muted-foreground">
                    View all {post.comments} comments
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </main>

        {/* Right Sidebar - Desktop */}
        <aside className="hidden lg:block w-80 fixed right-0 top-14 sm:top-16 bottom-0 border-l p-4">
          <Card className="p-4 mb-4">
            <h3 className="font-semibold mb-3">Your Profile</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                👤
              </div>
              <div className="flex-1">
                <div className="font-semibold">You</div>
                <div className="text-sm text-muted-foreground">@yourusername</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-bold">42</div>
                <div className="text-xs text-muted-foreground">Posts</div>
              </div>
              <div>
                <div className="font-bold">1.2K</div>
                <div className="text-xs text-muted-foreground">Followers</div>
              </div>
              <div>
                <div className="font-bold">856</div>
                <div className="text-xs text-muted-foreground">Following</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 mb-4">
            <h3 className="font-semibold mb-3">Suggested For You</h3>
            <div className="space-y-3">
              {[
                { name: 'Fashion Daily', username: '@fashiondaily', avatar: '👗' },
                { name: 'Style Tips', username: '@styletips', avatar: '✨' },
                { name: 'Trend Alert', username: '@trendalert', avatar: '🔥' }
              ].map((user, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-lg">
                      {user.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.username}</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Follow</Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-3">Trending Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['#OOTD', '#FallFashion', '#StyleInspo', '#AIFashion', '#Sustainable', '#Vintage'].map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </Card>
        </aside>
      </div>

      {/* Bottom Navigation - Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 glass border-t">
        <div className="flex items-center justify-around h-16">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveTab('home')}
            className={activeTab === 'home' ? 'text-primary' : ''}
          >
            <Home className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveTab('explore')}
            className={activeTab === 'explore' ? 'text-primary' : ''}
          >
            <Compass className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="gradient-bg border-0"
          >
            <Plus className="w-6 h-6 text-white" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveTab('ai')}
            className={activeTab === 'ai' ? 'text-primary' : ''}
          >
            <Sparkles className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveTab('profile')}
            className={activeTab === 'profile' ? 'text-primary' : ''}
          >
            <User className="w-6 h-6" />
          </Button>
        </div>
      </nav>
    </div>
  );
}