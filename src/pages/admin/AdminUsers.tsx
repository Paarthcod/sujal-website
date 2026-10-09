import React, { useState } from 'react';
import { User, UserRole } from '../../types';
import { storage } from '../../services/storage';
import { useNotification } from '../../context/NotificationContext';
import { Users, Search, ShieldCheck, UserCheck } from 'lucide-react';

export const AdminUsers: React.FC = () => {
  const { showToast } = useNotification();
  const [users, setUsers] = useState<User[]>(() => storage.getUsers());
  const [searchQuery, setSearchQuery] = useState('');

  const handleRoleToggle = (user: User) => {
    const newRole: UserRole = user.role === 'ADMIN' ? 'USER' : 'ADMIN';
    const updated = { ...user, role: newRole };
    storage.saveUser(updated);
    setUsers(storage.getUsers());
    showToast('Role Changed', `Updated ${user.name} role to ${newRole}.`, 'success');
  };

  const filtered = users.filter(u => 
    searchQuery === '' || 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20 mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>USER DIRECTORY MANAGEMENT</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Registered Aspirants & Administrators
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            View user profiles, state domicile statistics, and manage role-based authorization.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Aspirant Name</th>
                <th className="px-4 py-3.5">Email & Mobile</th>
                <th className="px-4 py-3.5">Qualification & Height</th>
                <th className="px-4 py-3.5">State</th>
                <th className="px-4 py-3.5">Role</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="px-5 py-4 font-bold text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center border border-blue-500/30">
                        {u.name.charAt(0)}
                      </div>
                      <span>{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-slate-200 font-semibold">{u.email}</div>
                    <div className="text-[10px] text-slate-500">{u.mobile}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-slate-200">{u.qualification || '12th Pass'}</div>
                    <div className="text-[10px] text-slate-500">{u.heightCm || 170} cm • {u.percentage || 75}%</div>
                  </td>
                  <td className="px-4 py-4 font-semibold text-slate-300">{u.state}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      u.role === 'ADMIN' 
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                        : 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                    }`}>
                      {u.role === 'ADMIN' ? <ShieldCheck className="w-3 h-3 text-amber-400" /> : <UserCheck className="w-3 h-3 text-blue-400" />}
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => handleRoleToggle(u)}
                      className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-semibold text-slate-300"
                    >
                      Toggle {u.role === 'ADMIN' ? 'User' : 'Admin'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
