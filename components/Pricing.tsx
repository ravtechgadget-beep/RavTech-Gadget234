
import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, Star, Zap, Rocket, Shield, 
  Users, Activity, Globe, Database, Sparkles,
  ArrowRight, Award
} from 'lucide-react';

interface PricingProps {
  currentTier: string;
  onUpgrade: (tier: 'pro' | 'enterprise') => void;
  userId?: string;
}

export const Pricing: React.FC<PricingProps> = ({ currentTier, onUpgrade, userId }) => {
  const handleUpgrade = async (tier: 'pro' | 'enterprise') => {
    const priceId = tier === 'pro' 
      ? (import.meta as any).env.VITE_STRIPE_PRO_PRICE_ID 
      : (import.meta as any).env.VITE_STRIPE_ENTERPRISE_PRICE_ID;

    if (!priceId) {
      // Fallback to internal state update for local/demo mode if no Stripe key
      onUpgrade(tier);
      return;
    }

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, userId }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to initialize checkout');
      }
    } catch (err) {
      console.error('Checkout Error:', err);
      // Fallback for demo
      onUpgrade(tier);
    }
  };

  const plans = [
    {
      id: 'basic',
      name: 'Scholar',
      price: '$0',
      description: 'Core Registry Foundation',
      features: [
        'All Masterclass Lectures',
        'Basic Physics Labs',
        'Standard Flashcards',
        'Neural Vault Sync (Basic)',
        'Community Support'
      ],
      color: 'bg-slate-800',
      icon: Users,
    },
    {
      id: 'pro',
      name: 'Registry-Pro',
      price: '$29',
      description: 'High-Impact Performance',
      popular: true,
      features: [
        'Advanced Clinical Labs',
        'Persona-Shift Generation',
        'Premium TTS (ElevenLabs)',
        'Full Mock Exam Suite',
        'Direct Expert Feedback',
        'Registry Predictor AI'
      ],
      color: 'bg-indigo-600',
      icon: Star,
    },
    {
      id: 'enterprise',
      name: 'Neural Elite',
      price: 'Custom',
      description: 'Institutional Mastery',
      features: [
        'Bulk Licensing for Schools',
        'Educator Dashboard',
        'Custom Registry Alignment',
        'White-label Physics Labs',
        'SLA Guaranteed Uptime',
        'API Access for Analytics'
      ],
      color: 'bg-purple-600',
      icon: Rocket,
    }
  ];

  return (
    <div className="space-y-16 py-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="text-center space-y-6">
        <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic text-white leading-none">
          Accelerate your <br/> <span className="text-gradient">Evolution</span>
        </h2>
        <p className="text-slate-500 font-black uppercase text-[10px] md:text-sm tracking-[0.4em] max-w-2xl mx-auto">
          Choose the neural bandwidth suited for your registry path.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {plans.map((plan, idx) => (
          <motion.div 
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`relative p-10 rounded-[3rem] md:rounded-[4rem] border transition-all duration-500 group overflow-hidden ${
              plan.popular ? 'bg-slate-900 border-indigo-500/50 shadow-indigo-500/20 shadow-2xl scale-105 z-10' : 'bg-slate-900 border-white/5 hover:border-white/20'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-8 right-8 px-4 py-1 bg-indigo-600 rounded-full text-[8px] font-black uppercase tracking-widest text-white shadow-xl animate-pulse">
                Most Popular
              </div>
            )}

            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-3xl ${plan.color} text-white shadow-lg`}>
                  <plan.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">{plan.name}</h3>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">{plan.description}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-5xl font-black text-white italic tracking-tighter">{plan.price}</p>
                {plan.id !== 'enterprise' && <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Per Month / Billed Annually</p>}
              </div>

              <div className="w-full h-px bg-white/5" />

              <ul className="space-y-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-400">
                    <CheckCircle2 size={16} className={plan.id === 'pro' ? 'text-indigo-400' : 'text-slate-600'} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => plan.id !== 'basic' && handleUpgrade(plan.id as any)}
                disabled={currentTier === plan.id}
                className={`w-full py-6 rounded-3xl font-black uppercase text-[10px] tracking-widest transition-all ${
                  currentTier === plan.id 
                    ? 'bg-emerald-600/20 text-emerald-500 border border-emerald-500/30' 
                    : plan.popular 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-105 active:scale-95 shadow-xl' 
                      : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                }`}
              >
                {currentTier === plan.id ? 'Active Plan' : plan.id === 'enterprise' ? 'Contact Sales' : 'Commit to Mastery'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto p-12 bg-indigo-600/5 border border-indigo-500/10 rounded-[3rem] text-center space-y-6">
         <div className="inline-flex items-center gap-4 px-6 py-2 bg-indigo-600 rounded-full text-white text-[9px] font-black uppercase tracking-widest">
           <Shield size={14} /> The Commercial Guarantee
         </div>
         <p className="text-slate-400 font-medium uppercase text-[10px] md:text-xs tracking-widest leading-loose">
           All premium tiers include high-fidelity simulation environments, registry-aligned content verified by clinical specialists, and priority neural synthesis for all requested modules.
         </p>
      </div>
    </div>
  );
};
