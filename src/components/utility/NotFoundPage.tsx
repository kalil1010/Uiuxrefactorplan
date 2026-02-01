import React from 'react';
import { Home, Search, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      {/* Background Orbs */}
      <div className="fixed top-0 right-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="fixed bottom-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-coral/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="max-w-2xl mx-auto text-center relative z-10 animate-fade-in">
        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-[12rem] font-bold leading-none gradient-text mb-4">
            404
          </h1>
          <div className="w-32 h-1 gradient-bg mx-auto rounded-full mb-8" />
        </div>

        {/* Message */}
        <Card className="p-8 glass mb-8">
          <div className="w-20 h-20 rounded-full gradient-bg-purple-pink flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Oops! The page you're looking for seems to have wandered off the runway. 
            Let's get you back on track!
          </p>

          {/* Suggestions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-lg bg-muted/30">
              <Home className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Go Home</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <Search className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Search</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <Sparkles className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Explore</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-bg text-white">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
            <Button size="lg" variant="outline">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </div>
        </Card>

        {/* Additional Help */}
        <p className="text-sm text-muted-foreground">
          Need help? <a href="#" className="text-primary hover:underline">Contact Support</a>
        </p>
      </div>
    </div>
  );
}
