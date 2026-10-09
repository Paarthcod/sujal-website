import React, { useState } from 'react';
import { Recruitment, Organization, QualificationLevel, RecruitmentCategory } from '../../types';
import { storage } from '../../services/storage';
import { useNotification } from '../../context/NotificationContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  MoreVertical,
  Copy,
  Archive
} from 'lucide-react';

interface AdminRecruitmentsProps {
  recruitments: Recruitment[];
  onRefresh: () => void;
}

export const AdminRecruitments: React.FC<AdminRecruitmentsProps> = ({ recruitments, onRefresh }) => {
  const { showToast } = useNotification();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecruitment, setEditingRecruitment] = useState<Recruitment | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const initialForm: Recruitment = {
    id: '',
    title: '',
    organization: 'Indian Army',
    category: 'Officer Entry',
    branch: 'General Cadre',
    qualification: '12th Pass',
    minAge: 16.5,
    maxAge: 19.5,
    minPercentage: 60,
    gender: 'All',
    minHeightCm: 157,
    statesAllowed: ['All India'],
    vacancies: 300,
    notificationDate: '2026-09-01',
    applicationStart: '2026-09-05',
    applicationEnd: '2026-10-15',
    examDate: '2026-11-20',
    admitCardDate: '2026-11-05',
    resultDate: '2026-12-25',
    officialNotificationUrl: 'https://joinindianarmy.nic.in',
    officialApplyUrl: 'https://joinindianarmy.nic.in',
    officialWebsiteUrl: 'https://joinindianarmy.nic.in',
    selectionProcess: [
      { stepNumber: 1, title: 'Written Exam', description: 'Objective test.' },
      { stepNumber: 2, title: 'SSB Interview / Physical Test', description: 'Evaluation.' }
    ],
    requiredDocuments: [
      { name: '10th & 12th Certificate', description: 'Passing certificate.', mandatory: true }
    ],
    status: 'Open',
    description: 'Recruitment details...',
    verifiedOfficial: true
  };

  const [formData, setFormData] = useState<Recruitment>(initialForm);

  const handleOpenCreate = () => {
    setEditingRecruitment(null);
    setFormData({ ...initialForm, id: 'rec-' + Date.now() });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (rec: Recruitment) => {
    setEditingRecruitment(rec);
    setFormData({ ...rec });
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const handleDuplicate = (rec: Recruitment) => {
    const dup: Recruitment = {
      ...rec,
      id: 'rec-' + Date.now(),
      title: `${rec.title} (Copy)`
    };
    storage.saveRecruitment(dup);
    showToast('Recruitment Duplicated', `Created copy of "${rec.title}".`, 'success');
    setOpenMenuId(null);
    onRefresh();
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete or archive "${title}"?`)) {
      storage.deleteRecruitment(id);
      showToast('Recruitment Deleted', `Deleted "${title}".`, 'info');
      setOpenMenuId(null);
      onRefresh();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.organization) {
      showToast('Validation Error', 'Title and Organization are required.', 'error');
      return;
    }

    storage.saveRecruitment(formData);
    showToast(
      editingRecruitment ? 'Recruitment Updated' : 'Recruitment Created',
      `Saved "${formData.title}".`,
      'success'
    );
    setIsModalOpen(false);
    onRefresh();
  };

  const filtered = recruitments.filter(r => 
    searchQuery === '' || 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.organization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="drt-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 text-xs font-semibold border border-amber-500/30 mb-1">
            <Briefcase className="w-3.5 h-3.5" />
            <span>RECRUITMENT MANAGEMENT</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#F1F4F8] tracking-tight">
            Recruitment Records
          </h1>
          <p className="text-xs text-[#9AA8BA] mt-0.5">
            Create, edit, duplicate or archive defence recruitment notifications.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 rounded-xl bg-[#5B8DEF] hover:bg-blue-600 text-white text-xs font-bold shadow flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Recruitment</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-[#718096] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search recruitments..."
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#111B2E] border border-[#24324A] text-[#F1F4F8] text-xs focus:border-[#5B8DEF]"
        />
      </div>

      {/* Point 17 & 36: Spacious Table with Action Popover */}
      <div className="drt-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#9AA8BA]">
            <thead className="bg-[#0B1220] text-[#718096] uppercase text-[10px] font-bold border-b border-[#24324A]">
              <tr>
                <th className="px-6 py-4">Organization & Title</th>
                <th className="px-6 py-4">Qualification</th>
                <th className="px-6 py-4">Age Limit</th>
                <th className="px-6 py-4">Deadline</th>
                <th className="px-6 py-4">Exam Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#24324A]/60">
              {filtered.map(rec => (
                <tr key={rec.id} className="hover:bg-[#162238]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-[#F1F4F8] max-w-md line-clamp-1">{rec.title}</div>
                    <div className="text-[11px] text-[#718096] mt-0.5">{rec.organization} • {rec.vacancies.toLocaleString()} Posts</div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-200">{rec.qualification}</td>
                  <td className="px-6 py-4 font-semibold text-slate-200">{rec.minAge}–{rec.maxAge} Yrs</td>
                  <td className="px-6 py-4 font-semibold text-amber-300">{rec.applicationEnd}</td>
                  <td className="px-6 py-4 font-semibold text-purple-300">{rec.examDate}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={rec.status} />
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === rec.id ? null : rec.id)}
                      className="p-1.5 rounded-lg text-[#9AA8BA] hover:text-white hover:bg-[#162238] transition-colors"
                      title="More Options"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {/* Compact Popover Menu */}
                    {openMenuId === rec.id && (
                      <div className="absolute right-6 mt-1 w-36 bg-[#162238] border border-[#24324A] rounded-xl shadow-xl py-1 z-30 text-left">
                        <button
                          onClick={() => handleOpenEdit(rec)}
                          className="w-full px-3 py-1.5 text-xs text-[#F1F4F8] hover:bg-[#111B2E] flex items-center gap-2"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-[#5B8DEF]" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDuplicate(rec)}
                          className="w-full px-3 py-1.5 text-xs text-[#F1F4F8] hover:bg-[#111B2E] flex items-center gap-2"
                        >
                          <Copy className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Duplicate</span>
                        </button>
                        <button
                          onClick={() => handleDelete(rec.id, rec.title)}
                          className="w-full px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 border-t border-[#24324A]"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingRecruitment ? 'Edit Recruitment' : 'Add Recruitment'}
        maxWidth="4xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-300 mb-1">Recruitment Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#24324A] text-white focus:border-[#5B8DEF]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Organization *</label>
              <select
                value={formData.organization}
                onChange={e => setFormData({ ...formData, organization: e.target.value as Organization })}
                className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#24324A] text-white focus:border-[#5B8DEF]"
              >
                <option value="Indian Army">Indian Army</option>
                <option value="Indian Navy">Indian Navy</option>
                <option value="Indian Air Force">Indian Air Force</option>
                <option value="CAPF">CAPF</option>
                <option value="Indian Coast Guard">Indian Coast Guard</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as RecruitmentCategory })}
                className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#24324A] text-white focus:border-[#5B8DEF]"
              >
                <option value="Officer Entry">Officer Entry</option>
                <option value="Soldier / Sailor / Airman">Soldier / Sailor / Airman</option>
                <option value="Technical Entry">Technical Entry</option>
                <option value="Medical Entry">Medical Entry</option>
                <option value="Police & Assistant Commandant">Police & Assistant Commandant</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Qualification Level</label>
              <select
                value={formData.qualification}
                onChange={e => setFormData({ ...formData, qualification: e.target.value as QualificationLevel })}
                className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#24324A] text-white focus:border-[#5B8DEF]"
              >
                <option value="10th Pass">10th Pass</option>
                <option value="12th Pass">12th Pass</option>
                <option value="Diploma">Diploma</option>
                <option value="Graduate">Graduate</option>
                <option value="Engineering Degree">Engineering Degree</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Total Vacancies</label>
              <input
                type="number"
                value={formData.vacancies}
                onChange={e => setFormData({ ...formData, vacancies: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#24324A] text-white focus:border-[#5B8DEF]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Min Age Limit (Years)</label>
              <input
                type="number"
                step="0.5"
                value={formData.minAge}
                onChange={e => setFormData({ ...formData, minAge: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#24324A] text-white focus:border-[#5B8DEF]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Max Age Limit (Years)</label>
              <input
                type="number"
                step="0.5"
                value={formData.maxAge}
                onChange={e => setFormData({ ...formData, maxAge: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#24324A] text-white focus:border-[#5B8DEF]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Application End Date (Deadline)</label>
              <input
                type="date"
                value={formData.applicationEnd}
                onChange={e => setFormData({ ...formData, applicationEnd: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#24324A] text-white focus:border-[#5B8DEF]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Written Exam Date</label>
              <input
                type="date"
                value={formData.examDate}
                onChange={e => setFormData({ ...formData, examDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#24324A] text-white focus:border-[#5B8DEF]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-300 mb-1">Official Apply URL *</label>
              <input
                type="url"
                value={formData.officialApplyUrl}
                onChange={e => setFormData({ ...formData, officialApplyUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-[#24324A] text-white focus:border-[#5B8DEF]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#24324A] flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-[#0B1220] text-[#9AA8BA] border border-[#24324A]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#5B8DEF] hover:bg-blue-600 text-white font-bold"
            >
              Save Recruitment
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
