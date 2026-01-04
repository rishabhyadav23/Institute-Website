import React from 'react';
import { Search, Sparkles } from 'lucide-react';

export const CategoryHeader = ({ search, setSearch }) => {
  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-200 dark:border-brand-900 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in">
          <Sparkles size={14} className="text-yellow-500" /> Explore 50+ Career Paths
        </div>
        
        <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
          Find the path to your <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-orange-500">Dream Career</span>
        </h1>

        {/* Floating Search Bar */}
        <div className="relative max-w-2xl mx-auto mt-8 z-20">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search 'UPSC', 'Python', 'NEET'..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-12 pr-4 py-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-lg shadow-2xl shadow-brand-900/10 focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all dark:text-white"
          />
        </div>
      </div>
    </div>
  );
};