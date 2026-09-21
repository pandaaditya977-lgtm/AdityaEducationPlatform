import React from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import {
  Award,
  Flame,
  Trophy,
  Crown,
  Zap,
  Gift,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  const { leaderboard, badges } = useApp();
  const { currentUser } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
          <Trophy className="w-3.5 h-3.5" />
          <span>Gamified Scholar Recognition</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          EduConnect Hall of Fame & Leaderboard
        </h1>
        <p className="text-sm text-slate-400">
          Consistent study streaks, high test accuracy, and completing lecture notes earn you points, badges, and fee discounts on mentor allotments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Leaderboard Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 rounded-3xl glass-card space-y-4">
            <h3 className="text-base font-bold text-white flex items-center justify-between">
              <span>Weekly Academic Rankings</span>
              <span className="text-xs font-normal text-slate-400">Refreshed every Sunday</span>
            </h3>

            <div className="space-y-2">
              {leaderboard.map(entry => (
                <div
                  key={entry.rank}
                  className={`p-3.5 rounded-2xl border transition flex items-center justify-between gap-4 ${
                    entry.isCurrentUser
                      ? 'bg-blue-600/15 border-blue-500/50 shadow-lg shadow-blue-500/10'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Rank Indicator */}
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                        entry.rank === 1
                          ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30'
                          : entry.rank === 2
                          ? 'bg-slate-300 text-slate-950'
                          : entry.rank === 3
                          ? 'bg-amber-700 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {entry.rank === 1 ? '👑' : entry.rank}
                    </div>

                    <img
                      src={entry.avatar}
                      alt={entry.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                    />

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-white">
                          {entry.name}
                        </span>
                        {entry.isCurrentUser && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                            YOU
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span className="text-slate-300">{entry.badge}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-amber-400 font-medium">
                          <Flame className="w-3 h-3 fill-amber-400" />
                          {entry.streak} day streak
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-black text-white">
                      {entry.points.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Points</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Badges & Rewards info */}
        <div className="space-y-6">
          {/* Badge Gallery */}
          <div className="p-6 rounded-3xl glass-card space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              Achievement Badges
            </h3>

            <div className="space-y-3">
              {badges.map(b => (
                <div
                  key={b.id}
                  className={`p-3 rounded-xl border flex items-center gap-3 transition ${
                    b.unlocked
                      ? 'bg-slate-900 border-slate-700'
                      : 'bg-slate-950/60 border-slate-800/80 opacity-60'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                      b.tier === 'GOLD'
                        ? 'bg-amber-500/20 text-amber-400'
                        : b.tier === 'PLATINUM'
                        ? 'bg-purple-500/20 text-purple-400'
                        : b.tier === 'SILVER'
                        ? 'bg-slate-400/20 text-slate-300'
                        : 'bg-emerald-500/20 text-emerald-400'
                    }`}
                  >
                    ★
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-white truncate">{b.title}</h5>
                      <span className="text-[10px] font-mono text-slate-400">
                        {b.minPoints} pts
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                      {b.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Redeemable Rewards Perks */}
          <div className="p-6 rounded-3xl glass-card space-y-3 bg-gradient-to-b from-blue-950/20 to-slate-900">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Gift className="w-4 h-4 text-blue-400" />
              <span>Redeemable Perks</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                <span><strong>500 pts:</strong> 10% discount coupon on your next tutor allotment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                <span><strong>1,000 pts:</strong> Unlock All-India JEE/NEET simulated mock exam</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                <span><strong>2,500 pts:</strong> Free 1-on-1 45-minute counseling session with faculty</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
