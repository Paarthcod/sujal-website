import React from 'react';
import { Recruitment } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { getOrgBadgeStyle, getOrgIcon, getRecruitmentImage } from '../components/common/RecruitmentCard';
import { computeDaysRemaining, storage } from '../services/storage';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { 
  ArrowLeft, 
  Bookmark, 
  ExternalLink, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  GraduationCap, 
  Users, 
  Ruler, 
  Award, 
  AlertTriangle,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface RecruitmentDetailPageProps {
  recruitment: Recruitment;
  onBack: () => void;
  onCheckEligibility?: (recruitment: Recruitment) => void;
}

export const RecruitmentDetailPage: React.FC<RecruitmentDetailPageProps> = ({
  recruitment,
  onBack,
  onCheckEligibility
}) => {
  const { user } = useAuth();
  const { showToast } = useNotification();
  const daysRemaining = computeDaysRemaining(recruitment.applicationEnd);

  const isBookmarked = user ? storage.isBookmarked(user.id, recruitment.id) : false;

  const handleBookmarkToggle = () => {
    if (!user) {
      showToast('Login Required', 'Please sign in to save this recruitment.', 'warning');
      return;
    }
    const added = storage.toggleBookmark(user.id, recruitment.id);
    showToast(
      added ? 'Saved to Bookmarks' : 'Removed Bookmark',
      added ? `Saved "${recruitment.title}" to your bookmarks.` : 'Removed from bookmarks.',
      added ? 'success' : 'info'
    );
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Navigation Back */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#9AA8BA] hover:text-white bg-[#111B2E] px-3.5 py-2 rounded-xl border border-[#24324A] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Recruitments</span>
      </button>

      {/* Point 32: Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Main Column (2/3 width) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Info Box with Hero Image */}
          <div className="drt-card overflow-hidden">
            <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-[#091122]">
              <img 
                src={getRecruitmentImage(recruitment)} 
                alt={recruitment.title}
                className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111B2E] via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md ${getOrgBadgeStyle(recruitment.organization)}`}>
                  {getOrgIcon(recruitment.organization)}
                  {recruitment.organization}
                </span>

                {recruitment.verifiedOfficial && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#5B8DEF]/90 text-white shadow-md">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Official Verified
                  </span>
                )}
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#F1F4F8] leading-snug">
                  {recruitment.title}
                </h1>
                <p className="text-xs text-[#9AA8BA] mt-1.5">
                  {recruitment.category} • Branch: <strong className="text-slate-200">{recruitment.branch}</strong> • Vacancies: <strong className="text-amber-300">{recruitment.vacancies.toLocaleString()} Posts</strong>
                </p>
              </div>

              <p className="text-xs text-[#9AA8BA] leading-relaxed border-t border-[#24324A] pt-4">
                {recruitment.description}
              </p>
            </div>
          </div>

          {/* Timeline Schedule */}
          <div className="drt-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#F1F4F8] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#5B8DEF]" />
              <span>Schedule & Timeline</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
              {[
                { label: 'Notification', date: recruitment.notificationDate },
                { label: 'App Opens', date: recruitment.applicationStart },
                { label: 'App Closes', date: recruitment.applicationEnd, highlight: true },
                { label: 'Admit Card', date: recruitment.admitCardDate },
                { label: 'Written Exam', date: recruitment.examDate },
                { label: 'Result Date', date: recruitment.resultDate }
              ].map((item, idx) => (
                <div key={idx} className={`p-3 rounded-xl border ${item.highlight ? 'bg-amber-500/10 border-amber-500/30' : 'bg-[#0B1220] border-[#24324A]'}`}>
                  <p className="text-[10px] text-[#718096] uppercase font-semibold">{item.label}</p>
                  <p className="text-xs font-bold text-[#F1F4F8] mt-0.5">{item.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div className="drt-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#F1F4F8] flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>Detailed Eligibility Criteria</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[#24324A] space-y-1">
                <div className="flex items-center gap-2 text-[#5B8DEF] font-bold">
                  <Users className="w-4 h-4" />
                  <span>Age Criteria</span>
                </div>
                <p className="text-slate-200 font-extrabold text-sm">{recruitment.minAge} – {recruitment.maxAge} Years</p>
                <p className="text-[11px] text-[#718096]">As per cutoff rules in official notification.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[#24324A] space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <GraduationCap className="w-4 h-4" />
                  <span>Education</span>
                </div>
                <p className="text-slate-200 font-extrabold text-sm">{recruitment.qualification}</p>
                <p className="text-[11px] text-[#718096]">Min aggregate: <strong>{recruitment.minPercentage}% marks</strong>.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[#24324A] space-y-1">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <Ruler className="w-4 h-4" />
                  <span>Height</span>
                </div>
                <p className="text-slate-200 font-extrabold text-sm">Min {recruitment.minHeightCm} cm</p>
                <p className="text-[11px] text-[#718096]">Standard physical measurements apply.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[#24324A] space-y-1">
                <div className="flex items-center gap-2 text-purple-400 font-bold">
                  <Award className="w-4 h-4" />
                  <span>Gender</span>
                </div>
                <p className="text-slate-200 font-extrabold text-sm">{recruitment.gender === 'All' ? 'Male & Female' : `${recruitment.gender} Only`}</p>
                <p className="text-[11px] text-[#718096]">Unmarried status required.</p>
              </div>
            </div>
          </div>

          {/* Selection Pipeline */}
          <div className="drt-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#F1F4F8] flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Selection Pipeline</span>
            </h3>

            <div className="space-y-2.5">
              {recruitment.selectionProcess.map(step => (
                <div 
                  key={step.stepNumber}
                  className="p-3.5 rounded-xl bg-[#0B1220] border border-[#24324A] flex items-start gap-3"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#5B8DEF]/20 text-[#5B8DEF] font-bold text-xs flex items-center justify-center shrink-0 border border-[#5B8DEF]/30">
                    {step.stepNumber}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{step.title}</h4>
                    <p className="text-xs text-[#9AA8BA] mt-0.5">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents Checklist */}
          <div className="drt-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#F1F4F8] flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Required Documents</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {recruitment.requiredDocuments.map((doc, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#0B1220] border border-[#24324A] flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white">{doc.name}</h4>
                    <p className="text-[11px] text-[#718096] mt-0.5">{doc.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sticky Card (1/3 width) */}
        <div className="lg:col-span-4 space-y-4 sticky top-20">
          
          <div className="drt-card p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#24324A] pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#718096]">Application Details</span>
              <StatusBadge status={recruitment.status} />
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-[#24324A]/60">
                <span className="text-[#9AA8BA]">Deadline Date</span>
                <strong className="text-white font-bold">{recruitment.applicationEnd}</strong>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-[#24324A]/60">
                <span className="text-[#9AA8BA]">Days Remaining</span>
                <strong className={`font-bold ${daysRemaining <= 3 ? 'text-rose-400' : 'text-amber-400'}`}>
                  {daysRemaining < 0 ? 'Closed' : `${daysRemaining} Days`}
                </strong>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-[#24324A]/60">
                <span className="text-[#9AA8BA]">Total Vacancies</span>
                <strong className="text-white font-bold">{recruitment.vacancies.toLocaleString()}</strong>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <a
                href={recruitment.officialApplyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#5B8DEF] hover:bg-blue-600 text-white text-xs font-bold shadow flex items-center justify-center gap-2 transition-colors"
              >
                <span>Apply on Official Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={recruitment.officialNotificationUrl || recruitment.officialWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#162238] hover:bg-[#1f2e4b] border border-[#24324A] text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <span>View Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#5B8DEF]" />
              </a>

              <button
                onClick={handleBookmarkToggle}
                className={`w-full py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                  isBookmarked 
                    ? 'bg-amber-500/15 border-amber-500/30 text-amber-300' 
                    : 'bg-[#162238] border-[#24324A] text-slate-300 hover:text-white'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                <span>{isBookmarked ? 'Bookmarked' : 'Bookmark Opportunity'}</span>
              </button>

              {onCheckEligibility && (
                <button
                  onClick={() => onCheckEligibility(recruitment)}
                  className="w-full py-2.5 rounded-xl bg-[#0B1220] border border-[#24324A] hover:border-[#5B8DEF] text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Check Preliminary Eligibility</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="pt-2 text-[11px] text-[#718096] text-center leading-snug">
              Always verify conditions on the official notification before submitting your application.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
            <p className="leading-snug">
              DRT is an educational project. Verify details against official government recruitment notifications.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
