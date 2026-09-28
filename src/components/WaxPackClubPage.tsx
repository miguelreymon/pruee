import React, { useState } from 'react';
import { 
  BarChart3,
  PieChart,
  Users,
  Trophy,
  Search,
  ChevronDown,
  Download,
  Calendar, 
  CheckCircle2, 
  Star, 
  ChevronRight, 
  Sparkles, 
  X, 
  ArrowRight,
  Flame,
  Shield,
  Clock
} from 'lucide-react';
import { 
  NBA_STAR_CARDS,
  DetailedBasketballCard
} from '../data/waxPackData';
import { playRetroSound } from '../utils/audio';

interface WaxPackClubPageProps {
  onShowToast: (msg: string) => void;
  onSwitchTheme?: (theme: string) => void;
}

export const WaxPackClubPage: React.FC<WaxPackClubPageProps> = ({
  onShowToast,
}) => {
  const [selectedCard, setSelectedCard] = useState<DetailedBasketballCard | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
  const [isRipPackOpen, setIsRipPackOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [stackCardIndex, setStackCardIndex] = useState(0);
  const [selectedTimeRange, setSelectedTimeRange] = useState('Last 7 days');

  const currentNbaCard = NBA_STAR_CARDS[stackCardIndex % NBA_STAR_CARDS.length];

  const handleNextNbaCard = () => {
    playRetroSound('card');
    const nextIdx = (stackCardIndex + 1) % NBA_STAR_CARDS.length;
    setStackCardIndex(nextIdx);
    const card = NBA_STAR_CARDS[nextIdx];
    onShowToast(`Switched to ${card.name} (${card.number} · ${card.teamShort})!`);
  };

  const handleRipPack = () => {
    playRetroSound('rip');
    onShowToast('Wax pack unwrapped! Added 9 basketball cards to your analytics collection.');
  };

  return (
    <div className="min-h-screen bg-[#ede7dc] text-[#0e3a73] select-none font-sans pb-8 relative">
      {/* Macro Unbleached Paper Pulp Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-25 texture-paper-pulp z-0" />

      {/* 1. TOP HEADER BAR (EXACT MATCH TO SCREENSHOT) */}
      <header className="relative z-10 border-b-[1.5px] border-[#c02328] bg-[#ede7dc] px-4 sm:px-8 py-2.5 select-none shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        {/* Same paper pulp texture integrated directly in the header */}
        <div className="absolute inset-0 pointer-events-none opacity-25 texture-paper-pulp z-0" />

        <div className="relative z-10 max-w-[1560px] mx-auto flex flex-wrap items-center justify-between gap-4">
          
          {/* Left Brand: HOOPDATA Shield Logo & Typography */}
          <div 
            onClick={() => {
              playRetroSound('burst');
              onShowToast('HOOPDATA ANALYTICS: Real Basketball Data Engine');
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Fine-line Blue Shield with Basketball Outline */}
            <div className="relative w-10 h-11 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 44 48" className="w-full h-full text-[#0e3a73]" fill="none" stroke="currentColor">
                <path 
                  d="M22 3 L39 8.5 V23 C39 34.5 22 45 22 45 C22 45 5 34.5 5 23 V8.5 Z" 
                  strokeWidth="2.6" 
                  strokeLinejoin="round" 
                  strokeLinecap="round"
                />
                <circle cx="22" cy="22" r="11" strokeWidth="2.2" />
                <line x1="11" y1="22" x2="33" y2="22" strokeWidth="1.8" />
                <line x1="22" y1="11" x2="22" y2="33" strokeWidth="1.8" />
                <path d="M15 13.5 C19 17.5 19 26.5 15 30.5" strokeWidth="1.6" />
                <path d="M29 13.5 C25 17.5 25 26.5 29 30.5" strokeWidth="1.6" />
              </svg>
            </div>

            {/* Typography: HOOPDATA / ★ ANALYTICS ★ */}
            <div className="leading-none">
              <span className="font-slab text-2xl sm:text-[27px] text-[#0e3a73] tracking-wide uppercase block font-black">
                HOOPDATA
              </span>
              <span className="font-condensed text-[11px] text-[#0e3a73] font-bold tracking-[0.28em] uppercase block mt-0.5">
                ★ ANALYTICS ★
              </span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-10 text-[15px] sm:text-[16px] font-condensed tracking-wider text-[#0e3a73]">
            <button
              onClick={() => {
                playRetroSound('click');
                onShowToast('How It Works: Real-time telemetry, shot charts and advanced basketball cards.');
              }}
              className="hover:text-[#c02328] transition-colors cursor-pointer font-bold uppercase tracking-wide"
            >
              HOW IT WORKS
            </button>
            <button
              onClick={() => {
                playRetroSound('click');
                setIsChecklistModalOpen(true);
              }}
              className="hover:text-[#c02328] transition-colors cursor-pointer font-bold uppercase tracking-wide"
            >
              FEATURES
            </button>
            <button
              onClick={() => {
                playRetroSound('click');
                setIsJoinModalOpen(true);
              }}
              className="hover:text-[#c02328] transition-colors cursor-pointer font-bold uppercase tracking-wide"
            >
              PRICING
            </button>
            <button
              onClick={() => {
                playRetroSound('click');
                onShowToast('Blog: Inside the 2026 NBA Advanced Analytics Rankings');
              }}
              className="hover:text-[#c02328] transition-colors cursor-pointer font-bold uppercase tracking-wide"
            >
              BLOG
            </button>
            <button
              onClick={() => {
                playRetroSound('click');
                onShowToast('Store: HoopData vintage card series & collectors binders.');
              }}
              className="hover:text-[#c02328] transition-colors cursor-pointer font-bold uppercase tracking-wide"
            >
              STORE
            </button>
          </nav>

          {/* Right Action: START ANALYZING & SIGN IN */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                playRetroSound('burst');
                setIsJoinModalOpen(true);
              }}
              className="comic-interactive-card relative bg-[#0c356a] hover:bg-[#124b94] text-white font-condensed font-bold text-[14px] sm:text-[15px] tracking-wider uppercase px-5 py-1.5 rounded-[5px] border-[1.5px] border-white shadow-[0_0_0_1.5px_#0c356a] cursor-pointer"
            >
              START ANALYZING
            </button>

            <button
              onClick={() => {
                playRetroSound('click');
                onShowToast('Sign in to your HoopData Analytics account.');
              }}
              className="font-condensed text-[15px] sm:text-[16px] font-bold text-[#0e3a73] hover:text-[#c02328] uppercase tracking-wider cursor-pointer"
            >
              SIGN IN
            </button>
          </div>

        </div>
      </header>

      {/* 2. HERO SHOWCASE SECTION (MATCHING EXACT PROPORTIONS & SCALE) */}
      <section className="relative z-10 max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center">
          
          {/* LEFT COLUMN: Monumental Typography & Value Props */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center">
            
            {/* Monumental 3-Line Letterpress Headline */}
            <h1 className="font-slab text-5xl sm:text-6xl lg:text-7xl xl:text-[82px] text-[#0b3260] leading-[0.92] uppercase tracking-normal select-text">
              REAL DATA.<br />
              BETTER<br />
              DECISIONS.
            </h1>

            {/* Red Star Tagline */}
            <div className="mt-4 flex items-center gap-2 text-xs sm:text-[15px] font-condensed font-bold tracking-wider text-[#0b3260] uppercase select-text">
              <span className="text-[#c02328] text-base sm:text-lg">★</span>
              <span>ADVANCED BASKETBALL ANALYTICS. BUILT FOR FANS, COACHES AND PLAYERS.</span>
              <span className="text-[#c02328] text-base sm:text-lg">★</span>
            </div>

            {/* Paragraph Description (Typewriter / Mono Style) */}
            <p className="mt-3.5 text-xs sm:text-[14.5px] text-slate-800 font-mono-code font-medium max-w-xl leading-relaxed select-text">
              Turn game data into real insights. Analyze players, teams and matches with detailed stats, advanced metrics and beautiful visualizations. Because basketball is more than what you see.
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-5 flex flex-wrap items-center gap-5">
              <button
                onClick={() => {
                  playRetroSound('burst');
                  setIsJoinModalOpen(true);
                }}
                className="comic-interactive-card relative bg-[#0c3975] hover:bg-[#124b94] text-white font-condensed font-bold text-base sm:text-lg tracking-wider uppercase px-6 py-2.5 rounded-[6px] border-2 border-white shadow-[0_0_0_2px_#0c3975] cursor-pointer"
              >
                EXPLORE THE PLATFORM
              </button>

              <button
                onClick={() => {
                  playRetroSound('click');
                  setIsChecklistModalOpen(true);
                }}
                className="font-condensed font-bold text-base sm:text-lg text-[#0b3260] hover:text-[#c02328] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors group"
              >
                <span className="underline underline-offset-4">SEE A SAMPLE REPORT</span>
                <span className="text-[#c02328] font-black text-xl group-hover:translate-x-1 transition-transform">&gt;</span>
              </button>
            </div>

            {/* 4 Horizontal Feature Badges Under Left Hero */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-7 border-t border-[#0b3260]/15 pt-3.5">
              {/* Badge 1: DETAILED STATS */}
              <div 
                onClick={() => onShowToast('Detailed Stats: Real-time telemetry & player tracking active.')}
                className="flex items-center gap-2 p-1.5 rounded-xs hover:bg-[#0b3260]/5 cursor-pointer transition-colors"
              >
                <div className="w-8 h-8 rounded-xs bg-[#0b3260] text-white flex items-center justify-center shrink-0">
                  <BarChart3 size={16} strokeWidth={2.5} />
                </div>
                <div className="leading-tight">
                  <span className="font-condensed font-bold text-[12px] text-[#0b3260] uppercase block">
                    DETAILED STATS
                  </span>
                  <span className="text-[10px] text-slate-600 block leading-tight">
                    Advanced metrics & player tracking
                  </span>
                </div>
              </div>

              {/* Badge 2: INTERACTIVE GRAPHS */}
              <div 
                onClick={() => onShowToast('Interactive Graphs: High-res shot charts & shot visualizers ready.')}
                className="flex items-center gap-2 p-1.5 rounded-xs hover:bg-[#0b3260]/5 cursor-pointer transition-colors"
              >
                <div className="w-8 h-8 rounded-xs bg-[#0b3260] text-white flex items-center justify-center shrink-0">
                  <PieChart size={16} strokeWidth={2.5} />
                </div>
                <div className="leading-tight">
                  <span className="font-condensed font-bold text-[12px] text-[#0b3260] uppercase block">
                    INTERACTIVE GRAPHS
                  </span>
                  <span className="text-[10px] text-slate-600 block leading-tight">
                    Visualize data like never before
                  </span>
                </div>
              </div>

              {/* Badge 3: PLAYER COMPARISONS */}
              <div 
                onClick={() => onShowToast('Player Comparisons: Head-to-head metric comparison loaded.')}
                className="flex items-center gap-2 p-1.5 rounded-xs hover:bg-[#0b3260]/5 cursor-pointer transition-colors"
              >
                <div className="w-8 h-8 rounded-xs bg-[#0b3260] text-white flex items-center justify-center shrink-0">
                  <Search size={16} strokeWidth={2.5} />
                </div>
                <div className="leading-tight">
                  <span className="font-condensed font-bold text-[12px] text-[#0b3260] uppercase block">
                    PLAYER COMPARISONS
                  </span>
                  <span className="text-[10px] text-slate-600 block leading-tight">
                    Find the edge with real numbers
                  </span>
                </div>
              </div>

              {/* Badge 4: TEAM ANALYSIS */}
              <div 
                onClick={() => onShowToast('Team Analysis: Lineup efficiency & net ratings online.')}
                className="flex items-center gap-2 p-1.5 rounded-xs hover:bg-[#0b3260]/5 cursor-pointer transition-colors"
              >
                <div className="w-8 h-8 rounded-xs bg-[#0b3260] text-white flex items-center justify-center shrink-0">
                  <Trophy size={16} strokeWidth={2.5} />
                </div>
                <div className="leading-tight">
                  <span className="font-condensed font-bold text-[12px] text-[#0b3260] uppercase block">
                    TEAM ANALYSIS
                  </span>
                  <span className="text-[10px] text-slate-600 block leading-tight">
                    From lineups to advanced ratings
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Massive Realistic Cards Composite matching screenshot scale */}
          <div className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center lg:justify-end select-none py-2">
            
            {/* The Unified Large Card Section */}
            <div 
              onClick={handleNextNbaCard}
              title="Click anywhere on the cards to cycle NBA players!"
              className="comic-interactive-card relative w-full max-w-[690px] xl:max-w-[740px] h-[460px] sm:h-[490px] lg:h-[515px] cursor-pointer group"
            >
              
              {/* 1. TOP RIGHT: Torn Vintage Red Crinkly NBA Wax Pack Wrapper */}
              <div className="absolute right-0 -top-2 w-[38%] aspect-[3/4] rounded-xs overflow-hidden shadow-2xl border-2 border-red-950/40 transform rotate-[11deg] z-10 pointer-events-none group-hover:rotate-[9deg] transition-transform duration-200">
                <img
                  src="/src/assets/images/nba_red_wax_wrapper_1790618402765.jpg"
                  alt="NBA Wax Pack Wrapper"
                  className="w-full h-full object-cover filter contrast-110"
                />
                <div className="absolute inset-0 bg-red-900/10" />

                {/* Stamped NBA Stencil Header */}
                <div className="absolute top-2 right-3 font-slab text-4xl sm:text-5xl text-white font-black tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                  NBA
                </div>

                {/* Red handwritten cursive slogan */}
                <div className="absolute top-16 right-3 text-right leading-tight font-serif italic text-white/95 text-[11px] sm:text-xs font-bold drop-shadow">
                  REAL STATS.<br />
                  REAL INSIGHTS.<br />
                  REAL HOOPS.
                </div>

                {/* Chalkboard Playbook Diagram */}
                <div className="absolute bottom-3 right-3 w-24 h-24 opacity-85">
                  <svg viewBox="0 0 100 100" className="w-full h-full stroke-white fill-none stroke-[2.5] stroke-linecap-round">
                    <path d="M 20 85 Q 50 50 80 30" strokeDasharray="4 4" />
                    <polyline points="72,25 80,30 82,38" fill="white" />
                    <path d="M 30 20 Q 55 45 40 75" />
                    <polyline points="33,70 40,75 48,72" fill="white" />
                    <line x1="20" y1="45" x2="32" y2="57" strokeWidth="3" />
                    <line x1="32" y1="45" x2="20" y2="57" strokeWidth="3" />
                    <circle cx="70" cy="65" r="7" strokeWidth="2.5" />
                  </svg>
                </div>
              </div>

              {/* 2. CENTER-RIGHT: TILTED VINTAGE CARDBOARD CARD BACK */}
              <div className="absolute right-[4%] top-[2.5%] w-[49%] aspect-[2.45/3.5] rounded-[6px] card-back-chipboard border-2 border-[#80735e] p-2.5 sm:p-3 shadow-2xl transform rotate-[2.8deg] z-20 transition-all duration-200 group-hover:rotate-[1.5deg] flex flex-col justify-between">
                
                {/* Top Card Back Bar: SEASON AVERAGES & 2023-24 */}
                <div className="bg-[#0c3975] text-white px-2.5 py-1 rounded-[3px] flex items-center justify-between font-condensed uppercase tracking-wider text-xs font-bold border-b border-white/20">
                  <span className="font-slab text-[12px] tracking-wide">SEASON AVERAGES</span>
                  <span className="font-mono-code text-[11px] text-yellow-300">{currentNbaCard.season}</span>
                </div>

                {/* Table 1: GP | MIN | PTS | REB | AST | STL | BLK */}
                <div className="my-1.5 overflow-hidden border border-black/15 bg-white/40 rounded-[3px]">
                  <table className="w-full text-center text-[9.5px] font-mono-code font-bold border-collapse">
                    <thead>
                      <tr className="bg-[#0c3975]/10 text-[#0c3975] border-b border-black/20">
                        <th className="py-0.5">GP</th>
                        <th>MIN</th>
                        <th>PTS</th>
                        <th>REB</th>
                        <th>AST</th>
                        <th>STL</th>
                        <th>BLK</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-900">
                      <tr className="divide-x divide-black/10">
                        <td className="py-0.5">{currentNbaCard.seasonAverages.gp}</td>
                        <td>{currentNbaCard.seasonAverages.min}</td>
                        <td className="font-black text-[#0c3975]">{currentNbaCard.seasonAverages.pts}</td>
                        <td>{currentNbaCard.seasonAverages.reb}</td>
                        <td>{currentNbaCard.seasonAverages.ast}</td>
                        <td>{currentNbaCard.seasonAverages.stl}</td>
                        <td>{currentNbaCard.seasonAverages.blk}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Section 2: SHOOTING PERCENTAGE */}
                <div className="my-1">
                  <div className="text-[10px] font-condensed font-bold text-[#0c3975] tracking-wider uppercase border-b border-black/20 pb-0.5 mb-1">
                    SHOOTING PERCENTAGE
                  </div>
                  <div className="grid grid-cols-3 text-center border border-black/15 bg-white/40 rounded-[3px] divide-x divide-black/10 text-[9.5px] font-mono-code">
                    <div className="py-1">
                      <div className="text-[8px] text-slate-500 font-bold uppercase">FG</div>
                      <div className="font-black text-[#0c3975]">{currentNbaCard.shooting.fg}</div>
                    </div>
                    <div className="py-1">
                      <div className="text-[8px] text-slate-500 font-bold uppercase">3P</div>
                      <div className="font-black text-[#0c3975]">{currentNbaCard.shooting.threeP}</div>
                    </div>
                    <div className="py-1">
                      <div className="text-[8px] text-slate-500 font-bold uppercase">FT</div>
                      <div className="font-black text-[#0c3975]">{currentNbaCard.shooting.ft}</div>
                    </div>
                  </div>
                </div>

                {/* Section 3: ADVANCED METRICS */}
                <div className="my-1">
                  <div className="text-[10px] font-condensed font-bold text-[#0c3975] tracking-wider uppercase border-b border-black/20 pb-0.5 mb-1">
                    ADVANCED METRICS
                  </div>
                  <div className="grid grid-cols-4 text-center border border-black/15 bg-white/40 rounded-[3px] divide-x divide-black/10 text-[9.5px] font-mono-code">
                    <div className="py-1">
                      <div className="text-[8px] text-slate-500 font-bold uppercase">PER</div>
                      <div className="font-black text-[#0c3975]">{currentNbaCard.advanced.per}</div>
                    </div>
                    <div className="py-1">
                      <div className="text-[8px] text-slate-500 font-bold uppercase">TS%</div>
                      <div className="font-black text-[#0c3975]">{currentNbaCard.advanced.tsPct}</div>
                    </div>
                    <div className="py-1">
                      <div className="text-[8px] text-slate-500 font-bold uppercase">USG%</div>
                      <div className="font-black text-[#0c3975]">{currentNbaCard.advanced.usgPct}</div>
                    </div>
                    <div className="py-1">
                      <div className="text-[8px] text-slate-500 font-bold uppercase">BPM</div>
                      <div className="font-black text-[#b91c1c]">{currentNbaCard.advanced.bpm}</div>
                    </div>
                  </div>
                </div>

                {/* Bottom Watermark: HOOPDATA ANALYTICS LOGO */}
                <div className="mt-auto pt-2 border-t border-black/20 flex items-center justify-center gap-2">
                  <div className="w-5 h-5 text-[#0c3975]">
                    <svg viewBox="0 0 44 48" className="w-full h-full" fill="none" stroke="currentColor">
                      <path d="M22 3 L39 8.5 V23 C39 34.5 22 45 22 45 C22 45 5 34.5 5 23 V8.5 Z" strokeWidth="2.8" />
                      <circle cx="22" cy="22" r="11" strokeWidth="2.4" />
                      <line x1="11" y1="22" x2="33" y2="22" strokeWidth="2" />
                      <line x1="22" y1="11" x2="22" y2="33" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="leading-tight text-center">
                    <span className="font-slab text-xs text-[#0c3975] font-black uppercase tracking-wider block">
                      HOOPDATA
                    </span>
                    <span className="font-condensed text-[8px] text-[#0c3975] font-bold tracking-[0.2em] uppercase block">
                      ★ ANALYTICS ★
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. CENTER-LEFT: THE THICK VINTAGE CARD STACK WITH LUKA DONČIĆ ON TOP */}
              <div className="absolute left-0 top-0 w-[49%] aspect-[2.5/3.5] rounded-[6px] card-stack-depth bg-[#ede5d6] border-2 border-black p-2 sm:p-2.5 z-30 transition-all duration-200 transform group-hover:-translate-y-1.5 group-hover:rotate-[-1deg]">
                {/* Outer Cardboard Border & Inner Royal Blue Frame */}
                <div className="w-full h-full rounded-[4px] bg-[#0c4383] border-2 border-white p-2 flex flex-col justify-between relative shadow-inner overflow-hidden">
                  
                  {/* Top Player Name & Jersey Number */}
                  <div className="flex items-start justify-between border-b border-white/40 pb-1 px-1">
                    <div>
                      <h3 className="font-slab text-base sm:text-lg lg:text-xl text-white tracking-tight leading-none uppercase drop-shadow">
                        {currentNbaCard.name}
                      </h3>
                      {/* Position Label PG right below the name */}
                      <span className="font-slab text-xs sm:text-sm font-bold text-white uppercase block mt-0.5 drop-shadow">
                        {currentNbaCard.position}
                      </span>
                    </div>

                    {/* Jersey Number */}
                    <div className="font-slab text-base sm:text-lg lg:text-xl text-white font-black tracking-tight drop-shadow">
                      {currentNbaCard.number}
                    </div>
                  </div>

                  {/* Player Photo with Lithograph Grain & Team Logo in corner */}
                  <div className="relative flex-1 my-1 rounded-[3px] overflow-hidden border border-white/60 bg-[#082346] flex items-center justify-center">
                    <img
                      src={currentNbaCard.image}
                      alt={currentNbaCard.name}
                      className="w-full h-full object-cover filter contrast-110"
                    />

                    {/* Team Circular Insignia (Bottom-Right corner of photo) */}
                    <div className="absolute bottom-1 right-1 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0c3975] border-2 border-white flex items-center justify-center shadow-lg p-0.5">
                      <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center text-white font-slab text-[8px] sm:text-[9px] font-black uppercase text-center leading-none">
                        {currentNbaCard.teamShort}
                      </div>
                    </div>
                  </div>

                  {/* Bottom 2x3 Stat Grid with Fine White Hairline Dividers */}
                  <div className="border border-white/70 rounded-[3px] overflow-hidden bg-black/25 backdrop-blur-[1px]">
                    {/* Row 1: PPG | RPG | APG */}
                    <div className="grid grid-cols-3 text-center text-white font-condensed font-bold text-[11px] sm:text-xs divide-x divide-white/40 border-b border-white/40 py-1">
                      <span>{currentNbaCard.cardStats.ppg}</span>
                      <span>{currentNbaCard.cardStats.rpg}</span>
                      <span>{currentNbaCard.cardStats.apg}</span>
                    </div>
                    {/* Row 2: FG% | 3P% | FT% */}
                    <div className="grid grid-cols-3 text-center text-white font-condensed font-bold text-[11px] sm:text-xs divide-x divide-white/40 py-1 bg-white/5">
                      <span>{currentNbaCard.cardStats.fgPct}</span>
                      <span>{currentNbaCard.cardStats.threePct}</span>
                      <span>{currentNbaCard.cardStats.ftPct}</span>
                    </div>
                  </div>

                </div>

                {/* Stack Draw Indicator Hint */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#0c3975] text-white text-[9px] font-condensed font-bold uppercase px-3 py-0.5 rounded-full shadow border border-white whitespace-nowrap">
                  CLICK TO CYCLE NBA CARDS 🎴
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. BOTTOM THREE GRID PANELS (EXACT MATCH TO SCREENSHOT) */}
      <section className="relative z-10 max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          
          {/* PANEL 1: FEATURED ANALYSIS (Red Header: Dončić vs Jokić) */}
          <div className="comic-interactive-card lg:col-span-3 bg-[#faf7f0] border-2 border-[#113568]/30 rounded-xs shadow-[3px_3px_0_rgba(17,53,104,0.15)] flex flex-col justify-between overflow-hidden">
            {/* Red Header Bar */}
            <div className="bg-[#b91c1c] text-white font-condensed font-bold text-xs uppercase tracking-wider px-3 py-1.5 border-b-2 border-black/20 flex items-center gap-1.5">
              <Flame size={14} className="text-yellow-300" />
              <span>FEATURED ANALYSIS</span>
            </div>

            <div className="p-3.5 flex flex-col justify-between flex-1">
              <div>
                <h3 className="font-slab text-lg text-[#0c3975] uppercase leading-tight">
                  NBA PLAYER COMPARISON
                </h3>
                <span className="font-condensed font-bold text-xs text-[#b91c1c] uppercase tracking-wider block mt-0.5">
                  DONČIĆ VS. JOKIĆ
                </span>

                <p className="mt-2 text-[11px] text-slate-700 leading-snug font-medium font-mono-code">
                  Two MVPs. Two different styles. A full breakdown of their stats, impact and efficiency.
                </p>

                {/* Visual Head-to-Head Box */}
                <div className="mt-3 flex items-center justify-center gap-2 bg-[#ede7dc] p-2 rounded border border-black/15">
                  {/* Luka Dončić */}
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-xs overflow-hidden border-2 border-[#0c3975] mx-auto shadow-xs">
                      <img src="/src/assets/images/vintage_hoops_card_star_1790618421190.jpg" alt="Dončić" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-condensed font-bold text-[10px] text-[#0c3975] block mt-1 uppercase">DONČIĆ</span>
                  </div>

                  {/* VS Badge */}
                  <div className="w-7 h-7 rounded-full bg-[#0c3975] text-white font-slab text-[10px] flex items-center justify-center border-2 border-white shadow">
                    VS
                  </div>

                  {/* Nikola Jokić */}
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-xs overflow-hidden border-2 border-[#b91c1c] mx-auto shadow-xs">
                      <img src="/src/assets/images/wax_pull_basketball_player_2_1790616449728.jpg" alt="Jokić" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-condensed font-bold text-[10px] text-[#b91c1c] block mt-1 uppercase">JOKIĆ</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  playRetroSound('click');
                  onShowToast('Loading Dončić vs Jokić Advanced Analytics Dashboard...');
                }}
                className="mt-3 w-full btn-retro-white py-1.5 px-3 text-xs font-condensed font-bold uppercase tracking-wider text-center border border-[#0c3975] cursor-pointer hover:bg-yellow-50 shadow-[1px_1px_0_#0c3975]"
              >
                VIEW COMPARISON
              </button>
            </div>
          </div>

          {/* PANEL 2: TOP PLAYERS THIS SEASON (Blue Header: 5 NBA Cards) */}
          <div className="comic-interactive-card lg:col-span-6 bg-[#faf7f0] border-2 border-[#113568]/30 rounded-xs shadow-[3px_3px_0_rgba(17,53,104,0.15)] flex flex-col justify-between overflow-hidden">
            {/* Blue Header Bar */}
            <div className="bg-[#0c3975] text-white font-condensed font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 border-b-2 border-black/20 flex items-center justify-between">
              <span>TOP PLAYERS THIS SEASON</span>
              <button
                onClick={() => {
                  playRetroSound('click');
                  setIsChecklistModalOpen(true);
                }}
                className="text-[11px] text-yellow-300 hover:underline uppercase cursor-pointer flex items-center gap-1 font-bold"
              >
                <span>VIEW ALL PLAYERS</span>
                <span>→</span>
              </button>
            </div>

            {/* 5 NBA Star Cards Row */}
            <div className="p-3 grid grid-cols-2 sm:grid-cols-5 gap-2 flex-1 items-stretch">
              
              {/* Card 1: Luka Dončić */}
              <div 
                onClick={() => {
                  playRetroSound('card');
                  setStackCardIndex(0);
                  onShowToast('Loaded #77 Luka Dončić');
                }}
                className="comic-interactive-card bg-white border border-[#0c3975] rounded-xs p-1 flex flex-col justify-between cursor-pointer shadow-xs hover:border-[#b91c1c] transition-all"
              >
                <div className="flex justify-between items-center text-[9px] font-slab px-0.5 border-b border-black/20 pb-0.5">
                  <span className="text-[#0c3975]">#77</span>
                  <span className="bg-[#0c3975] text-white px-1 rounded-[2px] text-[8px]">PG</span>
                </div>
                <div className="aspect-[3/3.5] my-1 rounded-xs overflow-hidden border border-black/20 bg-slate-900">
                  <img src="/src/assets/images/vintage_hoops_card_star_1790618421190.jpg" alt="Luka" className="w-full h-full object-cover" />
                </div>
                <div className="text-center leading-tight">
                  <span className="font-slab text-[9.5px] text-[#0c3975] block truncate">LUKA DONČIĆ</span>
                  <span className="text-[7.5px] font-mono-code text-slate-500 block">MAVERICKS</span>
                  <div className="flex justify-around text-[8px] font-mono-code font-bold text-slate-800 mt-1 border-t border-black/10 pt-0.5">
                    <span>28.7</span>
                    <span>8.9</span>
                    <span>8.1</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Shai Gilgeous-Alexander */}
              <div 
                onClick={() => {
                  playRetroSound('card');
                  onShowToast('Loaded #2 Shai Gilgeous-Alexander');
                }}
                className="comic-interactive-card bg-white border border-[#0c3975] rounded-xs p-1 flex flex-col justify-between cursor-pointer shadow-xs hover:border-[#b91c1c] transition-all"
              >
                <div className="flex justify-between items-center text-[9px] font-slab px-0.5 border-b border-black/20 pb-0.5">
                  <span className="text-[#0c3975]">#2</span>
                  <span className="bg-[#0c3975] text-white px-1 rounded-[2px] text-[8px]">PG</span>
                </div>
                <div className="aspect-[3/3.5] my-1 rounded-xs overflow-hidden border border-black/20 bg-slate-900">
                  <img src="/src/assets/images/sga_hoops_card_star_1790619306677.jpg" alt="SGA" className="w-full h-full object-cover" />
                </div>
                <div className="text-center leading-tight">
                  <span className="font-slab text-[9.5px] text-[#0c3975] block truncate">SHAI GILGEOUS</span>
                  <span className="text-[7.5px] font-mono-code text-slate-500 block">THUNDER</span>
                  <div className="flex justify-around text-[8px] font-mono-code font-bold text-slate-800 mt-1 border-t border-black/10 pt-0.5">
                    <span>31.2</span>
                    <span>5.5</span>
                    <span>6.3</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Giannis Antetokounmpo */}
              <div 
                onClick={() => {
                  playRetroSound('card');
                  setStackCardIndex(3);
                  onShowToast('Loaded #34 Giannis Antetokounmpo');
                }}
                className="comic-interactive-card bg-white border border-[#0c3975] rounded-xs p-1 flex flex-col justify-between cursor-pointer shadow-xs hover:border-[#b91c1c] transition-all"
              >
                <div className="flex justify-between items-center text-[9px] font-slab px-0.5 border-b border-black/20 pb-0.5">
                  <span className="text-[#0c3975]">#34</span>
                  <span className="bg-[#0c3975] text-white px-1 rounded-[2px] text-[8px]">PF</span>
                </div>
                <div className="aspect-[3/3.5] my-1 rounded-xs overflow-hidden border border-black/20 bg-slate-900">
                  <img src="/src/assets/images/wax_pull_basketball_player_1_1790616436471.jpg" alt="Giannis" className="w-full h-full object-cover" />
                </div>
                <div className="text-center leading-tight">
                  <span className="font-slab text-[9.5px] text-[#0c3975] block truncate">GIANNIS</span>
                  <span className="text-[7.5px] font-mono-code text-slate-500 block">BUCKS</span>
                  <div className="flex justify-around text-[8px] font-mono-code font-bold text-slate-800 mt-1 border-t border-black/10 pt-0.5">
                    <span>30.4</span>
                    <span>11.5</span>
                    <span>6.1</span>
                  </div>
                </div>
              </div>

              {/* Card 4: Nikola Jokić */}
              <div 
                onClick={() => {
                  playRetroSound('card');
                  setStackCardIndex(2);
                  onShowToast('Loaded #15 Nikola Jokić');
                }}
                className="comic-interactive-card bg-white border border-[#0c3975] rounded-xs p-1 flex flex-col justify-between cursor-pointer shadow-xs hover:border-[#b91c1c] transition-all"
              >
                <div className="flex justify-between items-center text-[9px] font-slab px-0.5 border-b border-black/20 pb-0.5">
                  <span className="text-[#0c3975]">#15</span>
                  <span className="bg-[#0c3975] text-white px-1 rounded-[2px] text-[8px]">C</span>
                </div>
                <div className="aspect-[3/3.5] my-1 rounded-xs overflow-hidden border border-black/20 bg-slate-900">
                  <img src="/src/assets/images/wax_pull_basketball_player_2_1790616449728.jpg" alt="Jokic" className="w-full h-full object-cover" />
                </div>
                <div className="text-center leading-tight">
                  <span className="font-slab text-[9.5px] text-[#0c3975] block truncate">NIKOLA JOKIĆ</span>
                  <span className="text-[7.5px] font-mono-code text-slate-500 block">NUGGETS</span>
                  <div className="flex justify-around text-[8px] font-mono-code font-bold text-slate-800 mt-1 border-t border-black/10 pt-0.5">
                    <span>26.4</span>
                    <span>12.4</span>
                    <span>9.0</span>
                  </div>
                </div>
              </div>

              {/* Card 5: Stephen Curry */}
              <div 
                onClick={() => {
                  playRetroSound('card');
                  setStackCardIndex(1);
                  onShowToast('Loaded #30 Stephen Curry');
                }}
                className="comic-interactive-card bg-white border border-[#0c3975] rounded-xs p-1 flex flex-col justify-between cursor-pointer shadow-xs hover:border-[#b91c1c] transition-all"
              >
                <div className="flex justify-between items-center text-[9px] font-slab px-0.5 border-b border-black/20 pb-0.5">
                  <span className="text-[#0c3975]">#30</span>
                  <span className="bg-[#0c3975] text-white px-1 rounded-[2px] text-[8px]">PG</span>
                </div>
                <div className="aspect-[3/3.5] my-1 rounded-xs overflow-hidden border border-black/20 bg-slate-900">
                  <img src="/src/assets/images/wax_hero_basketball_card_1790616407157.jpg" alt="Curry" className="w-full h-full object-cover" />
                </div>
                <div className="text-center leading-tight">
                  <span className="font-slab text-[9.5px] text-[#0c3975] block truncate">STEPH CURRY</span>
                  <span className="text-[7.5px] font-mono-code text-slate-500 block">WARRIORS</span>
                  <div className="flex justify-around text-[8px] font-mono-code font-bold text-slate-800 mt-1 border-t border-black/10 pt-0.5">
                    <span>26.8</span>
                    <span>4.8</span>
                    <span>5.1</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* PANEL 3: YOUR ANALYSIS COLLECTION (Red Header) */}
          <div className="comic-interactive-card lg:col-span-3 bg-[#faf7f0] border-2 border-[#113568]/30 rounded-xs shadow-[3px_3px_0_rgba(17,53,104,0.15)] flex flex-col justify-between overflow-hidden">
            {/* Red Header Bar */}
            <div className="bg-[#b91c1c] text-white font-condensed font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 border-b-2 border-black/20 flex items-center justify-between">
              <span>YOUR ANALYSIS COLLECTION</span>
            </div>

            <div className="p-3 flex flex-col justify-between flex-1">
              {/* Dropdown & Export Button */}
              <div className="flex items-center gap-1.5">
                <div className="flex-1 bg-white border border-black/20 px-2 py-1 rounded-[2px] flex items-center justify-between text-xs font-mono-code">
                  <span>{selectedTimeRange}</span>
                  <ChevronDown size={14} />
                </div>
                <button
                  onClick={() => {
                    playRetroSound('click');
                    onShowToast('Exported Analytics report to CSV & PDF.');
                  }}
                  className="bg-[#0c3975] text-white text-[11px] font-condensed font-bold px-2.5 py-1 rounded-[2px] uppercase tracking-wider cursor-pointer hover:bg-[#124b94]"
                >
                  EXPORT
                </button>
              </div>

              {/* 3 Metric Counters */}
              <div className="grid grid-cols-3 gap-1 text-center my-2.5 py-1.5 border-y border-black/10">
                <div>
                  <span className="font-slab text-xl text-[#0c3975] block leading-none">12</span>
                  <span className="font-condensed text-[9px] font-bold text-slate-600 uppercase block mt-0.5">GAMES ANALYZED</span>
                </div>
                <div>
                  <span className="font-slab text-xl text-[#0c3975] block leading-none">48</span>
                  <span className="font-condensed text-[9px] font-bold text-slate-600 uppercase block mt-0.5">PLAYERS TRACKED</span>
                </div>
                <div>
                  <span className="font-slab text-xl text-[#0c3975] block leading-none">6</span>
                  <span className="font-condensed text-[9px] font-bold text-slate-600 uppercase block mt-0.5">TEAMS</span>
                </div>
              </div>

              {/* RECENT SEARCHES */}
              <div className="text-[10px] font-mono-code space-y-1">
                <span className="font-condensed font-bold text-slate-500 uppercase block">RECENT SEARCHES</span>
                <div 
                  onClick={() => onShowToast('Loaded query: Luka Dončić vs. Jokić')}
                  className="flex items-center justify-between hover:bg-black/5 p-1 rounded cursor-pointer"
                >
                  <span className="text-[#0c3975] truncate">🔍 Luka Dončić vs. Jokić</span>
                  <span className="text-slate-400 text-[9px] shrink-0">2h ago &gt;</span>
                </div>
                <div 
                  onClick={() => onShowToast('Loaded query: NBA 2023-24 season stats')}
                  className="flex items-center justify-between hover:bg-black/5 p-1 rounded cursor-pointer"
                >
                  <span className="text-[#0c3975] truncate">🔍 NBA 2023-24 season stats</span>
                  <span className="text-slate-400 text-[9px] shrink-0">5h ago &gt;</span>
                </div>
                <div 
                  onClick={() => onShowToast('Loaded query: Warriors offensive rating')}
                  className="flex items-center justify-between hover:bg-black/5 p-1 rounded cursor-pointer"
                >
                  <span className="text-[#0c3975] truncate">🔍 Warriors offensive rating</span>
                  <span className="text-slate-400 text-[9px] shrink-0">1d ago &gt;</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4. BOTTOM NAVY BANNER (EXACT MATCH TO SCREENSHOT) */}
      <footer className="relative z-10 max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <div className="bg-[#082346] text-white rounded-[4px] p-3 sm:px-6 border-2 border-white/20 flex flex-wrap items-center justify-between gap-4 shadow-md">
          {/* Left Chalk Graphic & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center opacity-85">
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-white fill-none stroke-2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <line x1="12" y1="2" x2="12" y2="22" />
              </svg>
            </div>
            <span className="font-slab text-base sm:text-lg tracking-wider uppercase text-white/95">
              MORE DATA. DEEPER INSIGHTS.
            </span>
          </div>

          {/* Right Callout & Crown Icon */}
          <div className="flex items-center gap-3">
            <span className="font-condensed font-bold text-xs sm:text-sm tracking-widest uppercase text-white/80">
              BETTER ANALYSIS. SMARTER DECISIONS.
            </span>
            <div className="w-6 h-6 text-yellow-400">
              <svg viewBox="0 0 24 24" className="w-full h-full fill-yellow-400 stroke-none">
                <polygon points="2,6 7,12 12,4 17,12 22,6 20,20 4,20" />
              </svg>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL 1: CHECKLIST */}
      {isChecklistModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-[#faf7f0] border-4 border-[#0c3975] rounded-md shadow-2xl p-6">
            <div className="flex items-center justify-between border-b-2 border-[#0c3975] pb-2 mb-3">
              <span className="font-slab text-xl text-[#0c3975] uppercase">
                HOOPDATA 2023-24 PLAYER DATABASE
              </span>
              <button
                onClick={() => setIsChecklistModalOpen(false)}
                className="w-7 h-7 bg-white text-black font-black border border-black hover:bg-yellow-300 flex items-center justify-center cursor-pointer rounded"
              >
                <X size={18} strokeWidth={3} />
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto space-y-1.5 text-xs font-mono-code divide-y divide-black/10">
              {NBA_STAR_CARDS.map((card) => (
                <div 
                  key={card.id}
                  onClick={() => {
                    const idx = NBA_STAR_CARDS.findIndex(c => c.id === card.id);
                    setStackCardIndex(idx);
                    setIsChecklistModalOpen(false);
                    onShowToast(`Selected ${card.name}`);
                  }}
                  className="py-1.5 flex justify-between items-center cursor-pointer hover:bg-black/5 px-1 rounded"
                >
                  <span className="font-bold text-[#0c3975]">{card.number} {card.name}</span>
                  <span className="text-slate-600">{card.team} ({card.position})</span>
                  <span className="text-[#c02328] font-bold">{card.cardStats.ppg}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsChecklistModalOpen(false)}
              className="mt-4 w-full bg-[#0c3975] text-white py-2 font-slab text-xs uppercase cursor-pointer rounded"
            >
              CLOSE CHECKLIST
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: JOIN / EXPLORE PLATFORM */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-[#faf7f0] border-4 border-[#0c3975] rounded-md shadow-2xl p-6 text-center">
            <h3 className="font-slab text-2xl text-[#0c3975] uppercase">
              START ANALYZING WITH HOOPDATA
            </h3>
            <p className="text-xs text-slate-700 mt-1 font-medium font-mono-code">
              Access real-time NBA player telemetry, defensive impact ratings, shot charts, and vintage card collections.
            </p>

            <div className="my-4 p-3 bg-amber-50 border border-amber-900/30 rounded text-left text-xs font-mono-code space-y-1.5">
              <div>✓ Unlimited Player & Lineup Comparisons</div>
              <div>✓ Advanced Metrics (PER, TS%, USG%, BPM, VORP)</div>
              <div>✓ Full Season 2023-24 & Historical Databases</div>
              <div>✓ Export reports to PDF, CSV & JSON</div>
            </div>

            <button
              onClick={() => {
                playRetroSound('burst');
                setIsJoinModalOpen(false);
                onShowToast('Welcome to HoopData Analytics platform!');
              }}
              className="w-full bg-[#0c3975] text-white py-2.5 font-slab text-xs uppercase cursor-pointer rounded shadow hover:bg-[#124b94]"
            >
              LAUNCH FULL PLATFORM
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
