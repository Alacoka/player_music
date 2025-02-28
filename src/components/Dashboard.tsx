import React, { useState, useEffect } from 'react';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { SpotifyTrack, SpotifyPlaylist, SpotifyUser } from '../types/spotify';
import Sidebar from './Sidebar';
import TrackList from './TrackList';
import Player from './Player';

interface DashboardProps {
  spotifyApi: SpotifyApi;
}

const Dashboard: React.FC<DashboardProps> = ({ spotifyApi }) => {
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const [playlistName, setPlaylistName] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await spotifyApi.currentUser.profile();
        setUser(userData);
        
        const playlistsData = await spotifyApi.currentUser.playlists.playlists();
        setPlaylists(playlistsData.items);
        
        if (playlistsData.items.length > 0) {
          const firstPlaylist = playlistsData.items[0];
          setSelectedPlaylistId(firstPlaylist.id);
          setPlaylistName(firstPlaylist.name);
          
          const tracksData = await spotifyApi.playlists.getPlaylistItems(firstPlaylist.id);
          setTracks(tracksData.items.map(item => item.track as SpotifyTrack));
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };
    
    fetchUserData();
  }, [spotifyApi]);
  
  const handlePlaylistSelect = async (playlistId: string) => {
    try {
      setSelectedPlaylistId(playlistId);
      
      const selectedPlaylist = playlists.find(p => p.id === playlistId);
      if (selectedPlaylist) {
        setPlaylistName(selectedPlaylist.name);
      }
      
      const tracksData = await spotifyApi.playlists.getPlaylistItems(playlistId);
      setTracks(tracksData.items.map(item => item.track as SpotifyTrack));
    } catch (error) {
      console.error('Erro ao buscar faixas da playlist:', error);
    }
  };
  
  const handleTrackSelect = (track: SpotifyTrack) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleNext = () => {
    if (!currentTrack || tracks.length === 0) return;
    
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[nextIndex]);
  };
  
  const handlePrevious = () => {
    if (!currentTrack || tracks.length === 0) return;
    
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrack(tracks[prevIndex]);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar 
        user={user} 
        playlists={playlists} 
        onPlaylistSelect={handlePlaylistSelect}
        selectedPlaylistId={selectedPlaylistId}
      />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="p-6 bg-gradient-to-b from-green-900 to-gray-900">
          <h1 className="text-3xl font-bold mb-4">{playlistName}</h1>
          {tracks.length > 0 && (
            <p className="text-gray-300">{tracks.length} músicas</p>
          )}
        </div>
        
        <TrackList 
          tracks={tracks} 
          onTrackSelect={handleTrackSelect}
          currentTrackId={currentTrack?.id || null}
        />
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4">
        <Player 
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </div>
    </div>
  );
};

export default Dashboard;