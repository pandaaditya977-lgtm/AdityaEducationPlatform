import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from './modules/auth/auth.routes';
import teacherRoutes from './modules/teachers/teachers.routes';
import allotmentRoutes from './modules/allotment/allotment.routes';
import contentRoutes from './modules/content/content.routes';
import testRoutes from './modules/tests/tests.routes';
import rewardRoutes from './modules/rewards/rewards.routes';
import contactRoutes from './modules/contact/contact.routes';
import aiRoutes from './modules/ai/ai.routes';
import adminRoutes from './modules/admin/admin.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint (as specified in 04_System_Architecture.md)
app.get('/healthz', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'EduConnect Backend API',
    uptimeSeconds: process.uptime()
  });
});

// Domain Routes
app.use('/api/auth', authRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/allotments', allotmentRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Centralized error middleware (as specified in 02_Technical_Architecture.md)
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Server Error]:', err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 EduConnect API Server running on port ${PORT}`);
    console.log(`🩺 Health check available at http://localhost:${PORT}/healthz`);
  });
}

export default app;
