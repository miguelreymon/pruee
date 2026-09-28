import React from 'react';
import { Truck, Star, User, ShoppingCart, Volume2, VolumeX } from 'lucide-react';
import { playRetroSound } from '../utils/audio';

interface TopBarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onShowToast: (msg: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  cartCount,
  onOpenCart,
  onOpenAuth,
  soundEnabled,
  onToggleSound,
  onShowToast,
}) => {
  return (
    <header className="bg-[#f2efe6] border-b-2 border-black text-xs md:text-sm font-bold tracking-tight select-none">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left trust badges */}
        <div className="flex items-center gap-4 sm:gap-8 flex-wrap">
          {/* Delivery perk */}
          <button
            onClick={() => {
              playRetroSound('click');
              onShowToast('Free UK Delivery applied to orders over £25!');
            }}
            className="flex items-center gap-2 group cursor-pointer text-slate-900 hover:text-[#0640b5] transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-[#0640b5] text-white flex items-center justify-center shrink-0 border border-black shadow-[1px_1px_0_#000]">
              <Truck size={15} />
            </div>
            <div className="text-left leading-tight">
              <span className="block font-black text-[#0640b5] uppercase text-[11px] sm:text-xs">
                FREE UK DELIVERY
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-700 font-semibold">
                ON ORDERS OVER £25
              </span>
            </div>
          </button>

          {/* New toys perk */}
          <button
            onClick={() => {
              playRetroSound('burst');
              onShowToast('New 1980s catalogue stock arrivals loaded!');
            }}
            className="flex items-center gap-2 group cursor-pointer text-slate-900 hover:text-[#de1f27] transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-[#de1f27] text-white flex items-center justify-center shrink-0 border border-black shadow-[1px_1px_0_#000]">
              <Star size={15} className="fill-white" />
            </div>
            <div className="text-left leading-tight">
              <span className="block font-black text-[#de1f27] uppercase text-[11px] sm:text-xs">
                NEW TOYS ADDED
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-700 font-semibold">
                EVERY WEEK
              </span>
            </div>
          </button>
        </div>

        {/* Right utility actions */}
        <div className="flex items-center gap-3 sm:gap-6 ml-auto">
          {/* Sound FX toggle */}
          <button
            onClick={() => {
              onToggleSound();
              playRetroSound('click');
            }}
            title={soundEnabled ? 'Disable retro arcade click sounds' : 'Enable retro arcade click sounds'}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded border border-black/40 bg-white hover:bg-yellow-100 transition-colors shadow-[1px_1px_0_#000] cursor-pointer"
          >
            {soundEnabled ? (
              <>
                <Volume2 size={14} className="text-emerald-700" />
                <span className="text-[11px] uppercase tracking-wide">FX ON</span>
              </>
            ) : (
              <>
                <VolumeX size={14} className="text-slate-400" />
                <span className="text-[11px] uppercase tracking-wide text-slate-500">MUTED</span>
              </>
            )}
          </button>

          {/* User Sign In */}
          <button
            onClick={() => {
              playRetroSound('click');
              onOpenAuth();
            }}
            className="flex items-center gap-2 text-slate-900 hover:text-[#0640b5] cursor-pointer font-bold transition-transform active:translate-y-0.5"
          >
            <div className="w-7 h-7 rounded-full bg-[#0640b5] text-white flex items-center justify-center border border-black shadow-[1px_1px_0_#000]">
              <User size={15} />
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <span className="block uppercase text-[11px] font-black text-[#0640b5]">
                SIGN IN
              </span>
              <span className="text-[10px] text-slate-600 font-medium">
                OR CREATE ACCOUNT
              </span>
            </div>
          </button>

          {/* Cart with tactile counter */}
          <button
            onClick={() => {
              playRetroSound('cart');
              onOpenCart();
            }}
            className="btn-retro-white px-3 sm:px-4 py-1.5 flex items-center gap-2 rounded-sm cursor-pointer"
          >
            <ShoppingCart size={17} className="text-slate-900" />
            <span className="font-black text-xs uppercase tracking-wider">MY CART</span>
            <span className="bg-[#de1f27] text-white font-black text-xs px-2 py-0.5 rounded-full border border-black shadow-[1px_1px_0_#000] animate-pulse">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
