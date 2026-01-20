import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { 
  Search, 
  MoreHorizontal, 
  Send, 
  Image as ImageIcon,
  Smile,
  Heart,
  Phone,
  Video,
  Info,
  Edit
} from 'lucide-react';

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [messageInput, setMessageInput] = useState('');

  const conversations = [
    {
      id: 1,
      user: {
        name: 'Emma Chen',
        username: '@emmafashion',
        avatar: '👩',
        online: true
      },
      lastMessage: 'Love your latest outfit post!',
      time: '2m ago',
      unread: 2
    },
    {
      id: 2,
      user: {
        name: 'Alex Martinez',
        username: '@alexstyle',
        avatar: '👨',
        online: false
      },
      lastMessage: 'Where did you get those shoes?',
      time: '1h ago',
      unread: 0
    },
    {
      id: 3,
      user: {
        name: 'Mia Williams',
        username: '@miaw',
        avatar: '👧',
        online: true
      },
      lastMessage: 'Thanks for the styling tip!',
      time: '3h ago',
      unread: 0
    },
    {
      id: 4,
      user: {
        name: 'James Brown',
        username: '@jamesbrown',
        avatar: '👨‍🦱',
        online: false
      },
      lastMessage: 'That color looks amazing on you',
      time: '1d ago',
      unread: 0
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'other',
      content: 'Hey! I saw your latest post',
      time: '10:30 AM',
      avatar: '👩'
    },
    {
      id: 2,
      sender: 'me',
      content: 'Thanks! Do you like it?',
      time: '10:32 AM',
      avatar: '👤'
    },
    {
      id: 3,
      sender: 'other',
      content: 'Love your latest outfit post! The colors are so well coordinated',
      time: '10:35 AM',
      avatar: '👩'
    },
    {
      id: 4,
      sender: 'me',
      content: 'Thank you so much! I used the AI stylist to help match the colors',
      time: '10:36 AM',
      avatar: '👤'
    },
    {
      id: 5,
      sender: 'other',
      content: 'Really? That\'s amazing! I should try it too',
      time: '10:38 AM',
      avatar: '👩'
    }
  ];

  const currentConversation = conversations.find(c => c.id === selectedChat);

  return (
    <div className="h-full flex">
      {/* Conversations Sidebar */}
      <div className="w-full sm:w-80 lg:w-96 border-r flex flex-col bg-background">
        {/* Sidebar Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Messages</h2>
            <Button size="icon" variant="ghost">
              <Edit className="w-5 h-5" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-10" />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedChat(conv.id)}
              className={`w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors border-b ${
                selectedChat === conv.id ? 'bg-muted/50' : ''
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                  {conv.user.avatar}
                </div>
                {conv.user.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                )}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold truncate">{conv.user.name}</h4>
                  <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{conv.time}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-xs text-white flex-shrink-0">
                  {conv.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {currentConversation ? (
        <div className="hidden sm:flex flex-1 flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center justify-between bg-background">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl">
                  {currentConversation.user.avatar}
                </div>
                {currentConversation.user.online && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background"></div>
                )}
              </div>
              <div>
                <h3 className="font-semibold">{currentConversation.user.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {currentConversation.user.online ? 'Active now' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost">
                <Phone className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <Video className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <Info className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'other' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-lg flex-shrink-0">
                    {msg.avatar}
                  </div>
                )}
                <div className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-md rounded-2xl px-4 py-2 ${
                      msg.sender === 'me'
                        ? 'gradient-bg text-white'
                        : 'bg-background border'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">{msg.time}</span>
                </div>
                {msg.sender === 'me' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-lg flex-shrink-0">
                    {msg.avatar}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t bg-background">
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost">
                <ImageIcon className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <Smile className="w-5 h-5" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && messageInput.trim()) {
                    setMessageInput('');
                  }
                }}
                className="flex-1"
              />
              <Button size="icon" variant="ghost">
                <Heart className="w-5 h-5" />
              </Button>
              <Button 
                size="icon" 
                className="gradient-bg border-0"
                disabled={!messageInput.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden sm:flex flex-1 items-center justify-center bg-muted/20">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full gradient-bg mx-auto mb-4 flex items-center justify-center">
              <Send className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Your Messages</h3>
            <p className="text-muted-foreground mb-6">Send messages to friends and fashion enthusiasts</p>
            <Button className="gradient-bg border-0">
              Send Message
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
