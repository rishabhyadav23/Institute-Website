import React from 'react';
import { FILTERS } from '../api/categoriesData';

export const CategoryFilters = ({ activeFilter, setActiveFilter }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 mb-10 overflow-x-auto no-scrollbar">
      <div className="flex justify-center min-w-max gap-3 pb-4">
        {FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
              activeFilter === f.id
                ? 'bg-gray-900 dark:bg-white text-white dark:text-black border-transparent scale-105'
                : 'bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
};