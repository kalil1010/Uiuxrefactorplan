# Wear Tracking System - ZokaiHub Digital Closet

## Overview
Comprehensive documentation on how the app tracks when users wear their closet items, providing valuable insights and analytics.

---

## 🎯 The Problem

**Question:** How does the app know the wear count?

**Answer:** The app provides multiple methods for users to log when they wear items, each designed for different user preferences and scenarios.

---

## 📊 Tracking Methods

### 1. **Manual Logging** ✋
**Most Common & Reliable**

#### How It Works:
1. User selects "Log Wear" from the app
2. Picks items they wore (or are wearing)
3. Optionally adds details (date, occasion, notes)
4. System increments wear count for those items

#### User Flow:
```
User opens app → "Log Wear" button → Select items → Choose date → 
Add details (optional) → Save → Wear count +1 for each item
```

#### Benefits:
- ✅ User has full control
- ✅ Can log past dates
- ✅ Can add context (occasion, notes)
- ✅ Most accurate

#### Drawbacks:
- ⚠️ Requires user discipline
- ⚠️ Easy to forget

---

### 2. **Outfit-Based Tracking** 👔
**Automatic When Using Outfits**

#### How It Works:
1. User creates saved outfits in Closet Mixer
2. When user marks outfit as "Worn Today"
3. System automatically logs ALL items in that outfit
4. Each item's wear count increments by 1

#### User Flow:
```
Create outfit → Save outfit → Select "Wore this outfit today" → 
All items in outfit get +1 wear count automatically
```

#### Benefits:
- ✅ One-click tracking for multiple items
- ✅ Encourages outfit planning
- ✅ Faster than manual selection
- ✅ Builds outfit wear history

#### Implementation:
```typescript
interface SavedOutfit {
  id: number;
  name: string;
  items: number[];  // Array of item IDs
  wearCount: number;  // How many times outfit was worn
}

function wearOutfit(outfitId: number) {
  const outfit = outfits.find(o => o.id === outfitId);
  
  // Log wear for all items in outfit
  outfit.items.forEach(itemId => {
    logItemWear(itemId, {
      date: new Date(),
      viaOutfit: outfitId
    });
  });
  
  // Increment outfit wear count
  outfit.wearCount += 1;
}
```

---

### 3. **Photo Recognition** 📸
**AI-Powered (Future Feature)**

#### How It Works:
1. User takes daily outfit photo (OOTD - Outfit of the Day)
2. AI analyzes photo and detects items from closet
3. System auto-logs detected items as worn
4. User can confirm/edit detection results

#### User Flow:
```
Take photo → AI analyzes → Shows detected items → 
User confirms → Items logged automatically
```

#### Benefits:
- ✅ Zero manual effort
- ✅ Visual history of outfits
- ✅ Shareable to social feed
- ✅ Most convenient

#### Technology Stack:
- Computer Vision API (e.g., Google Vision, AWS Rekognition)
- Custom ML model trained on user's closet
- Image similarity matching
- Color/pattern detection

#### Drawbacks:
- ⚠️ Requires good lighting
- ⚠️ May have accuracy issues
- ⚠️ Privacy considerations
- ⚠️ Higher development cost

---

### 4. **Calendar Integration** 📅
**Planned Wear Tracking**

#### How It Works:
1. User plans outfits in advance on calendar
2. Each day, app sends reminder: "Wearing planned outfit?"
3. User confirms yes/no
4. If yes, all items logged automatically

#### User Flow:
```
Plan outfit for Friday → Friday arrives → 
Notification: "Wearing Friday's outfit?" → Tap "Yes" → 
All items logged
```

#### Benefits:
- ✅ Helps with outfit planning
- ✅ Reduces decision fatigue
- ✅ Automatic logging on confirmation
- ✅ Push notification reminders

---

### 5. **Quick Log for Today** ⚡
**Fastest Method**

#### How It Works:
1. Widget/shortcut shows today's items
2. User taps item thumbnails
3. Instant log with one tap (no dialog)
4. Perfect for morning routine

#### User Flow:
```
Morning: Open app → See "What are you wearing today?" → 
Tap items (quick add) → Done!
```

