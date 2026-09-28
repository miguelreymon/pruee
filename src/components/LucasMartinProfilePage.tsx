import React, { useState } from 'react';
import { 
  Home, 
  User, 
  Users, 
  Trophy, 
  Scale, 
  FileText, 
  Settings, 
  Search, 
  Star, 
  ChevronDown, 
  Crown,
  ArrowLeft,
  ArrowRight,
  Target,
  Sparkles,
  Flame,
  CheckCircle2,
  X,
  TrendingUp,
  Activity
} from 'lucide-react';
import { LUCAS_MARTIN, SHOT_CHART_POINTS, GameLog } from '../data/hoopsPulseData';
import { playRetroSound } from '../utils/audio';

interface LucasMartinProfilePageProps {
  onBackToDashboard: () => void;
  onShowToast: (msg: string) => void;
}

export const LucasMartinProfilePage: React.FC<LucasMartinProfilePageProps> = ({
  onBackToDashboard,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'shot_chart' | 'heat_map' | 'game_logs' | 'compare'>('overview');
  const [performanceMetric, setPerformanceMetric] = useState<'points' | 'rebounds' | 'assists' | 'efficiency' | 'minutes'>('points');
  const [hoveredDataPoint, setHoveredDataPoint] = useState<{ index: number; val: number; label: string } | null>(null);
  const [hoveredDonutSegment, setHoveredDonutSegment] = useState<'2pt' | '3pt' | 'ft' | null>(null);
  const [selectedShot, setSelectedShot] = useState<{ x: number; y: number; made: boolean; desc: string } | null>(null);
  const [heatMapMode, setHeatMapMode] = useState<'offense' | 'defense'>('offense');
  const [shotFilter, setShotFilter] = useState<'all' | 'made' | 'missed'>('all');
  const [selectedGameLog, setSelectedGameLog] = useState<GameLog | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Performance Timeline metric values from J1 to J10
  const metricData: Record<string, { label: string; values: number[]; unit: string }> = {
    points: { label: 'Points Per Game', values: [7, 9, 12, 11, 13, 12, 16, 12, 14, 18.4], unit: 'PTS' },
    assists: { label: 'Assists Per Game', values: [2, 3, 4, 5, 6, 5, 7, 5, 6, 5.2], unit: 'AST' },
    rebounds: { label: 'Rebounds Per Game', values: [3, 4, 5, 4, 6, 4, 5, 4, 5, 4.7], unit: 'REB' },
    efficiency: { label: 'Efficiency Rating', values: [8, 11, 14, 13, 15, 14, 19, 15, 17, 18.6], unit: 'PER' },
    minutes: { label: 'Minutes Played', values: [22, 26, 28, 30, 31, 29, 34, 30, 32, 32.4], unit: 'MIN' },
  };

  const currentMetric = metricData[performanceMetric];
  const maxVal = Math.max(...currentMetric.values) * 1.25;

  const filteredShots = SHOT_CHART_POINTS.filter((pt) => {
    if (shotFilter === 'made') return pt.made;
    if (shotFilter === 'missed') return !pt.made;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#ede8dc] text-black select-none font-sans pb-12">
      {/* Outer Comic Page Frame */}
      <div className="max-w-[1480px] mx-auto p-2 sm:p-4 lg:p-6">
        <div className="relative bg-[#faf6ed] border-4 border-black rounded-lg shadow-[0_12px_30px_rgba(0,0,0,0.85)] overflow-hidden">
          
          {/* Halftone Retro Pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-20 retro-halftone" />

          {/* 1. TOP HEADER BAR */}
          <header className="relative z-10 bg-[#0c2340] border-b-3 border-black text-white px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
            {/* Logo with Return Action */}
            <div 
              onClick={() => {
                playRetroSound('burst');
                onBackToDashboard();
              }}
              className="flex items-center gap-2 cursor-pointer group"
              title="Return to HoopsPulse Overview Dashboard"
            >
              <div className="leading-none">
                <span className="font-bebas text-2xl sm:text-3xl text-[#38bdf8] tracking-wider leading-none">
                  HOOPS
                </span>
                <span className="font-bebas text-2xl sm:text-3xl text-[#ff4d00] tracking-wider leading-none">
                  PULSE
                </span>
                <span className="block text-[8px] font-mono-code text-[#38bdf8] tracking-widest uppercase">
                  REAL DATA. REAL BASKETBALL.
                </span>
              </div>
            </div>

            {/* Global Search Bar */}
            <div className="flex-1 max-w-md mx-2 sm:mx-6">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search player, team or league..."
                  className="w-full bg-[#f5efe4] text-black font-semibold text-xs py-1.5 pl-9 pr-3 border-2 border-black rounded-sm placeholder:text-slate-500 focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            {/* User Profile Info */}
            <div className="flex items-center gap-3 ml-auto">
              <button 
                onClick={() => {
                  playRetroSound('click');
                  onShowToast('Logged in as Scout Miguel (Pro Tier)');
                }}
                className="flex items-center gap-2 hover:opacity-80 cursor-pointer font-semibold text-xs text-white"
              >
                <div className="w-7 h-7 rounded-full bg-[#38bdf8] text-black font-bold flex items-center justify-center text-xs border border-white">
                  M
                </div>
                <span className="hidden sm:inline">Miguel</span>
                <ChevronDown size={14} />
              </button>
            </div>
          </header>

          {/* TWO COLUMN BODY: Left Navigation + Player Analytics Spread */}
          <div className="relative z-10 flex flex-col lg:flex-row gap-3 sm:gap-4 p-3 sm:p-4 items-stretch">
            
            {/* LEFT SIDEBAR */}
            <aside className="w-full lg:w-60 shrink-0 flex flex-col gap-3">
              {/* Back to Dashboard Button with bouncy spring */}
              <button
                onClick={() => {
                  playRetroSound('click');
                  onBackToDashboard();
                }}
                className="comic-interactive-card w-full btn-comic-blue py-2 px-3 text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-[3px_3px_0_#000]"
              >
                <ArrowLeft size={14} strokeWidth={3} />
                <span>← OVERVIEW DASHBOARD</span>
              </button>

              {/* Menu List */}
              <div className="border-3 border-black bg-white overflow-hidden shadow-[4px_4px_0_#000] divide-y-2 divide-black">
                {[
                  { label: 'Home', action: onBackToDashboard, icon: Home },
                  { label: 'Players', active: true, icon: User },
                  { label: 'Teams', icon: Users },
                  { label: 'Leagues', icon: Trophy },
                  { label: 'Compare', icon: Scale },
                  { label: 'Reports', icon: FileText },
                  { label: 'Settings', icon: Settings },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        playRetroSound('click');
                        if (item.action) item.action();
                        else onShowToast(`Browsing ${item.label}`);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left font-bebas text-base tracking-wider uppercase transition-all cursor-pointer ${
                        item.active
                          ? 'bg-[#ffde59] text-black font-black'
                          : 'bg-white hover:bg-yellow-50 text-slate-800'
                      }`}
                    >
                      <Icon size={16} strokeWidth={2.5} className="text-black" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Lower Burst Sticker: BETTER DATA. BETTER DECISIONS. */}
              <div 
                onClick={() => {
                  playRetroSound('burst');
                  onShowToast('Liga EBA Advanced Scouting Engine synchronized');
                }}
                className="comic-interactive-card border-3 border-black bg-[#ffde59] p-3 text-center shadow-[4px_4px_0_#000] relative overflow-hidden group"
              >
                <div className="w-14 h-14 mx-auto bg-[#ff4d00] rounded-full text-white flex items-center justify-center text-2xl border-2 border-black shadow-[2px_2px_0_#000] mb-2 transform group-hover:rotate-12 transition-transform">
                  🏀
                </div>
                <h4 className="font-bebas text-2xl text-black uppercase leading-tight tracking-tight">
                  BETTER DATA.<br />BETTER DECISIONS.
                </h4>
                <p className="text-[9px] font-mono-code font-bold text-slate-800 mt-1 uppercase">
                  LIGA EBA ANALYTICS ENGINE
                </p>
              </div>
            </aside>

            {/* MAIN PLAYER VIEW */}
            <main className="flex-1 flex flex-col gap-3 min-w-0">
              
              {/* 1. HERO PLAYER HEADER BANNER */}
              <div className="comic-interactive-card relative border-3 border-black bg-[#0d3b66] text-white rounded-md p-4 sm:p-5 shadow-[4px_4px_0_#000] overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
                  
                  {/* Left: Player Avatar + Details */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-md border-3 border-black bg-[#162740] overflow-hidden shrink-0 shadow-[3px_3px_0_#000] relative group">
                      <img
                        src="/src/assets/images/hoopspulse_lucas_banner_1790613799976.jpg"
                        alt="Lucas Martín #23"
                        className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <h1 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide leading-none drop-shadow-[2px_2px_0_#000]">
                          LUCAS <span className="text-[#ff4d00]">MARTÍN</span>
                        </h1>
                        <span className="bg-[#1b4965] border-2 border-black font-bebas text-lg px-2 py-0.5 text-white shadow-[1px_1px_0_#000]">
                          #23
                        </span>
                      </div>

                      <div className="mt-1.5 flex items-center justify-center sm:justify-start gap-2">
                        <span className="bg-[#ffde59] text-black font-bebas text-xs tracking-wider uppercase px-2 py-0.5 border border-black shadow-[1px_1px_0_#000]">
                          POINT GUARD
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-center sm:justify-start gap-2">
                        <span className="text-sm font-bold text-sky-200">
                          🏀 CB VILANOVA
                        </span>
                        <span className="bg-sky-950 text-sky-300 border border-sky-600 text-[10px] font-mono-code font-bold px-1.5 py-0.2 rounded">
                          🇪🇸 LIGA EBA
                        </span>
                      </div>

                      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono-code text-slate-200">
                        <div>
                          <span className="text-[10px] text-sky-300 block">Age:</span>
                          <span className="font-bold text-white">21</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-sky-300 block">Height:</span>
                          <span className="font-bold text-white">1.88 m</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-sky-300 block">Weight:</span>
                          <span className="font-bold text-white">82 kg</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-sky-300 block">Nationality:</span>
                          <span className="font-bold text-white">Spain 🇪🇸</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Interactive Follow Button & Comic Quote */}
                  <div className="flex flex-col items-center md:items-end justify-between gap-3 text-center md:text-right">
                    <button
                      onClick={() => {
                        playRetroSound('burst');
                        setIsFollowing(!isFollowing);
                        onShowToast(isFollowing ? 'Unfollowed Lucas Martín' : '★ Following Lucas Martín! Added to your scouting shortlist.');
                      }}
                      className="comic-interactive-card btn-comic-yellow px-4 py-1.5 text-xs font-bebas tracking-wider uppercase flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0_#000]"
                    >
                      <Star size={14} className={isFollowing ? 'fill-black' : ''} />
                      <span>{isFollowing ? 'FOLLOWING' : '★ FOLLOW'}</span>
                    </button>

                    <div className="mt-1">
                      <span className="font-marker text-lg text-white block transform rotate-[-2deg] drop-shadow-[2px_2px_0_#000]">
                        PLAY SMART. PLAY BETTER.
                      </span>
                      <Crown size={16} className="text-[#ffde59] mx-auto md:ml-auto mr-0 mt-0.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. SUB-NAVIGATION TABS */}
              <div className="border-b-2 border-black flex gap-1 sm:gap-4 overflow-x-auto text-xs font-bebas tracking-wider uppercase">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'stats', label: 'Stats' },
                  { id: 'shot_chart', label: 'Shot Chart' },
                  { id: 'heat_map', label: 'Heat Map' },
                  { id: 'game_logs', label: 'Game Logs' },
                  { id: 'compare', label: 'Compare' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      playRetroSound('click');
                      setActiveTab(tab.id as any);
                    }}
                    className={`py-2 px-3 sm:px-4 cursor-pointer transition-all border-b-2 ${
                      activeTab === tab.id
                        ? 'border-[#0284c7] text-[#0284c7] font-black'
                        : 'border-transparent text-slate-600 hover:text-black'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* 3. FIVE TOP STAT CARDS (CLICKING ANY CARD UPDATES THE TIMELINE CHART!) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
                {[
                  { id: 'points', label: 'POINTS', val: LUCAS_MARTIN.stats.ppg, unit: 'PPG', diff: LUCAS_MARTIN.stats.ppgDiff, icon: '🏀' },
                  { id: 'assists', label: 'ASSISTS', val: LUCAS_MARTIN.stats.apg, unit: 'APG', diff: LUCAS_MARTIN.stats.apgDiff, icon: '🏹' },
                  { id: 'rebounds', label: 'REBOUNDS', val: LUCAS_MARTIN.stats.rpg, unit: 'RPG', diff: LUCAS_MARTIN.stats.rpgDiff, icon: '🥅' },
                  { id: 'efficiency', label: 'EFFICIENCY', val: LUCAS_MARTIN.stats.per, unit: 'PER', diff: LUCAS_MARTIN.stats.perDiff, icon: '📈' },
                  { id: 'minutes', label: 'MINUTES', val: LUCAS_MARTIN.stats.mpg, unit: 'MPG', diff: LUCAS_MARTIN.stats.mpgDiff, icon: '⏱️' },
                ].map((stat) => {
                  const isSelected = performanceMetric === stat.id;
                  return (
                    <div 
                      key={stat.id}
                      onClick={() => {
                        playRetroSound('click');
                        setPerformanceMetric(stat.id as any);
                        onShowToast(`Plotted ${stat.label} on Performance Timeline!`);
                      }}
                      className={`comic-interactive-card bg-white border-2 border-black p-3 shadow-[3px_3px_0_#000] cursor-pointer transition-all ${
                        isSelected ? 'bg-amber-100 ring-2 ring-[#0284c7] -translate-y-1 shadow-[5px_5px_0_#000]' : 'hover:bg-yellow-50'
                      }`}
                      title={`Click to plot ${stat.label} on Performance Over Time`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bebas text-xs text-slate-800 tracking-wider uppercase">{stat.label}</span>
                        <span className="text-xs">{stat.icon}</span>
                      </div>
                      <span className="font-bebas text-3xl sm:text-4xl text-black block leading-none mt-1">
                        {stat.val}
                      </span>
                      <span className="text-[10px] font-mono-code font-bold text-slate-500 uppercase block">{stat.unit}</span>
                      <span className="text-[10px] font-bold text-emerald-600 mt-1 block">
                        ▲ {stat.diff} vs. last 10 games
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* 4. CHARTS ROW 1: Performance Over Time + Shot Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                
                {/* Left: PERFORMANCE OVER TIME with HOVER TOOLTIPS */}
                <div className="comic-interactive-card lg:col-span-8 bg-white border-2 border-black p-3.5 shadow-[3px_3px_0_#000] flex flex-col justify-between">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-2">
                    <div>
                      <h3 className="font-bebas text-lg text-black tracking-wide uppercase">
                        PERFORMANCE OVER TIME ({currentMetric.label})
                      </h3>
                      <span className="text-[10px] font-mono-code text-slate-500">
                        Hover any node for game detail
                      </span>
                    </div>

                    {/* Metric Selector Pills */}
                    <div className="flex items-center border border-black rounded overflow-hidden text-[10px] font-mono-code font-bold">
                      {(['points', 'rebounds', 'assists', 'efficiency', 'minutes'] as const).map((m) => (
                        <button
                          key={m}
                          onClick={() => {
                            playRetroSound('click');
                            setPerformanceMetric(m);
                          }}
                          className={`px-2 py-1 uppercase cursor-pointer transition-colors ${
                            performanceMetric === m ? 'bg-[#0284c7] text-white font-black' : 'bg-slate-100 hover:bg-slate-200 text-black'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SVG Line Chart with live node hover */}
                  <div className="relative h-44 mt-3 w-full">
                    {/* Y-axis values */}
                    <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[9px] font-mono-code text-slate-500">
                      <span>{Math.round(maxVal)}</span>
                      <span>{Math.round(maxVal * 0.75)}</span>
                      <span>{Math.round(maxVal * 0.5)}</span>
                      <span>{Math.round(maxVal * 0.25)}</span>
                      <span>0</span>
                    </div>

                    {/* Chart Plot Area */}
                    <div className="ml-6 h-full flex flex-col justify-between border-l border-b border-black/40 relative">
                      <div className="w-full h-[1px] bg-slate-200" />
                      <div className="w-full h-[1px] bg-slate-200" />
                      <div className="w-full h-[1px] bg-slate-200" />
                      <div className="w-full h-[1px] bg-slate-200" />
                      <div className="w-full h-[1px] bg-slate-200" />

                      {/* SVG line */}
                      <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                        <polyline
                          fill="none"
                          stroke="#0284c7"
                          strokeWidth="3"
                          points={currentMetric.values
                            .map((val, idx) => {
                              const x = (idx / (currentMetric.values.length - 1)) * 100;
                              const y = 100 - (val / maxVal) * 100;
                              return `${x}%,${y}%`;
                            })
                            .join(' ')}
                        />
                      </svg>

                      {/* Interactive Hoverable Points */}
                      {currentMetric.values.map((val, idx) => {
                        const left = `${(idx / (currentMetric.values.length - 1)) * 100}%`;
                        const top = `${100 - (val / maxVal) * 100}%`;
                        const isHovered = hoveredDataPoint?.index === idx;

                        return (
                          <div
                            key={idx}
                            style={{ left, top }}
                            onMouseEnter={() => {
                              playRetroSound('click');
                              setHoveredDataPoint({
                                index: idx,
                                val,
                                label: `J${idx + 1}: ${val} ${currentMetric.unit}`,
                              });
                            }}
                            onMouseLeave={() => setHoveredDataPoint(null)}
                            className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0284c7] border-2 border-white cursor-pointer hover:scale-150 hover:bg-[#ff4d00] transition-all flex items-center justify-center shadow"
                          />
                        );
                      })}

                      {/* Floating Tooltip */}
                      {hoveredDataPoint && (
                        <div
                          style={{
                            left: `${(hoveredDataPoint.index / (currentMetric.values.length - 1)) * 100}%`,
                            top: `${100 - (hoveredDataPoint.val / maxVal) * 100}%`,
                          }}
                          className="absolute -translate-x-1/2 -translate-y-9 bg-black/90 text-white font-mono-code text-[10px] font-bold px-2 py-0.5 rounded border border-[#ffde59] shadow-lg pointer-events-none z-20 whitespace-nowrap animate-bounce"
                        >
                          {hoveredDataPoint.label}
                        </div>
                      )}
                    </div>

                    {/* X-axis labels */}
                    <div className="ml-6 flex justify-between text-[9px] font-mono-code font-bold text-slate-600 mt-1">
                      {['J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7', 'J8', 'J9', 'J10'].map((j) => (
                        <span key={j}>{j}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: SHOT DISTRIBUTION with hoverable segments */}
                <div className="comic-interactive-card lg:col-span-4 bg-white border-2 border-black p-3.5 shadow-[3px_3px_0_#000] flex flex-col justify-between">
                  <h3 className="font-bebas text-lg text-black tracking-wide uppercase border-b-2 border-black pb-2">
                    SHOT DISTRIBUTION
                  </h3>

                  <div className="flex items-center justify-around my-2">
                    {/* Donut graphic */}
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        {/* 2PT: 52% (Blue) */}
                        <circle
                          cx="18"
                          cy="18"
                          r="15.915"
                          fill="none"
                          stroke={hoveredDonutSegment === '2pt' ? '#38bdf8' : '#0284c7'}
                          strokeWidth={hoveredDonutSegment === '2pt' ? '6.5' : '5'}
                          strokeDasharray="52 48"
                          strokeDashoffset="0"
                          className="cursor-pointer transition-all"
                          onMouseEnter={() => setHoveredDonutSegment('2pt')}
                          onMouseLeave={() => setHoveredDonutSegment(null)}
                        />
                        {/* 3PT: 38% (Orange) */}
                        <circle
                          cx="18"
                          cy="18"
                          r="15.915"
                          fill="none"
                          stroke={hoveredDonutSegment === '3pt' ? '#fb923c' : '#f97316'}
                          strokeWidth={hoveredDonutSegment === '3pt' ? '6.5' : '5'}
                          strokeDasharray="38 62"
                          strokeDashoffset="-52"
                          className="cursor-pointer transition-all"
                          onMouseEnter={() => setHoveredDonutSegment('3pt')}
                          onMouseLeave={() => setHoveredDonutSegment(null)}
                        />
                        {/* FT: 10% (Green) */}
                        <circle
                          cx="18"
                          cy="18"
                          r="15.915"
                          fill="none"
                          stroke={hoveredDonutSegment === 'ft' ? '#4ade80' : '#22c55e'}
                          strokeWidth={hoveredDonutSegment === 'ft' ? '6.5' : '5'}
                          strokeDasharray="10 90"
                          strokeDashoffset="-90"
                          className="cursor-pointer transition-all"
                          onMouseEnter={() => setHoveredDonutSegment('ft')}
                          onMouseLeave={() => setHoveredDonutSegment(null)}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-1">
                        <span className="text-[7px] font-mono-code uppercase text-slate-500 font-bold">TOTAL SHOTS</span>
                        <span className="font-bebas text-lg font-bold leading-none text-black">12.6</span>
                        <span className="text-[7px] font-mono-code uppercase text-slate-500">PER GAME</span>
                      </div>
                    </div>

                    {/* Legend with hover highlight */}
                    <div className="space-y-1.5 text-xs font-mono-code font-bold">
                      <div 
                        onMouseEnter={() => setHoveredDonutSegment('2pt')}
                        onMouseLeave={() => setHoveredDonutSegment(null)}
                        className={`flex items-center gap-2 cursor-pointer p-1 rounded ${hoveredDonutSegment === '2pt' ? 'bg-sky-100 font-black' : ''}`}
                      >
                        <span className="w-3 h-3 rounded-full bg-[#0284c7]" />
                        <span>2PT: 52%</span>
                      </div>
                      <div 
                        onMouseEnter={() => setHoveredDonutSegment('3pt')}
                        onMouseLeave={() => setHoveredDonutSegment(null)}
                        className={`flex items-center gap-2 cursor-pointer p-1 rounded ${hoveredDonutSegment === '3pt' ? 'bg-orange-100 font-black' : ''}`}
                      >
                        <span className="w-3 h-3 rounded-full bg-[#f97316]" />
                        <span>3PT: 38%</span>
                      </div>
                      <div 
                        onMouseEnter={() => setHoveredDonutSegment('ft')}
                        onMouseLeave={() => setHoveredDonutSegment(null)}
                        className={`flex items-center gap-2 cursor-pointer p-1 rounded ${hoveredDonutSegment === 'ft' ? 'bg-emerald-100 font-black' : ''}`}
                      >
                        <span className="w-3 h-3 rounded-full bg-[#22c55e]" />
                        <span>FT: 10%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. CHARTS ROW 2: Shot Chart + Heat Map */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                
                {/* Left: SHOT CHART with Clickable Shot Markers */}
                <div className="comic-interactive-card lg:col-span-6 bg-white border-2 border-black p-3.5 shadow-[3px_3px_0_#000]">
                  <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-2">
                    <h3 className="font-bebas text-lg text-black tracking-wide uppercase">
                      SHOT CHART (CLICK ANY SHOT)
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-mono-code font-bold">
                      <button
                        onClick={() => { playRetroSound('click'); setShotFilter('all'); }}
                        className={`px-1.5 py-0.5 rounded cursor-pointer ${shotFilter === 'all' ? 'bg-black text-white' : 'hover:bg-slate-200'}`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => { playRetroSound('click'); setShotFilter('made'); }}
                        className={`px-1.5 py-0.5 rounded cursor-pointer text-emerald-700 ${shotFilter === 'made' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-200'}`}
                      >
                        ● Made
                      </button>
                      <button
                        onClick={() => { playRetroSound('click'); setShotFilter('missed'); }}
                        className={`px-1.5 py-0.5 rounded cursor-pointer text-rose-600 ${shotFilter === 'missed' ? 'bg-rose-600 text-white' : 'hover:bg-slate-200'}`}
                      >
                        ✕ Missed
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    {/* Basketball half-court */}
                    <div className="sm:col-span-8 bg-[#1e3a5f] rounded border-2 border-black aspect-[4/3] relative overflow-hidden flex items-center justify-center p-2">
                      <div className="w-24 h-28 border border-white/60 absolute top-0" />
                      <div className="w-16 h-16 rounded-full border border-white/60 absolute top-20" />
                      <div className="w-48 h-48 rounded-full border border-white/40 absolute -top-8" />
                      <div className="w-8 h-8 rounded-full border-2 border-orange-500 absolute top-4 bg-orange-500/20" />

                      {/* Interactive Plotted Shot Points */}
                      {filteredShots.map((pt, i) => (
                        <div
                          key={i}
                          style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                          onClick={() => {
                            playRetroSound('click');
                            setSelectedShot({
                              x: pt.x,
                              y: pt.y,
                              made: pt.made,
                              desc: pt.made ? 'MADE: 16ft Pull-up Jumper (+2 PTS)' : 'MISSED: 24ft 3PT Attempt from wing',
                            });
                          }}
                          className={`absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-black text-xs cursor-pointer hover:scale-175 transition-all ${
                            pt.made ? 'text-emerald-400 hover:text-emerald-200' : 'text-rose-500 hover:text-rose-300'
                          }`}
                        >
                          {pt.made ? '●' : '✕'}
                        </div>
                      ))}

                      {/* Selected Shot Callout */}
                      {selectedShot && (
                        <div className="absolute bottom-2 left-2 right-2 bg-black/90 text-white border border-[#ffde59] p-1.5 rounded text-[10px] font-mono-code font-bold flex items-center justify-between animate-in fade-in">
                          <span>{selectedShot.desc}</span>
                          <button onClick={() => setSelectedShot(null)} className="text-yellow-400 ml-2">✕</button>
                        </div>
                      )}
                    </div>

                    {/* Percentages Table */}
                    <div className="sm:col-span-4 flex flex-col justify-between text-xs font-mono-code font-bold">
                      <div className="space-y-1.5 divide-y divide-black/10">
                        <div className="flex justify-between py-0.5">
                          <span className="text-slate-600">FG:</span>
                          <span className="text-black font-black">{LUCAS_MARTIN.shootingStats.fg}</span>
                        </div>
                        <div className="flex justify-between py-0.5">
                          <span className="text-slate-600">2PT:</span>
                          <span className="text-black font-black">{LUCAS_MARTIN.shootingStats.twoPt}</span>
                        </div>
                        <div className="flex justify-between py-0.5">
                          <span className="text-slate-600">3PT:</span>
                          <span className="text-black font-black">{LUCAS_MARTIN.shootingStats.threePt}</span>
                        </div>
                        <div className="flex justify-between py-0.5">
                          <span className="text-slate-600">FT:</span>
                          <span className="text-black font-black">{LUCAS_MARTIN.shootingStats.ft}</span>
                        </div>
                      </div>

                      <select className="mt-2 text-[10px] font-mono-code p-1 border border-black bg-slate-50 rounded">
                        <option>Last 10 games</option>
                        <option>Full Season 2025-26</option>
                        <option>Playoff Series</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Right: HEAT MAP with Mode Toggle */}
                <div className="comic-interactive-card lg:col-span-6 bg-white border-2 border-black p-3.5 shadow-[3px_3px_0_#000]">
                  <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-2">
                    <h3 className="font-bebas text-lg text-black tracking-wide uppercase">
                      HEAT MAP ({heatMapMode.toUpperCase()})
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono-code">
                      <span>Low</span>
                      <div className="w-16 h-2 rounded bg-gradient-to-r from-blue-500 via-yellow-400 to-red-600" />
                      <span>High</span>
                    </div>
                  </div>

                  {/* Full Court Heat Graphic */}
                  <div className="bg-[#1e3a5f] rounded border-2 border-black aspect-[16/9] relative overflow-hidden flex items-center justify-center p-2">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-amber-500 to-red-600 opacity-80" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(239,68,68,0.9),_transparent_40%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(239,68,68,0.9),_transparent_40%)]" />

                    <div className="w-full h-full border border-white/60 relative">
                      <div className="w-[1px] h-full bg-white/60 absolute left-1/2" />
                      <div className="w-14 h-14 rounded-full border border-white/60 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      <div className="w-20 h-24 border border-white/60 absolute left-0 top-1/2 -translate-y-1/2" />
                      <div className="w-20 h-24 border border-white/60 absolute right-0 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {/* Mode Toggle with sound */}
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <button
                      onClick={() => { playRetroSound('click'); setHeatMapMode('offense'); }}
                      className={`px-3 py-1 font-bebas text-xs uppercase tracking-wider border border-black cursor-pointer transition-colors ${
                        heatMapMode === 'offense' ? 'bg-[#0284c7] text-white font-bold' : 'bg-slate-100 text-black hover:bg-slate-200'
                      }`}
                    >
                      Offense (Scoring Heat)
                    </button>
                    <button
                      onClick={() => { playRetroSound('click'); setHeatMapMode('defense'); }}
                      className={`px-3 py-1 font-bebas text-xs uppercase tracking-wider border border-black cursor-pointer transition-colors ${
                        heatMapMode === 'defense' ? 'bg-[#0284c7] text-white font-bold' : 'bg-slate-100 text-black hover:bg-slate-200'
                      }`}
                    >
                      Defense (Contested Density)
                    </button>
                  </div>
                </div>
              </div>

              {/* 6. ROW 3: GAME LOGS (CLICKABLE ROWS) + KEY INSIGHTS */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                
                {/* Left: GAME LOGS (Clickable rows open box score) */}
                <div className="comic-interactive-card lg:col-span-7 bg-white border-2 border-black p-3.5 shadow-[3px_3px_0_#000] flex flex-col justify-between">
                  <div>
                    <h3 className="font-bebas text-lg text-black tracking-wide uppercase border-b-2 border-black pb-1.5 mb-2">
                      GAME LOGS (CLICK ROW FOR BOX SCORE)
                    </h3>

                    <div className="overflow-x-auto text-xs font-mono-code font-bold">
                      <table className="w-full text-center border-collapse">
                        <thead>
                          <tr className="border-b-2 border-black bg-slate-100 text-slate-800 text-[10px]">
                            <th className="py-1 px-1.5 text-left">DATE</th>
                            <th className="text-left">OPPONENT</th>
                            <th>MIN</th>
                            <th>PTS</th>
                            <th>REB</th>
                            <th>AST</th>
                            <th>EFF</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-black/15 text-slate-900">
                          {LUCAS_MARTIN.gameLogs.map((log, i) => (
                            <tr 
                              key={i} 
                              onClick={() => {
                                playRetroSound('click');
                                setSelectedGameLog(log);
                              }}
                              className="hover:bg-yellow-100/70 cursor-pointer transition-colors"
                              title="Click to view detailed box score"
                            >
                              <td className="py-1.5 px-1.5 text-left text-slate-600">{log.date}</td>
                              <td className="text-left font-bold">{log.opponent}</td>
                              <td>{log.min}</td>
                              <td className="font-black text-[#0284c7]">{log.pts}</td>
                              <td>{log.reb}</td>
                              <td>{log.ast}</td>
                              <td className="text-emerald-700 font-bold">{log.eff}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      playRetroSound('click');
                      onShowToast('Full 32-game season logs loaded for Lucas Martín');
                    }}
                    className="mt-2 text-left font-bebas text-xs text-[#0284c7] hover:underline uppercase tracking-wide cursor-pointer"
                  >
                    View all 32 games →
                  </button>
                </div>

                {/* Right: KEY INSIGHTS */}
                <div className="comic-interactive-card lg:col-span-5 bg-white border-2 border-black p-3.5 shadow-[3px_3px_0_#000]">
                  <h3 className="font-bebas text-lg text-black tracking-wide uppercase border-b-2 border-black pb-1.5 mb-2.5">
                    KEY INSIGHTS
                  </h3>

                  <div className="space-y-2.5 text-xs font-medium">
                    {LUCAS_MARTIN.insights.map((ins, i) => (
                      <div 
                        key={i} 
                        onClick={() => {
                          playRetroSound('click');
                          onShowToast(`Insight: ${ins.title}`);
                        }}
                        className="flex items-start gap-2.5 bg-slate-50 border border-black/20 p-2 rounded-xs hover:bg-yellow-50 cursor-pointer transition-colors"
                      >
                        <div className="w-7 h-7 rounded bg-[#ffde59] text-black font-bold flex items-center justify-center shrink-0 border border-black mt-0.5">
                          <Target size={14} />
                        </div>
                        <div>
                          <span className="font-bebas text-xs text-black block tracking-wide">
                            {ins.title}
                          </span>
                          <span className="text-[11px] text-slate-700 leading-snug block">
                            {ins.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* 7. BOTTOM CALLOUT BANNER: "MORE DATA. MORE INSIGHTS." */}
              <div className="comic-interactive-card border-3 border-black bg-[#122b55] text-white p-3.5 sm:p-5 rounded-md shadow-[4px_4px_0_#000] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-[#ff4d00] text-white flex items-center justify-center font-bebas text-2xl border-2 border-black shrink-0">
                    #23
                  </div>
                  <div>
                    <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wider leading-none">
                      MORE DATA. MORE INSIGHTS.
                    </h3>
                    <p className="text-xs text-sky-200 mt-1">
                      Unlock advanced analysis, compare players, and discover the stories behind the numbers.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    playRetroSound('burst');
                    onShowToast('Advanced Synergy Matrix & Shot Profiles Unlocked!');
                  }}
                  className="btn-comic-yellow px-5 py-2.5 text-xs sm:text-sm font-bebas uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-[3px_3px_0_#000] shrink-0 active:translate-y-0.5"
                >
                  <span>EXPLORE ADVANCED STATS</span>
                  <ArrowRight size={16} strokeWidth={2.5} />
                </button>
              </div>

            </main>
          </div>

        </div>
      </div>

      {/* Game Log Box Score Modal */}
      {selectedGameLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-[#faf6ed] border-4 border-black rounded-lg shadow-[8px_8px_0_#000] p-5">
            <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-3">
              <span className="font-bebas text-xl text-[#0284c7] uppercase">
                {selectedGameLog.opponent} ({selectedGameLog.date})
              </span>
              <button
                onClick={() => {
                  playRetroSound('click');
                  setSelectedGameLog(null);
                }}
                className="w-7 h-7 bg-white text-black font-black border border-black hover:bg-yellow-300 flex items-center justify-center cursor-pointer rounded"
              >
                <X size={18} strokeWidth={3} />
              </button>
            </div>

            <div className="space-y-3 font-mono-code text-xs">
              <div className="grid grid-cols-4 gap-2 text-center bg-white border-2 border-black p-3 rounded">
                <div>
                  <span className="text-[10px] text-slate-500 block">PTS</span>
                  <span className="font-bebas text-2xl text-black">{selectedGameLog.pts}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">REB</span>
                  <span className="font-bebas text-2xl text-black">{selectedGameLog.reb}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">AST</span>
                  <span className="font-bebas text-2xl text-black">{selectedGameLog.ast}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">EFF</span>
                  <span className="font-bebas text-2xl text-emerald-700">{selectedGameLog.eff}</span>
                </div>
              </div>

              <div className="p-3 bg-yellow-50 border border-black/30 rounded text-slate-800 text-[11px] space-y-1">
                <div>● Minutes Played: {selectedGameLog.min} MIN</div>
                <div>● Field Goals: 8/14 (57.1% FG)</div>
                <div>● 3-Point Shots: 4/7 (57.1% 3PT)</div>
                <div>● Free Throws: 2/2 (100% FT)</div>
              </div>
            </div>

            <button
              onClick={() => setSelectedGameLog(null)}
              className="mt-4 w-full btn-comic-blue py-2 font-bebas text-xs uppercase cursor-pointer"
            >
              CLOSE BOX SCORE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
