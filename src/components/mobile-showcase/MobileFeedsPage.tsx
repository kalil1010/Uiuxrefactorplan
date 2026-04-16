import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Home, Search, PlusSquare, Bell, User } from 'lucide-react';

export default function MobileFeedsPage() {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const posts = [
    {
      id: 1,
      user: { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&h=600&fit=crop',
      likes: 234,
      caption: 'Summer vibes ☀️ #fashion #ootd',
      time: '2h ago',
    },
    {
      id: 2,
      user: { name: 'Alex Morgan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&h=600&fit=crop',
      likes: 189,
      caption: 'New collection drop! 🔥',
      time: '4h ago',
    },
  ];

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  return (
    <div className="h-screen bg-background flex flex-col max-w-md mx-auto border-x">
      {/* Header */}
      <div className="bg-background border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-2xl font-bold gradient-text-purple-pink">ZokaiHub</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <PlusSquare className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Stories */}
      <div className="bg-background border-b p-4 overflow-x-auto">
        <div className="flex gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex-shrink-0 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
                <div className="w-full h-full rounded-full border-2 border-background overflow-hidden">
                  <div className="w-full h-full bg-muted" />
                </div>
              </div>
              <p className="text-xs mt-1 truncate w-16">User {i}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto">
        {posts.map((post) => (
          <Card key={post.id} className="rounded-none border-x-0 border-t-0 mb-4">
            {/* Post Header */}
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                  <img src={post.user.avatar} alt={post.user.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{post.user.name}</p>
                  <p className="text-xs text-muted-foreground">{post.time}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </div>

            {/* Post Image */}
            <div className="aspect-square bg-muted">
              <img src={post.image} alt="Post" className="w-full h-full object-cover" />
            </div>

            {/* Post Actions */}
            <div className="p-3 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => toggleLike(post.id)}
                  >
                    <Heart 
                      className={`w-6 h-6 ${likedPosts.includes(post.id) ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MessageCircle className="w-6 h-6" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Send className="w-6 h-6" />
                  </Button>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Bookmark className="w-6 h-6" />
                </Button>
              </div>

              <p className="font-semibold text-sm">{post.likes + (likedPosts.includes(post.id) ? 1 : 0)} likes</p>
              <p className="text-sm">
                <span className="font-semibold">{post.user.name}</span> {post.caption}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-background border-t px-6 py-2 flex items-center justify-around">
        <Button variant="ghost" size="icon" className="flex-col h-auto py-2">
          <Home className="w-6 h-6 text-primary" />
        </Button>
        <Button variant="ghost" size="icon" className="flex-col h-auto py-2">
          <Search className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon" className="flex-col h-auto py-2">
          <PlusSquare className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon" className="flex-col h-auto py-2">
          <MessageCircle className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon" className="flex-col h-auto py-2">
          <User className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
