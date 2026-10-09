import React from 'react';
import { Recruitment } from '../types';
import { useAuth } from '../context/AuthContext';
import { StatCard } from '../components/common/StatCard';
import { RecruitmentCard } from '../components/common/RecruitmentCard';
import { storage, computeDaysRemaining } from '../services/storage';
import { 
  Shield, 
  Clock, 
  Bookmark, 
  Calendar as CalendarIcon, 
  Calculator, 
  ArrowRight,
  Compass,
  FileText,
  Award
} from 'lucide-react';

interface DashboardPageProps {
  recruitments: Recruitment[];
  setActiveTab: (tab: string) => void;
  onSelectRecruitment: (recruitment: Recruitment) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  recruitments,
  setActiveTab,
  onSelectRecruitment
}) => {
  const { user } = useAuth();
  const stats = storage.getStats();

  const userBookmarks = user ? storage.getBookmarks(user.id) : [];
  const bookmarkedRecruitments = recruitments.filter(r => userBookmarks.some(b => b.recruitmentId === r.id));
  const closingSoonList = recruitments.filter(r => r.status === 'Closing Soon').slice(0, 3);

  const upcomingExams = recruitments
    .filter(r => new Date(r.examDate) >= new Date())
    .sort((a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime())
    .slice(0, 3);

  const recommendedList = recruitments.slice(0, 3);

  return (
    <div className="space-y-8">
      
      {/* Point 7 & 8: Compact Dashboard Welcome Panel */}
      <div className="drt-card p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F1F4F8] tracking-tight">
            Good morning, {user?.name.split(' ')[0] || 'Aspirant'}
          </h1>
          <p className="text-sm text-[#9AA8BA] leading-relaxed">
            Find your path to defence. Explore current recruitment opportunities, check your preliminary eligibility and stay ahead of important deadlines.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('explorer')}
              className="px-4 py-2.5 rounded-xl bg-[#5B8DEF] hover:bg-blue-600 text-white font-bold text-xs shadow transition-colors flex items-center gap-1.5"
            >
              <span>Explore Recruitments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActiveTab('eligibility')}
              className="px-4 py-2.5 rounded-xl bg-[#162238] hover:bg-[#1f2d47] text-[#F1F4F8] border border-[#24324A] font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              <span>Check Eligibility</span>
            </button>
          </div>
        </div>

        {/* Small Next Deadline Highlight Card */}
        {closingSoonList.length > 0 && (
          <div 
            onClick={() => onSelectRecruitment(closingSoonList[0])}
            className="p-4 rounded-2xl bg-[#0B1220] border border-[#24324A] hover:border-[#5B8DEF]/50 cursor-pointer transition-all space-y-1.5 w-full md:w-64 shrink-0"
          >
            <div className="flex items-center justify-between text-[10px] font-bold text-amber-300">
              <span className="uppercase tracking-wider">Next Urgent Deadline</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-500/20 border border-amber-500/30">
                {computeDaysRemaining(closingSoonList[0].applicationEnd)} Days
              </span>
            </div>
            <h4 className="text-xs font-bold text-[#F1F4F8] line-clamp-1">{closingSoonList[0].title}</h4>
            <p className="text-[11px] text-[#9AA8BA]">{closingSoonList[0].organization} • Closes {closingSoonList[0].applicationEnd}</p>
          </div>
        )}
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Recruitments"
          value={stats.activeRecruitments}
          subtitle="Army, Navy, Air Force, CAPF & Coast Guard"
          icon={<Shield className="w-5 h-5" />}
          accentColor="blue"
        />

        <StatCard
          title="Closing Soon"
          value={stats.closingSoonCount}
          subtitle="Application deadline within 7 days"
          icon={<Clock className="w-5 h-5" />}
          accentColor="amber"
        />

        <StatCard
          title="Saved Recruitments"
          value={userBookmarks.length}
          subtitle="In your saved watchlist"
          icon={<Bookmark className="w-5 h-5" />}
          accentColor="emerald"
        />

        <StatCard
          title="Upcoming Exams"
          value={stats.upcomingExamsCount}
          subtitle="Scheduled examination dates"
          icon={<CalendarIcon className="w-5 h-5" />}
          accentColor="purple"
        />
      </div>

      {/* Point 10: Quick Actions Row (4 Icon Cards) */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#718096]">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Explore Recruitments', icon: <Compass className="w-4 h-4 text-[#5B8DEF]" />, tab: 'explorer' },
            { label: 'Check Eligibility', icon: <Calculator className="w-4 h-4 text-amber-400" />, tab: 'eligibility' },
            { label: 'View Saved', icon: <Bookmark className="w-4 h-4 text-emerald-400" />, tab: 'bookmarks' },
            { label: 'View Calendar', icon: <CalendarIcon className="w-4 h-4 text-purple-400" />, tab: 'calendar' }
          ].map(action => (
            <button
              key={action.tab}
              onClick={() => setActiveTab(action.tab)}
              className="p-3.5 rounded-2xl bg-[#111B2E] border border-[#24324A] hover:border-[#5B8DEF]/50 text-left transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-[#0B1220] border border-[#24324A] group-hover:border-[#5B8DEF]/30">
                {action.icon}
              </div>
              <span className="text-xs font-semibold text-[#F1F4F8] group-hover:text-[#5B8DEF] transition-colors">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Point 11: Closing Soon Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#F1F4F8]">Closing Soon</h2>
            <p className="text-xs text-[#9AA8BA]">Recruitments requiring your immediate attention.</p>
          </div>
          <button
            onClick={() => setActiveTab('explorer')}
            className="text-xs font-semibold text-[#5B8DEF] hover:text-blue-300 flex items-center gap-1"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {closingSoonList.map(rec => {
            const daysLeft = computeDaysRemaining(rec.applicationEnd);
            return (
              <div
                key={rec.id}
                onClick={() => onSelectRecruitment(rec)}
                className="drt-card p-4 flex flex-col justify-between cursor-pointer group hover:border-amber-500/40 transition-all space-y-3"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-[#9AA8BA] uppercase">{rec.organization}</span>
                  <h3 className="text-xs font-bold text-[#F1F4F8] group-hover:text-amber-300 transition-colors line-clamp-1">{rec.title}</h3>
                  <p className="text-[11px] text-[#718096]">Closes: <strong className="text-slate-200">{rec.applicationEnd}</strong></p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#24324A]">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    {daysLeft <= 0 ? 'Closes Today' : `${daysLeft} days left`}
                  </span>
                  <button className="text-xs font-semibold text-[#5B8DEF] hover:underline">
                    View Details →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Point 12: Upcoming Exams */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#F1F4F8]">Upcoming Exams</h2>
            <p className="text-xs text-[#9AA8BA]">Scheduled examination dates for candidate preparation.</p>
          </div>
          <button
            onClick={() => setActiveTab('calendar')}
            className="text-xs font-semibold text-[#5B8DEF] hover:text-blue-300 flex items-center gap-1"
          >
            <span>View calendar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {upcomingExams.map(rec => {
            const daysLeft = computeDaysRemaining(rec.examDate);
            return (
              <div
                key={rec.id}
                onClick={() => onSelectRecruitment(rec)}
                className="drt-card p-4 flex flex-col justify-between cursor-pointer group hover:border-[#5B8DEF]/40 transition-all space-y-3"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-[#9AA8BA] uppercase">{rec.organization}</span>
                  <h3 className="text-xs font-bold text-[#F1F4F8] group-hover:text-[#5B8DEF] transition-colors line-clamp-1">{rec.title}</h3>
                  <p className="text-[11px] text-[#718096]">Exam Date: <strong className="text-slate-200">{rec.examDate}</strong></p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#24324A]">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#5B8DEF]/15 text-[#5B8DEF] border border-[#5B8DEF]/30">
                    {daysLeft} days until exam
                  </span>
                  <button className="text-xs font-semibold text-[#5B8DEF] hover:underline">
                    View Details →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recommended For You Section */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#F1F4F8]">Recommended For You</h2>
            <p className="text-xs text-[#9AA8BA]">Recruitments matching your profile parameters.</p>
          </div>
          <button
            onClick={() => setActiveTab('explorer')}
            className="text-xs font-semibold text-[#5B8DEF] hover:text-blue-300"
          >
            View all →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedList.map(rec => (
            <RecruitmentCard
              key={rec.id}
              recruitment={rec}
              onSelect={onSelectRecruitment}
            />
          ))}
        </div>
      </section>

    </div>
  );
};
