import React from 'react';
import { useApp } from '../context/AppContext';
import { ShortsPlayer } from '../components/ShortsPlayer';
import { PlaySquare, Sparkles, TrendingUp } from 'lucide-react';

export const ShortsPage: React.FC = () => {
  const { shorts } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>EduShorts Vertical Reels</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          60-Second Microlearning Feed
        </h1>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Swipe through bite-sized experiment demos, mathematical speed hacks, and memory shortcuts created by verified teachers.
        </p>
      </div>

      {/* Main Reels Video Player */}
      <ShortsPlayer shorts={shorts} />
    </div>
  );
};
