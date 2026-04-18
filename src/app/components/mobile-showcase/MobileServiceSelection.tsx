import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Scissors, Sparkles, Camera, ChevronRight } from 'lucide-react';

export default function MobileServiceSelection() {
  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden max-w-md mx-auto border-x">
      {/* Content */}
      <div className="flex-1 flex flex-col p-6">
        <div className="text-center mb-8 mt-8">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">AI Stylist Studio</h1>
          <p className="text-muted-foreground">Choose your styling service</p>
        </div>

        <div className="space-y-4 flex-1">
          {[
            { id: 'hair', title: 'Hair Stylist', desc: 'Find your perfect hairstyle', icon: Scissors, gradient: 'from-purple-500 to-purple-600' },
            { id: 'nails', title: 'Nail Artist', desc: 'Design beautiful nails', icon: Sparkles, gradient: 'from-pink-500 to-pink-600' },
            { id: 'tryon', title: 'Virtual Try-On', desc: 'Try outfits instantly', icon: Camera, gradient: 'from-orange-500 to-orange-600' }
          ].map(({ id, title, desc, icon: Icon, gradient }) => (
            <Card key={id} className="cursor-pointer hover:shadow-lg transition-shadow border-2">
              <CardContent className="p-0">
                <div className="flex items-center gap-4 p-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text-purple-pink">98%</div>
            <div className="text-xs text-muted-foreground mt-1">Match Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text-purple-pink">500K+</div>
            <div className="text-xs text-muted-foreground mt-1">Styles</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text-purple-pink">4.9★</div>
            <div className="text-xs text-muted-foreground mt-1">Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}
