import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  doc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  getDocs
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from './AuthContext';
import { 
  HouseholdConfig, 
  HouseholdMember, 
  ActivityLog, 
  DailyUsageLog, 
  ChallengeItem 
} from '../types';
import { 
  DEMO_HOUSEHOLD, 
  DEMO_MEMBERS, 
  DEMO_ACTIVITY_LOGS, 
  DEMO_DAILY_LOGS, 
  DEMO_CHALLENGES 
} from '../lib/demoData';

interface WaterDataContextType {
  household: HouseholdConfig;
  members: HouseholdMember[];
  activityLogs: ActivityLog[];
  dailyLogs: DailyUsageLog[];
  challenges: ChallengeItem[];
  loading: boolean;
  addActivityLog: (log: Omit<ActivityLog, 'id' | 'createdAt' | 'userId'>) => Promise<void>;
  addDailyLog: (date: string, litres: number, notes?: string) => Promise<void>;
  updateHousehold: (updated: Partial<HouseholdConfig>) => Promise<void>;
  addMember: (name: string, role: HouseholdMember['role']) => Promise<void>;
  removeMember: (memberId: string) => Promise<void>;
  toggleChallengeCompletion: (challengeId: string) => Promise<void>;
  resetToSampleData: () => void;
}

const WaterDataContext = createContext<WaterDataContextType | undefined>(undefined);

