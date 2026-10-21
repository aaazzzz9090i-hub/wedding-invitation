import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Product & Sizing Inquiry',
    orderNumber: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('Please fill all mandatory fields', 'error');
      return;
    }

    setIsSubmitted(true);
    showToast('Inquiry Transmitted', 'success', 'Our atelier concierge will respond within 4 hours');
  };

  const salons = [
    {
      city: "Paris Flagship",
      address: "14 Rue du Faubourg Saint-Honoré",
      postal: "75008 Paris, France",
      phone: "+33 1 42 68 55 00",
      hours: "Mon – Sat: 10:00 – 19:30"
    },
    {
      city: "Milan Salon",
      address: "Via Montenapoleone 8",
      postal: "20121 Milano, Italy",
      phone: "+39 02 7600 3421",
      hours: "Mon – Sat: 10:30 – 19:30"
    },
    {
      city: "New York Boutique",
      address: "720 Madison Avenue",
      postal: "New York, NY 10065",
      phone: "+1 212 555 0192",
      hours: "Mon – Sat: 11:00 – 19:00"
    },
    {
      city: "Tokyo Ginza",
      address: "6-10-1 Ginza, Chuo-ku",
      postal: "Tokyo 104-0061, Japan",
      phone: "+81 3 5555 0183",
      hours: "Daily: 11:00 – 20:00"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Client Concierge' }]} />

      <div className="pb-6 mb-12 border-b border-stone-200">
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-medium">
          Personal Assistance
        </span>
        <h1 className="text-3xl sm:text-4xl font-editorial font-normal uppercase tracking-wider text-stone-950 mt-1">
          Client Concierge & Salons
        </h1>
        <p className="text-xs text-stone-600 mt-2 font-light max-w-xl leading-relaxed">
          Whether you seek tailored sizing guidance, private appointments in our Paris or Milan salons, or consignment status, our concierge is dedicated to your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Contact Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-stone-200 p-8 sm:p-10 shadow-xs">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-editorial font-medium text-stone-950">
                Message Transmitted to Concierge
              </h3>
              <p className="text-xs text-stone-600 font-light max-w-sm mx-auto">
                Thank you, {formData.name}. An atelier specialist has received your dossier and will reach out via {formData.email}.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', topic: 'Product & Sizing Inquiry', orderNumber: '', message: '' });
                }}
                className="mt-4 px-6 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-widest font-medium"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 text-xs focus:border-stone-900 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 text-xs focus:border-stone-900 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">
                    Inquiry Nature
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 text-xs focus:border-stone-900 focus:outline-none cursor-pointer"
                  >
                    <option value="Product & Sizing Inquiry">Product & Sizing Consultation</option>
                    <option value="Consignment Status">Order Consignment Status</option>
                    <option value="Boutique Appointment">Private Boutique Appointment</option>
                    <option value="Press & Media">Press & VIP Editorial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">
                    Order Reference (If Applicable)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. VERO-849102"
                    value={formData.orderNumber}
                    onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 text-xs focus:border-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">
                  Your Message or Specification *
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail your request for the concierge..."
                  className="w-full p-4 bg-stone-50 border border-stone-300 text-xs focus:border-stone-900 focus:outline-none leading-relaxed"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-stone-950 text-white text-xs uppercase tracking-[0.25em] font-medium hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Transmit Message to Concierge
              </button>
            </form>
          )}
        </div>

        {/* Right: Salons & Directory (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-stone-900 text-white p-6 sm:p-8 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-amber-300 font-medium">
              Global Support
            </span>
            <h3 className="text-xl font-editorial font-normal">24/7 Digital Concierge</h3>
            <p className="text-xs text-stone-300 font-light leading-relaxed">
              Our multilingual specialists provide round-the-clock telephone and digital assistance for private clients worldwide.
            </p>
            <div className="pt-2 space-y-2 text-xs text-stone-300">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-300" />
                <span>concierge@vero-atelier.com</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-300" />
                <span>+33 1 42 68 55 00</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {salons.map((salon) => (
              <div key={salon.city} className="bg-white border border-stone-200 p-5 space-y-1.5 text-xs">
                <p className="font-semibold text-stone-950 text-sm">{salon.city}</p>
                <p className="text-stone-600">{salon.address}</p>
                <p className="text-stone-600">{salon.postal}</p>
                <p className="text-stone-500 pt-1">{salon.phone}</p>
                <p className="text-[10px] text-stone-400 font-light">{salon.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
