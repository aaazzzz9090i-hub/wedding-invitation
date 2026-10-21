import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FAQS } from '../data/testimonials';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Ordering & Payment', 'Sizing & Fit', 'Shipping & Delivery', 'Returns & Exchanges', 'Product Care & Authenticity'];

  const filteredFaqs = selectedCategory === 'All'
    ? FAQS
    : FAQS.filter((f) => f.category === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Frequently Asked Questions' }]} />

      <div className="text-center py-6 mb-8 border-b border-stone-200">
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-medium">
          Assistance & Inquiries
        </span>
        <h1 className="text-3xl sm:text-4xl font-editorial font-normal uppercase tracking-wider text-stone-950 mt-1">
          Frequently Asked Questions
        </h1>
        <p className="text-xs text-stone-600 mt-2 font-light max-w-lg mx-auto">
          Clear answers regarding our atelier tailoring, bespoke alterations, global express logistics, and archival care.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs uppercase tracking-wider border transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-stone-950 text-white border-stone-950 font-medium'
                : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white border border-stone-200 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between text-xs sm:text-sm font-medium text-stone-950 hover:bg-stone-50/50 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[9px] uppercase tracking-widest text-stone-400 font-mono">
                    [{faq.category}]
                  </span>
                  <span>{faq.question}</span>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-stone-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-stone-500 shrink-0" />}
              </button>

              {isOpen && (
                <div className="p-5 pt-0 text-xs text-stone-600 font-light leading-relaxed border-t border-stone-100 bg-[#FAF9F5]/40">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Need more help */}
      <div className="mt-16 p-8 bg-white border border-stone-200 text-center space-y-3">
        <HelpCircle className="w-8 h-8 text-stone-400 mx-auto" />
        <h3 className="text-base font-editorial font-medium text-stone-950">
          Have an unlisted question?
        </h3>
        <p className="text-xs text-stone-500 font-light max-w-sm mx-auto">
          Our client concierge is accessible 24 hours a day to assist with private sizing consultations and atelier requests.
        </p>
        <Link
          to="/contact"
          className="inline-block mt-2 px-6 py-2.5 bg-stone-950 text-white text-xs uppercase tracking-widest font-medium hover:bg-stone-800 transition-colors"
        >
          Contact Atelier Concierge
        </Link>
      </div>
    </div>
  );
};
