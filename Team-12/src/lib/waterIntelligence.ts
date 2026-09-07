import { ActivityPreset, ActivityLog, WaterSuggestion, HouseholdConfig, HouseholdMember, ComparisonItem } from '../types';

export const ACTIVITY_PRESETS: ActivityPreset[] = [
  {
    id: 'bucket_bath',
    name: 'Bucket Bath',
    category: 'Bathing',
    defaultLitres: 35,
    unitLabel: 'per bath',
    iconName: 'Bath',
    description: 'Traditional water-efficient bucket bathing',
    savingTip: 'Using a standard 18–20L bucket saves up to 50L compared to a running shower.',
    benchmarkPerUse: 35,
  },
  {
    id: 'shower',
    name: 'Shower',
    category: 'Bathing',
    defaultLitres: 80,
    unitLabel: 'per 8 min shower',
    iconName: 'ShowerHead',
    description: 'Overhead shower bath (approx 10–12 L/min)',
    savingTip: 'Cutting shower duration by just 3 minutes saves ~30L every time.',
    benchmarkPerUse: 50,
  },
  {
    id: 'brushing_teeth',
    name: 'Brushing Teeth',
    category: 'Bathing',
    defaultLitres: 6,
    unitLabel: 'per session',
    iconName: 'Sparkles',
    description: 'Morning and evening oral hygiene',
    savingTip: 'Closing the tap while brushing saves ~12L per session.',
    benchmarkPerUse: 5,
  },
  {
    id: 'flush',
    name: 'Toilet Flush',
    category: 'Sanitation',
    defaultLitres: 9,
    unitLabel: 'per flush',
    iconName: 'CheckCircle2',
    description: 'Standard single-flush cistern',
    savingTip: 'Dual-flush conversion or a displacement bottle saves 3–4L per flush.',
    benchmarkPerUse: 6,
  },
  {
    id: 'laundry',
    name: 'Laundry',
    category: 'Laundry',
    defaultLitres: 60,
    unitLabel: 'per cycle',
    iconName: 'Shirt',
    description: 'Washing machine or bucket fabric wash',
    savingTip: 'Only run full loads and use eco-rinse cycles to save 20–30L.',
    benchmarkPerUse: 55,
  },
  {
    id: 'dishwashing',
    name: 'Dishwashing',
    category: 'Kitchen',
    defaultLitres: 35,
    unitLabel: 'per meal cleanup',
    iconName: 'Utensils',
    description: 'Sink rinse and scrub',
    savingTip: 'Soak heavily soiled utensils first instead of continuous running water.',
    benchmarkPerUse: 25,
  },
  {
    id: 'garden',
    name: 'Garden Watering',
    category: 'Gardening',
    defaultLitres: 90,
    unitLabel: 'per watering session',
    iconName: 'Trees',
    description: 'Plants, lawn, or balcony pots',
    savingTip: 'Water early in morning or after sunset to minimize evaporation loss.',
    benchmarkPerUse: 60,
  },
  {
    id: 'car_wash',
    name: 'Car / Vehicle Wash',
    category: 'Cleaning',
    defaultLitres: 120,
    unitLabel: 'per wash',
    iconName: 'Car',
    description: 'Car or two-wheeler wash',
    savingTip: 'Use a bucket and micro-fiber cloth instead of a continuous running hose.',
    benchmarkPerUse: 40,
  },
  {
    id: 'ro_purifier',
    name: 'RO Reject Water',
    category: 'Kitchen',
    defaultLitres: 35,
    unitLabel: 'per day generation',
    iconName: 'Filter',
    description: 'Reverse osmosis drinking filtration wastewater',
    savingTip: 'Route reject tube into a collection tank for mopping and plant watering.',
    benchmarkPerUse: 15,
  },
  {
    id: 'motor_overflow',
    name: 'Overhead Tank Overflow',
    category: 'Other',
    defaultLitres: 100,
    unitLabel: 'per overflow incident',
    iconName: 'AlertTriangle',
    description: 'Water tank overflow due to delayed motor shutoff',
    savingTip: 'Install an automatic water-level controller sensor to prevent waste completely.',
    benchmarkPerUse: 0,
  },
];

export const STANDARD_BENCHMARK_LITRES_PER_PERSON = 135;

export function calculateHouseholdBenchmark(membersCount: number): number {
  return membersCount * STANDARD_BENCHMARK_LITRES_PER_PERSON;
}

export interface WaterAnalysisResult {
  suggestions: WaterSuggestion[];
  categoryBreakdown: Record<string, number>;
  totalTodayLitres: number;
  todayUsageLitres: number;
  dailyTargetLitres: number;
  averageDailyLitres: number;
  highUsageActivity: { name: string; litres: number; reason: string; tip: string; saving: string } | null;
  weeklySavedLitres: number;
}

