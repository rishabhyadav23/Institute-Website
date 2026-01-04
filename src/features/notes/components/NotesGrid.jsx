import React from 'react';
import { FileText } from 'lucide-react';
import { NoteCard } from './NoteCard';

export const NotesGrid = ({ notes }) => {
  if (notes.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
        <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
          <FileText size={32} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">No notes found</h3>
        <p className="text-gray-500">Try searching for a different topic.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
};