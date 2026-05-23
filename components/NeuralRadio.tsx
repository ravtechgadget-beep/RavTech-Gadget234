
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Music, Sparkles, ExternalLink, Play, Radio, Volume2, Waves, Brain } from 'lucide-react';

interface Stream {
  id: string;
  name: string;
  category: string;
  description: string;
  playlistId: string;
  icon: React.ReactNode;
  color: string;
}

const STREAMS: Stream[] = [
  {
    id: 'spi-lofi',
    name: 'Physics Lo-Fi',
    category: 'Focus',
    description: 'Neural-optimized beats for deep SPI principle integration.',
    playlistId: 'aa733366-2053-47ad-8697-a4ef7447caec',
    icon: <Waves size={20} />,
    color: 'bg-indigo-500'
  },
  {
    id: 'registry-high-yield',
    name: 'Registry Pulse',
    category: 'Review',
    description: 'Aggregated high-yield registry patterns and clinical flow.',
    playlistId: 'aa733366-2053-47ad-8697-a4ef7447caec', // For now same playlist, but we could have more
    icon: <Radio size={20} />,
    color: 'bg-emerald-500'
  },
  {
    id: 'mnemonic-echo',
    name: 'Mnemonic Flow',
    category: 'Memory',
    description: 'Auditory mnemonics and memory palaces for sonographers.',
    playlistId: 'aa733366-2053-47ad-8697-a4ef7447caec',
    icon: <Brain size={20} />,
    color: 'bg-rose-500'
  },
  {
    id: 'clinical-immersion',
    name: 'ER Ambience',
    category: 'Immersion',
    description: 'Simulated clinical environments for stress-testing focus.',
    playlistId: 'aa733366-2053-47ad-8697-a4ef7447caec',
    icon: <Volume2 size={20} />,
    color: 'bg-amber-500'
  }
];

interface NeuralRadioProps {
  onClose: () => void;
}

export const NeuralRadio: React.FC<NeuralRadioProps> = ({ onClose }) => {
  const [activeStream, setActiveStream] = useState<Stream>(STREAMS[0]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 30 }}
      className="bg-slate-950/95 backdrop-blur-3xl md:border md:border-white/10 md:rounded-[3rem] overflow-hidden shadow-4xl max-w-5xl w-full relative flex flex-col md:flex-row h-screen md:h-auto max-md:fixed max-md:inset-0 max-md:z-[100]"
    >
      <div className="absolute inset-0 neural-grid opacity-10 pointer-events-none" />
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-white/5 p-6 md:p-8 flex flex-col gap-6 md:gap-8 relative z-20 bg-black/20">
        <div className="flex items-center justify-between md:justify-start gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-500/20">
              <Radio size={24} className="animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tighter italic uppercase text-white leading-none">Neural <span className="text-indigo-400">Radio</span></h3>
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">Multi-Stream Sync</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-white md:hidden border border-white/10"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto pb-4 md:pb-0 scrollbar-hide md:pr-2 md:custom-scrollbar">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 hidden md:block">Available Frequencies</p>
          {STREAMS.map((stream) => (
            <button
              key={stream.id}
              onClick={() => setActiveStream(stream)}
              className={`min-w-[160px] md:min-w-0 p-4 md:p-5 rounded-2xl border transition-all text-left group flex items-center gap-4 ${
                activeStream.id === stream.id 
                ? 'bg-white text-black border-white shadow-2xl scale-[1.02]' 
                : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className={`p-2 rounded-xl transition-colors ${
                activeStream.id === stream.id ? 'bg-black/10 text-black' : `${stream.color}/20 text-indigo-400`
              }`}>
                {stream.icon}
              </div>
              <div className="flex-1">
                <p className={`text-[10px] font-black uppercase tracking-tight leading-none ${activeStream.id === stream.id ? 'text-black' : 'text-slate-200'}`}>
                  {stream.name}
                </p>
                <p className={`text-[8px] font-bold uppercase tracking-widest opacity-60 mt-0.5`}>
                  {stream.category}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="p-5 bg-indigo-600/10 rounded-2xl border border-indigo-500/20 mt-auto hidden md:block">
          <div className="flex items-center gap-3 mb-2 text-indigo-400">
            <Sparkles size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Neural Link</span>
          </div>
          <p className="text-[9px] font-bold text-indigo-300/80 uppercase tracking-widest leading-relaxed">
            Optimized for registry synchronization and alpha-wave focus.
          </p>
        </div>
      </div>

      {/* Main Stream View */}
      <div className="flex-1 p-6 md:p-12 space-y-6 md:space-y-8 relative z-10 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
               <h2 className="text-xl md:text-3xl font-black text-white italic uppercase tracking-tighter leading-none">{activeStream.name}</h2>
               <div className="px-2 md:px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[7px] md:text-[8px] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5 md:gap-2">
                 <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 Live
               </div>
            </div>
            <p className="text-slate-500 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">{activeStream.description}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 md:p-4 bg-white/5 rounded-2xl text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/10 hidden md:block"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 min-h-[300px] md:min-h-[400px] bg-black/40 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 overflow-hidden relative shadow-inner">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStream.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <iframe 
                src={`https://suno.com/embed/playlist/${activeStream.playlistId}`} 
                width="100%" 
                height="100%" 
                style={{ border: 'none' }}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <div className="p-4 md:p-6 bg-white/5 rounded-2xl md:rounded-3xl border border-white/5 flex items-center gap-4 md:gap-6">
             <div className="p-3 md:p-4 bg-white/5 rounded-xl text-slate-500">
               <Volume2 size={20} md:size={24} />
             </div>
             <div className="space-y-0.5 md:space-y-1">
               <p className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Resonance</p>
               <p className="text-sm md:text-lg font-black text-white italic">Crystal Clear</p>
             </div>
          </div>
          <div className="p-4 md:p-6 bg-white/5 rounded-2xl md:rounded-3xl border border-white/5 flex items-center justify-between group">
             <div className="space-y-0.5 md:space-y-1">
               <p className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">Source Archives</p>
               <p className="text-xs md:text-sm font-black text-indigo-400 uppercase tracking-widest">Suno AI Portal</p>
             </div>
             <a 
                href={`https://suno.com/playlist/${activeStream.playlistId}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 md:p-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-slate-400 group-hover:text-white group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all"
              >
                <ExternalLink size={18} md:size={20} />
              </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
