import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '',
  onClick
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* Official Emblem Logo with Indian Flag */}
      <div className={`relative shrink-0 rounded-xl overflow-hidden shadow-md border border-[#24324A] bg-[#091122] flex items-center justify-center p-0.5 group-hover:border-amber-500/60 transition-colors ${sizeClasses[size]}`}>
        <img 
          src="/images/logo.png" 
          alt="Indian Defence Recruitment Tracker Logo with Tricolor Flag" 
          className="w-full h-full object-cover"
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-black text-sm sm:text-base text-[#F1F4F8] tracking-wide leading-none group-hover:text-[#5B8DEF] transition-colors">
              DEFENCE RECRUITMENT TRACKER
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.2 rounded bg-gradient-to-r from-amber-500/20 via-white/10 to-emerald-500/20 text-amber-300 font-bold border border-amber-500/40 shrink-0">
              🇮🇳 DRT
            </span>
          </div>
          <span className="text-[11px] text-[#9AA8BA] font-medium leading-tight mt-0.5">
            Official Tri-Services Recruitment Portal
          </span>
        </div>
      )}
    </div>
  );
};
