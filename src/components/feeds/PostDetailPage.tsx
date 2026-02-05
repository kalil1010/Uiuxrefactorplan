import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, Heart, MessageCircle, Share2, Bookmark, MoreVertical, Send, 
  ThumbsUp, Smile, Pin, Edit2, Trash2, Flag, AlertCircle, Check,
  TrendingUp, Clock, Filter, Search, X, Loader2
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

const post = {
  id: 1,
  author: {
    avatar: '👩',
    name: 'Sarah Johnson',
    username: '@sarah_style',
    verified: true,
    id: 'user-1',
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

// Current logged in user (for demo purposes)
const currentUser = {
  id: 'user-current',
  avatar: '🧑',
  name: 'You',
  username: '@your_username',
};

const initialComments = [
  {
    id: 1,
    author: { id: 'user-2', avatar: '👨', name: 'Mike Chen', username: '@mike_fashion' },
    text: 'Absolutely stunning! Those colors are perfect for the season 💙',
    likes: 24,
    likedByMe: false,
    timestamp: '2024-01-28T11:00:00Z',
    pinned: false,
    edited: false,
    replies: [
      {
        id: 2,
        author: { id: 'user-1', avatar: '👩', name: 'Sarah Johnson', username: '@sarah_style' },
        text: 'Thank you! Glad you like it! 😊',
        likes: 12,
        likedByMe: false,
        timestamp: '2024-01-28T11:15:00Z',
        pinned: false,
        edited: false,
      },
    ],
  },
  {
    id: 3,
    author: { id: 'user-3', avatar: '👩‍🦰', name: 'Emma Wilson', username: '@emma_chic' },
    text: 'Where did you get that bag? It\'s gorgeous! 😍',
    likes: 18,
    likedByMe: false,
    timestamp: '2024-01-28T11:30:00Z',
    pinned: true,
    edited: false,
    replies: [
      {
        id: 8,
        author: { id: 'user-1', avatar: '👩', name: 'Sarah Johnson', username: '@sarah_style' },
        text: 'It\'s from @LuxuryBags! Check them out! 💼',
        likes: 8,
        likedByMe: false,
        timestamp: '2024-01-28T11:45:00Z',
        pinned: false,
        edited: false,
      },
    ],
  },
  {
    id: 4,
    author: { id: 'user-4', avatar: '🧑', name: 'Alex Turner', username: '@alex_trends' },
    text: 'The styling is on point! Love how you mixed the pieces 👌',
    likes: 31,
    likedByMe: false,
    timestamp: '2024-01-28T12:00:00Z',
    pinned: false,
    edited: false,
    replies: [],
  },
  {
    id: 5,
    author: { id: 'user-5', avatar: '👨‍🦱', name: 'David Lee', username: '@david_style' },
    text: 'Can you do a tutorial on how to style outfits like this? 🙏',
    likes: 45,
    likedByMe: true,
    timestamp: '2024-01-28T12:30:00Z',
    pinned: false,
    edited: false,
    replies: [],
  },
  {
    id: 6,
    author: { id: 'user-6', avatar: '👩‍💼', name: 'Sophie Martin', username: '@sophie_fashion' },
    text: 'This is giving me major inspiration for my summer wardrobe! ☀️',
    likes: 22,
    likedByMe: false,
    timestamp: '2024-01-28T13:00:00Z',
    pinned: false,
    edited: false,
    replies: [],
  },
  {
    id: 7,
    author: { id: 'user-7', avatar: '🧔', name: 'James Brown', username: '@james_trends' },
    text: 'The color coordination is perfect! What\'s your secret? 🎨',
    likes: 16,
    likedByMe: false,
    timestamp: '2024-01-28T13:30:00Z',
    pinned: false,
    edited: false,
    replies: [],
  },
];

const relatedPosts = [
  { id: 2, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400', author: 'Emma W.', likes: 1245 },
  { id: 3, image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400', author: 'Mike C.', likes: 987 },
  { id: 4, image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400', author: 'Lisa A.', likes: 2156 },
  { id: 5, image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400', author: 'Alex T.', likes: 1678 },
];

type Comment = {
  id: number;
  author: { id: string; avatar: string; name: string; username: string };
  text: string;
  likes: number;
  likedByMe: boolean;
  timestamp: string;
  pinned: boolean;
  edited: boolean;
  replies?: Comment[];
};

export default function PostDetailPage() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(post.liked);
  const [isSaved, setIsSaved] = useState(post.saved);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [savesCount, setSavesCount] = useState(post.saves);
  const [commentText, setCommentText] = useState('');
  const [desktopCommentText, setDesktopCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [displayedComments, setDisplayedComments] = useState(5); // For pagination
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'oldest'>('newest');
  const [filterBy, setFilterBy] = useState<'all' | 'author' | 'mentions'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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
    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes}m ago`;
    }
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    const weeks = Math.floor(days / 7);
    return `${weeks}w ago`;
  };

  // Comment actions
  const handleAddComment = (isDesktop = false) => {
    const text = isDesktop ? desktopCommentText : commentText;
    if (!text.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      author: currentUser,
      text: text.trim(),
      likes: 0,
      likedByMe: false,
      timestamp: new Date().toISOString(),
      pinned: false,
      edited: false,
      replies: [],
    };

    setComments([newComment, ...comments]);
    if (isDesktop) {
      setDesktopCommentText('');
    } else {
      setCommentText('');
    }
    toast.success('Comment added!');
  };

  const handleAddReply = (commentId: number) => {
    if (!replyText.trim()) return;

    const newReply: Comment = {
      id: Date.now(),
      author: currentUser,
      text: replyText.trim(),
      likes: 0,
      likedByMe: false,
      timestamp: new Date().toISOString(),
      pinned: false,
      edited: false,
    };

    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply],
        };
      }
      return comment;
    }));

    setReplyingTo(null);
    setReplyText('');
    toast.success('Reply added!');
  };

  const handleLikeComment = (commentId: number, isReply = false, parentId?: number) => {
    setComments(comments.map(comment => {
      if (isReply && comment.id === parentId) {
        return {
          ...comment,
          replies: comment.replies?.map(reply => {
            if (reply.id === commentId) {
              return {
                ...reply,
                likedByMe: !reply.likedByMe,
                likes: reply.likedByMe ? reply.likes - 1 : reply.likes + 1,
              };
            }
            return reply;
          }),
        };
      }
      if (comment.id === commentId) {
        return {
          ...comment,
          likedByMe: !comment.likedByMe,
          likes: comment.likedByMe ? comment.likes - 1 : comment.likes + 1,
        };
      }
      return comment;
    }));
  };

  const handlePinComment = (commentId: number) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const newPinnedState = !comment.pinned;
        toast.success(newPinnedState ? 'Comment pinned!' : 'Comment unpinned!');
        return { ...comment, pinned: newPinnedState };
      }
      return comment;
    }));
  };

  const handleEditComment = (commentId: number) => {
    const comment = comments.find(c => c.id === commentId);
    if (comment) {
      setEditingComment(commentId);
      setEditText(comment.text);
    }
  };

  const handleSaveEdit = (commentId: number) => {
    if (!editText.trim()) return;

    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          text: editText.trim(),
          edited: true,
        };
      }
      return comment;
    }));

    setEditingComment(null);
    setEditText('');
    toast.success('Comment updated!');
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));
    setDeleteDialogOpen(false);
    setCommentToDelete(null);
    toast.success('Comment deleted!');
  };

  const handleReportComment = (commentId: number) => {
    toast.success('Comment reported. We\'ll review it shortly.');
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate loading
    setTimeout(() => {
      setDisplayedComments(prev => prev + 5);
      setIsLoadingMore(false);
      toast.success('More comments loaded!');
    }, 500);
  };

  // Filter and sort comments
  const getFilteredAndSortedComments = () => {
    let filtered = [...comments];

    // Filter
    if (filterBy === 'author') {
      filtered = filtered.filter(c => c.author.id === post.author.id);
    } else if (filterBy === 'mentions') {
      filtered = filtered.filter(c => c.text.includes('@'));
    }

    // Search
    if (searchQuery) {
      filtered = filtered.filter(c => 
        c.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => b.likes - a.likes);
    }

    // Pinned comments always first
    const pinned = filtered.filter(c => c.pinned);
    const unpinned = filtered.filter(c => !c.pinned);

    return [...pinned, ...unpinned];
  };

  const filteredComments = getFilteredAndSortedComments();
  const visibleComments = filteredComments.slice(0, displayedComments);
  const hasMore = filteredComments.length > displayedComments;

  // Check if user can manage comment
  const canManageComment = (comment: Comment) => {
    return comment.author.id === currentUser.id || post.author.id === currentUser.id;
  };

  const CommentItem = ({ 
    comment, 
    isReply = false, 
    parentId 
  }: { 
    comment: Comment; 
    isReply?: boolean; 
    parentId?: number;
  }) => (
    <div className="space-y-2">
      <div className="flex gap-3">
        <div className={`${isReply ? 'w-7 h-7 text-xs' : 'w-8 h-8 text-sm'} rounded-full gradient-bg-purple-pink flex items-center justify-center flex-shrink-0`}>
          {comment.author.avatar}
        </div>
        <div className="flex-1 min-w-0">
          {editingComment === comment.id ? (
            <div className="space-y-2">
              <Textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="min-h-[60px]"
                placeholder="Edit your comment..."
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleSaveEdit(comment.id)}>
                  <Check className="w-3 h-3 mr-1" />
                  Save
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setEditingComment(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-muted/50 rounded-2xl px-4 py-2 relative group">
                {comment.pinned && (
                  <div className="absolute -top-2 -left-2">
                    <Badge className="bg-primary text-xs gap-1">
                      <Pin className="w-3 h-3" />
                      Pinned
                    </Badge>
                  </div>
                )}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">
                      {comment.author.name}
                      {comment.edited && (
                        <span className="text-xs text-muted-foreground ml-2">(edited)</span>
                      )}
                    </p>
                    <p className="text-sm whitespace-pre-wrap break-words">{comment.text}</p>
                  </div>
                  {canManageComment(comment) && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical className="w-3 h-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {post.author.id === currentUser.id && (
                          <>
                            <DropdownMenuItem onClick={() => handlePinComment(comment.id)}>
                              <Pin className="w-4 h-4 mr-2" />
                              {comment.pinned ? 'Unpin' : 'Pin'} Comment
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                          </>
                        )}
                        {comment.author.id === currentUser.id && (
                          <>
                            <DropdownMenuItem onClick={() => handleEditComment(comment.id)}>
                              <Edit2 className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => {
                                setCommentToDelete(comment.id);
                                setDeleteDialogOpen(true);
                              }}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </>
                        )}
                        {comment.author.id !== currentUser.id && (
                          <DropdownMenuItem onClick={() => handleReportComment(comment.id)}>
                            <Flag className="w-4 h-4 mr-2" />
                            Report
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 px-4 mt-1">
                <button className="text-xs text-muted-foreground hover:text-foreground">
                  {formatTime(comment.timestamp)}
                </button>
                <button 
                  className={`text-xs font-semibold ${comment.likedByMe ? 'text-primary' : 'hover:text-primary'}`}
                  onClick={() => handleLikeComment(comment.id, isReply, parentId)}
                >
                  <ThumbsUp className={`w-3 h-3 inline mr-1 ${comment.likedByMe ? 'fill-current' : ''}`} />
                  {comment.likes > 0 && `${comment.likes} `}
                  {comment.likes === 1 ? 'Like' : 'Likes'}
                </button>
                {!isReply && (
                  <button 
                    className="text-xs font-semibold hover:text-primary"
                    onClick={() => {
                      setReplyingTo(comment.id);
                      setReplyText(`@${comment.author.username} `);
                    }}
                  >
                    Reply
                  </button>
                )}
              </div>
            </>
          )}

          {/* Reply Input */}
          {replyingTo === comment.id && (
            <div className="mt-2 space-y-2">
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Reply to ${comment.author.name}...`}
                className="min-h-[60px]"
                autoFocus
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleAddReply(comment.id)}>
                  <Send className="w-3 h-3 mr-1" />
                  Reply
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setReplyingTo(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-11 space-y-2">
          {comment.replies.map((reply) => (
            <CommentItem 
              key={reply.id} 
              comment={reply} 
              isReply={true} 
              parentId={comment.id} 
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      {/* Background Orbs */}
      <div className="fixed top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-brand-magenta/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-brand-coral/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="sticky top-0 z-40 glass-effect border-b px-3 sm:px-4 py-3">
        <div className="w-full max-w-5xl mx-auto flex items-center gap-3 sm:gap-4">
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

      <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
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
                {/* Comment Controls */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">
                      Comments <span className="text-muted-foreground">({filteredComments.length})</span>
                    </h3>
                    <div className="flex gap-2">
                      {/* Sort Dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            {sortBy === 'newest' && 'Newest'}
                            {sortBy === 'popular' && 'Popular'}
                            {sortBy === 'oldest' && 'Oldest'}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setSortBy('newest')}>
                            <Clock className="w-4 h-4 mr-2" />
                            Newest First
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSortBy('popular')}>
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Most Popular
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSortBy('oldest')}>
                            <Clock className="w-4 h-4 mr-2" />
                            Oldest First
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      {/* Filter Dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Filter className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setFilterBy('all')}>
                            All Comments
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setFilterBy('author')}>
                            From Author
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setFilterBy('mentions')}>
                            With Mentions
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search comments..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-10"
                    />
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                        onClick={() => setSearchQuery('')}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {visibleComments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                  ))}

                  {/* Load More */}
                  {hasMore && (
                    <div className="pt-2 text-center">
                      <Button 
                        variant="outline" 
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                      >
                        {isLoadingMore ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          <>Load More Comments ({filteredComments.length - displayedComments})</>
                        )}
                      </Button>
                    </div>
                  )}

                  {filteredComments.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No comments yet. Be the first to comment!</p>
                    </div>
                  )}
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
                    <p className="text-2xl font-bold">{filteredComments.length}</p>
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

                {/* Desktop Comment Input */}
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-3">Add a Comment</h3>
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Share your thoughts..."
                      value={desktopCommentText}
                      onChange={(e) => setDesktopCommentText(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <Button 
                      onClick={() => handleAddComment(true)} 
                      className="w-full gradient-bg-purple-pink"
                      disabled={!desktopCommentText.trim()}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Post Comment
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  {/* Comment Controls */}
                  <div className="space-y-3 mb-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">
                        Comments <span className="text-muted-foreground text-sm">({filteredComments.length})</span>
                      </h3>
                    </div>

                    {/* Sort & Filter */}
                    <div className="flex gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {sortBy === 'newest' && 'Newest'}
                            {sortBy === 'popular' && 'Popular'}
                            {sortBy === 'oldest' && 'Oldest'}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setSortBy('newest')}>
                            Newest First
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSortBy('popular')}>
                            Most Popular
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSortBy('oldest')}>
                            Oldest First
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Filter className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setFilterBy('all')}>
                            All
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setFilterBy('author')}>
                            Author
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setFilterBy('mentions')}>
                            Mentions
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                      <Input
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 pr-8 h-8 text-sm"
                      />
                      {searchQuery && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-6"
                          onClick={() => setSearchQuery('')}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {visibleComments.map((comment) => (
                      <CommentItem key={comment.id} comment={comment} />
                    ))}

                    {hasMore && (
                      <div className="pt-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleLoadMore}
                          disabled={isLoadingMore}
                          className="w-full"
                        >
                          {isLoadingMore ? (
                            <>
                              <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                              Loading...
                            </>
                          ) : (
                            <>Load More ({filteredComments.length - displayedComments})</>
                          )}
                        </Button>
                      </div>
                    )}

                    {filteredComments.length === 0 && (
                      <div className="text-center py-6 text-muted-foreground text-sm">
                        <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>No comments yet</p>
                      </div>
                    )}
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

      {/* Mobile Comment Input - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 glass-effect border-t p-4 lg:hidden z-50">
        <div className="max-w-5xl mx-auto flex gap-3">
          <Input
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleAddComment(false);
              }
            }}
          />
          <Button 
            size="icon" 
            className="gradient-bg-purple-pink"
            onClick={() => handleAddComment(false)}
            disabled={!commentText.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Comment?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This comment will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => commentToDelete && handleDeleteComment(commentToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}