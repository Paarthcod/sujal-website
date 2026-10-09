import React, { useState } from 'react';
import { useNotification } from '../context/NotificationContext';
import { KeyRound, Mail, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

interface ForgotPasswordPageProps {
  setActiveTab: (tab: string) => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ setActiveTab }) => {
  const { showToast } = useNotification();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Validation Error', 'Please enter your registered email address.', 'error');
      return;
    }
    showToast('Reset OTP Sent', `A 6-digit password reset code was sent to ${email}`, 'info');
    setStep(2);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('OTP Verified', 'Please enter your new password.', 'success');
    setStep(3);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      showToast('Error', 'Passwords do not match.', 'error');
      return;
    }
    showToast('Password Changed', 'Your password has been successfully reset. Please log in.', 'success');
    setActiveTab('login');
  };

  return (
    <div className="max-w-md mx-auto my-12 glass-panel p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
      
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 mb-2">
          <KeyRound className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-white tracking-wide">Reset Password</h2>
        <p className="text-slate-400 text-xs">
          {step === 1 && 'Enter your registered email to receive a password reset OTP.'}
          {step === 2 && 'Enter the 6-digit OTP code sent to your email.'}
          {step === 3 && 'Choose a strong new password for your account.'}
        </p>
      </div>

      {step === 1 && (
        <form onSubmit={handleSendOTP} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Registered Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="aspirant@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
          >
            <span>Send Reset OTP</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOTP} className="space-y-6">
          <div className="flex items-center justify-center gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                value={digit}
                onChange={e => {
                  const n = [...otp];
                  n[idx] = e.target.value;
                  setOtp(n);
                }}
                className="w-11 h-12 text-center text-lg font-black text-white bg-slate-900 border border-slate-800 rounded-xl"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Verify Reset OTP</span>
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">New Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Confirm New Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Set New Password & Login</span>
          </button>
        </form>
      )}

      <div className="text-center pt-4 border-t border-slate-800 text-xs text-slate-400">
        Remembered your password?{' '}
        <button
          onClick={() => setActiveTab('login')}
          className="text-blue-400 hover:text-blue-300 font-bold ml-1"
        >
          Back to Login
        </button>
      </div>

    </div>
  );
};
