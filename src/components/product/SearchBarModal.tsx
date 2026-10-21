import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { formatPrice, handleImageError } from '../../utils';

interface SearchBarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchBarModal: React.FC<SearchBarModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const filteredProducts = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.material.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleSelectProduct = (productId: string) => {
    navigate(`/product/${productId}`);
    onClose();
  };

  const quickSearches = ['Cashmere Coat', 'Ghostrunner', 'Trench', 'Tourbillon', 'Weekender', 'Silk'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-start">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Search Content */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full bg-[#FAF9F5] border-b border-stone-200 z-10 shadow-2xl py-8 px-4 sm:px-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between pb-6 border-b border-stone-200">
                <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500 font-medium">
                  Search VÉRO Collections
                </span>
                <button
                  onClick={onClose}
                  className="p-1.5 text-stone-500 hover:text-stone-900 transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSearchSubmit} className="relative mt-6">
                <Search className="w-6 h-6 text-stone-400 absolute left-0 top-1/2 -translate-y-1/2" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search cashmere, footwear, horlogerie, leather goods..."
                  className="w-full pl-10 pr-12 py-3 bg-transparent border-b-2 border-stone-900 text-stone-900 text-lg sm:text-2xl font-editorial placeholder:text-stone-400 focus:outline-none tracking-wide"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-900 text-xs uppercase tracking-widest"
                  >
                    Clear
                  </button>
                )}
              </form>

              {/* Quick Suggestions */}
              {!query.trim() && (
                <div className="mt-8">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-3 font-medium">
                    Suggested Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {quickSearches.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          setQuery(term);
                          navigate(`/shop?search=${encodeURIComponent(term)}`);
                          onClose();
                        }}
                        className="px-4 py-2 text-xs uppercase tracking-wider bg-stone-100 hover:bg-stone-900 hover:text-white transition-colors border border-stone-200 cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Live Results */}
              {query.trim() && (
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">
                      {filteredProducts.length} Results Found
                    </p>
                    {filteredProducts.length > 0 && (
                      <button
                        onClick={handleSearchSubmit}
                        className="text-xs uppercase tracking-widest font-medium text-stone-900 hover:underline flex items-center gap-1.5"
                      >
                        View all results <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {filteredProducts.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => handleSelectProduct(product.id)}
                          className="flex gap-4 p-3 bg-white border border-stone-100 hover:border-stone-900 transition-all cursor-pointer group"
                        >
                          <div className="w-20 h-24 bg-stone-100 shrink-0 overflow-hidden">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              onError={handleImageError}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex flex-col justify-between py-1">
                            <div>
                              <p className="text-[9px] uppercase tracking-widest text-stone-400">
                                {product.category}
                              </p>
                              <h4 className="text-xs font-medium text-stone-900 group-hover:underline line-clamp-2 mt-0.5">
                                {product.name}
                              </h4>
                            </div>
                            <p className="text-xs font-semibold text-stone-900">
                              {formatPrice(product.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-stone-500 text-sm">No items matching "{query}".</p>
                      <button
                        onClick={() => navigate('/shop')}
                        className="mt-3 text-xs uppercase tracking-widest font-medium text-stone-900 underline"
                      >
                        Browse all collections
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
