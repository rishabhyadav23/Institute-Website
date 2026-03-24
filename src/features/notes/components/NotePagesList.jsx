import React from 'react';
import { Lock } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export const NotePagesList = ({ note }) => {
  // Mock pages array for visualization
  const pages = [1, 2, 3, 4, 5]; 

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 px-2 sm:px-8 pb-8 pt-4">
      {pages.map((page, index) => (
        <div key={page} className="relative group max-w-3xl mx-auto w-full">
          
          {/* Simulated Page Content */}
          <div className={`aspect-[1/1.4] bg-white text-black shadow-lg rounded-sm p-8 sm:p-12 text-[10px] sm:text-xs leading-relaxed overflow-hidden ${
             note.isPremium && index > 1 ? 'blur-sm select-none opacity-50' : ''
          }`}>
            <div className="w-1/3 h-5 bg-gray-800 mb-8"></div>
            <div className="space-y-4">
              <div className="w-full h-3 bg-gray-200"></div>
              <div className="w-full h-3 bg-gray-200"></div>
              <div className="w-3/4 h-3 bg-gray-200"></div>
              <div className="w-full h-3 bg-gray-200"></div>
            </div>
            <div className="mt-10 space-y-4">
              <div className="w-full h-3 bg-gray-200"></div>
              <div className="w-5/6 h-3 bg-gray-200"></div>
              <div className="w-full h-3 bg-gray-200"></div>
            </div>
            
            {/* Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 text-gray-100 text-4xl font-bold uppercase pointer-events-none select-none">
              A.I.S. Meerut
            </div>

            <div className="absolute bottom-6 right-6 text-gray-400 font-mono">
              Page {page}
            </div>
          </div>

          {/* LOCK OVERLAY (Premium Logic) */}
          {note.isPremium && index === 2 && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
               <div className="bg-gray-900/95 backdrop-blur-md text-white p-8 rounded-2xl text-center shadow-2xl border border-gray-700 max-w-sm mx-4 transform transition-all hover:scale-105">
                  <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-600/40">
                    <Lock size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Unlock Full Access</h3>
                  <p className="text-gray-300 text-sm mb-6">
                    This is a premium note. Unlock to read all {note.pages} pages.
                  </p>
                  <Button className="w-full shadow-brand-900/50">
                    Buy Now for ₹99
                  </Button>
               </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};