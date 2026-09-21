import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { User, Teacher, Allotment, Note, ShortVideo, Test, ContactQuery, UserRole, UserStatus } from '../types';
import {
  ShieldCheck,
  Users,
  CheckCircle2,
  XCircle,
  Mail,
  TrendingUp,
  FileCheck,
  Award,
  Clock,
  ArrowUpRight,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Ban,
  UserPlus,
  RefreshCw,
  BookOpen,
  PlaySquare,
  FileText,
  DollarSign,
  AlertTriangle,
  Megaphone,
  Settings,
  Eye,
  Check,
  X,
  ExternalLink,
  Flame,
  Activity,
  Layers,
  Sparkles,
  HelpCircle,
  Video,
  Sliders
} from 'lucide-react';

type AdminTab = 'overview' | 'users' | 'verifications' | 'allotments' | 'content' | 'queries' | 'settings';
type ContentSubTab = 'notes' | 'shorts' | 'tests';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser
  } = useAuth();

  const {
    teachers,
    allotments,
    notes,
    shorts,
    tests,
    contactQueries,
    users,
    siteSettings,
    auditLogs,
    verifyTeacher,
    updateQueryStatus,
    deleteContactQuery,
    addUser,
    updateUser,
    deleteUser,
    toggleUserSuspension,
    updateAllotmentStatus,
    reassignAllotment,
    deleteNote,
    deleteShort,
    addTest,
    deleteTest,
    updateSiteSettings,
    logAdminAction
  } = useApp();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [contentSubTab, setContentSubTab] = useState<ContentSubTab>('notes');

  // --- Search & Filters ---
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'ALL' | UserRole>('ALL');
  const [allotmentStatusFilter, setAllotmentStatusFilter] = useState<'ALL' | Allotment['status']>('ALL');
  const [queryStatusFilter, setQueryStatusFilter] = useState<'ALL' | ContactQuery['status']>('ALL');
  const [teacherFilter, setTeacherFilter] = useState<'ALL' | 'PENDING' | 'VERIFIED' | 'REJECTED'>('ALL');
  const [noteSearch, setNoteSearch] = useState('');

  // --- Modals State ---
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [inspectingTeacher, setInspectingTeacher] = useState<Teacher | null>(null);
  const [reassigningAllotment, setReassigningAllotment] = useState<Allotment | null>(null);
  const [selectedTeacherForReassign, setSelectedTeacherForReassign] = useState<string>('');
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);
  const [isAddTestOpen, setIsAddTestOpen] = useState(false);
  const [respondingQuery, setRespondingQuery] = useState<ContactQuery | null>(null);
  const [queryReplyNote, setQueryReplyNote] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  // --- Form States for Add User ---
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('STUDENT');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserGrade, setNewUserGrade] = useState('12th Standard');

  // --- Form States for Create Test ---
  const [newTestTitle, setNewTestTitle] = useState('');
  const [newTestSubject, setNewTestSubject] = useState('Physics');
  const [newTestGrade, setNewTestGrade] = useState('12th / JEE');
  const [newTestDuration, setNewTestDuration] = useState(15);
  const [newTestPassingScore, setNewTestPassingScore] = useState(60);
  const [newTestPoints, setNewTestPoints] = useState(50);
  const [newTestQuestions, setNewTestQuestions] = useState([
    {
      id: 'q_' + Date.now(),
      prompt: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
      topic: ''
    }
  ]);

  // --- Settings Form State ---
  const [bannerText, setBannerText] = useState(siteSettings.announcementText);
  const [bannerType, setBannerType] = useState(siteSettings.announcementType);
  const [bannerActive, setBannerActive] = useState(siteSettings.announcementActive);
  const [maintenanceMode, setMaintenanceMode] = useState(siteSettings.maintenanceMode);
  const [commissionRate, setCommissionRate] = useState(siteSettings.platformCommissionPercent);
  const [supportEmail, setSupportEmail] = useState(siteSettings.supportEmail);
  const [supportPhone, setSupportPhone] = useState(siteSettings.supportPhone);

  // --- Computed Stats ---
  const pendingVerificationsCount = teachers.filter(t => t.verificationStatus === 'PENDING' || !t.verified).length;
  const openInquiriesCount = contactQueries.filter(q => q.status !== 'RESOLVED').length;
  const activeAllotmentsCount = allotments.filter(a => a.status === 'ACTIVE').length;
  const totalNotesDownloads = notes.reduce((acc, n) => acc + (n.downloadCount || 0), 0);
  const totalShortsViews = shorts.reduce((acc, s) => acc + (s.views || 0), 0);
  const totalStudents = users.filter(u => u.role === 'STUDENT').length;
  const totalEducators = users.filter(u => u.role === 'TEACHER').length;

  // Filtered lists
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesRole = userRoleFilter === 'ALL' || u.role === userRoleFilter;
      const matchesSearch =
        u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
        (u.grade && u.grade.toLowerCase().includes(userSearch.toLowerCase()));
      return matchesRole && matchesSearch;
    });
  }, [users, userSearch, userRoleFilter]);

  const filteredTeachers = useMemo(() => {
    return teachers.filter(t => {
      if (teacherFilter === 'ALL') return true;
      if (teacherFilter === 'PENDING') return t.verificationStatus === 'PENDING' || !t.verified;
      if (teacherFilter === 'VERIFIED') return t.verified && t.verificationStatus === 'VERIFIED';
      if (teacherFilter === 'REJECTED') return t.verificationStatus === 'REJECTED';
      return true;
    });
  }, [teachers, teacherFilter]);

  const filteredAllotments = useMemo(() => {
    return allotments.filter(a => {
      if (allotmentStatusFilter === 'ALL') return true;
      return a.status === allotmentStatusFilter;
    });
  }, [allotments, allotmentStatusFilter]);

  const filteredQueries = useMemo(() => {
    return contactQueries.filter(q => {
      if (queryStatusFilter === 'ALL') return true;
      return q.status === queryStatusFilter;
    });
  }, [contactQueries, queryStatusFilter]);

  const filteredNotes = useMemo(() => {
    return notes.filter(n => {
      return (
        n.title.toLowerCase().includes(noteSearch.toLowerCase()) ||
        n.subject.toLowerCase().includes(noteSearch.toLowerCase()) ||
        n.teacherName.toLowerCase().includes(noteSearch.toLowerCase())
      );
    });
  }, [notes, noteSearch]);

  // Handlers
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings({
      announcementText: bannerText,
      announcementType: bannerType,
      announcementActive: bannerActive,
      maintenanceMode,
      platformCommissionPercent: commissionRate,
      supportEmail,
      supportPhone
    });
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;
    addUser({
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      phone: newUserPhone.trim() || '+91 98000 00000',
      grade: newUserGrade
    });
    setNewUserName('');
    setNewUserEmail('');
    setNewUserPhone('');
    setIsAddUserOpen(false);
  };

  const handleSaveEditedUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    updateUser(editingUser.id, editingUser);
    setEditingUser(null);
  };

  const handleCreateTestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestTitle.trim()) return;
    const testPayload: Test = {
      id: 'tst_' + Date.now(),
      title: newTestTitle.trim(),
      subject: newTestSubject,
      grade: newTestGrade,
      durationMinutes: Number(newTestDuration),
      passingScore: Number(newTestPassingScore),
      rewardPointsOnPass: Number(newTestPoints),
      negativeMarking: true,
      totalQuestions: newTestQuestions.length,
      questions: newTestQuestions
    };
    addTest(testPayload);
    setIsAddTestOpen(false);
    setNewTestTitle('');
  };

  const addQuestionRow = () => {
    setNewTestQuestions(prev => [
      ...prev,
      {
        id: 'q_' + Date.now() + '_' + prev.length,
        prompt: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: '',
        topic: newTestSubject
      }
    ]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>EduConnect Platform Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            Admin Management Console
            <span className="text-xs px-2.5 py-1 rounded-full bg-purple-900/60 text-purple-300 font-semibold border border-purple-700/50">
              Governance Active
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage users, accreditation, matchmaking, content libraries, customer desk, and site-wide configuration.
          </p>
        </div>

        {/* Action Shortcuts */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsAddUserOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add User</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <Megaphone className="w-4 h-4 text-amber-400" />
            <span>Site Banner</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800/80">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Executive Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
            activeTab === 'users'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Directory ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('verifications')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
            activeTab === 'verifications'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Accreditation Queue</span>
          {pendingVerificationsCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[10px]">
              {pendingVerificationsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('allotments')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
            activeTab === 'allotments'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Allotments ({allotments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('content')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
            activeTab === 'content'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Content Moderation</span>
        </button>

        <button
          onClick={() => setActiveTab('queries')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
            activeTab === 'queries'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Support Desk</span>
          {openInquiriesCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-blue-500 text-white font-extrabold text-[10px]">
              {openInquiriesCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Website Settings</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* 1. OVERVIEW / EXECUTIVE COMMAND TAB                      */}
      {/* ======================================================== */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
          {/* Key KPI Counter Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl glass-card relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Registered Users</span>
                <Users className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-2">{users.length}</div>
              <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">{totalStudents} Students</span>
                <span>•</span>
                <span className="text-blue-400 font-bold">{totalEducators} Tutors</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-card relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Allotments</span>
                <Layers className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-blue-400 mt-2">{allotments.length}</div>
              <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{activeAllotmentsCount} actively tutoring</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-card relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Content Published</span>
                <BookOpen className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2">
                {notes.length + shorts.length + tests.length}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {totalNotesDownloads.toLocaleString()} notes downloads • {totalShortsViews.toLocaleString()} video views
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-card relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Support Inbox</span>
                <Mail className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-2">{contactQueries.length}</div>
              <div className="text-[11px] text-amber-400 mt-1">
                {openInquiriesCount} queries require response
              </div>
            </div>
          </div>

          {/* Quick Shortcuts Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-900/30 via-slate-900 to-blue-900/30 border border-purple-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Instant Governance Actions</span>
              </div>
              <p className="text-xs text-slate-300">
                Quickly execute frequent platform oversight actions from a single command dashboard.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab('verifications')}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition cursor-pointer"
              >
                Review Accreditations ({pendingVerificationsCount})
              </button>
              <button
                onClick={() => setActiveTab('queries')}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition cursor-pointer"
              >
                Respond to Support ({openInquiriesCount})
              </button>
              <button
                onClick={() => {
                  setContentSubTab('tests');
                  setActiveTab('content');
                  setIsAddTestOpen(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer"
              >
                + Create Diagnostic Test
              </button>
            </div>
          </div>

          {/* Analytics & Audit Logs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Subject Demand & SLA */}
            <div className="p-6 rounded-2xl glass-card space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  Subject Demand Breakdown
                </h3>
                <span className="text-[11px] text-slate-400">Allotments & Searches</span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-slate-300 font-medium">Physics (JEE & Boards)</span>
                    <span className="font-bold text-blue-400">42%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="w-[42%] h-full bg-blue-500 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-slate-300 font-medium">Mathematics & Calculus</span>
                    <span className="font-bold text-purple-400">28%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="w-[28%] h-full bg-purple-500 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-slate-300 font-medium">Chemistry (Organic & Physical)</span>
                    <span className="font-bold text-emerald-400">18%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="w-[18%] h-full bg-emerald-500 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-slate-300 font-medium">Biology & NEET Pre-Med</span>
                    <span className="font-bold text-amber-400">12%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="w-[12%] h-full bg-amber-500 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-300">Teacher Accreditation Success Rate</span>
                  <span className="font-bold text-emerald-400">100% Verified</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-300">Median Allotment Turnaround Time</span>
                  <span className="font-bold text-blue-400">&lt; 2 Hours</span>
                </div>
              </div>
            </div>

            {/* Platform Audit Trail Log */}
            <div className="p-6 rounded-2xl glass-card space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Activity className="w-4 h-4 text-purple-400" />
                    Administrative Audit Trail
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">Live Activity Stream</span>
                </div>

                <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                  {auditLogs.map(log => (
                    <div
                      key={log.id}
                      className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1 hover:border-slate-700 transition"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-purple-300 px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/40 text-[10px] uppercase">
                          {log.action}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="font-semibold text-slate-200">{log.target}</div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">{log.details}</p>
                      <div className="text-[10px] text-slate-500">By: {log.adminName}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. USER & IDENTITY MANAGEMENT DIRECTORY                  */}
      {/* ======================================================== */}
      {activeTab === 'users' && (
        <div className="space-y-6 animate-fade-in">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex flex-1 items-center gap-2 max-w-md bg-slate-900 border border-slate-800 rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search users by name, email, or grade..."
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
                className="w-full bg-transparent text-xs text-white placeholder-slate-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                {(['ALL', 'STUDENT', 'TEACHER', 'ADMIN'] as const).map(roleOption => (
                  <button
                    key={roleOption}
                    onClick={() => setUserRoleFilter(roleOption)}
                    className={`px-3 py-1 rounded-lg font-semibold transition ${
                      userRoleFilter === roleOption ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {roleOption}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsAddUserOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shadow-md shadow-purple-600/30"
              >
                <Plus className="w-4 h-4" />
                <span>Add User</span>
              </button>
            </div>
          </div>

          {/* User Table */}
          <div className="rounded-2xl glass-card overflow-hidden border border-slate-800">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/80 uppercase text-[10px] tracking-wider text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="px-5 py-3.5 font-bold">User</th>
                    <th className="px-4 py-3.5 font-bold">Role</th>
                    <th className="px-4 py-3.5 font-bold">Academic Grade / Board</th>
                    <th className="px-4 py-3.5 font-bold">Rewards & Streak</th>
                    <th className="px-4 py-3.5 font-bold">Status</th>
                    <th className="px-5 py-3.5 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-slate-800/30 transition">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-9 h-9 rounded-xl object-cover border border-slate-700 shrink-0"
                          />
                          <div>
                            <div className="font-bold text-white flex items-center gap-1.5">
                              <span>{user.name}</span>
                              {user.role === 'ADMIN' && (
                                <span className="w-2 h-2 rounded-full bg-purple-400" title="Administrator" />
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400">{user.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <span
                          className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase border ${
                            user.role === 'ADMIN'
                              ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                              : user.role === 'TEACHER'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                              : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="text-slate-200 font-medium">{user.grade || 'General'}</div>
                        <div className="text-[11px] text-slate-400">{user.board || '—'}</div>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className="text-amber-400 font-bold flex items-center gap-1">
                            <Award className="w-3.5 h-3.5" />
                            {user.rewardPoints || 0} pts
                          </span>
                          {user.streakDays ? (
                            <span className="text-orange-400 text-[11px] font-semibold flex items-center gap-0.5">
                              <Flame className="w-3 h-3 fill-orange-400" />
                              {user.streakDays}d
                            </span>
                          ) : null}
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            user.status === 'SUSPENDED'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {user.status || 'ACTIVE'}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setEditingUser(user)}
                            title="Edit User Details"
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => toggleUserSuspension(user.id)}
                            title={user.status === 'SUSPENDED' ? 'Reinstate Account' : 'Suspend Account'}
                            className={`p-1.5 rounded-lg transition ${
                              user.status === 'SUSPENDED'
                                ? 'bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600 hover:text-white'
                                : 'bg-slate-800 hover:bg-amber-600/20 text-slate-400 hover:text-amber-300'
                            }`}
                          >
                            <Ban className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to permanently delete ${user.name}?`)) {
                                deleteUser(user.id);
                              }
                            }}
                            title="Delete Account Permanently"
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600/20 text-slate-400 hover:text-rose-400 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. TEACHER VERIFICATION & ACCREDITATION HUB              */}
      {/* ======================================================== */}
      {activeTab === 'verifications' && (
        <div className="space-y-6 animate-fade-in">
          {/* Subheader & filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-purple-400" />
                <span>Professional Tutorial Educator Accreditation</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Review submitted academic credentials, experience certifications, ID verification, and demo lectures.
              </p>
            </div>

            <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              {(['ALL', 'PENDING', 'VERIFIED', 'REJECTED'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setTeacherFilter(tab)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                    teacherFilter === tab ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Teacher Verification Cards */}
          <div className="grid grid-cols-1 gap-4">
            {filteredTeachers.map(teacher => (
              <div
                key={teacher.id}
                className="p-5 rounded-2xl glass-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-slate-700 transition"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={teacher.avatar}
                    alt={teacher.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-700 shrink-0"
                  />
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-white">{teacher.name}</h4>
                      <span
                        className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase border ${
                          teacher.verified && teacher.verificationStatus === 'VERIFIED'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : teacher.verificationStatus === 'REJECTED'
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        }`}
                      >
                        {teacher.verificationStatus}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300">{teacher.qualifications.join(' • ')}</p>
                    <p className="text-xs text-slate-400">
                      Subjects: <strong>{teacher.subjects.join(', ')}</strong> • Experience: {teacher.experienceYears} Years • Proposed Rate: ₹{teacher.hourlyRate}/hr
                    </p>

                    <div className="pt-1 flex flex-wrap gap-2">
                      {teacher.certificates.map((cert, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-blue-400 font-mono flex items-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>{cert}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <button
                    onClick={() => setInspectingTeacher(teacher)}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Credentials</span>
                  </button>

                  {(!teacher.verified || teacher.verificationStatus !== 'VERIFIED') && (
                    <button
                      onClick={() => verifyTeacher(teacher.id, true)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve Badge</span>
                    </button>
                  )}

                  {teacher.verified && (
                    <button
                      onClick={() => {
                        if (confirm(`Revoke verification badge for ${teacher.name}?`)) {
                          verifyTeacher(teacher.id, false, 'Admin revoked verification');
                        }
                      }}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-600/20 text-slate-400 hover:text-rose-400 text-xs font-semibold border border-slate-700 transition"
                    >
                      Revoke Badge
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. ALLOTMENTS & TUTORING MATCHMAKER CONTROL              */}
      {/* ======================================================== */}
      {activeTab === 'allotments' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-400" />
                <span>Student-Tutor Allotment Matchmaker Hub</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Oversee tutoring requests, reassign educators, monitor budgets, and resolve scheduling bottlenecks.
              </p>
            </div>

            <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              {(['ALL', 'ACTIVE', 'PENDING', 'ACCEPTED', 'REJECTED'] as const).map(statusOpt => (
                <button
                  key={statusOpt}
                  onClick={() => setAllotmentStatusFilter(statusOpt as any)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                    allotmentStatusFilter === statusOpt ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {statusOpt}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredAllotments.map(allotment => (
              <div
                key={allotment.id}
                className="p-5 rounded-2xl glass-card space-y-3 hover:border-slate-700 transition"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-purple-400 font-bold">{allotment.id}</span>
                    <span className="text-sm font-bold text-white">
                      {allotment.studentName} <span className="text-slate-400 font-normal">matched with</span> {allotment.teacherName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                        allotment.status === 'ACTIVE'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : allotment.status === 'ACCEPTED'
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                          : allotment.status === 'PENDING'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                      }`}
                    >
                      {allotment.status}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {new Date(allotment.requestedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 text-[11px]">Subject & Grade:</span>
                    <p className="font-semibold text-white">{allotment.subject} ({allotment.grade})</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px]">Tutoring Mode:</span>
                    <p className="font-semibold text-blue-400 capitalize">{allotment.mode}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px]">Hourly Budget:</span>
                    <p className="font-semibold text-emerald-400">₹{allotment.budget}/hr</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px]">Student ID:</span>
                    <p className="font-mono text-slate-300">{allotment.studentId}</p>
                  </div>
                </div>

                {allotment.notes && (
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
                    <span className="text-purple-400 font-bold mr-1">Study Goal:</span>
                    {allotment.notes}
                  </div>
                )}

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => {
                      setReassigningAllotment(allotment);
                      setSelectedTeacherForReassign(allotment.teacherId);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
                  >
                    Reassign Tutor
                  </button>

                  {allotment.status !== 'ACTIVE' && (
                    <button
                      onClick={() => updateAllotmentStatus(allotment.id, 'ACTIVE')}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition"
                    >
                      Activate Allotment
                    </button>
                  )}

                  {allotment.status !== 'CANCELLED' && (
                    <button
                      onClick={() => updateAllotmentStatus(allotment.id, 'CANCELLED')}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-600/20 text-slate-400 hover:text-rose-400 text-xs font-semibold border border-slate-700 transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. CONTENT & COURSEWARE MODERATION                       */}
      {/* ======================================================== */}
      {activeTab === 'content' && (
        <div className="space-y-6 animate-fade-in">
          {/* Content Subtab Selector */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setContentSubTab('notes')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  contentSubTab === 'notes' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Notes Library ({notes.length})</span>
              </button>
              <button
                onClick={() => setContentSubTab('shorts')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  contentSubTab === 'shorts' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <PlaySquare className="w-3.5 h-3.5" />
                <span>EduShorts Feed ({shorts.length})</span>
              </button>
              <button
                onClick={() => setContentSubTab('tests')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  contentSubTab === 'tests' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Quizzes & Tests ({tests.length})</span>
              </button>
            </div>

            {contentSubTab === 'tests' && (
              <button
                onClick={() => setIsAddTestOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shadow-md shadow-purple-600/25"
              >
                <Plus className="w-4 h-4" />
                <span>Create Test Assessment</span>
              </button>
            )}
          </div>

          {/* Subtab: Study Notes */}
          {contentSubTab === 'notes' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 max-w-sm bg-slate-900 border border-slate-800 rounded-xl px-3 py-2">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Filter notes by title or subject..."
                  value={noteSearch}
                  onChange={e => setNoteSearch(e.target.value)}
                  className="w-full bg-transparent text-xs text-white placeholder-slate-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredNotes.map(note => (
                  <div key={note.id} className="p-5 rounded-2xl glass-card space-y-3 relative group">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 uppercase">
                          {note.subject} • {note.grade}
                        </span>
                        <h4 className="text-sm font-bold text-white mt-1.5">{note.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">{note.chapter}</p>
                      </div>

                      <button
                        onClick={() => {
                          if (confirm(`Delete note "${note.title}"?`)) {
                            deleteNote(note.id);
                          }
                        }}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600/20 text-slate-400 hover:text-rose-400 transition"
                        title="Delete Note"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{note.description}</p>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                      <span>By: <strong className="text-slate-200">{note.teacherName}</strong></span>
                      <div className="flex items-center gap-3 font-mono text-[11px]">
                        <span>{(note.fileSizeKb / 1024).toFixed(1)} MB</span>
                        <span>{note.downloadCount} downloads</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subtab: EduShorts */}
          {contentSubTab === 'shorts' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {shorts.map(short => (
                <div key={short.id} className="rounded-2xl glass-card overflow-hidden flex flex-col justify-between">
                  <div className="relative aspect-[9/12] overflow-hidden bg-slate-950">
                    <img
                      src={short.poster}
                      alt={short.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <button
                      onClick={() => setPreviewVideoUrl(short.videoUrl)}
                      className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-blue-600/80 hover:bg-blue-600 flex items-center justify-center text-white shadow-xl transition cursor-pointer"
                    >
                      <Video className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-3 left-3 right-3 text-xs space-y-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-600/80 text-white uppercase">
                        {short.topic}
                      </span>
                      <h4 className="font-bold text-white text-xs leading-tight line-clamp-2">{short.title}</h4>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900/90 flex items-center justify-between text-xs text-slate-300">
                    <div className="space-y-0.5">
                      <div className="text-[11px] text-slate-400">{short.teacherName}</div>
                      <div className="text-[10px] font-mono text-emerald-400">{short.views.toLocaleString()} views • {short.likes} likes</div>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm(`Remove EduShort "${short.title}"?`)) {
                          deleteShort(short.id);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600/20 text-slate-400 hover:text-rose-400 transition"
                      title="Delete Short"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Subtab: Quizzes & Tests */}
          {contentSubTab === 'tests' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tests.map(test => (
                <div key={test.id} className="p-5 rounded-2xl glass-card space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 uppercase">
                        {test.subject} • {test.grade}
                      </span>
                      <h4 className="text-base font-bold text-white mt-1.5">{test.title}</h4>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm(`Delete test assessment "${test.title}"?`)) {
                          deleteTest(test.id);
                        }
                      }}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600/20 text-slate-400 hover:text-rose-400 transition"
                      title="Delete Test"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-center">
                    <div>
                      <span className="text-slate-400 text-[10px]">Questions</span>
                      <p className="font-bold text-white mt-0.5">{test.questions.length}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px]">Duration</span>
                      <p className="font-bold text-blue-400 mt-0.5">{test.durationMinutes} min</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px]">Pass Score</span>
                      <p className="font-bold text-emerald-400 mt-0.5">{test.passingScore}%</p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 space-y-1">
                    <div className="font-semibold text-slate-300">Question Preview:</div>
                    {test.questions.slice(0, 2).map((q, idx) => (
                      <div key={idx} className="truncate text-[11px] text-slate-400">
                        {idx + 1}. {q.prompt}
                      </div>
                    ))}
                    {test.questions.length > 2 && (
                      <div className="text-[10px] text-purple-400">+ {test.questions.length - 2} more questions</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. SUPPORT INQUIRY & FEEDBACK DESK                       */}
      {/* ======================================================== */}
      {activeTab === 'queries' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>Contact Us Support Desk</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Inbound student and parent inquiries, tutoring matchmaking consultations, and institutional inquiries.
              </p>
            </div>

            <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              {(['ALL', 'PENDING', 'IN_REVIEW', 'RESOLVED'] as const).map(qTab => (
                <button
                  key={qTab}
                  onClick={() => setQueryStatusFilter(qTab as any)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                    queryStatusFilter === qTab ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {qTab}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredQueries.map(query => (
              <div key={query.id} className="p-5 rounded-2xl glass-card space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-sm font-bold text-white">{query.name}</span>
                    <span className="text-xs text-slate-400 ml-2">
                      ({query.email} {query.phone && `• ${query.phone}`})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                        query.status === 'RESOLVED'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : query.status === 'IN_REVIEW'
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      }`}
                    >
                      {query.status}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {new Date(query.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <p className="text-xs font-semibold text-blue-300">
                  Subject: {query.subject}
                </p>

                <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  {query.message}
                </p>

                {query.adminNotes && (
                  <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-800/40 text-xs text-purple-300">
                    <strong>Admin Resolution Note:</strong> {query.adminNotes}
                  </div>
                )}

                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    onClick={() => {
                      if (confirm('Delete this inquiry permanently?')) {
                        deleteContactQuery(query.id);
                      }
                    }}
                    className="p-1.5 text-xs text-slate-500 hover:text-rose-400 transition"
                  >
                    Delete inquiry
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setRespondingQuery(query);
                        setQueryReplyNote(query.adminNotes || '');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
                    >
                      Add Admin Note
                    </button>

                    {query.status !== 'RESOLVED' && (
                      <button
                        onClick={() => updateQueryStatus(query.id, 'RESOLVED', 'Resolved via admin console')}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer"
                      >
                        Mark Resolved
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 7. WEBSITE SETTINGS & ANNOUNCEMENTS                      */}
      {/* ======================================================== */}
      {activeTab === 'settings' && (
        <div className="max-w-4xl space-y-6 animate-fade-in">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-purple-400" />
              <span>Platform Configuration & Live Ticker</span>
            </h2>
            <p className="text-xs text-slate-400">
              Configure the site-wide announcement ticker, emergency maintenance mode, commission rates, and contact details.
            </p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-6">
            {/* Live Announcement Banner Configuration */}
            <div className="p-6 rounded-2xl glass-card space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Megaphone className="w-4 h-4 text-amber-400" />
                    Top Announcement Banner
                  </h3>
                  <p className="text-xs text-slate-400">Appears at the very top of all pages across the website.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bannerActive}
                    onChange={e => setBannerActive(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Banner Announcement Text</label>
                <input
                  type="text"
                  value={bannerText}
                  onChange={e => setBannerText(e.target.value)}
                  placeholder="e.g. 🌟 Admissions Open for Academic Year 2026–2027!"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:border-purple-500 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Banner Theme Color</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['info', 'warning', 'alert', 'success'] as const).map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setBannerType(type)}
                      className={`p-2 rounded-xl text-xs font-semibold uppercase border transition cursor-pointer ${
                        bannerType === type
                          ? 'border-white bg-slate-800 text-white shadow-md'
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Preview */}
              <div className="pt-2">
                <span className="text-[11px] font-semibold text-slate-400">Live Preview:</span>
                <div
                  className={`mt-1.5 text-xs font-semibold py-2 px-4 rounded-xl text-center flex items-center justify-center gap-2 ${
                    bannerType === 'warning'
                      ? 'bg-amber-500/90 text-slate-950'
                      : bannerType === 'alert'
                      ? 'bg-rose-600/90 text-white'
                      : bannerType === 'success'
                      ? 'bg-emerald-600/90 text-white'
                      : 'bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{bannerText || 'No banner message set'}</span>
                </div>
              </div>
            </div>

            {/* Platform Controls & Fees */}
            <div className="p-6 rounded-2xl glass-card space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Settings className="w-4 h-4 text-blue-400" />
                Operational & Financial Parameters
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Platform Tutoring Commission (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={commissionRate}
                    onChange={e => setCommissionRate(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Maintenance Mode Warning</label>
                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="maint"
                      checked={maintenanceMode}
                      onChange={e => setMaintenanceMode(e.target.checked)}
                      className="w-4 h-4 rounded bg-slate-900 text-purple-600 focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor="maint" className="text-xs text-slate-300 cursor-pointer">
                      Display scheduled maintenance warning banner
                    </label>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Official Support Email</label>
                  <input
                    type="email"
                    value={supportEmail}
                    onChange={e => setSupportEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Official Support Phone</label>
                  <input
                    type="text"
                    value={supportPhone}
                    onChange={e => setSupportPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition cursor-pointer"
                >
                  Save Platform Settings
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 1: ADD NEW USER                                    */}
      {/* ======================================================== */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-purple-400" />
                <span>Create New User Account</span>
              </h3>
              <button
                onClick={() => setIsAddUserOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={e => setNewUserName(e.target.value)}
                  placeholder="e.g. Maya Patel"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={e => setNewUserEmail(e.target.value)}
                  placeholder="e.g. maya@example.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Designated Role *</label>
                <select
                  value={newUserRole}
                  onChange={e => setNewUserRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                >
                  <option value="STUDENT">Student</option>
                  <option value="TEACHER">Teacher / Faculty</option>
                  <option value="ADMIN">Administrator</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Grade / Specialization</label>
                <input
                  type="text"
                  value={newUserGrade}
                  onChange={e => setNewUserGrade(e.target.value)}
                  placeholder="e.g. 12th Standard or Physics Lead"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Phone Contact</label>
                <input
                  type="text"
                  value={newUserPhone}
                  onChange={e => setNewUserPhone(e.target.value)}
                  placeholder="+91 98000 00000"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: EDIT USER DETAILS                               */}
      {/* ======================================================== */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-blue-400" />
                <span>Edit User Profile</span>
              </h3>
              <button onClick={() => setEditingUser(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedUser} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Name</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={e => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Email</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Role</label>
                  <select
                    value={editingUser.role}
                    onChange={e => setEditingUser({ ...editingUser, role: e.target.value as UserRole })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  >
                    <option value="STUDENT">STUDENT</option>
                    <option value="TEACHER">TEACHER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Status</label>
                  <select
                    value={editingUser.status || 'ACTIVE'}
                    onChange={e => setEditingUser({ ...editingUser, status: e.target.value as UserStatus })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="SUSPENDED">SUSPENDED</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Reward Points</label>
                  <input
                    type="number"
                    value={editingUser.rewardPoints || 0}
                    onChange={e => setEditingUser({ ...editingUser, rewardPoints: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Streak Days</label>
                  <input
                    type="number"
                    value={editingUser.streakDays || 0}
                    onChange={e => setEditingUser({ ...editingUser, streakDays: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: INSPECT TEACHER CREDENTIALS & REASON MODAL       */}
      {/* ======================================================== */}
      {inspectingTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={inspectingTeacher.avatar}
                  alt={inspectingTeacher.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                />
                <div>
                  <h3 className="text-base font-bold text-white">{inspectingTeacher.name}</h3>
                  <p className="text-xs text-slate-400">{inspectingTeacher.qualifications.join(', ')}</p>
                </div>
              </div>
              <button onClick={() => setInspectingTeacher(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 leading-relaxed">
                <span className="font-bold text-white block mb-1">Biography & Statement of Purpose:</span>
                {inspectingTeacher.bio}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[10px]">Teaching Subjects:</span>
                  <p className="font-bold text-white">{inspectingTeacher.subjects.join(', ')}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[10px]">Experience & Rating:</span>
                  <p className="font-bold text-amber-400">{inspectingTeacher.experienceYears} Years • ★ {inspectingTeacher.rating}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[10px]">Proposed Hourly Fee:</span>
                  <p className="font-bold text-emerald-400">₹{inspectingTeacher.hourlyRate} / hour</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="font-bold text-white block">Submitted Certifications & ID Proofs:</span>
                <div className="space-y-1">
                  {inspectingTeacher.certificates.map((cert, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-blue-400"
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>{cert}</span>
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold">Document Validated</span>
                    </div>
                  ))}
                </div>
              </div>

              {inspectingTeacher.sampleVideoUrl && (
                <div className="space-y-1.5">
                  <span className="font-bold text-white block">Sample Lecture Video Demonstration:</span>
                  <div className="rounded-xl overflow-hidden bg-black border border-slate-800 aspect-video">
                    <video
                      src={inspectingTeacher.sampleVideoUrl}
                      controls
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <label className="font-semibold text-slate-300">Administrative Decision Feedback / Notes</label>
                <input
                  type="text"
                  placeholder="Enter optional feedback reason if rejecting or special notes..."
                  value={rejectionReason}
                  onChange={e => setRejectionReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
              <button
                onClick={() => {
                  verifyTeacher(inspectingTeacher.id, false, rejectionReason || 'Qualifications insufficient');
                  setInspectingTeacher(null);
                  setRejectionReason('');
                }}
                className="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600 hover:text-white text-rose-300 text-xs font-bold border border-rose-600/30 transition"
              >
                Reject Application
              </button>
              <button
                onClick={() => {
                  verifyTeacher(inspectingTeacher.id, true);
                  setInspectingTeacher(null);
                  setRejectionReason('');
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition cursor-pointer"
              >
                Approve & Grant Verified Badge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: REASSIGN ALLOTMENT                              */}
      {/* ======================================================== */}
      {reassigningAllotment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-blue-400" />
                <span>Reassign Allotment Educator</span>
              </h3>
              <button onClick={() => setReassigningAllotment(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-300">
                Current Tutor: <strong className="text-white">{reassigningAllotment.teacherName}</strong>
                <br />
                Student: <strong className="text-white">{reassigningAllotment.studentName}</strong> ({reassigningAllotment.subject})
              </p>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Select New Assigned Educator:</label>
                <select
                  value={selectedTeacherForReassign}
                  onChange={e => setSelectedTeacherForReassign(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                >
                  {teachers
                    .filter(t => t.verified)
                    .map(t => (
                      <option key={t.id} value={t.id}>
                        {t.name} — {t.subjects.join(', ')} (₹{t.hourlyRate}/hr)
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
              <button
                onClick={() => setReassigningAllotment(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const targetTeacher = teachers.find(t => t.id === selectedTeacherForReassign);
                  if (targetTeacher) {
                    reassignAllotment(reassigningAllotment.id, targetTeacher.id, targetTeacher.name);
                  }
                  setReassigningAllotment(null);
                }}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
              >
                Confirm Reassignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 5: VIDEO PREVIEW MODAL                             */}
      {/* ======================================================== */}
      {previewVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <PlaySquare className="w-4 h-4 text-purple-400" />
                <span>Media Playback Preview</span>
              </h4>
              <button onClick={() => setPreviewVideoUrl(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="rounded-xl overflow-hidden bg-black aspect-video">
              <video src={previewVideoUrl} controls autoPlay className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 6: CREATE TEST / QUIZ                              */}
      {/* ======================================================== */}
      {isAddTestOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Publish Diagnostic Test Assessment</span>
              </h3>
              <button onClick={() => setIsAddTestOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTestSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Test Title *</label>
                <input
                  type="text"
                  required
                  value={newTestTitle}
                  onChange={e => setNewTestTitle(e.target.value)}
                  placeholder="e.g. Physics Chapter 8: Ray Optics & Wave Nature"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Subject</label>
                  <select
                    value={newTestSubject}
                    onChange={e => setNewTestSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Grade</label>
                  <input
                    type="text"
                    value={newTestGrade}
                    onChange={e => setNewTestGrade(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Duration (min)</label>
                  <input
                    type="number"
                    value={newTestDuration}
                    onChange={e => setNewTestDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Pass Score %</label>
                  <input
                    type="number"
                    value={newTestPassingScore}
                    onChange={e => setNewTestPassingScore(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  />
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Questions Bank ({newTestQuestions.length})</span>
                  <button
                    type="button"
                    onClick={addQuestionRow}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-purple-400 hover:text-purple-300 font-bold text-[11px]"
                  >
                    + Add Question
                  </button>
                </div>

                {newTestQuestions.map((q, idx) => (
                  <div key={q.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-purple-400 text-xs">Question #{idx + 1}</span>
                      {newTestQuestions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setNewTestQuestions(prev => prev.filter((_, i) => i !== idx))}
                          className="text-rose-400 hover:underline text-[11px]"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      required
                      placeholder="Question prompt..."
                      value={q.prompt}
                      onChange={e => {
                        const updated = [...newTestQuestions];
                        updated[idx].prompt = e.target.value;
                        setNewTestQuestions(updated);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white outline-none"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => (
                        <input
                          key={optIdx}
                          type="text"
                          required
                          placeholder={`Option ${optIdx + 1}`}
                          value={opt}
                          onChange={e => {
                            const updated = [...newTestQuestions];
                            updated[idx].options[optIdx] = e.target.value;
                            setNewTestQuestions(updated);
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white outline-none"
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <label className="text-slate-400 text-[11px]">Correct Option:</label>
                      <select
                        value={q.correctAnswer}
                        onChange={e => {
                          const updated = [...newTestQuestions];
                          updated[idx].correctAnswer = Number(e.target.value);
                          setNewTestQuestions(updated);
                        }}
                        className="px-2 py-1 rounded bg-slate-900 text-white border border-slate-800"
                      >
                        <option value={0}>Option 1</option>
                        <option value={1}>Option 2</option>
                        <option value={2}>Option 3</option>
                        <option value={3}>Option 4</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddTestOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  Publish Assessment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 7: INQUIRY ADMIN RESOLUTION NOTE MODAL             */}
      {/* ======================================================== */}
      {respondingQuery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>Support Inquiry Resolution</span>
              </h3>
              <button onClick={() => setRespondingQuery(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-white">{respondingQuery.name} ({respondingQuery.email})</div>
                <div className="text-blue-300 font-semibold">{respondingQuery.subject}</div>
                <p className="text-slate-400 leading-relaxed">{respondingQuery.message}</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">Admin Resolution / Follow-up Note:</label>
                <textarea
                  rows={3}
                  value={queryReplyNote}
                  onChange={e => setQueryReplyNote(e.target.value)}
                  placeholder="e.g. Spoke over phone, scheduled 30m trial session for Monday..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
              <button
                onClick={() => setRespondingQuery(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateQueryStatus(respondingQuery.id, 'IN_REVIEW', queryReplyNote);
                  setRespondingQuery(null);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
              >
                Mark In Review
              </button>
              <button
                onClick={() => {
                  updateQueryStatus(respondingQuery.id, 'RESOLVED', queryReplyNote || 'Resolved by administrator');
                  setRespondingQuery(null);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
              >
                Mark Resolved
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
