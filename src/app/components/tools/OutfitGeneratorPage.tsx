import React, { useState } from 'react';
import { Sparkles, Sun, Cloud, Snowflake, Wind, Shirt, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TopBar } from '../layout/TopBar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/components/ui/utils';
import { Progress } from '@/components/ui/progress';

const occasions = [
  { id: 'casual', label: 'Casual', icon: Shirt },
  { id: 'formal', label: 'Formal', icon: Sparkles },
  { id: 'sport', label: 'Sport', icon: Wind },
  { id: 'party', label: 'Party', icon: Sparkles },
  { id: 'work', label: 'Work', icon: Shirt },
  { id: 'date', label: 'Date Night', icon: Sparkles },
];

const colors = [
  { id: 'black', label: 'Black', value: '#000000' },
  { id: 'white', label: 'White', value: '#FFFFFF' },
  { id: 'beige', label: 'Beige', value: '#D4C5B9' },
  { id: 'blue', label: 'Blue', value: '#4A90E2' },
  { id: 'red', label: 'Red', value: '#E74C3C' },
  { id: 'green', label: 'Green', value: '#2ECC71' },
  { id: 'pink', label: 'Pink', value: '#FF6B9D' },
  { id: 'purple', label: 'Purple', value: '#9B59B6' },
];

const generatedOutfits = [
  {
    id: 1,
    items: [
      { name: 'White Cotton Tee', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop', price: '$29.99' },
      { name: 'Blue Denim Jeans', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=400&fit=crop', price: '$89.99' },
      { name: 'White Sneakers', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop', price: '$79.99' },
    ],
    matchScore: 95,
    style: 'Classic Casual'
  },
  {
    id: 2,
    items: [
      { name: 'Striped Sweater', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=400&fit=crop', price: '$49.99' },
      { name: 'Black Chinos', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=400&fit=crop', price: '$69.99' },
      { name: 'Brown Boots', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=400&fit=crop', price: '$149.99' },
    ],
    matchScore: 88,
    style: 'Smart Casual'
  },
  {
    id: 3,
    items: [
      { name: 'Graphic Tee', image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=400&fit=crop', price: '$34.99' },
      { name: 'Cargo Pants', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300&h=400&fit=crop', price: '$79.99' },
      { name: 'High-Top Sneakers', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=300&h=400&fit=crop', price: '$109.99' },
    ],
    matchScore: 92,
    style: 'Streetwear'
  },
];

type Step = 'occasion' | 'colors' | 'results';

export function OutfitGeneratorPage() {
  const [currentStep, setCurrentStep] = useState<Step>('occasion');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleOccasionSelect = (occasionId: string) => {
    setSelectedOccasion(occasionId);
  };

  const handleColorToggle = (colorId: string) => {
    setSelectedColors(prev =>
      prev.includes(colorId)
        ? prev.filter(id => id !== colorId)
        : [...prev, colorId]
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setCurrentStep('results');
    }, 2000);
  };

  const getStepProgress = () => {
    if (currentStep === 'occasion') return 33;
    if (currentStep === 'colors') return 66;
    return 100;
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar title="AI Outfit Generator" />

      {/* Background Orbs */}
      <div className="fixed top-0 right-1/4 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto p-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <Badge className="px-6 py-2 text-sm gradient-bg text-white">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              AI-Powered
            </Badge>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text-purple-pink">Outfit Generator</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Get personalized outfit recommendations in seconds
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Step {currentStep === 'occasion' ? '1' : currentStep === 'colors' ? '2' : '3'} of 3</span>
            <span className="text-sm text-muted-foreground">{getStepProgress()}% Complete</span>
          </div>
          <Progress value={getStepProgress()} className="h-2" />
        </div>

        {/* Step 1: Select Occasion */}
        {currentStep === 'occasion' && (
          <Card className="p-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">What's the occasion?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {occasions.map((occasion) => {
                const Icon = occasion.icon;
                return (
                  <button
                    key={occasion.id}
                    onClick={() => handleOccasionSelect(occasion.id)}
                    className={cn(
                      "p-6 rounded-xl border-2 transition-all hover:scale-105",
                      selectedOccasion === occasion.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-3" />
                    <p className="font-medium">{occasion.label}</p>
                  </button>
                );
              })}
            </div>
            <Button
              className="w-full gradient-bg text-white"
              size="lg"
              disabled={!selectedOccasion}
              onClick={() => setCurrentStep('colors')}
            >
              Continue
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </Card>
        )}

        {/* Step 2: Select Colors */}
        {currentStep === 'colors' && (
          <Card className="p-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-2">Choose your color preferences</h2>
            <p className="text-muted-foreground mb-6">Select up to 3 colors</p>
            
            <div className="grid grid-cols-4 gap-4 mb-8">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => selectedColors.length < 3 || selectedColors.includes(color.id) ? handleColorToggle(color.id) : null}
                  className={cn(
                    "relative p-4 rounded-xl border-2 transition-all hover:scale-105",
                    selectedColors.includes(color.id)
                      ? "border-primary"
                      : "border-border hover:border-primary/50",
                    selectedColors.length >= 3 && !selectedColors.includes(color.id) && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div
                    className="w-full aspect-square rounded-lg mb-2"
                    style={{ backgroundColor: color.value, border: color.value === '#FFFFFF' ? '1px solid #e5e5e5' : 'none' }}
                  />
                  <p className="text-sm font-medium text-center">{color.label}</p>
                  {selectedColors.includes(color.id) && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setCurrentStep('occasion')}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                className="flex-1 gradient-bg text-white"
                size="lg"
                disabled={selectedColors.length === 0}
                onClick={handleGenerate}
              >
                {isGenerating ? 'Generating...' : 'Generate Outfits'}
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {/* Step 3: Results */}
        {currentStep === 'results' && (
          <div className="animate-fade-in">
            <Card className="p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Your Perfect Outfits</h2>
                  <p className="text-muted-foreground">Based on your preferences for {selectedOccasion} style</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentStep('occasion');
                    setSelectedOccasion('');
                    setSelectedColors([]);
                  }}
                >
                  Start Over
                </Button>
              </div>
            </Card>

            <div className="grid grid-cols-1 gap-8">
              {generatedOutfits.map((outfit) => (
                <Card key={outfit.id} className="p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{outfit.style}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">AI Match Score:</span>
                        <Badge className="gradient-bg text-white">
                          {outfit.matchScore}%
                        </Badge>
                      </div>
                    </div>
                    <Button className="gradient-bg text-white">
                      Save Outfit
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {outfit.items.map((item, index) => (
                      <div key={index} className="group cursor-pointer">
                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <p className="font-medium text-sm mb-1 line-clamp-1">{item.name}</p>
                        <p className="text-sm gradient-text-purple-pink font-semibold">{item.price}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button
                className="gradient-bg text-white"
                size="lg"
                onClick={handleGenerate}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate More Outfits
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
