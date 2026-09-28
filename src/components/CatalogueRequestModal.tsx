import React, { useState } from 'react';
import { X, Send, BookOpen, CheckCircle } from 'lucide-react';
import { playRetroSound } from '../utils/audio';

interface CatalogueRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const CatalogueRequestModal: React.FC<CatalogueRequestModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    postcode: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.address) {
      playRetroSound('click');
      onShowToast('Please fill in your postal details!');
      return;
    }
    playRetroSound('coin');
    setSubmitted(true);
    onShowToast('Catalogue request submitted! 1985 Edition sent to print.');
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-[#f5f3ec] border-3 border-black shadow-[8px_8px_0_#000] overflow-hidden">
        {/* Header */}
        <div className="bg-[#0b3b95] text-white border-b-2 border-black p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-[#ffdf00]" />
            <h3 className="font-display text-sm tracking-wide uppercase text-white">
              REQUEST FREE CATALOGUE BY POST
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

        {/* Form Body */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center flex flex-col items-center">
              <CheckCircle size={48} className="text-emerald-600 mb-3" />
              <h4 className="font-display text-lg text-black uppercase">
                CATALOGUE ON ITS WAY!
              </h4>
              <p className="text-xs text-slate-700 mt-1 max-w-xs">
                Your full-color 128-page Nova Play autumn catalogue has been scheduled for Royal Mail first class dispatch.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-amber-100 border border-amber-400 p-2.5 text-xs text-amber-950 font-medium">
                📬 Over 500 toys, games, and action figures delivered right to your mailbox free of charge!
              </div>

              <div>
                <label className="block font-display text-xs text-black uppercase mb-1">
                  FULL NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Henderson"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white text-black font-bold text-xs p-2.5 border-2 border-black focus:outline-none focus:bg-yellow-50"
                />
              </div>

              <div>
                <label className="block font-display text-xs text-black uppercase mb-1">
                  POSTAL ADDRESS
                </label>
                <input
                  type="text"
                  required
                  placeholder="Street and house number"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-white text-black font-bold text-xs p-2.5 border-2 border-black focus:outline-none focus:bg-yellow-50"
                />
              </div>

              <div>
                <label className="block font-display text-xs text-black uppercase mb-1">
                  POSTCODE
                </label>
                <input
                  type="text"
                  placeholder="e.g. SW1A 1AA"
                  value={formData.postcode}
                  onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                  className="w-full bg-white text-black font-mono-code font-bold text-xs p-2.5 border-2 border-black uppercase focus:outline-none focus:bg-yellow-50"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-retro-yellow py-3 text-xs font-display uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0_#000]"
              >
                <Send size={15} />
                <span>SEND ME THE CATALOGUE</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
