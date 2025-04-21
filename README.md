# 🎧 Spotify Controller (Node.js + AutoHotkey)

Control Spotify from your keyboard without ever opening the app.

- Pause/play, skip, go back, or adjust volume — all via hotkeys
- No UI, no distractions — just focus and vibes
- Built using Node.js + Spotify Web API + AutoHotkey

---

## 🚀 Features

- 🎹 Ctrl + Numpad hotkeys to control Spotify
- 💻 Runs silently in the background
- 🔁 Auto-refreshes tokens using `token.json`
- 🪄 Can auto-run on Windows startup

---

## 📦 Setup

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/spotify-controller.git
cd spotify-controller

## 🔐 Spotify API Setup

### Step 1: Create a Spotify App

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click **"Create an App"**
3. Add this Redirect URI:
http://127.0.0.1:8888/callback

4. Save the app
5. Copy your **Client ID** and **Client Secret**

---

### Step 2: Set up your `.env` file
Create a `.env` file in the root of your project based on the example

## Step 3: run node auth/authorise.js and copy pase your authorisation code


