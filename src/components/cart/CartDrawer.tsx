import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice, handleImageError } from '../../utils';
import { QuantitySelector } from '../common/QuantitySelector';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    discountCode,
    applyDiscount,
    removeDiscount,
    shippingFee,
    total,
    totalCount,
    amountNeededForFreeShipping
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyDiscount(couponInput);
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleGoToCartPage = () => {
    closeCart();
    navigate('/cart');
  };

  const freeShippingProgress = Math.min(100, Math.round(((200 - amountNeededForFreeShipping) / 200) * 100));

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-[#FAF9F5] shadow-2xl z-10 flex flex-col h-full border-l border-stone-200"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-stone-900" />
                <h3 className="text-xs uppercase tracking-[0.25em] font-medium text-stone-900">
                  Shopping Bag ({totalCount})
                </h3>
              </div>
              <button
                onClick={closeCart}
                className="p-1 text-stone-500 hover:text-stone-900 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-[#F2ECE1] p-3.5 border-b border-[#E3D9C9] text-xs">
              {amountNeededForFreeShipping > 0 ? (
                <p className="text-stone-800 tracking-wide font-normal">
                  Add <strong className="font-semibold text-stone-950">{formatPrice(amountNeededForFreeShipping)}</strong> more for complimentary worldwide express delivery.
                </p>
              ) : (
                <p className="text-stone-900 tracking-wide font-medium flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  You have unlocked complimentary worldwide express delivery!
                </p>
              )}
              <div className="w-full bg-stone-300 h-1 mt-2.5 overflow-hidden">
                <div
                  className="bg-stone-900 h-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 divide-y divide-stone-200">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <p className="text-sm uppercase tracking-widest text-stone-900 font-medium">Your Bag is Empty</p>
                  <p className="text-xs text-stone-500 mt-2 max-w-xs font-light">
                    Explore the newest arrivals from our Paris and Biella ateliers.
                  </p>
                  <button
                    onClick={() => {
                      closeCart();
                      navigate('/shop');
                    }}
                    className="mt-6 px-6 py-3 bg-stone-900 text-white text-xs uppercase tracking-widest font-medium hover:bg-stone-800 transition-colors"
                  >
                    Discover Collections
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="py-5 flex gap-4">
                    <div className="w-20 h-26 bg-stone-100 shrink-0 overflow-hidden border border-stone-200">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        onError={handleImageError}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-medium text-stone-900 line-clamp-2">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() =>
                              removeFromCart(item.product.id, item.selectedSize, item.selectedColor)
                            }
                            className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-1 uppercase tracking-wider">
                          Size: <span className="text-stone-900 font-medium">{item.selectedSize}</span> · Color:{' '}
                          <span className="text-stone-900 font-medium">{item.selectedColor}</span>
                        </p>
                        <p className="text-xs font-semibold text-stone-900 mt-1">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <QuantitySelector
                          size="sm"
                          quantity={item.quantity}
                          onIncrease={() =>
                            updateQuantity(item.product.id, item.selectedSize, item.selectedColor, 1)
                          }
                          onDecrease={() =>
                            updateQuantity(item.product.id, item.selectedSize, item.selectedColor, -1)
                          }
                        />
                        <span className="text-xs font-medium text-stone-900">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-stone-200">
                {/* Promo Code Input */}
                {discountCode ? (
                  <div className="flex items-center justify-between p-2.5 bg-stone-50 border border-stone-200 mb-4 text-xs">
                    <div className="flex items-center gap-2 text-stone-900">
                      <Tag className="w-3.5 h-3.5 text-stone-600" />
                      <span className="uppercase tracking-wider font-medium">{discountCode}</span>
                      <span className="text-emerald-700 font-semibold">(-10%)</span>
                    </div>
                    <button
                      onClick={removeDiscount}
                      className="text-[11px] uppercase tracking-wider text-stone-400 hover:text-stone-900"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Promo code (e.g. VERO10)"
                      className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 text-xs tracking-wider uppercase placeholder:normal-case focus:border-stone-900 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-stone-200 hover:bg-stone-900 hover:text-white transition-colors text-xs uppercase tracking-widest font-medium cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {/* Subtotals */}
                <div className="space-y-2 text-xs text-stone-600 pb-4 border-b border-stone-100">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-stone-900 font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Privilege Privilege ({discountCode})</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Worldwide Express Shipping</span>
                    <span className="text-stone-900 font-medium">
                      {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-sm font-semibold text-stone-900 pt-3 mb-5">
                  <span className="uppercase tracking-widest text-xs">Estimated Total</span>
                  <span>{formatPrice(total)}</span>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full py-3.5 bg-stone-900 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleGoToCartPage}
                    className="w-full py-2.5 text-stone-600 hover:text-stone-900 text-[11px] uppercase tracking-widest font-medium text-center transition-colors underline underline-offset-4"
                  >
                    View Full Shopping Bag
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
