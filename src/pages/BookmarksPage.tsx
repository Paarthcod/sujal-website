import React, { useState } from 'react';
import { Recruitment } from '../types';
import { useAuth } from '../context/AuthContext';
import { storage } from '../services/storage';
import { RecruitmentCard } from '../components/common/RecruitmentCard';
import { Bookmark, Search, ArrowUpDown } from 'lucide-react';

interface BookmarksPageProps {
  recruitments: Recruitment[];
  onSelectRecruitment: (recruitment: Recruitment) => void;
  setActiveTab: (tab: string) => void;
}

export const BookmarksPage: React.FC<BookmarksPageProps> = ({
  recruitments,
  onSelectRecruitment,
  setActiveTab
}) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'deadline' | 'exam' | 'recent'>('deadline');

  const userBookmarks = user ? storage.getBookmarks(user.id) : [];
  const bookmarkedRecruitments = recruitments.filter(r => userBookmarks.some(b => b.recruitmentId === r.id));

  const filteredBookmarks = bookmarkedRecruitments
    .filter(r => searchQuery === '' || r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.organization.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'deadline') {
        return new Date(a.applicationEnd).getTime() - new Date(b.applicationEnd).getTime();
      }
      if (sortBy === 'exam') {
        return new Date(a.examDate).getTime() - new Date(b.examDate).getTime();
      }
      return 0;
    });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="drt-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold border border-emerald-500/30 mb-1">
            <Bookmark className="w-3.5 h-3.5" />
            <span>SAVED OPPORTUNITIES</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#F1F4F8] tracking-tight">
            Saved Recruitments
          </h1>
          <p className="text-xs text-[#9AA8BA] mt-0.5">
            Your personal watchlist of saved defence recruitments.
          </p>
        </div>

        <span className="text-xs font-semibold text-[#9AA8BA]">
          <strong className="text-white font-bold">{filteredBookmarks.length}</strong> Saved
        </span>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#718096] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search saved recruitments..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#111B2E] border border-[#24324A] text-[#F1F4F8] text-xs focus:border-[#5B8DEF]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto text-xs text-[#9AA8BA]">
          <ArrowUpDown className="w-4 h-4 text-[#718096]" />
          <span>Sort:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 rounded-lg bg-[#111B2E] border border-[#24324A] text-[#F1F4F8] text-xs focus:border-[#5B8DEF]"
          >
            <option value="deadline">Closing Deadline Soonest</option>
            <option value="exam">Exam Date Soonest</option>
          </select>
        </div>
      </div>

      {/* Point 27: Clean Empty State */}
      {filteredBookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBookmarks.map(rec => (
            <RecruitmentCard
              key={rec.id}
              recruitment={rec}
              onSelect={onSelectRecruitment}
              onBookmarkToggle={() => setSearchQuery(q => q)}
            />
          ))}
        </div>
      ) : (
        <div className="drt-card p-12 text-center space-y-3">
          <Bookmark className="w-10 h-10 text-[#718096] mx-auto" />
          <h3 className="text-base font-bold text-[#F1F4F8]">No saved recruitments</h3>
          <p className="text-xs text-[#9AA8BA] max-w-sm mx-auto">
            Save recruitments you're interested in and they'll appear here for easy access.
          </p>
          <button
            onClick={() => setActiveTab('explorer')}
            className="px-4 py-2 rounded-xl bg-[#5B8DEF] text-white text-xs font-semibold shadow hover:bg-blue-600"
          >
            Explore Recruitments
          </button>
        </div>
      )}

    </div>
  );
};
