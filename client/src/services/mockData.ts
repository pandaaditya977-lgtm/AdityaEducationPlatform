import { Teacher, Note, ShortVideo, LectureVideo, Test, Badge, LeaderboardEntry, Allotment, ContactQuery, User, SiteSettings, AuditLogEntry } from '../types';

export const DEMO_USERS: Record<string, User> = {
  STUDENT: {
    id: 'usr_student_alex',
    name: 'Alex Johnson',
    email: 'alex.student@educonnect.com',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98111 22334',
    grade: '12th Standard',
    board: 'CBSE / IIT-JEE Aspirant',
    rewardPoints: 1950,
    streakDays: 9,
    status: 'ACTIVE',
    joinedDate: '2026-08-15'
  },
  TEACHER: {
    id: 'usr_teacher_sarah',
    name: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@educonnect.com',
    role: 'TEACHER',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98222 33445',
    grade: 'Senior Faculty',
    board: 'Physics Department Lead',
    subjects: ['Physics', 'Applied Mathematics'],
    rewardPoints: 4200,
    streakDays: 45,
    status: 'ACTIVE',
    joinedDate: '2026-06-10'
  },
  ADMIN: {
    id: 'usr_admin_victoria',
    name: 'Victoria Vance',
    email: 'admin@educonnect.com',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98000 11111',
    grade: 'Lead Administrator',
    board: 'Platform Governance',
    status: 'ACTIVE',
    joinedDate: '2026-01-01'
  }
};

