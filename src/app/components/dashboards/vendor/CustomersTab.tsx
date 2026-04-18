import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Mail, TrendingUp } from 'lucide-react';

const customers = [
  { id: 1, name: 'Emma Wilson', email: 'emma.w@email.com', avatar: 'https://i.pravatar.cc/150?img=1', orders: 12, spent: '$1,847' },
  { id: 2, name: 'Liam Chen', email: 'liam.c@email.com', avatar: 'https://i.pravatar.cc/150?img=12', orders: 8, spent: '$956' },
  { id: 3, name: 'Sophia Martinez', email: 'sophia.m@email.com', avatar: 'https://i.pravatar.cc/150?img=5', orders: 15, spent: '$2,145' },
  { id: 4, name: 'Noah Anderson', email: 'noah.a@email.com', avatar: 'https://i.pravatar.cc/150?img=13', orders: 6, spent: '$743' },
  { id: 5, name: 'Olivia Taylor', email: 'olivia.t@email.com', avatar: 'https://i.pravatar.cc/150?img=9', orders: 20, spent: '$3,291' },
];

export function CustomersTab() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Customers</p>
                <p className="text-3xl font-bold mt-2">1,847</p>
                <p className="text-sm text-green-600 mt-1">
                  <TrendingUp className="inline w-4 h-4 mr-1" />
                  +12.5% this month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Repeat Customers</p>
                <p className="text-3xl font-bold mt-2">67%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Order Value</p>
                <p className="text-3xl font-bold mt-2">$127</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Top Customers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-4">
            {customers.map((customer) => (
              <div key={customer.id} className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={customer.avatar} />
                  <AvatarFallback>{customer.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{customer.name}</p>
                  <p className="text-sm text-muted-foreground">{customer.email}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{customer.spent}</p>
                  <p className="text-sm text-muted-foreground">{customer.orders} orders</p>
                </div>
                <Button variant="ghost" size="icon">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
