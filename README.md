# Japan 2026 - Itinerary

53-day trip to Japan (Sep 18 - Nov 9, 2026)

## Live Version

**https://tonderm-miharu.github.io/japan2026/itinerar.html**

## Project Contents

| File | Description |
|------|-------------|
| `itinerar.html` | Interactive HTML dashboard |
| `KONSOLIDOVANY_ITINERAR.md` | Detailed itinerary in Markdown format |
| `ADJUSTED_MASTER_PLAN.md` | Enhanced "second brain" document with logistics, prep steps, laundry schedule, risks |
| `ROZVRH.xlsx` | Schedule and hotels spreadsheet |

## Dashboard Features

### Header
- **Logo** - "JAPAN'26" in Oxanium digital font with red accent
- **Progress Strip** - 53 day blocks with phase labels (OSAKA, KYOTO, KYUSHU, etc.)
- **Timezone** - Tokyo/Prague dual clock display (DSEG7 + Electrolize fonts)
- **Countdown** - 7-segment digital display showing days until/since departure

### Navigation - Desktop
- **Sidebar** - Timezone display + Calendar (sticky)
- **Filters** - HO / Car / Bike / Onsen / People (gray default, blue glow when active)
- **Views** - Tasks, Hotels, Contacts, Transport, Weather, Print (purple glowing SVG icons)
- **Search** - real-time filtering, works with filters

### Navigation - Mobile
- **Header** - Japan'26 | Timezone | Countdown
- **Filters** - gray default, blue glow when active (icon + border light up)
- **Calendar** - red glowing icon
- **Hamburger** - Tasks, Hotels, Contacts, Transport, Weather, Print PDF (purple SVG icons), Search

### Print / PDF Export
- Click Print button (desktop view-row or mobile hamburger menu)
- All 53 day cards automatically expand
- Optimized print stylesheet:
  - White background, black text
  - Hidden interactive elements (filters, modals, buttons)
  - Page breaks between cards
  - Preserved note highlighting and badges
- Save as PDF via browser print dialog

### Countdown
- Vintage 7-segment digital display (DSEG7 font)
- Before trip: yellow glow, negative number (-025)
- During trip: green glow, positive number (+012)
- Departure day (Sep 18): white, value 0
- Mobile: no glow effect for cleaner look

### Progress Strip
- Day blocks showing trip progress by phase
- Color-coded phases (Osaka=orange, Kyoto=purple, Kyushu=red, etc.)
- Click on day block scrolls to that day's card
- Current day highlighted with blue glow

### Calendar
- Interactive calendar Sep-Nov 2026
- Color coding: green (weekday), gray (weekend), red (HO)
- HO display: 8h = 50% bar, 5-7h = 40% bar, ≤4h = corner triangle
- Current day highlighted with white border and glow
- Click on day scrolls and expands card (with sticky header offset)
- Filters applied to calendar (dimming non-matching days)
- Auto-scroll to current day on page load (during trip)

### Day Cards
- Color-coded: green (weekday), gray (weekend), with HO indicator
- Weather icon with temperature
- Expandable details with timeline and POI
- Google Maps links for 188 POI (opens app directly on mobile)
- Tag icons (HO, car, bike, onsen, meet, flight, fest)
- Automatic daily tasks (luggage, car, check-in)

### Modals (dark blue background)
- **Tasks** - grouped by priority (High/Medium), compact display
- **Hotels** - overview with prices, provider badges, payment status
- **Contacts** - list of people to meet with dates
- **Transport** - flights, cars, ferry

### Weather
- Static averages by region and month
- Optionally live data from OpenWeatherMap API

## Trip Phases

| # | Region | Period | Days |
|---|--------|--------|------|
| 1 | Osaka I | Sep 19-26 | 8 |
| 2 | Kyoto | Sep 27 - Oct 1 | 5 |
| 3 | Biwa Cycling | Oct 2-3 | 2 |
| 4 | Shimanami Kaido | Oct 6-7 | 2 |
| 5 | Kyushu | Oct 8-22 | 15 |
| 6 | Tokyo + Izu | Oct 23 - Nov 1 | 10 |
| 7 | Okinawa | Nov 2-8 | 7 |

