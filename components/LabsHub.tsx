
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, Activity, Radio, Target, Layers, 
  Maximize2, Calculator, ArrowRight, Sparkles,
  Search, Filter, Play, Info, Database, ShieldCheck, Clock
} from 'lucide-react';
import { PhysicsLab } from './PhysicsLab';
import { TransducerLab } from './TransducerLab';
import { PulsedWaveLab } from './PulsedWaveLab';
import { DopplerLab } from './DopplerLab';
import { ArtifactExplorer } from './ArtifactExplorer';
import { ResolutionLab } from './ResolutionLab';
import { SafetyLab } from './SafetyLab';
import { HemodynamicsLab } from './HemodynamicsLab';
import { InstrumentationLab } from './InstrumentationLab';
import { MathematicsLab } from './MathematicsLab';
import { AttenuationLab } from './AttenuationLab';
import { IntensityLab } from './IntensityLab';
import { DigitalMemoryLab } from './DigitalMemoryLab';
import { MediaInteractionLab } from './MediaInteractionLab';
import { BioeffectsLab } from './BioeffectsLab';
import { BeamFormingLab } from './BeamFormingLab';
import { ColorDopplerLab } from './ColorDopplerLab';
import { HarmonicsLab } from './HarmonicsLab';
import { ArtifactPhysicsLab } from './ArtifactPhysicsLab';
import { DopplerEquationLab } from './DopplerEquationLab';
import { ArtifactGauntlet } from './ArtifactGauntlet';
import { DecibelMathLab } from './DecibelMathLab';
import { NyquistLimitLab } from './NyquistLimitLab';
import { RangeResolutionLab } from './RangeResolutionLab';
import { TemporalResolutionLab } from './TemporalResolutionLab';
import { AdvancedImagingLab } from './AdvancedImagingLab';
import { PhysicsCalculator } from './PhysicsCalculator';
import { ClinicalScenarioLab } from './ClinicalScenarioLab';

import { AnatomyLab } from './AnatomyLab';

