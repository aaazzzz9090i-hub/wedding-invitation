import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-stone-900 text-stone-200 text-[11px] uppercase tracking-[0.2em] py-2 px-4 relative z-40 transition-all border-b border-stone-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 text-center flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3 text-amber-300 hidden sm:inline-block" />
          <span>
            Autumn/Winter 2026: Use code <strong className="text-white underline underline-offset-4 tracking-widest font-bold">VERO10</strong> for 10% privilege · Complimentary worldwide express delivery over $200
          </span>
          <Link
            to="/shop"
            className="hidden md:inline-block ml-3 font-semibold text-white underline underline-offset-2 hover:text-stone-300 transition-colors"
          >
            Shop Edit
          </Link>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-stone-400 hover:text-white transition-colors ml-2 p-1"
          aria-label="Close announcement bar"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
