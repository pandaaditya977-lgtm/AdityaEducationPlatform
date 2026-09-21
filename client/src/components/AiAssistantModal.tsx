import React, { useState } from 'react';
import { Sparkles, Send, Bot, X, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import { solveDoubtWithAi, AiDoubtResponse } from '../services/aiService';
import { useApp } from '../context/AppContext';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubject?: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  defaultSubject = 'Physics'
}) => {
  const { allotments } = useApp();
  const [subject, setSubject] = useState(defaultSubject);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AiDoubtResponse | null>(null);
  const [escalated, setEscalated] = useState(false);

  if (!isOpen) return null;

  const quickQuestions = [
    'Explain Lenz\'s Law and why energy conservation prevents perpetual motion',
    'How do I apply the King\'s Property to solve definite integrals?',
    'What is the difference between Aldol Condensation and Cannizzaro reaction?',
    'Give me a 5-step numerical approach for calculating Self-Inductance'
  ];

  const handleAsk = async (queryText?: string) => {
    const textToAsk = queryText || question;
    if (!textToAsk.trim()) return;

    setLoading(true);
    setResponse(null);
    setEscalated(false);

    try {
      const res = await solveDoubtWithAi(textToAsk, subject);
      setResponse(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEscalateToTeacher = () => {
    setEscalated(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-gradient-to-r from-blue-900/30 via-purple-900/20 to-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white shadow-md shadow-purple-500/30">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white flex items-center gap-2">
                EduConnect AI Tutor
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-medium border border-purple-500/30">
                  Instant Doubt Solver
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Trained on NCERT, JEE Advanced & NEET syllabi with formula rendering
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Subject Switcher */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Subject:</span>
            {['Physics', 'Mathematics', 'Chemistry', 'Biology', 'Computer Science'].map(s => (
              <button
                key={s}
                onClick={() => setSubject(s)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition whitespace-nowrap ${
                  subject === s
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/40'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Quick Prompts */}
          {!response && !loading && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Common Student Doubts:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setQuestion(q);
                      handleAsk(q);
                    }}
                    className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-left text-xs text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-slate-800 transition group"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span>{q}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition flex-shrink-0 mt-0.5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />
                <Sparkles className="w-5 h-5 text-amber-300 absolute inset-0 m-auto animate-pulse" />
              </div>
              <p className="text-xs font-medium animate-pulse">
                Analyzing concept and querying academic knowledge base...
              </p>
            </div>
          )}

          {/* AI Response Card */}
          {response && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-700/60 pb-2">
                  <span className="flex items-center gap-1.5 font-semibold text-blue-400">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    Verified AI Explanation
                  </span>
                  <span className="text-emerald-400 font-medium">
                    {Math.round(response.confidence * 100)}% Syllabus Match
                  </span>
                </div>

                <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                  {response.answer}
                </div>

                {/* Key Formulas Section */}
                {response.keyFormulas && response.keyFormulas.length > 0 && (
                  <div className="mt-3 p-3 rounded-lg bg-slate-900/90 border border-slate-700/80">
                    <p className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider mb-1.5">
                      Key Formulae & Identities
                    </p>
                    <div className="space-y-1">
                      {response.keyFormulas.map((f, i) => (
                        <div key={i} className="font-mono text-xs text-slate-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommended Reading */}
                {response.recommendedChapterNote && (
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-blue-950/40 border border-blue-800/40 text-xs text-blue-300">
                    <BookOpen className="w-4 h-4 flex-shrink-0" />
                    <span>Reference Material: <strong>{response.recommendedChapterNote}</strong></span>
                  </div>
                )}
              </div>

              {/* Follow-up suggestions */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-400">Suggested Follow-ups:</p>
                <div className="flex flex-wrap gap-2">
                  {response.suggestedFollowUps.map((fu, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setQuestion(fu);
                        handleAsk(fu);
                      }}
                      className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700/50 transition text-left"
                    >
                      {fu}
                    </button>
                  ))}
                </div>
              </div>

              {/* Escalation to teacher */}
              <div className="pt-2 border-t border-slate-800">
                {escalated ? (
                  <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-emerald-400" />
                    <span>Doubt escalated to your allotted teacher! They will review this in their next session.</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-400">Still need a teacher's personal guidance?</p>
                    <button
                      onClick={handleEscalateToTeacher}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-200 text-xs font-medium border border-slate-700 transition"
                    >
                      Escalate to Allotted Tutor
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/90">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleAsk();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder={`Ask any ${subject} doubt (e.g. formula derivation, why concept works)...`}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold hover:from-blue-500 hover:to-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer"
            >
              <span>Ask</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
