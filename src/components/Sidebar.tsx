import React from 'react';
import { Home, Search, Library, PlusSquare, Heart } from 'lucide-react';
import { SpotifyPlaylist, SpotifyUser } from '../types/spotify';

interface SidebarProps {
  user: SpotifyUser | null;
  playlists: SpotifyPlaylist[];
  onPlaylistSelect: (playlistId: string) => void;
  selectedPlaylistId: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  user, 
  playlists, 
  onPlaylistSelect,
  selectedPlaylistId
}) => {
  return (
    <div className="bg-black w-64 flex-shrink-0 h-full overflow-y-auto p-4">
      {user && (
        <div className="flex items-center mb-6">
          <img 
            src={user.images[0]?.url || 'https://via.placeholder.com/40'} 
            alt={user.display_name} 
            className="w-10 h-10 rounded-full mr-3"
          />
          <span className="text-white font-medium">{user.display_name}</span>
        </div>
      )}
      
      <nav className="mb-6">
        <ul>
          <li className="mb-2">
            <a href="#" className="flex items-center text-gray-300 hover:text-white py-2">
              <Home size={20} className="mr-3" />
              <span>Início</span>
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="flex items-center text-gray-300 hover:text-white py-2">
              <Search size={20} className="mr-3" />
              <span>Buscar</span>
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="flex items-center text-gray-300 hover:text-white py-2">
              <Library size={20} className="mr-3" />
              <span>Sua Biblioteca</span>
            </a>
          </li>
        </ul>
      </nav>
      
      <div className="mb-6">
        <div className="flex items-center text-gray-300 hover:text-white py-2 cursor-pointer">
          <PlusSquare size={20} className="mr-3" />
          <span>Criar playlist</span>
        </div>
        <div className="flex items-center text-gray-300 hover:text-white py-2 cursor-pointer">
          <Heart size={20} className="mr-3" />
          <span>Músicas Curtidas</span>
        </div>
      </div>
      
      <div className="border-t border-gray-800 pt-4">
        <h3 className="text-gray-400 uppercase text-xs font-bold mb-3">Playlists</h3>
        <ul>
          {playlists.map(playlist => (
            <li key={playlist.id} className="mb-2">
              <button 
                onClick={() => onPlaylistSelect(playlist.id)}
                className={`text-left w-full truncate py-1 ${
                  selectedPlaylistId === playlist.id ? 'text-green-500' : 'text-gray-300 hover:text-white'
                }`}
              >
                {playlist.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;