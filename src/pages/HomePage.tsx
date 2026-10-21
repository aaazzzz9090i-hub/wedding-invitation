import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck, Clock, Award, Compass, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { SAMPLE_TESTIMONIALS, BRAND_VALUES } from '../data/testimonials';
import { ProductCard } from '../components/product/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { NewsletterForm } from '../components/common/NewsletterForm';
import { Product } from '../types';
import { handleImageError } from '../utils';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 4);
  const featuredSneakers = PRODUCTS.filter((p) => p.isFeaturedSneaker).slice(0, 3);

  const categoryHighlights = [
    {
      title: "Men's Collection",
      subtitle: "Tailored Overcoats & Pure Cashmere",
      image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=85",
      link: "/shop?category=men"
    },
    {
      title: "Women's Collection",
      subtitle: "Double-Faced Wool & Bias-Cut Silks",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85",
      link: "/shop?category=women"
    },
    {
      title: "Sneakers & Footwear",
      subtitle: "Handcrafted Margom Soles & Italian Nappa",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=85",
      link: "/shop?category=sneakers"
    },
    {
      title: "Bags & Accessories",
      subtitle: "Vegetable-Tanned Vachetta & Haute Horlogerie",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85",
      link: "/shop?category=accessories"
    }
  ];

  return (
    <div className="w-full">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center bg-stone-900 text-white overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85"
            alt="VÉRO Autumn Winter 2026 Editorial"
            onError={handleImageError}
            className="w-full h-full object-cover object-center brightness-[0.72] contrast-[1.08] scale-105 animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-6"
          >
            <span className="inline-block text-[11px] uppercase tracking-[0.4em] font-light text-stone-300 border-b border-stone-400/50 pb-1.5">
              Autumn / Winter 2026 Collection
            </span>

            <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-[0.08em] uppercase text-white leading-tight">
              DEFINE YOUR <br />
              <span className="italic font-light tracking-[0.12em]">OWN STYLE.</span>
            </h1>

            <p className="max-w-xl mx-auto text-xs sm:text-sm text-stone-300 font-light tracking-widest uppercase leading-relaxed">
              Masterful Italian tailoring meets sculptural silhouettes. Handcrafted in our historic Biella and Civitanova ateliers.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/shop"
                className="w-full sm:w-auto px-9 py-4 bg-white text-stone-950 text-xs uppercase tracking-[0.25em] font-medium hover:bg-stone-200 transition-all shadow-xl flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/about"
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/60 text-white text-xs uppercase tracking-[0.25em] font-light hover:bg-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>The Atelier Story</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-stone-400 gap-1.5 z-10">
          <span className="text-[9px] uppercase tracking-[0.3em]">Explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-stone-400 to-transparent" />
        </div>
      </section>

      {/* ===================== TICKER BAR ===================== */}
      <div className="bg-white border-y border-stone-200 py-4 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-xs uppercase tracking-[0.25em] text-stone-600 gap-4">
          <div className="flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-stone-900" />
            <span>Biella Cashmere & Tailoring</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-stone-900" />
            <span>Complimentary Global Express Over $200</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-stone-900" />
            <span>30-Day Atelier Return Privilege</span>
          </div>
          <div className="flex items-center gap-2 hidden md:flex">
            <Sparkles className="w-3.5 h-3.5 text-stone-900" />
            <span>Use Code VERO10 for 10% Off</span>
          </div>
        </div>
      </div>

      {/* ===================== CATEGORY CARDS ===================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-medium">
            Curated Universes
          </span>
          <h2 className="text-2xl sm:text-3xl font-editorial font-normal uppercase tracking-wider text-stone-950 mt-1">
            Shop By Department
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryHighlights.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.link}
              className="group relative aspect-3/4 overflow-hidden bg-stone-100 flex flex-col justify-end p-6 border border-stone-200"
            >
              <img
                src={cat.image}
                alt={cat.title}
                onError={handleImageError}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

              <div className="relative z-10 text-white">
                <span className="text-[9px] uppercase tracking-[0.25em] text-stone-300 font-light block mb-1">
                  Collection
                </span>
                <h3 className="text-lg font-editorial font-medium tracking-wide text-white group-hover:translate-x-1 transition-transform">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-stone-300 font-light mt-0.5 opacity-90">
                  {cat.subtitle}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-white underline underline-offset-4">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===================== BEST SELLERS SECTION ===================== */}
      <section className="py-20 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-medium">
                Atelier Icons
              </span>
              <h2 className="text-2xl sm:text-3xl font-editorial font-normal uppercase tracking-wider text-stone-950 mt-1">
                The Best Sellers
              </h2>
            </div>

            <Link
              to="/shop"
              className="text-xs uppercase tracking-widest font-medium text-stone-900 hover:text-stone-600 transition-colors flex items-center gap-2 group self-start sm:self-auto"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== EDITORIAL LOOKBOOK BANNER ===================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F3EFE9] border border-[#DFD7C7] p-8 sm:p-12 lg:p-16">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-stone-600 font-semibold">
              The Monochrome Edit · Vol. IV
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-normal text-stone-950 leading-tight">
              RESTRAINT IS THE <br />
              <span className="italic">ULTIMATE SOPHISTICATION.</span>
            </h2>

            <p className="text-xs sm:text-sm text-stone-700 font-light leading-relaxed">
              Stripped of superfluous distraction, our autumn silhouettes emphasize architectural drape, unpadded natural shoulders, and tactile cashmere sourced directly from the Mongolian highlands.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                to="/shop?category=women"
                className="px-8 py-3.5 bg-stone-950 text-white text-xs uppercase tracking-widest font-medium hover:bg-stone-800 transition-colors"
              >
                Explore The Edit
              </Link>
              <Link
                to="/about"
                className="text-xs uppercase tracking-widest font-medium text-stone-900 hover:underline underline-offset-4 py-2"
              >
                Our Weaving Process
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="aspect-3/4 overflow-hidden border border-stone-300">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85"
                alt="Monochrome lookbook dress"
                onError={handleImageError}
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-3/4 overflow-hidden border border-stone-300 translate-y-6">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=85"
                alt="Monochrome lookbook blazer"
                onError={handleImageError}
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FEATURED SNEAKERS SECTION ===================== */}
      <section className="py-20 bg-stone-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-amber-300 font-medium">
                Civitanova Marche Craft
              </span>
              <h2 className="text-2xl sm:text-3xl font-editorial font-normal uppercase tracking-wider text-white mt-1">
                The Footwear Atelier
              </h2>
            </div>

            <Link
              to="/shop?category=sneakers"
              className="text-xs uppercase tracking-widest font-medium text-stone-300 hover:text-white transition-colors flex items-center gap-2 group self-start sm:self-auto"
            >
              <span>Explore All Sneakers</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredSneakers.map((sneaker) => (
              <div
                key={sneaker.id}
                onClick={() => navigate(`/product/${sneaker.id}`)}
                className="group relative bg-stone-900 border border-stone-800 p-6 flex flex-col justify-between cursor-pointer hover:border-stone-600 transition-colors"
              >
                <div className="aspect-4/3 w-full overflow-hidden bg-stone-800/80 mb-6">
                  <img
                    src={sneaker.images[0]}
                    alt={sneaker.name}
                    onError={handleImageError}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-widest text-amber-300">
                    {sneaker.subtitle.split('·')[0]}
                  </span>
                  <h3 className="text-lg font-editorial font-medium text-white group-hover:text-stone-300 transition-colors mt-1">
                    {sneaker.name}
                  </h3>
                  <p className="text-xs text-stone-400 mt-2 font-light line-clamp-2">
                    {sneaker.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">
                    ${sneaker.price.toLocaleString()}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 group-hover:text-white transition-colors flex items-center gap-1 font-medium">
                    Discover <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== NEW ARRIVALS ===================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-medium">
              Fresh Off The Loom
            </span>
            <h2 className="text-2xl sm:text-3xl font-editorial font-normal uppercase tracking-wider text-stone-950 mt-1">
              New Arrivals
            </h2>
          </div>

          <Link
            to="/shop?sort=newest"
            className="text-xs uppercase tracking-widest font-medium text-stone-900 hover:text-stone-600 transition-colors flex items-center gap-2 group self-start sm:self-auto"
          >
            <span>View All New Releases</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* ===================== PROMOTIONAL CARDS ===================== */}
      <section className="py-16 bg-[#FAF9F5] border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 border border-stone-200 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-medium">
                Atelier Service
              </span>
              <h3 className="text-xl font-editorial font-medium text-stone-950">
                Bespoke Sizing & Alterations
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Enjoy complimentary tailoring adjustments on all overcoats and suits at our Paris and Milan flagship salons.
              </p>
              <Link
                to="/contact"
                className="inline-block text-xs uppercase tracking-widest font-medium text-stone-900 underline underline-offset-4 pt-2"
              >
                Book Appointment
              </Link>
            </div>

            <div className="bg-white p-8 border border-stone-200 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-medium">
                Presentation Packaging
              </span>
              <h3 className="text-xl font-editorial font-medium text-stone-950">
                Linen Presentation Box
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Every acquisition arrives in our archival debossed linen box with cedar aromatic spheres and bespoke wooden hanger.
              </p>
              <Link
                to="/shipping-returns"
                className="inline-block text-xs uppercase tracking-widest font-medium text-stone-900 underline underline-offset-4 pt-2"
              >
                Packaging Standards
              </Link>
            </div>

            <div className="bg-white p-8 border border-stone-200 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-medium">
                Private Privilege
              </span>
              <h3 className="text-xl font-editorial font-medium text-stone-950">
                10% Welcome Incentive
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Apply promo code <strong className="font-semibold text-stone-900">VERO10</strong> during checkout to activate your 10% introductory privilege on any piece.
              </p>
              <Link
                to="/shop"
                className="inline-block text-xs uppercase tracking-widest font-medium text-stone-900 underline underline-offset-4 pt-2"
              >
                Redeem Privilege
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CUSTOMER REVIEWS / TESTIMONIALS ===================== */}
      <section className="py-20 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-medium">
              Client & Critical Acclaim
            </span>
            <h2 className="text-2xl sm:text-3xl font-editorial font-normal uppercase tracking-wider text-stone-950 mt-1">
              Sample Reviews & Press
            </h2>
            <p className="text-xs text-stone-500 mt-2 font-light">
              Clearly labeled demonstrative testimonials reflecting the customer experience of the VÉRO atelier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SAMPLE_TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-6 bg-[#FAF9F5] border border-stone-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-700 italic font-light leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200 flex items-center gap-3">
                  {t.avatar && (
                    <img
                      src={t.avatar}
                      alt={t.author}
                      onError={handleImageError}
                      className="w-9 h-9 rounded-full object-cover shrink-0"
                    />
                  )}
                  <div>
                    <p className="text-xs font-semibold text-stone-950">{t.author}</p>
                    <p className="text-[10px] text-stone-500 font-light">{t.title}</p>
                    {t.publication && (
                      <p className="text-[9px] uppercase tracking-wider text-stone-400 font-medium">
                        {t.publication}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
