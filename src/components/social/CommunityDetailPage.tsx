import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Users, 
  Share2, 
  Bell, 
  BellOff,
  MoreVertical,
  MessageSquare,
  Heart,
  Bookmark,
  Image as ImageIcon,
  Send,
  Lock,
  Globe,
  TrendingUp,
  Calendar,
  Info,
  Shield,
  UserPlus
} from 'lucide-react';
import { cn } from '@/components/ui/utils';

const communityData = {
  id: 1,
  name: 'Sustainable Fashion',
  description: 'A community dedicated to eco-friendly fashion, ethical brands, and sustainable style choices. Join us in making fashion more environmentally conscious!',
  coverImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&h=400&fit=crop',
  memberCount: 12450,
  postCount: 3420,
  category: 'Lifestyle',
  isPrivate: false,
  isJoined: true,
  isModerator: false,
  createdDate: 'January 2024',
  rules: [
    'Be respectful and kind to all members',
    'Stay on topic - focus on sustainable fashion',
    'No spam or self-promotion without permission',
    'Share credible sources for claims',
    'Respect different opinions and perspectives'
  ],
  moderators: [
    { id: 1, name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=1', role: 'Founder' },
    { id: 2, name: 'Sophia Chen', avatar: 'https://i.pravatar.cc/150?img=5', role: 'Moderator' }
  ]
};

const communityPosts = [
  {
    id: 1,
    author: {
      name: 'Maya Johnson',
      username: '@maya.eco',
      avatar: 'https://i.pravatar.cc/150?img=9'
    },
    content: 'Just discovered this amazing brand that makes clothes from recycled ocean plastic! The quality is incredible and I love knowing my outfit is helping clean our oceans. 🌊♻️',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=400&fit=crop',
    likes: 234,
    comments: 45,
    saves: 67,
    timestamp: '2 hours ago',
    isLiked: false,
    isSaved: false
  },
  {
    id: 2,
    author: {
      name: 'Liam Green',
      username: '@liam.sustainable',
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    content: 'Quick tip: Instead of buying new clothes, try hosting a clothing swap with friends! We did one last weekend and everyone left with "new" outfits without spending a penny or creating waste. 👕♻️',
    likes: 189,
    comments: 32,
    saves: 91,
    timestamp: '5 hours ago',
    isLiked: true,
    isSaved: false
  },
  {
    id: 3,
    author: {
      name: 'Olivia Martinez',
      username: '@olivia.style',
      avatar: 'https://i.pravatar.cc/150?img=16'
    },
    content: 'Does anyone know good sustainable alternatives to fast fashion brands? Looking for affordable options that are still ethically made.',
    likes: 156,
    comments: 78,
    saves: 43,
    timestamp: '1 day ago',
    isLiked: false,
    isSaved: true
  }
];

export default function CommunityDetailPage() {
  const [isJoined, setIsJoined] = useState(communityData.isJoined);
  const [isNotificationsOn, setIsNotificationsOn] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState<string | null>(null);
  const [posts, setPosts] = useState(communityPosts);

  const handleJoinToggle = () => {
    setIsJoined(!isJoined);
  };

  const handleNotificationToggle = () => {
    setIsNotificationsOn(!isNotificationsOn);
  };

  const handleCreatePost = () => {
    if (!postContent.trim()) return;

    const newPost = {
      id: posts.length + 1,
      author: {
        name: 'You',
        username: '@your.username',
        avatar: 'https://i.pravatar.cc/150?img=20'
      },
      content: postContent,
      image: postImage,
      likes: 0,
      comments: 0,
      saves: 0,
      timestamp: 'Just now',
      isLiked: false,
      isSaved: false
    };

    setPosts([newPost, ...posts]);
    setPostContent('');
    setPostImage(null);
    setShowCreatePost(false);
  };

  const handleLikePost = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleSavePost = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isSaved: !post.isSaved, saves: post.isSaved ? post.saves - 1 : post.saves + 1 }
        : post
    ));
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      {/* Background Orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-brand-magenta/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-brand-coral/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header with Back Button */}
      <div className="sticky top-0 z-40 glass-effect border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="font-bold text-lg">{communityData.name}</h1>
            <p className="text-sm text-muted-foreground">
              {communityData.memberCount.toLocaleString()} members
            </p>
          </div>
          <Button variant="ghost" size="icon">
            <Share2 className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Cover Image */}
        <div className="relative aspect-[21/6] overflow-hidden">
          <img
            src={communityData.coverImage}
            alt={communityData.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        {/* Community Info */}
        <div className="px-4 lg:px-6 -mt-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column - Main Content */}
            <div className="flex-1 space-y-6">
              {/* Community Header Card */}
              <Card className="glass-effect">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-3xl font-bold gradient-text-purple-pink">
                          {communityData.name}
                        </h2>
                        <Badge variant={communityData.isPrivate ? 'secondary' : 'default'}>
                          {communityData.isPrivate ? (
                            <>
                              <Lock className="w-3 h-3 mr-1" />
                              Private
                            </>
                          ) : (
                            <>
                              <Globe className="w-3 h-3 mr-1" />
                              Public
                            </>
                          )}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">
                        {communityData.description}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="font-semibold">{communityData.memberCount.toLocaleString()}</span>
                      <span className="text-muted-foreground">members</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                      <span className="font-semibold">{communityData.postCount.toLocaleString()}</span>
                      <span className="text-muted-foreground">posts</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Created {communityData.createdDate}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      className={cn(
                        'flex-1 sm:flex-none',
                        isJoined ? 'gradient-bg-purple-pink' : ''
                      )}
                      variant={isJoined ? 'default' : 'outline'}
                      onClick={handleJoinToggle}
                    >
                      {isJoined ? (
                        <>
                          <Users className="w-4 h-4 mr-2" />
                          Joined
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Join Community
                        </>
                      )}
                    </Button>
                    {isJoined && (
                      <Button
                        variant="outline"
                        onClick={handleNotificationToggle}
                      >
                        {isNotificationsOn ? (
                          <>
                            <Bell className="w-4 h-4 mr-2" />
                            Notifications On
                          </>
                        ) : (
                          <>
                            <BellOff className="w-4 h-4 mr-2" />
                            Notifications Off
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Create Post Section */}
              {isJoined && (
                <Card className="glass-effect">
                  <CardContent className="pt-6">
                    {!showCreatePost ? (
                      <button
                        onClick={() => setShowCreatePost(true)}
                        className="w-full flex items-center gap-3 p-3 rounded-lg border-2 border-dashed border-border hover:border-primary transition-colors"
                      >
                        <Avatar className="w-10 h-10">
                          <AvatarImage src="https://i.pravatar.cc/150?img=20" />
                          <AvatarFallback>YU</AvatarFallback>
                        </Avatar>
                        <span className="text-muted-foreground">Share something with the community...</span>
                      </button>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src="https://i.pravatar.cc/150?img=20" />
                            <AvatarFallback>YU</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-3">
                            <Textarea
                              placeholder="What's on your mind?"
                              value={postContent}
                              onChange={(e) => setPostContent(e.target.value)}
                              className="min-h-[100px] resize-none"
                              autoFocus
                            />
                            {postImage && (
                              <div className="relative rounded-lg overflow-hidden">
                                <img src={postImage} alt="Post" className="w-full" />
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-2 right-2"
                                  onClick={() => setPostImage(null)}
                                >
                                  <ArrowLeft className="w-4 h-4 rotate-45" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <Button variant="ghost" size="sm">
                            <ImageIcon className="w-4 h-4 mr-2" />
                            Add Image
                          </Button>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setShowCreatePost(false);
                                setPostContent('');
                                setPostImage(null);
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              className="gradient-bg-purple-pink"
                              onClick={handleCreatePost}
                              disabled={!postContent.trim()}
                            >
                              <Send className="w-4 h-4 mr-2" />
                              Post
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full glass-effect">
                  <TabsTrigger value="posts" className="flex-1">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Posts
                  </TabsTrigger>
                  <TabsTrigger value="about" className="flex-1">
                    <Info className="w-4 h-4 mr-2" />
                    About
                  </TabsTrigger>
                  <TabsTrigger value="members" className="flex-1">
                    <Users className="w-4 h-4 mr-2" />
                    Members
                  </TabsTrigger>
                </TabsList>

                {/* Posts Tab */}
                <TabsContent value="posts" className="space-y-4 mt-4">
                  {posts.map((post) => (
                    <Card key={post.id} className="glass-effect">
                      <CardContent className="pt-6 space-y-4">
                        {/* Post Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={post.author.avatar} />
                              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{post.author.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {post.author.username} • {post.timestamp}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Post Content */}
                        <p className="text-foreground">{post.content}</p>

                        {/* Post Image */}
                        {post.image && (
                          <div className="rounded-lg overflow-hidden">
                            <img
                              src={post.image}
                              alt="Post"
                              className="w-full object-cover"
                            />
                          </div>
                        )}

                        {/* Post Actions */}
                        <div className="flex items-center gap-6 pt-2">
                          <button
                            onClick={() => handleLikePost(post.id)}
                            className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                          >
                            <Heart
                              className={cn(
                                'w-5 h-5',
                                post.isLiked && 'fill-red-500 text-red-500'
                              )}
                            />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                            <MessageSquare className="w-5 h-5" />
                            <span>{post.comments}</span>
                          </button>
                          <button
                            onClick={() => handleSavePost(post.id)}
                            className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                          >
                            <Bookmark
                              className={cn(
                                'w-5 h-5',
                                post.isSaved && 'fill-primary text-primary'
                              )}
                            />
                            <span>{post.saves}</span>
                          </button>
                          <button className="flex items-center gap-2 text-sm hover:text-primary transition-colors ml-auto">
                            <Share2 className="w-5 h-5" />
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                {/* About Tab */}
                <TabsContent value="about" className="space-y-4 mt-4">
                  <Card className="glass-effect">
                    <CardHeader>
                      <h3 className="font-bold text-lg">About This Community</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{communityData.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge>{communityData.category}</Badge>
                          <Badge variant="outline">
                            {communityData.isPrivate ? 'Private' : 'Public'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-effect">
                    <CardHeader>
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Community Rules
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-3">
                        {communityData.rules.map((rule, index) => (
                          <li key={index} className="flex gap-3">
                            <span className="font-semibold text-primary">{index + 1}.</span>
                            <span className="text-muted-foreground">{rule}</span>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Members Tab */}
                <TabsContent value="members" className="space-y-4 mt-4">
                  <Card className="glass-effect">
                    <CardHeader>
                      <h3 className="font-bold text-lg">Moderators</h3>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {communityData.moderators.map((mod) => (
                        <div key={mod.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={mod.avatar} />
                              <AvatarFallback>{mod.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{mod.name}</p>
                              <Badge variant="secondary" className="text-xs">
                                {mod.role}
                              </Badge>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Message
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="glass-effect">
                    <CardHeader>
                      <h3 className="font-bold text-lg">Recent Members</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground text-center py-4">
                        Members list available to community members
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Sidebar - Desktop Only */}
            <div className="hidden lg:block w-80 space-y-4">
              <Card className="glass-effect sticky top-20">
                <CardHeader>
                  <h3 className="font-bold">Quick Stats</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Members</span>
                      <span className="font-semibold">{communityData.memberCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Posts</span>
                      <span className="font-semibold">{communityData.postCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Created</span>
                      <span className="font-semibold">{communityData.createdDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
