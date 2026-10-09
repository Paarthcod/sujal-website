import React from 'react';
import { Recruitment } from '../../types';
import { storage, computeDaysRemaining } from '../../services/storage';
import { StatCard } from '../../components/common/StatCard';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import { 
  ShieldCheck, 
  Users, 
  Briefcase, 
  Clock, 
  Calendar,
  ArrowRight
} from 'lucide-react';

interface AdminDashboardProps {
  recruitments: Recruitment[];
  setActiveTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ recruitments, setActiveTab }) => {
  const stats = storage.getStats();

  const orgData = [
    { name: 'Army', count: recruitments.filter(r => r.organization === 'Indian Army').length },
    { name: 'Navy', count: recruitments.filter(r => r.organization === 'Indian Navy').length },
    { name: 'Air Force', count: recruitments.filter(r => r.organization === 'Indian Air Force').length },
    { name: 'CAPF', count: recruitments.filter(r => r.organization === 'CAPF').length },
    { name: 'Coast Guard', count: recruitments.filter(r => r.organization === 'Indian Coast Guard').length },
  ];

  const statusData = [
    { name: 'Open', value: recruitments.filter(r => r.status === 'Open').length, color: '#10b981' },
    { name: 'Closing Soon', value: recruitments.filter(r => r.status === 'Closing Soon').length, color: '#f59e0b' },
    { name: 'Upcoming', value: recruitments.filter(r => r.status === 'Upcoming').length, color: '#3b82f6' },
    { name: 'Closed', value: recruitments.filter(r => r.status === 'Closed').length, color: '#64748b' }
  ];

  const recentUpdates = recruitments.slice(0, 4);
  const upcomingDeadlines = recruitments.filter(r => r.status === 'Closing Soon').slice(0, 4);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="drt-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 text-xs font-semibold border border-amber-500/30 mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ADMINISTRATION OVERVIEW</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#F1F4F8] tracking-tight">
            Admin Analytics Dashboard
          </h1>
          <p className="text-xs text-[#9AA8BA] mt-0.5">
            Platform metrics, recruitment distributions, and system activity logs.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('admin-recruitments')}
          className="px-4 py-2 rounded-xl bg-[#5B8DEF] hover:bg-blue-600 text-white text-xs font-bold shadow"
        >
          + Add Recruitment
        </button>
      </div>

      {/* Point 16: 4 Cards: Total Recruitments, Active, Closing Soon, Total Users */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Recruitments"
          value={recruitments.length}
          subtitle="All published entries"
          icon={<Briefcase className="w-5 h-5" />}
          accentColor="blue"
        />

        <StatCard
          title="Active Opportunities"
          value={stats.activeRecruitments}
          subtitle="Open & Closing Soon"
          icon={<Clock className="w-5 h-5" />}
          accentColor="emerald"
        />

        <StatCard
          title="Closing Soon"
          value={stats.closingSoonCount}
          subtitle="Deadlines within 7 days"
          icon={<Calendar className="w-5 h-5" />}
          accentColor="amber"
        />

        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          subtitle="Registered aspirants"
          icon={<Users className="w-5 h-5" />}
          accentColor="purple"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-7 drt-card p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#718096]">Recruitment Activity by Organization</h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orgData}>
                <XAxis dataKey="name" stroke="#718096" fontSize={11} />
                <YAxis stroke="#718096" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#111B2E', borderColor: '#24324A', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="count" fill="#5B8DEF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-5 drt-card p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#718096]">Status Breakdown</h3>
          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                  {statusData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#111B2E', borderColor: '#24324A', borderRadius: '8px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Recent Updates & Upcoming Deadlines List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-6 drt-card p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#718096]">Recent Updates</h3>
          <div className="space-y-2.5">
            {recentUpdates.map(rec => (
              <div key={rec.id} className="p-3 rounded-xl bg-[#0B1220] border border-[#24324A] flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-white line-clamp-1">{rec.title}</h4>
                  <p className="text-[11px] text-[#718096]">{rec.organization}</p>
                </div>
                <button onClick={() => setActiveTab('admin-recruitments')} className="text-[#5B8DEF] font-semibold">Edit →</button>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 drt-card p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#718096]">Upcoming Deadlines</h3>
          <div className="space-y-2.5">
            {upcomingDeadlines.map(rec => (
              <div key={rec.id} className="p-3 rounded-xl bg-[#0B1220] border border-[#24324A] flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-white line-clamp-1">{rec.title}</h4>
                  <p className="text-[11px] text-[#718096]">Closes: {rec.applicationEnd}</p>
                </div>
                <span className="text-amber-300 font-bold">{computeDaysRemaining(rec.applicationEnd)}d left</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
