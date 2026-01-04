import React from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Minimize, Settings, 
  SkipForward, MessageSquare, Captions 
} from 'lucide-react';
import { useLivePlayer } from '../../hooks/useLivePlayer';

export const CustomVideoPlayer = ({ url, title, isLive, toggleChat }) => {
  const { videoRef, containerRef, state, actions } = useLivePlayer();
  const { isPlaying, volume, isMuted, currentTime, duration, isFullscreen, showControls } = state;
  const { togglePlay, handleVolumeChange, toggleMute, toggleFullscreen, handleTimeUpdate, handleSeek } = actions;

  // Format Time Helper
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full aspect-video bg-black group overflow-hidden shadow-2xl"
    >
      <video
        ref={videoRef}
        src={url}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay}
      />

      {/* --- OVERLAY CONTROLS (Hotstar Style) --- */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 transition-opacity duration-300 flex flex-col justify-end px-4 pb-4 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        
        {/* Top Header inside video */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
           <div>
              <h2 className="text-white font-bold text-lg drop-shadow-md">{title}</h2>
              {isLive && <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">Live</span>}
           </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full mb-4 group/slider">
          <input 
            type="range" 
            min="0" 
            max={duration || 100} 
            value={currentTime} 
            onChange={handleSeek}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-brand-500 hover:h-1.5 transition-all"
          />
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between text-white">
          
          <div className="flex items-center gap-6">
            {/* Play/Pause */}
            <button onClick={togglePlay} className="hover:text-brand-400 transition-colors">
              {isPlaying ? <Pause fill="currentColor" size={24} /> : <Play fill="currentColor" size={24} />}
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2 group/vol">
              <button onClick={toggleMute}>
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
              <input 
                type="range" 
                min="0" max="1" step="0.1" 
                value={isMuted ? 0 : volume} 
                onChange={handleVolumeChange}
                className="w-0 overflow-hidden group-hover/vol:w-20 transition-all duration-300 h-1 bg-white accent-brand-500"
              />
            </div>

            {/* Time */}
            <div className="text-sm font-medium font-mono text-gray-300">
               {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center gap-4">
             {/* Subtitles (Mock) */}
             <button className="hover:text-brand-400 transition-colors" title="Subtitles">
               <Captions size={20} />
             </button>

             {/* Quality (Mock) */}
             <button className="hover:text-brand-400 transition-colors" title="Quality">
               <Settings size={20} />
             </button>

             {/* Toggle Chat (Mobile/Desktop) */}
             <button onClick={toggleChat} className="lg:hidden hover:text-brand-400 transition-colors">
               <MessageSquare size={20} />
             </button>

             {/* Fullscreen */}
             <button onClick={toggleFullscreen} className="hover:text-brand-400 transition-colors">
               {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
             </button>
          </div>

        </div>
      </div>

      {/* Center Play Button Animation */}
      {!isPlaying && showControls && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-16 h-16 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
             <Play fill="white" className="text-white ml-1" size={32} />
          </div>
        </div>
      )}

    </div>
  );
};