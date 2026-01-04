import React from 'react';
import { Search, PenLine } from 'lucide-react';
import { TEST_TABS } from '../api/testsData';

export const TestsHeader = ({ activeTab, setActiveTab, searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-8">
      {/* Title & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider mb-4 border border-brand-100 dark:border-brand-800">
             <PenLine size={14} /> Exam Arena
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-gray-900 dark:text-white">
            Test <span className="text-brand-600">Series</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-lg">
            Compete with thousands of students in real-time or practice with previous year papers.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search tests..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500/50 outline-none"
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2">
        {TEST_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
              activeTab === tab.id
                ? 'bg-gray-900 dark:bg-white text-white dark:text-black border-transparent shadow-lg'
                : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};