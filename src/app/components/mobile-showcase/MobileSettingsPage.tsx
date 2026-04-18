import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';
import { 
  ChevronLeft, 
  ChevronRight, 
  User, 
  Bell, 
  Lock, 
  Moon, 
  Globe, 
  HelpCircle, 
  Shield,
  CreditCard,
  Heart,
  LogOut
} from 'lucide-react';

export default function MobileSettingsPage() {
  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Edit Profile', hasArrow: true },
        { icon: CreditCard, label: 'Payment Methods', hasArrow: true },
        { icon: Heart, label: 'Saved Addresses', hasArrow: true },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notifications', hasArrow: true },
        { icon: Moon, label: 'Dark Mode', hasSwitch: true },
        { icon: Globe, label: 'Language', value: 'English', hasArrow: true },
      ],
    },
    {
      title: 'Privacy & Security',
      items: [
        { icon: Lock, label: 'Privacy Settings', hasArrow: true },
        { icon: Shield, label: 'Security', hasArrow: true },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', hasArrow: true },
        { icon: Globe, label: 'About', hasArrow: true },
      ],
    },
  ];

  return (
    <div className="h-screen bg-background flex flex-col max-w-md mx-auto border-x">
      {/* Header */}
      <div className="bg-background border-b px-4 py-3 flex items-center sticky top-0 z-10">
        <Button variant="ghost" size="icon" className="rounded-full mr-2">
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Profile Card */}
        <div className="p-4">
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1">
                <div className="w-full h-full rounded-full border-2 border-background overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-lg">Sarah Chen</p>
                <p className="text-sm text-muted-foreground">sarah.chen@email.com</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>
        </div>

        {/* Settings Sections */}
        <div className="px-4 pb-4 space-y-6">
          {settingsSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-1">
                {section.title}
              </h3>
              <Card className="overflow-hidden">
                {section.items.map((item, index) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                      index !== section.items.length - 1 ? 'border-b' : ''
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.label}</p>
                      {item.value && (
                        <p className="text-sm text-muted-foreground">{item.value}</p>
                      )}
                    </div>
                    {item.hasSwitch && (
                      <Switch defaultChecked={item.label === 'Dark Mode'} />
                    )}
                    {item.hasArrow && (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </Card>
            </div>
          ))}

          {/* Role Switcher */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-1">
              Account Type
            </h3>
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold">Current Role</p>
                  <p className="text-sm text-muted-foreground">User Account</p>
                </div>
                <div className="px-3 py-1 rounded-full gradient-bg text-white text-sm font-medium">
                  Active
                </div>
              </div>
              <Button variant="outline" className="w-full rounded-full">
                Switch to Creator
              </Button>
            </Card>
          </div>

          {/* Sign Out */}
          <Card className="overflow-hidden">
            <button className="w-full flex items-center gap-3 p-4 cursor-pointer hover:bg-destructive/10 transition-colors text-destructive">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <LogOut className="w-5 h-5" />
              </div>
              <p className="font-medium">Sign Out</p>
            </button>
          </Card>

          {/* Version Info */}
          <p className="text-center text-sm text-muted-foreground py-4">
            ZokaiHub v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}
