# SnapMenu

SnapMenu is a mobile app that allows users to scan restaurant menus, recognize dish names, and retrieve images of those dishes using Google Custom Search API.

## Features

- Camera integration to take photos of menus
- Text recognition to detect dish names from menu photos
- Image search to find pictures of selected dishes
- User authentication with email/password
- Save scanned dishes to user profile
- View saved dishes in profile screen

## Technologies Used

- React Native
- Expo
- TypeScript
- Supabase for authentication and database
- expo-camera for camera access
- expo-text-recognition for OCR
- expo-router for navigation
- Google Custom Search API for image search

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Supabase account
- Google Custom Search API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/snapmenu.git
cd snapmenu
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Open `api/supabase.ts` and replace the placeholder values with your Supabase URL and anon key
   - Open `api/dishService.ts` and replace the placeholder values with your Google API key and Search Engine ID

4. Start the development server:
```bash
npm start
```

5. Scan the QR code with Expo Go app on your device or use an emulator

### Supabase Database Setup

1. Create a new project in Supabase
2. Create a new table called `dishes` with the following columns:
   - `id` (UUID, primary key)
   - `name` (text)
   - `imageUrl` (text)
   - `userId` (UUID, foreign key to auth.users)
   - `createdAt` (timestamp with time zone)
3. Set up Row Level Security (RLS) for the dishes table to ensure users can only see their own dishes

### Google Custom Search API Setup

1. Create a new project in Google Cloud Console
2. Enable the Custom Search API
3. Create API credentials to get your API key
4. Set up a Custom Search Engine in Google Programmable Search Engine and note the Search Engine ID

## Usage

1. Sign up or log in to the app
2. Tap the camera tab to scan a menu
3. Take a photo of a restaurant menu
4. The app will detect text and display potential dish names
5. Select a dish name to see an image of that dish
6. Save dishes to your profile
7. View your saved dishes in the profile tab

## License

MIT 