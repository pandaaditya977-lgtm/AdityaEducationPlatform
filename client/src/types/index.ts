export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN' | 'GUEST';
export type UserStatus = 'ACTIVE' | 'SUSPENDED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  grade?: string;
  board?: string;
  subjects?: string[];
  rewardPoints?: number;
  streakDays?: number;
  status?: UserStatus;
  joinedDate?: string;
}

export interface Teacher {
  id: string;
  name: string;
  bio: string;
  qualifications: string[];
  subjects: string[];
  grade: string[];
  experienceYears: number;
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  verified: boolean;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  mode: 'online' | 'offline' | 'hybrid';
  serviceRadiusKm: number;
  location: {
    lat: number;
    lng: number;
    city: string;
    address: string;
  };
  avatar: string;
  sampleVideoUrl?: string;
  certificates: string[];
  idProofUrl?: string;
}

export type AllotmentStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'ACTIVE' | 'CANCELLED';

export interface Allotment {
  id: string;
  studentId: string;
  studentName: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  grade: string;
  mode: 'online' | 'offline' | 'hybrid';
  budget: number;
  status: AllotmentStatus;
  requestedAt: string;
  notes?: string;
}

export interface Note {
  id: string;
  title: string;
  description: string;
  subject: string;
  chapter: string;
  grade: string;
  fileUrl: string;
  fileSizeKb: number;
  downloadCount: number;
  aiSummary: string;
  teacherName: string;
  version: number;
  createdAt: string;
}

export interface ShortVideo {
  id: string;
  title: string;
  topic: string;
  durationSeconds: number;
  teacherName: string;
  likes: number;
  views: number;
  videoUrl: string;
  poster: string;
  commentsCount: number;
  bookmarked?: boolean;
  liked?: boolean;
}

export interface LectureVideo {
  id: string;
  title: string;
  subject: string;
  durationMinutes: number;
  teacherName: string;
  videoUrl: string;
  poster: string;
  views: number;
  chapters: { title: string; timeSeconds: number }[];
}

export interface Question {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
}

export interface Test {
  id: string;
  title: string;
  subject: string;
  grade: string;
  durationMinutes: number;
  totalQuestions: number;
  passingScore: number;
  rewardPointsOnPass: number;
  negativeMarking: boolean;
  questions: Question[];
}

export interface TestAttempt {
  id: string;
  testId: string;
  testTitle: string;
  score: number;
  maxScore: number;
  passed: boolean;
  timeSpentSeconds: number;
  answers: number[];
  weakTopics: string[];
  aiFeedback: string;
  completedAt: string;
}

export type BadgeTier = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';

export interface Badge {
  id: string;
  title: string;
  description: string;
  tier: BadgeTier;
  icon: string;
  minPoints: number;
  unlocked: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  badge: string;
  streak: number;
  avatar: string;
  isCurrentUser?: boolean;
}

export interface ContactQuery {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'PENDING' | 'IN_REVIEW' | 'RESOLVED';
  createdAt: string;
  adminNotes?: string;
}

export interface SiteSettings {
  announcementText: string;
  announcementType: 'info' | 'warning' | 'alert' | 'success';
  announcementActive: boolean;
  maintenanceMode: boolean;
  platformCommissionPercent: number;
  supportEmail: string;
  supportPhone: string;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  target: string;
  timestamp: string;
  adminName: string;
  details: string;
}

