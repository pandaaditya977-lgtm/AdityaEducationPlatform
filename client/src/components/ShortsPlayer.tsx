import React, { useState, useRef } from 'react';
import { ShortVideo } from '../types';
import { useApp } from '../context/AppContext';
import {
  Heart,
  Bookmark,
  MessageCircle,
  Share2,
  ChevronUp,
  ChevronDown,
  Play,
  Pause,
  Sparkles,
  User,
  X
} from 'lucide-react';

interface ShortsPlayerProps {
  shorts: ShortVideo[];
}

export const ShortsPlayer: React.FC<ShortsPlayerProps> = ({ shorts }) => {
  const { toggleLikeShort, toggleBookmarkShort } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentShort = shorts[currentIndex] || shorts[0];

  const handleNext = () => {
    if (currentIndex < shorts.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsPlaying(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentShort.title,
        text: `Watch this 45-second educational shortcut on EduConnect: ${currentShort.title}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Short link copied to clipboard!');
    }
  };

  if (!currentShort) {
    return <div className="p-8 text-center text-slate-400">No shorts available</div>;
  }

  return (
    <div className="relative w-full max-w-sm mx-auto h-[640px] rounded-3xl overflow-hidden bg-black shadow-2xl border border-slate-800 flex items-center justify-center">
      {/* Video Element */}
      <video
        ref={videoRef}
        src={currentShort.videoUrl}
        poster={currentShort.poster}
        autoPlay
        loop
        playsInline
        muted
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer"
      />

      {/* Play/Pause Overlay indicator */}
      {!isPlaying && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white cursor-pointer pointer-events-none"
        >
          <Play className="w-8 h-8 fill-white ml-1" />
        </div>
      )}

      {/* Top Header Tag */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-semibold text-white border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          {currentShort.topic}
        </span>
        <span className="text-xs font-mono bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-slate-300">
          {currentIndex + 1} / {shorts.length}
        </span>
      </div>

      {/* Bottom Info Overlay */}
      <div className="absolute bottom-0 left-0 right-16 p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-auto z-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
            <User className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-white shadow-sm">
            {currentShort.teacherName}
          </span>
        </div>
        <h4 className="text-sm font-semibold text-white leading-snug drop-shadow-md">
          {currentShort.title}
        </h4>
        <p className="text-[11px] text-slate-300 mt-1 flex items-center gap-2">
          <span>{currentShort.views.toLocaleString()} views</span>
          <span>•</span>
          <span>{currentShort.durationSeconds}s clip</span>
        </p>
      </div>

      {/* Right Side Action Bar */}
      <div className="absolute right-3 bottom-14 flex flex-col items-center gap-4 z-20">
        {/* Like Button */}
        <button
          onClick={() => toggleLikeShort(currentShort.id)}
          className="flex flex-col items-center gap-1 group"
        >
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md border transition ${
              currentShort.liked
                ? 'bg-rose-500/30 text-rose-500 border-rose-500/50 scale-110'
                : 'bg-black/50 text-white border-white/15 hover:bg-black/70'
            }`}
          >
            <Heart className={`w-5 h-5 ${currentShort.liked ? 'fill-rose-500' : ''}`} />
          </div>
          <span className="text-[11px] font-semibold text-white shadow-sm">
            {currentShort.likes.toLocaleString()}
          </span>
        </button>

        {/* Comments Button */}
        <button
          onClick={() => setCommentsOpen(true)}
          className="flex flex-col items-center gap-1 group"
        >
          <div className="w-11 h-11 rounded-full bg-black/50 text-white border border-white/15 flex items-center justify-center backdrop-blur-md hover:bg-black/70 transition">
            <MessageCircle className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-white shadow-sm">
            {currentShort.commentsCount}
          </span>
        </button>

        {/* Bookmark Button */}
        <button
          onClick={() => toggleBookmarkShort(currentShort.id)}
          className="flex flex-col items-center gap-1 group"
        >
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md border transition ${
              currentShort.bookmarked
                ? 'bg-amber-500/30 text-amber-400 border-amber-500/50'
                : 'bg-black/50 text-white border-white/15 hover:bg-black/70'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${currentShort.bookmarked ? 'fill-amber-400' : ''}`} />
          </div>
          <span className="text-[11px] font-semibold text-white shadow-sm">Save</span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="flex flex-col items-center gap-1 group"
        >
          <div className="w-11 h-11 rounded-full bg-black/50 text-white border border-white/15 flex items-center justify-center backdrop-blur-md hover:bg-black/70 transition">
            <Share2 className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-white shadow-sm">Share</span>
        </button>
      </div>

      {/* Up/Down Feed Navigation Controls */}
      <div className="absolute right-3 top-20 flex flex-col gap-2 z-20">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/15 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/70"
          title="Previous Short"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === shorts.length - 1}
          className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/15 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/70"
          title="Next Short"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* Comments Drawer Modal */}
      {commentsOpen && (
        <div className="absolute inset-0 z-30 bg-slate-900/95 backdrop-blur-md p-5 flex flex-col animate-in slide-in-from-bottom">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h5 className="font-bold text-white text-sm">
              Discussion ({currentShort.commentsCount})
            </h5>
            <button
              onClick={() => setCommentsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-3 space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700/50">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="font-semibold text-blue-400">Priya Iyer</span>
                <span className="text-[10px]">2h ago</span>
              </div>
              <p className="text-slate-200">
                This exact question appeared in JEE Main 2024 Session 1! Applying the King’s property saved me almost 4 minutes.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700/50">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="font-semibold text-emerald-400">Rohan Gupta</span>
                <span className="text-[10px]">5h ago</span>
              </div>
              <p className="text-slate-200">
                Could you post a follow-up short solving the trigonometric cube root variant?
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800">
            <input
              type="text"
              placeholder="Add an academic comment..."
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};
