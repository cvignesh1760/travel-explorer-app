# 🌍 Travel Explorer App

A modern, cross-platform mobile application built for the **GDGC VNRVJIET - App Development Domain Volunteer Recruitment Assignment**.

**Travel Explorer** helps wanderers discover captivating destinations across India, explore curated attractions, get live real-time weather forecasts, open locations directly in Google Maps, and manage a personalized travel wishlist preserved across app sessions.

---

## 📌 Project Overview

- **Applicant Domain:** App Development (GDGC VNRVJIET)
- **Framework:** React Native with Expo SDK 58 (Universal: Android, iOS & Web)
- **Language / Runtime:** JavaScript (React 19), Node.js
- **State Management & Persistence:** React Context API + `@react-native-async-storage/async-storage`
- **Weather Service:** Open-Meteo REST API (Real-time live weather feeds, zero API key required)
- **Maps & External Linking:** React Native `Linking` API (Direct Google Maps navigation)

---

## ✨ Features & Assignment Checklist

### 🌟 Core Requirement Stages

#### 🏝️ Stage 1: Destination Discovery
- [x] **Diverse Categories**: Includes curated destinations spanning all major categories:
  - 🏖️ **Beaches**: Goa, Andaman & Nicobar Islands
  - ⛰️ **Mountains**: Manali, Munnar, Auli
  - 🏛️ **Heritage**: Jaipur (Pink City), Varanasi
  - 🧗 **Adventure**: Rishikesh, Leh-Ladakh
- [x] **Rich Card Information**: Each destination card features a high-definition image, name, state/region location, category badge, rating score, reviews count, and budget indicator.
- [x] **Responsive Grid / List Layout**: Polished mobile-first layout with smooth elevation and visual hierarchy.

#### 🗺️ Stage 2: Navigation & Destination Details
- [x] **Seamless Tab & Screen Navigation**: Effortless routing between **Home**, **Search**, **AI Matcher**, **Wishlist**, and **Destination Details**.
- [x] **Detailed Overview**: Engaging, informative description and regional context for each destination.
- [x] **Best Time to Visit**: Highlighted seasonal recommendation banner detailing optimal months and reasons to visit (e.g., weather conditions, festivities).
- [x] **Popular Attractions Showcase**: Displays 2–3 handpicked attractions per destination with dedicated photo cards, names, and descriptive summaries (e.g., *Baga Beach*, *Fort Aguada*, *Dudhsagar Falls* in Goa).

#### 🔍 Stage 3: Search & Filtering
- [x] **Real-Time Search Bar**: Instantaneous filtering by destination name, city, state, or keywords with a clear button.
- [x] **Dynamic Category Filter**: Horizontal pill carousel allowing users to toggle between **All**, **Beaches**, **Mountains**, **Heritage**, and **Adventure**.
- [x] **Combined Filter Logic**: Search query and category filter operate harmoniously in conjunction.
- [x] **Empty State Handling**: Friendly illustrated empty states if search terms yield no results, with a one-tap filter reset button.

#### ❤️ Stage 4: Travel Wishlist
- [x] **One-Tap Wishlist Toggle**: Add or remove destinations via heart icons on cards, the hero details header, or the sticky action button.
- [x] **Dedicated Wishlist Screen**: Dedicated view presenting all saved destinations with thumbnail, title, location, and remove actions.
- [x] **Reactive Global Synchronization**: Adding or removing items anywhere updates the home feed, search feed, details screen, and bottom navigation badge instantly.
- [x] **Clear All & Removal**: Individual delete button and bulk clear option.

---

### 🚀 Extension Challenges (All 4 Completed)

#### 1. 🤖 Smart Destination Matcher (AI Travel Assistant)
- Recommends personalized destinations through a multi-factor matching engine based on:
  - **Travel Vibe**: *Beach & Leisure*, *Nature & Mountains*, *Culture & Heritage*, *Adventure & Thrills*
  - **Budget Range**: *Budget-Friendly (₹)*, *Comfort/Mid (₹₹)*, *Luxury (₹₹₹)*
  - **Trip Duration**: *Weekend (2-3 days)*, *Standard (4-6 days)*, *Expedition (7+ days)*
- Dynamically scores all destinations and displays match compatibility percentages (e.g., **98% Match**).

#### 2. ☀️ Live Weather Integration
- Integrated with the **Open-Meteo Live API** (`https://api.open-meteo.com/v1/forecast`) based on exact geographic coordinates (`latitude` & `longitude`).
- Displays live temperature in °C, apparent temperature ("Feels like"), weather conditions (Sunny, Partly Cloudy, Drizzle, Snow), relative humidity %, wind speed (km/h), and a manual refresh trigger.

#### 3. 📍 Google Maps Integration
- Direct "View on Google Maps" button in Destination Details using deep-link URLs (`https://www.google.com/maps/search/?api=1&query=...`).
- Allows users to open coordinates in the native Google Maps app or browser to view directions and explore nearby attractions.

#### 4. 💾 Local Storage Persistence
- Leverages `@react-native-async-storage/async-storage` to preserve the user's saved wishlist locally on the device.
- Wishlist items automatically restore upon closing and reopening the app.

---

## 🏗️ Architecture & Folder Structure

