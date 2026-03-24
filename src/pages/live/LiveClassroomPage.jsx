import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, FileText } from 'lucide-react';
import { CustomVideoPlayer } from '../../features/live/components/player/CustomVideoPlayer';
import { LiveChat } from '../../features/live/components/chat/LiveChat';

export const LiveClassroomPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const session = location.state?.session;
  
  const [activeTab, setActiveTab] = useState('chat');
  const [isChatOpen, setIsChatOpen] = useState(true);

  // Fallback if accessed directly without navigation state
  if (!session) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-white text-xl font-bold mb-2">Session not found</p>
          <p className="text-gray-400 text-sm mb-6">Please navigate from the Live Classes page to join a session.</p>
          <button
            onClick={() => navigate('/live')}
            className="bg-brand-900 hover:bg-brand-800 text-white px-6 py-3 rounded-xl font-bold transition-colors"
          >
            Go to Live Classes
          </button>
        </div>
      </div>
    );
  }

  return (
    // Distraction Free Layout (No Navbar/Footer)
    <div className="flex flex-col h-screen bg-gray-950 text-white overflow-hidden">
      
      {/* Top Bar */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800 bg-gray-900 z-20">
         <div className="flex items-center gap-4">
            <button onClick={() => navigate('/live')} className="p-2 hover:bg-gray-800 rounded-lg">
               <ChevronLeft size={20} />
            </button>
            <div>
               <h1 className="font-bold text-sm md:text-base line-clamp-1">{session.title}</h1>
               <span className="text-xs text-gray-400">{session.tutor} • {session.subject}</span>
            </div>
         </div>
         <div className="flex items-center gap-2">
            <button className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-brand-600 hover:bg-brand-700 rounded-lg text-xs font-bold transition-colors">
               <FileText size={14} /> Notes
            </button>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left: Video Player */}
        <div className={`flex-1 flex flex-col bg-black relative transition-all duration-300 ${isChatOpen ? 'mr-0' : 'mr-0'}`}>
           
           <div className="flex-1 flex items-center justify-center bg-black">
              <CustomVideoPlayer 
                url={session.videoUrl || "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"} 
                title={session.title}
                isLive={session.status === 'live'}
                toggleChat={() => setIsChatOpen(!isChatOpen)}
              />
           </div>

           {/* Mobile Tabs (Only visible on small screens) */}
           <div className="h-12 border-t border-gray-800 bg-gray-900 lg:hidden flex">
              <button 
                onClick={() => { setActiveTab('chat'); setIsChatOpen(true); }}
                className={`flex-1 flex items-center justify-center gap-2 text-xs font-bold ${activeTab === 'chat' ? 'text-brand-500 bg-gray-800' : 'text-gray-400'}`}
              >
                Chat
              </button>
              <button 
                onClick={() => { setActiveTab('doubts'); setIsChatOpen(true); }}
                className={`flex-1 flex items-center justify-center gap-2 text-xs font-bold ${activeTab === 'doubts' ? 'text-brand-500 bg-gray-800' : 'text-gray-400'}`}
              >
                Doubts
              </button>
           </div>
        </div>

        {/* Right: Sidebar (Chat/Doubts) */}
        <div className={`${isChatOpen ? 'w-full lg:w-96 translate-x-0' : 'w-0 translate-x-full lg:translate-x-0 lg:w-0'} fixed lg:relative inset-y-0 right-0 z-30 transition-all duration-300 ease-in-out border-l border-gray-800 bg-gray-900`}>
           {isChatOpen && <LiveChat onClose={() => setIsChatOpen(false)} />}
        </div>

      </div>

    </div>
  );
};