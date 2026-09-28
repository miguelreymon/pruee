import React, { useState } from 'react';
import { X, Gift, Check, ArrowRight } from 'lucide-react';
import { HOT_TOYS, HERO_TOY, ToyItem } from '../data/catalogueData';
import { playRetroSound } from '../utils/audio';

interface GiftFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInspectToy: (toy: ToyItem) => void;
}

export const GiftFinderModal: React.FC<GiftFinderModalProps> = ({
  isOpen,
  onClose,
  onInspectToy,
}) => {
  const [selectedAge, setSelectedAge] = useState<string>('5-7');
  const [selectedInterest, setSelectedInterest] = useState<string>('all');

  if (!isOpen) return null;

  const ages = ['3-5', '5-7', '8-11', '12+'];
  const interests = [
    { id: 'all', label: 'ALL CATEGORIES' },
    { id: 'robots', label: 'ROBOTS' },
    { id: 'vehicles', label: 'VEHICLES' },
    { id: 'games', label: 'RETRO GAMES' },
  ];

  const recommendations = [HERO_TOY, ...HOT_TOYS].filter((toy) => {
    if (selectedInterest === 'all') return true;
    return toy.category === selectedInterest;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-[#f5f3ec] border-3 border-black shadow-[8px_8px_0_#000] overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#dc1f1f] text-white border-b-2 border-black p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift size={20} className="text-[#ffdf00]" />
            <h3 className="font-display text-sm tracking-wide uppercase text-white">
              NOVA PLAY GIFT FINDER
            </h3>
          </div>
          <button
            onClick={() => {
              playRetroSound('click');
              onClose();
            }}
            className="w-7 h-7 bg-white text-black font-black border border-black hover:bg-yellow-300 flex items-center justify-center cursor-pointer"
          >
            <X size={18} strokeWidth={3} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Age Selection */}
          <div>
            <label className="block font-display text-xs text-black uppercase mb-1.5">
              1. SELECT AGE GROUP:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {ages.map((age) => (
                <button
                  key={age}
                  onClick={() => {
                    playRetroSound('click');
                    setSelectedAge(age);
                  }}
                  className={`py-2 px-3 text-xs font-mono-code font-bold border-2 border-black cursor-pointer transition-all ${
                    selectedAge === age
                      ? 'bg-[#ffdf00] shadow-[2px_2px_0_#000] font-black'
                      : 'bg-white hover:bg-slate-100'
                  }`}
                >
                  {age} YRS
                </button>
              ))}
            </div>
          </div>

          {/* Interest Selection */}
          <div>
            <label className="block font-display text-xs text-black uppercase mb-1.5">
              2. SELECT INTEREST:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {interests.map((interest) => (
                <button
                  key={interest.id}
                  onClick={() => {
                    playRetroSound('click');
                    setSelectedInterest(interest.id);
                  }}
                  className={`py-2 px-2 text-[11px] font-display uppercase border-2 border-black cursor-pointer transition-all ${
                    selectedInterest === interest.id
                      ? 'bg-[#0b48b9] text-white shadow-[2px_2px_0_#000]'
                      : 'bg-white text-black hover:bg-slate-100'
                  }`}
                >
                  {interest.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results List */}
          <div>
            <div className="flex items-center justify-between border-b-2 border-black pb-1 mb-2">
              <span className="font-display text-xs text-black uppercase">
                RECOMMENDED GIFTS:
              </span>
              <span className="text-[11px] font-mono-code font-bold text-slate-600">
                {recommendations.length} MATCHES
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {recommendations.slice(0, 4).map((toy) => (
                <div
                  key={toy.id}
                  onClick={() => {
                    playRetroSound('click');
                    onInspectToy(toy);
                    onClose();
                  }}
                  className="bg-white border-2 border-black p-2.5 flex items-center gap-3 cursor-pointer hover:bg-yellow-50 hover:-translate-y-0.5 transition-transform shadow-[2px_2px_0_#000]"
                >
                  <div className={`w-12 h-12 ${toy.bgTone} border border-black p-1 shrink-0`}>
                    <img src={toy.image} alt={toy.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-display text-[11px] text-black uppercase truncate leading-tight">
                      {toy.name}
                    </h5>
                    <p className="font-mono-code text-[10px] text-slate-500 font-bold">
                      {toy.price}
                    </p>
                  </div>
                  <ArrowRight size={14} className="text-black shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
