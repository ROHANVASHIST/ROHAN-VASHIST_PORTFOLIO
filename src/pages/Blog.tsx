import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Calendar, Clock, ArrowRight, Tag, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getBlogPosts, BlogPost } from '../lib/blogStore';
import NewPostModal from '../components/NewPostModal';

const CATEGORIES = ["All", "Engineering", "Software", "Sustainability", "AI"];

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setSubStatus('success');
        setEmail('');
      } else {
        setSubStatus('error');
      }
    } catch {
      setSubStatus('error');
    }
  };

  useEffect(() => {
    setPosts(getBlogPosts());
  }, []);

  const handlePostCreated = (newPost: BlogPost) => {
    setPosts(getBlogPosts());
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="max-w-6xl mx-auto py-20 px-6 mt-16 md:mt-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
        <div className="max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-gray-900 dark:text-white mb-6"
          >
            Insights & Articles
          </motion.h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
            Deep dives into the intersection of engineering complexity and digital simplicity. 
            Sharing what I learn about AI, sustainability, and software craft.
          </p>
        </div>
        <div className="flex-shrink-0 self-start md:self-center">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-2xl shadow-xl shadow-cyan-600/20 hover:scale-[1.02] active:scale-95 transition-all text-xs uppercase tracking-widest cursor-pointer"
          >
            <Plus size={16} /> Add Publication
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === category
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-gray-100 dark:bg-gray-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-cyan-600 dark:text-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="flex flex-col bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden group shadow-sm hover:shadow-2xl transition-all"
          >
            <Link to={`/blog/${post.id}`} className="block aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.05]"
              />
            </Link>
            
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider">
                  <Tag className="w-3 h-3" />
                  {post.category}
                </span>
                <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </div>
              </div>

              <Link to={`/blog/${post.id}`} className="block group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {post.title}
                </h3>
              </Link>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="mt-auto pt-6 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500 dark:text-gray-500">{post.date}</span>
                </div>
                <Link 
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-cyan-600 dark:text-cyan-400 hover:gap-2 transition-all"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-20 bg-gray-50/50 dark:bg-gray-900/40 rounded-[2.5rem] border border-dashed border-gray-200 dark:border-gray-800 p-8 max-w-xl mx-auto">
          <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Search className="w-6 h-6 text-gray-400" />
          </div>
          {posts.length === 0 ? (
            <>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">No publications yet</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mx-auto">
                I'm currently drafting deep dives. Stay tuned for insights on research, sustainable scaling, and systems architectures.
              </p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">No search matches</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mx-auto mb-6">
                No matching articles could be found for your keyword "{searchQuery}" in category "{activeCategory}".
              </p>
              <button 
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                className="px-6 py-3 bg-gray-950 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-xs uppercase tracking-widest transition-all hover:bg-black dark:hover:bg-gray-100 active:scale-95 cursor-pointer"
              >
                Reset Search Filters
              </button>
            </>
          )}
        </div>
      )}

      {/* Newsletter */}
      <section className="mt-32 p-12 bg-gray-900 dark:bg-black rounded-[2.5rem] text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-cyan-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-500 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Stay updated with my insights</h2>
          <p className="text-gray-400 mb-8">
            Get occasional emails about engineering, sustainability, and system design. 
            No spam, just signal.
          </p>
          <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={subStatus === 'loading' || subStatus === 'success'}
              className="flex-grow px-6 py-4 rounded-2xl bg-white/10 border border-white/10 text-white focus:ring-2 focus:ring-cyan-500 outline-none backdrop-blur-sm"
              required
            />
            <button 
              type="submit"
              disabled={subStatus === 'loading' || subStatus === 'success'}
              className="px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-cyan-600/20 active:scale-95 disabled:opacity-50"
            >
              {subStatus === 'success' ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
          {subStatus === 'error' && <p className="text-red-400 mt-4 font-bold text-sm">Failed to subscribe.</p>}
        </div>
      </section>

      <NewPostModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onPostCreated={handlePostCreated} 
      />
    </main>
  );
}
