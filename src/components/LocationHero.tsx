import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Compass,
  CloudRain,
  Thermometer,
  Droplets,
  HelpCircle,
  RotateCcw,
  Sliders,
  CheckCircle2,
  Info,
  Search,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { RegionDefinition, ClimateSnapshot, LocationState } from '../types/forager.ts';

interface LocationHeroProps {
  regions: RegionDefinition[];
  location: LocationState;
  setLocation: React.Dispatch<React.SetStateAction<LocationState>>;
  climate: ClimateSnapshot | null;
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
  onOpenSimulator: () => void;
  isLoadingClimate: boolean;
  onRequestGeolocation: () => void;
  onResetLocation: () => void;
  isLocating?: boolean;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

interface SearchResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  admin1?: string;
  country: string;
}

export const LocationHero: React.FC<LocationHeroProps> = ({
  regions,
  location,
  setLocation,
  climate,
  selectedMonth,
  setSelectedMonth,
  onOpenSimulator,
  isLoadingClimate,
  onRequestGeolocation,
  onResetLocation,
  isLocating = false
}) => {
  const [showLocationRationale, setShowLocationRationale] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchDebounceRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced UK Postcode & Town Search using Open-Meteo Geocoding
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    searchDebounceRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          searchQuery.trim()
        )}&count=5&language=en&format=json&country_code=GB`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.results)) {
            setSearchResults(data.results);
            setShowSearchDropdown(true);
          } else {
            setSearchResults([]);
          }
        }
      } catch (err) {
        console.warn('Geocoding search failed:', err);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    };
  }, [searchQuery]);

  // Select place from autocomplete
  const handleSelectPlace = (place: SearchResult) => {
    const lat = Math.round(place.latitude * 100) / 100;
    const lon = Math.round(place.longitude * 100) / 100;

    // Find nearest UK Region
    let closest = regions[0];
    let minDistance = Infinity;
    regions.forEach((r) => {
      const dist = Math.hypot(
        r.latitudeCenter - lat,
        (r.longitudeCenter - lon) * Math.cos((lat * Math.PI) / 180)
      );
      if (dist < minDistance) {
        minDistance = dist;
        closest = r;
      }
    });

    const labelName = place.admin1 ? `${place.name}, ${place.admin1}` : place.name;

    setLocation({
      label: `${labelName} (UK)`,
      latitude: lat,
      longitude: lon,
      regionCode: closest?.code || 'UK_SOUTH_EAST_WEALD',
      accuracy: 'exact_approximated',
      isDenied: false
    });

    setSearchQuery('');
    setShowSearchDropdown(false);
  };

  return (
    <section className="relative border-b border-stone-200 bg-[#FBF9F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: UK Focus & Location Engine */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* UK Specific Kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-stone-500 mb-2">
              <span className="font-serif italic font-semibold text-emerald-900">
                British Isles Phenological Foraging Calendar
              </span>
              <span aria-hidden="true">·</span>
              <span className="bg-stone-200/80 text-stone-800 text-[11px] px-2 py-0.5 rounded font-mono">
                UK Specific Edition
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-stone-900 tracking-tight leading-[1.15] text-balance">
              Discover wild foods in season across the UK.
            </h1>

            <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl">
              Calibrated for the British countryside—from the ancient beech woods of the South Downs to the Caledonian pinewoods of the Scottish Highlands. Powered by real-time UK weather models and regional botanical records.
            </p>

            {/* Location & Month Control Card */}
            <div className="mt-6 p-4 bg-white/95 border border-stone-200 rounded-xl shadow-xs space-y-4">
              
              {/* Header row: Status + Geolocation Trigger */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span className="text-xs font-semibold text-stone-800 uppercase tracking-wider">
                    UK Target Location
                  </span>
                  <button
                    onClick={() => setShowLocationRationale(true)}
                    className="text-stone-400 hover:text-stone-600 transition-colors p-0.5"
                    title="Why do we request approximate location?"
                    aria-label="Why do we request approximate location?"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {location.accuracy !== 'default' && (
                    <button
                      onClick={onResetLocation}
                      className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 underline underline-offset-2"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset
                    </button>
                  )}

                  <button
                    onClick={onRequestGeolocation}
                    disabled={isLocating}
                    className="px-3 py-1.5 text-xs font-medium bg-emerald-900 hover:bg-emerald-950 text-white rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-60 shadow-2xs"
                    title="Find nearest UK foraging area using device GPS"
                  >
                    {isLocating ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Compass className="w-3.5 h-3.5 text-emerald-300" />
                    )}
                    <span>{isLocating ? 'Locating...' : 'Use My Geolocation'}</span>
                  </button>
                </div>
              </div>

              {/* UK Postcode or Town Search Input */}
              <div className="relative">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search UK town, city, or postcode (e.g. Edinburgh, Inverness, Keswick, Truro, SW1A 1AA)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery.length >= 2 && setShowSearchDropdown(true)}
                    className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg pl-8 pr-8 py-2 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-emerald-800"
                  />
                  {isSearching && (
                    <Loader2 className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 animate-spin" />
                  )}
                </div>

                {/* Autocomplete dropdown */}
                {showSearchDropdown && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 z-30 mt-1 bg-white border border-stone-200 rounded-lg shadow-lg overflow-hidden text-xs">
                    <div className="p-1.5 bg-stone-50 border-b border-stone-100 text-[10px] font-mono uppercase tracking-wider text-stone-500">
                      Select UK Location
                    </div>
                    {searchResults.map((place) => (
                      <button
                        key={place.id}
                        type="button"
                        onClick={() => handleSelectPlace(place)}
                        className="w-full text-left px-3 py-2 hover:bg-emerald-50 flex items-center justify-between border-b border-stone-50 last:border-0 transition-colors"
                      >
                        <span className="font-medium text-stone-900">
                          {place.name}
                          {place.admin1 && (
                            <span className="text-stone-500 font-normal ml-1">
                              ({place.admin1})
                            </span>
                          )}
                        </span>
                        <span className="text-[10px] font-mono text-stone-400">
                          {place.latitude.toFixed(2)}, {place.longitude.toFixed(2)}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Region and Month Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-stone-200">
                <div>
                  <label htmlFor="region-select" className="block text-xs font-semibold text-stone-700 mb-1">
                    UK Location / Biogeographical Region
                  </label>
                  <select
                    id="region-select"
                    value={location.regionCode}
                    onChange={(e) => {
                      const sel = regions.find((r) => r.code === e.target.value);
                      setLocation({
                        label: sel ? sel.name : e.target.value,
                        latitude: sel?.latitudeCenter || null,
                        longitude: sel?.longitudeCenter || null,
                        regionCode: e.target.value,
                        accuracy: 'region_manual',
                        isDenied: false
                      });
                    }}
                    className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-800"
                  >
                    {regions.map((reg) => (
                      <option key={reg.code} value={reg.code}>
                        {reg.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="month-select" className="block text-xs font-medium text-stone-600 mb-1 flex items-center justify-between">
                    <span>Observation Month</span>
                    {selectedMonth === new Date().getMonth() + 1 && (
                      <span className="text-[11px] text-emerald-800 font-serif italic">Current Month</span>
                    )}
                  </label>
                  <select
                    id="month-select"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
                    className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-800"
                  >
                    {MONTH_NAMES.map((m, idx) => (
                      <option key={m} value={idx + 1}>
                        {m} (Month {idx + 1})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Selection Details & Simulation Trigger */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-stone-600 pt-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>
                    Selected: <strong className="font-medium text-stone-900">{location.label}</strong>
                  </span>
                  <span className="text-[11px] text-stone-400">
                    ({location.accuracy === 'exact_approximated' ? 'Approx. 1km blur' : 'UK Regional model'})
                  </span>
                </div>
                <button
                  onClick={onOpenSimulator}
                  className="text-xs font-medium text-emerald-900 hover:text-emerald-950 flex items-center gap-1 shrink-0"
                >
                  <Sliders className="w-3 h-3" />
                  <span>Simulate Weather Flushes</span>
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Specimen Image & Climate Feed */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full relative rounded-2xl overflow-hidden border border-stone-300 shadow-md bg-stone-100 aspect-16/10">
              <img
                src="/src/assets/images/hero_botanical_foraging_1792523199522.jpg"
                alt="Wicker basket with British chanterelles and foraged plants in an ancient deciduous woodland"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-stone-100 text-xs">
                <p className="font-serif italic text-stone-200">
                  British Woodland Phenology Study
                </p>
                <p className="text-[11px] text-stone-400">
                  Calibrated for UK Ecoregions · British Mycological Society Guidelines
                </p>
              </div>
            </div>

            {/* Climate & Rain Sensor Ribbon */}
            <div className="w-full mt-3 bg-white border border-stone-200 rounded-xl p-3 shadow-xs">
              <div className="flex items-center justify-between text-xs font-medium text-stone-500 mb-2">
                <span className="flex items-center gap-1 text-stone-700 font-semibold">
                  <CloudRain className="w-3.5 h-3.5 text-emerald-800" />
                  UK Climate Feed ({MONTH_NAMES[selectedMonth - 1]})
                </span>
                <span className="text-[11px] font-mono text-stone-400">
                  {climate?.provider || 'Open-Meteo UK'}
                </span>
              </div>

              {isLoadingClimate ? (
                <div className="py-2 text-center text-xs text-stone-500 animate-pulse">
                  Querying British meteorological sensors...
                </div>
              ) : climate ? (
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-stone-50 rounded-lg border border-stone-100">
                    <div className="text-[11px] text-stone-500 flex items-center justify-center gap-1">
                      <Thermometer className="w-3 h-3 text-amber-700" />
                      <span>Mean Temp</span>
                    </div>
                    <div className="text-base font-serif font-bold text-stone-900 tabular-nums">
                      {climate.temperatureC.toFixed(1)}°C
                    </div>
                  </div>

                  <div className="p-2 bg-stone-50 rounded-lg border border-stone-100">
                    <div className="text-[11px] text-stone-500 flex items-center justify-center gap-1">
                      <Droplets className="w-3 h-3 text-sky-700" />
                      <span>7-Day Rain</span>
                    </div>
                    <div className="text-base font-serif font-bold text-stone-900 tabular-nums">
                      {climate.precipitation7DaysMm.toFixed(1)} mm
                    </div>
                  </div>

                  <div className="p-2 bg-stone-50 rounded-lg border border-stone-100">
                    <div className="text-[11px] text-stone-500 flex items-center justify-center gap-1">
                      <Compass className="w-3 h-3 text-emerald-800" />
                      <span>Hydration Index</span>
                    </div>
                    <div className="text-base font-serif font-bold text-stone-900 tabular-nums">
                      {Math.round(climate.soilMoistureScore * 100)}%
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

        </div>
      </div>

      {/* Location Privacy & Rationale Dialog */}
      {showLocationRationale && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-stone-200 relative animate-in fade-in duration-200">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-semibold text-stone-900">
                  UK Location & Privacy Protection
                </h3>
                <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                  The Foragers Calendar is calibrated exclusively for the British Isles. We request approximate location solely to query local temperature and 7-day cumulative rainfall data to estimate fungal flushes and plant shoots.
                </p>
                <div className="mt-3 space-y-1.5 text-xs text-stone-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Coordinates are blurred to 2 decimal places (~1.1 km radius).</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Exact foraging locations are never stored or broadcast.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>You can search any UK town or postcode directly.</span>
                  </div>
                </div>
                <div className="mt-5 flex justify-end">
                  <button
                    onClick={() => setShowLocationRationale(false)}
                    className="px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors"
                  >
                    Understood
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
