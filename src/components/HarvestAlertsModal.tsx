import React, { useState } from 'react';
import {
  X,
  Bell,
  Plus,
  Trash2,
  Calendar,
  CloudRain,
  Thermometer,
  Bookmark,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { HarvestAlertItem, SpeciesRecord } from '../types/forager.ts';

interface HarvestAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: HarvestAlertItem[];
  onCreateAlert: (alert: {
    speciesId: string;
    targetMonth: number;
    conditionTrigger: 'rainfall_flush' | 'temperature_window' | 'peak_season';
    notes?: string;
  }) => Promise<void>;
  onDeleteAlert: (id: string) => Promise<void>;
  savedSpecies: SpeciesRecord[];
  allSpecies: SpeciesRecord[];
  onSelectSpecies: (id: string) => void;
  selectedRegionName: string;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const HarvestAlertsModal: React.FC<HarvestAlertsModalProps> = ({
  isOpen,
  onClose,
  alerts,
  onCreateAlert,
  onDeleteAlert,
  savedSpecies,
  allSpecies,
  onSelectSpecies,
  selectedRegionName
}) => {
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<string>(allSpecies[0]?.id || '');
  const [targetMonth, setTargetMonth] = useState<number>(new Date().getMonth() + 1);
  const [conditionTrigger, setConditionTrigger] = useState<'rainfall_flush' | 'temperature_window' | 'peak_season'>('rainfall_flush');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSpeciesId) return;
    setIsSubmitting(true);
    try {
      await onCreateAlert({
        speciesId: selectedSpeciesId,
        targetMonth,
        conditionTrigger,
        notes: notes.trim() || undefined
      });
      setNotes('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#FBF9F5] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-300 space-y-6 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-900 text-white rounded-xl shadow-xs">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-medium text-stone-900">
                Harvest Alerts & Saved Watchlist
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Set climate and seasonal triggers to be notified when conditions favor emergence.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Saved Watchlist Section */}
        <div>
          <h4 className="text-sm font-serif font-semibold text-stone-900 mb-2 flex items-center gap-1.5">
            <Bookmark className="w-4 h-4 text-emerald-800" />
            Saved Species ({savedSpecies.length})
          </h4>
          {savedSpecies.length === 0 ? (
            <p className="text-xs text-stone-500 p-3 bg-stone-100 rounded-lg border border-stone-200">
              No species bookmarked yet. Click the bookmark icon on any card to add species to your watch list.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {savedSpecies.map(sp => (
                <div
                  key={sp.id}
                  onClick={() => onSelectSpecies(sp.id)}
                  className="p-2.5 bg-white rounded-lg border border-stone-200 hover:border-stone-300 hover:shadow-2xs cursor-pointer flex items-center justify-between gap-2 transition-all"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <img
                      src={sp.imageUrl}
                      alt=""
                      className="w-7 h-7 rounded-sm object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="truncate">
                      <div className="text-xs font-medium text-stone-900 truncate">
                        {sp.commonName}
                      </div>
                      <div className="text-[10px] italic text-stone-500 truncate">
                        {sp.scientificName}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create Alert Form */}
        <div className="p-5 bg-white rounded-xl border border-stone-200 space-y-4">
          <h4 className="text-sm font-serif font-semibold text-stone-900 flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-emerald-800" />
            Configure New Phenological Trigger
          </h4>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Target Species
                </label>
                <select
                  value={selectedSpeciesId}
                  onChange={(e) => setSelectedSpeciesId(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-800"
                >
                  {allSpecies.map(sp => (
                    <option key={sp.id} value={sp.id}>
                      {sp.commonName} ({sp.scientificName})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Target Month
                </label>
                <select
                  value={targetMonth}
                  onChange={(e) => setTargetMonth(parseInt(e.target.value, 10))}
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-800"
                >
                  {MONTH_NAMES.map((m, idx) => (
                    <option key={m} value={idx + 1}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Meteorological Trigger Condition
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setConditionTrigger('rainfall_flush')}
                  className={`p-2 rounded-lg border text-left transition-colors flex items-center gap-2 ${
                    conditionTrigger === 'rainfall_flush'
                      ? 'bg-emerald-50 border-emerald-800 text-emerald-950 font-medium'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <CloudRain className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                  <span>Rainfall Flush (≥25mm)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setConditionTrigger('temperature_window')}
                  className={`p-2 rounded-lg border text-left transition-colors flex items-center gap-2 ${
                    conditionTrigger === 'temperature_window'
                      ? 'bg-emerald-50 border-emerald-800 text-emerald-950 font-medium'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Thermometer className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>Thermal Window (Optimum)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setConditionTrigger('peak_season')}
                  className={`p-2 rounded-lg border text-left transition-colors flex items-center gap-2 ${
                    conditionTrigger === 'peak_season'
                      ? 'bg-emerald-50 border-emerald-800 text-emerald-950 font-medium'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                  <span>Peak Calendar Month</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Field Notes / Foraging Microhabitat (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Inspect the north-facing mossy beech slope after the first autumn storm"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                maxLength={250}
                className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-800"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-xs font-medium text-white bg-emerald-900 hover:bg-emerald-950 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Saving...' : 'Add Harvest Alert'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Existing Alerts List */}
        <div>
          <h4 className="text-sm font-serif font-semibold text-stone-900 mb-2">
            Active Configured Alerts ({alerts.length})
          </h4>
          {alerts.length === 0 ? (
            <p className="text-xs text-stone-500 p-3 bg-stone-100 rounded-lg">
              No alerts active. Configure one above to receive reminders.
            </p>
          ) : (
            <div className="space-y-2">
              {alerts.map(a => (
                <div
                  key={a.id}
                  className="p-3 bg-white rounded-lg border border-stone-200 flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="text-xs font-semibold text-stone-900">
                      {a.speciesName} <span className="font-normal italic text-stone-500">({a.scientificName})</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-stone-600 mt-1">
                      <span>Month: {MONTH_NAMES[a.targetMonth - 1]}</span>
                      <span aria-hidden="true">·</span>
                      <span>Trigger: {a.conditionTrigger.replace('_', ' ')}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-stone-500">{a.regionCode}</span>
                    </div>
                    {a.notes && (
                      <p className="text-xs text-stone-700 italic mt-1">
                        "{a.notes}"
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => onDeleteAlert(a.id)}
                    className="p-1.5 text-stone-400 hover:text-red-700 rounded transition-colors"
                    title="Delete Alert"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
