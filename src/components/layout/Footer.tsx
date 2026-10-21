import React from 'react';
import { Link } from 'react-router-dom';
import { NewsletterForm } from '../common/NewsletterForm';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-800">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-editorial text-3xl tracking-[0.3em] text-white uppercase block">
              VÉRO
            </span>
            <p className="text-xs text-stone-400 font-light leading-relaxed max-w-sm">
              Define your own style. Modern luxury tailoring, fine knitwear, handcrafted footwear, and haute horlogerie sculpted with timeless European restraint.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-500" />
                Paris · Milan · New York
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-stone-500" />
                concierge@vero-atelier.com
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-stone-900/60 p-6 sm:p-8 border border-stone-800">
            <p className="text-xs uppercase tracking-[0.25em] text-stone-400 font-medium mb-1">
              The VÉRO Gazette & Private Circle
            </p>
            <h4 className="text-lg font-editorial text-white font-normal mb-3">
              Receive private invitations and 10% privilege on your inaugural acquisition.
            </h4>
            <NewsletterForm layout="inline" />
          </div>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-stone-800 text-xs">
          {/* Col 1 */}
          <div>
            <h5 className="uppercase tracking-[0.2em] text-white font-medium mb-4 text-[11px]">
              Collections
            </h5>
            <ul className="space-y-2.5 font-light text-stone-400">
              <li>
                <Link to="/shop?category=men" className="hover:text-white transition-colors">
                  Men's Outerwear & Suiting
                </Link>
              </li>
              <li>
                <Link to="/shop?category=women" className="hover:text-white transition-colors">
                  Women's Haute Tailoring
                </Link>
              </li>
              <li>
                <Link to="/shop?category=sneakers" className="hover:text-white transition-colors">
                  Sneakers & Footwear
                </Link>
              </li>
              <li>
                <Link to="/shop?category=accessories" className="hover:text-white transition-colors">
                  Leather Bags & Accoutrements
                </Link>
              </li>
              <li>
                <Link to="/shop?category=watches" className="hover:text-white transition-colors">
                  Horlogerie & Chronographs
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors text-stone-200">
                  New Arrivals A/W 2026
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h5 className="uppercase tracking-[0.2em] text-white font-medium mb-4 text-[11px]">
              Client Concierge
            </h5>
            <ul className="space-y-2.5 font-light text-stone-400">
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Concierge
                </Link>
              </li>
              <li>
                <Link to="/shipping-returns" className="hover:text-white transition-colors">
                  Complimentary Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Sizing & Fit Consultation
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-white transition-colors">
                  Track Your Consignment
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-white transition-colors">
                  Bespoke Client Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h5 className="uppercase tracking-[0.2em] text-white font-medium mb-4 text-[11px]">
              Maison & Ateliers
            </h5>
            <ul className="space-y-2.5 font-light text-stone-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  The Heritage of VÉRO
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Biella & Civitanova Ateliers
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Sustainable Cashmere Commitment
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Boutique Appointments
                </Link>
              </li>
              <li>
                <a
                  href="#press"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Press Inquiries</span>
                  <ArrowUpRight className="w-3 h-3 text-stone-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h5 className="uppercase tracking-[0.2em] text-white font-medium mb-4 text-[11px]">
              Flagship Boutiques
            </h5>
            <div className="space-y-3 font-light text-stone-400 text-[11px]">
              <div>
                <p className="text-white font-normal">Paris Flagship</p>
                <p>14 Rue du Faubourg Saint-Honoré, 75008 Paris</p>
              </div>
              <div>
                <p className="text-white font-normal">Milan Showroom</p>
                <p>Via Montenapoleone 8, 20121 Milano</p>
              </div>
              <div>
                <p className="text-white font-normal">New York Madison</p>
                <p>720 Madison Avenue, New York, NY 10065</p>
              </div>
              <div>
                <p className="text-white font-normal">Tokyo Ginza</p>
                <p>6-10-1 Ginza, Chuo-ku, Tokyo 104-0061</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 font-light gap-4">
          <p>© {new Date().getFullYear()} VÉRO Luxury S.A. All rights reserved. Handcrafted with bespoke restraint.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/shipping-returns" className="hover:text-stone-300">
              Privacy Policy
            </Link>
            <Link to="/shipping-returns" className="hover:text-stone-300">
              Terms of Sale
            </Link>
            <Link to="/shipping-returns" className="hover:text-stone-300">
              Cookie Preferences
            </Link>
            <span className="text-stone-600">Demo Prototype by Senior React Engineer</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
