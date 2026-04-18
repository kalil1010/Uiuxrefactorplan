import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Mail, MessageCircle, Phone, MapPin, Send, HelpCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      {/* Background Orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-brand-magenta/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="sticky top-0 z-40 glass-effect border-b px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl font-bold gradient-text-purple-pink">Contact Us</h1>
          <p className="text-sm text-muted-foreground">We'd love to hear from you</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">
            <span className="gradient-text-purple-pink">Get in Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a question or need help? We're here to assist you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full gradient-bg-purple-pink flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Email</h4>
                    <a href="mailto:support@zokaihub.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      support@zokaihub.com
                    </a>
                    <p className="text-xs text-muted-foreground mt-1">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full gradient-bg-pink-coral flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Live Chat</h4>
                    <p className="text-sm text-muted-foreground">
                      Available Mon-Fri
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      9:00 AM - 6:00 PM EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full gradient-bg-coral-yellow flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <a href="tel:+1234567890" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      +1 (234) 567-890
                    </a>
                    <p className="text-xs text-muted-foreground mt-1">
                      Mon-Fri, 9:00 AM - 6:00 PM EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Office</h4>
                    <p className="text-sm text-muted-foreground">
                      123 Fashion Street<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Quick Help
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Visit Help Center
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Browse FAQs
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Community Forum
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Fill out the form below and we'll get back to you shortly
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => setFormData({ ...formData, subject: value })}
                      required
                    >
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                        <SelectItem value="vendor">Vendor Application</SelectItem>
                        <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      className="min-h-[200px] resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Please provide as much detail as possible
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      className="gradient-bg-purple-pink flex-1 sm:flex-none"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setFormData({ name: '', email: '', subject: '', message: '' })}
                    >
                      Clear Form
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    * Required fields. By submitting this form, you agree to our privacy policy.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Response Time Notice */}
            <Card className="glass-effect mt-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Expected Response Time</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Our team typically responds to inquiries within 24 hours during business days. 
                      For urgent matters, please use our live chat feature or call us directly.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-lg border">
                        <p className="font-semibold mb-1">General Inquiry</p>
                        <p className="text-muted-foreground">24-48 hours</p>
                      </div>
                      <div className="p-3 rounded-lg border">
                        <p className="font-semibold mb-1">Technical Support</p>
                        <p className="text-muted-foreground">12-24 hours</p>
                      </div>
                      <div className="p-3 rounded-lg border">
                        <p className="font-semibold mb-1">Partnership</p>
                        <p className="text-muted-foreground">2-3 business days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
