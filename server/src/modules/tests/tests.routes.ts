import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/tests - List available tests
router.get('/', (_req: Request, res: Response) => {
  res.json({
    tests: [
      {
        id: 'tst_1',
        title: 'Physics Mastery: Optics & Electromagnetism',
        subject: 'Physics',
        grade: '12th',
        durationMinutes: 15,
        totalQuestions: 5,
        passingScore: 60,
        rewardPointsOnPass: 50,
        negativeMarking: true
      },
      {
        id: 'tst_2',
        title: 'Calculus Rapid Fire: Derivatives & Integrals',
        subject: 'Mathematics',
        grade: '12th',
        durationMinutes: 10,
        totalQuestions: 5,
        passingScore: 70,
        rewardPointsOnPass: 40,
        negativeMarking: false
      }
    ]
  });
});

// POST /api/tests/:id/attempt - Submit test answers & auto-grade
router.post('/:id/attempt', (req: Request, res: Response) => {
  const { id } = req.params;
  const { answers, timeSpentSeconds, studentId } = req.body;

  // Auto-grading mock engine
  const score = 80;
  const maxScore = 100;
  const passed = score >= 60;
  const earnedPoints = passed ? 50 : 10;

  res.json({
    attemptId: 'att_' + Date.now(),
    testId: id,
    studentId: studentId || 'std_alex',
    score,
    maxScore,
    passed,
    timeSpentSeconds,
    earnedPoints,
    breakdown: [
      { questionIndex: 0, correct: true, topic: 'Electromagnetic Induction' },
      { questionIndex: 1, correct: true, topic: 'Lenz Law' },
      { questionIndex: 2, correct: false, topic: 'Self Inductance', hint: 'Review coefficient calculation formulas' },
      { questionIndex: 3, correct: true, topic: 'Faraday Law' },
      { questionIndex: 4, correct: true, topic: 'AC Circuits' }
    ],
    weakTopics: ['Self Inductance'],
    aiFeedback: 'Strong overall grasp of electromagnetic fundamentals. Minor calculation error on self-inductance derivation. Practice 2 more problems from Chapter 6 notes.'
  });
});

export default router;
