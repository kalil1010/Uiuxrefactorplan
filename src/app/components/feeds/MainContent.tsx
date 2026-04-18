import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import {
  Heart,
  MessageSquare,
  Bookmark,
  Send,
  MoreHorizontal,
  Plus
} from 'lucide-react';

export default function MainContent() {
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
    <>
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
    </>
  );
}
