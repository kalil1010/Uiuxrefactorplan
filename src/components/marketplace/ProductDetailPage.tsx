import React, { useState } from 'react';
import { ArrowLeft, Heart, Share2, ShoppingCart, Star, ChevronLeft, ChevronRight, Minus, Plus, Shield, Truck, RotateCcw, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { TopBar } from '../layout/TopBar';
import { cn } from '@/components/ui/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const productImages = [
  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1496217590455-aa63a8350eea?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop',
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const colors = ['#000000', '#FFFFFF', '#FF6B6B', '#4ECDC4', '#FFD93D'];

const reviews = [
  {
    author: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 5,
    date: '2024-01-25',
    comment: 'Absolutely love this dress! The quality is amazing and it fits perfectly. Highly recommend!',
    helpful: 24
  },
  {
    author: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    rating: 4,
    date: '2024-01-22',
    comment: 'Beautiful dress, true to size. Only wish it came in more colors!',
    helpful: 18
  },
  {
    author: 'Lisa Chen',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop',
    rating: 5,
    date: '2024-01-20',
    comment: 'Perfect for summer! The fabric is lightweight and breathable.',
    helpful: 31
  },
];

const relatedProducts = [
  {
    id: 1,
    name: 'Floral Maxi Dress',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=400&h=500&fit=crop',
    rating: 4.7
  },
  {
    id: 2,
    name: 'Summer Sundress',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop',
    rating: 4.8
  },
  {
    id: 3,
    name: 'Midi Wrap Dress',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1496217590455-aa63a8350eea?w=400&h=500&fit=crop',
    rating: 4.6
  },
  {
    id: 4,
    name: 'Cotton Day Dress',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop',
    rating: 4.9
  },
];

export function ProductDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />

      {/* Background Orbs */}
      <div className="fixed top-0 left-1/3 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Button>

        {/* Product Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 group">
              <img
                src={productImages[currentImageIndex]}
                alt="Product"
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 glass opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={prevImage}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 glass opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={nextImage}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      index === currentImageIndex ? "w-8 bg-white" : "bg-white/50"
                    )}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={cn(
                    "aspect-square rounded-lg overflow-hidden border-2 transition-all",
                    index === currentImageIndex ? "border-primary" : "border-transparent"
                  )}
                >
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="sticky top-6">
              {/* Vendor */}
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop" />
                  <AvatarFallback>FH</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">Fashion House Co.</p>
                  <p className="text-sm text-muted-foreground">Premium Seller</p>
                </div>
                <Button variant="outline" size="sm">
                  <Store className="w-4 h-4 mr-2" />
                  Visit Shop
                </Button>
              </div>

              <Separator className="my-4" />

              {/* Title and Rating */}
              <h1 className="text-4xl font-bold mb-4">Summer Floral Dress</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">4.8 (245 reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold gradient-text-purple-pink">$89.99</span>
                <span className="text-2xl text-muted-foreground line-through">$129.99</span>
                <Badge className="bg-destructive text-white">31% OFF</Badge>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6">
                Elevate your summer wardrobe with this stunning floral dress. Made from premium lightweight fabric, 
                it features a flattering silhouette that's perfect for any occasion. The vibrant floral pattern 
                adds a touch of elegance while keeping you comfortable all day long.
              </p>

              {/* Size Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Size</label>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'default' : 'outline'}
                      className={cn(
                        "w-12",
                        selectedSize === size && "gradient-bg text-white"
                      )}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Color</label>
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "w-10 h-10 rounded-full border-2 transition-all",
                        selectedColor === color ? "border-primary scale-110" : "border-muted"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">Only 12 left in stock</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <Button className="flex-1 gradient-bg text-white" size="lg">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={cn(isWishlisted && "text-red-500")}
                >
                  <Heart className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center p-4 rounded-lg bg-muted/30">
                  <Truck className="w-6 h-6 text-primary mb-2" />
                  <span className="text-xs text-center">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg bg-muted/30">
                  <RotateCcw className="w-6 h-6 text-primary mb-2" />
                  <span className="text-xs text-center">30-Day Returns</span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg bg-muted/30">
                  <Shield className="w-6 h-6 text-primary mb-2" />
                  <span className="text-xs text-center">Secure Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <Card className="mb-12">
          <Tabs defaultValue="description" className="p-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews (245)</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Product Details</h3>
                <ul>
                  <li>Premium lightweight fabric</li>
                  <li>Flattering A-line silhouette</li>
                  <li>Vibrant floral print</li>
                  <li>Adjustable straps for perfect fit</li>
                  <li>Machine washable</li>
                  <li>Made with sustainable materials</li>
                </ul>
                <h3>Materials</h3>
                <p>100% Cotton, Eco-friendly dyes</p>
                <h3>Care Instructions</h3>
                <p>Machine wash cold, tumble dry low, iron if needed</p>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-lg bg-muted/30">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={review.avatar} />
                      <AvatarFallback>{review.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{review.author}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={cn(
                                "w-4 h-4",
                                i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-muted"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-foreground mb-3">{review.comment}</p>
                      <Button variant="ghost" size="sm">
                        Helpful ({review.helpful})
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Shipping Information</h3>
                <ul>
                  <li>Free standard shipping on orders over $50</li>
                  <li>Express shipping available for $15</li>
                  <li>International shipping available to select countries</li>
                  <li>Orders processed within 1-2 business days</li>
                  <li>Estimated delivery: 3-7 business days</li>
                </ul>
                <h3>Returns & Exchanges</h3>
                <ul>
                  <li>30-day return policy</li>
                  <li>Items must be unworn and in original condition</li>
                  <li>Free return shipping for exchanges</li>
                  <li>Refunds processed within 5-7 business days</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Related Products */}
        <div>
          <h2 className="text-3xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold gradient-text-purple-pink">
                      ${product.price}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm">{product.rating}</span>
                    </div>
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
