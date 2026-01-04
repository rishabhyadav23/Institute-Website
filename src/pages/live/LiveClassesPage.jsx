import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Airplay } from 'lucide-react';
import { LIVE_CLASSES, LIVE_TABS } from '../../features/live/api/liveData';
import { LiveClassCard } from '../../features/live/components/LiveClassCard';

export const LiveClassesPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('live');
  const [search, setSearch] = useState('');

  // Filtering Logic
  const filteredClasses = LIVE_CLASSES.filter(cls => {
    const matchesTab = activeTab === 'all' 
       ? true 
       : activeTab === 'upcoming' 
         ? cls.status === 'upcoming'
         : activeTab === 'recorded'
           ? cls.status === 'ended'
           : cls.status === 'live';
    
    const matchesSearch = cls.title.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleJoin = (session) => {
    // Navigate to streaming page with data
    navigate(`/live/${session.id}`, { state: { session } });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider mb-4 border border-red-100 dark:border-red-800">
               <Airplay size={14} /> Interactive Learning
            </div>
            <h1 className="text-4xl font-heading font-extrabold text-gray-900 dark:text-white mb-3">
              Live <span className="text-brand-600">Classroom</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl">
              Join interactive sessions with top educators. Ask doubts, participate in polls, and learn in real-time.
            </p>
          </div>
          
          {/* Search */}
          <div className="relative w-full md:w-80">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
             <input 
               type="text" 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               placeholder="Find your class..." 
               className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500/50 outline-none"
             />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200 dark:border-gray-800 mb-8">
          {LIVE_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-2 text-sm font-bold transition-all relative ${
                activeTab === tab.id 
                  ? 'text-brand-600 dark:text-white' 
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-600 rounded-t-full"></div>}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
           {filteredClasses.length > 0 ? filteredClasses.map(session => (
             <LiveClassCard key={session.id} session={session} onJoin={handleJoin} />
           )) : (
             <div className="col-span-full text-center py-20 text-gray-500">
               No classes found in this category.
             </div>
           )}
        </div>

      </div>
    </div>
  );
};