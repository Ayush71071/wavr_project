 🎵 WAVR — Premium Music Streaming Web App

WAVR is a premium, Spotify-inspired music streaming application designed with a stunning dark glassmorphic UI, responsive 3-panel dashboard layout, robust Redux state management, and fully integrated real-time HTML5 audio streaming.

---

## ✨ Features

- 🎧 **Smooth Real-time Audio Playback**: Fully integrated browser-native HTML5 Audio stream rendering with instant response.
- 🎚️ **Linear Seeking & Volume Control**: Click or drag the progress bar to seek through tracks instantly, or slide the volume controller to adjust amplification in real-time.
- 🔀 **Shuffle & Repeat**: Built-in queue-management tools supporting random shuffle indices and single-track repeating loops.
- ⏭️ **Auto-Advance Playback**: Smooth, automated transition to the next queued track once a song completes playing.
- ❤️ **Liked Songs System**: Interactive like/unlike triggers synced seamlessly to a persistent favorites drawer.
- 🔍 **Live Dashboard Filter**: Dynamic live search interface filtering through artists, tracks, and genres on the fly.
- 📊 **Dynamic Equalizer Visualization**: Wave-like active equalizer bars that animate dynamically on the currently playing track.
- 🎨 **Sleek Pure CSS Theme**: A beautiful custom glassmorphism theme engineered exclusively with CSS variables, rich gradients, smooth micro-animations, and modern Syne & DM Sans typography.

---

## 🏗️ Technical Architecture & Design Patterns

WAVR enforces a clean separation of concerns across React, CSS, and pure JavaScript:

```
wavr/
├── public/
│   └── index.html          # HTML5 Canvas mounting root
├── src/
│   ├── components/         # React Component Layer (.jsx + .css)
│   │   ├── AlbumArt.jsx    # Generates custom gradients + emoji artwork cards
│   │   ├── AlbumArt.css    # Card effects, hover glows, and aspect-ratio styling
│   │   ├── Sidebar.jsx     # Navigation tabs & curated playlist items
│   │   ├── Sidebar.css     # Sticky sidebar layout and link active states
│   │   ├── MainContent.jsx # Music catalog, live search, and song list
│   │   ├── MainContent.css # Dynamic grid adjustments and tracks lists layout
│   │   ├── RightPanel.jsx  # Detailed "Now Playing" cover panel and queue
│   │   ├── RightPanel.css  # Side-panel animations and detail sliders
│   │   ├── PlayerBar.jsx   # Playback console (volume, timeline slider, action buttons)
│   │   └── PlayerBar.css   # Persistent footer bar, slider trackers, and control buttons
│   ├── data/
│   │   └── tracks.js       # Curated music catalog data & playlist definitions (pure JS)
│   ├── redux/              # Redux State Management Layer (pure JS)
│   │   ├── store.js        # Global Redux Store mounting point
│   │   ├── playerSlice.js  # Player actions (prev, next, volume, shuffle, repeat, likes)
│   │   └── uiSlice.js      # Active navigation & search indexing selectors
│   ├── utils/              # Utility Classes (pure JS)
│   │   └── audioController.js # Centralized HTML5 Audio Singleton Manager
│   ├── App.js              # Layout mounting and React-to-Audio synchronization hook
│   ├── App.css             # Main 3-panel CSS Grid grid system
│   ├── index.js            # Provider mounting
│   └── index.css           # Global typography definitions, custom properties (variables), reset rules
├── package.json            # Scripts & Dependency management definitions
└── vercel.json             # Vercel single-page deployment rules
```

### 🧠 The Audio Singleton Pattern
To prevent React re-renders from creating multiple audio element instances, causing stuttering, or leaking memory in the DOM, WAVR implements an **Audio Singleton Controller** (`src/utils/audioController.js`).

1. **Decoupled Playback Engine**: The standard browser `Audio` element resides inside a persistent JavaScript class instance outside of React's lifecycle.
2. **Dynamic Redux Sync**: The main hook in `App.js` listens to audio-native events (`timeupdate` and `ended`) and forwards progress updates or automatic track advancements straight to the Redux store.
3. **Instant Interactive seeking**: Volume and timeline adjustments from user clicks on the progress bar bypass Redux middleware lags, updating the audio hardware directly and instantaneously.

---

## ⚡ Tech Stack

- **Framework**: React 18
- **State Management**: Redux Toolkit & React-Redux
- **Styling**: Vanilla CSS (Custom properties, grid systems, flexboxes, and micro-transitions)
- **Typography**: Syne (Headers) + DM Sans (Body)
- **Audio Delivery**: Direct HTML5 streaming over HTTP (with high-quality, royalty-free audio sources)

---

## 🚀 Getting Started

To run the application locally on your computer, follow these simple setup instructions:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation & Run

1. Clone or navigate into the project directory:
   ```bash
   cd wavr-project/wavr
   ```

2. Install the necessary package dependencies:
   ```bash
   npm install
   ```

3. Launch the Webpack local development server:
   ```bash
   npm start
   ```

The application will launch automatically in your browser at **[http://localhost:3000](http://localhost:3000)**!

---
