import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import { handleImageError } from '../utils';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto">
          <Compass className="w-8 h-8" />
        </div>

        <span className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-medium block">
          404 · Dimension Unfound
        </span>

        <h1 className="text-4xl sm:text-5xl font-editorial font-normal uppercase tracking-wider text-stone-950">
          A Lost Silhouette
        </h1>

        <p className="text-xs text-stone-600 font-light leading-relaxed max-w-sm mx-auto">
          The archive corridor you have attempted to access does not exist or has been relocated to our private vaults.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/shop"
            className="w-full sm:w-auto px-8 py-3.5 bg-stone-950 text-white text-xs uppercase tracking-widest font-medium hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto px-8 py-3.5 bg-white border border-stone-300 text-stone-800 text-xs uppercase tracking-widest font-medium hover:border-stone-900 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};
