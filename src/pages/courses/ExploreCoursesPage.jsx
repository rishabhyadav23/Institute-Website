import React from 'react';

// Logic
import { useCourses } from '../../features/courses/hooks/useExploreCourses.js';

// Components
import { CourseSidebar } from '../../features/courses/components/CourseSidebar.jsx';
import { CourseSearchSort } from '../../features/courses/components/CourseSearchSort.jsx';
import { CourseGrid } from '../../features/courses/components/CourseGrid.jsx';
import { CourseMobileFilters } from '../../features/courses/components/CourseMobileFilters.jsx';

export const ExploreCoursesPage = () => {
  // Use Custom Hook
  const { 
    filters, 
    mobileMenu, 
    courses, 
    clearFilters 
  } = useCourses();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-28 pb-20">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">
          Explore <span className="text-brand-600">Courses</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
           {filters.category !== 'All' 
             ? `Showing results for ${filters.category}` 
             : "Discover top-rated courses for every step of your career."}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar (Desktop) */}
        <CourseSidebar filters={filters} clearFilters={clearFilters} />

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Top Bar */}
          <CourseSearchSort 
            filters={filters} 
            onMobileFilterClick={() => mobileMenu.setIsOpen(true)} 
          />

          {/* Course Grid */}
          <CourseGrid 
            courses={courses} 
            clearFilters={clearFilters} 
          />
        </div>
      </div>

      {/* Mobile Drawer */}
      <CourseMobileFilters 
        isOpen={mobileMenu.isOpen} 
        setIsOpen={mobileMenu.setIsOpen} 
        filters={filters} 
        clearFilters={clearFilters} 
      />

    </div>
  );
};