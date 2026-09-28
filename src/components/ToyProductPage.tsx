import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Sparkles, 
  Check, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Share2, 
  Heart, 
  Zap, 
  Box, 
  Award,
  ChevronRight,
  Star
} from 'lucide-react';
import { ToyItem, HOT_TOYS, HERO_TOY } from '../data/catalogueData';
import { StarburstBadge } from './StarburstBadge';
import { playRetroSound } from '../utils/audio';

interface ToyProductPageProps {
  toy: ToyItem;
  onBack: () => void;
  onAddToCart: (toy: ToyItem, qty: number) => void;
  onInspectOtherToy: (toy: ToyItem) => void;
  onShowToast: (msg: string) => void;
}

export const ToyProductPage: React.FC<ToyProductPageProps> = ({
  toy,
  onBack,
  onAddToCart,
  onInspectOtherToy,
  onShowToast,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedAngle, setSelectedAngle] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'lore' | 'reviews'>('specs');
  const [savedWishlist, setSavedWishlist] = useState(false);

  const angles = [
    { label: 'FRONT PATROL', desc: 'Full frontal combat view with twin blaster arms' },
    { label: 'ACTION POSE', desc: 'Walking stride and spark mechanism firing' },
    { label: 'ORIGINAL 1985 BOX', desc: 'Full color illustrated vintage window carton' },
    { label: 'SCHEMATIC DIAGRAM', desc: 'Internal gear train & battery compartment' },
  ];

  const handleAdd = () => {
    playRetroSound('cart');
    setAdded(true);
    onAddToCart(toy, quantity);
    onShowToast(`Added ${quantity}x ${toy.name} (${toy.stockCode}) to order!`);
    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  const relatedToys = [HERO_TOY, ...HOT_TOYS.filter((t) => t.id !== toy.id)].slice(0, 4);

  return (
    <div className="min-h-screen bg-[#ebe8de] text-slate-900 select-none pb-16 font-sans">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 py-4">
        
        {/* Navigation Breadcrumb Bar */}
        <div className="bg-[#f5f3ec] border-2 border-black p-3 mb-4 flex flex-wrap items-center justify-between gap-3 shadow-[3px_3px_0_#000]">
          <button
            onClick={() => {
              playRetroSound('click');
              onBack();
            }}
            className="btn-retro-white px-3.5 py-1.5 text-xs font-black uppercase inline-flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft size={16} strokeWidth={3} />
            <span>BACK TO CATALOGUE SPREAD</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs font-mono-code font-bold text-slate-700 overflow-x-auto">
            <span className="hover:underline cursor-pointer" onClick={onBack}>NOVA PLAY 1985</span>
            <span>&gt;</span>
            <span className="uppercase text-[#0a48b9]">{toy.category}</span>
            <span>&gt;</span>
            <span className="text-black bg-yellow-200 px-1.5 py-0.5 border border-black/30">
              {toy.stockCode}
            </span>
          </div>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* LEFT: Photography & Angles Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="bg-[#f5f3ec] border-3 border-black p-4 sm:p-6 shadow-[4px_4px_0_#000] relative">
              {/* Product Badge bar */}
              <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
                <div className="flex items-center gap-2">
                  <span className="bg-[#ffdf00] text-black font-mono-code font-bold text-xs px-2.5 py-1 border border-black shadow-[1px_1px_0_#000]">
                    {toy.stockCode}
                  </span>
                  <span className="font-display text-xs uppercase tracking-wide text-[#0a48b9]">
                    OFFICIAL DIE-CAST & CLOCKWORK SERIES
                  </span>
                </div>

                <button
                  onClick={() => {
                    playRetroSound('burst');
                    setSavedWishlist(!savedWishlist);
                    onShowToast(savedWishlist ? 'Removed from your Christmas Wishlist' : 'Saved to your 1985 Christmas Wishlist!');
                  }}
                  className={`p-1.5 border border-black transition-colors cursor-pointer ${
                    savedWishlist ? 'bg-red-500 text-white' : 'bg-white hover:bg-yellow-100'
                  }`}
                  title="Save to Christmas Wishlist"
                >
                  <Heart size={16} className={savedWishlist ? 'fill-white' : ''} />
                </button>
              </div>

              {/* Large Studio Display Box */}
              <div className={`relative w-full aspect-[4/3] ${toy.bgTone} border-2 border-black flex items-center justify-center p-6 overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]`}>
                <div className="absolute inset-0 opacity-10 pointer-events-none retro-halftone" />
                
                {/* Big Toy Photo */}
                <img
                  src={toy.image}
                  alt={toy.name}
                  className="w-full h-full max-h-[380px] object-contain filter contrast-110 drop-shadow-[0_20px_20px_rgba(0,0,0,0.6)] transform hover:scale-105 transition-transform duration-200"
                  referrerPolicy="no-referrer"
                />

                {/* Explosive Price Starburst */}
                <div className="absolute top-4 right-4 z-10">
                  <StarburstBadge
                    points={14}
                    innerRadius={36}
                    outerRadius={50}
                    fillColor="#ffdf00"
                    strokeColor="#000000"
                    strokeWidth={2}
                    className="w-20 h-20 sm:w-24 sm:h-24"
                    rotate={6}
                  >
                    <div className="leading-tight">
                      <span className="font-display text-xs sm:text-sm text-black font-black block">
                        {toy.price}
                      </span>
                      <span className="text-[8px] font-mono-code font-bold uppercase text-slate-800 block">
                        VAT INCL.
                      </span>
                    </div>
                  </StarburstBadge>
                </div>

                {/* Angle descriptor watermark */}
                <div className="absolute bottom-2 left-3 bg-black/75 text-white font-mono-code text-[10px] px-2.5 py-1 border border-white/20">
                  ANGLE: {angles[selectedAngle].label}
                </div>
              </div>

              {/* Interactive Angle Switcher Thumbnails */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                {angles.map((ang, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      playRetroSound('click');
                      setSelectedAngle(i);
                      onShowToast(`Switched view: ${ang.label}`);
                    }}
                    className={`p-2 border-2 border-black text-left cursor-pointer transition-all ${
                      selectedAngle === i
                        ? 'bg-[#ffe852] font-black shadow-[2px_2px_0_#000]'
                        : 'bg-white hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-display text-[10px] block leading-tight uppercase">
                      {ang.label}
                    </span>
                    <span className="font-mono-code text-[9px] text-slate-600 block truncate">
                      {ang.desc}
                    </span>
                  </button>
                ))}
              </div>

              {/* Packaging authenticity notice */}
              <div className="mt-3 bg-amber-50 border border-black/30 p-2.5 flex items-center gap-2 text-xs text-amber-950 font-medium">
                <Box size={16} className="text-[#0a48b9] shrink-0" />
                <span>Shipped in original 1985 illustrated window carton with styrofoam insert and warranty booklet.</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Ordering, Specs & Buy Box (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="bg-[#f5f3ec] border-3 border-black p-5 shadow-[4px_4px_0_#000]">
              {/* Category & Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="bg-[#0a48b9] text-white text-[10px] font-black uppercase px-2 py-0.5 border border-black">
                    {toy.category}
                  </span>
                  <span className="text-xs font-bold text-slate-700">
                    {toy.age}
                  </span>
                </div>

                <span className="bg-emerald-100 text-emerald-900 border border-emerald-400 font-mono-code font-bold text-[10px] px-2 py-0.5">
                  ● 42 UNITS IN LEEDS DEPOT
                </span>
              </div>

              {/* Product Title */}
              <h1 className="font-display text-3xl sm:text-4xl text-black uppercase tracking-tight mt-2 leading-[1.05]">
                {toy.name}
              </h1>

              {/* Price Row */}
              <div className="mt-3 flex items-baseline gap-3 border-b-2 border-black pb-3">
                <span className="font-display text-3xl text-[#dc1f1f]">
                  {toy.price}
                </span>
                <span className="font-mono-code text-sm text-slate-500 line-through">
                  £{(toy.numericPrice + 1.5).toFixed(2)}
                </span>
                <span className="bg-[#ffdf00] text-black font-black text-[10px] uppercase px-2 py-0.5 border border-black">
                  SAVE £1.50 THIS WEEK
                </span>
              </div>

              {/* Description */}
              <p className="mt-3 text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                {toy.description}
              </p>

              {/* Key Features Bullet List */}
              <div className="mt-4 bg-white border-2 border-black p-3 shadow-[2px_2px_0_#000]">
                <span className="font-display text-xs uppercase tracking-wider text-[#0a48b9] block border-b border-black/20 pb-1 mb-2">
                  KEY FEATURES & PLAY ACTION:
                </span>
                <ul className="text-xs space-y-1.5 font-semibold text-slate-800">
                  {toy.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Sparkles size={13} className="text-[#dc1f1f] shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                  <li className="flex items-center gap-2 text-slate-600 font-mono-code text-[11px]">
                    <Zap size={13} className="text-amber-600 shrink-0" />
                    <span>Battery Requirement: {toy.batteryReq}</span>
                  </li>
                </ul>
              </div>

              {/* Quantity Picker & Add to Order */}
              <div className="mt-5 pt-3 border-t-2 border-black">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display text-xs uppercase tracking-wider text-slate-900">
                    SELECT QUANTITY:
                  </span>
                  
                  <div className="flex items-center border-2 border-black bg-white shadow-[2px_2px_0_#000]">
                    <button
                      onClick={() => {
                        playRetroSound('click');
                        setQuantity(Math.max(1, quantity - 1));
                      }}
                      className="w-8 h-8 font-black text-sm flex items-center justify-center hover:bg-yellow-200 border-r border-black cursor-pointer active:bg-yellow-400"
                    >
                      -
                    </button>
                    <span className="font-mono-code font-bold text-xs px-4">
                      {quantity}
                    </span>
                    <button
                      onClick={() => {
                        playRetroSound('click');
                        setQuantity(quantity + 1);
                      }}
                      className="w-8 h-8 font-black text-sm flex items-center justify-center hover:bg-yellow-200 border-l border-black cursor-pointer active:bg-yellow-400"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Primary Add Button */}
                <button
                  onClick={handleAdd}
                  disabled={added}
                  className="w-full btn-retro-yellow py-3.5 px-5 font-display text-sm tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-[3px_4px_0_#000]"
                >
                  {added ? (
                    <>
                      <Check size={20} strokeWidth={3} className="text-emerald-700" />
                      <span>ORDER ADDED TO CART!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} strokeWidth={2.5} />
                      <span>ADD TO ORDER • £{(toy.numericPrice * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>

                {/* Secondary Quick Action */}
                <div className="grid grid-cols-2 gap-2 mt-2.5">
                  <button
                    onClick={() => {
                      playRetroSound('coin');
                      onAddToCart(toy, quantity);
                      onShowToast('Direct express dispatch initiated!');
                    }}
                    className="btn-retro-blue py-2 px-3 text-xs font-display uppercase tracking-wider text-center cursor-pointer shadow-[2px_2px_0_#000]"
                  >
                    EXPRESS DISPATCH
                  </button>

                  <button
                    onClick={() => {
                      playRetroSound('click');
                      onShowToast(`Catalogue postal token for ${toy.stockCode} generated!`);
                    }}
                    className="btn-retro-white py-2 px-3 text-xs font-display uppercase tracking-wider text-center cursor-pointer shadow-[2px_2px_0_#000]"
                  >
                    MAIL-ORDER FORM
                  </button>
                </div>
              </div>

              {/* Delivery & Trust Perks */}
              <div className="mt-4 pt-3 border-t border-black/20 space-y-2 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <Truck size={15} className="text-[#0a48b9]" />
                  <span>Free UK delivery on orders over £25</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw size={15} className="text-[#0a48b9]" />
                  <span>30-Day Money Back Guarantee (unopened packaging)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={15} className="text-[#0a48b9]" />
                  <span>British Toy Safety Standard BS 5665 Certified</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Detailed Tabs: Specs / Lore / 1985 Reviews */}
        <div className="mt-6 bg-[#f5f3ec] border-3 border-black shadow-[4px_4px_0_#000]">
          {/* Tab buttons */}
          <div className="flex border-b-2 border-black bg-slate-200">
            <button
              onClick={() => {
                playRetroSound('click');
                setActiveTab('specs');
              }}
              className={`py-2.5 px-5 font-display text-xs uppercase tracking-wider border-r-2 border-black cursor-pointer ${
                activeTab === 'specs' ? 'bg-[#f5f3ec] text-black font-black' : 'hover:bg-slate-300'
              }`}
            >
              TECHNICAL SPECIFICATIONS
            </button>
            <button
              onClick={() => {
                playRetroSound('click');
                setActiveTab('lore');
              }}
              className={`py-2.5 px-5 font-display text-xs uppercase tracking-wider border-r-2 border-black cursor-pointer ${
                activeTab === 'lore' ? 'bg-[#f5f3ec] text-black font-black' : 'hover:bg-slate-300'
              }`}
            >
              CATALOGUE LORE & PLAY GUIDE
            </button>
            <button
              onClick={() => {
                playRetroSound('click');
                setActiveTab('reviews');
              }}
              className={`py-2.5 px-5 font-display text-xs uppercase tracking-wider cursor-pointer ${
                activeTab === 'reviews' ? 'bg-[#f5f3ec] text-black font-black' : 'hover:bg-slate-300'
              }`}
            >
              1985 LETTERS TO THE EDITOR
            </button>
          </div>

          <div className="p-5">
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-white border-2 border-black p-3">
                  <span className="font-mono-code font-bold text-slate-500 uppercase block">DRIVE MECHANISM</span>
                  <span className="font-display text-sm text-black mt-1 block">Steel Clockwork Gear Train</span>
                </div>
                <div className="bg-white border-2 border-black p-3">
                  <span className="font-mono-code font-bold text-slate-500 uppercase block">CHASSIS MATERIAL</span>
                  <span className="font-display text-sm text-black mt-1 block">Heavy Gauge Tinplate & ABS</span>
                </div>
                <div className="bg-white border-2 border-black p-3">
                  <span className="font-mono-code font-bold text-slate-500 uppercase block">DIMENSIONS</span>
                  <span className="font-display text-sm text-black mt-1 block">9.5" H x 5.2" W x 4.0" D</span>
                </div>
                <div className="bg-white border-2 border-black p-3">
                  <span className="font-mono-code font-bold text-slate-500 uppercase block">STOCK REF</span>
                  <span className="font-display text-sm text-black mt-1 block">{toy.stockCode}</span>
                </div>
                <div className="bg-white border-2 border-black p-3">
                  <span className="font-mono-code font-bold text-slate-500 uppercase block">MANUFACTURER</span>
                  <span className="font-display text-sm text-black mt-1 block">Nova Play Toy Division UK</span>
                </div>
                <div className="bg-white border-2 border-black p-3">
                  <span className="font-mono-code font-bold text-slate-500 uppercase block">SAFETY COMPLIANCE</span>
                  <span className="font-display text-sm text-black mt-1 block">BSI Standard 5665/85</span>
                </div>
              </div>
            )}

            {activeTab === 'lore' && (
              <div className="space-y-3 text-xs leading-relaxed max-w-3xl text-slate-800 font-medium">
                <h4 className="font-display text-base text-[#0a48b9] uppercase">
                  THE DEFENSE OF SECTOR 7:
                </h4>
                <p>
                  In the year 2085, orbital deep-space stations are guarded by the automated Robo Warrior vanguard. Equipped with high-torque clockwork gyroscopes and dual laser blasters, they stand ready against rogue raiders and asteroid dust storms.
                </p>
                <p>
                  Combine Robo Warrior with the Turbo Stinger rally interceptor and Stormhawk Jet for complete multi-terrain combat play!
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-3">
                <div className="bg-white border-2 border-black p-3.5 shadow-[2px_2px_0_#000]">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs text-black">"BUILT LIKE A BATTLE TANK!"</span>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-amber-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 mt-1.5 leading-snug">
                    "Got this for my 8th birthday. My younger brother accidentally kicked it down our wooden stairs and not a single scratch appeared! The chest flint sparks look amazing in the dark."
                  </p>
                  <span className="font-mono-code text-[10px] text-slate-500 mt-2 block">
                    — Simon T., Manchester (November 1985)
                  </span>
                </div>

                <div className="bg-white border-2 border-black p-3.5 shadow-[2px_2px_0_#000]">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs text-black">"BEST TOY IN THE AUTUMN CATALOGUE"</span>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-amber-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 mt-1.5 leading-snug">
                    "The walking action works great on our living room rug. Definitely order the 2x AA batteries together with it so you can play immediately."
                  </p>
                  <span className="font-mono-code text-[10px] text-slate-500 mt-2 block">
                    — David & Paul, Leeds (December 1985)
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RELATED TOYS / CUSTOMERS ALSO ORDERED */}
        <div className="mt-8 border-2 border-black bg-[#f5f3ec] shadow-[4px_4px_0_#000] overflow-hidden">
          <div className="bg-[#dc1f1f] text-white px-4 py-2 border-b-2 border-black flex items-center justify-between">
            <h3 className="font-display text-sm tracking-wider uppercase text-[#ffdf00]">
              FREQUENTLY ORDERED TOGETHER
            </h3>
            <span className="text-[11px] font-mono-code text-white">1985 CATALOGUE BUNDLE DEALS</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4">
            {relatedToys.map((relToy) => (
              <div
                key={relToy.id}
                onClick={() => {
                  playRetroSound('click');
                  onInspectOtherToy(relToy);
                }}
                className="bg-white border-2 border-black p-2.5 flex flex-col justify-between cursor-pointer hover:-translate-y-1 hover:shadow-[3px_3px_0_#000] transition-all group"
              >
                <div className={`w-full aspect-square ${relToy.bgTone} border border-black p-2 flex items-center justify-center relative overflow-hidden`}>
                  <img
                    src={relToy.image}
                    alt={relToy.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-1 right-1 bg-[#ffdf00] text-black font-display text-[9px] px-1.5 py-0.5 border border-black">
                    {relToy.price}
                  </div>
                </div>

                <div className="mt-2 text-center">
                  <h4 className="font-display text-[11px] uppercase truncate group-hover:text-[#0a48b9]">
                    {relToy.name}
                  </h4>
                  <span className="font-mono-code text-[9px] text-slate-600 block">
                    {relToy.stockCode}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playRetroSound('cart');
                    onAddToCart(relToy, 1);
                    onShowToast(`Added ${relToy.name} to order!`);
                  }}
                  className="mt-2 btn-retro-yellow py-1 text-[10px] font-display uppercase tracking-wider w-full cursor-pointer"
                >
                  ADD TO ORDER
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
