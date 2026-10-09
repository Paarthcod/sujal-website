import React, { useState } from 'react';
import { Recruitment, EventType } from '../types';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarPageProps {
  recruitments: Recruitment[];
  onSelectRecruitment: (recruitment: Recruitment) => void;
}

export const CalendarPage: React.FC<CalendarPageProps> = ({
  recruitments,
  onSelectRecruitment
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2026, 8, 1));
  const [selectedDateStr, setSelectedDateStr] = useState<string>('2026-09-12');
  const [filterType, setFilterType] = useState<EventType | 'All'>('All');

  const allEvents: {
    id: string;
    recruitment: Recruitment;
    title: string;
    date: string;
    type: EventType;
  }[] = [];

  recruitments.forEach(rec => {
    allEvents.push({
      id: `${rec.id}-deadline`,
      recruitment: rec,
      title: `${rec.organization}: ${rec.title} Closes`,
      date: rec.applicationEnd,
      type: 'Deadline'
    });

    allEvents.push({
      id: `${rec.id}-exam`,
      recruitment: rec,
      title: `${rec.organization}: ${rec.title} Written Exam`,
      date: rec.examDate,
      type: 'Exam'
    });

    allEvents.push({
      id: `${rec.id}-admit`,
      recruitment: rec,
      title: `${rec.organization}: ${rec.title} Admit Card`,
      date: rec.admitCardDate,
      type: 'AdmitCard'
    });

    allEvents.push({
      id: `${rec.id}-result`,
      recruitment: rec,
      title: `${rec.organization}: ${rec.title} Result`,
      date: rec.resultDate,
      type: 'Result'
    });
  });

  const filteredEvents = allEvents.filter(e => filterType === 'All' || e.type === filterType);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const monthName = currentMonth.toLocaleString('default', { month: 'long' });

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const formatDayDateStr = (day: number) => {
    const m = (month + 1).toString().padStart(2, '0');
    const d = day.toString().padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  const selectedDateEvents = filteredEvents.filter(e => e.date === selectedDateStr);

  const eventBadgeMap = {
    Deadline: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    Exam: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    AdmitCard: 'bg-[#5B8DEF]/15 text-[#5B8DEF] border-[#5B8DEF]/30',
    Result: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="drt-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 text-xs font-semibold border border-purple-500/30 mb-1">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>RECRUITMENT CALENDAR</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#F1F4F8] tracking-tight">
            Examination Schedule & Deadlines
          </h1>
          <p className="text-xs text-[#9AA8BA] mt-0.5">
            Track application deadlines, admit card releases, exams, and result declarations.
          </p>
        </div>

        {/* Point 23: Clean Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#0B1220] border border-[#24324A]">
          {['All', 'Deadline', 'Exam', 'AdmitCard', 'Result'].map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t as any)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                filterType === t 
                  ? 'bg-[#5B8DEF] text-white' 
                  : 'text-[#9AA8BA] hover:text-white'
              }`}
            >
              {t === 'Deadline' ? 'Deadlines' : t === 'AdmitCard' ? 'Admit Cards' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Grid & Side Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-8 drt-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-[#F1F4F8]">
              {monthName} {year}
            </h2>
            <div className="flex items-center gap-2">
              <button onClick={prevMonth} className="p-1.5 rounded-lg bg-[#0B1220] border border-[#24324A] text-[#9AA8BA] hover:text-white">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={nextMonth} className="p-1.5 rounded-lg bg-[#0B1220] border border-[#24324A] text-[#9AA8BA] hover:text-white">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-bold text-[#718096] border-b border-[#24324A] pb-2">
            <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: firstDayIndex }).map((_, idx) => (
              <div key={`blank-${idx}`} className="h-20 rounded-xl bg-[#0B1220]/40 opacity-20"></div>
            ))}

            {daysArray.map(day => {
              const dateStr = formatDayDateStr(day);
              const dayEvents = filteredEvents.filter(e => e.date === dateStr);
              const isSelected = dateStr === selectedDateStr;

              return (
                <div
                  key={day}
                  onClick={() => setSelectedDateStr(dateStr)}
                  className={`h-20 p-1.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between overflow-hidden ${
                    isSelected 
                      ? 'bg-[#5B8DEF]/15 border-[#5B8DEF] ring-1 ring-[#5B8DEF]' 
                      : dayEvents.length > 0 
                        ? 'bg-[#162238] border-[#24324A] hover:border-[#5B8DEF]/50' 
                        : 'bg-[#0B1220] border-[#24324A]/60'
                  }`}
                >
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded w-fit ${
                    isSelected ? 'bg-[#5B8DEF] text-white' : 'text-[#9AA8BA]'
                  }`}>
                    {day}
                  </span>

                  <div className="space-y-1 overflow-hidden">
                    {dayEvents.slice(0, 1).map(ev => (
                      <div
                        key={ev.id}
                        className={`text-[9px] font-semibold truncate px-1 py-0.5 rounded border ${eventBadgeMap[ev.type]}`}
                      >
                        {ev.type === 'Deadline' ? 'End' : ev.type === 'Exam' ? 'Exam' : ev.type === 'AdmitCard' ? 'Admit' : 'Result'}
                      </div>
                    ))}
                    {dayEvents.length > 1 && (
                      <span className="text-[9px] text-[#718096] font-semibold block">
                        +{dayEvents.length - 1} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Side Event Panel */}
        <div className="lg:col-span-4 drt-card p-5 space-y-4 h-fit">
          <div className="border-b border-[#24324A] pb-3">
            <span className="text-[10px] uppercase font-bold text-[#718096]">Selected Date</span>
            <h3 className="text-sm font-extrabold text-[#F1F4F8]">{selectedDateStr}</h3>
          </div>

          {selectedDateEvents.length > 0 ? (
            <div className="space-y-3">
              {selectedDateEvents.map(ev => (
                <div
                  key={ev.id}
                  onClick={() => onSelectRecruitment(ev.recruitment)}
                  className="p-3.5 rounded-xl bg-[#0B1220] border border-[#24324A] hover:border-[#5B8DEF]/40 cursor-pointer transition-all space-y-1.5 group"
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${eventBadgeMap[ev.type]}`}>
                      {ev.type}
                    </span>
                    <span className="text-[10px] text-[#718096]">{ev.recruitment.organization}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-[#5B8DEF] transition-colors">{ev.recruitment.title}</h4>
                  <button className="text-[11px] font-semibold text-[#5B8DEF] hover:underline pt-1">
                    View Details →
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-xs text-[#718096]">
              No events scheduled on {selectedDateStr}.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
