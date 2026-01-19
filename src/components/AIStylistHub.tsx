import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  MessageCircle, 
  Scissors, 
  Sparkles, 
  Scan,
  Image as ImageIcon,
  Send,
  Upload,
  Wand2,
  Camera,
  Download,
  Heart,
  Share2
} from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export default function AIStylistHub() {
  const [activeTab, setActiveTab] = useState('chat');
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m your AI fashion stylist. How can I help you look amazing today? 💫'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    setChatMessages([...chatMessages, {
      role: 'user',
      content: inputMessage
    }]);
    setInputMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: 'That\'s a great question! Let me help you with that...'
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">AI Stylist Hub</h1>
              <p className="text-muted-foreground">Your personal AI fashion expert</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tabs Navigation */}
          <TabsList className="grid w-full grid-cols-5 mb-8 h-auto p-1">
            <TabsTrigger value="chat" className="flex flex-col sm:flex-row items-center gap-2 py-3">
              <MessageCircle className="w-5 h-5" />
              <span className="text-xs sm:text-sm">Chat</span>
            </TabsTrigger>
            <TabsTrigger value="hair" className="flex flex-col sm:flex-row items-center gap-2 py-3">
              <Scissors className="w-5 h-5" />
              <span className="text-xs sm:text-sm">Hair</span>
            </TabsTrigger>
            <TabsTrigger value="nails" className="flex flex-col sm:flex-row items-center gap-2 py-3">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs sm:text-sm">Nails</span>
            </TabsTrigger>
            <TabsTrigger value="tryon" className="flex flex-col sm:flex-row items-center gap-2 py-3">
              <Scan className="w-5 h-5" />
              <span className="text-xs sm:text-sm">Try-On</span>
            </TabsTrigger>
            <TabsTrigger value="generator" className="flex flex-col sm:flex-row items-center gap-2 py-3">
              <ImageIcon className="w-5 h-5" />
              <span className="text-xs sm:text-sm">Generator</span>
            </TabsTrigger>
          </TabsList>

          {/* Chat Tab */}
          <TabsContent value="chat" className="mt-0">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Chat Interface */}
              <Card className="lg:col-span-2 p-0 overflow-hidden flex flex-col h-[600px]">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          msg.role === 'user'
                            ? 'gradient-bg text-white'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t bg-card">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask me anything about fashion..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="gradient-bg-purple-pink border-0"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <div className="space-y-4">
                <h3 className="font-semibold">Quick Questions</h3>
                <div className="space-y-2">
                  {[
                    'What should I wear today?',
                    'Summer outfit ideas',
                    'Business casual looks',
                    'Date night outfit help'
                  ].map((question, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-3"
                      onClick={() => setInputMessage(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Hair Stylist Tab */}
          <TabsContent value="hair" className="mt-0">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Scissors className="w-5 h-5 text-primary" />
                  Upload Your Photo
                </h3>
                <div className="aspect-square bg-muted/30 rounded-xl border-2 border-dashed border-border flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Upload className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Click or drag to upload</p>
                  </div>
                </div>
                <Button className="w-full gradient-bg-purple-pink border-0">
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
              </Card>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Popular Hairstyles</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['Long Layers', 'Bob Cut', 'Pixie', 'Beach Waves', 'Bangs', 'Updo'].map((style, idx) => (
                    <Card key={idx} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg mb-2" />
                      <p className="text-sm font-medium text-center">{style}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Nail Stylist Tab */}
          <TabsContent value="nails" className="mt-0">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  Design Your Nails
                </h3>
                <div className="aspect-square bg-muted/30 rounded-xl border-2 border-dashed border-border flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Wand2 className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Upload hand photo</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Select Color</label>
                    <div className="flex gap-2">
                      {['#FF6B9D', '#C147E9', '#4D96FF', '#FFC93C', '#00D9FF'].map((color, idx) => (
                        <button
                          key={idx}
                          className="w-10 h-10 rounded-full border-2 border-border hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <Button className="w-full gradient-bg border-0">
                    Generate Design
                  </Button>
                </div>
              </Card>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Trending Designs</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['French Tips', 'Ombre', 'Glitter', 'Floral', 'Minimalist', 'Abstract'].map((design, idx) => (
                    <Card key={idx} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900 rounded-lg mb-2" />
                      <p className="text-sm font-medium text-center">{design}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Virtual Try-On Tab */}
          <TabsContent value="tryon" className="mt-0">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Scan className="w-5 h-5 text-primary" />
                  Virtual Try-On
                </h3>
                <div className="space-y-4">
                  <div className="aspect-[3/4] bg-muted/30 rounded-xl border-2 border-dashed border-border flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Upload your photo</p>
                      <p className="text-xs text-muted-foreground mt-1">Full body photo works best</p>
                    </div>
                  </div>
                  <Button className="w-full gradient-bg-purple-pink border-0">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                </div>
              </Card>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Select Outfit</h3>
                <div className="grid grid-cols-3 gap-3">
                  {Array.from({ length: 9 }).map((_, idx) => (
                    <Card key={idx} className="p-2 hover:shadow-lg transition-shadow cursor-pointer aspect-square">
                      <div className="w-full h-full bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900 dark:to-yellow-900 rounded-lg" />
                    </Card>
                  ))}
                </div>
                <Button className="w-full" variant="outline">
                  Browse More Outfits
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* AI Image Generator Tab */}
          <TabsContent value="generator" className="mt-0">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-accent" />
                  AI Image Generator
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Describe your vision</label>
                    <Textarea
                      placeholder="E.g., A stylish summer dress with floral patterns, light and breezy..."
                      className="min-h-[120px]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Style</label>
                      <select className="w-full h-10 rounded-lg border border-input bg-background px-3">
                        <option>Casual</option>
                        <option>Formal</option>
                        <option>Street</option>
                        <option>Vintage</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Season</label>
                      <select className="w-full h-10 rounded-lg border border-input bg-background px-3">
                        <option>Spring</option>
                        <option>Summer</option>
                        <option>Fall</option>
                        <option>Winter</option>
                      </select>
                    </div>
                  </div>

                  <Button className="w-full gradient-bg border-0">
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Image
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Generated Image</h3>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-xl flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <ImageIcon className="w-16 h-16 mx-auto mb-2" />
                    <p className="text-sm">Your generated image will appear here</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
