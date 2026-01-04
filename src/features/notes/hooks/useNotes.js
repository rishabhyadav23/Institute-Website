import { useState, useMemo } from 'react';
import { NOTES_DATA } from '../api/notesData';

export const useNotes = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = useMemo(() => {
    return NOTES_DATA.filter(note => {
      const matchesCategory = activeFilter === 'All' 
        ? true 
        : activeFilter === 'Premium' 
          ? note.isPremium 
          : note.category === activeFilter;
      
      const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            note.subject.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return {
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    filteredNotes
  };
};