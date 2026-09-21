import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/teachers - Search & list verified teachers
router.get('/', (req: Request, res: Response) => {
  const { subject, grade, mode, maxDistance, lat, lng } = req.query;
  
  res.json({
    teachers: [
      {
        id: 'tchr_1',
        name: 'Dr. Sarah Jenkins',
        bio: 'Ph.D. in Physics from IIT Delhi with 12+ years experience preparing students for JEE Advanced and Board Exams.',
        subjects: ['Physics', 'Mathematics'],
        grade: ['11th', '12th', 'IIT-JEE'],
        experienceYears: 12,
        hourlyRate: 850,
        rating: 4.9,
        reviewCount: 142,
        verified: true,
        verificationStatus: 'VERIFIED',
        mode: 'hybrid',
        serviceRadiusKm: 15,
        location: { lat: 28.6139, lng: 77.2090, city: 'New Delhi' },
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
      },
      {
        id: 'tchr_2',
        name: 'Prof. Rajesh Sharma',
        bio: 'Senior Chemistry Faculty, ex-Allen mentor. Expert in Organic and Physical Chemistry mechanisms.',
        subjects: ['Chemistry'],
        grade: ['10th', '11th', '12th', 'NEET'],
        experienceYears: 9,
        hourlyRate: 750,
        rating: 4.8,
        reviewCount: 98,
        verified: true,
        verificationStatus: 'VERIFIED',
        mode: 'online',
        serviceRadiusKm: 25,
        location: { lat: 28.5355, lng: 77.3910, city: 'Noida' },
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      },
      {
        id: 'tchr_3',
        name: 'Ananya Verma',
        bio: 'Master in Mathematics, Cambridge Certified Educator. Focus on conceptual clarity, speed tricks, and calculus mastery.',
        subjects: ['Mathematics'],
        grade: ['9th', '10th', '11th', '12th'],
        experienceYears: 6,
        hourlyRate: 600,
        rating: 4.95,
        reviewCount: 84,
        verified: true,
        verificationStatus: 'VERIFIED',
        mode: 'hybrid',
        serviceRadiusKm: 10,
        location: { lat: 28.4595, lng: 77.0266, city: 'Gurgaon' },
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
      }
    ],
    filtersApplied: { subject, grade, mode, maxDistance, lat, lng }
  });
});

// GET /api/teachers/:id
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Dr. Sarah Jenkins',
    bio: 'Ph.D. in Physics from IIT Delhi with 12+ years experience.',
    subjects: ['Physics', 'Mathematics'],
    verified: true,
    rating: 4.9
  });
});

export default router;