export const INITIAL_USERS: User[] = [
  {
    id: 'usr_admin_victoria',
    name: 'Victoria Vance',
    email: 'admin@educonnect.com',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98000 11111',
    grade: 'Lead Administrator',
    board: 'Platform Governance',
    status: 'ACTIVE',
    joinedDate: '2026-01-01'
  },
  {
    id: 'usr_admin_karan',
    name: 'Karan Batra',
    email: 'karan.ops@educonnect.com',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98000 22222',
    grade: 'Operations Moderator',
    board: 'Trust & Safety',
    status: 'ACTIVE',
    joinedDate: '2026-02-14'
  },
  {
    id: 'tchr_1',
    name: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@educonnect.com',
    role: 'TEACHER',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98222 33445',
    grade: 'Senior Faculty',
    board: 'IIT Delhi Alum',
    subjects: ['Physics', 'Applied Mathematics'],
    rewardPoints: 4200,
    streakDays: 45,
    status: 'ACTIVE',
    joinedDate: '2026-06-10'
  },
  {
    id: 'tchr_2',
    name: 'Prof. Rajesh Sharma',
    email: 'rajesh.sharma@educonnect.com',
    role: 'TEACHER',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98333 44556',
    grade: 'Senior Faculty',
    board: 'IIT Roorkee Alum',
    subjects: ['Chemistry', 'Physical Sciences'],
    rewardPoints: 3100,
    streakDays: 32,
    status: 'ACTIVE',
    joinedDate: '2026-07-01'
  },
  {
    id: 'tchr_3',
    name: 'Ananya Verma',
    email: 'ananya.verma@educonnect.com',
    role: 'TEACHER',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98444 55667',
    grade: 'Senior Faculty',
    board: 'Cambridge Certified',
    subjects: ['Mathematics', 'Olympiad Math'],
    rewardPoints: 2900,
    streakDays: 28,
    status: 'ACTIVE',
    joinedDate: '2026-07-15'
  },
  {
    id: 'tchr_4',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@educonnect.com',
    role: 'TEACHER',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98555 66778',
    grade: 'Lead Educator',
    board: 'Stanford Alum',
    subjects: ['Computer Science', 'Python', 'AI/Data Science'],
    rewardPoints: 3500,
    streakDays: 30,
    status: 'ACTIVE',
    joinedDate: '2026-07-20'
  },
  {
    id: 'tchr_6',
    name: 'Vikramaditya Rao',
    email: 'vikram.rao@educonnect.com',
    role: 'TEACHER',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98777 88990',
    grade: 'Applicant Educator',
    board: 'NIT Trichy',
    subjects: ['Physics', 'Mathematics'],
    rewardPoints: 450,
    streakDays: 3,
    status: 'ACTIVE',
    joinedDate: '2026-09-12'
  },
  {
    id: 'usr_student_alex',
    name: 'Alex Johnson',
    email: 'alex.student@educonnect.com',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98111 22334',
    grade: '12th Standard',
    board: 'CBSE / IIT-JEE Aspirant',
    rewardPoints: 1950,
    streakDays: 9,
    status: 'ACTIVE',
    joinedDate: '2026-08-15'
  },
  {
    id: 'usr_std_aarav',
    name: 'Aarav Mehta',
    email: 'aarav.m@example.com',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98999 11223',
    grade: '12th Standard',
    board: 'CBSE',
    rewardPoints: 2940,
    streakDays: 24,
    status: 'ACTIVE',
    joinedDate: '2026-06-25'
  },
  {
    id: 'usr_std_priya',
    name: 'Priya Iyer',
    email: 'priya.iyer@example.com',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98888 22334',
    grade: '12th Standard',
    board: 'ICSE / NEET Pre-Med',
    rewardPoints: 2680,
    streakDays: 19,
    status: 'ACTIVE',
    joinedDate: '2026-07-05'
  },
  {
    id: 'usr_std_rahul',
    name: 'Rahul Verma',
    email: 'rahul.v@example.com',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98777 33445',
    grade: '11th Standard',
    board: 'State Board',
    rewardPoints: 320,
    streakDays: 0,
    status: 'SUSPENDED',
    joinedDate: '2026-08-01'
  }
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  announcementText: '🌟 Admissions Open for Academic Year 2026–2027! Book a free 30-minute 1-on-1 trial with our top educators.',
  announcementType: 'info',
  announcementActive: true,
  maintenanceMode: false,
  platformCommissionPercent: 12.5,
  supportEmail: 'support@educonnect.com',
  supportPhone: '+91 98000 11111'
};

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log_1',
    action: 'VERIFY_TEACHER',
    target: 'Dr. Sarah Jenkins',
    timestamp: '2026-09-17T18:30:00Z',
    adminName: 'Victoria Vance',
    details: 'Verified Ph.D. Physics credentials and issued Verified Educator badge.'
  },
  {
    id: 'log_2',
    action: 'UPDATE_BANNER',
    target: 'Global Site Banner',
    timestamp: '2026-09-17T15:10:00Z',
    adminName: 'Victoria Vance',
    details: 'Updated live announcement banner for 2026–2027 Admissions.'
  },
  {
    id: 'log_3',
    action: 'RESOLVE_INQUIRY',
    target: 'Sunita Raman (qry_2)',
    timestamp: '2026-09-16T17:45:00Z',
    adminName: 'Victoria Vance',
    details: 'Scheduled institutional partnership demo for next Monday.'
  },
  {
    id: 'log_4',
    action: 'ALLOTMENT_APPROVED',
    target: 'Allotment #alt_101 (Alex Johnson -> Dr. Sarah Jenkins)',
    timestamp: '2026-09-15T11:20:00Z',
    adminName: 'System Engine',
    details: 'Allotment verified and activated for 12th Grade Physics.'
  },
  {
    id: 'log_5',
    action: 'SUSPEND_USER',
    target: 'Rahul Verma (usr_std_rahul)',
    timestamp: '2026-09-14T09:00:00Z',
    adminName: 'Victoria Vance',
    details: 'Suspended account due to repeated test honor code violations.'
  }
];

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 'tchr_1',
    name: 'Dr. Sarah Jenkins',
    bio: 'Ph.D. in High-Energy Physics from IIT Delhi with 12+ years of experience mentoring 500+ students into top tier IITs and Medical colleges. Known for intuitive visual demonstrations and problem-solving shortcuts.',
    qualifications: ['Ph.D. Physics (IIT Delhi)', 'M.Sc. Applied Physics (Gold Medalist)', 'National Science Fellow'],
    subjects: ['Physics', 'Applied Mathematics'],
    grade: ['11th', '12th', 'IIT-JEE', 'NEET'],
    experienceYears: 12,
    hourlyRate: 850,
    rating: 4.95,
    reviewCount: 168,
    verified: true,
    verificationStatus: 'VERIFIED',
    mode: 'hybrid',
    serviceRadiusKm: 15,
    location: {
      lat: 28.6139,
      lng: 77.2090,
      city: 'Connaught Place, New Delhi',
      address: 'B-Block, Outer Circle, Connaught Place'
    },
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    sampleVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-computer-43232-large.mp4',
    certificates: ['IIT_Delhi_Doctorate.pdf', 'National_Teaching_Excellence_Award_2023.pdf']
  },
  {
    id: 'tchr_2',
    name: 'Prof. Rajesh Sharma',
    bio: 'Ex-Allen & FIITJEE Senior Faculty. Over a decade demystifying Organic mechanisms, Chemical Bonding, and Thermodynamics with real-life analogies and mnemonic techniques.',
    qualifications: ['M.Tech Chemical Engineering (IIT Roorkee)', 'B.Sc. Chemistry Honours (DU)'],
    subjects: ['Chemistry', 'Physical Sciences'],
    grade: ['10th', '11th', '12th', 'NEET'],
    experienceYears: 10,
    hourlyRate: 750,
    rating: 4.88,
    reviewCount: 114,
    verified: true,
    verificationStatus: 'VERIFIED',
    mode: 'online',
    serviceRadiusKm: 25,
    location: {
      lat: 28.5355,
      lng: 77.3910,
      city: 'Sector 62, Noida',
      address: 'Expressway Tower 4, Sector 62'
    },
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    certificates: ['IIT_Roorkee_MTech.pdf', 'Excellence_In_Coaching_2024.pdf']
  },
  {
    id: 'tchr_3',
    name: 'Ananya Verma',
    bio: 'Cambridge Certified Mathematics Educator and Olympiad Trainer. Passionate about turning math phobia into love for numbers through interactive calculus and algebra geometry visualizations.',
    qualifications: ['M.Sc. Pure Mathematics (St. Stephens)', 'Cambridge CELTA Educator'],
    subjects: ['Mathematics', 'Olympiad Math'],
    grade: ['9th', '10th', '11th', '12th'],
    experienceYears: 7,
    hourlyRate: 650,
    rating: 4.92,
    reviewCount: 92,
    verified: true,
    verificationStatus: 'VERIFIED',
    mode: 'hybrid',
    serviceRadiusKm: 12,
    location: {
      lat: 28.4595,
      lng: 77.0266,
      city: 'Cyber City, Gurgaon',
      address: 'DLF Phase 2, Near Sikanderpur Metro'
    },
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
    certificates: ['Cambridge_Accreditation.pdf', 'Delhi_Univ_MSc.pdf']
  },
  {
    id: 'tchr_4',
    name: 'Dr. Michael Chen',
    bio: 'Stanford Alum & Senior CS Researcher. Teaches Python, Data Structures, AP Computer Science A, and AI fundamentals with hands-on coding challenges and real-world projects.',
    qualifications: ['M.S. Computer Science (Stanford)', 'B.Tech CS (BITS Pilani)'],
    subjects: ['Computer Science', 'Python', 'AI/Data Science'],
    grade: ['10th', '11th', '12th', 'College'],
    experienceYears: 8,
    hourlyRate: 900,
    rating: 4.97,
    reviewCount: 130,
    verified: true,
    verificationStatus: 'VERIFIED',
    mode: 'online',
    serviceRadiusKm: 50,
    location: {
      lat: 28.5672,
      lng: 77.2100,
      city: 'Hauz Khas, New Delhi',
      address: 'Near IIT Gate, Hauz Khas'
    },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    certificates: ['Stanford_Diploma.pdf', 'AWS_Certified_Specialist.pdf']
  },
  {
    id: 'tchr_5',
    name: 'Dr. Meera Nambiar',
    bio: 'AIIMS Gold Medalist in Physiology and Human Anatomy. Specialist in NCERT line-by-line decoding for NEET Biology with 100% diagram memory retention techniques.',
    qualifications: ['MBBS (AIIMS New Delhi)', 'MD Physiology'],
    subjects: ['Biology', 'NEET Pre-Med'],
    grade: ['11th', '12th', 'NEET Repeater'],
    experienceYears: 11,
    hourlyRate: 800,
    rating: 4.91,
    reviewCount: 154,
    verified: true,
    verificationStatus: 'VERIFIED',
    mode: 'offline',
    serviceRadiusKm: 8,
    location: {
      lat: 28.5244,
      lng: 77.1855,
      city: 'Saket, New Delhi',
      address: 'Saket District Centre, South Delhi'
    },
    avatar: 'https://images.unsplash.com/photo-1594824813591-15598b96369c?w=300&auto=format&fit=crop&q=80',
    certificates: ['AIIMS_Medical_Degree.pdf', 'Medical_Council_Registration.pdf']
  },
  {
    id: 'tchr_6',
    name: 'Vikramaditya Rao',
    bio: 'Applicant currently undergoing credential verification. 4 years coaching experience in ICSE & CBSE Class 10 Foundation Math & Physics.',
    qualifications: ['B.Tech Mechanical Engineering (NIT Trichy)'],
    subjects: ['Physics', 'Mathematics'],
    grade: ['9th', '10th'],
    experienceYears: 4,
    hourlyRate: 500,
    rating: 4.6,
    reviewCount: 14,
    verified: false,
    verificationStatus: 'PENDING',
    mode: 'online',
    serviceRadiusKm: 10,
    location: {
      lat: 28.7041,
      lng: 77.1025,
      city: 'Rohini, New Delhi',
      address: 'Sector 14, Rohini'
    },
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    certificates: ['NIT_Trichy_Degree.pdf', 'National_ID_Card.jpg']
  }
];

