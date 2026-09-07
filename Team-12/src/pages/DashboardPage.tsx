import React from 'react';
import { WaterTank } from '../components/visuals/WaterTank';
import { WhereIsWaterGoing } from '../components/dashboard/WhereIsWaterGoing';
import { WaterSavingGoal } from '../components/dashboard/WaterSavingGoal';
import { HighUsageWarning } from '../components/dashboard/HighUsageWarning';
import { UsageTrendChart } from '../components/dashboard/UsageTrendChart';
import { QuickActions } from '../components/dashboard/QuickActions';
import { WeeklyImpactCard } from '../components/dashboard/WeeklyImpactCard';
import { WaterSavingScore } from '../components/dashboard/WaterSavingScore';
import { TopSuggestionsCard } from '../components/dashboard/TopSuggestionsCard';
import { useWaterData } from '../context/WaterDataContext';
import { analyzeWaterUsage } from '../lib/waterIntelligence';

interface DashboardPageProps {
  onNavigate: (tab: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { household, members, activityLogs, dailyLogs } = useWaterData();

  // Run water intelligence analysis
  const analysis = analyzeWaterUsage(household, members, activityLogs, dailyLogs);

  // Today's total usage: default to 428 or today's logs
  const todayUsed = analysis.todayUsageLitres > 0 ? analysis.todayUsageLitres : 428;
  const targetLitres = analysis.dailyTargetLitres;

  return (
    <div id="dashboard-page-container" className="space-y-6 pb-12">
      {/* Top Banner / Welcome context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-sky-950 tracking-tight">
            Household Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {household.name} • {household.memberCount} Residents • Benchmark {targetLitres} L/day
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('add-usage')}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span>+ Add Today's Usage</span>
          </button>
        </div>
      </div>

      {/* Row 1: Water Tank + Where is water going */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <WaterTank
            usedLitres={todayUsed}
            targetLitres={targetLitres}
            dateStr="Today"
            className="h-full"
          />
        </div>
        <div className="lg:col-span-5">
          <WhereIsWaterGoing
            onViewDetails={() => onNavigate('analytics')}
            className="h-full"
          />
        </div>
      </div>

      {/* Row 2: Water Saving Goal + High Usage Warning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WaterSavingGoal
          goalLitres={50}
          savedLitres={28}
          className="h-full"
        />
        <HighUsageWarning
          activityName="Gardening"
          consumedLitres={94}
          reason="which is higher than your usual average."
          recommendedAction="Water plants during cooler hours (early morning or after sunset)."
          estimatedSaving="20–30 L/day"
          onActionClick={() => onNavigate('suggestions')}
          className="h-full"
        />
      </div>

      {/* Row 3: Usage Trend Chart + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <UsageTrendChart
            dailyLogs={dailyLogs}
            targetLitres={targetLitres}
            className="h-full"
          />
        </div>
        <div className="lg:col-span-5">
          <QuickActions
            onNavigate={onNavigate}
            className="h-full"
          />
        </div>
      </div>

      {/* Row 4: Weekly Impact + Water Saving Score + Top Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WeeklyImpactCard
          savedLitres={210}
          className="h-full"
        />
        <WaterSavingScore
          score={78}
          className="h-full"
        />
        <TopSuggestionsCard
          suggestions={analysis.suggestions}
          onViewAll={() => onNavigate('suggestions')}
          className="h-full md:col-span-2 lg:col-span-1"
        />
      </div>
    </div>
  );
};
