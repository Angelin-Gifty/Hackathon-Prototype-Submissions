export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt?: string;
}

export interface HouseholdMember {
  id: string;
  userId: string;
  name: string;
  role: 'Adult' | 'Child' | 'Senior' | 'Guest';
  color?: string;
}

export interface HouseholdConfig {
  id?: string;
  userId: string;
  name: string;
  memberCount: number;
  dailyTargetLitres: number;
  hasRO: boolean;
  reusesROReject: boolean;
  hasGarden: boolean;
  waterSource: 'Municipal' | 'Borewell' | 'Water Tanker' | 'Combined';
  bathHabit: 'Bucket' | 'Shower' | 'Mixed';
  updatedAt?: string;
}

export type WaterCategory = 'Bathing' | 'Laundry' | 'Gardening' | 'Kitchen' | 'Sanitation' | 'Cleaning' | 'Other';

export interface ActivityPreset {
  id: string;
  name: string;
  category: WaterCategory;
  defaultLitres: number;
  unitLabel: string;
  iconName: string;
  description: string;
  savingTip: string;
  benchmarkPerUse: number;
}

export interface ActivityLog {
  id: string;
  userId: string;
  activityId: string;
  activityName: string;
  category: WaterCategory;
  litres: number;
  memberId?: string;
  memberName?: string;
  date: string; // YYYY-MM-DD
  time?: string;
  notes?: string;
  createdAt: string;
}

export interface DailyUsageLog {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  totalLitres: number;
  notes?: string;
  createdAt: string;
}

export interface WaterSuggestion {
  id: string;
  title: string;
  issue: string;
  whyItMatters: string;
  recommendedAction: string;
  potentialSavingDaily: number;
  potentialSavingWeekly: number;
  difficulty: 'Easy' | 'Medium' | 'Moderate';
  category: WaterCategory;
  isHighPriority?: boolean;
}

export interface ChallengeItem {
  id: string;
  title: string;
  description: string;
  targetSavingLitres: number;
  currentSavingLitres: number;
  period: string;
  isCompleted: boolean;
  badge: string;
}

export interface ComparisonItem {
  id: string;
  title: string;
  currentOption: {
    name: string;
    litres: number;
    description: string;
  };
  alternativeOption: {
    name: string;
    litres: number;
    description: string;
  };
  savingsLitresPerUse: number;
  savingsLitresPerMonth: number;
  annualCostSavingEstimate: number;
}
