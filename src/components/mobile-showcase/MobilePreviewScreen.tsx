import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  ChevronDown, 
  Heart, 
  Share2, 
  Star, 
  TrendingUp, 
  ThumbsUp, 
  Bookmark,
  MessageCircle,
  CheckCircle2,
  Lightbulb
} from 'lucide-react';

export default function MobilePreviewScreen() {
  const [isFavorite, setIsFavorite] = useState(false);

  const style = {
    name: 'Long Layers',
    category: 'Long',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=600&fit=crop',
    matchScore: 98,
    description: 'Flowing layers with natural movement',
    tags: ['versatile', 'elegant', 'easy-maintain'],
    popularity: 92,
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden max-w-md mx-auto border-x">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/60 to-transparent p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
            <ChevronDown className="w-6 h-6" />
          </Button>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full text-white hover:bg-white/20"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative bg-black h-1/2 flex-shrink-0">
        <img
          src={style.image}
          alt={style.name}
          className="w-full h-full object-contain"
        />
        
        {/* Match Badge */}
        <div className="absolute bottom-4 left-4">
          <Badge className="gradient-bg text-white border-0 px-4 py-2 shadow-lg">
            <Star className="w-4 h-4 mr-2" />
            {style.matchScore}% Perfect Match
          </Badge>
        </div>
      </div>

      {/* Scrollable Details */}
      <div className="flex-1 bg-background rounded-t-3xl -mt-6 relative z-10 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Title & Category */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-3xl font-bold flex-1">{style.name}</h1>
              <Badge variant="secondary" className="ml-3">
                {style.category}
              </Badge>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {style.description}
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">{style.popularity}% Popular</span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Highly Rated</span>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="font-semibold mb-3">Style Tags</h3>
            <div className="flex flex-wrap gap-2">
              {style.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="px-3 py-1">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Why It Works */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Why This Works for You</h3>
            </div>
            <div className="space-y-3">
              {[
                {
                  title: 'Complements Your Features',
                  desc: 'This style enhances your natural features and proportions',
                },
                {
                  title: 'Matches Your Tone',
                  desc: 'Works beautifully with your undertones',
                },
                {
                  title: 'Suits Your Lifestyle',
                  desc: 'Easy to maintain and versatile',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Similar Styles */}
          <div>
            <h3 className="font-semibold mb-3">Similar Styles</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-shrink-0 w-24 h-32 rounded-xl overflow-hidden border">
                  <img
                    src={style.image}
                    alt={`Similar ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom spacing for fixed buttons */}
          <div className="h-20" />
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-background border-t p-4 flex gap-3 z-20">
        <Button variant="outline" className="flex-1" size="lg">
          <MessageCircle className="w-5 h-5 mr-2" />
          Ask Expert
        </Button>
        <Button className="flex-1 gradient-bg" size="lg">
          <Bookmark className="w-5 h-5 mr-2" />
          Save Style
        </Button>
      </div>
    </div>
  );
}
