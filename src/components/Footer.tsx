import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 transition-colors pt-24 pb-12 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          <div className="lg:col-span-5">
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

          <div className="lg:col-span-2">
            <h4 className="text-xs font-black text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em] mb-8">Location</h4>
            <p className="text-gray-900 dark:text-gray-300 font-bold">New York, NY</p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">Remote Friendly</p>
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