const labs = [
  { id: 'physics', title: 'Acoustic Field Simulator', icon: Activity, component: PhysicsLab, category: 'Physics', description: 'Visualize wave parameters, frequency, and amplitude in soft tissue.' },
  { id: 'transducer', title: 'Transducer Array Lab', icon: Radio, component: TransducerLab, category: 'Hardware', description: 'Explore linear, phased, and convex arrays with real-time beam steering.' },
  { id: 'doppler', title: 'Spectral Doppler Lab', icon: Zap, component: DopplerLab, category: 'Doppler', description: 'Master the Doppler equation, angle correction, and Nyquist limits.' },
  { id: 'anatomy', title: 'Neural Anatomy Link', icon: Target, component: AnatomyLab, category: 'Anatomy', description: 'Interactive high-res scan exploration with anatomical overlays.' },
  { id: 'attenuation', title: 'Attenuation Matrix', icon: Layers, component: AttenuationLab, category: 'Physics', description: 'Study absorption, reflection, and scattering across different media.' },
  { id: 'intensity', title: 'Intensity & Bioeffects', icon: Activity, component: IntensityLab, category: 'Safety', description: 'Analyze SPTA, SPTP, and other intensity parameters for safety.' },
  { id: 'memory', title: 'Digital Memory Lab', icon: Database, component: DigitalMemoryLab, category: 'Hardware', description: 'Explore bit depth, pixel density, and contrast resolution.' },
  { id: 'media', title: 'Media Interaction', icon: Target, component: MediaInteractionLab, category: 'Physics', description: 'Visualize reflection, refraction, and Snell\'s Law in action.' },
  { id: 'bioeffects', title: 'Bioeffects Simulator', icon: ShieldCheck, component: BioeffectsLab, category: 'Safety', description: 'Analyze TI and MI indices and their relation to ultrasound safety.' },
  { id: 'beamforming', title: 'Beam Forming Lab', icon: Layers, component: BeamFormingLab, category: 'Hardware', description: 'Explore apodization, dynamic aperture, and focusing techniques.' },
  { id: 'colordoppler', title: 'Color Doppler Physics', icon: Zap, component: ColorDopplerLab, category: 'Doppler', description: 'Master color maps, velocity scales, and aliasing in color flow.' },
  { id: 'harmonics', title: 'Harmonic Imaging', icon: Sparkles, component: HarmonicsLab, category: 'Imaging', description: 'Visualize non-linear propagation and tissue harmonic imaging.' },
  { id: 'artifact-physics', title: 'Artifact Physics', icon: Sparkles, component: ArtifactPhysicsLab, category: 'Imaging', description: 'Deep dive into the physics behind reverberation, comet tail, and more.' },
  { id: 'doppler-eq', title: 'Doppler Equation', icon: Zap, component: DopplerEquationLab, category: 'Doppler', description: 'Interactive breakdown of the Doppler equation and its variables.' },
  { id: 'decibel', title: 'Decibel Math Lab', icon: Calculator, component: DecibelMathLab, category: 'Basics', description: 'Master the logarithmic scale of decibels for intensity and power.' },
  { id: 'nyquist', title: 'Nyquist Limit Lab', icon: Activity, component: NyquistLimitLab, category: 'Doppler', description: 'Visualize aliasing and how PRF affects the Nyquist limit.' },
  { id: 'range-res', title: 'Range Resolution', icon: Target, component: RangeResolutionLab, category: 'Imaging', description: 'Explore axial resolution and the impact of pulse duration.' },
  { id: 'temporal-res', title: 'Temporal Resolution', icon: Clock, component: TemporalResolutionLab, category: 'Imaging', description: 'Analyze frame rate, depth, and sector width tradeoffs.' },
  { id: 'pulse', title: 'Pulsed Wave Dynamics', icon: Maximize2, component: PulsedWaveLab, category: 'Physics', description: 'Analyze SPL, PD, and the 13 microsecond rule for depth.' },
  { id: 'resolution', title: 'Resolution Lab', icon: Target, component: ResolutionLab, category: 'Imaging', description: 'Compare axial, lateral, and elevational resolution tradeoffs.' },
  { id: 'artifact', title: 'Artifact Sandbox', icon: Sparkles, component: ArtifactExplorer, category: 'Imaging', description: 'Identify and resolve common ultrasound artifacts in real-time.' },
  { id: 'hemo', title: 'Hemodynamics Lab', icon: Activity, component: HemodynamicsLab, category: 'Doppler', description: 'Visualize laminar vs. turbulent flow and Bernoulli principles.' },
  { id: 'instrument', title: 'Instrumentation Lab', icon: Calculator, component: InstrumentationLab, category: 'Hardware', description: 'Master the receiver chain: amplification, compensation, and more.' },
  { id: 'safety', title: 'Bioeffects & Safety', icon: Info, component: SafetyLab, category: 'Safety', description: 'Understand Thermal and Mechanical Indices (TI/MI) and ALARA.' },
  { id: 'math', title: 'Mathematics Hub', icon: Calculator, component: MathematicsLab, category: 'Basics', description: 'Practice metric conversions, logarithms, and scientific notation.' },
  { id: 'gauntlet', title: 'The Artifact Gauntlet', icon: ShieldCheck, component: ArtifactGauntlet, category: 'Challenges', description: 'Master knobology in this high-stakes image clean-up challenge.' },
  { id: 'advanced', title: 'Advanced Imaging', icon: Sparkles, component: AdvancedImagingLab, category: 'Imaging', description: 'Explore harmonics, contrast agents, and elastography.' },
  { id: 'scenarios', title: 'Clinical Case Study', icon: Target, component: ClinicalScenarioLab, category: 'Anatomy', description: 'Test your diagnostic logic with real-world clinical ultrasound cases.' },
  { id: 'calculator', title: 'Physics Calculator', icon: Calculator, category: 'Tools', description: 'Solve complex equations for 13us, Snell\'s Law, and Axial Res.' },
  { id: 'radio', title: 'Neural Radio', icon: Radio, category: 'Tools', description: 'Synchronize your neural pathways with SPI Physics beats.' }
];

const categories = ['All', 'Anatomy', 'Physics', 'Hardware', 'Doppler', 'Imaging', 'Safety', 'Basics', 'Challenges', 'Tools'];

interface LabsHubProps {
  onOpenRadio?: () => void;
  initialLabId?: string | null;
  onClearInitialLab?: () => void;
  onBackToLesson?: () => void;
}

