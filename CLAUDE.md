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

- `japan-travel-guide.html` - magazine-style travel guide (PDF button opens it, then Print → Save as PDF)
- `mockups/` - UI design iterations
- `ADJUSTED_MASTER_PLAN.md`, `KONSOLIDOVANY_ITINERAR.md` - detailed trip planning docs
- `HACHIJOJIMA_AOGASHIMA_PLAN.md` - alternative Oct 26-29 plan (pending heli booking)
- `ROZVRH.xlsx` - source spreadsheet for schedule/hotels

## Pending: Hachijojima/Aogashima Implementation

**Status:** Current itinerary has Izu/Yamanashi plan for Oct 26-29. If helicopter booking succeeds (Sep 27-28), update to Hachijojima/Aogashima.

**Days to update:** 39, 40, 41, 42 (Oct 26-29)

**Quick implementation checklist:**
1. Update DAYS array entries for days 39-42 with new content from `HACHIJOJIMA_AOGASHIMA_PLAN.md`
2. Add POI_URLS for: Hachijojima, Hachijo Fuji, Aogashima, Nanbara Senjojiki, etc.
3. Update DAY_TASKS[39]: flight check-in instead of car pickup
4. Update DAY_NOTES for days 39-42
5. Update HOTEL_INFO for new hotels (Hachijojima hotel, Minshuku Aogashima)
6. Update Transport modal with ANA HND↔Hachijo flights
7. Mark tasks t17, t18, t19, t20 as done

**New day structure:**
- Day 39: Tokyo → Hachijojima (ANA flight, Hachijo Fuji, onsen)
- Day 40: Hachijojima → Aogashima (heli, caldera, stargazing)
- Day 41: Aogashima → Hachijojima (heli, exploration)
- Day 42: Hachijojima → Tokyo (ANA flight, hotel check-in)
