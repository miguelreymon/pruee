import React from 'react';
import { playRetroSound } from '../utils/audio';

interface FooterProps {
  onShowToast: (msg: string) => void;
  onRequestCatalogue: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onShowToast,
  onRequestCatalogue,
}) => {
  return (
    <footer className="bg-[#1a1c23] text-white border-t-3 border-black pt-8 pb-12 select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-8 border-b border-slate-700/60">
          {/* Column 1 */}
          <div>
            <h4 className="font-display text-xs sm:text-sm text-[#ffdf00] uppercase tracking-wider mb-3">
              HELP & ORDERS
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-semibold">
              <li>
                <button
                  onClick={() => {
                    playRetroSound('click');
                    onShowToast('Track your 1985 order package with your STK code');
                  }}
                  className="hover:text-yellow-400 cursor-pointer"
                >
                  Order Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    playRetroSound('click');
                    onShowToast('All UK orders dispatched in heavy protective cartons');
                  }}
                  className="hover:text-yellow-400 cursor-pointer"
                >
                  Delivery & Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    playRetroSound('click');
                    onRequestCatalogue();
                  }}
                  className="hover:text-yellow-400 cursor-pointer"
                >
                  Order Free Catalogue
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-display text-xs sm:text-sm text-[#ffdf00] uppercase tracking-wider mb-3">
              POPULAR DEPARTMENTS
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-semibold">
              <li>
                <button
                  onClick={() => {
                    playRetroSound('click');
                    onShowToast('Showing Clockwork & Tinplate Robot figures');
                  }}
                  className="hover:text-yellow-400 cursor-pointer"
                >
                  Clockwork Robots
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    playRetroSound('click');
                    onShowToast('Showing Die-cast Turbo Racers');
                  }}
                  className="hover:text-yellow-400 cursor-pointer"
                >
                  Friction Stunt Cars
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    playRetroSound('click');
                    onShowToast('Showing Electronic Arcade Handhelds');
                  }}
                  className="hover:text-yellow-400 cursor-pointer"
                >
                  Electronic Handhelds
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-display text-xs sm:text-sm text-[#ffdf00] uppercase tracking-wider mb-3">
              COLLECTOR CLUB
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-semibold">
              <li>
                <button
                  onClick={() => {
                    playRetroSound('click');
                    onShowToast('Monthly newsletter delivered by post');
                  }}
                  className="hover:text-yellow-400 cursor-pointer"
                >
                  Club Newsletter
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    playRetroSound('click');
                    onShowToast('Special savings tokens printed in catalogue');
                  }}
                  className="hover:text-yellow-400 cursor-pointer"
                >
                  Catalogue Tokens
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    playRetroSound('click');
                    onShowToast('Certified British Toy Safety Standards BSI-85');
                  }}
                  className="hover:text-yellow-400 cursor-pointer"
                >
                  Safety Standard BS 5665
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="font-display text-xs sm:text-sm text-[#ffdf00] uppercase tracking-wider mb-2">
                NOVA PLAY LTD
              </h4>
              <p className="text-[11px] text-slate-400 leading-snug">
                Inspired by classic 1980s toy catalogues. Every toy pictured is guaranteed 100% authentic fun.
              </p>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="font-mono-code text-[10px] bg-slate-800 text-yellow-300 border border-slate-700 px-2 py-0.5">
                VINTAGE EDITION 1985
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p className="font-medium">
            © 1985 NOVA PLAY TOYS & NOVELTIES CO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-4 text-[11px] font-bold">
            <span className="text-yellow-400">ENGLAND & WALES REG. NO. 0184920</span>
            <span>·</span>
            <span>TERMS & CONDITIONS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
