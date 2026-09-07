import React from 'react';
import { Home, PlusCircle, BarChart3, Lightbulb, MoreHorizontal } from 'lucide-react';

interface MobileNavigationProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenMenu: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  currentTab,
  onSelectTab,
  onOpenMenu,
}) => {
  const items = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'add-usage', label: 'Add Usage', icon: PlusCircle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'suggestions', label: 'Suggestions', icon: Lightbulb },
  ];

  return (
    <nav
      id="mobile-bottom-navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-lg border-t border-sky-100 flex items-center justify-around px-2 z-40 shadow-lg"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all ${
              isActive ? 'text-cyan-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className={`p-1 rounded-lg ${isActive ? 'bg-sky-50' : ''}`}>
              <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-600 stroke-[2.5]' : ''}`} />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
          </button>
        );
      })}

      {/* More / Menu trigger */}
      <button
        onClick={onOpenMenu}
        className="flex flex-col items-center justify-center w-14 py-1 text-slate-500 hover:text-slate-800 rounded-xl transition-all"
        title="More options"
      >
        <div className="p-1 rounded-lg">
          <MoreHorizontal className="w-5 h-5" />
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight">More</span>
      </button>
    </nav>
  );
};
