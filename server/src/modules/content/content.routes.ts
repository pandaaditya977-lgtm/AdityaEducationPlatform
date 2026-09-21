import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/content/notes
router.get('/notes', (_req: Request, res: Response) => {
  res.json({
    notes: [
      {
        id: 'note_1',
        title: 'Electromagnetic Induction & Faraday Laws',
        subject: 'Physics',
        chapter: 'Chapter 6',
        grade: '12th',
        fileUrl: '/sample-notes/emi.pdf',
        fileSizeKb: 2450,
        downloadCount: 412,
        aiSummary: 'Covers magnetic flux, Faraday experiments, Lenz law conservation of energy, eddy currents, mutual inductance, and self-inductance derivations.',
        teacherName: 'Dr. Sarah Jenkins',
        version: 2
      },
      {
        id: 'note_2',
        title: 'Definite Integrals & Calculus Theorems',
        subject: 'Mathematics',
        chapter: 'Chapter 7',
        grade: '12th',
        fileUrl: '/sample-notes/integrals.pdf',
        fileSizeKb: 1820,
        downloadCount: 529,
        aiSummary: 'Formula cheat-sheets, King property substitutions, integration by parts shortcuts, and reduction formulas with solved PYQs.',
        teacherName: 'Ananya Verma',
        version: 1
      },
      {
        id: 'note_3',
        title: 'Organic Reaction Mechanisms: Aldehydes & Ketones',
        subject: 'Chemistry',
        chapter: 'Chapter 12',
        grade: '12th',
        fileUrl: '/sample-notes/carbonyls.pdf',
        fileSizeKb: 3100,
        downloadCount: 388,
        aiSummary: 'Nucleophilic addition, Aldol condensation, Cannizzaro reaction pathways, and Grignard reagent cross-coupling steps.',
        teacherName: 'Prof. Rajesh Sharma',
        version: 3
      }
    ]
  });
});

// GET /api/content/shorts
router.get('/shorts', (_req: Request, res: Response) => {
  res.json({
    shorts: [
      {
        id: 'sh_1',
        title: 'Lenz Law in 30 Seconds with Real Magnet Drop!',
        topic: 'Physics Experiment',
        durationSeconds: 32,
        teacherName: 'Dr. Sarah Jenkins',
        likes: 1420,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-computer-43232-large.mp4',
        poster: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'sh_2',
        title: 'Integration King Rule Shortcut — Solve in 5 seconds',
        topic: 'Math Hack',
        durationSeconds: 45,
        teacherName: 'Ananya Verma',
        likes: 2190,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-writing-in-a-notebook-at-a-desk-43187-large.mp4',
        poster: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80'
      }
    ]
  });
});

export default router;
