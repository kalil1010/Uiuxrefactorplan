import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ChevronLeft, Heart, MessageCircle, UserPlus, ShoppingBag, Sparkles, Settings } from 'lucide-react';

export default function MobileNotificationsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'likes' | 'comments' | 'follows'>('all');

  const notifications = [
    {
      id: 1,
      type: 'like',
      user: { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
      message: 'liked your post',
      time: '2m ago',
      unread: true,
      postImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&h=100&fit=crop',
    },
    {
      id: 2,
      type: 'comment',
      user: { name: 'Alex Morgan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
      message: 'commented: "Love this outfit! 🔥"',
      time: '1h ago',
      unread: true,
      postImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&h=100&fit=crop',
    },
    {
      id: 3,
      type: 'follow',
      user: { name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
      message: 'started following you',
      time: '3h ago',
      unread: false,
    },
    {
      id: 4,
      type: 'order',
      user: { name: 'ZokaiHub', avatar: '' },
      message: 'Your order #12345 has been shipped',
      time: '1d ago',
      unread: false,
      isSystem: true,
    },
    {
      id: 5,
      type: 'ai',
      user: { name: 'AI Stylist', avatar: '' },
      message: 'New outfit suggestions ready for you!',
      time: '2d ago',
      unread: false,
      isSystem: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart className="w-5 h-5 text-red-500" />;
      case 'comment': return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'follow': return <UserPlus className="w-5 h-5 text-green-500" />;
      case 'order': return <ShoppingBag className="w-5 h-5 text-purple-500" />;
      case 'ai': return <Sparkles className="w-5 h-5 text-pink-500" />;
      default: return null;
    }
  };

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'likes', label: 'Likes' },
    { id: 'comments', label: 'Comments' },
    { id: 'follows', label: 'Follows' },
  ];

  return (
    <div className="h-screen bg-background flex flex-col max-w-md mx-auto border-x">
      {/* Header */}
      <div className="bg-background border-b px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-2xl font-bold">Notifications</h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <Badge
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              className={`cursor-pointer capitalize flex-shrink-0 px-4 py-1.5 ${
                activeTab === tab.id ? 'gradient-bg text-white border-0' : ''
              }`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              {tab.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`flex items-center gap-3 p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
              notif.unread ? 'bg-primary/5' : ''
            }`}
          >
            {/* Avatar or Icon */}
            <div className="relative flex-shrink-0">
              {notif.isSystem ? (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  {getIcon(notif.type)}
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <img src={notif.user.avatar} alt={notif.user.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-background flex items-center justify-center">
                    {getIcon(notif.type)}
                  </div>
                </>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-semibold">{notif.user.name}</span>{' '}
                <span className="text-muted-foreground">{notif.message}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{notif.time}</p>
            </div>

            {/* Post Image or Follow Button */}
            {notif.postImage ? (
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <img src={notif.postImage} alt="Post" className="w-full h-full object-cover" />
              </div>
            ) : notif.type === 'follow' ? (
              <Button size="sm" variant="outline" className="rounded-full flex-shrink-0">
                Follow
              </Button>
            ) : null}

            {/* Unread Indicator */}
            {notif.unread && (
              <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
            )}
          </div>
        ))}

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mb-4">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-2">No Notifications</h2>
            <p className="text-muted-foreground">
              You're all caught up!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
