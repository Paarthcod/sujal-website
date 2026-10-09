import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { storage, DEMO_USER, DEMO_ADMIN } from '../services/storage';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (emailOrMobile: string, password?: string) => Promise<boolean>;
  register: (userData: Partial<User>) => Promise<User>;
  updateProfile: (updatedData: Partial<User>) => void;
  switchRole: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => storage.getCurrentUser());

  useEffect(() => {
    if (!user) {
      setUser(DEMO_USER);
      storage.setCurrentUser(DEMO_USER);
    }
  }, []);

  const login = async (emailOrMobile: string): Promise<boolean> => {
    const users = storage.getUsers();
    const found = users.find(u => u.email.toLowerCase() === emailOrMobile.toLowerCase() || u.mobile === emailOrMobile);
    
    if (found) {
      setUser(found);
      storage.setCurrentUser(found);
      return true;
    }

    // Default to demo user if non-matching email provided for smooth demo presentation
    if (emailOrMobile.includes('admin')) {
      setUser(DEMO_ADMIN);
      storage.setCurrentUser(DEMO_ADMIN);
    } else {
      setUser(DEMO_USER);
      storage.setCurrentUser(DEMO_USER);
    }
    return true;
  };

  const register = async (userData: Partial<User>): Promise<User> => {
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name: userData.name || 'New Aspirant',
      email: userData.email || '',
      mobile: userData.mobile || '',
      dob: userData.dob || '2005-01-01',
      gender: userData.gender || 'Male',
      state: userData.state || 'Delhi',
      role: 'USER',
      isVerified: true,
      profileComplete: true,
      qualification: userData.qualification || '12th Pass',
      percentage: userData.percentage || 75,
      heightCm: userData.heightCm || 170,
      preferredBranch: userData.preferredBranch || 'Indian Army',
      createdAt: new Date().toISOString().split('T')[0]
    };

    storage.saveUser(newUser);
    setUser(newUser);
    storage.setCurrentUser(newUser);
    return newUser;
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updatedData };
    setUser(updated);
    storage.saveUser(updated);
  };

  const switchRole = (role: UserRole) => {
    const targetUser = role === 'ADMIN' ? DEMO_ADMIN : DEMO_USER;
    setUser(targetUser);
    storage.setCurrentUser(targetUser);
  };

  const logout = () => {
    setUser(null);
    storage.setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN',
        login,
        register,
        updateProfile,
        switchRole,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
