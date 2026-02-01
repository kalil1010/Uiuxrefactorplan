import React, { useState } from 'react';
import { ArrowLeft, Heart, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TopBar } from '../layout/TopBar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/components/ui/utils';

const vendor = {
  name: 'Fashion House Co.',
  avatar: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop',
  banner: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=400&fit=crop',
  bio: 'Premium fashion destination for modern style. Curating the finest collection of contemporary clothing and accessories since 2020.',
  followers: '24.5K',
  products: 347,
  rating: 4.8,
  reviews: 1240,
  joined: 'January 2020'
};

const products = [
  {
    id: 1,
    name: 'Summer Floral Dress',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop',
    rating: 4.8,
    sales: 245
  },
  {
    id: 2,
    name: 'Classic Denim Jacket',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
    rating: 4.6,
    sales: 189
  },
  {
    id: 3,
    name: 'White Canvas Sneakers',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop',
    rating: 4.9,
    sales: 412
  },
  {
    id: 4,
    name: 'Leather Crossbody Bag',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=500&fit=crop',
    rating: 4.7,
    sales: 156
  },
  {
    id: 5,
    name: 'Striped Cotton Tee',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
    rating: 4.5,
    sales: 328
  },
  {
    id: 6,
    name: 'High-Waist Jeans',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop',
    rating: 4.8,
    sales: 267
  },
  {
    id: 7,
    name: 'Silk Scarf',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1601924638867-96854938947d?w=400&h=500&fit=crop',
    rating: 4.4,
    sales: 89
  },
  {
    id: 8,
    name: 'Black Leather Boots',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=500&fit=crop',
    rating: 4.9,
    sales: 523
  },
];

export function VendorShopPage() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="min-h-screen bg-background">
      <TopBar />

      {/* Banner */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={vendor.banner}
          alt="Shop banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Vendor Info */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-6 -mt-16 mb-8">
          <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
            <AvatarImage src={vendor.avatar} />
            <AvatarFallback>{vendor.name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{vendor.name}</h1>
                <p className="text-muted-foreground mb-4">{vendor.bio}</p>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="font-bold gradient-text-purple-pink">{vendor.followers}</span>
                    <span className="text-muted-foreground ml-1">Followers</span>
                  </div>
                  <div>
                    <span className="font-bold">{vendor.products}</span>
                    <span className="text-muted-foreground ml-1">Products</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-bold">{vendor.rating}</span>
                    <span className="text-muted-foreground">({vendor.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={isFollowing ? 'outline' : 'default'}
                  className={cn(!isFollowing && "gradient-bg text-white")}
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  <Heart className={cn("w-4 h-4 mr-2", isFollowing && "fill-current")} />
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
                <Button variant="outline">Message</Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <p className="text-2xl font-bold gradient-text-purple-pink">
                  ${(42850).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Sales</p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-2xl font-bold gradient-text-purple-pink">98%</p>
                <p className="text-sm text-muted-foreground">Positive Reviews</p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-2xl font-bold gradient-text-purple-pink">24h</p>
                <p className="text-sm text-muted-foreground">Avg. Response</p>
              </Card>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Shop Products</h2>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Product Grid */}
          <div className={cn(
            "grid gap-6",
            viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"
          )}>
            {products.map((product) => (
              <Card 
                key={product.id}
                className={cn(
                  "group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden",
                  viewMode === 'grid' ? "hover:scale-105" : "flex flex-row"
                )}
              >
                <div className={cn(
                  "relative overflow-hidden",
                  viewMode === 'grid' ? "aspect-[4/5]" : "w-48 h-48"
                )}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.originalPrice && (
                    <Badge className="absolute top-3 left-3 bg-destructive text-white">
                      SALE
                    </Badge>
                  )}
                </div>

                <div className={cn("p-4", viewMode === 'list' && "flex-1 flex flex-col justify-center")}>
                  <h3 className="font-semibold mb-2 line-clamp-1">{product.name}</h3>
                  
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating) ? "text-yellow-500" : "text-muted"}>
                        ★
                      </span>
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">
                      ({product.sales} sold)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-bold gradient-text-purple-pink">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
