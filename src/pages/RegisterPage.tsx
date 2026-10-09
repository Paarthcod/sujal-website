import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { QualificationLevel } from '../types';
import { User, Mail, Phone, Calendar, Lock, CheckCircle2, Ruler, Award } from 'lucide-react';
import { Logo } from '../components/common/Logo';

interface RegisterPageProps {
  setActiveTab: (tab: string) => void;
  setPendingRegisterUser: (data: any) => void;
}

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu & Kashmir', 'Ladakh'
];

export const RegisterPage: React.FC<RegisterPageProps> = ({ setActiveTab, setPendingRegisterUser }) => {
  const { showToast } = useNotification();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    dob: '2004-06-15',
    gender: 'Male' as 'Male' | 'Female',
    state: 'Punjab',
    qualification: '12th Pass' as QualificationLevel,
    percentage: 80,
    heightCm: 172,
    preferredBranch: 'Indian Army',
    termsAccepted: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile || !formData.password) {
      showToast('Validation Error', 'Please fill in all mandatory registration fields.', 'error');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showToast('Password Mismatch', 'Password and Confirm Password do not match.', 'error');
      return;
    }

    if (!formData.termsAccepted) {
      showToast('Terms Required', 'Please accept the terms and privacy policy to register.', 'warning');
      return;
    }

    // Save pending registration and redirect to OTP Verification page
    setPendingRegisterUser(formData);
    showToast('OTP Sent', 'Mobile verification code sent to ' + formData.mobile, 'info');
    setActiveTab('verify-otp');
  };

  return (
    <div className="max-w-2xl mx-auto my-8 glass-panel p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
      
      {/* Header with Indian Flag Logo */}
      <div className="text-center flex flex-col items-center space-y-3">
        <Logo size="lg" showText={false} />
        <div>
          <h2 className="text-2xl font-black text-white tracking-wide">Aspirant Registration</h2>
          <p className="text-slate-400 text-xs mt-1">Create your profile to calculate eligibility and track defence entries</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Vikram Singh"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. aspirant@example.com"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Mobile Number *</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Date of Birth *</label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Gender *</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:border-blue-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">State of Domicile *</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:border-blue-500"
            >
              {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Highest Qualification *</label>
            <select
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:border-blue-500"
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
            <label className="block text-xs font-medium text-slate-300 mb-1">Aggregate Marks (% / GPA)</label>
            <div className="relative">
              <Award className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                name="percentage"
                value={formData.percentage}
                onChange={handleChange}
                placeholder="80"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Height (in cm) for Physical Criteria</label>
            <div className="relative">
              <Ruler className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                name="heightCm"
                value={formData.heightCm}
                onChange={handleChange}
                placeholder="172"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Preferred Defence Branch</label>
            <select
              name="preferredBranch"
              value={formData.preferredBranch}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:border-blue-500"
            >
              <option value="Indian Army">Indian Army</option>
              <option value="Indian Navy">Indian Navy</option>
              <option value="Indian Air Force">Indian Air Force</option>
              <option value="CAPF">CAPF</option>
              <option value="Indian Coast Guard">Indian Coast Guard</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Confirm Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:border-blue-500"
              />
            </div>
          </div>

        </div>

        <div className="pt-2">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-400">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={e => setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
              className="rounded bg-slate-900 border-slate-800 text-blue-600 focus:ring-0"
            />
            <span>I agree to the Terms of Service & Privacy Policy.</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all mt-4"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Proceed to OTP Verification</span>
        </button>

      </form>

      <div className="text-center pt-4 border-t border-slate-800 text-xs text-slate-400">
        Already registered?{' '}
        <button
          onClick={() => setActiveTab('login')}
          className="text-blue-400 hover:text-blue-300 font-bold ml-1"
        >
          Sign In Here
        </button>
      </div>

    </div>
  );
};
