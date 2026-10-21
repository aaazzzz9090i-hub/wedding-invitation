import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  max?: number;
  min?: number;
  size?: 'sm' | 'md';
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  max = 99,
  min = 1,
  size = 'md'
}) => {
  const isSm = size === 'sm';

  return (
    <div className={`inline-flex items-center border border-stone-200 bg-white ${isSm ? 'h-8' : 'h-11'}`}>
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        className={`flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
          isSm ? 'w-7 h-7' : 'w-10 h-10'
        }`}
        aria-label="Decrease quantity"
      >
        <Minus className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      </button>

      <span
        className={`text-center font-medium text-stone-900 select-none ${
          isSm ? 'w-8 text-xs' : 'w-12 text-sm'
        }`}
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        className={`flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
          isSm ? 'w-7 h-7' : 'w-10 h-10'
        }`}
        aria-label="Increase quantity"
      >
        <Plus className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      </button>
    </div>
  );
};
