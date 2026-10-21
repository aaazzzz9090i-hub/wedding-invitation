import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../types';
import { useToast } from './ToastContext';

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, delta: number) => void;
  clearCart: () => void;
  discountCode: string;
  discountPercent: number;
  applyDiscount: (code: string) => boolean;
  removeDiscount: () => void;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  total: number;
  totalCount: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'vero_cart_items';
const PROMO_STORAGE_KEY = 'vero_promo_code';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load initial cart from localStorage
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Load initial promo code from localStorage
  const [discountCode, setDiscountCode] = useState<string>(() => {
    try {
      return localStorage.getItem(PROMO_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  const [discountPercent, setDiscountPercent] = useState<number>(() => {
    try {
      const code = localStorage.getItem(PROMO_STORAGE_KEY) || '';
      return code.trim().toUpperCase() === 'VERO10' ? 10 : 0;
    } catch {
      return 0;
    }
  });

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      if (discountCode) {
        localStorage.setItem(PROMO_STORAGE_KEY, discountCode);
      } else {
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save promo to localStorage', e);
    }
  }, [discountCode]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    if (!size) {
      showToast('Please select a size', 'error');
      return;
    }
    if (!color) {
      showToast('Please select a color', 'error');
      return;
    }

    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prev, { product, selectedSize: size, selectedColor: color, quantity }];
    });

    showToast(
      'Added to Shopping Bag',
      'success',
      `${product.name} (${size} · ${color})`
    );
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setItems((prev) => {
      const target = prev.find(
        (i) => i.product.id === productId && i.selectedSize === size && i.selectedColor === color
      );
      if (target) {
        showToast('Removed from Bag', 'info', target.product.name);
      }
      return prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      );
    });
  };

  const updateQuantity = (productId: string, size: string, color: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          ) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyDiscount = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'VERO10') {
      setDiscountCode('VERO10');
      setDiscountPercent(10);
      showToast('Promo Code Applied', 'success', '10% atelier privilege discount activated');
      return true;
    } else {
      showToast('Invalid Promotion Code', 'error', 'Try promo code VERO10 for 10% off');
      return false;
    }
  };

  const removeDiscount = () => {
    setDiscountCode('');
    setDiscountPercent(0);
    showToast('Promo Code Removed', 'info');
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const freeShippingThreshold = 200;
  const shippingFee = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : 25;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);
  const totalCount = items.reduce((count, item) => count + item.quantity, 0);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        discountCode,
        discountPercent,
        applyDiscount,
        removeDiscount,
        subtotal,
        discountAmount,
        shippingFee,
        total,
        totalCount,
        freeShippingThreshold,
        amountNeededForFreeShipping
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
