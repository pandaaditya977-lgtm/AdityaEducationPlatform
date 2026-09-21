import { PrismaClient, Role, VerificationStatus, AllotmentStatus, BadgeTier } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Neon PostgreSQL Database for EduConnect...');

  // Clean existing tables (in reverse relation order)
  await prisma.notification.deleteMany();
  await prisma.contactQuery.deleteMany();
  await prisma.userBadge.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.rewardPoint.deleteMany();
  await prisma.testAttempt.deleteMany();
  await prisma.question.deleteMany();
  await prisma.test.deleteMany();
  await prisma.short.deleteMany();
  await prisma.video.deleteMany();
  await prisma.note.deleteMany();
  await prisma.allotment.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.teacherProfile.deleteMany();
  await prisma.user.deleteMany();

  const defaultPasswordHash = await bcrypt.hash('EduConnect@2026', 10);

  // 1. Create Admin User
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@educonnect.com',
      passwordHash: defaultPasswordHash,
      name: 'Victoria Vance',
      role: Role.ADMIN,
      phone: '+91 98000 11111',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
    }
  });

  // 2. Create Student User & Profile
  const studentUser = await prisma.user.create({
    data: {
      email: 'alex.student@educonnect.com',
      passwordHash: defaultPasswordHash,
      name: 'Alex Johnson',
      role: Role.STUDENT,
      phone: '+91 98111 22334',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      studentProfile: {
        create: {
          grade: '12th Standard',
          board: 'CBSE',
          targetExams: ['IIT-JEE', 'CBSE Boards'],
          preferredLanguage: 'English',
          rewardPointsTotal: 1950,
          currentStreakDays: 9
        }
      }
    },
    include: {
      studentProfile: true
    }
  });

  // 3. Create Teacher User & Profile
  const teacherUser = await prisma.user.create({
    data: {
      email: 'sarah.jenkins@educonnect.com',
      passwordHash: defaultPasswordHash,
      name: 'Dr. Sarah Jenkins',
      role: Role.TEACHER,
      phone: '+91 98222 33445',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      teacherProfile: {
        create: {
          bio: 'Ph.D. in High-Energy Physics from IIT Delhi with 12+ years of experience mentoring 500+ students into top tier IITs and Medical colleges.',
          qualifications: ['Ph.D. Physics (IIT Delhi)', 'M.Sc. Applied Physics (Gold Medalist)'],
          subjects: ['Physics', 'Applied Mathematics'],
          experienceYears: 12,
          hourlyRate: 850.0,
          verified: true,
          verificationStatus: VerificationStatus.VERIFIED,
          serviceRadiusKm: 15.0,
          rating: 4.95,
          reviewCount: 168,
          certificates: ['IIT_Delhi_Doctorate.pdf', 'National_Teaching_Excellence_Award_2023.pdf']
        }
      }
    },
    include: {
      teacherProfile: true
    }
  });

  // 4. Create an Allotment
  if (studentUser.studentProfile && teacherUser.teacherProfile) {
    await prisma.allotment.create({
      data: {
        studentId: studentUser.studentProfile.id,
        teacherId: teacherUser.teacherProfile.id,
        subject: 'Physics',
        grade: '12th',
        mode: 'hybrid',
        budget: 850.0,
        status: AllotmentStatus.ACTIVE,
        notes: 'Focus on Electromagnetism derivations and numerical problem-solving.'
      }
    });

    // 5. Create Notes
    await prisma.note.create({
      data: {
        teacherId: teacherUser.teacherProfile.id,
        title: 'Electromagnetic Induction & Faraday-Lenz Laws',
        description: 'Comprehensive handwritten & typed notes covering magnetic flux, induced EMF, and mutual inductance derivations.',
        subject: 'Physics',
        chapter: 'Chapter 6: EMI',
        grade: '12th Standard',
        fileUrl: '/notes/electromagnetic_induction_ch6.pdf',
        fileSizeKb: 3450,
        downloadCount: 842,
        aiSummary: 'Faraday Law (E = -dPhi/dt) and Lenz Law enforcing conservation of energy.'
      }
    });

    // 6. Create Short Video
    await prisma.short.create({
      data: {
        teacherId: teacherUser.teacherProfile.id,
        title: 'Lenz Law in 30 Seconds with Real Copper Tube Drop!',
        topic: 'Physics Experiment',
        durationSeconds: 32,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
        likes: 3840,
        views: 18900
      }
    });

    // 7. Create Test & Questions
    const test = await prisma.test.create({
      data: {
        teacherId: teacherUser.teacherProfile.id,
        title: 'Physics Chapter 6: Electromagnetic Induction & Flux',
        subject: 'Physics',
        grade: '12th / JEE',
        durationMinutes: 8,
        passingScore: 60,
        negativeMarking: true,
        questions: {
          create: [
            {
              prompt: "According to Faraday's law of electromagnetic induction, induced EMF is directly proportional to:",
              options: ['Total magnetic flux', 'Rate of change of magnetic flux', 'Resistance of wire', 'Electrostatic potential'],
              correctAnswer: 1,
              explanation: 'Induced EMF is equal to time rate of change of magnetic flux.',
              points: 10
            },
            {
              prompt: "Lenz's law is a consequence of which conservation law?",
              options: ['Conservation of Charge', 'Conservation of Momentum', 'Conservation of Energy', 'Conservation of Mass'],
              correctAnswer: 2,
              explanation: "Lenz's law enforces energy conservation.",
              points: 10
            }
          ]
        }
      }
    });
  }

  // 8. Create Badges
  await prisma.badge.createMany({
    data: [
      {
        title: '7-Day Streak Master',
        description: 'Maintained 7 consecutive active study days on EduConnect.',
        tier: BadgeTier.BRONZE,
        icon: 'Flame',
        minPoints: 200
      },
      {
        title: 'Quiz Whiz',
        description: 'Achieved 80%+ on 3 chapter assessments.',
        tier: BadgeTier.SILVER,
        icon: 'Trophy',
        minPoints: 600
      },
      {
        title: 'Grand Scholar of EduConnect',
        description: 'Accumulate 3,000+ reward points.',
        tier: BadgeTier.PLATINUM,
        icon: 'Crown',
        minPoints: 3000
      }
    ]
  });

  // 9. Create Support Inquiries
  await prisma.contactQuery.create({
    data: {
      name: 'Sunita Raman',
      email: 'sunita.raman@example.com',
      phone: '+91 98123 45678',
      subject: 'Institutional Partnership & Bulk Student Onboarding',
      message: 'We represent an academy with 120 students and would like to license EduConnect tests & notes modules.',
      status: 'IN_REVIEW',
      adminNotes: 'Contacted over phone on Sept 16; scheduled product walkthrough demo for next Monday.'
    }
  });

  console.log('✅ Neon PostgreSQL Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
