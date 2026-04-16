import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Scissors, 
  Sparkles, 
  Camera,
  Heart,
  Eye,
  ChevronLeft,
  Star,
  X,
  MessageCircle,
  Bookmark,
  ChevronRight
} from 'lucide-react';

type ServiceType = 'hair' | 'nails' | 'tryon';

export default function VirtualStylistMobileSimple() {
  const [service, setService] = useState<ServiceType | null>(null);

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Top Navigation */}
      {service && (
        <div className="bg-background border-b px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setService(null)} className="rounded-full">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="font-semibold text-lg">
            {service === 'hair' ? 'Hair Stylist' : service === 'nails' ? 'Nail Artist' : 'Virtual Try-On'}
          </h1>
          <div className="w-10" />
        </div>
      )}

      {/* Service Selection */}
      {!service && (
        <div className="flex-1 flex flex-col p-6">
          <div className="text-center mb-8 mt-8">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">AI Stylist Studio</h1>
            <p className="text-muted-foreground">Choose your styling service</p>
          </div>

          <div className="space-y-4 flex-1">
            {[
              { id: 'hair' as const, title: 'Hair Stylist', desc: 'Find your perfect hairstyle', icon: Scissors, color: '#8B5CF6' },
              { id: 'nails' as const, title: 'Nail Artist', desc: 'Design beautiful nails', icon: Sparkles, color: '#EC4899' },
              { id: 'tryon' as const, title: 'Virtual Try-On', desc: 'Try outfits instantly', icon: Camera, color: '#3B82F6' }
            ].map(({ id, title, desc, icon: Icon, color }) => (
              <Card key={id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setService(id)}>
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 p-4">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + '20' }}>
                      <Icon className="w-8 h-8" style={{ color }} />
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

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text-purple-pink">98%</div>
              <div className="text-xs text-muted-foreground">Match Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text-purple-pink">500K+</div>
              <div className="text-xs text-muted-foreground">Styles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text-purple-pink">4.9★</div>
              <div className="text-xs text-muted-foreground">Rating</div>
            </div>
          </div>
        </div>
      )}

      {/* Camera View */}
      {service && (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-black relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white p-6">
                <Camera className="w-20 h-20 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">
                  {service === 'hair' ? 'Take a selfie' : service === 'nails' ? 'Photo of your hands' : 'Full body photo'}
                </p>
                <p className="text-sm opacity-75">Position yourself in the frame</p>
              </div>
            </div>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 border-2 border-white/30 rounded-3xl" />
            </div>
          </div>

          <div className="bg-black text-white p-6">
            <Button size="lg" className="w-full h-14 rounded-full text-base font-semibold gradient-bg">
              <Camera className="w-5 h-5 mr-2" />
              Take Photo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
