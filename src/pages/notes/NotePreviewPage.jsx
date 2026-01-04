import React from 'react';
import { ChevronLeft } from 'lucide-react';

// Logic
import { useNotePreview } from '../../features/notes/hooks/useNotePreview';

// Components
import { NoteViewer } from '../../features/notes/components/NoteViewer';
import { NoteSidebar } from '../../features/notes/components/NoteSidebar';
import { NoteFullscreenModal } from '../../features/notes/components/NoteFullscreenModal';

export const NotePreviewPage = () => {
  // Use Custom Hook
  const { 
    note, 
    activeTab, 
    setActiveTab, 
    isExpanded, 
    setIsExpanded, 
    navigate 
  } = useNotePreview();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-12">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          <ChevronLeft size={16} className="mr-1" /> Back to Library
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 1. Left: Document Viewer */}
          <div className="lg:col-span-8">
            <NoteViewer 
              note={note} 
              onExpand={() => setIsExpanded(true)} 
            />
          </div>

          {/* 2. Right: Details & Sidebar */}
          <div className="lg:col-span-4">
            <NoteSidebar 
              note={note} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
            />
          </div>

        </div>
      </div>

      {/* 3. Fullscreen Overlay */}
      <NoteFullscreenModal 
        note={note} 
        isOpen={isExpanded} 
        onClose={() => setIsExpanded(false)} 
      />

    </div>
  );
};