import React, { useState } from 'react';
import { RoleSidebar } from '../layout/RoleSidebar';
import { TopBar } from '../layout/TopBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Package, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  FileText
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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ProductsTab } from './vendor/ProductsTab';
import { OrdersTab } from './vendor/OrdersTab';
import { CustomersTab } from './vendor/CustomersTab';
import { AnalyticsTab } from './vendor/AnalyticsTab';
import { ReviewsTab } from './vendor/ReviewsTab';
import { PromotionsTab } from './vendor/PromotionsTab';
import { SupportTab } from './vendor/SupportTab';
import { SettingsTab } from './vendor/SettingsTab';

const revenueData = [
  { month: 'Jan', revenue: 4200 },
  { month: 'Feb', revenue: 5800 },
  { month: 'Mar', revenue: 7200 },
  { month: 'Apr', revenue: 6500 },
  { month: 'May', revenue: 8900 },
  { month: 'Jun', revenue: 9500 },
];

const recentOrders = [
  { id: '#12845', customer: 'Sarah Johnson', product: 'Summer Dress', amount: '$89.99', status: 'Delivered', date: '2024-01-28' },
  { id: '#12844', customer: 'Mike Chen', product: 'Leather Jacket', amount: '$249.99', status: 'Shipped', date: '2024-01-28' },
  { id: '#12843', customer: 'Emma Wilson', product: 'Sneakers', amount: '$129.99', status: 'Processing', date: '2024-01-27' },
  { id: '#12842', customer: 'David Lee', product: 'Sunglasses', amount: '$59.99', status: 'Pending', date: '2024-01-27' },
  { id: '#12841', customer: 'Lisa Brown', product: 'Handbag', amount: '$179.99', status: 'Delivered', date: '2024-01-26' },
];

const topProducts = [
  { name: 'Summer Floral Dress', sales: 145, revenue: '$12,905', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100&h=100&fit=crop' },
  { name: 'Classic Denim Jacket', sales: 128, revenue: '$10,240', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&h=100&fit=crop' },
  { name: 'White Sneakers', sales: 112, revenue: '$14,560', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop' },
  { name: 'Leather Crossbody Bag', sales: 98, revenue: '$17,640', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=100&h=100&fit=crop' },
];

export function VendorDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('/vendor/dashboard');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20';
      case 'Shipped':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'Processing':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20';
      case 'Pending':
        return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const renderContent = () => {
    switch (activeItem) {
      case '/vendor/products':
        return <ProductsTab />;
      
      case '/vendor/orders':
        return <OrdersTab />;
      
      case '/vendor/customers':
        return <CustomersTab />;
      
      case '/vendor/analytics':
        return <AnalyticsTab />;
      
      case '/vendor/reviews':
        return <ReviewsTab />;
      
      case '/vendor/promotions':
        return <PromotionsTab />;
      
      case '/vendor/support':
        return <SupportTab />;
      
      case '/vendor/settings':
        return <SettingsTab />;
      
      case '/vendor/dashboard':
      default:
        return (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                      <p className="text-3xl font-bold mt-2">$42,350</p>
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                        <TrendingUp className="inline w-4 h-4 mr-1" />
                        +12.5% from last month
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
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                      <p className="text-3xl font-bold mt-2">1,284</p>
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                        <TrendingUp className="inline w-4 h-4 mr-1" />
                        +8.3% from last month
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full gradient-bg-pink-coral flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Products Listed</p>
                      <p className="text-3xl font-bold mt-2">347</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        24 pending review
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full gradient-bg-coral-yellow flex items-center justify-center">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg. Order Value</p>
                      <p className="text-3xl font-bold mt-2">$156</p>
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                        <TrendingUp className="inline w-4 h-4 mr-1" />
                        +5.2% from last month
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
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
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="url(#colorGradient)" 
                      strokeWidth={3}
                      dot={{ fill: '#6556C6', r: 4 }}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#6556C6" />
                        <stop offset="100%" stopColor="#D20EC1" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Two Column Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Orders</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.amount}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Update Status
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Top Products</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {product.sales} sales
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold gradient-text-purple-pink">
                            {product.revenue}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <RoleSidebar
        role="vendor"
        activeItem={activeItem}
        collapsed={sidebarCollapsed}
        onItemClick={setActiveItem}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar
          title="Atlas Dashboard"
          onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Background Orbs */}
          <div className="fixed top-0 right-0 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none" />
          <div className="fixed bottom-0 left-1/3 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto space-y-6 relative z-10">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}