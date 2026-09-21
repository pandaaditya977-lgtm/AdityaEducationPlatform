import { Router, Request, Response } from 'express';

const router = Router();

// POST /api/allotments - Request a new teacher allotment
router.post('/', (req: Request, res: Response) => {
  const { studentId, teacherId, subject, grade, mode, budget, notes } = req.body;
  if (!teacherId || !subject) {
    return res.status(400).json({ error: 'Teacher ID and subject are required' });
  }

  const allotment = {
    id: 'alt_' + Date.now(),
    studentId: studentId || 'std_alex',
    teacherId,
    subject,
    grade: grade || '12th',
    mode: mode || 'online',
    budget: budget || 750,
    status: 'PENDING',
    notes: notes || 'Looking forward to strengthening core concepts',
    createdAt: new Date().toISOString()
  };

  return res.status(201).json({
    message: 'Allotment request submitted to teacher successfully.',
    allotment
  });
});

// PATCH /api/allotments/:id/status - Teacher accepts/rejects or Admin modifies
router.patch('/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, note } = req.body;

  res.json({
    message: `Allotment ${id} status updated to ${status}`,
    allotmentId: id,
    status,
    updatedAt: new Date().toISOString(),
    note
  });
});

export default router;
