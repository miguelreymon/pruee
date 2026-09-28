import React from 'react';
import { Lock, RotateCcw, ChevronRight } from 'lucide-react';
import { COLLECTIONS } from '../data/catalogueData';
import { playRetroSound } from '../utils/audio';

interface ShopByCollectionProps {
  onSelectCollection: (colId: string) => void;
  onShowToast: (msg: string) => void;
}

export const ShopByCollection: React.FC<ShopByCollectionProps> = ({
  onSelectCollection,
  onShowToast,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-6">
      {/* Collections Shelf (8 cols) */}
      <div className="lg:col-span-8 flex flex-col border-2 border-black bg-[#f5f3ec] shadow-[3px_3px_0_#000]">
        {/* Red Bar Header */}
        <div className="bg-[#dc1f1f] border-b-2 border-black px-4 py-2.5 flex items-center justify-between">
          <h2 className="font-display text-sm tracking-wider text-white uppercase">
            SHOP BY COLLECTION
          </h2>
          <button
            onClick={() => {
              playRetroSound('click');
              onShowToast('Showing all catalogue collections!');
            }}
            className="btn-retro-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded-none tracking-wider cursor-pointer"
          >
            VIEW ALL COLLECTIONS
          </button>
        </div>

        {/* 3 Collection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 p-3 gap-3">
          {COLLECTIONS.map((col) => (
            <div
              key={col.id}
              onClick={() => {
                playRetroSound('burst');
                onSelectCollection(col.id);
                onShowToast(`Browsing ${col.title} collection!`);
              }}
              className="group relative bg-[#0947ba] border-2 border-black overflow-hidden cursor-pointer shadow-[2px_2px_0_#000] hover:-translate-y-1 hover:shadow-[3px_3px_0_#000] active:translate-y-0 transition-all flex flex-col"
            >
              {/* Header Title inside card */}
              <div className="p-3 pb-1 z-10">
                <span className="font-mono-code text-[10px] text-yellow-300 font-bold tracking-widest block uppercase">
                  {col.itemCount}
                </span>
                <h3 className="font-display text-base text-white uppercase tracking-tight leading-tight group-hover:text-[#ffdf00] transition-colors">
                  {col.title}
                </h3>
              </div>

              {/* Image */}
              <div className="relative w-full h-32 mt-auto overflow-hidden bg-black/20 flex items-center justify-center p-2">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-contain filter contrast-110 group-hover:scale-110 transition-transform duration-200"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Bottom bar */}
              <div className="bg-[#ffdf00] border-t-2 border-black py-1 px-3 flex items-center justify-between text-black text-[11px] font-black uppercase">
                <span>EXPLORE</span>
                <ChevronRight size={14} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Shop With Nova Play? (4 cols) */}
      <div className="lg:col-span-4 bg-[#093b95] border-2 border-black text-white p-4 flex flex-col justify-between shadow-[3px_3px_0_#000]">
        <div>
          <h2 className="font-display text-sm tracking-wider text-white uppercase border-b-2 border-blue-400/40 pb-2">
            WHY SHOP WITH NOVA PLAY?
          </h2>

          <div className="grid grid-cols-2 gap-3 mt-4">
            {/* Safe & Secure */}
            <div
              onClick={() => {
                playRetroSound('click');
                onShowToast('Bank-grade SSL encryption and secure checkout guaranteed.');
              }}
              className="bg-[#0e48b3] border border-blue-300/40 p-3 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-[#1353c7] transition-colors shadow-[2px_2px_0_#000]"
            >
              <div className="w-10 h-10 rounded-full bg-white text-[#093b95] flex items-center justify-center mb-2 border border-black shadow-[1px_1px_0_#000]">
                <Lock size={18} strokeWidth={2.5} />
              </div>
              <span className="font-display text-[11px] uppercase tracking-wide leading-tight text-white">
                SAFE & SECURE
              </span>
              <span className="text-[10px] text-blue-200 uppercase font-semibold">
                SHOPPING
              </span>
            </div>

            {/* Easy Returns */}
            <div
              onClick={() => {
                playRetroSound('click');
                onShowToast('30-day no-quibble returns on all unopened toy orders!');
              }}
              className="bg-[#0e48b3] border border-blue-300/40 p-3 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-[#1353c7] transition-colors shadow-[2px_2px_0_#000]"
            >
              <div className="w-10 h-10 rounded-full bg-white text-[#093b95] flex items-center justify-center mb-2 border border-black shadow-[1px_1px_0_#000]">
                <RotateCcw size={18} strokeWidth={2.5} />
              </div>
              <span className="font-display text-[11px] uppercase tracking-wide leading-tight text-white">
                EASY RETURNS
              </span>
              <span className="text-[10px] text-blue-200 uppercase font-semibold">
                30 DAY POLICY
              </span>
            </div>
          </div>
        </div>

        {/* Vintage Guarantee Seal */}
        <div className="mt-4 pt-3 border-t border-blue-400/40 flex items-center justify-between text-[11px] text-blue-200">
          <span className="font-mono-code">★ OFFICIAL 1985 CATALOGUE</span>
          <span className="bg-[#ffdf00] text-black font-black px-1.5 py-0.5 text-[9px] uppercase border border-black">
            STK CERTIFIED
          </span>
        </div>
      </div>
    </div>
  );
};
