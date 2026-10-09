import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { ShieldCheck, UserCheck, RefreshCw } from 'lucide-react';

export const QuickRoleSwitcher: React.FC = () => {
  const { user, isAdmin, switchRole } = useAuth();
  const { showToast } = useNotification();

  const handleSwitch = () => {
    const newRole = isAdmin ? 'USER' : 'ADMIN';
    switchRole(newRole);
    showToast(
      'Role Switched',
      `Switched mode to ${newRole === 'ADMIN' ? 'Administrator (Col. Rajesh Sharma)' : 'Aspirant (Vikram Singh)'}`,
      'info'
    );
  };

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-xs py-1.5 px-4 flex items-center justify-between text-slate-300">
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-semibold border border-blue-500/30 text-[10px] uppercase tracking-wider">
          College Viva Demo Mode
        </span>
        <span className="hidden sm:inline text-slate-400">
          Currently logged in as: <strong className="text-white font-medium">{user?.name}</strong> ({isAdmin ? 'System Admin' : 'Defence Aspirant'})
        </span>
      </div>

      <button
        onClick={handleSwitch}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 font-semibold transition-all hover:scale-105 active:scale-95"
      >
        <RefreshCw className="w-3 h-3 animate-spin-slow" />
        <span>Switch to {isAdmin ? 'Aspirant Mode' : 'Admin Portal'}</span>
        {isAdmin ? <UserCheck className="w-3.5 h-3.5 ml-1" /> : <ShieldCheck className="w-3.5 h-3.5 ml-1" />}
      </button>
    </div>
  );
};
