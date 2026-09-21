import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import {
  Flame,
  Award,
  BookOpen,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Play,
  TrendingUp,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

interface StudentDashboardProps {
  setActiveTab: (tab: string) => void;
  openAiModal: () => void;
  startQuiz: (testId: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  setActiveTab,
  openAiModal,
  startQuiz
}) => {
  const { currentUser } = useAuth();
  const { allotments, notes, tests, testAttempts, badges } = useApp();

  const activeAllotments = allotments.filter(
    a => a.studentId === currentUser?.id || a.studentId === 'usr_student_alex'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Student Welcome Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-950/40 to-slate-900 border border-blue-500/20 relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-400 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">
                  Welcome back, {currentUser?.name}!
                </h1>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-semibold border border-blue-500/30">
                  Active Scholar
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {currentUser?.grade} • {currentUser?.board}
              </p>
            </div>
          </div>

          {/* Gamification Stats */}
          <div className="flex items-center gap-4">
            <div className="p-3 px-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Flame className="w-5 h-5 fill-amber-400" />
              </div>
              <div>
                <div className="text-lg font-bold text-white">
                  {currentUser?.streakDays || 9} Days
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Active Streak</div>
              </div>
            </div>

            <div className="p-3 px-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-bold text-white">
                  {currentUser?.rewardPoints || 1950}
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Reward Points</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Allotments & Active Mentors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: My Mentors & Allotments */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-bold text-white">My Allotted Mentors</h2>
            </div>
            <button
              onClick={() => setActiveTab('teachers')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
            >
              + Request New Teacher
            </button>
          </div>

          <div className="space-y-3">
            {activeAllotments.map(allotment => (
              <div
                key={allotment.id}
                className="p-4 rounded-2xl glass-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">
                      {allotment.teacherName}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        allotment.status === 'ACTIVE'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {allotment.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Subject: <strong>{allotment.subject}</strong> ({allotment.grade}) • Mode: <span className="capitalize">{allotment.mode}</span>
                  </p>
                  {allotment.notes && (
                    <p className="text-[11px] text-slate-400 italic">
                      "{allotment.notes}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={openAiModal}
                    className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-semibold transition flex items-center justify-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Ask AI Doubt</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('notes')}
                    className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition"
                  >
                    View Notes
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Practice Quizzes & Adaptive Tests */}
          <div className="pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white">Available Practice Quizzes</h2>
              </div>
              <button
                onClick={() => setActiveTab('tests')}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
              >
                View All Tests
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tests.map(test => (
                <div
                  key={test.id}
                  className="p-4 rounded-2xl glass-card space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span className="font-semibold text-blue-400">{test.subject}</span>
                      <span>{test.durationMinutes} mins</span>
                    </div>
                    <h4 className="text-xs font-bold text-white leading-snug">
                      {test.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {test.totalQuestions} Questions • Earn +{test.rewardPointsOnPass} pts on passing
                    </p>
                  </div>

                  <button
                    onClick={() => startQuiz(test.id)}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Start Timed Quiz</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Badges & Weak Topic Diagnostics */}
        <div className="space-y-6">
          {/* Unlocked Badges */}
          <div className="p-5 rounded-3xl glass-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                Earned Badges
              </h3>
              <button
                onClick={() => setActiveTab('leaderboard')}
                className="text-xs text-slate-400 hover:text-white"
              >
                Leaderboard →
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {badges.map(b => (
                <div
                  key={b.id}
                  className={`p-3 rounded-2xl border text-center space-y-1.5 transition ${
                    b.unlocked
                      ? 'bg-slate-900/90 border-slate-700'
                      : 'bg-slate-950/40 border-slate-800 opacity-50'
                  }`}
                >
                  <div className="w-8 h-8 mx-auto rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                    ★
                  </div>
                  <h5 className="text-xs font-bold text-white truncate">{b.title}</h5>
                  <span
                    className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
                      b.tier === 'GOLD'
                        ? 'bg-amber-500/20 text-amber-400'
                        : b.tier === 'SILVER'
                        ? 'bg-slate-400/20 text-slate-300'
                        : 'bg-emerald-500/20 text-emerald-400'
                    }`}
                  >
                    {b.tier}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Test History & AI Diagnostic Feedback */}
          <div className="p-5 rounded-3xl glass-card space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              Latest Test Diagnostics
            </h3>

            {testAttempts.length === 0 ? (
              <p className="text-xs text-slate-400">
                You haven't attempted any tests yet. Complete your first chapter quiz above to unlock weak-topic insights!
              </p>
            ) : (
              <div className="space-y-3">
                {testAttempts.slice(0, 2).map(att => (
                  <div key={att.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{att.testTitle}</span>
                      <span
                        className={`font-bold px-2 py-0.5 rounded ${
                          att.passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                        }`}
                      >
                        {att.score}%
                      </span>
                    </div>

                    {att.weakTopics.length > 0 && (
                      <div className="text-[11px] text-amber-400 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                        <span>Focus Area: {att.weakTopics.join(', ')}</span>
                      </div>
                    )}

                    <p className="text-[11px] text-slate-300 bg-slate-950 p-2 rounded border border-slate-800/80">
                      💡 {att.aiFeedback}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
