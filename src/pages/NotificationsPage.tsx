import React, { useState } from 'react';
import { useNotification } from '../context/NotificationContext';
import { Bell, CheckCheck, Clock, AlertTriangle, FileText, Award, Sparkles } from 'lucide-react';

interface NotificationsPageProps {
  setActiveTab: (tab: string) => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({ setActiveTab }) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotification();
  const [filter, setFilter] = useState<'All' | 'Unread'>('All');

  const displayed = notifications.filter(n => filter === 'All' || !n.isRead);

  // Group by Today & Earlier
  const todayDateStr = new Date().toISOString().split('T')[0];
  const todayList = displayed.filter(n => n.date.startsWith(todayDateStr));
  const earlierList = displayed.filter(n => !n.date.startsWith(todayDateStr));

  const renderNotificationCard = (n: any) => {
    const iconMap = {
      Deadline: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />,
      AdmitCard: <FileText className="w-4 h-4 text-[#5B8DEF] shrink-0" />,
      Result: <Award className="w-4 h-4 text-emerald-400 shrink-0" />,
      NewMatch: <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />,
      System: <Clock className="w-4 h-4 text-[#718096] shrink-0" />
    };

    return (
      <div
        key={n.id}
        onClick={() => {
          markAsRead(n.id);
          if (n.link) setActiveTab('explorer');
        }}
        className={`drt-card p-4 flex items-start gap-3 transition-all cursor-pointer ${
          n.isRead ? 'opacity-70 bg-[#0B1220]' : 'border-[#5B8DEF]/40'
        }`}
      >
        <div className="p-2 rounded-xl bg-[#162238] border border-[#24324A]">
          {iconMap[n.type as keyof typeof iconMap]}
        </div>

        <div className="flex-1 min-w-0 space-y-0.5">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-xs font-bold text-white leading-tight">{n.title}</h4>
            <span className="text-[10px] text-[#718096] shrink-0">{new Date(n.date).toLocaleDateString()}</span>
          </div>
          <p className="text-xs text-[#9AA8BA] leading-snug">{n.message}</p>
        </div>

        {!n.isRead && (
          <span className="w-2 h-2 rounded-full bg-[#5B8DEF] shrink-0 mt-1"></span>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="drt-card p-6 flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#5B8DEF]/15 text-[#5B8DEF] text-xs font-semibold border border-[#5B8DEF]/30 mb-1">
            <Bell className="w-3.5 h-3.5" />
            <span>NOTIFICATION CENTER</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#F1F4F8] tracking-tight">
            Notifications & Alerts
          </h1>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="px-3.5 py-2 rounded-xl bg-[#0B1220] border border-[#24324A] text-xs font-bold text-[#5B8DEF] hover:text-white flex items-center gap-1.5"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark All Read</span>
          </button>
        )}
      </div>

      {/* Point 24: Grouped Today & Earlier */}
      <div className="space-y-6">
        
        {todayList.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#718096] uppercase tracking-wider">Today</h3>
            <div className="space-y-2">
              {todayList.map(renderNotificationCard)}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <h3 className="text-xs font-bold text-[#718096] uppercase tracking-wider">
            {todayList.length > 0 ? 'Earlier' : 'All Notifications'}
          </h3>
          {earlierList.length > 0 ? (
            <div className="space-y-2">
              {earlierList.map(renderNotificationCard)}
            </div>
          ) : (
            <div className="drt-card p-8 text-center text-xs text-[#718096]">
              No earlier notifications found.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
