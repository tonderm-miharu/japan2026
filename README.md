# Japan 2026 - Itinerář

53denní cesta po Japonsku (18.9. - 9.11.2026)

## Obsah projektu

| Soubor | Popis |
|--------|-------|
| `itinerar.html` | Interaktivní HTML dashboard s mapami |
| `KONSOLIDOVANY_ITINERAR.md` | Detailní itinerář v Markdown formátu |
| `ROZVRH.xlsx` | Tabulka s rozvrhem a hotely |
| `puvodni_prompt.txt` | Původní zadání a požadavky |
| `chatgpt_konverzace.docx` | Výcuc z konverzace s ChatGPT |

## Itinerář - HTML Dashboard

Otevři `itinerar.html` v prohlížeči.

### Funkce

- **Filtry** - HO / Auto / Kolo / Onsen / Setkání
- **Vyhledávání** - hledá v názvech, destinacích a hotelech
- **Rozbalovací karty** - klikni na den pro detaily
- **Mapy** - každý den má mapu se všemi POI
- **Task list** - checkboxy s ukládáním do localStorage
- **Navigace** - sidebar s fázemi cesty pro rychlý skok

### Mapa

- Zelený bod = start dne
- Červený bod = cíl dne  
- Modré body = mezizastávky
- Čárkovaná linie = trasa
- Klikni na bod pro název místa

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

### Vysoká priorita
- [ ] Ferry Yawatahama-Beppu 13:00 (8.10.)
- [ ] Ferry Kumamoto-Shimabara 09:25 (16.10.)
- [ ] teamLab Biovortex vstupenky (1.10.)
- [ ] Kola Shimanami multi-day (6-7.10.)
- [ ] Takachiho Yokagura rezervace (14.10.)
- [ ] Ubytování 26-29.10 (Izu/Fuji road trip)
- [ ] Express bus Yufuin-Kumamoto rezervace (11.10.)
- [ ] Odeslat kufr Fukuyama→Matsuyama (6.10.)
- [ ] Odeslat kufr Kumamoto→Nagasaki (16.10.)

### Kontakty
- [ ] Keigo - min. 1 týden před 26.9.
- [ ] Takashi - pro 28.9.
- [ ] Wahei - min. měsíc před 24.10.
- [ ] Ryuki - 1-2 týdny před 23.10.

## Technické poznámky

- Dashboard používá [Leaflet.js](https://leafletjs.com/) pro mapy
- Stav tasků se ukládá do localStorage prohlížeče
- Funguje offline (mapy vyžadují internet)
