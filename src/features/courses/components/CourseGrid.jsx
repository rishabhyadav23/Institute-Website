import React from 'react';
import { AlertCircle } from 'lucide-react';
import { CourseCard } from './CourseCard'; // Assuming you have this from previous steps
import { Button } from '../../../components/ui/Button';

export const CourseGrid = ({ courses, clearFilters }) => {
  return (
    <>
      <div className="mb-4">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Found <span className="font-bold text-gray-900 dark:text-white">{courses.length}</span> courses
        </p>
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        // EMPTY STATE
        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
            <AlertCircle size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">No matches found</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            We couldn't find any courses matching your filters. Try removing some filters.
          </p>
          <Button variant="secondary" onClick={clearFilters} className="mx-auto">
            Clear All Filters
          </Button>
        </div>
      )}
    </>
  );
};