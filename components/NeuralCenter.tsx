import React from 'react';
import { motion } from 'motion/react';
import { 
  Settings, User, Shield, Volume2, Database, 
  RefreshCw, CheckCircle2, ChevronRight, Zap,
  Activity, Sparkles, HardDrive
} from 'lucide-react';

interface NeuralCenterProps {
  selectedPersona: 'Harvey' | 'Professor' | 'Analyst';
  onPersonaChange: (persona: 'Harvey' | 'Professor' | 'Analyst') => void;
  vaultSyncStatus: 'synced' | 'pending' | 'offline';
  onSyncVault: () => void;
  storageEstimate: { usage: number; quota: number } | null;
  onNavigate: (view: 'pricing' | 'admin') => void;
}

export const NeuralCenter: React.FC<NeuralCenterProps> = ({
  selectedPersona,
  onPersonaChange,
  vaultSyncStatus,
  onSyncVault,
  storageEstimate,
  onNavigate
}) => {
  const [cacheSize, setCacheSize] = React.useState<string>('Calculating...');

  React.useEffect(() => {
    if (storageEstimate) {
      setCacheSize(`${(storageEstimate.usage / (1024 * 1024)).toFixed(1)} MB`);
    }
  }, [storageEstimate]);

  const personas = [
    { id: 'Harvey', name: 'Harvey', description: 'Dry wit, observational sonography tutor.', tone: 'Dry / Expert' },
    { id: 'Professor', name: 'The Professor', description: 'Deep, authoritative physics specialist.', tone: 'Formal / Deep' },
    { id: 'Analyst', name: 'Registry Analyst', description: 'Sharp, clinical, and data-driven insight.', tone: 'Sharp / Precise' }
  ] as const;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-12 space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600/20 rounded-2xl border border-indigo-500/20">
            <Settings className="text-indigo-400" size={24} />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter">Neural <span className="text-indigo-400">Center</span></h2>
        </div>
        <p className="text-slate-500 text-xs font-black uppercase tracking-[0.3em] ml-2">Phase 1: Foundation Management & Optimization</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Persona Selection */}
        <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 size={20} className="text-indigo-400" />
              <h3 className="text-lg font-black text-white uppercase italic tracking-tight">Audio Personas</h3>
            </div>
            <Sparkles size={16} className="text-indigo-500 animate-pulse" />
          </div>

          <div className="space-y-4">
            {personas.map((p) => (
              <button
                key={p.id}
                onClick={() => onPersonaChange(p.id)}
                className={`w-full p-6 rounded-3xl border-2 transition-all text-left flex items-start gap-4 group ${
                  selectedPersona === p.id 
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-xl translate-x-1' 
                  : 'bg-black/20 border-white/5 text-slate-400 hover:border-white/20'
                }`}
              >
                <div className={`p-3 rounded-2xl ${selectedPersona === p.id ? 'bg-white/20' : 'bg-white/5 border border-white/5'}`}>
                  <User size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className={`font-black uppercase tracking-tight ${selectedPersona === p.id ? 'text-white' : 'text-slate-200'}`}>{p.name}</p>
                    <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${selectedPersona === p.id ? 'bg-white/30' : 'bg-white/10'}`}>
                      {p.tone}
                    </span>
                  </div>
                  <p className={`text-[10px] font-bold leading-relaxed italic ${selectedPersona === p.id ? 'text-indigo-100' : 'text-slate-500'}`}>
                    {p.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* System & Storage */}
        <div className="space-y-8">
          <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 space-y-8">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Database size={20} className="text-emerald-400" />
                  <h3 className="text-lg font-black text-white uppercase italic tracking-tight">Vault Synchronization</h3>
                </div>
                <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                  vaultSyncStatus === 'synced' ? 'bg-emerald-500 text-white' : 
                  vaultSyncStatus === 'pending' ? 'bg-amber-500 text-white animate-pulse' : 'bg-rose-500 text-white'
                }`}>
                  {vaultSyncStatus}
                </div>
             </div>

             <div className="space-y-4">
                <div className="p-6 bg-black/40 rounded-3xl border border-white/5 flex items-center justify-between">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Last Neural Drop</p>
                      <p className="text-sm font-black text-white italic">Just Now</p>
                   </div>
                   <button 
                    onClick={onSyncVault}
                    className="p-4 bg-indigo-600 rounded-2xl text-white hover:scale-105 transition-all shadow-lg active:scale-95"
                   >
                      <RefreshCw size={20} />
                   </button>
                </div>

                <div className="p-6 bg-black/40 rounded-3xl border border-white/5 flex items-center gap-4">
                   <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                      <Shield size={20} className="text-emerald-400" />
                   </div>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                      All mnemonics and progress are end-to-end encrypted within the Neural Forge.
                   </p>
                </div>
             </div>
          </div>

          <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 space-y-6">
             <div className="flex items-center gap-3">
                <HardDrive size={20} className="text-indigo-400" />
                <h3 className="text-lg font-black text-white uppercase italic tracking-tight">Edge Caching</h3>
             </div>

             <div className="space-y-6">
                <div className="flex justify-between items-end">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Local Neural Mass</p>
                      <p className="text-2xl font-black text-white italic">{cacheSize}</p>
                   </div>
                </div>

                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                   <div 
                      className="h-full bg-gradient-to-r from-indigo-600 to-emerald-500"
                      style={{ width: storageEstimate ? `${(storageEstimate.usage / storageEstimate.quota) * 100}%` : '0%' }}
                   />
                </div>

                <div className="flex items-center gap-4">
                   <div className="flex-1 p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
                      <Activity size={16} className="text-amber-500" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sub-10ms Retrieval Active</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
      
      {/* Phase 2: Commercial & Administrative Hub */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-slate-900 border border-indigo-500/20 rounded-[2.5rem] space-y-6 group hover:border-indigo-500/40 transition-all">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-black text-white italic uppercase tracking-widest flex items-center gap-3">
              <Zap className="text-indigo-400" size={18} /> Neural Commercial Hub
            </h4>
            <div className="px-2 py-1 bg-indigo-500/20 rounded-md text-[8px] font-black text-indigo-400 uppercase tracking-widest">Growth_v2</div>
          </div>
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-[0.2em] leading-relaxed">
            Expand your neural bandwidth. Access pro-tier simulators, ElevenLabs high-fidelity narration, and clinical-grade mock exams.
          </p>
          <button 
            onClick={() => onNavigate('pricing')}
            className="w-full py-4 bg-indigo-600 rounded-2xl text-white font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:translate-x-1 transition-all shadow-lg"
          >
            Upgrade to Pro <ChevronRight size={16} />
          </button>
        </div>

        <div className="p-8 bg-slate-900 border border-rose-500/20 rounded-[2.5rem] space-y-6 group hover:border-rose-500/40 transition-all">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-black text-white italic uppercase tracking-widest flex items-center gap-3">
              <Shield className="text-rose-400" size={18} /> Admin Sentinel
            </h4>
            <div className="px-2 py-1 bg-rose-500/20 rounded-md text-[8px] font-black text-rose-400 uppercase tracking-widest">Master_IO</div>
          </div>
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-[0.2em] leading-relaxed">
            System health monitoring, user management, and revenue analytics for institutional administrators.
          </p>
          <button 
            onClick={() => onNavigate('admin')}
            className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-white/10 transition-all shadow-lg"
          >
            Open Sentinel <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="p-10 bg-indigo-600 rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
         <div className="absolute inset-0 bg-white/10 animate-pulse opacity-20 pointer-events-none" />
         <div className="p-6 bg-white/20 rounded-[2rem] shadow-2xl">
            <Zap size={48} />
         </div>
         <div className="flex-1 space-y-2 text-center md:text-left">
            <h4 className="text-2xl font-black uppercase italic tracking-tight leading-none">Initialize Registry Sync</h4>
            <p className="text-indigo-100 text-sm font-medium leading-relaxed italic opacity-80">
              Update the local neural engine with the latest SPI blueprint regulations and deconstructions.
            </p>
         </div>
         <button className="px-10 py-5 bg-white text-indigo-600 rounded-full font-black uppercase text-xs tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all">
            Update Engine
         </button>
      </div>
    </div>
  );
};
