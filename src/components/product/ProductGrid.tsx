import React, { useState } from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { QuickViewModal } from '../common/QuickViewModal';
import { LayoutGrid, Grid3X3, ArrowUpDown, RefreshCw } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  sortBy: string;
  onSortChange: (value: any) => void;
  onResetFilters?: () => void;
  itemsPerPage?: number;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  sortBy,
  onSortChange,
  onResetFilters,
  itemsPerPage = 12
}) => {
  const [columns, setColumns] = useState<'normal' | 'dense'>('normal');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);

  const displayedProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + itemsPerPage);
  };

  return (
    <div className="flex-1">
      {/* Grid Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-stone-200 gap-4">
        <p className="text-xs uppercase tracking-widest text-stone-500 font-light">
          Showing <span className="text-stone-900 font-medium">{displayedProducts.length}</span> of{' '}
          <span className="text-stone-900 font-medium">{products.length}</span> Masterpieces
        </p>

        <div className="flex items-center gap-4 self-end sm:self-auto">
          {/* Column toggler */}
          <div className="hidden sm:flex items-center gap-1 border-r border-stone-200 pr-4">
            <button
              onClick={() => setColumns('normal')}
              className={`p-1.5 transition-colors cursor-pointer ${
                columns === 'normal' ? 'text-stone-900 bg-stone-100' : 'text-stone-400 hover:text-stone-700'
              }`}
              title="Standard Grid"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setColumns('dense')}
              className={`p-1.5 transition-colors cursor-pointer ${
                columns === 'dense' ? 'text-stone-900 bg-stone-100' : 'text-stone-400 hover:text-stone-700'
              }`}
              title="Compact 4-Column Grid"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent text-xs uppercase tracking-wider text-stone-900 focus:outline-none cursor-pointer py-1"
            >
              <option value="featured">Featured & Curated</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid Display */}
      {products.length === 0 ? (
        <div className="py-20 text-center bg-white border border-stone-200 p-8 my-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h3 className="text-base font-editorial font-medium text-stone-900">
            No garments match your active filters
          </h3>
          <p className="text-xs text-stone-500 mt-2 max-w-sm mx-auto font-light">
            Try adjusting your price threshold, size selection, or category filters to discover more items.
          </p>
          {onResetFilters && (
            <button
              onClick={onResetFilters}
              className="mt-6 px-6 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-widest font-medium hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div
            className={`grid gap-4 sm:gap-6 ${
              columns === 'normal'
                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            }`}
          >
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-12 text-center">
              <button
                onClick={handleLoadMore}
                className="px-8 py-3.5 border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-all text-xs uppercase tracking-[0.2em] font-medium cursor-pointer"
              >
                Load More Pieces ({products.length - visibleCount} Remaining)
              </button>
            </div>
          )}
        </>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
