
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Focus, Eye, EyeOff, Info, Layers, Crosshair, Map } from 'lucide-react';

interface AnatomyRegion {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const regions: AnatomyRegion[] = [
  { 
    id: 'liver', 
    name: 'Liver (Right Lobe)', 
    description: 'Homogeneous echotexture. Normal size is typically <15cm in mid-clavicular line.', 
    x: 20, y: 30, width: 60, height: 40 
  },
  { 
    id: 'gallbladder', 
    name: 'Gallbladder', 
    description: 'Anechoic pear-shaped structure. Wall should be <3mm.', 
    x: 45, y: 75, width: 15, height: 10 
  },
  { 
    id: 'portal_vein', 
    name: 'Portal Vein', 
    description: 'Highly echogenic walls (Glisson\'s capsule). Flow should be hepatopetal.', 
    x: 60, y: 55, width: 12, height: 8 
  },
  { 
    id: 'kidney', 
    name: 'Right Kidney', 
    description: 'Heterogeneous. Cortex is hypoechoic compared to liver. Central sinus is echogenic.', 
    x: 75, y: 65, width: 20, height: 25 
  }
];

export const AnatomyLab: React.FC = () => {
  const [showOverlays, setShowOverlays] = useState(false);
  const [hoveredRegion, setHoveredRegion] = useState<AnatomyRegion | null>(null);
  const [activeScan, setActiveScan] = useState('RUQ');

  return (
    <div className="glass-panel p-6 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border border-white/10 space-y-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <Map size={240} />
      </div>

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-emerald-600 rounded-3xl shadow-2xl shadow-emerald-500/40">
              <Focus className="text-white" size={32} />
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">Neural Anatomy Link</h2>
              <p className="text-emerald-400 font-black uppercase text-[10px] tracking-[0.4em] mt-1">Registry Alignment: Section 4 - Abdominal Sonography</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 bg-black/40 p-2 rounded-full border border-white/5">
          <button 
            onClick={() => setShowOverlays(!showOverlays)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              showOverlays ? 'bg-white text-black shadow-lg' : 'text-slate-500 hover:text-white'
            }`}
          >
            {showOverlays ? <Eye size={14} /> : <EyeOff size={14} />}
            {showOverlays ? 'Overlay Active' : 'Pure Scan Mode'}
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-12 relative z-10">
        <div className="space-y-10">
          <div className="p-8 bg-black/40 rounded-[2.5rem] border border-white/5 space-y-6">
            <div className="flex items-center gap-3">
              <Layers className="text-emerald-500" size={20} />
              <h3 className="text-sm font-black text-white uppercase tracking-[0.3em]">Scanner Diagnostics</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Current Protocol</span>
                <span className="block text-sm font-black text-white italic uppercase">{activeScan} Complete</span>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Transducer</span>
                <span className="block text-sm font-black text-white italic uppercase">C5-1 Curvilinear</span>
              </div>
            </div>
            <p className="text-[10px] font-medium text-slate-400 leading-relaxed uppercase tracking-widest">
              Hover over the ultrasound image to identify key anatomical markers and registry-critical landmarks. 
              Toggle "Overlay Active" to visualize structure boundaries.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {hoveredRegion ? (
              <motion.div 
                key={hoveredRegion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-8 bg-emerald-600 rounded-[2.5rem] text-white space-y-4 shadow-2xl shadow-emerald-600/40"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-black italic uppercase tracking-tighter">{hoveredRegion.name}</h4>
                  <div className="p-2 bg-white/20 rounded-lg"><Info size={16} /></div>
                </div>
                <p className="text-xs font-medium leading-relaxed opacity-90 uppercase tracking-widest">
                  {hoveredRegion.description}
                </p>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[8px] font-black uppercase tracking-[0.2em]">Clinical Significance: High</span>
                  <button className="text-[8px] font-black uppercase tracking-[0.2em] underline underline-offset-4">Read Full Thesis</button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 border border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-4 h-[250px]"
              >
                <Crosshair className="text-slate-800" size={48} />
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Initialize Scan Targeting</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col">
          <div className="flex-1 p-8 bg-slate-950 rounded-[3rem] border border-white/10 relative overflow-hidden flex items-center justify-center min-h-[450px]">
            <div className="absolute inset-0 neural-grid opacity-10 pointer-events-none" />
            
            {/* Simulated Scan Screen */}
            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border-2 border-white/5 shadow-2xl">
              {/* This will eventually be a high-res image. For now, a clinical simulation using CSS and SVG */}
              <div className="absolute inset-0 grayscale opacity-40">
                 {/* Simulated Speckle/Noise */}
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay opacity-30" />
                 
                 {/* Simulated Liver Parenchyma */}
                 <div className="absolute top-10 left-10 w-[70%] h-[60%] bg-white/10 blur-[40px] rounded-full skew-x-12 rotate-12" />
                 
                 {/* Gallbladder */}
                 <div className="absolute top-[60%] left-[40%] w-[15%] h-[15%] bg-black/80 blur-[2px] rounded-full" />
                 
                 {/* Kidney */}
                 <div className="absolute top-[50%] left-[70%] w-[25%] h-[40%] bg-white/5 border border-white/5 blur-[20px] rounded-[100px] -rotate-45" />

                 {/* Scan Lines Animation */}
                 <motion.div 
                   animate={{ opacity: [0.1, 0.2, 0.1] }}
                   transition={{ duration: 0.1, repeat: Infinity }}
                   className="absolute inset-0 pointer-events-none"
                   style={{
                     background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.02) 2px)'
                   }}
                 />
              </div>

              {/* Interaction Overlays */}
              <svg className="absolute inset-0 w-full h-full cursor-crosshair">
                {regions.map((region) => (
                  <g 
                    key={region.id}
                    onMouseEnter={() => setHoveredRegion(region)}
                    onMouseLeave={() => setHoveredRegion(null)}
                  >
                    {/* Visual Boundary (Visible when showOverlays is true) */}
                    <motion.rect 
                      initial={false}
                      animate={{ opacity: showOverlays || hoveredRegion?.id === region.id ? 0.4 : 0 }}
                      x={`${region.x}%`}
                      y={`${region.y}%`}
                      width={`${region.width}%`}
                      height={`${region.height}%`}
                      className={`fill-emerald-500/20 stroke-emerald-500/50 stroke-2 transition-all ${hoveredRegion?.id === region.id ? 'fill-emerald-500/40 scale-105' : ''}`}
                    />
                    
                    {/* Invisible Hitbox */}
                    <rect 
                      x={`${region.x}%`}
                      y={`${region.y}%`}
                      width={`${region.width}%`}
                      height={`${region.height}%`}
                      className="fill-transparent"
                    />
                  </g>
                ))}
              </svg>

              {/* Scanning Artifacts Overlay */}
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
              
              {/* On-Screen Data */}
              <div className="absolute top-4 left-4 font-mono text-[9px] text-white/40 space-y-1">
                <p>GEN: 100% / FR: 42Hz</p>
                <p>D: 15.0cm / G: 72%</p>
              </div>
              
              <div className="absolute bottom-4 right-4 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[10px] text-white/50 tracking-tighter">LIVE SESSION: NEURAL_LINK_STATION_04</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-3 gap-4">
             {['RUQ', 'PELVIS', 'SMALL PARTS'].map(scan => (
               <button
                 key={scan}
                 onClick={() => setActiveScan(scan)}
                 className={`py-4 rounded-2xl border text-[8px] font-black uppercase tracking-widest transition-all ${
                   activeScan === scan ? 'bg-white text-black border-white shadow-xl scale-105' : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10'
                 }`}
               >
                 {scan} Scan
               </button>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};
