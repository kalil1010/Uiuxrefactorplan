import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Heart, ShoppingCart, X } from 'lucide-react';

const savedItems = {
  all: [
    { id: 1, type: 'outfit', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400', title: 'Summer Outfit', author: 'Sarah J.' },
    { id: 2, type: 'product', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400', title: 'White Sneakers', price: '$89' },
    { id: 3, type: 'post', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400', likes: 2400, author: 'Emma W.' },
    { id: 4, type: 'outfit', image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400', title: 'Casual Look', author: 'Mike C.' },
    { id: 5, type: 'product', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400', title: 'Denim Jacket', price: '$129' },
    { id: 6, type: 'post', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400', likes: 1800, author: 'Lisa A.' },
    { id: 7, type: 'outfit', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400', title: 'Evening Wear', author: 'Alex T.' },
    { id: 8, type: 'product', image: 'https://images.unsplash.com/photo-1584735175097-719d848f8449?w=400', title: 'Handbag', price: '$199' },
  ],
};

export default function SavedPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [removingId, setRemovingId] = useState<number | null>(null);

  const filterItems = (type?: string) => {
    if (!type || type === 'all') return savedItems.all;
    return savedItems.all.filter(item => item.type === type);
  };

  const handleRemove = (id: number) => {
    setRemovingId(id);
    setTimeout(() => {
      setRemovingId(null);
    }, 500);
  };

  const filteredItems = filterItems(activeTab);

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
            <h1 className="text-xl font-bold gradient-text-purple-pink">Saved</h1>
            <p className="text-sm text-muted-foreground">{filteredItems.length} items</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="outfit">Outfits</TabsTrigger>
            <TabsTrigger value="product">Products</TabsTrigger>
            <TabsTrigger value="post">Posts</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className={`glass-effect overflow-hidden group cursor-pointer hover:scale-105 transition-all ${
                      removingId === item.id ? 'opacity-0 scale-90' : ''
                    }`}
                  >
                    <div className="relative aspect-square">
                      <img
                        src={item.image}
                        alt={item.title || 'Saved item'}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(item.id);
                          }}
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>
                      {item.type === 'post' && (
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-sm bg-black/50 rounded-full px-2 py-1">
                          <Heart className="w-4 h-4" />
                          <span>{item.likes?.toLocaleString()}</span>
                        </div>
                      )}
                      {item.type === 'product' && (
                        <div className="absolute top-2 right-2 bg-black/70 text-white rounded-full px-3 py-1 text-sm font-semibold">
                          {item.price}
                        </div>
                      )}
                    </div>
                    <CardContent className="p-3">
                      <p className="font-semibold truncate">{item.title || 'Untitled'}</p>
                      <p className="text-sm text-muted-foreground truncate">{item.author || 'Unknown'}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-24 h-24 rounded-full gradient-bg-purple-pink flex items-center justify-center mb-6">
                  <Heart className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No saved items</h3>
                <p className="text-muted-foreground mb-6 text-center max-w-md">
                  Save posts, outfits, and products you love to easily find them later
                </p>
                <Button className="gradient-bg-purple-pink">
                  Explore Now
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Stats Cards */}
        {filteredItems.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
            <Card className="glass-effect">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">{savedItems.all.length}</p>
                <p className="text-sm text-muted-foreground">Total Saved</p>
              </CardContent>
            </Card>
            <Card className="glass-effect">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">
                  {savedItems.all.filter(i => i.type === 'outfit').length}
                </p>
                <p className="text-sm text-muted-foreground">Outfits</p>
              </CardContent>
            </Card>
            <Card className="glass-effect">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">
                  {savedItems.all.filter(i => i.type === 'product').length}
                </p>
                <p className="text-sm text-muted-foreground">Products</p>
              </CardContent>
            </Card>
            <Card className="glass-effect">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">
                  {savedItems.all.filter(i => i.type === 'post').length}
                </p>
                <p className="text-sm text-muted-foreground">Posts</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
