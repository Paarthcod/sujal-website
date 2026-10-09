import React from 'react';
import { Shield, CheckCircle2, Code2, Database, Layers, Sparkles } from 'lucide-react';
import { Logo } from '../components/common/Logo';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Hero Header with Logo */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <Logo size="lg" showText={true} />
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
            <span>COLLEGE VIVA PRESENTATION</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight pt-2">
          About Defence Recruitment Tracker (DRT)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          DRT is a comprehensive web portal engineered for Indian defence aspirants to streamline recruitment discovery, eligibility verification, deadline tracking, admit card downloads, and merit list notifications across Indian Army, Indian Navy, Indian Air Force, CAPF, and Indian Coast Guard.
        </p>
      </div>

      {/* Problem Statement & Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-rose-400">The Problem</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Defence aspirants often struggle with fragmented recruitment notices spread across multiple government portals (`joinindianarmy.nic.in`, `joinindiannavy.gov.in`, `afcat.cdac.in`, `upsc.gov.in`, `ssc.gov.in`). Complex age cutoffs and physical criteria result in missed application deadlines or ineligible attempts.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-emerald-400">The DRT Solution</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            DRT unifies tri-services and paramilitary recruitment data into one centralized tracker. Features an automated Multi-Criteria Eligibility Engine, dynamic closing deadline countdowns, an interactive event calendar, and direct verification links.
          </p>
        </div>
      </div>

      {/* Technical Architecture */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-400" />
          <span>Technical Architecture & Stack</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <Code2 className="w-5 h-5 text-blue-400" />
            <h4 className="font-bold text-white">Frontend Framework</h4>
            <p className="text-slate-400">React 18 + Vite + TypeScript. Styled with Tailwind CSS v4 design tokens.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <Database className="w-5 h-5 text-amber-400" />
            <h4 className="font-bold text-white">Data Engine & Storage</h4>
            <p className="text-slate-400">Persistent storage service layer supporting full CRUD, state persistence, and mock seeds.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h4 className="font-bold text-white">Eligibility Engine</h4>
            <p className="text-slate-400">Structured evaluation algorithms assessing age cutoffs, education, height, and gender.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