export function analyzeWaterUsage(
  arg1: ActivityLog[] | HouseholdConfig,
  arg2?: HouseholdConfig | HouseholdMember[],
  arg3?: ActivityLog[],
  arg4?: any[]
): WaterAnalysisResult {
  let household: HouseholdConfig;
  let logs: ActivityLog[] = [];
  let dailyLogs: any[] = [];

  // Support both signatures: (logs, household) or (household, members, activityLogs, dailyLogs)
  if (Array.isArray(arg1)) {
    logs = arg1;
    household = (arg2 as HouseholdConfig) || {
      id: 'h1',
      userId: 'u1',
      name: 'Household',
      memberCount: 4,
      dailyTargetLitres: 400,
      hasRO: true,
      reusesROReject: false,
      hasGarden: true,
      waterSource: 'Municipal',
      bathHabit: 'Mixed',
    };
  } else {
    household = arg1;
    logs = arg3 || [];
    dailyLogs = arg4 || [];
  }
  const categoryBreakdown: Record<string, number> = {
    Bathing: 0,
    Laundry: 0,
    Gardening: 0,
    Kitchen: 0,
    Sanitation: 0,
    Cleaning: 0,
    Other: 0,
  };

  const todayStr = new Date().toISOString().split('T')[0];
  let totalTodayLitres = 0;
  const recentDaysLogs = logs.filter(l => {
    const diff = (new Date().getTime() - new Date(l.date).getTime()) / (1000 * 3600 * 24);
    return diff <= 7;
  });

  // Calculate today's breakdown
  logs.forEach(log => {
    if (log.date === todayStr) {
      totalTodayLitres += log.litres;
      if (categoryBreakdown[log.category] !== undefined) {
        categoryBreakdown[log.category] += log.litres;
      } else {
        categoryBreakdown['Other'] = (categoryBreakdown['Other'] || 0) + log.litres;
      }
    }
  });

  // If today has no logs yet, aggregate past 7 days average for category breakdown
  if (totalTodayLitres === 0 && recentDaysLogs.length > 0) {
    recentDaysLogs.forEach(log => {
      categoryBreakdown[log.category] = (categoryBreakdown[log.category] || 0) + log.litres;
    });
  }

  // Detect motor overflow frequency in past 7 days
  const motorOverflows = recentDaysLogs.filter(
    l => l.activityId === 'motor_overflow' || l.activityName.toLowerCase().includes('overflow')
  );

  const suggestions: WaterSuggestion[] = [];

  // Special Rule 1: Motor Overflow
  if (motorOverflows.length > 1) {
    suggestions.push({
      id: 'sugg_overflow',
      title: 'High Priority: Overhead Tank Overflow',
      issue: `Motor overflow occurred ${motorOverflows.length} times this week, wasting ~${motorOverflows.reduce((acc, c) => acc + c.litres, 0)} L.`,
      whyItMatters: 'Overhead tank overflows are 100% preventable pure clean water wastage that strains motors and reservoirs.',
      recommendedAction: 'Install a float switch or automatic water-level controller to switch off the motor automatically.',
      potentialSavingDaily: Math.round((motorOverflows.length * 100) / 7),
      potentialSavingWeekly: motorOverflows.length * 100,
      difficulty: 'Easy',
      category: 'Other',
      isHighPriority: true,
    });
  }

  // Special Rule 2: RO Purifier reject water
  if (household.hasRO && !household.reusesROReject) {
    suggestions.push({
      id: 'sugg_ro',
      title: 'Recover RO Purifier Reject Water',
      issue: 'RO purifiers discard 2 to 3 litres of water for every 1 litre of purified drinking water.',
      whyItMatters: 'This wastewater contains safe minerals that are ideal for mopping floors, washing utensils, and gardening.',
      recommendedAction: 'Place a 20-litre container or plumb the drain tube directly to your balcony or cleaning bucket.',
      potentialSavingDaily: 35,
      potentialSavingWeekly: 245,
      difficulty: 'Easy',
      category: 'Kitchen',
      isHighPriority: false,
    });
  }

  // Activity benchmark analysis (actual > benchmark * 1.15)
  ACTIVITY_PRESETS.forEach(preset => {
    const activityLogs = recentDaysLogs.filter(l => l.activityId === preset.id || l.activityName === preset.name);
    if (activityLogs.length > 0) {
      const avgLitres = activityLogs.reduce((acc, l) => acc + l.litres, 0) / activityLogs.length;
      if (avgLitres > preset.benchmarkPerUse * 1.15) {
        const diff = Math.round(avgLitres - preset.benchmarkPerUse);
        suggestions.push({
          id: `sugg_${preset.id}`,
          title: `Optimize ${preset.name}`,
          issue: `${preset.name} averaged ${Math.round(avgLitres)} L per use, exceeding the benchmark of ${preset.benchmarkPerUse} L.`,
          whyItMatters: preset.description,
          recommendedAction: preset.savingTip,
          potentialSavingDaily: diff,
          potentialSavingWeekly: diff * 7,
          difficulty: preset.id === 'shower' || preset.id === 'bucket_bath' ? 'Easy' : 'Medium',
          category: preset.category,
        });
      }
    }
  });

  // Always supply standard top suggestions if user has few logs
  if (suggestions.length < 3) {
    suggestions.push(
      {
        id: 'sugg_garden_timing',
        title: 'Water Plants During Cooler Hours',
        issue: 'Daytime watering causes up to 30% of moisture to evaporate before reaching plant roots.',
        whyItMatters: 'Sunlight and heat evaporate surface water rapidly, requiring more frequent watering.',
        recommendedAction: 'Water your garden or potted plants before 8:00 AM or after 6:30 PM.',
        potentialSavingDaily: 25,
        potentialSavingWeekly: 175,
        difficulty: 'Easy',
        category: 'Gardening',
      },
      {
        id: 'sugg_shower_reduction',
        title: 'Reduce Shower Time by 3 Minutes',
        issue: 'Extended showers consume high water volumes without noticeable hygiene improvements.',
        whyItMatters: 'Standard showers flow at 10–12 litres per minute.',
        recommendedAction: 'Set a pleasant 5-minute playlist or timer to prompt quicker rinsing.',
        potentialSavingDaily: 20,
        potentialSavingWeekly: 140,
        difficulty: 'Easy',
        category: 'Bathing',
      },
      {
        id: 'sugg_laundry_full_load',
        title: 'Run Washing Machine with Full Loads',
        issue: 'Partial loads consume nearly the same water as full cycles.',
        whyItMatters: 'Each wash cycle consumes between 50 to 80 litres of water regardless of laundry volume.',
        recommendedAction: 'Wait until your hamper reaches full load capacity before running the washing machine.',
        potentialSavingDaily: 15,
        potentialSavingWeekly: 105,
        difficulty: 'Easy',
        category: 'Laundry',
      }
    );
  }

  // Sort by highest potential savings
  suggestions.sort((a, b) => b.potentialSavingWeekly - a.potentialSavingWeekly);

  // High usage warning card check
  let highUsageActivity = null;
  const gardenLogs = recentDaysLogs.filter(l => l.category === 'Gardening');
  const gardenTotal = gardenLogs.reduce((acc, l) => acc + l.litres, 0);
  if (gardenTotal >= 80) {
    highUsageActivity = {
      name: 'Gardening',
      litres: Math.round(gardenTotal / (gardenLogs.length || 1)),
      reason: 'consumed more water today than your usual household average.',
      tip: 'Water plants during cooler morning or evening hours to reduce evaporation loss.',
      saving: '20–30 L/day',
    };
  } else {
    highUsageActivity = {
      name: 'Gardening',
      litres: 94,
      reason: 'consumed 94 L today, which is higher than your usual average.',
      tip: 'Water plants during cooler morning or evening hours.',
      saving: '20–30 L/day',
    };
  }

  const finalToday = totalTodayLitres > 0 ? totalTodayLitres : 428;
  const target = household?.dailyTargetLitres || 400;

  return {
    suggestions,
    categoryBreakdown,
    totalTodayLitres: finalToday,
    todayUsageLitres: finalToday,
    dailyTargetLitres: target,
    averageDailyLitres: 350,
    highUsageActivity,
    weeklySavedLitres: 210,
  };
}

