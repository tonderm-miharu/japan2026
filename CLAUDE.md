# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Japan 2026 trip planning dashboard - a 53-day itinerary (Sep 18 - Nov 9, 2026) displayed as an interactive PWA. Live at https://tonderm-miharu.github.io/japan2026/itinerar.html

## Development

No build step required. Open `itinerar.html` directly in browser or use any local server:
```bash
python -m http.server 8000
```

Deploy by pushing to `master` - GitHub Pages auto-deploys from root.

## Architecture

**Single-file dashboard** (`itinerar.html`, ~4000 lines):
- Inline CSS (lines 18-2000): CSS variables in `:root`, responsive breakpoint at 900px, print styles
- Data objects (lines 2000-2900): `DAYS`, `TASKS`, `POI_URLS`, `HOTEL_INFO`, `DAY_NOTES`, `CONTACTS`
- Functions (lines 2900-4000): rendering, filters, search, modals, weather, countdown, timezone

**Data structure for each day**:
```javascript
{ day: 1, dow: 'Fri', date: '18.9.2026', title: '...', subtitle: '...', 
  region: 'osaka', tags: ['ho', 'car'], hotel: '...', price: '¥...',
  pois: [{name:'...', coords:[lat,lng]}], timeline: [{time:'09:00', text:'...', type:'transport'}] }
```

**Key rendering functions**:
- `renderDays()` - main card grid
- `renderCalendar()` - sidebar/modal calendar with day color-coding
- `applyFilters()` - filter by HO/car/bike/onsen/people tags
- `handleSearch()` - real-time text search across cards
- `renderTransport()` - transport modal with flights, cars, ferries

**Modals**:
- Tasks, Hotels, Contacts, Transport - standard dark modals with SVG icons
- Summary - red-themed modal with 7-region trip timeline (highlighted button)
- Calendar - compact day picker
- News - Japan Times RSS feed

**PWA setup**:
- `sw.js` - Service Worker with network-first caching strategy
- `manifest.json` - app manifest for installability
- Icons: `icon.svg`, `icon-180.png`, `icon-192.png`, `icon-512.png`

## Trip Regions (phases)

osaka → kyoto → biwa → shimanami → kyushu → tokyo → okinawa

Each phase has its own color in the progress strip and calendar. Region is set in each day's `region` property.

## Other Files

- `japan-travel-guide.html` - printable PDF version (open → Print → Save as PDF)
- `mockups/` - UI design iterations
- `ADJUSTED_MASTER_PLAN.md`, `KONSOLIDOVANY_ITINERAR.md` - detailed trip planning docs
- `ROZVRH.xlsx` - source spreadsheet for schedule/hotels
