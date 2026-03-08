# 🛡️ Safora - AI-Powered Women's Safety App

**Live Demo:** [safora-womens-safety.lovable.app](https://safora-womens-safety.lovable.app)

A modern, mobile-first Progressive Web App (PWA) designed to empower users with real-time safety features, community intelligence, and emergency response tools. Specifically localized for **Sri Lanka** with a focus on accessibility and modern UX.

---

## 🌟 Features

### 🆘 Core Safety Features (Always Free)
- **SOS Emergency Alerts** - Instant emergency notification system for trusted contacts.
- **Emergency Contacts** - Quick access and management of your inner circle.
- **Interactive Safety Map** - Real-time safety markers, heatmaps, and community reports using Leaflet.js.
- **Community Safety Reports** - Crowdsourced incident reporting with safety ratings and location tagging.
- **Fake Call Feature** - Realistic incoming call UI to provide a safe exit from uncomfortable situations.
- **Quick Escape Mode** - One-tap access to the fake call interface from any screen.

### 💎 Premium Features (Safora Plus)
- **AI-Based Route Risk Prediction** - Advanced safest-route algorithm using local safety data.
- **Real-Time Safety Alerts** - Live notifications when entering known high-risk zones.
- **Night Travel Mode** - Specialized UI and heightened monitoring for after-dark journeys.
- **Extended Safety History** - Comprehensive logs of personal safety reports and routes.

### 🏢 Additional Ecosystem
- **Partner Safe Zones** - Verified cafes, pharmacies, and 24/7 safe spaces visible on the map.
- **Rewards Marketplace** - Earn safety points by contributing reports and redeem them for partner discounts.
- **Admin Dashboard** - City Safety Insights for B2B partners (Government, Universities, NGOs).

---

## 🛠️ Technology Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite (Lightning-fast development)
- **Styling:** Tailwind CSS + shadcn/ui (Radix UI primitives)
- **Animations:** Framer Motion for smooth micro-interactions
- **Mapping:** Leaflet.js + Leaflet.heat for geospatial visualization
- **State Management:** LocalStorage persistence for user data
- **Audio:** Web Audio API for realistic ringtone generation

---

## 🎯 Key App Routes

| Route | Purpose |
| :--- | :--- |
| `/` | Home screen with safety score & quick actions |
| `/map` | Interactive safety map & incident reporting |
| `/sos` | Emergency SOS interface |
| `/fake-call` | Realistic escape call UI |
| `/admin` | City Safety Insights (B2B Dashboard) |
| `/rewards` | Safety points & partner marketplace |

---

## 🚀 Quick Start
Ensure you have [Node.js](https://nodejs.org/) installed, then run:
```bash
# Clone the repository
git clone <YOUR_GIT_URL>
# Navigate to project directory
cd safora
# Install dependencies
npm install
# Start development server
npm run dev

