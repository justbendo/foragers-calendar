import React from 'react';
import {
  X,
  AlertTriangle,
  ExternalLink,
  ShieldAlert,
  Bookmark,
  BookmarkCheck,
  CheckCircle,
  HelpCircle,
  BookOpen,
  Leaf,
  Scale
} from 'lucide-react';
import { SpeciesRecord } from '../types/forager.ts';

interface SpeciesDetailModalProps {
  species: SpeciesRecord | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (speciesId: string) => void;
}

export const SpeciesDetailModal: React.FC<SpeciesDetailModalProps> = ({
  species,
  onClose,
  isSaved,
  onToggleSave
}) => {
  if (!species) return null;

  const hasDangerousLookalike = species.lookalikes.some(l => l.dangerous);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#FBF9F5] rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-300">
        
        {/* Sticky Header with Title and Close Button */}
        <div className="sticky top-0 z-10 bg-[#FBF9F5]/95 backdrop-blur-sm border-b border-stone-200 px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest font-mono text-stone-500">
              Botanical Herbarium Accession · {species.id.toUpperCase()}
            </div>
            <h2 className="text-2xl font-serif font-medium text-stone-900 mt-0.5">
              {species.commonName}
            </h2>
            <div className="text-sm italic font-serif text-stone-600">
              {species.scientificName}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(species.id)}
              className="p-2 text-stone-700 hover:text-stone-900 bg-white border border-stone-300 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 text-xs font-medium"
              title={isSaved ? 'In your Watchlist' : 'Add to Watchlist'}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="w-4 h-4 text-emerald-800" />
                  <span className="hidden sm:inline">Saved</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span className="hidden sm:inline">Save</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-900 bg-white border border-stone-300 rounded-lg shadow-2xs transition-colors"
              aria-label="Close profile"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Top Section: Media Presentation & Core Accession Attributes */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Visual Media with Caption and Attribution */}
            <div className="md:col-span-7 space-y-2">
              <div className="relative rounded-xl overflow-hidden border border-stone-300 bg-stone-100 aspect-4/3 shadow-sm">
                <img
                  src={species.imageUrl}
                  alt={species.imageAlt}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
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
              </div>
              <p className="text-[11px] font-serif italic text-stone-500">
                Fig. 1 — {species.imageAlt}
              </p>
              <p className="text-[10px] text-stone-400">
                Attribution: {species.imageAttribution}
              </p>
            </div>

            {/* Curatorial Definition List */}
            <div className="md:col-span-5 space-y-4">
              <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-3">
                <div className="border-b border-stone-100 pb-2">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono">
                    Kingdom & Classification
                  </span>
                  <span className="text-sm font-medium text-stone-800">
                    {species.kingdom} ({species.family})
                  </span>
                </div>

                <div className="border-b border-stone-100 pb-2">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono">
                    Edibility Grade
                  </span>
                  <span className={`text-sm font-semibold ${
                    species.edibility.includes('Choice')
                      ? 'text-emerald-900'
                      : species.edibility.includes('Toxic')
                      ? 'text-red-700'
                      : 'text-stone-800'
                  }`}>
                    {species.edibility}
                  </span>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    {species.edibilityNotes}
                  </p>
                </div>

                <div className="border-b border-stone-100 pb-2">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono">
                    Conservation Status
                  </span>
                  <span className="text-xs font-medium text-stone-700">
                    {species.conservationStatus}
                  </span>
                </div>

                <div className="border-b border-stone-100 pb-2">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono">
                    Elevation Range
                  </span>
                  <span className="text-xs font-mono text-stone-700">
                    {species.elevationRange}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono">
                    Primary Habitats
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1 text-xs text-stone-700">
                    {species.habitats.join(' · ')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Critical Lookalikes & Distinction Matrix */}
          {species.lookalikes.length > 0 && (
            <div className={`p-5 rounded-xl border ${
              hasDangerousLookalike
                ? 'bg-amber-50/70 border-amber-200'
                : 'bg-stone-50 border-stone-200'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className={`w-5 h-5 ${hasDangerousLookalike ? 'text-amber-800' : 'text-stone-700'}`} />
                <h3 className="text-base font-serif font-medium text-stone-900">
                  Critical Lookalike Identification & Distinctions
                </h3>
              </div>
              <p className="text-xs text-stone-700 mb-4 leading-relaxed">
                Before considering harvesting, systematically verify every anatomical difference between the target specimen and these potential lookalikes. Never guess based on a single image.
              </p>

              <div className="space-y-3">
                {species.lookalikes.map((lookalike, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-lg border border-stone-200 shadow-2xs">
                    <div className="flex items-baseline justify-between gap-2 flex-wrap">
                      <div className="font-serif font-semibold text-stone-900 text-sm">
                        {lookalike.name} <span className="italic font-normal text-stone-500">({lookalike.scientificName})</span>
                      </div>
                      {lookalike.dangerous ? (
                        <span className="text-xs font-bold text-red-800 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                          Danger: {lookalike.dangerLevel || 'Toxic'}
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                          Non-Toxic Lookalike
                        </span>
                      )}
                    </div>
                    <div className="mt-2 text-xs text-stone-800 leading-relaxed">
                      <strong className="text-stone-950">How to Distinguish:</strong> {lookalike.distinction}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Morphological Identification Characteristics */}
          <div>
            <h3 className="text-lg font-serif font-medium text-stone-900 mb-3 flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-800" />
              Morphological Field Characteristics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(species.identificationFeatures).map(([key, val]) => {
                if (!val) return null;
                const formattedKey = key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, str => str.toUpperCase());
                return (
                  <div key={key} className="p-3.5 bg-white rounded-xl border border-stone-200 shadow-2xs">
                    <span className="text-[11px] uppercase tracking-wider font-mono text-stone-500 block mb-1">
                      {formattedKey}
                    </span>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      {val}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preparation & Toxicological Guidance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-500 block mb-1">
                Culinary Preparation & Cooking Requirements
              </span>
              <p className="text-xs text-stone-700 leading-relaxed">
                {species.culinaryPrep}
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-500 block mb-1">
                Known Toxicological Risks & Cautions
              </span>
              <p className="text-xs text-stone-700 leading-relaxed">
                {species.knownRisks}
              </p>
            </div>
          </div>

          {/* Ethical Harvesting Method & 1/3 Rule */}
          <div className="p-4 bg-stone-100 rounded-xl border border-stone-200 flex items-start gap-3">
            <Scale className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
            <div className="text-xs text-stone-700 space-y-1">
              <span className="font-semibold text-stone-900 block">
                Ethical Harvesting Protocol
              </span>
              <p>{species.harvestMethod}</p>
              <p className="text-stone-500 text-[11px]">
                Always follow the One-Third Rule: never take more than one-third of any patch to guarantee mycelial health and ecological sustenance for local wildlife.
              </p>
            </div>
          </div>

          {/* Citations & Reputable Scientific Sources */}
          <div>
            <h3 className="text-sm font-serif font-medium text-stone-900 mb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-stone-600" />
              Scientific References & Herbarium Citations
            </h3>
            <div className="space-y-2">
              {species.sources.map((src, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white rounded-lg border border-stone-200 text-xs text-stone-600 flex items-center justify-between gap-3"
                >
                  <div>
                    <span className="font-semibold text-stone-800">{src.title}</span>
                    <span className="mx-1.5" aria-hidden="true">·</span>
                    <span>{src.author} ({src.year})</span>
                    <span className="mx-1.5" aria-hidden="true">·</span>
                    <span className="text-stone-500">{src.publisher}</span>
                    {src.peerReviewed && (
                      <span className="ml-2 text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                        Peer-Reviewed
                      </span>
                    )}
                  </div>
                  {src.url && (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-700 hover:text-stone-950 flex items-center gap-1 shrink-0 font-medium"
                    >
                      <span>Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 z-10 bg-[#FBF9F5]/95 backdrop-blur-sm border-t border-stone-200 px-6 py-3 flex items-center justify-between text-xs text-stone-500">
          <span>The Foragers Calendar · Phenology & Botanical Education</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors"
          >
            Close Profile
          </button>
        </div>

      </div>
    </div>
  );
};
