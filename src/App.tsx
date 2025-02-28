import { useState, useEffect } from 'react';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { getSpotifyApi } from './utils/spotify';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [spotifyApi, setSpotifyApi] = useState<SpotifyApi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeSpotify = async () => {
      try {
        setLoading(true);
        const api = await getSpotifyApi();
        setSpotifyApi(api);
        setLoading(false);
      } catch (err: unknown) {
        console.error('Erro ao inicializar Spotify:', err);
        // Mensagem de erro mais específica
        const errorMessage = (err as Error).message?.includes('CLIENT_ID não configurado')
          ? 'É necessário configurar o CLIENT_ID do Spotify. Verifique o arquivo .env ou src/utils/spotify.ts.'
          : 'Falha ao conectar com o Spotify. Por favor, tente novamente.';
        setError(errorMessage);
        setLoading(false);
      }
    };

    initializeSpotify();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center max-w-md p-6 bg-gray-800 rounded-lg">
          <p className="text-red-500 mb-4">{error}</p>
          <div className="mb-6 text-gray-300 text-sm">
            <p className="mb-2">Para configurar o Spotify:</p>
            <ol className="list-decimal list-inside text-left">
              <li className="mb-1">Crie um aplicativo no <a href="https://developer.spotify.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline">Spotify Developer Dashboard</a></li>
              <li className="mb-1">Obtenha o CLIENT_ID do seu aplicativo</li>
              <li className="mb-1">Crie um arquivo .env na raiz do projeto com: VITE_SPOTIFY_CLIENT_ID=seu_client_id</li>
              <li>Adicione {window.location.origin} como URI de redirecionamento no painel do Spotify</li>
            </ol>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {spotifyApi ? <Dashboard spotifyApi={spotifyApi} /> : <Login />}
    </div>
  );
}

export default App;