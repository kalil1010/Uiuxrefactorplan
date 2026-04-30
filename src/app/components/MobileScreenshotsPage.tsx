import React from 'react';
import { Card } from '@/components/ui/card';

export function MobileScreenshotsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">ZokaiHub Mobile Screenshots</span>
          </h1>
          <p className="text-xl text-muted-foreground">Complete mobile experience across all screens</p>
        </div>

        {/* Screenshots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {screenshots.map((screenshot, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="p-8">
                {/* Phone Mockup */}
                <div className="relative w-full max-w-[240px] mx-auto mb-6" style={{ aspectRatio: '9 / 19.5' }}>
                  {/* Phone Frame */}
                  <div className="absolute inset-0 bg-gray-900 rounded-[36px] p-3 shadow-2xl">
                    {/* Notch */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[120px] h-6 bg-gray-900 rounded-b-2xl z-10" />

                    {/* Screen */}
                    <div className="w-full h-full bg-white dark:bg-gray-800 rounded-[28px] overflow-hidden">
                      {screenshot.content}
                    </div>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">{screenshot.title}</h3>
                  <p className="text-sm text-muted-foreground">{screenshot.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

const screenshots = [
  {
    title: 'Feeds',
    description: 'Social feed with posts, stories, and fashion inspiration from the community',
    content: (
      <div className="flex flex-col h-full">
        <div className="h-11 flex items-center justify-between px-4 pt-3 text-white text-xs gradient-feeds">
          <span>9:41</span>
          <span>●●●●●</span>
        </div>
        <div className="px-4 py-3 text-white text-xl font-bold text-center gradient-feeds">Feeds</div>
        <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-3 space-y-3 overflow-hidden">
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="h-24 bg-gradient-to-br from-purple-400 to-pink-400" />
            <div className="p-3">
              <div className="text-sm font-semibold">Summer Collection 2024</div>
              <div className="text-xs text-muted-foreground">@fashionista • 2h ago</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="h-24 bg-gradient-to-br from-pink-400 to-rose-400" />
            <div className="p-3">
              <div className="text-sm font-semibold">Trending Outfits</div>
              <div className="text-xs text-muted-foreground">@styleguru • 5h ago</div>
            </div>
          </div>
        </div>
        <div className="h-14 bg-white dark:bg-gray-800 border-t flex items-center justify-around px-4">
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className={`w-6 h-6 rounded-full gradient-bg ${i !== 0 ? 'opacity-30' : ''}`} />
          ))}
        </div>
      </div>
    )
  },
  {
    title: 'Explore',
    description: 'Discover trending styles, popular creators, and fashion inspiration',
    content: (
      <div className="flex flex-col h-full">
        <div className="h-11 flex items-center justify-between px-4 pt-3 text-white text-xs gradient-explore">
          <span>9:41</span>
          <span>●●●●●</span>
        </div>
        <div className="px-4 py-3 text-white text-xl font-bold text-center gradient-explore">Explore</div>
        <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-3 space-y-3 overflow-hidden">
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="h-24 bg-gradient-to-br from-pink-500 to-rose-500" />
            <div className="p-3">
              <div className="text-sm font-semibold">Discover New Styles</div>
              <div className="text-xs text-muted-foreground">Curated Collections</div>
            </div>
          </div>
        </div>
        <div className="h-14 bg-white dark:bg-gray-800 border-t flex items-center justify-around px-4">
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className={`w-6 h-6 rounded-full gradient-bg-pink-coral ${i !== 1 ? 'opacity-30' : ''}`} />
          ))}
        </div>
      </div>
    )
  },
  {
    title: 'My Closet',
    description: 'Digital wardrobe with wear tracking, categorization, and outfit planning',
    content: (
      <div className="flex flex-col h-full">
        <div className="h-11 flex items-center justify-between px-4 pt-3 text-white text-xs gradient-closet">
          <span>9:41</span>
          <span>●●●●●</span>
        </div>
        <div className="px-4 py-3 text-white text-xl font-bold text-center gradient-closet">My Closet</div>
        <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-3 space-y-3 overflow-hidden">
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="h-24 bg-gradient-to-br from-rose-500 to-orange-500" />
            <div className="p-3">
              <div className="text-sm font-semibold">Black Leather Jacket</div>
              <div className="text-xs text-muted-foreground">Worn 5 times • Winter</div>
            </div>
          </div>
        </div>
        <div className="h-14 bg-white dark:bg-gray-800 border-t flex items-center justify-around px-4">
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className={`w-6 h-6 rounded-full gradient-bg-coral-yellow ${i !== 2 ? 'opacity-30' : ''}`} />
          ))}
        </div>
      </div>
    )
  },
  {
    title: 'Messages',
    description: 'Direct messaging with users, groups, and AI styling assistant',
    content: (
      <div className="flex flex-col h-full">
        <div className="h-11 flex items-center justify-between px-4 pt-3 text-white text-xs gradient-messages">
          <span>9:41</span>
          <span>●●●●●</span>
        </div>
        <div className="px-4 py-3 text-white text-xl font-bold text-center gradient-messages">Messages</div>
        <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-3 space-y-3 overflow-hidden">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-sm">
            <div className="text-sm font-semibold">Sarah Johnson</div>
            <div className="text-xs text-muted-foreground">Love your outfit! 😍 • 2m ago</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-sm">
            <div className="text-sm font-semibold">Fashion Group</div>
            <div className="text-xs text-muted-foreground">New message • 1h ago</div>
          </div>
        </div>
        <div className="h-14 bg-white dark:bg-gray-800 border-t flex items-center justify-around px-4">
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className={`w-6 h-6 rounded-full gradient-bg ${i !== 3 ? 'opacity-30' : ''}`} />
          ))}
        </div>
      </div>
    )
  },
  {
    title: 'Profile',
    description: 'User profile with stats, posts grid, and follower management',
    content: (
      <div className="flex flex-col h-full">
        <div className="h-11 flex items-center justify-between px-4 pt-3 text-white text-xs gradient-profile">
          <span>9:41</span>
          <span>●●●●●</span>
        </div>
        <div className="px-4 py-3 text-white text-xl font-bold text-center gradient-profile">Profile</div>
        <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-3 overflow-hidden">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center mb-3">
            <div className="w-16 h-16 rounded-full gradient-bg mx-auto mb-2" />
            <div className="text-sm font-semibold">@fashionlover</div>
            <div className="text-xs text-muted-foreground">Style enthusiast</div>
            <div className="flex justify-center gap-6 mt-3 text-xs">
              <div><strong>156</strong><br/>Posts</div>
              <div><strong>234</strong><br/>Followers</div>
              <div><strong>189</strong><br/>Following</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1">
            <div className="aspect-square rounded-lg gradient-bg-purple-pink" />
            <div className="aspect-square rounded-lg gradient-bg-pink-coral" />
            <div className="aspect-square rounded-lg gradient-bg-coral-yellow" />
          </div>
        </div>
        <div className="h-14 bg-white dark:bg-gray-800 border-t flex items-center justify-around px-4">
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className={`w-6 h-6 rounded-full gradient-bg-pink-coral ${i !== 4 ? 'opacity-30' : ''}`} />
          ))}
        </div>
      </div>
    )
  },
  {
    title: 'Settings',
    description: 'App settings, preferences, and account management',
    content: (
      <div className="flex flex-col h-full">
        <div className="h-11 flex items-center justify-between px-4 pt-3 text-white text-xs bg-gradient-to-r from-gray-700 to-gray-900">
          <span>9:41</span>
          <span>●●●●●</span>
        </div>
        <div className="px-4 py-3 text-white text-xl font-bold text-center bg-gradient-to-r from-gray-700 to-gray-900">Settings</div>
        <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-3 space-y-3 overflow-hidden">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-sm">
            <div className="text-sm font-semibold">Account Settings</div>
            <div className="text-xs text-muted-foreground">Manage your account</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-sm">
            <div className="text-sm font-semibold">Privacy & Security</div>
            <div className="text-xs text-muted-foreground">Control your data</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-sm">
            <div className="text-sm font-semibold">Language & Region</div>
            <div className="text-xs text-muted-foreground">EN / AR</div>
          </div>
        </div>
        <div className="h-14 bg-white dark:bg-gray-800 border-t flex items-center justify-around px-4">
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className={`w-6 h-6 rounded-full bg-gray-400 ${i !== 4 ? 'opacity-30' : ''}`} />
          ))}
        </div>
      </div>
    )
  },
  {
    title: 'Notifications',
    description: 'Real-time updates, likes, follows, messages, and AI suggestions',
    content: (
      <div className="flex flex-col h-full">
        <div className="h-11 flex items-center justify-between px-4 pt-3 text-white text-xs gradient-notifications">
          <span>9:41</span>
          <span>●●●●●</span>
        </div>
        <div className="px-4 py-3 text-white text-xl font-bold text-center gradient-notifications">Notifications</div>
        <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-3 space-y-3 overflow-hidden">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-sm">
            <div className="text-sm font-semibold">❤️ Sarah liked your post</div>
            <div className="text-xs text-muted-foreground">2 minutes ago</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-sm">
            <div className="text-sm font-semibold">👥 New follower: @styleguru</div>
            <div className="text-xs text-muted-foreground">1 hour ago</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-sm">
            <div className="text-sm font-semibold">💬 New message</div>
            <div className="text-xs text-muted-foreground">3 hours ago</div>
          </div>
        </div>
        <div className="h-14 bg-white dark:bg-gray-800 border-t flex items-center justify-around px-4">
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className={`w-6 h-6 rounded-full gradient-bg ${i !== 4 ? 'opacity-30' : ''}`} />
          ))}
        </div>
      </div>
    )
  },
  {
    title: 'Camera',
    description: 'Full-screen native camera UI for capturing outfits and items',
    content: (
      <div className="flex flex-col h-full bg-gray-900">
        <div className="flex-1 flex flex-col justify-between p-4 text-white">
          <div className="flex justify-between items-center">
            <div className="text-2xl">✕</div>
            <div className="text-2xl">⚡</div>
            <div className="text-2xl">⚙</div>
          </div>
          <div className="flex justify-center gap-4 pb-4">
            <div className="w-14 h-14 border-4 border-white rounded-full" />
            <div className="w-10 h-10 bg-white/30 rounded-lg self-end" />
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'AI Service Selection',
    description: 'Choose from AI styling services and features',
    content: (
      <div className="flex flex-col h-full">
        <div className="h-11 flex items-center justify-between px-4 pt-3 text-white text-xs gradient-ai">
          <span>9:41</span>
          <span>●●●●●</span>
        </div>
        <div className="px-4 py-3 text-white text-xl font-bold text-center gradient-ai">AI Stylist</div>
        <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-4 space-y-3 overflow-hidden">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 text-center shadow-lg">
            <div className="text-3xl mb-2">👗</div>
            <div className="text-sm font-semibold mb-1">Style Analysis</div>
            <div className="text-xs text-muted-foreground">Get AI-powered outfit recommendations</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 text-center shadow-lg">
            <div className="text-3xl mb-2">📸</div>
            <div className="text-sm font-semibold mb-1">Virtual Try-On</div>
            <div className="text-xs text-muted-foreground">See outfits before you buy</div>
          </div>
        </div>
        <div className="h-14 bg-white dark:bg-gray-800 border-t flex items-center justify-around px-4">
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className={`w-6 h-6 rounded-full gradient-bg ${i !== 2 ? 'opacity-30' : ''}`} />
          ))}
        </div>
      </div>
    )
  },
  {
    title: 'Swipe & Browse',
    description: 'Tinder-style swipe interface for outfit discovery and selection',
    content: (
      <div className="flex flex-col h-full">
        <div className="h-11 flex items-center justify-between px-4 pt-3 text-white text-xs gradient-browse">
          <span>9:41</span>
          <span>●●●●●</span>
        </div>
        <div className="px-4 py-3 text-white text-xl font-bold text-center gradient-browse">Swipe & Style</div>
        <div className="flex-1 bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
          <div className="w-[85%] aspect-[3/4] rounded-3xl gradient-bg-pink-coral shadow-2xl relative overflow-hidden">
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <div className="text-base font-bold">Summer Outfit</div>
              <div className="text-xs">Casual & Comfortable</div>
            </div>
            <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-4">
              <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-lg shadow-lg">✕</div>
              <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-lg shadow-lg">❤️</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'Preview',
    description: 'Full outfit preview with details and save/share options',
    content: (
      <div className="flex flex-col h-full">
        <div className="h-11 flex items-center justify-between px-4 pt-3 text-white text-xs gradient-preview">
          <span>9:41</span>
          <span>●●●●●</span>
        </div>
        <div className="px-4 py-3 text-white text-xl font-bold text-center gradient-preview">Outfit Preview</div>
        <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-4 overflow-hidden">
          <div className="w-full aspect-[3/4] rounded-2xl gradient-bg-coral-yellow mb-4 shadow-lg" />
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 mb-3 shadow-sm">
            <div className="text-sm font-semibold mb-2">Outfit Details</div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>• Black Blazer</div>
              <div>• White T-Shirt</div>
              <div>• Blue Jeans</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-1 py-3 gradient-bg rounded-full text-center text-white text-sm font-semibold">Save</div>
            <div className="flex-1 py-3 border-2 border-pink-500 rounded-full text-center text-pink-500 text-sm font-semibold">Share</div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'AI Analyzing',
    description: 'AI processing screen with loading animation and progress',
    content: (
      <div className="flex flex-col h-full">
        <div className="h-11 flex items-center justify-between px-4 pt-3 text-white text-xs gradient-analyzing">
          <span>9:41</span>
          <span>●●●●●</span>
        </div>
        <div className="px-4 py-3 text-white text-xl font-bold text-center gradient-analyzing">AI Analyzing</div>
        <div className="flex-1 bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-8">
          <div className="w-24 h-24 border-8 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-6" />
          <div className="text-sm font-semibold text-center mb-2">Analyzing Your Style</div>
          <div className="text-xs text-muted-foreground text-center leading-relaxed mb-6">
            Our AI is processing your images<br />
            and creating personalized<br />
            recommendations...
          </div>
          <div className="w-4/5 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="w-2/3 h-full gradient-bg" />
          </div>
        </div>
      </div>
    )
  }
];
