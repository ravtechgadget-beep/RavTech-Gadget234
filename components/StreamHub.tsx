
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radio, Mic, Users, Play, Pause, Activity, 
  Sparkles, Zap, Shield, Search, Filter, 
  ArrowRight, Heart, Share2, Volume2, Globe, X
} from 'lucide-react';
import { BOT_PERSONAS, BotPersona } from '../data/personas';

interface StreamHubProps {
  onStartStream: (persona: BotPersona) => void;
  onClose: () => void;
}

const LIVE_DATA = [
  { id: 'physics-1', title: 'Spectral Doppler Optimization', viewers: '1.2k', tags: ['High Yield', 'Physics'], color: 'from-blue-500/20' },
  { id: 'physics-2', title: 'Artifact Deconstruction: Mirror Image', viewers: '850', tags: ['Registry', 'Labs'], color: 'from-indigo-500/20' },
  { id: 'physics-3', title: 'Bioeffects & Thermal Indices', viewers: '2.4k', tags: ['Safety', 'ALARA'], color: 'from-emerald-500/20' },
];

export const StreamHub: React.FC<StreamHubProps> = ({ onStartStream, onClose }) => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Streams");

  const categories = ["All Streams", "Live Physics", "Instrumentation", "Registry Prep", "Case Studies"];

  return (
    <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-3xl z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-500 overflow-y-auto">
      <div className="max-w-7xl w-full bg-[#080c14] rounded-[3.5rem] border border-white/10 shadow-4xl overflow-hidden flex flex-col md:flex-row h-full md:h-[85vh] relative">
        <div className="absolute inset-0 neural-grid opacity-[0.03] pointer-events-none" />
        
        {/* Sidebar Navigation */}
        <div className="w-full md:w-80 border-r border-white/5 p-10 flex flex-col gap-12 relative z-10">
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-500/20">
                <Radio size={24} className="animate-pulse" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white tracking-tighter uppercase italic">Neural Radio</h2>
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">v2.4 Active</p>
              </div>
            </div>

            <div className="space-y-3">
              {categories.map((cat) => (
                <button
                  key={`stream-cat-${cat}`}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeCategory === cat 
                    ? 'bg-white text-black shadow-xl scale-105' 
                    : 'text-slate-500 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
             <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Network Load: 12%</span>
             </div>
             <p className="text-[9px] font-bold text-slate-500 leading-relaxed italic uppercase">
               All streams are processed locally using neural-edge computing for zero latency interaction.
             </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden relative z-10 bg-white/2">
          <div className="p-10 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search distinct cognitive models..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-[2rem] pl-16 pr-8 py-4 text-xs font-black text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700 uppercase tracking-widest"
              />
            </div>
            <button onClick={onClose} className="self-end sm:self-auto p-4 bg-white/5 text-slate-500 rounded-2xl hover:text-white transition-all">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-10 space-y-12 scrollbar-hide">
             {/* Featured Stream */}
             <section className="space-y-6">
                <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-4">Masterclass Live Now</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                   {BOT_PERSONAS.map((p, idx) => (
                     <motion.div
                       key={`persona-stream-${p.id}`}
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: idx * 0.1 }}
                    className="group relative bg-slate-900 border border-white/10 rounded-[3rem] p-8 overflow-hidden hover:scale-[1.02] transition-all cursor-pointer"
                    onClick={() => onStartStream(p)}
                   >
                     <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-5 transition-opacity duration-700`} />
                     <div className="flex items-center gap-6 mb-8 relative z-10">
                       <div className={`w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br ${p.color} rounded-[2rem] flex items-center justify-center text-white shadow-2xl group-hover:rotate-6 transition-transform`}>
                          <p.icon size={40} />
                       </div>
                       <div>
                          <div className="flex items-center gap-3 mb-2">
                             <div className="px-2 py-1 bg-rose-600 rounded-lg text-[8px] font-black text-white uppercase tracking-tighter shadow-lg shadow-rose-500/20">LIVE</div>
                             <div className="flex items-center gap-1.5 text-slate-500 font-bold text-[9px] uppercase">
                               <Users size={12} /> {(Math.random() * 2000 + 500).toFixed(0)} Viewers
                             </div>
                          </div>
                          <h4 className="text-2xl font-black text-white italic tracking-tighter uppercase">{p.name}</h4>
                          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{p.specialization}</p>
                       </div>
                     </div>
                     
                     <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-4 relative z-10 group-hover:bg-white/10 transition-colors">
                        <p className="text-[10px] md:text-sm font-bold text-slate-400 leading-relaxed italic line-clamp-2">
                          "{p.intro}"
                        </p>
                        <div className="flex items-center justify-between pt-2">
                           <div className="flex gap-2">
                              {['Physics', 'Registry'].map(tag => (
                                <span key={tag} className="text-[8px] font-black text-slate-600 uppercase border border-white/5 px-2 py-1 rounded-md">{tag}</span>
                              ))}
                           </div>
                           <ArrowRight className="text-indigo-400 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" size={18} />
                        </div>
                     </div>
                   </motion.div>
                   ))}
                </div>
             </section>

             {/* Recent Recordings / Community Streams */}
             <section className="space-y-8">
                <div className="flex items-center justify-between">
                   <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Neural Community Broadcasts</h3>
                   <button className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-white transition-colors">View All Archive</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {LIVE_DATA.map((live, idx) => (
                     <div key={`community-stream-${live.id}`} className="group bg-white/2 border border-white/5 rounded-[2rem] p-6 hover:bg-white/5 transition-all cursor-pointer">
                        <div className={`aspect-video rounded-2xl bg-gradient-to-br ${live.color} mb-6 relative overflow-hidden flex items-center justify-center p-8`}>
                           <div className="absolute inset-0 neural-grid opacity-10" />
                           <Play className="text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all" size={48} />
                           <div className="absolute bottom-4 left-4 flex gap-2">
                              {live.tags.map(t => (
                                <span key={t} className="px-2 py-0.5 bg-black/40 backdrop-blur rounded text-[8px] font-black text-white uppercase tracking-tighter">{t}</span>
                              ))}
                           </div>
                        </div>
                        <h5 className="text-xs font-black text-white uppercase tracking-wide leading-tight group-hover:text-indigo-400 transition-colors">{live.title}</h5>
                        <div className="flex items-center justify-between mt-4">
                           <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest italic">{live.viewers} Archived Views</p>
                           <Share2 size={14} className="text-slate-700 hover:text-white transition-colors" />
                        </div>
                     </div>
                   ))}
                </div>
             </section>
          </div>
        </div>
      </div>
    </div>
  );
};
