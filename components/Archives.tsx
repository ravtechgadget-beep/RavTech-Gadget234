
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, Image as ImageIcon, FileText, Clock, Zap, Search, Trash2, 
  ChevronRight, ExternalLink, Brain, Sparkles, Lock, ShieldCheck, Activity, X, Music, Play
} from 'lucide-react';
import { UserVault, CachedLesson } from '../types';
import { modules } from '../data/modules';
import { BatchSynthesizer } from './BatchSynthesizer';

interface ArchivesProps {
  vault: UserVault;
  onClearVault: () => void;
  onSelectLesson: (mIdx: number, lIdx: number) => void;
  onEasterEgg?: () => void;
  onOpenRadio?: () => void;
}

export const Archives: React.FC<ArchivesProps> = ({ vault, onClearVault, onSelectLesson, onEasterEgg, onOpenRadio }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'mnemonics' | 'media' | 'reports'>('all');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showSynthesizer, setShowSynthesizer] = useState(false);

  const lessons = (Object.entries(vault.lessons) as [string, CachedLesson][]).map(([key, data]) => {
    const [mIdx, lIdx] = key.split('-').map(Number);
    const module = modules[mIdx];
    const lesson = module?.lessons[lIdx];
    return { key, data, module, lesson, mIdx, lIdx };
  }).filter(item => item.lesson);

  const filteredLessons = lessons.filter(item => {
    const matchesSearch = item.lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.module.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'mnemonics') return matchesSearch && !!vault.mnemonics[item.lesson.title];
    if (filter === 'media') return matchesSearch && !!item.data.imageUrl;
    if (filter === 'reports') return matchesSearch && !!item.data.pulse;
    return matchesSearch;
  });

  const mnemonics = Object.entries(vault.mnemonics);

  return (
    <div className="relative min-h-screen bg-[#0a0502] text-white overflow-hidden">
      {/* Atmospheric Background - Recipe 7 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-900/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald-900/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 space-y-12 md:space-y-20">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
          <div className="space-y-4 md:space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 md:gap-4 text-indigo-400"
            >
              <div className="p-2 md:p-3 bg-indigo-500/10 rounded-xl md:rounded-2xl border border-indigo-500/20">
                <Database size={20} md:size={24} />
              </div>
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em]">Neural Repository</span>
            </motion.div>
            <h1 
              className="text-5xl md:text-9xl font-black tracking-tighter italic uppercase leading-none cursor-help"
              onClick={onEasterEgg}
            >
              The <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/20">Archives</span>
            </h1>
          </div>

          <div className="flex flex-col gap-4 md:gap-6">
            <div className="relative group">
              <Search className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} md:size={20} />
              <input 
                type="text" 
                placeholder="Search Neural Syncs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-[400px] bg-white/5 border border-white/10 rounded-full py-4 md:py-5 pl-14 md:pl-16 pr-6 md:pr-8 text-xs md:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
              />
            </div>
            <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {(['all', 'mnemonics', 'media', 'reports'] as const).map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 md:px-6 py-2 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${filter === f ? 'bg-white text-black' : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}
                >
                  {f}
                </button>
              ))}
              <button 
                onClick={() => setShowSynthesizer(!showSynthesizer)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all ml-auto font-black uppercase text-[10px] tracking-widest shadow-2xl ${showSynthesizer ? 'bg-indigo-600 text-white' : 'bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white border border-indigo-500/20'}`}
              >
                <Zap size={16} />
                <span>Neural Sync</span>
              </button>
              <button 
                onClick={onClearVault}
                className="p-3 bg-rose-500/10 text-rose-500 rounded-full hover:bg-rose-500 hover:text-white transition-all"
                title="Purge Archives"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* Batch Synthesizer Section */}
        <AnimatePresence>
          {showSynthesizer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <BatchSynthesizer />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Neural Radio Featured Card */}
          {filter === 'all' && !searchTerm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative lg:col-span-1"
            >
              <div 
                onClick={onOpenRadio}
                className="h-full tech-card rounded-[2.5rem] p-8 space-y-8 hover:scale-[1.02] transition-all cursor-pointer overflow-hidden border-b-4 border-purple-500/40 bg-gradient-to-br from-purple-900/20 to-transparent"
              >
                <div className="absolute inset-0 neural-grid opacity-[0.1] pointer-events-none" />
                <div className="aspect-video rounded-2xl bg-slate-900 overflow-hidden relative border border-white/10 shadow-inner flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-indigo-600/20" />
                  <Music size={64} className="text-purple-500/40 group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-white/60">Live Stream</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black tracking-tighter uppercase italic leading-none text-white group-hover:text-purple-400 transition-colors">
                      Neural Radio
                    </h3>
                    <Sparkles size={18} className="text-purple-400" />
                  </div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                    Synchronize your neural pathways with SPI Physics beats. Optimized for deep focus and registry mastery.
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest">Suno AI Integration</span>
                  <button className="ml-auto p-3 bg-white/5 rounded-full hover:bg-white text-slate-400 hover:text-black transition-all">
                    <Play size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          <AnimatePresence mode="popLayout">
            {filteredLessons.map((item, idx) => (
              <motion.div
                key={item.key}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative"
              >
                <div 
                  onClick={() => setSelectedItem(item)}
                  className="h-full tech-card rounded-[2.5rem] p-8 space-y-8 hover:scale-[1.02] transition-all cursor-pointer overflow-hidden border-b-4 border-indigo-500/20"
                >
                  <div className="absolute inset-0 neural-grid opacity-[0.05] pointer-events-none" />
                  
                  {/* Visual Preview */}
                  <div className="aspect-video rounded-2xl bg-slate-900 overflow-hidden relative border border-white/10 shadow-inner">
                    {item.data.imageUrl ? (
                      <img 
                        src={item.data.imageUrl} 
                        alt={item.lesson.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-800">
                        <ImageIcon size={48} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest text-white bg-gradient-to-r ${item.module.color} shadow-lg`}>
                        {item.module.title}
                      </span>
                      <div className="flex items-center gap-2 text-[8px] font-black text-white/40 uppercase tracking-widest">
                        <Clock size={10} /> {new Date(item.data.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-black tracking-tighter uppercase italic leading-none group-hover:text-indigo-400 transition-colors">
                        {item.lesson.title}
                      </h3>
                      {vault.examHistory?.some(e => e.score >= 80) && (
                        <div className="flex items-center gap-1 text-emerald-400">
                          <ShieldCheck size={14} />
                        </div>
                      )}
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest line-clamp-2 leading-relaxed">
                      {item.data.script.substring(0, 100).replace(/\[BLOCK_\d+\]:?/g, '')}...
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    <div className="flex -space-x-2">
                      {item.data.imageUrl && <div className="w-8 h-8 rounded-full bg-indigo-500/20 border-2 border-[#0a0502] flex items-center justify-center"><ImageIcon size={12} className="text-indigo-400"/></div>}
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-[#0a0502] flex items-center justify-center"><FileText size={12} className="text-emerald-400"/></div>
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 border-2 border-[#0a0502] flex items-center justify-center"><Zap size={12} className="text-amber-400"/></div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onSelectLesson(item.mIdx, item.lIdx); }}
                      className="ml-auto p-3 bg-white/5 rounded-full hover:bg-white text-slate-400 hover:text-black transition-all"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredLessons.length === 0 && (
          <div className="py-40 text-center space-y-8">
            <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
              <Database size={48} className="text-slate-700" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black tracking-tighter uppercase italic">Repository Empty</h3>
              <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Complete Masterclasses to sync data to the archives.</p>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-2xl flex items-center justify-center p-6"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass-panel border border-white/10 w-full max-w-5xl max-h-[90vh] rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-4xl"
                onClick={e => e.stopPropagation()}
              >
                {/* Left: Media */}
                <div className="w-full md:w-1/2 bg-black relative flex items-center justify-center group">
                  {selectedItem.data.imageUrl ? (
                    <img 
                      src={selectedItem.data.imageUrl} 
                      alt={selectedItem.lesson.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="text-slate-800"><ImageIcon size={120} /></div>
                  )}
                  <div className="absolute top-8 left-8">
                    <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white bg-gradient-to-r ${selectedItem.module.color} shadow-2xl`}>
                      {selectedItem.module.title}
                    </span>
                  </div>
                </div>

                {/* Right: Data */}
                <div className="w-full md:w-1/2 p-12 md:p-16 overflow-y-auto space-y-12 scrollbar-hide">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em]">Neural Sync Report</span>
                    <button onClick={() => setSelectedItem(null)} className="p-4 bg-white/5 rounded-full hover:bg-white hover:text-black transition-all"><X size={20}/></button>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">
                      {selectedItem.lesson.title}
                    </h2>
                    <div className="flex items-center gap-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      <span className="flex items-center gap-2"><Clock size={14}/> {new Date(selectedItem.data.timestamp).toLocaleString()}</span>
                      <span className="flex items-center gap-2"><Activity size={14}/> Registry Verified</span>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <section className="space-y-4">
                      <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-3">
                        <Brain size={16}/> Mnemonic Lock
                      </h4>
                      <div className="p-8 bg-white/5 rounded-3xl border border-white/5 italic font-black text-xl text-indigo-100">
                        "{vault.mnemonics[selectedItem.lesson.title] || 'No mnemonic recorded for this sequence.'}"
                      </div>
                    </section>

                    <section className="space-y-4">
                      <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-3">
                        <ShieldCheck size={16}/> Logic Pulse
                      </h4>
                      <div className="p-8 bg-white/5 rounded-3xl border border-white/5 text-sm text-slate-400 leading-relaxed italic">
                        {selectedItem.data.pulse?.text || 'No pulse data available.'}
                      </div>
                    </section>

                    <button 
                      onClick={() => { onSelectLesson(selectedItem.mIdx, selectedItem.lIdx); setSelectedItem(null); }}
                      className="w-full py-6 bg-white text-black rounded-full font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-4"
                    >
                      Re-Initialize Masterclass <ArrowRight size={18}/>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ArrowRight = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);
