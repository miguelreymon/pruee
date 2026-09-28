import React, { useState } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { StarburstBadge } from './StarburstBadge';
import { HERO_TOY } from '../data/catalogueData';
import { playRetroSound } from '../utils/audio';

interface HeroSectionProps {
  onInspectToy: (toy: typeof HERO_TOY) => void;
  onAddToCart: (toy: typeof HERO_TOY) => void;
  onShowToast: (msg: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onInspectToy,
  onAddToCart,
  onShowToast,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: 'BUILT FOR BIG IMAGINATIONS!',
      subtitle: 'Rad robots, turbo vehicles and retro games for the next generation of legends.',
      badgeText: 'NEW STORMHAWK JET NOW IN!',
      jetSub: 'STORMHAWK SH-01 INTERCEPTOR',
    },
    {
      title: 'VARIABLE WING SUPER SPEED!',
      subtitle: 'Retractable gear, dual missile triggers & combat-ready tactical cockpit canopy.',
      badgeText: 'HOT 1985 RELEASE!',
      jetSub: 'STORMHAWK SH-01 WING MODE',
    },
    {
      title: 'DEFEND THE OUTER GALAXY!',
      subtitle: 'Heavy molded chassis tested for ultra-rugged carpet missions and backyard dogfights.',
      badgeText: 'COLLECTOR SPEC!',
      jetSub: 'STORMHAWK SH-01 RETRO CLASSIC',
    },
  ];

  const current = slides[activeSlide];

  return (
    <div className="relative bg-[#0947ba] border-2 border-black text-white p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[3px_3px_0_#000] h-full min-h-[480px]">
      {/* Background subtle retro halftone / grid overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none retro-halftone" />

      {/* Top Content Zone */}
      <div className="relative z-10 max-w-xl">
        <h1 className="font-display text-3xl sm:text-5xl lg:text-5xl xl:text-6xl tracking-tight leading-[1.05] text-white uppercase drop-shadow-[2px_2px_0_rgba(0,0,0,0.6)]">
          {current.title}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-blue-100 font-semibold max-w-lg leading-relaxed drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]">
          {current.subtitle}
        </p>

        {/* CTA Button */}
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() => {
              playRetroSound('burst');
              onInspectToy(HERO_TOY);
              onShowToast('Inspecting Stormhawk SH-01 Jet specifications!');
            }}
            className="btn-retro-yellow px-6 py-3 rounded-full text-xs sm:text-sm font-black tracking-wider uppercase inline-flex items-center gap-2 cursor-pointer shadow-[3px_4px_0_#000]"
          >
            <span>SHOP NEW ARRIVALS</span>
            <ChevronRight size={18} strokeWidth={3} />
          </button>

          <button
            onClick={() => {
              playRetroSound('cart');
              onAddToCart(HERO_TOY);
              onShowToast('Stormhawk SH-01 Jet added to your cart (£8.99)!');
            }}
            className="btn-retro-white px-5 py-3 rounded-full text-xs font-black uppercase inline-flex items-center gap-1.5 cursor-pointer shadow-[2px_3px_0_#000]"
          >
            <Sparkles size={14} className="text-amber-500" />
            <span>ORDER £8.99</span>
          </button>
        </div>
      </div>

      {/* Sticker burst */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-20 z-20">
        <div
          onClick={() => {
            playRetroSound('burst');
            onInspectToy(HERO_TOY);
          }}
          className="cursor-pointer group transform hover:rotate-6 transition-transform"
        >
          <StarburstBadge
            points={14}
            innerRadius={36}
            outerRadius={50}
            fillColor="#ffdf00"
            strokeColor="#000000"
            strokeWidth={2}
            className="w-28 h-28 sm:w-36 sm:h-36 drop-shadow-[3px_4px_0_rgba(0,0,0,0.8)]"
            rotate={8}
          >
            <span className="font-display text-[10px] sm:text-xs text-black leading-tight uppercase px-1">
              {current.badgeText}
            </span>
          </StarburstBadge>
        </div>
      </div>

      {/* Main Hero Toy Jet Image Container */}
      <div className="relative mt-4 sm:mt-2 lg:absolute lg:right-3 lg:bottom-4 lg:w-[50%] flex justify-center items-end z-10 pointer-events-auto">
        <div
          onClick={() => {
            playRetroSound('click');
            onInspectToy(HERO_TOY);
          }}
          className="cursor-pointer group relative transform transition-transform hover:scale-105 active:scale-95"
        >
          <img
            src={HERO_TOY.image}
            alt={HERO_TOY.name}
            className="w-full max-w-[460px] lg:max-w-[520px] object-contain drop-shadow-[0_18px_18px_rgba(0,0,0,0.65)] filter contrast-110"
            referrerPolicy="no-referrer"
          />

          <div className="absolute bottom-1 right-2 bg-black/70 text-white font-mono-code text-[10px] px-2 py-0.5 rounded border border-white/20 backdrop-blur-xs">
            SH-01 PROTOTYPE
          </div>
        </div>
      </div>

      {/* Bottom Pager Dots */}
      <div className="relative z-10 mt-6 pt-2 flex items-center gap-2">
        {[0, 1, 2].map((idx) => (
          <button
            key={idx}
            onClick={() => {
              playRetroSound('click');
              setActiveSlide(idx);
            }}
            className={`w-3.5 h-3.5 rounded-full border-2 border-black transition-all cursor-pointer ${
              activeSlide === idx
                ? 'bg-[#ffdf00] scale-125 shadow-[1px_1px_0_#000]'
                : 'bg-white hover:bg-yellow-200'
            }`}
            title={`Slide ${idx + 1}`}
          />
        ))}
        <span className="text-[10px] font-mono-code text-blue-200 ml-2 tracking-widest">
          CATALOGUE PAGE 04
        </span>
      </div>
    </div>
  );
};
