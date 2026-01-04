import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { COURSE_CATEGORIES } from '../api/coursesData';

export const CourseMobileFilters = ({ isOpen, setIsOpen, filters, clearFilters }) => {
  if (!isOpen) return null;

  const { category, setCategory } = filters;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
      <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-gray-900 p-6 shadow-2xl animate-in slide-in-from-right flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold font-heading text-gray-900 dark:text-white">Filter Courses</h2>
          <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <X size={24} className="text-gray-500" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-8 pr-2">
           <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {COURSE_CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setCategory(cat)}
                    className={`px-3 py-2 text-sm rounded-lg border ${category === cat ? 'bg-brand-600 text-white border-brand-600' : 'border-gray-300 text-gray-600'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
           </div>
           {/* Add Level filters here similarly if needed */}
        </div>

        <div className="pt-4 mt-auto border-t border-gray-100 dark:border-gray-800">
          <Button className="w-full" onClick={() => setIsOpen(false)}>
            Show Results
          </Button>
          <button onClick={clearFilters} className="w-full text-center text-red-500 text-sm font-bold mt-3">Reset All</button>
        </div>
      </div>
    </div>
  );
};