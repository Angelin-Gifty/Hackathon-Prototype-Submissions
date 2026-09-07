import React, { useState } from 'react';
import { 
  GitCompare, 
  Droplet, 
  Waves, 
  ArrowRight, 
  Sparkles, 
  Check, 
  TrendingDown,
  Scale
} from 'lucide-react';

interface ComparisonOption {
  id: string;
  title: string;
  methodA: { name: string; litres: number; description: string };
  methodB: { name: string; litres: number; description: string };
  savings: number;
  recommendation: string;
}

const COMPARISONS: ComparisonOption[] = [
  {
    id: 'bath',
    title: 'Overhead Shower vs. Bucket Bath',
    methodA: { name: '10-Min Shower', litres: 85, description: 'Continuous overhead flow at ~8.5 L/min' },
    methodB: { name: 'Bucket Bath', litres: 34, description: 'Single standard 18–20 L bucket with mug' },
    savings: 51,
    recommendation: 'Switching to bucket baths just 3 days a week saves ~600 L/month per person.',
  },
  {
    id: 'dishes',
    title: 'Running Tap Dishwashing vs. Soaked Basin',
    methodA: { name: 'Running Tap Sink', litres: 65, description: 'Water continuously flowing while scrubbing' },
    methodB: { name: 'Basin / Tub Wash', litres: 22, description: 'Soak & scrub in filled basin, rinse together' },
    savings: 43,
    recommendation: 'Using a two-basin system cuts kitchen water consumption by more than 60%.',
  },
  {
    id: 'garden',
    title: 'Garden Hose vs. Targeted Watering Can',
    methodA: { name: '15-Min Hose Pipe', litres: 110, description: 'High pressure spray with runoff and evaporation' },
    methodB: { name: 'Watering Can (Cool Hours)', litres: 30, description: 'Targeted root hydration in the morning' },
    savings: 80,
    recommendation: 'Direct soil watering stops evaporative loss and keeps roots healthier.',
  },
  {
    id: 'ro',
    title: 'RO Reject Water: Discard vs. Household Reuse',
    methodA: { name: 'Drain to Sewer', litres: 40, description: '3 litres wasted for every 1 litre purified' },
    methodB: { name: 'Catch in Bucket for Floor & Plants', litres: 0, description: 'Reclaimed for floor mopping, flushing, & foliage' },
    savings: 40,
    recommendation: 'RO reject water has high TDS, making it ideal for mopping floors and washing driveways.',
  },
];

export const ComparePage: React.FC = () => {
  const [selectedComp, setSelectedComp] = useState<ComparisonOption>(COMPARISONS[0]);
  const [bathsPerWeek, setBathsPerWeek] = useState<number>(4);

  const weeklyFamilySavings = bathsPerWeek * selectedComp.savings * 4; // 4 family members

  return (
    <div id="compare-page-container" className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-sky-950 tracking-tight">
          Compare Water Consumption Options
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Evaluate the direct impact of everyday alternative habits
        </p>
      </div>

      {/* Comparison Selector Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {COMPARISONS.map((comp) => {
          const isSelected = selectedComp.id === comp.id;
          return (
            <button
              key={comp.id}
              onClick={() => setSelectedComp(comp)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-sky-50 border-cyan-500 ring-2 ring-cyan-500/20 shadow-xs'
                  : 'bg-white border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              <div>
                <span className="text-xs font-bold text-slate-400 block mb-1">
                  Save ~{comp.savings} L
                </span>
                <span className="text-sm font-bold text-sky-950 leading-snug block">
                  {comp.title}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-cyan-700 mt-3 flex items-center gap-1">
                <span>View Comparison</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Side-by-Side Comparison Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100">
            Head-to-Head Analysis
          </span>
          <h2 className="text-2xl font-extrabold text-sky-950 mt-2">
            {selectedComp.title}
          </h2>
        </div>

        {/* Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Method A (Conventional / High Usage) */}
          <div className="rounded-2xl p-6 border border-rose-200/80 bg-gradient-to-b from-rose-50/50 to-white relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-100/70 px-2.5 py-1 rounded-full">
                Standard Habit
              </span>
              <span className="text-2xl font-extrabold text-rose-950">
                {selectedComp.methodA.litres} L
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">{selectedComp.methodA.name}</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {selectedComp.methodA.description}
            </p>

            {/* Visual Litre Bar */}
            <div className="mt-6 space-y-1">
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-rose-500"
                  style={{ width: '100%' }}
                />
              </div>
              <span className="text-[10px] text-slate-400 block text-right">Higher volume</span>
            </div>
          </div>

          {/* Method B (Eco-friendly / Conserving) */}
          <div className="rounded-2xl p-6 border border-emerald-200/90 bg-gradient-to-b from-emerald-50/60 to-white relative overflow-hidden shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-full flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                AquaSense Recommended
              </span>
              <span className="text-2xl font-extrabold text-emerald-700">
                {selectedComp.methodB.litres} L
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">{selectedComp.methodB.name}</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {selectedComp.methodB.description}
            </p>

            {/* Visual Litre Bar */}
            <div className="mt-6 space-y-1">
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{
                    width: `${Math.max(
                      10,
                      Math.round((selectedComp.methodB.litres / selectedComp.methodA.litres) * 100)
                    )}%`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-emerald-800 font-bold">
                <span>Save ~{selectedComp.savings} L per event</span>
                <span>
                  {Math.round(
                    ((selectedComp.methodA.litres - selectedComp.methodB.litres) /
                      selectedComp.methodA.litres) *
                      100
                  )}
                  % Reduction
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Insight Card */}
        <div className="p-4 rounded-xl bg-cyan-50/70 border border-cyan-100 text-xs text-sky-950 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Conservation Insight:</span>
            <p className="mt-0.5 leading-relaxed">{selectedComp.recommendation}</p>
          </div>
        </div>

        {/* Interactive Simulator */}
        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-base font-bold text-sky-950 mb-1">
            Household Impact Simulator for a 4-Person Family
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Adjust how many times per week your family chooses the recommended alternative:
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex-1 space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Frequency: {bathsPerWeek} times / week</span>
                <span className="text-cyan-700">Family of 4</span>
              </div>
              <input
                type="range"
                min={1}
                max={7}
                value={bathsPerWeek}
                onChange={(e) => setBathsPerWeek(Number(e.target.value))}
                className="w-full accent-cyan-600 cursor-pointer"
              />
            </div>

            <div className="text-left sm:text-right shrink-0">
              <span className="text-xs text-slate-400 font-medium block">Weekly Family Savings:</span>
              <span className="text-2xl font-extrabold text-emerald-700">
                {weeklyFamilySavings} Litres
              </span>
              <span className="text-[11px] text-slate-500 block">
                ≈ {Math.round(weeklyFamilySavings / 10)} full buckets of water!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
