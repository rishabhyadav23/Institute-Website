import React from 'react';

export const AuthHeader = ({ title, subtitle, icon }) => {
  return (
    <div className="bg-gradient-to-r from-brand-900 to-brand-800 p-8 text-center relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      
      <div className="relative z-10">
        {/* Render Icon only if passed (Used in Login) */}
        {icon && (
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/20 shadow-inner">
             {icon}
          </div>
        )}

        <h2 className="text-3xl font-heading font-bold text-white mb-2 flex items-center justify-center gap-2">
          {title}
        </h2>
        
        <p className="text-brand-100 font-medium text-sm">
          {subtitle}
        </p>
      </div>
    </div>
  );
};