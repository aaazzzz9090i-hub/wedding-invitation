import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Order } from '../types';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  register: (firstName: string, lastName: string, email: string, pass: string) => boolean;
  logout: () => void;
  updateUserAddresses: (address: User['addresses'][0]) => void;
  addOrderToHistory: (order: Order) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'vero_demo_auth_user';

const DEMO_INITIAL_USER: User = {
  id: 'usr-9281',
  firstName: 'Alexander',
  lastName: 'Laurent',
  email: 'a.laurent@paris-atelier.com',
  phone: '+33 6 12 34 56 78',
  addresses: [
    {
      firstName: 'Alexander',
      lastName: 'Laurent',
      email: 'a.laurent@paris-atelier.com',
      phone: '+33 6 12 34 56 78',
      address: '14 Rue du Faubourg Saint-Honoré',
      apartment: 'Apt 4B',
      city: 'Paris',
      state: 'Île-de-France',
      postalCode: '75008',
      country: 'France'
    }
  ],
  orders: [
    {
      id: 'VERO-849102',
      date: 'October 14, 2026',
      items: [
        {
          id: 'vero-men-01',
          name: 'Atelier Double-Breasted Cashmere Coat',
          price: 1850,
          size: '50 (L)',
          color: 'Onyx Black',
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=80'
        }
      ],
      shippingAddress: {
        firstName: 'Alexander',
        lastName: 'Laurent',
        email: 'a.laurent@paris-atelier.com',
        phone: '+33 6 12 34 56 78',
        address: '14 Rue du Faubourg Saint-Honoré',
        city: 'Paris',
        state: 'Île-de-France',
        postalCode: '75008',
        country: 'France'
      },
      subtotal: 1850,
      discount: 185,
      shipping: 0,
      total: 1665,
      deliveryMethod: 'Atelier White Glove Express',
      paymentMethod: 'Credit Card (•••• 4242)',
      status: 'Delivered',
      trackingNumber: 'VR-FR-849102-DHL',
      estimatedDelivery: 'Delivered on Oct 16, 2026'
    }
  ]
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to sync auth state', e);
    }
  }, [user]);

  const login = (email: string): boolean => {
    // Frontend demo mock login
    const loggedUser: User = {
      ...DEMO_INITIAL_USER,
      email: email.trim(),
      firstName: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
    };
    setUser(loggedUser);
    showToast('Welcome to VÉRO', 'success', `Signed in as ${loggedUser.firstName}`);
    return true;
  };

  const register = (firstName: string, lastName: string, email: string): boolean => {
    const newUser: User = {
      id: 'usr-' + Math.floor(1000 + Math.random() * 9000),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      addresses: [],
      orders: []
    };
    setUser(newUser);
    showToast('Account Created', 'success', `Welcome to the VÉRO Circle, ${firstName}`);
    return true;
  };

  const logout = () => {
    setUser(null);
    showToast('Signed Out', 'info', 'You have been safely signed out');
  };

  const updateUserAddresses = (address: User['addresses'][0]) => {
    if (!user) return;
    setUser({
      ...user,
      addresses: [address, ...user.addresses.filter((a) => a.address !== address.address)]
    });
    showToast('Address Saved', 'success');
  };

  const addOrderToHistory = (order: Order) => {
    if (!user) return;
    setUser({
      ...user,
      orders: [order, ...user.orders]
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUserAddresses,
        addOrderToHistory
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
