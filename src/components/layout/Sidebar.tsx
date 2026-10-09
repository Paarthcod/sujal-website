import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Compass, 
  Calculator, 
  Bookmark, 
  Calendar as CalendarIcon, 
  FileText, 
  Award, 
  Bell, 
  User as UserIcon,
  ShieldCheck,
  Briefcase,
  Users,
  Info,
  Mail
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { isAdmin } = useAuth();

  const navGroups = [
    {
      title: 'Main',
      items: [
        { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
        { id: 'explorer', label: 'Recruitments', icon: <Compass className="w-4 h-4" /> },
        { id: 'eligibility', label: 'Eligibility Calculator', icon: <Calculator className="w-4 h-4" /> }
      ]
    },
    {
      title: 'My Activity',
      items: [
        { id: 'bookmarks', label: 'Saved Recruitments', icon: <Bookmark className="w-4 h-4" /> },
        { id: 'calendar', label: 'Calendar', icon: <CalendarIcon className="w-4 h-4" /> }
      ]
    },
    {
      title: 'Updates',
      items: [
        { id: 'admit-cards', label: 'Admit Cards', icon: <FileText className="w-4 h-4" /> },
        { id: 'results', label: 'Results', icon: <Award className="w-4 h-4" /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> }
      ]
    },
    {
      title: 'Account',
      items: [
        { id: 'profile', label: 'Profile', icon: <UserIcon className="w-4 h-4" /> }
      ]
    }
  ];

  const adminGroup = {
    title: 'Administration',
    items: [
      { id: 'admin-dashboard', label: 'Overview', icon: <ShieldCheck className="w-4 h-4 text-amber-400" /> },
      { id: 'admin-recruitments', label: 'Recruitments', icon: <Briefcase className="w-4 h-4 text-amber-400" /> },
      { id: 'admin-admit-cards', label: 'Admit Cards', icon: <FileText className="w-4 h-4 text-amber-400" /> },
      { id: 'admin-results', label: 'Results', icon: <Award className="w-4 h-4 text-amber-400" /> },
      { id: 'admin-users', label: 'Users', icon: <Users className="w-4 h-4 text-amber-400" /> }
    ]
  };

  const projectItems = [
    { id: 'about', label: 'About DRT', icon: <Info className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> }
  ];

  return (
    <aside className="w-60 bg-[#111B2E] border-r border-[#24324A] p-4 shrink-0 hidden md:flex flex-col justify-between overflow-y-auto">
      <div className="space-y-5">
        
        {navGroups.map(group => (
          <div key={group.title}>
            <p className="px-3 text-[11px] font-bold text-[#718096] uppercase tracking-wider mb-1.5">
              {group.title}
            </p>
            <nav className="space-y-0.5">
              {group.items.map(item => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 h-10 rounded-xl text-xs font-semibold transition-all ${
                      isActive 
                        ? 'bg-[#5B8DEF]/15 text-[#5B8DEF] border border-[#5B8DEF]/30 font-bold' 
                        : 'text-[#9AA8BA] hover:text-[#F1F4F8] hover:bg-[#162238]'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        ))}

        {/* Administration Section */}
        {isAdmin && (
          <div className="pt-2 border-t border-[#24324A]">
            <p className="px-3 text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{adminGroup.title}</span>
            </p>
            <nav className="space-y-0.5">
              {adminGroup.items.map(item => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 h-10 rounded-xl text-xs font-semibold transition-all ${
                      isActive 
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold' 
                        : 'text-[#9AA8BA] hover:text-amber-200 hover:bg-amber-500/10'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}

        {/* Project Info Section */}
        <div className="pt-2 border-t border-[#24324A]">
          <p className="px-3 text-[11px] font-bold text-[#718096] uppercase tracking-wider mb-1.5">
            Project Info
          </p>
          <nav className="space-y-0.5">
            {projectItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 h-10 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === item.id ? 'bg-[#162238] text-white' : 'text-[#9AA8BA] hover:text-[#F1F4F8] hover:bg-[#162238]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

      </div>

      {/* Footer Disclaimer Box */}
      <div className="mt-6 p-3 rounded-xl bg-[#0B1220] border border-[#24324A] text-[11px] text-[#718096] leading-snug">
        <p className="font-semibold text-[#9AA8BA]">Final-Year Project</p>
        <p className="text-[10px] mt-0.5">DRT Educational Tracker.</p>
      </div>
    </aside>
  );
};
