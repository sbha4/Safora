# Safora - AI-Powered Women's Safety App

A modern, mobile-first Progressive Web App designed to empower users with real-time safety features, community intelligence, and emergency response tools. Built for Sri Lanka with localized data, female-centric design, and accessible safety features for all.

## 🌟 Features

### Core Safety Features (Always Free)
- **🆘 SOS Emergency Alerts** - Instant emergency notification system
- **📍 Emergency Contacts** - Quick access to trusted contacts
- **🗺️ Interactive Safety Map** - Real-time safety markers, heatmaps, and community reports
- **📢 Community Safety Reports** - Crowdsourced incident reports with safety ratings
- **📞 Fake Call Feature** - Realistic incoming call UI for escape situations
- **🚀 Quick Escape Mode** - One-tap access to fake call from any screen

### Premium Features (Safora Plus - $3.99/month)
- 🤖 **AI-Based Route Risk Prediction** - Advanced safest route algorithm
- ⚡ **Real-Time Route Safety Alerts** - Live danger zone notifications
- 🌙 **Night Travel Safety Mode** - Specialized features for after-dark journeys
- 📊 **Extended Safety History** - Comprehensive personal safety logs
- 🎯 **Priority Emergency Notifications** - Expedited alert delivery

### Additional Features
- **Partner Safe Zones** - Verified cafes, pharmacies, and safe spaces on the map
- **Rewards Marketplace** - Redeem safety points for accessories and partner discounts
- **Safety Shop** - Curated personal safety products
- **Leaderboard** - Community engagement rankings
- **Admin Dashboard** - City Safety Insights for B2B (government, universities)
- **Dark/Light Mode** - Eye-friendly theme toggle

## 🎨 Design & UX

- **Glassmorphism UI** - Frosted glass cards with modern aesthetics
- **Smooth Animations** - Framer Motion transitions and micro-interactions
- **Mobile-First** - Optimized for iOS and Android devices
- **Accessible** - ARIA labels, semantic HTML, high contrast modes
- **Localized Theme** - Deep purple, safety red, and white color scheme
- **Bottom Navigation** - iOS-style navigation bar for thumb-friendly access

## 📱 Localization

- **Region:** Mount Lavinia, Colombo, Sri Lanka
- **Languages:** English (with Sinhala/Tamil support ready)
- **Currency:** Sri Lankan Rupees (Rs.)
- **Names:** Diverse female names (Buddhist, Christian, Muslim, Tamil communities)
- **Data:** 27 demo safety markers across major Colombo areas

## 🛠️ Technology Stack

- **Frontend Framework** - React 18 with TypeScript
- **Build Tool** - Vite (lightning-fast)
- **Styling** - Tailwind CSS + custom CSS variables for theming
- **UI Components** - shadcn/ui (Radix UI primitives)
- **Maps** - Leaflet.js + Leaflet.heat heatmap layer
- **Animations** - Framer Motion
- **State Management** - Local store with localStorage persistence
- **Routing** - React Router DOM
- **Notifications** - Sonner toast library
- **Icons** - Lucide React
- **Audio** - Web Audio API (native ringtone generation)

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ (install via [nvm](https://github.com/nvm-sh/nvm))
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd safora

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
npm run preview
```

## 📝 Usage

### As a User
1. **View Safety Map** - Navigate to /map to see real-time community reports
2. **Submit Report** - Long-press any location to submit a safety incident
3. **Quick Escape** - Use the red floating button for immediate fake call
4. **Upgrade to Premium** - Visit subscription page for advanced features
5. **Manage Contacts** - Add emergency contacts on the contacts page
6. **Track Progress** - View safety points and level on your profile

### As an Admin
1. Navigate to /admin to access City Safety Insights
2. View heatmaps of unsafe areas
3. Monitor community engagement and report trends
4. Access B2B dashboard for partnerships

## 💰 Monetization Model

### Freemium Structure
- **Free Tier** - Core safety tools with basic features
- **Safora Plus** - $3.99/month or $29/year
- **Partner Locations** - Sponsored safe zones on map
- **Rewards Marketplace** - Partner discounts and products
- **Non-Intrusive Ads** - Subtle sponsored content (not during emergencies)

### Revenue Streams
1. Premium subscriptions
2. Partner location sponsorships
3. Safety product affiliate commissions
4. B2B city analytics dashboards

## 🗂️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── ThemeToggle.tsx # Dark/light mode
│   ├── BottomNav.tsx   # Navigation bar
│   └── QuickEscapeButton.tsx
├── pages/              # Route pages
│   ├── Index.tsx       # Home screen
│   ├── MapPage.tsx     # Interactive map
│   ├── FakeCallPage.tsx
│   ├── SOSPage.tsx
│   ├── SubscriptionPage.tsx
│   ├── RewardsPage.tsx
│   ├── AdminPage.tsx
│   └── ...
├── lib/
│   ├── store.ts        # State management & mock data
│   └── utils.ts        # Helper functions
├── types/              # TypeScript definitions
├── App.tsx             # Main app & routing
├── index.css           # Global styles & CSS variables
└── main.tsx            # Entry point
```

## 🎯 Key Routes

| Route | Purpose |
|-------|---------|
| `/` | Home screen with safety score & quick actions |
| `/map` | Interactive safety map with heatmap |
| `/sos` | Emergency SOS interface |
| `/fake-call` | Fake call incoming UI |
| `/contacts` | Emergency contacts manager |
| `/report` | Safety incident reporting |
| `/subscription` | Premium upgrade page |
| `/rewards` | Points & merchandise marketplace |
| `/leaderboard` | Community safety rankings |
| `/profile` | User profile & stats |
| `/admin` | City Safety Insights dashboard |

## 🔒 Security & Privacy

- All emergency features remain **free forever**
- No real payment processing (demo only)
- LocalStorage for user data persistence
- No external API calls for demo data
- Privacy-first design

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Watch mode
npm run test:watch
```

## 📊 Demo Data

The app includes 27 pre-populated safety reports across Colombo:
- **Mount Lavinia** - Beach area markers
- **Dehiwala** - South Colombo neighborhoods
- **Colombo Fort** - Business district
- **Pettah** - Commercial hub
- **Cinnamon Gardens** - Residential area
- **Kirulapone** - Mixed zone

Partner locations include cafes, convenience stores, and 24-hour safe spaces.

## 🌐 Deployment

### Publish with Lovable
1. Open [Lovable Project](https://lovable.dev)
2. Click **Share → Publish**
3. Custom domain setup available in Project Settings

### PWA Installation
Users can install Safora as a Progressive Web App:
- iOS: Share → Add to Home Screen
- Android: Menu → Install App

## 🔗 Custom Domain Setup

To connect your own domain:
1. Navigate to Project → Settings → Domains
2. Click "Connect Domain"
3. Follow DNS configuration steps
4. [Read detailed guide](https://docs.lovable.dev/features/custom-domain)

## 🚧 Future Enhancements

- [ ] Sinhala & Tamil language support
- [ ] Real Stripe payment integration
- [ ] GPS-based real-time tracking
- [ ] ML-powered safety predictions
- [ ] Live volunteer response network
- [ ] Integration with local authorities
- [ ] Push notifications
- [ ] Voice-based SOS

## 📄 License

This project is part of the Lovable PWA template ecosystem.

## 👥 Contributing

Contributions welcome! Please submit issues and PRs via GitHub.

## 📞 Support

For questions or issues:
- Check the [Lovable Docs](https://docs.lovable.dev)
- File an issue in the repository
- Contact the development team

---

**Built with ❤️ for women's safety in South Asia**

Version 1.0.0 - March 2026
