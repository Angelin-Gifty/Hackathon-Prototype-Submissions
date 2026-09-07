import React from 'react';
import { Target, Sparkles } from 'lucide-react';

interface WaterSavingGoalProps {
  goalLitres?: number;
  savedLitres?: number;
  className?: string;
}

export const WaterSavingGoal: React.FC<WaterSavingGoalProps> = ({
  goalLitres = 50,
  savedLitres = 28,
  className = '',
}) => {
  const remaining = Math.max(0, goalLitres - savedLitres);
  const percent = Math.min(100, Math.round((savedLitres / goalLitres) * 100));

  // 10 droplets representation (each represents 5 Litres)
  const totalDroplets = 10;
  const litresPerDrop = goalLitres / totalDroplets;
  const filledDropletsCount = Math.round(savedLitres / litresPerDrop);

  return (
    <div
      id="card-water-saving-goal"
      className={`glass-card rounded-2xl p-5 md:p-6 shadow-sm border border-sky-100 flex flex-col justify-between transition-all duration-300 hover:shadow-md ${className}`}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600 border border-teal-100">
              <Target className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">
              Daily Challenge
            </span>
          </div>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
            {percent}% Achieved
          </span>
        </div>

        <h2 className="text-lg font-bold text-sky-950">Water Saving Goal</h2>
        <p className="text-sm font-semibold text-cyan-800 mt-0.5">
          Can you save {goalLitres} L today?
        </p>

        {/* Droplets row visual */}
        <div className="my-5 p-3.5 rounded-xl bg-gradient-to-r from-sky-50 via-cyan-50 to-teal-50/60 border border-sky-100">
          <div className="flex items-center justify-between gap-1.5">
            {Array.from({ length: totalDroplets }).map((_, i) => {
              const isFilled = i < filledDropletsCount;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center group transition-transform duration-300 hover:scale-125"
                  title={`${(i + 1) * litresPerDrop} L`}
                >
                  <svg
                    viewBox="0 0 24 30"
                    className={`w-5 h-6 transition-all duration-500 drop-shadow-xs ${
                      isFilled ? 'text-cyan-500 scale-105' : 'text-slate-200'
                    }`}
                    fill="currentColor"
                  >
                    <path d="M12 2 C12 2 3 13 3 19.5 C3 24.5 7 28.5 12 28.5 C17 28.5 21 24.5 21 19.5 C21 13 12 2 12 2 Z" />
                    {isFilled && (
                      <ellipse cx="9" cy="16" rx="2" ry="4" fill="#ffffff" fillOpacity="0.6" />
                    )}
                  </svg>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs mt-3 font-semibold">
            <span className="text-cyan-800 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-500 inline-block" />
              {savedLitres} L saved so far
            </span>
            <span className="text-slate-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-300 inline-block" />
              {remaining} L to go
            </span>
          </div>
        </div>

        {/* Continuous progress bar */}
        <div className="space-y-1">
          <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-teal-500 transition-all duration-700"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Positive Encouragement Footer with Happy Water Drop */}
      <div className="mt-4 pt-3 border-t border-sky-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Happy Water Droplet Mini Mascot */}
          <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 relative shrink-0">
            <svg viewBox="0 0 32 32" className="w-6 h-6 fill-cyan-500">
              <path d="M16 4 C16 4 7 15 7 21 C7 26 11 29 16 29 C21 29 25 26 25 21 C25 15 16 4 16 4 Z" />
              {/* Happy Eyes */}
              <circle cx="13" cy="20" r="1.2" fill="#0f172a" />
              <circle cx="19" cy="20" r="1.2" fill="#0f172a" />
              {/* Smile */}
              <path d="M13 23 Q 16 26 19 23" stroke="#0f172a" strokeWidth="1" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-sky-950 flex items-center gap-1">
              <span>You're doing great!</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </p>
            <p className="text-[11px] text-slate-500">Every drop conserved helps your goal.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
