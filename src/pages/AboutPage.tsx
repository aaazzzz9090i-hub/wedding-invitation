import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { BRAND_VALUES } from '../data/testimonials';
import { handleImageError } from '../utils';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Maison VÉRO' }]} />
      </div>

      <section className="relative py-20 bg-stone-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1800&q=80"
            alt="Atelier fabric and tailoring"
            onError={handleImageError}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.4em] text-amber-300 font-medium">
            Atelier & Heritage
          </span>
          <h1 className="text-4xl sm:text-6xl font-editorial font-normal uppercase tracking-wider text-white">
            Architecture in Cloth
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-stone-300 font-light leading-relaxed tracking-wider uppercase">
            Founded with an uncompromising belief that true modern luxury lies in restraint, purist materials, and the timeless dignity of human craftsmanship.
          </p>
        </div>
      </section>

      {/* Story Narrative */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500 font-semibold">
              The Genesis
            </span>
            <h2 className="text-2xl sm:text-3xl font-editorial font-medium text-stone-950">
              Biella Weaving & Parisian Haute Tailoring
            </h2>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              Nestled at the foothills of the Italian Alps in Biella, our spinning mills harness alpine glacial water renowned for centuries for washing raw cashmere fibres to peerless softness.
            </p>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              Every VÉRO overcoat undergoes more than 160 distinct hand operations, including hand-padded canvas chests, pick-stitched lapels, and horn button attachments reinforced by hand-wound silk thread.
            </p>
          </div>

          <div className="md:col-span-6 aspect-4/5 overflow-hidden border border-stone-200 bg-stone-100">
            <img
              src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=85"
              alt="Atelier overcoat hand tailoring"
              onError={handleImageError}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 order-2 md:order-1 aspect-4/5 overflow-hidden border border-stone-200 bg-stone-100">
            <img
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=85"
              alt="Civitanova Marche shoemaking"
              onError={handleImageError}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:col-span-6 order-1 md:order-2 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500 font-semibold">
              Civitanova Marche
            </span>
            <h2 className="text-2xl sm:text-3xl font-editorial font-medium text-stone-950">
              The Art of Modern Cordwaining
            </h2>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              Our footwear is built in the coastal artisanal cradle of Civitanova Marche, Italy. Combining ancient lasts, vegetable-tanned french calfskin, and Italian Margom rubber outsoles, we refuse the disposable sneaker paradigm in favor of footwear that can be polished and cherished for a lifetime.
            </p>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              We reject seasonal obsolescence. Each silhouette remains in our permanent canon as long as there are connoisseurs who appreciate balance.
            </p>
          </div>
        </div>
      </section>

      {/* Core Brand Pillars */}
      <section className="py-20 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-medium">
              Guiding Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-editorial font-normal uppercase tracking-wider text-stone-950 mt-1">
              The VÉRO Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {BRAND_VALUES.map((val, idx) => (
              <div key={idx} className="p-6 bg-[#FAF9F5] border border-stone-200 space-y-3">
                <span className="text-stone-300 font-editorial text-2xl font-light">0{idx + 1}</span>
                <h3 className="text-base font-editorial font-medium text-stone-950">{val.title}</h3>
                <p className="text-xs text-stone-600 font-light leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Atelier Call To Action */}
      <section className="py-20 text-center max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-editorial font-normal uppercase tracking-wider text-stone-950">
          Discover The Pieces
        </h2>
        <p className="text-xs text-stone-500 mt-2 font-light">
          Experience the tactile weight of pure cashmere and Italian full-grain leather.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-block px-8 py-3.5 bg-stone-950 text-white text-xs uppercase tracking-widest font-medium hover:bg-stone-800 transition-colors"
        >
          View Autumn / Winter Catalog
        </Link>
      </section>
    </div>
  );
};
