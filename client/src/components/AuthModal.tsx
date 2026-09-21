import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  X,
  LogIn,
  UserPlus,
  GraduationCap,
  UserCheck,
  ShieldCheck,
  Mail,
  Lock,
  User,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Phone,
  BookOpen,
  Loader2,
  Camera
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'login',
  onSuccess
}) => {
  const { loginAs, registerUser, loginUser } = useAuth();
  const { refreshUsers } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [roleSelection, setRoleSelection] = useState<UserRole>('STUDENT');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [grade, setGrade] = useState('12th Standard');
  const [subjects, setSubjects] = useState('Physics');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarBase64, setAvatarBase64] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setErrorMsg('Image must be under 2 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setAvatarPreview(result);
      setAvatarBase64(result);
    };
    reader.readAsDataURL(file);
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    if (mode === 'register') {
      const result = await registerUser({
        name: name.trim(),
        email: email.trim(),
        password,
        role: roleSelection,
        phone: phone.trim() || undefined,
        grade: roleSelection === 'STUDENT' ? grade : undefined,
        subjects: roleSelection === 'TEACHER' ? subjects.split(',').map(s => s.trim()) : undefined,
        avatar: avatarBase64 || undefined
      });

      setIsLoading(false);

      if (!result.success) {
        setErrorMsg(result.error || 'Registration failed');
        return;
      }

      setSuccessMsg(`Account created in Neon PostgreSQL! Welcome, ${name}!`);
      if (refreshUsers) refreshUsers();
      setTimeout(() => {
        setSuccessMsg(null);
        onClose();
        if (onSuccess) onSuccess();
      }, 800);
    } else {
      const result = await loginUser(email.trim(), password);
      setIsLoading(false);

      if (!result.success) {
        setErrorMsg(result.error || 'Invalid credentials');
        return;
      }

      setSuccessMsg('Signed in successfully!');
      if (refreshUsers) refreshUsers();
      setTimeout(() => {
        setSuccessMsg(null);
        onClose();
        if (onSuccess) onSuccess();
      }, 700);
    }
  };

  const handleQuickDemoLogin = (targetRole: UserRole) => {
    loginAs(targetRole);
    setSuccessMsg(`Switched to demo ${targetRole}!`);
    setTimeout(() => {
      setSuccessMsg(null);
      onClose();
      if (onSuccess) onSuccess();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                {mode === 'login' ? 'Sign in to EduConnect' : 'Create an Account'}
              </h3>
              <p className="text-[11px] text-slate-400">
                Connected to Neon PostgreSQL Database
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1.5 m-4 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold shrink-0">
          <button
            onClick={() => {
              setMode('login');
              setErrorMsg(null);
            }}
            className={`py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
              mode === 'login'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          <button
            onClick={() => {
              setMode('register');
              setErrorMsg(null);
            }}
            className={`py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
              mode === 'register'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register</span>
          </button>
        </div>

        {/* Body Form */}
        <div className="p-6 pt-2 space-y-4 overflow-y-auto">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg ? (
            <div className="p-6 text-center space-y-2 animate-in zoom-in-95">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <p className="text-sm font-bold text-white">{successMsg}</p>
              <p className="text-xs text-slate-400">Syncing with database...</p>
            </div>
          ) : (
            <>
              {/* Role Picker (Student vs Teacher) */}
              {mode === 'register' && (
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    I am joining as a:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRoleSelection('STUDENT')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition flex items-center justify-center gap-2 ${
                        roleSelection === 'STUDENT'
                          ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                          : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>Student</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRoleSelection('TEACHER')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition flex items-center justify-center gap-2 ${
                        roleSelection === 'TEACHER'
                          ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400'
                          : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Teacher</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Form Fields */}
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                {mode === 'register' && (
                  <>
                    {/* Avatar Picker */}
                    <div className="flex flex-col items-center gap-2 pb-1">
                      <div
                        className="relative w-20 h-20 rounded-full cursor-pointer group"
                        onClick={() => avatarInputRef.current?.click()}
                      >
                        {avatarPreview ? (
                          <img
                            src={avatarPreview}
                            alt="Profile preview"
                            className="w-20 h-20 rounded-full object-cover ring-2 ring-blue-500/60"
                          />
                        ) : (
                          <div className={`w-20 h-20 rounded-full flex items-center justify-center ring-2 ${
                            roleSelection === 'TEACHER'
                              ? 'bg-emerald-900/40 ring-emerald-500/40'
                              : 'bg-blue-900/40 ring-blue-500/40'
                          }`}>
                            <User className={`w-9 h-9 ${
                              roleSelection === 'TEACHER' ? 'text-emerald-400' : 'text-blue-400'
                            }`} />
                          </div>
                        )}
                        {/* Camera overlay */}
                        <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                          <Camera className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => avatarInputRef.current?.click()}
                        className="text-[11px] text-slate-400 hover:text-blue-400 transition flex items-center gap-1"
                      >
                        <Camera className="w-3 h-3" />
                        {avatarPreview ? 'Change photo' : 'Upload profile photo (optional)'}
                      </button>
                      <input
                        ref={avatarInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </div>

                    {/* Full Name */}
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alex Johnson"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. user@educonnect.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {mode === 'register' && (
                  <>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">
                        Phone Number (optional)
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="tel"
                          placeholder="+91 98111 22334"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {roleSelection === 'STUDENT' ? (
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">
                          Academic Grade / Standard
                        </label>
                        <select
                          value={grade}
                          onChange={e => setGrade(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                        >
                          <option value="9th Standard">9th Standard</option>
                          <option value="10th Standard">10th Standard (Boards)</option>
                          <option value="11th Standard">11th Standard</option>
                          <option value="12th Standard">12th Standard (Boards / JEE / NEET)</option>
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">
                          Primary Teaching Subjects
                        </label>
                        <div className="relative">
                          <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                          <input
                            type="text"
                            placeholder="e.g. Physics, Applied Mathematics"
                            value={subjects}
                            onChange={e => setSubjects(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition cursor-pointer mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>
                    {isLoading
                      ? 'Saving to Database...'
                      : mode === 'login'
                      ? 'Sign In to Account'
                      : 'Create Free Account & Save to Database'}
                  </span>
                </button>
              </form>

              {/* 1-Click Instant Demo Login Section */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-semibold uppercase tracking-wider text-[10px]">
                    1-Click Instant Demo Login:
                  </span>
                  <span className="text-amber-400 flex items-center gap-1 font-semibold">
                    <Sparkles className="w-3 h-3" /> Quick Switch
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('STUDENT')}
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-blue-600/20 border border-slate-700 hover:border-blue-500/40 text-left transition group"
                  >
                    <div className="text-blue-400 font-bold text-[11px] flex items-center gap-1">
                      <GraduationCap className="w-3 h-3" /> Student
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">Alex (Grade 12)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('TEACHER')}
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-emerald-600/20 border border-slate-700 hover:border-emerald-500/40 text-left transition group"
                  >
                    <div className="text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                      <UserCheck className="w-3 h-3" /> Teacher
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">Dr. Sarah (Physics)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('ADMIN')}
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-purple-600/20 border border-slate-700 hover:border-purple-500/40 text-left transition group"
                  >
                    <div className="text-purple-400 font-bold text-[11px] flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Admin
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">Victoria (Console)</div>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