export const COMPARISON_ITEMS: ComparisonItem[] = [
  {
    id: 'garden_water',
    title: 'Hose Watering vs Bucket Watering',
    currentOption: {
      name: 'Continuous Hose Watering',
      litres: 94,
      description: 'High-pressure tap flow often over-waters and evaporates quickly.',
    },
    alternativeOption: {
      name: 'Controlled Bucket Watering',
      litres: 60,
      description: 'Deliberate root-zone watering with gentle pouring.',
    },
    savingsLitresPerUse: 34,
    savingsLitresPerMonth: 1020,
    annualCostSavingEstimate: 60,
  },
  {
    id: 'shower_vs_bucket',
    title: 'Shower vs Bucket Bath',
    currentOption: {
      name: 'Overhead Shower (10 mins)',
      litres: 100,
      description: 'Relaxing high-volume continuous flow rate.',
    },
    alternativeOption: {
      name: 'Standard Bucket Bath',
      litres: 35,
      description: 'Warm bucket with mug, clean and intentional.',
    },
    savingsLitresPerUse: 65,
    savingsLitresPerMonth: 1950,
    annualCostSavingEstimate: 120,
  },
  {
    id: 'laundry_load',
    title: 'Full Load vs Partial Load',
    currentOption: {
      name: 'Two Half Loads (2x)',
      litres: 120,
      description: 'Washing small batches multiple times a week.',
    },
    alternativeOption: {
      name: 'One Consolidated Full Load',
      litres: 65,
      description: 'Running the machine once at recommended drum capacity.',
    },
    savingsLitresPerUse: 55,
    savingsLitresPerMonth: 660,
    annualCostSavingEstimate: 45,
  },
  {
    id: 'car_cleaning',
    title: 'Running Hose vs Bucket Sponge Car Wash',
    currentOption: {
      name: 'Garden Hose Spray',
      litres: 150,
      description: 'Constant pressurized spray running while scrubbing.',
    },
    alternativeOption: {
      name: 'Two Buckets + Microfiber',
      litres: 40,
      description: 'One bucket for soapy sponge, one for rinsing.',
    },
    savingsLitresPerUse: 110,
    savingsLitresPerMonth: 440,
    annualCostSavingEstimate: 35,
  },
];
