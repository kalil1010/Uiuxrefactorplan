import React, { useState } from 'react';
import { Search, SlidersHorizontal, Heart, ShoppingCart, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { TopBar } from '../layout/TopBar';
import { cn } from '@/components/ui/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const categories = ['All', 'Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Shoes', 'Accessories'];
const priceRanges = ['All Prices', 'Under $50', '$50-$100', '$100-$200', 'Over $200'];
const brands = ['All Brands', 'Zara', 'H&M', 'Nike', 'Adidas', 'Gucci', 'Prada'];
const sizes = ['All Sizes', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

const products = [
  {
    id: 1,
    name: 'Summer Floral Dress',
    price: 89.99,
    originalPrice: 129.99,
    vendor: 'Fashion House',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop',
    rating: 4.8,
    reviews: 245,
    discount: 31
  },
  {
    id: 2,
    name: 'Classic Denim Jacket',
    price: 149.99,
    vendor: 'Urban Style',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
    rating: 4.6,
    reviews: 189
  },
  {
    id: 3,
    name: 'White Canvas Sneakers',
    price: 79.99,
    vendor: 'Footwear Co',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop',
    rating: 4.9,
    reviews: 412
  },
  {
    id: 4,
    name: 'Leather Crossbody Bag',
    price: 199.99,
    vendor: 'Luxury Lane',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=500&fit=crop',
    rating: 4.7,
    reviews: 156
  },
  {
    id: 5,
    name: 'Striped Cotton Tee',
    price: 29.99,
    vendor: 'Basics Co',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
    rating: 4.5,
    reviews: 328
  },
  {
    id: 6,
    name: 'High-Waist Jeans',
    price: 119.99,
    vendor: 'Denim Dreams',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop',
    rating: 4.8,
    reviews: 267
  },
  {
    id: 7,
    name: 'Silk Scarf',
    price: 49.99,
    vendor: 'Accessories Plus',
    image: 'https://images.unsplash.com/photo-1601924638867-96854938947d?w=400&h=500&fit=crop',
    rating: 4.4,
    reviews: 89
  },
  {
    id: 8,
    name: 'Black Leather Boots',
    price: 249.99,
    vendor: 'Footwear Co',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=500&fit=crop',
    rating: 4.9,
    reviews: 523
  },
];

export function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar title="Marketplace" />

      {/* Background Orbs */}
      <div className="fixed top-0 right-1/4 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Search and Filters */}
        <Card className="glass p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search products, brands, styles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex gap-2">
              <Select defaultValue="all-prices">
                <SelectTrigger className="w-[140px] glass">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range} value={range.toLowerCase().replace(/\s+/g, '-')}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select defaultValue="all-brands">
                <SelectTrigger className="w-[140px] glass">
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand.toLowerCase().replace(/\s+/g, '-')}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select defaultValue="all-sizes">
                <SelectTrigger className="w-[120px] glass">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  {sizes.map((size) => (
                    <SelectItem key={size} value={size.toLowerCase().replace(/\s+/g, '-')}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" className="glass">
                <SlidersHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={cn(
                  "cursor-pointer whitespace-nowrap transition-all",
                  selectedCategory === category 
                    ? "gradient-bg text-white" 
                    : "hover:bg-accent/10"
                )}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{products.length}</span> products
          </p>
          <Select defaultValue="popular">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Discount Badge */}
                {product.discount && (
                  <Badge className="absolute top-3 left-3 bg-destructive text-white">
                    -{product.discount}%
                  </Badge>
                )}

                {/* Wishlist Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "absolute top-3 right-3 glass hover:bg-background/80",
                    wishlist.includes(product.id) && "text-red-500"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                >
                  <Heart 
                    className="w-5 h-5" 
                    fill={wishlist.includes(product.id) ? 'currentColor' : 'none'}
                  />
                </Button>

                {/* Quick Add to Cart */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button className="w-full gradient-bg text-white" size="sm">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>

              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-1">{product.vendor}</p>
                <h3 className="font-semibold mb-2 line-clamp-1">{product.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating) ? "text-yellow-500" : "text-muted"}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>

                {/* Price */}
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

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-12">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <Button variant="outline" className="gradient-bg text-white">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">4</Button>
          <Button variant="outline">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
