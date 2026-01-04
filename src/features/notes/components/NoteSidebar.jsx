import React from 'react';
import { 
  Star, FileText, Download, Lock, Share2, CheckCircle2 
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export const NoteSidebar = ({ note, activeTab, setActiveTab }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 sticky top-28 shadow-lg shadow-gray-200/50 dark:shadow-none">
      
      {/* Header Info */}
      <div className="mb-6 border-b border-gray-100 dark:border-gray-800 pb-6">
         <div className="flex gap-2 mb-3">
            <span className="bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-300 text-[10px] font-bold px-2 py-1 rounded uppercase">
              {note.subject}
            </span>
            <span className="flex items-center gap-1 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 text-[10px] font-bold px-2 py-1 rounded">
              <Star size={10} fill="currentColor"/> {note.rating}
            </span>
         </div>
         <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-snug mb-2">
           {note.title}
         </h1>
         <p className="text-sm text-gray-500 dark:text-gray-400">
           By <span className="font-semibold text-gray-900 dark:text-white">{note.author}</span>
         </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
           <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1"><FileText size={12}/> Pages</div>
           <div className="font-bold text-gray-900 dark:text-white">{note.pages}</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
           <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1"><Download size={12}/> Size</div>
           <div className="font-bold text-gray-900 dark:text-white">{note.size}</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 mb-8">
        {note.isPremium ? (
          <Button size="lg" className="w-full text-lg shadow-xl shadow-brand-900/20">
            <Lock size={18} className="mr-2" /> Unlock Now
          </Button>
        ) : (
          <Button size="lg" className="w-full text-lg shadow-xl shadow-brand-900/20 bg-green-600 hover:bg-green-700">
            <Download size={18} className="mr-2" /> Download Full PDF
          </Button>
        )}
        
        <Button 
          variant="secondary" 
          className="w-full border-gray-200 bg-white text-gray-700 hover:bg-gray-50 
                     dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          <Share2 size={18} className="mr-2" /> Share with Friends
        </Button>
      </div>

      {/* Tabs */}
      <div>
        <div className="flex border-b border-gray-100 dark:border-gray-800 mb-4">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`pb-2 text-sm font-bold px-4 transition-colors relative ${
              activeTab === 'overview' ? 'text-brand-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Overview
            {activeTab === 'overview' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-600 rounded-t-full"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('topics')}
            className={`pb-2 text-sm font-bold px-4 transition-colors relative ${
              activeTab === 'topics' ? 'text-brand-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Topics
            {activeTab === 'topics' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-600 rounded-t-full"></div>}
          </button>
        </div>

        <div className="min-h-[150px]">
          {activeTab === 'overview' && (
            <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed animate-in fade-in">
              {note.description}
            </div>
          )}
          {activeTab === 'topics' && (
            <ul className="space-y-2 animate-in fade-in">
              {note.topics.map((topic, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  {topic}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

    </div>
  );
};