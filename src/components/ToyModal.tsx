import React, { useState } from 'react';
import { X, ShoppingCart, Sparkles, Check, Battery, ExternalLink } from 'lucide-react';
import { ToyItem } from '../data/catalogueData';
import { StarburstBadge } from './StarburstBadge';
import { playRetroSound } from '../utils/audio';

interface ToyModalProps {
  toy: ToyItem | null;
  onClose: () => void;
  onAddToCart: (toy: ToyItem, qty: number) => void;
  onOpenFullPage?: (toy: ToyItem) => void;
}

export const ToyModal: React.FC<ToyModalProps> = ({
  toy,
  onClose,
  onAddToCart,
  onOpenFullPage,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!toy) return null;

  const handleAdd = () => {
    playRetroSound('cart');
    setAdded(true);
    onAddToCart(toy, quantity);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-[#f5f3ec] border-3 border-black shadow-[8px_8px_0_#000] overflow-hidden">
        {/* Top retro window title bar */}
        <div className="bg-[#dc1f1f] text-white border-b-2 border-black px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-[#ffdf00] text-black font-mono-code font-bold text-xs px-2 py-0.5 border border-black">
              {toy.stockCode}
            </span>
            <span className="font-display text-sm tracking-wide text-white uppercase">
              CATALOGUE SPEC SHEET
            </span>
          </div>

          <button
            onClick={() => {
              playRetroSound('click');
              onClose();
            }}
            className="w-7 h-7 bg-white text-black font-black border border-black hover:bg-yellow-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} strokeWidth={3} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Left Column: Image with background & price starburst */}
          <div className="flex flex-col items-center justify-center">
            <div
              className={`relative w-full aspect-square ${toy.bgTone} border-2 border-black flex items-center justify-center p-4 shadow-[3px_3px_0_#000] cursor-pointer group`}
              onClick={() => {
                if (onOpenFullPage) {
                  playRetroSound('click');
                  onOpenFullPage(toy);
                }
              }}
              title="Click to view full dedicated page"
            >
              <img
                src={toy.image}
                alt={toy.name}
                className="w-full h-full object-contain filter contrast-110 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />

              <div className="absolute -top-3 -right-3">
                <StarburstBadge
                  points={14}
                  innerRadius={36}
                  outerRadius={50}
                  fillColor="#ffdf00"
                  strokeColor="#000000"
                  strokeWidth={2}
                  className="w-16 h-16"
                  rotate={6}
                >
                  <span className="font-display text-xs text-black font-black leading-none">
                    {toy.price}
                  </span>
                </StarburstBadge>
              </div>
            </div>

            <div className="mt-3 text-center w-full">
              <span className="font-mono-code text-[11px] text-slate-700 bg-white border border-black px-2 py-1 block shadow-[1px_1px_0_#000]">
                AUTHENTIC RETRO 1985 PACKAGING
              </span>
            </div>
          </div>

          {/* Right Column: Toy details & specs */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#0a48b9] text-white text-[10px] font-black uppercase px-2 py-0.5 border border-black">
                  {toy.category}
                </span>
                <span className="text-xs font-bold text-slate-600">
                  {toy.age}
                </span>
              </div>

              <h2 className="font-display text-2xl text-black uppercase tracking-tight mt-1.5 leading-tight">
                {toy.name}
              </h2>

              <p className="text-xs text-slate-800 font-medium leading-relaxed mt-2.5">
                {toy.description}
              </p>

              {/* Key Features */}
              <div className="mt-3 bg-white border-2 border-black p-2.5 shadow-[2px_2px_0_#000]">
                <span className="font-display text-[11px] uppercase tracking-wider block border-b border-black/20 pb-1 mb-1.5 text-[#0a48b9]">
                  KEY TOY FEATURES:
                </span>
                <ul className="text-[11px] space-y-1 font-semibold text-slate-800">
                  {toy.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <Sparkles size={12} className="text-[#de1f27] shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Battery Req */}
              <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                <Battery size={13} className="text-slate-700 shrink-0" />
                <span>{toy.batteryReq}</span>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="mt-4 pt-3 border-t-2 border-black space-y-2">
              <div className="flex items-center justify-between mb-2">
                <span className="font-display text-xs uppercase text-slate-900">
                  QUANTITY:
                </span>
                <div className="flex items-center border-2 border-black bg-white shadow-[2px_2px_0_#000]">
                  <button
                    onClick={() => {
                      playRetroSound('click');
                      setQuantity(Math.max(1, quantity - 1));
                    }}
                    className="w-7 h-7 font-black text-sm flex items-center justify-center hover:bg-yellow-200 border-r border-black cursor-pointer active:bg-yellow-400"
                  >
                    -
                  </button>
                  <span className="font-mono-code font-bold text-xs px-3">
                    {quantity}
                  </span>
                  <button
                    onClick={() => {
                      playRetroSound('click');
                      setQuantity(quantity + 1);
                    }}
                    className="w-7 h-7 font-black text-sm flex items-center justify-center hover:bg-yellow-200 border-l border-black cursor-pointer active:bg-yellow-400"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Primary Add to Order button */}
              <button
                onClick={handleAdd}
                disabled={added}
                className="w-full btn-retro-yellow py-2.5 px-4 font-display text-sm tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-[3px_4px_0_#000]"
              >
                {added ? (
                  <>
                    <Check size={18} strokeWidth={3} className="text-emerald-700" />
                    <span>ORDER ADDED!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} strokeWidth={2.5} />
                    <span>ADD TO ORDER • £{(toy.numericPrice * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>

              {/* View Full Product Page button */}
              {onOpenFullPage && (
                <button
                  onClick={() => {
                    playRetroSound('click');
                    onOpenFullPage(toy);
                  }}
                  className="w-full btn-retro-blue py-2 px-3 font-display text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-[2px_2px_0_#000]"
                >
                  <span>VIEW FULL DEDICATED PAGE</span>
                  <ExternalLink size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
