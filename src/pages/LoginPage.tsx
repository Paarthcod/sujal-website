import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Mail, Lock, LogIn, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';
import { Logo } from '../components/common/Logo';

interface LoginPageProps {
  setActiveTab: (tab: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ setActiveTab }) => {
  const { login } = useAuth();
  const { showToast } = useNotification();
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrMobile) {
      showToast('Validation Error', 'Please enter your email address or mobile number.', 'error');
      return;
    }

    await login(emailOrMobile, password);
    showToast('Login Successful', 'Welcome back to Defence Recruitment Tracker.', 'success');
    setActiveTab('dashboard');
  };

  const handleQuickDemoUser = async () => {
    await login('vikram.singh@example.com');
    showToast('Demo Aspirant Logged In', 'Logged in as Vikram Singh (Aspirant Profile)', 'success');
    setActiveTab('dashboard');
  };

  const handleQuickDemoAdmin = async () => {
    await login('admin@drt.gov.in');
    showToast('Demo Admin Logged In', 'Logged in as Col. Rajesh Sharma (Administrator)', 'success');
    setActiveTab('admin-dashboard');
  };

  return (
    <div className="max-w-md mx-auto my-12 glass-panel p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
      
      {/* Header with Indian Flag Emblem Logo */}
      <div className="text-center flex flex-col items-center space-y-3">
        <Logo size="lg" showText={false} />
        <div>
          <h2 className="text-2xl font-black text-white tracking-wide">Sign In to DRT</h2>
          <p className="text-slate-400 text-xs mt-1">Access your defence recruitment tracker & saved bookmarks</p>
        </div>
      </div>

      {/* Quick Demo Viva Buttons */}
      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
        <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider text-center">
          ⚡ One-Click Demo Access
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleQuickDemoUser}
            className="px-3 py-2 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Aspirant Login</span>
          </button>

          <button
            type="button"
            onClick={handleQuickDemoAdmin}
            className="px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Login</span>
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Email / Mobile Number</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={emailOrMobile}
              onChange={e => setEmailOrMobile(e.target.value)}
              placeholder="e.g. vikram.singh@example.com or 9876543210"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-medium text-slate-300">Password</label>
            <button
              type="button"
              onClick={() => setActiveTab('forgot-password')}
              className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-slate-400">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
              className="rounded bg-slate-900 border-slate-800 text-blue-600 focus:ring-0"
            />
            <span>Remember me</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
        >
          <LogIn className="w-4 h-4" />
          <span>Sign In Securely</span>
        </button>
      </form>

      {/* Footer link */}
      <div className="text-center pt-4 border-t border-slate-800 text-xs text-slate-400">
        Don't have an account yet?{' '}
        <button
          onClick={() => setActiveTab('register')}
          className="text-amber-400 hover:text-amber-300 font-bold ml-1 inline-flex items-center gap-0.5"
        >
          Register Now <ArrowRight className="w-3 h-3" />
        </button>
      </div>

    </div>
  );
};
