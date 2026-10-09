import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { Logo } from '../common/Logo';
import { 
  Search, 
  Bell, 
  User as UserIcon, 
  LogOut, 
  CheckCircle2, 
  Menu, 
  X,
  ShieldCheck,
  ChevronDown,
  LayoutDashboard,
  Compass,
  Calculator,
  Bookmark,
  Calendar as CalendarIcon,
  FileText,
  Award,
  Info,
  Mail,
  Home
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSearchQueryChange?: (query: string) => void;
  toggleMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onSearchQueryChange,
  toggleMobileMenu,
  isMobileMenuOpen
}) => {
  const { user, isAdmin, logout } = useAuth();
  const { unreadCount } = useNotification();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchQueryChange) {
      onSearchQueryChange(searchInput);
      setActiveTab('explorer');
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { id: 'explorer', label: 'Recruitments', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'eligibility', label: 'Eligibility Calculator', icon: <Calculator className="w-3.5 h-3.5" /> },
    { id: 'bookmarks', label: 'Saved', icon: <Bookmark className="w-3.5 h-3.5" /> },
    { id: 'calendar', label: 'Calendar', icon: <CalendarIcon className="w-3.5 h-3.5" /> },
    { id: 'admit-cards', label: 'Admit Cards', icon: <FileText className="w-3.5 h-3.5 text-[#5B8DEF]" /> },
    { id: 'results', label: 'Results', icon: <Award className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-3.5 h-3.5 text-emerald-400" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#111B2E] border-b border-[#24324A] shadow-md">
      {/* Top Tricolor Accent Stripe */}
      <div className="tricolor-stripe"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Upper Bar */}
        <div className="h-16 flex items-center justify-between gap-4">
          
          {/* Brand Header with Indian Flag Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#162238]"
              title="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Logo 
              size="md"
              onClick={() => setActiveTab('dashboard')}
            />
          </div>

          {/* Global Search */}
          <form onSubmit={handleSearchSubmit} className="hidden lg:flex flex-1 max-w-xs relative">
            <Search className="w-4 h-4 text-[#718096] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                if (onSearchQueryChange) onSearchQueryChange(e.target.value);
              }}
              placeholder="Search recruitments, exams..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0B1220] border border-[#24324A] text-[#F1F4F8] placeholder-[#718096] text-xs focus:outline-none focus:border-[#5B8DEF] transition-colors"
            />
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            
            {/* Notifications Bell */}
            <button
              onClick={() => setActiveTab('notifications')}
              className="relative p-2 rounded-xl bg-[#0B1220] border border-[#24324A] text-[#9AA8BA] hover:text-white hover:border-[#5B8DEF]/50 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-[#0B1220] text-[10px] font-extrabold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User Profile */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2.5 p-1 pr-3 rounded-xl bg-[#0B1220] border border-[#24324A] hover:border-[#5B8DEF]/50 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#5B8DEF] font-bold text-white text-xs flex items-center justify-center shadow-sm">
                    {user.name.charAt(0)}
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-semibold text-[#F1F4F8] leading-tight flex items-center gap-1">
                      {user.name}
                      {isAdmin && <ShieldCheck className="w-3 h-3 text-amber-400" />}
                    </p>
                    <p className="text-[10px] text-[#718096]">{isAdmin ? 'Admin' : 'Aspirant'}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#718096]" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#162238] rounded-2xl border border-[#24324A] shadow-2xl py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-[#24324A]">
                      <p className="text-xs font-semibold text-white">{user.name}</p>
                      <p className="text-[11px] text-[#9AA8BA] truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => { setActiveTab('profile'); setShowProfileMenu(false); }}
                      className="w-full px-4 py-2 text-xs text-left text-[#9AA8BA] hover:text-white hover:bg-[#111B2E] flex items-center gap-2"
                    >
                      <UserIcon className="w-4 h-4 text-[#5B8DEF]" />
                      <span>My Profile</span>
                    </button>

                    <button
                      onClick={() => { setActiveTab('bookmarks'); setShowProfileMenu(false); }}
                      className="w-full px-4 py-2 text-xs text-left text-[#9AA8BA] hover:text-white hover:bg-[#111B2E] flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Saved Recruitments</span>
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => { setActiveTab('admin-dashboard'); setShowProfileMenu(false); }}
                        className="w-full px-4 py-2 text-xs text-left text-amber-300 hover:bg-amber-500/10 flex items-center gap-2 font-semibold border-t border-[#24324A]"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                        <span>Admin Management Portal</span>
                      </button>
                    )}

                    <button
                      onClick={() => { logout(); setShowProfileMenu(false); }}
                      className="w-full px-4 py-2 text-xs text-left text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 border-t border-[#24324A]"
                    >
                      <LogOut className="w-4 h-4 text-rose-400" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setActiveTab('login')}
                className="px-4 py-1.5 rounded-xl bg-[#5B8DEF] hover:bg-blue-600 text-white text-xs font-semibold shadow transition-colors"
              >
                Log In
              </button>
            )}

          </div>

        </div>

        {/* Primary Horizontal Navigation Tabs */}
        <div className="hidden md:flex items-center gap-1 py-1.5 border-t border-[#1E2C42] overflow-x-auto scrollbar-none">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#5B8DEF]/20 text-[#5B8DEF] border border-[#5B8DEF]/40 font-bold'
                    : 'text-[#9AA8BA] hover:text-white hover:bg-[#162238]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Admin Tab if Admin */}
          {isAdmin && (
            <button
              onClick={() => setActiveTab('admin-dashboard')}
              className={`ml-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab.startsWith('admin')
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-amber-400 hover:bg-amber-500/10'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Portal</span>
            </button>
          )}

        </div>

        {/* Collapsible Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-[#24324A] space-y-1 animate-fade-in">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (toggleMobileMenu) toggleMobileMenu();
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === item.id ? 'bg-[#5B8DEF]/20 text-[#5B8DEF] font-bold' : 'text-[#9AA8BA] hover:bg-[#162238] hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}

      </div>
    </header>
  );
};

