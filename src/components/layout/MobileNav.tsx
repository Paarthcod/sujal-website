import React from 'react';
import { Home, Compass, Calculator, Bookmark, Calendar, User } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'explorer', label: 'Explore', icon: <Compass className="w-5 h-5" /> },
    { id: 'eligibility', label: 'Eligibility', icon: <Calculator className="w-5 h-5" /> },
    { id: 'calendar', label: 'Calendar', icon: <Calendar className="w-5 h-5" /> },
    { id: 'bookmarks', label: 'Saved', icon: <Bookmark className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 px-2 py-2 flex items-center justify-around">
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 px-2 py-1 rounded-xl transition-all ${
              isActive ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.icon}
            <span className="text-[10px]">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
