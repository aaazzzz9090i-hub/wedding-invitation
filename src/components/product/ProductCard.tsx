import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Star } from 'lucide-react';
import { Product } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { PriceDisplay } from '../common/PriceDisplay';
import { handleImageError } from '../../utils';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView, className = '' }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const isSaved = isInWishlist(product.id);
  const hasSecondaryImage = product.images.length > 1;

  return (
    <div
      className={`group relative flex flex-col bg-white border border-stone-100 hover:border-stone-300 transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-3/4 w-full overflow-hidden bg-stone-100">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          {/* Primary Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            onError={handleImageError}
            className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
              isHovered && hasSecondaryImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
            loading="lazy"
          />

          {/* Secondary Hover Image */}
          {hasSecondaryImage && (
            <img
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              onError={handleImageError}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              loading="lazy"
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNew && (
            <span className="text-[9px] uppercase tracking-[0.2em] bg-stone-900 text-white px-2 py-0.5 font-medium shadow-xs">
              New
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="text-[9px] uppercase tracking-[0.2em] bg-white text-stone-900 border border-stone-200 px-2 py-0.5 font-medium shadow-xs">
              Best Seller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
            isSaved
              ? 'bg-rose-50 text-rose-600'
              : 'bg-white/90 text-stone-700 hover:text-stone-900 hover:bg-white'
          }`}
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Quick View Button Hover Bar */}
        {onQuickView && (
          <div
            className={`absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/50 to-transparent transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
            }`}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="w-full py-2.5 bg-white/95 hover:bg-white text-stone-900 text-[10px] uppercase tracking-[0.2em] font-medium transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer backdrop-blur-xs"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick Look</span>
            </button>
          </div>
        )}
      </div>

      {/* Product Details Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-widest text-stone-400 mb-1">
            <span>{product.category}</span>
            <div className="flex items-center gap-1 text-stone-600">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          <Link to={`/product/${product.id}`} className="group-hover:text-stone-700 transition-colors">
            <h3 className="text-sm font-medium text-stone-900 line-clamp-1 tracking-tight">
              {product.name}
            </h3>
          </Link>

          <p className="text-[11px] text-stone-500 mt-1 line-clamp-1 font-light">
            {product.subtitle}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <PriceDisplay price={product.price} originalPrice={product.originalPrice} size="sm" />

          {/* Color Dots */}
          {product.colors.length > 0 && (
            <div className="flex items-center gap-1.5">
              {product.colors.slice(0, 3).map((color, idx) => (
                <span
                  key={color.name}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedColorIndex(idx);
                  }}
                  className={`w-2.5 h-2.5 rounded-full border border-stone-300 transition-all cursor-pointer ${
                    selectedColorIndex === idx ? 'ring-1 ring-stone-900 scale-110' : ''
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-[9px] text-stone-400 font-medium">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
