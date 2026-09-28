import React, { useState } from 'react';
import { 
  Wrench, 
  Skull, 
  Shirt, 
  BookOpen, 
  Info, 
  Sparkles, 
  Flame, 
  ArrowRight, 
  ShieldCheck, 
  Eye, 
  Award, 
  ChevronDown,
  X,
  Check
} from 'lucide-react';
import { LOWBROW_ITEMS, LowbrowItem } from '../data/lowbrowData';
import { playRetroSound } from '../utils/audio';

interface GraveyardGearheadsPageProps {
  onShowToast: (msg: string) => void;
  onSwitchToNovaPlay: () => void;
}

export const GraveyardGearheadsPage: React.FC<GraveyardGearheadsPageProps> = ({
  onShowToast,
  onSwitchToNovaPlay,
}) => {
  const [selectedItem, setSelectedItem] = useState<LowbrowItem | null>(null);
  const [isGarageDrawerOpen, setIsGarageDrawerOpen] = useState(false);
  const [isCultModalOpen, setIsCultModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('garage');
  const [garageItemsCount, setGarageItemsCount] = useState(3);
  const [speedPoints, setSpeedPoints] = useState(13666);
  const [cultEmail, setCultEmail] = useState('');
  const [cultJoined, setCultJoined] = useState(false);

  const navItems = [
    { id: 'garage', label: 'GARAGE', sub: 'PARTS & GEAR', icon: Wrench },
    { id: 'idols', label: 'IDOLS', sub: 'FIGURES & ART', icon: Skull },
    { id: 'apparel', label: 'APPAREL', sub: 'WEAR THE CULT', icon: Shirt },
    { id: 'journal', label: 'JOURNAL', sub: 'NEWS & SHOWS', icon: BookOpen },
    { id: 'about', label: 'ABOUT', sub: 'OUR STORY', icon: Info },
  ];

  const handleJoinCult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cultEmail || !cultEmail.includes('@')) {
      playRetroSound('click');
      onShowToast('Enter your nocturnal coordinates (email)!');
      return;
    }
    playRetroSound('monster');
    setCultJoined(true);
    setSpeedPoints((prev) => prev + 666);
    onShowToast('Welcome to the Cult! +666 Speed Points awarded.');
    setTimeout(() => {
      setCultJoined(false);
      setIsCultModalOpen(false);
      setCultEmail('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#120e18] text-[#f2e9dc] select-none pb-12 font-sans">
      {/* Outer Vintage Lowbrow Frame Container */}
      <div className="max-w-[1440px] mx-auto p-2 sm:p-4 lg:p-6">
        {/* Main Poster Panel with aged yellow/cream border */}
        <div className="relative bg-[#ebd8bb] border-4 border-black rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-[0_12px_30px_rgba(0,0,0,0.85)] overflow-hidden">
          
          {/* Subtle Vintage Halftone & Stained Paper Texture */}
          <div className="absolute inset-0 pointer-events-none opacity-20 retro-halftone" />
          
          {/* 1. TOP HEADER BAR */}
          <header className="relative z-10 border-b-3 border-black pb-3 sm:pb-4 flex flex-wrap items-center justify-between gap-3">
            {/* Logo */}
            <div 
              onClick={() => {
                playRetroSound('rev');
                onShowToast('Graveyard Gearheads: Est. 1963 Kustom Tiki Cult');
              }}
              className="cursor-pointer group flex items-center gap-2 transform hover:scale-105 transition-transform"
            >
              <div className="relative">
                <span className="font-creep text-3xl sm:text-4xl text-[#78d424] tracking-wider uppercase drop-shadow-[2px_3px_0_#000] block leading-none filter contrast-125">
                  GRAVEYARD
                </span>
                <span className="font-creep text-xl sm:text-2xl text-[#ff5500] tracking-widest uppercase drop-shadow-[2px_2px_0_#000] block -mt-1 font-black">
                  GEARHEADS
                </span>
              </div>
            </div>

            {/* Navigation items */}
            <nav className="hidden lg:flex items-center gap-1 sm:gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      playRetroSound('click');
                      setActiveTab(item.id);
                      onShowToast(`Browsing ${item.label}: ${item.sub}`);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-transparent transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-black/10 border-black/40 font-black shadow-[1px_1px_0_#000]' 
                        : 'hover:bg-black/5 hover:border-black/20'
                    }`}
                  >
                    <Icon size={16} className="text-black shrink-0" strokeWidth={2.5} />
                    <div className="text-left leading-tight">
                      <span className="block font-black text-xs text-black uppercase tracking-wide">
                        {item.label}
                      </span>
                      <span className="block text-[9px] font-bold text-slate-800 tracking-wider">
                        {item.sub}
                      </span>
                    </div>
                  </button>
                );
              })}
            </nav>

            {/* Right Side Widgets: Speed Points & Your Garage */}
            <div className="flex items-center gap-2 sm:gap-3 ml-auto">
              {/* Speed Points Badge */}
              <button
                onClick={() => {
                  playRetroSound('burst');
                  onShowToast(`Speed Points: ${speedPoints.toLocaleString()} PTS (Tier: Screaming Demon)`);
                }}
                className="bg-[#2d124d] text-white border-2 border-black rounded-lg px-3 py-1.5 flex items-center gap-2 shadow-[2px_2px_0_#000] cursor-pointer hover:bg-[#3b1964] active:translate-y-0.5 transition-all"
              >
                <Sparkles size={14} className="text-[#38bdf8] fill-[#38bdf8]" />
                <div className="text-left leading-tight">
                  <span className="block text-[8px] font-mono-code font-bold text-purple-300 tracking-wider uppercase">
                    SPEED POINTS
                  </span>
                  <span className="block font-mono-code font-bold text-xs text-[#38bdf8] tracking-wider">
                    {speedPoints.toLocaleString()}
                  </span>
                </div>
              </button>

              {/* Your Garage Cart Dropdown */}
              <button
                onClick={() => {
                  playRetroSound('rev');
                  setIsGarageDrawerOpen(true);
                }}
                className="bg-[#1f2937] text-white border-2 border-black rounded-lg px-3 py-1.5 flex items-center gap-2 shadow-[2px_2px_0_#000] cursor-pointer hover:bg-black active:translate-y-0.5 transition-all"
              >
                {/* Tiki icon */}
                <div className="w-6 h-6 rounded bg-[#ff7700] text-black font-black flex items-center justify-center text-[10px] border border-black">
                  🗿
                </div>
                <div className="text-left leading-tight hidden sm:block">
                  <span className="block text-[8px] font-mono-code font-bold text-slate-400 tracking-wider uppercase">
                    YOUR GARAGE
                  </span>
                  <span className="block font-mono-code font-bold text-xs text-[#38bdf8]">
                    {garageItemsCount} ITEMS
                  </span>
                </div>
                <ChevronDown size={14} className="text-slate-400 ml-1" />
              </button>
            </div>
          </header>

          {/* 2. MAIN HERO SPREAD ("BUILT FOR MAYHEM") */}
          <div className="relative mt-3 sm:mt-4 rounded-xl border-3 border-black overflow-hidden bg-[#241335] min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] shadow-[4px_4px_0_#000] flex flex-col justify-between p-4 sm:p-8">
            
            {/* Background Hero Illustration Artwork */}
            <div className="absolute inset-0 z-0">
              <img
                src="/src/assets/images/hero_lowbrow_hotrod_1790609212621.jpg"
                alt="Graveyard Gearheads Built For Mayhem"
                className="w-full h-full object-cover object-center filter contrast-115 brightness-95"
                referrerPolicy="no-referrer"
              />
              {/* Vignette / Scrim gradient to ensure text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
            </div>

            {/* Top Left Title Block */}
            <div className="relative z-10 max-w-xl">
              {/* Cyan "BUILT FOR" Brush Stroke Title */}
              <div className="flex items-center gap-2">
                <span className="font-marker text-2xl sm:text-4xl text-[#38bdf8] uppercase tracking-wide drop-shadow-[2px_3px_0_#000] transform -rotate-2 inline-block">
                  BUILT FOR
                </span>
                <span className="text-[#ff5500] text-2xl font-black drop-shadow-[1px_2px_0_#000]">
                  ✦
                </span>
              </div>

              {/* Gigantic Dripping Purple "MAYHEM" monster typography */}
              <h1 className="font-creep text-6xl sm:text-8xl lg:text-9xl text-[#a855f7] tracking-tight uppercase leading-[0.88] drop-shadow-[5px_6px_0_#000] filter contrast-125 transform -rotate-1 select-none">
                MAYHEM
              </h1>

              {/* Subtitle */}
              <p className="mt-3 sm:mt-4 font-marker text-xs sm:text-base text-[#ebd8bb] uppercase tracking-wide leading-snug drop-shadow-[2px_2px_0_#000] max-w-md">
                PARTS, APPAREL, AND ART FOR THE WEIRDOS, THE SPEED FREAKS, AND THE NIGHT-SHIFT LEGENDS.
              </p>

              {/* Buttons */}
              <div className="mt-5 sm:mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
                {/* Purple Flame Button: SHOP THE GARAGE */}
                <button
                  onClick={() => {
                    playRetroSound('rev');
                    setIsGarageDrawerOpen(true);
                    onShowToast('Opening Garage speed-parts inventory!');
                  }}
                  className="btn-lowbrow-purple group px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-black tracking-wider uppercase inline-flex items-center gap-2 cursor-pointer shadow-[3px_4px_0_#000]"
                >
                  <span className="font-display">SHOP THE GARAGE</span>
                  <div className="flex items-center text-[#ff7700] group-hover:scale-125 transition-transform">
                    <Flame size={18} className="fill-[#ff7700]" />
                  </div>
                </button>

                {/* Teal Button: BROWSE NEW DROP */}
                <button
                  onClick={() => {
                    playRetroSound('burst');
                    setSelectedItem(LOWBROW_ITEMS[0]);
                    onShowToast('Inspecting Oil Slick Collection!');
                  }}
                  className="btn-lowbrow-teal px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-black tracking-wider uppercase inline-flex items-center gap-2 cursor-pointer shadow-[3px_4px_0_#000]"
                >
                  <span className="font-display">BROWSE NEW DROP</span>
                  <Sparkles size={16} className="text-[#78d424]" />
                </button>
              </div>
            </div>

            {/* Right Side "JOIN THE CULT" Comic Burst Sticker */}
            <div className="relative z-10 self-end mt-4 sm:mt-0">
              <button
                onClick={() => {
                  playRetroSound('monster');
                  setIsCultModalOpen(true);
                }}
                className="group relative cursor-pointer transform hover:scale-110 active:scale-95 transition-all"
              >
                {/* Jagged starburst graphic */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[4px_5px_0_#000]">
                    <polygon
                      points="50,0 62,28 92,15 78,44 100,58 74,74 85,100 56,86 42,100 30,76 0,82 18,54 0,38 26,30 20,4 44,20"
                      fill="#ff3b00"
                      stroke="#000"
                      strokeWidth="3"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center pointer-events-none transform -rotate-6">
                    <span className="font-creep text-xl sm:text-2xl text-[#ffe600] uppercase leading-none drop-shadow-[1px_2px_0_#000]">
                      JOIN
                    </span>
                    <span className="font-creep text-lg sm:text-xl text-white uppercase leading-none drop-shadow-[1px_2px_0_#000]">
                      THE CULT
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* 3. FOUR BENTO FEATURE CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4">
            {LOWBROW_ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  playRetroSound('click');
                  setSelectedItem(item);
                }}
                className="group relative bg-[#1c1427] border-3 border-black rounded-xl p-3 sm:p-3.5 flex flex-col justify-between cursor-pointer transition-all duration-150 hover:-translate-y-1 hover:shadow-[4px_4px_0_#000] active:translate-y-0 active:shadow-[1px_1px_0_#000] overflow-hidden"
              >
                {/* Top Badge & Titles */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-xs">✦</span>
                    <span className={`text-[10px] sm:text-[11px] font-mono-code font-bold tracking-wider uppercase ${item.badgeTone}`}>
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-marker text-base sm:text-lg text-white uppercase tracking-tight leading-tight group-hover:text-[#38bdf8] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-[10px] sm:text-[11px] font-mono-code text-slate-400 uppercase tracking-wider font-semibold mt-0.5">
                    {item.subtitle}
                  </p>
                </div>

                {/* Thumbnail Image Container */}
                <div className="relative mt-3 w-full aspect-square rounded-lg border-2 border-black overflow-hidden bg-black/50 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Price Tag if applicable */}
                  {item.price && (
                    <div className="absolute top-2 right-2 bg-black/80 border border-white/20 text-[#38bdf8] font-mono-code text-[11px] font-bold px-2 py-0.5 rounded">
                      {item.price}
                    </div>
                  )}

                  {/* Circular Arrow Button */}
                  <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-black/80 border-2 border-white/40 text-white flex items-center justify-center group-hover:bg-[#38bdf8] group-hover:text-black group-hover:border-black transition-colors shadow-[1px_1px_0_#000]">
                    <ArrowRight size={14} strokeWidth={3} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 4. BOTTOM TRUST TICKER */}
          <div className="mt-4 pt-3 sm:pt-4 border-t-3 border-black grid grid-cols-2 md:grid-cols-4 gap-3 text-black">
            {/* Free Shipping */}
            <div 
              onClick={() => {
                playRetroSound('click');
                onShowToast('Free Express Courier on domestic orders over $99');
              }}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <Award size={20} className="text-black shrink-0" strokeWidth={2.5} />
              <div className="leading-tight">
                <span className="block font-black text-xs uppercase tracking-wide text-black">
                  FREE SHIPPING
                </span>
                <span className="block text-[10px] font-bold text-slate-800 uppercase">
                  ON ORDERS OVER $99
                </span>
              </div>
            </div>

            {/* Speed Points */}
            <div 
              onClick={() => {
                playRetroSound('burst');
                onShowToast('Earn 10 Speed Points for every $1 spent in the Garage');
              }}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <Sparkles size={20} className="text-black shrink-0" strokeWidth={2.5} />
              <div className="leading-tight">
                <span className="block font-black text-xs uppercase tracking-wide text-black">
                  EARN SPEED POINTS
                </span>
                <span className="block text-[10px] font-bold text-slate-800 uppercase">
                  ON EVERY ORDER
                </span>
              </div>
            </div>

            {/* Built by Weirdos */}
            <div 
              onClick={() => {
                playRetroSound('monster');
                onShowToast('Proudly handcrafted by rat-rod freaks & pinstripers since 1963');
              }}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <Eye size={20} className="text-black shrink-0" strokeWidth={2.5} />
              <div className="leading-tight">
                <span className="block font-black text-xs uppercase tracking-wide text-black">
                  BUILT BY WEIRDOS
                </span>
                <span className="block text-[10px] font-bold text-slate-800 uppercase">
                  FOR WEIRDOS
                </span>
              </div>
            </div>

            {/* Secure Checkout */}
            <div 
              onClick={() => {
                playRetroSound('click');
                onShowToast('256-Bit Encrypted Speed checkout');
              }}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <ShieldCheck size={20} className="text-black shrink-0" strokeWidth={2.5} />
              <div className="leading-tight">
                <span className="block font-black text-xs uppercase tracking-wide text-black">
                  SECURE CHECKOUT
                </span>
                <span className="block text-[10px] font-bold text-slate-800 uppercase">
                  FAST AND SAFE
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Item Inspection Spec Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl bg-[#ebd8bb] border-4 border-black rounded-2xl shadow-[8px_8px_0_#000] overflow-hidden">
            {/* Header */}
            <div className="bg-[#2d124d] text-white border-b-3 border-black p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skull size={18} className="text-[#38bdf8]" />
                <h3 className="font-marker text-sm tracking-wide uppercase text-white">
                  {selectedItem.title}
                </h3>
              </div>
              <button
                onClick={() => {
                  playRetroSound('click');
                  setSelectedItem(null);
                }}
                className="w-7 h-7 bg-white text-black font-black border border-black hover:bg-yellow-300 flex items-center justify-center cursor-pointer rounded"
              >
                <X size={18} strokeWidth={3} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 text-black">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-48 aspect-square rounded-xl border-3 border-black overflow-hidden bg-black shrink-0 shadow-[3px_3px_0_#000]">
                  <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-mono-code text-[11px] font-bold text-purple-900 bg-purple-200 border border-purple-400 px-2 py-0.5 rounded uppercase">
                      {selectedItem.badge}
                    </span>
                    <h4 className="font-creep text-3xl text-black uppercase mt-1 leading-none">
                      {selectedItem.title}
                    </h4>
                    <p className="text-xs font-semibold text-slate-800 mt-2 leading-relaxed">
                      {selectedItem.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t-2 border-black/40 flex items-center justify-between">
                    <span className="font-mono-code font-bold text-lg text-black">
                      {selectedItem.price || 'ARCHIVE'}
                    </span>
                    <button
                      onClick={() => {
                        playRetroSound('rev');
                        setGarageItemsCount((c) => c + 1);
                        setSpeedPoints((pts) => pts + 150);
                        onShowToast(`Stashed ${selectedItem.title} in your Garage!`);
                        setSelectedItem(null);
                      }}
                      className="btn-lowbrow-cult py-2 px-5 font-display text-xs uppercase tracking-wider rounded-lg shadow-[2px_2px_0_#000] cursor-pointer"
                    >
                      STASH IN GARAGE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* "Join The Cult" Secret Society Modal */}
      {isCultModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-[#241335] text-white border-4 border-black rounded-2xl shadow-[8px_8px_0_#000] overflow-hidden p-6 text-center">
            <button
              onClick={() => {
                playRetroSound('click');
                setIsCultModalOpen(false);
              }}
              className="absolute top-3 right-3 w-7 h-7 bg-white text-black font-black border border-black hover:bg-yellow-300 flex items-center justify-center cursor-pointer rounded"
            >
              <X size={18} strokeWidth={3} />
            </button>

            <span className="text-4xl block mb-1">🗿</span>
            <h3 className="font-creep text-4xl text-[#ff5500] uppercase tracking-wide drop-shadow-[2px_2px_0_#000]">
              JOIN THE CULT
            </h3>
            <p className="font-marker text-xs text-[#ebd8bb] uppercase mt-1">
              SECRET SPEED SOCIETY · MEMBERS ONLY DROPS
            </p>

            <div className="my-4 bg-black/50 border-2 border-black p-3 rounded-lg text-left text-xs text-slate-300 space-y-1.5">
              <p>✦ First access to limited resin idol sculptures (666 numbered)</p>
              <p>✦ 666 Instant Speed Points credited to your callsign</p>
              <p>✦ Secret invites to Nocturnal Swamp & Desert Drag runs</p>
            </div>

            <form onSubmit={handleJoinCult} className="space-y-3">
              <input
                type="email"
                required
                value={cultEmail}
                onChange={(e) => setCultEmail(e.target.value)}
                placeholder="YOUR NOCTURNAL EMAIL"
                className="w-full bg-[#ebd8bb] text-black font-mono-code font-bold text-xs p-3 border-2 border-black rounded-lg uppercase placeholder:text-slate-600 focus:outline-none focus:bg-white"
              />
              <button
                type="submit"
                className="w-full btn-lowbrow-cult py-3 text-xs font-display uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0_#000]"
              >
                {cultJoined ? <Check size={18} /> : 'SWEAR THE GEARHEAD OATH'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Your Garage Drawer */}
      {isGarageDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-[#ebd8bb] border-l-4 border-black h-full flex flex-col justify-between shadow-2xl p-5 text-black animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between border-b-3 border-black pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔧</span>
                  <h3 className="font-creep text-2xl uppercase tracking-wide">
                    YOUR GARAGE STASH
                  </h3>
                </div>
                <button
                  onClick={() => {
                    playRetroSound('click');
                    setIsGarageDrawerOpen(false);
                  }}
                  className="w-7 h-7 bg-white text-black font-black border border-black hover:bg-yellow-300 flex items-center justify-center cursor-pointer rounded"
                >
                  <X size={18} strokeWidth={3} />
                </button>
              </div>

              {/* Stash items */}
              <div className="mt-4 space-y-3">
                <div className="bg-white border-2 border-black p-2.5 rounded-lg flex items-center justify-between shadow-[2px_2px_0_#000]">
                  <div className="flex items-center gap-2.5">
                    <img src="/src/assets/images/lowbrow_oil_slick_tee_1790609226263.jpg" className="w-12 h-12 object-cover border border-black rounded" />
                    <div>
                      <h5 className="font-marker text-xs uppercase leading-tight">OIL SLICK TEE</h5>
                      <span className="font-mono-code text-[10px] text-slate-600 font-bold">$38.00 (QTY: 1)</span>
                    </div>
                  </div>
                  <span className="font-mono-code font-bold text-xs">$38.00</span>
                </div>

                <div className="bg-white border-2 border-black p-2.5 rounded-lg flex items-center justify-between shadow-[2px_2px_0_#000]">
                  <div className="flex items-center gap-2.5">
                    <img src="/src/assets/images/lowbrow_misfire_idol_1790609239053.jpg" className="w-12 h-12 object-cover border border-black rounded" />
                    <div>
                      <h5 className="font-marker text-xs uppercase leading-tight">MISFIRE IDOL #214</h5>
                      <span className="font-mono-code text-[10px] text-slate-600 font-bold">$120.00 (QTY: 1)</span>
                    </div>
                  </div>
                  <span className="font-mono-code font-bold text-xs">$120.00</span>
                </div>

                <div className="bg-white border-2 border-black p-2.5 rounded-lg flex items-center justify-between shadow-[2px_2px_0_#000]">
                  <div className="flex items-center gap-2.5">
                    <img src="/src/assets/images/lowbrow_flying_eyeball_1790609272297.jpg" className="w-12 h-12 object-cover border border-black rounded" />
                    <div>
                      <h5 className="font-marker text-xs uppercase leading-tight">FUMES & FORTUNES PASS</h5>
                      <span className="font-mono-code text-[10px] text-slate-600 font-bold">$45.00 (QTY: 1)</span>
                    </div>
                  </div>
                  <span className="font-mono-code font-bold text-xs">$45.00</span>
                </div>
              </div>
            </div>

            {/* Garage checkout */}
            <div className="border-t-3 border-black pt-4">
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono-code text-xs font-bold text-slate-700">SUBTOTAL:</span>
                <span className="font-mono-code text-base font-black">$203.00</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono-code text-xs font-bold text-slate-700">COURIER:</span>
                <span className="font-mono-code text-xs font-black text-emerald-800">FREE OVER $99</span>
              </div>
              <button
                onClick={() => {
                  playRetroSound('rev');
                  onShowToast('Checkout completed! Parts dispatched from the Graveyard warehouse.');
                  setIsGarageDrawerOpen(false);
                }}
                className="w-full btn-lowbrow-cult py-3 font-display text-xs uppercase tracking-wider rounded-lg shadow-[3px_3px_0_#000] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>DISPATCH SPEED PARTS</span>
                <Flame size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
