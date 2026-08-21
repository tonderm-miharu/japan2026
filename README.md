# Japan 2026 - Itinerář

53denní cesta po Japonsku (18.9. - 9.11.2026)

## Live verze

**https://tonderm-miharu.github.io/japan2026/itinerar.html**

## Obsah projektu

| Soubor | Popis |
|--------|-------|
| `itinerar.html` | Interaktivní HTML dashboard |
| `KONSOLIDOVANY_ITINERAR.md` | Detailní itinerář v Markdown formátu |
| `ROZVRH.xlsx` | Tabulka s rozvrhem a hotely |

## Funkce dashboardu

### Navigace - Desktop
- **Kalendář** - permanentně v levém sidebaru
- **Filtry** - HO / Auto / Kolo / Onsen / Lidé (toggle, lze kombinovat)
- **Vyhledávání** - přímo v liště, real-time filtrování
- **Views** - Úkoly, Hotely, Kontakty, Transport, Počasí

### Navigace - Mobil
- **Header** - Japan'26 | Search | Countdown (in X days)
- **Filtry** - glowing ikony (modrá), kalendář (červená)
- **Hamburger** - Úkoly, Hotely, Kontakty, Transport, Počasí

### Kalendář
- Interaktivní kalendář Sep-Nov 2026
- Barevné kódování: zelená (všední), modrá (víkend), červená (HO)
- HO zobrazení: 8h = 50% pruh, 5-7h = 40% pruh, ≤4h = rohový trojúhelník
- Klik na den scrollne a rozbalí kartu
- Filtry aplikovány i na kalendář (ztlumení nevyhovujících dnů)

### Karty dnů
- Barevné rozlišení s HO indikátorem
- Ikona počasí s teplotou
- Rozbalovací detaily s timeline a POI
- Google Maps odkazy pro POI
- Automatické denní úkoly (kufry, auto, check-in)

### Modály (tmavě modré pozadí)
- **Úkoly** - seskupené dle priority (High/Medium), kompaktní zobrazení
- **Hotely** - přehled s cenami, provider badges, platební status
- **Kontakty** - seznam lidí k oslovení s termíny
- **Transport** - lety, auta, ferry

### Počasí
- Statické průměry podle regionu a měsíce
- Volitelně live data z OpenWeatherMap API

## Fáze cesty

| # | Region | Období | Dny |
|---|--------|--------|-----|
| 1 | Osaka I | 19-26.9 | 8 |
| 2 | Kyoto | 27.9-1.10 | 5 |
| 3 | Biwa Cycling | 2-3.10 | 2 |
| 4 | Shimanami Kaido | 6-7.10 | 2 |
| 5 | Kyushu | 8-22.10 | 15 |
| 6 | Tokyo + Izu | 23.10-1.11 | 10 |
| 7 | Okinawa | 2-8.11 | 7 |

## K vyřešení před cestou

### High Priority
- [ ] Ferry Yawatahama-Beppu 13:00 (8.10.)
- [ ] Ferry Kumamoto-Shimabara 09:25 (16.10.)
- [ ] teamLab Biovortex vstupenky (1.10.)
- [ ] Kola Shimanami multi-day (6-7.10.)
- [ ] Takachiho Yokagura rezervace (14.10.)
- [ ] Ubytování 26-29.10 (Izu/Fuji road trip)
- [ ] Express bus Yufuin-Kumamoto rezervace (11.10.)
- [ ] Odeslat kufr Fukuyama→Matsuyama (6.10.)
- [ ] Odeslat kufr Kumamoto→Nagasaki (16.10.)

### Medium
- [ ] Keigo - min. 1 týden před 26.9.
- [ ] Takashi - pro 28.9.
- [ ] Wahei - min. měsíc před 24.10.
- [ ] Ryuki - 1-2 týdny před 23.10.

## Technické poznámky

- Single-page HTML s inline CSS a JS
- Data uložena přímo v JS (DAYS, TASKS, HOTEL_INFO, etc.)
- Stav tasků v localStorage
- Responzivní design (mobil / desktop)
- Funguje offline (počasí live vyžaduje internet)
