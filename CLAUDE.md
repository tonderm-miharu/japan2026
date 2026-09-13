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

**Single-file dashboard** (`itinerar.html`, ~4800 lines):
- Inline CSS (lines 18-2257): CSS variables in `:root`, responsive breakpoint at 900px, print styles
- Data objects (lines 2540-3601): `TASKS` (2540), `POI_URLS` (2567), `DAYS` (2802), `HOTEL_INFO` (2870),
  `DAY_NOTES` (3137), `CONTACTS` (3592)
- Weather config: `WEATHER_DEFAULTS` (2925, seasonal averages), `WMO_CODES` (2942)
- Functions (2536-4807): rendering, filters, search, modals, weather, countdown, timezone

These line numbers drift with every edit - treat them as a starting map, not gospel, and
`Grep` for the symbol name to get the current position.

**Reading `itinerar.html`:** the file is ~274 KB (~80k tokens) - reading it whole burns more
context than the entire session baseline. Never `Read` it without `offset`/`limit`. Use `Grep`
to locate a symbol first, then `Read` that range, using the line ranges above as a starting map.
Same applies to `japan-travel-guide.html` (~184 KB) and `ADJUSTED_MASTER_PLAN.md` (~64 KB).

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
- Tasks, Hotels, Contacts, Transport, Links - standard dark modals with SVG icons
- Summary - red-themed modal with 7-region trip timeline (highlighted button)
- Calendar - compact day picker
- News - Japan Times RSS feed

**Navigation**:
- Desktop: filters with icons + tooltips, view buttons in row
- Mobile: Tasks/Hotels/Links quick buttons, hamburger for rest

**PWA setup** (must keep working offline - the itinerary is used on a plane):
- `sw.js` - Service Worker, network-first with cache fallback. Cache name `japan2026-v3`;
  **bump the version when `ASSETS` changes**, otherwise clients keep the old cache.
- Precached: `itinerar.html`, `japan-travel-guide.html`, `manifest.json`, all icons, fonts.
- `LIVE_APIS` (Open-Meteo, rss2json) are **never cached** - a cached API response makes an
  offline fetch succeed, and the page then mistakes stale data for fresh. The weather fetch
  also passes `cache: 'no-store'` as a second line of defence.
- Assets are cached one by one, not via `addAll()` - a single failure must not leave the
  cache empty.
- Verified offline by killing the local server and reloading, not by emulation alone
  (DevTools offline emulation resets on reload and silently produces false passes).

## Weather

Open-Meteo (`api.open-meteo.com`), no API key, **16-day forecast** - that is the provider's hard
cap, `forecast_days=30` returns HTTP 400, so the trip will never be covered live end to end.

- `updateAllWeather()` groups the days that fall inside the window by location and fetches them
  in **one batched request** (Open-Meteo accepts comma-separated lat/lon lists). Do not go back
  to per-day requests.
- `getWeatherForDay()` returns a live forecast only while the cached entry is **under 24h old**;
  otherwise it falls back to `WEATHER_DEFAULTS` (seasonal averages per region/month). Entries
  without a `fetched` timestamp are ignored - that is how pre-Open-Meteo cache is discarded.
- `WMO_CODES` maps WMO 4677 codes to the existing SVG icons. Wind already arrives in km/h.
- Badge reads `forecast` for live data, `average` for the fallback.
- CC-BY 4.0 requires the attribution in the page footer - keep it.
- Free tier is non-commercial only.

## Trip Regions (phases)

osaka → kyoto → biwa → shimanami → kyushu → tokyo → okinawa

Each phase has its own color in the progress strip and calendar. Region is set in each day's `region` property.

## Other Files

- `japan-travel-guide.html` - complete magazine-style travel guide with all 7 regions, contacts, links (PDF button opens it).
  Day cards cover **all 53 days**; each chapter's card range must match its `region-dates` header.
- `mockups/` - UI design iterations
- `ADJUSTED_MASTER_PLAN.md`, `KONSOLIDOVANY_ITINERAR.md` - detailed trip planning docs
- `HACHIJOJIMA_AOGASHIMA_PLAN.md` - abandoned Oct 26-29 alternative (kept for reference only)
- `ROZVRH.xlsx` - source spreadsheet for schedule/hotels

## Oct 26-29: Izu Road Trip (FINAL)

**Status:** Izu Peninsula road trip is confirmed and fully booked. The Hachijojima/Aogashima alternative was abandoned (no heli booking) and its hotel has been cancelled.

**Day structure (days 39-43):**
- Day 39 (26.10.): Tokyo → Mishima → Higashi-Izu. Shinkansen, J-net car pickup 12:00, Mt. Omuro, Jogasaki. Hotel Cetus Royal.
- Day 40 (27.10.): South & West Izu → Fujinomiya. Shimoda, Irozaki, Dogashima. Kuretake Inn Premium. Longest driving day.
- Day 41 (28.10.): Fujinomiya → Motosuko → Hottarakashi → Isawa. Lake Motosu (1000¥ view), sunset onsen. Isawa View Hotel.
- Day 42 (29.10.): Isawa → Mishima (return car ~11:30, early, for the 11:58 shinkansen) → Shimbashi. Kousuke 14:30, Togoshi Ginza, Tsukishima monjayaki. Anshin Oyado Tokyo Man Shimbashi (check-in from 12:00).
- Day 43 (30.10.): Minato cycling (Hamarikyu → Takeshiba → Shibaura → Zojo-ji) → Takanawa Gateway City + MoN museum → Shinjuku. Hotel Sunlite Shinjuku.

**Car:** J-net Rentacar Mishima Station South Exit, 26-29.10. 12:00↔12:00, incl. ETC card, online pre check-in. MyPage: j-netrentacar.co.jp/jnet/mypage

**Day 45 (1.11.) daytime program is open** - Togoshi Ginza moved to day 42, nothing has replaced it yet.

## Tokyo meetups

- **Minoru - confirmed 30.10. evening** (day 43), nomikai. Contact him around 22.10. to settle place/time.
- **Ippei** - nomikai *proposal* for 23.10. evening (day 36), arrival day. Contact min. 1 week ahead.
- **Ryuki** - potential 24. or 25.10. evening (days 37-38), contact around 10.10. Not fixed to one date on purpose.
- **Wahei** (25.10. lunch) and **Kousuke** (29.10. 14:30) are confirmed.
- Shogo is *not* coming to Tokyo - do not re-add him.

Day 37 (24.10.) is a deliberately easy day before the Izu road trip: head spa + onsen at
Thermae-Yu Shinjuku, which needs booking ahead (task `t30`, link in the Links modal).
