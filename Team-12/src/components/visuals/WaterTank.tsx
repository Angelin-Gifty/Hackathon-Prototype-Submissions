import React from 'react';
import { Droplet, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

interface WaterTankProps {
  usedLitres: number;
  targetLitres: number;
  dateStr?: string;
  className?: string;
}

export const WaterTank: React.FC<WaterTankProps> = ({
  usedLitres,
  targetLitres,
  dateStr = 'Today',
  className = '',
}) => {
  const difference = usedLitres - targetLitres;
  const isOver = difference > 0;
  // Percentage of target (cap visual representation nicely between 15% and 96%)
  const rawPercent = Math.round((usedLitres / (targetLitres || 400)) * 100);
  const fillPercentage = Math.min(Math.max(rawPercent, 20), 95);

  return (
    <div
      id="card-today-water-tank"
      className={`glass-card rounded-2xl p-5 md:p-6 shadow-sm border border-sky-100 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-md ${className}`}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-100">
            Realtime Monitor
          </span>
          <h2 className="text-xl font-bold text-sky-950 mt-1">Today's Water Usage</h2>
        </div>
        <div className="text-right">
          <span className="text-xs font-medium text-slate-500">{dateStr}</span>
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-700 justify-end">
            <span>Target:</span>
            <span className="text-sky-800">{targetLitres} L</span>
          </div>
        </div>
      </div>

      {/* Main Tank & Stats Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center my-2">
        {/* Tank Illustration (Col 5) */}
        <div className="sm:col-span-5 flex flex-col items-center justify-center">
          {/* Tank Outer Shell */}
          <div className="relative w-36 h-48 md:w-40 md:h-52 rounded-2xl bg-gradient-to-b from-slate-100/80 to-sky-100/50 p-1.5 shadow-inner border-2 border-sky-200/80">
            {/* Top Cap */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-2 rounded-t-md bg-sky-300/80 border-t border-sky-400/50" />
            
            {/* Tank Glass Viewport */}
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-sky-50/40 backdrop-blur-sm flex flex-col justify-end border border-white/60">
              
              {/* Measurement Ticks on Left Side */}
              <div className="absolute left-1.5 inset-y-3 flex flex-col justify-between z-20 pointer-events-none text-[8px] font-mono text-slate-400">
                <span className="border-b border-slate-300 w-2.5"></span>
                <span className="border-b border-slate-300 w-2"></span>
                <span className="border-b border-cyan-500 w-3 font-semibold text-cyan-600">Goal</span>
                <span className="border-b border-slate-300 w-2"></span>
                <span className="border-b border-slate-300 w-2.5"></span>
              </div>

              {/* Water Volume Body */}
              <div
                className="relative w-full transition-all duration-1000 ease-out"
                style={{ height: `${fillPercentage}%` }}
              >
                {/* Surface Wave Svg */}
                <div className="absolute -top-3 left-0 right-0 h-4 overflow-hidden z-10">
                  <svg
                    viewBox="0 0 500 50"
                    preserveAspectRatio="none"
                    className="w-[200%] h-full animate-wave fill-cyan-400/85"
                  >
                    <path d="M0,25 C150,50 350,0 500,25 L500,50 L0,50 Z" />
                  </svg>
                  <svg
                    viewBox="0 0 500 50"
                    preserveAspectRatio="none"
                    className="w-[200%] h-full animate-wave-slow fill-sky-500/60 absolute top-0 left-0"
                  >
                    <path d="M0,20 C150,0 350,45 500,20 L500,50 L0,50 Z" />
                  </svg>
                </div>

                {/* Body of water gradient */}
                <div className="w-full h-full bg-gradient-to-b from-cyan-400 via-sky-500 to-blue-600 relative overflow-hidden">
                  {/* Floating Bubbles */}
                  <div
                    className="absolute w-2 h-2 rounded-full bg-white/70 animate-[floatBubble_3.2s_infinite_linear]"
                    style={{ left: '25%', bottom: '5%' }}
                  />
                  <div
                    className="absolute w-1.5 h-1.5 rounded-full bg-white/60 animate-[floatBubble_4.5s_infinite_linear_1s]"
                    style={{ left: '65%', bottom: '15%' }}
                  />
                  <div
                    className="absolute w-2.5 h-2.5 rounded-full bg-white/50 animate-[floatBubble_5s_infinite_linear_2s]"
                    style={{ left: '45%', bottom: '2%' }}
                  />

                  {/* Vertical Light Flare on Left */}
                  <div className="absolute inset-y-0 left-2 w-2 bg-gradient-to-r from-white/35 to-transparent blur-[1px]" />
                </div>
              </div>

              {/* Glass Front Reflection Curved Bar */}
              <div className="absolute inset-y-2 right-2 w-3 bg-gradient-to-l from-white/40 to-transparent rounded-r-lg pointer-events-none" />
            </div>

            {/* Target Line Indicator */}
            <div 
              className="absolute left-0 right-0 border-t-2 border-dashed border-amber-400/80 z-20 pointer-events-none"
              style={{ bottom: '70%' }}
              title="Daily Target"
            />
          </div>

          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500 font-medium">
            <Droplet className="w-3.5 h-3.5 text-cyan-600" />
            <span>Water level: {fillPercentage}%</span>
          </div>
        </div>

        {/* Stats Content (Col 7) */}
        <div className="sm:col-span-7 flex flex-col justify-center space-y-3">
          {/* Big number used today */}
          <div>
            <span className="text-4xl sm:text-5xl font-extrabold text-sky-950 tracking-tight">
              {usedLitres}{' '}
              <span className="text-2xl font-bold text-slate-500 font-sans">L</span>
            </span>
            <p className="text-sm font-medium text-slate-500 mt-0.5">used today</p>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2">
            {isOver ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>+{Math.abs(difference)} L more than your target</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{Math.abs(difference)} L under your daily target!</span>
              </div>
            )}
          </div>

          {/* Target comparison summary bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold text-slate-600">
              <span>Goal Progress</span>
              <span>{Math.min(rawPercent, 100)}% of {targetLitres} L</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  isOver ? 'bg-gradient-to-r from-cyan-400 to-amber-500' : 'bg-gradient-to-r from-cyan-400 to-emerald-500'
                }`}
                style={{ width: `${Math.min(rawPercent, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Motivational Bottom Banner */}
      <div className="mt-3 pt-3 border-t border-sky-100/80 flex items-center justify-between text-xs text-sky-900/80">
        <p className="italic font-medium">
          "A small change today can make a big difference tomorrow!"
        </p>
        <span className="text-cyan-600 font-semibold hidden md:inline-flex items-center gap-1">
          Household Active 🌿
        </span>
      </div>
    </div>
  );
};
