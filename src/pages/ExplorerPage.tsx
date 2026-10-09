import React, { useState, useMemo } from 'react';
import { Recruitment, Organization, QualificationLevel, RecruitmentStatus } from '../types';
import { RecruitmentCard } from '../components/common/RecruitmentCard';
import { INDIAN_STATES } from './RegisterPage';
import { Search, Filter, X, RefreshCw, Compass } from 'lucide-react';

interface ExplorerPageProps {
  recruitments: Recruitment[];
  onSelectRecruitment: (recruitment: Recruitment) => void;
  initialQuery?: string;
}

export const ExplorerPage: React.FC<ExplorerPageProps> = ({
  recruitments,
  onSelectRecruitment,
  initialQuery = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedOrgs, setSelectedOrgs] = useState<Organization[]>([]);
  const [selectedQual, setSelectedQual] = useState<QualificationLevel | 'All'>('All');
  const [selectedGender, setSelectedGender] = useState<'All' | 'Male' | 'Female'>('All');
  const [selectedStatus, setSelectedStatus] = useState<RecruitmentStatus | 'All'>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const orgList: Organization[] = [
    'Indian Army', 'Indian Navy', 'Indian Air Force', 'CAPF', 'Indian Coast Guard'
  ];

  const qualList: QualificationLevel[] = [
    '10th Pass', '12th Pass', 'Diploma', 'Graduate', 'Engineering Degree', 'Postgraduate'
  ];

  const toggleOrg = (org: Organization) => {
    setSelectedOrgs(prev => 
      prev.includes(org) ? prev.filter(o => o !== org) : [...prev, org]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedOrgs([]);
    setSelectedQual('All');
    setSelectedGender('All');
    setSelectedStatus('All');
    setSelectedState('All');
  };

  const filteredRecruitments = useMemo(() => {
    return recruitments.filter(rec => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = rec.title.toLowerCase().includes(q);
        const matchesOrg = rec.organization.toLowerCase().includes(q);
        const matchesBranch = rec.branch.toLowerCase().includes(q);
        if (!matchesTitle && !matchesOrg && !matchesBranch) return false;
      }

      if (selectedOrgs.length > 0 && !selectedOrgs.includes(rec.organization)) {
        return false;
      }

      if (selectedQual !== 'All' && rec.qualification !== selectedQual) {
        return false;
      }

      if (selectedGender !== 'All' && rec.gender !== 'All' && rec.gender !== selectedGender) {
        return false;
      }

      if (selectedStatus !== 'All' && rec.status !== selectedStatus) {
        return false;
      }

      if (selectedState !== 'All' && !rec.statesAllowed.includes('All India') && !rec.statesAllowed.includes(selectedState)) {
        return false;
      }

      return true;
    });
  }, [recruitments, searchQuery, selectedOrgs, selectedQual, selectedGender, selectedStatus, selectedState]);

  const activeFilterCount = (searchQuery ? 1 : 0) + selectedOrgs.length + (selectedQual !== 'All' ? 1 : 0) + (selectedGender !== 'All' ? 1 : 0) + (selectedStatus !== 'All' ? 1 : 0) + (selectedState !== 'All' ? 1 : 0);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="drt-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#5B8DEF]/15 text-[#5B8DEF] text-xs font-semibold border border-[#5B8DEF]/30 mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>RECRUITMENT EXPLORER</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#F1F4F8] tracking-tight">
            Discover Defence Opportunities
          </h1>
          <p className="text-xs text-[#9AA8BA] mt-0.5">
            Filter recruitments by organization, qualification, age, gender and state.
          </p>
        </div>

        <span className="text-xs font-semibold text-[#9AA8BA]">
          Showing <strong className="text-[#F1F4F8] font-bold">{filteredRecruitments.length}</strong> Recruitments
        </span>
      </div>

      {/* Point 13: Search Bar & Compact Filter Bar */}
      <div className="space-y-3">
        
        {/* Search Field */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#718096] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search recruitments, exams or branches..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111B2E] border border-[#24324A] text-[#F1F4F8] placeholder-[#718096] text-xs focus:outline-none focus:border-[#5B8DEF]"
            />
          </div>

          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden px-4 py-2.5 rounded-xl bg-[#162238] border border-[#24324A] text-xs font-semibold text-[#F1F4F8] flex items-center gap-1.5"
          >
            <Filter className="w-4 h-4 text-[#5B8DEF]" />
            <span>Filters ({activeFilterCount})</span>
          </button>
        </div>

        {/* Filter Row (Desktop Bar / Mobile Drawer) */}
        <div className={`md:flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-[#111B2E] border border-[#24324A] ${
          showMobileFilters ? 'block space-y-3 md:space-y-0' : 'hidden'
        }`}>
          
          {/* Org Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            <span className="text-[#718096] font-semibold text-xs shrink-0">Branch:</span>
            {orgList.map(org => {
              const isChecked = selectedOrgs.includes(org);
              return (
                <button
                  key={org}
                  onClick={() => toggleOrg(org)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                    isChecked 
                      ? 'bg-[#5B8DEF] text-white' 
                      : 'bg-[#0B1220] text-[#9AA8BA] border border-[#24324A] hover:text-white'
                  }`}
                >
                  {org}
                </button>
              );
            })}
          </div>

          {/* Qualification Dropdown */}
          <select
            value={selectedQual}
            onChange={e => setSelectedQual(e.target.value as any)}
            className="px-3 py-1.5 rounded-lg bg-[#0B1220] border border-[#24324A] text-[#F1F4F8] text-xs focus:border-[#5B8DEF]"
          >
            <option value="All">All Qualifications</option>
            {qualList.map(q => <option key={q} value={q}>{q}</option>)}
          </select>

          {/* Gender */}
          <select
            value={selectedGender}
            onChange={e => setSelectedGender(e.target.value as any)}
            className="px-3 py-1.5 rounded-lg bg-[#0B1220] border border-[#24324A] text-[#F1F4F8] text-xs focus:border-[#5B8DEF]"
          >
            <option value="All">All Genders</option>
            <option value="Male">Male Only</option>
            <option value="Female">Female Only</option>
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value as any)}
            className="px-3 py-1.5 rounded-lg bg-[#0B1220] border border-[#24324A] text-[#F1F4F8] text-xs focus:border-[#5B8DEF]"
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="Closing Soon">Closing Soon</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Closed">Closed</option>
          </select>

          {/* State */}
          <select
            value={selectedState}
            onChange={e => setSelectedState(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-[#0B1220] border border-[#24324A] text-[#F1F4F8] text-xs focus:border-[#5B8DEF]"
          >
            <option value="All">All India</option>
            {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 ml-auto"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

        </div>

      </div>

      {/* Point 14: Clean Cards Layout */}
      {filteredRecruitments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRecruitments.map(rec => (
            <RecruitmentCard
              key={rec.id}
              recruitment={rec}
              onSelect={onSelectRecruitment}
            />
          ))}
        </div>
      ) : (
        <div className="drt-card p-12 text-center space-y-3">
          <Search className="w-10 h-10 text-[#718096] mx-auto" />
          <h3 className="text-base font-bold text-[#F1F4F8]">No recruitments found</h3>
          <p className="text-xs text-[#9AA8BA] max-w-sm mx-auto">
            Try adjusting your search keywords or clearing qualification and state filters.
          </p>
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 rounded-xl bg-[#5B8DEF] text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
