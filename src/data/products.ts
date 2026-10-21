import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // ===================== MEN'S CLOTHING =====================
  {
    id: 'vero-men-01',
    sku: 'VR-M-101',
    name: 'Atelier Double-Breasted Cashmere Coat',
    subtitle: '100% Mongolian Cashmere · Structured Peak Lapels',
    description: 'An architectural statement in pure Mongolian cashmere. Crafted in our Biella atelier with a structured double-breasted closure, softly defined shoulders, and a fluid drape that moves effortlessly. Lined in bespoke Bemberg cupro.',
    details: [
      'Double-breasted six-button fastening',
      'Hand-finished horn buttons',
      'Deep back vent for fluid movement',
      'Two flapped jetted pockets and interior welt pockets',
      'Tailored in Italy'
    ],
    price: 1850,
    originalPrice: 2200,
    rating: 4.9,
    reviewCount: 38,
    category: 'men',
    gender: 'men',
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Camel Tan', hex: '#C29B68' },
      { name: 'Slate Melange', hex: '#636569' }
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)', '54 (XXL)'],
    isNew: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 8,
    careInstructions: [
      'Specialist dry clean only',
      'Store on wide wooden hanger with breathable garment cover',
      'Do not steam directly on lapel canvas'
    ],
    material: '100% Grade-A Mongolian Cashmere; 100% Bemberg Cupro Lining',
    reviews: [
      {
        id: 'rev-m1-1',
        author: 'Julian Vane',
        location: 'London, UK',
        rating: 5,
        date: 'October 12, 2026',
        comment: 'The drape and weight are second to none. Exquisite finishing that rivals Savile Row.',
        verified: true
      },
      {
        id: 'rev-m1-2',
        author: 'Alexandre Moreau',
        location: 'Paris, France',
        rating: 5,
        date: 'September 28, 2026',
        comment: 'Remarkable warmth without being heavy. The camel color is deep and rich in natural light.',
        verified: true
      }
    ]
  },
  {
    id: 'vero-men-02',
    sku: 'VR-M-102',
    name: 'Sartorial Virgin Wool Structured Blazer',
    subtitle: 'Super 150s Merino Wool · Half-Canvas Construction',
    description: 'Precision tailoring distilled to its purest form. Spun from Super 150s merino wool with subtle natural stretch, this half-canvas blazer delivers refined structure with relaxed comfort for the modern connoisseur.',
    details: [
      'Half-canvas floating chest piece',
      'Notch lapels with hand-stitched pick detailing',
      'Unpadded natural shoulders',
      'Dual rear vents and mother-of-pearl buttons'
    ],
    price: 980,
    rating: 4.8,
    reviewCount: 29,
    category: 'men',
    gender: 'men',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Midnight Navy', hex: '#1C2833' },
      { name: 'Charcoal Grey', hex: '#2C3539' }
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)'],
    isBestSeller: true,
    inStock: true,
    stockCount: 14,
    careInstructions: [
      'Dry clean gently using hydro-carbon solvent',
      'Brush regularly with natural boar-bristle brush'
    ],
    material: '100% Super 150s Italian Virgin Wool'
  },
  {
    id: 'vero-men-03',
    sku: 'VR-M-103',
    name: 'Ribbed Seamless Cashmere Turtleneck',
    subtitle: '7-Gauge Tuscan Cashmere · Seamless 3D Knit',
    description: 'Knitted without seams on state-of-the-art Japanese circular looms, this 7-gauge rollneck creates an ultra-clean silhouette that moves with total fluidity against the skin.',
    details: [
      'Seamless zero-waste knit technology',
      'Tall ribbed roll collar with comfortable stretch retention',
      'Fine ribbed cuffs and hem'
    ],
    price: 520,
    originalPrice: 620,
    rating: 4.9,
    reviewCount: 44,
    category: 'men',
    gender: 'men',
    images: [
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Warm Ecru', hex: '#EBE5D8' },
      { name: 'Dark Truffle', hex: '#3B2F2F' },
      { name: 'Deep Black', hex: '#111111' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
    inStock: true,
    stockCount: 18,
    careInstructions: [
      'Hand wash cold in cashmere wash',
      'Dry flat on absorbent towel away from direct sunlight',
      'Store folded, never hung'
    ],
    material: '100% Tuscan 2-Ply Cashmere'
  },
  {
    id: 'vero-men-04',
    sku: 'VR-M-104',
    name: 'Pleated Tapered Crepe Trousers',
    subtitle: 'High-Twist Wool Crepe · Double Front Pleats',
    description: 'A contemporary exploration of drape and proportion. Featuring a clean high-rise waistband, deep double forward pleats, and a gentle taper that breaks precisely above your sneakers or loafers.',
    details: [
      'Concealed zip fly with extended tab closure',
      'Side adjusters with brass hardware',
      'Unhemmed cuffs for customized tailoring'
    ],
    price: 440,
    rating: 4.7,
    reviewCount: 22,
    category: 'men',
    gender: 'men',
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Stone Beige', hex: '#D2C8B8' },
      { name: 'Smoky Olive', hex: '#4B5320' },
      { name: 'Onyx Black', hex: '#111111' }
    ],
    sizes: ['46 (30)', '48 (32)', '50 (34)', '52 (36)'],
    inStock: true,
    stockCount: 11,
    careInstructions: ['Dry clean only', 'Cool iron inside out with pressing cloth'],
    material: '100% High-Twist Wool Crepe'
  },
  {
    id: 'vero-men-05',
    sku: 'VR-M-105',
    name: 'Pima Silk-Cotton Minimalist Tee',
    subtitle: 'Peruvian Extra-Long Staple Pima & Silk Blend',
    description: 'The foundation of elevated dressing. Blended from 80% extra-long staple Peruvian Pima cotton and 20% mulberry silk for an ethereal sheen and unmatched longevity.',
    details: [
      'Ultra-fine bound crewneck collar',
      'Pre-washed to preserve fit and prevent shrinkage',
      'Tailored modern fit through chest and sleeves'
    ],
    price: 180,
    rating: 4.9,
    reviewCount: 67,
    category: 'men',
    gender: 'men',
    images: [
      'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Optic White', hex: '#FAFAFA' },
      { name: 'Chalk Beige', hex: '#ECE6DA' },
      { name: 'Washed Black', hex: '#232323' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    isBestSeller: true,
    inStock: true,
    stockCount: 35,
    careInstructions: ['Machine wash delicate in mesh bag', 'Hang dry in shade'],
    material: '80% Peruvian Pima Cotton, 20% Mulberry Silk'
  },
  {
    id: 'vero-men-06',
    sku: 'VR-M-106',
    name: 'Supple Lambskin Minimalist Flight Jacket',
    subtitle: 'Nappa Lambskin · Swiss Raccagni Dual Zippers',
    description: 'A timeless silhouette executed in butter-soft Spanish lambskin. Stripped of superfluous details to highlight the grain and pure line of the leather.',
    details: [
      'Precision matte gunmetal Swiss zippers',
      'Hidden interior magnetic breast pocket',
      'Ultra-soft tonal cupro lining'
    ],
    price: 1450,
    originalPrice: 1650,
    rating: 5.0,
    reviewCount: 17,
    category: 'men',
    gender: 'men',
    images: [
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Espresso Brown', hex: '#2C1D11' },
      { name: 'Matte Black', hex: '#111111' }
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)'],
    isNew: true,
    inStock: true,
    stockCount: 5,
    careInstructions: ['Professional leather specialist clean only', 'Keep away from humidity and water'],
    material: '100% Spanish Nappa Lambskin; 100% Cupro Lining'
  },

  // ===================== WOMEN'S CLOTHING =====================
  {
    id: 'vero-women-01',
    sku: 'VR-W-201',
    name: 'Sculptural Double-Faced Wool Trench Coat',
    subtitle: 'Double-Faced Wool-Silk · Hand-Sewn Edges',
    description: 'A dramatic study in timeless sophistication. Crafted from double-faced virgin wool and silk, hand-finished along every border with invisible stitching. The wide storm flap and self-tie belt define a statuesque silhouette.',
    details: [
      'Hand-split and sewn double-faced construction',
      'Generous storm shield and raglan sleeves',
      'Detachable sash belt with horn buckle',
      'Deep side seam pockets and storm tabs'
    ],
    price: 1950,
    originalPrice: 2300,
    rating: 5.0,
    reviewCount: 52,
    category: 'women',
    gender: 'women',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Oatmeal Melange', hex: '#DDD5C7' },
      { name: 'Noir Intemporel', hex: '#111111' },
      { name: 'Cognac', hex: '#9E5B32' }
    ],
    sizes: ['FR 34 (XS)', 'FR 36 (S)', 'FR 38 (M)', 'FR 40 (L)'],
    isNew: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 9,
    careInstructions: [
      'Specialist dry clean only',
      'Store in provided breathable cotton garment bag'
    ],
    material: '90% Virgin Wool, 10% Mulberry Silk',
    reviews: [
      {
        id: 'rev-w1-1',
        author: 'Elena Rossi',
        location: 'Milan, Italy',
        rating: 5,
        date: 'October 15, 2026',
        comment: 'The movement of the coat when walking is breathtaking. Truly couture-grade construction.',
        verified: true
      }
    ]
  },
  {
    id: 'vero-women-02',
    sku: 'VR-W-202',
    name: 'Bias-Cut Heavy Silk Satin Evening Gown',
    subtitle: '30 Momme Mulberry Silk · Low Open Back',
    description: 'Draped on the bias to caress every contour, this floor-sweeping gown is spun from weighty 30-momme silk satin with a fluid liquid sheen. Featuring delicate micro-straps and an understated cowl neckline.',
    details: [
      'Cut diagonally on the true bias for natural give and drape',
      'Subtle godet train at hem',
      'Double-lined silk bodice with internal bra-keeper snaps'
    ],
    price: 1120,
    rating: 4.9,
    reviewCount: 31,
    category: 'women',
    gender: 'women',
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Champagne Gold', hex: '#E7D3B5' },
      { name: 'Midnight Emerald', hex: '#1B382B' },
      { name: 'Obsidian Black', hex: '#0B0B0B' }
    ],
    sizes: ['FR 34 (XS)', 'FR 36 (S)', 'FR 38 (M)', 'FR 40 (L)'],
    isBestSeller: true,
    inStock: true,
    stockCount: 7,
    careInstructions: ['Dry clean only', 'Steam with low heat; do not wet clean'],
    material: '100% 30 Momme Mulberry Silk'
  },
  {
    id: 'vero-women-03',
    sku: 'VR-W-203',
    name: 'Cloud Cashmere Oversized Mockneck Sweater',
    subtitle: 'Grade-A Cashmere · Relaxed Cocoon Fit',
    description: 'Indulgent, enveloping, and endlessly versatile. Knitted from ultra-lofty 4-ply cashmere with raglan sleeves and a relaxed funnel neckline that frames the face with effortless chic.',
    details: [
      'Plush 4-ply featherweight knit',
      'Dropped shoulder seam with ribbed cuffs',
      'Stepped hem with side slits for fluid draping'
    ],
    price: 590,
    originalPrice: 690,
    rating: 4.9,
    reviewCount: 46,
    category: 'women',
    gender: 'women',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Alabaster White', hex: '#F4F2EC' },
      { name: 'Heather Truffle', hex: '#5E544D' },
      { name: 'Dusty Rosewood', hex: '#A37C74' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    isNew: true,
    inStock: true,
    stockCount: 16,
    careInstructions: ['Hand wash cold with wool detergent', 'Dry flat on towel'],
    material: '100% Sustainable Grade-A Mongolian Cashmere'
  },
  {
    id: 'vero-women-04',
    sku: 'VR-W-204',
    name: 'High-Waist Tailored Wide-Leg Trousers',
    subtitle: 'Italian Tropical Wool · Precision Front Creases',
    description: 'A silhouette of effortless authority. Cut with an exaggerated wide leg that falls cleanly from a structured high-rise waist, tailored in breathable four-season Italian virgin wool.',
    details: [
      'Clean Hollywood waistband with hidden hook closures',
      'Deep front knife pleats',
      'Satin-faced waistband interior for comfort'
    ],
    price: 490,
    rating: 4.8,
    reviewCount: 28,
    category: 'women',
    gender: 'women',
    images: [
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Warm Cream', hex: '#EBE6DC' },
      { name: 'Charcoal Black', hex: '#1A1A1A' }
    ],
    sizes: ['FR 34 (XS)', 'FR 36 (S)', 'FR 38 (M)', 'FR 40 (L)', 'FR 42 (XL)'],
    inStock: true,
    stockCount: 13,
    careInstructions: ['Dry clean only', 'Press with damp cloth'],
    material: '100% Italian Virgin Wool'
  },
  {
    id: 'vero-women-05',
    sku: 'VR-W-205',
    name: 'Pleated Organza Peplum Blouse',
    subtitle: 'Crisp Silk Organza · Sculptural Architecture',
    description: 'A romantic exploration of form and transparency. Tailored from featherlight silk organza with hand-pressed micro-pleats that blossom into a structured architectural peplum.',
    details: [
      'Concealed back mother-of-pearl buttons',
      'Removable tonal silk-habotai camisole included',
      'French seam finishing throughout'
    ],
    price: 420,
    rating: 4.7,
    reviewCount: 19,
    category: 'women',
    gender: 'women',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Porcelain White', hex: '#F9F8F5' },
      { name: 'Midnight Onyx', hex: '#111111' }
    ],
    sizes: ['FR 34 (XS)', 'FR 36 (S)', 'FR 38 (M)', 'FR 40 (L)'],
    isNew: true,
    inStock: true,
    stockCount: 10,
    careInstructions: ['Dry clean only', 'Do not press pleats with steam iron directly'],
    material: '100% Silk Organza'
  },
  {
    id: 'vero-women-06',
    sku: 'VR-W-206',
    name: 'Fine Mohair-Wool Open Cardigan',
    subtitle: 'Brushed South African Mohair · Belted Silhouette',
    description: 'Envelop yourself in the cloudlike tactile softness of brushed South African mohair and fine merino. Cut for a relaxed silhouette with an optional woven belt.',
    details: [
      'Cloud-brushed tactile texture',
      'Deep patch pockets with reinforced rib rims',
      'Self-fabric knit belt'
    ],
    price: 540,
    originalPrice: 620,
    rating: 4.9,
    reviewCount: 37,
    category: 'women',
    gender: 'women',
    images: [
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Sand Drift', hex: '#D7CCBC' },
      { name: 'Slate Moss', hex: '#687063' }
    ],
    sizes: ['XS/S', 'M/L'],
    isBestSeller: true,
    inStock: true,
    stockCount: 12,
    careInstructions: ['Dry clean or delicate hand wash cold', 'Dry flat'],
    material: '65% South African Kid Mohair, 30% Merino Wool, 5% Polyamide'
  },

  // ===================== SNEAKERS & SHOES =====================
  {
    id: 'vero-shoes-01',
    sku: 'VR-S-301',
    name: 'VÉRO Ghostrunner Minimalist Sneaker',
    subtitle: 'Italian Nappa Leather & Suede · Custom Margom Cup Sole',
    description: 'The defining silhouette of modern luxury footwear. Built in Civitanova Marche, Italy, the Ghostrunner unites full-grain calfskin nappa leather with soft Tuscan suede inserts atop an ultra-durable Italian Margom rubber cup sole.',
    details: [
      'Full-grain Italian calfskin and water-resistant suede overlays',
      'Supple calfskin lining that conforms to your foot over time',
      'Removable anatomical antibacterial footbed with arch support',
      'Debossed VÉRO gold foil logo on tongue and heel counter',
      '100% waxed organic cotton laces'
    ],
    price: 460,
    originalPrice: 520,
    rating: 5.0,
    reviewCount: 94,
    category: 'sneakers',
    gender: 'unisex',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Chalk & Bone', hex: '#EAE6DF' },
      { name: 'Monochrome Black', hex: '#181818' },
      { name: 'Olive & Suede', hex: '#58594D' }
    ],
    sizes: ['EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45'],
    isNew: true,
    isBestSeller: true,
    isFeaturedSneaker: true,
    inStock: true,
    stockCount: 22,
    careInstructions: [
      'Clean leather with damp microfiber cloth and neutral leather balm',
      'Brush suede panels with dedicated crepe brush',
      'Insert cedar shoe trees between wears to absorb moisture'
    ],
    material: '100% Italian Calf Nappa & Tuscan Suede; Margom Natural Rubber Sole',
    reviews: [
      {
        id: 'rev-s1-1',
        author: 'Marcus Chen',
        location: 'New York, USA',
        rating: 5,
        date: 'October 8, 2026',
        comment: 'Without exaggeration, the cleanest silhouette and most comfortable leather sneakers I own.',
        verified: true
      },
      {
        id: 'rev-s1-2',
        author: 'Frederik Lindqvist',
        location: 'Stockholm, Sweden',
        rating: 5,
        date: 'September 19, 2026',
        comment: 'The leather smell right out of the magnetic presentation box was intoxicating. Margom sole perfection.',
        verified: true
      }
    ]
  },
  {
    id: 'vero-shoes-02',
    sku: 'VR-S-302',
    name: 'AeroKnit Engineered Luxury Runner',
    subtitle: 'Seamless High-Tenacity Knit · Nitrogen-Infused Midsole',
    description: 'Aerodynamic innovation meets couture sensibility. Featuring a breathable dual-density engineered knit upper that hugs the foot like a glove, mounted on a proprietary nitrogen-infused cushioning sole for cloudlike responsiveness.',
    details: [
      'Seamless 3D knit upper with zoned support',
      'Sculptural nitrogen-injected EVA midsole',
      'Suede heel lock collar with pull-tab',
      'Reflective tonal thread accents'
    ],
    price: 420,
    rating: 4.8,
    reviewCount: 41,
    category: 'sneakers',
    gender: 'unisex',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Lunar Grey', hex: '#B8B9B7' },
      { name: 'Triple White', hex: '#FFFFFF' },
      { name: 'Dark Slate', hex: '#242A2E' }
    ],
    sizes: ['EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44'],
    isFeaturedSneaker: true,
    inStock: true,
    stockCount: 15,
    careInstructions: ['Spot clean with sneaker foam shampoo', 'Air dry naturally away from radiators'],
    material: 'Recycled Performance Polyester Knit, Calfskin Accents, Nitrogen Midsole'
  },
  {
    id: 'vero-shoes-03',
    sku: 'VR-S-303',
    name: 'Minimalist Raw White Court Sneaker',
    subtitle: 'Smooth Calfskin · Blake Stitched Outsole',
    description: 'The archetype of the clean white leather court sneaker, elevated to haute-art standards. Cut from one continuous piece of buttery calf leather with concealed eyelets.',
    details: [
      'Seamless clean vamp design',
      'Stitched cupsole construction',
      'Padded collar and tongue for heel hold'
    ],
    price: 395,
    originalPrice: 450,
    rating: 4.9,
    reviewCount: 68,
    category: 'sneakers',
    gender: 'unisex',
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Raw White', hex: '#FAF9F6' }
    ],
    sizes: ['EU 38', 'EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45'],
    isBestSeller: true,
    isFeaturedSneaker: true,
    inStock: true,
    stockCount: 30,
    careInstructions: ['Wipe clean with soft cloth and leather conditioner'],
    material: '100% Full Grain Italian Calfskin'
  },
  {
    id: 'vero-shoes-04',
    sku: 'VR-S-304',
    name: 'Suede Trail Silhouette Runner',
    subtitle: 'Water-Repellent Suede · Vibram Megagrip Lug Sole',
    description: 'A rugged yet refined hybrid made for alpine escapes and metropolitan streets alike. Constructed with velvety water-repellent suede and a high-traction Vibram lugged tread.',
    details: [
      'Vibram Megagrip lugged rubber outsole',
      'Mudguard protective trim',
      'Trekking rope eyelets with two sets of laces'
    ],
    price: 490,
    rating: 4.9,
    reviewCount: 34,
    category: 'sneakers',
    gender: 'unisex',
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Earth Sand', hex: '#A89F91' },
      { name: 'Forest Shadow', hex: '#3E4238' }
    ],
    sizes: ['EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44'],
    isNew: true,
    isFeaturedSneaker: true,
    inStock: true,
    stockCount: 12,
    careInstructions: ['Brush with brass/crepe suede brush', 'Apply waterproofing suede spray'],
    material: 'Water-Resistant Tuscan Suede, Vibram Rubber'
  },
  {
    id: 'vero-shoes-05',
    sku: 'VR-S-305',
    name: 'Hand-Polished Calfskin Derby Shoes',
    subtitle: 'Goodyear Welted · French Box Calf Leather',
    description: 'The pinnacle of footwear craftsmanship. Hand-lasted in Northamptonshire using french box calf leather, welted with traditional Goodyear construction that can be recrafted indefinitely.',
    details: [
      'Traditional Goodyear welted construction',
      'Oak-bark tanned leather soles with channeled stitching',
      'Hand-beveled waist and stacked leather heel'
    ],
    price: 780,
    rating: 4.9,
    reviewCount: 23,
    category: 'sneakers',
    gender: 'men',
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Glaze Black', hex: '#0F0F0F' },
      { name: 'Dark Burgundy', hex: '#4A1525' }
    ],
    sizes: ['UK 7 (EU 41)', 'UK 8 (EU 42)', 'UK 9 (EU 43)', 'UK 10 (EU 44)'],
    inStock: true,
    stockCount: 8,
    careInstructions: ['Polish with beeswax cream', 'Insert cedar shoe trees immediately'],
    material: '100% French Box Calf, Oak-Bark Tanned Leather Sole'
  },
  {
    id: 'vero-shoes-06',
    sku: 'VR-S-306',
    name: 'Sleek Waxed Suede Chelsea Boot',
    subtitle: 'Tuscan Waxed Roughout Suede · Crepe & Leather Sole',
    description: 'Effortlessly sharp and ruggedly resilient. Treated with artisanal wax that develops an exceptional patina with every journey.',
    details: [
      'Elasticized side goring with woven pull loops',
      'Weather-resistant reverse waxed suede',
      'Hand-stitched leather storm welt'
    ],
    price: 640,
    originalPrice: 720,
    rating: 4.8,
    reviewCount: 39,
    category: 'sneakers',
    gender: 'unisex',
    images: [
      'https://images.unsplash.com/photo-1614717832363-45c18836506f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Snuff Suede', hex: '#6E4D34' },
      { name: 'Charcoal Suede', hex: '#333333' }
    ],
    sizes: ['EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45'],
    isBestSeller: true,
    inStock: true,
    stockCount: 14,
    careInstructions: ['Apply wax conditioner once per season'],
    material: '100% Waxed Tuscan Suede'
  },

  // ===================== BAGS & ACCESSORIES =====================
  {
    id: 'vero-acc-01',
    sku: 'VR-B-401',
    name: 'The Grand Tour Full-Grain Leather Weekender',
    subtitle: 'Vegetable-Tanned Italian Vachetta · Solid Brass Hardware',
    description: 'An heirloom travel companion engineered for discerning voyagers. Handcrafted in Florence from full-grain vegetable-tanned vachetta leather that deepens in character year after year.',
    details: [
      'Hand-finished edge paint with 5 coats',
      'Dedicated zippered shoe and laundry compartment with waterproof lining',
      'Solid antique brass two-way zippers with lockable pulls',
      'Detachable padded leather shoulder strap and luggage trolley pass-through sleeve',
      'Dimensions: 52cm x 30cm x 26cm (TSA carry-on compliant)'
    ],
    price: 1350,
    originalPrice: 1550,
    rating: 5.0,
    reviewCount: 47,
    category: 'accessories',
    gender: 'unisex',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Cognac Saddle', hex: '#8B4513' },
      { name: 'Obsidian Noir', hex: '#111111' },
      { name: 'British Racing Green', hex: '#1B3524' }
    ],
    sizes: ['One Size (52cm)'],
    isNew: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 6,
    careInstructions: [
      'Condition with natural beeswax leather cream every 6 months',
      'Keep dry; wipe water immediately with dry cloth'
    ],
    material: '100% Full-Grain Vegetable-Tanned Italian Vachetta; Heavy Cotton Drill Lining',
    reviews: [
      {
        id: 'rev-b1-1',
        author: 'Lady Charlotte Hastings',
        location: 'Geneva, Switzerland',
        rating: 5,
        date: 'September 22, 2026',
        comment: 'It traveled with me across 4 continents this season. The leather has developed a glorious glow.',
        verified: true
      }
    ]
  },
  {
    id: 'vero-acc-02',
    sku: 'VR-B-402',
    name: 'Sculptural Minimalist Shoulder Bag',
    subtitle: 'Smooth Calfskin Box Leather · Magnetic Accordion Gusset',
    description: 'Clean architectural geometry meets daily utility. Featuring a pristine trapezoidal profile, magnetic flap closure, and an adjustable strap for shoulder or crossbody styling.',
    details: [
      'Concealed magnetic front closure with engraved insignia',
      'Three interior accordion compartments with zippered center pocket',
      'Nappa lambskin lining'
    ],
    price: 890,
    rating: 4.9,
    reviewCount: 53,
    category: 'accessories',
    gender: 'women',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Desert Sand', hex: '#D6C7B2' },
      { name: 'Tuscan Tan', hex: '#B87333' },
      { name: 'Jet Black', hex: '#0A0A0A' }
    ],
    sizes: ['One Size (24cm)'],
    isBestSeller: true,
    inStock: true,
    stockCount: 11,
    careInstructions: ['Store in included dust bag with paper stuffing to retain structure'],
    material: '100% Italian Box Calfskin; Lambskin Lining'
  },
  {
    id: 'vero-acc-03',
    sku: 'VR-B-403',
    name: 'Structured Modernist Tote Bag',
    subtitle: 'Grained Palmelato Leather · Laptop Sleeve',
    description: 'Designed for effortless transitions from executive meetings to international departures. Generously proportioned with padded compartment for a 16-inch laptop.',
    details: [
      'Reinforced rolled leather handles',
      'Padded microfiber laptop sleeve',
      'Protective metal base feet'
    ],
    price: 760,
    originalPrice: 850,
    rating: 4.8,
    reviewCount: 31,
    category: 'accessories',
    gender: 'unisex',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Caramel', hex: '#A76D38' },
      { name: 'Black Caviar', hex: '#161616' }
    ],
    sizes: ['One Size (40cm)'],
    inStock: true,
    stockCount: 9,
    careInstructions: ['Wipe gently with damp cloth'],
    material: '100% Grained Italian Leather'
  },
  {
    id: 'vero-acc-04',
    sku: 'VR-A-404',
    name: 'Atelier Silk Twill Monogram Square Scarf',
    subtitle: '90cm x 90cm · Hand-Rolled French Hem',
    description: 'Printed in Lyon on dense 18-momme silk twill, displaying our geometric labyrinth monogram. Finished entirely by hand with hand-rolled borders taking 45 minutes per scarf.',
    details: [
      '90cm x 90cm square dimensions',
      'Traditional screen-printed artwork',
      'Hand-rolled and stitched borders'
    ],
    price: 320,
    rating: 5.0,
    reviewCount: 26,
    category: 'accessories',
    gender: 'unisex',
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Champagne & Gold', hex: '#D4AF37' },
      { name: 'Monochrome Slate', hex: '#4A4A4A' }
    ],
    sizes: ['90 x 90 cm'],
    isNew: true,
    inStock: true,
    stockCount: 20,
    careInstructions: ['Dry clean only', 'Store flat or rolled; never folded with heavy weight'],
    material: '100% Lyon Mulberry Silk Twill'
  },
  {
    id: 'vero-acc-05',
    sku: 'VR-A-405',
    name: 'Slim Calfskin Bifold Card Wallet',
    subtitle: 'Full-Grain French Calfskin · RFID Protected',
    description: 'Slender, refined, and engineered for maximum utility with minimal bulk. Features six card slots, two hidden pockets, and a central cash bill compartment.',
    details: [
      'RFID blocking internal shield',
      'Ultra-thin 0.8mm folded leather profile',
      'Debossed subtle interior brand mark'
    ],
    price: 195,
    rating: 4.9,
    reviewCount: 78,
    category: 'accessories',
    gender: 'unisex',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Tobacco Tan', hex: '#8F5834' }
    ],
    sizes: ['One Size (11cm x 8.5cm)'],
    isBestSeller: true,
    inStock: true,
    stockCount: 40,
    careInstructions: ['Do not overstuff to maintain sleek contour'],
    material: '100% French Calfskin'
  },
  {
    id: 'vero-acc-06',
    sku: 'VR-A-406',
    name: 'Titanium & Acetate Geometric Sunglasses',
    subtitle: 'Japanese Titanium · Carl Zeiss CR-39 Lenses',
    description: 'Handmade in Sabae, Japan. Featuring featherlight beta-titanium temples paired with custom-beveled Italian Mazzucchelli acetate frames and anti-reflective Zeiss optics.',
    details: [
      '100% UVA/UVB protection Category 3',
      'Custom engraved titanium core wire',
      'Includes handcrafted leather travel case'
    ],
    price: 380,
    originalPrice: 420,
    rating: 4.8,
    reviewCount: 35,
    category: 'accessories',
    gender: 'unisex',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Amber Tortoise', hex: '#634731' },
      { name: 'Gloss Black', hex: '#141414' }
    ],
    sizes: ['One Size (49-21-145)'],
    inStock: true,
    stockCount: 17,
    careInstructions: ['Clean lenses with provided microfiber pouch and optical spray'],
    material: 'Mazzucchelli Bio-Acetate, Japanese Beta-Titanium, Zeiss Optics'
  },

  // ===================== WATCHES =====================
  {
    id: 'vero-watch-01',
    sku: 'VR-WCH-501',
    name: 'Chronographe Noir Automatique 40mm',
    subtitle: 'Calibre VR-88 · 72-Hour Power Reserve · Exhibition Caseback',
    description: 'An opus of modern haute horlogerie. Housing our proprietary Calibre VR-88 automatic column-wheel chronograph movement inside a sculpted 40mm stainless steel case with brushed satin bevels and deep obsidian sunray dial.',
    details: [
      'Calibre VR-88 Automatic Column-Wheel Chronograph',
      '72-hour power reserve with 28,800 vph (4Hz)',
      'Double-domed sapphire crystal with 5 layers of anti-reflective coating',
      'Exhibition caseback revealing Côtes de Genève finishing and 22k gold rotor',
      'Water resistant to 100 meters (10 ATM)'
    ],
    price: 3400,
    originalPrice: 3850,
    rating: 5.0,
    reviewCount: 27,
    category: 'watches',
    gender: 'unisex',
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Obsidian Sunray', hex: '#1C1C1E' },
      { name: 'Silver Slate', hex: '#7C7D81' }
    ],
    sizes: ['40mm Case (12.2mm thickness)'],
    isNew: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 4,
    careInstructions: [
      'Service movement every 5 years by certified watchmaker',
      'Rinse with freshwater after saltwater immersion'
    ],
    material: '316L Surgical Stainless Steel, Sapphire Crystal, Alligator-Pattern Calf Leather',
    reviews: [
      {
        id: 'rev-tch-1',
        author: 'Guillaume Mercier',
        location: 'La Chaux-de-Fonds, Switzerland',
        rating: 5,
        date: 'October 1, 2026',
        comment: 'The column wheel actuation is butter smooth. Case finishing punches well above its price tag.',
        verified: true
      }
    ]
  },
  {
    id: 'vero-watch-02',
    sku: 'VR-WCH-502',
    name: 'Atelier Skeleton Tourbillon Limited Edition',
    subtitle: 'Hand-Wound Flying Tourbillon · Titanium Grade 5 Case',
    description: 'The pinnacle expression of mechanical poetry. A gravity-defying 60-second flying tourbillon suspended inside a featherlight Grade 5 titanium skeleton chassis. Limited to 50 numbered pieces globally.',
    details: [
      '60-second Flying Tourbillon at 6 o’clock',
      '90-hour dual-barrel hand-wound power reserve',
      'Skeletonized bridges hand-chamfered and anglage polished',
      'Integrated quick-release FKM vulcanized rubber and leather straps included'
    ],
    price: 6800,
    rating: 5.0,
    reviewCount: 14,
    category: 'watches',
    gender: 'unisex',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Titanium Anthracite', hex: '#3E424B' },
      { name: 'Rose Gold PVD', hex: '#B76E79' }
    ],
    sizes: ['41.5mm Case (10.8mm thickness)'],
    isNew: true,
    inStock: true,
    stockCount: 2,
    careInstructions: ['Avoid exposure to strong magnetic fields exceeding 1,000 Gauss'],
    material: 'Grade 5 Titanium, Dual Sapphire Crystals, FKM Rubber & Hand-Stitched Leather'
  },
  {
    id: 'vero-watch-03',
    sku: 'VR-WCH-503',
    name: 'Classique Roman Dial Gold 38mm',
    subtitle: 'Ultra-Slim 6.4mm Profile · 18k Gold Electroplate',
    description: 'Pure understated elegance. Boasting an ultra-slender 6.4mm profile with fire-blued Breguet-style hands, applied Roman numerals, and an ivory enamel-finish dial.',
    details: [
      'Ultra-thin Swiss quartz calibre with 5-year battery life',
      'Ivory lacquered dial with heat-blued steel hands',
      'Genuine Louisiana alligator-grain leather strap with quick-release spring bars'
    ],
    price: 1250,
    originalPrice: 1400,
    rating: 4.9,
    reviewCount: 39,
    category: 'watches',
    gender: 'unisex',
    images: [
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: '18k Warm Gold / Ivory', hex: '#E5C158' },
      { name: 'Polished Silver / Snow', hex: '#E0E0E0' }
    ],
    sizes: ['38mm Case (6.4mm thickness)'],
    isBestSeller: true,
    inStock: true,
    stockCount: 15,
    careInstructions: ['Wipe case with soft optical cloth', 'Avoid submerging in hot water'],
    material: '316L Stainless Steel with 20-micron 18k Gold Plating, Sapphire Glass'
  },
  {
    id: 'vero-watch-04',
    sku: 'VR-WCH-504',
    name: 'Minimalist Monolithic Quartz 39mm',
    subtitle: 'Sandblasted Steel · Matte Opaline Dial',
    description: 'A tribute to Scandinavian functionalism and Bauhaus clarity. Stripped of excess to celebrate proportion, balance, and pure negative space.',
    details: [
      'Precision high-torque Swiss movement',
      'Minimalist baton indices and needle hands',
      'Milanaise mesh stainless steel bracelet with magnetic clasp'
    ],
    price: 680,
    rating: 4.8,
    reviewCount: 45,
    category: 'watches',
    gender: 'unisex',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Brushed Silver', hex: '#CCCCCC' },
      { name: 'Matte Charcoal', hex: '#2A2A2A' }
    ],
    sizes: ['39mm Case (7.5mm thickness)'],
    inStock: true,
    stockCount: 19,
    careInstructions: ['Water resistant 5 ATM (Splash and shower proof)'],
    material: 'Bead-Blasted Stainless Steel, Anti-Scratch Sapphire'
  },
  {
    id: 'vero-watch-05',
    sku: 'VR-WCH-505',
    name: 'Titanium Sport Automatic Diver 41mm',
    subtitle: 'Grade 2 Titanium · 300M Water Resistance · Ceramic Bezel',
    description: 'Uncompromising tool-watch performance encased in satin-finished titanium. Featuring a 120-click unidirectional ceramic dive bezel and Grade X1 Super-LumiNova luminescence.',
    details: [
      '300 meters / 1000 feet ISO 6425 certified dive rating',
      'Helium escape valve at 9 o’clock',
      'Screw-down crown with triple gasket seal system',
      'High-grade Swiss automatic movement with 38-hour reserve'
    ],
    price: 2150,
    originalPrice: 2450,
    rating: 4.9,
    reviewCount: 33,
    category: 'watches',
    gender: 'men',
    images: [
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Deep Sea Blue', hex: '#102A43' },
      { name: 'Phantom Black', hex: '#121212' }
    ],
    sizes: ['41mm Case (12.8mm thickness)'],
    isNew: true,
    inStock: true,
    stockCount: 8,
    careInstructions: ['Ensure crown is fully screwed down before entering water'],
    material: 'Satin Grade 2 Titanium, Zirconia Ceramic Bezel, Sapphire Crystal'
  }
];

export const CATEGORIES = [
  {
    id: 'all',
    name: 'All Collections',
    description: 'Explore the full panorama of modern luxury tailoring and horlogerie.'
  },
  {
    id: 'men',
    name: "Men's Clothing",
    description: 'Atelier tailoring, fine cashmere knitwear, and architectural outerwear.'
  },
  {
    id: 'women',
    name: "Women's Clothing",
    description: 'Sculptural trench coats, bias-cut silks, and effortless day-to-evening dressing.'
  },
  {
    id: 'sneakers',
    name: 'Sneakers & Shoes',
    description: 'Handcrafted Italian leather sneakers, dress derbies, and modern runners.'
  },
  {
    id: 'accessories',
    name: 'Bags & Accessories',
    description: 'Vegetable-tanned leather bags, French silk scarves, and titanium eyewear.'
  },
  {
    id: 'watches',
    name: 'Watches',
    description: 'Haute horlogerie chronographs, skeleton tourbillons, and minimalist timepieces.'
  }
];
