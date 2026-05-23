
import React from 'react';
import { motion } from 'motion/react';
import { 
  Award, Zap, Coins, Flame, Star, TrendingUp, 
  CheckCircle2, Target, Brain, Rocket, ShieldCheck,
  User, BarChart3, Trophy, Waves, ShoppingBag,
  Mail, Shield
} from 'lucide-react';
import { UserStats, Badge, Quest } from '../types';
import { User as FirebaseUser } from 'firebase/auth';

interface ProfileProps {
  stats: UserStats;
  badges: Badge[];
  quests: Quest[];
  user: FirebaseUser | null;
  onBuyBoost: (boostId: string, cost: number) => void;
  hotMicEnabled: boolean;
  onToggleHotMic: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ stats, badges, quests, user, onBuyBoost, hotMicEnabled, onToggleHotMic }) => {
  const levelProgress = (stats.xp % 1000) / 10;

  return (
    <div className="space-y-6 md:space-y-8 max-w-5xl mx-auto pb-20 px-2 md:px-0 animate-in fade-in duration-1000">
      {/* User Identity Section */}
      {user && (
        <div className="glass-panel p-6 md:p-12 rounded-[2rem] md:rounded-[4rem] border border-white/10 shadow-4xl relative overflow-hidden group hardware-border">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-transparent to-transparent opacity-50" />
          <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-700">
            <Shield size={160} />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <div className="relative">
              <div className="w-24 h-24 md:w-48 md:h-48 rounded-2xl md:rounded-[3rem] border-4 border-indigo-500/30 p-1.5 md:p-2 bg-slate-900 shadow-2xl group-hover:rotate-1 transition-transform duration-500 overflow-hidden">
                <img 
                  src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} 
                  alt={user.displayName || 'User'} 
                  className="w-full h-full rounded-xl md:rounded-[2rem] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 bg-emerald-500 text-white p-2 md:p-3 rounded-xl md:rounded-2xl shadow-xl border-2 md:border-4 border-[#050608]">
                <CheckCircle2 size={16} md:size={24} />
              </div>
            </div>
            
            <div className="text-center md:text-left space-y-4 md:space-y-6 flex-1">
              <div className="space-y-2">
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <h2 className="text-3xl md:text-7xl font-black tracking-tighter italic uppercase text-white leading-none">{user.displayName}</h2>
                </div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-4 font-mono">
                  <span className="flex items-center gap-1.5 md:gap-2 text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white/5 px-3 md:px-4 py-1.5 rounded-xl border border-white/5">
                    <Mail size={10} md:size={12} className="text-indigo-400" /> {user.email}
                  </span>
                  <span className="flex items-center gap-1.5 md:gap-2 text-[8px] md:text-[10px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 md:px-4 py-1.5 rounded-xl border border-emerald-500/20">
                    <ShieldCheck size={10} md:size={12} /> Verified Specialist
                  </span>
                </div>
              </div>
              <div className="p-4 md:p-6 bg-white/5 border border-white/10 rounded-2xl border-l-4 border-l-indigo-500">
                <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] md:tracking-[0.15em] max-w-2xl italic leading-relaxed">
                  Authorized Sonography Specialist. Neural synchronization active across all registry modules. 
                  Biometric status: Optimal. Training vectors aligned.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatCard icon={<Star className="text-yellow-400" size={16} md:size={20} />} label="Level" value={stats.level} subValue={`${stats.xp % 1000}/1000 XP`} glitch />
        <StatCard icon={<Flame className="text-orange-400" size={16} md:size={20} />} label="Streak" value={`${stats.streak} Days`} subValue="Daily Goal Active" glitch />
        <StatCard icon={<Coins className="text-amber-400" size={16} md:size={20} />} label="Coins" value={stats.coins} subValue="Spend in Shop" />
        <StatCard icon={<TrendingUp className="text-indigo-400" size={16} md:size={20} />} label="Total XP" value={stats.xp.toLocaleString()} subValue="All Time" />
      </div>

      {/* Neural Preferences & Systems */}
      <div className="glass-panel p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-50" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
              <Brain className="text-indigo-400" size={24} />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-black uppercase italic tracking-tighter text-slate-100">Neural Preferences</h3>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Adjust your cognitive experience</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-200">Harvey Hot-Mic</p>
                <p className="text-[8px] font-bold text-slate-500 uppercase">Real-time simulator feedback</p>
              </div>
              <button 
                onClick={onToggleHotMic}
                className={`w-14 h-7 rounded-full transition-all relative border-2 ${hotMicEnabled ? 'bg-indigo-600 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-slate-800 border-slate-700'}`}
              >
                <motion.div 
                  animate={{ x: hotMicEnabled ? 28 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-5 h-5 bg-white rounded-full absolute top-0.5"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="blueprint-card p-6 md:p-10 shadow-2xl relative overflow-hidden border-b-4 border-indigo-500/30">
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600/20 rounded-2xl text-indigo-400 border border-indigo-500/30">
              <User size={24} />
            </div>
            <div>
              <h3 className="text-xl md:text-3xl font-black uppercase italic tracking-tighter text-white">Neural Advancement</h3>
              <p className="text-slate-500 text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] font-mono">Level {stats.level} Sonographer</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl md:text-4xl font-black text-indigo-400 italic font-mono tracking-tighter">{(100 - levelProgress).toFixed(0)}%</p>
            <p className="text-[9px] md:text-[11px] font-black text-slate-500 uppercase tracking-widest font-mono">To Level {stats.level + 1}</p>
          </div>
        </div>
        <div className="h-4 md:h-8 bg-black/40 rounded-xl overflow-hidden border border-white/5 p-1 relative z-10">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${levelProgress}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-indigo-500/80 shadow-[0_0_20px_rgba(79,70,229,0.4)] rounded-lg relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </motion.div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {/* Badges */}
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg md:text-xl font-black uppercase italic tracking-tighter flex items-center gap-2 text-slate-100">
              <Award className="text-indigo-400" size={18} md:size={20} /> Merit Badges
            </h3>
            <span className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">{stats.badges.length} Unlocked</span>
          </div>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {badges.map((badge) => {
              const isUnlocked = stats.badges.includes(badge.id);
              return (
                <div 
                  key={badge.id}
                  className={`p-3 md:p-4 rounded-2xl md:rounded-3xl border flex flex-col items-center text-center gap-2 transition-all
                    ${isUnlocked ? 'glass-card border-white/10 shadow-lg scale-100' : 'bg-white/5 border-white/5 opacity-20 grayscale'}`}
                >
                  <div className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl ${isUnlocked ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-white/5 text-slate-600'}`}>
                    <BadgeIcon name={badge.icon} />
                  </div>
                  <p className={`text-[8px] md:text-[10px] font-black uppercase tracking-tight leading-none ${isUnlocked ? 'text-slate-100' : 'text-slate-600'}`}>{badge.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quests */}
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg md:text-xl font-black uppercase italic tracking-tighter flex items-center gap-2 text-slate-100">
              <Target className="text-indigo-400" size={18} md:size={20} /> Active Quests
            </h3>
          </div>
          <div className="space-y-3 md:space-y-4">
            {quests.map((quest) => (
              <div key={quest.id} className="glass-card p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/10 shadow-lg relative overflow-hidden group">
                {quest.isCompleted && (
                  <div className="absolute top-0 right-0 p-1.5 md:p-2 bg-emerald-500 text-white rounded-bl-xl">
                    <CheckCircle2 size={14} md:size={16} />
                  </div>
                )}
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                  <div className={`p-2.5 md:p-3 rounded-xl ${quest.isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
                    {quest.type === 'daily' ? <Zap size={18} md:size={20} /> : <Rocket size={18} md:size={20} />}
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-black uppercase italic tracking-tight text-slate-100">{quest.title}</h4>
                    <p className="text-[10px] md:text-xs text-slate-400 font-medium line-clamp-1">{quest.description}</p>
                  </div>
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <div className="flex justify-between text-[8px] md:text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-500">Progress</span>
                    <span className="text-indigo-400">{quest.progress}/{quest.target}</span>
                  </div>
                  <div className="h-1.5 md:h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(quest.progress / quest.target) * 100}%` }}
                      className={`h-full ${quest.isCompleted ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.5)]'}`}
                    />
                  </div>
                </div>
                <div className="mt-3 md:mt-4 flex items-center gap-3 md:gap-4">
                  <div className="flex items-center gap-1 text-[8px] md:text-[10px] font-black text-indigo-400">
                    <Star size={10} md:size={12} /> +{quest.xpReward} XP
                  </div>
                  <div className="flex items-center gap-1 text-[8px] md:text-[10px] font-black text-amber-400">
                    <Coins size={10} md:size={12} /> +{quest.coinReward} Coins
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Neural Shop */}
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-black uppercase italic tracking-tighter flex items-center gap-2 text-slate-100">
            <ShoppingBag className="text-indigo-400" size={18} md:size={20} /> Neural Shop
          </h3>
          <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 glass-panel rounded-full border border-amber-500/30">
            <Coins className="text-amber-400" size={14} md:size={16} />
            <span className="text-xs md:text-sm font-black text-amber-400">{stats.coins}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <ShopItem 
            id="xp_overclock"
            name="XP Overclock" 
            description="Double XP for the next lesson" 
            cost={500} 
            icon={<Zap className="text-indigo-400" size={18} md:size={20} />}
            owned={stats.activeBoosts?.['xp_overclock'] || 0}
            onBuy={() => onBuyBoost('xp_overclock', 500)}
            canAfford={stats.coins >= 500}
          />
          <ShopItem 
            id="logic_shield"
            name="Logic Shield" 
            description="Ignore one wrong answer in quiz" 
            cost={300} 
            icon={<ShieldCheck className="text-emerald-400" size={18} md:size={20} />}
            owned={stats.activeBoosts?.['logic_shield'] || 0}
            onBuy={() => onBuyBoost('logic_shield', 300)}
            canAfford={stats.coins >= 300}
          />
          <ShopItem 
            id="neural_surge"
            name="Neural Surge" 
            description="Instantly unlock one lesson block" 
            cost={200} 
            icon={<Rocket className="text-purple-400" size={18} md:size={20} />}
            owned={stats.activeBoosts?.['neural_surge'] || 0}
            onBuy={() => onBuyBoost('neural_surge', 200)}
            canAfford={stats.coins >= 200}
          />
        </div>
      </div>
    </div>
  );
};

const ShopItem: React.FC<{ 
  id: string, 
  name: string, 
  description: string, 
  cost: number, 
  icon: React.ReactNode,
  owned: number,
  onBuy: () => void,
  canAfford: boolean
}> = ({ name, description, cost, icon, owned, onBuy, canAfford }) => (
  <div className="glass-card p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-white/10 shadow-lg hover:border-indigo-500/50 transition-all flex flex-col justify-between group">
    <div>
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div className="p-2.5 md:p-3 bg-white/5 rounded-xl md:rounded-2xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
        {owned > 0 && (
          <span className="px-2.5 md:px-3 py-1 bg-indigo-600 text-white text-[7px] md:text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-indigo-500/20">
            {owned} Owned
          </span>
        )}
      </div>
      <h4 className="font-black uppercase italic tracking-tight text-base md:text-lg mb-1 text-slate-100">{name}</h4>
      <p className="text-[10px] md:text-xs text-slate-400 font-medium mb-4 md:mb-6">{description}</p>
    </div>
    <button 
      onClick={onBuy}
      disabled={!canAfford}
      className={`w-full py-2.5 md:py-3 rounded-xl font-black uppercase text-[9px] md:text-[10px] tracking-widest transition-all flex items-center justify-center gap-2
        ${canAfford ? 'btn-primary shadow-lg shadow-indigo-500/20' : 'bg-white/5 text-slate-600 cursor-not-allowed'}`}
    >
      <Coins size={12} md:size={14} /> {cost}
    </button>
  </div>
);

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string | number, subValue: string, glitch?: boolean }> = ({ icon, label, value, subValue, glitch }) => (
  <div className="glass-card p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-white/10 shadow-lg hover:border-indigo-500/50 transition-all group hover:scale-[1.05] duration-500 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10">
      <div className="flex items-center gap-2 md:gap-3 mb-1.5 md:mb-2">
        <div className="p-1.5 md:p-2 bg-white/5 rounded-lg md:rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-transform border border-white/5">
          {icon}
        </div>
        <span className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
      </div>
      <p className={`text-lg md:text-2xl font-black italic tracking-tighter uppercase text-slate-100 ${glitch ? 'glitch-text' : ''}`} data-text={value}>{value}</p>
      <p className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase tracking-tight">{subValue}</p>
    </div>
  </div>
);

const BadgeIcon: React.FC<{ name: string }> = ({ name }) => {
  switch (name) {
    case 'Rocket': return <Rocket size={18} md:size={20} />;
    case 'Trophy': return <Trophy size={18} md:size={20} />;
    case 'Zap': return <Zap size={18} md:size={20} />;
    case 'Waves': return <Waves size={18} md:size={20} />;
    case 'Brain': return <Brain size={18} md:size={20} />;
    case 'ShieldCheck': return <ShieldCheck size={18} md:size={20} />;
    default: return <Award size={18} md:size={20} />;
  }
};
