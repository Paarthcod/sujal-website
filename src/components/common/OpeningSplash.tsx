import React, { useEffect, useState } from 'react';

interface OpeningSplashProps {
  onComplete: () => void;
}

export const OpeningSplash: React.FC<OpeningSplashProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Smooth progress counter from 0% to 100% over 2 seconds
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 80);

    // Trigger fade-out at 2.1s and complete at 2.5s
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2100);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-[#070D19] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500 selection:bg-none ${
      isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      
      {/* Background Ambient Tricolor Radiance */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Saffron Glow Top */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#FF9933]/20 blur-[130px] rounded-full"></div>
        {/* White Center Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-white/10 blur-[140px] rounded-full"></div>
        {/* Green Glow Bottom */}
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#138808]/20 blur-[130px] rounded-full"></div>
      </div>

      {/* Main Zooming Emblem Container */}
      <div className="relative z-10 flex flex-col items-center animate-splash-zoom max-w-sm w-full px-6 text-center">
        
        {/* Rotating Ashoka Chakra Background Ring */}
        <div className="relative mb-6">
          <div className="absolute -inset-4 rounded-full border border-amber-500/30 animate-spin-slow"></div>
          <div className="absolute -inset-8 rounded-full border border-blue-500/20 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '24s' }}></div>

          {/* Central Logo Emblem with Tricolor Glow */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-500/60 bg-[#091122] p-1 animate-tricolor-glow flex items-center justify-center">
            <img 
              src="/images/logo.png" 
              alt="Indian Defence Recruitment Tracker Official Logo" 
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Patriotic Title & Motto */}
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-wider uppercase leading-snug">
          DEFENCE RECRUITMENT TRACKER
        </h2>

        <div className="mt-1.5 flex items-center justify-center gap-2">
          <span className="h-0.5 w-6 bg-gradient-to-r from-transparent to-[#FF9933]"></span>
          <span className="text-xs font-extrabold text-amber-300 tracking-widest uppercase">
            JAI HIND 🇮🇳 SERVICE • HONOR • COUNTRY
          </span>
          <span className="h-0.5 w-6 bg-gradient-to-l from-transparent to-[#138808]"></span>
        </div>

        {/* Dynamic Loading Progress Bar */}
        <div className="w-full max-w-xs mt-8 space-y-2">
          <div className="h-1.5 w-full bg-[#111B2E] rounded-full overflow-hidden border border-[#24324A] p-0.5">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="flex items-center justify-between text-[11px] text-[#9AA8BA] font-semibold">
            <span>Initialising Defence Portal...</span>
            <span className="text-amber-400 font-bold">{progress}%</span>
          </div>
        </div>

      </div>

      {/* Skip Button */}
      <button
        onClick={() => {
          setIsFadingOut(true);
          setTimeout(onComplete, 400);
        }}
        className="absolute bottom-6 right-6 px-4 py-2 rounded-xl bg-[#111B2E]/80 hover:bg-[#162238] border border-[#24324A] text-slate-300 text-xs font-semibold backdrop-blur-md transition-all hover:text-white"
      >
        Skip Animation →
      </button>

    </div>
  );
};
