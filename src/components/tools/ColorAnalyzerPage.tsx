import React, { useState } from 'react';
import { Upload, Sparkles, Copy, Check, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TopBar } from '../layout/TopBar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/components/ui/utils';

const sampleResults = {
  dominantColors: [
    { hex: '#1A1B2E', name: 'Deep Navy', percentage: 35 },
    { hex: '#B4A5A5', name: 'Dusty Rose', percentage: 25 },
    { hex: '#F5E6D3', name: 'Cream', percentage: 20 },
    { hex: '#8B7E74', name: 'Taupe', percentage: 15 },
    { hex: '#2D3142', name: 'Charcoal', percentage: 5 },
  ],
  suggestedOutfits: [
    {
      id: 1,
      name: 'Navy Elegance',
      items: [
        { image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=250&fit=crop', name: 'Navy Blazer' },
        { image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=200&h=250&fit=crop', name: 'Cream Trousers' },
        { image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=250&fit=crop', name: 'White Sneakers' },
      ]
    },
    {
      id: 2,
      name: 'Soft Neutrals',
      items: [
        { image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=250&fit=crop', name: 'Taupe Sweater' },
        { image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&h=250&fit=crop', name: 'Cream Jeans' },
        { image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&h=250&fit=crop', name: 'Brown Boots' },
      ]
    },
  ],
  colorHarmony: 'Analogous',
  season: 'Autumn',
  styleRecommendation: 'Sophisticated and warm tones complement your natural coloring'
};

export function ColorAnalyzerPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        handleAnalyze();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar title="Color Analyzer" />

      {/* Background Orbs */}
      <div className="fixed top-0 left-1/3 w-96 h-96 bg-brand-coral/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/3 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto p-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <Badge className="px-6 py-2 text-sm gradient-bg text-white">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              AI-Powered Analysis
            </Badge>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text-purple-pink">Color Analyzer</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload an image and discover your perfect color palette with AI-powered analysis
          </p>
        </div>

        {/* Upload Section */}
        {!showResults && (
          <Card className="p-12 mb-8 animate-fade-in">
            <div className="max-w-md mx-auto">
              <div
                className={cn(
                  "border-2 border-dashed rounded-2xl p-12 text-center transition-all",
                  uploadedImage ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                )}
              >
                {uploadedImage ? (
                  <div className="relative">
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="max-h-64 mx-auto rounded-lg mb-4"
                    />
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
                        <div className="text-center">
                          <div className="w-12 h-12 rounded-full gradient-bg animate-spin mx-auto mb-4" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%, 50% 0%, 100% 50%)' }} />
                          <p className="font-semibold">Analyzing colors...</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="w-20 h-20 rounded-full gradient-bg-purple-pink flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-lg font-semibold mb-2">Upload an image</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag and drop or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports: JPG, PNG, WEBP (Max 10MB)
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {uploadedImage && !isAnalyzing && (
                <div className="flex gap-4 mt-6">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setUploadedImage(null);
                      setShowResults(false);
                    }}
                  >
                    Upload Different Image
                  </Button>
                  <Button
                    className="flex-1 gradient-bg text-white"
                    onClick={handleAnalyze}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Analyze Colors
                  </Button>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Results Section */}
        {showResults && (
          <div className="space-y-8 animate-fade-in">
            {/* Color Palette */}
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Extracted Color Palette</h2>
                  <p className="text-muted-foreground">
                    Dominant colors from your image
                  </p>
                </div>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Palette
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {sampleResults.dominantColors.map((color, index) => (
                  <div key={index} className="group">
                    <div
                      className="aspect-square rounded-2xl mb-3 cursor-pointer transition-transform hover:scale-105"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="space-y-2">
                      <p className="font-semibold">{color.name}</p>
                      <div className="flex items-center justify-between">
                        <code className="text-sm text-muted-foreground">{color.hex}</code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(color.hex)}
                          className="h-8 w-8 p-0"
                        >
                          {copiedColor === color.hex ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="h-full rounded-full gradient-bg-purple-pink"
                          style={{ width: `${color.percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        {color.percentage}% of image
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Color Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Color Harmony</h3>
                <p className="text-2xl font-bold gradient-text-purple-pink mb-2">
                  {sampleResults.colorHarmony}
                </p>
                <p className="text-sm text-muted-foreground">
                  Colors that naturally complement each other
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-2">Best Season</h3>
                <p className="text-2xl font-bold gradient-text-purple-pink mb-2">
                  {sampleResults.season}
                </p>
                <p className="text-sm text-muted-foreground">
                  Seasonal color analysis result
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-2">Style Type</h3>
                <p className="text-sm text-muted-foreground">
                  {sampleResults.styleRecommendation}
                </p>
              </Card>
            </div>

            {/* Suggested Outfits */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Try These Outfits</h2>
              <p className="text-muted-foreground mb-6">
                Outfit suggestions based on your color palette
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sampleResults.suggestedOutfits.map((outfit) => (
                  <Card key={outfit.id} className="p-6 hover:shadow-xl transition-shadow">
                    <h3 className="text-lg font-semibold mb-4">{outfit.name}</h3>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {outfit.items.map((item, index) => (
                        <div key={index} className="group cursor-pointer">
                          <div className="aspect-[3/4] rounded-lg overflow-hidden mb-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <p className="text-xs text-center line-clamp-1">{item.name}</p>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full gradient-bg text-white">
                      View Full Outfit
                    </Button>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setUploadedImage(null);
                  setShowResults(false);
                }}
              >
                Analyze Another Image
              </Button>
              <Button className="gradient-bg text-white" size="lg">
                Save to My Palettes
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