## To Resolve Before Trip

### High Priority
- [ ] Ferry Yawatahama-Beppu 13:00 (Oct 8)
- [ ] Ferry Kumamoto-Shimabara 09:25 (Oct 16)
- [ ] teamLab Biovortex tickets (Oct 1)
- [ ] Shimanami multi-day bike rental (Oct 6-7)
- [ ] Takachiho Yokagura reservation (Oct 14)
- [ ] Accommodation Oct 26-29 (Izu/Fuji road trip)
- [ ] Express bus Yufuin-Kumamoto reservation (Oct 11)
- [ ] Send luggage Fukuyama→Matsuyama (Oct 6)
- [ ] Send luggage Kumamoto→Nagasaki (Oct 16)

### Medium
- [ ] Keigo - min. 1 week before Sep 26
- [ ] Takashi - for Sep 28
- [ ] Wahei - min. 1 month before Oct 24
- [ ] Ryuki - 1-2 weeks before Oct 23

## Adjusted Master Plan

Enhanced planning document (`ADJUSTED_MASTER_PLAN.md`) includes:

- **Laundry schedule** - optimal days every 4-6 days
- **Luggage shipping prep** - day-before checklists for Yamato TA-Q-BIN
- **Light travel essentials** - what to pack when luggage is shipped ahead
- **Ticket buying strategy** - when to buy to avoid rush hour queues
- **Tight schedule analysis** - risk assessment and mitigation for critical days
- **Pre-departure tasks** - Visit Japan Web, roaming, Suica, contacts
- **Day-by-day notes** - practical tips, alternatives, weather backups
- **Carrier info** - ANA/JAL for domestic flights, hotel check-in codes

## Technical Notes

- Single-page HTML with inline CSS and JS
- Fonts: Inter, DSEG7, Electrolize, Oxanium, Orbitron
- Data stored directly in JS (DAYS, TASKS, HOTEL_INFO, POI_URLS, DAY_NOTES, etc.)
- POI_URLS: 188 verified Google Maps search links
- DAY_NOTES: Complete notes for all 53 days
- Task state in localStorage
- Responsive design (mobile / desktop)
- Works offline (PWA with Service Worker, network-first strategy)
- Installable as app on mobile (Add to Home Screen)

### PWA Icon
- Design: "JAPAN" bold text with blue glow (#60a5fa), red underline (#ef4444)
- Background: dark (#1a1a2e) matching dashboard theme
- Files: icon.svg (vector), icon-180/192/512.png (raster)
- iOS: apple-touch-icon for home screen

## Design System

### Accessibility
- High contrast colors optimized for readability
- text-dim: #b8b8b8, text-muted: #8a8a8a
- Minimum font size 1rem on mobile
- POI links with pill-style background for visibility

### Icons
- Monochrome SVG design: #9ca3af (base) → #e5e7eb (hover/active)
- Car icon: side profile (smooth sedan silhouette)
- Bike icon: classic bicycle with diamond frame
- Consistent across filters, tags, and inline text
- Functional colors:
  - Flight icon (orange) - travel indicator
  - Festival icon (pink) - special events
  - Calendar icon (red) - permanent, no glow
  - Timeline dots - category indicators

### Filter Buttons
- Inactive: gray border, gray icons
- Active: light blue glow effect (#60a5fa)
- Calendar: red icon permanent, gray border

### Day Notes
Each day card includes contextual notes:
- Summary banner (orange highlight) with key reminders
- Warning icons for deadlines, reservations, tight schedules
- Laundry reminders
- Luggage shipping steps
- Fuel reminders
- Contact reminders
- Local food tips
- Weather backup plans

All emoji in notes automatically converted to monochrome SVG icons.
