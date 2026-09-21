import React, { useState } from 'react';
import { Note } from '../types';
import { X, Download, Sparkles, BookOpen, Clock, User, CheckCircle2, FileText } from 'lucide-react';

interface NoteViewerModalProps {
  note: Note | null;
  onClose: () => void;
}

export const NoteViewerModal: React.FC<NoteViewerModalProps> = ({ note, onClose }) => {
  const [activeTab, setActiveTab] = useState<'content' | 'summary'>('content');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [customSummary, setCustomSummary] = useState<string | null>(null);

  if (!note) return null;

  const handleGenerateSummary = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      setCustomSummary(
        `AI Chapter Synthesis for ${note.title}:\n\n` +
        `1. Fundamental Core Law: Focus on directional flux shifts and differential equation representations.\n` +
        `2. Top 3 Scoring Theorems: Theorem 1 (Gauss-Faraday law), Theorem 2 (Conservation of charge and flux), Theorem 3 (Lenz-Maxwell coupling).\n` +
        `3. Frequent Mistakes to Avoid: Forgetting the polarity minus sign and mixing up peak EMF with RMS EMF in AC networks.\n` +
        `4. Revision Timeline: Recommended study time is 45 minutes followed by the chapter quiz.`
      );
      setIsGeneratingAi(false);
      setActiveTab('summary');
    }, 700);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([
      `EduConnect Learning Materials\nDocument: ${note.title}\nSubject: ${note.subject} (${note.chapter})\nTeacher: ${note.teacherName}\nVersion: ${note.version}\n\nAI Summary:\n${note.aiSummary}\n\nDescription:\n${note.description}`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${note.title.replace(/\s+/g, '_')}_EduConnect.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base truncate max-w-md">
                {note.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                <span className="text-blue-400 font-semibold">{note.subject}</span>
                <span>•</span>
                <span>{note.chapter}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {note.teacherName}
                </span>
                <span>•</span>
                <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-300">
                  v{note.version}.0
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Note</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800 bg-slate-950/40">
          <button
            onClick={() => setActiveTab('content')}
            className={`pb-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
              activeTab === 'content'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Full Notes Content
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`pb-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
              activeTab === 'summary'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Executive Summary
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'content' ? (
            <div className="space-y-6">
              {/* Document Info Card */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2">
                <p className="text-xs text-slate-300 leading-relaxed">
                  {note.description}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-700/50">
                  <span>File Size: {Math.round(note.fileSizeKb / 1024 * 10) / 10} MB PDF</span>
                  <span>{note.downloadCount} verified student downloads</span>
                  <span>Published: {note.createdAt}</span>
                </div>
              </div>

              {/* Reader Simulation */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 font-serif leading-relaxed text-slate-300 space-y-4 shadow-inner">
                <div className="font-sans pb-3 border-b border-slate-800 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                    Interactive PDF Reader Page 1 of 14
                  </span>
                  <button
                    onClick={handleGenerateSummary}
                    disabled={isGeneratingAi}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-semibold shadow-md shadow-purple-500/20 hover:opacity-90 transition disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isGeneratingAi ? 'Summarizing...' : 'Generate AI Summary'}</span>
                  </button>
                </div>

                <h4 className="font-sans text-lg font-bold text-white">
                  Section 1: Mathematical Foundations & Law Derivations
                </h4>
                <p className="text-sm text-slate-300">
                  When the magnetic field passing through a closed conducting circuit changes with respect to time, an electric current is induced. The induced electromotive force is equal to the negative rate of change of magnetic flux through the circuit.
                </p>
                <div className="my-4 p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-blue-300 text-center">
                  emf (E) = - N * (dΦ / dt) = - L * (dI / dt)
                </div>
                <p className="text-sm text-slate-300">
                  Where Φ represents the magnetic flux in Webers (Wb), N is the turn density, and L denotes the self-inductance coefficient measured in Henries (H). The negative polarity is strictly enforced by the principle of energy conservation as formulated by Heinrich Lenz.
                </p>

                <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-800/40 text-xs font-sans text-blue-200">
                  <strong>Teacher Note ({note.teacherName}):</strong> Pay special attention to dimensional analysis during the IIT-JEE exam. Self-inductance has the dimension [M L² T⁻² A⁻²].
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-5 rounded-2xl bg-gradient-to-b from-purple-950/40 to-slate-900 border border-purple-800/50 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-purple-800/40">
                  <span className="flex items-center gap-2 text-sm font-bold text-purple-300">
                    <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                    AI Chapter Key Takeaways
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-200 font-medium">
                    High-Yield Revision Sheet
                  </span>
                </div>

                <div className="text-xs md:text-sm text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                  {customSummary || note.aiSummary}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
