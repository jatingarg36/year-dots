# Year Progress Dots

Year Progress Dots is a minimalist mobile application that visualizes year progress through an elegant dot grid. Each day of the year is represented as a dot, with completed days highlighted in gold, today marked with an animated pulse, and future days shown in subtle gray.

## Features

- **Visual Progress Tracking**: Unique dot grid visualization of the year.
- **Minimalist Design**: "Dark mode first" aesthetic with dramatic contrast.
- **Cross-Platform**: Built for iOS, Android, and Web.
- **Customizable**: Adjust dot size, colors, and spacing.
- **Native Widget**: Includes a native Android Live Wallpaper service.

## Tech Stack

- **Frontend**: React Native (Expo SDK 54), React Navigation v7, Reanimated.
- **Backend**: Node.js with Express 5 (for API and sync features).
- **Storage**: AsyncStorage (local preferences), Drizzle ORM (backend).
- **Native Integration**: Kotlin (Android) and Swift (iOS) for platform-specific features.

## Project Structure

The project is organized into the following key directories:

- **`client/`**: The main React Native application source code.
    - `screens/`: Application screens (Year Progress, Settings).
    - `components/`: Reusable UI components (DotGrid, ColorPicker).
    - `constants/`: Theme and configuration constants.
    - `lib/`: Utility functions and storage helpers.
- **`server/`**: The Node.js/Express backend server.
- **`shared/`**: Types and schemas shared between client and server.
- **`android/`**: Generated Android native project (Gradle based).
- **`ios/`**: Generated iOS native project (Xcode based).
- **`scripts/`**: Build and utility scripts.

## Getting Started

### Prerequisites

- **Node.js** (v18 or newer)
- **npm** or **yarn**
- **Mobile Development Environment**:
    - **Android**: Android Studio, JDK 17, Android SDK.
    - **iOS**: Xcode (macOS only), CocoaPods.

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

Start the development server:
```bash
npm run expo:dev
```

Run on specific platforms:

```bash
# Android
npm run android

# iOS
npm run ios
```

## Downloads

### Android
You can download the latest Android APK from the Releases section of this repository.
1. Download `app-release.apk`.
2. Install it on your device.
   > **Note**: Play Protect might warn you since this is signed with a debug key. You can safely ignore this and proceed.

### iOS
Due to Apple's signing requirements, we cannot provide a pre-built IPA. Please follow the **Building for Production** instructions below to build and install it using Xcode.

## Building for Production

This project uses Expo "Prebuild" (Bare Workflow), meaning native directories (`android` and `ios`) are present and can be built using standard native tools.

### Android (APK/AAB)

1. **Navigate to the android directory**:
   ```bash
   cd android
   ```

2. **Clean the build**:
   ```bash
   ./gradlew clean
   ```

3. **Build the release APK**:
   ```bash
   ./gradlew assembleRelease
   ```
   The APK will be located at `android/app/build/outputs/apk/release/app-release.apk`.

   > **Note**: For the Play Store, you should generate an App Bundle (AAB) instead:
   > ```bash
   > ./gradlew bundleRelease
   > ```

4. **Signing**: By default, this will produce an unsigned or debug-signed APK. To sign it for release, verify your `android/app/build.gradle` signing config or set up a `keystore.properties` file.

### iOS (IPA)

*Requires macOS and Xcode.*

1. **Install Pods**:
   ```bash
   cd ios
   pod install
   cd ..
   ```

2. **Open the Workspace**:
   Open `ios/YearProgress.xcworkspace` in Xcode.

3. **Configure Signing**:
   - In Xcode, select the **YearProgress** project in the navigator.
   - Go to the **Signing & Capabilities** tab.
   - Select your **Team** and ensure the Bundle Identifier matches your Apple Developer account provisioning profile.

4. **Archive**:
   - Select **Product > Archive** from the menu bar.
   - Once checking is complete, the Organizer window will open, allowing you to **Distribute App** to the App Store or Ad Hoc.

## Documentation

For more design details, see [design_guidelines.md](./design_guidelines.md).
