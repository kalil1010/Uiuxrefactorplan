# ZokaiHub Mobile Apps (iOS & Android)

This directory contains the React Native code for ZokaiHub mobile applications.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- React Native CLI
- Xcode (for iOS, Mac only)
- Android Studio (for Android)

### Installation

```bash
# Install dependencies
npm install

# iOS (Mac only)
cd ios && pod install && cd ..
npx react-native run-ios

# Android
npx react-native run-android
```

## 📁 Project Structure

```
mobile/
├── src/
│   ├── components/         # Reusable components
│   ├── screens/           # Screen components
│   ├── navigation/        # Navigation configuration
│   ├── services/          # API services
│   ├── hooks/             # Custom hooks
│   ├── theme/             # Theme and styling
│   └── utils/             # Utility functions
├── android/               # Android native code
├── ios/                   # iOS native code
└── App.tsx               # Entry point
```

## 🎨 Features

- ✅ Native performance
- ✅ Camera integration
- ✅ Swipeable cards (Tinder-style)
- ✅ Haptic feedback
- ✅ Gesture recognition
- ✅ Biometric authentication
- ✅ Push notifications
- ✅ Offline support
- ✅ Native animations
- ✅ Platform-specific UI

## 📦 Required Packages

```json
{
  "react-native": "^0.73.0",
  "react-navigation": "^6.0.0",
  "react-native-gesture-handler": "^2.14.0",
  "react-native-reanimated": "^3.6.0",
  "react-native-camera": "^4.2.0",
  "react-native-haptic-feedback": "^2.2.0",
  "react-native-vector-icons": "^10.0.0"
}
```

## 🔧 Building

### iOS
```bash
cd ios && pod install && cd ..
npx react-native run-ios --configuration Release
```

### Android
```bash
cd android
./gradlew assembleRelease
```

## 📱 Platform Support

- iOS 13.0+
- Android 6.0+ (API 23+)
