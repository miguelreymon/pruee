import React, { useState } from 'react';
import { Gift, BookOpen, Send, CheckCircle2 } from 'lucide-react';
import { StarburstBadge } from './StarburstBadge';
import { playRetroSound } from '../utils/audio';

interface FeatureStripsProps {
  onOpenGiftFinder: () => void;
  onRequestCatalogue: () => void;
  onFilterNew: () => void;
  onShowToast: (msg: string) => void;
}

export const FeatureStrips: React.FC<FeatureStripsProps> = ({
  onOpenGiftFinder,
  onRequestCatalogue,
  onFilterNew,
  onShowToast,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      playRetroSound('click');
      onShowToast('Please enter a valid email address!');
      return;
    }
    playRetroSound('coin');
    setSubscribed(true);
    onShowToast('Subscribed! You will receive our weekly toy drops.');
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-3 my-0">
      {/* 1. New Arrivals Strip */}
      <div
        onClick={() => {
          playRetroSound('burst');
          onFilterNew();
          onShowToast('Filtering 1985 New Toy Arrivals!');
        }}
        className="bg-[#0b48b9] text-white border-2 border-black p-3.5 flex items-center gap-3.5 cursor-pointer shadow-[3px_3px_0_#000] hover:-translate-y-0.5 transition-transform"
      >
        <div className="shrink-0">
          <StarburstBadge
            points={12}
            innerRadius={34}
            outerRadius={48}
            fillColor="#ffdf00"
            strokeColor="#000000"
            strokeWidth={2}
            className="w-12 h-12"
            rotate={-5}
          >
            <span className="font-display text-[10px] text-black font-black leading-none">
              NEW
            </span>
          </StarburstBadge>
        </div>
        <div>
          <h3 className="font-display text-xs sm:text-sm tracking-wide text-[#ffdf00] uppercase leading-tight">
            NEW ARRIVALS
          </h3>
          <p className="text-[11px] text-blue-100 font-semibold leading-snug mt-0.5">
            Check out this week's freshest toys!
          </p>
        </div>
      </div>

      {/* 2. Gift Finder Strip */}
      <div
        onClick={() => {
          playRetroSound('click');
          onOpenGiftFinder();
        }}
        className="bg-[#dc1f1f] text-white border-2 border-black p-3.5 flex items-center gap-3.5 cursor-pointer shadow-[3px_3px_0_#000] hover:-translate-y-0.5 transition-transform"
      >
        <div className="w-11 h-11 rounded-none bg-white text-[#dc1f1f] flex items-center justify-center border-2 border-black shadow-[2px_2px_0_#000] shrink-0">
          <Gift size={22} strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="font-display text-xs sm:text-sm tracking-wide text-white uppercase leading-tight">
            GIFT FINDER
          </h3>
          <p className="text-[11px] text-red-100 font-semibold leading-snug mt-0.5">
            The perfect toy for every kid.
          </p>
        </div>
      </div>

      {/* 3. Request a Catalogue */}
      <div
        onClick={() => {
          playRetroSound('click');
          onRequestCatalogue();
        }}
        className="bg-[#0b3b95] text-white border-2 border-black p-3.5 flex items-center gap-3.5 cursor-pointer shadow-[3px_3px_0_#000] hover:-translate-y-0.5 transition-transform"
      >
        <div className="w-11 h-11 bg-white text-[#0b3b95] flex items-center justify-center border-2 border-black shadow-[2px_2px_0_#000] shrink-0">
          <BookOpen size={22} strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="font-display text-xs sm:text-sm tracking-wide text-white uppercase leading-tight">
            REQUEST A CATALOGUE
          </h3>
          <p className="text-[11px] text-blue-200 font-semibold leading-snug mt-0.5">
            Get our latest toy catalogue by post.
          </p>
        </div>
      </div>

      {/* 4. Stay In The Loop (Newsletter) */}
      <div className="bg-[#ffdf00] text-black border-2 border-black p-3 flex flex-col justify-between shadow-[3px_3px_0_#000]">
        <div>
          <h3 className="font-display text-xs sm:text-sm tracking-wide text-black uppercase leading-tight">
            STAY IN THE LOOP!
          </h3>
          <p className="text-[10px] text-slate-800 font-bold leading-snug mt-0.5">
            Get updates on new toys and special offers.
          </p>
        </div>

        <form onSubmit={handleSubscribe} className="mt-2 flex items-center gap-1.5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ENTER YOUR EMAIL"
            className="w-full bg-white text-black font-bold text-[11px] px-2.5 py-1.5 border-2 border-black uppercase placeholder:text-slate-400 focus:outline-none focus:bg-amber-50"
          />
          <button
            type="submit"
            className="btn-retro-blue px-3 py-1.5 text-[11px] font-display uppercase tracking-wider shrink-0 cursor-pointer"
          >
            {subscribed ? <CheckCircle2 size={14} className="text-white" /> : 'SIGN UP'}
          </button>
        </form>
      </div>
    </div>
  );
};
