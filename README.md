# The Foragers Calendar 🌿🍄

An educational, climate-informed phenological web application built with **Node.js, TypeScript, Express, React, and PostgreSQL with Prisma ORM**.

The Foragers Calendar helps naturalists, ethnobotanists, and outdoor enthusiasts discover which wild plants and mushrooms may be in season near them, calibrating historical emergence windows with local climate zones and real-time precipitation/temperature observations.

> **CRITICAL BOTANICAL SAFETY NOTICE**  
> *The Foragers Calendar is strictly an educational phenological aid, not an in-field identification tool or guarantee that any wild species is present or safe to consume. Never ingest any wild plant or mushroom without 100% in-person verification from a qualified local mycologist or botanist. Beware of lethal lookalikes.*

---

## 1. Architecture & Tech Stack

```
                                  [ Browser / Client ]
                                  React 19 + TypeScript
                           Tailwind CSS v4 + Motion + Lucide
                                            │
                             RESTful API (/api/*) on Port 3000
                                            ▼
                             [ Express Full-Stack Server ]
                                  server.ts (Node.js)
                                            │
             ┌──────────────────────────────┼─────────────────────────────┐
             ▼                              ▼                             ▼
   [ Weather Service ]            [ Seasonal Calculator ]         [ Data Repository ]
  Open-Meteo API (Free)        Thermal & Moisture Thresholds    Prisma ORM (PostgreSQL)
  (~1km Coordinate Blur)         Multi-Variable Phenology        Fallback Verified Seed
```

- **Backend**: Node.js with TypeScript and Express. Implements rate limiting, input sanitization, and replaceable external service interfaces.
- **Frontend**: React 19 SPA bundled by Vite. Styled with Tailwind CSS v4 following the **Museum & Editorial Design Reference** (Fraunces serif typography, archival warm paper canvas `#FBF9F5`, zero-pill discipline, unboxed metadata).
- **Database & ORM**: PostgreSQL with Prisma ORM. Models `Species`, `SeasonalRange`, `Region`, `ClimateObservation`, `Source`, `UserPreference`, and `HarvestAlert`. Includes a robust offline fallback to verified seed data if a local PostgreSQL database is not provisioned.
- **Weather & Climate**: `OpenMeteoWeatherProvider` connects to free, keyless Open-Meteo meteorological reanalysis and forecast models, with a graceful regional climatological baseline fallback.
- **Privacy Engine**: Automatically masks user coordinates to 2 decimal places (~1.1 km blur radius) before weather calls. Precise GPS coordinates are never stored, logged, or broadcast.

---

## 2. Project Structure

```
├── .env.example                                  # Environment variables template
├── prisma/
│   ├── schema.prisma                             # PostgreSQL Prisma schema
│   ├── seed.ts                                   # Database seed script
│   └── migrations/20261020000000_init/migration.sql # Initial PostgreSQL DDL
├── server.ts                                     # Full-stack Express server
├── src/
│   ├── App.tsx                                   # Main React application
│   ├── index.css                                 # Tailwind CSS & botanical typography
│   ├── main.tsx                                  # React DOM entry
│   ├── types/
│   │   └── forager.ts                            # Domain type definitions
│   ├── components/
│   │   ├── Navbar.tsx                            # Top Bar Contract
│   │   ├── SafetyBanner.tsx                      # Educational warning banner
│   │   ├── LocationHero.tsx                      # Location selector & climate ribbon
│   │   ├── SeasonalCard.tsx                      # Curated species field card
│   │   ├── CalendarPhenologyMatrix.tsx           # 12-month calendar grid
│   │   ├── SpeciesDetailModal.tsx                # Museum accession detail view
│   │   ├── ClimateSimulatorModal.tsx             # Interactive microclimate simulator
│   │   ├── HarvestAlertsModal.tsx                # Harvest alerts & watchlist
│   │   ├── FieldSafetyGuide.tsx                  # Safety rules, law, and tech FAQ
│   │   └── Footer.tsx                            # Archival citations & links
│   ├── server/
│   │   ├── db.ts                                 # Database client with fallback
│   │   ├── data/
│   │   │   └── verifiedSpecies.ts                # Verified botanical seed records
│   │   ├── services/
│   │   │   ├── seasonalCalculator.ts             # Phenological scoring algorithm
│   │   │   └── weatherService.ts                 # Open-Meteo provider interface
│   │   └── routes/
│   │       └── api.ts                            # Express API endpoints
│   └── test/
│       └── runTests.ts                           # Automated unit test suite
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 3. Installation, Configuration & Run Commands

### Prerequisites
- Node.js 18+ or 20+
- (Optional) PostgreSQL database instance

### Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```
   *(The app operates fully out-of-the-box using verified offline seeds and Open-Meteo even without a PostgreSQL connection string configured).*

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Run Automated Unit Tests**:
   ```bash
   npm test
   ```
   Executes 58 unit tests covering circular month math, rainfall moisture triggers, temperature thresholds, location privacy masking, and toxic lookalike records.

5. **Run Database Migrations & Seed (when PostgreSQL is running)**:
   ```bash
   npx prisma migrate dev --name init
   npm run db:seed
   ```

6. **Production Build**:
   ```bash
   npm run build
   npm start
   ```

---

## 4. Assumptions & Data-Source Limitations

