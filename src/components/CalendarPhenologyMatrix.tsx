import React from 'react';
import { Calendar as CalendarIcon, CheckCircle2, Info } from 'lucide-react';
import { SpeciesSeasonalMatch } from '../types/forager.ts';

interface CalendarPhenologyMatrixProps {
  matches: SpeciesSeasonalMatch[];
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
  onSelectSpecies: (speciesId: string) => void;
}

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export const CalendarPhenologyMatrix: React.FC<CalendarPhenologyMatrixProps> = ({
  matches,
  selectedMonth,
  setSelectedMonth,
  onSelectSpecies
}) => {
  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
      {/* Calendar Header with Legend */}
      <div className="p-4 sm:p-5 border-b border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-emerald-800" />
            <h2 className="text-lg font-serif font-medium text-stone-900">
              12-Month Phenological Matrix
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Historical emergence & harvest windows across temperate habitats. Click any month column to inspect seasonal forecasts.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs text-stone-600 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200 shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-xs bg-emerald-800" />
            <span>Peak Flush / Prime Shoot</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-xs bg-emerald-300" />
            <span>Emergent / Active Window</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-xs bg-stone-100 border border-stone-200" />
            <span>Dormant / Off-Season</span>
          </div>
        </div>
      </div>

      {/* Responsive Matrix Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200 text-xs text-stone-500 font-medium">
              <th className="py-3 px-4 w-72">Species & Classification</th>
              {MONTH_NAMES.map((m, idx) => {
                const monthNum = idx + 1;
                const isCurrent = selectedMonth === monthNum;
                return (
                  <th
                    key={m}
                    onClick={() => setSelectedMonth(monthNum)}
                    className={`py-3 px-1 text-center font-mono cursor-pointer transition-colors ${
                      isCurrent
                        ? 'bg-emerald-950 text-white font-bold'
                        : 'hover:bg-stone-100 text-stone-700'
                    }`}
                    title={`Set observation to ${m}`}
                  >
                    <span>{m}</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-xs">
            {matches.map(({ species, activeMonths, peakMonths }) => {
              return (
                <tr key={species.id} className="hover:bg-stone-50/80 transition-colors">
                  {/* Species Name Column */}
                  <td className="py-3 px-4">
                    <button
                      onClick={() => onSelectSpecies(species.id)}
                      className="text-left group flex items-center gap-2.5"
                    >
                      <img
                        src={species.imageUrl}
                        alt=""
                        className="w-8 h-8 rounded-md object-cover border border-stone-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="font-serif font-medium text-stone-900 group-hover:text-emerald-900 transition-colors">
                          {species.commonName}
                        </div>
                        <div className="text-[11px] italic font-serif text-stone-500">
                          {species.scientificName}
                        </div>
                      </div>
                    </button>
                  </td>

                  {/* 12 Month Cells */}
                  {MONTH_NAMES.map((_, idx) => {
                    const monthNum = idx + 1;
                    const isPeak = peakMonths.includes(monthNum);
                    const isActive = activeMonths.includes(monthNum);
                    const isColSelected = selectedMonth === monthNum;

                    let cellBg = '';
                    if (isPeak) {
                      cellBg = 'bg-emerald-800 text-white';
                    } else if (isActive) {
                      cellBg = 'bg-emerald-200 text-emerald-950';
                    } else {
                      cellBg = 'bg-transparent text-stone-300';
                    }

                    return (
                      <td
                        key={idx}
                        onClick={() => setSelectedMonth(monthNum)}
                        className={`p-1 text-center cursor-pointer border-l border-stone-100 ${
                          isColSelected ? 'bg-stone-100/60 ring-1 ring-inset ring-stone-300' : ''
                        }`}
                      >
                        <div
                          className={`w-full py-1.5 rounded-xs font-mono text-[10px] transition-transform hover:scale-105 ${cellBg}`}
                        >
                          {isPeak ? 'PEAK' : isActive ? '●' : '·'}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-stone-50 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-stone-400" />
          <span>Phenological windows vary based on altitude, slope aspect, and annual weather patterns.</span>
        </div>
        <span className="font-mono text-[11px]">Active Month: Month {selectedMonth} ({MONTH_NAMES[selectedMonth - 1]})</span>
      </div>
    </div>
  );
};
