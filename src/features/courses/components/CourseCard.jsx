import React from 'react';
import { Star, Clock } from 'lucide-react';
// Note: Path ../../../ components tak wapas jane ke liye hai
import { Button } from '../../../components/ui/Button'; 
import { useNavigate } from 'react-router-dom';

export const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden relative">
      
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden border-b border-gray-100 dark:border-gray-800">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
        {course.tag && (
          <span className="absolute top-3 left-3 z-20 bg-brand-600 text-white text-[10px] font-extrabold px-3 py-1 uppercase tracking-wider rounded-md shadow-lg">
            {course.tag}
          </span>
        )}
        <span className="absolute bottom-3 right-3 text-white text-xs font-bold bg-black/50 px-2 py-1 rounded backdrop-blur-sm flex items-center gap-1">
           <Clock size={12}/> {course.duration}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-brand-700 bg-red-50 dark:bg-red-900/20 dark:text-red-300 px-2 py-1 rounded border border-red-100 dark:border-red-900/30">
             {course.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
             <Star size={12} className="text-yellow-500 fill-current"/> 
             <span>{course.rating}</span>
          </div>
        </div>

        <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight group-hover:text-brand-700 transition-colors">
          {course.title}
        </h3>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
          Complete syllabus coverage with mock tests and live doubts.
        </p>
        
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-gray-900 dark:text-white">₹{course.price}</span>
              <span className="text-xs text-gray-400 line-through">₹{course.originalPrice}</span>
            </div>
          </div>
          <Button size="sm" onClick={() => navigate(`/course/${course.id}`)} className="shadow-none">
            Enroll
          </Button>
        </div>
      </div>
    </div>
  );
};