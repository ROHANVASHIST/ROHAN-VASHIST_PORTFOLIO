import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initAuth, logout } from '../lib/auth';
import { getBlogPosts, saveBlogPosts, BlogPost } from '../lib/blogStore';
import NewPostModal from '../components/NewPostModal';
import { LayoutDashboard, Plus, Trash2, ArrowRight, LogOut, BookOpen, ThumbsUp, Calendar } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    initAuth(
      () => {
        setLoading(false);
        setPosts(getBlogPosts());
      },
      () => navigate('/admin/login')
    );
  }, [navigate]);

  const handleDeletePost = (id: string) => {
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated);
    saveBlogPosts(updated);
  };

  const handlePostCreated = (newPost: BlogPost) => {
    setPosts(getBlogPosts());
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Verifying Credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto py-32 px-6">
      {/* Admin Panel Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-gray-100 dark:border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-[1.25rem] flex items-center justify-center shadow-xl">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-[0.3em]">System Admin Console</span>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mt-1 leading-none">Rohan's Work Desk</h1>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-2xl text-xs uppercase tracking-widest transition-all shadow-xl shadow-cyan-600/10 cursor-pointer"
          >
            <Plus size={16} /> New Publication
          </button>
          <button 
            onClick={async () => { await logout(); navigate('/admin/login'); }}
            className="inline-flex items-center gap-2 px-5 py-3.5 bg-gray-100 dark:bg-white/5 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 text-gray-700 dark:text-gray-300 font-bold rounded-2xl text-xs uppercase tracking-widest transition-all cursor-pointer"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      {/* Stats Counter Widget */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="p-6 bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-3xl">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Articles</span>
          <p className="text-3xl font-black text-gray-900 dark:text-white mt-2 tabular-nums">{posts.length}</p>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-3xl">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active System</span>
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-2">ONLINE</p>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-3xl">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Database Provider</span>
          <p className="text-xl font-black text-gray-900 dark:text-white mt-3 truncate">Local Storage</p>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-3xl">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Workspace Core</span>
          <p className="text-xl font-black text-gray-900 dark:text-white mt-3">Ready</p>
        </div>
      </section>

      {/* Main Publications Table */}
      <section className="bg-white dark:bg-gray-950 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden p-6 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white">Active Feed Articles</h3>
            <p className="text-gray-400 text-xs">Verify metadata, delete posts, or read live publications</p>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-gray-100 dark:border-white/5 rounded-3xl">
            <BookOpen size={40} className="text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">No active publications</h4>
            <p className="text-gray-400 text-xs mt-1 max-w-xs mx-auto">Create a new post to populate the workspace blog and display scientific material.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div 
                key={post.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-gray-50/50 hover:bg-gray-50 dark:bg-white/[0.01] dark:hover:bg-white/[0.03] rounded-2xl border border-gray-100/60 dark:border-white/[0.02] transition-colors gap-6"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 dark:border-white/10">
                    <img src={post.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <span className="inline-block text-[9px] font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-widest bg-cyan-50 dark:bg-cyan-950/20 px-2 py-0.5 rounded mb-1.5">{post.category}</span>
                    <h4 className="text-base font-black text-gray-900 dark:text-white truncate pr-4">{post.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500 mt-1">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <button 
                    onClick={() => navigate(`/blog/${post.id}`)}
                    className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 hover:gap-1.5 transition-all p-2"
                  >
                    View Post <ArrowRight size={14} />
                  </button>
                  <button 
                    onClick={() => handleDeletePost(post.id)}
                    className="p-3 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 rounded-xl transition-all cursor-pointer"
                    title="Delete post permanently"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Creation Modal Modal Setup */}
      <NewPostModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onPostCreated={handlePostCreated} 
      />
    </main>
  );
}
