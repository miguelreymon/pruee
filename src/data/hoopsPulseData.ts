export interface GameLog {
  date: string;
  opponent: string;
  min: number;
  pts: number;
  reb: number;
  ast: number;
  eff: number;
}

export interface PlayerProfile {
  id: string;
  name: string;
  number: number;
  position: string;
  team: string;
  league: string;
  age: number;
  height: string;
  weight: string;
  nationality: string;
  flag: string;
  stats: {
    ppg: number;
    ppgDiff: string;
    apg: number;
    apgDiff: string;
    rpg: number;
    rpgDiff: string;
    per: number;
    perDiff: string;
    mpg: number;
    mpgDiff: string;
  };
  shootingStats: {
    fg: string;
    twoPt: string;
    threePt: string;
    ft: string;
    totalShotsPerGame: number;
    twoPtDist: number;
    threePtDist: number;
    ftDist: number;
  };
  gameLogs: GameLog[];
  insights: {
    icon: string;
    title: string;
    desc: string;
  }[];
}

export const LUCAS_MARTIN: PlayerProfile = {
  id: 'lucas-martin',
  name: 'LUCAS MARTÍN',
  number: 23,
  position: 'POINT GUARD',
  team: 'CB VILANOVA',
  league: 'LIGA EBA',
  age: 21,
  height: '1.88 m',
  weight: '82 kg',
  nationality: 'Spain',
  flag: '🇪🇸',
  stats: {
    ppg: 18.4,
    ppgDiff: '+12%',
    apg: 5.2,
    apgDiff: '+8%',
    rpg: 4.7,
    rpgDiff: '+10%',
    per: 18.6,
    perDiff: '+11%',
    mpg: 32.4,
    mpgDiff: '+6%',
  },
  shootingStats: {
    fg: '56.4%',
    twoPt: '61.2%',
    threePt: '48.7%',
    ft: '82.6%',
    totalShotsPerGame: 12.6,
    twoPtDist: 52,
    threePtDist: 38,
    ftDist: 10,
  },
  gameLogs: [
    { date: 'Sep 28', opponent: 'vs. CB Santfeliuenc', min: 34, pts: 22, reb: 5, ast: 7, eff: 28 },
    { date: 'Sep 25', opponent: '@ Basket Girona B', min: 31, pts: 17, reb: 4, ast: 5, eff: 21 },
    { date: 'Sep 21', opponent: 'vs. AE Badalona', min: 33, pts: 16, reb: 6, ast: 4, eff: 20 },
    { date: 'Sep 18', opponent: '@ CB Prat', min: 29, pts: 14, reb: 3, ast: 6, eff: 17 },
    { date: 'Sep 14', opponent: 'vs. JAC Sants', min: 36, pts: 20, reb: 7, ast: 5, eff: 26 },
  ],
  insights: [
    {
      icon: 'target',
      title: 'Most effective from mid-range',
      desc: '62% FG from 10-16ft (league avg: 48%).',
    },
    {
      icon: 'users',
      title: 'High assist rate',
      desc: '5.2 APG (league avg: 3.1).',
    },
    {
      icon: 'trending',
      title: 'Improving 3PT%',
      desc: '48.7% (up from 36% last season).',
    },
    {
      icon: 'home',
      title: 'Strong performance at home',
      desc: '+4.2 PPG vs. away games.',
    },
  ],
};

export const TEAM_COMPARISONS = [
  { team: 'Lakers', off: 118.4, def: 102.3, net: '+16.1' },
  { team: 'Celtics', off: 116.8, def: 100.7, net: '+16.1' },
  { team: 'Warriors', off: 113.2, def: 104.9, net: '+8.3' },
  { team: 'Bulls', off: 110.5, def: 107.8, net: '+2.7' },
];

export const SHOT_CHART_POINTS = [
  { x: 38, y: 35, made: true },
  { x: 45, y: 28, made: true },
  { x: 52, y: 32, made: false },
  { x: 48, y: 44, made: true },
  { x: 34, y: 55, made: true },
  { x: 62, y: 40, made: false },
  { x: 26, y: 68, made: true },
  { x: 74, y: 65, made: false },
  { x: 18, y: 30, made: false },
  { x: 82, y: 32, made: true },
  { x: 50, y: 60, made: true },
  { x: 42, y: 72, made: false },
  { x: 58, y: 70, made: true },
  { x: 49, y: 20, made: true },
  { x: 22, y: 75, made: false },
  { x: 78, y: 78, made: false },
  { x: 50, y: 82, made: true },
];