1. **Phenology is Probabilistic**: Fungi and plants do not operate like scheduled clockwork. Emergence depends on microclimates (slope aspect, canopy density, soil pH, local frost pockets). All results are labeled conservatively as `"likely in season"`, `"possibly in season"`, or `"seasonal estimate"`.
2. **No Automatic In-Field Photo Consumption Guarantees**: Digital applications cannot safely determine edibility from a photo. The app actively avoids automatic edibility validation.
3. **Open-Meteo API**: Utilizes Open-Meteo's free tier for temperature and 7-day cumulative rainfall. If rate-limited or offline, the app seamlessly falls back to historical regional climatological averages.
4. **Privacy Truncation**: Coordinates granted through the browser geolocation API are truncated to two decimal places (~1.1 km). Exact GPS coordinates are never stored.

---

## 5. How to Add or Update Verified Species and Seasonal Data

To introduce new species or update seasonal observations:

1. **Add to `src/server/data/verifiedSpecies.ts`**:
   - Provide scientific name, family, common name, and verified category.
   - Supply high-quality, attributed photographs.
   - Detail morphological characteristics (cap, gills/ridges, stem, leaves, flower, odor, spores).
   - Document **all dangerous lookalikes**, exact distinguishing traits, and danger classifications.
   - List mandatory culinary preparations (e.g. required cooking duration) and toxicological warnings.
   - Provide accredited literature citations (Kew Gardens, British Mycological Society, USFS, etc.).
   - Define regional `seasonalRanges` with `startMonth`, `peakMonthStart`, `peakMonthEnd`, `endMonth`, `temperatureMinC`, `temperatureMaxC`, and `minCumulativePrecipitationMm`.
2. **Run the Database Seed**:
   ```bash
   npm run db:seed
   ```
3. **Verify with Tests**:
   ```bash
   npm test
   ```

---

## 6. Architecture & Phenological Research Questions

### Q1: What features should The Foragers Calendar have for harvest alerts?
Harvest alerts should be **dynamic, meteorological notifications** rather than static calendar pings:
- **Rainfall Flush Triggers**: For mycorrhizal and saprotrophic fungi (Chanterelles, Porcini), an alert fires 3 to 7 days after cumulative rainfall exceeds ≥25mm during an active thermal window.
- **Growing Degree Day (GDD) Soil Warming Alerts**: For vernal shoots (Wild Garlic, Morels, Stinging Nettles), alert users when cumulative base 5°C degree-days reach the threshold for root-sap rise and shoot emergence.
- **Frost & Freeze Warnings**: Alert foragers before the first heavy autumn freeze (which ruins fragile mushrooms like Chanterelles) or notify when frost has sweetened wild fruits (e.g. Sloes and Rose Hips).
- **Custom Forager Watchlists**: Allow users to bookmark target species and assign custom microhabitat notes (e.g., "Check the north-facing beech slope").

### Q2: Which geolocation data sources are best for seasonal harvest timings?
- **WMO-Standard Meteorological Feeds (Open-Meteo / ECMWF / GFS)**: Ideal for hyper-local recent precipitation, humidity, and temperature without requiring user payment or private API keys.
- **EPA Level III/IV Ecoregions & Köppen-Geiger Classifications**: Far superior to political state or county boundaries, because biological communities correlate with rainfall patterns and elevation belts rather than county lines.
- **GBIF (Global Biodiversity Information Facility) & Research-Grade iNaturalist Observations**: Provide historical herbarium records to validate regional peak flush timing.
- **Privacy-Preserving Geolocation**: Coordinates are truncated to 2 decimal places (~1.1 km resolution) to prevent exact geolocation sharing of sensitive or endangered species.

### Q3: How to model climate data for dynamic harvest calendars?
Dynamic calendars are best modeled as a **multi-factor probabilistic scoring function (0–100)**:
$$\text{Score} = \text{BaseSeasonalScore}(\text{Month}) + \Delta\text{Temp}(\text{Observed}, [\text{Min}, \text{Max}]) + \Delta\text{Moisture}(\text{7DayPrecip}, \text{Threshold})$$
- If current month is in peak window: $+55$ points.
- If temperature is within optimal range: $+20$ points.
- If 7-day rainfall meets mycelial flush requirement: $+20$ points (or $-25$ if in severe drought).
- Scores $\ge 70$ are labeled **"Likely in Season"**, $45–69$ are **"Possibly in Season"**, and $<45$ are **"Seasonal Estimate"**.

### Q4: What tech stack suits a Node.js calendar app with weather data?
- **Backend**: Node.js with TypeScript and Express. Provides async non-blocking I/O for concurrent weather fetches, rate-limiting middleware, and strict input validation.
- **Database**: PostgreSQL with Prisma ORM for relational integrity between species, seasonal ranges, and geographic ecoregions.
- **Frontend**: React with Vite and Tailwind CSS. Delivers instant client responsiveness, accessible keyboard navigation, and zero-pill editorial typography.
- **Resilient HTTP Clients**: Native `fetch` with `AbortController` timeouts and fallback regional climatological averages so the app never hangs if external meteorological feeds experience latency.

### Q5: How to design a scalable data schema for seasonal events?
Separate unchanging botanical taxonomy from dynamic temporal occurrences:
- `Species`: Unchanging biological identity (family, scientific name, edibility, morphology, lookalikes, preparation).
- `SeasonalRange`: Regional phenological parameters (regionCode, startMonth, peakMonths, endMonth, minTemp, maxTemp, minRainfall).
- `Region`: Geographic polygons with centroid coordinates, Köppen climate classification, and typical elevation.
- `ClimateObservation`: Time-series cache of temperature and precipitation for a region.
- `HarvestAlert`: User watch preferences linked to species IDs and trigger conditions.
This relational separation allows new regions and species to be added without code rewrites, and enables sub-millisecond query performance using composite indexes on `(regionCode, startMonth, endMonth)`.

---

## License & Ethics
Distributed under the Apache-2.0 License. Respect private property, adhere to the One-Third Rule, and Leave No Trace.
