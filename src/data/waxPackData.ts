export interface DetailedBasketballCard {
  id: string;
  name: string;
  number: string;
  position: string;
  team: string;
  teamShort: string;
  season: string;
  image: string;
  cardStats: {
    ppg: string;
    rpg: string;
    apg: string;
    fgPct: string;
    threePct: string;
    ftPct: string;
  };
  seasonAverages: {
    gp: number;
    min: string;
    pts: string;
    reb: string;
    ast: string;
    stl: string;
    blk: string;
  };
  shooting: {
    fg: string;
    threeP: string;
    ft: string;
  };
  advanced: {
    per: string;
    tsPct: string;
    usgPct: string;
    bpm: string;
  };
}

export const NBA_STAR_CARDS: DetailedBasketballCard[] = [
  {
    id: 'luka-77',
    name: 'LUKA DONČIĆ',
    number: '#77',
    position: 'PG',
    team: 'DALLAS MAVERICKS',
    teamShort: 'MAVS',
    season: '2023-24',
    image: '/src/assets/images/vintage_hoops_card_star_1790618421190.jpg',
    cardStats: {
      ppg: '28.7 PPG',
      rpg: '8.9 RPG',
      apg: '8.1 APG',
      fgPct: '58.3% FG',
      threePct: '38.7% 3P',
      ftPct: '88.2% FT',
    },
    seasonAverages: {
      gp: 70,
      min: '36.8',
      pts: '28.7',
      reb: '8.9',
      ast: '8.1',
      stl: '1.4',
      blk: '0.5',
    },
    shooting: {
      fg: '58.3%',
      threeP: '38.7%',
      ft: '88.2%',
    },
    advanced: {
      per: '28.6',
      tsPct: '63.4%',
      usgPct: '32.8%',
      bpm: '+8.7',
    },
  },
  {
    id: 'curry-30',
    name: 'STEPHEN CURRY',
    number: '#30',
    position: 'PG',
    team: 'GOLDEN STATE WARRIORS',
    teamShort: 'WARRIORS',
    season: '2023-24',
    image: '/src/assets/images/wax_hero_basketball_card_1790616407157.jpg',
    cardStats: {
      ppg: '26.4 PPG',
      rpg: '4.5 RPG',
      apg: '5.1 APG',
      fgPct: '45.0% FG',
      threePct: '40.8% 3P',
      ftPct: '92.3% FT',
    },
    seasonAverages: {
      gp: 74,
      min: '32.7',
      pts: '26.4',
      reb: '4.5',
      ast: '5.1',
      stl: '0.7',
      blk: '0.4',
    },
    shooting: {
      fg: '45.0%',
      threeP: '40.8%',
      ft: '92.3%',
    },
    advanced: {
      per: '22.8',
      tsPct: '62.6%',
      usgPct: '29.5%',
      bpm: '+5.4',
    },
  },
  {
    id: 'jokic-15',
    name: 'NIKOLA JOKIĆ',
    number: '#15',
    position: 'C',
    team: 'DENVER NUGGETS',
    teamShort: 'NUGGETS',
    season: '2023-24',
    image: '/src/assets/images/wax_pull_basketball_player_2_1790616449728.jpg',
    cardStats: {
      ppg: '26.4 PPG',
      rpg: '12.4 RPG',
      apg: '9.0 APG',
      fgPct: '58.3% FG',
      threePct: '35.9% 3P',
      ftPct: '81.7% FT',
    },
    seasonAverages: {
      gp: 79,
      min: '34.6',
      pts: '26.4',
      reb: '12.4',
      ast: '9.0',
      stl: '1.4',
      blk: '0.9',
    },
    shooting: {
      fg: '58.3%',
      threeP: '35.9%',
      ft: '81.7%',
    },
    advanced: {
      per: '31.0',
      tsPct: '65.0%',
      usgPct: '29.8%',
      bpm: '+13.2',
    },
  },
  {
    id: 'giannis-34',
    name: 'GIANNIS ANTETOKOUNMPO',
    number: '#34',
    position: 'PF',
    team: 'MILWAUKEE BUCKS',
    teamShort: 'BUCKS',
    season: '2023-24',
    image: '/src/assets/images/wax_pull_basketball_player_1_1790616436471.jpg',
    cardStats: {
      ppg: '30.4 PPG',
      rpg: '11.5 RPG',
      apg: '6.5 APG',
      fgPct: '61.1% FG',
      threePct: '27.4% 3P',
      ftPct: '65.7% FT',
    },
    seasonAverages: {
      gp: 73,
      min: '35.2',
      pts: '30.4',
      reb: '11.5',
      ast: '6.5',
      stl: '1.2',
      blk: '1.1',
    },
    shooting: {
      fg: '61.1%',
      threeP: '27.4%',
      ft: '65.7%',
    },
    advanced: {
      per: '29.9',
      tsPct: '64.9%',
      usgPct: '33.2%',
      bpm: '+9.0',
    },
  },
];

export interface BasketballCardStat {
  year: number;
  team: string;
  g: number;
  min: number;
  pts: number;
  reb: number;
  ast: number;
  stl: number;
  blk: number;
  fgPct: string;
}

