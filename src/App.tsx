import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Tv, Globe, TrendingUp, Filter, Info, Sparkles, X, Play, RefreshCw } from 'lucide-react';
import { CHANNELS } from './constants';
import { Channel, Category } from './types';
import { VideoPlayer } from './components/VideoPlayer';
import { ChannelCard } from './components/ChannelCard';
import { getChannelInsight } from './services/geminiService';
import Markdown from 'react-markdown';

const CATEGORIES: Category[] = ['Todos', 'Notícias', 'Entretenimento', 'Esportes', 'Música', 'Filmes', 'Documentários'];

export default function App() {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');
  const [insight, setInsight] = useState<string | null>(null);
  const [isInsightLoading, setIsInsightLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Sort channels by views descending as requested
  const sortedChannels = useMemo(() => {
    return [...CHANNELS].sort((a, b) => b.views - a.views);
  }, []);

  const filteredChannels = useMemo(() => {
    return sortedChannels.filter(channel => {
      const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          channel.country.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'Todos' || channel.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [sortedChannels, searchQuery, activeCategory]);

  useEffect(() => {
    if (selectedChannel) {
      setInsight(null);
      setIsInsightLoading(true);
      getChannelInsight(selectedChannel).then(text => {
        setInsight(text || null);
        setIsInsightLoading(false);
      });
    }
  }, [selectedChannel]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 glass px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
            <Tv size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">GlobalStream</h1>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Mosaico Mundial</p>
          </div>
        </div>

        <div className="flex-1 max-w-xl w-full relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input
            type="text"
            placeholder="Buscar canais, países ou idiomas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
          />
        </div>

        <div className="hidden lg:flex items-center gap-6 text-zinc-400 text-sm">
          <div className="flex items-center gap-2">
            <Globe size={16} />
            <span>{CHANNELS.length} Canais</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp size={16} />
            <span>Ao Vivo Mundial</span>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-[1600px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* Player Section */}
            <AnimatePresence mode="wait">
              {selectedChannel ? (
                <motion.div
                  key={`${selectedChannel.id}-${retryCount}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-4"
                >
                  <VideoPlayer url={selectedChannel.url} poster={selectedChannel.logo} />
                  
                  <div className="glass p-6 rounded-2xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-2xl font-bold">{selectedChannel.name}</h2>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-xs font-mono uppercase">Ao Vivo</span>
                        </div>
                        <div className="flex items-center gap-4 text-zinc-400 text-sm">
                          <span className="flex items-center gap-1"><Globe size={14} /> {selectedChannel.country}</span>
                          <span className="flex items-center gap-1"><Info size={14} /> {selectedChannel.category}</span>
                          <span className="flex items-center gap-1"><TrendingUp size={14} /> {(selectedChannel.views / 1000).toFixed(0)}k ativos</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setRetryCount(prev => prev + 1)}
                          className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white"
                          title="Atualizar Stream"
                        >
                          <RefreshCw size={18} />
                        </button>
                        <button 
                          onClick={() => setSelectedChannel(null)}
                          className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/5">
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-3">
                        <Sparkles size={14} />
                        <span>Insights do Canal com IA</span>
                      </div>
                      <div className="text-zinc-300 leading-relaxed italic">
                        {isInsightLoading ? (
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                          </div>
                        ) : (
                          <div className="markdown-body">
                            <Markdown>{insight || ''}</Markdown>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="aspect-video rounded-2xl bg-zinc-900/50 border border-dashed border-white/10 flex flex-col items-center justify-center text-zinc-500 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                    <Play size={32} className="opacity-20" />
                  </div>
                  <p className="text-lg font-medium">Selecione um canal para começar a transmitir</p>
                  <p className="text-sm opacity-60">Canais abertos globais ao seu alcance</p>
                </div>
              )}
            </AnimatePresence>

            {/* Mosaic Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <TrendingUp size={20} className="text-emerald-500" />
                  Canais Populares
                </h2>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar max-w-full">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                        activeCategory === cat 
                          ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' 
                          : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredChannels.map(channel => (
                  <ChannelCard
                    key={channel.id}
                    channel={channel}
                    onClick={setSelectedChannel}
                    isActive={selectedChannel?.id === channel.id}
                  />
                ))}
              </div>

              {filteredChannels.length === 0 && (
                <div className="py-20 text-center space-y-4">
                  <div className="text-zinc-600 flex justify-center">
                    <Filter size={48} />
                  </div>
                  <p className="text-zinc-500">Nenhum canal encontrado com seus critérios.</p>
                  <button 
                    onClick={() => {setSearchQuery(''); setActiveCategory('Todos');}}
                    className="text-emerald-500 hover:underline text-sm"
                  >
                    Limpar todos os filtros
                  </button>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="glass p-6 rounded-2xl space-y-6">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Sparkles size={18} className="text-emerald-500" />
                Notícias Globais em Destaque
              </h3>
              <div className="space-y-4">
                {sortedChannels.filter(c => c.category === 'Notícias').slice(0, 5).map(channel => (
                  <div 
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel)}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-zinc-800 overflow-hidden flex-shrink-0 p-2">
                      <img src={channel.logo} alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate group-hover:text-emerald-400 transition-colors">{channel.name}</p>
                      <p className="text-xs text-zinc-500">{channel.country} • {channel.language}</p>
                    </div>
                    <div className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      AO VIVO
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-6 rounded-2xl bg-emerald-500/5 border-emerald-500/20">
              <h3 className="font-semibold text-lg mb-2">Sobre o GlobalStream</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Acesse canais abertos (FTA) de todo o mundo. Todas as transmissões estão disponíveis publicamente e são fornecidas pelas próprias emissoras.
              </p>
              <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-2">
                <div className="flex items-center justify-between text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
                  <span>Atualizado Diariamente</span>
                  <span>100% Legal FTA</span>
                </div>
                <p className="text-[9px] text-zinc-600 leading-tight">
                  Nota: Alguns canais podem ser restritos pelas emissoras em certas regiões ou devido a políticas de segurança (CORS).
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="py-8 px-6 border-t border-white/5 text-center text-zinc-600 text-xs">
        <p>© 2026 GlobalStream Mosaic. Todos os direitos reservados.</p>
        <p className="mt-2">Desenvolvido com Gemini AI para insights de canais.</p>
      </footer>
    </div>
  );
}
