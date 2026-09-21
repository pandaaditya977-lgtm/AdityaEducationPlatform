import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Teacher,
  Note,
  ShortVideo,
  LectureVideo,
  Test,
  TestAttempt,
  Badge,
  LeaderboardEntry,
  Allotment,
  ContactQuery,
  User,
  SiteSettings,
  AuditLogEntry
} from '../types';
import {
  INITIAL_TEACHERS,
  INITIAL_ALLOTMENTS,
  INITIAL_NOTES,
  INITIAL_SHORTS,
  INITIAL_LECTURES,
  INITIAL_TESTS,
  INITIAL_BADGES,
  INITIAL_LEADERBOARD,
  INITIAL_CONTACT_QUERIES,
  INITIAL_USERS,
  INITIAL_SITE_SETTINGS,
  INITIAL_AUDIT_LOGS
} from '../services/mockData';
import { useAuth } from './AuthContext';

interface AppContextType {
  teachers: Teacher[];
  allotments: Allotment[];
  notes: Note[];
  shorts: ShortVideo[];
  lectures: LectureVideo[];
  tests: Test[];
  testAttempts: TestAttempt[];
  badges: Badge[];
  leaderboard: LeaderboardEntry[];
  contactQueries: ContactQuery[];
  users: User[];
  siteSettings: SiteSettings;
  auditLogs: AuditLogEntry[];
  notificationMessage: string | null;
  setNotificationMessage: (msg: string | null) => void;

