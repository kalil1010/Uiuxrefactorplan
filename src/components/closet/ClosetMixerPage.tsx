import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Shuffle, Save, Share2, Sparkles, Download } from 'lucide-react';

const closetItems = [
  { id: 1, name: 'White T-Shirt', category: 'Tops', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300' },
  { id: 2, name: 'Blue Denim Jeans', category: 'Bottoms', image: 'https://images.unsplash.com/photo-1542272454315-7fbb7cda0d4d?w=300' },
  { id: 3, name: 'Leather Jacket', category: 'Outerwear', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300' },
  { id: 4, name: 'Sneakers', category: 'Shoes', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300' },
  { id: 5, name: 'Summer Dress', category: 'Dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300' },
  { id: 6, name: 'Blazer', category: 'Outerwear', image: 'https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=300' },
];

export default function ClosetMixerPage() {
  const [selectedItems, setSelectedItems] = useState<number[]>([1, 2, 3]);

  const toggleItem = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Background Orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-brand-magenta/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge className="gradient-bg-purple-pink text-white">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered
          </Badge>
          <h1 className="text-4xl font-bold gradient-text-purple-pink">
            Closet Mixer
          </h1>
          <p className="text-xl text-muted-foreground">
            Mix and match items from your closet to create the perfect outfit
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Closet Items */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Your Closet</CardTitle>
              <p className="text-sm text-muted-foreground">
                Select items to create your outfit
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {closetItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative group cursor-pointer"
                    onClick={() => toggleItem(item.id)}
                  >
                    <div className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedItems.includes(item.id)
                        ? 'border-primary shadow-lg'
                        : 'border-transparent'
                    }`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          className="bg-white shadow-lg"
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                <Shuffle className="w-4 h-4 mr-2" />
                Random Mix
              </Button>
            </CardContent>
          </Card>

          {/* Right Column - Outfit Preview */}
          <Card className="glass-effect sticky top-6">
            <CardHeader>
              <CardTitle>Outfit Preview</CardTitle>
              <p className="text-sm text-muted-foreground">
                {selectedItems.length} items selected
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedItems.length > 0 ? (
                <>
                  <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-muted/50 to-muted p-6 flex flex-col items-center justify-center gap-4">
                    {closetItems
                      .filter(item => selectedItems.includes(item.id))
                      .map((item) => (
                        <div key={item.id} className="w-full max-w-xs aspect-square rounded-lg overflow-hidden shadow-lg">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Outfit Items:</h4>
                    <div className="space-y-2">
                      {closetItems
                        .filter(item => selectedItems.includes(item.id))
                        .map((item) => (
                          <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded object-cover"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.category}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="gradient-bg-purple-pink flex-1">
                      <Save className="w-4 h-4 mr-2" />
                      Save Combo
                    </Button>
                    <Button variant="outline">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="aspect-[3/4] rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Select items from your closet to create an outfit
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
