import React from 'react';
import { BookOpen, Search } from 'lucide-react';

export const NotesHeader = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider mb-4 border border-brand-100 dark:border-brand-800">
           <BookOpen size={14} /> Digital Library
        </div>
        <h1 className="text-4xl font-heading font-extrabold text-gray-900 dark:text-white mb-3">
          Study <span className="text-brand-600">Material</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl">
          Access premium handwritten notes, mind maps, and previous year questions. 
          Curated by toppers for your success.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative w-full md:w-96">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl leading-5 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all shadow-sm text-gray-900 dark:text-white"
          placeholder="Search topics (e.g. History, React)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};