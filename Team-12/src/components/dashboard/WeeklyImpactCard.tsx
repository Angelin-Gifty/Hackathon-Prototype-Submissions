import React from 'react';
import { Award, Sparkles, Sprout } from 'lucide-react';

interface WeeklyImpactCardProps {
  savedLitres?: number;
  className?: string;
}

export const WeeklyImpactCard: React.FC<WeeklyImpactCardProps> = ({
  savedLitres = 210,
  className = '',
}) => {
  const buckets = Math.round(savedLitres / 10);

  return (
    <div
      id="card-weekly-impact"
      className={`glass-card rounded-2xl p-5 md:p-6 shadow-sm border border-emerald-100/90 bg-gradient-to-br from-emerald-50/40 via-white to-sky-50/50 flex flex-col justify-between transition-all duration-300 hover:shadow-md ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-100/80 text-emerald-700 border border-emerald-200">
              <Award className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Sustainability Milestone
            </span>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
            <Sprout className="w-3 h-3" />
            Eco Impact
          </span>
        </div>

        <h2 className="text-xl font-bold text-sky-950">Weekly Impact</h2>

        <p className="text-sm font-medium text-slate-600 mt-2">
          In the past 7 days, you saved
        </p>

        {/* Big Impact Metric */}
        <div className="my-3 flex items-baseline gap-2">
          <span className="text-4xl sm:text-5xl font-extrabold text-emerald-600 tracking-tight">
            {savedLitres}
          </span>
          <span className="text-2xl font-bold text-emerald-700">L</span>
        </div>

        {/* Bucket Equivalent Visual */}
        <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-center gap-3">
          {/* Custom Bucket Icon */}
          <div className="w-10 h-10 rounded-xl bg-white shadow-2xs border border-emerald-200/80 flex items-center justify-center shrink-0 text-emerald-600">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="2">
              <path d="M19 9 L17 21 H7 L5 9 Z" />
              <path d="M5 9 Q12 7 19 9" />
              <path d="M7 9 C7 4 17 4 17 9" />
            </svg>
          </div>
          <div>
            <span className="text-base font-extrabold text-emerald-950 block">
              ≈ {buckets} buckets of water!
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Enough to nourish 40+ garden plants for a week.
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-emerald-100/80 flex items-center justify-between text-xs text-emerald-900 font-medium">
        <p className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Keep going! A greener tomorrow is possible.</span>
        </p>
      </div>
    </div>
  );
};
