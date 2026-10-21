import React from 'react';
import { formatPrice, calculateDiscountPercentage } from '../../utils';

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  originalPrice,
  size = 'md',
  className = ''
}) => {
  const discount = calculateDiscountPercentage(price, originalPrice);

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base font-medium',
    xl: 'text-2xl font-light tracking-tight'
  };

  return (
    <div className={`flex items-baseline gap-2.5 flex-wrap ${className}`}>
      <span className={`tracking-wide text-stone-900 ${sizeClasses[size]}`}>
        {formatPrice(price)}
      </span>

      {originalPrice && originalPrice > price && (
        <>
          <span className="text-xs text-stone-400 line-through tracking-normal">
            {formatPrice(originalPrice)}
          </span>
          {discount > 0 && (
            <span className="text-[10px] uppercase tracking-widest text-rose-800 bg-rose-50 px-1.5 py-0.5 border border-rose-100 font-medium">
              -{discount}%
            </span>
          )}
        </>
      )}
    </div>
  );
};
