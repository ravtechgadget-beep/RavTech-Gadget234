
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, MessageSquare, Send, Heart, Share2, 
  Plus, Users2, Clock, Globe, Lock, MoreVertical,
  Award, Zap, Star, User
} from 'lucide-react';
import { db, auth } from '../firebase';
import { 
  collection, query, orderBy, limit, onSnapshot, 
  addDoc, serverTimestamp, updateDoc, doc, increment,
  where
} from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';

interface Post {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  content: string;
  type: 'achievement' | 'question' | 'status';
  likes: number;
  createdAt: any;
}

interface StudyGroup {
  id: string;
  name: string;
  activeUsers: string[];
  topic: string;
  timer: number;
  isPrivate: boolean;
}

interface Poll {
  id: string;
  question: string;
  options: { text: string; votes: number }[];
  totalVotes: number;
}

export const NeuralCommunity: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [poll, setPoll] = useState<Poll | null>(null);
  const [newPostContent, setNewPostContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [activeTab, setActiveTab] = useState<'feed' | 'pools' | 'polls'>('feed');

  // Listen to community feed
  useEffect(() => {
    const q = query(collection(db, 'community_feed'), orderBy('createdAt', 'desc'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[];
      setPosts(newPosts);
    });
    return () => unsubscribe();
  }, []);

  // Listen to daily poll
  useEffect(() => {
    const q = query(collection(db, 'registry_polls'), limit(1));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setPoll({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Poll);
      } else {
        // Seed initial poll if missing
        seedInitialPoll();
      }
    });
    return () => unsubscribe();
  }, []);

  const seedInitialPoll = async () => {
    try {
      await addDoc(collection(db, 'registry_polls'), {
        question: "Which artifact is currently causing the most 'Neural Drift' on the SPI?",
        options: [
          { text: "Mirror Image logic", votes: 42 },
          { text: "Refraction lateral shift", votes: 18 },
          { text: "Speed error displacement", votes: 31 },
          { text: "Beam width artifact", votes: 12 }
        ],
        totalVotes: 103
      });
    } catch (e) {
      console.error("Poll seeding failed:", e);
    }
  };

  // Listen to study groups
  useEffect(() => {
    const q = query(collection(db, 'study_groups'), where('isPrivate', '==', false), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newGroups = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as StudyGroup[];
      setGroups(newGroups);
    });
    return () => unsubscribe();
  }, []);

  const handleCreatePost = async () => {
    if (!newPostContent.trim() || !auth.currentUser) return;
    setIsPosting(true);
    try {
      await addDoc(collection(db, 'community_feed'), {
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName || 'Anonymous Candidate',
        userPhoto: auth.currentUser.photoURL || '',
        content: newPostContent,
        type: 'status',
        likes: 0,
        createdAt: Date.now() // Simple timestamp for sorting
      });
      setNewPostContent('');
    } catch (error) {
      console.error("Posting error:", error);
    } finally {
      setIsPosting(false);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      const postRef = doc(db, 'community_feed', postId);
      await updateDoc(postRef, {
        likes: increment(1)
      });
    } catch (error) {
      console.error("Liking error:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-12 space-y-12">
      <header className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
             <div className="p-4 bg-emerald-600 rounded-3xl shadow-2xl shadow-emerald-500/40">
               <Users className="text-white" size={32} />
             </div>
             <div>
               <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none text-gradient">Neural Community</h2>
               <p className="text-emerald-400 font-black uppercase text-[10px] tracking-[0.4em] mt-1">Status: High-Frequency Synchronization Active</p>
             </div>
          </div>
        </div>

        <div className="flex bg-black/40 p-1.5 rounded-full border border-white/5 shadow-inner">
           {['feed', 'pools', 'polls'].map((tab) => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                 activeTab === tab ? 'bg-white text-black shadow-lg scale-105' : 'text-slate-500 hover:text-white'
               }`}
             >
               {tab === 'feed' ? 'Neural Feed' : tab === 'pools' ? 'Study Pools' : 'Registry Polls'}
             </button>
           ))}
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'feed' ? (
            <>
              {/* Post Creator */}
              <div className="glass-panel p-8 rounded-[2.5rem] border border-white/10 space-y-6 relative overflow-hidden">
                <div className="absolute inset-0 neural-grid opacity-[0.05] pointer-events-none" />
                <div className="flex gap-6 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 overflow-hidden flex-shrink-0 shadow-lg">
                    {auth.currentUser?.photoURL ? (
                      <img src={auth.currentUser.photoURL} alt="Me" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-indigo-400"><Users2 size={24} /></div>
                    )}
                  </div>
                  <div className="flex-1 space-y-4">
                    <textarea 
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      placeholder="Broadcast a neural update or registry query..."
                      className="w-full bg-transparent border-none text-white placeholder-slate-600 focus:ring-0 resize-none font-medium p-0 min-h-[100px]"
                    />
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex gap-4">
                        <button className="text-slate-500 hover:text-emerald-400 transition-colors"><Zap size={20} /></button>
                        <button className="text-slate-500 hover:text-indigo-400 transition-colors"><Award size={20} /></button>
                      </div>
                      <button 
                        onClick={handleCreatePost}
                        disabled={isPosting || !newPostContent.trim()}
                        className="px-8 py-3 bg-white text-black rounded-full font-black uppercase text-[10px] tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
                      >
                        {isPosting ? 'Broadcasting...' : 'Broadcast'}
                        <Send size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feed Logic */}
              <div className="space-y-8">
                <AnimatePresence mode="popLayout">
                  {posts.map((post) => (
                    <motion.div 
                      key={post.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="glass-panel p-8 rounded-[2.5rem] border border-white/5 space-y-6 group hover:border-white/10 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 overflow-hidden shadow-inner">
                            {post.userPhoto ? (
                              <img src={post.userPhoto} alt={post.userName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-700 bg-slate-900"><Users2 size={20} /></div>
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-black text-white italic uppercase tracking-tighter">{post.userName}</p>
                            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                              {post.createdAt ? formatDistanceToNow(post.createdAt) + ' ago' : 'Transmitting...'}
                            </p>
                          </div>
                        </div>
                        <button className="text-slate-700 hover:text-white transition-colors"><MoreVertical size={16} /></button>
                      </div>

                      <div className="text-sm md:text-base font-medium text-slate-300 leading-relaxed italic">
                        {post.content}
                      </div>

                      <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                        <button 
                          onClick={() => handleLike(post.id)}
                          className="flex items-center gap-2 text-slate-500 hover:text-rose-500 transition-colors group/like"
                        >
                          <Heart size={18} className="group-hover/like:fill-rose-500" />
                          <span className="text-[10px] font-black">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-slate-500 hover:text-indigo-400 transition-colors">
                          <MessageSquare size={18} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Discuss</span>
                        </button>
                        <button className="flex items-center gap-2 text-slate-500 hover:text-emerald-400 transition-colors">
                          <Share2 size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {posts.length === 0 && (
                  <div className="p-20 text-center space-y-6">
                    <div className="flex justify-center"><Globe size={64} className="text-slate-800 animate-pulse" /></div>
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Listening for community broadcasts...</p>
                  </div>
                )}
              </div>
            </>
          ) : activeTab === 'pools' ? (
            <div className="grid sm:grid-cols-2 gap-8">
               <motion.button 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="p-12 border-2 border-dashed border-white/10 rounded-[3rem] flex flex-col items-center justify-center text-center space-y-4 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
               >
                 <div className="p-4 bg-emerald-500/10 rounded-full text-emerald-500 group-hover:scale-110 transition-transform">
                   <Plus size={32} />
                 </div>
                 <p className="text-xs font-black text-white uppercase tracking-widest leading-none">Initialize New Study Pool</p>
                 <p className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em]">Scale your learning collaboratively</p>
               </motion.button>

               {groups.map((group) => (
                 <div key={group.id} className="glass-panel p-8 rounded-[3rem] border border-white/5 space-y-6 flex flex-col justify-between hover:scale-[1.02] transition-all">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                         <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${group.isPrivate ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                           {group.isPrivate ? 'Private Lab' : 'Standard Pool'}
                         </div>
                         <div className="flex items-center gap-1 text-slate-500">
                           <Users2 size={14} />
                           <span className="text-[10px] font-black">{group.activeUsers.length}</span>
                         </div>
                      </div>
                      <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">{group.name}</h4>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">{group.topic}</p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="flex items-center gap-2 text-indigo-400 font-mono text-[10px]">
                        <Clock size={12} />
                        <span>{Math.floor(group.timer / 60)}:{(group.timer % 60).toString().padStart(2, '0')}</span>
                      </div>
                      <button className="px-6 py-2 bg-white text-black rounded-xl font-black uppercase text-[8px] tracking-widest shadow-lg hover:bg-emerald-500 hover:text-white transition-all">Synchronize</button>
                    </div>
                 </div>
               ))}
            </div>
          ) : (
            <div className="space-y-12">
               {poll && (
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="glass-panel p-12 rounded-[3.5rem] border border-white/10 space-y-8 relative overflow-hidden"
                 >
                   <div className="absolute inset-0 bg-indigo-600/5 neural-grid opacity-[0.05]" />
                   <div className="space-y-4 relative z-10">
                      <div className="inline-flex items-center gap-3 px-4 py-2 bg-indigo-500/10 rounded-full border border-indigo-500/20">
                         <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                         <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Active Registry Pulse</span>
                      </div>
                      <h3 className="text-2xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-tight">
                        {poll.question}
                      </h3>
                   </div>

                   <div className="space-y-6 relative z-10">
                      {poll.options.map((opt, i) => {
                        const percentage = poll.totalVotes > 0 ? Math.round((opt.votes / poll.totalVotes) * 100) : 0;
                        return (
                          <div key={i} className="space-y-2 group cursor-pointer">
                            <div className="flex justify-between items-end">
                               <p className="text-xs font-black text-slate-200 uppercase tracking-widest">{opt.text}</p>
                               <span className="text-[10px] font-mono text-indigo-400">{percentage}%</span>
                            </div>
                            <div className="h-6 w-full bg-white/5 rounded-2xl overflow-hidden border border-white/10 p-[1px]">
                               <motion.div 
                                 initial={{ width: 0 }}
                                 animate={{ width: `${percentage}%` }}
                                 className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-2xl shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                               />
                            </div>
                          </div>
                        );
                      })}
                   </div>

                   <div className="pt-8 border-t border-white/5 flex items-center justify-between relative z-10">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Neural Consensus: {poll.totalVotes} Votes</p>
                      <button className="px-8 py-3 bg-white text-black rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all">Submit Vote</button>
                   </div>
                 </motion.div>
               )}

               <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-10 bg-slate-900 border border-indigo-500/20 rounded-[3rem] space-y-6">
                     <h4 className="text-lg font-black text-white italic uppercase flex items-center gap-3 tracking-tighter">
                       <Zap className="text-indigo-400" /> Harvey's Insight
                     </h4>
                     <p className="text-xs font-medium text-slate-400 uppercase tracking-[0.2em] leading-relaxed italic">
                       "Most candidates are miscalculating the 13-microsecond rule because they're ignoring the round-trip factor. Physics isn't just about the numbers; it's about the travel time."
                     </p>
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400"><User size={16} /></div>
                        <span className="text-[10px] font-black text-indigo-100 uppercase tracking-widest">Neural Tutor: Harvey</span>
                     </div>
                  </div>

                  <div className="p-10 bg-emerald-600/10 border border-emerald-500/20 rounded-[3rem] space-y-6">
                     <h4 className="text-lg font-black text-white italic uppercase flex items-center gap-3 tracking-tighter">
                       <Award className="text-emerald-400" /> Prediction Model
                     </h4>
                     <p className="text-xs font-medium text-slate-400 uppercase tracking-[0.2em] leading-relaxed italic">
                       Current consensus predicts a 15% increase in artifact-heavy questions for the Q3 2026 registry window.
                     </p>
                     <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-emerald-500" />
                     </div>
                  </div>
               </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="glass-panel p-8 rounded-[2.5rem] border border-white/10 space-y-8">
            <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
              <Star className="text-amber-500" size={18} /> High-Frequency Performers
            </h3>
            <div className="space-y-6">
              {[
                { name: 'Dr. Echo Specialist', rank: 1, points: 14200 },
                { name: 'Sonic_Pulse_01', rank: 2, points: 12100 },
                { name: 'PhysicsMatrix', rank: 3, points: 11500 }
              ].map((user, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black text-slate-700 w-4">#{user.rank}</span>
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-white/10" />
                    <p className="text-[10px] font-black text-indigo-100 uppercase tracking-tight group-hover:text-amber-500 transition-colors cursor-pointer">{user.name}</p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{user.points} XP</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none rotate-12"><Zap size={200} /></div>
            <div className="relative z-10 space-y-4">
              <h4 className="text-lg font-black uppercase italic tracking-tight leading-none leading-tight">Registry Momentum</h4>
              <p className="text-[10px] font-medium text-indigo-100 uppercase tracking-widest leading-relaxed opacity-80">
                Join a "Clinical Dash" pool to accelerate your deconstruction of Transducer Physics alongside 12 other candidates.
              </p>
              <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all">Join Pulse</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