export const INITIAL_ALLOTMENTS: Allotment[] = [
  {
    id: 'alt_101',
    studentId: 'usr_student_alex',
    studentName: 'Alex Johnson',
    teacherId: 'tchr_1',
    teacherName: 'Dr. Sarah Jenkins',
    subject: 'Physics',
    grade: '12th',
    mode: 'hybrid',
    budget: 850,
    status: 'ACTIVE',
    requestedAt: '2026-09-01T10:00:00Z',
    notes: 'Focus on Electromagnetism derivations and JEE Advanced numerical problem-solving.'
  },
  {
    id: 'alt_102',
    studentId: 'usr_student_alex',
    studentName: 'Alex Johnson',
    teacherId: 'tchr_3',
    teacherName: 'Ananya Verma',
    subject: 'Mathematics',
    grade: '12th',
    mode: 'online',
    budget: 650,
    status: 'ACTIVE',
    requestedAt: '2026-09-05T14:30:00Z',
    notes: 'Definite integrals and Differential Equations mastery.'
  },
  {
    id: 'alt_103',
    studentId: 'usr_student_alex',
    studentName: 'Alex Johnson',
    teacherId: 'tchr_2',
    teacherName: 'Prof. Rajesh Sharma',
    subject: 'Chemistry',
    grade: '12th',
    mode: 'online',
    budget: 750,
    status: 'PENDING',
    requestedAt: '2026-09-16T18:20:00Z',
    notes: 'Need structured doubt-clearing sessions for Aldehydes and Ketones mechanisms.'
  }
];

