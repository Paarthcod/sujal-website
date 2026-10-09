import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { ShieldCheck, CheckCircle2, RefreshCw, KeyRound, Sparkles } from 'lucide-react';

interface OTPPageProps {
  setActiveTab: (tab: string) => void;
  pendingRegisterUser: any;
}

export const OTPPage: React.FC<OTPPageProps> = ({ setActiveTab, pendingRegisterUser }) => {
  const { register } = useAuth();
  const { showToast } = useNotification();
  
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [timer, setTimer] = useState(45);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      showToast('Validation Error', 'Please enter a complete 6-digit OTP code.', 'error');
      return;
    }

    setIsVerifying(true);
    setTimeout(async () => {
      if (pendingRegisterUser) {
        await register(pendingRegisterUser);
      }
      setIsVerifying(false);
      showToast('Account Verified!', 'Mobile number and email verified successfully.', 'success');
      setActiveTab('dashboard');
    }, 1000);
  };

  const handleResend = () => {
    setTimer(45);
    setOtp(['1', '2', '3', '4', '5', '6']);
    showToast('OTP Resent', 'A fresh 6-digit OTP has been sent via SMS/Email.', 'info');
  };

  return (
    <div className="max-w-md mx-auto my-12 glass-panel p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6 text-center">
      
      <div className="space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-2">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-white tracking-wide">OTP Verification</h2>
        <p className="text-slate-400 text-xs">
          Enter the 6-digit verification code sent to{' '}
          <strong className="text-slate-200">{pendingRegisterUser?.mobile || '+91 98765 43210'}</strong>
        </p>
      </div>

      {/* Demo helper pill */}
      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium flex items-center justify-center gap-1.5">
        <Sparkles className="w-4 h-4 shrink-0" />
        <span>Demo Auto-fill active: Code is <strong>123456</strong></span>
      </div>

      <form onSubmit={handleVerify} className="space-y-6">
        
        <div className="flex items-center justify-center gap-2">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-input-${idx}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(idx, e.target.value)}
              className="w-11 h-12 text-center text-lg font-black text-white bg-slate-900 border border-slate-800 rounded-xl focus:border-blue-500 focus:outline-none shadow-inner"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={isVerifying}
          className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
        >
          {isVerifying ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <CheckCircle2 className="w-4 h-4" />
          )}
          <span>{isVerifying ? 'Verifying Code...' : 'Verify OTP & Complete Registration'}</span>
        </button>

      </form>

      <div className="pt-2 text-xs text-slate-400 flex items-center justify-between border-t border-slate-800">
        <span>Resend code in: <strong className="text-white">{timer}s</strong></span>
        <button
          disabled={timer > 0}
          onClick={handleResend}
          className={`font-bold flex items-center gap-1 ${
            timer > 0 ? 'text-slate-600 cursor-not-allowed' : 'text-amber-400 hover:text-amber-300'
          }`}
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>Resend OTP</span>
        </button>
      </div>

    </div>
  );
};
