import React from 'react';
import { 
  Award, 
  Trophy, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Droplet, 
  Flame, 
  Lock,
  ArrowRight
} from 'lucide-react';
import { useWaterData } from '../context/WaterDataContext';

interface BadgeItem {
  id: string;
  name: string;
  description: string;
  isUnlocked: boolean;
  iconBg: string;
  icon: React.ReactNode;
}

export const ChallengesPage: React.FC = () => {
  const { challenges, toggleChallengeCompletion } = useWaterData();

  const badges: BadgeItem[] = [
    {
      id: 'b1',
      name: 'Water Saver',
      description: 'Saved over 200 Litres in a single 7-day period',
      isUnlocked: true,
      iconBg: 'bg-emerald-500 text-white',
      icon: <Droplet className="w-5 h-5 fill-white" />,
    },
    {
      id: 'b2',
      name: '7-Day Saver',
      description: 'Completed 7 consecutive days of bucket baths',
      isUnlocked: true,
      iconBg: 'bg-cyan-600 text-white',
      icon: <Award className="w-5 h-5" />,
    },
    {
      id: 'b3',
      name: 'Leak Watcher',
      description: 'Verified all household fixtures with zero drips',
      isUnlocked: true,
      iconBg: 'bg-teal-600 text-white',
      icon: <ShieldCheck className="w-5 h-5" />,
    },
    {
      id: 'b4',
      name: '1,000 L Saved',
      description: 'Cumulative household savings crossed 1,000 Litres',
      isUnlocked: false,
      iconBg: 'bg-slate-300 text-slate-500',
      icon: <Trophy className="w-5 h-5" />,
    },
    {
      id: 'b5',
      name: 'Eco Champion',
      description: 'Maintained benchmark efficiency for 30 consecutive days',
      isUnlocked: false,
      iconBg: 'bg-slate-300 text-slate-500',
      icon: <Sparkles className="w-5 h-5" />,
    },
  ];

  return (
    <div id="challenges-page-container" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-sky-950 tracking-tight">
            Challenges & Eco Badges
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Participate in household conservation challenges and earn sustainability badges
          </p>
        </div>

        {/* Level Rank Card */}
        <div className="flex items-center gap-3 p-3 px-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-sky-700 text-white shadow-md shadow-cyan-600/20">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center font-bold text-sm">
            <Trophy className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-200 block">
              Sustainability Rank
            </span>
            <span className="text-sm font-extrabold leading-tight block">
              Level 3: Water Guardian
            </span>
          </div>
        </div>
      </div>

      {/* Active Challenges List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-sky-950">Active Household Quests</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.map((ch) => {
            const pct = Math.min(100, Math.round((ch.currentSavingLitres / ch.targetSavingLitres) * 100));

            return (
              <div
                key={ch.id}
                className={`glass-card rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                  ch.isCompleted
                    ? 'border-emerald-200 bg-emerald-50/30'
                    : 'border-sky-100 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-100">
                      {ch.period}
                    </span>
                    <span
                      className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                        ch.isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-sky-100 text-sky-800'
                      }`}
                    >
                      {ch.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-sky-950">{ch.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {ch.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-4 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-600">
                      <span>Progress</span>
                      <span>
                        {ch.currentSavingLitres} / {ch.targetSavingLitres} L ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          ch.isCompleted ? 'bg-emerald-500' : 'bg-cyan-500'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Completion Toggle */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {ch.isCompleted ? 'Completed & Badge Earned' : 'In Progress'}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleChallengeCompletion(ch.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      ch.isCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-200'
                    }`}
                  >
                    {ch.isCompleted ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <span>Mark Complete</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges Showcase Grid */}
      <div className="glass-card rounded-2xl p-6 border border-sky-100 shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-bold text-sky-950">Badge Showcase</h2>
          <p className="text-xs text-slate-500">
            Show off your household's conservation accomplishments
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-between ${
                b.isUnlocked
                  ? 'bg-white border-sky-100 shadow-2xs hover:shadow-xs'
                  : 'bg-slate-50/70 border-slate-200/60 opacity-60'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 shadow-xs ${b.iconBg}`}
              >
                {b.icon}
              </div>

              <div>
                <span className="text-xs font-bold text-sky-950 block leading-tight">
                  {b.name}
                </span>
                <span className="text-[10px] text-slate-500 block mt-1 leading-snug">
                  {b.description}
                </span>
              </div>

              <div className="mt-3">
                {b.isUnlocked ? (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <Check className="w-2.5 h-2.5" /> Unlocked
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> Locked
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
