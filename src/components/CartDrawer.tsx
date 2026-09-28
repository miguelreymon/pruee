import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { ToyItem } from '../data/catalogueData';
import { playRetroSound } from '../utils/audio';

export interface CartItem {
  toy: ToyItem;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onShowToast: (msg: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onShowToast,
}) => {
  if (!isOpen) return null;

  const total = cartItems.reduce(
    (sum, item) => sum + item.toy.numericPrice * item.quantity,
    0
  );

  const freeDeliveryThreshold = 25.0;
  const deliveryLeft = Math.max(0, freeDeliveryThreshold - total);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-[#f5f3ec] border-l-3 border-black h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Top Header */}
        <div className="bg-[#0b47b8] text-white border-b-2 border-black p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#ffdf00]" />
            <h2 className="font-display text-base tracking-wide uppercase text-white">
              MY CATALOGUE ORDER
            </h2>
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

        {/* Free Delivery Bar */}
        <div className="bg-[#ffdf00] border-b-2 border-black px-4 py-2 flex items-center gap-2 text-xs font-bold text-black">
          <Truck size={16} />
          {deliveryLeft <= 0 ? (
            <span className="font-black text-emerald-800">
              FREE UK DELIVERY UNLOCKED!
            </span>
          ) : (
            <span>
              Add <span className="font-black">£{deliveryLeft.toFixed(2)}</span> more for Free UK Delivery!
            </span>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-black/40">
              <ShoppingBag size={48} className="text-slate-400 mb-2 stroke-1" />
              <p className="font-display text-sm uppercase text-slate-700">
                YOUR ORDER IS EMPTY
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Browse the catalogue and click Add to Cart or Quick Order!
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.toy.id}
                className="bg-white border-2 border-black p-3 flex gap-3 shadow-[2px_2px_0_#000]"
              >
                <div
                  className={`w-16 h-16 ${item.toy.bgTone} border border-black p-1 shrink-0 flex items-center justify-center`}
                >
                  <img
                    src={item.toy.image}
                    alt={item.toy.name}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-display text-xs text-black uppercase leading-tight">
                        {item.toy.name}
                      </h4>
                      <span className="font-mono-code text-[10px] text-slate-600 block">
                        {item.toy.stockCode}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        playRetroSound('click');
                        onRemoveItem(item.toy.id);
                        onShowToast(`Removed ${item.toy.name} from order`);
                      }}
                      className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-black bg-slate-50">
                      <button
                        onClick={() => {
                          playRetroSound('click');
                          onUpdateQuantity(item.toy.id, -1);
                        }}
                        className="px-2 py-0.5 text-xs font-bold hover:bg-yellow-200 border-r border-black cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-mono-code font-bold text-xs px-2">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          playRetroSound('click');
                          onUpdateQuantity(item.toy.id, 1);
                        }}
                        className="px-2 py-0.5 text-xs font-bold hover:bg-yellow-200 border-l border-black cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-display text-xs text-black">
                      £{(item.toy.numericPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Checkout Footer */}
        <div className="border-t-2 border-black bg-white p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono-code text-xs text-slate-600">ITEMS TOTAL:</span>
            <span className="font-display text-base text-black">
              £{total.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center mb-4 text-xs font-bold">
            <span className="text-slate-600">UK POSTAGE:</span>
            <span className={deliveryLeft <= 0 ? 'text-emerald-700 font-black' : 'text-black'}>
              {deliveryLeft <= 0 ? 'FREE' : '£2.95'}
            </span>
          </div>

          <button
            onClick={() => {
              playRetroSound('coin');
              onShowToast('Checkout simulated! Order dispatched to 1985 warehouse.');
            }}
            disabled={cartItems.length === 0}
            className="w-full btn-retro-yellow py-3 px-4 font-display text-sm tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-[3px_4px_0_#000] disabled:opacity-50"
          >
            <span>DISPATCH ORDER</span>
            <ArrowRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};
