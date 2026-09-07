import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isDemoMode: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  enableDemoMode: () => void;
  disableDemoMode: () => void;
  startGuestSession: (name?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(() => {
    return localStorage.getItem('aquasense_demo_mode') === 'true';
  });
  const [guestName, setGuestName] = useState<string | null>(() => {
    return localStorage.getItem('aquasense_guest_name');
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      setIsDemoMode(false);
      setGuestName(null);
      localStorage.removeItem('aquasense_demo_mode');
      localStorage.removeItem('aquasense_guest_name');
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google Sign In Error:', error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    setIsDemoMode(false);
    setGuestName(null);
    localStorage.removeItem('aquasense_demo_mode');
    localStorage.removeItem('aquasense_guest_name');
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    setIsDemoMode(false);
    setGuestName(null);
    localStorage.removeItem('aquasense_demo_mode');
    localStorage.removeItem('aquasense_guest_name');
    const res = await createUserWithEmailAndPassword(auth, email, pass);
    if (res.user) {
      await updateProfile(res.user, { displayName: name });
    }
  };

  const signOutUser = async () => {
    setIsDemoMode(false);
    setGuestName(null);
    localStorage.removeItem('aquasense_demo_mode');
    localStorage.removeItem('aquasense_guest_name');
    await firebaseSignOut(auth);
  };

  const enableDemoMode = () => {
    setIsDemoMode(true);
    setGuestName(null);
    localStorage.setItem('aquasense_demo_mode', 'true');
    localStorage.removeItem('aquasense_guest_name');
  };

  const disableDemoMode = () => {
    setIsDemoMode(false);
    setGuestName(null);
    localStorage.removeItem('aquasense_demo_mode');
    localStorage.removeItem('aquasense_guest_name');
  };

  const startGuestSession = (name?: string) => {
    const chosen = name?.trim() || 'Guest Household';
    setGuestName(chosen);
    setIsDemoMode(false);
    localStorage.setItem('aquasense_guest_name', chosen);
    localStorage.removeItem('aquasense_demo_mode');
  };

  const isGuest = !user && !isDemoMode && !!guestName;

  const userProfile: UserProfile | null = isDemoMode
    ? {
        id: 'demo-user-priya',
        email: 'priya.sharma@aquasense.org',
        displayName: 'Priya',
      }
    : isGuest
    ? {
        id: 'guest-user',
        email: 'guest@aquasense.local',
        displayName: guestName,
      }
    : user
    ? {
        id: user.uid,
        email: user.email || '',
        displayName: user.displayName || user.email?.split('@')[0] || 'Member',
        photoURL: user.photoURL || undefined,
      }
    : null;

  return (
    <AuthContext.Provider
      value={{
        user: isDemoMode
          ? ({ uid: 'demo-user-priya', email: 'priya@aquasense.org', displayName: 'Priya' } as User)
          : isGuest
          ? ({ uid: 'guest-user', email: 'guest@aquasense.local', displayName: guestName } as User)
          : user,
        userProfile,
        loading,
        isDemoMode,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signOutUser,
        enableDemoMode,
        disableDemoMode,
        startGuestSession,
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
