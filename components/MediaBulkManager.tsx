
import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UploadCloud, FileImage, Film, Trash2, 
  CheckCircle, AlertCircle, Loader2, X,
  Plus, ImageIcon, Video, Save, Database
} from 'lucide-react';
import { toast } from 'sonner';

interface MediaFile {
  id: string;
  file: File;
  preview: string;
  title: string;
  category: string;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  progress: number;
}

export const MediaBulkManager: React.FC = () => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []) as File[];
    const newFiles: MediaFile[] = selectedFiles.map((file: File) => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : '',
      title: file.name.split('.')[0],
      category: 'reference',
      status: 'pending',
      progress: 0
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => {
      const filtered = prev.filter(f => f.id !== id);
      // Revoke preview URL to save memory
      const removed = prev.find(f => f.id === id);
      if (removed?.preview) URL.revokeObjectURL(removed.preview);
      return filtered;
    });
  };

  const updateFileData = (id: string, data: Partial<MediaFile>) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, ...data } : f));
  };

  const startBulkUpload = async () => {
    if (files.length === 0) return;
    setIsUploading(true);

    for (let i = 0; i < files.length; i++) {
      const media = files[i];
      if (media.status === 'completed') continue;

      updateFileData(media.id, { status: 'uploading' });

      // Simulate upload progress
      for (let p = 0; p <= 100; p += 20) {
        updateFileData(media.id, { progress: p });
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // In a real app, we would use Firebase Storage or an API here.
      // For this implementation, we simulate success and log the metadata.
      console.log(`[Admin] Uploaded media: ${media.title} (${media.file.type})`);
      
      updateFileData(media.id, { status: 'completed', progress: 100 });
    }

    setIsUploading(false);
    toast.success('Bulk media synchronization complete', {
      description: `Targeted ${files.length} assets successfully.`
    });
  };

  return (
    <div className="p-10 bg-slate-900 border border-white/5 rounded-[3rem] space-y-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-indigo-600/5 blur-[120px] pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 flex items-center gap-3">
             <UploadCloud size={16} /> Bulk Media Integration
          </h3>
          <p className="text-slate-500 font-bold uppercase text-[9px] tracking-widest mt-2">Inject high-fidelity reference assets into the neural archives.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <input 
            type="file" 
            multiple 
            accept="image/*,video/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileSelect}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all flex items-center gap-3"
          >
            <Plus size={16} /> Select Media
          </button>
          
          <button 
            onClick={startBulkUpload}
            disabled={isUploading || files.length === 0}
            className={`px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-2xl flex items-center gap-3 ${
              isUploading || files.length === 0
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-105 active:scale-95'
            }`}
          >
            {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Commit Synthesis
          </button>
        </div>
      </div>

      <AnimatePresence>
        {files.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
          >
            {files.map((file) => (
              <motion.div 
                key={file.id}
                layout
                className="p-6 bg-black/40 border border-white/10 rounded-3xl space-y-6 group hover:border-indigo-500/30 transition-colors"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-800 flex items-center justify-center border border-white/5">
                  {file.preview ? (
                    <img src={file.preview} className="w-full h-full object-cover" alt="Preview" />
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-slate-600">
                      <Film size={32} />
                      <span className="text-[10px] font-black uppercase">Video Stream</span>
                    </div>
                  )}
                  
                  <button 
                    onClick={() => removeFile(file.id)}
                    className="absolute top-4 right-4 p-2 bg-rose-500 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600"
                  >
                    <Trash2 size={14} />
                  </button>

                  {file.status === 'completed' && (
                    <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-[2px] flex items-center justify-center">
                      <div className="p-3 bg-emerald-500 text-white rounded-full shadow-2xl">
                        <CheckCircle size={24} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      value={file.title}
                      onChange={(e) => updateFileData(file.id, { title: e.target.value })}
                      placeholder="Asset Title"
                      className="w-full bg-transparent border-none p-0 text-xs font-black uppercase text-white tracking-widest focus:ring-0 placeholder:text-slate-700"
                    />
                    <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest mt-1">
                      {Math.round(file.file.size / 1024 / 1024 * 100) / 100} MB • {file.file.type.split('/')[1].toUpperCase()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {['reference', 'pathology', 'artifact', 'knobology'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => updateFileData(file.id, { category: cat })}
                        className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${
                          file.category === cat 
                          ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' 
                          : 'bg-white/5 text-slate-600 hover:text-slate-400'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {file.status === 'uploading' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-[8px] font-black uppercase text-indigo-400 tracking-widest">
                        <span>Reconstructing...</span>
                        <span>{file.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${file.progress}%` }}
                          className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="p-20 border-2 border-dashed border-white/5 rounded-[2rem] flex flex-col items-center justify-center space-y-6 group cursor-pointer hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all"
          >
            <div className="p-8 bg-white/5 rounded-full text-slate-700 group-hover:text-indigo-400 group-hover:scale-110 transition-all">
              <UploadCloud size={64} />
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm font-black text-white uppercase tracking-widest">Empty Buffer Matrix</p>
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">Drag and drop media or click to select archives</p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
