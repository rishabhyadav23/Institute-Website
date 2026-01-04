import React from 'react';
import { Play, Calendar, Users, Clock } from 'lucide-react';

export const LiveClassCard = ({ session, onJoin }) => {
  const isLive = session.status === 'live';

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:border-brand-300 dark:hover:border-brand-700 transition-all duration-300 flex flex-col h-full">
      
      {/* Thumbnail Area */}
      <div className="relative aspect-video bg-gray-900 overflow-hidden">
        <img 
          src={session.thumbnail} 
          alt={session.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
        />
        
        {/* Live Badge */}
        {isLive && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1.5 animate-pulse">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span> LIVE
          </div>
        )}

        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
          <button 
            onClick={() => onJoin(session)}
            className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/50 hover:scale-110 transition-transform"
          >
            <Play fill="currentColor" size={20} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Info Area */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
           <span className="text-xs font-bold text-brand-600 bg-brand-50 dark:bg-brand-900/20 px-2 py-1 rounded uppercase">
             {session.subject}
           </span>
           {isLive && (
             <span className="text-xs text-red-500 font-bold flex items-center gap-1">
               <Users size={12} /> {session.viewers} watching
             </span>
           )}
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
          {session.title}
        </h3>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          by <span className="font-semibold text-gray-800 dark:text-gray-200">{session.tutor}</span>
        </p>

        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500">
           <span className="flex items-center gap-1">
             <Calendar size={14} /> {session.status === 'upcoming' ? 'Starts:' : 'Started:'}
           </span>
           <span className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
             <Clock size={14} /> {session.time}
           </span>
        </div>
      </div>
    </div>
  );
};