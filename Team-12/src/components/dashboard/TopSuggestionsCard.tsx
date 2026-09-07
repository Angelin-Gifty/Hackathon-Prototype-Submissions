import React from 'react';
import { ArrowRight, Lightbulb, Sparkles } from 'lucide-react';
import { WaterSuggestion } from '../../types';

interface TopSuggestionsCardProps {
  suggestions: WaterSuggestion[];
  onViewAll?: () => void;
  className?: string;
}

export const TopSuggestionsCard: React.FC<TopSuggestionsCardProps> = ({
  suggestions,
  onViewAll,
  className = '',
}) => {
  // Top 3 suggestions
  const top3 = suggestions.slice(0, 3);

  const colors = [
    { bg: 'bg-emerald-500 text-white', ring: 'border-emerald-100', savingBg: 'bg-emerald-50 text-emerald-800' },
    { bg: 'bg-cyan-600 text-white', ring: 'border-cyan-100', savingBg: 'bg-cyan-50 text-cyan-800' },
    { bg: 'bg-sky-600 text-white', ring: 'border-sky-100', savingBg: 'bg-sky-50 text-sky-800' },
  ];

  return (
    <div
      id="card-top-suggestions"
      className={`glass-card rounded-2xl p-5 md:p-6 shadow-sm border border-sky-100 flex flex-col justify-between transition-all duration-300 hover:shadow-md ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-100">
              <Lightbulb className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              AI Recommendations
            </span>
          </div>
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="text-xs font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1 group transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          )}
        </div>

        <h2 className="text-xl font-bold text-sky-950">Top 3 Suggestions for You</h2>
        <p className="text-xs font-medium text-slate-500 mt-0.5 mb-4">
          Ranked by highest potential water savings
        </p>

        {/* Numbered Suggestions List */}
        <div className="space-y-3">
          {top3.map((sugg, index) => {
            const style = colors[index % colors.length];
            return (
              <div
                key={sugg.id || index}
                className="p-3.5 rounded-xl bg-slate-50/70 hover:bg-sky-50/60 border border-slate-200/60 transition-all duration-200 flex items-start gap-3 group"
              >
                {/* Numbered Colored Circle */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ${style.bg}`}
                >
                  {index + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-sky-950 leading-snug group-hover:text-cyan-900">
                    {sugg.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">
                    {sugg.recommendedAction}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 ${style.savingBg}`}
                    >
                      <Sparkles className="w-3 h-3" />
                      Save ~{sugg.potentialSavingDaily} L/day
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      ({sugg.potentialSavingWeekly} L/wk)
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-sky-100 flex items-center justify-between text-xs text-slate-500">
        <span>Personalized to your household usage</span>
        <span className="font-semibold text-emerald-700">~65 L/day total opportunity</span>
      </div>
    </div>
  );
};
