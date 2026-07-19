# Safora - Multi-Role SaaS Women's Safety Platform

A mobile-first PWA combining personal safety tools, corporate employee monitoring, and platform governance in one SaaS app. Built for Sri Lankan users with English, Sinhala, and Tamil support.
---

## Overview

Safora has three role-based portals in one app:
- **User Portal** — SOS, safe routes, fake calls, rewards, Secure Transit Mode
- **Corporate Portal** — Employee safety monitoring for HR/security teams
- **Admin Portal** — Payments, partnerships, analytics, and platform ops

Deep purple glassmorphism design, mobile-first PWA.

## Demo Credentials

| Role | Email | Password | Portal |
|------|-------|----------|--------|
| User | `user@hershield.com` | `demo123` | Mobile safety app |
| Company Admin | `hr@securecorp.com` | `demo123` | Corporate Dashboard |
| App Admin | `admin@hershield.com` | `demo123` | Admin Console |

Quick "Demo Login" buttons are on the login screen for instant access.

## User Roles

- **User** — SOS, map, fake call, reports, rewards, profile, Secure Transit Mode, SaforaPlus upgrade
- **Company Admin** — Real-time trip monitoring, incident feed, employee roster, corporate plan billing
- **App Admin** — Platform ops, payment approvals, partnership/ad/merch approvals, analytics

## Key Features

**Core (Always Free):** SOS emergency alerts with GPS sharing · interactive Leaflet safety map with heatmap and 27 demo reports across Colombo/Mt. Lavinia/Dehiwala/Pettah · fake call with Quick Escape button · emergency contacts · community safety reports with points · rewards marketplace · gamification (4 levels + leaderboard)

**SaforaPlus (Premium):** AI safest-route, night travel protection, priority alerts, extended trip history, corporate travel support — $3.99/mo or $29/yr

**Corporate:** Live audit map, incident feed, trip analytics, employee management, intervention actions — plans from Startup (25 employees) to Enterprise (unlimited)

**Admin:** Platform stats, payment/partnership/merch approval workflows

**Secure Transit Mode (New):** Start an audited trip, get a 150m safe-corridor around your route with a pulsing "Silent Heartbeat" indicator; 100m+ deviation triggers vibration, amber UI warning, and flags the trip on the corporate dashboard.

## Technical Architecture

**Frontend:** React 18, Vite 5, TypeScript 5, Tailwind CSS v3, Framer Motion, React Router 6, Leaflet.js + Leaflet.heat, shadcn/ui, Sonner, Lucide React, TanStack Query

**Backend:** Lovable Cloud/Supabase, PostgreSQL with Row-Level Security, Supabase Auth, separate `user_roles` table

**State:** AuthContext (auth/role), LanguageContext (i18n), localStorage (profile, contacts, reports, SOS events, session)

## Getting Started

```bash
git clone <YOUR_GIT_URL>
cd safora
npm install
npm run dev        # http://localhost:8080
npm run build && npm run preview
npm run test
```

## Routes

| Route | Role | Purpose |
|-------|------|---------|
| `/login` | Public | Role-based login |
| `/` | User | Home / safety score |
| `/sos`, `/map`, `/report`, `/contacts`, `/fake-call` | User | Core safety tools |
| `/rewards`, `/leaderboard`, `/profile` | User | Engagement & profile |
| `/subscription` | User | SaforaPlus upgrade |
| `/secure-transit` | User | Audited trips |
| `/corporate`, `/company-plans` | Company Admin | Monitoring & billing |
| `/admin` | App Admin | Platform console |

## Design System

- **Colors:** Deep purple (primary), safety red (accent), green/amber/red (safe/moderate/unsafe), blue (partner)
- **UI:** Glassmorphism cards, rounded corners, large touch targets, Framer Motion transitions, app-like feel

## Monetization

1. SaforaPlus subscriptions — $3.99/mo or $29/yr
2. Corporate plans — Startup $49, Business $149, Enterprise $399/mo
3. Partner sponsorships (safe zones, ads, rewards)
4. Safety Shop commissions

Core safety features (SOS, map, reports, fake call, contacts) are always free.

## Security & Privacy

Demo uses **client-side mock authentication** — not production-ready. For production: enforce server-side role checks via Supabase `user_roles`, apply RLS policies on all tables, never trust client-side role checks alone. Location data is used only for safety features; minimal data collection.

## Localization

English (default), Sinhala (සිංහල), Tamil (தமிழ்) — 100+ translation keys, instant switching, preference saved locally.

## Future Enhancements

Real-time WebSocket incident feed · live map in Secure Transit · push notifications · real Stripe integration · ML route risk prediction · voice-activated SOS · emergency services integration · multi-tenant isolation · admin audit logs

---

**Primary Region:** Sri Lanka | **Languages:** English, Sinhala, Tamil
