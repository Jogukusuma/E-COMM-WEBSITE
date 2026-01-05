"use client";

import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Auth, User as FirebaseUser, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import type { AuthContextType, User } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useFirebase } from '@/firebase';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { auth, firestore, user: firebaseUser, isUserLoading } = useFirebase();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(isUserLoading);
    if (firebaseUser) {
      setUser({
        id: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || '',
      });
    } else {
      setUser(null);
    }
  }, [firebaseUser, isUserLoading]);

  const login = useCallback(async (email: string, password) => {
    if (!auth) throw new Error("Auth service not available");
    await signInWithEmailAndPassword(auth, email, password);
  }, [auth]);

  const signup = useCallback(async (email: string, password, name: string) => {
    if (!auth || !firestore) throw new Error("Firebase services not available");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    const [firstName, ...lastNameParts] = name.split(' ');
    const lastName = lastNameParts.join(' ');
    
    const userDoc: User = {
      id: firebaseUser.uid,
      email: firebaseUser.email,
      firstName: firstName,
      lastName: lastName,
    };
    
    // Create user profile in Firestore
    await setDoc(doc(firestore, "users", firebaseUser.uid), userDoc);
    
    setUser(userDoc);
  }, [auth, firestore]);

  const logout = useCallback(async () => {
    if (!auth) throw new Error("Auth service not available");
    await signOut(auth);
    setUser(null);
    router.push('/login');
  }, [auth, router]);
  
  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
