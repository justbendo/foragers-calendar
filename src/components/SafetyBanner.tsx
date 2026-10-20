import React, { useState } from 'react';
import { AlertTriangle, ChevronRight, ShieldCheck, X } from 'lucide-react';

interface SafetyBannerProps {
  onLearnMore: () => void;
}

export const SafetyBanner: React.FC<SafetyBannerProps> = ({ onLearnMore }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return (
      <div className="bg-amber-100/70 border-b border-amber-200 py-1.5 px-4 text-center text-xs text-amber-900 flex items-center justify-center gap-2">
        <span className="font-medium">Educational Phenology Aid Only</span>
        <span aria-hidden="true">·</span>
        <span>Never consume wild species based solely on digital applications.</span>
        <button
          onClick={() => setIsDismissed(false)}
          className="underline hover:text-amber-950 font-medium ml-2"
        >
          View Safety Code
        </button>
      </div>
    );
  }

  return (
    <div className="bg-stone-900 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-500/10 border border-amber-400/30 rounded-lg text-amber-300 shrink-0 mt-0.5 sm:mt-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-stone-100">
                <span className="font-semibold text-amber-300">Mandatory Safety Advisory:</span> This platform is an educational phenology estimate, not an in-field identification tool or consumption guarantee.
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-stone-400">
                <span>Never eat based only on this app</span>
                <span aria-hidden="true">·</span>
                <span>Beware lethal lookalikes</span>
                <span aria-hidden="true">·</span>
                <span>Verify 100% with qualified local botanists/mycologists</span>
                <span aria-hidden="true">·</span>
                <span>Check regional conservation laws</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button
              onClick={onLearnMore}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-lg transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Safety Rules</span>
              <ChevronRight className="w-3 h-3 text-stone-400" />
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1.5 text-stone-400 hover:text-stone-200 rounded-lg transition-colors"
              aria-label="Minimize warning bar"
              title="Minimize"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
