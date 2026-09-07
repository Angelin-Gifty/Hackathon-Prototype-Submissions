import React, { useState } from 'react';
import { 
  PlusCircle, 
  Droplet, 
  Waves, 
  Shirt, 
  Trees, 
  Utensils, 
  Check, 
  Calendar, 
  User, 
  Clock, 
  Sparkles,
  Car,
  Trash2
} from 'lucide-react';
import { useWaterData } from '../context/WaterDataContext';
import { WaterCategory } from '../types';

interface PresetActivity {
  id: string;
  name: string;
  category: WaterCategory;
  defaultLitres: number;
  icon: React.ReactNode;
  hint: string;
}

const PRESET_ACTIVITIES: PresetActivity[] = [
  { id: 'shower_10', name: '10-Min Shower', category: 'Bathing', defaultLitres: 85, icon: <Waves className="w-5 h-5 text-sky-600" />, hint: '~8.5 L / min' },
  { id: 'bucket_bath', name: 'Bucket Bath', category: 'Bathing', defaultLitres: 34, icon: <Droplet className="w-5 h-5 text-cyan-600" />, hint: '1 standard bucket' },
  { id: 'laundry_cycle', name: 'Washing Machine', category: 'Laundry', defaultLitres: 60, icon: <Shirt className="w-5 h-5 text-teal-600" />, hint: 'Full load cycle' },
  { id: 'dishwashing', name: 'Kitchen Dishwash', category: 'Kitchen', defaultLitres: 45, icon: <Utensils className="w-5 h-5 text-blue-600" />, hint: 'Sink running tap' },
  { id: 'gardening_hose', name: 'Garden Hose (15m)', category: 'Gardening', defaultLitres: 90, icon: <Trees className="w-5 h-5 text-emerald-600" />, hint: 'Balcony & lawn' },
  { id: 'ro_purifier', name: 'RO Filter Dispense', category: 'Kitchen', defaultLitres: 25, icon: <Sparkles className="w-5 h-5 text-cyan-700" />, hint: 'Bottles & cooking' },
  { id: 'car_wash', name: 'Car Wash', category: 'Other', defaultLitres: 120, icon: <Car className="w-5 h-5 text-slate-600" />, hint: 'Exterior wash' },
];

