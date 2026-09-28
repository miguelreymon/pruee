import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Dribbble, 
  FileText, 
  Settings, 
  Home, 
  Play, 
  Target, 
  ShieldCheck, 
  Smartphone, 
  Database, 
  Sparkles, 
  Star, 
  TrendingUp, 
  Activity,
  ArrowRight,
  Flame,
  CheckCircle2,
  X,
  Compass
} from 'lucide-react';
import { TEAM_COMPARISONS } from '../data/hoopsPulseData';
import { playRetroSound } from '../utils/audio';

interface HoopsPulseDashboardProps {
  onNavigateToPlayer: () => void;
  onShowToast: (msg: string) => void;
}

export const HoopsPulseDashboard: React.FC<HoopsPulseDashboardProps> = ({
  onNavigateToPlayer,
  onShowToast,
}) => {
  const [activeNav, setActiveNav] = useState('overview');
  const [laptopScreenTab, setLaptopScreenTab] = useState<'shotchart' | 'heatmap'>('shotchart');
  const [playbookMode, setPlaybookMode] = useState<'horns' | 'zone'>('horns');
  const [teamSortKey, setTeamSortKey] = useState<'net' | 'off' | 'def'>('net');
  const [heatZoneHovered, setHeatZoneHovered] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Sorting team comparison
  const sortedTeams = [...TEAM_COMPARISONS].sort((a, b) => {
    if (teamSortKey === 'net') return parseFloat(b.net) - parseFloat(a.net);
    if (teamSortKey === 'off') return b.off - a.off;
    return a.def - b.def;
  });

  return (
    <div className="min-h-screen bg-[#ede8dc] text-black select-none font-sans pb-12">
      {/* Outer Comic Page Frame */}
      <div className="max-w-[1480px] mx-auto p-2 sm:p-4 lg:p-6">
        <div className="relative bg-[#faf6ed] border-4 border-black rounded-lg p-3 sm:p-5 shadow-[0_12px_30px_rgba(0,0,0,0.85)] overflow-hidden">
          
          {/* Halftone Retro Print Grain */}
          <div className="absolute inset-0 pointer-events-none opacity-20 retro-halftone" />

          {/* TWO COLUMN GRID: Left Sidebar + Main Analytics Board */}
          <div className="relative z-10 flex flex-col lg:flex-row gap-4 sm:gap-5 items-stretch">
            
            {/* 1. LEFT SIDEBAR */}
            <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-3">
              {/* Brand Logo Box with animated heartbeat */}
              <div 
                onClick={() => {
                  playRetroSound('burst');
                  onShowToast('HOOPSPULSE: Basketball Data Analytics Platform');
                }}
                className="comic-interactive-card bg-[#24172f] border-3 border-black p-3.5 text-center text-white shadow-[4px_4px_0_#000] relative overflow-hidden group"
              >
                <div className="flex items-center justify-center gap-1.5">
                  <span className="font-bebas text-3xl sm:text-4xl text-[#38bdf8] tracking-wider leading-none">
                    HOOPS
                  </span>
                  <span className="font-bebas text-3xl sm:text-4xl text-[#ff4d00] tracking-wider leading-none">
                    PULSE
                  </span>
                </div>

                {/* EKG pulse line with basketball */}
                <div className="flex items-center justify-center gap-1 text-[#38bdf8] my-1">
                  <span className="h-[2px] w-6 bg-[#38bdf8] group-hover:w-8 transition-all" />
                  <Activity size={16} className="text-[#ff4d00] group-hover:scale-125 transition-transform" />
                  <span className="text-xs group-hover:animate-bounce">🏀</span>
                  <span className="h-[2px] w-6 bg-[#38bdf8] group-hover:w-8 transition-all" />
                </div>

                <span className="font-mono-code text-[9px] font-bold tracking-widest text-[#38bdf8] uppercase block">
                  BASKETBALL DATA ANALYTICS
                </span>
              </div>

              {/* Comic Panel of Player looking up at hoop */}
              <div className="relative border-3 border-black bg-[#1c2438] overflow-hidden shadow-[4px_4px_0_#000] aspect-[16/11] group">
                <img
                  src="/src/assets/images/hoopspulse_sidebar_player_1790613848113.jpg"
                  alt="Player Looking at Hoop"
                  className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-300"
                />

                {/* Speech Bubble: "REAL DATA. BETTER DECISIONS." */}
                <div className="absolute top-2 right-2 bg-white border-2 border-black rounded-lg px-2.5 py-1 shadow-[2px_2px_0_#000] max-w-[130px] transform group-hover:-rotate-2 transition-transform">
                  <span className="font-bebas text-xs sm:text-sm text-black block leading-none">
                    REAL DATA.
                  </span>
                  <span className="font-bebas text-xs sm:text-sm text-[#ff4d00] block leading-none">
                    BETTER DECISIONS.
                  </span>
                </div>
              </div>

              {/* Navigation Menu (Interactive tactile buttons) */}
              <div className="border-3 border-black bg-white overflow-hidden shadow-[4px_4px_0_#000] divide-y-2 divide-black">
                {[
                  { id: 'overview', label: 'OVERVIEW', icon: Home },
                  { id: 'player_stats', label: 'PLAYER STATS', icon: BarChart3, highlight: true, action: onNavigateToPlayer },
                  { id: 'team_analysis', label: 'TEAM ANALYSIS', icon: Users },
                  { id: 'game_analysis', label: 'GAME ANALYSIS', icon: Dribbble },
                  { id: 'reports', label: 'REPORTS', icon: FileText },
                  { id: 'settings', label: 'SETTINGS', icon: Settings },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeNav === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        playRetroSound('click');
                        setActiveNav(item.id);
                        if (item.action) {
                          item.action();
                        } else {
                          onShowToast(`Viewing ${item.label}`);
                        }
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 text-left font-bebas text-base tracking-wider uppercase transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#ffde59] text-black font-black'
                          : 'bg-white hover:bg-yellow-100/70 text-slate-900 active:translate-x-1'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={18} strokeWidth={2.5} className="text-black" />
                        <span>{item.label}</span>
                      </div>
                      {item.highlight && (
                        <span className="text-[10px] bg-[#0284c7] text-white px-2 py-0.5 rounded font-sans font-bold flex items-center gap-1 animate-pulse">
                          <span>PROFILE</span>
                          <ArrowRight size={10} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Latest Update Box */}
              <div className="border-3 border-black bg-white shadow-[4px_4px_0_#000] overflow-hidden">
                <div className="bg-[#0284c7] text-white px-3 py-1.5 font-bebas text-sm tracking-wider uppercase border-b-2 border-black flex items-center justify-between">
                  <span>LATEST UPDATE</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                </div>

                <div className="p-3 flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded bg-[#ff7700] text-black font-black flex items-center justify-center text-lg border-2 border-black shrink-0 shadow-[1px_1px_0_#000] animate-bounce">
                    🏀
                  </div>
                  <div className="leading-tight">
                    <p className="text-[10px] font-bold text-slate-800 uppercase leading-snug">
                      Real-time stats from the latest games and leagues.
                    </p>
                    <span className="font-bebas text-xs text-[#dc2626] tracking-wider uppercase font-black block mt-0.5">
                      LIVE DATA!
                    </span>
                  </div>
                </div>

                {/* 5-Star Endorsement */}
                <div className="border-t-2 border-black bg-[#fef9c3] p-2.5 text-center">
                  <div className="flex items-center justify-center text-amber-500 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-500 hover:scale-125 transition-transform cursor-pointer" />
                    ))}
                  </div>
                  <p className="font-bebas text-[11px] text-slate-900 tracking-wider uppercase leading-none">
                    TRUSTED BY COACHES, SCOUTS AND ANALYSTS WORLDWIDE.
                  </p>
                </div>
              </div>
            </aside>

            {/* 2. MAIN CONTENT RIGHT SPREAD */}
            <main className="flex-1 flex flex-col gap-4 min-w-0">
              
              {/* TOP HERO POSTER: "ANALYZE. IMPROVE. WIN." */}
              <div className="relative border-4 border-black bg-[#faf6ed] rounded-lg p-4 sm:p-6 shadow-[4px_4px_0_#000] overflow-hidden">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-center">
                  
                  {/* Left Column: Monumental 3D Typography & CTAs (7 cols) */}
                  <div className="xl:col-span-7 z-10">
                    <div className="flex flex-wrap items-baseline gap-2 font-bebas text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.9]">
                      <span className="comic-text-3d-blue">
                        ANALYZE.
                      </span>
                      <span className="comic-text-3d-orange">
                        IMPROVE.
                      </span>
                      <span className="comic-text-3d-blue">
                        WIN.
                      </span>
                    </div>

                    <p className="mt-3 text-xs sm:text-base text-slate-800 font-semibold max-w-lg leading-relaxed">
                      Advanced basketball data analytics to help you understand the game, improve your team and make smarter decisions.
                    </p>

                    {/* Interactive Action Buttons */}
                    <div className="mt-5 flex flex-wrap items-center gap-3.5">
                      {/* Bouncy Jagged Starburst Button */}
                      <button
                        onClick={() => {
                          playRetroSound('burst');
                          onNavigateToPlayer();
                          onShowToast('Launching Lucas Martín #23 Pro Player Analytics Page!');
                        }}
                        className="btn-comic-burst px-6 py-3 text-xl sm:text-2xl uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-[4px_4px_0_#000]"
                      >
                        <span>GET STARTED!</span>
                        <Sparkles size={20} className="text-[#ffde59] animate-spin" />
                      </button>

                      <button
                        onClick={() => {
                          playRetroSound('click');
                          onNavigateToPlayer();
                        }}
                        className="btn-comic-blue px-5 py-2.5 text-sm sm:text-base tracking-wider uppercase cursor-pointer shadow-[3px_3px_0_#000]"
                      >
                        EXPLORE DATA
                      </button>

                      <button
                        onClick={() => {
                          playRetroSound('click');
                          setActiveModal('Platform Features Suite');
                        }}
                        className="bg-white hover:bg-yellow-50 text-black border-2 border-black px-4 py-2.5 text-sm sm:text-base font-bebas tracking-wider uppercase shadow-[3px_3px_0_#000] cursor-pointer active:translate-y-0.5"
                      >
                        SEE FEATURES
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Interactive Laptop Display & 4 Value Props (5 cols) */}
                  <div className="xl:col-span-5 flex flex-col gap-3 z-10">
                    {/* Live Open Laptop Graphic with interactive screen switch */}
                    <div 
                      onClick={() => {
                        playRetroSound('click');
                        setLaptopScreenTab(laptopScreenTab === 'shotchart' ? 'heatmap' : 'shotchart');
                        onShowToast(`Toggled Laptop View: ${laptopScreenTab === 'shotchart' ? 'Heat Map' : 'Shot Chart'}`);
                      }}
                      className="comic-interactive-card relative border-3 border-black bg-black rounded-lg overflow-hidden shadow-[4px_4px_0_#000] group"
                    >
                      <img
                        src="/src/assets/images/hoopspulse_hero_laptop_1790613785798.jpg"
                        alt="HoopsPulse Analytics Dashboard Laptop"
                        className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-200 filter contrast-110"
                      />

                      {/* Floating Interactive HUD pill on laptop screen */}
                      <div className="absolute top-3 left-3 bg-black/85 text-[#ffde59] border border-white/30 px-2 py-0.5 rounded font-mono-code text-[10px] font-bold flex items-center gap-1.5 shadow-md">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>FG% 56.4%</span>
                      </div>

                      <div className="absolute bottom-2 right-2 bg-black/85 text-[#38bdf8] font-mono-code font-bold text-[9px] px-2 py-0.5 border border-white/20">
                        CLICK SCREEN TO TOGGLE
                      </div>
                    </div>

                    {/* 4 Tactile Value Prop Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-2">
                      {[
                        { title: 'DETAILED STATS', desc: 'Advanced metrics and player performance.', icon: BarChart3, bg: 'bg-[#ffde59]', action: onNavigateToPlayer },
                        { title: 'REAL GAME DATA', desc: 'Live and historical match data.', icon: Play, bg: 'bg-[#0284c7]', text: 'text-white' },
                        { title: 'TEAM INSIGHTS', desc: 'Build winning strategies.', icon: Users, bg: 'bg-[#ffde59]' },
                        { title: 'DATA-DRIVEN', desc: 'Make decisions with confidence.', icon: Target, bg: 'bg-[#ff4d00]', text: 'text-white' },
                      ].map((prop, i) => {
                        const Icon = prop.icon;
                        return (
                          <div 
                            key={i}
                            onClick={() => {
                              playRetroSound('click');
                              if (prop.action) prop.action();
                              else onShowToast(`${prop.title}: Activated in Pro Tier`);
                            }}
                            className="comic-interactive-card bg-white border-2 border-black p-2 flex items-center gap-2.5 shadow-[2px_2px_0_#000]"
                          >
                            <div className={`w-8 h-8 rounded ${prop.bg} ${prop.text || 'text-black'} flex items-center justify-center border border-black shrink-0 shadow-[1px_1px_0_#000]`}>
                              <Icon size={16} strokeWidth={2.5} />
                            </div>
                            <div className="leading-tight">
                              <span className="font-bebas text-xs text-black block tracking-wide">
                                {prop.title}
                              </span>
                              <span className="text-[10px] font-semibold text-slate-700 block">
                                {prop.desc}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>

              {/* 5 BENTO FEATURE CARDS (REAL LIVING INTERACTIVE COMPONENTS) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
                
                {/* 1. PLAYER STATS CARD (LUCAS MARTÍN #23) */}
                <div
                  onClick={() => {
                    playRetroSound('burst');
                    onNavigateToPlayer();
                    onShowToast('Opening Lucas Martín #23 Pro Player Card!');
                  }}
                  className="comic-interactive-card bg-white border-3 border-black shadow-[4px_4px_0_#000] flex flex-col justify-between overflow-hidden group"
                >
                  <div className="bg-[#ffde59] border-b-2 border-black p-2 flex items-center justify-between">
                    <div>
                      <span className="font-bebas text-sm text-black block leading-none">
                        PLAYER STATS
                      </span>
                      <span className="text-[10px] font-bold text-slate-800 leading-tight block">
                        Track every move, every number.
                      </span>
                    </div>
                    <ArrowRight size={14} className="text-black group-hover:translate-x-1 transition-transform" />
                  </div>

                  <div className="relative aspect-square overflow-hidden bg-slate-900">
                    <img
                      src="/src/assets/images/hoopspulse_shooting_card_1790613865651.jpg"
                      alt="Player Shooting Stats"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    {/* Live overlay stats */}
                    <div className="absolute bottom-2 right-2 bg-black/90 text-white border border-white/40 p-1.5 font-mono-code text-[9px] leading-tight shadow-md">
                      <div>PTS <span className="text-[#38bdf8] font-bold">24.8</span></div>
                      <div>REB <span className="text-[#38bdf8] font-bold">7.2</span></div>
                      <div>AST <span className="text-[#38bdf8] font-bold">5.1</span></div>
                      <div>FG% <span className="text-emerald-400 font-bold">52.3%</span></div>
                    </div>

                    <div className="absolute top-2 left-2 bg-[#ff4d00] text-white font-bebas text-[11px] px-1.5 py-0.5 border border-black shadow">
                      LUCAS MARTÍN #23
                    </div>
                  </div>

                  <div className="p-2 bg-yellow-50 text-center border-t border-black/30 font-bebas text-xs text-[#0284c7] group-hover:text-[#ff4d00] transition-colors">
                    OPEN PLAYER PROFILE →
                  </div>
                </div>

                {/* 2. GAME ANALYSIS (INTERACTIVE TACTICAL PLAYBOOK) */}
                <div
                  onClick={() => {
                    playRetroSound('click');
                    setPlaybookMode(playbookMode === 'horns' ? 'zone' : 'horns');
                    onShowToast(`Tactical Route: Switched to ${playbookMode === 'horns' ? '2-3 Zone Defense' : 'Horns Flare Offense'}`);
                  }}
                  className="comic-interactive-card bg-white border-3 border-black shadow-[4px_4px_0_#000] flex flex-col justify-between overflow-hidden group"
                >
                  <div className="bg-[#ff4d00] border-b-2 border-black p-2 text-white">
                    <span className="font-bebas text-sm text-white block leading-none">
                      GAME ANALYSIS
                    </span>
                    <span className="text-[10px] font-bold text-yellow-100 leading-tight block">
                      {playbookMode === 'horns' ? 'Offensive Play: Horns Flare' : 'Defensive Scheme: 2-3 Trap'}
                    </span>
                  </div>

                  <div className="relative aspect-square overflow-hidden bg-slate-900">
                    <img
                      src="/src/assets/images/hoopspulse_tactical_board_1790613824097.jpg"
                      alt="Tactical Play Diagram"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />

                    {/* Click prompt overlay */}
                    <div className="absolute bottom-2 left-2 bg-black/80 text-yellow-300 font-mono-code text-[9px] px-2 py-0.5 border border-white/20">
                      TAP TO SWITCH PLAY
                    </div>
                  </div>

                  <div className="p-2 bg-orange-50 text-center border-t border-black/30 font-bebas text-xs text-slate-800">
                    CLICK TO TOGGLE PLAYBOOK
                  </div>
                </div>

                {/* 3. HEAT MAPS (INTERACTIVE COURT ZONES) */}
                <div
                  onClick={() => {
                    playRetroSound('click');
                    onNavigateToPlayer();
                  }}
                  className="comic-interactive-card bg-white border-3 border-black shadow-[4px_4px_0_#000] flex flex-col justify-between overflow-hidden group"
                >
                  <div className="bg-[#10b981] border-b-2 border-black p-2 text-white">
                    <span className="font-bebas text-sm text-white block leading-none">
                      HEAT MAPS
                    </span>
                    <span className="text-[10px] font-bold text-emerald-100 leading-tight block">
                      {heatZoneHovered ? `Zone: ${heatZoneHovered}` : 'Hover zones for FG%'}
                    </span>
                  </div>

                  <div className="relative aspect-square overflow-hidden bg-slate-950 p-2 flex items-center justify-center">
                    <div className="w-full h-full rounded border border-white/40 bg-gradient-to-r from-emerald-600 via-amber-500 to-red-600 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-600 via-yellow-400 to-transparent opacity-85" />
                      
                      {/* Court lines */}
                      <div className="w-full h-[1px] bg-white/60 absolute top-1/2" />
                      <div className="w-12 h-12 rounded-full border border-white/60 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      
                      {/* Interactive Hoverable Target Zones */}
                      <div 
                        onMouseEnter={() => setHeatZoneHovered('Paint (68.4% FG)')}
                        onMouseLeave={() => setHeatZoneHovered(null)}
                        className="w-14 h-16 border border-white/60 absolute left-2 top-1/2 -translate-y-1/2 hover:bg-white/40 cursor-pointer" 
                      />
                      <div 
                        onMouseEnter={() => setHeatZoneHovered('Right Corner 3PT (48.7%)')}
                        onMouseLeave={() => setHeatZoneHovered(null)}
                        className="w-14 h-16 border border-white/60 absolute right-2 top-1/2 -translate-y-1/2 hover:bg-white/40 cursor-pointer" 
                      />
                    </div>
                  </div>

                  <div className="p-2 bg-emerald-50 text-center border-t border-black/30 font-bebas text-xs text-emerald-800">
                    OPEN FULL COURT HEAT MAP →
                  </div>
                </div>

                {/* 4. TEAM COMPARISON (INTERACTIVE SORTABLE TABLE) */}
                <div
                  className="comic-interactive-card bg-white border-3 border-black shadow-[4px_4px_0_#000] flex flex-col justify-between overflow-hidden"
                >
                  <div className="bg-[#0284c7] border-b-2 border-black p-2 text-white flex items-center justify-between">
                    <div>
                      <span className="font-bebas text-sm text-white block leading-none">
                        TEAM COMPARISON
                      </span>
                      <span className="text-[10px] font-bold text-sky-100 leading-tight block">
                        Tap header to sort
                      </span>
                    </div>
                  </div>

                  <div className="p-2 aspect-square flex flex-col justify-between bg-slate-50 text-[9px] font-mono-code font-bold">
                    <table className="w-full text-center border-collapse">
                      <thead>
                        <tr className="border-b border-black text-slate-700">
                          <th className="text-left py-0.5">TEAM</th>
                          <th 
                            onClick={(e) => { e.stopPropagation(); setTeamSortKey('off'); playRetroSound('click'); }}
                            className="cursor-pointer hover:text-black underline"
                          >
                            OFF
                          </th>
                          <th 
                            onClick={(e) => { e.stopPropagation(); setTeamSortKey('def'); playRetroSound('click'); }}
                            className="cursor-pointer hover:text-black underline"
                          >
                            DEF
                          </th>
                          <th 
                            onClick={(e) => { e.stopPropagation(); setTeamSortKey('net'); playRetroSound('click'); }}
                            className="cursor-pointer hover:text-black underline text-emerald-700"
                          >
                            NET
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/20 text-slate-900">
                        {sortedTeams.map((row) => (
                          <tr key={row.team} className="hover:bg-yellow-200/60 transition-colors">
                            <td className="text-left py-1 font-bold">{row.team}</td>
                            <td>{row.off}</td>
                            <td>{row.def}</td>
                            <td className="text-emerald-700 font-bold">{row.net}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="text-[8px] text-center text-slate-500 uppercase border-t border-black/10 pt-1">
                      Sorted by: {teamSortKey.toUpperCase()} Rating
                    </div>
                  </div>

                  <div 
                    onClick={() => {
                      playRetroSound('click');
                      onShowToast('Full 30-Team Advanced Net Rating Matrix loaded');
                    }}
                    className="p-2 bg-sky-50 text-center border-t border-black/30 font-bebas text-xs text-[#0284c7] cursor-pointer hover:bg-sky-100"
                  >
                    EXPLORE ALL TEAMS →
                  </div>
                </div>

                {/* 5. SCOUTING CARD */}
                <div
                  onClick={() => {
                    playRetroSound('click');
                    setActiveModal('Global Scouting Dossier');
                    onShowToast('Scouting Dossier: 84 Prospect Watchlist');
                  }}
                  className="comic-interactive-card bg-white border-3 border-black shadow-[4px_4px_0_#000] flex flex-col justify-between overflow-hidden group"
                >
                  <div className="bg-[#ff4d00] border-b-2 border-black p-2 text-white">
                    <span className="font-bebas text-sm text-white block leading-none">
                      SCOUTING
                    </span>
                    <span className="text-[10px] font-bold text-yellow-100 leading-tight block">
                      Find talent. Build the future.
                    </span>
                  </div>

                  <div className="relative aspect-square overflow-hidden bg-slate-900">
                    <img
                      src="/src/assets/images/hoopspulse_scout_analyst_1790613837273.jpg"
                      alt="Scouting Talent"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-2 right-2 bg-black/85 text-emerald-400 font-mono-code text-[9px] px-2 py-0.5 border border-white/20">
                      LIVE SCOUT
                    </div>
                  </div>

                  <div className="p-2 bg-orange-50 text-center border-t border-black/30 font-bebas text-xs text-slate-800">
                    VIEW SCOUT DOSSIER →
                  </div>
                </div>

              </div>

              {/* BOTTOM FOOTER CALLOUT BAR */}
              <div className="border-4 border-black bg-[#122b55] text-white p-3.5 sm:p-4 rounded-lg shadow-[4px_4px_0_#000]">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                  <div className="text-center lg:text-left">
                    <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wider leading-none">
                      REAL DATA. REAL BASKETBALL.
                    </h3>
                    <p className="text-xs text-sky-200 font-semibold mt-1">
                      From individual stats to team strategies, get the insights you need — all in one place.
                    </p>
                  </div>

                  {/* 4 Feature Items with hover effects */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    {[
                      { title: 'Live Data', sub: 'Real time leagues', icon: Database, bg: 'bg-[#38bdf8]' },
                      { title: 'Advanced Analytics', sub: 'Heat maps & trends', icon: TrendingUp, bg: 'bg-[#ffde59]' },
                      { title: 'Anywhere Access', sub: 'Desktop & mobile', icon: Smartphone, bg: 'bg-[#38bdf8]' },
                      { title: 'Secure & Reliable', sub: 'Data protected', icon: ShieldCheck, bg: 'bg-[#10b981]' },
                    ].map((feat, i) => {
                      const Icon = feat.icon;
                      return (
                        <div 
                          key={i}
                          onClick={() => {
                            playRetroSound('click');
                            onShowToast(`${feat.title}: Verified and synchronized`);
                          }}
                          className="comic-interactive-card flex items-center gap-2 p-1.5 rounded bg-black/20 hover:bg-black/40 cursor-pointer"
                        >
                          <div className={`w-8 h-8 rounded ${feat.bg} text-black flex items-center justify-center font-bold shrink-0 border border-black shadow-[1px_1px_0_#000]`}>
                            <Icon size={15} />
                          </div>
                          <div className="leading-tight">
                            <span className="font-bebas text-xs block text-white tracking-wide">{feat.title}</span>
                            <span className="text-[9px] text-sky-200">{feat.sub}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

            </main>
          </div>

        </div>
      </div>

      {/* Interactive Modal when clicking features/scouting */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-[#faf6ed] border-4 border-black rounded-lg shadow-[8px_8px_0_#000] p-6">
            <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-4">
              <span className="font-bebas text-xl text-[#0284c7] uppercase">
                {activeModal}
              </span>
              <button
                onClick={() => {
                  playRetroSound('click');
                  setActiveModal(null);
                }}
                className="w-7 h-7 bg-white text-black font-black border border-black hover:bg-yellow-300 flex items-center justify-center cursor-pointer rounded"
              >
                <X size={18} strokeWidth={3} />
              </button>
            </div>

            <div className="text-xs text-slate-800 space-y-2 leading-relaxed font-medium">
              <p>
                HoopsPulse Pro Analytics Suite is actively calculating real-time metrics for <strong>Liga EBA & ACB matches</strong>.
              </p>
              <div className="p-3 bg-white border-2 border-black rounded font-mono-code text-[11px] space-y-1">
                <div>● Featured Prospect: Lucas Martín (#23 Point Guard)</div>
                <div>● Rating: 94th Percentile Pick & Roll Efficiency</div>
                <div>● Telemetry: 56.4% FG Shooting Accuracy</div>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => {
                  setActiveModal(null);
                  onNavigateToPlayer();
                }}
                className="flex-1 btn-comic-burst py-2.5 font-bebas text-sm uppercase tracking-wider cursor-pointer"
              >
                VIEW LUCAS MARTÍN PROFILE →
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 bg-white border-2 border-black font-bebas text-xs uppercase cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
