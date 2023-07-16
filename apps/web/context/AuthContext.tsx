"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import firebase_app from '../firebase/config';
import Main from '../src/app/main/page';

const auth = getAuth(firebase_app);

export interface AuthContextProps {
  user: User | null;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);
export const useAuthContext = (): AuthContextProps | undefined => useContext(AuthContext);

interface LoginProviderProps {
  children: React.ReactNode
}

export const AuthContextProvider = ({ children }: LoginProviderProps) => {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{user}} >
      {children}
    </AuthContext.Provider>
  );
}
