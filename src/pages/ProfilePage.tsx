import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { QualificationLevel } from '../types';
import { INDIAN_STATES } from './RegisterPage';
import { User, Mail, Phone, Calendar, MapPin, GraduationCap, Award, Ruler, Bell, Save, ShieldCheck } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, isAdmin } = useAuth();
  const { showToast } = useNotification();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    dob: user?.dob || '2004-05-15',
    gender: user?.gender || 'Male',
    state: user?.state || 'Punjab',
    qualification: user?.qualification || ('12th Pass' as QualificationLevel),
    percentage: user?.percentage || 80,
    heightCm: user?.heightCm || 174,
    preferredBranch: user?.preferredBranch || 'Indian Army',
    emailNotifications: true,
    deadlineReminders: true,
    admitCardAlerts: true,
    resultAlerts: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      dob: formData.dob,
      gender: formData.gender as any,
      state: formData.state,
      qualification: formData.qualification as QualificationLevel,
      percentage: Number(formData.percentage),
      heightCm: Number(formData.heightCm),
      preferredBranch: formData.preferredBranch
    });

    showToast('Profile Updated', 'Your personal parameters & eligibility settings have been saved.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 font-black text-white text-xl flex items-center justify-center shadow-xl">
            {formData.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-black text-white leading-tight flex items-center gap-2">
              {formData.name}
              {isAdmin && <ShieldCheck className="w-5 h-5 text-amber-400" />}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAdmin ? 'System Administrator' : 'Defence Aspirant'} • Domicile: <strong className="text-slate-200">{formData.state}</strong>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Personal Profile */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4 text-blue-400" />
            <span>Personal Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Mobile Number</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-blue-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">State Domicile</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-blue-500"
              >
                {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Educational & Physical Criteria */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Eligibility Calculation Parameters</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Highest Qualification</label>
              <select
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-blue-500"
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
              <label className="block text-xs font-medium text-slate-300 mb-1">Aggregate Marks (%)</label>
              <input
                type="number"
                name="percentage"
                value={formData.percentage}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Physical Height (cm)</label>
              <input
                type="number"
                name="heightCm"
                value={formData.heightCm}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Notification Preferences */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-400" />
            <span>Notification & Deadline Preferences</span>
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer">
              <span>Send email reminders before application deadlines</span>
              <input
                type="checkbox"
                name="deadlineReminders"
                checked={formData.deadlineReminders}
                onChange={handleChange}
                className="rounded bg-slate-900 border-slate-800 text-blue-600 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer">
              <span>Notify when admit cards become available for downloaded entries</span>
              <input
                type="checkbox"
                name="admitCardAlerts"
                checked={formData.admitCardAlerts}
                onChange={handleChange}
                className="rounded bg-slate-900 border-slate-800 text-blue-600 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer">
              <span>Notify on final merit list & result declarations</span>
              <input
                type="checkbox"
                name="resultAlerts"
                checked={formData.resultAlerts}
                onChange={handleChange}
                className="rounded bg-slate-900 border-slate-800 text-blue-600 focus:ring-0"
              />
            </label>
          </div>
        </div>

      </form>

    </div>
  );
};
