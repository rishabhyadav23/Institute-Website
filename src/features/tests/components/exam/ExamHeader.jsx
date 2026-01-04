import React from 'react';
import { Clock, Menu } from 'lucide-react';

export const ExamHeader = ({ timeLeft, title, onToggleSidebar }) => {
  return (
    // Removed: fixed top-0 left-0 right-0 (Ab parent flexbox ise handle karega)
    <div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4">
      
      <div className="flex items-center gap-3">
        <h1 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Timer Badge */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg text-gray-900 dark:text-white font-mono font-bold">
          <Clock size={16} className="text-brand-600 animate-pulse" />
          {timeLeft}
        </div>
        
        {/* Mobile Sidebar Toggle */}
        <button 
          onClick={onToggleSidebar} 
          className="lg:hidden p-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
        >
          <Menu size={20} className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
};