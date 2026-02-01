import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, MessageCircle, Book, Mail } from 'lucide-react';

export function SupportTab() {
  return (
    <div className="space-y-6">
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Support Center</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full gradient-bg-purple-pink flex items-center justify-center mx-auto mb-4">
                  <Book className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Documentation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Browse our comprehensive guides and tutorials
                </p>
                <Button variant="outline" className="w-full">View Docs</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full gradient-bg-pink-coral flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">FAQs</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Find answers to commonly asked questions
                </p>
                <Button variant="outline" className="w-full">Browse FAQs</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full gradient-bg-coral-yellow flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Chat with our support team in real-time
                </p>
                <Button variant="outline" className="w-full">Start Chat</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Email Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Send us an email and we'll respond within 24h
                </p>
                <Button variant="outline" className="w-full">Contact Us</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Tips for Vendors</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">1.</span>
                  <span className="text-sm text-muted-foreground">
                    Keep your product listings updated with accurate descriptions and high-quality images
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">2.</span>
                  <span className="text-sm text-muted-foreground">
                    Respond to customer messages within 24 hours to maintain a good rating
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">3.</span>
                  <span className="text-sm text-muted-foreground">
                    Process orders promptly and provide tracking information to customers
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">4.</span>
                  <span className="text-sm text-muted-foreground">
                    Encourage satisfied customers to leave reviews to build trust
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
