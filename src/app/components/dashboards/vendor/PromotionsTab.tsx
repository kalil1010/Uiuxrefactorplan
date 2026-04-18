import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, TrendingUp } from 'lucide-react';

const promotions = [
  { id: 1, name: 'Summer Sale 2024', discount: '25%', code: 'SUMMER25', used: 234, revenue: '$12,450', status: 'Active', expires: '2024-08-31' },
  { id: 2, name: 'New Customer Offer', discount: '$10 off', code: 'WELCOME10', used: 156, revenue: '$1,560', status: 'Active', expires: '2024-12-31' },
  { id: 3, name: 'Flash Sale', discount: '40%', code: 'FLASH40', used: 892, revenue: '$18,920', status: 'Expired', expires: '2024-01-15' },
];

export function PromotionsTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div>
              <p className="text-sm text-muted-foreground">Active Promotions</p>
              <p className="text-3xl font-bold mt-2">2</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Redemptions</p>
              <p className="text-3xl font-bold mt-2">1,282</p>
              <p className="text-sm text-green-600 mt-1">
                <TrendingUp className="inline w-4 h-4 mr-1" />
                +23% this month
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div>
              <p className="text-sm text-muted-foreground">Revenue Generated</p>
              <p className="text-3xl font-bold mt-2">$32,930</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-effect">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Promotions</CardTitle>
          <Button className="gradient-bg-purple-pink">
            <Plus className="w-4 h-4 mr-2" />
            Create Promotion
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {promotions.map((promo) => (
            <div key={promo.id} className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold">{promo.name}</h4>
                  <Badge variant={promo.status === 'Active' ? 'default' : 'secondary'}>
                    {promo.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Code: <span className="font-mono font-semibold text-foreground">{promo.code}</span></span>
                  <span>•</span>
                  <span>Discount: <span className="font-semibold text-foreground">{promo.discount}</span></span>
                  <span>•</span>
                  <span>Used: <span className="font-semibold text-foreground">{promo.used}</span> times</span>
                  <span>•</span>
                  <span>Revenue: <span className="font-semibold text-foreground">{promo.revenue}</span></span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Expires: {new Date(promo.expires).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
