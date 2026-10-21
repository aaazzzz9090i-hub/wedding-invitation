import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User as UserIcon,
  Package,
  MapPin,
  LogOut,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { formatPrice } from '../utils';

export const AccountPage: React.FC = () => {
  const { user, isAuthenticated, login, register, logout } = useAuth();

  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('a.laurent@paris-atelier.com');
  const [password, setPassword] = useState('atelier1234');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'details'>('orders');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email and password.');
      return;
    }
    setErrorMessage('');
    login(email, password);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('All fields are required to join the VÉRO Circle.');
      return;
    }
    setErrorMessage('');
    register(firstName, lastName, email, password);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Client Account' }]} />

      {/* Demo notice banner */}
      <div className="bg-amber-50 border border-amber-200 p-4 mb-8 text-amber-950 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs">
          <p className="font-semibold uppercase tracking-wider text-[11px]">
            FRONTEND DEMO AUTHENTICATION
          </p>
          <p className="font-light text-amber-800 mt-0.5">
            This customer account area is an interactive frontend demo. You can sign in using the prefilled demo credentials or create a simulated account to test the client dashboard, order history, and address book.
          </p>
        </div>
      </div>

      {isAuthenticated && user ? (
        /* Logged In Dashboard */
        <div className="space-y-8">
          {/* Header Card */}
          <div className="bg-white border border-stone-200 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-stone-900 text-white flex items-center justify-center font-editorial text-2xl font-light">
                {user.firstName[0]}
                {user.lastName[0]}
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500 font-medium">
                  VÉRO Private Circle Member
                </span>
                <h1 className="text-2xl font-editorial font-medium text-stone-950">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-xs text-stone-500 font-light">{user.email}</p>
              </div>
            </div>

            <button
              onClick={logout}
              className="px-5 py-2.5 border border-stone-300 hover:border-stone-900 text-stone-700 text-xs uppercase tracking-wider font-medium flex items-center gap-2 self-start sm:self-auto transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-stone-200 text-xs uppercase tracking-widest gap-8">
            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-4 border-b-2 font-medium transition-colors cursor-pointer ${
                activeTab === 'orders'
                  ? 'border-stone-950 text-stone-950 font-semibold'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              Order Consignments ({user.orders.length})
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`pb-4 border-b-2 font-medium transition-colors cursor-pointer ${
                activeTab === 'addresses'
                  ? 'border-stone-950 text-stone-950 font-semibold'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              Saved Addresses ({user.addresses.length})
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-4 border-b-2 font-medium transition-colors cursor-pointer ${
                activeTab === 'details'
                  ? 'border-stone-950 text-stone-950 font-semibold'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              Personal Details
            </button>
          </div>

          {/* Tab 1: Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {user.orders.length === 0 ? (
                <div className="bg-white border border-stone-200 p-12 text-center">
                  <Package className="w-8 h-8 text-stone-400 mx-auto mb-3" />
                  <p className="text-sm font-medium text-stone-900">No Consignments Placed Yet</p>
                  <p className="text-xs text-stone-500 mt-1">Discover our latest collections to place your inaugural order.</p>
                  <Link to="/shop" className="mt-6 inline-block px-6 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-widest">
                    Browse Creations
                  </Link>
                </div>
              ) : (
                user.orders.map((order) => (
                  <div key={order.id} className="bg-white border border-stone-200 p-6 sm:p-8 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-stone-400">Order Reference</span>
                        <p className="text-sm font-semibold font-mono text-stone-950">{order.id}</p>
                        <p className="text-xs text-stone-500 font-light">{order.date}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] uppercase tracking-widest px-3 py-1 font-medium border ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          {order.status}
                        </span>
                        <span className="text-sm font-semibold text-stone-950">
                          {formatPrice(order.total)}
                        </span>
                      </div>
                    </div>

                    {/* Order items */}
                    <div className="divide-y divide-stone-100">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                          <div className="flex items-center gap-3">
                            <img src={item.image} alt={item.name} className="w-12 h-15 object-cover border" />
                            <div>
                              <p className="font-medium text-stone-900">{item.name}</p>
                              <p className="text-[10px] text-stone-500">Size: {item.size} · Color: {item.color} · Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="font-semibold text-stone-900">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row justify-between text-xs text-stone-500 gap-2">
                      <p>
                        Delivery Method: <strong className="text-stone-900">{order.deliveryMethod}</strong>
                      </p>
                      <p>
                        Tracking: <strong className="font-mono text-stone-900">{order.trackingNumber}</strong>
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 2: Addresses */}
          {activeTab === 'addresses' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.addresses.map((addr, idx) => (
                <div key={idx} className="bg-white border border-stone-200 p-6 space-y-2 text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-stone-900">
                      Primary Delivery Salon
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5">Default</span>
                  </div>
                  <p className="font-semibold text-stone-950 text-sm">{addr.firstName} {addr.lastName}</p>
                  <p className="text-stone-600">{addr.address} {addr.apartment}</p>
                  <p className="text-stone-600">{addr.city}, {addr.state} {addr.postalCode}</p>
                  <p className="text-stone-600">{addr.country}</p>
                  <p className="text-stone-500 pt-2">{addr.phone}</p>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Details */}
          {activeTab === 'details' && (
            <div className="bg-white border border-stone-200 p-8 max-w-xl text-xs space-y-4">
              <h3 className="text-sm uppercase tracking-widest font-semibold text-stone-900">
                Atelier Profile Credentials
              </h3>
              <div>
                <span className="text-stone-400 uppercase tracking-widest text-[10px] block">Full Name</span>
                <span className="text-stone-950 font-medium text-sm">{user.firstName} {user.lastName}</span>
              </div>
              <div>
                <span className="text-stone-400 uppercase tracking-widest text-[10px] block">Registered Email</span>
                <span className="text-stone-950 font-medium text-sm">{user.email}</span>
              </div>
              <div>
                <span className="text-stone-400 uppercase tracking-widest text-[10px] block">Membership Status</span>
                <span className="text-emerald-700 font-medium text-sm">Privileged Haute Couture Client</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Sign In / Register Tabs */
        <div className="max-w-md mx-auto bg-white border border-stone-200 p-8 sm:p-10 shadow-sm">
          <div className="flex border-b border-stone-200 text-xs uppercase tracking-widest mb-6">
            <button
              onClick={() => {
                setAuthMode('signin');
                setErrorMessage('');
              }}
              className={`flex-1 pb-3 text-center cursor-pointer ${
                authMode === 'signin'
                  ? 'border-b-2 border-stone-950 font-semibold text-stone-950'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setAuthMode('register');
                setErrorMessage('');
              }}
              className={`flex-1 pb-3 text-center cursor-pointer ${
                authMode === 'register'
                  ? 'border-b-2 border-stone-950 font-semibold text-stone-950'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              Join The Circle
            </button>
          </div>

          {errorMessage && (
            <p className="text-xs text-rose-600 mb-4 p-2 bg-rose-50 border border-rose-200">
              {errorMessage}
            </p>
          )}

          {authMode === 'signin' ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-300 text-xs focus:border-stone-900 focus:outline-none"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Demo Notice: You can sign in with any demo password.')}
                    className="text-[10px] uppercase tracking-wider text-stone-400 hover:text-stone-900"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-300 text-xs focus:border-stone-900 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-stone-950 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-stone-800 transition-colors cursor-pointer mt-2"
              >
                Sign In to Account
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-3 bg-stone-50 border border-stone-300 text-xs focus:border-stone-900 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-3 bg-stone-50 border border-stone-300 text-xs focus:border-stone-900 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-300 text-xs focus:border-stone-900 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">
                  Create Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-300 text-xs focus:border-stone-900 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-stone-950 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-stone-800 transition-colors cursor-pointer mt-2"
              >
                Create VÉRO Account
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
