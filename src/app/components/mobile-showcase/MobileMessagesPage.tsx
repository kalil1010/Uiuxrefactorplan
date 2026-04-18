import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search, Edit, MoreHorizontal } from 'lucide-react';

export default function MobileMessagesPage() {
  const conversations = [
    {
      id: 1,
      user: { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
      lastMessage: 'Love your new outfit! Where did you get it?',
      time: '2m',
      unread: 2,
      online: true,
    },
    {
      id: 2,
      user: { name: 'Alex Morgan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
      lastMessage: 'Thanks for the styling tips!',
      time: '1h',
      unread: 0,
      online: true,
    },
    {
      id: 3,
      user: { name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
      lastMessage: 'Check out this collection 👀',
      time: '3h',
      unread: 1,
      online: false,
    },
    {
      id: 4,
      user: { name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
      lastMessage: 'The dress looks amazing!',
      time: '1d',
      unread: 0,
      online: false,
    },
    {
      id: 5,
      user: { name: 'Sophie Taylor', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
      lastMessage: 'Can you share the link?',
      time: '2d',
      unread: 0,
      online: true,
    },
  ];

  return (
    <div className="h-screen bg-background flex flex-col max-w-md mx-auto border-x">
      {/* Header */}
      <div className="bg-background border-b px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold">Messages</h1>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Edit className="w-5 h-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            className="pl-10 rounded-full bg-muted border-0"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className="flex items-center gap-3 p-4 hover:bg-muted/50 cursor-pointer border-b transition-colors"
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-muted">
                <img src={conv.user.avatar} alt={conv.user.name} className="w-full h-full object-cover" />
              </div>
              {conv.online && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
              )}
            </div>

            {/* Message Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-sm truncate">{conv.user.name}</p>
                <span className="text-xs text-muted-foreground flex-shrink-0">{conv.time}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-muted-foreground truncate flex-1">
                  {conv.lastMessage}
                </p>
                {conv.unread > 0 && (
                  <Badge className="gradient-bg text-white border-0 text-xs h-5 min-w-5 flex items-center justify-center px-1.5">
                    {conv.unread}
                  </Badge>
                )}
              </div>
            </div>

            {/* More Options */}
            <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>
        ))}
      </div>

      {/* Empty State for no messages */}
      {conversations.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mb-4">
            <Edit className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl font-bold mb-2">No Messages Yet</h2>
          <p className="text-muted-foreground mb-6">
            Start a conversation with fashion enthusiasts
          </p>
          <Button className="gradient-bg text-white rounded-full">
            <Edit className="w-4 h-4 mr-2" />
            New Message
          </Button>
        </div>
      )}
    </div>
  );
}
