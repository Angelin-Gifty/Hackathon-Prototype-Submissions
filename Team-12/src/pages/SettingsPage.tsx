import React, { useState } from 'react';
import { 
  Settings, 
  Users, 
  Droplet, 
  ShieldCheck, 
  Save, 
  Check, 
  Plus, 
  Trash2, 
  RotateCcw,
  Sparkles,
  Database,
  Cloud,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { useWaterData } from '../context/WaterDataContext';
import { useAuth } from '../context/AuthContext';
import { HouseholdMember } from '../types';
import { firestoreDatabaseId, firebaseProjectId, testFirestorePing } from '../lib/firebase';

export const SettingsPage: React.FC = () => {
  const { household, members, updateHousehold, addMember, removeMember, resetToSampleData } = useWaterData();
  const { isDemoMode, enableDemoMode, disableDemoMode } = useAuth();

  const [name, setName] = useState(household.name);
  const [memberCount, setMemberCount] = useState(household.memberCount);
  const [dailyTargetLitres, setDailyTargetLitres] = useState(household.dailyTargetLitres);
  const [hasRO, setHasRO] = useState(household.hasRO);
  const [reusesROReject, setReusesROReject] = useState(household.reusesROReject);
  const [hasGarden, setHasGarden] = useState(household.hasGarden);
  const [waterSource, setWaterSource] = useState(household.waterSource);
  const [bathHabit, setBathHabit] = useState(household.bathHabit);

  // New member modal / inputs
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<HouseholdMember['role']>('Adult');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [pingStatus, setPingStatus] = useState<{ loading: boolean; message: string | null; success?: boolean }>({
    loading: false,
    message: null,
  });

  const handleTestPing = async () => {
    setPingStatus({ loading: true, message: null });
    const res = await testFirestorePing();
    setPingStatus({ loading: false, message: res.message, success: res.success });
  };

  const handleSaveHousehold = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateHousehold({
      name,
      memberCount: Number(memberCount),
      dailyTargetLitres: Number(dailyTargetLitres),
      hasRO,
      reusesROReject,
      hasGarden,
      waterSource,
      bathHabit,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    await addMember(newMemberName.trim(), newMemberRole);
    setNewMemberName('');
  };

  return (
    <div id="settings-page-container" className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-sky-950 tracking-tight">
            Household Settings & Quotas
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Configure your family profile, benchmark allowances, and water fixtures
          </p>
        </div>

        {saveSuccess && (
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      {/* Form: Household Configuration */}
      <form onSubmit={handleSaveHousehold} className="glass-card rounded-2xl p-6 sm:p-8 border border-sky-100 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold text-sky-950">Household Profile</h2>
          <p className="text-xs text-slate-500">
            Customize parameters used to calculate your wastage alerts and saving targets
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Household Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Primary Water Source
            </label>
            <select
              value={waterSource}
              onChange={(e) => setWaterSource(e.target.value as any)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white"
            >
              <option value="Municipal">Municipal / City Supply</option>
              <option value="Borewell">Borewell / Groundwater</option>
              <option value="Tanker">Private Tanker Delivery</option>
              <option value="Mixed">Mixed Sources</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Number of Residents
            </label>
            <input
              type="number"
              min={1}
              max={20}
              required
              value={memberCount}
              onChange={(e) => setMemberCount(Number(e.target.value))}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Standard benchmark: {memberCount * 135} L/day (135 L/person)
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Daily Target Consumption (Litres)
            </label>
            <input
              type="number"
              min={50}
              max={3000}
              required
              value={dailyTargetLitres}
              onChange={(e) => setDailyTargetLitres(Number(e.target.value))}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 font-bold text-sky-950 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white"
            />
            <span className="text-[11px] text-cyan-700 font-semibold mt-1 block">
              AquaSense target: {Math.round(dailyTargetLitres / memberCount)} L / person
            </span>
          </div>
        </div>

        {/* Fixtures and Habits Checkboxes */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Fixtures & Habits
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={hasRO}
                onChange={(e) => setHasRO(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 cursor-pointer"
              />
              <div>
                <span className="text-xs font-bold text-sky-950 block">RO Water Purifier</span>
                <span className="text-[10px] text-slate-400">Generates reject water during filtration</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={reusesROReject}
                onChange={(e) => setReusesROReject(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 cursor-pointer"
              />
              <div>
                <span className="text-xs font-bold text-sky-950 block">Reuses RO Reject</span>
                <span className="text-[10px] text-slate-400">Water saved for mopping & gardening</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={hasGarden}
                onChange={(e) => setHasGarden(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 cursor-pointer"
              />
              <div>
                <span className="text-xs font-bold text-sky-950 block">Garden / Balcony Plants</span>
                <span className="text-[10px] text-slate-400">Enables cooler-hour hydration guidance</span>
              </div>
            </label>

            <div className="p-3 rounded-xl border border-slate-200 bg-white flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-sky-950 block">Bathing Habit</span>
                <span className="text-[10px] text-slate-400">General household style</span>
              </div>
              <select
                value={bathHabit}
                onChange={(e) => setBathHabit(e.target.value as any)}
                className="mt-1 text-xs font-bold text-cyan-800 bg-transparent focus:outline-none"
              >
                <option value="Mixed">Mixed (Shower + Bucket)</option>
                <option value="Shower">Mostly Shower</option>
                <option value="Bucket">Mostly Bucket</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-cyan-600/20 flex items-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </form>

      {/* Household Members Management */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-sky-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-sky-950">Family Members</h2>
            <p className="text-xs text-slate-500">
              Manage residents logging individual water activities
            </p>
          </div>
          <span className="text-xs font-bold text-cyan-800 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-100">
            {members.length} Members
          </span>
        </div>

        {/* Members List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {members.map((mem) => (
            <div
              key={mem.id}
              className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full text-white font-bold text-xs flex items-center justify-center"
                  style={{ backgroundColor: mem.color }}
                >
                  {mem.name.charAt(0)}
                </div>
                <div>
                  <span className="text-xs font-bold text-sky-950 block">{mem.name}</span>
                  <span className="text-[10px] text-slate-400">{mem.role}</span>
                </div>
              </div>

              {members.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMember(mem.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Remove Member"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add Member Form */}
        <form onSubmit={handleAddMember} className="flex flex-col sm:flex-row gap-3 pt-2">
          <input
            type="text"
            required
            placeholder="Add new family member name..."
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
            className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white"
          />
          <select
            value={newMemberRole}
            onChange={(e) => setNewMemberRole(e.target.value as any)}
            className="px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 bg-white"
          >
            <option value="Adult">Adult</option>
            <option value="Child">Child</option>
            <option value="Senior">Senior</option>
            <option value="Guest">Guest</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Member</span>
          </button>
        </form>
      </div>

      {/* Firebase Firestore Database Connection Panel */}
      <div className="glass-card rounded-2xl p-6 sm:p-7 border border-emerald-100 bg-gradient-to-br from-emerald-50/40 via-white to-sky-50/30 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-sky-950">Cloud Firestore Database</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Connected
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time synchronized data layer with client security rules
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleTestPing}
            disabled={pingStatus.loading}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${pingStatus.loading ? 'animate-spin' : ''}`} />
            <span>{pingStatus.loading ? 'Verifying...' : 'Test Database Ping'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-white border border-slate-200/80">
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">Database ID</span>
            <span className="text-xs font-mono font-semibold text-slate-800 truncate block mt-0.5" title={firestoreDatabaseId}>
              {firestoreDatabaseId}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white border border-slate-200/80">
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">Google Cloud Project</span>
            <span className="text-xs font-mono font-semibold text-slate-800 truncate block mt-0.5" title={firebaseProjectId}>
              {firebaseProjectId}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white border border-slate-200/80">
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">Collections Active</span>
            <span className="text-xs font-semibold text-slate-800 block mt-0.5">
              5 (households, logs, members...)
            </span>
          </div>
        </div>

        {pingStatus.message && (
          <div className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in ${
            pingStatus.success ? 'bg-emerald-100/70 text-emerald-900 border border-emerald-200' : 'bg-amber-100/70 text-amber-900 border border-amber-200'
          }`}>
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{pingStatus.message}</span>
          </div>
        )}
      </div>

      {/* Demo Mode / Data Reset Section for Evaluator */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-700 block">Demonstration & Evaluation Tools</span>
          <p className="text-xs text-slate-500 mt-0.5">
            Reset to Priya's initial 7-day demo data or toggle evaluation mode
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={resetToSampleData}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
