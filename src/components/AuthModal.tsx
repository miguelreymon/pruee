import React, { useState } from 'react';
import { X, UserCheck, ShieldCheck } from 'lucide-react';
import { playRetroSound } from '../utils/audio';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [email, setEmail] = useState('');
  const [membershipNo, setMembershipNo] = useState('NP-85-4421');

  if (!isOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    playRetroSound('coin');
    onShowToast(`Welcome back, Agent! Member #${membershipNo} verified.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-[#f5f3ec] border-3 border-black shadow-[8px_8px_0_#000] overflow-hidden">
        {/* Header */}
        <div className="bg-[#0b48b9] text-white border-b-2 border-black p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck size={20} className="text-[#ffdf00]" />
            <h3 className="font-display text-sm tracking-wide uppercase text-white">
              NOVA PLAY CLUB MEMBERSHIP
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

        {/* Card Mockup */}
        <div className="p-6">
          <div className="bg-[#ffdf00] border-2 border-black p-4 mb-4 shadow-[3px_3px_0_#000] relative">
            <span className="font-display text-xs text-black block tracking-widest">
              OFFICIAL MEMBER CARD
            </span>
            <span className="font-mono-code text-sm font-bold text-slate-900 mt-2 block tracking-wider">
              {membershipNo}
            </span>
            <div className="mt-3 flex justify-between items-center text-[10px] font-mono-code font-bold text-slate-800 border-t border-black/30 pt-1">
              <span>EXP: 12/89</span>
              <span>GRADE: TOYMASTER</span>
            </div>
          </div>

          <form onSubmit={handleSignIn} className="space-y-3.5">
            <div>
              <label className="block font-display text-xs text-black uppercase mb-1">
                REGISTERED EMAIL / CALLSIGN:
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="pilot@novaplay.co.uk"
                className="w-full bg-white text-black font-bold text-xs p-2.5 border-2 border-black focus:outline-none focus:bg-yellow-50"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-retro-blue py-3 text-xs font-display uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0_#000]"
            >
              <ShieldCheck size={16} />
              <span>ACCESS MEMBER SAVINGS</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
