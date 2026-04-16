# 📱 Building ZokaiHub Mobile Apps

Complete step-by-step guide to build native iOS and Android apps from your React Native code.

---

## 🚀 Prerequisites Setup

### **1. Install Development Tools**

#### **macOS (for both iOS & Android)**
```bash
# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node
brew install watchman

# Install CocoaPods (for iOS)
sudo gem install cocoapods

# Install Java (for Android)
brew install --cask zulu@17
```

#### **Windows (Android only)**
```bash
# Install Chocolatey (package manager)
# Then install Node.js
choco install nodejs

# Install Java
choco install microsoft-openjdk17
```

### **2. Install React Native CLI**
```bash
npm install -g react-native-cli
```

### **3. Install Xcode (macOS only - for iOS)**
- Download from Mac App Store
- Open Xcode → Preferences → Locations
- Set Command Line Tools to latest Xcode version

### **4. Install Android Studio**
- Download from https://developer.android.com/studio
- During installation, select:
  - Android SDK
  - Android SDK Platform
  - Android Virtual Device
- Set environment variables:

```bash
# Add to ~/.bash_profile or ~/.zshrc
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

---

## 📦 Project Setup

### **1. Initialize the Project**

```bash
# Navigate to mobile directory
cd mobile

# Install dependencies
npm install

# iOS only - Install pods
cd ios
pod install
cd ..
```

### **2. Link Assets (Icons, Fonts)**

```bash
# Auto-link native modules
npx react-native link
```

---

## 🍎 Building for iOS

### **Development Build (Testing)**

```bash
# Method 1: Using CLI
npx react-native run-ios

# Method 2: Specific device
npx react-native run-ios --device "iPhone 14 Pro"

# Method 3: Using Xcode
open ios/ZokaiHub.xcworkspace
# Press Cmd+R to build and run
```

### **Production Build (App Store)**

1. **Configure App Info**
   ```bash
   # Edit ios/ZokaiHub/Info.plist
   # Set:
   # - CFBundleDisplayName: ZokaiHub
   # - CFBundleIdentifier: com.zokaihub.app
   # - CFBundleVersion: 1.0.0
   ```

2. **Add App Icon**
   - Prepare 1024x1024 PNG icon
   - Use https://appicon.co to generate all sizes
   - Replace images in `ios/ZokaiHub/Images.xcassets/AppIcon.appiconset/`

3. **Configure Signing**
   - Open `ios/ZokaiHub.xcworkspace` in Xcode
   - Select ZokaiHub target
   - Go to Signing & Capabilities
   - Select your Team
   - Enable "Automatically manage signing"

4. **Build Archive**
   ```bash
   # Clean build
   cd ios
   xcodebuild clean -workspace ZokaiHub.xcworkspace -scheme ZokaiHub
   
   # Create archive
   xcodebuild archive \
     -workspace ZokaiHub.xcworkspace \
     -scheme ZokaiHub \
     -archivePath ./build/ZokaiHub.xcarchive
   
   # Export IPA
   xcodebuild -exportArchive \
     -archivePath ./build/ZokaiHub.xcarchive \
     -exportPath ./build \
     -exportOptionsPlist ExportOptions.plist
   ```

5. **Upload to App Store**
   - Use Xcode → Window → Organizer
   - Select archive → Distribute App
   - Upload to App Store Connect

---

## 🤖 Building for Android

### **Development Build (Testing)**

```bash
# Start Metro bundler
npm start

# In another terminal, run Android
npx react-native run-android

# Or specific variant
npx react-native run-android --variant=debug
```

### **Production Build (Google Play)**

1. **Generate Signing Key**
   ```bash
   cd android/app
   keytool -genkeypair -v -storetype PKCS12 \
     -keystore zokaihub-release-key.keystore \
     -alias zokaihub-key-alias \
     -keyalg RSA -keysize 2048 -validity 10000
   
   # Enter a strong password and remember it!
   ```

2. **Configure Gradle**
   
   Create `android/gradle.properties`:
   ```properties
   MYAPP_RELEASE_STORE_FILE=zokaihub-release-key.keystore
   MYAPP_RELEASE_KEY_ALIAS=zokaihub-key-alias
   MYAPP_RELEASE_STORE_PASSWORD=YOUR_KEYSTORE_PASSWORD
   MYAPP_RELEASE_KEY_PASSWORD=YOUR_KEY_PASSWORD
   ```

   Edit `android/app/build.gradle`:
   ```gradle
   android {
       ...
       signingConfigs {
           release {
               storeFile file(MYAPP_RELEASE_STORE_FILE)
               storePassword MYAPP_RELEASE_STORE_PASSWORD
               keyAlias MYAPP_RELEASE_KEY_ALIAS
               keyPassword MYAPP_RELEASE_KEY_PASSWORD
           }
       }
       buildTypes {
           release {
               signingConfig signingConfigs.release
               minifyEnabled true
               proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
           }
       }
   }
   ```

3. **Update App Info**
   
   Edit `android/app/build.gradle`:
   ```gradle
   android {
       defaultConfig {
           applicationId "com.zokaihub.app"
           minSdkVersion 23
           targetSdkVersion 34
           versionCode 1
           versionName "1.0.0"
       }
   }
   ```

4. **Add App Icon**
   - Prepare 512x512 PNG icon
   - Use https://icon.kitchen or Android Studio
   - Replace icons in `android/app/src/main/res/mipmap-*/`

5. **Build APK/AAB**
   ```bash
   cd android
   
   # Build APK (for testing)
   ./gradlew assembleRelease
   # Output: android/app/build/outputs/apk/release/app-release.apk
   
   # Build AAB (for Google Play)
   ./gradlew bundleRelease
   # Output: android/app/build/outputs/bundle/release/app-release.aab
   ```

6. **Upload to Google Play**
   - Go to https://play.google.com/console
   - Create new app
   - Upload AAB file
   - Fill in store listing details
   - Submit for review

---

## 🎨 Customization

### **Change App Name**

**iOS:**
```xml
<!-- ios/ZokaiHub/Info.plist -->
<key>CFBundleDisplayName</key>
<string>ZokaiHub</string>
```

**Android:**
```xml
<!-- android/app/src/main/res/values/strings.xml -->
<resources>
    <string name="app_name">ZokaiHub</string>
