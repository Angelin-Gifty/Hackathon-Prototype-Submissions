import React from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  CheckCircle2, 
  Droplet, 
  Sparkles, 
  Share2,
  ShieldCheck
} from 'lucide-react';
import { useWaterData } from '../context/WaterDataContext';

export const ReceiptPage: React.FC = () => {
  const { household } = useWaterData();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="receipt-page-container" className="space-y-6 pb-12 max-w-3xl mx-auto">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-sky-950 tracking-tight">
            Digital Water Receipt
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Verified household consumption & conservation audit statement
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>

      {/* Styled Paper Receipt Container */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-sky-100 relative overflow-hidden font-sans">
        {/* Top Water Ribbon Accent */}
        <div className="absolute top-0 inset-x-0 h-2.5 bg-gradient-to-r from-cyan-400 via-sky-500 to-teal-500" />

        {/* Receipt Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b border-slate-200 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-sm">
                <Droplet className="w-4 h-4 fill-white" />
              </div>
              <span className="text-xl font-extrabold text-sky-950 tracking-tight">
                Aqua<span className="text-cyan-600">Sense</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Household Water Conservation Analyzer</p>
            <p className="text-xs font-mono text-slate-500 mt-0.5">Receipt #AQS-2026-0907-884</p>
          </div>

          <div className="text-left sm:text-right text-xs">
            <span className="text-slate-400 block">Statement Issued For:</span>
            <span className="font-bold text-sky-950 block text-sm">{household.name}</span>
            <span className="text-slate-500 block">4 Household Residents</span>
            <span className="text-slate-400 block mt-1 font-mono">Date: 07 Sep 2026</span>
          </div>
        </div>

        {/* Key Metrics Banner */}
        <div className="my-6 p-4 rounded-2xl bg-sky-50/60 border border-sky-100 grid grid-cols-3 gap-2 text-center">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 block">Recorded Today</span>
            <span className="text-xl sm:text-2xl font-extrabold text-sky-950 block">428 L</span>
          </div>
          <div className="border-x border-sky-200/60">
            <span className="text-[11px] font-semibold text-slate-500 block">Target Baseline</span>
            <span className="text-xl sm:text-2xl font-extrabold text-cyan-800 block">400 L</span>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 block">7-Day Savings</span>
            <span className="text-xl sm:text-2xl font-extrabold text-emerald-600 block">210 L</span>
          </div>
        </div>

        {/* Detailed Itemized Table */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Itemized Consumption Breakdown (07 Sep 2026)
          </h2>

          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold text-left">
                <th className="pb-2">Activity Category</th>
                <th className="pb-2 text-center">Share</th>
                <th className="pb-2 text-right">Volume</th>
                <th className="pb-2 text-right">Estimated Cost*</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              <tr>
                <td className="py-2.5">
                  <span className="font-bold text-sky-950 block">Bathing & Showers</span>
                  <span className="text-[10px] text-slate-400">Showers (85L) + Bucket (34L) + Basin (30L)</span>
                </td>
                <td className="py-2.5 text-center font-bold text-sky-800">35%</td>
                <td className="py-2.5 text-right font-bold text-sky-950">149 L</td>
                <td className="py-2.5 text-right font-mono">$0.45</td>
              </tr>
              <tr>
                <td className="py-2.5">
                  <span className="font-bold text-sky-950 block">Fabric & Laundry Wash</span>
                  <span className="text-[10px] text-slate-400">Automatic washing machine cycle</span>
                </td>
                <td className="py-2.5 text-center font-bold text-teal-800">25%</td>
                <td className="py-2.5 text-right font-bold text-sky-950">107 L</td>
                <td className="py-2.5 text-right font-mono">$0.32</td>
              </tr>
              <tr>
                <td className="py-2.5">
                  <span className="font-bold text-sky-950 block">Gardening & Balcony Care</span>
                  <span className="text-[10px] text-slate-400">Hose & plant hydration</span>
                </td>
                <td className="py-2.5 text-center font-bold text-emerald-800">22%</td>
                <td className="py-2.5 text-right font-bold text-sky-950">94 L</td>
                <td className="py-2.5 text-right font-mono">$0.28</td>
              </tr>
              <tr>
                <td className="py-2.5">
                  <span className="font-bold text-sky-950 block">Kitchen, Dishwash & RO</span>
                  <span className="text-[10px] text-slate-400">Cookware sink wash + drinking water</span>
                </td>
                <td className="py-2.5 text-center font-bold text-cyan-800">18%</td>
                <td className="py-2.5 text-right font-bold text-sky-950">78 L</td>
                <td className="py-2.5 text-right font-mono">$0.23</td>
              </tr>
            </tbody>
          </table>

          {/* Calculations & Eco Rebate */}
          <div className="pt-4 border-t border-slate-200 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Gross Tariff Base (428 L @ $0.003/L):</span>
              <span className="font-mono text-slate-700">$1.28</span>
            </div>
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                AquaSense Eco Conservation Credit (210 L saved weekly):
              </span>
              <span className="font-mono">-$0.63</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-extrabold text-sky-950">
              <span>Net Conservation Balance:</span>
              <span className="font-mono text-cyan-800">$0.65 / day</span>
            </div>
          </div>
        </div>

        {/* Verification Footer & Simulated Barcode */}
        <div className="mt-8 pt-6 border-t border-dashed border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-900 block">
                Verified Sustainable Household
              </span>
              <span className="text-[11px] text-slate-400">
                Meets municipal 135 L/person water efficiency standard.
              </span>
            </div>
          </div>

          {/* Barcode representation */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-0.5 h-8">
              {[2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 2, 3, 1, 4, 2, 1].map((w, i) => (
                <div
                  key={i}
                  className="h-full bg-slate-800"
                  style={{ width: `${w * 1.5}px` }}
                />
              ))}
            </div>
            <span className="text-[9px] font-mono text-slate-400 mt-1">AQS-VERIFIED-2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};
