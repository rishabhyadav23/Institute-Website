import { useState, useMemo } from 'react';
import { TESTS_DATA, USER_STATS } from '../api/testsData';

export const useTests = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTests = useMemo(() => {
    return TESTS_DATA.filter(test => {
      // 1. Filter by Tab
      const matchesTab = activeTab === 'all' || test.type === activeTab;
      
      // 2. Filter by Search
      const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            test.subject.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    filteredTests,
    userStats: USER_STATS
  };
};