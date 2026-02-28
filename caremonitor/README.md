# CareMonitor 🏥

A community care platform for elderly patient monitoring. Built with React + Vite.

## Features

- 👥 **Dashboard** — patient list with risk levels, live SOS banner, search & filter
- 🚨 **SOS Alerts** — real-time fall detection pop-up with one-tap call/navigate
- 📋 **Care Plan** — movement reminders, checkup scheduling, voice assistant
- 📈 **Mobility Trends** — weekly charts, step counts, fall tracking per patient
- 👤 **Profile** — nurse overview, stats, navigation hub

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

### Build for production

```bash
npm run build
npm run preview   # test the build locally
```

---

## ☁️ Deploy to Cloud

### Option 1: Vercel (Recommended — free tier)

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Framework: **Vite** (auto-detected)
5. Click **Deploy** — done! 🎉

Or use the CLI:
```bash
npm i -g vercel
vercel
```

### Option 2: Netlify (free tier)

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) → New site from Git
3. Connect your repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click **Deploy** — done! 🎉

Or drag-and-drop the `dist/` folder at [app.netlify.com/drop](https://app.netlify.com/drop)

### Option 3: GitHub Pages

```bash
npm install --save-dev gh-pages
```

Add to package.json scripts:
```json
"deploy": "gh-pages -d dist"
```

Then:
```bash
npm run build
npm run deploy
```

---

## Project Structure

```
src/
├── context/
│   └── AppContext.jsx     # Global state, patient data, navigation
├── components/
│   ├── UI.jsx             # Reusable: NavBar, Toggle, SparkLine, etc.
│   └── SOSModal.jsx       # SOS alert popup
├── screens/
│   ├── LoginScreen.jsx
│   ├── ProfileScreen.jsx
│   ├── DashboardScreen.jsx
│   ├── AlertsScreen.jsx
│   ├── CarePlanScreen.jsx
│   └── TrendsScreen.jsx
├── App.jsx                # Root with phone frame
├── main.jsx               # Entry point
└── index.css              # Global styles & animations
```

## Demo Credentials
Any email + password works in the demo. The SOS alert auto-triggers 5 seconds after login.

## Tech Stack
- **React 18** — UI
- **Vite 5** — build tool
- **React Router DOM** — routing (installed, ready to extend)
- No external UI library — all custom components
