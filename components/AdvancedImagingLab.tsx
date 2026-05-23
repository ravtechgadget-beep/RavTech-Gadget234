
import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Activity, Zap, Layers, Droplet, Search, Waves, Calculator, AlertCircle, Info } from 'lucide-react';

interface AdvancedImagingLabProps {
  topic: string;
}

export const AdvancedImagingLab: React.FC<AdvancedImagingLabProps> = ({ topic }) => {
  const [activeModality, setActiveModality] = useState<'harmonics' | 'contrast' | 'elastography'>('harmonics');
  const [power, setPower] = useState(70);
  const [mi, setMi] = useState(0.8);
  const [ti, setTi] = useState(0.4);

  const isHarmonicsTopic = true; // Make it universal for this lab
  const isElastographyTopic = true;
  const isContrastTopic = true;

  return (
    <div className="glass-panel p-6 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border border-white/10 space-y-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <Sparkles size={240} />
      </div>

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-600 rounded-3xl shadow-2xl shadow-indigo-500/40">
              <Sparkles className="text-white" size={32} />
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighterleading-none">Advanced Modality Lab</h2>
              <p className="text-indigo-400 font-black uppercase text-[10px] tracking-[0.4em] mt-1">Registry Alignment: Phase 3 Clinical Suite</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 bg-black/40 p-2 rounded-full border border-white/5">
          {(['harmonics', 'contrast', 'elastography'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setActiveModality(m)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                activeModality === m ? 'bg-white text-black shadow-lg' : 'text-slate-500 hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-12 relative z-10">
        <div className="space-y-10">
          {/* Main Controls */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.4em]">System Parameters</h3>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">MI:</span>
                    <span className={`text-[10px] font-black ${mi > 1.0 ? 'text-rose-500' : 'text-emerald-500'}`}>{mi.toFixed(1)}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">TI:</span>
                    <span className={`text-[10px] font-black ${ti > 0.8 ? 'text-rose-500' : 'text-emerald-500'}`}>{ti.toFixed(1)}</span>
                 </div>
              </div>
            </div>

            <div className="space-y-6">
               <div className="space-y-3">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-black text-white uppercase tracking-widest">Acoustic Power</label>
                    <span className="text-xs font-black text-indigo-400">{power}%</span>
                  </div>
                  <input 
                    type="range" 
                    value={power}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setPower(val);
                      setMi(0.2 + (val / 100) * 0.8);
                      setTi(0.1 + (val / 100) * 1.1);
                    }}
                    className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-indigo-500"
                  />
               </div>
            </div>
          </div>

          {/* Specific Modality Controls */}
          <div className="p-8 bg-black/40 rounded-[2.5rem] border border-white/5 space-y-8 min-h-[300px]">
            {activeModality === 'harmonics' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-center lg:text-left">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-black text-white italic tracking-tight uppercase">Harmonic Propagation</h4>
                  <Waves className="text-cyan-400" size={24} />
                </div>
                <p className="text-xs font-medium text-slate-400 leading-relaxed uppercase tracking-widest">
                  Tissue harmonics utilize the non-linear propagation of sound through tissue. By filtering for the second harmonic frequency, side-lobe artifacts are suppressed and lateral resolution is significantly increased.
                </p>
                <div className="pt-6 border-t border-white/5 space-y-4">
                   <div className="flex items-center gap-4 text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">
                      <Zap size={14} /> THI Mode: Pulse Inversion Active
                   </div>
                   <div className="flex items-center gap-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                      <Calculator size={14} /> Fundamental Freq: 3.5 MHz | 2nd Harmonic: 7.0 MHz
                   </div>
                </div>
              </motion.div>
            )}

            {activeModality === 'contrast' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-center lg:text-left">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-black text-white italic tracking-tight uppercase">Contrast Enhancement</h4>
                  <Droplet className="text-rose-400" size={24} />
                </div>
                <p className="text-xs font-medium text-slate-400 leading-relaxed uppercase tracking-widest">
                  Leveraging microbubbles to enhance acoustic impedance mismatch. Ideal for heart chamber opacification and identifying focal liver lesions through non-linear resonance.
                </p>
                <div className="pt-6 border-t border-white/5 space-y-4">
                   <button className="px-8 py-3 bg-rose-500 text-white rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl shadow-rose-500/20">
                      Inject Optison Bolus
                   </button>
                   <p className="text-[9px] font-bold text-rose-500/60 uppercase tracking-widest italic flex items-center gap-2 justify-center lg:justify-start">
                      <AlertCircle size={12} /> Low MI Imaging required to prevent bubble rupture
                   </p>
                </div>
              </motion.div>
            )}

            {activeModality === 'elastography' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-center lg:text-left">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-black text-white italic tracking-tight uppercase">Strain & Shear Wave</h4>
                  <Activity className="text-emerald-400" size={24} />
                </div>
                <p className="text-xs font-medium text-slate-400 leading-relaxed uppercase tracking-widest">
                  Clinical measurement of tissue stiffness. Harder tissues (often malignant) exhibit less strain under pressure. Shear wave elastography provides quantitative Young's Modulus values (kPa).
                </p>
                <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                   <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                      <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Stiffness Index</span>
                      <span className="block text-xl font-black text-emerald-400 italic">42 kPa</span>
                   </div>
                   <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                      <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Strain Ratio</span>
                      <span className="block text-xl font-black text-rose-400 italic">3.2:1</span>
                   </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Visual Engine Output */}
        <div className="space-y-8 flex flex-col">
          <div className="flex-1 p-8 bg-slate-950 rounded-[3rem] border border-white/10 relative overflow-hidden flex items-center justify-center min-h-[450px]">
            <div className="absolute inset-0 neural-grid opacity-10 pointer-events-none" />
            
            {/* The Simulation Stage */}
            <div className="relative w-full aspect-square max-w-[400px]">
               <div className="absolute inset-0 rounded-full border-4 border-white/20 shadow-[0_0_80px_rgba(99,102,241,0.1)] overflow-hidden bg-slate-900 flex items-center justify-center">
                  
                  {/* Scanning Cone */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-indigo-500/5 origin-top scale-x-50 skew-y-12" />

                  {/* Modality Specific Visuals */}
                  {activeModality === 'harmonics' && (
                    <motion.div 
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 bg-cyan-500/10 mix-blend-screen"
                    />
                  )}

                  {activeModality === 'contrast' && (
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      {[...Array(20)].map((_, i) => (
                        <motion.div 
                          key={i}
                          animate={{ 
                            x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                            y: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                            scale: [0, 1.2, 0],
                            opacity: [0, 0.8, 0]
                          }}
                          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
                          className="absolute w-2 h-2 bg-rose-400 rounded-full blur-[2px]"
                        />
                      ))}
                    </motion.div>
                  )}

                  {/* Simulated Liver Lesion */}
                  <motion.div 
                    animate={{ 
                      scale: activeModality === 'elastography' ? [1, 1.02, 1] : 1,
                      brightness: activeModality === 'harmonics' ? 1.5 : 1
                    }}
                    className={`relative w-32 h-32 rounded-full border-2 border-white/20 transition-all duration-700 ${
                      activeModality === 'elastography' 
                        ? 'bg-gradient-to-br from-rose-500/60 via-emerald-500/40 to-blue-500/40 shadow-[0_0_40px_rgba(244,63,94,0.3)]' 
                        : 'bg-slate-800'
                    }`}
                  >
                     <div className="absolute inset-0 flex items-center justify-center flex-col gap-1">
                        <span className="text-[8px] font-black text-white/40 uppercase tracking-widest italic">Lesion_0a1</span>
                        {activeModality === 'harmonics' && <span className="text-[10px] font-black text-cyan-400">Superior Edge</span>}
                     </div>
                  </motion.div>
               </div>

               {/* Overlay Data */}
               <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/80 backdrop-blur-md rounded-2xl border border-white/10">
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
                     <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Live Neural Feed</span>
                     <span className="text-white">FPS: 42</span>
                  </div>
               </div>
            </div>
          </div>

          <div className="p-8 bg-indigo-600 rounded-[2rem] text-white flex items-center gap-6 group hover:scale-[1.02] transition-transform shadow-2xl shadow-indigo-600/40">
             <div className="p-4 bg-white/20 rounded-2xl"><Info size={24} /></div>
             <div className="flex-1 space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest italic">Clinical Insight</p>
                <p className="text-xs font-medium leading-relaxed opacity-90">
                  {activeModality === 'harmonics' && "Harmonics should be disabled in very shallow focal zones to preserve axial resolution."}
                  {activeModality === 'contrast' && "Bubble destruction occurs at high MI; pulse inversion maintains bubble integrity while filtering signal."}
                  {activeModality === 'elastography' && "Compression-based strain relies on external pressure; Shear-wave is operator-independent."}
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
