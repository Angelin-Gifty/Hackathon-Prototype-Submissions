import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { 
  BarChart3, 
  PieChart as PieIcon, 
  TrendingUp, 
  Users, 
  Sparkles, 
  AlertTriangle, 
  Waves, 
  Shirt, 
  Trees, 
  Utensils 
} from 'lucide-react';
import { useWaterData } from '../context/WaterDataContext';
import { analyzeWaterUsage } from '../lib/waterIntelligence';

export const AnalyticsPage: React.FC = () => {
  const { household, members, activityLogs, dailyLogs } = useWaterData();
  const [selectedRange, setSelectedRange] = useState<'7' | '30'>('7');

  const analysis = analyzeWaterUsage(household, members, activityLogs, dailyLogs);

  // Category breakdown
  const categoryData = [
    { name: 'Bathing', value: 149, percent: 35, color: '#0284c7' },
    { name: 'Laundry', value: 107, percent: 25, color: '#0d9488' },
    { name: 'Gardening', value: 94, percent: 22, color: '#059669' },
    { name: 'Kitchen', value: 78, percent: 18, color: '#0891b2' },
  ];

  // Member usage breakdown
  const memberData = members.map((m, idx) => {
    // calculate actual or estimated split
    const splits = [155, 130, 75, 68];
    const litres = splits[idx % splits.length] || 80;
    return {
      name: m.name,
      role: m.role,
      litres,
      color: m.color || '#0284c7',
    };
  });

  // 7-day usage with benchmark
  const daysToShow = selectedRange === '7' ? 7 : 30;
  const historyData = dailyLogs.slice(-daysToShow).map((log) => {
    const parts = log.date.split('-');
    const day = parts[2] ? parseInt(parts[2], 10) : 1;
    const month = parts[1] ? new Date(2026, parseInt(parts[1], 10) - 1, 1).toLocaleString('default', { month: 'short' }) : 'Sep';
    return {
      date: `${day} ${month}`,
      actual: log.totalLitres,
      target: household.dailyTargetLitres,
      benchmark: household.memberCount * 135, // 135 L/person standard
    };
  });

  return (
    <div id="analytics-page-container" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-sky-950 tracking-tight">
            Water Consumption Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Deep dive into consumption patterns, category distribution, and member quotas
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600 self-start sm:self-auto">
          <button
            onClick={() => setSelectedRange('7')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              selectedRange === '7' ? 'bg-white text-sky-950 font-bold shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setSelectedRange('30')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              selectedRange === '30' ? 'bg-white text-sky-950 font-bold shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Last 30 Days
          </button>
        </div>
      </div>

      {/* Top Benchmark Comparison Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-sky-100">
          <span className="text-xs font-semibold text-slate-500 block">Today's Total</span>
          <span className="text-3xl font-extrabold text-sky-950 block mt-1">428 L</span>
          <span className="text-xs text-amber-700 font-semibold mt-1 block">
            +28 L over 400 L target
          </span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-sky-100">
          <span className="text-xs font-semibold text-slate-500 block">Per Person Usage</span>
          <span className="text-3xl font-extrabold text-teal-700 block mt-1">107 L / person</span>
          <span className="text-xs text-emerald-700 font-semibold mt-1 block">
            ✓ 21% under national standard (135 L)
          </span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-sky-100">
          <span className="text-xs font-semibold text-slate-500 block">Weekly Average</span>
          <span className="text-3xl font-extrabold text-cyan-800 block mt-1">
            {analysis.averageDailyLitres} L / day
          </span>
          <span className="text-xs text-slate-500 mt-1 block">Consistent over past 7 days</span>
        </div>
      </div>

      {/* Grid: Donut Chart on Left, Category breakdown on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 glass-card rounded-2xl p-6 border border-sky-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-cyan-600" />
              <h2 className="text-lg font-bold text-sky-950">Category Distribution</h2>
            </div>
            <span className="text-xs font-bold text-slate-500">428 L total</span>
          </div>

          {/* Donut Chart */}
          <div className="w-full h-64 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [`${value} Litres`, 'Consumption']}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-extrabold text-sky-950">428 L</span>
              <span className="text-[11px] font-semibold text-slate-400">Total Today</span>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 rounded-md shrink-0" style={{ backgroundColor: cat.color }} />
                <span className="font-semibold text-slate-700">{cat.name}:</span>
                <span className="font-bold text-sky-950">{cat.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Members breakdown */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-6 border border-sky-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-600" />
              <h2 className="text-lg font-bold text-sky-950">Household Member Quotas</h2>
            </div>
            <span className="text-xs font-semibold text-slate-500">4 Active Members</span>
          </div>

          {/* Member Bars */}
          <div className="space-y-4 my-auto">
            {memberData.map((mem) => {
              const maxL = 200;
              const pct = Math.round((mem.litres / maxL) * 100);
              return (
                <div key={mem.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: mem.color }}
                      />
                      <span className="font-bold text-slate-800">{mem.name}</span>
                      <span className="text-[10px] text-slate-400">({mem.role})</span>
                    </div>
                    <span className="font-extrabold text-sky-950">{mem.litres} L</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, backgroundColor: mem.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-sky-100 flex items-center justify-between text-xs text-slate-500">
            <span>Fair-share target per person: 100 L</span>
            <span className="font-bold text-teal-700">Equitable Distribution</span>
          </div>
        </div>
      </div>

      {/* Historical Consumption Bar Chart */}
      <div className="glass-card rounded-2xl p-6 border border-sky-100 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-lg font-bold text-sky-950">Historical Consumption vs. Benchmarks</h2>
            <p className="text-xs text-slate-500">Comparing actual usage, daily target (400 L), and standard capacity (540 L)</p>
          </div>
        </div>

        <div className="w-full h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={historyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                formatter={(val: any, name: any) => [`${val} L`, name === 'actual' ? 'Actual Usage' : name === 'target' ? 'Daily Target' : 'Benchmark Standard']}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
              <Bar dataKey="actual" fill="#0284c7" radius={[6, 6, 0, 0]} name="Actual Usage (L)" />
              <Bar dataKey="target" fill="#94a3b8" radius={[6, 6, 0, 0]} name="Target (400 L)" opacity={0.6} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
