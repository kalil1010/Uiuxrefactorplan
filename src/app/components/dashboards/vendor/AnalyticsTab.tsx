import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Eye, ShoppingCart, DollarSign } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 12400 },
  { month: 'Feb', revenue: 14800 },
  { month: 'Mar', revenue: 16200 },
  { month: 'Apr', revenue: 18500 },
  { month: 'May', revenue: 21300 },
  { month: 'Jun', revenue: 24800 },
];

const viewsData = [
  { day: 'Mon', views: 1200 },
  { day: 'Tue', views: 1450 },
  { day: 'Wed', views: 1680 },
  { day: 'Thu', views: 1920 },
  { day: 'Fri', views: 2100 },
  { day: 'Sat', views: 2450 },
  { day: 'Sun', views: 2280 },
];

export function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-3xl font-bold mt-2">$108,200</p>
                <p className="text-sm text-green-600 mt-1">
                  <TrendingUp className="inline w-4 h-4 mr-1" />
                  +18.2%
                </p>
              </div>
              <div className="w-12 h-12 rounded-full gradient-bg-purple-pink flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Product Views</p>
                <p className="text-3xl font-bold mt-2">45,680</p>
                <p className="text-sm text-green-600 mt-1">
                  <TrendingUp className="inline w-4 h-4 mr-1" />
                  +24.7%
                </p>
              </div>
              <div className="w-12 h-12 rounded-full gradient-bg-pink-coral flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-3xl font-bold mt-2">3.4%</p>
                <p className="text-sm text-green-600 mt-1">
                  <TrendingUp className="inline w-4 h-4 mr-1" />
                  +0.8%
                </p>
              </div>
              <div className="w-12 h-12 rounded-full gradient-bg-coral-yellow flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Order</p>
                <p className="text-3xl font-bold mt-2">$127</p>
                <p className="text-sm text-green-600 mt-1">
                  <TrendingUp className="inline w-4 h-4 mr-1" />
                  +5.3%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
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
                <Line type="monotone" dataKey="revenue" stroke="#6556C6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Weekly Product Views</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="views" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D20EC1" />
                    <stop offset="100%" stopColor="#F04050" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
