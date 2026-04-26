<div align="center">

<img src="https://img.shields.io/badge/Vid--Tube-YouTube%20Clone-red?style=for-the-badge&logo=youtube&logoColor=white" alt="Vid-Tube" />

# 🎬 Vid-Tube

### A pixel-perfect, full-stack YouTube clone built with React & Firebase

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%2B%20Firestore-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![YouTube API](https://img.shields.io/badge/YouTube-Data%20API%20v3-FF0000?style=flat-square&logo=youtube)](https://developers.google.com/youtube/v3)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

<br/>

> **Watch real YouTube videos. Search anything. Sign in with Google. Track your history.**  
> Built from scratch — no UI libraries, no Tailwind. Pure React + Vanilla CSS.

<br/>

---

</div>

## ✨ Features at a Glance

| 🏠 Home Feed | 🔍 Search | 🎥 Video Player |
|:---:|:---:|:---:|
| Real trending videos by category | Live YouTube search results | Autoplay with fullscreen landscape lock |

| 👤 Auth | 🕒 History | ⚙️ Settings |
|:---:|:---:|:---:|
| Google Sign-In via Firebase | Auto-saved to LocalStorage + Firestore | Theme, Account, History management |

<br/>

## 🚀 Live Features

- 🔴 **Real Data** — Every video, comment, and subscriber count is live from the YouTube Data API
- 🌗 **Dark / Light Mode** — Instant toggle with persistent preference
- 📱 **Fully Responsive** — Works flawlessly on phone, tablet, and desktop
- 🔐 **Google Authentication** — One-click sign in with Firebase
- 📺 **Fullscreen Landscape** — Auto-rotates to landscape on Android when going fullscreen
- 🔀 **Shuffled Feed** — Videos reorder on every reload for a fresh feel
- 🕹️ **Sidebar Navigation** — Collapsible, closes automatically on mobile after selection
- 🗑️ **Clear History** — Wipes LocalStorage and Firestore simultaneously

<br/>

---

## 🛠️ Tech Stack

```
Frontend      → React 19 + Vite 5
Routing       → React Router DOM v7
Auth          → Firebase Authentication (Google Provider)
Database      → Firebase Cloud Firestore
API           → YouTube Data API v3
State         → React Context API (AuthContext, ThemeContext)
Styling       → Vanilla CSS (CSS Variables for theming)
Dates         → Moment.js
```

<br/>

---

## 📦 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/Tanishkraj2005/Vid-Tube.git
cd Vid-Tube
npm install
```

### 2. Get a YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project → Enable **YouTube Data API v3**
3. Create credentials → **API Key**

Paste it into `src/data.js`:

```js
export const API_KEY = "YOUR_YOUTUBE_API_KEY";
```

### 3. Setup Firebase

<details>
<summary><b>Click to expand Firebase setup steps</b></summary>

1. Go to [Firebase Console](https://console.firebase.google.com/) → Create a project
2. **Authentication** → Sign-in methods → Enable **Google**
3. **Firestore Database** → Create database → Start in Test Mode
4. **Project Settings** → Copy your config object

Paste it into `src/firebase.js`:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

> ⚠️ **Never commit real API keys to a public repo.** Use `.env` files in production.

</details>

### 4. Run Locally

```bash
npm run dev
```

Open → `http://localhost:5173` 🎉

<br/>

---

## 📂 Project Structure

```
src/
├── assets/              # Icons and images (18 files, all in use)
├── Components/
│   ├── Feed/            # Home page video grid
│   ├── Navbar/          # Search, theme toggle, auth dropdown
│   ├── PlayVideo/       # Video iframe, stats, comments, history tracking
│   ├── Recommended/     # Right-side related videos panel
│   └── Sidebar/         # Collapsible category navigation
├── pages/
│   ├── Home/            # Landing page with category feed
│   ├── Video/           # Full video + recommended layout
│   ├── Search/          # Search results page
│   ├── History/         # Watch history with clear button
│   └── Settings/        # Theme + account + history management
├── App.jsx              # Routes + global state (sidebar, category)
├── AuthContext.jsx      # Firebase auth state provider
├── ThemeContext.jsx     # Dark/light mode state provider
├── data.js              # API key + utility functions
└── firebase.js          # Firebase app initialization
```

<br/>

---

## 📱 Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| `> 900px` | Full sidebar + wide feed grid |
| `600–900px` | Collapsed icon-only sidebar |
| `< 600px` | Sidebar hidden (hamburger overlay), single-column feed |
| Landscape | Video player auto-expands to 80vh height |

<br/>

---

## 🔒 Environment & Security

> **Important:** Your Firebase config and YouTube API key are currently stored directly in source files.  
> Before making this repository public, move them to environment variables:

```bash
# .env (already gitignored)
VITE_YOUTUBE_API_KEY=your_key_here
VITE_FIREBASE_API_KEY=your_key_here
```

Then reference with `import.meta.env.VITE_YOUTUBE_API_KEY` in your code.

<br/>

---

## 🗺️ Roadmap

- [ ] Move API keys to `.env` variables
- [ ] Liked Videos (similar schema to Watch History)
- [ ] Channel page on clicking a channel name
- [ ] Pagination / infinite scroll on the feed
- [ ] Firebase Firestore security rules for production

<br/>

---

<div align="center">

Made with ❤️ by **Tanishk Raj**

[![GitHub](https://img.shields.io/badge/GitHub-Tanishkraj2005-181717?style=flat-square&logo=github)](https://github.com/Tanishkraj2005)

</div>
