import React from 'react';
import { Gauge, ShieldCheck, Sparkles } from 'lucide-react';

interface WaterSavingScoreProps {
  score?: number;
  className?: string;
}

export const WaterSavingScore: React.FC<WaterSavingScoreProps> = ({
  score = 78,
  className = '',
}) => {
  // Circular progress calculation
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div
      id="card-saving-score"
      className={`glass-card rounded-2xl p-5 md:p-6 shadow-sm border border-sky-100 flex flex-col justify-between transition-all duration-300 hover:shadow-md ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-50 text-cyan-600 border border-cyan-100">
              <Gauge className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-700">
              Household Rating
            </span>
          </div>
          <span className="text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
            Smart Index
          </span>
        </div>

        <h2 className="text-xl font-bold text-sky-950">Water Saving Score</h2>

        {/* Large Circular Gauge */}
        <div className="my-4 flex items-center justify-center">
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Background Glow */}
            <div className="absolute inset-2 rounded-full bg-radial from-cyan-100/60 to-transparent blur-md -z-10" />

            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="scoreRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="60%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#0d9488" />
                </linearGradient>
              </defs>
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-slate-100 fill-none"
                strokeWidth="7"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="fill-none transition-all duration-1000 ease-out"
                stroke="url(#scoreRingGrad)"
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>

            {/* Score Center Label */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-sky-950 tracking-tight leading-none">
                {score}
              </span>
              <span className="text-xs font-bold text-slate-400 mt-0.5">/ 100</span>
            </div>
          </div>
        </div>

        {/* Status text */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1 text-sm font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            Good progress!
          </span>
          <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
            You're making good progress. Daily conservation habits improve your weekly efficiency score.
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-sky-100 flex items-center justify-center text-xs text-slate-400">
        <span>Evaluated from 7-day consistency & benchmarks</span>
      </div>
    </div>
  );
};
