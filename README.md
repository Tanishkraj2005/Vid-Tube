# Vid-Tube (YouTube Clone)

A modern, fully functional YouTube clone built with **React JS**, **Vite**, and the **YouTube Data API v3**. It features Google Authentication via **Firebase**, a personalized Watch History, global state management for a Light/Dark Theme, and a fully responsive design for seamless mobile viewing.

## ✨ Features

- **Home Feed**: Explore the most popular videos across different categories (Gaming, Music, Sports, etc.).
- **Video Player**: Watch videos smoothly via iframe embeds, complete with video statistics, channel information, and a comment section.
- **Search Functionality**: A fully functioning search bar that lets you find any video on YouTube.
- **User Authentication**: Secure Google Sign-In powered by Firebase.
- **Watch History**:
  - Automatically records your watched videos locally for blazing-fast load times.
  - Syncs seamlessly to the cloud via **Firestore** if you are logged in.
- **Theme Toggle**: Instantly switch between Light Mode and Dark Mode; your preference is automatically saved.
- **Responsive UI**: A polished, mobile-friendly interface featuring a collapsable sidebar, auto-resizing grids, and clean navigation.
- **Settings Page**: Manage your account details, access your watch history, and change visual preferences in one place.

## 🛠️ Tech Stack

- **Frontend**: React (v19), Vite
- **Routing**: React Router DOM (v7)
- **State Management**: React Context API (`AuthContext`, `ThemeContext`), `useState`, `useEffect`
- **Backend / Auth**: Firebase (Authentication & Cloud Firestore)
- **Data Source**: YouTube Data API v3
- **Date Formatting**: Moment.js
- **Styling**: Vanilla CSS (CSS Variables for dynamic theming)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A Google Cloud Platform account (to obtain a YouTube Data API Key)
- A Firebase account (for Auth and Database)

### 1. Clone the Repository

```bash
git clone https://github.com/Tanishkraj2005/Vid-Tube.git
cd Vid-Tube
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup the YouTube API Key

Navigate to `src/data.js` and replace the placeholder API key with your actual YouTube Data API Key.

```javascript
// src/data.js
export const API_KEY = 'YOUR_YOUTUBE_API_KEY';
```

### 4. Setup Firebase

This project uses Firebase for Google Login and Firestore (for cloud-synced Watch History).

1. Go to your [Firebase Console](https://console.firebase.google.com/).
2. Create a new project (or use an existing one).
3. **Enable Authentication**: Go to Authentication -> Sign-in methods -> Enable "Google".
4. **Authorize Localhost**: In Authentication -> Settings -> Authorized domains, ensure `localhost` is listed.
5. **Enable Firestore Database**: Go to Firestore Database and click "Create database". Start in Test Mode or configure proper security rules to allow read/writes for authenticated users.

Copy your Firebase configuration object and paste it into `src/firebase.js`:

```javascript
// src/firebase.js
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### 5. Start the Development Server

```bash
npm run dev
```

Your app should now be running locally at `http://localhost:5173`.

## 📂 Project Structure

```
src/
├── assets/             # Icons, images, and logos
├── Components/
│   ├── Feed/           # Video grid for the homepage
│   ├── Navbar/         # Top navigation (Search, Theme Toggle, Profile)
│   ├── PlayVideo/      # Core video player, description, and comments
│   ├── Recommended/    # Sidebar of related videos on the player page
│   └── Sidebar/        # Collapsible side navigation with categories
├── Context/            # Global context (AuthContext.jsx, ThemeContext.jsx)
├── pages/
│   ├── Home/           # Main landing page
│   ├── Video/          # Video watching page
│   ├── Search/         # Search results page
│   ├── Settings/       # User preferences and profile page
│   └── History/        # Watch history page
├── App.jsx             # Route definitions and layout wrapper
├── data.js             # API Key and global utility functions
├── firebase.js         # Firebase initialization and auth exports
├── index.css           # Global CSS and Light/Dark CSS variables
└── main.jsx            # Application entry point
```

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
