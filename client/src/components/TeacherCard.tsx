import React, { useState } from 'react';
import { Teacher } from '../types';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import {
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  BookOpen,
  Award,
  Video,
  Send,
  X,
  FileCheck2
} from 'lucide-react';

interface TeacherCardProps {
  teacher: Teacher;
  userDistanceKm?: number;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({ teacher, userDistanceKm }) => {
  const { requestAllotment } = useApp();
  const { currentUser, role } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(teacher.subjects[0] || 'Physics');
  const [selectedGrade, setSelectedGrade] = useState('12th');
  const [mode, setMode] = useState<'online' | 'offline' | 'hybrid'>(teacher.mode);
  const [budget, setBudget] = useState(teacher.hourlyRate);
  const [notes, setNotes] = useState('');
  const [credentialsOpen, setCredentialsOpen] = useState(false);

  const handleAllotmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestAllotment(teacher.id, selectedSubject, selectedGrade, mode, budget, notes);
    setModalOpen(false);
  };

  return (
    <>
      <div className="glass-card rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group">
        {/* Top Header: Avatar, Name, Verification, Rating */}
        <div>
          <div className="flex items-start gap-4 mb-4">
            <div className="relative flex-shrink-0">
              <img
                src={teacher.avatar}
                alt={teacher.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-700 group-hover:border-blue-500/50 transition shadow-md"
              />
              {teacher.verified && (
                <div
                  title="Verified Professional Tutorial Educator"
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-md border-2 border-slate-900"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <h3 className="text-base font-bold text-white truncate group-hover:text-blue-400 transition">
                  {teacher.name}
                </h3>
                <div className="flex items-center gap-1 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full text-amber-400 text-xs font-semibold">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{teacher.rating.toFixed(1)}</span>
                  <span className="text-slate-400 text-[10px]">({teacher.reviewCount})</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                {teacher.qualifications[0]}
              </p>

              <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-blue-400" />
                  {teacher.experienceYears}+ yrs exp
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 capitalize">
                  <span className={`w-1.5 h-1.5 rounded-full ${teacher.mode === 'online' ? 'bg-blue-400' : teacher.mode === 'hybrid' ? 'bg-purple-400' : 'bg-emerald-400'}`} />
                  {teacher.mode}
                </span>
              </div>
            </div>
          </div>

          {/* Bio snippet */}
          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
            {teacher.bio}
          </p>

          {/* Subjects and Grades Badges */}
          <div className="space-y-2 mb-4">
            <div className="flex flex-wrap gap-1.5">
              {teacher.subjects.map(s => (
                <span
                  key={s}
                  className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20 text-[11px] font-medium"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-500">Grades:</span>
              <span>{teacher.grade.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Location & Radius Details */}
        <div className="pt-3 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1.5 truncate max-w-[200px]" title={teacher.location.address}>
              <MapPin className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
              <span className="truncate">{teacher.location.city}</span>
            </div>
            {userDistanceKm !== undefined && (
              <span className="text-emerald-400 font-semibold text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                {userDistanceKm.toFixed(1)} km away
              </span>
            )}
          </div>

          {/* Hourly Rate & Action Buttons */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Tutor Fee</div>
              <div className="text-base font-bold text-white">
                ₹{teacher.hourlyRate}
                <span className="text-xs font-normal text-slate-400">/hr</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCredentialsOpen(true)}
                title="View Verified Credentials & Documents"
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
              >
                <FileCheck2 className="w-4 h-4 text-blue-400" />
              </button>

              <button
                onClick={() => setModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center gap-1.5"
              >
                <span>Request Allotment</span>
                <Send className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Allotment Request Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src={teacher.avatar}
                  alt={teacher.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                />
                <div>
                  <h3 className="font-bold text-white text-base">Request Tutor Allotment</h3>
                  <p className="text-xs text-blue-400">Mentorship with {teacher.name}</p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAllotmentSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Subject Selection
                </label>
                <select
                  value={selectedSubject}
                  onChange={e => setSelectedSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  {teacher.subjects.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Grade / Target Exam
                  </label>
                  <select
                    value={selectedGrade}
                    onChange={e => setSelectedGrade(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    {teacher.grade.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tutoring Mode
                  </label>
                  <select
                    value={mode}
                    onChange={e => setMode(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="online">Online Live Class</option>
                    <option value="offline">In-Person / Home Visit</option>
                    <option value="hybrid">Hybrid (Online + Monthly In-Person)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Budget per Hour (₹)
                </label>
                <input
                  type="number"
                  value={budget}
                  onChange={e => setBudget(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  min={300}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Specific Learning Goals / Focus Areas
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="e.g. Need help with Electromagnetism derivations, solving PYQs, or preparing for upcoming board practicals..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition cursor-pointer"
                >
                  Confirm & Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Credentials Modal */}
      {credentialsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Verified Credentials</h3>
              </div>
              <button
                onClick={() => setCredentialsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mt-4 text-xs">
              <div>
                <p className="text-slate-400 uppercase font-semibold text-[10px] tracking-wider mb-1">Academic Background</p>
                <ul className="space-y-1 text-slate-200">
                  {teacher.qualifications.map((q, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-blue-400" />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-slate-400 uppercase font-semibold text-[10px] tracking-wider mb-1">Admin Verified Documents</p>
                <div className="space-y-1.5">
                  {teacher.certificates.map((cert, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-800/80 border border-slate-700">
                      <span className="font-mono text-slate-300">{cert}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                        VERIFIED
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-400">
                <p>EduConnect thoroughly reviews government ID proof, degree transcripts, and conducts background interviews before issuing the verified educator badge.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
