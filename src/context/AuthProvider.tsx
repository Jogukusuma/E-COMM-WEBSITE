"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import type { AuthContextType, User } from '@/lib/types';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER_STORAGE_KEY = 'sri-auth-user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // This is a mock authentication check.
    // In a real app, you'd verify a token with your backend.
    try {
      const storedUser = localStorage.getItem(MOCK_USER_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem(MOCK_USER_STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password_DO_NOT_USE: string): Promise<void> => {
    // THIS IS A MOCK LOGIN. DO NOT USE IN PRODUCTION.
    // In a real app, you would send the email and password to your Supabase backend.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mocking a successful login for any non-empty email
        if (email) {
          const mockUser: User = { 
            id: 'user-123', 
            email, 
            name: email.split('@')[0] 
          };
          localStorage.setItem(MOCK_USER_STORAGE_KEY, JSON.stringify(mockUser));
          setUser(mockUser);
          resolve();
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  };

  const signup = async (email: string, password_DO_NOT_USE: string, name: string): Promise<void> => {
    // THIS IS A MOCK SIGNUP. DO NOT USE IN PRODUCTION.
    // In a real app, you would send the details to your Supabase backend.
     return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && name) {
          const mockUser: User = { id: `user-${Date.now()}`, email, name };
          localStorage.setItem(MOCK_USER_STORAGE_KEY, JSON.stringify(mockUser));
          setUser(mockUser);
          resolve();
        } else {
           reject(new Error("Invalid signup details"));
        }
      }, 1000);
    });
  };

  const logout = () => {
    // This is a mock logout.
    // In a real app, you would also call Supabase's logout function.
    localStorage.removeItem(MOCK_USER_STORAGE_KEY);
    setUser(null);
    router.push('/login');
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
