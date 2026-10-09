import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { storage } from './services/storage';
import { Recruitment } from './types';
import { ToastContainer } from './components/common/Toast';
import { QuickRoleSwitcher } from './components/layout/QuickRoleSwitcher';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { OTPPage } from './pages/OTPPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { DashboardPage } from './pages/DashboardPage';
import { ExplorerPage } from './pages/ExplorerPage';
import { RecruitmentDetailPage } from './pages/RecruitmentDetailPage';
import { EligibilityPage } from './pages/EligibilityPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { CalendarPage } from './pages/CalendarPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { AdmitCardsPage } from './pages/AdmitCardsPage';
import { ResultsPage } from './pages/ResultsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminRecruitments } from './pages/admin/AdminRecruitments';
import { AdminAdmitCards } from './pages/admin/AdminAdmitCards';
import { AdminResults } from './pages/admin/AdminResults';
import { AdminUsers } from './pages/admin/AdminUsers';

import { OpeningSplash } from './components/common/OpeningSplash';

export function AppContent() {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [recruitments, setRecruitments] = useState<Recruitment[]>(() => storage.getRecruitments());
  const [selectedRecruitment, setSelectedRecruitment] = useState<Recruitment | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pendingRegisterUser, setPendingRegisterUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const refreshRecruitments = () => {
    setRecruitments(storage.getRecruitments());
  };

  const handleSelectRecruitment = (rec: Recruitment) => {
    setSelectedRecruitment(rec);
    setActiveTab('recruitment-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckEligibilityForRecruitment = (rec: Recruitment) => {
    setSelectedRecruitment(rec);
    setActiveTab('eligibility');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b1329] text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Patriotic Indian Flag Opening Animation Splash */}
      {showSplash && <OpeningSplash onComplete={() => setShowSplash(false)} />}

      {/* Top Demo Viva Quick Role Switcher Banner */}
      <QuickRoleSwitcher />

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onSearchQueryChange={setSearchQuery}
        toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Floating Toast Notification Container */}
      <ToastContainer />

      {/* Body Area: Full Width Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Main Dynamic View Content */}
        <main className="w-full pb-16 md:pb-0">
          {activeTab === 'home' && (
            <LandingPage
              recruitments={recruitments}
              setActiveTab={handleTabChange}
              onSelectRecruitment={handleSelectRecruitment}
            />
          )}

          {activeTab === 'login' && (
            <LoginPage setActiveTab={handleTabChange} />
          )}

          {activeTab === 'register' && (
            <RegisterPage
              setActiveTab={handleTabChange}
              setPendingRegisterUser={setPendingRegisterUser}
            />
          )}

          {activeTab === 'otp-verify' && (
            <OTPPage
              setActiveTab={handleTabChange}
              pendingRegisterUser={pendingRegisterUser}
            />
          )}

          {activeTab === 'forgot-password' && (
            <ForgotPasswordPage setActiveTab={handleTabChange} />
          )}

          {activeTab === 'dashboard' && (
            <DashboardPage
              recruitments={recruitments}
              setActiveTab={handleTabChange}
              onSelectRecruitment={handleSelectRecruitment}
            />
          )}

          {activeTab === 'explorer' && (
            <ExplorerPage
              recruitments={recruitments}
              onSelectRecruitment={handleSelectRecruitment}
              initialQuery={searchQuery}
            />
          )}

          {activeTab === 'recruitment-detail' && selectedRecruitment && (
            <RecruitmentDetailPage
              recruitment={selectedRecruitment}
              onBack={() => handleTabChange('explorer')}
              onCheckEligibility={handleCheckEligibilityForRecruitment}
            />
          )}

          {activeTab === 'eligibility' && (
            <EligibilityPage
              recruitments={recruitments}
              onSelectRecruitment={handleSelectRecruitment}
              targetRecruitment={selectedRecruitment}
            />
          )}

          {activeTab === 'bookmarks' && (
            <BookmarksPage
              recruitments={recruitments}
              onSelectRecruitment={handleSelectRecruitment}
              setActiveTab={handleTabChange}
            />
          )}

          {activeTab === 'calendar' && (
            <CalendarPage
              recruitments={recruitments}
              onSelectRecruitment={handleSelectRecruitment}
            />
          )}

          {activeTab === 'admit-cards' && (
            <AdmitCardsPage />
          )}

          {activeTab === 'results' && (
            <ResultsPage />
          )}

          {activeTab === 'notifications' && (
            <NotificationsPage setActiveTab={handleTabChange} />
          )}

          {activeTab === 'profile' && (
            <ProfilePage />
          )}

          {activeTab === 'about' && (
            <AboutPage />
          )}

          {activeTab === 'contact' && (
            <ContactPage />
          )}

          {/* Admin Portal Views */}
          {activeTab === 'admin-dashboard' && (
            <AdminDashboard
              recruitments={recruitments}
              setActiveTab={handleTabChange}
            />
          )}

          {activeTab === 'admin-recruitments' && (
            <AdminRecruitments
              recruitments={recruitments}
              onRefresh={refreshRecruitments}
            />
          )}

          {activeTab === 'admin-admit-cards' && (
            <AdminAdmitCards />
          )}

          {activeTab === 'admin-results' && (
            <AdminResults />
          )}

          {activeTab === 'admin-users' && (
            <AdminUsers />
          )}
        </main>

      </div>

      {/* Sticky Mobile Bottom Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Global Footer */}
      <Footer setActiveTab={handleTabChange} />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </AuthProvider>
  );
}
