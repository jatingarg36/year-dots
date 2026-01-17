# Year Progress Dots

## Overview

Year Progress Dots is a minimalist mobile application that visualizes year progress through an elegant dot grid. Each day of the year is represented as a dot, with completed days highlighted in gold, today marked with an animated pulse, and future days shown in subtle gray. The app follows a "brutally minimal with dramatic contrast" design philosophy, focusing on understated elegance and data-driven progress tracking.

The application is built as an Expo React Native app with an Express backend, supporting iOS, Android, and web platforms.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: Expo SDK 54 with React Native 0.81, using the new architecture and React 19.

**Navigation**: React Navigation v7 with native stack navigator. The app has a simple two-screen structure:
- `YearProgressScreen` - Main display showing the dot grid visualization
- `SettingsScreen` - Modal screen for customizing appearance (dot size, colors, spacing)

**State Management**: 
- React Context (`SettingsContext`) for app-wide settings persistence
- TanStack Query for server state management (prepared but minimal usage currently)
- AsyncStorage for local persistence of user preferences

**UI Components**: Custom themed components following a dark-mode-first design:
- `DotGrid` - Core visualization component with animated dots using Reanimated
- Themed base components (`ThemedText`, `ThemedView`, `Card`, `Button`)
- Settings controls (`SettingsSlider`, `SettingsToggle`, `ColorPicker`)

**Animation**: React Native Reanimated for performant animations, particularly the pulsing "today" dot effect.

**Styling Approach**: StyleSheet with a centralized theme system in `constants/theme.ts`. Dark mode colors are primary (near-black background #0A0A0A, gold accents #FFD700).

### Backend Architecture

**Framework**: Express 5 running on Node.js with TypeScript (tsx for development).

**API Structure**: RESTful API with routes prefixed by `/api`. Currently minimal - the app is primarily client-side.

**Storage**: 
- In-memory storage implementation (`MemStorage`) as default
- Drizzle ORM configured for PostgreSQL (schema defined but not actively used)
- User schema prepared with id, username, password fields

### Build System

**Development**: 
- `npm run expo:dev` - Runs Expo development server with Replit domain configuration
- `npm run server:dev` - Runs Express server with tsx

**Production**:
- `npm run expo:static:build` - Builds static web bundle via custom script
- `npm run server:build` - Bundles server with esbuild
- `npm run server:prod` - Runs production server

**Path Aliases**: 
- `@/` → `./client/`
- `@shared/` → `./shared/`

## External Dependencies

### Third-Party Services
- None currently integrated

### Database
- PostgreSQL via Drizzle ORM (configured in `drizzle.config.ts`)
- Schema location: `shared/schema.ts`
- Currently using in-memory storage; database provisioning required for persistence

### Key npm Packages
- **Expo ecosystem**: expo, expo-haptics, expo-blur, expo-image, expo-splash-screen
- **Navigation**: @react-navigation/native, @react-navigation/native-stack
- **Animations**: react-native-reanimated, react-native-gesture-handler
- **Storage**: @react-native-async-storage/async-storage
- **Data**: @tanstack/react-query, drizzle-orm, zod
- **Server**: express, pg, ws

### Environment Variables
- `DATABASE_URL` - PostgreSQL connection string (required for database features)
- `EXPO_PUBLIC_DOMAIN` - API server domain for client requests
- `REPLIT_DEV_DOMAIN` - Development domain for CORS and Expo configuration