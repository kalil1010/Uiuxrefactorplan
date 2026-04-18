import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, MessageCircle, UserPlus, Heart, MapPin, Link2, Calendar } from 'lucide-react';

const posts = [
  { id: 1, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400', likes: 234, comments: 45 },
  { id: 2, image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=400', likes: 456, comments: 67 },
  { id: 3, image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400', likes: 789, comments: 123 },
  { id: 4, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400', likes: 321, comments: 54 },
  { id: 5, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', likes: 567, comments: 89 },
  { id: 6, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', likes: 432, comments: 76 },
];

export default function ProfileViewPage() {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      {/* Background Orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-brand-magenta/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="sticky top-0 z-40 glass-effect border-b px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Emma Wilson</h1>
            <p className="text-sm text-muted-foreground">847 posts</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Cover Image */}
        <div className="aspect-[21/6] relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200"
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="px-6 -mt-16 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 mb-6">
            <Avatar className="w-32 h-32 border-4 border-background">
              <AvatarImage src="https://i.pravatar.cc/150?img=1" />
              <AvatarFallback className="text-4xl">EW</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold">Emma Wilson</h2>
                  <p className="text-muted-foreground">@emma.style</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    className={isFollowing ? "border-primary" : "gradient-bg-purple-pink"}
                    variant={isFollowing ? "outline" : "default"}
                    onClick={() => setIsFollowing(!isFollowing)}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                  <Button variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Card className="glass-effect mb-6">
            <CardContent className="pt-6">
              <p className="text-foreground mb-4">
                Fashion enthusiast 👗 | Minimalist style lover | Sharing daily outfit inspiration ✨
                Creating content that inspires confidence through fashion
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm mb-4">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>New York, NY</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Link2 className="w-4 h-4" />
                  <a href="#" className="hover:text-primary transition-colors">emmastyle.com</a>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Joined March 2023</span>
                </div>
              </div>

              <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold">2.4k</span>
                  <span className="text-muted-foreground">Following</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold">45.8k</span>
                  <span className="text-muted-foreground">Followers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold">127k</span>
                  <span className="text-muted-foreground">Likes</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Badge>Minimalist</Badge>
                <Badge variant="outline">Fashion</Badge>
                <Badge variant="outline">Style Creator</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Content Tabs */}
          <Tabs defaultValue="posts" className="mb-8">
            <TabsList className="w-full glass-effect">
              <TabsTrigger value="posts" className="flex-1">Posts</TabsTrigger>
              <TabsTrigger value="outfits" className="flex-1">Outfits</TabsTrigger>
              <TabsTrigger value="liked" className="flex-1">Liked</TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {posts.map((post) => (
                  <Card key={post.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <div className="aspect-square relative">
                      <img
                        src={post.image}
                        alt="Post"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
                        <div className="flex items-center gap-2 text-white">
                          <Heart className="w-5 h-5 fill-white" />
                          <span className="font-semibold">{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                          <MessageCircle className="w-5 h-5 fill-white" />
                          <span className="font-semibold">{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="outfits" className="mt-6">
              <div className="text-center py-12">
                <p className="text-muted-foreground">No outfits to display</p>
              </div>
            </TabsContent>

            <TabsContent value="liked" className="mt-6">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Liked posts are private</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
