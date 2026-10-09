import React, { useState } from 'react';
import { Recruitment, Organization } from '../types';
import { RecruitmentCard } from '../components/common/RecruitmentCard';
import { 
  Shield, 
  Anchor, 
  Wind, 
  Award, 
  Waves, 
  Search, 
  Calculator, 
  Calendar, 
  Bookmark, 
  Bell, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Zap,
  FileCheck,
  Building2,
  ExternalLink
} from 'lucide-react';

interface LandingPageProps {
  recruitments: Recruitment[];
  setActiveTab: (tab: string) => void;
  onSelectRecruitment: (recruitment: Recruitment) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  recruitments,
  setActiveTab,
  onSelectRecruitment
}) => {
  const branches: { name: Organization; icon: React.ReactNode; desc: string; img: string }[] = [
    {
      name: 'Indian Army',
      icon: <Shield className="w-6 h-6 text-emerald-400" />,
      desc: 'Officer, Agniveer General Duty, Technical & Nursing entries.',
      img: '/images/army_parade.jpg'
    },
    {
      name: 'Indian Navy',
      icon: <Anchor className="w-6 h-6 text-blue-400" />,
      desc: 'Executive, Agniveer SSR, B.Tech Cadet & Naval Tech entries.',
      img: '/images/navy_ship.jpg'
    },
    {
      name: 'Indian Air Force',
      icon: <Wind className="w-6 h-6 text-sky-400" />,
      desc: 'AFCAT Flying/Ground Duty & Agniveervayu examinations.',
      img: '/images/airforce_jet.jpg'
    },
    {
      name: 'CAPF',
      icon: <Award className="w-6 h-6 text-slate-300" />,
      desc: 'UPSC Assistant Commandant & SSC CPO Sub-Inspector entries.',
      img: '/images/capf_jawans.jpg'
    },
    {
      name: 'Indian Coast Guard',
      icon: <Waves className="w-6 h-6 text-teal-400" />,
      desc: 'Navik General Duty, Yantrik & Assistant Commandant.',
      img: '/images/coast_guard_ship.jpg'
    }
  ];

  const closingSoonList = recruitments.filter(r => r.status === 'Closing Soon').slice(0, 3);
  const featuredRecruitments = recruitments.slice(0, 6);

  return (
    <div className="space-y-12 pb-12">
      
      {/* Realistic Hero Banner with Authentic Indian Army Parade Background */}
      <section className="relative rounded-3xl overflow-hidden border border-[#213459] shadow-2xl min-h-[460px] flex flex-col justify-center">
        
        {/* Background Photo Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/army_parade.jpg" 
            alt="Indian Army Officers Parade" 
            className="w-full h-full object-cover object-center filter brightness-45 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#091122]/95 via-[#091122]/85 to-[#091122]/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#091122] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column Text & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-white/10 to-emerald-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold tracking-wide backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>OFFICIAL INDIAN DEFENCE RECRUITMENT TRACKER 🇮🇳</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              Find Your Path to <span className="gradient-text-tricolor">Defence Service.</span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl font-normal drop-shadow">
              Discover official recruitments across the Indian Army, Indian Navy, Indian Air Force, CAPF, and Indian Coast Guard. Calculate eligibility and track deadlines accurately.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab('explorer')}
                className="px-7 py-4 rounded-2xl bg-[#5B8DEF] hover:bg-blue-600 text-white font-extrabold text-sm shadow-2xl shadow-blue-500/30 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Recruitments</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('eligibility')}
                className="px-7 py-4 rounded-2xl bg-[#121f38]/90 hover:bg-[#1b2b4d] text-slate-100 border border-[#263c69] font-bold text-sm flex items-center gap-2.5 transition-all backdrop-blur-md"
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Calculate Eligibility</span>
              </button>
            </div>

            {/* Highlights Bar */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300 border-t border-slate-700/60">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>15+ Live Defence Entries</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Automated Age & Qualification Check</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Direct Government Portals</span>
              </span>
            </div>
          </div>

          {/* Right Column: Urgent Closing Notifications Box */}
          <div className="lg:col-span-5 space-y-4">
            <div className="gov-card p-6 border border-[#213459] shadow-2xl space-y-4 backdrop-blur-md bg-[#0D1629]/90">
              <div className="flex items-center justify-between border-b border-[#1e2d4a] pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  <span>Closing Soon Notifications</span>
                </h3>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                  Urgent
                </span>
              </div>

              <div className="space-y-3">
                {closingSoonList.map(rec => (
                  <div 
                    key={rec.id}
                    onClick={() => onSelectRecruitment(rec)}
                    className="p-3.5 rounded-xl bg-[#080f1e] border border-[#1e2d4a] hover:border-blue-500/50 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-blue-400 line-clamp-1">
                        {rec.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {rec.organization} • {rec.qualification}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 shrink-0">
                      End: {rec.applicationEnd}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setActiveTab('explorer')}
                className="w-full text-center text-xs font-bold text-[#5B8DEF] hover:text-blue-300 pt-1 block transition-colors"
              >
                View all closing deadlines →
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Branch Section with Photos */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Explore Opportunities by Branch</h2>
          <p className="text-slate-400 text-sm">
            Track entry paths across Indian Army, Indian Navy, Indian Air Force, CAPF, and Coast Guard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {branches.map(branch => {
            const count = recruitments.filter(r => r.organization === branch.name).length;
            return (
              <div
                key={branch.name}
                className="gov-card overflow-hidden gov-card-hover flex flex-col justify-between group"
              >
                <div className="relative h-28 overflow-hidden">
                  <img 
                    src={branch.img} 
                    alt={branch.name}
                    className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131e36] via-transparent to-transparent"></div>
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#091122]/90 text-slate-200 border border-slate-700">
                    {count} Active
                  </span>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      {branch.icon}
                      <h3 className="text-base font-bold text-white">{branch.name}</h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{branch.desc}</p>
                  </div>

                  <button
                    onClick={() => setActiveTab('explorer')}
                    className="w-full py-2 px-3 rounded-xl bg-[#091122] hover:bg-slate-800 text-slate-200 border border-[#213459] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors mt-2"
                  >
                    <span>Explore Entries</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Grid */}
      <section className="gov-card p-8 border border-[#1e2d4a] space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Built for Serious Defence Aspirants</h2>
          <p className="text-slate-400 text-sm">
            Professional tools designed to keep candidate preparation structured and deadline-aware.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="p-5 rounded-2xl bg-[#0d1527] border border-[#1e2d4a] space-y-3">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 w-fit">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Smart Recruitment Search</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Filter by qualification (10th, 12th, Diploma, Graduate), age, branch category, and Indian state.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0d1527] border border-[#1e2d4a] space-y-3">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 w-fit">
              <Calculator className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Automated Eligibility Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Input DOB, height, and marks to receive preliminary match percentages and criterion explanations.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0d1527] border border-[#1e2d4a] space-y-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Recruitment Calendar</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Track closing dates, written examination schedules, admit cards, and SSB interviews.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0d1527] border border-[#1e2d4a] space-y-3">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 w-fit">
              <Bookmark className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Custom Watchlist</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bookmark target entries for direct deadline monitoring and alert tracking.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0d1527] border border-[#1e2d4a] space-y-3">
            <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 w-fit">
              <Bell className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Admit Cards & Merit Lists</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Direct access to released examination hall tickets and official result publications.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0d1527] border border-[#1e2d4a] space-y-3">
            <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 w-fit">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Verified Official Portals</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Direct verification links to `joinindianarmy.nic.in`, `joinindiannavy.gov.in`, `afcat.cdac.in`, and `upsc.gov.in`.
            </p>
          </div>

        </div>
      </section>

      {/* Featured Recruitments */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Active Recruitment Notifications</h2>
            <p className="text-slate-400 text-xs mt-1">Live entries open for online application.</p>
          </div>
          <button
            onClick={() => setActiveTab('explorer')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            <span>View All ({recruitments.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRecruitments.map(rec => (
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
