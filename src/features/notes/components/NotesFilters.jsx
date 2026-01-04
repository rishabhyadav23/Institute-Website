import React from 'react';
import { NOTE_FILTERS } from '../api/notesData';

export const NotesFilters = ({ activeFilter, setActiveFilter }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-12">
      {NOTE_FILTERS.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`px-5 py-2 rounded-lg text-sm font-bold transition-all border ${
            activeFilter === filter
              ? 'bg-brand-900 text-white border-brand-900 shadow-md shadow-brand-900/20'
              : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};