#### Implementation:
```typescript
function quickLogToday(itemId: number) {
  const wearEntry = {
    id: Date.now(),
    itemId: itemId,
    date: new Date().toISOString(),
    method: 'quick-log'
  };
  
  // Add to database
  addWearEntry(wearEntry);
  
  // Increment wear count
  incrementItemWearCount(itemId);
  
  // Show brief confirmation
  toast.success('Logged!');
}
```

---

## 🔔 Smart Reminders & Automation

### Reminder Types:

#### 1. **Daily Reminder**
- Time: Evening (8 PM default, user-configurable)
- Message: "Did you forget to log what you wore today?"
- Action: Quick select items

#### 2. **Morning Outfit Reminder**
- Time: Morning (7 AM default)
- Message: "What are you wearing today?"
- Action: Quick log interface

#### 3. **Unused Item Alert**
- Frequency: Weekly
- Message: "You haven't worn [Item Name] in 30 days"
- Action: Create outfit with item or donate

#### 4. **Outfit Suggestion**
- Frequency: Daily
- Message: "Try this outfit today!"
- Action: Log if worn

---

## 📱 User Interface Components

### 1. **Quick Log Widget**
Location: Home screen / Today tab

```
┌─────────────────────────────────┐
│  What are you wearing today? ⏰  │
├─────────────────────────────────┤
│  [Item 1] [Item 2] [Item 3]     │
│  [Item 4] [Item 5] [Item 6]     │
│                                  │
│  [+ Log Multiple Items]          │
└─────────────────────────────────┘
```

### 2. **Full Log Dialog**
Triggered by: "Log Wear" button

```
┌─────────────────────────────────┐
│  Log Wear Entry                  │
├─────────────────────────────────┤
│  Date: [Calendar Picker]         │
│                                  │
│  Items: [✓ Item 1] [ Item 2]    │
│         [ Item 3] [✓ Item 4]    │
│                                  │
│  Occasion: [Work][Casual][Party] │
│                                  │
│  Notes: ___________________      │
│                                  │
│  [Cancel]      [Log Items]       │
└─────────────────────────────────┘
```

### 3. **Outfit Wear Tracker**
In Closet Mixer saved outfits:

```
┌─────────────────────────────────┐
│  Casual Friday Outfit            │
│  [Outfit Preview Image]          │
│                                  │
│  Worn: 3 times                   │
│  Last worn: 2 days ago           │
│                                  │
│  [✓ Wore This Today]             │
└─────────────────────────────────┘
```

---

## 💾 Data Structure

### Wear Entry Model
```typescript
interface WearEntry {
  id: number;
  itemId: number;          // Which item was worn
  date: string;            // When it was worn (ISO date)
  occasion?: string;       // Work, Casual, Party, etc.
  weather?: string;        // Sunny, Rainy, Cold, etc.
  notes?: string;          // User notes
  outfitId?: number;       // If part of saved outfit
  photoUrl?: string;       // OOTD photo URL
  location?: string;       // GPS location (optional)
  method: 'manual' | 'outfit' | 'photo' | 'quick'; // How it was logged
  createdAt: string;       // When entry was created
}
```

### Updated Item Model
```typescript
interface ClosetItem {
  id: number;
  name: string;
  category: string;
  image: string;
  
  // Wear tracking fields
  wearCount: number;           // Total times worn
  wearHistory: WearEntry[];    // Detailed history
  lastWorn?: string;           // Last wear date
  averageWearFrequency?: number; // Days between wears
  costPerWear?: number;        // Price ÷ wearCount
  
  // Other fields...
  price?: number;
  purchaseDate?: string;
}
```

---

## 📈 Analytics & Insights

### Calculated Metrics

#### 1. **Cost Per Wear**
```typescript
function calculateCostPerWear(item: ClosetItem): number {
  if (!item.price || item.wearCount === 0) return 0;
  return item.price / item.wearCount;
}

// Example:
// $100 jacket worn 20 times = $5 per wear (Great value!)
// $50 dress worn 2 times = $25 per wear (Consider wearing more)
```

#### 2. **Wear Frequency**
```typescript
function calculateWearFrequency(item: ClosetItem): number {
  if (item.wearHistory.length < 2) return 0;
  
  const sortedDates = item.wearHistory
    .map(entry => new Date(entry.date))
    .sort((a, b) => a.getTime() - b.getTime());
  
  const firstWear = sortedDates[0];
  const lastWear = sortedDates[sortedDates.length - 1];
  const daysBetween = (lastWear - firstWear) / (1000 * 60 * 60 * 24);
  
  return daysBetween / item.wearCount; // Average days between wears
}
```

