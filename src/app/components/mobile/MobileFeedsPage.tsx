import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { RefreshCw, AlertCircle, Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { formatRelativeTime } from '../../lib/format-time';
import MobileBottomNav from './MobileBottomNav';

type FeedPost = {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  createdAt: number;
  isLiked: boolean;
  isBookmarked: boolean;
};

type LoadingState = 'idle' | 'loading' | 'success' | 'error' | 'empty';

export default function MobileFeedsPage() {
  const t = useTranslations('feeds');
  const locale = useLocale();
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [posts, setPosts] = useState<FeedPost[]>([]);

  // Simulate data fetch
  React.useEffect(() => {
    const timer = setTimeout(() => {
      // Change to 'success', 'empty', or 'error' to test different states
      setLoadingState('success');
      setPosts([
        {
          id: '1',
          author: {
            name: 'Sarah Johnson',
            username: '@sarahj',
            avatar: '',
          },
          content: 'Just found the perfect summer outfit! 🌞 The pastel colors are everything!',
          image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
          likes: 142,
          comments: 23,
          createdAt: Date.now() - 2 * 60 * 60 * 1000,
          isLiked: false,
          isBookmarked: false,
        },
        {
          id: '2',
          author: {
            name: 'Alex Chen',
            username: '@alexc',
            avatar: '',
          },
          content: 'Minimalist wardrobe essentials for fall. What do you think?',
          likes: 89,
          comments: 12,
          createdAt: Date.now() - 5 * 60 * 60 * 1000,
          isLiked: true,
          isBookmarked: true,
        },
      ]);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleRetry = () => {
    setLoadingState('loading');
    setTimeout(() => setLoadingState('success'), 1500);
  };

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 } : post
      )
    );
  };

  const handleBookmark = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === postId ? { ...post, isBookmarked: !post.isBookmarked } : post))
    );
  };

  const renderLoadingState = () => (
    <div className="px-4 py-6 space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-3">
          {/* Author */}
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
          {/* Content */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          {/* Image */}
          <Skeleton className="w-full h-64 rounded-lg" />
          {/* Actions */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderEmptyState = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
        <Heart className="w-10 h-10 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-bold mb-2">{t('empty.title')}</h2>
      <p className="text-muted-foreground mb-6 max-w-sm">{t('empty.description')}</p>
      <Button className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80">
        {t('empty.cta')}
      </Button>
    </div>
  );

  const renderErrorState = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
        <AlertCircle className="w-10 h-10 text-destructive" />
      </div>
      <h2 className="text-xl font-bold mb-2">{t('error.title')}</h2>
      <p className="text-muted-foreground mb-6 max-w-sm">{t('error.description')}</p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Button
          onClick={handleRetry}
          className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80"
        >
          {t('error.retry')}
        </Button>
        <Button variant="outline" className="active:bg-muted">
          {t('error.goHome')}
        </Button>
      </div>
    </div>
  );

  const renderPost = (post: FeedPost) => (
    <article key={post.id} className="bg-background border-b border-border pb-4">
      {/* Author */}
      <div className="flex items-center gap-3 px-4 py-3">
        <Avatar>
          <AvatarImage src={post.author.avatar} alt={post.author.name} />
          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate">{post.author.name}</p>
          <p className="text-sm text-muted-foreground">{post.author.username}</p>
        </div>
        <button
          className="min-h-11 min-w-11 flex items-center justify-center active:bg-muted rounded-full"
          aria-label={t('actions.moreOptions')}
        >
          <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-sm">{post.content}</p>
      </div>

      {/* Image */}
      {post.image && (
        <div className="mb-3">
          <ImageWithFallback
            src={post.image}
            alt={post.content.slice(0, 80)}
            className="w-full aspect-square object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 px-4">
        <button
          onClick={() => handleLike(post.id)}
          className={`flex items-center gap-2 min-h-11 px-3 rounded-lg transition-colors hover:bg-muted active:bg-muted ${
            post.isLiked ? 'text-destructive' : 'text-muted-foreground'
          }`}
          aria-label={post.isLiked ? t('actions.unlike') : t('actions.like')}
        >
          <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
          <span className="text-sm font-medium">{post.likes.toLocaleString(locale)}</span>
        </button>
        <button
          className="flex items-center gap-2 min-h-11 px-3 rounded-lg text-muted-foreground hover:bg-muted active:bg-muted"
          aria-label={t('actions.comment')}
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{post.comments.toLocaleString(locale)}</span>
        </button>
        <button
          className="flex items-center gap-2 min-h-11 px-3 rounded-lg text-muted-foreground hover:bg-muted active:bg-muted"
          aria-label={t('actions.share')}
        >
          <Share2 className="w-5 h-5" />
        </button>
        <div className="flex-1" />
        <button
          onClick={() => handleBookmark(post.id)}
          className={`min-h-11 min-w-11 flex items-center justify-center rounded-lg transition-colors hover:bg-muted active:bg-muted ${
            post.isBookmarked ? 'text-primary' : 'text-muted-foreground'
          }`}
          aria-label={post.isBookmarked ? t('actions.removeBookmark') : t('actions.bookmark')}
        >
          <Bookmark className={`w-5 h-5 ${post.isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Timestamp */}
      <div className="px-4 pt-2">
        <p className="text-xs text-muted-foreground">{formatRelativeTime(post.createdAt, locale)}</p>
      </div>
    </article>
  );

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
      {/* Header with Safe Area */}
      <header className="sticky top-0 z-40 bg-background border-b border-border pt-[env(safe-area-inset-top)] px-4 pb-4">
        <h1 className="text-xl font-bold">{t('title')}</h1>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-[calc(3.5rem+env(safe-area-inset-bottom))]">
        {/* Pull-to-refresh indicator */}
        {isRefreshing && (
          <div className="flex items-center justify-center py-4">
            <RefreshCw className="w-5 h-5 animate-spin text-primary" />
          </div>
        )}

        {loadingState === 'loading' && renderLoadingState()}
        {loadingState === 'empty' && renderEmptyState()}
        {loadingState === 'error' && renderErrorState()}
        {loadingState === 'success' && (
          <div className="divide-y divide-border">{posts.map(renderPost)}</div>
        )}
      </div>

      {/* Bottom Navigation */}
      <MobileBottomNav
        activeTab="feeds"
        onTabChange={(tab) => {
          // TODO(integration): wire to next-intl router
          // router.push(`/${tab}`)
        }}
      />
    </div>
  );
}
