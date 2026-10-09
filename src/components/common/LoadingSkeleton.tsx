import React from 'react';

export const RecruitmentSkeleton: React.FC = () => {
  return (
    <div className="glass-panel p-5 rounded-2xl animate-pulse flex flex-col justify-between space-y-4">
      <div>
        <div className="flex items-center justify-between">
          <div className="h-5 w-28 bg-slate-800 rounded-full"></div>
          <div className="h-5 w-20 bg-slate-800 rounded-full"></div>
        </div>
        <div className="h-6 w-3/4 bg-slate-800 rounded-lg mt-3"></div>
        <div className="h-4 w-1/2 bg-slate-800/60 rounded mt-2"></div>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="h-10 bg-slate-900/60 rounded-xl border border-slate-800"></div>
          <div className="h-10 bg-slate-900/60 rounded-xl border border-slate-800"></div>
        </div>
      </div>
      <div className="pt-3 border-t border-slate-800 flex justify-between gap-2">
        <div className="h-9 w-10 bg-slate-800 rounded-xl"></div>
        <div className="h-9 flex-1 bg-slate-800 rounded-xl"></div>
        <div className="h-9 w-24 bg-slate-800 rounded-xl"></div>
      </div>
    </div>
  );
};

export const TableSkeleton: React.FC = () => {
  return (
    <div className="glass-panel rounded-2xl p-4 space-y-3 animate-pulse">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="h-12 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between px-4">
          <div className="h-4 w-1/3 bg-slate-800 rounded"></div>
          <div className="h-4 w-1/6 bg-slate-800 rounded"></div>
          <div className="h-4 w-1/6 bg-slate-800 rounded"></div>
        </div>
      ))}
    </div>
  );
};
