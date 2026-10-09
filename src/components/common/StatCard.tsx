import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: string;
  accentColor?: 'blue' | 'emerald' | 'amber' | 'purple' | 'red';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  accentColor = 'blue'
}) => {
  const colorMap = {
    blue: 'bg-[#5B8DEF]/15 text-[#5B8DEF] border-[#5B8DEF]/30',
    emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    purple: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    red: 'bg-rose-500/15 text-rose-300 border-rose-500/30'
  };

  return (
    <div className="drt-card p-5 flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold text-[#718096] uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-extrabold text-[#F1F4F8] mt-1 tracking-tight">{value}</h3>
        </div>
        <div className={`p-2.5 rounded-xl border ${colorMap[accentColor]}`}>
          {icon}
        </div>
      </div>
      {subtitle && (
        <p className="mt-3 text-xs text-[#9AA8BA] truncate">{subtitle}</p>
      )}
    </div>
  );
};
