import { SpotifyApi } from '@spotify/web-api-ts-sdk';

// Substitua com suas credenciais do Spotify Developer Dashboard
// Obtenha suas credenciais em: https://developer.spotify.com/dashboard/
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || 'e5d83376c4284fd3a7dc5fced3697810';
const REDIRECT_URI = window.location.origin;
const SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'playlist-read-private',
  'playlist-read-collaborative',
  'streaming'
];

let spotifyApi: SpotifyApi | null = null;

export const getSpotifyApi = async (): Promise<SpotifyApi> => {
  if (spotifyApi) {
    return spotifyApi;
  }

  try {
    // Verifica se o CLIENT_ID foi configurado
    if (CLIENT_ID === 'e5d83376c4284fd3a7dc5fced3697810') {
      throw new Error('CLIENT_ID não configurado. Por favor, configure suas credenciais do Spotify.');
    }

    spotifyApi = SpotifyApi.withUserAuthorization(
      CLIENT_ID,
      REDIRECT_URI,
      SCOPES
    );

    await spotifyApi.authenticate();
    return spotifyApi;
  } catch (error) {
    console.error('Erro ao autenticar com Spotify:', error);
    throw error;
  }
};

export const formatDuration = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};