export const INITIAL_NOTES: Note[] = [
  {
    id: 'note_1',
    title: 'Electromagnetic Induction & Faraday-Lenz Laws',
    description: 'Comprehensive handwritten & typed notes covering magnetic flux, induced EMF, Eddy currents, mutual inductance, and self-inductance derivations with solved exam problems.',
    subject: 'Physics',
    chapter: 'Chapter 6: EMI',
    grade: '12th Standard',
    fileUrl: '/notes/electromagnetic_induction_ch6.pdf',
    fileSizeKb: 3450,
    downloadCount: 842,
    aiSummary: '• Key Principles: Faraday\'s Law (E = -dΦ/dt) and Lenz\'s Law showing energy conservation.\n• High-Yield Topics: Self-inductance (L = μ₀n²Al) and Mutual inductance coupling coefficient.\n• Common Exam Pitfall: Forgetting negative sign indicating direction of opposing magnetic flux.',
    teacherName: 'Dr. Sarah Jenkins',
    version: 2,
    createdAt: '2026-09-10'
  },
  {
    id: 'note_2',
    title: 'Definite Integrals: King Rule & Reduction Formulas',
    description: 'Quick-reference formula cheatsheet, properties of definite integrals, King\'s rule substitutions, Wallis formula, and graphical area calculation steps.',
    subject: 'Mathematics',
    chapter: 'Chapter 7: Integrals',
    grade: '12th Standard',
    fileUrl: '/notes/definite_integrals_mastery.pdf',
    fileSizeKb: 2180,
    downloadCount: 1104,
    aiSummary: '• Core Shortcut: King Property ∫ₐᵇ f(x)dx = ∫ₐᵇ f(a+b-x)dx solves 80% of tricky trigonometric definite integrals.\n• Solved Patterns: Periodic function integrations and Leibniz rule for differentiation under integral sign.',
    teacherName: 'Ananya Verma',
    version: 1,
    createdAt: '2026-09-12'
  },
  {
    id: 'note_3',
    title: 'Carbonyl Compounds: Aldehydes, Ketones & Carboxylic Acids',
    description: 'Mechanisms of Nucleophilic Addition, Aldol Condensation, Cannizzaro Reaction, Clemmensen and Wolff-Kishner Reductions with flowcharts.',
    subject: 'Chemistry',
    chapter: 'Chapter 12: Aldehydes & Ketones',
    grade: '12th Standard',
    fileUrl: '/notes/aldehydes_ketones_mechanisms.pdf',
    fileSizeKb: 4120,
    downloadCount: 670,
    aiSummary: '• Named Reactions: Cross-aldol condensation requiring alpha-hydrogen vs Cannizzaro requiring no alpha-hydrogen.\n• Reagent Cheat Sheet: DIBAL-H, Tollens test, Fehling solution distinguishing aliphatic vs aromatic aldehydes.',
    teacherName: 'Prof. Rajesh Sharma',
    version: 3,
    createdAt: '2026-09-14'
  },
  {
    id: 'note_4',
    title: 'Human Reproduction & Gametogenesis Cycle',
    description: 'Detailed anatomical diagrams, Spermatogenesis vs Oogenesis comparative chart, Menstrual cycle hormonal regulation graph, and Embryo development milestones.',
    subject: 'Biology',
    chapter: 'Chapter 3: Human Reproduction',
    grade: '12th Standard',
    fileUrl: '/notes/human_reproduction_ncert_decoded.pdf',
    fileSizeKb: 5200,
    downloadCount: 950,
    aiSummary: '• Hormonal Surge: LH surge causes ovulation at day 14. Progesterone maintains endometrium lining.\n• NCERT Lines: Exact cellular ploidy at primary spermatocyte vs secondary oocyte stages.',
    teacherName: 'Dr. Meera Nambiar',
    version: 1,
    createdAt: '2026-09-08'
  },
  {
    id: 'note_5',
    title: 'Binary Trees, BSTs & Graph Traversal (DFS/BFS)',
    description: 'Visual code walkthrough in Python and C++, tree height calculations, AVL balance factors, and Dijkstra shortest path algorithm implementations.',
    subject: 'Computer Science',
    chapter: 'Unit 4: Advanced Data Structures',
    grade: '12th / AP CS',
    fileUrl: '/notes/binary_trees_graphs_dsa.pdf',
    fileSizeKb: 2890,
    downloadCount: 780,
    aiSummary: '• Time Complexities: BST search average O(log n), worst-case O(n) when skewed.\n• Traversal Patterns: In-order traversal of a BST yields elements in strictly sorted ascending order.',
    teacherName: 'Dr. Michael Chen',
    version: 2,
    createdAt: '2026-09-11'
  }
];

