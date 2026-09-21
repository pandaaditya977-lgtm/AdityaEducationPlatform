import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Test, TestAttempt } from '../types';
import {
  Timer,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Award,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface QuizRunnerPageProps {
  testId?: string;
  onFinish: () => void;
  setActiveTab: (tab: string) => void;
}

export const QuizRunnerPage: React.FC<QuizRunnerPageProps> = ({ testId, onFinish, setActiveTab }) => {
  const { tests, submitTestAttempt } = useApp();

  const selectedTest: Test = tests.find(t => t.id === testId) || tests[0];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    new Array(selectedTest.questions.length).fill(-1)
  );
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(selectedTest.durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attemptResult, setAttemptResult] = useState<TestAttempt | null>(null);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, selectedAnswers]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    const updated = [...selectedAnswers];
    updated[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(updated);
  };

  const handleSubmit = () => {
    if (isSubmitted) return;
    const timeSpent = selectedTest.durationMinutes * 60 - timeLeftSeconds;
    const result = submitTestAttempt(selectedTest.id, selectedAnswers, timeSpent);
    setAttemptResult(result);
    setIsSubmitted(true);
  };

  const handleRetry = () => {
    setSelectedAnswers(new Array(selectedTest.questions.length).fill(-1));
    setCurrentQuestionIndex(0);
    setTimeLeftSeconds(selectedTest.durationMinutes * 60);
    setIsSubmitted(false);
    setAttemptResult(null);
  };

  const currentQ = selectedTest.questions[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Quiz Top Bar */}
      <div className="flex items-center justify-between p-4 rounded-2xl glass-panel border border-slate-700">
        <div>
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
            {selectedTest.subject} • {selectedTest.grade}
          </span>
          <h2 className="text-base sm:text-lg font-bold text-white">
            {selectedTest.title}
          </h2>
        </div>

        {/* Live Countdown Timer */}
        {!isSubmitted ? (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-amber-400 font-mono font-bold text-sm">
            <Timer className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{formatTime(timeLeftSeconds)}</span>
          </div>
        ) : (
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
            COMPLETED
          </span>
        )}
      </div>

      {/* If Not Submitted: Question Runner */}
      {!isSubmitted ? (
        <div className="space-y-6">
          {/* Question Navigation Palette */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {selectedTest.questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center transition ${
                  currentQuestionIndex === idx
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : selectedAnswers[idx] !== -1
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {/* Current Question Card */}
          <div className="p-6 rounded-2xl glass-card space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
              <span className="font-semibold text-blue-400">
                Question {currentQuestionIndex + 1} of {selectedTest.questions.length}
              </span>
              <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-300">
                Topic: {currentQ.topic}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              {currentQ.prompt}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`p-4 rounded-xl border text-sm transition cursor-pointer flex items-center gap-3 ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-500/10'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </div>
                    <span className="flex-1">{opt}</span>
                  </div>
                );
              })}
            </div>

            {/* Bottom Question Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-xl bg-slate-800 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentQuestionIndex < selectedTest.questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                  className="flex items-center gap-1 text-xs font-semibold px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-1.5 text-xs font-bold px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit & Auto-Grade Test</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Result Screen with Instant Scoring & Analytics */
        <div className="space-y-6 animate-in fade-in">
          <div className="p-8 rounded-3xl glass-card text-center space-y-4 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-700">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-amber-400 to-emerald-400 flex items-center justify-center text-slate-950 shadow-xl shadow-amber-500/20 font-black text-2xl">
              {attemptResult?.passed ? '🏆' : '📊'}
            </div>

            <div className="space-y-1">
              <span
                className={`text-xs uppercase font-bold px-3 py-1 rounded-full ${
                  attemptResult?.passed
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
              >
                {attemptResult?.passed ? 'Passed Assessment' : 'Needs Practice'}
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white pt-2">
                {attemptResult?.score}%
              </h3>
              <p className="text-xs text-slate-400">
                Passing threshold: {selectedTest.passingScore}% • Time taken: {Math.floor((attemptResult?.timeSpentSeconds || 0) / 60)}m {((attemptResult?.timeSpentSeconds || 0) % 60)}s
              </p>
            </div>

            {/* AI Feedback Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 max-w-xl mx-auto text-left space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-400">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>EduConnect AI Diagnostic Review</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {attemptResult?.aiFeedback}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRetry}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Re-attempt Quiz</span>
              </button>
              <button
                onClick={() => setActiveTab('student-dashboard')}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/25 transition cursor-pointer"
              >
                <span>Go to Student Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Detailed Question by Question Review */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Detailed Question Analysis & Solution Key
            </h4>

            {selectedTest.questions.map((q, qIdx) => {
              const studentAnswer = selectedAnswers[qIdx];
              const isCorrect = studentAnswer === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl glass-card border space-y-3 ${
                    isCorrect ? 'border-emerald-500/30' : 'border-rose-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                    <span className="font-semibold text-slate-300">
                      Question {qIdx + 1}: {q.topic}
                    </span>
                    <span
                      className={`font-bold flex items-center gap-1 ${
                        isCorrect ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      {isCorrect ? 'Correct (+10 pts)' : 'Incorrect (0 pts)'}
                    </span>
                  </div>

                  <p className="text-sm text-white font-medium">{q.prompt}</p>

                  <div className="space-y-1.5 text-xs">
                    {q.options.map((opt, oIdx) => {
                      const wasSelectedByStudent = studentAnswer === oIdx;
                      const isOptionCorrect = q.correctAnswer === oIdx;
                      return (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-lg flex items-center justify-between ${
                            isOptionCorrect
                              ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30'
                              : wasSelectedByStudent
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-slate-950/60 text-slate-400'
                          }`}
                        >
                          <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                          {isOptionCorrect && <span>✓ Correct Answer</span>}
                          {wasSelectedByStudent && !isOptionCorrect && <span>✗ Your Choice</span>}
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="font-semibold text-blue-400">Teacher Explanation:</span>
                    <p>{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
