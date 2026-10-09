import { 
  User, 
  Recruitment, 
  Bookmark, 
  AppNotification, 
  AdmitCard, 
  ResultRecord, 
  PlatformStats,
  RecruitmentStatus 
} from '../types';
import { 
  INITIAL_RECRUITMENTS, 
  INITIAL_ADMIT_CARDS, 
  INITIAL_RESULTS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_STATS 
} from './mockData';

const KEYS = {
  CURRENT_USER: 'drt_current_user',
  USERS: 'drt_users',
  RECRUITMENTS: 'drt_recruitments',
  BOOKMARKS: 'drt_bookmarks',
  NOTIFICATIONS: 'drt_notifications',
  ADMIT_CARDS: 'drt_admit_cards',
  RESULTS: 'drt_results',
  STATS: 'drt_stats'
};

// Demo Accounts
export const DEMO_USER: User = {
  id: 'usr-demo-01',
  name: 'Vikram Singh',
  email: 'vikram.singh@example.com',
  mobile: '+91 98765 43210',
  dob: '2004-05-15',
  gender: 'Male',
  state: 'Punjab',
  role: 'USER',
  isVerified: true,
  profileComplete: true,
  qualification: '12th Pass',
  percentage: 82.5,
  heightCm: 174,
  preferredBranch: 'Indian Army',
  createdAt: '2026-01-10'
};

export const DEMO_ADMIN: User = {
  id: 'usr-admin-01',
  name: 'Col. Rajesh Sharma (Retd.)',
  email: 'admin@drt.gov.in',
  mobile: '+91 99999 88888',
  dob: '1980-01-01',
  gender: 'Male',
  state: 'Delhi',
  role: 'ADMIN',
  isVerified: true,
  profileComplete: true,
  createdAt: '2025-12-01'
};

// Calculate dynamic status based on application end date
export function computeRecruitmentStatus(endDateStr: string): RecruitmentStatus {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(endDateStr);
  end.setHours(23, 59, 59, 999);

  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'Closed';
  if (diffDays <= 7) return 'Closing Soon';
  return 'Open';
}

