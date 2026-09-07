import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  ReferenceLine 
} from 'recharts';
import { TrendingUp, Calendar, Droplets } from 'lucide-react';
import { DailyUsageLog } from '../../types';

interface UsageTrendChartProps {
  dailyLogs: DailyUsageLog[];
  targetLitres?: number;
  className?: string;
}

export const UsageTrendChart: React.FC<UsageTrendChartProps> = ({
  dailyLogs,
  targetLitres = 400,
  className = '',
}) => {
  const [range, setRange] = useState<'7' | '30'>('7');

  // Filter logs according to range
  const daysToShow = range === '7' ? 7 : 30;
  const recentLogs = dailyLogs.slice(-daysToShow);

  // Format data for chart
  const data = recentLogs.map((log) => {
    const parts = log.date.split('-');
    const day = parts[2] ? parseInt(parts[2], 10) : 1;
    const month = parts[1] ? new Date(2026, parseInt(parts[1], 10) - 1, 1).toLocaleString('default', { month: 'short' }) : 'Sep';
    return {
      date: `${day} ${month}`,
      rawDate: log.date,
      litres: log.totalLitres,
      target: targetLitres,
    };
  });

  const latestValue = data.length > 0 ? data[data.length - 1].litres : 428;
  const prevValue = data.length > 1 ? data[data.length - 2].litres : 330;
  const diff = latestValue - prevValue;

  return (
    <div
      id="card-usage-trend"
      className={`glass-card rounded-2xl p-5 md:p-6 shadow-sm border border-sky-100 flex flex-col justify-between transition-all duration-300 hover:shadow-md ${className}`}
    >
      {/* Header with period toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-sky-50 text-sky-600 border border-sky-100">
              <TrendingUp className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">
              Consumption Trend
            </span>
          </div>
          <h2 className="text-xl font-bold text-sky-950 mt-1">Your Usage Trend</h2>
        </div>

        {/* Dropdown / Toggle */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200/80 text-xs font-semibold text-slate-600">
          <button
            onClick={() => setRange('7')}
            className={`px-3 py-1 rounded-lg transition-all ${
              range === '7'
                ? 'bg-white text-sky-950 shadow-xs font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setRange('30')}
            className={`px-3 py-1 rounded-lg transition-all ${
              range === '30'
                ? 'bg-white text-sky-950 shadow-xs font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            Last 30 Days
          </button>
        </div>
      </div>

      {/* Prominent Stat Bar */}
      <div className="flex items-baseline justify-between mb-3 px-1">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-sky-950 tracking-tight">
            {latestValue} L
          </span>
          <span className="text-xs font-medium text-slate-500">recorded today</span>
        </div>
        <div className="text-xs font-semibold text-slate-600 flex items-center gap-1">
          <span>Target baseline:</span>
          <span className="text-sky-800 font-bold">{targetLitres} L</span>
        </div>
      </div>

      {/* Chart Area */}
      <div className="w-full h-52 sm:h-56 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="waterFlowGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#0284c7" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
              domain={[150, 500]}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="p-2.5 rounded-xl bg-white shadow-md border border-sky-100 text-xs">
                      <p className="font-bold text-slate-700">{label}</p>
                      <p className="text-sky-900 font-extrabold text-sm mt-0.5">
                        {payload[0].value} Litres
                      </p>
                      <p className="text-[10px] text-slate-400">Target: {targetLitres} L</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine
              y={targetLitres}
              stroke="#f59e0b"
              strokeDasharray="4 4"
              strokeWidth={1.5}
            />
            <Area
              type="monotone"
              dataKey="litres"
              stroke="#0284c7"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#waterFlowGradient)"
              activeDot={{ r: 6, stroke: '#0284c7', strokeWidth: 2, fill: '#ffffff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 px-1">
        <span className="flex items-center gap-1">
          <span className="w-2 h-0.5 bg-amber-500 inline-block" /> Target (400 L)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-0.5 bg-sky-600 inline-block" /> Actual consumption
        </span>
      </div>
    </div>
  );
};
