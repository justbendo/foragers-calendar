import React from 'react';
import { ShieldAlert, Bell, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: 'discovery' | 'calendar' | 'directory' | 'simulator' | 'safety' | 'alerts';
  setActiveTab: (tab: 'discovery' | 'calendar' | 'directory' | 'simulator' | 'safety' | 'alerts') => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, savedCount }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('discovery')}
          className="text-xl sm:text-2xl font-serif font-medium tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:text-emerald-950 transition-colors text-left"
        >
          The Foragers Calendar
        </button>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          <button
            onClick={() => setActiveTab('discovery')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'discovery' ? 'text-stone-950 border-b-2 border-stone-900 pb-0.5' : 'hover:text-stone-950'
            }`}
          >
            Seasonal Discovery
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'calendar' ? 'text-stone-950 border-b-2 border-stone-900 pb-0.5' : 'hover:text-stone-950'
            }`}
          >
            12-Month Calendar
          </button>
          <button
            onClick={() => setActiveTab('directory')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'directory' ? 'text-stone-950 border-b-2 border-stone-900 pb-0.5' : 'hover:text-stone-950'
            }`}
          >
            Species Directory
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'simulator' ? 'text-stone-950 border-b-2 border-stone-900 pb-0.5' : 'hover:text-stone-950'
            }`}
          >
            Climate Simulator
          </button>
          <button
            onClick={() => setActiveTab('safety')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'safety' ? 'text-stone-950 border-b-2 border-stone-900 pb-0.5' : 'hover:text-stone-950'
            }`}
          >
            Botanical Field Guide
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('alerts')}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors whitespace-nowrap"
            title="View Harvest Alerts & Watchlist"
          >
            <Bell className="w-3.5 h-3.5 text-emerald-800" />
            <span>Watchlist</span>
            {savedCount > 0 && (
              <span className="font-mono text-[11px] bg-stone-900 text-stone-100 rounded px-1.5 py-0.2">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation row */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-200 py-2 px-2 bg-stone-100/80 text-xs font-medium text-stone-700 overflow-x-auto">
        <button
          onClick={() => setActiveTab('discovery')}
          className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'discovery' ? 'bg-white text-stone-900 shadow-sm' : ''}`}
        >
          Discovery
        </button>
        <button
          onClick={() => setActiveTab('calendar')}
          className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'calendar' ? 'bg-white text-stone-900 shadow-sm' : ''}`}
        >
          Calendar
        </button>
        <button
          onClick={() => setActiveTab('directory')}
          className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'directory' ? 'bg-white text-stone-900 shadow-sm' : ''}`}
        >
          Directory
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'simulator' ? 'bg-white text-stone-900 shadow-sm' : ''}`}
        >
          Simulator
        </button>
        <button
          onClick={() => setActiveTab('safety')}
          className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'safety' ? 'bg-white text-stone-900 shadow-sm' : ''}`}
        >
          Safety
        </button>
      </div>
    </header>
  );
};
