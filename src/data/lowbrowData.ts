export interface LowbrowItem {
  id: string;
  badge: string;
  badgeTone: string;
  title: string;
  subtitle: string;
  image: string;
  price?: string;
  type: 'apparel' | 'idols' | 'journal' | 'shows';
  description: string;
}

export const LOWBROW_ITEMS: LowbrowItem[] = [
  {
    id: 'oil-slick',
    badge: 'NEW DROP',
    badgeTone: 'text-[#14b8a6]',
    title: 'OIL SLICK COLLECTION',
    subtitle: 'CANDY PAINT TEES AND ACCESSORIES',
    image: '/src/assets/images/lowbrow_oil_slick_tee_1790609226263.jpg',
    price: '$38.00',
    type: 'apparel',
    description: 'Heavyweight 240gsm washed vintage cotton tee. High-density puff screenprint of the sacred tiki engine totem with lightning flare accents.',
  },
  {
    id: 'misfire-idol',
    badge: 'TOP SELLER',
    badgeTone: 'text-[#f59e0b]',
    title: 'MISFIRE IDOL',
    subtitle: 'LIMITED TO 666 PIECES',
    image: '/src/assets/images/lowbrow_misfire_idol_1790609239053.jpg',
    price: '$120.00',
    type: 'idols',
    description: 'Cold-cast porcelain resin idol finished in weathered scorched timber and wrapped in sculpted hot rod cartoon exhaust flames. Hand-numbered bottom seal.',
  },
  {
    id: 'night-run',
    badge: 'FROM THE JOURNAL',
    badgeTone: 'text-[#a855f7]',
    title: 'NIGHT RUN AT BLACK LAGOON',
    subtitle: 'PHOTOS. RECAP. RESULTS.',
    image: '/src/assets/images/lowbrow_night_run_1790609250106.jpg',
    type: 'journal',
    description: 'Midnight drag sprints across the dry salt flat basin. 42 chopped gassers, nitrous flatheads and sparks against the desert sky.',
  },
  {
    id: 'fumes-fortunes',
    badge: 'UPCOMING SHOW',
    badgeTone: 'text-[#ef4444]',
    title: 'FUMES & FORTUNES',
    subtitle: 'JUNE 14–15 · RATON, CA',
    image: '/src/assets/images/lowbrow_flying_eyeball_1790609272297.jpg',
    price: '$45.00',
    type: 'shows',
    description: 'The premier lowbrow car show and custom tiki symposium. Two days of burnouts, live pinstriping, psychobilly bands and nocturnal mayhem.',
  },
];
