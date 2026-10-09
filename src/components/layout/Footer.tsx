import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Logo } from '../common/Logo';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const officialPortals = [
    { name: 'Indian Army Official Portal', url: 'https://joinindianarmy.nic.in' },
    { name: 'Indian Navy Recruitment', url: 'https://joinindiannavy.gov.in' },
    { name: 'Indian Air Force AFCAT Portal', url: 'https://afcat.cdac.in' },
    { name: 'UPSC Official Examinations', url: 'https://upsc.gov.in' },
    { name: 'Indian Coast Guard Portal', url: 'https://joinindiancoastguard.cdac.in' }
  ];

  return (
    <footer className="bg-[#0B1220] border-t border-[#24324A] text-[#9AA8BA] text-xs mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand & Tagline with Indian Flag Logo */}
          <div className="md:col-span-1 space-y-3">
            <Logo size="md" showText={true} onClick={() => setActiveTab('dashboard')} />
            <p className="text-[#9AA8BA] text-xs leading-relaxed mt-2">
              Your Defence Career. One Tracker. Helping Indian defence aspirants discover recruitment opportunities, calculate eligibility, and track application deadlines.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-[#F1F4F8] text-xs uppercase tracking-wider mb-3">Navigation</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setActiveTab('explorer')} className="hover:text-[#5B8DEF] transition-colors">Recruitments</button></li>
              <li><button onClick={() => setActiveTab('eligibility')} className="hover:text-[#5B8DEF] transition-colors">Eligibility Calculator</button></li>
              <li><button onClick={() => setActiveTab('calendar')} className="hover:text-[#5B8DEF] transition-colors">Recruitment Calendar</button></li>
              <li><button onClick={() => setActiveTab('admit-cards')} className="hover:text-[#5B8DEF] transition-colors">Admit Cards</button></li>
              <li><button onClick={() => setActiveTab('results')} className="hover:text-[#5B8DEF] transition-colors">Results Tracker</button></li>
            </ul>
          </div>

          {/* Support & Resources */}
          <div>
            <h4 className="font-bold text-[#F1F4F8] text-xs uppercase tracking-wider mb-3">Help & Support</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setActiveTab('notifications')} className="hover:text-[#5B8DEF] transition-colors">Alerts & Notifications</button></li>
              <li><button onClick={() => setActiveTab('eligibility')} className="hover:text-[#5B8DEF] transition-colors">Criteria Guidelines</button></li>
            </ul>
          </div>

          {/* Official Portals */}
          <div>
            <h4 className="font-bold text-[#F1F4F8] text-xs uppercase tracking-wider mb-3">Official Portals</h4>
            <ul className="space-y-2">
              {officialPortals.map((portal, idx) => (
                <li key={idx}>
                  <a 
                    href={portal.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-amber-300 transition-colors flex items-center gap-1.5 truncate"
                  >
                    <ExternalLink className="w-3 h-3 text-[#718096] shrink-0" />
                    <span className="truncate">{portal.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="p-4 rounded-xl bg-[#111B2E] border border-[#24324A] text-center space-y-1">
          <p className="text-xs text-[#9AA8BA] max-w-3xl mx-auto leading-relaxed">
            DRT is a recruitment discovery platform. Always verify final application deadlines and guidelines against official government recruitment notifications on respective portals.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-[#24324A]/60 text-center text-[11px] text-[#718096]">
          © 2026 Defence Recruitment Tracker (DRT). All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};
