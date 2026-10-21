import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface NewsletterFormProps {
  layout?: 'stacked' | 'inline';
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({ layout = 'inline' }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Please provide an email address.');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 600);
  };

  if (status === 'success') {
    return (
      <div className="bg-[#F0EBE1] p-5 border border-[#DFD7C7] text-stone-900 transition-all">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest font-semibold">Welcome to the VÉRO Circle</p>
            <p className="text-xs text-stone-600 mt-0.5">
              Your 10% welcome privilege code is <strong className="text-stone-900">VERO10</strong>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`flex ${layout === 'stacked' ? 'flex-col gap-3' : 'flex-col sm:flex-row gap-2'}`}>
        <div className="relative flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            placeholder="Enter your email address"
            className="w-full px-4 py-3.5 bg-white border border-stone-300 focus:border-stone-900 focus:outline-none text-xs tracking-wider placeholder:text-stone-400 text-stone-900 transition-colors"
            disabled={status === 'loading'}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-7 py-3.5 bg-stone-900 text-white text-xs uppercase tracking-widest font-medium hover:bg-stone-800 active:bg-black transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-50"
        >
          {status === 'loading' ? (
            'Subscribing...'
          ) : (
            <>
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      {status === 'error' && errorMessage && (
        <p className="text-[11px] text-rose-600 mt-2 tracking-wide">{errorMessage}</p>
      )}

      <p className="text-[10px] text-stone-500 mt-2.5 tracking-wider">
        By subscribing, you agree to receive communications from VÉRO. You may unsubscribe at any time.
      </p>
    </form>
  );
};
