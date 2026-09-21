import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AiAssistantModal } from './components/AiAssistantModal';
import { AuthModal } from './components/AuthModal';

import { LandingPage } from './pages/LandingPage';
import { TeacherDiscoveryPage } from './pages/TeacherDiscoveryPage';
import { NotesPage } from './pages/NotesPage';
import { ShortsPage } from './pages/ShortsPage';
import { QuizRunnerPage } from './pages/QuizRunnerPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { ContactPage } from './pages/ContactPage';
import { Sparkles, Bot } from 'lucide-react';

const MainApp: React.FC = () => {
  const { role } = useAuth();
  const [activeTab, setActiveTabState] = useState<string>(
    () => localStorage.getItem('educonnect_active_tab') || 'home'
  );

  // Persist active tab across page reloads
  const setActiveTab = (tab: string) => {
    localStorage.setItem('educonnect_active_tab', tab);
    setActiveTabState(tab);
  };

  // Clear persisted tab on auth role change (e.g. logout → home)
  useEffect(() => {
    if (role === 'GUEST') {
      const tab = localStorage.getItem('educonnect_active_tab') || 'home';
      const protectedTabs = ['student-dashboard', 'teacher-dashboard', 'admin-dashboard'];
      if (protectedTabs.includes(tab)) {
        setActiveTab('home');
      }
    }
  }, [role]);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeQuizId, setActiveQuizId] = useState<string>('tst_phy_1');

  const handleStartQuiz = (testId: string) => {
    setActiveQuizId(testId);
    setActiveTab('quiz-runner');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 selection:bg-blue-500 selection:text-white">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAiModal={() => setIsAiModalOpen(true)}
        openAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <LandingPage
            setActiveTab={setActiveTab}
            openAiModal={() => setIsAiModalOpen(true)}
          />
        )}

        {activeTab === 'teachers' && <TeacherDiscoveryPage />}

        {activeTab === 'notes' && <NotesPage />}

        {activeTab === 'shorts' && <ShortsPage />}

        {activeTab === 'tests' && (
          <QuizRunnerPage
            testId={activeQuizId}
            onFinish={() => setActiveTab('student-dashboard')}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'quiz-runner' && (
          <QuizRunnerPage
            testId={activeQuizId}
            onFinish={() => setActiveTab('student-dashboard')}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'leaderboard' && <LeaderboardPage />}

        {activeTab === 'contact' && <ContactPage />}

        {activeTab === 'student-dashboard' && (
          <StudentDashboard
            setActiveTab={setActiveTab}
            openAiModal={() => setIsAiModalOpen(true)}
            startQuiz={handleStartQuiz}
          />
        )}

        {activeTab === 'teacher-dashboard' && <TeacherDashboard />}

        {activeTab === 'admin-dashboard' && <AdminDashboard />}
      </main>

      {/* Floating AI Doubt Solver Button */}
      <button
        onClick={() => setIsAiModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-600 text-white shadow-2xl shadow-purple-600/40 hover:scale-105 transition flex items-center gap-2 group cursor-pointer border border-purple-400/30"
        title="Open EduConnect AI Doubt Companion"
      >
        <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-bold hidden sm:inline">Ask AI Doubt</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </button>

      {/* Global AI Doubt Modal */}
      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      {/* Authentication & Persona Login Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <MainApp />
      </AppProvider>
    </AuthProvider>
  );
}
