import React from 'react';
import { X, Sliders, Droplets, Thermometer, RotateCcw, Sparkles, CheckCircle2 } from 'lucide-react';

interface ClimateSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  simRain: number;
  setSimRain: (rain: number) => void;
  simTemp: number;
  setSimTemp: (temp: number) => void;
  onReset: () => void;
  isSimulating: boolean;
}

export const ClimateSimulatorModal: React.FC<ClimateSimulatorModalProps> = ({
  isOpen,
  onClose,
  simRain,
  setSimRain,
  simTemp,
  setSimTemp,
  onReset,
  isSimulating
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#FBF9F5] rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-stone-300 space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 text-emerald-900 rounded-lg">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-medium text-stone-900">
                Interactive Microclimate Simulator
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Model how local weather swings trigger or suppress fungal flushes and plant shoots.
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

        {/* Sliders */}
        <div className="space-y-6">
          {/* Temperature Slider */}
          <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="temp-slider" className="font-semibold text-stone-800 flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-amber-700" />
                <span>Ambient Mean Temperature</span>
              </label>
              <span className="font-mono font-bold text-sm text-stone-900 tabular-nums">
                {simTemp.toFixed(1)}°C ({Math.round(simTemp * 1.8 + 32)}°F)
              </span>
            </div>
            <input
              id="temp-slider"
              type="range"
              min="-5"
              max="35"
              step="0.5"
              value={simTemp}
              onChange={(e) => setSimTemp(parseFloat(e.target.value))}
              className="w-full accent-emerald-800 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-mono">
              <span>-5°C (Frost Dormancy)</span>
              <span>15°C (Fungi Optimum)</span>
              <span>35°C (Heat Scorch)</span>
            </div>
          </div>

          {/* Rainfall Slider */}
          <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="rain-slider" className="font-semibold text-stone-800 flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-sky-700" />
                <span>Recent 7-Day Cumulative Rainfall</span>
              </label>
              <span className="font-mono font-bold text-sm text-stone-900 tabular-nums">
                {simRain.toFixed(1)} mm
              </span>
            </div>
            <input
              id="rain-slider"
              type="range"
              min="0"
              max="70"
              step="1"
              value={simRain}
              onChange={(e) => setSimRain(parseFloat(e.target.value))}
              className="w-full accent-emerald-800 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-mono">
              <span>0mm (Severe Drought)</span>
              <span>25mm (Mushroom Flush Trigger)</span>
              <span>70mm (Saturated Soil)</span>
            </div>
          </div>
        </div>

        {/* Scientific Mechanics Explainer */}
        <div className="p-4 bg-stone-100 rounded-xl text-xs text-stone-700 space-y-2">
          <span className="font-semibold text-stone-900 block font-serif">
            Dynamic Phenological Principles
          </span>
          <div className="space-y-1.5 text-stone-600">
            <p>
              • <strong>Fungi (Mycelial Flush):</strong> Mushrooms require a minimum moisture accumulation (typically ≥25mm over 7–10 days) paired with moderate temperatures (10°C–20°C) to induce fruiting primordia (pins).
            </p>
            <p>
              • <strong>Plants (Spring Shoots):</strong> Wild alliums and greens require sustained temperatures &gt;5°C. Unseasonal frost stalls photosynthesis and causes leaf wilting.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onReset}
            className="text-xs font-medium text-stone-600 hover:text-stone-900 flex items-center gap-1 underline underline-offset-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Real-World Baseline</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-medium text-white bg-emerald-900 hover:bg-emerald-950 rounded-lg transition-colors shadow-2xs"
          >
            Apply & View Forecast
          </button>
        </div>

      </div>
    </div>
  );
};
