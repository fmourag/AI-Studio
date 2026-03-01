import React from 'react';
import { motion } from 'motion/react';
import { Channel } from '../types';
import { Play, Eye, Globe, MessageSquare } from 'lucide-react';

interface ChannelCardProps {
  channel: Channel;
  onClick: (channel: Channel) => void;
  isActive?: boolean;
}

export const ChannelCard: React.FC<ChannelCardProps> = ({ channel, onClick, isActive }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(channel)}
      className={`group relative cursor-pointer rounded-2xl overflow-hidden bg-zinc-900/50 border transition-all duration-300 ${
        isActive ? 'border-emerald-500 shadow-lg shadow-emerald-500/20' : 'border-white/5 hover:border-white/20'
      }`}
    >
      <div className="aspect-video relative overflow-hidden bg-zinc-800">
        <img
          src={channel.logo}
          alt={channel.name}
          className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-black shadow-xl">
            <Play size={24} fill="currentColor" />
          </div>
        </div>
        
        <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-wider text-white/70">
          {channel.category}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-medium text-white group-hover:text-emerald-400 transition-colors truncate">
            {channel.name}
          </h3>
          <div className="flex items-center gap-1 text-zinc-500 text-xs">
            <Globe size={12} />
            <span>{channel.country}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1 text-zinc-400 text-xs">
            <Eye size={12} />
            <span>{(channel.views / 1000).toFixed(0)}k</span>
          </div>
          <div className="flex items-center gap-1 text-zinc-400 text-xs">
            <MessageSquare size={12} />
            <span>{channel.language}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
