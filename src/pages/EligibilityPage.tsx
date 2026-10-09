import React, { useState } from 'react';
import { Recruitment, QualificationLevel, EligibilityRequest, EligibilityMatch } from '../types';
import { useAuth } from '../context/AuthContext';
import { evaluateAllRecruitments } from '../services/eligibilityEngine';
import { INDIAN_STATES } from './RegisterPage';
import { 
  Calculator, 
  User, 
  GraduationCap, 
  Ruler, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Sparkles,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

interface EligibilityPageProps {
  recruitments: Recruitment[];
  onSelectRecruitment: (recruitment: Recruitment) => void;
  targetRecruitment?: Recruitment | null;
}

export const EligibilityPage: React.FC<EligibilityPageProps> = ({
  recruitments,
  onSelectRecruitment
}) => {
  const { user } = useAuth();
  const [step, setStep] = useState<number>(1);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  const [form, setForm] = useState<EligibilityRequest>({
    dob: user?.dob || '2004-06-15',
    gender: (user?.gender as 'Male' | 'Female') || 'Male',
    qualification: user?.qualification || '12th Pass',
    percentage: user?.percentage || 80,
    heightCm: user?.heightCm || 172,
    state: user?.state || 'Punjab',
    preferredBranch: user?.preferredBranch || 'Indian Army'
  });

  const [results, setResults] = useState<EligibilityMatch[]>([]);

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const evaluated = evaluateAllRecruitments(recruitments, form);
    setResults(evaluated);
    setHasCalculated(true);
  };

  const eligibleCount = results.filter(r => r.isEligible).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="drt-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 text-xs font-semibold border border-amber-500/30 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ELIGIBILITY CALCULATOR</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#F1F4F8] tracking-tight">
            Check Your Defence Eligibility
          </h1>
          <p className="text-xs text-[#9AA8BA] mt-0.5">
            Identify potentially suitable defence entries matching your profile parameters.
          </p>
        </div>

        {hasCalculated && (
          <button
            onClick={() => { setHasCalculated(false); setStep(1); }}
            className="px-3.5 py-2 rounded-xl bg-[#0B1220] border border-[#24324A] text-[#9AA8BA] hover:text-white text-xs font-semibold flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Recalculate</span>
          </button>
        )}
      </div>

      {!hasCalculated ? (
        /* Point 22: Clean 4-Step Interface */
        <div className="drt-card p-6 sm:p-8 space-y-6">
          
          {/* Step Indicator Bar */}
          <div className="grid grid-cols-4 gap-2 border-b border-[#24324A] pb-4">
            {[
              { stepNum: 1, label: 'Step 1: Basic Info' },
              { stepNum: 2, label: 'Step 2: Education' },
              { stepNum: 3, label: 'Step 3: Physical Details' },
              { stepNum: 4, label: 'Step 4: Preferences' }
            ].map(s => (
              <div 
                key={s.stepNum}
                className={`p-2 rounded-xl border text-center transition-colors ${
                  step === s.stepNum 
                    ? 'bg-[#5B8DEF]/15 text-[#5B8DEF] border-[#5B8DEF]/40 font-bold' 
                    : step > s.stepNum 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                      : 'bg-[#0B1220] text-[#718096] border-[#24324A]'
                }`}
              >
                <p className="text-[11px] truncate">{s.label}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleCalculate} className="space-y-6">
            
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-semibold text-[#9AA8BA] mb-1.5">Date of Birth</label>
                  <input
                    type="date"
                    value={form.dob}
                    onChange={e => setForm(f => ({ ...f, dob: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-[#24324A] text-white text-xs focus:border-[#5B8DEF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#9AA8BA] mb-1.5">Gender</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Male', 'Female'].map(g => (
                      <button
                        type="button"
                        key={g}
                        onClick={() => setForm(f => ({ ...f, gender: g as any }))}
                        className={`py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                          form.gender === g 
                            ? 'bg-[#5B8DEF] text-white border-[#5B8DEF]' 
                            : 'bg-[#0B1220] text-[#9AA8BA] border-[#24324A]'
                        }`}
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>{g}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Education */}
            {step === 2 && (
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-semibold text-[#9AA8BA] mb-1.5">Highest Qualification</label>
                  <select
                    value={form.qualification}
                    onChange={e => setForm(f => ({ ...f, qualification: e.target.value as QualificationLevel }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-[#24324A] text-white text-xs focus:border-[#5B8DEF]"
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
                  <label className="block text-xs font-semibold text-[#9AA8BA] mb-1.5">Aggregate Marks (%)</label>
                  <input
                    type="number"
                    value={form.percentage}
                    onChange={e => setForm(f => ({ ...f, percentage: Number(e.target.value) }))}
                    placeholder="80"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-[#24324A] text-white text-xs focus:border-[#5B8DEF]"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Physical Details */}
            {step === 3 && (
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-semibold text-[#9AA8BA] mb-1.5">Height (in centimeters)</label>
                  <div className="relative">
                    <Ruler className="w-4 h-4 text-[#718096] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      value={form.heightCm}
                      onChange={e => setForm(f => ({ ...f, heightCm: Number(e.target.value) }))}
                      placeholder="172"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#24324A] text-white text-xs focus:border-[#5B8DEF]"
                    />
                  </div>
                  <p className="text-[11px] text-[#718096] mt-1">Standard height requirement ranges from 152 cm to 170 cm.</p>
                </div>
              </div>
            )}

            {/* Step 4: Preferences */}
            {step === 4 && (
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-semibold text-[#9AA8BA] mb-1.5">State Domicile</label>
                  <select
                    value={form.state}
                    onChange={e => setForm(f => ({ ...f, state: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-[#24324A] text-white text-xs focus:border-[#5B8DEF]"
                  >
                    {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#9AA8BA] mb-1.5">Preferred Branch</label>
                  <select
                    value={form.preferredBranch}
                    onChange={e => setForm(f => ({ ...f, preferredBranch: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-[#24324A] text-white text-xs focus:border-[#5B8DEF]"
                  >
                    <option value="Indian Army">Indian Army</option>
                    <option value="Indian Navy">Indian Navy</option>
                    <option value="Indian Air Force">Indian Air Force</option>
                    <option value="CAPF">CAPF</option>
                    <option value="Indian Coast Guard">Indian Coast Guard</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-[#24324A]">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(s => s - 1)}
                  className="px-4 py-2 rounded-xl bg-[#0B1220] border border-[#24324A] text-[#9AA8BA] text-xs font-semibold"
                >
                  ← Previous
                </button>
              ) : <div></div>}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(s => s + 1)}
                  className="px-5 py-2 rounded-xl bg-[#5B8DEF] hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleCalculate()}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold flex items-center gap-2 shadow"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Calculate Matches</span>
                </button>
              )}
            </div>

          </form>

        </div>
      ) : (
        /* Point 22: Results Screen */
        <div className="space-y-6">
          
          <div className="drt-card p-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#F1F4F8]">Your Matches</h2>
              <p className="text-xs text-[#9AA8BA] mt-0.5">
                <strong className="text-emerald-400 font-bold">{eligibleCount} recruitments</strong> may match your profile parameters out of {results.length} total entries evaluated.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
              {eligibleCount} Matches
            </span>
          </div>

          <div className="space-y-4">
            {results.map(match => (
              <div 
                key={match.recruitment.id}
                className={`drt-card p-5 space-y-4 transition-all ${
                  match.isEligible ? 'border-emerald-500/30' : 'border-[#24324A]'
                }`}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-[#24324A]">
                  <div>
                    <span className="text-[10px] font-semibold text-[#9AA8BA] uppercase">{match.recruitment.organization}</span>
                    <h3 className="text-base font-bold text-white mt-0.5">{match.recruitment.title}</h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-amber-300 bg-amber-500/15 px-2.5 py-1 rounded-full border border-amber-500/30">
                      {match.overallScore}% Preliminary Match
                    </span>
                    <button
                      onClick={() => onSelectRecruitment(match.recruitment)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#5B8DEF] text-white text-xs font-semibold hover:bg-blue-600"
                    >
                      View Recruitment
                    </button>
                  </div>
                </div>

                {/* Criteria Checks Pill List */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className={`px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1 ${
                    match.criteria.age.passed ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  }`}>
                    {match.criteria.age.passed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    Age Rule
                  </span>

                  <span className={`px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1 ${
                    match.criteria.qualification.passed ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  }`}>
                    {match.criteria.qualification.passed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    Education
                  </span>

                  <span className={`px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1 ${
                    match.criteria.percentage.passed ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  }`}>
                    {match.criteria.percentage.passed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    Marks %
                  </span>

                  <span className={`px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1 ${
                    match.criteria.gender.passed ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  }`}>
                    {match.criteria.gender.passed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    Gender
                  </span>

                  <span className={`px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1 ${
                    match.criteria.height.passed ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  }`}>
                    {match.criteria.height.passed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    Height
                  </span>
                </div>

              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>Verify all eligibility parameters against the official recruitment notification before applying.</span>
          </div>

        </div>
      )}

    </div>
  );
};
