import React from 'react';
import { 
  Clock, HelpCircle, Trophy, Users, ChevronRight, AlertCircle, Lock 
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';

// 1. Accept 'onAction' prop here
export const TestCard = ({ test, onAction }) => {
  const isLive = test.type === 'live';
  const isPremium = test.isPremium;

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:border-brand-300 dark:hover:border-brand-700 transition-all duration-300 hover:shadow-xl hover:shadow-brand-900/5 relative overflow-hidden flex flex-col">
      
      {/* Live Badge Animation */}
      {isLive && !isPremium && (
        <div className="absolute top-0 right-0 p-4 z-10">
           <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
        </div>
      )}

      {/* Header Info */}
      <div className="flex justify-between items-start mb-4 pr-6">
        <div>
          <div className="flex gap-2 mb-2">
            {isPremium ? (
               <span className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 uppercase tracking-wide">
                 <Lock size={10} /> Premium
               </span>
            ) : isLive ? (
               <span className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 uppercase tracking-wide">
                 Live Now
               </span>
            ) : (
               <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 uppercase tracking-wide">
                 Free
               </span>
            )}

            {test.tags.map((tag, i) => (
              <span key={i} className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight group-hover:text-brand-600 transition-colors">
            {test.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
            {test.subject}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-gray-100 dark:border-gray-800 mb-4">
        <div className="text-center">
           <div className="flex items-center justify-center gap-1 text-gray-400 text-xs mb-1 font-medium uppercase">
             <HelpCircle size={12} /> Qs
           </div>
           <span className="font-bold text-gray-900 dark:text-white text-sm">{test.totalQuestions}</span>
        </div>
        <div className="text-center border-l border-r border-gray-100 dark:border-gray-800">
           <div className="flex items-center justify-center gap-1 text-gray-400 text-xs mb-1 font-medium uppercase">
             <Clock size={12} /> Mins
           </div>
           <span className="font-bold text-gray-900 dark:text-white text-sm">{test.duration}</span>
        </div>
        <div className="text-center">
           <div className="flex items-center justify-center gap-1 text-gray-400 text-xs mb-1 font-medium uppercase">
             <Trophy size={12} /> Marks
           </div>
           <span className="font-bold text-gray-900 dark:text-white text-sm">{test.totalMarks}</span>
        </div>
      </div>

      {/* Syllabus */}
      <div className="mb-6 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg flex items-start gap-2">
         <AlertCircle size={14} className="text-brand-500 mt-0.5 flex-shrink-0" />
         <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
           <span className="font-bold">Syllabus:</span> {test.syllabus}
         </p>
      </div>

      {/* Action Buttons - NOTE: calling onAction here */}
      <div className="flex items-center justify-between mt-auto gap-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
          <Users size={14} /> {test.studentsAttempted}
        </div>
        
        {isPremium ? (
          <Button 
            size="sm" 
            onClick={() => onAction(test, 'unlock')}
            className="flex-1 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 shadow-lg"
          >
            <Lock size={14} className="mr-2" /> Unlock
          </Button>
        ) : isLive ? (
          <Button 
            size="sm" 
            onClick={() => onAction(test, 'start')}
            className="flex-1 bg-red-600 hover:bg-red-700 shadow-red-500/20 text-white animate-pulse-slow"
          >
             Join Live
          </Button>
        ) : (
          <Button 
            size="sm" 
            onClick={() => onAction(test, 'start')}
            className="flex-1"
          >
            Start Now <ChevronRight size={16} className="ml-1" />
          </Button>
        )}
      </div>

    </div>
  );
};