export const INITIAL_SHORTS: ShortVideo[] = [
  {
    id: 'sh_1',
    title: 'Lenz Law in 30 Seconds with Real Copper Tube Drop!',
    topic: 'Physics Experiment',
    durationSeconds: 32,
    teacherName: 'Dr. Sarah Jenkins',
    likes: 3840,
    views: 18900,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
    commentsCount: 142,
    liked: true,
    bookmarked: true
  },
  {
    id: 'sh_2',
    title: 'King\'s Property in Definite Integrals: 5-Second Hack!',
    topic: 'Math Shortcut',
    durationSeconds: 44,
    teacherName: 'Ananya Verma',
    likes: 4210,
    views: 24500,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    poster: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
    commentsCount: 215,
    liked: false,
    bookmarked: true
  },
  {
    id: 'sh_3',
    title: 'Why Benzene is Exceptionally Stable: Resonance in 45s',
    topic: 'Organic Chemistry',
    durationSeconds: 45,
    teacherName: 'Prof. Rajesh Sharma',
    likes: 2980,
    views: 14100,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    poster: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80',
    commentsCount: 88,
    liked: true,
    bookmarked: false
  },
  {
    id: 'sh_4',
    title: 'DNA Replication Fork Explained with 3D Animation',
    topic: 'Biology Bites',
    durationSeconds: 52,
    teacherName: 'Dr. Meera Nambiar',
    likes: 5120,
    views: 31000,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    poster: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600&auto=format&fit=crop&q=80',
    commentsCount: 310,
    liked: false,
    bookmarked: false
  }
];

