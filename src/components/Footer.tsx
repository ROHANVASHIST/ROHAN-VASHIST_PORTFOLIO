import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };
  
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 transition-colors pt-24 pb-12 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-12 h-12 bg-gray-900 dark:bg-white rounded-2xl flex items-center justify-center text-white dark:text-gray-900 font-black text-2xl group-hover:scale-110 transition-transform">
                RV
              </div>
              <span className="font-black text-2xl text-gray-900 dark:text-white tracking-tight">Rohan Vashist</span>
            </Link>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-10 max-w-md">
              Bridging the gap between complex engineering systems and intuitive digital experiences.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Github, href: "https://github.com/rohan" },
                { icon: Linkedin, href: "https://linkedin.com/in/rohan" },
                { icon: Twitter, href: "https://twitter.com/rohan" },
                { icon: Mail, href: "mailto:rohanvashist01@gmail.com" },
              ].map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.href}
                  whileHover={{ y: -4 }}
                  className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  <item.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-xs font-black text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em] mb-8">Navigation</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
                { name: 'Projects', path: '/projects' },
                { name: 'Research', path: '/research' },
                { name: 'Community', path: '/community' },
                { name: 'Services', path: '/services' },
                { name: 'Blog', path: '/blog' },
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-900 dark:text-gray-300 font-bold hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                    {link.name}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em] mb-8">Support</h4>
            <ul className="space-y-4">
              {[
                { name: 'Contact', path: '/contact' },
                { name: 'FAQ', path: '/faq' },
                { name: 'Resume', path: '/resume' },
                { name: 'Admin', path: '/admin/login' },
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-900 dark:text-gray-300 font-bold hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                    {link.name}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-black text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em] mb-8">Newsletter</h4>
            <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Join the periodic newsletter for latest insights on engineering and code.
            </p>
            <form onSubmit={subscribe} className="relative group">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 pr-12 text-sm font-bold text-gray-900 dark:text-white outline-none focus:border-cyan-500 transition-colors"
                disabled={status === 'loading' || status === 'success'}
              />
              <button 
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="absolute right-2 top-2 bottom-2 aspect-square bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
              >
                {status === 'success' ? <CheckCircle2 size={16} /> : <Send size={14} />}
              </button>
            </form>
            {status === 'success' && <p className="text-xs font-bold text-emerald-500 mt-3">Subscribed successfully!</p>}
            {status === 'error' && <p className="text-xs font-bold text-red-500 mt-3">Failed to subscribe.</p>}
          </div>
        </div>
        
        <div className="pt-12 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">
            <span>&copy; {currentYear} Rohan Vashist</span>
            <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <span>Digital Portfolio v2.0</span>
          </div>
          <div className="text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest flex items-center gap-2">
            Built with <span className="text-cyan-600">Precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
