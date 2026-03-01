import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { AlertCircle, Loader2, RefreshCw } from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  poster?: string;
  autoPlay?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, poster, autoPlay = true }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');

  const initPlayer = () => {
    if (isYouTube) {
      setIsLoading(false);
      setError(null);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    setError(null);
    setIsLoading(true);

    // Clean up previous instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: false,
        lowLatencyMode: true,
        backBufferLength: 90,
        manifestLoadingMaxRetry: 10,
        levelLoadingMaxRetry: 10,
        xhrSetup: (xhr) => {
          xhr.withCredentials = false;
        }
      });
      hlsRef.current = hls;
      
      hls.loadSource(url);
      hls.attachMedia(video);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        if (autoPlay) {
          video.play().catch(e => {
            if (e.name !== 'AbortError') {
              console.warn("Autoplay blocked or failed:", e);
            }
          });
        }
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS Error:", data);
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              setError(`Erro de Rede: ${data.details} (Possível bloqueio de CORS)`);
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              setError(`Erro de Mídia: ${data.details}`);
              hls.recoverMediaError();
              break;
            default:
              setError(`Erro Fatal: ${data.details}`);
              setIsLoading(false);
              hls.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
      video.addEventListener('loadedmetadata', () => {
        setIsLoading(false);
        if (autoPlay) {
          video.play().catch(e => {
            if (e.name !== 'AbortError') {
              console.warn("Autoplay failed:", e);
            }
          });
        }
      });
      video.addEventListener('error', () => {
        setError("Falha ao carregar a transmissão de vídeo.");
        setIsLoading(false);
      });
    }
  };

  useEffect(() => {
    initPlayer();

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [url, autoPlay, retryCount]);

  if (isYouTube) {
    // Convert regular YouTube URL to embed URL if needed
    let embedUrl = url;
    if (url.includes('watch?v=')) {
      embedUrl = url.replace('watch?v=', 'embed/');
    } else if (url.includes('youtu.be/')) {
      embedUrl = url.replace('youtu.be/', 'youtube.com/embed/');
    }
    // Add autoplay and other params
    const finalUrl = new URL(embedUrl);
    if (autoPlay) finalUrl.searchParams.set('autoplay', '1');
    finalUrl.searchParams.set('mute', '1');

    return (
      <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10">
        <iframe
          src={finalUrl.toString()}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        controls
        poster={poster}
        playsInline
        muted
      />
      
      {isLoading && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
          <p className="text-zinc-400 text-sm font-medium animate-pulse">Conectando à transmissão global...</p>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/90 backdrop-blur-md p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-white font-semibold mb-2">Erro na Transmissão</h3>
          <p className="text-zinc-400 text-sm mb-6 max-w-xs">{error}</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setRetryCount(prev => prev + 1)}
              className="flex items-center justify-center gap-2 px-6 py-2 bg-emerald-500 text-black hover:bg-emerald-400 rounded-full text-sm font-medium transition-all"
            >
              <RefreshCw size={16} />
              Tentar Novamente
            </button>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-zinc-500 hover:text-white underline"
            >
              Abrir link direto da transmissão
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
