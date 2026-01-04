import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { COURSE_CATEGORIES, COURSE_LEVELS } from '../api/coursesData';

export const CourseSidebar = ({ filters, clearFilters }) => {
  const { category, setCategory, level, setLevel } = filters;

  return (
    <aside className="hidden lg:block w-72 flex-shrink-0">
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 sticky top-28 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
           <div className="flex items-center gap-2 text-brand-700 dark:text-brand-400 font-bold text-lg">
              <SlidersHorizontal size={20} /> Filters
           </div>
        </div>
        
        <div className="p-6 space-y-8">
          {/* Category Filter */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Category</h3>
            <div className="space-y-3">
              {COURSE_CATEGORIES.map(cat => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group select-none">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 ${
                    category === cat 
                      ? 'bg-brand-600 border-brand-600 shadow-md shadow-brand-500/30' 
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 group-hover:border-brand-400'
                  }`}>
                    {category === cat && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <input 
                    type="radio" 
                    name="category" 
                    className="hidden"
                    checked={category === cat}
                    onChange={() => setCategory(cat)}
                  />
                  <span className={`text-sm font-medium transition-colors ${
                    category === cat 
                      ? 'text-brand-700 dark:text-white font-bold' 
                      : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200'
                  }`}>
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Level Filter */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Difficulty</h3>
            <div className="space-y-3">
              {COURSE_LEVELS.map(lvl => (
                <label key={lvl} className="flex items-center gap-3 cursor-pointer group select-none">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 ${
                    level === lvl 
                      ? 'bg-brand-600 border-brand-600 shadow-md shadow-brand-500/30' 
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 group-hover:border-brand-400'
                  }`}>
                    {level === lvl && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <input 
                    type="radio" 
                    name="level" 
                    className="hidden"
                    checked={level === lvl}
                    onChange={() => setLevel(lvl)}
                  />
                  <span className={`text-sm font-medium transition-colors ${
                    level === lvl 
                      ? 'text-brand-700 dark:text-white font-bold' 
                      : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200'
                  }`}>
                    {lvl}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        {/* Reset Button */}
        {(category !== 'All' || level !== 'All') && (
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
            <button 
              onClick={clearFilters}
              className="w-full py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2
              bg-white text-red-600 border border-red-100 hover:bg-red-50 
              dark:bg-gray-800 dark:text-red-400 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <X size={16} /> Reset Filters
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};