</resources>
```

### **Change Bundle ID / Package Name**

**iOS:**
- Open Xcode
- Select project → Target
- General → Bundle Identifier

**Android:**
```bash
# Use react-native-rename package
npx react-native-rename "ZokaiHub" -b com.zokaihub.app
```

### **Splash Screen**

**iOS:**
- Edit `ios/ZokaiHub/LaunchScreen.storyboard` in Xcode

**Android:**
```bash
# Install package
npm install react-native-splash-screen

# Follow setup: https://github.com/crazycodeboy/react-native-splash-screen
```

---

## 🧪 Testing

### **Run on Simulator/Emulator**

```bash
# iOS Simulator
npx react-native run-ios --simulator="iPhone 14 Pro"

# Android Emulator (start emulator first)
npx react-native run-android
```

### **Run on Physical Device**

**iOS:**
- Connect iPhone via USB
- Trust computer on device
- Select device in Xcode
- Press Run

**Android:**
- Enable Developer Mode on phone
- Enable USB Debugging
- Connect via USB
- Run: `npx react-native run-android`

---

## 📊 App Store Assets

### **Screenshots Required**

**iOS:**
- 6.5" Display: 1284 x 2778 px (iPhone 14 Pro Max)
- 5.5" Display: 1242 x 2208 px (iPhone 8 Plus)
- iPad Pro: 2048 x 2732 px

**Android:**
- Phone: 1080 x 1920 px minimum
- 7" Tablet: 1200 x 1920 px
- 10" Tablet: 1600 x 2560 px

### **App Icons**

**iOS:** 1024 x 1024 px (no transparency)
**Android:** 512 x 512 px (can have transparency)

### **Promotional Graphics (Android)**

- Feature Graphic: 1024 x 500 px

---

## 🚨 Common Issues & Solutions

### **Metro Bundler Issues**
```bash
# Clear cache
npx react-native start --reset-cache

# Clean build
cd android && ./gradlew clean && cd ..
cd ios && xcodebuild clean && cd ..
```

### **Pod Install Fails (iOS)**
```bash
cd ios
pod deintegrate
pod cache clean --all
pod install
```

### **Gradle Build Fails (Android)**
```bash
cd android
./gradlew clean
./gradlew assembleDebug --stacktrace
```

### **Camera Not Working**
Add permissions to `Info.plist` (iOS) and `AndroidManifest.xml` (Android)

---

## 📱 App Store Submission Checklist

### **iOS App Store**
- [ ] Apple Developer Account ($99/year)
- [ ] App Icon (1024x1024)
- [ ] Screenshots (all required sizes)
- [ ] Privacy Policy URL
- [ ] Support URL
- [ ] App description
- [ ] Keywords
- [ ] Age rating
- [ ] Build uploaded via Xcode

### **Google Play Store**
- [ ] Google Play Developer Account ($25 one-time)
- [ ] App Icon (512x512)
- [ ] Feature Graphic (1024x500)
- [ ] Screenshots (at least 2)
- [ ] Privacy Policy URL
- [ ] Short description (80 chars)
- [ ] Full description (4000 chars)
- [ ] Category
- [ ] Content rating
- [ ] AAB uploaded

---

## 🎉 Success!

Your ZokaiHub mobile apps are now ready for iOS and Android!

For questions or issues, check:
- React Native Docs: https://reactnative.dev
- iOS Deployment: https://reactnative.dev/docs/publishing-to-app-store
- Android Deployment: https://reactnative.dev/docs/signed-apk-android
