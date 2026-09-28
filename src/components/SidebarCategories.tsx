import React, { useState } from 'react';
import { Bot, Car, Gamepad2, Sparkles, BookOpen, Percent, ChevronRight } from 'lucide-react';
import { StarburstBadge } from './StarburstBadge';
import { playRetroSound } from '../utils/audio';

interface SidebarCategoriesProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onQuickOrder: (code: string) => void;
  onShowToast: (msg: string) => void;
}

export const SidebarCategories: React.FC<SidebarCategoriesProps> = ({
  activeCategory,
  onSelectCategory,
  onQuickOrder,
  onShowToast,
}) => {
  const [quickCode, setQuickCode] = useState('');

  const categories = [
    { id: 'robots', label: 'ROBOTS', icon: Bot, color: 'bg-[#0a48b9]', text: 'text-white' },
    { id: 'vehicles', label: 'VEHICLES', icon: Car, color: 'bg-[#dc1f1f]', text: 'text-white' },
    { id: 'games', label: 'GAMES', icon: Gamepad2, color: 'bg-[#ffdf00]', text: 'text-black' },
    { id: 'accessories', label: 'ACCESSORIES', icon: Sparkles, color: 'bg-[#0a48b9]', text: 'text-white' },
    { id: 'catalogue', label: 'CATALOGUE', icon: BookOpen, color: 'bg-[#dc1f1f]', text: 'text-white' },
    { id: 'deals', label: '% DEALS', icon: Percent, color: 'bg-[#ffdf00]', text: 'text-black' },
  ];

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickCode.trim()) {
      playRetroSound('click');
      onShowToast('Please enter a catalogue stock code (e.g. STK 3157)');
      return;
    }
    playRetroSound('cart');
    onQuickOrder(quickCode.trim());
    setQuickCode('');
  };

  return (
    <aside className="w-full lg:w-72 shrink-0 flex flex-col justify-between h-full gap-2.5">
      {/* Brand Badge Box */}
      <div className="bg-[#f5f3ec] border-2 border-black p-3.5 flex flex-col items-center justify-center text-center shadow-[3px_3px_0_#000]">
        <div
          onClick={() => {
            playRetroSound('burst');
            onSelectCategory('all');
            onShowToast('Welcome to NOVA PLAY 1985 Catalogue!');
          }}
          className="cursor-pointer group transform hover:scale-105 transition-transform"
        >
          <StarburstBadge
            points={16}
            innerRadius={36}
            outerRadius={50}
            fillColor="#ffdf00"
            strokeColor="#000000"
            strokeWidth={2.5}
            className="w-36 h-36 sm:w-40 sm:h-40 drop-shadow-[3px_4px_0_rgba(0,0,0,0.9)]"
            rotate={-2}
          >
            <div className="flex flex-col items-center justify-center -space-y-1">
              <span className="font-display text-3xl sm:text-4xl text-[#0b47b8] tracking-tighter drop-shadow-[1px_1px_0_#fff]">
                NOVA
              </span>
              <span className="font-display text-3xl sm:text-4xl text-[#dc1f1f] tracking-tighter drop-shadow-[1px_1px_0_#fff]">
                PLAY
              </span>
            </div>
          </StarburstBadge>
        </div>

        <div className="mt-2">
          <p className="font-display text-sm sm:text-base tracking-wide text-[#0b47b8] leading-tight">
            AWESOME TOYS.
          </p>
          <p className="font-display text-sm sm:text-base tracking-wide text-[#0b47b8] leading-tight">
            SERIOUS FUN.
          </p>
        </div>
      </div>

      {/* Category Section */}
      <div className="border-2 border-black bg-[#f5f3ec] overflow-hidden shadow-[3px_3px_0_#000] flex-1 flex flex-col">
        {/* Yellow Header Bar */}
        <div className="bg-[#ffdf00] border-b-2 border-black py-1.5 px-4 text-center shrink-0">
          <h2 className="font-display text-xs sm:text-sm tracking-wider text-black">
            SHOP BY CATEGORY
          </h2>
        </div>

        {/* Category list items */}
        <div className="divide-y-2 divide-black/80 flex-1 flex flex-col justify-around">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  playRetroSound('click');
                  onSelectCategory(cat.id);
                  onShowToast(`Viewing ${cat.label} category!`);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 transition-all text-left group cursor-pointer ${
                  isSelected
                    ? 'bg-[#ffe852] font-black'
                    : 'bg-[#faf8f2] hover:bg-[#ede9dc]'
                } active:translate-x-1`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-full ${cat.color} ${cat.text} flex items-center justify-center border border-black shadow-[1px_1px_0_#000] shrink-0 group-hover:scale-110 transition-transform`}
                  >
                    <Icon size={15} strokeWidth={2.5} />
                  </div>
                  <span className="font-black text-xs sm:text-sm tracking-wide text-black">
                    {cat.label}
                  </span>
                </div>

                <ChevronRight
                  size={16}
                  className={`text-black transition-transform group-hover:translate-x-1 ${
                    isSelected ? 'font-black scale-125' : ''
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Catalogue Quick Order Box */}
      <div className="bg-[#0b3b95] border-2 border-black text-white p-3.5 shadow-[3px_3px_0_#000] shrink-0">
        <h3 className="font-display text-xs sm:text-sm tracking-wide text-white uppercase">
          CATALOGUE QUICK ORDER
        </h3>
        <p className="text-[10px] text-blue-100 mt-0.5 font-medium leading-tight">
          Enter item code from the catalogue.
        </p>

        <form onSubmit={handleQuickSubmit} className="mt-2.5 flex flex-col gap-2">
          <input
            type="text"
            value={quickCode}
            onChange={(e) => setQuickCode(e.target.value.toUpperCase())}
            placeholder="ENTER CODE (e.g. STK 3157)"
            className="w-full bg-white text-black font-mono-code font-bold text-xs uppercase px-2.5 py-1.5 border-2 border-black rounded-none placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ffdf00]"
          />
          <button
            type="submit"
            className="btn-retro-yellow py-1.5 px-4 text-xs tracking-wider rounded-none uppercase font-display cursor-pointer"
          >
            ADD TO CART
          </button>
        </form>

        <div className="mt-2 pt-1.5 border-t border-blue-400/40 flex justify-between text-[10px] text-blue-200">
          <span>Popular: STK 3157</span>
          <button
            type="button"
            onClick={() => {
              playRetroSound('click');
              setQuickCode('STK 3157');
            }}
            className="underline hover:text-white cursor-pointer font-bold"
          >
            Fill Demo
          </button>
        </div>
      </div>
    </aside>
  );
};
