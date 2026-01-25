# Year Progress Dots

Year Progress Dots is a minimalist mobile application that visualizes year progress through an elegant dot grid. Each day of the year is represented as a dot, with completed days highlighted in gold, today marked with an animated pulse, and future days shown in subtle gray.

## Features

- **Visual Progress Tracking**: unique dot grid visualization of the year.
- **Minimalist Design**: "Dark mode first" aesthetic with dramatic contrast.
- **Cross-Platform**: Built for iOS, Android, and Web.
- **Customizable**: Adjust dot size, colors, and spacing.

## Tech Stack

- **Frontend**: React Native (Expo SDK 54), React Navigation v7, Reanimated.
- **Backend**: Node.js with Express 5.
- **Storage**: AsyncStorage (local), Drizzle ORM (server - prepared).

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:

```bash
npm run expo:dev
```

Run on specific platforms:

```bash
npm run android
npm run ios
```

Start the backend server (optional for local dev):

```bash
npm run server:dev
```

## Project Structure

- `client/`: React Native Frontend code
- `server/`: Express Backend code
- `shared/`: Shared types and schemas
