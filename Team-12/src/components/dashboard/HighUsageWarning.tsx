import React from 'react';
import { AlertTriangle, Lightbulb, ArrowUpRight, Sparkles } from 'lucide-react';

interface HighUsageWarningProps {
  activityName?: string;
  consumedLitres?: number;
  reason?: string;
  recommendedAction?: string;
  estimatedSaving?: string;
  onActionClick?: () => void;
  className?: string;
}

export const HighUsageWarning: React.FC<HighUsageWarningProps> = ({
  activityName = 'Gardening',
  consumedLitres = 94,
  reason = 'which is higher than your usual average.',
  recommendedAction = 'Water plants during cooler hours (before 8 AM or after sunset).',
  estimatedSaving = '20–30 L/day',
  onActionClick,
  className = '',
}) => {
  return (
    <div
      id="card-high-usage-warning"
      className={`rounded-2xl p-5 md:p-6 shadow-sm border border-amber-200/90 bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-sky-50/60 flex flex-col justify-between transition-all duration-300 hover:shadow-md ${className}`}
    >
      <div>
        {/* Header with warm warning badge */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800 border border-amber-200/70">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Smart Opportunity
            </span>
          </div>
          <span className="text-xs font-semibold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-200">
            Detected Today
          </span>
        </div>

        <h2 className="text-lg font-bold text-slate-900">High Usage Detected</h2>

        {/* Insight text */}
        <p className="text-sm text-slate-700 mt-2 leading-relaxed">
          <strong className="font-semibold text-amber-950">{activityName}</strong> consumed{' '}
          <strong className="text-sky-900 font-bold">{consumedLitres} L</strong> today, {reason}
        </p>

        {/* Highlighted recommendation card */}
        <div className="mt-4 p-3.5 rounded-xl bg-white/90 border border-amber-200/60 shadow-xs">
          <div className="flex items-start gap-2.5">
            <div className="p-1 rounded-md bg-amber-100/60 text-amber-700 shrink-0 mt-0.5">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase text-amber-800 tracking-wide block">
                Recommended Action:
              </span>
              <p className="text-xs font-medium text-slate-800 mt-0.5 leading-snug">
                {recommendedAction}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Saving Potential Footer */}
      <div className="mt-4 pt-3 border-t border-amber-200/70 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Estimated saving: {estimatedSaving}</span>
        </div>
        {onActionClick && (
          <button
            onClick={onActionClick}
            className="text-xs font-semibold text-sky-800 hover:text-sky-950 flex items-center gap-0.5 group"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        )}
      </div>
    </div>
  );
};
