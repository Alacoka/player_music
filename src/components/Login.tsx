import React from 'react';
import { Music } from 'lucide-react';
import { getSpotifyApi } from '../utils/spotify';

const Login: React.FC = () => {
  const handleLogin = async () => {
    try {
      await getSpotifyApi();
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-black flex flex-col items-center justify-center p-4">
      <div className="bg-black bg-opacity-70 p-8 rounded-xl shadow-2xl max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <Music size={64} className="text-green-500" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-6">Spotify Player PT</h1>
        <p className="text-gray-300 mb-8">
          Faça login com sua conta do Spotify para acessar suas músicas, playlists e muito mais.
        </p>
        <button
          onClick={handleLogin}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300"
        >
          Entrar com Spotify
        </button>
      </div>
    </div>
  );
};

export default Login;