import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const CategoryCard = ({ category, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
    >
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0">
        <img 
          src={category.image} 
          alt={category.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        {/* Dark Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-900/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
      </div>

      {/* Tag */}
      <div className="absolute top-4 left-4 z-20">
        <span className="bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
          {category.tag}
        </span>
      </div>

      {/* Content Sitting at Bottom */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex items-center gap-3 mb-2 text-brand-200">
          {React.cloneElement(category.icon, { size: 20 })}
          <span className="text-sm font-medium uppercase tracking-wider text-white/80">{category.courses} Batches</span>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-brand-100 transition-colors">
          {category.title}
        </h3>
        
        <p className="text-white/70 text-sm mb-4 line-clamp-2">
          {category.desc}
        </p>

        {/* Explore Button */}
        <div className="flex items-center text-white font-bold text-sm gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
          Explore Courses <ArrowUpRight size={16} />
        </div>
      </div>
    </div>
  );
};