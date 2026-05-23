
import React, { useState } from 'react';
import { Calculator, RotateCcw, Zap, Target } from 'lucide-react';

interface PhysicsCalculatorProps {
  defaultTab?: '13us' | 'snell' | 'axial';
  onClose?: () => void;
}

export const PhysicsCalculator: React.FC<PhysicsCalculatorProps> = ({ defaultTab = '13us', onClose }) => {
  const [activeTab, setActiveTab] = useState<'13us' | 'snell' | 'axial'>(defaultTab);
  
  // 13us Rule
  const [distance, setDistance] = useState<string>('');
  const [time, setTime] = useState<string>('');

  // Snell's Law
  const [c1, setC1] = useState<string>('');
  const [c2, setC2] = useState<string>('');
  const [theta1, setTheta1] = useState<string>('');

  const calculate13us = () => {
    if (distance) return `Time: ${parseFloat(distance) * 13} µs`;
    if (time) return `Reflector Depth: ${parseFloat(time) / 13} cm`;
    return 'Enter a value';
  };

  const calculateSnell = () => {
    const v1 = parseFloat(c1);
    const v2 = parseFloat(c2);
    const t1 = parseFloat(theta1);
    if (!v1 || !v2 || !t1) return 'Missing values';
    if (v2 > v1) return `Refraction: Angle > ${t1}° (Away from normal)`;
    if (v2 < v1) return `Refraction: Angle < ${t1}° (Toward normal)`;
    return 'No refraction (v1 = v2)';
  };

  return (
    <div className="bg-slate-900 md:rounded-[2.5rem] p-6 md:p-8 text-white shadow-2xl animate-in slide-in-from-top duration-500 overflow-y-auto relative h-full md:h-auto max-md:fixed max-md:inset-0 max-md:z-[100]">
      <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none hidden md:block">
        <Calculator size={120} />
      </div>
      
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="flex items-center gap-4">
            <Calculator className="text-indigo-400" size={24} md:size={28} />
            <h3 className="font-black text-lg md:text-2xl uppercase tracking-tighter leading-none italic">Physics Lab Calculator</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              {(['13us', 'snell', 'axial'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 md:px-6 py-2.5 md:py-3 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white/5 text-slate-500 hover:bg-white/10'
                  }`}
                >
                  {tab === '13us' ? '13µs Rule' : tab === 'snell' ? "Snell's Law" : 'Axial Res'}
                </button>
              ))}
            </div>
            {onClose && (
              <button 
                onClick={onClose}
                className="p-3 md:p-4 bg-white/5 rounded-xl text-slate-400 hover:text-white transition-all hover:bg-rose-500/20 hover:text-rose-500"
              >
                <X size={20} md:size={24} />
              </button>
            )}
          </div>
        </div>

        <div className="bg-white/5 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 border border-white/10">
          {activeTab === '13us' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-2 md:space-y-4">
                  <label className="text-[9px] md:text-xs font-black text-slate-500 uppercase tracking-widest leading-none">Reflector Depth (cm)</label>
                  <input
                    type="number"
                    value={distance}
                    onChange={(e) => { setDistance(e.target.value); setTime(''); }}
                    className="w-full bg-slate-800 border-2 border-slate-700 rounded-xl md:rounded-[2rem] px-6 py-4 md:px-8 md:py-6 text-white text-sm md:text-lg focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. 2"
                  />
                </div>
                <div className="flex items-center gap-4 text-center">
                  <div className="h-px bg-slate-700 flex-1"></div>
                  <span className="text-[8px] md:text-[10px] font-black text-slate-600">OR OPERATOR</span>
                  <div className="h-px bg-slate-700 flex-1"></div>
                </div>
                <div className="space-y-2 md:space-y-4">
                  <label className="text-[9px] md:text-xs font-black text-slate-500 uppercase tracking-widest leading-none">Total Go-Return Time (µs)</label>
                  <input
                    type="number"
                    value={time}
                    onChange={(e) => { setTime(e.target.value); setDistance(''); }}
                    className="w-full bg-slate-800 border-2 border-slate-700 rounded-xl md:rounded-[2rem] px-6 py-4 md:px-8 md:py-6 text-white text-sm md:text-lg focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. 26"
                  />
                </div>
              </div>
              <div className="text-center lg:border-l border-white/10 lg:pl-12 py-8 md:py-0">
                <p className="text-[9px] md:text-xs font-black text-indigo-400 uppercase tracking-[0.4em] mb-4">Calculated Lab Result</p>
                <p className="text-3xl md:text-6xl font-black italic text-white tracking-tighter leading-none glow-text">{calculate13us()}</p>
                <div className="mt-6 md:mt-10 flex items-center justify-center gap-3 text-slate-500 text-[10px] md:text-xs font-bold bg-white/5 py-3 px-6 rounded-full w-fit mx-auto">
                  <Zap size={14} className="text-amber-500"/> Every 1cm depth = 13µs round trip
                </div>
              </div>
            </div>
          )}

          {activeTab === 'snell' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] md:text-xs font-black text-slate-500 uppercase tracking-widest">v1 (m/s)</label>
                    <input
                      type="number"
                      value={c1}
                      onChange={(e) => setC1(e.target.value)}
                      className="w-full bg-slate-800 border-2 border-slate-700 rounded-xl px-4 py-4 text-white text-xs focus:outline-none focus:border-indigo-500 transition-all font-bold"
                      placeholder="1540"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] md:text-xs font-black text-slate-500 uppercase tracking-widest">v2 (m/s)</label>
                    <input
                      type="number"
                      value={c2}
                      onChange={(e) => setC2(e.target.value)}
                      className="w-full bg-slate-800 border-2 border-slate-700 rounded-xl px-4 py-4 text-white text-xs focus:outline-none focus:border-indigo-500 transition-all font-bold"
                      placeholder="3500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] md:text-xs font-black text-slate-500 uppercase tracking-widest">Incident Angle (θ1)</label>
                  <input
                    type="number"
                    value={theta1}
                    onChange={(e) => setTheta1(e.target.value)}
                    className="w-full bg-slate-800 border-2 border-slate-700 rounded-xl px-4 py-4 text-white text-xs focus:outline-none focus:border-indigo-500 transition-all font-bold text-center"
                    placeholder="Angle in degrees"
                  />
                </div>
              </div>
              <div className="text-center lg:border-l border-white/10 lg:pl-12 py-8 md:py-0">
                <p className="text-[9px] md:text-xs font-black text-indigo-400 uppercase tracking-[0.4em] mb-4">Refraction Prediction</p>
                <p className="text-2xl md:text-4xl font-black italic text-white leading-tight">{calculateSnell()}</p>
                <p className="text-[10px] md:text-xs text-slate-500 mt-6 leading-relaxed italic max-w-xs mx-auto">
                  {"If v2 > v1, transmitted angle > incident angle. If v2 < v1, transmitted angle < incident angle."}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'axial' && (
             <div className="flex flex-col items-center justify-center py-12 md:py-20 text-center">
               <div className="p-6 md:p-8 bg-indigo-600 rounded-[2rem] text-white shadow-2xl mb-8 group-hover:rotate-12 transition-transform">
                <Target size={40} md:size={64} className="text-white" />
               </div>
               <p className="text-sm md:text-2xl font-black text-slate-200 text-center max-w-lg italic px-4 leading-relaxed">
                 "Axial Resolution (mm) =<br/><span className="text-indigo-400 text-2xl md:text-4xl uppercase not-italic">SPL (mm) / 2</span><br/><span className="text-slate-500 text-xs md:text-sm mt-4 block">Remember: Lower numerical values = better image quality!</span>"
               </p>
               <div className="mt-12 flex flex-wrap justify-center gap-4">
                 <div className="px-6 md:px-10 py-4 md:py-6 bg-white/5 rounded-2xl md:rounded-3xl border-2 border-white/10 text-center group hover:border-indigo-500 transition-all">
                    <span className="block text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Registry Shortcut</span>
                    <span className="font-black text-sm md:text-xl text-white">λ * cycles / 2</span>
                 </div>
               </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
