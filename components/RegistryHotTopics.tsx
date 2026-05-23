
import React, { useState, useEffect } from 'react';
import { Search, Flame, ExternalLink, Activity, Info, Sparkles, Database, Loader2, ShieldCheck, Newspaper } from 'lucide-react';
import { getRegistryPulse } from '../services/geminiService';

export const RegistryHotTopics: React.FC<{ topic: string }> = ({ topic }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ text: string, sources: any[] } | null>(null);

  useEffect(() => {
    setLoading(true);
    getRegistryPulse(topic).then(res => {
      setData(res);
      setLoading(false);
    });
  }, [topic]);

  return (
    <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl animate-in fade-in duration-1000 overflow-hidden relative border border-white/5">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none rotate-12">
        <Newspaper size={240} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-10">
           <div className="p-4 bg-rose-600 rounded-[1.5rem] shadow-3xl shadow-rose-600/20 animate-pulse">
              <Flame size={28} className="text-white" />
           </div>
           <div>
              <h3 className="text-3xl font-black tracking-tighter uppercase italic leading-none">Registry Intelligence</h3>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mt-2 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                 Real-time grounding active (2025-2026)
              </p>
           </div>
        </div>

        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center gap-6">
             <Loader2 className="animate-spin text-indigo-500" size={48} />
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Searching examiner updates...</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-12 items-start">
             <div className="space-y-8 animate-in slide-in-from-left duration-700">
                <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-6 flex items-center gap-2">
                      <ShieldCheck size={14}/> Candidate Intel report
                   </h4>
                   <div className="prose prose-invert prose-sm max-w-none prose-p:text-slate-300 prose-p:leading-relaxed prose-strong:text-white">
                      {data?.text.split('\n').map((line, i) => line.trim() ? <p key={i} className="mb-4">{line}</p> : null)}
                   </div>
                </div>
             </div>

             <div className="space-y-8 animate-in slide-in-from-right duration-1000">
                <div className="bg-slate-800 rounded-[2.5rem] p-8 border border-white/5">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-6 flex items-center gap-2">
                      <Database size={14}/> Grounding Sources
                   </h4>
                   <div className="space-y-3">
                      {data?.sources.map((src, i) => src.web && (
                        <a 
                          key={i} 
                          href={src.web.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all group"
                        >
                           <div className="p-2 bg-indigo-500/20 rounded-lg group-hover:bg-indigo-500 transition-colors">
                              <ExternalLink size={14} className="text-indigo-300 group-hover:text-white" />
                           </div>
                           <div className="flex-1 min-w-0">
                              <p className="text-[10px] font-black text-slate-200 truncate">{src.web.title}</p>
                              <p className="text-[8px] font-bold text-slate-500 truncate mt-0.5">{src.web.uri}</p>
                           </div>
                        </a>
                      ))}
                   </div>
                </div>

                <div className="p-8 bg-indigo-600 rounded-[2.5rem] shadow-3xl shadow-indigo-600/20">
                   <div className="flex items-center gap-4 mb-4">
                      <Sparkles size={24} className="text-indigo-200" />
                      <h5 className="text-[10px] font-black uppercase tracking-widest text-white">Professor insight</h5>
                   </div>
                   <p className="text-sm font-medium text-indigo-50 leading-relaxed italic">
                      "Examiners are increasingly focusing on <strong>Linear Array steering logic</strong> and <strong>Mechanical Index bioeffects</strong>. Ensure you know the difference between Stable and Transient cavitation."
                   </p>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
