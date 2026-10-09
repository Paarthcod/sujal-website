import React, { useState } from 'react';
import { AdmitCard, Organization } from '../../types';
import { storage } from '../../services/storage';
import { useNotification } from '../../context/NotificationContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { FileText, Plus, Edit3, Trash2 } from 'lucide-react';

export const AdminAdmitCards: React.FC = () => {
  const { showToast } = useNotification();
  const [admitCards, setAdmitCards] = useState<AdmitCard[]>(() => storage.getAdmitCards());

  const handleStatusToggle = (card: AdmitCard) => {
    const newStatus: AdmitCard['status'] = card.status === 'Available' ? 'Coming Soon' : 'Available';
    const updated = { ...card, status: newStatus };
    storage.saveAdmitCard(updated);
    setAdmitCards(storage.getAdmitCards());
    showToast('Admit Card Updated', `Updated "${card.recruitmentTitle}" status to ${newStatus}.`, 'success');
  };

  const handleDelete = (id: string) => {
    storage.deleteAdmitCard(id);
    setAdmitCards(storage.getAdmitCards());
    showToast('Admit Card Removed', 'Entry deleted successfully.', 'info');
  };

  return (
    <div className="space-y-6">
      
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-bold border border-amber-500/30 mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>ADMIT CARD MANAGEMENT</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Manage Examination Hall Tickets
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Publish admit card download links, toggle availability, and set release dates.
          </p>
        </div>
      </div>

      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Recruitment Title</th>
                <th className="px-4 py-3.5">Organization</th>
                <th className="px-4 py-3.5">Release Date</th>
                <th className="px-4 py-3.5">Exam Date</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {admitCards.map(card => (
                <tr key={card.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="px-5 py-4 font-bold text-white max-w-sm truncate">{card.recruitmentTitle}</td>
                  <td className="px-4 py-4 font-semibold text-slate-300">{card.organization}</td>
                  <td className="px-4 py-4 font-semibold text-amber-400">{card.releaseDate}</td>
                  <td className="px-4 py-4 font-semibold text-purple-400">{card.examDate}</td>
                  <td className="px-4 py-4">
                    <StatusBadge status={card.status} />
                  </td>
                  <td className="px-5 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleStatusToggle(card)}
                      className="px-3 py-1 rounded-lg bg-blue-600/20 text-blue-300 border border-blue-500/30 text-[11px] font-bold"
                    >
                      Toggle Status
                    </button>
                    <button
                      onClick={() => handleDelete(card.id)}
                      className="p-1 rounded-lg bg-rose-600/20 text-rose-400 border border-rose-500/30"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
