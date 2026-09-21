import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Note } from '../types';
import { NoteViewerModal } from '../components/NoteViewerModal';
import {
  BookOpen,
  Search,
  Filter,
  Download,
  Sparkles,
  FileText,
  User,
  Clock,
  ArrowRight
} from 'lucide-react';

export const NotesPage: React.FC = () => {
  const { notes } = useApp();
  const [selectedSubject, setSelectedSubject] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNote, setActiveNote] = useState<Note | null>(null);

  const filteredNotes = notes.filter(n => {
    if (selectedSubject !== 'ALL' && n.subject !== selectedSubject) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        n.title.toLowerCase().includes(q) ||
        n.chapter.toLowerCase().includes(q) ||
        n.teacherName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Structured Learning Content</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Digital Notes & Formula Cheatsheets
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Access chapter notes authored by verified educators. Generate AI executive summaries with high-yield derivations in one click.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl glass-panel flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-1 w-full relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search notes by chapter, formula, or educator..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Subject Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['ALL', 'Physics', 'Mathematics', 'Chemistry', 'Biology', 'Computer Science'].map(s => (
            <button
              key={s}
              onClick={() => setSelectedSubject(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedSubject === s
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {s === 'ALL' ? 'All Subjects' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map(note => (
          <div
            key={note.id}
            className="glass-card rounded-2xl p-5 flex flex-col justify-between space-y-4 group"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold text-[10px]">
                  {note.subject}
                </span>
                <span className="text-[11px] text-slate-400">{note.chapter}</span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition line-clamp-2">
                {note.title}
              </h3>

              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mt-2">
                {note.description}
              </p>

              {/* AI Summary Highlight Teaser */}
              <div className="mt-3 p-2.5 rounded-xl bg-purple-950/25 border border-purple-800/30 text-[11px] text-purple-200 flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-2">{note.aiSummary}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <div className="text-[11px] text-slate-400">
                <div className="font-semibold text-slate-300">{note.teacherName}</div>
                <div>{note.downloadCount} downloads • v{note.version}.0</div>
              </div>

              <button
                onClick={() => setActiveNote(note)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition cursor-pointer"
              >
                <span>Read Note</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeNote && (
        <NoteViewerModal note={activeNote} onClose={() => setActiveNote(null)} />
      )}
    </div>
  );
};
