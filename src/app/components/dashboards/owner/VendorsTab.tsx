import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Store, MoreVertical, DollarSign, Package } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const vendors = [
  { id: 1, logo: '🏪', name: 'Fashion House Co.', email: 'contact@fashionhouse.com', status: 'Active', products: 145, revenue: 42350, joined: '2024-01-15' },
  { id: 2, logo: '👗', name: 'Style Boutique', email: 'info@styleboutique.com', status: 'Active', products: 89, revenue: 28750, joined: '2024-01-10' },
  { id: 3, logo: '👔', name: 'Urban Threads', email: 'hello@urbanthreads.com', status: 'Active', products: 234, revenue: 65420, joined: '2024-01-20' },
  { id: 4, logo: '💎', name: 'Luxury Lane', email: 'contact@luxurylane.com', status: 'Pending', products: 56, revenue: 18900, joined: '2024-01-08' },
  { id: 5, logo: '🎽', name: 'Athletic Wear Plus', email: 'support@athleticwear.com', status: 'Active', products: 178, revenue: 52100, joined: '2024-01-05' },
  { id: 6, logo: '👞', name: 'Shoe Paradise', email: 'info@shoeparadise.com', status: 'Active', products: 312, revenue: 78340, joined: '2024-01-12' },
  { id: 7, logo: '👜', name: 'Bag Emporium', email: 'hello@bagemporium.com', status: 'Suspended', products: 67, revenue: 15200, joined: '2024-01-25' },
  { id: 8, logo: '🕶️', name: 'Accessory Hub', email: 'contact@accessoryhub.com', status: 'Active', products: 421, revenue: 94650, joined: '2023-12-20' },
];

export function VendorsTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         vendor.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vendor.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20';
      case 'Pending':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20';
      case 'Suspended':
        return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold gradient-text-purple-pink">Vendor Management</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage all platform vendors</p>
        </div>
        <Button className="gradient-bg-purple-pink">
          <Store className="w-4 h-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      {/* Filters */}
      <Card className="glass-effect">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Vendors Table */}
      <Card className="glass-effect">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Business</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg gradient-bg-purple-pink flex items-center justify-center text-lg">
                          {vendor.logo}
                        </div>
                        <span className="font-medium">{vendor.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{vendor.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Package className="w-4 h-4" />
                        <span>{vendor.products}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 font-semibold text-green-600 dark:text-green-400">
                        <DollarSign className="w-4 h-4" />
                        <span>{vendor.revenue.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(vendor.status)}>{vendor.status}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(vendor.joined).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>View Products</DropdownMenuItem>
                          <DropdownMenuItem>Contact Vendor</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Suspend Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-effect">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Vendors</p>
            <p className="text-2xl font-bold mt-1">3,247</p>
          </CardContent>
        </Card>
        <Card className="glass-effect">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Active Vendors</p>
            <p className="text-2xl font-bold mt-1">2,985</p>
          </CardContent>
        </Card>
        <Card className="glass-effect">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold mt-1">$2.4M</p>
          </CardContent>
        </Card>
        <Card className="glass-effect">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pending Approval</p>
            <p className="text-2xl font-bold mt-1">42</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
