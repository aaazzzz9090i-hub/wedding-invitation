# VÉRO — Haute Couture & Modern Luxury E-Commerce

**VÉRO** is a premium fashion e-commerce web application inspired by high-end luxury fashion houses (Celine, The Row, Saint Laurent, Toteme, Net-a-Porter). It features architectural tailoring, fine Italian cordwaining, leather goods, and Swiss haute horlogerie.

---

## ⚡ Tech Stack

- **React 19** with **TypeScript**
- **Vite** with **Tailwind CSS v4** (`@tailwindcss/vite`)
- **React Router v7** (`react-router-dom`)
- **Lucide React** (Minimalist luxury icons)
- **Framer Motion** (Smooth transitions & drawers)
- **Local Storage API** (Persistent Bag, Wishlist, and Demo Authentication)

---

## 🚀 Quick Start Guide

### 1. Open the project directory
```powershell
cd C:\Users\Ahmed\.gemini\antigravity\scratch\vero-fashion
```

### 2. Run the development server
```powershell
npm run dev
```
Open your browser at [http://localhost:5173](http://localhost:5173).

### 3. Build for production & preview
```powershell
npm run build
npm run preview
```

---

## 📂 Project Architecture

```
vero-fashion/
├── index.html                   # Luxury typography & metadata (Cormorant Garamond, Montserrat)
├── vite.config.ts               # Vite configuration with @tailwindcss/vite
├── src/
│   ├── types/
│   │   └── index.ts             # Comprehensive TypeScript data models (Product, Order, CartItem)
│   ├── data/
│   │   ├── products.ts          # 29 luxury creations across 5 departments
│   │   └── testimonials.ts      # Client feedback, brand values & FAQ knowledge base
│   ├── context/
│   │   ├── CartContext.tsx      # Shopping bag state, quantity, promo VERO10, persistence
│   │   ├── WishlistContext.tsx  # Saved pieces, localStorage persistence
│   │   ├── AuthContext.tsx      # Demo customer authentication & order history
│   │   └── ToastContext.tsx     # Editorial luxury notifications
│   ├── utils/
│   │   └── index.ts             # Price formatting, discounts, and fallback SVG image resolver
│   ├── components/
│   │   ├── common/              # PriceDisplay, QuantitySelector, Breadcrumbs, QuickViewModal
│   │   ├── layout/              # AnnouncementBar, Navbar, Footer
│   │   ├── product/             # ProductCard, ProductGrid, FilterSidebar, SearchBarModal
│   │   └── cart/                # CartDrawer (Slide-over bag)
│   ├── pages/
│   │   ├── HomePage.tsx         # Editorial hero, categories, best sellers, lookbook, sneakers
│   │   ├── ShopPage.tsx         # Full 29-piece catalog, multi-filter, search, sort & density switch
│   │   ├── ProductDetailPage.tsx # Image gallery, size guide modal, accordions, stock & reviews
│   │   ├── CartPage.tsx         # Dedicated bag, free shipping meter, gift box option, totals
│   │   ├── CheckoutPage.tsx     # 3-step checkout, validation, demo card/Apple Pay, order receipt
│   │   ├── WishlistPage.tsx     # Saved pieces with quick move-to-bag action
│   │   ├── AccountPage.tsx      # Sign in/register demo, past orders tracking, address book
│   │   ├── AboutPage.tsx        # Biella & Civitanova Marche ateliers, sustainable cashmere
│   │   ├── ContactPage.tsx      # 24/7 Concierge form & 4 flagship salon addresses
│   │   ├── FAQPage.tsx          # Categorized customer service accordions
│   │   ├── ShippingReturnsPage.tsx # Delivery timelines & automated returns portal demo
│   │   └── NotFoundPage.tsx     # High-fashion 404 page ("A Lost Silhouette")
│   ├── App.tsx                  # Global providers, router routes & scroll-to-top
│   ├── index.css                # Tailwind CSS v4 setup & custom luxury scrollbars
│   └── main.tsx                 # Root React mounting
```

---

## 💎 Where to Customize Content

| Content | File Location | What to Edit |
|---|---|---|
| **Products, Images & Prices** | `src/data/products.ts` | Edit prices, names, Unsplash image URLs, color hexes, size arrays, and fabric descriptions. |
| **Brand Copy & Salons** | `src/data/testimonials.ts` & `src/components/layout/Footer.tsx` | Modify flagship boutique addresses, brand quotes, and customer reviews. |
| **Promo Codes & Discounts** | `src/context/CartContext.tsx` | Adjust promo code (currently `VERO10` for 10% off) or free shipping threshold ($200). |
| **Color Palette & Fonts** | `src/index.css` & `index.html` | Adjust cream backgrounds (`#FAF9F5`), charcoal blacks (`#111111`), or Google Font imports. |
