import React from 'react';
import { Search, Filter, ArrowUpDown, ChevronDown } from 'lucide-react';

export const CourseSearchSort = ({ filters, onMobileFilterClick }) => {
  const { search, setSearch, sort, setSort } = filters;

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 sticky top-[80px] z-30 lg:static">
      
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Search courses, mentors..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none shadow-sm transition-shadow hover:shadow-md"
        />
      </div>
      
      {/* Mobile Filter Button */}
      <button 
        onClick={onMobileFilterClick}
        className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-bold text-gray-700 dark:text-gray-300 shadow-sm"
      >
        <Filter size={20} />
      </button>

      {/* Sort Dropdown */}
      <div className="relative group min-w-[180px]">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
          <ArrowUpDown size={16} />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full appearance-none pl-10 pr-8 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-medium text-gray-700 dark:text-gray-200 cursor-pointer focus:ring-2 focus:ring-brand-500/50 outline-none shadow-sm hover:border-brand-300"
        >
          <option value="popularity">Most Popular</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
          <ChevronDown size={16} />
        </div>
      </div>

    </div>
  );
};