import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ALL_COURSES } from '../api/coursesData';

export const useCourses = () => {
  const location = useLocation();

  // State
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState(ALL_COURSES);

  // Initialize Category from Navigation State
  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
    }
  }, [location.state]);

  // Main Filtering Logic
  useEffect(() => {
    let result = [...ALL_COURSES];

    if (selectedCategory !== 'All') {
      result = result.filter(c => c.category === selectedCategory);
    }
    
    if (selectedLevel !== 'All') {
      result = result.filter(c => c.level === selectedLevel);
    }
    
    if (searchQuery) {
      result = result.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popularity') {
      result.sort((a, b) => b.students - a.students);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredCourses(result);
  }, [selectedCategory, selectedLevel, searchQuery, sortBy]);

  const clearFilters = () => {
    setSearchQuery(''); 
    setSelectedCategory('All'); 
    setSelectedLevel('All');
    setSortBy('popularity');
  };

  return {
    filters: {
      category: selectedCategory,
      setCategory: setSelectedCategory,
      level: selectedLevel,
      setLevel: setSelectedLevel,
      search: searchQuery,
      setSearch: setSearchQuery,
      sort: sortBy,
      setSort: setSortBy
    },
    mobileMenu: {
      isOpen: isMobileFilterOpen,
      setIsOpen: setIsMobileFilterOpen
    },
    courses: filteredCourses,
    clearFilters
  };
};