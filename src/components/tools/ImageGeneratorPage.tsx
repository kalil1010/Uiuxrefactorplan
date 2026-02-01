import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Sparkles, Download, Share2, Wand2, Image as ImageIcon } from 'lucide-react';

const stylePresets = [
  { id: 'realistic', label: 'Realistic', icon: '📸' },
  { id: 'artistic', label: 'Artistic', icon: '🎨' },
  { id: 'minimal', label: 'Minimal', icon: '⚪' },
  { id: 'vintage', label: 'Vintage', icon: '📷' },
  { id: 'modern', label: 'Modern', icon: '🔷' },
  { id: 'colorful', label: 'Colorful', icon: '🌈' },
];

const examplePrompts = [
  'A stylish outfit with denim jacket and white sneakers on a city street',
  'Elegant evening dress with accessories on a fashion runway',
  'Casual summer look with floral patterns and sunglasses',
  'Professional business attire with blazer and leather bag',
];

export default function ImageGeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      setGeneratedImage('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800');
      setIsGenerating(false);
    }, 3000);
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

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
            <h1 className="text-xl font-bold gradient-text-purple-pink flex items-center gap-2">
              <Wand2 className="w-5 h-5" />
              AI Image Generator
            </h1>
            <p className="text-sm text-muted-foreground">Create unique fashion images with AI</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Input */}
          <div className="space-y-6">
            {/* Prompt Input */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Describe Your Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Describe the fashion image you want to generate..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[150px] text-base"
                />
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-muted-foreground">Examples:</span>
                  {examplePrompts.map((example, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleExampleClick(example)}
                      className="text-xs h-auto py-1 px-2"
                    >
                      {example.slice(0, 30)}...
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Style Selector */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Choose Style
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {stylePresets.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                        selectedStyle === style.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="text-3xl mb-2">{style.icon}</div>
                      <p className="text-sm font-medium">{style.label}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full gradient-bg-purple-pink h-14 text-lg font-semibold"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 mr-2" />
                  Generate Image
                </>
              )}
            </Button>

            {/* Tips */}
            <Card className="glass-effect bg-primary/5">
              <CardContent className="p-4">
                <p className="font-semibold mb-2">💡 Tips for better results:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Be specific about clothing items and colors</li>
                  <li>Mention the setting or background</li>
                  <li>Include style keywords (elegant, casual, trendy, etc.)</li>
                  <li>Describe lighting and mood</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Result */}
          <div className="space-y-6">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Generated Result</CardTitle>
              </CardHeader>
              <CardContent>
                {isGenerating ? (
                  <div className="aspect-[3/4] rounded-lg bg-muted flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full gradient-bg-purple-pink flex items-center justify-center animate-pulse">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-muted-foreground">Creating your image...</p>
                    <div className="w-48 h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-[shimmer_2s_ease-in-out_infinite]" style={{ width: '60%' }} />
                    </div>
                  </div>
                ) : generatedImage ? (
                  <div className="space-y-4">
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden group">
                      <img
                        src={generatedImage}
                        alt="Generated fashion image"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-3">
                          <Button size="icon" variant="secondary" className="rounded-full">
                            <Download className="w-5 h-5" />
                          </Button>
                          <Button size="icon" variant="secondary" className="rounded-full">
                            <Share2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1 gradient-bg-purple-pink">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{selectedStyle}</Badge>
                      <Badge variant="outline">1024x1024</Badge>
                      <Badge variant="outline">PNG</Badge>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[3/4] rounded-lg bg-muted flex flex-col items-center justify-center gap-4 text-muted-foreground">
                    <ImageIcon className="w-16 h-16" />
                    <p className="text-center px-4">
                      Your generated image will appear here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Generations */}
            {generatedImage && (
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>Recent Generations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-lg bg-muted overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                      >
                        <img
                          src={`https://images.unsplash.com/photo-${1515886657613 + i * 100000}-9f3515b0c78f?w=200`}
                          alt={`Recent ${i}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
