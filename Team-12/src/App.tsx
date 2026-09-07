import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WaterDataProvider } from './context/WaterDataContext';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { MobileNavigation } from './components/common/MobileNavigation';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { AddUsagePage } from './pages/AddUsagePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SuggestionsPage } from './pages/SuggestionsPage';
import { ComparePage } from './pages/ComparePage';
import { ReceiptPage } from './pages/ReceiptPage';
import { ChallengesPage } from './pages/ChallengesPage';
import { SettingsPage } from './pages/SettingsPage';
import { X, Sparkles, Droplet } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MainAppContent: React.FC = () => {
  const { user, isDemoMode, disableDemoMode } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>(() => {
    // If user is already logged in or in demo mode, go straight to dashboard
    if (user || isDemoMode) return 'dashboard';
    return 'landing';
  });

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // If on landing page
  if (currentTab === 'landing' && !user && !isDemoMode) {
    return <LandingPage onEnterApp={() => setCurrentTab('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-cyan-100 selection:text-sky-900">
      {/* Demo Mode Notice Banner if active */}
      {isDemoMode && (
        <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-700 text-white px-4 py-1.5 text-xs font-medium flex items-center justify-between shadow-xs z-50">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>
                <strong>Sample Demo Mode</strong> active for Priya's Household. Preloaded with 7-day water logs and benchmark data.
              </span>
            </span>
            <button
              onClick={() => {
                disableDemoMode();
                setCurrentTab('landing');
              }}
              className="text-[11px] underline font-bold hover:text-cyan-200 transition-colors ml-4 shrink-0"
            >
              Sign In to Your Account
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-1 relative overflow-hidden">
        {/* Desktop Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={(tab) => setCurrentTab(tab)}
          className="hidden md:flex min-h-[calc(100vh-2.5rem)] sticky top-0"
        />

        {/* Mobile Drawer Overlay */}
        <AnimatePresence>
          {mobileDrawerOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileDrawerOpen(false)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 md:hidden"
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                className="fixed inset-y-0 left-0 w-72 bg-white z-50 shadow-2xl flex flex-col md:hidden"
              >
                <div className="p-3 flex justify-end">
                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
                    title="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <Sidebar
                  currentTab={currentTab}
                  onSelectTab={(tab) => {
                    setCurrentTab(tab);
                    setMobileDrawerOpen(false);
                  }}
                  className="w-full flex-1 border-r-0"
                  onCloseMobile={() => setMobileDrawerOpen(false)}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header Bar */}
          <Header
            onOpenMobileSidebar={() => setMobileDrawerOpen(true)}
            onNavigate={(tab) => setCurrentTab(tab)}
          />

          {/* Page Body View with Animated Transition */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-20 md:pb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                {currentTab === 'dashboard' && (
                  <DashboardPage onNavigate={(tab) => setCurrentTab(tab)} />
                )}
                {currentTab === 'add-usage' && <AddUsagePage />}
                {currentTab === 'analytics' && <AnalyticsPage />}
                {currentTab === 'suggestions' && <SuggestionsPage />}
                {currentTab === 'compare' && <ComparePage />}
                {currentTab === 'receipt' && <ReceiptPage />}
                {currentTab === 'challenges' && <ChallengesPage />}
                {currentTab === 'settings' && <SettingsPage />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNavigation
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        onOpenMenu={() => setMobileDrawerOpen(true)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <WaterDataProvider>
        <MainAppContent />
      </WaterDataProvider>
    </AuthProvider>
  );
}
