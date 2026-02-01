import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Save, Upload } from 'lucide-react';

export function SettingsTab() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoReplyEnabled, setAutoReplyEnabled] = useState(false);

  return (
    <div className="space-y-6">
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="business-name">Business Name</Label>
              <Input id="business-name" defaultValue="Fashion House Co." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Contact Email</Label>
              <Input id="contact-email" type="email" defaultValue="contact@fashionhouse.com" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="business-description">Business Description</Label>
            <Textarea
              id="business-description"
              className="min-h-[100px]"
              defaultValue="Premium fashion retailer specializing in contemporary streetwear and accessories."
            />
          </div>

          <div className="space-y-2">
            <Label>Business Logo</Label>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-2xl font-bold">FH</span>
              </div>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload New Logo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Shipping & Returns</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="shipping-address">Shipping Address</Label>
              <Input id="shipping-address" defaultValue="123 Fashion Street, NY 10001" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="processing-time">Processing Time (days)</Label>
              <Input id="processing-time" type="number" defaultValue="2" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="return-policy">Return Policy</Label>
            <Textarea
              id="return-policy"
              className="min-h-[100px]"
              defaultValue="30-day returns accepted. Items must be unworn with tags attached."
            />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive email updates for new orders and messages</p>
            </div>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div>
              <p className="font-medium">Auto-Reply Messages</p>
              <p className="text-sm text-muted-foreground">Automatically respond to customer inquiries</p>
            </div>
            <Switch
              checked={autoReplyEnabled}
              onCheckedChange={setAutoReplyEnabled}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button className="gradient-bg-purple-pink">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
