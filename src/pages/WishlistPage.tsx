import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { PriceDisplay } from '../components/common/PriceDisplay';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { Product } from '../types';
import { handleImageError } from '../utils';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const handleQuickAdd = (product: Product) => {
    // If multiple sizes, open quick view to select size, otherwise add directly
    if (product.sizes.length > 1) {
      setQuickViewProduct(product);
    } else {
      addToCart(
        product,
        product.sizes[0] || 'One Size',
        product.colors[0]?.name || 'Standard',
        1
      );
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-6">
          <Heart className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-editorial font-normal uppercase tracking-wider text-stone-950">
          Your Wishlist is Empty
        </h1>
        <p className="text-xs text-stone-500 mt-3 max-w-sm mx-auto font-light leading-relaxed">
          Preserve your favorite sartorial silhouettes and horlogerie masterpieces to acquire at a later moment.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-block px-8 py-3.5 bg-stone-950 text-white text-xs uppercase tracking-widest font-medium hover:bg-stone-800 transition-colors"
        >
          Explore All Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Saved Wishlist' }]} />

      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 mb-8 border-b border-stone-200 gap-2">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-medium">
            Personal Curations
          </span>
          <h1 className="text-3xl sm:text-4xl font-editorial font-normal uppercase tracking-wider text-stone-950 mt-1">
            Saved Wishlist ({wishlist.length})
          </h1>
        </div>

        <button
          onClick={clearWishlist}
          className="text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 underline underline-offset-4 cursor-pointer"
        >
          Clear All Saved
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="group relative flex flex-col bg-white border border-stone-200 hover:border-stone-400 transition-all"
          >
            {/* Image */}
            <div className="relative aspect-3/4 overflow-hidden bg-stone-100">
              <Link to={`/product/${product.id}`} className="block w-full h-full">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  onError={handleImageError}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              {/* Remove button */}
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-stone-600 hover:text-rose-600 hover:bg-white flex items-center justify-center transition-colors shadow-sm"
                title="Remove from wishlist"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-stone-400 block mb-1">
                  {product.category}
                </span>
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-sm font-medium text-stone-900 group-hover:underline line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1 font-light">
                  {product.subtitle}
                </p>
                <div className="mt-2">
                  <PriceDisplay price={product.price} originalPrice={product.originalPrice} size="sm" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100">
                <button
                  onClick={() => handleQuickAdd(product)}
                  className="w-full py-2.5 bg-stone-900 text-white text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move to Bag</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
