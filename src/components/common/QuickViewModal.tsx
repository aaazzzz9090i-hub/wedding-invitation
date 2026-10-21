import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Star, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { PriceDisplay } from './PriceDisplay';
import { QuantitySelector } from './QuantitySelector';
import { handleImageError } from '../../utils';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [errorMsg, setErrorMsg] = useState('');

  if (!product) return null;

  // Initialize selections when modal opens
  const currentColor = selectedColor || product.colors[0]?.name || '';
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      setErrorMsg('Please select a size');
      return;
    }
    setErrorMsg('');
    addToCart(product, selectedSize || 'One Size', currentColor, quantity);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-4xl bg-[#FAF9F5] shadow-2xl z-10 border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-stone-800 transition-colors shadow-sm"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: Product Images */}
            <div className="w-full md:w-1/2 bg-stone-100 flex flex-col">
              <div className="relative aspect-3/4 w-full overflow-hidden bg-stone-200">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  onError={handleImageError}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-2 p-3 bg-stone-100/90 border-t border-stone-200 overflow-x-auto">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-14 h-16 shrink-0 border overflow-hidden cursor-pointer ${
                        activeImageIndex === idx ? 'border-stone-900 ring-1 ring-stone-900' : 'border-stone-300 opacity-70'
                      }`}
                    >
                      <img src={img} alt="" onError={handleImageError} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Info & Form */}
            <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500 font-medium">
                    {product.category} · {product.gender}
                  </span>
                  {product.isNew && (
                    <span className="text-[9px] uppercase tracking-widest bg-stone-900 text-white px-2 py-0.5">
                      New
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-editorial font-medium text-stone-900 leading-snug">
                  {product.name}
                </h2>
                <p className="text-xs text-stone-500 mt-1">{product.subtitle}</p>

                <div className="flex items-center gap-4 mt-3">
                  <PriceDisplay price={product.price} originalPrice={product.originalPrice} size="lg" />
                  <div className="flex items-center gap-1 text-xs text-stone-600">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-stone-900">{product.rating}</span>
                    <span className="text-stone-400">({product.reviewCount})</span>
                  </div>
                </div>

                <p className="text-xs text-stone-600 mt-4 leading-relaxed font-light line-clamp-3">
                  {product.description}
                </p>

                {/* Color Selector */}
                {product.colors.length > 0 && (
                  <div className="mt-6">
                    <div className="flex justify-between items-center text-xs mb-2">
                      <span className="uppercase tracking-widest text-[10px] text-stone-500">Color</span>
                      <span className="text-stone-900 font-medium">{currentColor}</span>
                    </div>
                    <div className="flex gap-2">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setSelectedColor(c.name)}
                          className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                            currentColor === c.name ? 'ring-2 ring-stone-900 ring-offset-2' : 'border-stone-300'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        >
                          {currentColor === c.name && (
                            <Check className={`w-3.5 h-3.5 ${c.hex.toLowerCase() === '#fafafa' || c.hex.toLowerCase() === '#ffffff' ? 'text-black' : 'text-white'}`} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                {product.sizes.length > 0 && (
                  <div className="mt-6">
                    <div className="flex justify-between items-center text-xs mb-2">
                      <span className="uppercase tracking-widest text-[10px] text-stone-500">Select Size</span>
                      <span className="text-stone-500 text-[10px] underline cursor-pointer">Size Guide</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => {
                            setSelectedSize(s);
                            setErrorMsg('');
                          }}
                          className={`px-3 py-2 text-xs uppercase tracking-wider border transition-all cursor-pointer ${
                            selectedSize === s
                              ? 'bg-stone-900 text-white border-stone-900 font-medium'
                              : 'bg-white text-stone-800 border-stone-300 hover:border-stone-900'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    {errorMsg && <p className="text-[11px] text-rose-600 mt-1.5">{errorMsg}</p>}
                  </div>
                )}

                {/* Quantity */}
                <div className="mt-6 flex items-center gap-4">
                  <span className="uppercase tracking-widest text-[10px] text-stone-500">Quantity</span>
                  <QuantitySelector
                    quantity={quantity}
                    onIncrease={() => setQuantity((q) => q + 1)}
                    onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-4 border-t border-stone-200 space-y-3">
                <div className="flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 bg-stone-900 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    Add to Bag
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3.5 border transition-colors cursor-pointer ${
                      isWishlisted
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'border-stone-300 hover:border-stone-900 text-stone-700'
                    }`}
                    title={isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                  </button>
                </div>

                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="w-full py-2.5 text-stone-600 hover:text-stone-900 text-[11px] uppercase tracking-widest font-medium text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Full Product Details & Provenance</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
