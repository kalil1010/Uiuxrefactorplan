import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Label } from '../ui/label';
import { Calendar } from '../ui/calendar';
import { Textarea } from '../ui/textarea';
import { 
  CheckCircle2,
  Calendar as CalendarIcon,
  Camera,
  Shirt,
  Clock,
  TrendingUp,
  Plus,
  X,
  Edit,
  History,
  Bell,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WearEntry {
  id: number;
  itemId: number;
  date: string;
  occasion?: string;
  weather?: string;
  notes?: string;
  outfitId?: number;
  photoUrl?: string;
}

interface ClosetItem {
  id: number;
  name: string;
  image: string;
  wearCount: number;
  wearHistory: WearEntry[];
}

export default function WearTrackingSystem() {
  const [showTrackingDialog, setShowTrackingDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [occasion, setOccasion] = useState('');
  const [notes, setNotes] = useState('');
  const [trackingMethod, setTrackingMethod] = useState<'manual' | 'outfit' | 'photo'>('manual');

  // Mock data
  const [items, setItems] = useState<ClosetItem[]>([
    {
      id: 1,
      name: 'White T-Shirt',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300',
      wearCount: 12,
      wearHistory: [
        { id: 1, itemId: 1, date: '2024-02-17', occasion: 'Casual', notes: 'Coffee with friends' },
        { id: 2, itemId: 1, date: '2024-02-15', occasion: 'Work', weather: 'Sunny' },
        { id: 3, itemId: 1, date: '2024-02-12', occasion: 'Weekend' }
      ]
    },
    {
      id: 2,
      name: 'Blue Jeans',
      image: 'https://images.unsplash.com/photo-1542272454315-7fbb7cda0d4d?w=300',
      wearCount: 24,
      wearHistory: []
    }
  ]);

  const occasions = [
    'Work', 'Casual', 'Formal', 'Party', 'Date', 'Sport', 'Weekend', 'Travel'
  ];

  const weatherConditions = [
    'Sunny ☀️', 'Cloudy ☁️', 'Rainy 🌧️', 'Cold ❄️', 'Hot 🔥'
  ];

  // Log a wear entry
  const logWear = () => {
    if (selectedItems.length === 0) return;

    const newEntries: WearEntry[] = selectedItems.map(itemId => ({
      id: Date.now() + itemId,
      itemId,
      date: selectedDate.toISOString().split('T')[0],
      occasion: occasion || undefined,
      notes: notes || undefined
    }));

    // Update items with new wear entries
    setItems(items.map(item => {
      if (selectedItems.includes(item.id)) {
        return {
          ...item,
          wearCount: item.wearCount + 1,
          wearHistory: [...item.wearHistory, ...newEntries.filter(e => e.itemId === item.id)]
        };
      }
      return item;
    }));

    // Reset form
    setSelectedItems([]);
    setOccasion('');
    setNotes('');
    setShowTrackingDialog(false);
  };

  // Quick log for today
  const quickLogToday = (itemId: number) => {
    const newEntry: WearEntry = {
      id: Date.now(),
      itemId,
      date: new Date().toISOString().split('T')[0],
    };

    setItems(items.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          wearCount: item.wearCount + 1,
          wearHistory: [...item.wearHistory, newEntry]
        };
      }
      return item;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold gradient-text">Wear Tracking</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Track when you wear your items to get insights
          </p>
        </div>
        <Button 
          className="gradient-bg border-0"
          onClick={() => setShowTrackingDialog(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Log Wear
        </Button>
      </div>

      {/* Tracking Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className={`p-6 cursor-pointer transition-all glass-effect hover:shadow-xl ${
            trackingMethod === 'manual' ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => setTrackingMethod('manual')}
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-4 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
              <CheckCircle2 className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Manual Logging</h3>
              <p className="text-xs text-muted-foreground">
                Select items and mark them as worn
              </p>
            </div>
            <Badge variant={trackingMethod === 'manual' ? 'default' : 'outline'}>
              Most Common
            </Badge>
          </div>
        </Card>

        <Card 
          className={`p-6 cursor-pointer transition-all glass-effect hover:shadow-xl ${
            trackingMethod === 'outfit' ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => setTrackingMethod('outfit')}
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20">
              <Shirt className="w-8 h-8 text-purple-500" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Outfit-Based</h3>
              <p className="text-xs text-muted-foreground">
                Track entire outfits at once
              </p>
            </div>
            <Badge variant={trackingMethod === 'outfit' ? 'default' : 'outline'}>
              Automatic
            </Badge>
          </div>
        </Card>

        <Card 
          className={`p-6 cursor-pointer transition-all glass-effect hover:shadow-xl ${
            trackingMethod === 'photo' ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => setTrackingMethod('photo')}
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-4 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20">
              <Camera className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Photo Recognition</h3>
              <p className="text-xs text-muted-foreground">
                AI detects items from photos
              </p>
            </div>
            <Badge variant={trackingMethod === 'photo' ? 'default' : 'outline'}>
              Coming Soon
            </Badge>
          </div>
        </Card>
      </div>

      {/* Quick Actions for Today */}
      <Card className="p-6 glass-effect">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-gradient-to-br from-[#6556C6]/20 to-[#D20EC1]/20">
            <Clock className="w-5 h-5 text-[#6556C6]" />
          </div>
          <div>
            <h3 className="font-bold">What are you wearing today?</h3>
            <p className="text-xs text-muted-foreground">Quick log for today</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {items.map(item => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card 
                className="overflow-hidden cursor-pointer group"
                onClick={() => quickLogToday(item.id)}
              >
                <div className="relative aspect-square">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-black/70 text-white text-xs">
                    {item.wearCount}x
                  </div>
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium line-clamp-1">{item.name}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Button 
          variant="outline" 
          className="w-full mt-4"
          onClick={() => setShowTrackingDialog(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Log Multiple Items
        </Button>
      </Card>

      {/* Wear Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 glass-effect">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20">
              <TrendingUp className="w-5 h-5 text-orange-500" />
            </div>
            <h3 className="font-bold">Most Worn This Month</h3>
          </div>
          <div className="space-y-3">
            {items
              .sort((a, b) => b.wearCount - a.wearCount)
              .slice(0, 3)
              .map((item, index) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-muted-foreground w-8">
                    #{index + 1}
                  </div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Worn {item.wearCount} times
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setShowHistoryDialog(true);
                    }}
                  >
                    <History className="w-4 h-4" />
                  </Button>
                </div>
              ))}
          </div>
        </Card>

        <Card className="p-6 glass-effect">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
              <Sparkles className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="font-bold">Smart Reminders</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Bell className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Haven't worn in 30 days</p>
                <p className="text-xs text-muted-foreground mt-1">
                  You have 3 items that haven't been worn in over a month
                </p>
                <Button variant="link" className="h-auto p-0 mt-2 text-xs">
                  View Items
                </Button>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Sparkles className="w-5 h-5 text-purple-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Log your outfit?</p>
                <p className="text-xs text-muted-foreground mt-1">
                  It's been 2 days since your last entry
                </p>
                <Button variant="link" className="h-auto p-0 mt-2 text-xs">
                  Log Now
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Manual Logging Dialog */}
      <Dialog open={showTrackingDialog} onOpenChange={setShowTrackingDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="gradient-text">Log Wear Entry</DialogTitle>
            <DialogDescription>
              Select items you wore and add details
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Date Selection */}
            <div className="space-y-2">
              <Label>Date Worn</Label>
              <div className="border rounded-lg p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md"
                />
              </div>
            </div>

            {/* Item Selection */}
            <div className="space-y-2">
              <Label>Items Worn ({selectedItems.length} selected)</Label>
              <div className="grid grid-cols-4 gap-3 max-h-64 overflow-y-auto p-2 border rounded-lg">
                {items.map(item => (
                  <motion.div
                    key={item.id}
                    whileTap={{ scale: 0.95 }}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      selectedItems.includes(item.id)
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-transparent'
                    }`}
                    onClick={() => {
                      setSelectedItems(prev =>
                        prev.includes(item.id)
                          ? prev.filter(id => id !== item.id)
                          : [...prev, item.id]
                      );
                    }}
                  >
                    <div className="aspect-square">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {selectedItems.includes(item.id) && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <div className="p-2 rounded-full bg-primary">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Occasion */}
            <div className="space-y-2">
              <Label>Occasion (Optional)</Label>
              <div className="flex flex-wrap gap-2">
                {occasions.map(occ => (
                  <Badge
                    key={occ}
                    variant={occasion === occ ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setOccasion(occasion === occ ? '' : occ)}
                  >
                    {occ}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label>Notes (Optional)</Label>
              <Textarea
                placeholder="Add any notes about this outfit..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowTrackingDialog(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 gradient-bg border-0"
                onClick={logWear}
                disabled={selectedItems.length === 0}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Log {selectedItems.length} Item{selectedItems.length !== 1 ? 's' : ''}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* History Dialog */}
      <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="gradient-text">Wear History</DialogTitle>
            <DialogDescription>
              View all wear entries for this item
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mt-4 max-h-96 overflow-y-auto">
            {items[0]?.wearHistory.map((entry) => (
              <Card key={entry.id} className="p-4 glass-effect">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    {entry.occasion && (
                      <Badge variant="outline" className="mb-2">
                        {entry.occasion}
                      </Badge>
                    )}
                    {entry.notes && (
                      <p className="text-sm text-muted-foreground">{entry.notes}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
