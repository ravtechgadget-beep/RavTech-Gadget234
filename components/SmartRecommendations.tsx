
import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Target, Brain, TrendingUp, AlertCircle, Zap } from 'lucide-react';
import { UserStats } from '../types';

interface SmartRecommendationsProps {
  userStats: UserStats;
  onFocusTopic: (topicId: string) => void;
}

export const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({ userStats, onFocusTopic }) => {
  // Logic to determine recommendations based on userStats
  const recommendations = [
    {
      id: 'doppler_angle',
      title: 'Doppler Angle Mastery',
      reason: 'Score low on recent cosine math simulation',
      priority: 'high',
      xp: 500,
      icon: Target,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10'
    },
    {
      id: 'harmonics_logic',
      title: 'THI Artifact Suppression',
      reason: 'Perfect for your current progress in Imaging Modalities',
      priority: 'medium',
      xp: 250,
      icon: Sparkles,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10'
    },
    {
      id: 'decibel_scaling',
      title: 'Logarithmic Intensity',
      reason: 'Critical registry topic often tested with Waves',
      priority: 'low',
      xp: 150,
      icon: TrendingUp,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <Brain size={16} className="text-white" />
          </div>
          <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] italic">Neural Priority Stream</h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Efficiency:</span>
          <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">94%</span>
        </div>
      </div>

      <div className="grid gap-4">
        {recommendations.map((rec, idx) => (
          <motion.button
            key={rec.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => onFocusTopic(rec.id)}
            className="group relative p-6 bg-slate-900 border border-white/5 rounded-3xl text-left hover:border-indigo-500/30 transition-all overflow-hidden"
          >
            <div className={`absolute top-0 right-0 p-6 opacity-5 group-hover:scale-125 transition-transform duration-700`}>
              <rec.icon size={48} />
            </div>
            
            <div className="flex items-start gap-5">
              <div className={`p-4 rounded-2xl ${rec.bg} ${rec.color} shadow-inner`}>
                <rec.icon size={20} />
              </div>
              <div className="space-y-1 pr-6">
                <div className="flex items-center gap-3">
                  <h4 className="text-xs font-black text-white uppercase tracking-widest group-hover:text-indigo-400 transition-colors uppercase italic">{rec.title}</h4>
                  <span className={`text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    rec.priority === 'high' ? 'bg-rose-500/20 text-rose-500' :
                    rec.priority === 'medium' ? 'bg-indigo-500/20 text-indigo-500' :
                    'bg-slate-500/20 text-slate-500'
                  }`}>
                    {rec.priority}
                  </span>
                </div>
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest leading-relaxed">{rec.reason}</p>
                <div className="pt-3 flex items-center gap-4">
                  <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-1">
                    <Zap size={10} /> +{rec.xp} XP Potential
                  </span>
                  <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-1 group-hover:text-white transition-colors">
                    Initialize Path <ArrowRight size={10} />
                  </span>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="p-4 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl flex items-center gap-4">
        <AlertCircle size={16} className="text-indigo-400 shrink-0" />
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
          Platform AI is analyzing your recent simulation vectors to predicted ARDMS readiness. Maintain consistency to refine your study path.
        </p>
      </div>
    </div>
  );
};
