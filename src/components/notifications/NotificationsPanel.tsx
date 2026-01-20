import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { 
  Heart, 
  MessageCircle, 
  UserPlus,
  Sparkles,
  Settings,
  Check
} from 'lucide-react';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  const [filter, setFilter] = useState<'all' | 'mentions' | 'likes'>('all');

  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      type: 'like',
      user: { name: 'Emma Chen', avatar: '👩', username: '@emmafashion' },
      action: 'liked your post',
      time: '2m ago',
      unread: true,
      preview: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=100'
    },
    {
      id: 2,
      type: 'comment',
      user: { name: 'Alex Martinez', avatar: '👨', username: '@alexstyle' },
      action: 'commented on your post',
      comment: 'Love this outfit! Where did you get that jacket?',
      time: '15m ago',
      unread: true,
      preview: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100'
    },
    {
      id: 3,
      type: 'follow',
      user: { name: 'Mia Williams', avatar: '👧', username: '@miaw' },
      action: 'started following you',
      time: '1h ago',
      unread: true
    },
    {
      id: 4,
      type: 'like',
      user: { name: 'James Brown', avatar: '👨‍🦱', username: '@jamesbrown' },
      action: 'liked your comment',
      time: '2h ago',
      unread: false
    },
    {
      id: 5,
      type: 'ai',
      user: { name: 'ZokaiHub AI', avatar: '✨', username: '@zokaihub_ai' },
      action: 'Your AI-generated outfit is ready!',
      time: '3h ago',
      unread: false
    },
    {
      id: 6,
      type: 'comment',
      user: { name: 'Sarah Johnson', avatar: '👩‍🦰', username: '@sarahstyle' },
      action: 'mentioned you in a comment',
      comment: '@you Great styling tips!',
      time: 'Yesterday',
      unread: false
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-5 h-5 text-red-500 fill-red-500" />;
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'follow':
        return <UserPlus className="w-5 h-5 text-green-500" />;
      case 'ai':
        return <Sparkles className="w-5 h-5 text-purple-500" />;
      default:
        return <Heart className="w-5 h-5" />;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
      
      {/* Panel */}
      <div className="fixed top-14 sm:top-16 right-0 w-full sm:w-96 h-[calc(100vh-3.5rem)] sm:h-[600px] bg-background border-l sm:border sm:rounded-lg sm:m-2 z-50 shadow-xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Notifications</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Check className="w-4 h-4 mr-2" />
                Mark all read
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'mentions' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter('mentions')}
            >
              Mentions
            </Button>
            <Button
              variant={filter === 'likes' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter('likes')}
            >
              Likes
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.map((notif) => (
            <button
              key={notif.id}
              className={`w-full p-4 flex items-start gap-3 hover:bg-muted transition-colors border-b ${
                notif.unread ? 'bg-primary/5' : ''
              }`}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-lg">
                  {notif.user.avatar}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-background flex items-center justify-center">
                  {getIcon(notif.type)}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm">
                  <span className="font-semibold">{notif.user.name}</span>
                  {' '}
                  <span className="text-muted-foreground">{notif.action}</span>
                </p>
                {notif.comment && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {notif.comment}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
              </div>

              {/* Preview Image */}
              {notif.preview && (
                <img
                  src={notif.preview}
                  alt="Preview"
                  className="w-12 h-12 rounded object-cover flex-shrink-0"
                />
              )}

              {/* Follow Button */}
              {notif.type === 'follow' && (
                <Button size="sm" variant="outline" className="flex-shrink-0">
                  Follow
                </Button>
              )}

              {/* Unread Indicator */}
              {notif.unread && (
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t text-center">
          <Button variant="ghost" className="w-full">
            View All Notifications
          </Button>
        </div>
      </div>
    </>
  );
}
