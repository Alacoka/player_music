import React from 'react';
import { Clock } from 'lucide-react';
import { SpotifyTrack } from '../types/spotify';
import { formatDuration } from '../utils/spotify';

interface TrackListProps {
  tracks: SpotifyTrack[];
  onTrackSelect: (track: SpotifyTrack) => void;
  currentTrackId: string | null;
}

const TrackList: React.FC<TrackListProps> = ({ 
  tracks, 
  onTrackSelect,
  currentTrackId
}) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <table className="min-w-full">
        <thead>
          <tr className="text-gray-400 text-left border-b border-gray-800">
            <th className="py-2 px-4 w-12">#</th>
            <th className="py-2 px-4">Título</th>
            <th className="py-2 px-4">Álbum</th>
            <th className="py-2 px-4 text-right">
              <Clock size={16} />
            </th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track, index) => (
            <tr 
              key={track.id}
              onClick={() => onTrackSelect(track)}
              className={`hover:bg-gray-800 cursor-pointer ${
                currentTrackId === track.id ? 'bg-gray-800 text-green-500' : 'text-white'
              }`}
            >
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <img 
                    src={track.album.images[2]?.url || 'https://via.placeholder.com/40'} 
                    alt={track.album.name} 
                    className="w-10 h-10 mr-3"
                  />
                  <div>
                    <div className={currentTrackId === track.id ? 'text-green-500' : 'text-white'}>
                      {track.name}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {track.artists.map(a => a.name).join(', ')}
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4 text-gray-400">{track.album.name}</td>
              <td className="py-3 px-4 text-right text-gray-400">
                {formatDuration(track.duration_ms)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrackList;