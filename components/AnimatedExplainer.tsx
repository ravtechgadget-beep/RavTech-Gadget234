import React from 'react';
import { motion } from 'motion/react';
import { Zap, Activity, Waves, Target, ArrowRight } from 'lucide-react';

interface ExplainerProps {
  topic: string;
  lessonId: string;
}

export const AnimatedExplainer: React.FC<ExplainerProps> = ({ topic, lessonId }) => {
  const id = lessonId.toLowerCase();

  const renderExplainer = () => {
    const grid = (
      <>
        <div className="absolute inset-0 neural-grid opacity-10" />
        <div className="absolute inset-0 neural-grid opacity-[0.02] scale-150 rotate-12" />
      </>
    );

    if (id.includes('wave') || id.includes('physics')) {
      return (
        <div className="relative h-64 w-full flex items-center justify-center overflow-hidden tech-card rounded-[2.5rem]">
          {grid}
          <div className="flex gap-1 items-center">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scaleY: [1, 2.5, 1],
                  opacity: [0.3, 1, 0.3],
                  backgroundColor: ['#6366f1', '#a855f7', '#6366f1']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
                className="w-2 h-12 rounded-full bg-indigo-500"
              />
            ))}
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400/60">
            Longitudinal Wave Propagation
          </div>
        </div>
      );
    }

    if (id.includes('refl') || id.includes('atten') || id.includes('media')) {
      return (
        <div className="relative h-64 w-full flex items-center justify-center overflow-hidden tech-card rounded-[2.5rem]">
          {grid}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/10" />
          
          {/* Incident Beam */}
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
            className="absolute left-[20%] w-32 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
          />

          {/* Reflected Beam */}
          <motion.div
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: -200, opacity: 0.5 }}
            transition={{ duration: 1, delay: 1, repeat: Infinity, repeatDelay: 1 }}
            className="absolute left-[20%] w-32 h-1 bg-gradient-to-l from-indigo-400 via-indigo-500 to-transparent"
          />

          {/* Transmitted Beam */}
          <motion.div
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 200, opacity: 0.3 }}
            transition={{ duration: 1, delay: 1, repeat: Infinity, repeatDelay: 1 }}
            className="absolute left-[50%] w-32 h-1 bg-gradient-to-r from-indigo-400/50 via-indigo-500/20 to-transparent"
          />

          <div className="absolute top-1/2 left-[52%] -translate-y-1/2 text-[8px] font-black uppercase tracking-widest text-slate-500">Boundary</div>
        </div>
      );
    }

    if (id.includes('doppler')) {
      return (
        <div className="relative h-64 w-full flex items-center justify-center overflow-hidden tech-card rounded-[2.5rem]">
          {grid}
          
          <motion.div
            animate={{ x: [-200, 200] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <div className="w-12 h-12 bg-rose-500/20 rounded-full border-2 border-rose-500 flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.3)]">
              <Activity className="text-rose-500" />
            </div>
            
            {/* Frequency Waves */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                className="absolute inset-0 border border-rose-500/30 rounded-full"
              />
            ))}
          </motion.div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.4em] text-rose-400/60">
            Frequency Shift Dynamics
          </div>
        </div>
      );
    }

    if (id.includes('pulse') || id.includes('13us')) {
      return (
        <div className="relative h-64 w-full flex items-center justify-center overflow-hidden tech-card rounded-[2.5rem]">
          {grid}
          
          <div className="absolute left-10 w-12 h-24 bg-indigo-600/20 border-2 border-indigo-500 rounded-xl flex items-center justify-center">
            <Zap className="text-indigo-400" size={20} />
          </div>

          <motion.div
            initial={{ x: -150 }}
            animate={{ x: 150 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-4 bg-indigo-500 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.6)]"
          />

          <div className="absolute right-10 w-4 h-32 bg-white/5 border-l border-white/10" />
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400/60">
            Pulse-Echo Timing Cycle
          </div>
        </div>
      );
    }

    if (id.includes('res')) {
      return (
        <div className="relative h-64 w-full flex items-center justify-center overflow-hidden tech-card rounded-[2.5rem]">
          {grid}
          <div className="flex gap-20">
            <div className="flex flex-col items-center gap-4">
              <div className="text-[8px] font-black uppercase tracking-widest text-indigo-400">Axial</div>
              <div className="relative h-32 w-1 bg-white/10">
                <motion.div
                  animate={{ y: [0, 80, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="text-[8px] font-black uppercase tracking-widest text-rose-400">Lateral</div>
              <div className="relative w-32 h-1 bg-white/10 mt-16">
                <motion.div
                  animate={{ x: [0, 80, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-4 bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.5)]"
                />
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
            Spatial Resolution Mapping
          </div>
        </div>
      );
    }

    if (id.includes('artifact')) {
      return (
        <div className="relative h-64 w-full flex items-center justify-center overflow-hidden tech-card rounded-[2.5rem]">
          {grid}
          <div className="relative">
            <div className="w-16 h-16 bg-white/20 rounded-full border border-white/40" />
            <motion.div
              animate={{ 
                opacity: [0, 0.5, 0],
                y: [0, 40],
                scale: [1, 0.9]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute top-0 left-0 w-16 h-16 bg-white/10 rounded-full border border-white/20 blur-sm"
            />
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.4em] text-amber-400/60">
            Acoustic Artifact Simulation
          </div>
        </div>
      );
    }

    if (id.includes('safety') || id.includes('alara')) {
      return (
        <div className="relative h-64 w-full flex items-center justify-center overflow-hidden tech-card rounded-[2.5rem]">
          {grid}
          <div className="flex gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">TI</div>
              <motion.div 
                animate={{ height: ['20%', '60%', '20%'] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-4 bg-amber-500/40 rounded-t-lg border-t border-amber-500" 
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">MI</div>
              <motion.div 
                animate={{ height: ['40%', '80%', '40%'] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-4 bg-rose-500/40 rounded-t-lg border-t border-rose-500" 
              />
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400/60">
            Bioeffect Index Monitoring
          </div>
        </div>
      );
    }

    if (id.includes('receiver') || id.includes('instrument')) {
      return (
        <div className="relative h-64 w-full flex items-center justify-center overflow-hidden tech-card rounded-[2.5rem]">
          {grid}
          <div className="flex gap-4">
            {['A', 'C', 'C', 'D', 'P'].map((letter, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.1, 1],
                  borderColor: ['rgba(255,255,255,0.1)', 'rgba(99,102,241,0.5)', 'rgba(255,255,255,0.1)']
                }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-black text-indigo-400"
              >
                {letter}
              </motion.div>
            ))}
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
            Receiver Chain Processing
          </div>
        </div>
      );
    }

    // Default: Neural Network / Data Flow explainer
    return (
      <div className="relative h-64 w-full flex items-center justify-center overflow-hidden tech-card rounded-[2.5rem]">
        {grid}
        <div className="relative flex gap-12">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="relative">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Target className="text-indigo-400/40" size={24} />
              </div>
              {i < 2 && (
                <motion.div
                  animate={{ left: [64, 112] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-1 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                />
              )}
            </div>
          ))}
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400/60">
          Neural Concept Synthesis
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full space-y-6"
    >
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
            <Activity size={16} className="text-indigo-400" />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Animated Explainer</h4>
            <p className="text-[8px] font-bold uppercase tracking-widest text-slate-500">Visualizing: {topic}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500/60">Simulation Active</span>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-indigo-500/10 blur-xl rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <motion.div 
          animate={{ 
            boxShadow: ['0 0 0px rgba(99,102,241,0)', '0 0 20px rgba(99,102,241,0.1)', '0 0 0px rgba(99,102,241,0)']
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="relative"
        >
          {renderExplainer()}
        </motion.div>
      </div>

      <div className="px-4 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
        <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-slate-600">Cinematic Heuristic Reconstruction</p>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
      </div>
    </motion.div>
  );
};

