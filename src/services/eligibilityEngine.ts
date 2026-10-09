import { Recruitment, EligibilityRequest, EligibilityMatch, CriteriaCheck, QualificationLevel } from '../types';

const QUALIFICATION_RANK: Record<QualificationLevel, number> = {
  '10th Pass': 1,
  '12th Pass': 2,
  'Diploma': 3,
  'Graduate': 4,
  'Engineering Degree': 4,
  'Postgraduate': 5
};

export function calculateAgeInYears(dobString: string): number {
  const dob = new Date(dobString);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  
  // Calculate fractional age for precision
  const dayOfYearDob = Math.floor((dob.getTime() - new Date(dob.getFullYear(), 0, 0).getTime()) / 86400000);
  const dayOfYearToday = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const fraction = (dayOfYearToday - dayOfYearDob) / 365.25;
  
  return Number((dob.getFullYear() < today.getFullYear() ? age + (fraction < 0 ? fraction + 1 : fraction) : age).toFixed(1));
}

export function evaluateEligibility(recruitment: Recruitment, request: EligibilityRequest): EligibilityMatch {
  const userAge = calculateAgeInYears(request.dob);
  
  // 1. Age Evaluation
  const agePassed = userAge >= recruitment.minAge && userAge <= recruitment.maxAge;
  const ageCriteria: CriteriaCheck = {
    passed: agePassed,
    reason: agePassed 
      ? `Age ${userAge} years falls within required range of ${recruitment.minAge}–${recruitment.maxAge} years.`
      : userAge < recruitment.minAge 
        ? `Below minimum age limit of ${recruitment.minAge} years (Current age: ${userAge} yrs).`
        : `Exceeds maximum age limit of ${recruitment.maxAge} years (Current age: ${userAge} yrs).`,
    userValue: `${userAge} years`,
    requiredValue: `${recruitment.minAge} – ${recruitment.maxAge} years`
  };

  // 2. Qualification Evaluation
  const userRank = QUALIFICATION_RANK[request.qualification] || 0;
  const reqRank = QUALIFICATION_RANK[recruitment.qualification] || 0;
  const qualPassed = userRank >= reqRank;
  const qualCriteria: CriteriaCheck = {
    passed: qualPassed,
    reason: qualPassed 
      ? `Highest qualification (${request.qualification}) satisfies requirement of ${recruitment.qualification}.`
      : `Qualification requirement not met. Requires minimum ${recruitment.qualification}.`,
    userValue: request.qualification,
    requiredValue: recruitment.qualification
  };

  // 3. Percentage Evaluation
  const percPassed = request.percentage >= recruitment.minPercentage;
  const percCriteria: CriteriaCheck = {
    passed: percPassed,
    reason: percPassed 
      ? `Marks (${request.percentage}%) meet minimum aggregate threshold of ${recruitment.minPercentage}%.`
      : `Marks (${request.percentage}%) are below minimum requirement of ${recruitment.minPercentage}%.`,
    userValue: `${request.percentage}%`,
    requiredValue: `Min ${recruitment.minPercentage}%`
  };

  // 4. Gender Evaluation
  const genderPassed = recruitment.gender === 'All' || recruitment.gender === request.gender;
  const genderCriteria: CriteriaCheck = {
    passed: genderPassed,
    reason: genderPassed 
      ? `Gender (${request.gender}) is eligible for this entry.`
      : `Entry is reserved for ${recruitment.gender} candidates only.`,
    userValue: request.gender,
    requiredValue: recruitment.gender === 'All' ? 'Male & Female' : recruitment.gender
  };

  // 5. Height Evaluation
  const heightPassed = request.heightCm >= recruitment.minHeightCm;
  const heightCriteria: CriteriaCheck = {
    passed: heightPassed,
    reason: heightPassed 
      ? `Height (${request.heightCm} cm) meets or exceeds minimum requirement of ${recruitment.minHeightCm} cm.`
      : `Height (${request.heightCm} cm) is below physical requirement of ${recruitment.minHeightCm} cm.`,
    userValue: `${request.heightCm} cm`,
    requiredValue: `Min ${recruitment.minHeightCm} cm`
  };

  const isEligible = agePassed && qualPassed && percPassed && genderPassed && heightPassed;

  // Calculate percentage match
  let score = 0;
  if (agePassed) score += 25;
  if (qualPassed) score += 25;
  if (percPassed) score += 20;
  if (genderPassed) score += 15;
  if (heightPassed) score += 15;

  return {
    recruitment,
    overallScore: score,
    isEligible,
    criteria: {
      age: ageCriteria,
      qualification: qualCriteria,
      percentage: percCriteria,
      gender: genderCriteria,
      height: heightCriteria
    }
  };
}

export function evaluateAllRecruitments(recruitments: Recruitment[], request: EligibilityRequest): EligibilityMatch[] {
  return recruitments
    .map(rec => evaluateEligibility(rec, request))
    .sort((a, b) => b.overallScore - a.overallScore);
}
