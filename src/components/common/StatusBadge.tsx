import React from 'react';
import { RecruitmentStatus } from '../../types';

interface StatusBadgeProps {
  status: RecruitmentStatus | 'Available' | 'Coming Soon' | 'Expired' | 'Published' | 'Awaited' | 'Archived';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles: Record<string, string> = {
    Open: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Closing Soon': 'bg-amber-500/15 text-amber-300 border-amber-500/30 font-semibold',
    Upcoming: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Closed: 'bg-slate-800/80 text-slate-400 border-slate-700',
    Available: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Published: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Coming Soon': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Awaited: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    Archived: 'bg-slate-800/80 text-slate-400 border-slate-700',
    Expired: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  };

  const style = styles[status] || styles['Open'];

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${style}`}>
      {status}
    </span>
  );
};
