import React, { useState } from 'react';
import { RoleSidebar } from '../layout/RoleSidebar';
import { TopBar } from '../layout/TopBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DollarSign, 
  Eye, 
  Heart, 
  TrendingUp,
  Video,
  Users,
  Calendar,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const earningsData = [
  { month: 'Jan', earnings: 3200, views: 45000 },
  { month: 'Feb', earnings: 4800, views: 62000 },
  { month: 'Mar', earnings: 5200, views: 71000 },
  { month: 'Apr', earnings: 6500, views: 85000 },
  { month: 'May', earnings: 7800, views: 98000 },
  { month: 'Jun', earnings: 9200, views: 112000 },
];

const recentContent = [
  { 
    title: 'Summer Fashion Haul 2024', 
    views: 45200, 
    likes: 3420, 
    earnings: '$1,240',
    date: '2024-01-26',
    thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=200&fit=crop'
  },
  { 
    title: 'Styling Tips for Spring', 
    views: 38900, 
    likes: 2890, 
    earnings: '$980',
    date: '2024-01-24',
    thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&h=200&fit=crop'
  },
  { 
    title: 'Wardrobe Essentials Guide', 
    views: 52100, 
    likes: 4120, 
    earnings: '$1,580',
    date: '2024-01-22',
    thumbnail: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop'
  },
  { 
    title: 'Accessorizing Like a Pro', 
    views: 29800, 
    likes: 2340, 
    earnings: '$750',
    date: '2024-01-20',
    thumbnail: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=300&h=200&fit=crop'
  },
];

const upcomingEvents = [
  { title: 'Live Fashion Q&A', date: '2024-02-02', time: '3:00 PM', attendees: 342 },
  { title: 'Spring Collection Launch', date: '2024-02-05', time: '6:00 PM', attendees: 789 },
  { title: 'Styling Workshop', date: '2024-02-08', time: '4:00 PM', attendees: 256 },
];

const topFollowers = [
  { name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', engagement: '98%' },
  { name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop', engagement: '95%' },
  { name: 'Lisa Chen', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop', engagement: '92%' },
  { name: 'Maria Garcia', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', engagement: '89%' },
];

export function StarDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('/star/analytics');

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <RoleSidebar
        role="star"
        activeItem={activeItem}
        collapsed={sidebarCollapsed}
        onItemClick={setActiveItem}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar
          title="My Studio"
          onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Background Orbs */}
          <div className="fixed top-0 right-1/4 w-96 h-96 bg-brand-yellow/20 rounded-full blur-3xl pointer-events-none" />
          <div className="fixed bottom-0 left-1/4 w-96 h-96 bg-brand-pink/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto space-y-6 relative z-10">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Earnings</p>
                      <p className="text-3xl font-bold mt-2">$42,850</p>
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                        <TrendingUp className="inline w-4 h-4 mr-1" />
                        +18.2% this month
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full gradient-bg-purple-pink flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Views</p>
                      <p className="text-3xl font-bold mt-2">2.4M</p>
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                        <TrendingUp className="inline w-4 h-4 mr-1" />
                        +24.5% this month
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full gradient-bg-pink-coral flex items-center justify-center">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Followers</p>
                      <p className="text-3xl font-bold mt-2">156K</p>
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                        <TrendingUp className="inline w-4 h-4 mr-1" />
                        +12.8% this month
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full gradient-bg-coral-yellow flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Engagement Rate</p>
                      <p className="text-3xl font-bold mt-2">8.4%</p>
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                        <TrendingUp className="inline w-4 h-4 mr-1" />
                        +2.1% this month
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Earnings Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Earnings Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={earningsData}>
                      <defs>
                        <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6556C6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#6556C6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--popover))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="earnings" 
                        stroke="#6556C6" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#earningsGradient)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Views Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Content Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={earningsData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--popover))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="views" 
                        stroke="url(#viewsGradient)" 
                        strokeWidth={3}
                        dot={{ fill: '#D20EC1', r: 4 }}
                      />
                      <defs>
                        <linearGradient id="viewsGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#D20EC1" />
                          <stop offset="100%" stopColor="#F04050" />
                        </linearGradient>
                      </defs>
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Content */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Content</CardTitle>
                <Button variant="ghost" size="sm">View All</Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentContent.map((content, index) => (
                    <div key={index} className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group">
                      <img
                        src={content.thumbnail}
                        alt={content.title}
                        className="w-32 h-20 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{content.title}</h4>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {(content.views / 1000).toFixed(1)}K
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {(content.likes / 1000).toFixed(1)}K
                          </span>
                        </div>
                        <p className="text-sm font-semibold gradient-text-purple-pink mt-2">
                          {content.earnings}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Two Column Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Events */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Upcoming Events
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Video className="w-4 h-4 mr-2" />
                    Schedule New
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                        <div className="w-12 h-12 rounded-lg gradient-bg-purple-pink flex items-center justify-center flex-shrink-0">
                          <Video className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleDateString()} at {event.time}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {event.attendees} registered
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Followers */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Top Followers
                  </CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topFollowers.map((follower, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={follower.avatar} />
                          <AvatarFallback>{follower.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">{follower.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {follower.engagement} engagement
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Message
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