  // Actions
  requestAllotment: (teacherId: string, subject: string, grade: string, mode: 'online' | 'offline' | 'hybrid', budget: number, notes?: string) => void;
  updateAllotmentStatus: (allotmentId: string, status: Allotment['status']) => void;
  reassignAllotment: (allotmentId: string, newTeacherId: string, newTeacherName: string) => void;
  submitTestAttempt: (testId: string, answers: number[], timeSpentSeconds: number) => TestAttempt;
  toggleLikeShort: (shortId: string) => void;
  toggleBookmarkShort: (shortId: string) => void;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'downloadCount' | 'version'>) => void;
  deleteNote: (noteId: string) => void;
  addShort: (short: Omit<ShortVideo, 'id' | 'likes' | 'views' | 'commentsCount'>) => void;
  deleteShort: (shortId: string) => void;
  addTest: (test: Test) => void;
  deleteTest: (testId: string) => void;
  verifyTeacher: (teacherId: string, approve: boolean, notes?: string) => void;
  submitContactQuery: (name: string, email: string, phone: string, subject: string, message: string) => void;
  updateQueryStatus: (queryId: string, status: ContactQuery['status'], adminNotes?: string) => void;
  deleteContactQuery: (queryId: string) => void;
  addUser: (userData: Partial<User> & { name: string; email: string; role: User['role'] }) => void;
  updateUser: (userId: string, updates: Partial<User>) => void;
  deleteUser: (userId: string) => void;
  toggleUserSuspension: (userId: string) => void;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  logAdminAction: (action: string, target: string, details: string) => void;
  refreshUsers: () => void;
  triggerCelebration: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, updateUserProfile } = useAuth();

  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem('educonnect_teachers');
    return saved ? JSON.parse(saved) : INITIAL_TEACHERS;
  });

  const [allotments, setAllotments] = useState<Allotment[]>(() => {
    const saved = localStorage.getItem('educonnect_allotments');
    return saved ? JSON.parse(saved) : INITIAL_ALLOTMENTS;
  });

  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('educonnect_notes');
    return saved ? JSON.parse(saved) : INITIAL_NOTES;
  });

  const [shorts, setShorts] = useState<ShortVideo[]>(() => {
    const saved = localStorage.getItem('educonnect_shorts');
    return saved ? JSON.parse(saved) : INITIAL_SHORTS;
  });

  const [lectures] = useState<LectureVideo[]>(INITIAL_LECTURES);
  const [tests, setTests] = useState<Test[]>(() => {
    const saved = localStorage.getItem('educonnect_tests');
    return saved ? JSON.parse(saved) : INITIAL_TESTS;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('educonnect_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('educonnect_site_settings');
    return saved ? JSON.parse(saved) : INITIAL_SITE_SETTINGS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    const saved = localStorage.getItem('educonnect_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [testAttempts, setTestAttempts] = useState<TestAttempt[]>(() => {
    const saved = localStorage.getItem('educonnect_attempts');
    return saved ? JSON.parse(saved) : [];
  });

  const [badges, setBadges] = useState<Badge[]>(() => {
    const saved = localStorage.getItem('educonnect_badges');
    return saved ? JSON.parse(saved) : INITIAL_BADGES;
  });

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => {
    const saved = localStorage.getItem('educonnect_leaderboard');
    return saved ? JSON.parse(saved) : INITIAL_LEADERBOARD;
  });

  const [contactQueries, setContactQueries] = useState<ContactQuery[]>(() => {
    const saved = localStorage.getItem('educonnect_contact_queries');
    return saved ? JSON.parse(saved) : INITIAL_CONTACT_QUERIES;
  });

  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('educonnect_teachers', JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem('educonnect_allotments', JSON.stringify(allotments));
  }, [allotments]);

  useEffect(() => {
    localStorage.setItem('educonnect_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('educonnect_shorts', JSON.stringify(shorts));
  }, [shorts]);

  useEffect(() => {
    localStorage.setItem('educonnect_tests', JSON.stringify(tests));
  }, [tests]);

  useEffect(() => {
    localStorage.setItem('educonnect_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('educonnect_site_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem('educonnect_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('educonnect_attempts', JSON.stringify(testAttempts));
  }, [testAttempts]);

  useEffect(() => {
    localStorage.setItem('educonnect_badges', JSON.stringify(badges));
  }, [badges]);

  useEffect(() => {
    localStorage.setItem('educonnect_leaderboard', JSON.stringify(leaderboard));
  }, [leaderboard]);

  useEffect(() => {
    localStorage.setItem('educonnect_contact_queries', JSON.stringify(contactQueries));
  }, [contactQueries]);

  const refreshUsers = () => {
    fetch('/api/admin/users')
      .then(res => {
        if (!res.ok) throw new Error('Status: ' + res.status);
        return res.json();
      })
      .then(data => {
        if (data.users && Array.isArray(data.users) && data.users.length > 0) {
          setUsers(data.users);
          localStorage.setItem('educonnect_users', JSON.stringify(data.users));
        }
      })
      .catch(() => {
        // Offline / fallback to local storage
      });
  };

  useEffect(() => {
    refreshUsers();
  }, []);

  const triggerCelebration = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const showToast = (msg: string) => {
    setNotificationMessage(msg);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 4000);
  };

  const requestAllotment = (
    teacherId: string,
    subject: string,
    grade: string,
    mode: 'online' | 'offline' | 'hybrid',
    budget: number,
    notesText?: string
  ) => {
    const teacher = teachers.find(t => t.id === teacherId);
    const newAllotment: Allotment = {
      id: 'alt_' + Date.now(),
      studentId: currentUser?.id || 'usr_student_alex',
      studentName: currentUser?.name || 'Alex Johnson',
      teacherId,
      teacherName: teacher?.name || 'Assigned Tutor',
      subject,
      grade,
      mode,
      budget,
      status: 'PENDING',
      requestedAt: new Date().toISOString(),
      notes: notesText
    };

    setAllotments(prev => [newAllotment, ...prev]);
    showToast(`Allotment request sent to ${teacher?.name || 'teacher'}!`);
  };

  const updateAllotmentStatus = (allotmentId: string, status: Allotment['status']) => {
    setAllotments(prev =>
      prev.map(a => (a.id === allotmentId ? { ...a, status } : a))
    );
    showToast(`Allotment status updated to ${status}.`);
  };

  const submitTestAttempt = (
    testId: string,
    answers: number[],
    timeSpentSeconds: number
  ): TestAttempt => {
    const test = tests.find(t => t.id === testId);
    if (!test) throw new Error('Test not found');

    let correctCount = 0;
    const weakTopics: string[] = [];

    test.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        correctCount++;
      } else {
        if (!weakTopics.includes(q.topic)) {
          weakTopics.push(q.topic);
        }
      }
    });

    const scorePercentage = Math.round((correctCount / test.questions.length) * 100);
    const passed = scorePercentage >= test.passingScore;
    const earnedPoints = passed ? test.rewardPointsOnPass : 15;

    const newAttempt: TestAttempt = {
      id: 'att_' + Date.now(),
      testId,
      testTitle: test.title,
      score: scorePercentage,
      maxScore: 100,
      passed,
      timeSpentSeconds,
      answers,
      weakTopics,
      aiFeedback: passed
        ? `Superb execution! You scored ${scorePercentage}%. Keep this momentum going.`
        : `Score: ${scorePercentage}%. Key focus area: review "${weakTopics.join(', ')}" before attempting again.`,
      completedAt: new Date().toISOString()
    };

    setTestAttempts(prev => [newAttempt, ...prev]);

    // Update reward points & user streak
    if (currentUser) {
      const currentPts = currentUser.rewardPoints || 1950;
      const newPointsTotal = currentPts + earnedPoints;
      updateUserProfile({
        rewardPoints: newPointsTotal,
        streakDays: (currentUser.streakDays || 9) + 1
      });

      // Update in leaderboard
      setLeaderboard(prev =>
        prev.map(item =>
          item.isCurrentUser ? { ...item, points: newPointsTotal, streak: item.streak + 1 } : item
        )
      );

      // Check if unlocked a badge
      setBadges(prev =>
        prev.map(b => {
          if (!b.unlocked && newPointsTotal >= b.minPoints) {
            triggerCelebration();
            showToast(`🎉 Achievement Unlocked: ${b.title}!`);
            return { ...b, unlocked: true };
          }
          return b;
        })
      );
    }

    if (passed) {
      triggerCelebration();
    }

    return newAttempt;
  };

  const toggleLikeShort = (shortId: string) => {
    setShorts(prev =>
      prev.map(s => {
        if (s.id === shortId) {
          const isLiked = !s.liked;
          return {
            ...s,
            liked: isLiked,
            likes: isLiked ? s.likes + 1 : s.likes - 1
          };
        }
        return s;
      })
    );
  };

  const toggleBookmarkShort = (shortId: string) => {
    setShorts(prev =>
      prev.map(s => {
        if (s.id === shortId) {
          return { ...s, bookmarked: !s.bookmarked };
        }
        return s;
      })
    );
  };

  const addNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'downloadCount' | 'version'>) => {
    const newNote: Note = {
      ...noteData,
      id: 'note_' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      downloadCount: 0,
      version: 1
    };
    setNotes(prev => [newNote, ...prev]);
    showToast('New study notes published successfully!');
  };

  const addShort = (shortData: Omit<ShortVideo, 'id' | 'likes' | 'views' | 'commentsCount'>) => {
    const newShort: ShortVideo = {
      ...shortData,
      id: 'sh_' + Date.now(),
      likes: 0,
      views: 1,
      commentsCount: 0,
      liked: false,
      bookmarked: false
    };
    setShorts(prev => [newShort, ...prev]);
    showToast('Educational Short published to student feed!');
  };

  const logAdminAction = (action: string, target: string, details: string) => {
    const newLog: AuditLogEntry = {
      id: 'log_' + Date.now(),
      action,
      target,
      timestamp: new Date().toISOString(),
      adminName: currentUser?.name || 'Victoria Vance',
      details
    };
    setAuditLogs(prev => [newLog, ...prev.slice(0, 49)]);
  };

  const reassignAllotment = (allotmentId: string, newTeacherId: string, newTeacherName: string) => {
    setAllotments(prev =>
      prev.map(a =>
        a.id === allotmentId
          ? { ...a, teacherId: newTeacherId, teacherName: newTeacherName, status: 'ACCEPTED' }
          : a
      )
    );
    logAdminAction('REASSIGN_ALLOTMENT', `Allotment #${allotmentId}`, `Reassigned tutor to ${newTeacherName}`);
    showToast(`Allotment successfully reassigned to ${newTeacherName}.`);
  };

  const deleteNote = (noteId: string) => {
    const note = notes.find(n => n.id === noteId);
    setNotes(prev => prev.filter(n => n.id !== noteId));
    logAdminAction('DELETE_NOTE', note?.title || noteId, 'Removed study note from content library');
    showToast('Study note has been removed.');
  };

  const deleteShort = (shortId: string) => {
    const short = shorts.find(s => s.id === shortId);
    setShorts(prev => prev.filter(s => s.id !== shortId));
    logAdminAction('DELETE_SHORT', short?.title || shortId, 'Removed EduShort video from platform feed');
    showToast('EduShort video has been removed.');
  };

  const addTest = (newTest: Test) => {
    setTests(prev => [newTest, ...prev]);
    logAdminAction('CREATE_TEST', newTest.title, `Published assessment with ${newTest.questions.length} questions`);
    showToast(`New test "${newTest.title}" published!`);
  };

  const deleteTest = (testId: string) => {
    const test = tests.find(t => t.id === testId);
    setTests(prev => prev.filter(t => t.id !== testId));
    logAdminAction('DELETE_TEST', test?.title || testId, 'Removed quiz/assessment from platform');
    showToast('Quiz / Test has been removed.');
  };

  const deleteContactQuery = (queryId: string) => {
    setContactQueries(prev => prev.filter(q => q.id !== queryId));
    logAdminAction('DELETE_INQUIRY', `Inquiry #${queryId}`, 'Archived/deleted customer support inquiry');
    showToast('Inquiry removed from support inbox.');
  };

  const addUser = async (userData: Partial<User> & { name: string; email: string; role: User['role'] }) => {
    try {
      await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: 'Password@123',
          role: userData.role,
          phone: userData.phone,
          grade: userData.grade,
          board: userData.board,
          subjects: userData.subjects
        })
      });
      refreshUsers();
    } catch {
      // Local fallback
    }

    const newUser: User = {
      id: 'usr_' + Date.now(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      avatar: userData.avatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      phone: userData.phone || '+91 98000 00000',
      grade: userData.grade || (userData.role === 'TEACHER' ? 'Senior Faculty' : '12th Standard'),
      board: userData.board || 'CBSE',
      subjects: userData.subjects || [],
      rewardPoints: userData.rewardPoints || (userData.role === 'STUDENT' ? 500 : 0),
      streakDays: userData.streakDays || 1,
      status: 'ACTIVE',
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setUsers(prev => [newUser, ...prev]);
    logAdminAction('CREATE_USER', `${newUser.name} (${newUser.role})`, `Added new user with email ${newUser.email}`);
    showToast(`User ${newUser.name} created and saved to database.`);
  };

  const updateUser = (userId: string, updates: Partial<User>) => {
    setUsers(prev =>
      prev.map(u => (u.id === userId ? { ...u, ...updates } : u))
    );
    logAdminAction('UPDATE_USER', `User #${userId}`, `Updated properties: ${Object.keys(updates).join(', ')}`);
    showToast('User profile updated successfully.');
  };

  const deleteUser = async (userId: string) => {
    const user = users.find(u => u.id === userId);
    try {
      await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
    } catch {
      // Local fallback
    }
    setUsers(prev => prev.filter(u => u.id !== userId));
    logAdminAction('DELETE_USER', user?.name || userId, 'Deleted user account permanently');
    showToast(`User ${user?.name || ''} has been deleted.`);
  };

  const toggleUserSuspension = (userId: string) => {
    setUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          const newStatus = u.status === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED';
          logAdminAction(
            newStatus === 'SUSPENDED' ? 'SUSPEND_USER' : 'ACTIVATE_USER',
            u.name,
            `Changed account status to ${newStatus}`
          );
          showToast(`User account ${u.name} is now ${newStatus.toLowerCase()}.`);
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  const updateSiteSettings = (newSettings: Partial<SiteSettings>) => {
    setSiteSettings(prev => {
      const updated = { ...prev, ...newSettings };
      logAdminAction('UPDATE_SETTINGS', 'Site Configuration', 'Updated global site settings / banner');
      return updated;
    });
    showToast('Platform settings saved successfully.');
  };

  const verifyTeacher = (teacherId: string, approve: boolean, notesText?: string) => {
    setTeachers(prev =>
      prev.map(t => {
        if (t.id === teacherId) {
          return {
            ...t,
            verified: approve,
            verificationStatus: approve ? 'VERIFIED' : 'REJECTED'
          };
        }
        return t;
      })
    );
    const teacher = teachers.find(t => t.id === teacherId);
    logAdminAction(
      approve ? 'VERIFY_TEACHER' : 'REJECT_TEACHER',
      teacher?.name || teacherId,
      approve ? 'Approved educator credentials and granted Verified badge' : `Rejected application: ${notesText || 'Credentials incomplete'}`
    );
    showToast(approve ? 'Teacher verified and awarded Verified Badge!' : 'Teacher verification rejected.');
  };

  const submitContactQuery = (
    name: string,
    email: string,
    phone: string,
    subject: string,
    message: string
  ) => {
    const newQuery: ContactQuery = {
      id: 'qry_' + Date.now(),
      name,
      email,
      phone,
      subject,
      message,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
    setContactQueries(prev => [newQuery, ...prev]);
    showToast('Thank you! Your message has been sent. An advisor will contact you shortly.');
  };

  const updateQueryStatus = (
    queryId: string,
    status: ContactQuery['status'],
    adminNotes?: string
  ) => {
    setContactQueries(prev =>
      prev.map(q => (q.id === queryId ? { ...q, status, adminNotes } : q))
    );
    logAdminAction('UPDATE_QUERY', `Query #${queryId}`, `Status changed to ${status}`);
    showToast('Inquiry status updated.');
  };

  return (
    <AppContext.Provider
      value={{
        teachers,
        allotments,
        notes,
        shorts,
        lectures,
        tests,
        testAttempts,
        badges,
        leaderboard,
        contactQueries,
        users,
        siteSettings,
        auditLogs,
        notificationMessage,
        setNotificationMessage,
        requestAllotment,
        updateAllotmentStatus,
        reassignAllotment,
        submitTestAttempt,
        toggleLikeShort,
        toggleBookmarkShort,
        addNote,
        deleteNote,
        addShort,
        deleteShort,
        addTest,
        deleteTest,
        verifyTeacher,
        submitContactQuery,
        updateQueryStatus,
        deleteContactQuery,
        addUser,
        updateUser,
        deleteUser,
        toggleUserSuspension,
        updateSiteSettings,
        logAdminAction,
        refreshUsers,
        triggerCelebration
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
