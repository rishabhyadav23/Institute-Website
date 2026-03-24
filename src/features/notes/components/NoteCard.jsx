import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, Download, Eye, Lock, PenTool, Sparkles, FileDigit, Star, Clock 
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export const NoteCard = ({ note }) => {
  const navigate = useNavigate();

  const handlePreview = () => {
    navigate(`/notes/${note.id}`, { state: { note } });
  };

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-xl hover:border-brand-200 dark:hover:border-brand-900/30 transition-all duration-300 relative overflow-hidden flex flex-col">
      
      {/* Top Badge Row */}
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${note.color}`}>
          {note.type === 'Handwritten' && <PenTool size={24} />}
          {note.type === 'Mind Map' && <Sparkles size={24} />}
          {note.type === 'PDF Guide' && <FileText size={24} />}
          {note.type === 'PYQ' && <Clock size={24} />}
        </div>
        
        <div className="flex gap-2">
           {note.isPremium ? (
             <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
               <Lock size={10} /> PREMIUM
             </span>
           ) : (
             <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded">
               FREE
             </span>
           )}
        </div>
      </div>

      {/* Content */}
      <div className="mb-4 flex-1">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-2 group-hover:text-brand-700 transition-colors line-clamp-2">
          {note.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
           <span className="font-medium text-gray-700 dark:text-gray-300">{note.subject}</span>
           <span>•</span>
           <span>{note.author}</span>
        </p>
      </div>

      {/* Metadata Strip */}
      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-6 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg">
        <div className="flex items-center gap-1">
          <FileDigit size={14} /> {note.pages} Pages
        </div>
        <div className="flex items-center gap-1">
          <Download size={14} /> {note.size}
        </div>
        <div className="flex items-center gap-1 ml-auto text-yellow-500 font-bold">
          <Star size={12} fill="currentColor" /> {note.rating}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-auto relative z-10">
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={handlePreview}
          className="flex-1 border-gray-200 bg-white text-gray-700 hover:bg-gray-50 
                     dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <Eye size={16} className="mr-2" /> Preview
        </Button>
        
        <Button
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            if (note.isPremium) {
              handlePreview();
            } else if (note.fileUrl) {
              const link = document.createElement('a');
              link.href = note.fileUrl;
              link.download = `${note.title}.pdf`;
              link.click();
            } else {
              handlePreview();
            }
          }}
          className={`flex-1 shadow-lg ${
            note.isPremium
              ? 'bg-brand-900 hover:bg-brand-800 shadow-brand-900/20'
              : 'bg-brand-600 hover:bg-brand-700 shadow-brand-600/20'
          }`}
        >
          {note.isPremium ? <Lock size={16} className="mr-2"/> : <Download size={16} className="mr-2"/>}
          {note.isPremium ? 'Unlock' : 'Download'}
        </Button>
      </div>
    </div>
  );
};