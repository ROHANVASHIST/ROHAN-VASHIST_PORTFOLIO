import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, Send, CheckCircle2, Heart } from 'lucide-react';
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

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  };
  
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 transition-colors pt-24 pb-12 overflow-hidden relative">
      {/* Decorative background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/3 rounded-full blur-[150px]" />
      
      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          <motion.div 
            className="lg:col-span-4"
            variants={{
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <motion.div 
                className="w-12 h-12 bg-gray-900 dark:bg-white rounded-2xl flex items-center justify-center text-white dark:text-gray-900 font-black text-2xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                RV
              </motion.div>
              <span className="font-black text-2xl text-gray-900 dark:text-white tracking-tight">Rohan Vashist</span>
            </Link>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-10 max-w-md">
              Bridging the gap between complex engineering systems and intuitive digital experiences.
            </p>
          <div className="flex gap-3">
              {[
                { icon: Github, href: "https://github.com/ROHANVASHIST" },
                { icon: Linkedin, href: "https://linkedin.com/in/rohanvashist01" },
                { icon: Mail, href: "mailto:rohanvashist01@gmail.com" },
              ].map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.href}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors"
                >
                  <item.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-2 lg:col-start-7"
            variants={{
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
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
              ].map((link, idx) => (
                <motion.li 
                  key={link.path}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                >
                  <Link to={link.path} className="text-gray-900 dark:text-gray-300 font-bold hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                    {link.name}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 transition-all" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-2"
            variants={{
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="text-xs font-black text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em] mb-8">Support</h4>
            <ul className="space-y-4">
              {[
                { name: 'Contact', path: '/contact' },
                { name: 'FAQ', path: '/faq' },
                { name: 'Resume', path: '/resume' },
                { name: 'Admin', path: '/admin/login' },
              ].map((link, idx) => (
                <motion.li 
                  key={link.path}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                >
                  <Link to={link.path} className="text-gray-900 dark:text-gray-300 font-bold hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                    {link.name}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 transition-all" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            className="lg:col-span-3"
            variants={{
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="text-xs font-black text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em] mb-8">Newsletter</h4>
            <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Join the periodic newsletter for latest insights on engineering and code.
            </p>
            <form onSubmit={subscribe} className="relative group">
              <motion.div
                whileFocus={{ scale: 1.01 }}
                className="relative"
              >
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 pr-12 text-sm font-bold text-gray-900 dark:text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  disabled={status === 'loading' || status === 'success'}
                />
                <motion.button 
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute right-2 top-2 bottom-2 aspect-square bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                      <Send size={14} />
                    </motion.div>
                  ) : status === 'success' ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                      <CheckCircle2 size={16} />
                    </motion.div>
                  ) : (
                    <Send size={14} />
                  )}
                </motion.button>
              </motion.div>
            </form>
            {status === 'success' && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-bold text-emerald-500 mt-3"
              >
                Subscribed successfully!
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-bold text-red-500 mt-3"
              >
                Failed to subscribe.
              </motion.p>
            )}
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="pt-12 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex items-center gap-4 text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">
            <span>&copy; {currentYear} Rohan Vashist</span>
            <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <span>Digital Portfolio v2.0</span>
          </div>
          <motion.div 
            className="text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            Built with <motion.span 
              className="text-red-500 inline-block"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Heart size={12} className="inline" />
            </motion.span> 
            <span className="text-cyan-600">Precision</span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}