export interface BasketballCardItem {
  id: string;
  cardNumber: string;
  name: string;
  team: string;
  position: string;
  height: string;
  weight: number;
  college: string;
  hometown: string;
  image: string;
  isRookie: boolean;
  frameColor: 'blue' | 'red';
  stats: BasketballCardStat[];
  bio: string;
}

export const HERO_BASKETBALL_CARD: BasketballCardItem = {
  id: 'card-128',
  cardNumber: '#128',
  name: 'LUKA DONČIĆ',
  team: 'DALLAS MAVERICKS',
  position: 'PG',
  height: '6\'7"',
  weight: 230,
  college: 'Real Madrid',
  hometown: 'Ljubljana, Slovenia',
  image: '/src/assets/images/vintage_hoops_card_star_1790618421190.jpg',
  isRookie: false,
  frameColor: 'blue',
  stats: [
    { year: 2020, team: 'DAL', g: 61, min: 33.6, pts: 28.8, reb: 9.4, ast: 8.8, stl: 1.0, blk: 0.2, fgPct: '.463' },
    { year: 2021, team: 'DAL', g: 66, min: 34.3, pts: 27.7, reb: 8.0, ast: 8.6, stl: 1.0, blk: 0.5, fgPct: '.479' },
    { year: 2022, team: 'DAL', g: 65, min: 35.4, pts: 28.4, reb: 9.1, ast: 8.7, stl: 1.2, blk: 0.6, fgPct: '.457' },
    { year: 2023, team: 'DAL', g: 66, min: 36.2, pts: 32.4, reb: 8.6, ast: 8.0, stl: 1.4, blk: 0.5, fgPct: '.496' },
    { year: 2024, team: 'DAL', g: 70, min: 36.8, pts: 33.9, reb: 9.2, ast: 9.8, stl: 1.4, blk: 0.5, fgPct: '.487' },
  ],
  bio: 'A generational maestro who controls the game tempo effortlessly. Elite step-back three-pointer and triple-double threat any given night.',
};

export const LATEST_BASKETBALL_PULLS: BasketballCardItem[] = [
  {
    id: 'card-042',
    cardNumber: '#042',
    name: 'CADE MORGAN',
    team: 'RIVERDALE HOOPS',
    position: 'SG',
    height: '6\'5"',
    weight: 205,
    college: 'Duke',
    hometown: 'Dallas, TX',
    image: '/src/assets/images/wax_pull_basketball_player_1_1790616436471.jpg',
    isRookie: true,
    frameColor: 'red',
    stats: [
      { year: 2023, team: 'RIV', g: 64, min: 26.2, pts: 17.2, reb: 3.8, ast: 3.1, stl: 1.2, blk: 0.3, fgPct: '.468' },
    ],
    bio: 'Sharpshooting two-guard with range beyond the arc. Sunk 42% of corner three-pointers during his standout rookie campaign.',
  },
  {
    id: 'card-073',
    cardNumber: '#073',
    name: 'JORDAN PRICE',
    team: 'RIVERDALE HOOPS',
    position: 'SF',
    height: '6\'7"',
    weight: 220,
    college: 'Kentucky',
    hometown: 'Atlanta, GA',
    image: '/src/assets/images/wax_pull_basketball_player_2_1790616449728.jpg',
    isRookie: true,
    frameColor: 'blue',
    stats: [
      { year: 2023, team: 'RIV', g: 70, min: 29.8, pts: 18.9, reb: 7.2, ast: 4.2, stl: 1.5, blk: 1.1, fgPct: '.510' },
    ],
    bio: 'Two-way athletic wing who can guard 1 through 4. Explosive above the rim finisher in fast-break transition.',
  },
  {
    id: 'card-118',
    cardNumber: '#118',
    name: 'TYLER DONOVAN',
    team: 'RIVERDALE HOOPS',
    position: 'PF',
    height: '6\'9"',
    weight: 240,
    college: 'Gonzaga',
    hometown: 'Seattle, WA',
    image: '/src/assets/images/hoopspulse_shooting_card_1790613865651.jpg',
    isRookie: false,
    frameColor: 'red',
    stats: [
      { year: 2022, team: 'RIV', g: 74, min: 28.5, pts: 15.6, reb: 9.4, ast: 2.8, stl: 0.9, blk: 1.6, fgPct: '.538' },
      { year: 2023, team: 'RIV', g: 68, min: 30.1, pts: 16.8, reb: 10.2, ast: 3.2, stl: 1.1, blk: 1.8, fgPct: '.545' },
    ],
    bio: 'Relentless glass cleaner and rim protector. Commands double-teams on the low block and sets punishing screens.',
  },
  {
    id: 'card-156',
    cardNumber: '#156',
    name: 'ELI MARTINEZ',
    team: 'RIVERDALE HOOPS',
    position: 'PG',
    height: '6\'2"',
    weight: 185,
    college: 'UCLA',
    hometown: 'San Antonio, TX',
    image: '/src/assets/images/hoopspulse_sidebar_player_1790613848113.jpg',
    isRookie: false,
    frameColor: 'blue',
    stats: [
      { year: 2023, team: 'RIV', g: 75, min: 27.4, pts: 14.2, reb: 3.1, ast: 6.9, stl: 1.7, blk: 0.2, fgPct: '.475' },
    ],
    bio: 'Pace-and-space maestro with an ankle-breaking crossover. Ranks in the 90th percentile in pick-and-roll passing accuracy.',
  },
];
