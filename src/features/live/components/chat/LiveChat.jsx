import React, { useState } from 'react';
import { Send, Heart, X } from 'lucide-react';
import { MOCK_CHAT } from '../../api/liveData';

export const LiveChat = ({ onClose }) => {
  const [messages, setMessages] = useState(MOCK_CHAT);
  const [inputText, setInputText] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(142);

  const handleSend = (e) => {
    e.preventDefault();
    if(!inputText.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      user: "You",
      message: inputText,
      time: "Now",
      isMe: true
    };
    setMessages([...messages, newMsg]);
    setInputText("");
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800">
      
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
         <h3 className="font-bold text-gray-900 dark:text-white">Top Chat</h3>
         <button onClick={onClose} className="lg:hidden p-1 hover:bg-gray-200 rounded">
            <X size={20} />
         </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
         {messages.map((msg) => (
           <div key={msg.id} className={`flex gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                msg.isAdmin ? 'bg-brand-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}>
                {msg.user[0]}
              </div>

              {/* Bubble */}
              <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                 msg.isMe 
                   ? 'bg-brand-600 text-white rounded-tr-none' 
                   : msg.isAdmin 
                     ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 text-yellow-800 dark:text-yellow-200'
                     : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none'
              }`}>
                 <div className="flex items-center gap-2 mb-1">
                   <span className="font-bold text-xs opacity-90">{msg.user}</span>
                   {msg.isAdmin && <span className="bg-yellow-500 text-white text-[10px] px-1 rounded">MOD</span>}
                   <span className="text-[10px] opacity-60 ml-auto">{msg.time}</span>
                 </div>
                 <p className="leading-relaxed">{msg.message}</p>
              </div>
           </div>
         ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <form onSubmit={handleSend} className="relative">
          <input 
             type="text" 
             value={inputText}
             onChange={(e) => setInputText(e.target.value)}
             placeholder="Chat publicly..."
             className="w-full pl-4 pr-12 py-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-brand-500 outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
             <button
               type="button"
               onClick={() => {
                 setLiked(!liked);
                 setLikeCount(prev => liked ? prev - 1 : prev + 1);
               }}
               className={`p-2 rounded-full transition-all duration-300 flex items-center gap-1 ${
                 liked
                   ? 'text-red-500 bg-red-50 dark:bg-red-900/20 scale-110'
                   : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
               }`}
             >
               <Heart size={18} className={liked ? 'fill-current' : ''} />
               <span className="text-[10px] font-bold">{likeCount}</span>
             </button>
             <button type="submit" className="p-2 text-brand-600 hover:bg-brand-50 rounded-full transition-colors">
               <Send size={18} />
             </button>
          </div>
        </form>
      </div>

    </div>
  );
};