export const WaterDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isDemoMode } = useAuth();
  const [household, setHousehold] = useState<HouseholdConfig>(DEMO_HOUSEHOLD);
  const [members, setMembers] = useState<HouseholdMember[]>(DEMO_MEMBERS);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(DEMO_ACTIVITY_LOGS);
  const [dailyLogs, setDailyLogs] = useState<DailyUsageLog[]>(DEMO_DAILY_LOGS);
  const [challenges, setChallenges] = useState<ChallengeItem[]>(DEMO_CHALLENGES);
  const [loading, setLoading] = useState<boolean>(true);

  const isLocalSession = isDemoMode || !user || user.uid === 'demo-user-priya' || user.uid === 'guest-user';

  // Sync with Firestore when real authenticated user is logged in
  useEffect(() => {
    if (isDemoMode || !user || user.uid === 'demo-user-priya') {
      setHousehold(DEMO_HOUSEHOLD);
      setMembers(DEMO_MEMBERS);
      setActivityLogs(DEMO_ACTIVITY_LOGS);
      setDailyLogs(DEMO_DAILY_LOGS);
      setChallenges(DEMO_CHALLENGES);
      setLoading(false);
      return;
    }

    if (user.uid === 'guest-user') {
      const guestHouseholdName = user.displayName || 'My Household';
      setHousehold({
        userId: 'guest-user',
        name: guestHouseholdName,
        memberCount: 3,
        dailyTargetLitres: 405,
        hasRO: true,
        reusesROReject: false,
        hasGarden: true,
        waterSource: 'Municipal',
        bathHabit: 'Bucket',
        updatedAt: new Date().toISOString(),
      });
      setMembers([
        { id: 'gm-1', userId: 'guest-user', name: guestHouseholdName.split(' ')[0] || 'User', role: 'Adult', color: '#0284c7' },
        { id: 'gm-2', userId: 'guest-user', name: 'Family Member', role: 'Adult', color: '#0d9488' },
        { id: 'gm-3', userId: 'guest-user', name: 'Junior', role: 'Child', color: '#8b5cf6' },
      ]);
      setActivityLogs([]);
      setDailyLogs([]);
      setChallenges(DEMO_CHALLENGES);
      setLoading(false);
      return;
    }

    setLoading(true);
    const userId = user.uid;

    // Listen to Household
    const householdRef = doc(db, 'households', userId);
    const unsubHousehold = onSnapshot(householdRef, (snapshot) => {
      if (snapshot.exists()) {
        setHousehold(snapshot.data() as HouseholdConfig);
      } else {
        // Initialize default household
        const initialHousehold: HouseholdConfig = {
          userId,
          name: `${user.displayName || 'My'} Household`,
          memberCount: 4,
          dailyTargetLitres: 400,
          hasRO: true,
          reusesROReject: false,
          hasGarden: true,
          waterSource: 'Municipal',
          bathHabit: 'Mixed',
          updatedAt: new Date().toISOString(),
        };
        setDoc(householdRef, initialHousehold).catch((err) => {
          handleFirestoreError(err, OperationType.WRITE, `households/${userId}`);
        });
        setHousehold(initialHousehold);
      }
    }, (err) => {
      console.warn('Household snapshot warning:', err);
    });

    // Listen to Members
    const membersQuery = query(collection(db, 'householdMembers'), where('userId', '==', userId));
    const unsubMembers = onSnapshot(membersQuery, (snapshot) => {
      const items: HouseholdMember[] = [];
      snapshot.forEach(d => items.push({ id: d.id, ...d.data() } as HouseholdMember));
      if (items.length > 0) {
        setMembers(items);
      } else {
        setMembers([
          { id: 'm1', userId, name: user.displayName || 'Primary User', role: 'Adult', color: '#0284c7' },
          { id: 'm2', userId, name: 'Family Member 1', role: 'Adult', color: '#0d9488' },
        ]);
      }
    }, (err) => {
      console.warn('Members query warning:', err);
    });

    // Listen to Activity Logs
    const actQuery = query(collection(db, 'activityLogs'), where('userId', '==', userId));
    const unsubAct = onSnapshot(actQuery, (snapshot) => {
      const logs: ActivityLog[] = [];
      snapshot.forEach(d => logs.push({ id: d.id, ...d.data() } as ActivityLog));
      // Sort newest first
      logs.sort((a, b) => new Date(b.date + ' ' + (b.time || '12:00')).getTime() - new Date(a.date + ' ' + (a.time || '12:00')).getTime());
      if (logs.length > 0) {
        setActivityLogs(logs);
      } else {
        // Start empty for new real user or with clean initial state
        setActivityLogs([]);
      }
      setLoading(false);
    }, (err) => {
      console.warn('Activity logs query warning:', err);
      setLoading(false);
    });

    // Listen to Daily Logs
    const dailyQuery = query(collection(db, 'dailyUsageLogs'), where('userId', '==', userId));
    const unsubDaily = onSnapshot(dailyQuery, (snapshot) => {
      const dLogs: DailyUsageLog[] = [];
      snapshot.forEach(d => dLogs.push({ id: d.id, ...d.data() } as DailyUsageLog));
      dLogs.sort((a, b) => a.date.localeCompare(b.date));
      if (dLogs.length > 0) {
        setDailyLogs(dLogs);
      }
    }, (err) => {
      console.warn('Daily logs query warning:', err);
    });

    // Listen to Challenges
    const challengesQuery = query(collection(db, 'challenges'), where('userId', '==', userId));
    const unsubChallenges = onSnapshot(challengesQuery, (snapshot) => {
      const chs: ChallengeItem[] = [];
      snapshot.forEach(d => chs.push({ id: d.id, ...d.data() } as ChallengeItem));
      if (chs.length > 0) {
        setChallenges(chs);
      } else {
        setChallenges(DEMO_CHALLENGES);
      }
    }, (err) => {
      console.warn('Challenges query warning:', err);
    });

    return () => {
      unsubHousehold();
      unsubMembers();
      unsubAct();
      unsubDaily();
      unsubChallenges();
    };
  }, [user, isDemoMode]);

  const addActivityLog = async (logData: Omit<ActivityLog, 'id' | 'createdAt' | 'userId'>) => {
    const newLog: ActivityLog = {
      ...logData,
      id: 'act-' + Date.now(),
      userId: user ? user.uid : 'demo-user-priya',
      createdAt: new Date().toISOString(),
    };

    if (isLocalSession) {
      setActivityLogs((prev) => [newLog, ...prev]);
      // Also update today's daily log
      setDailyLogs((prev) => {
        const existingToday = prev.find(d => d.date === logData.date);
        if (existingToday) {
          return prev.map(d => d.date === logData.date ? { ...d, totalLitres: d.totalLitres + logData.litres } : d);
        } else {
          return [...prev, { id: 'd-' + Date.now(), userId: newLog.userId, date: logData.date, totalLitres: logData.litres, createdAt: new Date().toISOString() }];
        }
      });
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'activityLogs'), {
        ...newLog,
        userId: user!.uid,
      });
      newLog.id = docRef.id;

      // Update or create daily usage log for this date
      const dailyQuery = query(
        collection(db, 'dailyUsageLogs'), 
        where('userId', '==', user!.uid),
        where('date', '==', logData.date)
      );
      const snapshot = await getDocs(dailyQuery);
      if (!snapshot.empty) {
        const existingDoc = snapshot.docs[0];
        const currentLitres = existingDoc.data().totalLitres || 0;
        await updateDoc(doc(db, 'dailyUsageLogs', existingDoc.id), {
          totalLitres: currentLitres + logData.litres,
        });
      } else {
        await addDoc(collection(db, 'dailyUsageLogs'), {
          userId: user!.uid,
          date: logData.date,
          totalLitres: logData.litres,
          createdAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'activityLogs');
    }
  };

  const addDailyLog = async (date: string, litres: number, notes?: string) => {
    if (isLocalSession) {
      setDailyLogs((prev) => {
        const existing = prev.find(d => d.date === date);
        if (existing) {
          return prev.map(d => d.date === date ? { ...d, totalLitres: litres, notes } : d);
        }
        return [...prev, { id: 'd-' + Date.now(), userId: user ? user.uid : 'demo-user-priya', date, totalLitres: litres, notes, createdAt: new Date().toISOString() }];
      });
      return;
    }

    try {
      const dailyQuery = query(
        collection(db, 'dailyUsageLogs'), 
        where('userId', '==', user!.uid),
        where('date', '==', date)
      );
      const snapshot = await getDocs(dailyQuery);
      if (!snapshot.empty) {
        const existingDoc = snapshot.docs[0];
        await updateDoc(doc(db, 'dailyUsageLogs', existingDoc.id), {
          totalLitres: litres,
          notes: notes || '',
        });
      } else {
        await addDoc(collection(db, 'dailyUsageLogs'), {
          userId: user!.uid,
          date,
          totalLitres: litres,
          notes: notes || '',
          createdAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'dailyUsageLogs');
    }
  };

  const updateHousehold = async (updated: Partial<HouseholdConfig>) => {
    const merged = { ...household, ...updated, updatedAt: new Date().toISOString() };
    setHousehold(merged);

    if (!isLocalSession && user) {
      try {
        await setDoc(doc(db, 'households', user.uid), merged, { merge: true });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `households/${user.uid}`);
      }
    }
  };

  const addMember = async (name: string, role: HouseholdMember['role']) => {
    const colors = ['#0284c7', '#0d9488', '#8b5cf6', '#f59e0b', '#ec4899', '#10b981'];
    const newMember: HouseholdMember = {
      id: 'm-' + Date.now(),
      userId: user ? user.uid : 'demo-user-priya',
      name,
      role,
      color: colors[members.length % colors.length],
    };

    if (isLocalSession) {
      setMembers((prev) => [...prev, newMember]);
      updateHousehold({ memberCount: members.length + 1 });
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'householdMembers'), newMember);
      newMember.id = docRef.id;
      await updateHousehold({ memberCount: members.length + 1 });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'householdMembers');
    }
  };

  const removeMember = async (memberId: string) => {
    setMembers((prev) => prev.filter(m => m.id !== memberId));
    await updateHousehold({ memberCount: Math.max(1, members.length - 1) });

    if (!isLocalSession && user) {
      try {
        await deleteDoc(doc(db, 'householdMembers', memberId));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `householdMembers/${memberId}`);
      }
    }
  };

  const toggleChallengeCompletion = async (challengeId: string) => {
    setChallenges((prev) =>
      prev.map(c => c.id === challengeId ? { ...c, isCompleted: !c.isCompleted } : c)
    );

    if (!isLocalSession && user) {
      try {
        const ch = challenges.find(c => c.id === challengeId);
        if (ch) {
          await updateDoc(doc(db, 'challenges', challengeId), {
            isCompleted: !ch.isCompleted,
          });
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `challenges/${challengeId}`);
      }
    }
  };

  const resetToSampleData = () => {
    setHousehold(DEMO_HOUSEHOLD);
    setMembers(DEMO_MEMBERS);
    setActivityLogs(DEMO_ACTIVITY_LOGS);
    setDailyLogs(DEMO_DAILY_LOGS);
    setChallenges(DEMO_CHALLENGES);
  };

  return (
    <WaterDataContext.Provider
      value={{
        household,
        members,
        activityLogs,
        dailyLogs,
        challenges,
        loading,
        addActivityLog,
        addDailyLog,
        updateHousehold,
        addMember,
        removeMember,
        toggleChallengeCompletion,
        resetToSampleData,
      }}
    >
      {children}
    </WaterDataContext.Provider>
  );
};

export const useWaterData = () => {
  const context = useContext(WaterDataContext);
  if (!context) {
    throw new Error('useWaterData must be used within a WaterDataProvider');
  }
  return context;
};
