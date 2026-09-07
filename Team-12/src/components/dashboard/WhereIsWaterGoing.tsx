import React from 'react';
import { ArrowRight, Waves, Shirt, Trees, Utensils } from 'lucide-react';

interface WhereIsWaterGoingProps {
  onViewDetails?: () => void;
  className?: string;
}

interface CategoryItem {
  id: string;
  name: string;
  percent: number;
  litres: number;
  icon: React.ReactNode;
  color: string;
  ringColor: string;
  bgLight: string;
}

export const WhereIsWaterGoing: React.FC<WhereIsWaterGoingProps> = ({
  onViewDetails,
  className = '',
}) => {
  const categories: CategoryItem[] = [
    {
      id: 'bathing',
      name: 'Bathing',
      percent: 35,
      litres: 149,
      icon: <Waves className="w-5 h-5 text-sky-600" />,
      color: '#0284c7',
      ringColor: 'stroke-sky-500',
      bgLight: 'bg-sky-50/80 hover:bg-sky-100/70 border-sky-100',
    },
    {
      id: 'laundry',
      name: 'Laundry',
      percent: 25,
      litres: 107,
      icon: <Shirt className="w-5 h-5 text-teal-600" />,
      color: '#0d9488',
      ringColor: 'stroke-teal-500',
      bgLight: 'bg-teal-50/80 hover:bg-teal-100/70 border-teal-100',
    },
    {
      id: 'gardening',
      name: 'Gardening',
      percent: 22,
      litres: 94,
      icon: <Trees className="w-5 h-5 text-emerald-600" />,
      color: '#059669',
      ringColor: 'stroke-emerald-500',
      bgLight: 'bg-emerald-50/80 hover:bg-emerald-100/70 border-emerald-100',
    },
    {
      id: 'kitchen',
      name: 'Kitchen',
      percent: 18,
      litres: 78,
      icon: <Utensils className="w-5 h-5 text-cyan-600" />,
      color: '#0891b2',
      ringColor: 'stroke-cyan-500',
      bgLight: 'bg-cyan-50/80 hover:bg-cyan-100/70 border-cyan-100',
    },
  ];

  return (
    <div
      id="card-where-water-going"
      className={`glass-card rounded-2xl p-5 md:p-6 shadow-sm border border-sky-100 flex flex-col justify-between transition-all duration-300 hover:shadow-md ${className}`}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100">
            Breakdown
          </span>
          <h2 className="text-xl font-bold text-sky-950 mt-1">Where is your water going?</h2>
        </div>
        {onViewDetails && (
          <button
            onClick={onViewDetails}
            className="text-xs font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1 group transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        )}
      </div>

      {/* 2x2 Grid with ripple animation & percentage rings */}
      <div className="grid grid-cols-2 gap-3.5 my-auto">
        {categories.map((cat) => {
          const circumference = 2 * Math.PI * 18;
          const strokeDashoffset = circumference - (cat.percent / 100) * circumference;

          return (
            <div
              key={cat.id}
              className={`relative rounded-xl p-3.5 border transition-all duration-300 group cursor-pointer ${cat.bgLight} overflow-hidden`}
            >
              {/* Ripple wave accent in background on hover */}
              <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-white/40 pointer-events-none transition-transform duration-500 group-hover:scale-150 group-hover:opacity-80" />

              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-white shadow-xs border border-white/80 shrink-0">
                  {cat.icon}
                </div>

                {/* Animated Percentage Ring */}
                <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 44 44">
                    <circle
                      cx="22"
                      cy="22"
                      r="18"
                      className="stroke-slate-200 fill-none"
                      strokeWidth="3.5"
                    />
                    <circle
                      cx="22"
                      cy="22"
                      r="18"
                      className={`fill-none transition-all duration-1000 ${cat.ringColor}`}
                      strokeWidth="3.5"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-[11px] font-bold text-slate-700">
                    {cat.percent}%
                  </span>
                </div>
              </div>

              <div className="relative z-10">
                <span className="text-xs font-semibold text-slate-600 block">{cat.name}</span>
                <span className="text-lg font-extrabold text-sky-950 block tracking-tight">
                  {cat.litres}{' '}
                  <span className="text-xs font-semibold text-slate-500">L</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-sky-100 text-xs text-slate-500 flex items-center justify-between">
        <span>Based on today's logged activities</span>
        <span className="font-semibold text-cyan-700">Total: 428 L</span>
      </div>
    </div>
  );
};
