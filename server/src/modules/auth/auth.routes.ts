import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Role, VerificationStatus } from '@prisma/client';
import prisma from '../../prisma';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_educonnect_2026';

function sanitizeUser(user: any) {
  const { passwordHash, ...sanitized } = user;
  return {
    ...sanitized,
    grade: user.studentProfile?.grade || user.grade,
    board: user.studentProfile?.board || user.board,
    rewardPoints: user.studentProfile?.rewardPointsTotal ?? 0,
    streakDays: user.studentProfile?.currentStreakDays ?? 1,
    subjects: user.teacherProfile?.subjects || []
  };
}

// POST /api/auth/register - Create student/teacher record in Neon PostgreSQL
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, phone, grade, board, subjects, bio, hourlyRate, avatar } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (existingUser) {
      return res.status(409).json({ error: 'An account with this email address already exists.' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Determine Role
    let userRole: Role = Role.STUDENT;
    const requestedRole = (role || '').toUpperCase();
    if (requestedRole === 'TEACHER') {
      userRole = Role.TEACHER;
    } else if (requestedRole === 'ADMIN') {
      userRole = Role.ADMIN;
    }

    const defaultAvatar = userRole === Role.TEACHER
      ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
      : userRole === Role.ADMIN
      ? 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
      : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

    // Insert user and corresponding profile into Neon PostgreSQL
    const createdUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        role: userRole,
        phone: phone ? phone.trim() : null,
        avatar: avatar || defaultAvatar,
        ...(userRole === Role.STUDENT
          ? {
              studentProfile: {
                create: {
                  grade: grade || '12th Standard',
                  board: board || 'CBSE',
                  targetExams: ['CBSE Boards'],
                  preferredLanguage: 'English',
                  rewardPointsTotal: 250, // Welcome signup bonus
                  currentStreakDays: 1
                }
              }
            }
          : {}),
        ...(userRole === Role.TEACHER
          ? {
              teacherProfile: {
                create: {
                  bio: bio || `Dedicated ${subjects ? (Array.isArray(subjects) ? subjects.join('/') : subjects) : 'subject'} educator passionate about conceptual clarity and student success.`,
                  qualifications: ['Bachelor Degree', 'Certified Educator'],
                  subjects: Array.isArray(subjects) ? subjects : (subjects ? [subjects] : ['Physics']),
                  experienceYears: 3,
                  hourlyRate: Number(hourlyRate) || 600.0,
                  verified: false,
                  verificationStatus: VerificationStatus.PENDING,
                  serviceRadiusKm: 12.0,
                  rating: 5.0,
                  reviewCount: 0,
                  certificates: []
                }
              }
            }
          : {})
      },
      include: {
        studentProfile: true,
        teacherProfile: true
      }
    });

    // Sign JWT token
    const token = jwt.sign(
      { id: createdUser.id, email: createdUser.email, role: createdUser.role, name: createdUser.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log(`✅ [Database] Registered new user ${createdUser.name} (${createdUser.role}) with ID: ${createdUser.id} in Neon DB`);

    return res.status(201).json({
      message: 'Registration successful. Account created in database.',
      token,
      user: sanitizeUser(createdUser)
    });
  } catch (err: any) {
    console.error('❌ Registration error:', err);
    return res.status(500).json({ error: 'Registration failed due to a server error: ' + err.message });
  }
});

// POST /api/auth/login - Authenticate against Neon PostgreSQL
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Query Neon PostgreSQL
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        studentProfile: true,
        teacherProfile: true
      }
    });

    if (!user) {
      return res.status(401).json({ error: 'No account found with this email address.' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password. Please try again.' });
    }

    // Sign JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log(`🔑 [Database] User logged in: ${user.name} (${user.role}) from Neon DB`);

    return res.json({
      message: 'Login successful.',
      token,
      user: sanitizeUser(user)
    });
  } catch (err: any) {
    console.error('❌ Login error:', err);
    return res.status(500).json({ error: 'Login failed due to a server error: ' + err.message });
  }
});

// GET /api/auth/me - Verify and retrieve current user from Neon PostgreSQL
router.get('/me', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ authenticated: false, error: 'Authorization header required' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        studentProfile: true,
        teacherProfile: true
      }
    });

    if (!user) {
      return res.status(404).json({ authenticated: false, error: 'User not found in database' });
    }

    return res.json({
      authenticated: true,
      user: sanitizeUser(user)
    });
  } catch (err: any) {
    return res.status(401).json({ authenticated: false, error: 'Invalid or expired token' });
  }
});

export default router;
