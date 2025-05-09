
'use client';

import type { User } from '@/lib/types';
import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // To handle initial auth check

  useEffect(() => {
    // Simulate checking auth status from localStorage or an API
    const storedUser = localStorage.getItem('alamedaLabUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem('alamedaLabUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    // Ensure all fields of User type are present, even if optional ones are undefined
    const fullUserData: User = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      isTutor: userData.isTutor,
      bio: userData.bio,
      profilePictureUrl: userData.profilePictureUrl,
      country: userData.country,
      province: userData.province,
      city: userData.city,
    };
    setUser(fullUserData);
    setIsLoggedIn(true);
    localStorage.setItem('alamedaLabUser', JSON.stringify(fullUserData));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('alamedaLabUser');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
