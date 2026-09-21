import { Router, Request, Response } from 'express';

const router = Router();

// In-memory query storage for demonstration
let contactQueries = [
  {
    id: 'qry_1',
    name: 'Vikram Malhotra',
    email: 'vikram.m@example.com',
    phone: '+91 98765 43210',
    subject: 'Inquiry for Grade 12 JEE Physics offline tutor',
    message: 'We reside in South Delhi and are looking for in-person tutoring for physics twice a week.',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  }
];

// POST /api/contact - Submit public Contact Us form
router.post('/', (req: Request, res: Response) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const query = {
    id: 'qry_' + Date.now(),
    name,
    email,
    phone: phone || '',
    subject: subject || 'General Platform Inquiry',
    message,
    status: 'PENDING',
    createdAt: new Date().toISOString()
  };

  contactQueries.unshift(query);

  res.status(201).json({
    message: 'Inquiry submitted successfully. Confirmation email dispatched.',
    query
  });
});

// GET /api/contact - Admin query inbox
router.get('/', (_req: Request, res: Response) => {
  res.json({ queries: contactQueries });
});

// PATCH /api/contact/:id/status
router.patch('/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;
  const query = contactQueries.find(q => q.id === id);
  if (query) {
    query.status = status;
  }
  res.json({ message: 'Query updated', query, adminNotes });
});

export default router;
