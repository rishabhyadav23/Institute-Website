import React from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export const TestPurchaseModal = ({ isOpen, onClose, test }) => {
  if (!isOpen || !test) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header with Image or Gradient */}
        <div className="h-32 bg-gradient-to-r from-brand-900 to-brand-700 relative p-6 flex flex-col justify-end">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
          >
            <X size={20} />
          </button>
          <h2 className="text-white font-bold text-xl line-clamp-1">{test.title}</h2>
          <p className="text-brand-100 text-sm">Unlock complete test analysis</p>
        </div>

        <div className="p-6">
          {/* Price Tag */}
          <div className="flex items-end gap-2 mb-6">
             <span className="text-4xl font-extrabold text-gray-900 dark:text-white">₹99</span>
             <span className="text-gray-400 line-through mb-1">₹499</span>
             <span className="text-green-600 font-bold text-sm mb-1 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">80% OFF</span>
          </div>

          {/* Benefits */}
          <div className="space-y-3 mb-8">
            <FeatureItem text="Detailed Solutions & Explanations" />
            <FeatureItem text="All India Rank & Percentile" />
            <FeatureItem text="Weak Area Analysis" />
          </div>

          {/* Buttons */}
          <Button className="w-full py-4 text-lg shadow-brand-500/25 mb-3">
             <CreditCard size={20} className="mr-2" /> Pay & Unlock Now
          </Button>
          
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
             <ShieldCheck size={14} className="text-green-600" /> Secure Payment 
          </div>
        </div>

      </div>
    </div>
  );
};

const FeatureItem = ({ text }) => (
  <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
    <CheckCircle2 size={18} className="text-brand-600 flex-shrink-0" />
    {text}
  </div>
);