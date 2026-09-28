import React, { useEffect } from 'react';
import { Sparkles, CheckCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClear: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClear }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClear();
    }, 3200);
    return () => clearTimeout(timer);
  }, [message, onClear]);

  if (!message) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom duration-200 pointer-events-none">
      <div className="bg-[#ffdf00] text-black border-3 border-black px-4 py-2.5 shadow-[5px_5px_0_#000] flex items-center gap-2.5 max-w-sm">
        <div className="w-6 h-6 rounded-full bg-black text-[#ffdf00] flex items-center justify-center shrink-0">
          <Sparkles size={13} strokeWidth={2.5} />
        </div>
        <p className="font-display text-xs tracking-wide uppercase leading-tight">
          {message}
        </p>
      </div>
    </div>
  );
};
