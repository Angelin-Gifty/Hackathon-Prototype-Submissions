import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Menu, 
  User, 
  Sparkles, 
  Check, 
  Droplets,
  Settings as SettingsIcon,
  LogOut,
  Database
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { firestoreDatabaseId } from '../../lib/firebase';

interface HeaderProps {
  onOpenMobileSidebar?: () => void;
  onNavigate?: (tab: string) => void;
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileSidebar,
  onNavigate,
  onSearch,
}) => {
  const { userProfile, signOutUser, isDemoMode, enableDemoMode, disableDemoMode } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const [searchVal, setSearchVal] = useState('');

  const displayName = userProfile?.displayName || 'Priya';

  const notifications = [
    {
      id: 1,
      title: 'High Usage Detected: Gardening',
      message: 'Gardening used 94 L today. Cooler hour watering saves ~25 L.',
      time: '2 hrs ago',
      unread: true,
      color: 'bg-amber-500',
    },
    {
      id: 2,
      title: 'Water Saving Goal: 56% Reached',
      message: "You've saved 28 L of your 50 L goal so far today!",
      time: '4 hrs ago',
      unread: true,
      color: 'bg-cyan-500',
    },
    {
      id: 3,
      title: 'Weekly Benchmark Achieved',
      message: 'Your household is operating efficiently within target.',
      time: '1 day ago',
      unread: false,
      color: 'bg-emerald-500',
    },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <header
      id="dashboard-header-bar"
      className="h-16 px-4 md:px-6 bg-white/85 backdrop-blur-md border-b border-sky-100/90 flex items-center justify-between sticky top-0 z-20"
    >
      {/* Left: Mobile Drawer Button & Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        {onOpenMobileSidebar && (
          <button
            onClick={onOpenMobileSidebar}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            title="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Search Bar: "Search anything..." */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchVal}
            onChange={handleSearchChange}
            placeholder="Search anything..."
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all"
          />
        </div>
      </div>

      {/* Right: Notification & Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Firestore Database Connection Pill */}
        <div 
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[11px] font-semibold cursor-default"
          title={`Firestore DB: ${firestoreDatabaseId}`}
        >
          <Database className="w-3.5 h-3.5 text-emerald-600" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Firestore Connected</span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
              setUnreadCount(0);
            }}
            className="p-2 rounded-xl text-slate-600 hover:text-sky-950 hover:bg-slate-50 border border-slate-200/60 relative transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-500 ring-2 ring-white" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white shadow-xl border border-sky-100 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-sky-950">Water Alerts & Insights</span>
                <span className="text-[10px] font-semibold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-full">
                  3 Updates
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-1">
                {notifications.map((n) => (
                  <div key={n.id} className="py-2.5 px-1 hover:bg-slate-50 rounded-lg transition-colors">
                    <div className="flex items-start gap-2">
                      <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.color}`} />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-800 leading-snug">{n.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{n.message}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Card & Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 sm:gap-2.5 p-1 sm:pr-2 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200/60"
          >
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-600 to-sky-400 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {displayName.charAt(0).toUpperCase()}
            </div>

            {/* Name and greeting */}
            <div className="text-left hidden sm:block">
              <span className="text-xs font-bold text-sky-950 block leading-tight">
                Hi, {displayName}!
              </span>
              <span className="text-[10px] font-medium text-cyan-700 block leading-none">
                Let's save water!
              </span>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-sky-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-2 border-b border-slate-100">
                <p className="text-xs font-bold text-sky-950">Hi, {displayName}!</p>
                <p className="text-[11px] text-slate-500 truncate">{userProfile?.email || 'priya@aquasense.org'}</p>
                {isDemoMode && (
                  <span className="inline-block mt-1 text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                    Sample Data Active
                  </span>
                )}
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    if (onNavigate) onNavigate('settings');
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <SettingsIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span>Household Settings</span>
                </button>

                <button
                  onClick={() => {
                    if (isDemoMode) {
                      disableDemoMode();
                    } else {
                      enableDemoMode();
                    }
                    setShowUserMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-cyan-800 hover:bg-cyan-50 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                  <span>{isDemoMode ? 'Exit Demo Mode' : 'Explore Demo Data'}</span>
                </button>
              </div>

              {/* Database Connection Summary */}
              <div className="p-2 border-t border-slate-100 bg-slate-50/70 rounded-xl my-1 text-[10px] space-y-1">
                <div className="flex items-center justify-between text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Database className="w-3 h-3 text-emerald-600" />
                    Firestore DB
                  </span>
                  <span className="text-emerald-700 font-bold">Active</span>
                </div>
                <div className="font-mono text-[9px] text-slate-600 truncate bg-white px-1.5 py-0.5 rounded border border-slate-200">
                  {firestoreDatabaseId}
                </div>
              </div>

              <div className="pt-1 border-t border-slate-100">
                <button
                  onClick={() => {
                    signOutUser();
                    setShowUserMenu(false);
                    if (onNavigate) onNavigate('landing');
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
