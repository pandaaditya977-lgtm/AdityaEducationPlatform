import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  UserCheck,
  Check,
  X,
  Plus,
  Upload,
  BookOpen,
  PlaySquare,
  FileText,
  Star,
  Users,
  Award
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { allotments, updateAllotmentStatus, notes, addNote, addShort } = useApp();

  // State for Upload Note Modal
  const [isUploadNoteOpen, setIsUploadNoteOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteSubject, setNoteSubject] = useState('Physics');
  const [noteChapter, setNoteChapter] = useState('');
  const [noteGrade, setNoteGrade] = useState('12th Standard');
  const [noteDescription, setNoteDescription] = useState('');
  const [noteSummary, setNoteSummary] = useState('');

  // State for Publish Short Modal
  const [isPublishShortOpen, setIsPublishShortOpen] = useState(false);
  const [shortTitle, setShortTitle] = useState('');
  const [shortTopic, setShortTopic] = useState('Physics Experiment');
  const [shortDuration, setShortDuration] = useState(30);

  // Allotments for this teacher (or all for demo)
  const teacherAllotments = allotments;

  const handleUploadNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle || !noteChapter) return;

    addNote({
      title: noteTitle,
      description: noteDescription || 'Teacher curated chapter notes with solved practice problems.',
      subject: noteSubject,
      chapter: noteChapter,
      grade: noteGrade,
      fileUrl: '/notes/sample_uploaded_note.pdf',
      fileSizeKb: 2840,
      aiSummary: noteSummary || `Core takeaways for ${noteTitle}: Key derivations, definitions, and high-yield numerical problem solutions.`,
      teacherName: currentUser?.name || 'Dr. Sarah Jenkins'
    });

    setIsUploadNoteOpen(false);
    setNoteTitle('');
    setNoteChapter('');
    setNoteDescription('');
    setNoteSummary('');
  };

  const handlePublishShortSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shortTitle) return;

    addShort({
      title: shortTitle,
      topic: shortTopic,
      durationSeconds: shortDuration,
      teacherName: currentUser?.name || 'Dr. Sarah Jenkins',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      poster: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80'
    });

    setIsPublishShortOpen(false);
    setShortTitle('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Teacher Profile Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/20 relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'}
                alt={currentUser?.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
              />
              <div
                title="Admin Verified Educator"
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs border-2 border-slate-900"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">{currentUser?.name}</h1>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  VERIFIED FACULTY
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Ph.D. High-Energy Physics (IIT Delhi) • 12+ Years Experience • 4.95 ★ (168 Reviews)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsUploadNoteOpen(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Notes</span>
            </button>
            <button
              onClick={() => setIsPublishShortOpen(true)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-rose-500/20 transition cursor-pointer"
            >
              <PlaySquare className="w-4 h-4" />
              <span>Post EduShort</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Allotment Requests & Uploaded Materials */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Student Allotment Requests */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Student Allotment Inquiries</h2>
            </div>
            <span className="text-xs text-slate-400">
              {teacherAllotments.filter(a => a.status === 'PENDING').length} Action Required
            </span>
          </div>

          <div className="space-y-3">
            {teacherAllotments.map(allotment => (
              <div
                key={allotment.id}
                className="p-5 rounded-2xl glass-card space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">
                        {allotment.studentName}
                      </h4>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          allotment.status === 'ACTIVE'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : allotment.status === 'REJECTED'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {allotment.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      Subject: <strong>{allotment.subject}</strong> ({allotment.grade}) • Mode: <span className="capitalize">{allotment.mode}</span> • Offered Fee: ₹{allotment.budget}/hr
                    </p>
                    {allotment.notes && (
                      <p className="text-xs text-slate-400 italic mt-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                        "{allotment.notes}"
                      </p>
                    )}
                  </div>

                  {allotment.status === 'PENDING' && (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => updateAllotmentStatus(allotment.id, 'ACTIVE')}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1 shadow-md shadow-emerald-600/20 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Accept Allotment</span>
                      </button>
                      <button
                        onClick={() => updateAllotmentStatus(allotment.id, 'REJECTED')}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-600/20 hover:text-rose-300 text-slate-400 text-xs font-semibold transition"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Decline</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Teacher Stats & Documents */}
        <div className="space-y-6">
          <div className="p-5 rounded-3xl glass-card space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              Educator Metrics
            </h3>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="text-xl font-bold text-white">18</div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Active Students</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="text-xl font-bold text-blue-400">96.8%</div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Student Retention</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="text-xl font-bold text-amber-400">4.95 ★</div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Average Rating</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="text-xl font-bold text-emerald-400">₹850</div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Hourly Rate</div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-3xl glass-card space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              Verified Documentation
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-300">IIT_Delhi_Doctorate.pdf</span>
                <span className="text-emerald-400 font-bold text-[10px]">VERIFIED</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-300">Teaching_Fellowship_2023.pdf</span>
                <span className="text-emerald-400 font-bold text-[10px]">VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Note Modal */}
      {isUploadNoteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">Upload Curated Chapter Notes</h3>
              <button
                onClick={() => setIsUploadNoteOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadNoteSubmit} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Note Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ray Optics & Optical Instruments Formula Sheet"
                  value={noteTitle}
                  onChange={e => setNoteTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Subject</label>
                  <select
                    value={noteSubject}
                    onChange={e => setNoteSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Chapter Tag</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chapter 9: Ray Optics"
                    value={noteChapter}
                    onChange={e => setNoteChapter(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Detailed Description</label>
                <textarea
                  rows={2}
                  placeholder="Summary of derivations and solved PYQs included in this PDF..."
                  value={noteDescription}
                  onChange={e => setNoteDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">AI Quick Summary (Optional Preview)</label>
                <textarea
                  rows={2}
                  placeholder="Bullet points highlighted by AI for fast exam revision..."
                  value={noteSummary}
                  onChange={e => setNoteSummary(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadNoteOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  Publish to Students
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Publish Short Modal */}
      {isPublishShortOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">Publish Vertical EduShort (≤60s)</h3>
              <button
                onClick={() => setIsPublishShortOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePublishShortSubmit} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Video Title / Hook</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Why Total Internal Reflection Happens (in 30s)!"
                  value={shortTitle}
                  onChange={e => setShortTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Topic Category</label>
                  <input
                    type="text"
                    required
                    value={shortTopic}
                    onChange={e => setShortTopic(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Duration (Seconds)</label>
                  <input
                    type="number"
                    max={60}
                    value={shortDuration}
                    onChange={e => setShortDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 text-[11px]">
                Demo uses high-definition Google CDN media stream sample for instantaneous playback.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPublishShortOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold"
                >
                  Upload & Stream Short
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