#### 3. **Most Worn By Category**
```typescript
function getMostWornByCategory(items: ClosetItem[]) {
  const byCategory = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
  
  return Object.entries(byCategory).map(([category, items]) => ({
    category,
    mostWorn: items.sort((a, b) => b.wearCount - a.wearCount)[0]
  }));
}
```

#### 4. **Seasonal Insights**
```typescript
function getSeasonalWearPatterns(wearHistory: WearEntry[]) {
  const seasons = {
    spring: [3, 4, 5],
    summer: [6, 7, 8],
    fall: [9, 10, 11],
    winter: [12, 1, 2]
  };
  
  const wearsBySeason = wearHistory.reduce((acc, entry) => {
    const month = new Date(entry.date).getMonth() + 1;
    const season = Object.keys(seasons).find(s => 
      seasons[s].includes(month)
    );
    acc[season] = (acc[season] || 0) + 1;
    return acc;
  }, {});
  
  return wearsBySeason;
}
```

---

## 🎯 User Experience Flows

### Morning Routine Flow
```
1. User wakes up
2. Chooses outfit (or uses planned outfit)
3. Gets dressed
4. Opens ZokaiHub app
5. Sees "What are you wearing today?" widget
6. Taps items in outfit (visual selection)
7. Done! Items logged in 10 seconds
```

### Evening Review Flow
```
1. 8 PM: Reminder notification
2. User opens app
3. Sees today's date with empty entries
4. Taps "Log Today's Outfit"
5. Selects items worn
6. Adds optional note ("Great for presentation!")
7. Saves
8. Gets insights: "Great choices! $4 cost-per-wear"
```

### Outfit Planning Flow
```
1. Sunday evening: Plan week's outfits
2. Save 5 outfits for Mon-Fri
3. Each morning: Notification "Today's outfit: Casual Monday"
4. User confirms: "Yes, wearing this"
5. All items auto-logged
6. End of week: See wear summary
```

---

## 🔐 Backend Integration (Supabase)

### Database Schema

#### `wear_entries` Table
```sql
CREATE TABLE wear_entries (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  item_id BIGINT REFERENCES closet_items(id),
  date DATE NOT NULL,
  occasion TEXT,
  weather TEXT,
  notes TEXT,
  outfit_id BIGINT REFERENCES saved_outfits(id),
  photo_url TEXT,
  location TEXT,
  method TEXT CHECK (method IN ('manual', 'outfit', 'photo', 'quick')),
  created_at TIMESTAMP DEFAULT NOW(),
  
  -- Prevent duplicate entries for same item on same day
  UNIQUE(user_id, item_id, date)
);
```

#### `closet_items` Table (Updated)
```sql
CREATE TABLE closet_items (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  price DECIMAL(10, 2),
  purchase_date DATE,
  
  -- Computed wear fields (updated via trigger)
  wear_count INTEGER DEFAULT 0,
  last_worn DATE,
  
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Trigger to Update Wear Count
```sql
CREATE OR REPLACE FUNCTION update_wear_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Update wear count
  UPDATE closet_items
  SET 
    wear_count = (
      SELECT COUNT(*) 
      FROM wear_entries 
      WHERE item_id = NEW.item_id
    ),
    last_worn = NEW.date
  WHERE id = NEW.item_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_wear_entry_insert
AFTER INSERT ON wear_entries
FOR EACH ROW
EXECUTE FUNCTION update_wear_count();
```

### API Endpoints

#### Log Wear Entry
```typescript
// POST /api/wear-entries
async function logWearEntry(data: {
  itemIds: number[];
  date: string;
  occasion?: string;
  notes?: string;
}) {
  const { data: entries, error } = await supabase
    .from('wear_entries')
    .insert(
      data.itemIds.map(itemId => ({
        user_id: currentUser.id,
        item_id: itemId,
        date: data.date,
        occasion: data.occasion,
        notes: data.notes,
        method: 'manual'
      }))
    );
  
  return entries;
}
```

#### Get Wear History
```typescript
// GET /api/items/:id/wear-history
async function getWearHistory(itemId: number) {
  const { data, error } = await supabase
    .from('wear_entries')
    .select('*')
    .eq('item_id', itemId)
    .order('date', { ascending: false });
  
  return data;
}
```

#### Get Today's Wears
```typescript
// GET /api/wear-entries/today
async function getTodayWears() {
  const today = new Date().toISOString().split('T')[0];
  
  const { data, error } = await supabase
    .from('wear_entries')
    .select(`
      *,
      closet_items (id, name, image_url, category)
    `)
    .eq('date', today)
    .eq('user_id', currentUser.id);
  
  return data;
}
```

---

## 🔔 Notification System

### Push Notification Setup

#### Daily Reminder
```typescript
// Schedule daily reminder
import { Notifications } from '@capacitor/push-notifications';

