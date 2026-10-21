import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  CheckCircle2,
  CreditCard,
  Truck,
  ArrowRight,
  ShoppingBag,
  Printer,
  ChevronLeft,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { formatPrice, handleImageError } from '../utils';
import { ShippingAddress, Order } from '../types';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, subtotal, discountAmount, discountCode, shippingFee, total, clearCart } = useCart();
  const { user, addOrderToHistory } = useAuth();
  const { showToast } = useToast();

  const [currentStep, setCurrentStep] = useState<'information' | 'shipping' | 'payment'>('information');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Form State
  const [formData, setFormData] = useState<ShippingAddress>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '+1 (555) 019-2834',
    address: user?.addresses[0]?.address || '740 Park Avenue',
    apartment: user?.addresses[0]?.apartment || 'Suite 12B',
    city: user?.addresses[0]?.city || 'New York',
    state: user?.addresses[0]?.state || 'NY',
    postalCode: user?.addresses[0]?.postalCode || '10021',
    country: user?.addresses[0]?.country || 'United States'
  });

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express' | 'white-glove'>('express');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple-pay' | 'klarna' | 'cod'>('card');
  const [demoCardNumber, setDemoCardNumber] = useState('•••• •••• •••• 4242');
  const [demoCardExp, setDemoCardExp] = useState('12/28');
  const [demoCardCvc, setDemoCardCvc] = useState('888');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate delivery cost based on method
  const deliveryCosts = {
    standard: shippingFee,
    express: shippingFee > 0 ? shippingFee : 0,
    'white-glove': 50
  };
  const activeDeliveryCost = deliveryCosts[deliveryMethod];
  const grandTotal = subtotal - discountAmount + activeDeliveryCost;

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email is required';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.address.trim()) errors.address = 'Street address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.postalCode.trim()) errors.postalCode = 'Postal / ZIP code is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 'information') {
      if (validateForm()) {
        setCurrentStep('shipping');
      } else {
        showToast('Please complete required fields', 'error');
      }
    } else if (currentStep === 'shipping') {
      setCurrentStep('payment');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setCurrentStep('information');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = 'VR-' + Math.floor(100000 + Math.random() * 900000);
      const deliveryDates = {
        standard: '3-5 business days',
        express: '1-2 business days',
        'white-glove': 'Tomorrow by appointment'
      };

      const newOrder: Order = {
        id: orderId,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        items: items.map((i) => ({
          id: i.product.id,
          name: i.product.name,
          price: i.product.price,
          size: i.selectedSize,
          color: i.selectedColor,
          quantity: i.quantity,
          image: i.product.images[0]
        })),
        shippingAddress: formData,
        subtotal,
        discount: discountAmount,
        shipping: activeDeliveryCost,
        total: grandTotal,
        deliveryMethod:
          deliveryMethod === 'white-glove'
            ? 'Atelier White Glove Signature Delivery'
            : deliveryMethod === 'express'
            ? 'Worldwide Express Delivery (DHL)'
            : 'Standard Insured Delivery',
        paymentMethod:
          paymentMethod === 'card'
            ? 'Demo Credit Card (•••• 4242)'
            : paymentMethod === 'apple-pay'
            ? 'Demo Apple Pay'
            : paymentMethod === 'klarna'
            ? 'Demo Klarna 4 Installments'
            : 'Demo Cash on Delivery',
        status: 'Processing',
        trackingNumber: `VR-TRK-${Math.floor(1000000 + Math.random() * 9000000)}`,
        estimatedDelivery: deliveryDates[deliveryMethod]
      };

      addOrderToHistory(newOrder);
      setConfirmedOrder(newOrder);
      setIsOrderPlaced(true);
      clearCart();
      setIsSubmitting(false);
      showToast('Order Placed Successfully', 'success', `Order #${orderId}`);
    }, 1200);
  };

  // Order Confirmation Screen
  if (isOrderPlaced && confirmedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white border border-stone-200 p-8 sm:p-12 shadow-sm text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-700 font-semibold block">
            Acquisition Confirmed
          </span>

          <h1 className="text-3xl sm:text-4xl font-editorial font-normal uppercase tracking-wider text-stone-950 mt-1">
            Thank You, {confirmedOrder.shippingAddress.firstName}
          </h1>

          <p className="text-xs text-stone-600 mt-2 font-light">
            Your bespoke consignment order reference is <strong className="font-semibold text-stone-950">{confirmedOrder.id}</strong>.
            A confirmation dispatch dossier has been dispatched to <strong className="font-semibold text-stone-950">{confirmedOrder.shippingAddress.email}</strong>.
          </p>

          {/* Demo notice badge */}
          <div className="my-6 p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs tracking-wide text-left flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold uppercase text-[10px] tracking-wider">Demo Prototype Confirmation</p>
              <p className="text-[11px] font-light mt-0.5">
                This was a demonstration transaction on the VÉRO storefront. No actual charges were made to any account, and no physical goods will ship.
              </p>
            </div>
          </div>

          {/* Order Snapshot */}
          <div className="border border-stone-200 p-6 my-8 text-left space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-stone-200 text-xs">
              <div>
                <span className="text-stone-400 uppercase tracking-widest text-[10px] block">Estimated Arrival</span>
                <span className="text-stone-900 font-medium">{confirmedOrder.estimatedDelivery}</span>
              </div>
              <div className="text-right">
                <span className="text-stone-400 uppercase tracking-widest text-[10px] block">Tracking Code</span>
                <span className="text-stone-900 font-medium font-mono text-[11px]">{confirmedOrder.trackingNumber}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-stone-400 block mb-3">
                Consignment Pieces ({confirmedOrder.items.length})
              </span>
              <div className="divide-y divide-stone-100">
                {confirmedOrder.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} onError={handleImageError} className="w-10 h-12 object-cover border" />
                      <div>
                        <p className="font-medium text-stone-900">{item.name}</p>
                        <p className="text-[10px] text-stone-500">Size: {item.size} · Color: {item.color} · Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium text-stone-900">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(confirmedOrder.subtotal)}</span>
              </div>
              {confirmedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Privilege Savings</span>
                  <span>-{formatPrice(confirmedOrder.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Method</span>
                <span>{confirmedOrder.shipping === 0 ? 'Complimentary' : formatPrice(confirmedOrder.shipping)}</span>
              </div>
              <div className="flex justify-between text-stone-950 font-semibold pt-2 text-sm border-t border-stone-100">
                <span>Total Amount</span>
                <span>{formatPrice(confirmedOrder.total)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-white border border-stone-300 text-stone-800 text-xs uppercase tracking-widest font-medium hover:border-stone-900 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Consignment Receipt</span>
            </button>
            <Link
              to="/shop"
              className="px-8 py-3 bg-stone-950 text-white text-xs uppercase tracking-widest font-medium hover:bg-stone-800 transition-colors"
            >
              Return to Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty and order is not placed
  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-editorial font-medium text-stone-950">Your Bag is Empty</h2>
        <p className="text-xs text-stone-500 mt-2">Please select garments before proceeding to checkout.</p>
        <Link to="/shop" className="mt-6 inline-block px-8 py-3 bg-stone-950 text-white text-xs uppercase tracking-widest">
          Explore Creations
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Bag', path: '/cart' }, { label: 'Checkout' }]} />

      {/* Mandatory Demo Notice */}
      <div className="bg-amber-50 border border-amber-200 p-4 mb-8 text-amber-950 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs">
          <p className="font-semibold uppercase tracking-wider text-[11px]">DEMO STORE ENVIRONMENT</p>
          <p className="font-light text-amber-800 mt-0.5">
            This checkout is a frontend prototype. No real payments are processed and no financial credentials should be provided. Mock data is prefilled for your convenience.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Checkout Steps (7 Cols) */}
        <div className="lg:col-span-7">
          {/* Step Indicator */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-stone-200 text-xs">
            <button
              onClick={() => setCurrentStep('information')}
              className={`flex items-center gap-2 uppercase tracking-widest font-medium cursor-pointer ${
                currentStep === 'information' ? 'text-stone-950 font-semibold' : 'text-stone-400'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep === 'information' ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-600'}`}>1</span>
              <span>Information</span>
            </button>

            <span className="text-stone-300">———</span>

            <button
              onClick={() => validateForm() && setCurrentStep('shipping')}
              className={`flex items-center gap-2 uppercase tracking-widest font-medium cursor-pointer ${
                currentStep === 'shipping' ? 'text-stone-950 font-semibold' : 'text-stone-400'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep === 'shipping' ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-600'}`}>2</span>
              <span>Shipping</span>
            </button>

            <span className="text-stone-300">———</span>

            <button
              onClick={() => validateForm() && setCurrentStep('payment')}
              className={`flex items-center gap-2 uppercase tracking-widest font-medium cursor-pointer ${
                currentStep === 'payment' ? 'text-stone-950 font-semibold' : 'text-stone-400'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep === 'payment' ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-600'}`}>3</span>
              <span>Payment</span>
            </button>
          </div>

          {/* STEP 1: INFORMATION */}
          {currentStep === 'information' && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <div>
                <h3 className="text-sm uppercase tracking-[0.2em] font-semibold text-stone-950 mb-4">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-stone-300 text-xs focus:border-stone-900 focus:outline-none"
                      required
                    />
                    {formErrors.email && <p className="text-[11px] text-rose-600 mt-1">{formErrors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-stone-300 text-xs focus:border-stone-900 focus:outline-none"
                      required
                    />
                    {formErrors.phone && <p className="text-[11px] text-rose-600 mt-1">{formErrors.phone}</p>}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-stone-200">
                <h3 className="text-sm uppercase tracking-[0.2em] font-semibold text-stone-950 mb-4">
                  Shipping Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-stone-300 text-xs focus:border-stone-900 focus:outline-none"
                      required
                    />
                    {formErrors.firstName && <p className="text-[11px] text-rose-600 mt-1">{formErrors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-stone-300 text-xs focus:border-stone-900 focus:outline-none"
                      required
                    />
                    {formErrors.lastName && <p className="text-[11px] text-rose-600 mt-1">{formErrors.lastName}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-stone-300 text-xs focus:border-stone-900 focus:outline-none"
                      required
                    />
                    {formErrors.address && <p className="text-[11px] text-rose-600 mt-1">{formErrors.address}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">
                      Apartment, Suite, Unit (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.apartment || ''}
                      onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-stone-300 text-xs focus:border-stone-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-stone-300 text-xs focus:border-stone-900 focus:outline-none"
                      required
                    />
                    {formErrors.city && <p className="text-[11px] text-rose-600 mt-1">{formErrors.city}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">
                        State / Region
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3 py-3 bg-white border border-stone-300 text-xs focus:border-stone-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full px-3 py-3 bg-white border border-stone-300 text-xs focus:border-stone-900 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">
                      Country / Region
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-stone-300 text-xs focus:border-stone-900 focus:outline-none cursor-pointer"
                    >
                      <option value="United States">United States</option>
                      <option value="France">France</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Italy">Italy</option>
                      <option value="Germany">Germany</option>
                      <option value="Japan">Japan</option>
                      <option value="Canada">Canada</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <Link to="/cart" className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Return to Bag</span>
                </Link>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-stone-950 text-white text-xs uppercase tracking-widest font-medium hover:bg-stone-800 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Shipping</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: SHIPPING METHOD */}
          {currentStep === 'shipping' && (
            <div className="space-y-6">
              <div className="p-4 bg-white border border-stone-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-400">Deliver To:</span>
                  <span className="font-medium text-stone-900">
                    {formData.address}, {formData.city}, {formData.state} {formData.postalCode}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Contact:</span>
                  <span className="font-medium text-stone-900">{formData.email}</span>
                </div>
                <button
                  onClick={() => setCurrentStep('information')}
                  className="text-stone-900 underline text-[11px] uppercase tracking-wider block pt-1"
                >
                  Change
                </button>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-[0.2em] font-semibold text-stone-950 mb-4">
                  Select Delivery Speed
                </h3>
                <div className="space-y-3">
                  <label
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                      deliveryMethod === 'express' ? 'border-stone-900 bg-stone-50' : 'border-stone-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'express'}
                        onChange={() => setDeliveryMethod('express')}
                        className="accent-stone-900"
                      />
                      <div>
                        <p className="text-xs font-semibold text-stone-900">
                          Worldwide Express Delivery (DHL Tracked)
                        </p>
                        <p className="text-[11px] text-stone-500 font-light">1-2 business days with live courier tracking</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-stone-900">
                      {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
                    </span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                      deliveryMethod === 'standard' ? 'border-stone-900 bg-stone-50' : 'border-stone-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'standard'}
                        onChange={() => setDeliveryMethod('standard')}
                        className="accent-stone-900"
                      />
                      <div>
                        <p className="text-xs font-semibold text-stone-900">Standard Insured Delivery</p>
                        <p className="text-[11px] text-stone-500 font-light">3-5 business days</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-stone-900">
                      {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
                    </span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                      deliveryMethod === 'white-glove' ? 'border-stone-900 bg-stone-50' : 'border-stone-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'white-glove'}
                        onChange={() => setDeliveryMethod('white-glove')}
                        className="accent-stone-900"
                      />
                      <div>
                        <p className="text-xs font-semibold text-stone-900">
                          Atelier White Glove Signature Delivery
                        </p>
                        <p className="text-[11px] text-stone-500 font-light">
                          Hand-delivered in garment bag, in-suite fitting & scheduled courier window
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-stone-900">$50</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep('information')}
                  className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Return to Information</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep('payment')}
                  className="px-8 py-3.5 bg-stone-950 text-white text-xs uppercase tracking-widest font-medium hover:bg-stone-800 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DEMO PAYMENT */}
          {currentStep === 'payment' && (
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              <div>
                <h3 className="text-sm uppercase tracking-[0.2em] font-semibold text-stone-950 mb-1">
                  Demo Payment Method
                </h3>
                <p className="text-xs text-stone-500 mb-4 font-light">
                  All transactions are secure and encrypted for this demonstration prototype.
                </p>

                <div className="space-y-3">
                  {/* Credit Card Option */}
                  <div
                    className={`border p-4 transition-all ${
                      paymentMethod === 'card' ? 'border-stone-900 bg-white' : 'border-stone-200 bg-stone-50/50'
                    }`}
                  >
                    <label className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="accent-stone-900"
                        />
                        <span className="text-xs font-semibold text-stone-900">Demo Credit / Debit Card</span>
                      </div>
                      <CreditCard className="w-4 h-4 text-stone-600" />
                    </label>

                    {paymentMethod === 'card' && (
                      <div className="mt-4 pt-4 border-t border-stone-200 space-y-3">
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-1">
                            Card Number (Demo Preset)
                          </label>
                          <input
                            type="text"
                            value={demoCardNumber}
                            onChange={(e) => setDemoCardNumber(e.target.value)}
                            className="w-full px-3 py-2 bg-stone-50 border border-stone-300 text-xs font-mono"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-1">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              value={demoCardExp}
                              onChange={(e) => setDemoCardExp(e.target.value)}
                              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 text-xs font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-1">
                              Security CVC
                            </label>
                            <input
                              type="text"
                              value={demoCardCvc}
                              onChange={(e) => setDemoCardCvc(e.target.value)}
                              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 text-xs font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Apple Pay Option */}
                  <label
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                      paymentMethod === 'apple-pay' ? 'border-stone-900 bg-stone-50' : 'border-stone-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'apple-pay'}
                        onChange={() => setPaymentMethod('apple-pay')}
                        className="accent-stone-900"
                      />
                      <span className="text-xs font-semibold text-stone-900">Demo Apple Pay Express</span>
                    </div>
                    <span className="text-xs font-mono text-stone-500">Pay Demo</span>
                  </label>

                  {/* Klarna Option */}
                  <label
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                      paymentMethod === 'klarna' ? 'border-stone-900 bg-stone-50' : 'border-stone-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'klarna'}
                        onChange={() => setPaymentMethod('klarna')}
                        className="accent-stone-900"
                      />
                      <div>
                        <span className="text-xs font-semibold text-stone-900">Klarna 4 Interest-Free Installments</span>
                        <p className="text-[10px] text-stone-500">4 installments of {formatPrice(Math.round(grandTotal / 4))}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-stone-900">Klarna.</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep('shipping')}
                  className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Return to Shipping</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-10 py-4 bg-stone-950 text-white text-xs uppercase tracking-[0.25em] font-medium hover:bg-stone-800 transition-colors flex items-center gap-2 cursor-pointer shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Securing Consignment...'
                  ) : (
                    <>
                      <span>Authorize Acquisition ({formatPrice(grandTotal)})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right: Order Summary Sidebar (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-stone-200 p-6 sm:p-8 sticky top-24">
            <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-stone-950 pb-4 border-b border-stone-200">
              Consignment Items ({items.length})
            </h3>

            <div className="divide-y divide-stone-100 max-h-80 overflow-y-auto py-2">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="py-3 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      onError={handleImageError}
                      className="w-12 h-15 object-cover border border-stone-200"
                    />
                    <div>
                      <h4 className="font-medium text-stone-900 line-clamp-1">{item.product.name}</h4>
                      <p className="text-[10px] text-stone-500">
                        Size: {item.selectedSize} · Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-stone-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-200 space-y-2.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Privilege ({discountCode})</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{activeDeliveryCost === 0 ? 'Complimentary' : formatPrice(activeDeliveryCost)}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline pt-4 mt-4 border-t border-stone-200">
              <span className="text-xs uppercase tracking-widest font-semibold text-stone-900">
                Grand Total
              </span>
              <span className="text-2xl font-editorial font-medium text-stone-950">
                {formatPrice(grandTotal)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
