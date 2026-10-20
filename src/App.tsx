/**
 * The Foragers Calendar
 * Main Application Component
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Filter,
  Calendar,
  Grid,
  Sparkles,
  AlertCircle,
  RefreshCw,
  Leaf,
  Sliders,
  Bookmark,
  ShieldCheck,
  CheckCircle2,
  X
} from 'lucide-react';

import {
  SpeciesRecord,
  SpeciesSeasonalMatch,
  RegionDefinition,
  ClimateSnapshot,
  LocationState,
  HarvestAlertItem
} from './types/forager.ts';

import { Navbar } from './components/Navbar.tsx';
import { LocationHero } from './components/LocationHero.tsx';
import { SeasonalCard } from './components/SeasonalCard.tsx';
import { CalendarPhenologyMatrix } from './components/CalendarPhenologyMatrix.tsx';
import { SpeciesDetailModal } from './components/SpeciesDetailModal.tsx';
import { ClimateSimulatorModal } from './components/ClimateSimulatorModal.tsx';
import { HarvestAlertsModal } from './components/HarvestAlertsModal.tsx';
import { FieldSafetyGuide } from './components/FieldSafetyGuide.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  const [activeTab, setActiveTab] = useState<'discovery' | 'calendar' | 'directory' | 'simulator' | 'safety' | 'alerts'>('discovery');
  
  // Data state
  const [regions, setRegions] = useState<RegionDefinition[]>([]);
  const [allSpecies, setAllSpecies] = useState<SpeciesRecord[]>([]);
  const [seasonalMatches, setSeasonalMatches] = useState<SpeciesSeasonalMatch[]>([]);
  const [climate, setClimate] = useState<ClimateSnapshot | null>(null);
  const [alerts, setAlerts] = useState<HarvestAlertItem[]>([]);
  const [dbStatus, setDbStatus] = useState<{
    isConfigured: boolean;
    isValidFormat: boolean;
    provider: string;
    hostDisplay: string;
    errorMessage?: string;
  } | null>(null);
  const [savedSpeciesIds, setSavedSpeciesIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('forager_saved_species');
      return stored ? JSON.parse(stored) : ['sp_cantharellus_cibarius', 'sp_allium_ursinum'];
    } catch {
      return ['sp_cantharellus_cibarius', 'sp_allium_ursinum'];
    }
  });

  // UK Location & Month State
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [location, setLocation] = useState<LocationState>({
    label: 'South East England, London & The Weald',
    latitude: 51.5074,
    longitude: -0.1278,
    regionCode: 'UK_SOUTH_EAST_WEALD',
    accuracy: 'default',
    isDenied: false
  });
  const [isLocating, setIsLocating] = useState<boolean>(false);

  // Simulation State
  const [simTemp, setSimTemp] = useState<number>(14);
  const [simRain, setSimRain] = useState<number>(25);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState<boolean>(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState<boolean>(false);

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [kingdomFilter, setKingdomFilter] = useState<'All' | 'Plantae' | 'Fungi'>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [edibilityFilter, setEdibilityFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid');

  // Modal State
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<string | null>(null);

  // Loading & Error States
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingClimate, setIsLoadingClimate] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync saved species to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('forager_saved_species', JSON.stringify(savedSpeciesIds));
    } catch (e) {
      console.warn('Could not persist saved species to localStorage:', e);
    }
  }, [savedSpeciesIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 1. Initial Load: Fetch Regions and All Species
  useEffect(() => {
    async function initData() {
      setIsLoading(true);
      try {
        const [regionsRes, speciesRes, alertsRes, dbStatusRes] = await Promise.all([
          fetch('/api/regions').then(r => r.json()),
          fetch('/api/species').then(r => r.json()),
          fetch('/api/alerts').then(r => r.json()).catch(() => []),
          fetch('/api/db/status').then(r => r.json()).catch(() => null)
        ]);

        if (Array.isArray(regionsRes)) setRegions(regionsRes);
        if (Array.isArray(speciesRes)) setAllSpecies(speciesRes);
        if (Array.isArray(alertsRes)) setAlerts(alertsRes);
        if (dbStatusRes) setDbStatus(dbStatusRes);
      } catch (err) {
        console.error('Initial data load failed:', err);
        setErrorMessage('Failed to connect to the backend phenology service. Please refresh.');
      } finally {
        setIsLoading(false);
      }
    }
    initData();
  }, []);

  // 2. Compute Seasonality whenever month, location, or simulation parameters change
  useEffect(() => {
    async function fetchSeasonal() {
      setIsLoadingClimate(true);
      try {
        const params = new URLSearchParams();
        params.set('month', selectedMonth.toString());
        params.set('regionCode', location.regionCode);

        if (isSimulating) {
          params.set('simTemp', simTemp.toString());
          params.set('simRain', simRain.toString());
        } else if (location.latitude !== null && location.longitude !== null) {
          params.set('lat', location.latitude.toString());
          params.set('lon', location.longitude.toString());
        }

        const res = await fetch(`/api/seasonal?${params.toString()}`);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();

        if (data.matches) setSeasonalMatches(data.matches);
        if (data.climate) {
          setClimate(data.climate);
          if (!isSimulating) {
            setSimTemp(data.climate.temperatureC);
            setSimRain(data.climate.precipitation7DaysMm);
          }
        }
      } catch (err) {
        console.error('Failed to compute seasonality:', err);
      } finally {
        setIsLoadingClimate(false);
      }
    }

    fetchSeasonal();
  }, [selectedMonth, location.regionCode, location.latitude, location.longitude, isSimulating, simTemp, simRain]);

  // Handle UK Geolocation Request
  const handleRequestGeolocation = () => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    showToast('Locating your position in the British Isles...');

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const rawLat = pos.coords.latitude;
          const rawLon = pos.coords.longitude;
          // Privacy blur: 2 decimal places (~1.1km)
          const blurredLat = Math.round(rawLat * 100) / 100;
          const blurredLon = Math.round(rawLon * 100) / 100;

          // Check if coordinates fall within the UK bounding box (49°N to 61°N, -9°W to +2°E)
          const isWithinUk = blurredLat >= 49.2 && blurredLat <= 61.2 && blurredLon >= -8.8 && blurredLon <= 2.2;

          // Find closest UK foraging region
          let closest = regions[0];
          let minDistance = Infinity;
          regions.forEach((r) => {
            const dist = Math.hypot(
              r.latitudeCenter - blurredLat,
              (r.longitudeCenter - blurredLon) * Math.cos((blurredLat * Math.PI) / 180)
            );
            if (dist < minDistance) {
              minDistance = dist;
              closest = r;
            }
          });

          if (isWithinUk) {
            setLocation({
              label: `Local Coordinates (${blurredLat.toFixed(2)}, ${blurredLon.toFixed(2)}) · ${closest?.name || 'UK'}`,
              latitude: blurredLat,
              longitude: blurredLon,
              regionCode: closest?.code || 'UK_SOUTH_EAST_WEALD',
              accuracy: 'exact_approximated',
              isDenied: false
            });
            showToast(`Location set: ${closest?.name || 'UK Area'}`);
          } else {
            // Testing from outside the UK: gracefully calibrate to closest UK territory
            setLocation({
              label: `${closest?.name || 'South East England'} (Calibrated from ${blurredLat.toFixed(1)}, ${blurredLon.toFixed(1)})`,
              latitude: closest?.latitudeCenter || 51.21,
              longitude: closest?.longitudeCenter || -0.12,
              regionCode: closest?.code || 'UK_SOUTH_EAST_WEALD',
              accuracy: 'region_manual',
              isDenied: false
            });
            showToast(`Target set to closest UK zone: ${closest?.name}`);
          }
          setIsSimulating(false);
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        setIsLocating(false);
        console.warn('Geolocation unavailable:', err.message);
        setLocation((prev) => ({ ...prev, isDenied: true }));
        showToast('Device GPS unavailable. Choose a UK region below.');
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  const handleResetLocation = () => {
    const defaultRegion =
      regions.find((r) => r.code === 'UK_SOUTH_EAST_WEALD') ||
      regions[0] || {
        code: 'UK_SOUTH_EAST_WEALD',
        name: 'South East England, London & The Weald',
        latitudeCenter: 51.2091,
        longitudeCenter: -0.1163
      };
    setLocation({
      label: defaultRegion.name,
      latitude: defaultRegion.latitudeCenter,
      longitude: defaultRegion.longitudeCenter,
      regionCode: defaultRegion.code,
      accuracy: 'default',
      isDenied: false
    });
    setIsSimulating(false);
    showToast('Reset to UK default: South East England & London.');
  };

  // Toggle Save to Watchlist
  const handleToggleSave = (speciesId: string) => {
    setSavedSpeciesIds(prev => {
      const exists = prev.includes(speciesId);
      const updated = exists ? prev.filter(id => id !== speciesId) : [...prev, speciesId];
      showToast(exists ? 'Removed from Watchlist' : 'Added to Watchlist');
      return updated;
    });
  };

  // Alert Creation
  const handleCreateAlert = async (newAlert: {
    speciesId: string;
    targetMonth: number;
    conditionTrigger: 'rainfall_flush' | 'temperature_window' | 'peak_season';
    notes?: string;
  }) => {
    try {
      const res = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newAlert,
          regionCode: location.regionCode
        })
      });
      if (res.ok) {
        const created = await res.json();
        setAlerts(prev => [created, ...prev]);
        showToast('Harvest alert successfully registered.');
      }
    } catch (e) {
      console.error('Failed to create alert:', e);
      showToast('Error registering alert.');
    }
  };

  const handleDeleteAlert = async (id: string) => {
    try {
      const res = await fetch(`/api/alerts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setAlerts(prev => prev.filter(a => a.id !== id));
        showToast('Alert removed.');
      }
    } catch (e) {
      console.error('Failed to delete alert:', e);
    }
  };

  // Filtered Matches
  const filteredMatches = useMemo(() => {
    return seasonalMatches.filter(({ species, status }) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          species.commonName.toLowerCase().includes(q) ||
          species.scientificName.toLowerCase().includes(q) ||
          species.family.toLowerCase().includes(q) ||
          species.habitats.some(h => h.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // Kingdom
      if (kingdomFilter !== 'All' && species.kingdom !== kingdomFilter) {
        return false;
      }

      // Category
      if (categoryFilter !== 'All' && species.category !== categoryFilter) {
        return false;
      }

      // Edibility
      if (edibilityFilter !== 'All') {
        if (edibilityFilter === 'Choice Edible' && !species.edibility.includes('Choice')) return false;
        if (edibilityFilter === 'Toxic' && !species.edibility.includes('Toxic')) return false;
        if (edibilityFilter === 'Edible' && species.edibility.includes('Toxic')) return false;
      }

      // Status
      if (statusFilter !== 'All') {
        if (statusFilter === 'in_season' && (status === 'off season')) return false;
        if (statusFilter === 'likely' && status !== 'likely in season') return false;
        if (statusFilter === 'peak' && !species.seasonalRanges[0]?.peakMonthStart) return false;
      }

      return true;
    });
  }, [seasonalMatches, searchQuery, kingdomFilter, categoryFilter, edibilityFilter, statusFilter]);

  // Species currently selected for the detail modal
  const selectedSpeciesRecord = useMemo(() => {
    if (!selectedSpeciesId) return null;
    return allSpecies.find(s => s.id === selectedSpeciesId) || null;
  }, [selectedSpeciesId, allSpecies]);

  // Saved species records
  const savedSpeciesRecords = useMemo(() => {
    return allSpecies.filter(s => savedSpeciesIds.includes(s.id));
  }, [allSpecies, savedSpeciesIds]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-stone-900 selection:bg-emerald-900 selection:text-white">
      
      {/* 1. Global Navigation (Strict 3-zone Top Bar Contract) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'alerts') setIsAlertsOpen(true);
          if (tab === 'simulator') setIsSimulatorOpen(true);
        }}
        savedCount={savedSpeciesIds.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'safety' ? (
          <FieldSafetyGuide />
        ) : (
          <>
            {/* Location Selector & UK Conditions Hero */}
            <LocationHero
              regions={regions}
              location={location}
              setLocation={setLocation}
              climate={climate}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              onOpenSimulator={() => setIsSimulatorOpen(true)}
              isLoadingClimate={isLoadingClimate}
              onRequestGeolocation={handleRequestGeolocation}
              onResetLocation={handleResetLocation}
              isLocating={isLocating}
            />

            {/* Simulation Notification Badge if active */}
            {isSimulating && (
              <div className="bg-emerald-900 text-emerald-100 py-2 px-4 text-xs flex items-center justify-between max-w-7xl mx-auto rounded-lg mt-4 border border-emerald-800">
                <div className="flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-emerald-300" />
                  <span>
                    <strong>Microclimate Simulation Active:</strong> Mean Temp {simTemp.toFixed(1)}°C · 7-Day Rain {simRain.toFixed(1)}mm
                  </span>
                </div>
                <button
                  onClick={() => setIsSimulating(false)}
                  className="text-emerald-200 hover:text-white underline font-medium"
                >
                  Exit Simulation
                </button>
              </div>
            )}

            {/* 4. Seasonal Discovery & Filter Toolbar */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              
              {/* Filter Controls Row */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-6 border-b border-stone-200">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search by common name, genus (Cantharellus), or habitat..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs bg-white border border-stone-300 rounded-lg pl-9 pr-8 py-2 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-emerald-800"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filter Controls (Segmented buttons with zero-pill discipline) */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Kingdom Toggle */}
                  <div className="flex items-center p-1 bg-stone-200/60 rounded-lg text-xs font-medium text-stone-700">
                    <button
                      onClick={() => setKingdomFilter('All')}
                      className={`px-3 py-1 rounded-md transition-colors ${kingdomFilter === 'All' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'hover:text-stone-950'}`}
                    >
                      All Kingdoms
                    </button>
                    <button
                      onClick={() => setKingdomFilter('Fungi')}
                      className={`px-3 py-1 rounded-md transition-colors ${kingdomFilter === 'Fungi' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'hover:text-stone-950'}`}
                    >
                      Mushrooms
                    </button>
                    <button
                      onClick={() => setKingdomFilter('Plantae')}
                      className={`px-3 py-1 rounded-md transition-colors ${kingdomFilter === 'Plantae' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'hover:text-stone-950'}`}
                    >
                      Plants & Greens
                    </button>
                  </div>

                  {/* Edibility Selector */}
                  <select
                    value={edibilityFilter}
                    onChange={(e) => setEdibilityFilter(e.target.value)}
                    className="text-xs bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-800"
                  >
                    <option value="All">All Edibility</option>
                    <option value="Choice Edible">Choice Edible Only</option>
                    <option value="Edible">All Edible / Tea</option>
                    <option value="Toxic">Cautionary / Toxic</option>
                  </select>

                  {/* View Mode Toggle: Cards vs 12-Month Matrix */}
                  <div className="flex items-center p-1 bg-stone-200/60 rounded-lg text-xs font-medium text-stone-700 ml-auto">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-colors ${viewMode === 'grid' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'hover:text-stone-950'}`}
                      title="Curated Field Cards"
                    >
                      <Grid className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Cards</span>
                    </button>
                    <button
                      onClick={() => setViewMode('calendar')}
                      className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-colors ${viewMode === 'calendar' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'hover:text-stone-950'}`}
                      title="12-Month Phenology Matrix"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Calendar</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Discovery Section Subheader */}
              <div className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <span>Showing <strong className="font-medium text-stone-900">{filteredMatches.length}</strong> botanical species</span>
                  <span aria-hidden="true">·</span>
                  <span className="italic font-serif">Ranked by seasonal probability</span>
                </div>
                <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
                  <span>Educational phenology model · Never eat without expert confirmation</span>
                </div>
              </div>

              {/* View Output */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
                  {[1, 2, 3].map(n => (
                    <div key={n} className="bg-white rounded-xl border border-stone-200 h-80 animate-pulse p-4 space-y-4">
                      <div className="bg-stone-200 rounded-lg h-44 w-full" />
                      <div className="h-4 bg-stone-200 rounded w-2/3" />
                      <div className="h-3 bg-stone-100 rounded w-1/2" />
                    </div>
                  ))}
                </div>
              ) : filteredMatches.length === 0 ? (
                <div className="py-16 text-center bg-white rounded-xl border border-stone-200 p-8 max-w-md mx-auto space-y-3">
                  <AlertCircle className="w-8 h-8 text-stone-400 mx-auto" />
                  <h3 className="text-base font-serif font-medium text-stone-900">
                    No matching species found
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Try relaxing your search terms, changing the kingdom filter, or checking a different calendar month.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setKingdomFilter('All');
                      setEdibilityFilter('All');
                    }}
                    className="px-4 py-1.5 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMatches.map(match => (
                    <SeasonalCard
                      key={match.species.id}
                      match={match}
                      isSaved={savedSpeciesIds.includes(match.species.id)}
                      onToggleSave={handleToggleSave}
                      onSelect={(id) => setSelectedSpeciesId(id)}
                    />
                  ))}
                </div>
              ) : (
                <CalendarPhenologyMatrix
                  matches={filteredMatches}
                  selectedMonth={selectedMonth}
                  setSelectedMonth={setSelectedMonth}
                  onSelectSpecies={(id) => setSelectedSpeciesId(id)}
                />
              )}

            </section>
          </>
        )}
      </main>

      {/* 5. Species Detail Modal */}
      <SpeciesDetailModal
        species={selectedSpeciesRecord}
        onClose={() => setSelectedSpeciesId(null)}
        isSaved={selectedSpeciesId ? savedSpeciesIds.includes(selectedSpeciesId) : false}
        onToggleSave={handleToggleSave}
      />

      {/* 6. Climate Simulator Modal */}
      <ClimateSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => {
          setIsSimulatorOpen(false);
          setIsSimulating(true);
        }}
        simRain={simRain}
        setSimRain={setSimRain}
        simTemp={simTemp}
        setSimTemp={setSimTemp}
        onReset={() => {
          setIsSimulating(false);
          if (climate) {
            setSimTemp(climate.temperatureC);
            setSimRain(climate.precipitation7DaysMm);
          }
          setIsSimulatorOpen(false);
          showToast('Simulator reset to real-world weather feed.');
        }}
        isSimulating={isSimulating}
      />

      {/* 7. Harvest Alerts & Watchlist Modal */}
      <HarvestAlertsModal
        isOpen={isAlertsOpen}
        onClose={() => setIsAlertsOpen(false)}
        alerts={alerts}
        onCreateAlert={handleCreateAlert}
        onDeleteAlert={handleDeleteAlert}
        savedSpecies={savedSpeciesRecords}
        allSpecies={allSpecies}
        onSelectSpecies={(id) => {
          setIsAlertsOpen(false);
          setSelectedSpeciesId(id);
        }}
        selectedRegionName={location.label}
      />

      {/* 8. Toast Feedback Message */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-stone-100 text-xs px-4 py-2.5 rounded-lg shadow-lg border border-stone-800 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 9. Global Footer */}
      <Footer onOpenSafety={() => setActiveTab('safety')} />

    </div>
  );
}