export const AddUsagePage: React.FC = () => {
  const { members, activityLogs, addActivityLog, addDailyLog } = useWaterData();

  const [activeTab, setActiveTab] = useState<'activity' | 'meter'>('activity');
  const [selectedPreset, setSelectedPreset] = useState<PresetActivity | null>(PRESET_ACTIVITIES[0]);
  const [activityName, setActivityName] = useState(PRESET_ACTIVITIES[0].name);
  const [category, setCategory] = useState<WaterCategory>(PRESET_ACTIVITIES[0].category);
  const [litres, setLitres] = useState<number>(PRESET_ACTIVITIES[0].defaultLitres);
  const [selectedMemberId, setSelectedMemberId] = useState<string>(members[0]?.id || 'm1');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Daily meter state
  const [meterDate, setMeterDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [meterTotalLitres, setMeterTotalLitres] = useState<number>(400);
  const [meterNotes, setMeterNotes] = useState<string>('');

  const handleSelectPreset = (preset: PresetActivity) => {
    setSelectedPreset(preset);
    setActivityName(preset.name);
    setCategory(preset.category);
    setLitres(preset.defaultLitres);
  };

  const handleLogActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    const member = members.find((m) => m.id === selectedMemberId);

    await addActivityLog({
      activityId: selectedPreset ? selectedPreset.id : 'custom',
      activityName,
      category,
      litres: Number(litres),
      memberId: selectedMemberId,
      memberName: member?.name || 'Household Member',
      date,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      notes,
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
    setNotes('');
  };

  const handleLogMeter = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDailyLog(meterDate, Number(meterTotalLitres), meterNotes);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Recent logs
  const todayLogs = activityLogs.filter((l) => l.date === date);
  const todayTotal = todayLogs.reduce((acc, cur) => acc + cur.litres, 0);

  return (
    <div id="add-usage-page-container" className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-sky-950 tracking-tight">
            Record Water Usage
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Log specific household activities or daily water meter readings
          </p>
        </div>

        {/* Mode Toggle Switch */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'activity'
                ? 'bg-white text-sky-950 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            Activity Logging
          </button>
          <button
            onClick={() => setActiveTab('meter')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'meter'
                ? 'bg-white text-sky-950 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            Meter Reading
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Check className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Water usage successfully logged and calculated into your household balance!</span>
        </div>
      )}

      {/* Main Grid: Form on Left, Live Activities on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Column */}
        <div className="lg:col-span-7 space-y-6">
          {activeTab === 'activity' ? (
            <div className="glass-card rounded-2xl p-6 border border-sky-100 shadow-sm space-y-6">
              <div>
                <h2 className="text-lg font-bold text-sky-950">1. Select Common Activity</h2>
                <p className="text-xs text-slate-500">Pick a preset or customize the volume</p>

                {/* Preset Chips Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-3">
                  {PRESET_ACTIVITIES.map((preset) => {
                    const isSelected = selectedPreset?.id === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset)}
                        className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-sky-50 border-cyan-500 ring-2 ring-cyan-500/20 shadow-xs'
                            : 'bg-white/80 border-slate-200/80 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="p-1.5 rounded-lg bg-slate-50">{preset.icon}</div>
                          <span className="text-xs font-bold text-sky-900">
                            {preset.defaultLitres} L
                          </span>
                        </div>
                        <span className="text-xs font-bold text-slate-800 leading-tight">
                          {preset.name}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5">{preset.hint}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Details */}
              <form onSubmit={handleLogActivity} className="space-y-4 pt-4 border-t border-slate-100">
                <h2 className="text-lg font-bold text-sky-950">2. Activity Details</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Activity Name
                    </label>
                    <input
                      type="text"
                      required
                      value={activityName}
                      onChange={(e) => setActivityName(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as WaterCategory)}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white"
                    >
                      <option value="Bathing">Bathing</option>
                      <option value="Laundry">Laundry</option>
                      <option value="Gardening">Gardening</option>
                      <option value="Kitchen">Kitchen</option>
                      <option value="Drinking">Drinking</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Water Used (Litres)
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={1000}
                      value={litres}
                      onChange={(e) => setLitres(Number(e.target.value))}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 font-bold text-sky-900 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Household Member
                    </label>
                    <select
                      value={selectedMemberId}
                      onChange={(e) => setSelectedMemberId(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white"
                    >
                      {members.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.role})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Quick shower, washed double bedding..."
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm transition-all shadow-md shadow-cyan-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Log Activity ({litres} L)</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-6 border border-sky-100 shadow-sm space-y-6">
              <div>
                <h2 className="text-lg font-bold text-sky-950">Daily Total / Meter Reading</h2>
                <p className="text-xs text-slate-500">
                  If you read your main water meter or utility bill, enter the daily total here.
                </p>
              </div>

              <form onSubmit={handleLogMeter} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={meterDate}
                      onChange={(e) => setMeterDate(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Total Consumption (Litres)
                    </label>
                    <input
                      type="number"
                      required
                      min={10}
                      max={5000}
                      value={meterTotalLitres}
                      onChange={(e) => setMeterTotalLitres(Number(e.target.value))}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 font-bold text-sky-900 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Meter Reference / Notes
                  </label>
                  <input
                    type="text"
                    value={meterNotes}
                    onChange={(e) => setMeterNotes(e.target.value)}
                    placeholder="e.g. Submeter reading, weekend guests..."
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm transition-all shadow-md shadow-teal-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Update Daily Log ({meterTotalLitres} L)</span>
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Right Column: Today's Logged Items Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-2xl p-5 md:p-6 border border-sky-100 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-sky-100">
              <div>
                <span className="text-xs font-bold uppercase text-cyan-700">Today's Registry</span>
                <h3 className="text-lg font-bold text-sky-950">Logged Activities</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Total Recorded</span>
                <p className="text-xl font-extrabold text-sky-950">{todayTotal} L</p>
              </div>
            </div>

            {/* List */}
            <div className="divide-y divide-slate-100 max-h-[460px] overflow-y-auto mt-2">
              {todayLogs.length === 0 ? (
                <div className="py-8 text-center text-slate-400">
                  <Droplet className="w-8 h-8 mx-auto text-sky-200 mb-2" />
                  <p className="text-xs font-medium">No individual activities logged for {date}.</p>
                  <p className="text-[11px] mt-1 text-slate-400">
                    Use the form on the left to add activities.
                  </p>
                </div>
              ) : (
                todayLogs.map((log) => (
                  <div key={log.id} className="py-3 flex items-center justify-between gap-2">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-sky-50 text-cyan-600 flex items-center justify-center shrink-0 border border-sky-100">
                        <Droplet className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-sky-950 truncate">
                          {log.activityName}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {log.memberName} • {log.category}
                        </p>
                        {log.notes && (
                          <p className="text-[10px] text-slate-400 italic truncate">"{log.notes}"</p>
                        )}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-sky-900 block">{log.litres} L</span>
                      <span className="text-[10px] text-slate-400">{log.time || 'Logged'}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-sky-100 flex items-center justify-between text-xs text-slate-500">
              <span>{todayLogs.length} events logged</span>
              <span className="font-semibold text-cyan-700">Target: 400 L</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
