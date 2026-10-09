export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  dob: string; // YYYY-MM-DD
  gender: 'Male' | 'Female' | 'Other';
  state: string;
  role: UserRole;
  isVerified: boolean;
  profileComplete: boolean;
  qualification?: QualificationLevel;
  percentage?: number;
  heightCm?: number;
  preferredBranch?: string;
  createdAt: string;
}

export type Organization = 
  | 'Indian Army' 
  | 'Indian Navy' 
  | 'Indian Air Force' 
  | 'CAPF' 
  | 'Indian Coast Guard';

export type RecruitmentCategory = 
  | 'Officer Entry' 
  | 'Soldier / Sailor / Airman' 
  | 'Technical Entry' 
  | 'Medical Entry' 
  | 'Cadet Entry' 
  | 'Police & Assistant Commandant';

export type QualificationLevel = 
  | '10th Pass' 
  | '12th Pass' 
  | 'Diploma' 
  | 'Graduate' 
  | 'Engineering Degree' 
  | 'Postgraduate';

export type RecruitmentStatus = 'Open' | 'Closing Soon' | 'Upcoming' | 'Closed';

export interface SelectionStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface DocumentItem {
  name: string;
  description: string;
  mandatory: boolean;
}

export interface Recruitment {
  id: string;
  title: string;
  organization: Organization;
  category: RecruitmentCategory;
  branch: string;
  qualification: QualificationLevel;
  minAge: number;
  maxAge: number;
  minPercentage: number;
  gender: 'Male' | 'Female' | 'All';
  minHeightCm: number;
  statesAllowed: string[]; // ['All India'] or specific states
  vacancies: number;
  notificationDate: string; // YYYY-MM-DD
  applicationStart: string;
  applicationEnd: string;
  examDate: string;
  admitCardDate: string;
  resultDate: string;
  officialNotificationUrl: string;
  officialApplyUrl: string;
  officialWebsiteUrl: string;
  selectionProcess: SelectionStep[];
  requiredDocuments: DocumentItem[];
  status: RecruitmentStatus;
  description: string;
  verifiedOfficial: boolean;
  imageUrl?: string;
}

export interface EligibilityRequest {
  dob: string;
  gender: 'Male' | 'Female';
  qualification: QualificationLevel;
  percentage: number;
  heightCm: number;
  state: string;
  preferredBranch?: string;
}

export interface CriteriaCheck {
  passed: boolean;
  reason: string;
  userValue: string;
  requiredValue: string;
}

export interface EligibilityMatch {
  recruitment: Recruitment;
  overallScore: number; // 0 - 100%
  isEligible: boolean;
  criteria: {
    age: CriteriaCheck;
    qualification: CriteriaCheck;
    percentage: CriteriaCheck;
    gender: CriteriaCheck;
    height: CriteriaCheck;
  };
}

export interface Bookmark {
  id: string;
  userId: string;
  recruitmentId: string;
  savedAt: string;
}

export type EventType = 'Deadline' | 'Exam' | 'AdmitCard' | 'Result';

export interface CalendarEvent {
  id: string;
  recruitmentId: string;
  title: string;
  organization: Organization;
  date: string;
  type: EventType;
  status: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'Deadline' | 'AdmitCard' | 'Result' | 'NewMatch' | 'System';
  isRead: boolean;
  link?: string;
}

export interface AdmitCard {
  id: string;
  recruitmentId: string;
  recruitmentTitle: string;
  organization: Organization;
  releaseDate: string;
  examDate: string;
  officialUrl: string;
  status: 'Available' | 'Coming Soon' | 'Expired';
}

export interface ResultRecord {
  id: string;
  recruitmentId: string;
  recruitmentTitle: string;
  organization: Organization;
  resultDate: string;
  officialUrl: string;
  status: 'Published' | 'Awaited' | 'Archived';
}

export interface PlatformStats {
  totalUsers: number;
  activeRecruitments: number;
  closingSoonCount: number;
  upcomingExamsCount: number;
  totalBookmarks: number;
  admitCardsReleased: number;
  resultsPublished: number;
}
