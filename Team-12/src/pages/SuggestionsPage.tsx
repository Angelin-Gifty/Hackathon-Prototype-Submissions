import React, { useState } from 'react';
import { 
  Lightbulb, 
  Sparkles, 
  Check, 
  Filter, 
  TrendingDown, 
  Calculator, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useWaterData } from '../context/WaterDataContext';
import { analyzeWaterUsage } from '../lib/waterIntelligence';
import { WaterCategory, WaterSuggestion } from '../types';

export const SuggestionsPage: React.FC = () => {
  const { household, members, activityLogs, dailyLogs } = useWaterData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [implementedIds, setImplementedIds] = useState<Set<string>>(new Set());

  const analysis = analyzeWaterUsage(household, members, activityLogs, dailyLogs);

  const categories = ['all', 'Bathing', 'Gardening', 'Laundry', 'Kitchen'];

  const filteredSuggestions = analysis.suggestions.filter((s) => {
    if (selectedCategory === 'all') return true;
    return s.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const toggleImplemented = (id: string) => {
    setImplementedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Calculate cumulative potential savings of checked suggestions
  const implementedCount = implementedIds.size;
  const implementedSavingsDaily = analysis.suggestions
    .filter((s) => implementedIds.has(s.id))
    .reduce((acc, cur) => acc + cur.potentialSavingDaily, 0);

  return (
    <div id="suggestions-page-container" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-sky-950 tracking-tight">
            Personalized Water-Saving Suggestions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Ranked recommendations based on your household's actual consumption patterns
          </p>
        </div>

        {/* Savings achieved ticker */}
        <div className="flex items-center gap-2 p-2 px-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold self-start sm:self-auto">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{implementedCount} habits active (~{implementedSavingsDaily} L/day saved)</span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat === 'all' ? 'All Opportunities' : cat}
          </button>
        ))}
      </div>

      {/* Suggestions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSuggestions.map((sugg, index) => {
          const isImplemented = implementedIds.has(sugg.id);

          return (
            <div
              key={sugg.id}
              className={`glass-card rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                isImplemented
                  ? 'border-emerald-300 bg-emerald-50/40 shadow-xs'
                  : 'border-sky-100 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 flex items-center justify-center text-xs font-extrabold shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {sugg.category}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      sugg.difficulty === 'Easy'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    {sugg.difficulty} Habit
                  </span>
                </div>

                <h3 className="text-base font-bold text-sky-950 leading-snug">
                  {sugg.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {sugg.recommendedAction}
                </p>

                {/* Savings Pill */}
                <div className="mt-4 p-3 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block">
                      Estimated Savings:
                    </span>
                    <span className="text-sm font-extrabold text-emerald-700">
                      ~{sugg.potentialSavingDaily} Litres / day
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    (~{sugg.potentialSavingWeekly} L/week)
                  </span>
                </div>
              </div>

              {/* Action Toggle */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {isImplemented ? 'Currently Practicing' : 'Not yet practiced'}
                </span>

                <button
                  type="button"
                  onClick={() => toggleImplemented(sugg.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isImplemented
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white border border-slate-300 text-slate-700 hover:border-cyan-500 hover:text-cyan-700'
                  }`}
                >
                  {isImplemented ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Practicing</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Adopt Habit</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Annual Impact Calculator */}
      <div className="glass-card rounded-2xl p-6 border border-sky-100 bg-gradient-to-br from-cyan-50/60 via-white to-sky-50/40">
        <div className="flex items-center gap-2 mb-2">
          <Calculator className="w-5 h-5 text-cyan-700" />
          <h2 className="text-lg font-bold text-sky-950">Annual Household Impact Calculator</h2>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          By adopting the top 3 recommended habits (~65 L/day total reduction), see what your family saves in one year:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white border border-sky-100 shadow-2xs">
            <span className="text-xs text-slate-500">Annual Water Conserved</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-cyan-800 block mt-1">
              23,725 L
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">≈ 2,370 standard buckets</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-sky-100 shadow-2xs">
            <span className="text-xs text-slate-500">Utility Bill Savings</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 block mt-1">
              $180 – $320
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Direct water & heating reduction</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-sky-100 shadow-2xs">
            <span className="text-xs text-slate-500">Ecological Footprint</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-teal-700 block mt-1">
              -42 kg CO₂
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Municipal pumping emissions</span>
          </div>
        </div>
      </div>
    </div>
  );
};
