import React, { useState } from 'react';
import { ResultRecord } from '../types';
import { storage } from '../services/storage';
import { StatusBadge } from '../components/common/StatusBadge';
import { getOrgBadgeStyle } from '../components/common/RecruitmentCard';
import { Award, Search, ExternalLink } from 'lucide-react';

export const ResultsPage: React.FC = () => {
  const [results] = useState<ResultRecord[]>(() => storage.getResults());
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = results.filter(r => 
    searchQuery === '' || 
    r.recruitmentTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.organization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="drt-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold border border-emerald-500/30 mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>EXAMINATION RESULTS</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#F1F4F8] tracking-tight">
            Results & Merit Lists
          </h1>
          <p className="text-xs text-[#9AA8BA] mt-0.5">
            Track official result publications, cut-off marks, and candidate selection lists.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#718096] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search results..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0B1220] border border-[#24324A] text-[#F1F4F8] text-xs focus:border-[#5B8DEF]"
          />
        </div>
      </div>

      {/* Point 26: Simple Card Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(res => (
          <div
            key={res.id}
            className="drt-card p-5 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getOrgBadgeStyle(res.organization)}`}>
                  {res.organization}
                </span>
                <StatusBadge status={res.status} />
              </div>

              <h3 className="text-sm font-bold text-white leading-snug">
                {res.recruitmentTitle}
              </h3>

              <p className="text-xs text-[#9AA8BA]">Declared: <strong className="text-slate-200">{res.resultDate}</strong></p>
            </div>

            <div className="pt-2 border-t border-[#24324A]">
              <a
                href={res.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#5B8DEF] hover:text-blue-300 flex items-center gap-1"
              >
                <span>View Official Result</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
