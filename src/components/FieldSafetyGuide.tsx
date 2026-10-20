import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Scale,
  BookOpen,
  CheckCircle2,
  Lock,
  Compass,
  Cpu,
  Layers,
  HelpCircle,
  FileText
} from 'lucide-react';

export const FieldSafetyGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'rules' | 'laws' | 'architecture'>('rules');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-900 mb-2">
          <span>Field Safety, Ethics & Architectural Reference</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900">
          The Forager's Code & Scientific Architecture
        </h1>
        <p className="mt-2 text-sm text-stone-600 max-w-3xl leading-relaxed">
          Responsible foraging requires absolute botanical rigor, legal compliance, and deep ecological respect. Below are the governing safety protocols and the technical architecture behind The Foragers Calendar.
        </p>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 mt-6">
          <button
            onClick={() => setActiveSection('rules')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
              activeSection === 'rules'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            01. Safety Principles & Lookalikes
          </button>
          <button
            onClick={() => setActiveSection('laws')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
              activeSection === 'laws'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            02. Legal Access & Conservation
          </button>
          <button
            onClick={() => setActiveSection('architecture')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
              activeSection === 'architecture'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            03. Climate Modeling & Technical FAQ
          </button>
        </div>
      </div>

      {/* Section 1: Safety Principles & Lookalikes */}
      {activeSection === 'rules' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Primary Warning Box */}
          <div className="p-6 bg-red-50/80 border border-red-200 rounded-xl space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 text-red-800 rounded-lg shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-semibold text-red-950">
                  The Cardinal 100% Certainty Rule
                </h3>
                <p className="text-xs text-red-900 leading-relaxed mt-0.5">
                  If there is even 1% hesitation or doubt about the identity of any wild plant or mushroom, <strong>DO NOT EAT IT</strong>. A single mistaken identification can lead to irreversible liver necrosis, kidney failure, or death.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2">
              <h4 className="font-serif font-semibold text-stone-900 text-base flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                Never Identify From a Single Photo
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Superficial optical matching is notoriously dangerous. Wild species exhibit vast morphological plasticity based on sunlight, age, weather, and soil acidity. You must verify macroscopic traits: cap cuticle, gill attachment (free vs decurrent), stipe interior (solid vs hollow), spore print color, smell, and bruised flesh reactions.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2">
              <h4 className="font-serif font-semibold text-stone-900 text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                Always Seek Local Expert In-Person Confirmation
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Connect with accredited regional mycological societies or university botanists. Bring whole physical specimens—including the intact underground base or volva—for macroscopic and microscopic verification before culinary experimentation.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2">
              <h4 className="font-serif font-semibold text-stone-900 text-base flex items-center gap-2">
                <Scale className="w-4 h-4 text-stone-700" />
                Thorough Cooking is Mandatory
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Almost all wild edible mushrooms contain chitinous cell walls and thermolabile proteins that cause severe indigestion or hemolysis when raw. For example, Morels and Chanterelles MUST be cooked for at least 15–20 minutes before consumption.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2">
              <h4 className="font-serif font-semibold text-stone-900 text-base flex items-center gap-2">
                <Lock className="w-4 h-4 text-stone-700" />
                Avoid Contaminated Urban Runoff
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Fungi and wild greens bioaccumulate heavy metals (lead, cadmium, arsenic) and persistent agrochemicals. Never harvest within 50 meters of busy roads, industrial waterways, municipal parks sprayed with synthetic weedkillers, or dog-exercise paths.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Section 2: Legal Access & Conservation */}
      {activeSection === 'laws' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-6 bg-white rounded-xl border border-stone-200 space-y-4">
            <h3 className="text-lg font-serif font-medium text-stone-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-800" />
              Land Access, Laws & Regional Regulations
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              Foraging rights differ significantly across jurisdictions. It is your strict personal responsibility to ascertain legal land access before foraging:
            </p>

            <div className="space-y-3 pt-2 text-xs text-stone-700">
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <strong className="text-stone-900 block font-serif">United Kingdom (The Theft Act 1968 & Wildlife and Countryside Act 1981):</strong>
                Under Section 4(3) of the Theft Act, picking wild foliage, flowers, fruit, or fungi growing wild on public land for personal culinary use is generally permissible. However, uprooting the plant (removing the bulb or root) without landowner consent is illegal. Foraging is completely prohibited on SSSIs (Sites of Special Scientific Interest) and National Nature Reserves without Natural England licenses.
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <strong className="text-stone-900 block font-serif">United States & Canada (Federal & State Public Lands):</strong>
                Permits are frequently required in National Forests (USFS) and Bureau of Land Management (BLM) lands for commercial or personal mushroom harvesting above personal bag limits (e.g. 1 gallon per day). Foraging is strictly illegal in all US National Parks to preserve natural ecological integrity.
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <strong className="text-stone-900 block font-serif">Scandinavia (Allemansrätten / Everyman's Right):</strong>
                Nordic countries grant broad public rights to roam and forage berries, mushrooms, and uncultivated plants on private and public lands, provided private home boundaries (hemfridszon) are respected and no commercial damage occurs.
              </div>
            </div>
          </div>

          <div className="p-6 bg-emerald-950 text-emerald-100 rounded-xl space-y-3">
            <h3 className="text-lg font-serif font-medium text-white">
              The One-Third Conservation Protocol
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-emerald-200">
              Sustainable foraging honors the ecosystem first. As an ethical forager:
            </p>
            <ul className="text-xs space-y-2 text-emerald-300">
              <li>• <strong>Take no more than 1/3:</strong> Leave 1/3 for wildlife and pollinators, and 1/3 to mature, disperse spores, and seed next year's generation.</li>
              <li>• <strong>Leave the mycelium undisturbed:</strong> Slice mushroom stems cleanly with a pocket knife; never yank or dredge the subterranean hyphal threads.</li>
              <li>• <strong>Use porous mesh or wicker baskets:</strong> Breathable woven baskets allow microscopic fungal spores to gently shower the forest floor as you walk, promoting propagation.</li>
              <li>• <strong>Never broadcast micro-locations of sensitive or red-listed species:</strong> We deliberately omit precise GPS points to protect fragile habitats from excessive trampling and commercial poaching.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Section 3: Technical & Architectural FAQ */}
      {activeSection === 'architecture' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-6 bg-white rounded-xl border border-stone-200 space-y-4">
            <h3 className="text-xl font-serif font-medium text-stone-900 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-800" />
              Scientific & Technical Architecture Reference
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Addressing key phenological modeling and systems engineering questions:
            </p>

            <div className="space-y-4 divide-y divide-stone-100">
              {/* Question 1 */}
              <div className="pt-3 space-y-1.5">
                <h4 className="text-sm font-serif font-semibold text-stone-900">
                  1. What features should The Foragers Calendar have for harvest alerts?
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Harvest alerts must move beyond static calendar reminders to <strong>weather-triggered phenological notifications</strong>. Key features include: (a) <em>Rainfall Flush Alerts</em> triggered when 7-day cumulative precipitation exceeds species-specific thresholds (e.g. 25–40mm for Cantharellaceae and Boletaceae); (b) <em>Growing Degree Day (GDD) & Soil Warming Alerts</em> when early spring temperature sums cross the threshold for vegetative sprouting (e.g. Wild Garlic and Morels); (c) <em>First Frost & Freeze Warnings</em> notifying users of impending season closure or the start of frost-sweetened species like Rose Hips and Sloes; (d) <em>Watchlist Management</em> allowing users to follow specific target species and habitats without spam.
                </p>
              </div>

              {/* Question 2 */}
              <div className="pt-3 space-y-1.5">
                <h4 className="text-sm font-serif font-semibold text-stone-900">
                  2. Which geolocation data sources are best for seasonal harvest timings?
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  The ideal stack combines: (a) <strong>WMO Gridded Meteorological Services</strong> like <em>Open-Meteo</em> (free, no API key required, high global resolution based on ECMWF and GFS models) and <em>Copernicus ERA5 reanalysis</em> for historical temperature and precipitation normals; (b) <strong>EPA Ecoregions / Koppen-Geiger Climate Classifications</strong> to segment geography by biological growing conditions rather than arbitrary geopolitical state boundaries; (c) <strong>GBIF (Global Biodiversity Information Facility) & iNaturalist Research-Grade Phenology Records</strong> to calibrate the baseline start, peak, and end dates for each ecoregion; (d) <strong>Geocoding with Coordinate Truncation</strong> to maintain strict privacy (blurring coordinates to ~1km radius before API dispatch).
                </p>
              </div>

              {/* Question 3 */}
              <div className="pt-3 space-y-1.5">
                <h4 className="text-sm font-serif font-semibold text-stone-900">
                  3. How to model climate data for dynamic harvest calendars?
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Dynamic calendars should be modeled as a <strong>multi-variable probabilistic phenology score (0–100)</strong> rather than binary on/off flags. The formula evaluates:
                  <code className="block p-2 bg-stone-50 border border-stone-200 rounded text-[11px] font-mono my-2 text-stone-800">
                    Confidence = BaseCalendarScore(Month, Peak) ± TempModifier(CurrentTemp, [Min, Max]) ± MoistureModifier(7DayRain, SoilThreshold)
                  </code>
                  For fungi, moisture is weighted heavily (+20 if rain ≥25mm; -25 if drought &lt;5mm). For plants, thermal accumulation (Base 5°C GDD) governs spring bud-break. Results are categorized into dignified labels: <em>Likely in Season</em> (≥70), <em>Possibly in Season</em> (45–69), and <em>Seasonal Estimate</em> (&lt;45).
                </p>
              </div>

              {/* Question 4 */}
              <div className="pt-3 space-y-1.5">
                <h4 className="text-sm font-serif font-semibold text-stone-900">
                  4. What tech stack suits a Node.js calendar app with weather data?
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  The recommended stack is: <strong>Node.js with TypeScript & Express</strong> for a fast, predictable backend with rate limiting and clean service interfaces; <strong>PostgreSQL with Prisma ORM</strong> for structured relational schemas and spatial indexing; <strong>React 19 with Vite & Tailwind CSS</strong> for instant client reactivity and accessible UI; <strong>Axios/Fetch with AbortController</strong> for resilient weather API querying with circuit breakers and fallback caching; and <strong>Jest / TSX Test Runners</strong> for automated phenological matching unit tests.
                </p>
              </div>

              {/* Question 5 */}
              <div className="pt-3 space-y-1.5">
                <h4 className="text-sm font-serif font-semibold text-stone-900">
                  5. How to design a scalable data schema for seasonal events?
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Separate static botanical taxonomy from dynamic temporal occurrences. Key relational tables:
                  <code className="block p-2 bg-stone-50 border border-stone-200 rounded text-[11px] font-mono my-2 text-stone-800">
                    Species (1) ──&lt; SeasonalRange (N) [regionCode, startMonth, peakMonths, tempRange, minPrecip]
                    Species (1) ──&lt; Lookalikes (JSONB / Relations)
                    Region (1) ──&lt; ClimateObservation (N) [observedAt, tempC, precip7d, moistureIndex]
                    UserPreference (1) ──&lt; HarvestAlert (N) [speciesId, triggerType, targetMonth]
                  </code>
                  This structure supports adding new species, adapting to changing climate shifts over time, and querying seasonal availability in O(1) time using composite indices on <code>(regionCode, startMonth, endMonth)</code>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
