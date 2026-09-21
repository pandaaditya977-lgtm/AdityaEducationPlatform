import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TeacherCard } from '../components/TeacherCard';
import { NoteViewerModal } from '../components/NoteViewerModal';
import { Note } from '../types';
import {
  GraduationCap,
  Sparkles,
  Search,
  MapPin,
  ShieldCheck,
  Zap,
  BookOpen,
  PlaySquare,
  Award,
  CheckCircle2,
  ArrowRight,
  Star,
  Users,
  TrendingUp,
  BrainCircuit,
  MessageSquare
} from 'lucide-react';

interface LandingPageProps {
  setActiveTab: (tab: string) => void;
  openAiModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setActiveTab, openAiModal }) => {
  const { teachers, notes, shorts } = useApp();
  const [searchSubject, setSearchSubject] = useState('');
  const [searchGrade, setSearchGrade] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('teachers');
  };

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        {/* Background Glowing Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          {/* Super Header Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 border border-blue-500/30 text-blue-400 text-xs md:text-sm font-semibold shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Next-Gen Online Tutoring & Gamified Learning Platform</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.12]">
            Find the right teacher. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Learn, test, and get rewarded.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            EduConnect connects students with verified, top-tier subject mentors. Access high-yield notes, vertical EduShorts, objective timed tests with AI diagnostics, and location-based local tutoring.
          </p>

          {/* Hero Search & Allotment Discovery Widget */}
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={handleHeroSearch}
              className="p-2 sm:p-3 rounded-2xl glass-panel shadow-2xl flex flex-col sm:flex-row items-center gap-2 border border-slate-700/80"
            >
              <div className="flex-1 w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800">
                <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Subject (e.g. Physics, Calculus, Organic Chemistry)..."
                  value={searchSubject}
                  onChange={e => setSearchSubject(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div className="w-full sm:w-44 flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800">
                <GraduationCap className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <select
                  value={searchGrade}
                  onChange={e => setSearchGrade(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-300 focus:outline-none"
                >
                  <option value="" className="bg-slate-900">All Grades</option>
                  <option value="10th" className="bg-slate-900">Class 10th</option>
                  <option value="11th" className="bg-slate-900">Class 11th</option>
                  <option value="12th" className="bg-slate-900">Class 12th</option>
                  <option value="IIT-JEE" className="bg-slate-900">IIT-JEE Prep</option>
                  <option value="NEET" className="bg-slate-900">NEET Pre-Med</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-500/30 transition flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer"
              >
                <span>Find Tutors</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-3 flex items-center justify-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Background-Verified
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" /> Geolocation Radius Search
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Instant Allotment
              </span>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl glass-card text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">500+</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Verified Educators</div>
            </div>
            <div className="p-4 rounded-2xl glass-card text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">12,500+</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Notes & Cheatsheets</div>
            </div>
            <div className="p-4 rounded-2xl glass-card text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">99.4%</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Board & JEE Pass Rate</div>
            </div>
            <div className="p-4 rounded-2xl glass-card text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">4.95 ★</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Student Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Platform Features Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Everything you need to excel in academics
          </h2>
          <p className="text-sm text-slate-400">
            Engineered based on the EduConnect modular specification — merging human mentorship with AI intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div
            onClick={() => setActiveTab('teachers')}
            className="glass-card p-6 rounded-2xl space-y-4 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30 group-hover:scale-105 transition">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition">
              Verified Teacher Allotment
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Match with subject specialists based on board syllabus, preferred language, and learning budget. Supports both online live sessions and nearby home visits.
            </p>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 pt-2">
              <span>Browse Tutor Directory</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Feature 2 */}
          <div
            onClick={() => setActiveTab('notes')}
            className="glass-card p-6 rounded-2xl space-y-4 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30 group-hover:scale-105 transition">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition">
              Digital Notes with AI Summaries
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              High-yield teacher notes categorized by chapter and grade. Generate instant 2-minute AI executive summaries highlighting top-scoring exam formulas.
            </p>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-400 pt-2">
              <span>Explore Notes Library</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Feature 3 */}
          <div
            onClick={() => setActiveTab('shorts')}
            className="glass-card p-6 rounded-2xl space-y-4 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30 group-hover:scale-105 transition">
              <PlaySquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition">
              EduShorts Microlearning
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Reels & TikTok style vertical educational clips (≤60s). Learn complex physics experiments, math hacks, and chemical mechanisms on the go.
            </p>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 pt-2">
              <span>Watch EduShorts Feed</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Feature 4 */}
          <div
            onClick={() => setActiveTab('tests')}
            className="glass-card p-6 rounded-2xl space-y-4 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 group-hover:scale-105 transition">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition">
              Timed Quizzes & Weak-Topic Analytics
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Interactive chapter tests with negative marking, timers, and instant grading. Pinpoint weak topics and receive automated AI study plans.
            </p>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 pt-2">
              <span>Take a Practice Quiz</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Feature 5 */}
          <div
            onClick={() => setActiveTab('leaderboard')}
            className="glass-card p-6 rounded-2xl space-y-4 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 group-hover:scale-105 transition">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition">
              Gamified Streaks & Badges
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Earn reward points for quiz streaks, daily logins, and video completions. Unlock Bronze, Silver, Gold, and Platinum badges and climb the leaderboard.
            </p>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 pt-2">
              <span>View Leaderboard</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Feature 6 */}
          <div
            onClick={openAiModal}
            className="glass-card p-6 rounded-2xl space-y-4 cursor-pointer group border-purple-500/30"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-600/30 text-purple-300 flex items-center justify-center border border-purple-400/40 group-hover:scale-105 transition">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition">
              24/7 AI Doubt Companion
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Stuck on a tricky numerical at 11 PM? Ask EduConnect AI for step-by-step formula derivations or escalate directly to your allotted mentor.
            </p>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-300 pt-2">
              <span>Ask a Doubt Now</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Verified Tutors Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Meet Top-Rated Verified Educators
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Ph.D. researchers, Olympiad trainers, and senior institute faculty ready for 1-on-1 mentorship.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('teachers')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition"
          >
            <span>View All {teachers.length} Teachers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teachers.slice(0, 3).map(teacher => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      </section>

      {/* Notes & EduShorts Teaser Split Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Notes Side */}
          <div className="p-8 rounded-3xl glass-card space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Curated Study Materials</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              Master complex topics with chapter cheatsheets
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every note is authored by verified faculty and reviewed for board and competitive syllabus alignment. Includes formula summaries and common traps.
            </p>

            <div className="space-y-3">
              {notes.slice(0, 2).map(n => (
                <div
                  key={n.id}
                  onClick={() => setSelectedNote(n)}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-xs">
                      PDF
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-200 group-hover:text-blue-400 transition line-clamp-1">
                        {n.title}
                      </h4>
                      <p className="text-[11px] text-slate-400">{n.subject} • {n.chapter}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition">
                    Preview →
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('notes')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition"
            >
              Open Complete Notes Catalog
            </button>
          </div>

          {/* Shorts Side */}
          <div className="p-8 rounded-3xl glass-card space-y-6 bg-gradient-to-br from-purple-950/20 to-slate-900">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
              <PlaySquare className="w-3.5 h-3.5" />
              <span>Swipeable Reels Format</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              Bite-sized visual concepts in under 60 seconds
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Study during short breaks. Watch experiments, shortcut formulas, and tricky memory mnemonics in full vertical video.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {shorts.slice(0, 2).map(s => (
                <div
                  key={s.id}
                  onClick={() => setActiveTab('shorts')}
                  className="relative rounded-2xl overflow-hidden aspect-[9/14] cursor-pointer group shadow-lg"
                >
                  <img
                    src={s.poster}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-3 flex flex-col justify-end">
                    <span className="text-[10px] font-bold text-amber-300 bg-black/60 px-2 py-0.5 rounded-full w-fit mb-1">
                      {s.topic}
                    </span>
                    <p className="text-xs font-semibold text-white line-clamp-2 leading-tight">
                      {s.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('shorts')}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition"
            >
              Launch EduShorts Player
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-blue-900/60 via-indigo-900/60 to-purple-900/60 border border-blue-500/30 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to accelerate your learning journey?
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Get allotted to a qualified mentor today, access comprehensive chapter notes, and track your performance with objective quiz scoring.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
            <button
              onClick={() => setActiveTab('teachers')}
              className="px-6 py-3 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-slate-100 transition shadow-lg cursor-pointer"
            >
              Find a Tutor Nearby
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className="px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white font-semibold text-sm border border-slate-700 transition cursor-pointer"
            >
              Contact Advisory Team
            </button>
          </div>
        </div>
      </section>

      {/* Note preview modal */}
      {selectedNote && (
        <NoteViewerModal note={selectedNote} onClose={() => setSelectedNote(null)} />
      )}
    </div>
  );
};
