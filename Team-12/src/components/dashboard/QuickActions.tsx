import React from 'react';
import { PlusCircle, GitCompare, Lightbulb, FileText, ArrowRight } from 'lucide-react';

interface QuickActionsProps {
  onNavigate: (tab: string) => void;
  className?: string;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onNavigate, className = '' }) => {
  const actions = [
    {
      id: 'add-usage',
      label: "Add Today's Usage",
      sublabel: 'Log activity or daily total',
      icon: <PlusCircle className="w-5 h-5 text-cyan-600" />,
      target: 'add-usage',
      bgClass: 'bg-cyan-50/70 hover:bg-cyan-100/70 border-cyan-100',
    },
    {
      id: 'compare',
      label: 'Compare Options',
      sublabel: 'Shower vs Bucket & more',
      icon: <GitCompare className="w-5 h-5 text-teal-600" />,
      target: 'compare',
      bgClass: 'bg-teal-50/70 hover:bg-teal-100/70 border-teal-100',
    },
    {
      id: 'suggestions',
      label: 'Get Suggestions',
      sublabel: 'Personalized saving tips',
      icon: <Lightbulb className="w-5 h-5 text-amber-600" />,
      target: 'suggestions',
      bgClass: 'bg-amber-50/70 hover:bg-amber-100/70 border-amber-100',
    },
    {
      id: 'receipt',
      label: 'View Reports',
      sublabel: 'Digital water receipt',
      icon: <FileText className="w-5 h-5 text-sky-600" />,
      target: 'receipt',
      bgClass: 'bg-sky-50/70 hover:bg-sky-100/70 border-sky-100',
    },
  ];

  return (
    <div
      id="card-quick-actions"
      className={`glass-card rounded-2xl p-5 md:p-6 shadow-sm border border-sky-100 flex flex-col justify-between transition-all duration-300 hover:shadow-md ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-100">
            Shortcuts
          </span>
          <h2 className="text-xl font-bold text-sky-950 mt-1">Quick Actions</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((act) => (
          <button
            key={act.id}
            onClick={() => onNavigate(act.target)}
            className={`p-3.5 rounded-xl border text-left transition-all duration-300 group flex flex-col justify-between cursor-pointer ${act.bgClass}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-white shadow-2xs border border-white/80">
                {act.icon}
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
            </div>
            <div>
              <span className="text-sm font-bold text-sky-950 block leading-tight group-hover:text-cyan-800">
                {act.label}
              </span>
              <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                {act.sublabel}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
