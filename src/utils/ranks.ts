export interface HumanityBadge {
  rank: string;
  color: string;
  bg: string;
  border: string;
  tier: string;
}

export function getHumanityRank(level: number): HumanityBadge {
  if (level <= 10) {
    return {
      rank: 'Silicon Mimic',
      color: 'text-slate-700',
      bg: 'bg-slate-100',
      border: 'border-slate-300',
      tier: 'Tier 1 / 10',
    };
  }
  if (level <= 20) {
    return {
      rank: 'Carbon-Curious',
      color: 'text-indigo-700',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      tier: 'Tier 2 / 10',
    };
  }
  if (level <= 35) {
    return {
      rank: 'Human-ish',
      color: 'text-sky-700',
      bg: 'bg-sky-50',
      border: 'border-sky-200',
      tier: 'Tier 3 / 10',
    };
  }
  if (level <= 50) {
    return {
      rank: 'Semi-Organic',
      color: 'text-teal-700',
      bg: 'bg-teal-50',
      border: 'border-teal-200',
      tier: 'Tier 4 / 10',
    };
  }
  if (level <= 65) {
    return {
      rank: 'Organic',
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      tier: 'Tier 5 / 10',
    };
  }
  if (level <= 80) {
    return {
      rank: 'Certified Biological',
      color: 'text-amber-800',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      tier: 'Tier 6 / 10',
    };
  }
  if (level <= 95) {
    return {
      rank: 'Peak Mortal',
      color: 'text-orange-800',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      tier: 'Tier 7 / 10',
    };
  }
  if (level < 100) {
    return {
      rank: 'Ascending Human',
      color: 'text-purple-800',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      tier: 'Tier 8 / 10',
    };
  }
  return {
    rank: 'Transcendent Human',
    color: 'text-rose-700',
    bg: 'bg-rose-50',
    border: 'border-rose-300',
    tier: 'Tier 10 / 10 (Max)',
  };
}
