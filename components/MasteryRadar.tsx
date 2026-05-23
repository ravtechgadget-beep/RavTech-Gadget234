import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Target, Shield, Zap, Activity, Waves, Search } from 'lucide-react';

interface MasteryRadarProps {
  data: Record<string, number>; // Domain -> Mastery (0-100)
}

export const MasteryRadar: React.FC<MasteryRadarProps> = ({ data }) => {
  const [scale, setScale] = useState(1);
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setScale(0.7);
      else if (width < 768) setScale(0.85);
      else setScale(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const domains = [
    { key: 'Waves', label: 'Waves', icon: Waves, color: '#3b82f6' },
    { key: 'Transducers', label: 'Arrays', icon: Zap, color: '#8b5cf6' },
    { key: 'Doppler', label: 'Doppler', icon: Activity, color: '#f43f5e' },
    { key: 'Resolution', label: 'Resol.', icon: Search, color: '#10b981' },
    { key: 'Instrumentation', label: 'Knobs', icon: Target, color: '#6366f1' },
    { key: 'Safety', label: 'Safety', icon: Shield, color: '#06b6d4' },
  ];

  const size = 300;
  const center = size / 2;
  const radius = center * 0.7;

  const points = domains.map((d, i) => {
    const angle = (i / domains.length) * 2 * Math.PI - Math.PI / 2;
    const mastery = (data[d.key] || 0) / 100;
    const x = center + radius * mastery * Math.cos(angle);
    const y = center + radius * mastery * Math.sin(angle);
    return { x, y, labelX: center + (radius + 25) * Math.cos(angle), labelY: center + (radius + 25) * Math.sin(angle), ...d };
  });

  const polygonPath = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="relative flex items-center justify-center p-4 transition-transform duration-500" style={{ transform: `scale(${scale})` }}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid Background */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((r, idx) => (
          <polygon
            key={idx}
            points={domains.map((_, i) => {
              const angle = (i / domains.length) * 2 * Math.PI - Math.PI / 2;
              return `${center + radius * r * Math.cos(angle)},${center + radius * r * Math.sin(angle)}`;
            }).join(' ')}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="0.5"
            className="animate-pulse"
            style={{ animationDelay: `${idx * 200}ms` }}
          />
        ))}
        {/* Axis Lines */}
        {domains.map((_, i) => {
          const angle = (i / domains.length) * 2 * Math.PI - Math.PI / 2;
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={center + radius * Math.cos(angle)}
              y2={center + radius * Math.sin(angle)}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="0.5"
            />
          );
        })}
        {/* Data Area */}
        <motion.polygon
          points={polygonPath}
          fill="rgba(99, 102, 241, 0.2)"
          stroke="#6366f1"
          strokeWidth="3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            fill: ["rgba(99, 102, 241, 0.2)", "rgba(99, 102, 241, 0.4)", "rgba(99, 102, 241, 0.2)"]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            fill: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{ filter: 'drop-shadow(0 0 12px rgba(99, 102, 241, 0.6))' }}
        />
        {/* Data Points */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill="#6366f1" className="shadow-lg shadow-indigo-500/50 animate-pulse" />
        ))}
      </svg>

      {/* Floating Labels */}
      {points.map((p, i) => (
        <div 
          key={i} 
          className="absolute flex flex-col items-center gap-1 group/label"
          style={{ 
            left: p.labelX, 
            top: p.labelY, 
            transform: 'translate(-50%, -50%)' 
          }}
        >
          <div className="p-1.5 md:p-2 bg-black/60 backdrop-blur-xl rounded-lg md:rounded-xl border border-white/10 shadow-2xl group-hover/label:scale-125 group-hover/label:border-indigo-500/50 transition-all cursor-default">
             <p.icon size={10} className="md:w-[12px] md:h-[12px] group-hover/label:animate-pulse" style={{ color: p.color }} />
          </div>
          <span className="text-[6px] md:text-[8px] font-black uppercase text-slate-500 tracking-tighter group-hover/label:text-indigo-400 transition-colors">{p.label}</span>
          <span className="text-[7px] md:text-[9px] font-black text-white glitch-text" data-text={data[p.key] || 0}>{(data[p.key] || 0)}%</span>
        </div>
      ))}
    </div>
  );
};