import React from 'react';
import { Bookmark, BookmarkCheck, AlertTriangle, ArrowRight, Check, Droplets, Thermometer } from 'lucide-react';
import { SpeciesSeasonalMatch } from '../types/forager.ts';

interface SeasonalCardProps {
  match: SpeciesSeasonalMatch;
  isSaved: boolean;
  onToggleSave: (speciesId: string) => void;
  onSelect: (speciesId: string) => void;
}

const MONTH_ABBR = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

export const SeasonalCard: React.FC<SeasonalCardProps> = ({
  match,
  isSaved,
  onToggleSave,
  onSelect
}) => {
  const { species, status, confidenceScore, isCurrentlyPeak, activeMonths, peakMonths, rationale } = match;

  // Status visual cues with unboxed styling
  let statusColor = 'text-stone-600 bg-stone-100 border-stone-200';
  let statusText = 'Seasonal Estimate';
  if (status === 'likely in season') {
    statusColor = 'text-emerald-900 bg-emerald-50 border-emerald-200';
    statusText = 'Likely in Season';
  } else if (status === 'possibly in season') {
    statusColor = 'text-amber-900 bg-amber-50 border-amber-200';
    statusText = 'Possibly in Season';
  } else if (status === 'off season') {
    statusColor = 'text-stone-500 bg-stone-100/60 border-stone-200';
    statusText = 'Off Season';
  }

  const hasDangerousLookalikes = species.lookalikes.some(l => l.dangerous);

  return (
    <article className="group bg-white rounded-xl border border-stone-200 hover:border-stone-300 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden">
      {/* Specimen Media Slot with fallback styling */}
      <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
        <img
          src={species.imageUrl}
          alt={species.imageAlt}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            if (species.edibility === 'Toxic Warning') {
              target.src = '/src/assets/images/species_fly_agaric_warning_1792523201940.jpg';
            } else if (species.kingdom === 'Fungi') {
              target.src = '/src/assets/images/species_chanterelle_1792523200563.jpg';
            } else if (species.category === 'Berries' || species.category === 'Tree Fruit/Nuts') {
              target.src = '/src/assets/images/hero_botanical_foraging_1792523199522.jpg';
            } else {
              target.src = '/src/assets/images/species_wild_garlic_1792523201566.jpg';
            }
          }}
        />
        
        {/* Top Floating Controls */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <div className={`px-2.5 py-1 text-xs font-medium border rounded-md shadow-2xs backdrop-blur-xs pointer-events-auto ${statusColor}`}>
            <span>{statusText}</span>
            {isCurrentlyPeak && <span className="ml-1 text-[11px] font-bold">· Peak</span>}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(species.id);
            }}
            className="p-1.5 rounded-md bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950 border border-stone-200 shadow-2xs transition-colors pointer-events-auto"
            title={isSaved ? 'Remove from Watchlist' : 'Save to Watchlist'}
            aria-label={isSaved ? 'Remove from Watchlist' : 'Save to Watchlist'}
          >
            {isSaved ? (
              <BookmarkCheck className="w-4 h-4 text-emerald-800" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Botanical Kingdom Tag */}
        <div className="absolute bottom-2 left-3 text-[11px] font-medium text-white drop-shadow-md">
          <span>{species.kingdom}</span>
          <span className="mx-1" aria-hidden="true">·</span>
          <span>{species.family}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Header Title with Scientific Nomenclature */}
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-lg font-serif font-medium text-stone-900 group-hover:text-emerald-950 transition-colors">
              {species.commonName}
            </h3>
            <span className="text-xs font-mono font-medium text-stone-500 tabular-nums">
              {confidenceScore}%
            </span>
          </div>
          <p className="text-xs italic font-serif text-stone-500 mt-0.5">
            {species.scientificName}
          </p>

          {/* Unboxed Metadata Strip (Zero-Pill Compliance) */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-stone-500 mt-2">
            <span className="font-medium text-stone-700">{species.category}</span>
            <span aria-hidden="true">·</span>
            <span className={species.edibility.includes('Choice') ? 'text-emerald-800 font-medium' : species.edibility.includes('Toxic') ? 'text-red-700 font-medium' : 'text-stone-600'}>
              {species.edibility}
            </span>
            <span aria-hidden="true">·</span>
            <span>{species.elevationRange}</span>
          </div>

          {/* Key Distinguishing Feature Highlight */}
          <p className="mt-2.5 text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {species.distinguishingFeatures}
          </p>
        </div>

        {/* 12-Month Mini Phenology Bar */}
        <div className="pt-2 border-t border-stone-100">
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
            <span>Seasonal Window</span>
            <span className="font-mono text-[10px]">
              {species.seasonalRanges[0]?.startMonth}–{species.seasonalRanges[0]?.endMonth}
            </span>
          </div>
          <div className="grid grid-cols-12 gap-0.5 h-2 bg-stone-100 rounded-sm overflow-hidden p-0.5">
            {MONTH_ABBR.map((_, idx) => {
              const monthNum = idx + 1;
              const isPeak = peakMonths.includes(monthNum);
              const isActive = activeMonths.includes(monthNum);

              let bg = 'bg-stone-200/50';
              if (isPeak) bg = 'bg-emerald-800';
              else if (isActive) bg = 'bg-emerald-400';

              return (
                <div
                  key={idx}
                  className={`h-full rounded-2xs ${bg}`}
                  title={`Month ${monthNum}: ${isPeak ? 'Historical Peak' : isActive ? 'Active Window' : 'Off-season'}`}
                />
              );
            })}
          </div>
        </div>

        {/* Lookalike Warning Strip if applicable */}
        {hasDangerousLookalikes && (
          <div className="p-2 bg-amber-50/70 border border-amber-200/60 rounded-md flex items-start gap-2 text-xs text-amber-900">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
            <span className="text-[11px] leading-tight">
              Has toxic lookalikes ({species.lookalikes.filter(l => l.dangerous).length} documented). Never consume without expert confirmation.
            </span>
          </div>
        )}

        {/* Botanical Profile CTA */}
        <button
          onClick={() => onSelect(species.id)}
          className="w-full mt-1 py-2 px-3 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
        >
          <span>Examine Botanical Profile</span>
          <ArrowRight className="w-3.5 h-3.5 text-stone-500 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </article>
  );
};
