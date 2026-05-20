import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Eye, HelpCircle, PenTool, Image as ImageIcon } from 'lucide-react';
import { addBlogPost, BlogPost } from '../lib/blogStore';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: (post: BlogPost) => void;
}

const CATEGORIES = ["Engineering", "Software", "Sustainability", "AI"];

const IMAGE_PRESETS = [
  {
    name: "Modern Labs",
    url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80",
    color: "from-cyan-500 to-blue-600"
  },
  {
    name: "Pure Code",
    url: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80",
    color: "from-blue-600 to-indigo-600"
  },
  {
    name: "Clean Wind Energy",
    url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80",
    color: "from-emerald-500 to-teal-600"
  },
  {
    name: "Futuristic Earth",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
    color: "from-violet-600 to-indigo-600"
  }
];

export default function NewPostModal({ isOpen, onClose, onPostCreated }: NewPostModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Engineering');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageOption, setImageOption] = useState<'preset' | 'custom'>('preset');
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [customImageUrl, setCustomImageUrl] = useState('');
  
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState('');

  // Clear state on open/close
  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setCategory('Engineering');
      setExcerpt('');
      setContent('');
      setImageOption('preset');
      setSelectedPreset(0);
      setCustomImageUrl('');
      setError('');
      setShowPreview(false);
    }
  }, [isOpen]);

  const calculateReadTime = (text: string): string => {
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    return `${minutes} min read`;
  };

  const currentImageUrl = imageOption === 'preset' 
    ? IMAGE_PRESETS[selectedPreset].url 
    : (customImageUrl.trim() || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!excerpt.trim()) {
      setError('A brief teaser excerpt is required for cards styling');
      return;
    }
    if (!content.trim()) {
      setError('Blog text content is required');
      return;
    }
    if (imageOption === 'custom' && !customImageUrl.trim()) {
      setError('Please provide a valid image web URL or choose a preset configuration');
      return;
    }

    try {
      const readTime = calculateReadTime(content);
      const newPost = addBlogPost({
        title: title.trim(),
        category,
        excerpt: excerpt.trim(),
        content: content.trim(),
        readTime,
        image: currentImageUrl
      });

      onPostCreated(newPost);
      onClose();
    } catch (err) {
      setError('Failed to publish the post. Please check your system logs.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay background */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-950/40 dark:bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white dark:bg-gray-950 rounded-[2.5rem] border border-gray-100 dark:border-white/5 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <header className="flex items-center justify-between p-6 md:p-8 border-b border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-cyan-600/10 rounded-2xl flex items-center justify-center text-cyan-600">
                  <PenTool size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white leading-tight">Create Publication</h3>
                  <p className="text-gray-400 text-xs">Aesthetic article draft and publishing control</p>
                </div>
              </div>

              <button 
                onClick={onClose}
                className="p-2 bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-gray-400 dark:text-gray-300 rounded-xl transition-all"
              >
                <X size={20} />
              </button>
            </header>

            {/* Error display */}
            {error && (
              <div className="mx-6 md:mx-8 mt-4 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold rounded-2xl">
                {error}
              </div>
            )}

            {/* Content body split into Form vs Live Preview */}
            <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-6">
              <div className="flex gap-4 border-b border-gray-100 dark:border-white/5 pb-4">
                <button
                  onClick={() => setShowPreview(false)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${!showPreview ? 'bg-cyan-600 text-white shadow-xl shadow-cyan-600/20' : 'text-gray-400 hover:text-gray-700'}`}
                >
                  Editor Panel
                </button>
                <button
                  onClick={() => setShowPreview(true)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${showPreview ? 'bg-cyan-600 text-white shadow-xl shadow-cyan-600/20' : 'text-gray-400 hover:text-gray-700'}`}
                >
                  <span className="flex items-center gap-1.5"><Eye size={14} /> Live Canvas Preview</span>
                </button>
              </div>

              {!showPreview ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Grid fields */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest">Publication Title</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Transient Heat Conduction in Anisotropic Systems"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-5 py-3.5 bg-gray-50 focus:bg-white dark:bg-white/5 border border-transparent focus:border-cyan-600 dark:focus:border-cyan-400 rounded-2xl outline-none font-bold text-sm text-gray-900 dark:text-white transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest">Category Focus</label>
                      <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-5 py-3.5 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-cyan-600 dark:focus:border-cyan-400 rounded-2xl outline-none font-bold text-sm text-gray-700 dark:text-gray-300 transition-all cursor-pointer"
                      >
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Teaser text / Excerpt */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest">Summary/Teaser Excerpt</label>
                    <input 
                      type="text" 
                      placeholder="Brief 1-2 sentence high-level outline shown on cards..."
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      className="w-full px-5 py-3.5 bg-gray-50 focus:bg-white dark:bg-white/5 border border-transparent focus:border-cyan-600 dark:focus:border-cyan-400 rounded-2xl outline-none font-bold text-sm text-gray-900 dark:text-white transition-all"
                      required
                    />
                  </div>

                  {/* Visual Sourcing */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest flex items-center gap-1.5"><ImageIcon size={14} /> Publication Cover Image</label>
                      <div className="flex bg-gray-50 dark:bg-white/5 p-1 rounded-xl border border-gray-100 dark:border-white/5 text-[10px] font-black uppercase tracking-widest">
                        <button 
                          type="button" 
                          onClick={() => setImageOption('preset')}
                          className={`px-3 py-1.5 rounded-lg transition-all ${imageOption === 'preset' ? 'bg-white dark:bg-white/10 text-cyan-600' : 'text-gray-400'}`}
                        >
                          Curated Presets
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setImageOption('custom')}
                          className={`px-3 py-1.5 rounded-lg transition-all ${imageOption === 'custom' ? 'bg-white dark:bg-white/10 text-cyan-600' : 'text-gray-400'}`}
                        >
                          Custom Web URL
                        </button>
                      </div>
                    </div>

                    {imageOption === 'preset' ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {IMAGE_PRESETS.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setSelectedPreset(idx)}
                            className={`p-1.5 rounded-2xl border transition-all text-left flex flex-col gap-2 relative group-preset overflow-hidden ${selectedPreset === idx ? 'border-cyan-600 bg-cyan-50/20 dark:bg-cyan-950/20' : 'border-gray-100 dark:border-white/5 hover:border-gray-200'}`}
                          >
                            <div className="aspect-[16/10] rounded-xl overflow-hidden relative">
                              <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                              <div className={`absolute inset-0 bg-gradient-to-tr ${preset.color} opacity-20`} />
                            </div>
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 truncate px-1">{preset.name}</span>
                            {selectedPreset === idx && (
                              <div className="absolute top-2 right-2 w-6 h-6 bg-cyan-600 rounded-lg flex items-center justify-center text-white text-xs shadow-md">
                                <Check size={14} />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <input 
                        type="url" 
                        placeholder="https://images.unsplash.com/photo-..."
                        value={customImageUrl}
                        onChange={(e) => setCustomImageUrl(e.target.value)}
                        className="w-full px-5 py-3.5 bg-gray-50 focus:bg-white dark:bg-white/5 border border-transparent focus:border-cyan-600 dark:focus:border-cyan-400 rounded-2xl outline-none font-bold text-sm text-gray-900 dark:text-white transition-all"
                      />
                    )}
                  </div>

                  {/* Body Text Editor */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest">Main Manuscript Content (Supports Markdown)</label>
                      <span className="text-[10px] text-gray-400 font-bold tabular-nums">Auto-estimated: {calculateReadTime(content)}</span>
                    </div>
                    <textarea 
                      placeholder="Write your research, analysis, or development notes here. Use Markdown tags like ## Header and equations seamlessly."
                      rows={12}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full px-5 py-4 bg-gray-50 focus:bg-white dark:bg-white/5 border border-transparent focus:border-cyan-600 dark:focus:border-cyan-400 rounded-[2rem] outline-none font-medium text-sm text-gray-900 dark:text-white transition-all resize-none font-sans"
                      required
                    />
                  </div>
                </form>
              ) : (
                /* Live Preview Canvas */
                <div className="space-y-6">
                  <div className="aspect-[21/9] rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/5 shadow-md relative">
                    <img 
                      src={currentImageUrl} 
                      alt="Publication Cover" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-600 text-white text-xs font-black uppercase tracking-wider shadow-lg">
                        {category}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 max-w-2xl">
                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-500 tabular-nums">
                      CALCULATED: {calculateReadTime(content)}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight">
                      {title || 'Untitled Publication Draft'}
                    </h1>
                    <p className="text-base text-gray-500 dark:text-gray-400 italic font-medium border-l-2 border-cyan-500 pl-4 py-1">
                      {excerpt || 'A teaser excerpt will be shown in cards and headers.'}
                    </p>
                  </div>

                  <div className="prose dark:prose-invert max-w-none border-t border-gray-100 dark:border-white/5 pt-6 text-gray-700 dark:text-gray-300 whitespace-pre-line text-sm leading-relaxed">
                    {content || 'Start editing code/text content to display live layout.'}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <footer className="flex items-center justify-between p-6 md:p-8 bg-gray-50 dark:bg-white/[0.02] border-t border-gray-100 dark:border-white/5">
              <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1"><HelpCircle size={12} /> Live writing syncs directly to local workspace storage</span>
              
              <div className="flex gap-3">
                <button 
                  onClick={onClose}
                  className="px-6 py-3 bg-white hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-gray-800 dark:text-white font-bold rounded-2xl text-xs uppercase tracking-widest transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-cyan-600/20 active:scale-95 transition-all cursor-pointer"
                >
                  Publish Post
                </button>
              </div>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
