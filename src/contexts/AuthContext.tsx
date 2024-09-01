import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Loading } from "../components/Loading";

interface AuthContextProps {
  currentUser: User | null;
  isEmailVerified: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsEmailVerified(user?.emailVerified ?? false);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <Loading />
  }

  return (
    <AuthContext.Provider value={{ currentUser, isEmailVerified }}>
      {children}
    </AuthContext.Provider>
  );
};