export function computeDaysRemaining(endDateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(endDateStr);
  end.setHours(23, 59, 59, 999);

  const diffTime = end.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Storage API
export const storage = {
  // Current User Session
  getCurrentUser(): User | null {
    const data = localStorage.getItem(KEYS.CURRENT_USER);
    if (!data) {
      // Default to DEMO_USER for smooth immediate viewing
      this.setCurrentUser(DEMO_USER);
      return DEMO_USER;
    }
    return JSON.parse(data);
  },

  setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(KEYS.CURRENT_USER);
    }
  },

  // Users List
  getUsers(): User[] {
    const data = localStorage.getItem(KEYS.USERS);
    if (!data) {
      const initialUsers = [DEMO_USER, DEMO_ADMIN];
      localStorage.setItem(KEYS.USERS, JSON.stringify(initialUsers));
      return initialUsers;
    }
    return JSON.parse(data);
  },

  saveUser(user: User): void {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx >= 0) {
      users[idx] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    if (this.getCurrentUser()?.id === user.id) {
      this.setCurrentUser(user);
    }
  },

  // Recruitments CRUD
  getRecruitments(): Recruitment[] {
    const data = localStorage.getItem(KEYS.RECRUITMENTS);
    let recruitments: Recruitment[];
    if (!data) {
      recruitments = INITIAL_RECRUITMENTS;
      localStorage.setItem(KEYS.RECRUITMENTS, JSON.stringify(recruitments));
    } else {
      recruitments = JSON.parse(data);
    }

    const cleanOrgUrl = (org: string, currentUrl?: string): string => {
      switch (org) {
        case 'Indian Army': return 'https://joinindianarmy.nic.in';
        case 'Indian Navy': return 'https://joinindiannavy.gov.in';
        case 'Indian Air Force': return (currentUrl && currentUrl.includes('agnipath')) ? 'https://agnipathvayu.cdac.in' : 'https://afcat.cdac.in';
        case 'CAPF': return (currentUrl && currentUrl.includes('ssc')) ? 'https://ssc.gov.in' : 'https://upsc.gov.in';
        case 'Indian Coast Guard': return 'https://joinindiancoastguard.cdac.in';
        default: return currentUrl || 'https://joinindianarmy.nic.in';
      }
    };

    // Update statuses dynamically & sanitize portal links to live websites
    return recruitments.map(rec => {
      const liveUrl = cleanOrgUrl(rec.organization, rec.officialWebsiteUrl);
      return {
        ...rec,
        officialNotificationUrl: (rec.officialNotificationUrl && !rec.officialNotificationUrl.endsWith('.pdf')) ? rec.officialNotificationUrl : liveUrl,
        officialApplyUrl: (rec.officialApplyUrl && !rec.officialApplyUrl.includes('.pdf')) ? rec.officialApplyUrl : liveUrl,
        officialWebsiteUrl: liveUrl,
        status: computeRecruitmentStatus(rec.applicationEnd)
      };
    });
  },

  getRecruitmentById(id: string): Recruitment | undefined {
    return this.getRecruitments().find(r => r.id === id);
  },

  saveRecruitment(recruitment: Recruitment): void {
    const list = this.getRecruitments();
    const idx = list.findIndex(r => r.id === recruitment.id);
    recruitment.status = computeRecruitmentStatus(recruitment.applicationEnd);
    
    if (idx >= 0) {
      list[idx] = recruitment;
    } else {
      list.unshift(recruitment);
    }
    localStorage.setItem(KEYS.RECRUITMENTS, JSON.stringify(list));
  },

  deleteRecruitment(id: string): void {
    const list = this.getRecruitments().filter(r => r.id !== id);
    localStorage.setItem(KEYS.RECRUITMENTS, JSON.stringify(list));
  },

  // Bookmarks
  getBookmarks(userId: string): Bookmark[] {
    const data = localStorage.getItem(KEYS.BOOKMARKS);
    const bookmarks: Bookmark[] = data ? JSON.parse(data) : [
      { id: 'bm-1', userId: 'usr-demo-01', recruitmentId: 'rec-army-agniveer-gd-2026', savedAt: '2026-09-01' },
      { id: 'bm-2', userId: 'usr-demo-01', recruitmentId: 'rec-iaf-afcat-02-2026', savedAt: '2026-09-02' },
      { id: 'bm-3', userId: 'usr-demo-01', recruitmentId: 'rec-navy-ssr-01-2026', savedAt: '2026-09-03' }
    ];
    return bookmarks.filter(b => b.userId === userId);
  },

  isBookmarked(userId: string, recruitmentId: string): boolean {
    return this.getBookmarks(userId).some(b => b.recruitmentId === recruitmentId);
  },

  toggleBookmark(userId: string, recruitmentId: string): boolean {
    const data = localStorage.getItem(KEYS.BOOKMARKS);
    let allBookmarks: Bookmark[] = data ? JSON.parse(data) : [
      { id: 'bm-1', userId: 'usr-demo-01', recruitmentId: 'rec-army-agniveer-gd-2026', savedAt: '2026-09-01' },
      { id: 'bm-2', userId: 'usr-demo-01', recruitmentId: 'rec-iaf-afcat-02-2026', savedAt: '2026-09-02' },
      { id: 'bm-3', userId: 'usr-demo-01', recruitmentId: 'rec-navy-ssr-01-2026', savedAt: '2026-09-03' }
    ];

    const idx = allBookmarks.findIndex(b => b.userId === userId && b.recruitmentId === recruitmentId);
    let added = false;
    
    if (idx >= 0) {
      allBookmarks.splice(idx, 1);
    } else {
      allBookmarks.push({
        id: 'bm-' + Date.now(),
        userId,
        recruitmentId,
        savedAt: new Date().toISOString().split('T')[0]
      });
      added = true;
    }

    localStorage.setItem(KEYS.BOOKMARKS, JSON.stringify(allBookmarks));
    return added;
  },

  // Notifications
  getNotifications(): AppNotification[] {
    const data = localStorage.getItem(KEYS.NOTIFICATIONS);
    if (!data) {
      localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
      return INITIAL_NOTIFICATIONS;
    }
    return JSON.parse(data);
  },

  markNotificationAsRead(id: string): void {
    const list = this.getNotifications().map(n => n.id === id ? { ...n, isRead: true } : n);
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(list));
  },

  markAllNotificationsAsRead(): void {
    const list = this.getNotifications().map(n => ({ ...n, isRead: true }));
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(list));
  },

  addNotification(notification: Omit<AppNotification, 'id' | 'date' | 'isRead'>): void {
    const list = this.getNotifications();
    const newNotif: AppNotification = {
      ...notification,
      id: 'notif-' + Date.now(),
      date: new Date().toISOString(),
      isRead: false
    };
    list.unshift(newNotif);
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(list));
  },

  // Admit Cards CRUD
  getAdmitCards(): AdmitCard[] {
    const data = localStorage.getItem(KEYS.ADMIT_CARDS);
    let cards: AdmitCard[];
    if (!data) {
      cards = INITIAL_ADMIT_CARDS;
      localStorage.setItem(KEYS.ADMIT_CARDS, JSON.stringify(cards));
    } else {
      cards = JSON.parse(data);
    }

    const cleanOrgUrl = (org: string): string => {
      switch (org) {
        case 'Indian Army': return 'https://joinindianarmy.nic.in';
        case 'Indian Navy': return 'https://joinindiannavy.gov.in';
        case 'Indian Air Force': return 'https://afcat.cdac.in';
        case 'CAPF': return 'https://upsc.gov.in';
        case 'Indian Coast Guard': return 'https://joinindiancoastguard.cdac.in';
        default: return 'https://joinindianarmy.nic.in';
      }
    };

    return cards.map(c => ({
      ...c,
      officialUrl: cleanOrgUrl(c.organization)
    }));
  },

  saveAdmitCard(admitCard: AdmitCard): void {
    const list = this.getAdmitCards();
    const idx = list.findIndex(a => a.id === admitCard.id);
    if (idx >= 0) {
      list[idx] = admitCard;
    } else {
      list.unshift(admitCard);
    }
    localStorage.setItem(KEYS.ADMIT_CARDS, JSON.stringify(list));
  },

  deleteAdmitCard(id: string): void {
    const list = this.getAdmitCards().filter(a => a.id !== id);
    localStorage.setItem(KEYS.ADMIT_CARDS, JSON.stringify(list));
  },

  // Results CRUD
  getResults(): ResultRecord[] {
    const data = localStorage.getItem(KEYS.RESULTS);
    let results: ResultRecord[];
    if (!data) {
      results = INITIAL_RESULTS;
      localStorage.setItem(KEYS.RESULTS, JSON.stringify(results));
    } else {
      results = JSON.parse(data);
    }

    const cleanOrgUrl = (org: string): string => {
      switch (org) {
        case 'Indian Army': return 'https://joinindianarmy.nic.in';
        case 'Indian Navy': return 'https://joinindiannavy.gov.in';
        case 'Indian Air Force': return 'https://afcat.cdac.in';
        case 'CAPF': return 'https://ssc.gov.in';
        case 'Indian Coast Guard': return 'https://joinindiancoastguard.cdac.in';
        default: return 'https://joinindianarmy.nic.in';
      }
    };

    return results.map(r => ({
      ...r,
      officialUrl: cleanOrgUrl(r.organization)
    }));
  },

  saveResult(result: ResultRecord): void {
    const list = this.getResults();
    const idx = list.findIndex(r => r.id === result.id);
    if (idx >= 0) {
      list[idx] = result;
    } else {
      list.unshift(result);
    }
    localStorage.setItem(KEYS.RESULTS, JSON.stringify(list));
  },

  deleteResult(id: string): void {
    const list = this.getResults().filter(r => r.id !== id);
    localStorage.setItem(KEYS.RESULTS, JSON.stringify(list));
  },

  // Stats
  getStats(): PlatformStats {
    const recruitments = this.getRecruitments();
    const users = this.getUsers();
    const admitCards = this.getAdmitCards();
    const results = this.getResults();

    return {
      totalUsers: users.length + 14818,
      activeRecruitments: recruitments.filter(r => r.status === 'Open' || r.status === 'Closing Soon').length,
      closingSoonCount: recruitments.filter(r => r.status === 'Closing Soon').length,
      upcomingExamsCount: recruitments.filter(r => new Date(r.examDate) >= new Date()).length,
      totalBookmarks: 3240,
      admitCardsReleased: admitCards.filter(a => a.status === 'Available').length,
      resultsPublished: results.filter(r => r.status === 'Published').length
    };
  }
};
