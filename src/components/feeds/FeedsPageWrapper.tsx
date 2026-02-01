import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { LogoFull } from '../Logo';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { ThemeToggle } from '../ThemeToggle';
import AIHubPage from '../ai-hub/AIHubPage';
import MyClosetPage from '../closet/MyClosetPage';
import ProfilePage from '../profile/ProfilePage';
import MessagesPage from '../messages/MessagesPage';
import ExplorePage from '../explore/ExplorePage';
import SettingsPage from '../settings/SettingsPage';
import SearchModal from '../search/SearchModal';
import NotificationsPanel from '../notifications/NotificationsPanel';
import { CreatePostModal } from '../posts/CreatePostModal';
import MainContent from './MainContent';
import {
  Home,
  Compass,
  Shirt,
  MessageCircle,
  User,
  Plus,
  Search,
  Bell,
  Settings,
  Sparkles,
  Cloud
} from 'lucide-react';

interface FeedsPageWrapperProps {
  onSignOut: () => void;
}

export default function FeedsPageWrapper({ onSignOut }: FeedsPageWrapperProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'closet' | 'ai' | 'profile' | 'messages' | 'settings'>('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  // Render different pages based on active tab
  const renderPageContent = () => {
    switch (activeTab) {
      case 'ai':
        return <AIHubPage />;
      case 'closet':
        return <MyClosetPage />;
      case 'profile':
        return <ProfilePage />;
      case 'messages':
        return <MessagesPage />;
      case 'explore':
        return <ExplorePage />;
      case 'settings':
        return <SettingsPage onSignOut={onSignOut} />;
      default:
        return (
          <div className="w-full max-w-2xl mx-auto px-0 sm:px-4 py-4">
            <MainContent />
          </div>
        );
    }
  };

  // Check if current page should show full width (Messages, Settings, etc)
  const isFullWidthPage = ['messages', 'settings', 'ai', 'closet', 'explore', 'profile'].includes(activeTab);

  return (
    <div className="min-h-screen bg-background">
      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      {/* Notifications Panel */}
      <NotificationsPanel isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />

      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b bg-background/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-2">
          <div className="flex-shrink-0">
            <LogoFull />
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10" onClick={() => setIsSearchOpen(true)}>
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10" onClick={() => setActiveTab('messages')}>
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10" onClick={() => setIsNotificationsOpen(true)}>
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <Button variant="ghost" size="icon" onClick={() => setActiveTab('settings')} className="h-9 w-9 sm:h-10 sm:w-10">
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="flex pt-14 sm:pt-16 pb-16 lg:pb-0">
        {/* Sidebar Navigation - Desktop */}
        <aside className="hidden lg:block w-64 fixed left-0 top-14 sm:top-16 bottom-0 border-r p-4 overflow-y-auto bg-background z-40">
          <nav className="space-y-2">
            <Button
              variant={activeTab === 'home' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('home')}
            >
              <Home className="w-5 h-5 mr-3" />
              Home Feed
            </Button>
            <Button
              variant={activeTab === 'explore' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('explore')}
            >
              <Compass className="w-5 h-5 mr-3" />
              Explore
            </Button>
            <Button
              variant={activeTab === 'closet' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('closet')}
            >
              <Shirt className="w-5 h-5 mr-3" />
              My Closet
            </Button>
            <Button
              variant={activeTab === 'ai' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('ai')}
            >
              <Sparkles className="w-5 h-5 mr-3" />
              AI Stylist Hub
            </Button>
            <Button
              variant={activeTab === 'profile' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('profile')}
            >
              <User className="w-5 h-5 mr-3" />
              Profile
            </Button>
            <Button
              variant={activeTab === 'messages' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('messages')}
            >
              <MessageCircle className="w-5 h-5 mr-3" />
              Messages
            </Button>
            <Button
              variant={activeTab === 'settings' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Button>
          </nav>

          <div className="mt-6">
            <Button className="w-full gradient-bg border-0" onClick={() => setIsCreatePostOpen(true)}>
              <Plus className="w-5 h-5 mr-2" />
              New Post
            </Button>
          </div>

          {/* Quick Stats - Only show on home */}
          {activeTab === 'home' && (
            <Card className="mt-6 p-4">
              <h3 className="font-semibold mb-3">Today's Weather</h3>
              <div className="flex items-center gap-3 mb-3">
                <Cloud className="w-8 h-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold">72°F</div>
                  <div className="text-xs text-muted-foreground">Partly Cloudy</div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View Outfit Suggestions
              </Button>
            </Card>
          )}
        </aside>

        {/* Main Content Area */}
        <main className={`flex-1 ${isFullWidthPage ? 'lg:ml-64' : 'lg:ml-64 lg:mr-80'} min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] overflow-y-auto`}>
          {renderPageContent()}
        </main>

        {/* Right Sidebar - Desktop - Only show on home */}
        {activeTab === 'home' && (
          <aside className="hidden lg:block w-80 fixed right-0 top-14 sm:top-16 bottom-0 border-l p-4 bg-background overflow-y-auto">
            <Card className="p-4 mb-4">
              <h3 className="font-semibold mb-3">Your Profile</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                  👤
                </div>
                <div className="flex-1">
                  <div className="font-semibold">You</div>
                  <div className="text-sm text-muted-foreground">@yourusername</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="font-bold">42</div>
                  <div className="text-xs text-muted-foreground">Posts</div>
                </div>
                <div>
                  <div className="font-bold">1.2K</div>
                  <div className="text-xs text-muted-foreground">Followers</div>
                </div>
                <div>
                  <div className="font-bold">856</div>
                  <div className="text-xs text-muted-foreground">Following</div>
                </div>
              </div>
            </Card>

            <Card className="p-4 mb-4">
              <h3 className="font-semibold mb-3">Suggested For You</h3>
              <div className="space-y-3">
                {[
                  { name: 'Fashion Daily', username: '@fashiondaily', avatar: '👗' },
                  { name: 'Style Tips', username: '@styletips', avatar: '✨' },
                  { name: 'Trend Alert', username: '@trendalert', avatar: '🔥' }
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-lg">
                        {user.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.username}</div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Follow</Button>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3">Trending Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['#OOTD', '#FallFashion', '#StyleInspo', '#AIFashion', '#Sustainable', '#Vintage'].map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </Card>
          </aside>
        )}
      </div>

      {/* Bottom Navigation - Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 glass border-t bg-background/95 backdrop-blur-md z-50">
        <div className="flex items-center justify-around h-16">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveTab('home')}
            className={activeTab === 'home' ? 'text-primary' : ''}
          >
            <Home className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveTab('explore')}
            className={activeTab === 'explore' ? 'text-primary' : ''}
          >
            <Compass className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="gradient-bg border-0"
            onClick={() => setIsCreatePostOpen(true)}
          >
            <Plus className="w-6 h-6 text-white" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveTab('ai')}
            className={activeTab === 'ai' ? 'text-primary' : ''}
          >
            <Sparkles className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveTab('profile')}
            className={activeTab === 'profile' ? 'text-primary' : ''}
          >
            <User className="w-6 h-6" />
          </Button>
        </div>
      </nav>

      {/* Create Post Modal */}
      <CreatePostModal isOpen={isCreatePostOpen} onClose={() => setIsCreatePostOpen(false)} />
    </div>
  );
}