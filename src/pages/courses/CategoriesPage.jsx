import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import Logic
import { useCategories } from '../../features/courses/hooks/useCategories';

// Import Components
import { CategoryHeader } from '../../features/courses/components/CategoryHeader';
import { CategoryFilters } from '../../features/courses/components/CategoryFilters';
import { CategoryCard } from '../../features/courses/components/CategoryCard';

export const CategoriesPage = () => {
  const navigate = useNavigate();
  
  // Custom Hook handles all state logic
  const { 
    activeFilter, 
    setActiveFilter, 
    search, 
    setSearch, 
    filteredCategories 
  } = useCategories();

  const handleCategoryClick = (filterKey) => {
    navigate('/courses', { state: { category: filterKey } });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-28 pb-20 relative">
      
      {/* 1. Header Section */}
      <CategoryHeader search={search} setSearch={setSearch} />

      {/* 2. Filters Section */}
      <CategoryFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      {/* 3. Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <CategoryCard 
              key={cat.id} 
              category={cat} 
              onClick={() => handleCategoryClick(cat.filterKey)} 
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
           <div className="text-center py-20 opacity-50">
             <p className="text-xl font-bold">No categories found matching "{search}"</p>
           </div>
        )}
      </div>
    </div>
  );
};