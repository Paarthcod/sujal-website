import React from 'react';
import { Recruitment, Organization } from '../../types';
import { StatusBadge } from './StatusBadge';
import { computeDaysRemaining, storage } from '../../services/storage';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { 
  Shield, 
  Anchor, 
  Wind, 
  Award, 
  Waves, 
  Calendar, 
  GraduationCap, 
  Bookmark as BookmarkIcon, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface RecruitmentCardProps {
  recruitment: Recruitment;
  onSelect: (recruitment: Recruitment) => void;
  onBookmarkToggle?: () => void;
  matchScore?: number;
}

export const getOrgBadgeStyle = (org: Organization) => {
  switch (org) {
    case 'Indian Army':
      return 'org-badge-army';
    case 'Indian Navy':
      return 'org-badge-navy';
    case 'Indian Air Force':
      return 'org-badge-airforce';
    case 'CAPF':
      return 'org-badge-capf';
    case 'Indian Coast Guard':
      return 'org-badge-coastguard';
    default:
      return 'bg-slate-800 text-slate-200 border-slate-700';
  }
};

export const getOrgIcon = (org: Organization) => {
  switch (org) {
    case 'Indian Army':
      return <Shield className="w-4 h-4 text-[#a3b893]" />;
    case 'Indian Navy':
      return <Anchor className="w-4 h-4 text-[#8daed8]" />;
    case 'Indian Air Force':
      return <Wind className="w-4 h-4 text-[#9cb6d6]" />;
    case 'CAPF':
      return <Award className="w-4 h-4 text-slate-300" />;
    case 'Indian Coast Guard':
      return <Waves className="w-4 h-4 text-[#7ab8b3]" />;
  }
};

export const getRecruitmentImage = (rec: Recruitment): string => {
  if (rec.imageUrl) return rec.imageUrl;
  switch (rec.organization) {
    case 'Indian Army':
      if (rec.id.includes('tes') || rec.category === 'Technical Entry') return '/images/army_tank.jpg';
      if (rec.id.includes('nda') || rec.category === 'Officer Entry') return '/images/defence_academy.jpg';
      if (rec.category === 'Medical Entry') return '/images/defence_academy.jpg';
      return '/images/army_parade.jpg';
    case 'Indian Navy':
      if (rec.id.includes('inet') || rec.category === 'Officer Entry') return '/images/navy_submarine.jpg';
      return '/images/navy_ship.jpg';
    case 'Indian Air Force':
      if (rec.id.includes('agniveervayu')) return '/images/airforce_helicopter.jpg';
      return '/images/airforce_jet.jpg';
    case 'CAPF':
      if (rec.id.includes('cpo')) return '/images/army_rifleman.jpg';
      return '/images/capf_jawans.jpg';
    case 'Indian Coast Guard':
      return '/images/coast_guard_ship.jpg';
    default:
      return '/images/army_parade.jpg';
  }
};

export const RecruitmentCard: React.FC<RecruitmentCardProps> = ({
  recruitment,
  onSelect,
  onBookmarkToggle,
  matchScore
}) => {
  const { user } = useAuth();
  const { showToast } = useNotification();
  const daysRemaining = computeDaysRemaining(recruitment.applicationEnd);
  
  const isBookmarked = user ? storage.isBookmarked(user.id, recruitment.id) : false;
  const cardImg = getRecruitmentImage(recruitment);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      showToast('Authentication Required', 'Please log in to save recruitments.', 'warning');
      return;
    }

    const added = storage.toggleBookmark(user.id, recruitment.id);
    showToast(
      added ? 'Bookmark Added' : 'Bookmark Removed',
      added ? `Saved "${recruitment.title}" to your bookmarks.` : 'Removed from bookmarks.',
      added ? 'success' : 'info'
    );
    if (onBookmarkToggle) onBookmarkToggle();
  };

  return (
    <div 
      onClick={() => onSelect(recruitment)}
      className="drt-card overflow-hidden drt-card-hover flex flex-col justify-between cursor-pointer group transition-all"
    >
      {/* Top Banner Image with Overlay */}
      <div className="relative h-36 w-full overflow-hidden bg-[#091122]">
        <img 
          src={cardImg} 
          alt={recruitment.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 filter brightness-90 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111B2E] via-transparent to-black/40"></div>

        {/* Top Badges over image */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border shadow-md backdrop-blur-md ${getOrgBadgeStyle(recruitment.organization)}`}>
            {getOrgIcon(recruitment.organization)}
            {recruitment.organization}
          </span>

          <div className="flex items-center gap-1.5">
            {matchScore !== undefined && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/90 text-amber-950 shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                {matchScore}% Match
              </span>
            )}
            <StatusBadge status={recruitment.status} />
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Title & Category */}
          <h3 className="text-sm sm:text-base font-bold text-[#F1F4F8] group-hover:text-[#5B8DEF] transition-colors line-clamp-2 leading-snug">
            {recruitment.title}
          </h3>
          <p className="text-xs text-[#9AA8BA] mt-1.5 line-clamp-1">
            {recruitment.category} • {recruitment.branch}
          </p>

          {/* Metadata Row */}
          <div className="mt-3 pt-3 border-t border-[#24324A] grid grid-cols-2 gap-2 text-xs text-[#9AA8BA]">
            <div className="flex items-center gap-1.5 truncate">
              <GraduationCap className="w-3.5 h-3.5 text-[#5B8DEF] shrink-0" />
              <span className="truncate">{recruitment.qualification}</span>
            </div>

            <div className="flex items-center gap-1.5 truncate">
              <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">Closes: <strong className="text-[#F1F4F8] font-semibold">{recruitment.applicationEnd}</strong></span>
            </div>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="pt-3 border-t border-[#24324A] flex items-center justify-between">
          <span className="text-xs text-[#718096]">
            {daysRemaining >= 0 ? `${daysRemaining} days left` : 'Closed'}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmarkClick}
              className={`p-1.5 rounded-lg border transition-colors ${
                isBookmarked 
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' 
                  : 'bg-[#162238] border-[#24324A] text-[#718096] hover:text-white'
              }`}
              title={isBookmarked ? 'Remove Bookmark' : 'Save Recruitment'}
            >
              <BookmarkIcon className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            </button>

            <button
              onClick={() => onSelect(recruitment)}
              className="text-xs font-semibold text-[#5B8DEF] hover:text-blue-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
