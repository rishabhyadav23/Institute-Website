import React from 'react';

// Logic
import { useNotes } from '../../features/notes/hooks/useNotes';

// Components
import { NotesHeader } from '../../features/notes/components/NotesHeader';
import { NotesFilters } from '../../features/notes/components/NotesFilters';
import { NotesGrid } from '../../features/notes/components/NotesGrid';

export const NotesPage = () => {
  // Use Custom Hook
  const { 
    activeFilter, 
    setActiveFilter, 
    searchQuery, 
    setSearchQuery, 
    filteredNotes 
  } = useNotes();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Header & Search */}
        <NotesHeader 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />

        {/* 2. Filters */}
        <NotesFilters 
          activeFilter={activeFilter} 
          setActiveFilter={setActiveFilter} 
        />

        {/* 3. Grid */}
        <NotesGrid 
          notes={filteredNotes} 
        />

      </div>
    </div>
  );
};