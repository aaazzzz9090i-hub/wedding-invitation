import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Truck, RotateCcw, ShieldCheck, Box, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ShippingReturnsPage: React.FC = () => {
  const { showToast } = useToast();
  const [returnOrderNumber, setReturnOrderNumber] = useState('');
  const [returnReason, setReturnReason] = useState('Exchange for different size');
  const [returnSubmitted, setReturnSubmitted] = useState(false);

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!returnOrderNumber.trim()) {
      showToast('Please enter your order reference number', 'error');
      return;
    }
    setReturnSubmitted(true);
    showToast('Return Portal Label Generated', 'success', `Return label generated for ${returnOrderNumber}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Complimentary Shipping & Returns' }]} />

      <div className="pb-6 mb-12 border-b border-stone-200">
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-medium">
          Client Services
        </span>
        <h1 className="text-3xl sm:text-4xl font-editorial font-normal uppercase tracking-wider text-stone-950 mt-1">
          Complimentary Worldwide Shipping & Returns
        </h1>
        <p className="text-xs text-stone-600 mt-2 font-light max-w-xl leading-relaxed">
          At VÉRO, seamless global logistics are part of the luxury experience. Every piece is insured, hand-packed in our Biella and Paris salons, and delivered with white-glove precision.
        </p>
      </div>

      {/* Grid of Key Guarantees */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 bg-white border border-stone-200 space-y-3">
          <Truck className="w-6 h-6 text-stone-950" />
          <h3 className="text-base font-editorial font-medium text-stone-950">
            Complimentary Over $200
          </h3>
          <p className="text-xs text-stone-600 font-light leading-relaxed">
            All orders exceeding $200 qualify automatically for complimentary tracked express delivery worldwide via DHL or FedEx.
          </p>
        </div>

        <div className="p-6 bg-white border border-stone-200 space-y-3">
          <RotateCcw className="w-6 h-6 text-stone-950" />
          <h3 className="text-base font-editorial font-medium text-stone-950">
            30-Day Atelier Return
          </h3>
          <p className="text-xs text-stone-600 font-light leading-relaxed">
            Take up to 30 days in the comfort of your home to inspect the drape, silhouette, and tactile finish of your acquisition.
          </p>
        </div>

        <div className="p-6 bg-white border border-stone-200 space-y-3">
          <Box className="w-6 h-6 text-stone-950" />
          <h3 className="text-base font-editorial font-medium text-stone-950">
            Archival Packaging
          </h3>
          <p className="text-xs text-stone-600 font-light leading-relaxed">
            All garments arrive enclosed in breathable organic cotton dust covers inside heavy debossed presentation linen boxes.
          </p>
        </div>
      </div>

      {/* Shipping Schedules Table */}
      <div className="bg-white border border-stone-200 p-8 mb-16 space-y-4">
        <h3 className="text-sm uppercase tracking-[0.2em] font-semibold text-stone-950">
          Delivery Timelines by Destination
        </h3>
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse border border-stone-200">
            <thead>
              <tr className="bg-stone-100 text-stone-900 uppercase tracking-wider text-[10px]">
                <th className="p-3 border border-stone-200">Region</th>
                <th className="p-3 border border-stone-200">Courier Partner</th>
                <th className="p-3 border border-stone-200">Standard Timeline</th>
                <th className="p-3 border border-stone-200">Orders Over $200</th>
                <th className="p-3 border border-stone-200">Under $200</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-700 font-light">
              <tr>
                <td className="p-3 font-medium text-stone-950 border border-stone-200">France & Western Europe</td>
                <td className="p-3 border border-stone-200">DHL Express / Chronopost</td>
                <td className="p-3 border border-stone-200">1 – 2 Business Days</td>
                <td className="p-3 font-semibold text-emerald-700 border border-stone-200">Complimentary</td>
                <td className="p-3 border border-stone-200">$20</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-stone-950 border border-stone-200">United States & Canada</td>
                <td className="p-3 border border-stone-200">DHL Express Air</td>
                <td className="p-3 border border-stone-200">2 – 3 Business Days</td>
                <td className="p-3 font-semibold text-emerald-700 border border-stone-200">Complimentary</td>
                <td className="p-3 border border-stone-200">$25</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-stone-950 border border-stone-200">United Kingdom & Switzerland</td>
                <td className="p-3 border border-stone-200">DHL Express (DDP - Duties Paid)</td>
                <td className="p-3 border border-stone-200">2 – 3 Business Days</td>
                <td className="p-3 font-semibold text-emerald-700 border border-stone-200">Complimentary</td>
                <td className="p-3 border border-stone-200">$25</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-stone-950 border border-stone-200">Asia-Pacific & Middle East</td>
                <td className="p-3 border border-stone-200">FedEx International Priority</td>
                <td className="p-3 border border-stone-200">3 – 4 Business Days</td>
                <td className="p-3 font-semibold text-emerald-700 border border-stone-200">Complimentary</td>
                <td className="p-3 border border-stone-200">$35</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Demo Return Portal */}
      <div className="bg-[#FAF9F5] border border-stone-300 p-8 sm:p-10 space-y-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500 font-semibold">
            Automated Returns Portal
          </span>
          <h2 className="text-xl sm:text-2xl font-editorial font-medium text-stone-950 mt-1">
            Initiate a Complimentary Return or Exchange
          </h2>
          <p className="text-xs text-stone-600 font-light mt-1">
            Enter your order reference code (e.g. VERO-849102) to generate an insured prepaid return DHL air waybill.
          </p>
        </div>

        {returnSubmitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="text-sm uppercase tracking-wider font-semibold text-stone-900">
              Return Dossier Approved for {returnOrderNumber}
            </h4>
            <p className="text-xs text-stone-600 font-light max-w-sm mx-auto">
              A pre-paid electronic DHL shipping label has been dispatched. A courier pickup has been scheduled for tomorrow at your registered delivery address.
            </p>
            <button
              onClick={() => {
                setReturnSubmitted(false);
                setReturnOrderNumber('');
              }}
              className="mt-3 px-6 py-2 bg-stone-900 text-white text-xs uppercase tracking-widest font-medium"
            >
              Initiate Another Return
            </button>
          </div>
        ) : (
          <form onSubmit={handleReturnSubmit} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">
                Order Reference Number *
              </label>
              <input
                type="text"
                value={returnOrderNumber}
                onChange={(e) => setReturnOrderNumber(e.target.value)}
                placeholder="e.g. VERO-849102"
                className="w-full px-4 py-3 bg-white border border-stone-300 text-xs font-mono uppercase focus:border-stone-900 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">
                Reason for Return
              </label>
              <select
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-stone-300 text-xs focus:border-stone-900 focus:outline-none cursor-pointer"
              >
                <option value="Exchange for different size">Exchange for different size</option>
                <option value="Exchange for alternative piece">Exchange for alternative piece</option>
                <option value="Return for store privilege credit">Return for store privilege credit</option>
                <option value="Return for full refund to original payment">Return for full refund</option>
              </select>
            </div>

            <button
              type="submit"
              className="px-8 py-3.5 bg-stone-950 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Generate Prepaid Return Label
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
