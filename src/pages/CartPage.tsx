import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag, Gift, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { QuantitySelector } from '../components/common/QuantitySelector';
import { formatPrice, handleImageError } from '../utils';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
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

  const [promoInput, setPromoInput] = useState('');
  const [includeGiftWrap, setIncludeGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyDiscount(promoInput);
      setPromoInput('');
    }
  };

  const freeShippingProgress = Math.min(100, Math.round(((200 - amountNeededForFreeShipping) / 200) * 100));

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-6">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-editorial font-normal uppercase tracking-wider text-stone-950">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-xs text-stone-500 mt-3 max-w-sm mx-auto font-light leading-relaxed">
          You have not selected any garments or horlogerie pieces yet. Discover our latest autumn releases or iconic best sellers.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/shop"
            className="px-8 py-3.5 bg-stone-900 text-white text-xs uppercase tracking-widest font-medium hover:bg-stone-800 transition-colors"
          >
            Discover All Collections
          </Link>
          <Link
            to="/wishlist"
            className="px-8 py-3.5 bg-white border border-stone-300 text-stone-800 text-xs uppercase tracking-widest font-medium hover:border-stone-900 transition-colors"
          >
            View Saved Wishlist
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Shopping Bag' }]} />

      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 mb-8 border-b border-stone-200 gap-2">
        <h1 className="text-3xl sm:text-4xl font-editorial font-normal uppercase tracking-wider text-stone-950">
          Shopping Bag ({totalCount})
        </h1>
        <Link
          to="/shop"
          className="text-xs uppercase tracking-widest font-medium text-stone-600 hover:text-stone-900 underline underline-offset-4"
        >
          Continue Browsing
        </Link>
      </div>

      {/* Free Shipping Notification Bar */}
      <div className="bg-[#F2ECE1] p-4 border border-[#E3D9C9] mb-8 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          {amountNeededForFreeShipping > 0 ? (
            <p className="text-stone-800 tracking-wide font-normal">
              Acquire <strong className="font-semibold text-stone-950">{formatPrice(amountNeededForFreeShipping)}</strong> more to receive complimentary worldwide express delivery.
            </p>
          ) : (
            <p className="text-stone-900 tracking-wide font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              You have qualified for complimentary worldwide express delivery!
            </p>
          )}
          <span className="text-[11px] text-stone-500 uppercase tracking-widest">
            {freeShippingProgress}% Completed
          </span>
        </div>
        <div className="w-full bg-stone-300 h-1.5 mt-2.5 overflow-hidden">
          <div
            className="bg-stone-900 h-full transition-all duration-500"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Items List (8 Cols) */}
        <div className="lg:col-span-8">
          <div className="border border-stone-200 bg-white divide-y divide-stone-200">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                className="p-6 flex flex-col sm:flex-row gap-6 items-start"
              >
                {/* Image */}
                <Link
                  to={`/product/${item.product.id}`}
                  className="w-28 h-36 bg-stone-100 shrink-0 overflow-hidden border border-stone-200"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    onError={handleImageError}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between h-full w-full">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-stone-400 font-medium">
                          {item.product.category}
                        </span>
                        <Link to={`/product/${item.product.id}`}>
                          <h3 className="text-base font-editorial font-medium text-stone-950 hover:underline">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-stone-500 font-light mt-0.5">
                          {item.product.subtitle}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          removeFromCart(item.product.id, item.selectedSize, item.selectedColor)
                        }
                        className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                        title="Remove from bag"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600 mt-3 pt-3 border-t border-stone-100">
                      <div>
                        <span className="text-stone-400 uppercase tracking-widest text-[10px]">
                          Size:{' '}
                        </span>
                        <span className="font-medium text-stone-900">{item.selectedSize}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 uppercase tracking-widest text-[10px]">
                          Color:{' '}
                        </span>
                        <span className="font-medium text-stone-900">{item.selectedColor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-3 border-t border-stone-100">
                    <QuantitySelector
                      quantity={item.quantity}
                      onIncrease={() =>
                        updateQuantity(item.product.id, item.selectedSize, item.selectedColor, 1)
                      }
                      onDecrease={() =>
                        updateQuantity(item.product.id, item.selectedSize, item.selectedColor, -1)
                      }
                    />

                    <div className="text-right">
                      <span className="text-[10px] text-stone-400 block uppercase tracking-wider">
                        {formatPrice(item.product.price)} each
                      </span>
                      <span className="text-base font-semibold text-stone-950">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Complimentary Gift Box Option */}
          <div className="mt-6 p-6 bg-white border border-stone-200">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeGiftWrap}
                onChange={(e) => setIncludeGiftWrap(e.target.checked)}
                className="mt-1 accent-stone-900 cursor-pointer"
              />
              <div>
                <div className="flex items-center gap-1.5 font-medium text-xs text-stone-900 uppercase tracking-wider">
                  <Gift className="w-3.5 h-3.5 text-stone-700" />
                  <span>Complimentary Atelier Signature Gift Packaging</span>
                </div>
                <p className="text-xs text-stone-500 font-light mt-1">
                  Includes embossed presentation linen box, silk ribbon, and custom handwritten calligraphed card.
                </p>
              </div>
            </label>

            {includeGiftWrap && (
              <div className="mt-4 pt-4 border-t border-stone-100">
                <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">
                  Personal Inscription Note (Optional)
                </label>
                <textarea
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="Inscribe a personal message for the recipient..."
                  rows={2}
                  className="w-full p-3 bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Summary (4 Cols) */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-stone-200 p-6 sm:p-8 sticky top-24">
            <h2 className="text-sm uppercase tracking-[0.25em] font-semibold text-stone-950 pb-4 border-b border-stone-200">
              Order Summary
            </h2>

            {/* Promo code form */}
            <div className="py-4 border-b border-stone-200">
              {discountCode ? (
                <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-2 text-stone-900">
                    <Tag className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="font-semibold uppercase tracking-wider">{discountCode}</span>
                    <span className="text-emerald-700 font-semibold">(-10%)</span>
                  </div>
                  <button
                    onClick={removeDiscount}
                    className="text-[11px] uppercase tracking-wider text-stone-400 hover:text-stone-900 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code (e.g. VERO10)"
                    className="flex-1 px-3 py-2.5 bg-stone-50 border border-stone-300 text-xs tracking-wider uppercase placeholder:normal-case focus:border-stone-900 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-widest font-medium hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              <p className="text-[10px] text-stone-400 mt-2">
                Tip: Enter <strong className="text-stone-700">VERO10</strong> for 10% welcome privilege.
              </p>
            </div>

            {/* Price breakdown */}
            <div className="space-y-3 py-4 text-xs text-stone-600 border-b border-stone-200">
              <div className="flex justify-between">
                <span>Subtotal ({totalCount} items)</span>
                <span className="text-stone-900 font-medium">{formatPrice(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Welcome Privilege (10%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Worldwide Express Shipping</span>
                <span className="text-stone-900 font-medium">
                  {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
                </span>
              </div>

              {includeGiftWrap && (
                <div className="flex justify-between text-stone-800">
                  <span>Signature Gift Packaging</span>
                  <span className="font-medium text-emerald-700">Complimentary</span>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="flex justify-between items-baseline pt-4 mb-6">
              <span className="text-xs uppercase tracking-widest font-medium text-stone-900">
                Total Acquisition
              </span>
              <span className="text-2xl font-serif font-medium text-stone-950">
                {formatPrice(total)}
              </span>
            </div>

            {/* Proceed to checkout */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-stone-950 text-white text-xs uppercase tracking-[0.25em] font-medium hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xl"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="mt-4 text-center">
              <Link
                to="/shop"
                className="text-xs text-stone-500 hover:text-stone-900 underline underline-offset-2 tracking-wider"
              >
                or Continue Shopping
              </Link>
            </div>

            {/* Security badges */}
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-center gap-4 text-stone-400 text-[10px] uppercase tracking-wider">
              <span>Encrypted Checkout</span>
              <span>·</span>
              <span>Atelier Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
