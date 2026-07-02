import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, ShieldUser, Sparkles, ChevronRight, MapPin, GraduationCap, Code, Github, Linkedin, Mail } from 'lucide-react';

function FloatingParticles({ count = 15 }: { count?: number }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.3 + 0.05,
    color: i % 3 === 0 ? 'bg-cyan-400' : i % 3 === 1 ? 'bg-purple-400' : 'bg-blue-400',
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${p.color} blur-[1px]`}
          style={{
            width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%`, opacity: p.opacity,
          }}
          animate={{ y: [0, -30, 0, 20, 0], x: [0, 15, -15, 10, 0], opacity: [p.opacity, p.opacity * 2, p.opacity, p.opacity * 1.5, p.opacity] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}
    </div>
  );
}

function StatBadge({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center px-5 py-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
    >
      <div className="text-xl font-black text-cyan-300">{value}</div>
      <div className="text-[10px] font-bold text-white/50 uppercase tracking-wider mt-0.5">{label}</div>
    </motion.div>
  );
}

export default function Entry() {
  const navigate = useNavigate();

  const handleSelect = (type: 'viewer' | 'admin') => {
    sessionStorage.setItem('userType', type);
    navigate(type === 'admin' ? '/admin/login' : '/home');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.15),transparent_60%)]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/5 rounded-full blur-[150px]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <FloatingParticles count={20} />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-5xl w-full">
          {/* Top section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 rounded-full text-xs font-bold text-cyan-400 uppercase tracking-widest mb-6 border border-cyan-500/20"
            >
              <Sparkles className="w-3 h-3" /> Digital Portfolio v2.0
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 leading-[0.95]">
              Welcome to{' '}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
              >
                Rohan's Portfolio
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              AI Engineer Intern & Clean Energy Researcher — bridging full-stack development with renewable energy innovation.
            </motion.p>

            {/* Quick info chips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-3 mt-6"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-xl text-xs font-medium text-gray-300">
                <MapPin className="w-3 h-3 text-cyan-400" /> New Delhi, India
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-xl text-xs font-medium text-gray-300">
                <GraduationCap className="w-3 h-3 text-cyan-400" /> B.Tech Energy Engineering (9.42 GPA)
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-xl text-xs font-medium text-gray-300">
                <Code className="w-3 h-3 text-cyan-400" /> 14+ Projects
              </div>
            </motion.div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            <StatBadge value="14+" label="Projects" />
            <StatBadge value="30+" label="Technologies" />
            <StatBadge value="9.42" label="GPA" />
            <StatBadge value="2+" label="Years Coding" />
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-center gap-4 mb-16"
          >
            <a href="https://github.com/ROHANVASHIST" target="_blank" rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-300 group"
            >
              <Github className="w-4 h-4 text-gray-400 group-hover:text-white" />
            </a>
            <a href="https://www.linkedin.com/in/rohanvashist01" target="_blank" rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-300 group"
            >
              <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-white" />
            </a>
            <a href="mailto:rohanvashist01@gmail.com"
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-300 group"
            >
              <Mail className="w-4 h-4 text-gray-400 group-hover:text-white" />
            </a>
          </motion.div>

          {/* Choice cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-6"
          >
            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">How would you like to proceed?</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 max-w-2xl mx-auto">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect('viewer')}
              className="group relative flex flex-col items-center p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-cyan-500/40 hover:bg-white/10 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-300 relative">
                <User className="w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2 relative">I am a Viewer</h2>
              <p className="text-sm text-gray-400 text-center leading-relaxed relative max-w-xs">
                Explore projects, research in clean energy & AI, professional experience, technical skills, and blog articles.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-5 relative">
                {['Projects', 'Research', 'Expertise', 'Blog'].map(tag => (
                  <span key={tag} className="px-2.5 py-0.5 bg-white/5 rounded-lg text-[10px] font-bold text-gray-500 uppercase tracking-wider">{tag}</span>
                ))}
              </div>
              <motion.div className="absolute bottom-4 right-4">
                <ChevronRight className="w-5 h-5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </motion.div>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect('admin')}
              className="group relative flex flex-col items-center p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-purple-500/40 hover:bg-white/10 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-purple-500/20 group-hover:scale-110 transition-all duration-300 relative">
                <ShieldUser className="w-8 h-8 text-purple-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2 relative">I am the Admin</h2>
              <p className="text-sm text-gray-400 text-center leading-relaxed relative max-w-xs">
                Securely log in to manage portfolio content, update projects, edit pages, and oversee analytics.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-5 relative">
                {['Content', 'Analytics', 'Settings'].map(tag => (
                  <span key={tag} className="px-2.5 py-0.5 bg-white/5 rounded-lg text-[10px] font-bold text-gray-500 uppercase tracking-wider">{tag}</span>
                ))}
              </div>
              <motion.div className="absolute bottom-4 right-4">
                <ChevronRight className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}