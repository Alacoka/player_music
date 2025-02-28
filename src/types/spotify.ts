export interface SpotifyToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string }[];
  };
  duration_ms: number;
  uri: string;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  images: { url: string }[];
  tracks: {
    total: number;
  };
}

export interface SpotifyUser {
  display_name: string;
  images: { url: string }[];
  id: string;
}