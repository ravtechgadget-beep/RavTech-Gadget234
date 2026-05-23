
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, Users, Activity, DollarSign, TrendingUp, 
  Settings, Database, Server, Zap, AlertCircle,
  BarChart3, PieChart, Globe, Briefcase, Lock,
  ArrowUpRight, ArrowDownRight, RefreshCw, Layers
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { MediaBulkManager } from './MediaBulkManager';

const mockData = [
  { name: 'Mon', revenue: 4000, active: 2400 },
  { name: 'Tue', revenue: 3000, active: 1398 },
  { name: 'Wed', revenue: 2000, active: 9800 },
  { name: 'Thu', revenue: 2780, active: 3908 },
  { name: 'Fri', revenue: 1890, active: 4800 },
  { name: 'Sat', revenue: 2390, active: 3800 },
  { name: 'Sun', revenue: 3490, active: 4300 },
];

export const AdminDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState({
    totalUsers: 12402,
    activeSubscribers: 4202,
    monthlyRevenue: 84040,
    systemLatency: 42, // ms
    cacheHitRate: 98.4,
    aiCreditConsumption: 824000
  });

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter italic uppercase text-white leading-none">
            Neural <br/> Control Center
          </h1>
          <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.4em] mt-4 flex items-center gap-2">
            <Shield size={14} className="text-indigo-400" /> Administrative Hierarchy Node_01
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-mono">System Status: Nominal</span>
          </div>
          <button className="p-4 bg-white text-black rounded-2xl hover:scale-105 active:scale-95 transition-all">
            <RefreshCw size={20} />
          </button>
        </div>
      </header>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {[
          { label: 'Total Resonance', value: metrics.totalUsers.toLocaleString(), sub: '+12% vs last month', icon: Users, color: 'text-indigo-400' },
          { label: 'Neural Revenue', value: `$${(metrics.monthlyRevenue / 1000).toFixed(1)}k`, sub: '+24% conversion', icon: DollarSign, color: 'text-emerald-400' },
          { label: 'Edge Latency', value: `${metrics.systemLatency}ms`, sub: 'Sub-threshold', icon: Activity, color: 'text-rose-400' },
          { label: 'Cache Depth', value: `${metrics.cacheHitRate}%`, sub: 'Peak performance', icon: Layers, color: 'text-amber-400' },
        ].map((item) => (
          <div key={`kpi-${item.label}`} className="p-8 bg-slate-900 border border-white/5 rounded-[2.5rem] space-y-4 hover:border-white/20 transition-all group">
            <div className="flex items-center justify-between">
              <item.icon className={item.color} size={24} />
              <div className="p-2 bg-white/5 rounded-xl"><ArrowUpRight size={16} className="text-slate-500" /></div>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</p>
              <p className="text-3xl font-black text-white italic tracking-tighter">{item.value}</p>
            </div>
            <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{item.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid xl:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="xl:col-span-2 p-10 bg-slate-900 border border-white/5 rounded-[3rem] space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 flex items-center gap-3">
              <BarChart3 size={16} /> Revenue & Engagement Matrix
            </h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white">Daily</button>
              <button className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Weekly</button>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#ffffff20" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.2em' }}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '1rem' }}
                  itemStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="active" stroke="#10b981" strokeWidth={2} fillOpacity={0} />
              </AreaChart>
            </ ResponsiveContainer>
          </div>
        </div>

        {/* System Health / Usage */}
        <div className="p-10 bg-slate-900 border border-white/5 rounded-[3rem] space-y-10">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-400 flex items-center gap-3">
            <Server size={16} /> System Sentinel
          </h3>
          <div className="space-y-6">
            {[
              { label: 'Compute Usage', value: 74, color: 'bg-indigo-500' },
              { label: 'Memory Pressure', value: 42, color: 'bg-emerald-500' },
              { label: 'AI API Quota', value: 88, color: 'bg-rose-500' },
              { label: 'Edge Throughput', value: 12, color: 'bg-amber-500' },
            ].map((stat, i) => (
              <div key={`sentinel-${stat.label}`} className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <span>{stat.label}</span>
                  <span>{stat.value}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.value}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`h-full ${stat.color} shadow-[0_0_10px_rgba(255,255,255,0.1)]`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto p-6 bg-indigo-600/10 border border-indigo-500/20 rounded-3xl space-y-4">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-600 rounded-xl text-white shadow-lg"><Zap size={20} /></div>
                <div>
                   <p className="text-[10px] font-black text-white uppercase tracking-widest italic">Neural Forge 2.0</p>
                   <p className="text-[8px] font-bold text-indigo-400/80 uppercase tracking-widest">Optimizing synthesis...</p>
                </div>
             </div>
             <p className="text-[9px] font-medium text-slate-400 leading-relaxed uppercase tracking-widest">
               Platform is operating at 92% peak efficiency. No critical bottlenecks detected.
             </p>
          </div>
        </div>
      </div>

      <MediaBulkManager />

      {/* User Management Table Placeholder */}
      <div className="p-10 bg-slate-900 border border-white/5 rounded-[3rem] space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white flex items-center gap-3">
            <Users size={16} /> Registry Access Log
          </h3>
          <button className="text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-white transition-colors">Export CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="pb-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Subscriber</th>
                <th className="pb-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Tier</th>
                <th className="pb-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Activity</th>
                <th className="pb-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { name: 'Dr. Sarah Mitchell', tier: 'Professional', activity: '3 min ago', revenue: '$299.00', status: 'online' },
                { name: 'University Medical Center', tier: 'Enterprise', activity: '12 min ago', revenue: '$2,450.00', status: 'away' },
                { name: 'Clinical Lab Alpha', tier: 'Professional', activity: '1 hour ago', revenue: '$299.00', status: 'offline' },
                { name: 'John Doe (Registry Prep)', tier: 'Basic', activity: '3 hours ago', revenue: '$49.00', status: 'offline' },
              ].map((user) => (
                <tr key={`user-log-${user.name}`} className="group hover:bg-white/2 backdrop-blur-sm transition-all">
                  <td className="py-6 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-black text-indigo-400 text-xs italic">
                      {user.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-black text-white uppercase tracking-widest group-hover:text-indigo-400 transition-colors">{user.name}</p>
                      <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">ID: {Math.random().toString(36).substring(7).toUpperCase()}</p>
                    </div>
                  </td>
                  <td className="py-6">
                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                      user.tier === 'Enterprise' ? 'bg-purple-600 text-white' : 
                      user.tier === 'Professional' ? 'bg-indigo-600 text-white' : 
                      'bg-white/5 text-slate-400 border border-white/10'
                    }`}>
                      {user.tier}
                    </span>
                  </td>
                  <td className="py-6">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">{user.activity}</p>
                  </td>
                  <td className="py-6 text-right">
                    <p className="text-xs font-black text-white italic tracking-tighter">{user.revenue}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
