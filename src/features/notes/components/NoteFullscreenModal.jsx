import React from 'react';
import { Minimize2, Lock, Download } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { NotePagesList } from './NotePagesList';

export const NoteFullscreenModal = ({ note, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col animate-in fade-in duration-200 
      bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm"
    >
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b 
        bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
      >
         <div className="text-gray-900 dark:text-white">
            <h3 className="font-bold text-lg">{note.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Fullscreen Reader Mode</p>
         </div>
         
         <div className="flex gap-4">
           {/* Quick Download Button */}
           <Button size="sm" className="hidden sm:flex shadow-none">
             {note.isPremium ? <Lock size={14} className="mr-2"/> : <Download size={14} className="mr-2"/>}
             {note.isPremium ? 'Unlock' : 'Download'}
           </Button>
           
           {/* Close Button (Theme Aware) */}
           <button 
             onClick={onClose} 
             className="p-2 rounded-full transition-colors 
               bg-gray-100 hover:bg-gray-200 text-gray-700 
               dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
           >
             <Minimize2 size={24} />
           </button>
         </div>
      </div>

      {/* Fullscreen Content Area */}
      {/* Light Mode: Light Gray Background | Dark Mode: Very Dark Background */}
      <div className="flex-1 overflow-hidden flex justify-center 
        bg-gray-100 dark:bg-gray-950/50"
      >
         <div className="w-full max-w-5xl h-full flex flex-col">
           <NotePagesList note={note} />
         </div>
      </div>
    </div>
  );
};