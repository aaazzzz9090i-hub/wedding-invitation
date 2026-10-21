import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { FilterSidebar } from '../components/product/FilterSidebar';
import { ProductGrid } from '../components/product/ProductGrid';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FilterState } from '../types';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Initialize filters from URL params if present
  const categoryParam = searchParams.get('category') || 'all';
  const genderParam = searchParams.get('gender') || 'all';
  const searchParam = searchParams.get('search') || '';
  const sortParam = (searchParams.get('sort') as FilterState['sortBy']) || 'featured';

  const [filters, setFilters] = useState<FilterState>({
    category: categoryParam,
    gender: genderParam,
    minPrice: 0,
    maxPrice: 7000,
    sizes: [],
    colors: [],
    search: searchParam,
    sortBy: sortParam
  });

  // Keep state synced with URL search params changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: searchParams.get('category') || 'all',
      gender: searchParams.get('gender') || 'all',
      search: searchParams.get('search') || '',
      sortBy: (searchParams.get('sort') as FilterState['sortBy']) || prev.sortBy
    }));
  }, [searchParams]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);

    // Update query params
    const params: Record<string, string> = {};
    if (newFilters.category !== 'all') params.category = newFilters.category;
    if (newFilters.gender !== 'all') params.gender = newFilters.gender;
    if (newFilters.search) params.search = newFilters.search;
    if (newFilters.sortBy !== 'featured') params.sort = newFilters.sortBy;

    setSearchParams(params, { replace: true });
  };

  const handleResetFilters = () => {
    const defaultFilters: FilterState = {
      category: 'all',
      gender: 'all',
      minPrice: 0,
      maxPrice: 7000,
      sizes: [],
      colors: [],
      search: '',
      sortBy: 'featured'
    };
    setFilters(defaultFilters);
    setSearchParams({}, { replace: true });
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }

      // Gender filter
      if (filters.gender !== 'all') {
        if (filters.gender === 'men' && product.gender === 'women') return false;
        if (filters.gender === 'women' && product.gender === 'men') return false;
      }

      // Price filter
      if (product.price > filters.maxPrice) {
        return false;
      }

      // Size filter
      if (filters.sizes.length > 0) {
        const hasSize = product.sizes.some((s) => filters.sizes.includes(s));
        if (!hasSize) return false;
      }

      // Color filter
      if (filters.colors.length > 0) {
        const hasColor = product.colors.some((c) =>
          filters.colors.some((selectedCol) =>
            c.name.toLowerCase().includes(selectedCol.toLowerCase())
          )
        );
        if (!hasColor) return false;
      }

      // Search keyword filter
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesSub = product.subtitle.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesMat = product.material.toLowerCase().includes(query);
        if (!matchesName && !matchesSub && !matchesCat && !matchesMat) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      // 'featured'
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [filters]);

  const currentCategoryObj = CATEGORIES.find((c) => c.id === filters.category);

  // Active filter tags for quick removal
  const activeFilterTags: { label: string; onRemove: () => void }[] = [];
  if (filters.category !== 'all') {
    activeFilterTags.push({
      label: `Category: ${currentCategoryObj?.name || filters.category}`,
      onRemove: () => handleFilterChange({ ...filters, category: 'all' })
    });
  }
  if (filters.gender !== 'all') {
    activeFilterTags.push({
      label: `Gender: ${filters.gender}`,
      onRemove: () => handleFilterChange({ ...filters, gender: 'all' })
    });
  }
  if (filters.maxPrice < 7000) {
    activeFilterTags.push({
      label: `Max $${filters.maxPrice}`,
      onRemove: () => handleFilterChange({ ...filters, maxPrice: 7000 })
    });
  }
  if (filters.search) {
    activeFilterTags.push({
      label: `Search: "${filters.search}"`,
      onRemove: () => handleFilterChange({ ...filters, search: '' })
    });
  }
  filters.sizes.forEach((size) => {
    activeFilterTags.push({
      label: `Size: ${size}`,
      onRemove: () =>
        handleFilterChange({
          ...filters,
          sizes: filters.sizes.filter((s) => s !== size)
        })
    });
  });
  filters.colors.forEach((col) => {
    activeFilterTags.push({
      label: `Color: ${col}`,
      onRemove: () =>
        handleFilterChange({
          ...filters,
          colors: filters.colors.filter((c) => c !== col)
        })
    });
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Shop Catalog', path: '/shop' },
          ...(filters.category !== 'all' ? [{ label: currentCategoryObj?.name || filters.category }] : [])
        ]}
      />

      {/* Catalog Header */}
      <div className="py-6 border-b border-stone-200 mb-8">
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-medium">
          The Permanent & Seasonal Collection
        </span>
        <h1 className="text-3xl sm:text-4xl font-editorial font-normal uppercase tracking-wider text-stone-950 mt-1">
          {currentCategoryObj?.name || 'All Creations'}
        </h1>
        <p className="text-xs text-stone-600 mt-2 font-light max-w-2xl leading-relaxed">
          {currentCategoryObj?.description ||
            'Explore modern bespoke tailoring, cashmere outerwear, fine Italian sneakers, and high horlogerie chronographs.'}
        </p>

        {/* Mobile Filter Button */}
        <div className="mt-6 flex lg:hidden items-center justify-between">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="px-4 py-2 bg-stone-900 text-white text-xs uppercase tracking-widest font-medium flex items-center gap-2"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter Catalog ({activeFilterTags.length})</span>
          </button>
        </div>
      </div>

      {/* Active Filter Tags */}
      {activeFilterTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-8 p-3 bg-stone-100/70 border border-stone-200">
          <span className="text-[10px] uppercase tracking-widest text-stone-500 font-medium mr-1">
            Active Filters:
          </span>
          {activeFilterTags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-stone-300 text-[11px] text-stone-800 tracking-wider"
            >
              <span>{tag.label}</span>
              <button
                onClick={tag.onRemove}
                className="hover:text-rose-600 transition-colors p-0.5"
                title="Remove filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          <button
            onClick={handleResetFilters}
            className="text-[11px] uppercase tracking-wider text-stone-600 hover:text-stone-900 underline ml-2 cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Layout: Sidebar + Grid */}
      <div className="flex gap-10">
        <FilterSidebar
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
          isMobileOpen={isMobileFiltersOpen}
          onMobileClose={() => setIsMobileFiltersOpen(false)}
        />

        <ProductGrid
          products={filteredProducts}
          sortBy={filters.sortBy}
          onSortChange={(value) => handleFilterChange({ ...filters, sortBy: value })}
          onResetFilters={handleResetFilters}
          itemsPerPage={12}
        />
      </div>
    </div>
  );
};
