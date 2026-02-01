import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Heart, MessageCircle, Share2, Bookmark, MoreVertical, Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const post = {
  id: 1,
  author: {
    avatar: '👩',
    name: 'Sarah Johnson',
    username: '@sarah_style',
    verified: true,
  },
  images: [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1200',
    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=1200',
  ],
  caption: 'Loving this new summer collection! 🌸✨ Perfect blend of comfort and style. What do you think about these pastel tones? #SummerFashion #OOTD #StyleInspo',
  tags: ['#SummerFashion', '#OOTD', '#StyleInspo'],
  likes: 2847,
  comments: 156,
  shares: 89,
  saves: 432,
  timestamp: '2024-01-28T10:30:00Z',
  location: 'Los Angeles, CA',
  liked: false,
  saved: false,
};

const comments = [
  {
    id: 1,
    author: { avatar: '👨', name: 'Mike Chen', username: '@mike_fashion' },
    text: 'Absolutely stunning! Those colors are perfect for the season 💙',
    likes: 24,
    timestamp: '2024-01-28T11:00:00Z',
    replies: [
      {
        id: 2,
        author: { avatar: '👩', name: 'Sarah Johnson', username: '@sarah_style' },
        text: 'Thank you! Glad you like it! 😊',
        likes: 12,
        timestamp: '2024-01-28T11:15:00Z',
      },
    ],
  },
  {
    id: 3,
    author: { avatar: '👩‍🦰', name: 'Emma Wilson', username: '@emma_chic' },
    text: 'Where did you get that bag? It\'s gorgeous! 😍',
    likes: 18,
    timestamp: '2024-01-28T11:30:00Z',
    replies: [],
  },
  {
    id: 4,
    author: { avatar: '🧑', name: 'Alex Turner', username: '@alex_trends' },
    text: 'The styling is on point! Love how you mixed the pieces 👌',
    likes: 31,
    timestamp: '2024-01-28T12:00:00Z',
    replies: [],
  },
];

const relatedPosts = [
  { id: 2, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400', author: 'Emma W.', likes: 1245 },
  { id: 3, image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400', author: 'Mike C.', likes: 987 },
  { id: 4, image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400', author: 'Lisa A.', likes: 2156 },
  { id: 5, image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400', author: 'Alex T.', likes: 1678 },
];

export default function PostDetailPage() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(post.liked);
  const [isSaved, setIsSaved] = useState(post.saved);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [savesCount, setSavesCount] = useState(post.saves);
  const [commentText, setCommentText] = useState('');

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    setSavesCount(isSaved ? savesCount - 1 : savesCount + 1);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      {/* Background Orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-brand-magenta/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-brand-coral/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="sticky top-0 z-40 glass-effect border-b px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-full gradient-bg-purple-pink flex items-center justify-center text-lg">
              {post.author.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{post.author.name}</span>
                {post.author.verified && <span className="text-blue-500">✓</span>}
              </div>
              <span className="text-sm text-muted-foreground">{post.author.username}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 space-y-6">
        {/* Post Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Image Section */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="glass-effect overflow-hidden">
              <CardContent className="p-0">
                {/* Image Carousel */}
                <div className="relative aspect-[4/5] bg-muted">
                  <img
                    src={post.images[activeImageIndex]}
                    alt="Post"
                    className="w-full h-full object-cover"
                  />
                  {post.images.length > 1 && (
                    <>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {post.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === activeImageIndex ? 'bg-white w-6' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass-effect text-sm">
                        {activeImageIndex + 1} / {post.images.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="icon" onClick={handleLike}>
                        <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MessageCircle className="w-6 h-6" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="w-6 h-6" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleSave}>
                      <Bookmark className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`} />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold">{likesCount.toLocaleString()} likes</p>
                    <div>
                      <span className="font-semibold">{post.author.name}</span>{' '}
                      <span>{post.caption}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatTime(post.timestamp)} • {post.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mobile Comments Section */}
            <Card className="glass-effect lg:hidden">
              <CardContent className="p-4 space-y-4">
                <h3 className="font-semibold text-lg">
                  Comments <span className="text-muted-foreground">({post.comments})</span>
                </h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {comments.map((comment) => (
                    <div key={comment.id} className="space-y-2">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full gradient-bg-purple-pink flex items-center justify-center text-sm flex-shrink-0">
                          {comment.author.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="bg-muted/50 rounded-2xl px-4 py-2">
                            <p className="font-semibold text-sm">{comment.author.name}</p>
                            <p className="text-sm">{comment.text}</p>
                          </div>
                          <div className="flex items-center gap-4 px-4 mt-1">
                            <button className="text-xs text-muted-foreground hover:text-foreground">
                              {formatTime(comment.timestamp)}
                            </button>
                            <button className="text-xs font-semibold hover:text-primary">
                              {comment.likes} likes
                            </button>
                            <button className="text-xs font-semibold hover:text-primary">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="ml-11 space-y-2">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-3">
                              <div className="w-8 h-8 rounded-full gradient-bg-purple-pink flex items-center justify-center text-sm flex-shrink-0">
                                {reply.author.avatar}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="bg-muted/50 rounded-2xl px-4 py-2">
                                  <p className="font-semibold text-sm">{reply.author.name}</p>
                                  <p className="text-sm">{reply.text}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Desktop Sidebar - Comments & Stats */}
          <div className="hidden lg:block space-y-4">
            <Card className="glass-effect sticky top-20">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Post Stats</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold">{likesCount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Likes</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold">{post.comments}</p>
                    <p className="text-xs text-muted-foreground">Comments</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold">{post.shares}</p>
                    <p className="text-xs text-muted-foreground">Shares</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold">{savesCount}</p>
                    <p className="text-xs text-muted-foreground">Saves</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <button
                        key={tag}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-3">
                    Comments <span className="text-muted-foreground">({post.comments})</span>
                  </h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {comments.map((comment) => (
                      <div key={comment.id} className="space-y-2">
                        <div className="flex gap-2">
                          <div className="w-8 h-8 rounded-full gradient-bg-purple-pink flex items-center justify-center text-sm flex-shrink-0">
                            {comment.author.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="bg-muted/50 rounded-xl px-3 py-2">
                              <p className="font-semibold text-sm">{comment.author.name}</p>
                              <p className="text-sm">{comment.text}</p>
                            </div>
                            <div className="flex items-center gap-3 px-3 mt-1">
                              <button className="text-xs text-muted-foreground">
                                {formatTime(comment.timestamp)}
                              </button>
                              <button className="text-xs font-semibold">
                                {comment.likes} likes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Posts */}
        <div>
          <h3 className="text-xl font-bold mb-4">Related Posts</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedPosts.map((relatedPost) => (
              <Card key={relatedPost.id} className="glass-effect overflow-hidden cursor-pointer hover:scale-105 transition-transform">
                <div className="aspect-square relative">
                  <img
                    src={relatedPost.image}
                    alt="Related post"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-3">
                    <div className="flex items-center gap-2 text-white text-sm">
                      <Heart className="w-4 h-4" />
                      <span>{relatedPost.likes.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Comment Input - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 glass-effect border-t p-4 lg:hidden">
        <div className="max-w-5xl mx-auto flex gap-3">
          <Input
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1"
          />
          <Button size="icon" className="gradient-bg-purple-pink">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}