async function scheduleDailyReminder() {
  await Notifications.schedule({
    notifications: [
      {
        title: "Log your outfit!",
        body: "What did you wear today?",
        id: 1,
        schedule: { 
          at: new Date(new Date().setHours(20, 0, 0, 0)), // 8 PM
          repeats: true,
          every: 'day'
        },
        sound: 'default',
        actionTypeId: 'WEAR_LOG_REMINDER'
      }
    ]
  });
}
```

#### Smart Notification Logic
```typescript
async function shouldSendReminder(): Promise<boolean> {
  // Don't send if user already logged today
  const todayEntries = await getTodayWears();
  if (todayEntries.length > 0) return false;
  
  // Don't send if user disabled reminders
  const settings = await getUserSettings();
  if (!settings.wearTrackingReminders) return false;
  
  return true;
}
```

---

## 📊 Insights Dashboard

### Visual Reports

#### 1. **Wear Frequency Chart**
```
Items Worn Per Week
─────────────────────
Week 1: ████████ 8 items
Week 2: ██████ 6 items
Week 3: ██████████ 10 items
Week 4: ████████ 8 items
```

#### 2. **Category Distribution**
```
What You Wear Most
──────────────────
Tops:      ████████████ 45%
Bottoms:   ████████ 30%
Shoes:     █████ 15%
Outerwear: ███ 10%
```

#### 3. **Cost Per Wear Leaders**
```
Best Value Items
────────────────
1. White Sneakers    $2.44 per wear ⭐
2. Blue Jeans        $3.75 per wear
3. Black T-Shirt     $4.20 per wear
```

---

## 🎨 Gamification Ideas

### Achievements
- 🏆 "Consistent Logger" - Log 7 days in a row
- 💰 "Smart Shopper" - Get item below $5 per wear
- 👕 "Wardrobe Warrior" - Wear 50 different items in a month
- ♻️ "Sustainable Stylist" - Rewear items (low buy, high wear)

### Streaks
```
┌─────────────────────────┐
│  7 Day Logging Streak!  │
│  🔥🔥🔥🔥🔥🔥🔥           │
│  Keep it going!          │
└─────────────────────────┘
```

---

## 🚀 Implementation Roadmap

### Phase 1: Manual Logging (MVP)
- [x] Basic wear entry form
- [x] Quick log widget
- [x] Wear history display
- [x] Simple analytics

### Phase 2: Smart Features
- [ ] Daily reminders
- [ ] Outfit-based logging
- [ ] Calendar integration
- [ ] Advanced analytics

### Phase 3: AI Features
- [ ] Photo recognition
- [ ] Smart suggestions
- [ ] Pattern detection
- [ ] Seasonal recommendations

### Phase 4: Social & Gamification
- [ ] Share wear stats
- [ ] Achievements system
- [ ] Community challenges
- [ ] Sustainability scores

---

## 🎯 Summary

**How the app knows wear count:**

1. **User logs it manually** - Most common and accurate
2. **User marks outfit as worn** - Automatic for all items in outfit
3. **User takes photo (future)** - AI detects and logs automatically
4. **User confirms planned outfit** - Calendar integration
5. **Quick tap logging** - One-tap daily widget

**Key Features:**
- ✅ Multiple tracking methods for flexibility
- ✅ Smart reminders to encourage consistency
- ✅ Detailed analytics (cost-per-wear, frequency)
- ✅ Visual history and insights
- ✅ Gamification for engagement

**Database handles:**
- Storing each wear entry with details
- Automatic wear count updates via triggers
- Historical data for analytics
- Prevention of duplicate entries

The system is designed to be **flexible** (multiple methods), **convenient** (quick logging), and **insightful** (rich analytics) to encourage consistent tracking while providing valuable data about wardrobe usage.
