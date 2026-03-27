# The Operating System

A mobile-first PWA for structured goal execution. One task per pillar per day, streak accountability, and milestone tracking — all offline-capable and dependency-free.

## The Problem

Existing goal-tracking tools fail at execution. Notion templates are too complex. Habit trackers are too generic. To-do lists are too passive. None combine structured daily tasks, milestone visibility, streak accountability, and contextual coaching in a single phone-friendly interface.

The gap isn't planning — it's execution. A good system gives you exactly one task per goal area per day, shows whether you're on track against hard deadlines, and makes it harder to skip than to show up.

## The Approach

Three pillars. Three tasks per day. 90 days of structured execution with hard deadlines.

- **Daily Task View** — One task per pillar with coaching context. Tap to complete.
- **Streak Tracking** — Daily, weekly, and per-pillar streaks. Consecutive 3/3 days build momentum.
- **Milestone Timeline** — Hard-dated deliverables with countdown. On track / overdue at a glance.
- **Weekly Grid** — 7-day dot visualization showing completion across all pillars.
- **Weed-Free Counter** — Days-since tracker (generalizable to any sobriety/habit counter).
- **Portfolio Tracker** — Manual status tracking for key deliverables.
- **Offline-First** — Service worker caches everything. Works without internet after first load.

## Tech Decisions

| Choice | Why |
|--------|-----|
| Vanilla HTML/CSS/JS | No build step. No dependencies. Ships as static files. The constraint is the point. |
| localStorage | Sufficient for single-user completion data. Simpler than IndexedDB. Easy export/import. |
| Service Worker | Cache-first strategy for full offline support. Version-bumped for updates. |
| PWA Manifest | Add to Home Screen on iOS/Android. Standalone display. Feels like a native app. |
| Dark theme | Easier on eyes for morning/evening check-ins. |
| No framework | Total bundle under 50KB. Loads instantly. Nothing to compile. |

## Project Structure

```
goal-os/
  index.html        # App shell + all styles
  data.js           # 13 weeks of task data + config
  app.js            # State management, rendering, persistence
  sw.js             # Service worker for offline caching
  manifest.json     # PWA configuration
  icons/            # App icons (SVG + PNG)
```

## Running Locally

```bash
# Any static file server works
python3 -m http.server 8000
# Open http://localhost:8000
```

Or just open `index.html` directly — everything except the service worker works without a server.

## Data Model

Tasks are defined in `data.js` as a week-keyed object. Each week contains 7 days, each day has 3 pillar tasks with text and coaching context. Completions are stored in localStorage with timestamps.

```javascript
// Completion key format: "2026-W13:Fri:p1"
// Value: { done: true, timestamp: "2026-03-27T09:15:00Z" }
```

## What's Next

This is v1 — a personal tool built for one user. Future versions could include:

- **Server-side storage** for multi-device sync
- **AI coaching** — dynamic task adjustment based on completion patterns
- **Template system** — let others create their own 90-day plans
- **Analytics** — completion rates, streak history, trend visualization

## Built With

Built by Ted Barnard + Claude Code. No external dependencies. No build tools. Just HTML, CSS, and JavaScript doing what they were designed to do.
