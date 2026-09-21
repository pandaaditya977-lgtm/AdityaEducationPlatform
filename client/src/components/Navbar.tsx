import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  GraduationCap,
  Sparkles,
  Flame,
  Award,
  BookOpen,
  Compass,
  PlaySquare,
  CheckCircle2,
  Menu,
  X,
  UserCheck,
  ShieldCheck,
  LogOut,
  Mail,
  LogIn
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAiModal: () => void;
  openAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, openAiModal, openAuthModal }) => {
  const { currentUser, role, loginAs, logout } = useAuth();
  const { notificationMessage, siteSettings } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: GraduationCap },
    { id: 'teachers', label: 'Find Tutors', icon: Compass },
    { id: 'notes', label: 'Notes Library', icon: BookOpen },
    { id: 'shorts', label: 'EduShorts', icon: PlaySquare },
    { id: 'tests', label: 'Quizzes & Tests', icon: CheckCircle2 },
    { id: 'leaderboard', label: 'Leaderboard', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail },
    ...(role === 'ADMIN' ? [{ id: 'admin-dashboard', label: 'Admin Console', icon: ShieldCheck }] : [])
  ];

  const handleRoleChange = (newRole: UserRole) => {
    loginAs(newRole);
    setRoleDropdownOpen(false);
    if (newRole === 'TEACHER') {
      setActiveTab('teacher-dashboard');
    } else if (newRole === 'ADMIN') {
      setActiveTab('admin-dashboard');
    } else if (newRole === 'STUDENT') {
      setActiveTab('student-dashboard');
    } else {
      setActiveTab('home');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      {/* Site-wide Live Announcement Banner configured in Admin Panel */}
      {siteSettings?.announcementActive && siteSettings.announcementText && (
        <div
          className={`text-xs md:text-sm font-semibold py-1.5 px-4 text-center animate-fade-in flex items-center justify-center gap-2 border-b ${siteSettings.announcementType === 'warning'
            ? 'bg-amber-500/90 text-slate-950 border-amber-400/40 font-bold'
            : siteSettings.announcementType === 'alert'
              ? 'bg-rose-600/90 text-white border-rose-500/40'
              : siteSettings.announcementType === 'success'
                ? 'bg-emerald-600/90 text-white border-emerald-500/40'
                : 'bg-gradient-to-r from-blue-600/90 via-indigo-600/90 to-purple-600/90 text-white border-blue-500/30'
            }`}
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0 animate-pulse text-amber-200" />
          <span className="truncate">{siteSettings.announcementText}</span>
          {siteSettings.maintenanceMode && (
            <span className="ml-2 px-1.5 py-0.5 rounded bg-rose-950/80 text-rose-300 text-[10px] uppercase tracking-wider font-extrabold border border-rose-500/40">
              Maintenance Scheduled
            </span>
          )}
        </div>
      )}

      {/* Ephemeral Toast Notification Banner */}
      {notificationMessage && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs md:text-sm font-medium py-1.5 px-4 text-center animate-fade-in flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>{notificationMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent">
              Edu<span className="text-blue-500">Connect</span>
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
              v1.0
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${isActive
                  ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Section: AI Button, Persona Switcher, Profile */}
        <div className="flex items-center gap-3">


          {/* Student Stats Pill (if student) */}
          {role === 'STUDENT' && currentUser && (
            <div
              onClick={() => setActiveTab('student-dashboard')}
              className="hidden md:flex items-center gap-3 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700 transition"
              title="View Student Dashboard"
            >
              <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                <span>{currentUser.streakDays || 9}d</span>
              </div>
              <div className="w-px h-3 bg-slate-700" />
              <div className="flex items-center gap-1 text-blue-400 text-xs font-semibold">
                <Award className="w-3.5 h-3.5" />
                <span>{currentUser.rewardPoints || 1950} pts</span>
              </div>
            </div>
          )}

          {/* Prominent Log In / Auth Button */}
          {role === 'GUEST' ? (
            <button
              onClick={openAuthModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs md:text-sm font-bold shadow-md shadow-blue-500/25 transition cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In</span>
            </button>
          ) : (
            <button
              onClick={openAuthModal}
              title="Open Login / Account Dialog"
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
            >
              <LogIn className="w-3.5 h-3.5 text-blue-400" />
              <span>Log In / Switch</span>
            </button>
          )}

          {/* Persona / Role Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-600 transition text-xs font-medium text-slate-200"
            >
              {role === 'STUDENT' && <span className="w-2 h-2 rounded-full bg-blue-400"></span>}
              {role === 'TEACHER' && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
              {role === 'ADMIN' && <span className="w-2 h-2 rounded-full bg-purple-400"></span>}
              {role === 'GUEST' && <span className="w-2 h-2 rounded-full bg-slate-400"></span>}
              <span className="font-semibold text-slate-100">{role}</span>
              <span className="text-slate-400 text-[10px]">▼</span>
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 border-b border-slate-800 mb-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Switch Active Persona
                    </p>
                    <button
                      onClick={() => {
                        setRoleDropdownOpen(false);
                        openAuthModal();
                      }}
                      className="text-[10px] text-blue-400 hover:underline font-semibold"
                    >
                      Login Dialog
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 truncate">
                    {currentUser ? currentUser.name : 'Browsing as Guest'}
                  </p>
                </div>

                <button
                  onClick={() => handleRoleChange('STUDENT')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-left transition ${role === 'STUDENT' ? 'bg-blue-600/20 text-blue-400 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                >
                  <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-200">Alex Johnson</div>
                    <div className="text-[10px] text-slate-400">Student Portal (Grade 12)</div>
                  </div>
                </button>

                <button
                  onClick={() => handleRoleChange('TEACHER')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-left transition ${role === 'TEACHER' ? 'bg-emerald-600/20 text-emerald-400 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-200">Dr. Sarah Jenkins</div>
                    <div className="text-[10px] text-slate-400">Teacher Portal (Physics Lead)</div>
                  </div>
                </button>

                <button
                  onClick={() => handleRoleChange('ADMIN')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-left transition ${role === 'ADMIN' ? 'bg-purple-600/20 text-purple-400 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                >
                  <div className="w-7 h-7 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-200">Victoria Vance</div>
                    <div className="text-[10px] text-slate-400">Admin Governance Portal</div>
                  </div>
                </button>

                <div className="border-t border-slate-800 my-1"></div>

                <button
                  onClick={() => {
                    logout();
                    setRoleDropdownOpen(false);
                    setActiveTab('home');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout / Guest View</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Portal Switch Shortcut */}
          {role === 'STUDENT' && (
            <button
              onClick={() => setActiveTab('student-dashboard')}
              className={`hidden sm:flex items-center text-xs font-semibold px-3 py-1.5 rounded-lg border transition ${activeTab === 'student-dashboard'
                ? 'bg-blue-600 text-white border-blue-500'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
            >
              Dashboard
            </button>
          )}

          {role === 'TEACHER' && (
            <button
              onClick={() => setActiveTab('teacher-dashboard')}
              className={`hidden sm:flex items-center text-xs font-semibold px-3 py-1.5 rounded-lg border transition ${activeTab === 'teacher-dashboard'
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
            >
              Teacher Portal
            </button>
          )}

          {role === 'ADMIN' && (
            <button
              onClick={() => setActiveTab('admin-dashboard')}
              className={`hidden sm:flex items-center text-xs font-semibold px-3 py-1.5 rounded-lg border transition ${activeTab === 'admin-dashboard'
                ? 'bg-purple-600 text-white border-purple-500'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
            >
              Admin Portal
            </button>
          )}

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-1 animate-in slide-in-from-top duration-200">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}

          <div className="border-t border-slate-800 pt-3 mt-3">
            {role === 'STUDENT' && (
              <button
                onClick={() => {
                  setActiveTab('student-dashboard');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg bg-blue-600 text-white"
              >
                Go to Student Dashboard
              </button>
            )}
            {role === 'TEACHER' && (
              <button
                onClick={() => {
                  setActiveTab('teacher-dashboard');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg bg-emerald-600 text-white"
              >
                Go to Teacher Dashboard
              </button>
            )}
            {role === 'ADMIN' && (
              <button
                onClick={() => {
                  setActiveTab('admin-dashboard');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg bg-purple-600 text-white"
              >
                Go to Admin Dashboard
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAuthModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 mt-2 text-sm font-semibold rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition"
            >
              <LogIn className="w-4 h-4 text-blue-400" />
              <span>Sign In / Switch Account</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
