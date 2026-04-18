import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, ShoppingCart, Trash2, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const wishlistItems = [
  { id: 1, image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400', name: 'Classic White Sneakers', brand: 'Fashion House', price: 89, inStock: true, rating: 4.5 },
  { id: 2, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400', name: 'Vintage Denim Jacket', brand: 'Urban Style', price: 129, inStock: true, rating: 4.8 },
  { id: 3, image: 'https://images.unsplash.com/photo-1584735175097-719d848f8449?w=400', name: 'Leather Handbag', brand: 'Luxury Lane', price: 199, inStock: false, rating: 4.7 },
  { id: 4, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', name: 'Summer Dress', brand: 'Floral Co', price: 79, inStock: true, rating: 4.6 },
  { id: 5, image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400', name: 'Sunglasses', brand: 'Style Hub', price: 65, inStock: true, rating: 4.4 },
  { id: 6, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400', name: 'Ankle Boots', brand: 'Shoe Paradise', price: 149, inStock: true, rating: 4.9 },
];

export default function WishlistPage() {
  const [items, setItems] = useState(wishlistItems);
  const [removingId, setRemovingId] = useState<number | null>(null);

  const handleRemove = (id: number) => {
    setRemovingId(id);
    setTimeout(() => {
      setItems(items.filter(item => item.id !== id));
      setRemovingId(null);
    }, 300);
  };

  const totalValue = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      {/* Background Orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-brand-magenta/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-brand-coral/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="sticky top-0 z-40 glass-effect border-b px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold gradient-text-purple-pink">My Wishlist</h1>
            <p className="text-sm text-muted-foreground">{items.length} items • ${totalValue}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {items.length > 0 ? (
          <>
            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Card
                  key={item.id}
                  className={`glass-effect overflow-hidden group transition-all ${
                    removingId === item.id ? 'opacity-0 scale-90' : ''
                  }`}
                >
                  <div className="relative aspect-[3/4]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 dark:bg-black/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {!item.inStock && (
                      <div className="absolute top-2 left-2">
                        <Badge variant="destructive">Out of Stock</Badge>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                      <div className="flex items-center gap-1 text-sm mb-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-400'}>
                            ★
                          </span>
                        ))}
                        <span className="ml-1">({item.rating})</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">{item.brand}</p>
                      <h3 className="font-semibold truncate">{item.name}</h3>
                      <p className="text-xl font-bold gradient-text-purple-pink mt-1">
                        ${item.price}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 gradient-bg-purple-pink" 
                        disabled={!item.inStock}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemove(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Summary Card */}
            <Card className="glass-effect">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Wishlist Summary</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Total Items: {items.length}</p>
                      <p>In Stock: {items.filter(i => i.inStock).length}</p>
                      <p>Total Value: <span className="font-bold text-foreground">${totalValue}</span></p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto">
                      Share Wishlist
                    </Button>
                    <Button className="gradient-bg-purple-pink w-full sm:w-auto">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add All to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 rounded-full gradient-bg-purple-pink flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Your wishlist is empty</h3>
            <p className="text-muted-foreground mb-6 text-center max-w-md">
              Save your favorite items to your wishlist and shop them later
            </p>
            <Button className="gradient-bg-purple-pink">
              Browse Marketplace
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
