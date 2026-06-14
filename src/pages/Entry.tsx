import { motion } from 'framer-motion';
import { User, ShieldUser, Sparkles, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Entry() {
  const navigate = useNavigate();

  const handleSelect = (type: 'viewer' | 'admin') => {
    sessionStorage.setItem('userType', type);
    if (type === 'admin') {
      navigate('/admin/login');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-cyan-500/3 dark:bg-cyan-500/5 rounded-full blur-[150px] -translate-y-1/4 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/3 dark:bg-purple-500/5 rounded-full blur-[150px] translate-y-1/4 -translate-x-1/4" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-noise opacity-30 dark:opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl w-full relative"
      >
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-50 dark:bg-cyan-950/30 rounded-full text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-8 border border-cyan-100 dark:border-cyan-900/30"
          >
            <Sparkles className="w-3 h-3" /> Digital Portfolio v2.0
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-[1.1]">
            Welcome to <span className="gradient-text">Rohan's</span>
            <br />Portfolio
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">Please select how you would like to proceed.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect('viewer')}
            className="group relative flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:border-cyan-500/40 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-16 h-16 bg-cyan-50 dark:bg-cyan-950/30 rounded-full flex items-center justify-center mb-4 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-900/50 transition-all duration-300 relative">
              <User className="w-8 h-8 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 relative">I am a Viewer</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center relative">
              Explore Rohan's projects, expertise, and insights.
            </p>
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute bottom-4 right-4"
            >
              <ChevronRight className="w-5 h-5 text-cyan-600 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </motion.div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect('admin')}
            className="group relative flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:border-purple-500/40 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-16 h-16 bg-purple-50 dark:bg-purple-950/30 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50 transition-all duration-300 relative">
              <ShieldUser className="w-8 h-8 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 relative">I am the Admin</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center relative">
              Login to edit the portfolio and manage content.
            </p>
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute bottom-4 right-4"
            >
              <ChevronRight className="w-5 h-5 text-purple-600 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </motion.div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}