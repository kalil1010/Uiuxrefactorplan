import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, MessageCircle, Bookmark, TrendingUp, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const posts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600',
    author: {
      name: 'Emma Wilson',
      username: '@emma.style',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    likes: 2340,
    comments: 156,
    timestamp: '2h ago'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=600',
    author: {
      name: 'Liam Chen',
      username: '@liam.fashion',
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    likes: 1890,
    comments: 123,
    timestamp: '4h ago'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600',
    author: {
      name: 'Sophia Martinez',
      username: '@sophia.chic',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    likes: 3210,
    comments: 234,
    timestamp: '6h ago'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
    author: {
      name: 'Noah Anderson',
      username: '@noah.wear',
      avatar: 'https://i.pravatar.cc/150?img=13'
    },
    likes: 1670,
    comments: 98,
    timestamp: '8h ago'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600',
    author: {
      name: 'Olivia Taylor',
      username: '@olivia.trends',
      avatar: 'https://i.pravatar.cc/150?img=9'
    },
    likes: 2980,
    comments: 187,
    timestamp: '12h ago'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600',
    author: {
      name: 'Ethan Brown',
      username: '@ethan.minimal',
      avatar: 'https://i.pravatar.cc/150?img=14'
    },
    likes: 2145,
    comments: 145,
    timestamp: '1d ago'
  },
];

export default function HashtagPage() {
  const [activeTab, setActiveTab] = useState('latest');
  const hashtagName = 'summerstyle';
  const postCount = 2456;

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      {/* Background Orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-brand-coral/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-brand-yellow/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="sticky top-0 z-40 glass-effect border-b px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold gradient-text-coral-yellow">
              #{hashtagName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {postCount.toLocaleString()} posts
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Hashtag Hero */}
        <Card className="glass-effect mb-6">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full gradient-bg-coral-yellow flex items-center justify-center mx-auto">
                <span className="text-4xl">#</span>
              </div>
              <div>
                <h2 className="text-4xl font-bold gradient-text-coral-yellow mb-2">
                  #{hashtagName}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Discover the latest summer fashion trends, vibrant outfits, and style inspiration
                </p>
              </div>
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold">{postCount.toLocaleString()}</span>
                  <span className="text-muted-foreground">posts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold">124.5K</span>
                  <span className="text-muted-foreground">likes</span>
                </div>
              </div>
              <div className="flex justify-center gap-2">
                <Badge className="gradient-bg-coral-yellow text-white">Trending</Badge>
                <Badge variant="outline">Fashion</Badge>
                <Badge variant="outline">Summer</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sort Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="w-full glass-effect">
            <TabsTrigger value="latest" className="flex-1">
              <Clock className="w-4 h-4 mr-2" />
              Latest
            </TabsTrigger>
            <TabsTrigger value="popular" className="flex-1">
              <TrendingUp className="w-4 h-4 mr-2" />
              Popular
            </TabsTrigger>
          </TabsList>

          <TabsContent value="latest" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Card key={post.id} className="glass-effect group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Button variant="ghost" size="icon" className="bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <Bookmark className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{post.author.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{post.author.username}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes.toLocaleString()}</span>
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...posts].sort((a, b) => b.likes - a.likes).map((post) => (
                <Card key={post.id} className="glass-effect group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Button variant="ghost" size="icon" className="bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <Bookmark className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{post.author.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{post.author.username}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes.toLocaleString()}</span>
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
