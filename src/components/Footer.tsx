import React from 'react';
import { ShieldCheck, Heart, Compass, BookOpen } from 'lucide-react';

interface FooterProps {
  onOpenSafety: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSafety }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand & Mission Statement */}
          <div className="md:col-span-5 space-y-3">
            <h3 className="text-xl font-serif font-medium text-white tracking-tight">
              The Foragers Calendar
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              An educational phenological companion designed to foster ecological literacy, plant identification rigor, and ethical, sustainable relationships with wild landscapes.
            </p>
            <div className="text-[11px] text-stone-500 pt-2">
              All species accounts cross-referenced with Kew Gardens, British Mycological Society, and USDA Forest Service datasets.
            </div>
          </div>

          {/* Legal & Educational Notice */}
          <div className="md:col-span-4 space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-stone-400">
              Field Advisory
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              This application does not provide medical, toxicological, or definitive in-field identification advice. Never ingest any wild plant or mushroom without 100% physical confirmation from a qualified local expert.
            </p>
            <button
              onClick={onOpenSafety}
              className="text-xs text-emerald-400 hover:text-emerald-300 underline underline-offset-2 flex items-center gap-1 mt-1 font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Read the Forager's Code & Safety Rules</span>
            </button>
          </div>

          {/* Reputable Herbarium & Mycological Links */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-stone-400">
              Trusted Resources
            </div>
            <ul className="text-xs text-stone-400 space-y-1.5">
              <li>
                <a
                  href="https://www.kew.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-stone-200 transition-colors"
                >
                  Royal Botanic Gardens Kew
                </a>
              </li>
              <li>
                <a
                  href="https://www.britmycolsoc.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-stone-200 transition-colors"
                >
                  British Mycological Society
                </a>
              </li>
              <li>
                <a
                  href="https://namyco.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-stone-200 transition-colors"
                >
                  North American Mycological Association
                </a>
              </li>
              <li>
                <a
                  href="https://www.woodlandtrust.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-stone-200 transition-colors"
                >
                  The Woodland Trust
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span>© 2026 The Foragers Calendar</span>
            <span aria-hidden="true">·</span>
            <span>Open Scientific Phenology Initiative</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Privacy-First (No GPS Tracking)</span>
            <span aria-hidden="true">·</span>
            <span>Leave No Trace</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
