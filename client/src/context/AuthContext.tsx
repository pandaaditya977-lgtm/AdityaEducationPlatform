import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { DEMO_USERS } from '../services/mockData';

interface AuthContextType {
  currentUser: User | null;
  role: UserRole;
  token: string | null;
  setRole: (role: UserRole) => void;
  loginAs: (role: UserRole) => void;
  logout: () => void;
  updateUserProfile: (updates: Partial<User>) => void;
  registerUser: (data: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    phone?: string;
    grade?: string;
    board?: string;
    subjects?: string[];
    avatar?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  loginUser: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem('educonnect_role');
    return (saved as UserRole) || 'STUDENT';
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('educonnect_token') || null;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('educonnect_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEMO_USERS.STUDENT;
      }
    }
    return DEMO_USERS.STUDENT;
  });

  // Verify token on mount with Neon PostgreSQL backend
  useEffect(() => {
    const savedToken = localStorage.getItem('educonnect_token');
    if (savedToken) {
      fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${savedToken}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.authenticated && data.user) {
            setCurrentUser(data.user);
            setRoleState(data.user.role);
            localStorage.setItem('educonnect_user', JSON.stringify(data.user));
            localStorage.setItem('educonnect_role', data.user.role);
          }
        })
        .catch(() => {
          // Backend server might be starting up
        });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('educonnect_role', role);
    if (role === 'GUEST') {
      setCurrentUser(null);
      localStorage.removeItem('educonnect_user');
    }
  }, [role]);

  const loginAs = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole === 'GUEST') {
      setCurrentUser(null);
      localStorage.removeItem('educonnect_user');
    } else {
      const demoUser = DEMO_USERS[newRole] || DEMO_USERS.STUDENT;
      setCurrentUser(demoUser);
      localStorage.setItem('educonnect_user', JSON.stringify(demoUser));
    }
  };

  const logout = () => {
    setRoleState('GUEST');
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('educonnect_user');
    localStorage.removeItem('educonnect_token');
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (currentUser) {
      const updated = { ...currentUser, ...updates };
      setCurrentUser(updated);
      localStorage.setItem('educonnect_user', JSON.stringify(updated));
    }
  };

  const registerUser = async (data: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    phone?: string;
    grade?: string;
    board?: string;
    subjects?: string[];
    avatar?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const resData = await response.json();

      if (!response.ok) {
        return { success: false, error: resData.error || 'Registration failed' };
      }

      if (resData.user && resData.token) {
        setToken(resData.token);
        localStorage.setItem('educonnect_token', resData.token);
        setCurrentUser(resData.user);
        setRoleState(resData.user.role);
        localStorage.setItem('educonnect_user', JSON.stringify(resData.user));
        localStorage.setItem('educonnect_role', resData.user.role);
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: 'Database server offline or unreachable: ' + err.message };
    }
  };

  const loginUser = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const resData = await response.json();

      if (!response.ok) {
        return { success: false, error: resData.error || 'Login failed' };
      }

      if (resData.user && resData.token) {
        setToken(resData.token);
        localStorage.setItem('educonnect_token', resData.token);
        setCurrentUser(resData.user);
        setRoleState(resData.user.role);
        localStorage.setItem('educonnect_user', JSON.stringify(resData.user));
        localStorage.setItem('educonnect_role', resData.user.role);
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: 'Database server offline or unreachable: ' + err.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        token,
        setRole: setRoleState,
        loginAs,
        logout,
        updateUserProfile,
        registerUser,
        loginUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
