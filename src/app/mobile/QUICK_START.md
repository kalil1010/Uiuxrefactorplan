# 🚀 Quick Start Guide - 5 Minutes to Running App

## ⚡ Fastest Way to See Your App

### **Option 1: iOS Simulator (Mac Only)**

```bash
# Step 1: Install dependencies (2 min)
cd mobile
npm install
cd ios && pod install && cd ..

# Step 2: Run app (1 min)
npx react-native run-ios

# Done! App opens in iOS Simulator 🎉
```

### **Option 2: Android Emulator**

```bash
# Step 1: Install dependencies (2 min)
cd mobile
npm install

# Step 2: Start emulator (1 min)
# Open Android Studio → AVD Manager → Run emulator

# Step 3: Run app (1 min)
npx react-native run-android

# Done! App opens in Android Emulator 🎉
```

---

## 📱 What You'll See

1. **Service Selection Screen**
   - 3 beautiful gradient cards
   - Choose: Hair / Nails / Try-On
   
2. **Camera Screen**
   - Full-screen camera view
   - Positioning guides
   - Take photo button

3. **AI Analyzing**
   - Animated loading (2 seconds)
   - Shows analysis steps

4. **Swipe Cards (Tinder-style!)**
   - ➡️ Swipe right to LOVE
   - ⬅️ Swipe left to PASS
   - 👆 Tap to preview

5. **Full Preview**
   - Full-screen image
   - Style details
   - Save/Share buttons

---

## 🎯 Test The Features

### **Camera:**
- Take a photo
- Or use "Sample" button to skip

### **Swipe Cards:**
- **Mouse:** Click and drag left/right
- **Touch:** Swipe with finger
- **Buttons:** Use heart ❤️ or X ✖️ at bottom

### **Preview:**
- Tap the eye 👁️ button
- Full-screen view opens
- Scroll for details

---

## 🐛 Troubleshooting

### **Metro Bundler Won't Start**
```bash
npx react-native start --reset-cache
```

### **iOS Build Fails**
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
npx react-native run-ios
```

### **Android Build Fails**
```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

### **"Command not found" Error**
```bash
# Install React Native CLI globally
npm install -g react-native-cli
```

---

## 📂 Project Files

```
mobile/
├── App.tsx                    # Entry point
├── package.json              # Dependencies
│
├── src/
│   ├── screens/
│   │   ├── ServiceSelectionScreen.tsx   # First screen
│   │   ├── CameraScreen.tsx             # Camera
│   │   ├── AnalyzingScreen.tsx          # Loading
│   │   ├── BrowseScreen.tsx             # Swipe cards
│   │   └── PreviewScreen.tsx            # Full preview
│   │
│   ├── navigation/
│   │   └── AppNavigator.tsx             # Routes
│   │
│   └── theme/
│       └── colors.ts                    # Brand colors
│
├── android/                   # Android code
└── ios/                      # iOS code
```

---

## 🎨 Customize Colors

Edit `/mobile/src/theme/colors.ts`:

```typescript
export const colors = {
  primary: '#6556C6',     // Your purple
  accent: '#D20EC1',      // Your magenta
  pink: '#C1004C',        // Change these!
  coral: '#F04050',
  yellow: '#FFC600',
};
```

---

## 📱 Run on Real Device

### **iOS:**
1. Connect iPhone via USB
2. Open `ios/ZokaiHub.xcworkspace` in Xcode
3. Select your device
4. Press ▶️ Run

### **Android:**
1. Enable Developer Mode on phone
2. Enable USB Debugging
3. Connect via USB
4. Run: `npx react-native run-android`

---

## 🚢 Build for Production

See `BUILD_INSTRUCTIONS.md` for complete guide.

**Quick commands:**

```bash
# Android APK
cd android && ./gradlew assembleRelease

# iOS Archive
cd ios && xcodebuild archive
```

---

## ✅ Next Steps

1. ✅ Run the app (you just did this!)
2. ✅ Test all features
3. ✅ Customize branding
4. ✅ Add your app icons
5. ✅ Build and publish

---

## 💡 Key Commands

```bash
# Start fresh
npm start -- --reset-cache

# Clean iOS build
cd ios && xcodebuild clean && cd ..

# Clean Android build
cd android && ./gradlew clean && cd ..

# Check setup
npx react-native doctor

# View logs
npx react-native log-ios     # iOS logs
npx react-native log-android # Android logs
```

---

## 🎉 You're Running!

Your ZokaiHub mobile app is now running on your device/simulator!

Swipe some cards, preview styles, and explore the app! 🚀

**Questions?** Check `MOBILE_APP_OVERVIEW.md` or `BUILD_INSTRUCTIONS.md`
