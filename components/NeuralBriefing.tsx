
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, ShieldAlert, Brain, Sparkles, Activity, CheckCircle2, ChevronRight, Loader2, Target } from 'lucide-react';

interface NeuralBriefingProps {
  onClose: () => void;
  onNavigateToLesson: (moduleId: number, lessonId: number) => void;
}

export const NeuralBriefing: React.FC<NeuralBriefingProps> = ({ onClose, onNavigateToLesson }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // The video path provided by the user upload
  const videoSrc = "user_upload_0.mp4"; 

  const handleStartBriefing = () => {
    setIsPlaying(true);
  };

  const handleVideoEnd = () => {
    setShowAssessment(true);
  };

  const checkAnswer = () => {
    const val = parseFloat(userAnswer);
    // Calculation: 
    // Wavelength = 1.54 / 2.5 = 0.616
    // SPL = 2 * 0.616 = 1.232
    // Resolution = SPL / 2 = 0.616
    if (Math.abs(val - 0.616) < 0.01) {
      setFeedback({ 
        correct: true, 
        message: "Neural Synchronization Successful. LARRD resolution at 2.5MHz with 2 cycles is 0.616mm. Since the gap is 1.0mm, the structures will be resolved. Clinical accuracy verified." 
      });
    } else {
      setFeedback({ 
        correct: false, 
        message: "Acoustic Mismatch. Re-calculate using the SPL/2 formula for a 2-cycle pulse at 2.5MHz." 
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/98 backdrop-blur-3xl z-[200] flex items-center justify-center p-0 md:p-8 animate-in fade-in duration-500 overflow-y-auto">
      <div className="w-full md:max-w-5xl bg-slate-900 md:border md:border-white/10 md:rounded-[3rem] overflow-hidden shadow-4xl relative flex flex-col md:flex-row h-screen md:min-h-[600px] md:h-auto">
        <button onClick={onClose} className="absolute top-6 right-6 md:top-8 md:right-8 p-3 md:p-4 bg-white/5 hover:bg-white/10 rounded-xl md:rounded-2xl text-white transition-all z-50 border border-white/10">
          <X size={20} md:size={24} />
        </button>

        {/* Video Side */}
        <div className="flex-1 bg-black relative flex items-center justify-center min-h-[300px] md:min-h-0">
          {!isPlaying ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12 text-center space-y-6 md:space-y-8">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-indigo-600 rounded-2xl md:rounded-[2.5rem] flex items-center justify-center shadow-4xl animate-pulse">
                <ShieldAlert size={32} md:size={48} className="text-white" />
              </div>
              <div className="space-y-3 md:space-y-4">
                <h2 className="text-3xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">Neural <br/><span className="text-gradient">Diagnostic</span> Briefing</h2>
                <p className="text-slate-400 text-[10px] md:text-sm font-bold uppercase tracking-widest max-w-[240px] md:max-w-sm mx-auto leading-relaxed">
                  "Transitioning from abstract physics to clinical operational rules."
                </p>
              </div>
              <button 
                onClick={handleStartBriefing}
                className="px-8 md:px-12 py-4 md:py-6 bg-white text-slate-900 rounded-full font-black uppercase text-[10px] md:text-xs tracking-widest shadow-2xl hover:scale-105 transition-all flex items-center gap-3 md:gap-4 group"
              >
                Initialize <Play size={16} md:size={18} fill="currentColor" className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : (
            <div className="w-full h-full relative group">
              <video 
                ref={videoRef}
                src={videoSrc}
                autoPlay 
                controls
                onEnded={handleVideoEnd}
                className="w-full h-full object-contain"
              />
              <div className="absolute top-4 left-4 p-3 bg-black/40 backdrop-blur-xl rounded-xl border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] font-black text-white uppercase tracking-widest">Active Neural Link</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Interaction Side */}
        <div className="w-full md:w-[400px] md:border-l border-white/10 p-6 md:p-12 flex flex-col gap-6 md:gap-8 bg-slate-900/50">
          <div className="flex items-center gap-4">
            <div className="p-2.5 md:p-3 bg-indigo-500/10 rounded-xl md:rounded-2xl border border-indigo-500/20">
              <Brain className="text-indigo-400" size={20} md:size={24} />
            </div>
            <div>
              <h3 className="text-[9px] md:text-xs font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Subject</h3>
              <p className="text-white font-black text-base md:text-lg uppercase italic tracking-tight">Range Resolution Logic</p>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6 flex-1">
            <div className="p-4 md:p-6 bg-white/5 rounded-2xl md:rounded-3xl border border-white/5 space-y-3 md:space-y-4">
              <div className="flex items-center gap-2">
                 <Target size={12} md:size={14} className="text-indigo-400" />
                 <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Clinical Goal</span>
              </div>
              <p className="text-[11px] md:text-sm font-bold text-slate-300 italic leading-relaxed">
                "Solve the axial resolution constraint for a 2.5MHz probe."
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!showAssessment ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 md:space-y-6"
                >
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="p-3 md:p-4 bg-black/20 rounded-xl md:rounded-2xl border border-white/5">
                      <p className="text-[7px] md:text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Frequency</p>
                      <p className="text-sm md:text-base text-white font-black">2.5 MHz</p>
                    </div>
                    <div className="p-3 md:p-4 bg-black/20 rounded-xl md:rounded-2xl border border-white/5">
                      <p className="text-[7px] md:text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Cyst Gap</p>
                      <p className="text-sm md:text-base text-white font-black">1.0 mm</p>
                    </div>
                  </div>
                  <div className="p-4 md:p-6 bg-indigo-600/10 rounded-2xl md:rounded-[2rem] border border-indigo-500/20 flex items-center gap-3 md:gap-4">
                    <Loader2 size={20} md:size={24} className="text-indigo-400 animate-spin" />
                    <p className="text-[9px] md:text-[10px] font-bold text-indigo-300 uppercase tracking-widest leading-relaxed">
                      Awaiting video completion for assessment...
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4 md:space-y-6"
                >
                  <div className="space-y-3 md:space-y-4">
                    <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Range Resolution (mm)</label>
                    <input 
                      type="number"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="0.000"
                      className="w-full bg-black/40 border-2 border-white/10 rounded-xl md:rounded-2xl px-6 py-3.5 md:py-4 text-sm md:text-base text-white font-mono focus:border-indigo-600 focus:outline-none transition-all"
                    />
                    <button 
                      onClick={checkAnswer}
                      className="w-full py-4 md:py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl md:rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest transition-all shadow-xl"
                    >
                      Verify Neural Proof
                    </button>
                  </div>

                  {feedback && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-4 md:p-6 rounded-2xl md:rounded-3xl border ${feedback.correct ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}
                    >
                      <div className="flex items-start gap-2 md:gap-3">
                        {feedback.correct ? <CheckCircle2 size={16} md:size={18} className="shrink-0" /> : <ShieldAlert size={16} md:size={18} className="shrink-0" />}
                        <p className="text-[10px] md:text-[11px] font-bold leading-relaxed">{feedback.message}</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="pt-4 md:pt-6 border-t border-white/10 flex items-center justify-between group mt-auto">
             <div className="flex items-center gap-2 md:gap-3">
                <Activity size={14} md:size={16} className="text-emerald-500 animate-pulse" />
                <span className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-widest">Briefing Status: {showAssessment ? 'Complete' : 'Pending'}</span>
             </div>
             <Sparkles size={14} md:size={16} className="text-indigo-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
