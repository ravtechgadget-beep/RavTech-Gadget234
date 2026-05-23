
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, ChevronLeft, ChevronRight, Bookmark, 
  HelpCircle, Calculator, X, AlertTriangle,
  Flag, CheckSquare, Info
} from 'lucide-react';
import { spiQuestions, SPIQuestion } from '../data/spiQuestions';

interface RegistryEnvironmentProps {
  onComplete: (score: number) => void;
  onExit: () => void;
}

export const RegistryEnvironment: React.FC<RegistryEnvironmentProps> = ({ onComplete, onExit }) => {
  const [questions, setQuestions] = useState<SPIQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [marked, setMarked] = useState<Record<number, boolean>>({});
  const [showCalculator, setShowCalculator] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120 * 60); // 2 hours
  const [calcValue, setCalcValue] = useState('0');
  const [showTutorial, setShowTutorial] = useState(true);
  const [isFinalized, setIsFinalized] = useState(false);

  useEffect(() => {
    // Standard ARDMS length is usually higher, but we'll use a 50-item high-stakes subset
    const shuffled = [...spiQuestions].sort(() => 0.5 - Math.random()).slice(0, 50);
    setQuestions(shuffled);
  }, []);

  useEffect(() => {
    if (isFinalized || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [isFinalized, timeLeft]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCalcBtn = (val: string) => {
    if (val === 'C') {
      setCalcValue('0');
    } else if (val === '=') {
      try {
        // Simple safety check and evaluation
        // eslint-disable-next-line no-eval
        const result = eval(calcValue.replace(/×/g, '*').replace(/÷/g, '/'));
        setCalcValue(String(Number(result.toFixed(5))));
      } catch (e) {
        setCalcValue('Error');
        setTimeout(() => setCalcValue('0'), 1500);
      }
    } else {
      if (calcValue === '0' || calcValue === 'Error') setCalcValue(val);
      else setCalcValue(prev => prev + val);
    }
  };

  const calculateResult = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) correct++;
    });
    return Math.round((correct / questions.length) * 100);
  };

  if (questions.length === 0) return null;

  if (isFinalized) {
    const score = calculateResult();
    const passed = score >= 75; // ARDMS standard is roughly equivalent to this scaled
    return (
      <div className="fixed inset-0 bg-[#f0f2f5] z-[100] flex items-center justify-center p-8">
        <div className="bg-white p-12 max-w-2xl w-full border border-gray-300 shadow-2xl space-y-8 text-center font-sans">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            <CheckSquare size={48} />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-tighter">Preliminary Examination Results</h1>
            <p className="text-sm text-gray-500 font-medium italic">ARDMS Certification Simulation Matrix 4.0</p>
          </div>
          
          <div className="py-8 border-y border-gray-100">
             <div className="text-6xl font-black text-gray-900">{score}%</div>
             <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-widest">Scalable Registry Score</p>
          </div>

          <div className="text-left bg-gray-50 p-6 rounded-lg text-sm text-gray-600 leading-relaxed border border-gray-200">
            {passed ? (
              <p>Congratulations. Your neural alignment with ARDMS SPI physics is within the certification threshold. You have demonstrated mastery of ultrasound instrumentation and safety principles.</p>
            ) : (
              <p>The simulation indicates sub-optimal physics integration. It is recommended to revisit the Acoustic Field and Spectral Doppler labs to reconcile these knowledge gaps before a real registry attempt.</p>
            )}
          </div>

          <button 
            onClick={onExit}
            className="w-full py-4 bg-[#004a99] text-white font-bold uppercase tracking-widest hover:bg-[#003d7e] transition-colors"
          >
            Return to Command Center
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIdx];

  return (
    <div className="fixed inset-0 bg-[#f0f2f5] z-[100] flex flex-col font-sans">
      {/* Tutorial Overlay */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <div className="max-w-xl w-full bg-slate-900 rounded-[2.5rem] border border-white/10 p-10 md:p-14 space-y-8 hardware-border shadow-4xl relative overflow-hidden">
               <div className="absolute inset-0 scanline opacity-10 pointer-events-none" />
               <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-500/20"><Info size={32} /></div>
                    <div>
                      <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Simulation Protocol</h3>
                      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none">SPI Physics High-Stakes Matrix</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 text-slate-400 text-sm font-medium leading-relaxed italic">
                    <p>• You are about to enter a 50-question high-stakes simulation synchronized with ARDMS SPI standards.</p>
                    <p>• You have 120 minutes to complete all sequences.</p>
                    <p>• A physics calculator is accessible in the upper right neural link.</p>
                    <p>• Mark questions for review to revisit them before final state synchronization.</p>
                  </div>

                  <button 
                    onClick={() => setShowTutorial(false)}
                    className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:scale-105 transition-all"
                  >
                    Initialize Neural Stream
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Strict ARDMS Header */}
      <header className="bg-[#004a99] text-white px-8 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-6">
          <div className="font-bold text-lg tracking-tighter flex items-center gap-2">
             <ShieldCheck className="text-blue-200" size={24} />
             <span>Registry Simulator</span>
          </div>
          <div className="h-6 w-px bg-blue-800" />
          <div className="text-sm font-medium opacity-80">Candidate: Neural Student 01</div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">Time Remaining</span>
            <div className="text-2xl font-mono font-bold leading-none">{formatTime(timeLeft)}</div>
          </div>
          <button 
            onClick={() => setShowCalculator(true)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors border border-white/20"
            title="Calculator"
          >
            <Calculator size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-hidden flex">
        {/* Progress Sidebar */}
        <div className="hidden lg:flex w-72 bg-white border-r border-gray-200 flex-col">
           <div className="p-6 border-b border-gray-100">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Matrix Status</h4>
              <p className="text-xl font-black text-gray-900 tracking-tighter italic uppercase underline decoration-indigo-500 decoration-4 underline-offset-4">Question Grid</p>
           </div>
           <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              <div className="grid grid-cols-5 gap-2">
                 {questions.map((_, i) => (
                   <button
                     key={`grid-nav-${i}`}
                     onClick={() => {
                        setCurrentIdx(i);
                        setShowSummary(false);
                     }}
                     className={`aspect-square rounded-lg text-[10px] font-black transition-all flex flex-col items-center justify-center relative ${
                       currentIdx === i ? 'bg-indigo-600 text-white shadow-lg scale-110 z-10' :
                       answers[i] !== undefined ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                       'bg-gray-50 text-gray-400 border border-gray-100 hover:bg-gray-100'
                     }`}
                   >
                     {i + 1}
                     {marked[i] && (
                       <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-white shadow-sm" />
                     )}
                   </button>
                 ))}
              </div>
           </div>
           <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-slate-500 mb-2">
                 <span>Synapse Load</span>
                 <span>{Math.round((Object.keys(answers).length / questions.length) * 100)}%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                 <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }} />
              </div>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-12 flex justify-center bg-[#f8fafc]">
          <div className="max-w-4xl w-full">
           <AnimatePresence mode="wait">
             {!showSummary ? (
               <motion.div 
                 key={currentIdx}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="bg-white border border-gray-300 shadow-sm p-12 space-y-12"
               >
                 <div className="flex items-center justify-between border-b pb-6 border-gray-100">
                    <div className="text-xs font-black text-gray-400 uppercase tracking-widest">Question {currentIdx + 1} of {questions.length}</div>
                    <button 
                      onClick={() => setMarked(prev => ({ ...prev, [currentIdx]: !prev[currentIdx] }))}
                      className={`flex items-center gap-2 text-xs font-bold uppercase transition-colors ${marked[currentIdx] ? 'text-amber-600' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      <Flag size={14} fill={marked[currentIdx] ? "currentColor" : "none"} />
                      {marked[currentIdx] ? 'Marked for Review' : 'Mark for Review'}
                    </button>
                 </div>

                 <div className="space-y-10">
                    <h2 className="text-2xl font-bold text-gray-800 leading-snug">
                      {currentQ.question}
                    </h2>

                    <div className="grid gap-4">
                      {currentQ.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => setAnswers(prev => ({ ...prev, [currentIdx]: idx }))}
                          className={`group w-full p-6 text-left border-2 transition-all flex items-start gap-4 ${
                            answers[currentIdx] === idx 
                              ? 'bg-[#004a99]/5 border-[#004a99] ring-4 ring-[#004a99]/10' 
                              : 'bg-white border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-colors shrink-0 mt-0.5 ${
                            answers[currentIdx] === idx 
                              ? 'bg-[#004a99] border-[#004a99] text-white' 
                              : 'bg-gray-50 border-gray-300 text-gray-400 group-hover:border-gray-400'
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <span className={`text-lg font-medium ${answers[currentIdx] === idx ? 'text-[#004a99]' : 'text-gray-700'}`}>
                            {opt}
                          </span>
                        </button>
                      ))}
                    </div>
                 </div>
               </motion.div>
             ) : (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="bg-white border border-gray-300 shadow-sm p-12 space-y-8"
               >
                 <div className="border-b pb-6 space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">Examination Summary</h2>
                    <p className="text-sm text-gray-500 font-medium">Review your selections before final submission.</p>
                 </div>

                 <div className="grid grid-cols-10 gap-3">
                   {questions.map((_, i) => (
                     <button
                       key={i}
                       onClick={() => { setShowSummary(false); setCurrentIdx(i); }}
                       className={`aspect-square border rounded flex flex-col items-center justify-center text-[9px] font-bold transition-all relative ${
                         answers[i] !== undefined 
                           ? 'bg-blue-50 border-blue-200 text-blue-700' 
                           : 'bg-gray-50 border-gray-300 text-gray-400 hover:bg-gray-100'
                       }`}
                     >
                       <span>{i + 1}</span>
                       {marked[i] && (
                         <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-white shadow-sm" />
                       )}
                     </button>
                   ))}
                 </div>

                 <div className="flex gap-4 p-6 bg-amber-50 border border-amber-100 rounded-lg text-xs font-medium text-amber-700 leading-relaxed">
                   <AlertTriangle size={18} className="shrink-0" />
                   <p>Warning: Finalizing this simulation will submit your results for scoring. You will not be able to revisit or modify your answers after synchronization.</p>
                 </div>

                 <div className="flex justify-between items-center pt-8 border-t">
                    <button 
                      onClick={() => setShowSummary(false)}
                      className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors uppercase tracking-widest"
                    >
                      <ChevronLeft size={16} /> Back to Questions
                    </button>
                    <button 
                      onClick={() => setIsFinalized(true)}
                      className="px-10 py-5 bg-[#d97706] text-white font-black uppercase tracking-widest hover:bg-[#b45309] transition-all shadow-xl"
                    >
                      Finalize & Synchronize State
                    </button>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
        </div>
      </main>

      {/* Footer Navigation */}
      {!showSummary && (
        <footer className="bg-white border-t border-gray-300 px-8 py-6 flex items-center justify-between shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          <div className="flex gap-4">
             <button 
               onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
               disabled={currentIdx === 0}
               className="flex items-center gap-2 px-8 py-3 bg-gray-100 text-gray-600 rounded-lg font-bold uppercase text-xs tracking-widest disabled:opacity-50 hover:bg-gray-200 transition-colors"
             >
               <ChevronLeft size={16} /> Previous
             </button>
             <button 
               onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
               disabled={currentIdx === questions.length - 1}
               className="flex items-center gap-2 px-8 py-3 bg-gray-100 text-gray-600 rounded-lg font-bold uppercase text-xs tracking-widest disabled:opacity-50 hover:bg-gray-200 transition-colors"
             >
               Next <ChevronRight size={16} />
             </button>
          </div>

          <button 
            onClick={() => setShowSummary(true)}
            className="px-10 py-3 bg-[#004a99] text-white rounded-lg font-bold uppercase text-xs tracking-widest hover:bg-[#003d7e] transition-colors"
          >
            Review Summary
          </button>
        </footer>
      )}

      {/* Calculator Modal */}
      <AnimatePresence>
        {showCalculator && (
          <motion.div 
            drag
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.95, x: 0, y: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-24 right-8 bg-[#2d3436] rounded-xl p-4 shadow-3xl w-64 z-[110] border border-gray-700 cursor-move"
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-700">
               <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Physics Calculator</span>
               <button onClick={() => setShowCalculator(false)} className="text-gray-500 hover:text-white"><X size={16} /></button>
            </div>
            <div className="bg-[#1e272e] p-4 text-right rounded-lg mb-4 text-white font-mono text-2xl truncate">
              {calcValue}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','C','='].map(btn => (
                <button 
                  key={btn}
                  onClick={() => handleCalcBtn(btn)}
                  className={`p-3 rounded-lg font-bold transition-all active:scale-95 ${
                    btn === '=' ? 'bg-indigo-600 text-white hover:bg-indigo-500' :
                    btn === 'C' ? 'bg-rose-900/40 text-rose-400 hover:bg-rose-900/60' :
                    ['/','*','-','+'].includes(btn) ? 'bg-slate-700 text-indigo-400 hover:bg-slate-600' :
                    'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {btn === '*' ? '×' : btn === '/' ? '÷' : btn}
                </button>
              ))}
              <button 
                onClick={() => handleCalcBtn('+')}
                className="col-span-4 p-3 rounded-lg bg-slate-700 text-indigo-400 font-bold hover:bg-slate-600 transition-all active:scale-95"
              >
                +
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import { ShieldCheck } from 'lucide-react';
