import React from 'react';
import { HOT_TOYS, ToyItem } from '../data/catalogueData';
import { StarburstBadge } from './StarburstBadge';
import { playRetroSound } from '../utils/audio';

interface HotToysGridProps {
  onInspectToy: (toy: ToyItem) => void;
  onAddToCart: (toy: ToyItem) => void;
  onShowToast: (msg: string) => void;
}

export const HotToysGrid: React.FC<HotToysGridProps> = ({
  onInspectToy,
  onAddToCart,
  onShowToast,
}) => {
  // Exactly 3 columns x 2 rows (6 toys: Robo Warrior, Turbo Stinger, Beat Box, Power Play Pro, Robo Pup, Mega Maze)
  const displayedToys = HOT_TOYS.slice(0, 6);

  return (
    <div className="w-full flex-1 flex flex-col border-2 border-black bg-[#f5f3ec] shadow-[3px_3px_0_#000] justify-between">
      {/* Red Header Bar */}
      <div className="bg-[#dc1f1f] border-b-2 border-black px-4 py-2 flex items-center justify-between shrink-0">
        <h2 className="font-display text-xs sm:text-sm tracking-wider text-[#ffdf00] uppercase">
          HOT TOYS RIGHT NOW
        </h2>
        <button
          onClick={() => {
            playRetroSound('click');
            onShowToast('Showing all 250+ catalogue items in the full index!');
          }}
          className="btn-retro-white text-[10px] sm:text-[11px] font-black uppercase px-2 py-0.5 rounded-none tracking-wider cursor-pointer"
        >
          VIEW ALL
        </button>
      </div>

      {/* 3-Column x 2-Row Toy Grid */}
      <div className="grid grid-cols-3 p-2 gap-2 bg-[#f5f3ec] flex-1">
        {displayedToys.map((toy) => (
          <div
            key={toy.id}
            onClick={() => {
              playRetroSound('click');
              onInspectToy(toy);
            }}
            className="group relative bg-white border-2 border-black p-1.5 flex flex-col justify-between cursor-pointer transition-all duration-100 hover:-translate-y-0.5 hover:shadow-[2px_2px_0_#000] active:translate-y-0"
          >
            {/* Image container with colored backdrop */}
            <div
              className={`relative w-full aspect-square ${toy.bgTone} border border-black overflow-hidden flex items-center justify-center p-1.5`}
            >
              <img
                src={toy.image}
                alt={toy.name}
                className="w-full h-full object-contain filter contrast-105 group-hover:scale-105 transition-transform duration-150"
                referrerPolicy="no-referrer"
              />

              {/* Starburst Price Tag on bottom-right of image */}
              <div className="absolute -bottom-2 -right-2 z-10">
                <StarburstBadge
                  points={14}
                  innerRadius={36}
                  outerRadius={50}
                  fillColor="#ffdf00"
                  strokeColor="#000000"
                  strokeWidth={2}
                  className="w-11 h-11 sm:w-13 sm:h-13"
                  rotate={-4}
                >
                  <span className="font-display text-[9px] sm:text-[10px] text-black font-black leading-none tracking-tight">
                    {toy.price}
                  </span>
                </StarburstBadge>
              </div>
            </div>

            {/* Toy Labels */}
            <div className="mt-1.5 text-center">
              <h3 className="font-display text-[10px] sm:text-[11px] tracking-tight text-black uppercase leading-tight line-clamp-1 group-hover:text-[#0a48b9] transition-colors">
                {toy.name}
              </h3>
              <p className="font-mono-code text-[9px] text-slate-700 tracking-wider font-bold mt-0.5">
                {toy.stockCode}
              </p>
            </div>

            {/* Instant Add to Cart tactile button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                playRetroSound('cart');
                onAddToCart(toy);
                onShowToast(`Added ${toy.name} (${toy.stockCode}) to cart!`);
              }}
              className="mt-1 w-full btn-retro-yellow py-1 text-[9px] font-black uppercase rounded-none tracking-wider opacity-95 group-hover:opacity-100 flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>QUICK ORDER</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
