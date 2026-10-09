import React, { useState } from 'react';
import { ResultRecord } from '../../types';
import { storage } from '../../services/storage';
import { useNotification } from '../../context/NotificationContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Award, Trash2 } from 'lucide-react';

export const AdminResults: React.FC = () => {
  const { showToast } = useNotification();
  const [results, setResults] = useState<ResultRecord[]>(() => storage.getResults());

  const handleStatusToggle = (res: ResultRecord) => {
    const newStatus: ResultRecord['status'] = res.status === 'Published' ? 'Awaited' : 'Published';
    const updated = { ...res, status: newStatus };
    storage.saveResult(updated);
    setResults(storage.getResults());
    showToast('Result Status Updated', `Updated "${res.recruitmentTitle}" to ${newStatus}.`, 'success');
  };

  const handleDelete = (id: string) => {
    storage.deleteResult(id);
    setResults(storage.getResults());
    showToast('Result Record Deleted', 'Entry removed.', 'info');
  };

  return (
    <div className="space-y-6">
      
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>RESULT & MERIT LIST MANAGEMENT</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Manage Exam Results & Merit Lists
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Publish result announcements, official selection lists, and merit PDF links.
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
                <th className="px-4 py-3.5">Result Date</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {results.map(res => (
                <tr key={res.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="px-5 py-4 font-bold text-white max-w-sm truncate">{res.recruitmentTitle}</td>
                  <td className="px-4 py-4 font-semibold text-slate-300">{res.organization}</td>
                  <td className="px-4 py-4 font-semibold text-emerald-400">{res.resultDate}</td>
                  <td className="px-4 py-4">
                    <StatusBadge status={res.status} />
                  </td>
                  <td className="px-5 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleStatusToggle(res)}
                      className="px-3 py-1 rounded-lg bg-blue-600/20 text-blue-300 border border-blue-500/30 text-[11px] font-bold"
                    >
                      Toggle Status
                    </button>
                    <button
                      onClick={() => handleDelete(res.id)}
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