export const INITIAL_LECTURES: LectureVideo[] = [
  {
    id: 'lec_1',
    title: 'Complete Electrodynamics Masterclass: Faraday, Maxwell & Alternating Current',
    subject: 'Physics',
    durationMinutes: 42,
    teacherName: 'Dr. Sarah Jenkins',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    views: 4520,
    chapters: [
      { title: 'Introduction & Magnetic Flux', timeSeconds: 0 },
      { title: 'Faraday Experiment 1 & 2', timeSeconds: 380 },
      { title: 'Lenz Law & Conservation of Energy', timeSeconds: 940 },
      { title: 'Motional EMF & Eddy Currents', timeSeconds: 1520 },
      { title: 'Mutual vs Self Inductance Derivations', timeSeconds: 2100 }
    ]
  },
  {
    id: 'lec_2',
    title: 'Calculus from Scratch to Advanced: Integration Strategies',
    subject: 'Mathematics',
    durationMinutes: 38,
    teacherName: 'Ananya Verma',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    poster: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80',
    views: 3890,
    chapters: [
      { title: 'Fundamental Theorem of Calculus', timeSeconds: 0 },
      { title: 'Substitution Technique Deep Dive', timeSeconds: 420 },
      { title: 'The 8 Fundamental Properties', timeSeconds: 1100 },
      { title: 'Solving Top 5 IIT-JEE PYQs', timeSeconds: 1850 }
    ]
  }
];

