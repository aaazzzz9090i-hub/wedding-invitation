import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ChevronDown,
  ChevronUp,
  Ruler,
  AlertCircle,
  Share2
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { PriceDisplay } from '../components/common/PriceDisplay';
import { QuantitySelector } from '../components/common/QuantitySelector';
import { ProductCard } from '../components/product/ProductCard';
import { handleImageError } from '../utils';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const product = PRODUCTS.find((p) => p.id === id);

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [validationError, setValidationError] = useState('');
  const [openAccordion, setOpenAccordion] = useState<string | null>('description');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Initialize color on load
  useEffect(() => {
    if (product?.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0].name);
    }
    if (product?.sizes && product.sizes.length === 1) {
      setSelectedSize(product.sizes[0]);
    } else {
      setSelectedSize('');
    }
    setActiveImageIndex(0);
    setValidationError('');
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-editorial font-medium text-stone-900">
          Creation Not Found
        </h2>
        <p className="text-xs text-stone-500 mt-2">
          The requested fashion piece does not exist in our current atelier archive.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-block px-8 py-3 bg-stone-900 text-white text-xs uppercase tracking-widest font-medium"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const isSaved = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      setValidationError('Please select your preferred size.');
      return;
    }
    if (product.colors.length > 0 && !selectedColor) {
      setValidationError('Please select a color option.');
      return;
    }
    setValidationError('');
    addToCart(product, selectedSize || 'One Size', selectedColor || 'Standard', quantity);
  };

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', 'info', 'Product URL copied to clipboard');
    }
  };

  // Related products from same category or gender
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender)
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Shop Catalog', path: '/shop' },
          { label: product.category.toUpperCase(), path: `/shop?category=${product.category}` },
          { label: product.name }
        ]}
      />

      {/* Main Product Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-6">
        {/* Left: Gallery (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Vertical Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[620px] shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-22 md:w-20 md:h-26 shrink-0 border overflow-hidden cursor-pointer transition-all ${
                    activeImageIndex === idx
                      ? 'border-stone-900 ring-1 ring-stone-900'
                      : 'border-stone-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    onError={handleImageError}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main Focused Image */}
          <div className="flex-1 relative aspect-3/4 bg-stone-100 border border-stone-200 overflow-hidden group">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              onError={handleImageError}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
              {product.isNew && (
                <span className="text-[10px] uppercase tracking-[0.25em] bg-stone-900 text-white px-3 py-1 font-medium shadow-sm">
                  New Arrival
                </span>
              )}
              {product.isBestSeller && (
                <span className="text-[10px] uppercase tracking-[0.25em] bg-white text-stone-900 border border-stone-200 px-3 py-1 font-medium shadow-sm">
                  Best Seller
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Product Actions & Information (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.3em] text-stone-500 mb-2 font-medium">
              <span>
                {product.category} · {product.gender}
              </span>
              <span>SKU: {product.sku}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-editorial font-normal uppercase tracking-wider text-stone-950 leading-snug">
              {product.name}
            </h1>
            <p className="text-xs text-stone-500 mt-1 font-light tracking-wide">{product.subtitle}</p>

            {/* Price & Rating */}
            <div className="flex items-center justify-between mt-4 pb-4 border-b border-stone-200">
              <PriceDisplay price={product.price} originalPrice={product.originalPrice} size="xl" />

              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-stone-900">{product.rating}</span>
                <span className="text-xs text-stone-400 font-light">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Stock Availability Indicator */}
            <div className="mt-4 flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-stone-700 font-medium tracking-wide">
                In Stock — Handcrafted in atelier, ready to dispatch within 24 hours.
              </span>
            </div>

            {/* Color Swatches */}
            {product.colors.length > 0 && (
              <div className="mt-6">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="uppercase tracking-widest text-[11px] text-stone-600 font-medium">
                    Color: <span className="text-stone-950 font-semibold">{selectedColor}</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => {
                        setSelectedColor(color.name);
                        setValidationError('');
                      }}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                        selectedColor === color.name
                          ? 'ring-2 ring-stone-900 ring-offset-2 scale-105'
                          : 'border-stone-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor === color.name && (
                        <Check
                          className={`w-4 h-4 ${
                            color.hex.toLowerCase() === '#fafafa' || color.hex.toLowerCase() === '#ffffff'
                              ? 'text-black'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes.length > 0 && (
              <div className="mt-6">
                <div className="flex justify-between items-center text-xs mb-2.5">
                  <span className="uppercase tracking-widest text-[11px] text-stone-600 font-medium">
                    Select Size
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-stone-600 hover:text-stone-900 underline cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size & Fit Guide</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setSelectedSize(size);
                        setValidationError('');
                      }}
                      className={`py-3 text-xs uppercase tracking-wider border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-stone-900 text-white border-stone-900 font-medium'
                          : 'bg-white text-stone-800 border-stone-300 hover:border-stone-900'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {validationError && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-600 mt-2">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{validationError}</span>
                  </div>
                )}
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div className="mt-8 space-y-3 pt-6 border-t border-stone-200">
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">
                  Quantity
                </span>
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => setQuantity((q) => q + 1)}
                  onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 bg-stone-950 text-white text-xs uppercase tracking-[0.25em] font-medium hover:bg-stone-800 active:bg-black transition-colors cursor-pointer shadow-lg"
                >
                  Add to Shopping Bag
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 border transition-colors cursor-pointer ${
                    isSaved
                      ? 'bg-rose-50 border-rose-300 text-rose-600'
                      : 'border-stone-300 hover:border-stone-900 text-stone-700'
                  }`}
                  title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : ''}`} />
                </button>

                <button
                  onClick={handleShare}
                  className="p-4 border border-stone-300 hover:border-stone-900 text-stone-700 transition-colors cursor-pointer"
                  title="Share creation"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Atelier Guarantees */}
            <div className="grid grid-cols-3 gap-3 mt-8 p-4 bg-stone-100/60 border border-stone-200 text-center text-[10px] uppercase tracking-wider text-stone-600">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-stone-900" />
                <span>Complimentary Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-stone-900" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-stone-900" />
                <span>Atelier Authenticity</span>
              </div>
            </div>
          </div>

          {/* Accordion Sections */}
          <div className="mt-8 border-t border-stone-200 divide-y divide-stone-200 text-xs">
            {/* Description & Details */}
            <div>
              <button
                onClick={() => toggleAccordion('description')}
                className="w-full py-4 flex items-center justify-between text-left uppercase tracking-widest font-semibold text-stone-900 cursor-pointer"
              >
                <span>Description & Atelier Details</span>
                {openAccordion === 'description' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'description' && (
                <div className="pb-5 text-stone-600 font-light leading-relaxed space-y-3">
                  <p>{product.description}</p>
                  <ul className="list-disc pl-5 space-y-1 text-stone-700">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                  <p className="text-stone-900 font-medium pt-1">
                    Composition: <span className="font-light text-stone-600">{product.material}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Care Instructions */}
            <div>
              <button
                onClick={() => toggleAccordion('care')}
                className="w-full py-4 flex items-center justify-between text-left uppercase tracking-widest font-semibold text-stone-900 cursor-pointer"
              >
                <span>Care Instructions & Preservation</span>
                {openAccordion === 'care' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'care' && (
                <div className="pb-5 text-stone-600 font-light leading-relaxed space-y-2">
                  <ul className="list-disc pl-5 space-y-1">
                    {product.careInstructions.map((instruction, idx) => (
                      <li key={idx}>{instruction}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Shipping & Delivery */}
            <div>
              <button
                onClick={() => toggleAccordion('shipping')}
                className="w-full py-4 flex items-center justify-between text-left uppercase tracking-widest font-semibold text-stone-900 cursor-pointer"
              >
                <span>Complimentary Shipping & 30-Day Returns</span>
                {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'shipping' && (
                <div className="pb-5 text-stone-600 font-light leading-relaxed space-y-2">
                  <p>
                    All orders are dispatched via tracked DHL Express in our signature debossed presentation packaging.
                  </p>
                  <p>
                    Complimentary express delivery on orders exceeding $200. We accept 30-day complimentary returns on unworn items.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-20 pt-16 border-t border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-medium">
              Verified Client Feedback
            </span>
            <h2 className="text-2xl font-editorial font-normal uppercase tracking-wider text-stone-950 mt-1">
              Customer Reviews ({product.reviewCount})
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-semibold text-stone-900">{product.rating} / 5.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((rev) => (
              <div key={rev.id} className="p-6 bg-white border border-stone-200 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-stone-950">{rev.author}</p>
                    <p className="text-[10px] text-stone-500">{rev.location} · {rev.date}</p>
                  </div>
                  {rev.verified && (
                    <span className="text-[9px] uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 border border-emerald-200 font-medium">
                      Verified Acquisition
                    </span>
                  )}
                </div>

                <div className="flex items-center text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-stone-700 font-light leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-2 p-8 bg-white border border-stone-200 text-center text-xs text-stone-500">
              All acquisitions are backed by our 5-star atelier satisfaction guarantee.
            </div>
          )}
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 pt-16 border-t border-stone-200">
          <div className="text-center mb-10">
            <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-medium">
              Curated Harmonies
            </span>
            <h2 className="text-2xl sm:text-3xl font-editorial font-normal uppercase tracking-wider text-stone-950 mt-1">
              You May Also Adore
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF9F5] border border-stone-200 max-w-xl w-full p-6 sm:p-8 shadow-2xl relative">
            <div className="flex justify-between items-center pb-4 border-b border-stone-200 mb-6">
              <h3 className="text-sm uppercase tracking-[0.2em] font-semibold text-stone-950">
                VÉRO Size & Proportions Guide
              </h3>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="text-stone-500 hover:text-stone-950 text-xs uppercase"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-stone-600 mb-4 font-light">
              Our tailoring aligns with traditional Italian and French sartorial proportions. If you are between two sizes, we recommend selecting the larger size for relaxed styling or consulting our atelier concierge.
            </p>

            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse border border-stone-200">
                <thead>
                  <tr className="bg-stone-200/80 text-stone-900 uppercase tracking-wider text-[10px]">
                    <th className="p-2.5 border border-stone-300">Size</th>
                    <th className="p-2.5 border border-stone-300">Chest (cm / in)</th>
                    <th className="p-2.5 border border-stone-300">Waist (cm / in)</th>
                    <th className="p-2.5 border border-stone-300">Hips (cm / in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-700">
                  <tr>
                    <td className="p-2.5 font-medium border border-stone-300">FR 34 / 46 (XS)</td>
                    <td className="p-2.5 border border-stone-300">88 cm / 34.6"</td>
                    <td className="p-2.5 border border-stone-300">74 cm / 29.1"</td>
                    <td className="p-2.5 border border-stone-300">92 cm / 36.2"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium border border-stone-300">FR 36 / 48 (S)</td>
                    <td className="p-2.5 border border-stone-300">92 cm / 36.2"</td>
                    <td className="p-2.5 border border-stone-300">78 cm / 30.7"</td>
                    <td className="p-2.5 border border-stone-300">96 cm / 37.8"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium border border-stone-300">FR 38 / 50 (M)</td>
                    <td className="p-2.5 border border-stone-300">96 cm / 37.8"</td>
                    <td className="p-2.5 border border-stone-300">82 cm / 32.3"</td>
                    <td className="p-2.5 border border-stone-300">100 cm / 39.4"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium border border-stone-300">FR 40 / 52 (L)</td>
                    <td className="p-2.5 border border-stone-300">100 cm / 39.4"</td>
                    <td className="p-2.5 border border-stone-300">86 cm / 33.9"</td>
                    <td className="p-2.5 border border-stone-300">104 cm / 40.9"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium border border-stone-300">FR 42 / 54 (XL)</td>
                    <td className="p-2.5 border border-stone-300">104 cm / 40.9"</td>
                    <td className="p-2.5 border border-stone-300">90 cm / 35.4"</td>
                    <td className="p-2.5 border border-stone-300">108 cm / 42.5"</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="w-full mt-6 py-3 bg-stone-900 text-white text-xs uppercase tracking-widest font-medium"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
