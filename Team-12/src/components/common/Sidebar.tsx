import React from 'react';
import { 
  Home, 
  PlusCircle, 
  BarChart3, 
  Lightbulb, 
  GitCompare, 
  FileText, 
  Award, 
  Settings, 
  LogOut,
  Droplet
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  className?: string;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  className = '',
  onCloseMobile,
}) => {
  const { signOutUser, isDemoMode, disableDemoMode } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'add-usage', label: 'Add Usage', icon: PlusCircle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'suggestions', label: 'Suggestions', icon: Lightbulb },
    { id: 'compare', label: 'Compare', icon: GitCompare },
    { id: 'receipt', label: 'Water Receipt', icon: FileText },
    { id: 'challenges', label: 'Challenges', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleItemClick = (id: string) => {
    onSelectTab(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside
      id="aquasense-sidebar"
      className={`w-[240px] shrink-0 bg-white/95 backdrop-blur-md border-r border-sky-100/90 flex flex-col justify-between py-5 px-3 z-30 select-none ${className}`}
    >
      {/* Top Logo */}
      <div>
        <div className="px-3 pb-6 border-b border-sky-50">
          <BrandLogo size="md" onClick={() => handleItemClick('dashboard')} />
        </div>

        {/* Navigation Items */}
        <nav className="mt-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 relative group cursor-pointer ${
                  isActive
                    ? 'bg-sky-50 text-cyan-800 font-bold shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-sky-950'
                }`}
              >
                {/* Active Left Indicator Accent Bar */}
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-cyan-600 rounded-r-full" />
                )}

                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive
                      ? 'text-cyan-600'
                      : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom of Sidebar: "Every drop counts." with subtle water wave decoration */}
      <div className="pt-4 border-t border-sky-100/80">
        {/* Decorative Water Wave Badge */}
        <div className="relative overflow-hidden rounded-xl p-3 bg-gradient-to-br from-cyan-50/80 via-sky-50/60 to-white border border-sky-100">
          {/* Subtle Wave SVG in card background */}
          <div className="absolute inset-x-0 bottom-0 h-6 overflow-hidden opacity-30 pointer-events-none">
            <svg
              viewBox="0 0 500 150"
              preserveAspectRatio="none"
              className="w-[200%] h-full animate-wave fill-cyan-500"
            >
              <path d="M0,75 C150,150 350,0 500,75 L500,150 L0,150 Z" />
            </svg>
          </div>

          <div className="relative z-10 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-cyan-600/10 text-cyan-600 flex items-center justify-center shrink-0">
              <Droplet className="w-3.5 h-3.5 fill-cyan-500 text-cyan-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-sky-950 leading-tight">Every drop counts.</p>
              <p className="text-[10px] text-slate-500 font-medium">Protect water together</p>
            </div>
          </div>
        </div>

        {/* Demo Indicator & Sign Out */}
        <div className="mt-3 flex items-center justify-between px-1">
          {isDemoMode ? (
            <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
              Demo Mode
            </span>
          ) : (
            <span className="text-[11px] font-semibold text-slate-400">
              Firebase Connected
            </span>
          )}

          <button
            onClick={() => {
              signOutUser();
              onSelectTab('landing');
            }}
            title="Sign Out"
            className="text-xs font-medium text-slate-500 hover:text-rose-600 flex items-center gap-1 p-1 rounded-md transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="text-[11px]">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