export const LabsHub: React.FC<LabsHubProps> = ({ onOpenRadio, initialLabId, onClearInitialLab, onBackToLesson }) => {
  const [activeLabId, setActiveLabId] = useState<string | null>(initialLabId || null);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-launch initial lab if provided
  React.useEffect(() => {
    if (initialLabId) {
      setActiveLabId(initialLabId);
      if (onClearInitialLab) onClearInitialLab();
    }
  }, [initialLabId, onClearInitialLab]);

  const filteredLabs = labs.filter(lab => {
    const matchesFilter = filter === 'All' || lab.category === filter;
    const matchesSearch = lab.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lab.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const activeLab = labs.find(l => l.id === activeLabId);

  return (
    <div className="space-y-8 md:space-y-16 animate-in fade-in duration-1000 px-4 md:px-0">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
        <div className="space-y-2 md:space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 md:p-3 bg-indigo-600 rounded-xl md:rounded-2xl text-white shadow-xl shadow-indigo-500/20">
              <Activity size={16} md:size={24} />
            </div>
            <h2 className="text-2xl md:text-7xl font-black tracking-tighter uppercase italic text-white">Interaction Lab</h2>
          </div>
          {onBackToLesson && (
            <button 
              onClick={onBackToLesson}
              className="flex items-center gap-2 text-[8px] md:text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-white transition-colors group mb-2 md:mb-4"
            >
              <ArrowRight size={12} className="rotate-180" /> Return to Neural Sequence
            </button>
          )}
          <p className="text-slate-500 font-bold uppercase text-[9px] md:text-xs tracking-[0.2em] md:tracking-[0.4em] max-w-xl leading-relaxed">
            A centralized hub for all interactive ultrasound physics simulations and diagnostic tools.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 md:gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 md:px-6 py-2 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                filter === cat ? 'bg-white text-black shadow-xl' : 'bg-white/5 text-slate-500 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-4 md:left-6 flex items-center pointer-events-none text-slate-500">
          <Search size={14} md:size={18} />
        </div>
        <input 
          type="text"
          placeholder="Search for a specific lab or concept..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-[2rem] py-4 md:py-6 pl-10 md:pl-16 pr-6 md:pr-8 text-xs md:text-sm text-white font-bold placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-all shadow-inner"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
        {filteredLabs.map((lab, idx) => (
          <motion.button
            key={lab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => {
              if (lab.id === 'radio' && onOpenRadio) {
                onOpenRadio();
              } else {
                setActiveLabId(lab.id);
              }
            }}
            className="group relative tech-card rounded-[2rem] md:rounded-[3.5rem] p-6 md:p-10 text-left border-b-4 border-indigo-500/20 hover:scale-[1.02] transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 neural-grid opacity-[0.05] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-0 right-0 p-8 md:p-12 opacity-5 group-hover:scale-125 transition-transform duration-700">
              <lab.icon size={100} md:size={160} />
            </div>
            
            <div className="relative z-10 space-y-6 md:space-y-10">
              <div className="flex items-center justify-between">
                <div className={`p-3 md:p-5 rounded-2xl md:rounded-3xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-2xl`}>
                  <lab.icon size={20} md:size={32} />
                </div>
                <span className="micro-label opacity-40">{lab.category}</span>
              </div>
              
              <div>
                <h3 className="text-xl md:text-3xl font-black text-white tracking-tighter uppercase italic mb-2 md:mb-4 leading-none">{lab.title}</h3>
                <p className="text-[9px] md:text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-[0.2em]">{lab.description}</p>
              </div>

              <div className="flex items-center gap-3 text-indigo-400 text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] pt-6 md:pt-8 border-t border-white/5">
                Initialize Simulation <ArrowRight size={12} md:size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeLabId && activeLab && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              className="max-w-6xl w-full relative"
            >
              <button 
                onClick={() => setActiveLabId(null)}
                className="absolute -top-16 right-0 md:-right-16 p-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all border border-white/10"
              >
                <Maximize2 size={24} className="rotate-45" />
              </button>
              
              <div className="animate-in zoom-in duration-700">
                {activeLab.id === 'physics' && <PhysicsLab topic="General Physics" />}
                {activeLab.id === 'anatomy' && <AnatomyLab />}
                {activeLab.id === 'scenarios' && <ClinicalScenarioLab />}
                {activeLab.id === 'gauntlet' && <ArtifactGauntlet />}
                {activeLab.id === 'transducer' && <TransducerLab />}
                {activeLab.id === 'doppler' && <DopplerLab />}
                {activeLab.id === 'attenuation' && <AttenuationLab topic="General Attenuation" />}
                {activeLab.id === 'intensity' && <IntensityLab topic="Ultrasound Intensities" />}
                {activeLab.id === 'memory' && <DigitalMemoryLab />}
                {activeLab.id === 'media' && <MediaInteractionLab />}
                {activeLab.id === 'bioeffects' && <BioeffectsLab />}
                {activeLab.id === 'beamforming' && <BeamFormingLab />}
                {activeLab.id === 'colordoppler' && <ColorDopplerLab />}
                {activeLab.id === 'harmonics' && <HarmonicsLab />}
                {activeLab.id === 'artifact-physics' && <ArtifactPhysicsLab />}
                {activeLab.id === 'doppler-eq' && <DopplerEquationLab />}
                {activeLab.id === 'decibel' && <DecibelMathLab />}
                {activeLab.id === 'nyquist' && <NyquistLimitLab />}
                {activeLab.id === 'range-res' && <RangeResolutionLab />}
                {activeLab.id === 'temporal-res' && <TemporalResolutionLab />}
                {activeLab.id === 'pulse' && <PulsedWaveLab />}
                {activeLab.id === 'resolution' && <ResolutionLab />}
                {activeLab.id === 'artifact' && <ArtifactExplorer />}
                {activeLab.id === 'hemo' && <HemodynamicsLab />}
                {activeLab.id === 'instrument' && <InstrumentationLab />}
                {activeLab.id === 'safety' && <SafetyLab />}
                {activeLab.id === 'math' && <MathematicsLab topic="General Math" />}
                {activeLab.id === 'advanced' && <AdvancedImagingLab topic="Advanced Concepts" />}
                {activeLab.id === 'calculator' && <PhysicsCalculator onClose={() => setActiveLabId(null)} />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
