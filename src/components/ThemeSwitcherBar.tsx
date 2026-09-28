import React from 'react';
import { Sparkles, Flame, Shield, Activity, User } from 'lucide-react';
import { playRetroSound } from '../utils/audio';

export type AppTheme = 'hoopspulse' | 'hoopspulse_player' | 'novaplay' | 'gearheads' | 'waxpack';

interface ThemeSwitcherBarProps {
  currentTheme: AppTheme;
  onSelectTheme: (theme: AppTheme) => void;
}

export const ThemeSwitcherBar: React.FC<ThemeSwitcherBarProps> = ({
  currentTheme,
  onSelectTheme,
}) => {
  return (
    <div className="sticky top-0 z-50 bg-[#0a0a0a] text-white border-b-4 border-yellow-400 py-2.5 px-3 sm:px-6 shadow-[0_4px_20px_rgba(0,0,0,0.8)] select-none">
      <div className="max-w-[1480px] mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left Badge */}
        <div className="flex items-center gap-2">
          <span className="bg-[#ff4d00] text-white font-black px-2 py-1 text-xs tracking-wider uppercase rounded-xs shadow">
            🔥 SELECTOR DE PROYECTOS / DISEÑOS 🔥
          </span>
          <span className="hidden md:inline text-yellow-300 font-bold text-xs">
            Haz clic en los botones para cambiar de pantalla:
          </span>
        </div>

        {/* Buttons List */}
        <div className="flex items-center gap-1.5 bg-black/80 p-1 rounded-sm border-2 border-white/30 flex-wrap">
          {/* 1. Wax Pack Club (Basketball Cards) */}
          <button
            onClick={() => {
              playRetroSound('card');
              onSelectTheme('waxpack');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-xs transition-all cursor-pointer ${
              currentTheme === 'waxpack'
                ? 'bg-[#b91c1c] text-white shadow-[0_0_12px_rgba(185,28,28,0.8)] ring-2 ring-yellow-400 scale-105'
                : 'bg-[#1a1a1a] text-slate-300 hover:text-white hover:bg-[#2a2a2a]'
            }`}
          >
            <Shield size={14} className="text-yellow-400 fill-yellow-400" />
            <span>🏀 WAX PACK CLUB (BASKETBALL)</span>
          </button>

          {/* 2. HoopsPulse Main Analytics Dashboard */}
          <button
            onClick={() => {
              playRetroSound('burst');
              onSelectTheme('hoopspulse');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-xs transition-all cursor-pointer ${
              currentTheme === 'hoopspulse'
                ? 'bg-[#0284c7] text-white shadow-[0_0_12px_rgba(2,132,199,0.8)] ring-2 ring-yellow-400 scale-105'
                : 'bg-[#1a1a1a] text-slate-300 hover:text-white hover:bg-[#2a2a2a]'
            }`}
          >
            <Activity size={14} className="text-[#ffde59]" />
            <span>🏀 HOOPSPULSE DASHBOARD</span>
          </button>

          {/* 3. Lucas Martín Player Profile */}
          <button
            onClick={() => {
              playRetroSound('click');
              onSelectTheme('hoopspulse_player');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-xs transition-all cursor-pointer ${
              currentTheme === 'hoopspulse_player'
                ? 'bg-[#ff4d00] text-white shadow-[0_0_12px_rgba(255,77,0,0.8)] ring-2 ring-yellow-400 scale-105'
                : 'bg-[#1a1a1a] text-slate-300 hover:text-white hover:bg-[#2a2a2a]'
            }`}
          >
            <User size={14} className="text-[#ffde59]" />
            <span>👤 LUCAS MARTÍN #23</span>
          </button>

          {/* 4. Nova Play Tab */}
          <button
            onClick={() => {
              playRetroSound('click');
              onSelectTheme('novaplay');
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-xs transition-all cursor-pointer ${
              currentTheme === 'novaplay'
                ? 'bg-[#0640b5] text-white shadow ring-2 ring-yellow-400 scale-105'
                : 'bg-[#1a1a1a] text-slate-300 hover:text-white hover:bg-[#2a2a2a]'
            }`}
          >
            <Sparkles size={14} className="text-[#ffdf00]" />
            <span>🤖 NOVA PLAY (TOYS)</span>
          </button>

          {/* 5. Graveyard Gearheads Tab */}
          <button
            onClick={() => {
              playRetroSound('rev');
              onSelectTheme('gearheads');
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-xs transition-all cursor-pointer ${
              currentTheme === 'gearheads'
                ? 'bg-[#6c2bd9] text-white shadow ring-2 ring-yellow-400 scale-105'
                : 'bg-[#1a1a1a] text-slate-300 hover:text-white hover:bg-[#2a2a2a]'
            }`}
          >
            <Flame size={14} className="text-[#ff5500]" />
            <span>🏎️ GEARHEADS</span>
          </button>
        </div>
      </div>
    </div>
  );
};
