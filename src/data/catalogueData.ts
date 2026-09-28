export interface ToyItem {
  id: string;
  stockCode: string;
  name: string;
  price: string;
  numericPrice: number;
  category: 'robots' | 'vehicles' | 'games' | 'accessories' | 'catalogue' | 'deals';
  badge?: string;
  image: string;
  bgTone: string;
  description: string;
  features: string[];
  batteryReq: string;
  age: string;
}

export const HOT_TOYS: ToyItem[] = [
  {
    id: 'robo-warrior',
    stockCode: 'STK 3157',
    name: 'ROBO WARRIOR',
    price: '£6.49',
    numericPrice: 6.49,
    category: 'robots',
    badge: '£6.49',
    image: '/src/assets/images/toy_robo_warrior_1790607967295.jpg',
    bgTone: 'bg-[#0947ba]',
    description: 'Heavy gauge tinplate defender with motorized clockwork walking action, spark-shooting chest dial and rotating radar head.',
    features: ['Real mechanical clockwork walk', 'Twin laser arm blasters', 'Chrome dial indicator'],
    batteryReq: '2x AA Batteries (not included)',
    age: 'Ages 5 and up',
  },
  {
    id: 'turbo-stinger',
    stockCode: 'STK 2210',
    name: 'TURBO STINGER',
    price: '£4.99',
    numericPrice: 4.99,
    category: 'vehicles',
    badge: '£4.99',
    image: '/src/assets/images/toy_turbo_stinger_1790607980708.jpg',
    bgTone: 'bg-[#dc1f1f]',
    description: 'Ultra aerodynamic sprint racer featuring high-rev pull-back friction motor, rally decals, rubber grip tires and front air dam.',
    features: ['High-torque friction pull-back motor', 'Slick rally decals', 'Impact-resistant polycarbonate shell'],
    batteryReq: 'No batteries required',
    age: 'Ages 4 and up',
  },
  {
    id: 'beat-box',
    stockCode: 'STK 0943',
    name: 'BEAT BOX',
    price: '£2.49',
    numericPrice: 2.49,
    category: 'accessories',
    badge: '£2.49',
    image: '/src/assets/images/toy_beat_box_1790607997948.jpg',
    bgTone: 'bg-[#0947ba]',
    description: 'Micro stereo boombox toy with functioning tape eject door, flashing twin speakers, chrome antenna and dual equalizer sliders.',
    features: ['Flashing rhythm LED indicators', 'Functional mini tape deck hatch', 'Carrying handle'],
    batteryReq: '1x 9V Battery included',
    age: 'Ages 6 and up',
  },
  {
    id: 'power-play-pro',
    stockCode: 'STK 7721',
    name: 'POWER PLAY PRO',
    price: '£5.99',
    numericPrice: 5.99,
    category: 'games',
    badge: '£5.99',
    image: '/src/assets/images/toy_power_play_1790608026993.jpg',
    bgTone: 'bg-[#0947ba]',
    description: 'Classic plug-and-play 8-bit desktop console unit featuring tactile micro-switch joystick, fire buttons and cartridge slot.',
    features: ['Micro-switch responsive joystick', 'Dual fire turbo triggers', 'Chunky retro TV hookup design'],
    batteryReq: '4x AA Batteries (not included)',
    age: 'Ages 7 and up',
  },
  {
    id: 'robo-pup',
    stockCode: 'STK 0842',
    name: 'ROBO PUP',
    price: '£6.99',
    numericPrice: 6.99,
    category: 'robots',
    badge: '£6.99',
    image: '/src/assets/images/toy_robo_pup_1790608010854.jpg',
    bgTone: 'bg-[#0947ba]',
    description: 'Cybernetic hound with motorized walking gait, spring-loaded wagging tail, touch-sensitive nose and glowing red visor eyes.',
    features: ['Barks and wags when petted', 'Motorized 4-paw walking stride', 'Illuminated visor display'],
    batteryReq: '2x C-Cell Batteries (not included)',
    age: 'Ages 4 and up',
  },
  {
    id: 'mega-maze',
    stockCode: 'STK 3310',
    name: 'MEGA MAZE',
    price: '£3.49',
    numericPrice: 3.49,
    category: 'games',
    badge: '£3.49',
    image: '/src/assets/images/toy_mega_maze_1790608039217.jpg',
    bgTone: 'bg-[#0947ba]',
    description: 'Pocket-sized LCD electronic arcade maze game. Navigate treacherous cyber dungeons, dodge laser traps and collect power crystals.',
    features: ['Dual-level LCD display screen', '16 difficulty stages', 'Sound toggle & high score memory'],
    batteryReq: '2x LR44 Button cells included',
    age: 'Ages 6 and up',
  },
];

export const HERO_TOY: ToyItem = {
  id: 'stormhawk-jet',
  stockCode: 'STK 9001',
  name: 'STORMHAWK INTERCEPTOR SH-01',
  price: '£8.99',
  numericPrice: 8.99,
  category: 'vehicles',
  badge: 'NEW ARRIVAL',
  image: '/src/assets/images/nova_stormhawk_jet_1790607950447.jpg',
  bgTone: 'bg-[#0a47b8]',
  description: 'The pinnacle of aerospace defense! Features variable-geometry swing wings, tinted observation cockpit, retractable landing gear and twin proton torpedoes.',
  features: ['Full variable swing-wing mechanism', 'Retractable three-point landing gear', 'Dual missile launcher triggers', 'Original decals included'],
  batteryReq: 'No batteries required',
  age: 'Ages 6 and up',
};

export const COLLECTIONS = [
  {
    id: 'mega-robots',
    title: 'MEGA ROBOTS',
    image: '/src/assets/images/toy_robo_warrior_1790607967295.jpg',
    itemCount: '24 TOYS',
    tag: 'POPULAR',
  },
  {
    id: 'speed-machines',
    title: 'SPEED MACHINES',
    image: '/src/assets/images/toy_turbo_stinger_1790607980708.jpg',
    itemCount: '18 VEHICLES',
    tag: 'TURBO SPEED',
  },
  {
    id: 'retro-games',
    title: 'RETRO GAMES',
    image: '/src/assets/images/toy_power_play_1790608026993.jpg',
    itemCount: '32 ARCADE GEMS',
    tag: '8-BIT CLASSIC',
  },
];
