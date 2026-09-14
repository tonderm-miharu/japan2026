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

**Single-file dashboard** (`itinerar.html`, ~4890 lines):
- Inline CSS (lines 18-2257): CSS variables in `:root`, responsive breakpoint at 900px, print styles
- Data objects (lines 2550-3615): `TASKS` (2550), `POI_URLS` (2579), `DAYS` (2814), `HOTEL_INFO` (2882),
  `DAY_NOTES` (3150), `CONTACTS` (3615)
- Weather config: `WEATHER_DEFAULTS` (2937, seasonal averages), `WMO_CODES` (2954)
- Per-day automatic tasks: `DAY_TASKS` (3120), keyed by day number - separate from the `TASKS` checklist
- Functions (from ~3640): rendering, filters, search, modals, weather, countdown, timezone

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
- `luggage-forwarding.html` - print-ready takkyubin sheet for the two suitcase shipments
  (6.10. Fukuyama->Matsuyama, 16.10. Kumamoto->Nagasaki). Bilingual; the waybill fields are in
  Japanese so the sheet can be handed straight to a hotel reception. Linked from the Links modal
  and precached by `sw.js`.
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

## Day 8 (25.9.): Rev card

A **Rev card** is waiting at the reception of Shinsaibashi Arty Inn in Osaka - pick it up on
25.9. Recorded in four places so it cannot be missed: task `t32`, `DAY_TASKS[8]`, `DAY_NOTES[8]`
and the day 8 timeline.

## Luggage forwarding (takkyubin)

Two shipments, both to travel light over a leg where the suitcase would be in the way:

- **6.10. (day 19) Fukuyama -> Matsuyama** - handed over 07:30-08:00 at Candeo, needed at Hotel
  Sambancho by the evening of 7.10. **This is the risky one:** you arrive in Matsuyama on the
  evening of the 7th and leave on the morning of the 8th, so the bag has a one-night window. Always
  request `配達希望日` 7.10. morning and confirm at the counter that next-day is realistic *before*
  paying. If they will not commit, do not send.
- **16.10. (day 29) Kumamoto -> Nagasaki** - handed over 07:30 at The Gate, needed at APA Nagasaki
  by 18.10. Comfortable timing, but it lands on the 17th, a day before check-in, so the hotel needs
  advance notice. The same morning is tight: ferry at 09:25 and a depot may not open until 08:00.

Both parcels arrive **before** check-in, so the waybill needs the hotel as recipient followed by
`気付` (c/o) + your name + check-in date.

The sheet carries two ready-to-send Japanese e-mails asking the destination hotels to hold the bag.
They are scheduled as day tasks at the start of their send window, not at the end:

- **Day 14 (1.10.)** -> Hotel Sambancho (task `t34`)
- **Day 24 (11.10.)** -> APA Nagasaki (task `t35`)

The APA one differs deliberately: that parcel can arrive on 17.10., a day before check-in, so it asks
them to confirm they can hold it overnight and to say so if they cannot - an answer worth having
before the Shimabara ferry, not after.

**The sheet is complete** - all four hotel addresses, phone numbers and the guest name
(MICHAL TONDER) are filled in, so it can be handed over as printed:

| Hotel | Address | Tel |
|---|---|---|
| Candeo Fukuyama (sender 1) | 〒720-0042 広島県福山市御船町2-8-20 | 084-932-7500 |
| Hotel Sambancho (dest. 1) | 〒790-0003 愛媛県松山市三番町2丁目7-7 | 0570-04-7000 |
| The Gate Kumamoto (sender 2) | 〒860-0047 熊本県熊本市西区春日1-14-1 熊本森都心プラザ1階 | 096-288-0170 |
| APA 〈長崎出島〉 (dest. 2) | 〒850-0034 長崎県長崎市樺島町8-17 | 0570-022-211 |

The Kumamoto postal code came from the Japan Post register (春日, 西区); the user supplied that
address without one. The APA branch suffix 〈長崎出島〉 is part of the name - APA has several
Nagasaki properties.

## Tokyo meetups

- **Minoru - confirmed 30.10. evening** (day 43), nomikai. Contact him around 22.10. to settle place/time.
- **Ippei** - nomikai *proposal* for 23.10. evening (day 36), arrival day. Contact min. 1 week ahead.
- **Ryuki** - potential 24. or 25.10. evening (days 37-38), contact around 10.10. Not fixed to one date on purpose.
- **Wahei** (25.10. lunch) and **Kousuke** (29.10. 14:30) are confirmed.
- Shogo is *not* coming to Tokyo - do not re-add him.

Day 37 (24.10.) is a deliberately easy day before the Izu road trip: head spa + onsen at
Thermae-Yu Shinjuku. The head spa is a separate paid treatment and must be booked ahead
through **kodawary.com** (LINE login required) - not on thermae-yu.jp. Both links are in the
Links modal; task `t30`.

## Roppongi Art Night 2026 (day 44)

Confirmed on the official site: **31.10. 17:00 -> 1.11. 06:00**, free admission (museum special
exhibitions are paid separately). The all-night format is back after a 3-year break; RAN Focus
2026 is France, co-produced with CENTQUATRE-PARIS. Venues are walkable from each other: Roppongi
Hills / Mori Art Museum (open to 06:00), Tokyo Midtown / Suntory / 21_21, National Art Center,
plus the street program. Installations stay viewable until 22:00 on 1.11., so day 45 can catch up
on what was missed.

It lands on the same night as Halloween (day 44) - both are in Roppongi's orbit, so they combine
rather than compete. Many program times were still TBD as of Sept 2026 (task `t31`).
