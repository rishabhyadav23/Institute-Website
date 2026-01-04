import React from 'react';
import { Maximize2 } from 'lucide-react';
import { NotePagesList } from './NotePagesList';

export const NoteViewer = ({ note, onExpand }) => {
  return (
    <div className="bg-gray-200 dark:bg-gray-900 rounded-2xl p-2 sm:p-4 h-[80vh] flex flex-col border border-gray-300 dark:border-gray-800 shadow-inner relative">
      
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-4 px-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-2">
          {note.isPremium ? 'Premium Preview' : 'Free Access'}
        </span>
        <div className="flex gap-2">
          <button 
            onClick={onExpand} 
            className="p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400 transition-colors"
            title="Fullscreen"
          >
            <Maximize2 size={18} />
          </button>
        </div>
      </div>

      {/* Reused Page List */}
      <NotePagesList note={note} />

    </div>
  );
};