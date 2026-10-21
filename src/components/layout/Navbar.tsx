import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User as UserIcon, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { SearchBarModal } from '../product/SearchBarModal';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const { totalCount, openCart } = useCart();
  const { wishlist } = useWishlist();
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const navCategories = [
    {
      name: "Men",
      path: "/shop?category=men",
      subItems: [
        { name: "All Men's", path: "/shop?category=men" },
        { name: "Outerwear & Coats", path: "/shop?category=men" },
        { name: "Tailored Blazers", path: "/shop?category=men" },
        { name: "Cashmere Knitwear", path: "/shop?category=men" },
        { name: "Trousers", path: "/shop?category=men" }
      ]
    },
    {
      name: "Women",
      path: "/shop?category=women",
      subItems: [
        { name: "All Women's", path: "/shop?category=women" },
        { name: "Double-Faced Coats", path: "/shop?category=women" },
        { name: "Silk Evening Gowns", path: "/shop?category=women" },
        { name: "Cashmere Sweaters", path: "/shop?category=women" },
        { name: "Wide-Leg Trousers", path: "/shop?category=women" }
      ]
    },
    {
      name: "Sneakers & Shoes",
      path: "/shop?category=sneakers",
      subItems: [
        { name: "All Footwear", path: "/shop?category=sneakers" },
        { name: "VÉRO Ghostrunner", path: "/shop?category=sneakers" },
        { name: "Calfskin Derbies", path: "/shop?category=sneakers" },
        { name: "Suede Chelsea Boots", path: "/shop?category=sneakers" },
        { name: "AeroKnit Runners", path: "/shop?category=sneakers" }
      ]
    },
    {
      name: "Accessories",
      path: "/shop?category=accessories",
      subItems: [
        { name: "All Bags & Leather", path: "/shop?category=accessories" },
        { name: "The Grand Tour Weekender", path: "/shop?category=accessories" },
        { name: "Shoulder Bags", path: "/shop?category=accessories" },
        { name: "Silk Twill Scarves", path: "/shop?category=accessories" },
        { name: "French Calf Wallets", path: "/shop?category=accessories" }
      ]
    },
    {
      name: "Watches",
      path: "/shop?category=watches",
      subItems: [
        { name: "All Timepieces", path: "/shop?category=watches" },
        { name: "Chronographe Automatique", path: "/shop?category=watches" },
        { name: "Skeleton Tourbillon", path: "/shop?category=watches" },
        { name: "Ultra-Thin Dress", path: "/shop?category=watches" },
        { name: "Titanium Diver 300M", path: "/shop?category=watches" }
      ]
    }
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF9F5]/95 backdrop-blur-md shadow-xs border-b border-stone-200/80 py-3.5'
            : 'bg-[#FAF9F5] border-b border-stone-200 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Mobile hamburger & secondary nav */}
            <div className="flex items-center gap-4 lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1 text-stone-900 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1 text-stone-900 hover:text-stone-600 transition-colors"
                aria-label="Search items"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              <Link
                to="/shop"
                className="text-[11px] uppercase tracking-[0.25em] font-medium text-stone-900 hover:text-stone-500 transition-colors"
              >
                All Collections
              </Link>

              {navCategories.map((cat) => (
                <div
                  key={cat.name}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(cat.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={cat.path}
                    className="text-[11px] uppercase tracking-[0.25em] font-medium text-stone-900 hover:text-stone-500 transition-colors py-2 flex items-center gap-1"
                  >
                    <span>{cat.name}</span>
                    <ChevronDown className="w-3 h-3 text-stone-400 group-hover:rotate-180 transition-transform duration-200" />
                  </Link>

                  {/* Mega dropdown menu */}
                  {activeDropdown === cat.name && (
                    <div className="absolute top-full left-0 w-56 bg-[#FAF9F5] shadow-xl border border-stone-200 p-4 py-3 z-50 animate-fadeIn">
                      <div className="space-y-1">
                        {cat.subItems.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            className="block py-1.5 text-xs text-stone-600 hover:text-stone-950 hover:translate-x-1 transition-all tracking-wider font-light"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <Link
                to="/about"
                className="text-[11px] uppercase tracking-[0.25em] font-medium text-stone-500 hover:text-stone-900 transition-colors"
              >
                Atelier
              </Link>
            </nav>

            {/* Center Brand Logo */}
            <div className="text-center absolute left-1/2 -translate-x-1/2">
              <Link to="/" className="inline-block group">
                <span className="font-editorial text-2xl sm:text-3xl font-normal tracking-[0.3em] text-stone-950 uppercase group-hover:opacity-85 transition-opacity">
                  VÉRO
                </span>
                <span className="block text-[8px] uppercase tracking-[0.45em] text-stone-500 font-light -mt-1 text-center">
                  Paris · Biella
                </span>
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Desktop Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden lg:flex items-center gap-2 text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
                title="Search Products"
              >
                <Search className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-stone-500">
                  Search
                </span>
              </button>

              {/* Account */}
              <Link
                to="/account"
                className="p-1.5 text-stone-800 hover:text-stone-950 transition-colors relative"
                title={isAuthenticated ? `Signed in as ${user?.firstName}` : 'Sign In'}
              >
                <UserIcon className="w-4 h-4" />
                {isAuthenticated && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                )}
              </Link>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="p-1.5 text-stone-800 hover:text-stone-950 transition-colors relative"
                title="Wishlist"
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-stone-900 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={openCart}
                className="p-1.5 text-stone-800 hover:text-stone-950 transition-colors relative cursor-pointer"
                aria-label={`Shopping bag with ${totalCount} items`}
              >
                <ShoppingBag className="w-4 h-4" />
                {totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-stone-900 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {totalCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-[#FAF9F5] px-6 py-8 animate-fadeIn max-h-[80vh] overflow-y-auto">
            <div className="space-y-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-semibold mb-3">
                  Catalogues
                </p>
                <div className="space-y-3">
                  <Link
                    to="/shop"
                    className="block text-sm uppercase tracking-widest font-medium text-stone-900"
                  >
                    All Collections
                  </Link>
                  {navCategories.map((c) => (
                    <div key={c.name} className="py-1">
                      <Link
                        to={c.path}
                        className="block text-sm uppercase tracking-widest font-medium text-stone-900 mb-1"
                      >
                        {c.name}
                      </Link>
                      <div className="pl-3 space-y-1">
                        {c.subItems.slice(1, 4).map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            className="block text-xs text-stone-500 hover:text-stone-900 tracking-wider py-0.5"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200">
                <p className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-semibold mb-3">
                  Maison VÉRO
                </p>
                <div className="space-y-2 text-xs uppercase tracking-widest text-stone-700">
                  <Link to="/about" className="block py-1">
                    Atelier & Heritage
                  </Link>
                  <Link to="/contact" className="block py-1">
                    Customer Concierge
                  </Link>
                  <Link to="/shipping-returns" className="block py-1">
                    Shipping & Returns
                  </Link>
                  <Link to="/faq" className="block py-1">
                    Frequently Asked Questions
                  </Link>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
                <span>Currency: USD ($)</span>
                <span>Flagship: Paris, France</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchBarModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
