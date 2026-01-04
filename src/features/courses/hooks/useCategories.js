import { useState, useMemo } from 'react';
import { CATEGORIES } from '../api/categoriesData';

export const useCategories = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredCategories = useMemo(() => {
    return CATEGORIES.filter(c => {
      return (activeFilter === 'all' || c.group === activeFilter) &&
             c.title.toLowerCase().includes(search.toLowerCase());
    });
  }, [activeFilter, search]);

  return {
    activeFilter,
    setActiveFilter,
    search,
    setSearch,
    filteredCategories
  };
};