import React from 'react';
import { GraduationCap, Heart, Shield, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Edu<span className="text-blue-500">Connect</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              India's premier hybrid tutoring & digital learning ecosystem. Connecting ambitious students with verified master educators, curated notes, reels-style microlearning, and objective test diagnostics.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-emerald-400" /> 100% Verified Faculty
              </span>
              <span>•</span>
              <span>CBSE / ICSE / JEE / NEET</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <p className="font-semibold text-white uppercase text-xs tracking-wider">Platform</p>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('teachers')} className="hover:text-blue-400 transition">
                  Find Verified Tutors
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('notes')} className="hover:text-blue-400 transition">
                  Digital Notes & Cheatsheets
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('shorts')} className="hover:text-blue-400 transition">
                  EduShorts Micro-Lessons
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tests')} className="hover:text-blue-400 transition">
                  Adaptive Chapter Tests
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('leaderboard')} className="hover:text-blue-400 transition">
                  Scholar Leaderboard
                </button>
              </li>
            </ul>
          </div>

          {/* Subjects */}
          <div className="space-y-3">
            <p className="font-semibold text-white uppercase text-xs tracking-wider">Subjects</p>
            <ul className="space-y-2 text-slate-400">
              <li>Physics (JEE / Boards)</li>
              <li>Chemistry (Organic & Physical)</li>
              <li>Pure & Applied Mathematics</li>
              <li>Biology & NEET Pre-Med</li>
              <li>Computer Science & Python</li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-3">
            <p className="font-semibold text-white uppercase text-xs tracking-wider">Contact & Support</p>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" /> support@educonnect.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" /> +91 11 4987 6543
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5" />
                <span>EduConnect Learning Tower, Outer Circle, Connaught Place, New Delhi 110001</span>
              </li>
            </ul>
            <button
              onClick={() => setActiveTab('contact')}
              className="mt-2 w-full py-1.5 px-3 rounded-lg bg-slate-900 border border-slate-700 hover:border-blue-500 text-xs text-slate-200 font-medium transition text-center"
            >
              Submit Support Query
            </button>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 EduConnect Platform Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for modern learners & passionate educators</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
