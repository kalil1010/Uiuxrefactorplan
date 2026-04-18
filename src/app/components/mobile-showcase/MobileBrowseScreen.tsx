import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Heart, X, Eye, Star, ChevronLeft, MoreHorizontal } from 'lucide-react';

const MOCK_STYLES = [
  {
    id: '1',
    name: 'Long Layers',
    category: 'Long',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=600&fit=crop',
    matchScore: 98,
    description: 'Flowing layers with natural movement',
    tags: ['versatile', 'elegant', 'easy-maintain'],
  },
  {
    id: '2',
    name: 'Bob Cut',
    category: 'Medium',
    image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400&h=600&fit=crop',
    matchScore: 94,
    description: 'Classic bob with modern twist',
    tags: ['professional', 'chic', 'low-maintenance'],
  },
];

export default function MobileBrowseScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const currentStyle = MOCK_STYLES[currentIndex];

  const handleSwipeLeft = () => {
    if (currentIndex < MOCK_STYLES.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFavorite(false);
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex < MOCK_STYLES.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFavorite(false);
    }
  };

  if (!currentStyle) {
    return (
      <div className="h-screen bg-background flex items-center justify-center max-w-md mx-auto border-x">
        <div className="text-center p-8">
          <div className="w-16 h-16 rounded-full gradient-bg mx-auto mb-4 flex items-center justify-center">
            <Star className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">All Done!</h2>
          <p className="text-muted-foreground mb-6">You've seen all styles</p>
          <Button onClick={() => setCurrentIndex(0)} className="gradient-bg">
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden max-w-md mx-auto border-x">
      {/* Header */}
      <div className="bg-background border-b px-4 py-3 flex items-center justify-between">
        <Button variant="ghost" size="icon" className="rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <div className="text-center flex-1">
          <h1 className="font-semibold text-base">Recommended for You</h1>
          <p className="text-xs text-muted-foreground">{MOCK_STYLES.length - currentIndex} styles remaining</p>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreHorizontal className="w-6 h-6" />
        </Button>
      </div>

      {/* Card Stack */}
      <div className="flex-1 relative p-4">
        {/* Background Cards */}
        {MOCK_STYLES.slice(currentIndex + 1, currentIndex + 2).map((style, index) => (
          <div
            key={style.id}
            className="absolute inset-4 top-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg"
            style={{
              transform: `scale(${1 - (index + 1) * 0.05}) translateY(${(index + 1) * 10}px)`,
              opacity: 1 - (index + 1) * 0.2,
              zIndex: 0,
            }}
          >
            <img
              src={style.image}
              alt={style.name}
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
        ))}

        {/* Active Card */}
        <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border-2 z-10">
          {/* Image */}
          <div className="relative h-full">
            <img
              src={currentStyle.image}
              alt={currentStyle.name}
              className="w-full h-full object-cover"
            />

            {/* Match Score Badge */}
            {currentStyle.matchScore >= 90 && (
              <div className="absolute top-4 left-4">
                <Badge className="gradient-bg text-white border-0 px-3 py-1.5 shadow-lg">
                  <Star className="w-3 h-3 mr-1.5" />
                  {currentStyle.matchScore}% Match
                </Badge>
              </div>
            )}

            {/* Favorite Button */}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 border-0"
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
            </Button>

            {/* Card Info - Bottom Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-16">
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-2xl font-bold text-white">{currentStyle.name}</h2>
                <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm">
                  {currentStyle.category}
                </Badge>
              </div>
              <p className="text-white/90 text-sm mb-3">{currentStyle.description}</p>
              <div className="flex flex-wrap gap-2">
                {currentStyle.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-white/10 text-white border-white/30 backdrop-blur-sm">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 flex items-center justify-center gap-6">
        {/* Pass Button */}
        <Button
          size="icon"
          variant="outline"
          onClick={handleSwipeLeft}
          className="w-16 h-16 rounded-full border-2 border-red-500 hover:bg-red-50 dark:hover:bg-red-950"
        >
          <X className="w-8 h-8 text-red-500" />
        </Button>

        {/* Preview Button */}
        <Button
          size="icon"
          className="w-20 h-20 rounded-full gradient-bg shadow-2xl"
        >
          <Eye className="w-9 h-9 text-white" />
        </Button>

        {/* Like Button */}
        <Button
          size="icon"
          variant="outline"
          onClick={handleSwipeRight}
          className="w-16 h-16 rounded-full border-2 border-green-500 hover:bg-green-50 dark:hover:bg-green-950"
        >
          <Heart className="w-8 h-8 text-green-500" />
        </Button>
      </div>

      {/* Swipe Hint */}
      <p className="text-center text-xs text-muted-foreground pb-4">
        Swipe right to save • Swipe left to skip • Tap to preview
      </p>
    </div>
  );
}
