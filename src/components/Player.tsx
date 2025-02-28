import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, List, Heart } from 'lucide-react';
import { SpotifyTrack } from '../types/spotify';
import { formatDuration } from '../utils/spotify';

interface PlayerProps {
  currentTrack: SpotifyTrack | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Player: React.FC<PlayerProps> = ({
  currentTrack,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious
}) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    let interval: number | null = null;
    
    if (isPlaying && currentTrack) {
      interval = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval!);
            return 0;
          }
          return prev + 0.1;
        });
      }, currentTrack.duration_ms / 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentTrack]);
  
  if (!currentTrack) {
    return (
      <div className="bg-gray-900 p-4 rounded-lg text-center text-white">
        <p>Nenhuma música selecionada</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-4 rounded-lg text-white">
      <div className="flex items-center mb-4">
        <img 
          src={currentTrack.album.images[0]?.url} 
          alt={currentTrack.album.name} 
          className="w-16 h-16 rounded mr-4"
        />
        <div>
          <h3 className="font-bold">{currentTrack.name}</h3>
          <p className="text-gray-400">{currentTrack.artists.map(a => a.name).join(', ')}</p>
        </div>
        <button className="ml-auto text-gray-400 hover:text-white">
          <Heart size={20} />
        </button>
      </div>
      
      <div className="mb-4">
        <div className="h-1 w-full bg-gray-700 rounded-full mb-1">
          <div 
            className="h-1 bg-green-500 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>0:00</span>
          <span>{formatDuration(currentTrack.duration_ms)}</span>
        </div>
      </div>
      
      <div className="flex justify-center items-center space-x-4">
        <button className="text-gray-400 hover:text-white" onClick={onPrevious}>
          <SkipBack size={24} />
        </button>
        <button 
          className="bg-white text-black p-2 rounded-full hover:scale-105 transition"
          onClick={onPlayPause}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button className="text-gray-400 hover:text-white" onClick={onNext}>
          <SkipForward size={24} />
        </button>
      </div>
      
      <div className="flex items-center mt-4">
        <button className="text-gray-400 hover:text-white mr-2">
          <List size={20} />
        </button>
        <button className="text-gray-400 hover:text-white">
          <Volume2 size={20} />
        </button>
        <div className="h-1 w-24 bg-gray-700 rounded-full ml-2">
          <div className="h-1 bg-green-500 rounded-full w-3/4"></div>
        </div>
      </div>
    </div>
  );
};

export default Player;