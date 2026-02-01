import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, Bookmark, Share2, Edit2, Plus } from 'lucide-react';

const collectionItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600',
    title: 'Minimalist White Sneakers',
    author: '@fashion_lover',
    likes: 234
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=600',
    title: 'Vintage Leather Jacket',
    author: '@style_guru',
    likes: 456
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600',
    title: 'Elegant Summer Dress',
    author: '@chic_queen',
    likes: 789
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
    title: 'Modern Crossbody Bag',
    author: '@bag_enthusiast',
    likes: 321
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600',
    title: 'Classic Black Sunglasses',
    author: '@accessories_hub',
    likes: 567
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600',
    title: 'Premium Denim Jacket',
    author: '@denim_daily',
    likes: 432
  },
];

export default function CollectionDetailPage() {
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
          <h1 className="text-xl font-bold gradient-text-purple-pink">Collection</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Collection Hero */}
        <Card className="glass-effect mb-8">
          <div className="aspect-[21/6] relative overflow-hidden rounded-t-lg">
            <img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200"
              alt="Collection cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Minimalist Essentials</h2>
                    <p className="text-muted-foreground max-w-2xl">
                      A curated collection of timeless pieces that embody minimalist fashion. 
                      Clean lines, neutral colors, and versatile items that never go out of style.
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                    <AvatarFallback>EW</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">Emma Wilson</p>
                    <p className="text-sm text-muted-foreground">@emma.minimal</p>
                  </div>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Follow
                  </Button>
                  <Button className="gradient-bg-purple-pink">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Collection
                  </Button>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold">{collectionItems.length}</span>
                    <span className="text-muted-foreground">items</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold">2,456</span>
                    <span className="text-muted-foreground">saves</span>
                  </div>
                  <Badge>Minimalist</Badge>
                  <Badge variant="outline">Curated</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Collection Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collectionItems.map((item) => (
            <Card key={item.id} className="glass-effect group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-1 line-clamp-1">{item.title}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{item.author}</span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Heart className="w-4 h-4" />
                    {item.likes}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