```
travel-explorer-app/
├── assets/                       # App icons, splash screens, and favicons
├── src/
│   ├── components/               # Modular UI Components
│   │   ├── AttractionCard.js     # Showcase card for top destination spots
│   │   ├── CategoryPills.js      # Scrollable category filter chips
│   │   ├── DestinationCard.js    # Standard & horizontal destination cards
│   │   ├── EmptyState.js         # Fallback view for empty search/wishlist
│   │   └── WeatherCard.js        # Live Open-Meteo weather widget
│   ├── context/
│   │   └── WishlistContext.js    # Global wishlist state & AsyncStorage sync
│   ├── data/
│   │   └── destinations.js       # Curated Indian travel dataset & coordinates
│   ├── screens/
│   │   ├── HomeScreen.js         # Discovery feed, featured banner & categories
│   │   ├── SearchScreen.js       # Search input with category filter
│   │   ├── DestinationDetailsScreen.js # Hero image, details, weather & map links
│   │   ├── WishlistScreen.js     # Saved places list & management
│   │   └── SmartMatcherScreen.js # Preference-based recommendation quiz
│   ├── services/
│   │   └── weatherService.js     # Open-Meteo REST API client & WMO mapper
│   ├── styles/
│   │   └── theme.js              # Design tokens (colors, typography, spacing)
│   └── utils/
│       └── helpers.js            # External linking (Google Maps) & share logic
├── App.js                        # App root with Tab Navigation & Status Bar
├── app.json                      # Expo application manifest
└── package.json                  # Dependencies & execution scripts
```

---

## 🛠️ Getting Started & Installation

### Prerequisites
- **Node.js** (v18.x, v20.x, or v24.x recommended)
- **npm** or **yarn**
- *(Optional for Mobile)*: **Expo Go** app installed on your physical Android/iOS phone (available on Google Play Store / Apple App Store).

### Step 1: Clone the Repository
```bash
git clone https://github.com/<YOUR_GITHUB_USERNAME>/travel-explorer-app.git
cd travel-explorer-app
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run the Application

#### Option A: Run on Web Browser (Fastest way to test)
```bash
npm run web
```
This opens the app directly in your default web browser (e.g. `http://localhost:8081`).

#### Option B: Run on Physical Phone with Expo Go
```bash
npm run start
```
1. A QR code will display in your terminal.
2. Open the **Expo Go** app on your Android phone and scan the QR code (or use the Camera app on iOS).
3. The bundle will build and load automatically onto your phone.

#### Option C: Run on Android Emulator
```bash
npm run android
```

---

## 📱 Navigation Flow

1. **Home Screen**:
   - Header with quick shortcut to the **AI Matcher**.
   - Search bar to instantly filter across 9+ Indian destinations.
   - Filter chips for *Beaches*, *Mountains*, *Heritage*, *Adventure*.
   - Tap any card to open the **Destination Details** screen.
2. **Destination Details**:
   - High-resolution hero image with top back, share, and heart buttons.
   - Key stats: Rating, Duration, Budget.
   - Destination overview & "Best Time to Visit" section.
   - **Live Weather**: Fetches real-time temperature, condition, humidity & wind speed.
   - **Google Maps Button**: Opens the location in Google Maps.
   - **Attractions Carousel**: Horizontal cards showing 2–3 top spots.
   - Fixed "Add to Wishlist" action button.
3. **Search & Filter Screen**:
   - Dedicated search view with category filters and real-time counter.
4. **AI Matcher Screen**:
   - Interactive quiz selecting Travel Vibe, Budget, and Duration.
   - Calculates percentage compatibility match for each destination.
5. **Wishlist Screen**:
   - Shows all saved destinations.
   - Delete individual destinations or clear all.
   - Persists data to local device storage.

---

## 🎥 Demo Video Guide (2–3 Minutes)

When recording your submission demo video, follow this recommended walkthrough:
1. **Introduction (0:00 - 0:25)**: Mention your name, application for GDGC VNRVJIET App Development domain, and project title.
2. **Destination Discovery (0:25 - 0:50)**: Scroll through the Home feed showing destinations across Beaches, Mountains, Heritage, and Adventure.
3. **Search & Filtering (0:50 - 1:15)**: Demonstrate searching by text (e.g., "Goa" or "Manali") and tapping category pills.
4. **Destination Details & Extensions (1:15 - 1:55)**:
   - Open a destination (e.g., Goa or Manali).
   - Point out description, best time to visit, and popular attractions.
   - Showcase the **Live Weather widget** fetching real-time degrees and condition.
   - Tap **"View on Google Maps"** to show map integration.
   - Tap **"Add to Wishlist"**.
5. **Wishlist & Local Storage (1:55 - 2:20)**:
   - Navigate to the Wishlist tab showing the saved destination.
   - Close/reload the app to prove persistence via local storage.
6. **Smart Matcher (2:20 - 2:45)**:
   - Open AI Matcher, pick vibe, budget, and trip duration to show calculated match scores.
7. **Conclusion (2:45 - 3:00)**: Wrap up with brief closing remarks.

---

## 👥 Submission Information

- **Domain:** GDGC VNRVJIET - App Development Domain
- **Assignment:** Volunteer Recruitment Assignment
- **License:** MIT License
