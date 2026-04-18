import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';

const products = [
  { id: 1, name: 'Premium Leather Jacket', price: 299.99, stock: 45, status: 'Active', sales: 127, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100' },
  { id: 2, name: 'Slim Fit Denim Jeans', price: 79.99, stock: 120, status: 'Active', sales: 234, image: 'https://images.unsplash.com/photo-1542272454315-7fbbb cda0d4d?w=100' },
  { id: 3, name: 'Casual Cotton T-Shirt', price: 29.99, stock: 0, status: 'Out of Stock', sales: 456, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100' },
  { id: 4, name: 'Wool Blend Sweater', price: 89.99, stock: 67, status: 'Active', sales: 189, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100' },
  { id: 5, name: 'Designer Sunglasses', price: 159.99, stock: 15, status: 'Low Stock', sales: 98, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=100' },
];

export function ProductsTab() {
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'Out of Stock':
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'Low Stock':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-effect">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Products Management</CardTitle>
          <Button className="gradient-bg-purple-pink">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filters</Button>
            <Button variant="outline">Sort</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(product.status)}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{product.sales}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
