import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { 
  MessageCircle, 
  Scissors, 
  Sparkles, 
  Camera, 
  Image as ImageIcon,
  Send,
  Upload,
  Mic,
  Paperclip,
  Plus,
  Settings,
  ChevronRight,
  Star,
  History,
  Trash2
} from 'lucide-react';

export default function AIHubPage() {
  const [selectedService, setSelectedService] = useState<'chat' | 'hair' | 'nails' | 'tryon' | 'generate'>('chat');
  const [chatInput, setChatInput] = useState('');
  const [currentConversation, setCurrentConversation] = useState<number | null>(null);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);

  const services = [
    { 
      id: 'chat' as const, 
      name: 'Fashion Chat', 
      icon: MessageCircle,
      description: 'Get style advice and recommendations'
    },
    { 
      id: 'hair' as const, 
      name: 'Hair Stylist', 
      icon: Scissors,
      description: 'AI-powered hairstyle transformations'
    },
    { 
      id: 'nails' as const, 
      name: 'Nail Artist', 
      icon: Sparkles,
      description: 'Design custom nail art with AI'
    },
    { 
      id: 'tryon' as const, 
      name: 'Virtual Try-On', 
      icon: Camera,
      description: 'Try outfits virtually with AI'
    },
    { 
      id: 'generate' as const, 
      name: 'Image Generator', 
      icon: ImageIcon,
      description: 'Create fashion images with AI'
    }
  ];

  const suggestedPrompts = [
    "What outfit should I wear for a summer wedding?",
    "Help me style a black blazer for work",
    "Suggest accessories for my denim look",
    "What colors complement my skin tone?"
  ];

  const conversationHistory = [
    { id: 1, title: 'Summer Wedding Outfit', date: 'Today', preview: 'What outfit should I wear...' },
    { id: 2, title: 'Work Blazer Styling', date: 'Yesterday', preview: 'Help me style a black blazer...' },
    { id: 3, title: 'Color Analysis', date: '2 days ago', preview: 'What colors complement...' }
  ];

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const newMessages = [
      ...messages,
      { role: 'user' as const, content: chatInput },
      { 
        role: 'assistant' as const, 
        content: "Great question! Based on current trends and your style preferences, I'd recommend a few options that would work perfectly for you. Let me break down some ideas..."
      }
    ];
    
    setMessages(newMessages);
    setChatInput('');
  };

  const currentService = services.find(s => s.id === selectedService);

  return (
    <div className="h-full flex bg-background">
      {/* Left Sidebar - Service Selector & History */}
      <aside className="hidden lg:flex flex-col w-72 border-r bg-background">
        {/* Header */}
        <div className="p-4 border-b">
          <Button className="w-full gradient-bg border-0 justify-start" onClick={() => setMessages([])}>
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>

        {/* Service Selector */}
        <div className="p-4 border-b">
          <h3 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">AI Services</h3>
          <div className="space-y-1">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => {
                    setSelectedService(service.id);
                    setMessages([]);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    selectedService === service.id 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-muted'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium truncate">{service.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Conversation History */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex items-center gap-2 mb-3">
            <History className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Recent Chats</h3>
          </div>
          <div className="space-y-1">
            {conversationHistory.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setCurrentConversation(conv.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors hover:bg-muted group ${
                  currentConversation === conv.id ? 'bg-muted' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{conv.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{conv.preview}</p>
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0">{conv.date}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b bg-background/95 backdrop-blur-md px-4 sm:px-6 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              {currentService && (
                <>
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                    <currentService.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{currentService.name}</h2>
                    <p className="text-sm text-muted-foreground">{currentService.description}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
            {messages.length === 0 ? (
              /* Empty State with Suggested Prompts */
              <div className="h-full flex flex-col items-center justify-center space-y-8 py-12">
                <div className="text-center space-y-3">
                  <div className="w-20 h-20 mx-auto rounded-2xl gradient-bg flex items-center justify-center mb-4">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Hello! How can I help you today?</h3>
                  <p className="text-muted-foreground max-w-md">
                    I'm your AI fashion stylist. Ask me anything about style, outfits, colors, trends, and more!
                  </p>
                </div>

                {/* Suggested Prompts */}
                <div className="w-full max-w-2xl space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">Suggested prompts:</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {suggestedPrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => setChatInput(prompt)}
                        className="p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
                      >
                        <div className="flex items-start gap-3">
                          <Star className="w-4 h-4 text-muted-foreground mt-0.5 group-hover:text-primary transition-colors" />
                          <p className="text-sm">{prompt}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features Grid */}
                <div className="w-full max-w-2xl grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8">
                  {services.filter(s => s.id !== selectedService).slice(0, 3).map((service) => {
                    const Icon = service.icon;
                    return (
                      <button
                        key={service.id}
                        onClick={() => setSelectedService(service.id)}
                        className="p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-center"
                      >
                        <Icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <p className="text-sm font-medium">{service.name}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Chat Messages */
              <div className="space-y-6">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                      <div
                        className={`rounded-2xl px-5 py-3 ${
                          msg.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      </div>
                      {msg.role === 'assistant' && (
                        <div className="flex items-center gap-2 mt-2 ml-2">
                          <Button variant="ghost" size="sm" className="h-7 text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Helpful
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 text-xs">
                            Copy
                          </Button>
                        </div>
                      )}
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 text-lg">
                        👤
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Input Area - Gemini Style */}
        <div className="border-t bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
            <div className="relative">
              {/* Input Container */}
              <div className="relative flex items-end gap-2 p-2 rounded-3xl border-2 border-border focus-within:border-primary transition-colors bg-background shadow-sm">
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0 h-10 w-10 rounded-full"
                >
                  <Paperclip className="w-5 h-5" />
                </Button>
                
                <Textarea
                  placeholder="Ask me anything about fashion..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1 min-h-[44px] max-h-[200px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent px-2"
                  rows={1}
                />

                <Button
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0 h-10 w-10 rounded-full"
                >
                  <Mic className="w-5 h-5" />
                </Button>

                <Button
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim()}
                  size="icon"
                  className="flex-shrink-0 h-10 w-10 rounded-full gradient-bg border-0 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-white" />
                </Button>
              </div>

              {/* Helper Text */}
              <p className="text-xs text-center text-muted-foreground mt-3">
                ZokaiHub AI can make mistakes. Check important info.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
