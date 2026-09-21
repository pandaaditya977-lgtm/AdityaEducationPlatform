import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/rewards/leaderboard
router.get('/leaderboard', (_req: Request, res: Response) => {
  res.json({
    leaderboard: [
      { rank: 1, name: 'Aarav Mehta', points: 2850, badge: 'Gold Scholar', streak: 21, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' },
      { rank: 2, name: 'Priya Iyer', points: 2640, badge: 'Gold Scholar', streak: 18, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
      { rank: 3, name: 'Rohan Gupta', points: 2410, badge: 'Silver Prodigy', streak: 14, avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100' },
      { rank: 4, name: 'Alex Johnson (You)', points: 1950, badge: 'Silver Prodigy', streak: 9, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
      { rank: 5, name: 'Tanvi Sen', points: 1820, badge: 'Bronze Achiever', streak: 7, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' }
    ],
    userRank: 4
  });
});

// GET /api/rewards/badges
router.get('/badges', (_req: Request, res: Response) => {
  res.json({
    badges: [
      { id: 'bdg_1', title: '7-Day Streak Master', description: 'Maintained 7 consecutive active study days', tier: 'BRONZE', unlocked: true, points: 100 },
      { id: 'bdg_2', title: 'Quiz Whiz', description: 'Scored 90%+ in 5 different chapter tests', tier: 'SILVER', unlocked: true, points: 250 },
      { id: 'bdg_3', title: 'Physics Olympian', description: 'Complete all mechanics and electrodynamics modules', tier: 'GOLD', unlocked: false, points: 500 },
      { id: 'bdg_4', title: 'Master Tutor Scholar', description: 'Complete 20 hours of 1-on-1 tutoring sessions', tier: 'PLATINUM', unlocked: false, points: 1000 }
    ]
  });
});

export default router;