export const INITIAL_TESTS: Test[] = [
  {
    id: 'tst_phy_1',
    title: 'Physics Chapter 6: Electromagnetic Induction & Flux',
    subject: 'Physics',
    grade: '12th / JEE',
    durationMinutes: 8,
    totalQuestions: 5,
    passingScore: 60,
    rewardPointsOnPass: 60,
    negativeMarking: true,
    questions: [
      {
        id: 'q1',
        prompt: 'According to Faraday\'s law of electromagnetic induction, the magnitude of induced EMF in a circuit is directly proportional to:',
        options: [
          'The total magnetic flux linked with the circuit',
          'The rate of change of magnetic flux linked with the circuit',
          'The resistance of the wire in the circuit',
          'The electrostatic potential of the environment'
        ],
        correctAnswer: 1,
        explanation: 'Faraday\'s second law states that the induced EMF is directly proportional to the time rate of change of magnetic flux: |E| = dΦ/dt.',
        topic: 'Faraday Law'
      },
      {
        id: 'q2',
        prompt: 'Lenz\'s law is an essential consequence of which fundamental law of conservation?',
        options: [
          'Conservation of Electric Charge',
          'Conservation of Momentum',
          'Conservation of Energy',
          'Conservation of Angular Velocity'
        ],
        correctAnswer: 2,
        explanation: 'Lenz\'s law enforces conservation of energy; if the induced current aided the motion causing it, work would be done without energy consumption.',
        topic: 'Lenz Law'
      },
      {
        id: 'q3',
        prompt: 'A cylindrical coil of length L, radius r, and N turns has its number of turns doubled while keeping length and radius constant. Its self-inductance becomes:',
        options: [
          'Twice the original value',
          'Four times the original value',
          'Half the original value',
          'Remains unchanged'
        ],
        correctAnswer: 1,
        explanation: 'Self inductance L = (μ₀ * N² * A) / l. Since L is proportional to N², doubling turns multiplies inductance by 2² = 4.',
        topic: 'Self Inductance'
      },
      {
        id: 'q4',
        prompt: 'Which of the following devices does NOT make use of Eddy currents?',
        options: [
          'Induction furnace',
          'Magnetic braking in high-speed electric trains',
          'Dead-beat galvanometer damping',
          'Electric filament heater'
        ],
        correctAnswer: 3,
        explanation: 'An electric filament heater operates on simple Joule heating (I²R heating) through a resistive wire, not induced circular eddy currents in bulk conductors.',
        topic: 'Eddy Currents'
      },
      {
        id: 'q5',
        prompt: 'What is the SI unit of magnetic flux (Φ)?',
        options: [
          'Tesla (T)',
          'Weber (Wb)',
          'Henry (H)',
          'Gauss (G)'
        ],
        correctAnswer: 1,
        explanation: 'Weber (Wb) or Tesla-meter² (T·m²) is the standard SI unit of magnetic flux.',
        topic: 'Magnetic Flux'
      }
    ]
  },
  {
    id: 'tst_math_1',
    title: 'Mathematics Chapter 7: Definite Integrals & Properties',
    subject: 'Mathematics',
    grade: '12th / CBSE',
    durationMinutes: 10,
    totalQuestions: 4,
    passingScore: 70,
    rewardPointsOnPass: 50,
    negativeMarking: false,
    questions: [
      {
        id: 'mq1',
        prompt: 'What is the value of ∫₋ₐᵃ (x³ + sin(x)) dx for any positive real number a?',
        options: [
          '2a',
          '0',
          'a⁴ / 4',
          'π / 2'
        ],
        correctAnswer: 1,
        explanation: 'Both x³ and sin(x) are odd functions: f(-x) = -f(x). The integral of any odd function over symmetric limits [-a, a] is identically 0.',
        topic: 'Odd/Even Function Properties'
      },
      {
        id: 'mq2',
        prompt: 'The King Property of definite integrals states that ∫ₐᵇ f(x) dx is identical to:',
        options: [
          '∫ₐᵇ f(a - x) dx',
          '∫ₐᵇ f(a + b - x) dx',
          '∫ₐᵇ f(b - a - x) dx',
          '∫ₐᵇ f(x/2) dx'
        ],
        correctAnswer: 1,
        explanation: 'By substitution u = a + b - x, du = -dx, ∫ₐᵇ f(x) dx = ∫ₐᵇ f(a + b - x) dx.',
        topic: 'King Property'
      },
      {
        id: 'mq3',
        prompt: 'Evaluate ∫₀^(π/2) [sin(x) / (sin(x) + cos(x))] dx:',
        options: [
          'π / 2',
          'π / 4',
          '1',
          '0'
        ],
        correctAnswer: 1,
        explanation: 'Applying the King property gives 2I = ∫₀^(π/2) 1 dx = π/2 => I = π/4.',
        topic: 'Definite Integral Symmetry'
      },
      {
        id: 'mq4',
        prompt: 'If f(x) is continuous on [a, b], then d/dx [∫ₐˣ f(t) dt] is equal to:',
        options: [
          'f(x)',
          'f(x) - f(a)',
          'F(x) where F is antiderivative',
          '0'
        ],
        correctAnswer: 0,
        explanation: 'By the First Fundamental Theorem of Calculus, the derivative of an accumulation function with respect to its upper variable bound is simply f(x).',
        topic: 'Fundamental Theorem of Calculus'
      }
    ]
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'bdg_1',
    title: '7-Day Streak Master',
    description: 'Maintained 7 consecutive active study days on EduConnect.',
    tier: 'BRONZE',
    icon: 'Flame',
    minPoints: 200,
    unlocked: true
  },
  {
    id: 'bdg_2',
    title: 'Quiz Whiz',
    description: 'Achieved 80%+ on 3 consecutive chapter assessments.',
    tier: 'SILVER',
    icon: 'Trophy',
    minPoints: 600,
    unlocked: true
  },
  {
    id: 'bdg_3',
    title: 'Physics Olympian',
    description: 'Mastered all 6 Electrodynamics and Mechanics test series.',
    tier: 'GOLD',
    icon: 'Zap',
    minPoints: 1500,
    unlocked: true
  },
  {
    id: 'bdg_4',
    title: 'Grand Scholar of EduConnect',
    description: 'Accumulate 3,000+ reward points and complete 25 hours with verified tutors.',
    tier: 'PLATINUM',
    icon: 'Crown',
    minPoints: 3000,
    unlocked: false
  }
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    name: 'Aarav Mehta',
    points: 2940,
    badge: 'Gold Scholar',
    streak: 24,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
  },
  {
    rank: 2,
    name: 'Priya Iyer',
    points: 2680,
    badge: 'Gold Scholar',
    streak: 19,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
  },
  {
    rank: 3,
    name: 'Rohan Gupta',
    points: 2450,
    badge: 'Silver Prodigy',
    streak: 15,
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80'
  },
  {
    rank: 4,
    name: 'Alex Johnson (You)',
    points: 1950,
    badge: 'Physics Olympian',
    streak: 9,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    isCurrentUser: true
  },
  {
    rank: 5,
    name: 'Tanvi Sen',
    points: 1820,
    badge: 'Silver Prodigy',
    streak: 8,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80'
  },
  {
    rank: 6,
    name: 'Devansh Kulkarni',
    points: 1690,
    badge: 'Bronze Achiever',
    streak: 6,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80'
  },
  {
    rank: 7,
    name: 'Neha Chawla',
    points: 1540,
    badge: 'Bronze Achiever',
    streak: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_CONTACT_QUERIES: ContactQuery[] = [
  {
    id: 'qry_1',
    name: 'Vikram Malhotra',
    email: 'vikram.m@example.com',
    phone: '+91 98765 43210',
    subject: 'Inquiry for Grade 12 JEE Physics offline tutor in South Delhi',
    message: 'We are seeking an experienced tutor for in-person physics tutoring twice a week in Saket/Hauz Khas area.',
    status: 'PENDING',
    createdAt: '2026-09-17T09:15:00Z'
  },
  {
    id: 'qry_2',
    name: 'Sunita Raman',
    email: 'sunita.raman@example.com',
    phone: '+91 98123 45678',
    subject: 'Institutional Partnership & Bulk Student Onboarding',
    message: 'We represent an academy with 120 students and would like to license EduConnect tests & notes modules.',
    status: 'IN_REVIEW',
    createdAt: '2026-09-16T14:30:00Z',
    adminNotes: 'Contacted over phone on Sept 16; scheduled product walkthrough demo for next Monday.'
  }
];
