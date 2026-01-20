import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { 
  Search, 
  X, 
  TrendingUp,
  User,
  Hash,
  Clock,
  ArrowRight
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const recentSearches = [
    { type: 'user', text: '@emmafashion', icon: User },
    { type: 'tag', text: '#FallFashion', icon: Hash },
    { type: 'user', text: '@alexstyle', icon: User },
    { type: 'tag', text: '#OOTD', icon: Hash }
  ];

  const trendingSearches = [
    '#AIFashion',
    '#SustainableStyle',
    '#VintageVibes',
    '#StreetStyle',
    '#WinterLooks'
  ];

  const suggestedUsers = [
    { name: 'Fashion Daily', username: '@fashiondaily', avatar: '👗', followers: '12K' },
    { name: 'Style Tips', username: '@styletips', avatar: '✨', followers: '8.5K' },
    { name: 'Trend Alert', username: '@trendalert', avatar: '🔥', followers: '15K' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="h-full flex flex-col">
        {/* Search Header */}
        <div className="border-b bg-background p-4">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                autoFocus
                placeholder="Search users, tags, or posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-12 text-base"
              />
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="flex-shrink-0">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-4 space-y-6">
            {searchQuery === '' ? (
              <>
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">Recent</h3>
                      <Button variant="ghost" size="sm">Clear all</Button>
                    </div>
                    <div className="space-y-2">
                      {recentSearches.map((search, i) => {
                        const Icon = search.icon;
                        return (
                          <button
                            key={i}
                            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                          >
                            <Clock className="w-5 h-5 text-muted-foreground" />
                            <span className="flex-1 text-left">{search.text}</span>
                            <Icon className="w-4 h-4 text-muted-foreground" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Trending */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Trending</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((tag, i) => (
                      <button
                        key={i}
                        className="px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Suggested Users */}
                <div>
                  <h3 className="font-semibold mb-3">Suggested</h3>
                  <div className="space-y-3">
                    {suggestedUsers.map((user, i) => (
                      <Card key={i} className="p-4 flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-2xl">
                          {user.avatar}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{user.name}</h4>
                          <p className="text-sm text-muted-foreground">{user.username} • {user.followers} followers</p>
                        </div>
                        <Button size="sm" variant="outline">Follow</Button>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Search Results */
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Searching for "{searchQuery}"...
                </p>
                {/* You can add actual search results here */}
                <div className="text-center py-12">
                  <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground">Try searching for users, tags, or posts</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
