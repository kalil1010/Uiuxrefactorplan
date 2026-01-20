import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { ThemeToggleInline } from '../ThemeToggle';
import { 
  User, 
  Bell, 
  Lock, 
  Palette, 
  Globe, 
  HelpCircle,
  Shield,
  CreditCard,
  LogOut,
  ChevronRight,
  Sparkles,
  Users,
  Crown,
  Zap
} from 'lucide-react';

interface SettingsPageProps {
  onSignOut: () => void;
}

export default function SettingsPage({ onSignOut }: SettingsPageProps) {
  const [userRole, setUserRole] = useState<'user' | 'creator'>('user');
  const [notifications, setNotifications] = useState({
    likes: true,
    comments: true,
    follows: true,
    messages: true,
    aiUpdates: false
  });

  const handleRoleSwitch = (newRole: 'user' | 'creator') => {
    setUserRole(newRole);
    // You can add additional logic here for role switching
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        {/* Role Switcher Card */}
        <Card className="p-6 mb-6 gradient-bg-purple-pink/10 border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Account Mode</h3>
              <p className="text-sm text-muted-foreground">
                Switch between user and creator mode
              </p>
            </div>
            <Crown className="w-8 h-8 text-primary" />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleRoleSwitch('user')}
              className={`p-4 rounded-lg border-2 transition-all ${
                userRole === 'user'
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <User className="w-6 h-6 mx-auto mb-2" />
              <h4 className="font-semibold mb-1">User Mode</h4>
              <p className="text-xs text-muted-foreground">Browse and share fashion</p>
            </button>

            <button
              onClick={() => handleRoleSwitch('creator')}
              className={`p-4 rounded-lg border-2 transition-all ${
                userRole === 'creator'
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Sparkles className="w-6 h-6 mx-auto mb-2" />
              <h4 className="font-semibold mb-1">Creator Mode</h4>
              <p className="text-xs text-muted-foreground">Analytics & monetization</p>
            </button>
          </div>

          {userRole === 'creator' && (
            <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-primary" />
                <h4 className="font-semibold text-sm">Creator Benefits</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ Advanced analytics dashboard</li>
                <li>✓ Monetization tools</li>
                <li>✓ Priority support</li>
                <li>✓ Custom branding options</li>
              </ul>
            </div>
          )}
        </Card>

        {/* Account Settings */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Account</h2>
            <Card className="divide-y">
              <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5" />
                  <div className="text-left">
                    <h4 className="font-medium">Edit Profile</h4>
                    <p className="text-sm text-muted-foreground">Name, bio, avatar</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>

              <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5" />
                  <div className="text-left">
                    <h4 className="font-medium">Privacy & Security</h4>
                    <p className="text-sm text-muted-foreground">Password, 2FA, privacy</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>

              <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5" />
                  <div className="text-left">
                    <h4 className="font-medium">Blocked Accounts</h4>
                    <p className="text-sm text-muted-foreground">Manage blocked users</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </Card>
          </div>

          {/* Notifications */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <Card className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Likes</h4>
                  <p className="text-sm text-muted-foreground">Get notified when someone likes your posts</p>
                </div>
                <Switch
                  checked={notifications.likes}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, likes: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Comments</h4>
                  <p className="text-sm text-muted-foreground">Get notified about new comments</p>
                </div>
                <Switch
                  checked={notifications.comments}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, comments: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">New Followers</h4>
                  <p className="text-sm text-muted-foreground">Get notified when someone follows you</p>
                </div>
                <Switch
                  checked={notifications.follows}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, follows: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Messages</h4>
                  <p className="text-sm text-muted-foreground">Get notified about new messages</p>
                </div>
                <Switch
                  checked={notifications.messages}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, messages: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div>
                    <h4 className="font-medium">AI Updates</h4>
                    <p className="text-sm text-muted-foreground">Get notified about new AI features</p>
                  </div>
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <Switch
                  checked={notifications.aiUpdates}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, aiUpdates: checked })}
                />
              </div>
            </Card>
          </div>

          {/* Appearance */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Appearance</h2>
            <Card className="p-4">
              <div className="mb-3">
                <h4 className="font-medium mb-1">Theme</h4>
                <p className="text-sm text-muted-foreground mb-4">Choose your preferred theme</p>
              </div>
              <ThemeToggleInline />
            </Card>

            <Card className="mt-4 divide-y">
              <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5" />
                  <div className="text-left">
                    <h4 className="font-medium">Language</h4>
                    <p className="text-sm text-muted-foreground">English</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </Card>
          </div>

          {/* Premium */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Premium</h2>
            <Card className="p-6 gradient-bg border-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div className="text-white">
                  <h3 className="font-bold text-lg">Upgrade to Premium</h3>
                  <p className="text-sm text-white/90">Unlock exclusive AI features</p>
                </div>
              </div>
              <ul className="space-y-2 mb-6 text-white">
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">Unlimited AI generations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">Advanced style analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">Priority support</span>
                </li>
              </ul>
              <Button variant="secondary" className="w-full">
                Upgrade Now - $9.99/month
              </Button>
            </Card>
          </div>

          {/* Support */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Support</h2>
            <Card className="divide-y">
              <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5" />
                  <span className="font-medium">Help Center</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>

              <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">Community Guidelines</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </Card>
          </div>

          {/* Danger Zone */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-destructive">Danger Zone</h2>
            <Card className="divide-y">
              <button 
                onClick={onSignOut}
                className="w-full p-4 flex items-center justify-between hover:bg-destructive/10 transition-colors text-destructive"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </div>
                <ChevronRight className="w-5 h-5" />
              </button>

              <button className="w-full p-4 flex items-center justify-between hover:bg-destructive/10 transition-colors text-destructive">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">Delete Account</span>
                </div>
                <ChevronRight className="w-5 h-5" />
              </button>
            </Card>
          </div>

          {/* App Info */}
          <div className="text-center text-sm text-muted-foreground py-6">
            <p>ZokaiHub v1.0.0</p>
            <p>© 2026 ZokaiHub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}