import React, { useState } from 'react';
import { AdmitCard } from '../types';
import { storage } from '../services/storage';
import { StatusBadge } from '../components/common/StatusBadge';
import { getOrgBadgeStyle } from '../components/common/RecruitmentCard';
import { FileText, Search, ExternalLink } from 'lucide-react';

export const AdmitCardsPage: React.FC = () => {
  const [admitCards] = useState<AdmitCard[]>(() => storage.getAdmitCards());
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = admitCards.filter(ac => 
    searchQuery === '' || 
    ac.recruitmentTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
    ac.organization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="drt-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 text-xs font-semibold border border-amber-500/30 mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>EXAMINATION ADMIT CARDS</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#F1F4F8] tracking-tight">
            Admit Cards
          </h1>
          <p className="text-xs text-[#9AA8BA] mt-0.5">
            Download official hall tickets directly from recruitment examination portals.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#718096] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search admit cards..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0B1220] border border-[#24324A] text-[#F1F4F8] text-xs focus:border-[#5B8DEF]"
          />
        </div>
      </div>

      {/* Point 25: Simple Card Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(card => (
          <div
            key={card.id}
            className="drt-card p-5 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getOrgBadgeStyle(card.organization)}`}>
                  {card.organization}
                </span>
                <StatusBadge status={card.status} />
              </div>

              <h3 className="text-sm font-bold text-white leading-snug">
                {card.recruitmentTitle}
              </h3>

              <div className="text-xs text-[#9AA8BA] space-y-0.5">
                <p>Released: <strong className="text-slate-200">{card.releaseDate}</strong></p>
                <p>Exam Date: <strong className="text-slate-200">{card.examDate}</strong></p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#24324A]">
              {card.status === 'Available' ? (
                <a
                  href={card.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#5B8DEF] hover:text-blue-300 flex items-center gap-1"
                >
                  <span>View Official Admit Card</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-xs text-[#718096]">
                  Release expected {card.releaseDate}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
