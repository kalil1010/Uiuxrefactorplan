import React, { useState } from 'react';
import { RoleSidebar } from '../layout/RoleSidebar';
import { TopBar } from '../layout/TopBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Store, 
  FileText, 
  TrendingUp,
  UserPlus,
  AlertTriangle,
  DollarSign,
  ShoppingBag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const userGrowthData = [
  { month: 'Jan', users: 12400 },
  { month: 'Feb', users: 14800 },
  { month: 'Mar', users: 16200 },
  { month: 'Apr', users: 18500 },
  { month: 'May', users: 21300 },
  { month: 'Jun', users: 24800 },
];

const platformData = [
  { name: 'Active Users', value: 24800, color: '#6556C6' },
  { name: 'Vendors', value: 3200, color: '#D20EC1' },
  { name: 'Products', value: 45600, color: '#F04050' },
  { name: 'Orders', value: 18900, color: '#FFC600' },
];

const recentVendors = [
  { name: 'Fashion House Co.', email: 'contact@fashionhouse.com', products: 145, revenue: '$42,350', status: 'Active', joined: '2024-01-25' },
  { name: 'Style Boutique', email: 'info@styleboutique.com', products: 89, revenue: '$28,750', status: 'Active', joined: '2024-01-24' },
  { name: 'Urban Threads', email: 'hello@urbanthreads.com', products: 234, revenue: '$65,420', status: 'Active', joined: '2024-01-23' },
  { name: 'Luxury Lane', email: 'contact@luxurylane.com', products: 56, revenue: '$18,900', status: 'Pending', joined: '2024-01-22' },
  { name: 'Trend Setters', email: 'support@trendsetters.com', products: 178, revenue: '$52,100', status: 'Active', joined: '2024-01-21' },
];

const reportedContent = [
  { type: 'Post', reporter: 'user_8421', reason: 'Inappropriate content', status: 'Under Review', date: '2024-01-28' },
  { type: 'Comment', reporter: 'user_7392', reason: 'Spam', status: 'Resolved', date: '2024-01-28' },
  { type: 'Product', reporter: 'user_9283', reason: 'Counterfeit', status: 'Under Review', date: '2024-01-27' },
  { type: 'User', reporter: 'user_5647', reason: 'Harassment', status: 'Action Taken', date: '2024-01-27' },
];

export function OwnerDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('/owner/dashboard');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20';
      case 'Pending':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20';
      case 'Resolved':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'Under Review':
        return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20';
      case 'Action Taken':
        return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <RoleSidebar
        role="owner"
        activeItem={activeItem}
        collapsed={sidebarCollapsed}
        onItemClick={setActiveItem}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar
          title="Downtown Platform"
          onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Background Orbs */}
          <div className="fixed top-0 left-1/4 w-96 h-96 bg-brand-magenta/20 rounded-full blur-3xl pointer-events-none" />
          <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-brand-coral/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto space-y-6 relative z-10">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Users</p>
                      <p className="text-3xl font-bold mt-2">24,856</p>
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                        <TrendingUp className="inline w-4 h-4 mr-1" />
                        +16.5% this month
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full gradient-bg-purple-pink flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Vendors</p>
                      <p className="text-3xl font-bold mt-2">3,247</p>
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                        <TrendingUp className="inline w-4 h-4 mr-1" />
                        +8.2% this month
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full gradient-bg-pink-coral flex items-center justify-center">
                      <Store className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Products</p>
                      <p className="text-3xl font-bold mt-2">45,632</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        1,247 pending review
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full gradient-bg-coral-yellow flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Platform Revenue</p>
                      <p className="text-3xl font-bold mt-2">$2.4M</p>
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                        <TrendingUp className="inline w-4 h-4 mr-1" />
                        +22.3% this month
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Growth Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={userGrowthData}>
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
                      <Bar dataKey="users" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                      <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6556C6" />
                          <stop offset="100%" stopColor="#D20EC1" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Platform Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Platform Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={platformData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {platformData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--popover))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {platformData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <div>
                          <p className="text-xs text-muted-foreground">{item.name}</p>
                          <p className="text-sm font-semibold">{item.value.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Two Column Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Vendors */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Vendors</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentVendors.map((vendor, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="w-10 h-10 rounded-full gradient-bg-purple-pink flex items-center justify-center flex-shrink-0">
                          <Store className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{vendor.name}</p>
                          <p className="text-sm text-muted-foreground truncate">{vendor.email}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {vendor.products} products • {vendor.revenue}
                          </p>
                        </div>
                        <Badge className={getStatusColor(vendor.status)}>
                          {vendor.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reported Content */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    Content Reports
                  </CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reportedContent.map((report, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{report.type}</TableCell>
                          <TableCell className="text-sm">{report.reason}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(report.status)}>
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(report.date).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
