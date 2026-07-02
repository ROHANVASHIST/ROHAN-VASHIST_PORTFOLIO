import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, ShieldUser, Sparkles, ChevronRight, MapPin, GraduationCap, Code, Github, Linkedin, Mail, Award, Star } from 'lucide-react';

// ─── Mouse Spotlight ────────────────────────────────
function SpotlightEffect() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  return (
    <motion.div
      className="fixed pointer-events-none z-[100] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-cyan-500/4 to-purple-500/4 blur-[120px]"
      style={{ left: springX.get() - 250, top: springY.get() - 250 }}
    />
  );
}

// ─── Floating Orbs ──────────────────────────────────
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/8 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/3 w-56 h-56 bg-blue-500/6 rounded-full blur-[90px] animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }} />
    </div>
  );
}

// ─── Floating Particles ─────────────────────────────
function FloatingParticles({ count = 25 }: { count?: number }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 5 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 25 + 10,
    delay: Math.random() * 15,
    opacity: Math.random() * 0.4 + 0.05,
    color: i % 3 === 0 ? 'bg-cyan-400' : i % 3 === 1 ? 'bg-purple-400' : 'bg-blue-400',
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${p.color} blur-[0.5px]`}
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%`, opacity: p.opacity }}
          animate={{ y: [0, -40, 0, 25, 0], x: [0, 20, -20, 15, 0], opacity: [p.opacity, p.opacity * 2.5, p.opacity, p.opacity * 2, p.opacity] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}
    </div>
  );
}

// ─── Typewriter ─────────────────────────────────────
function TypewriterText({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const timer = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 30);
    }, delay * 1000);

    const cursorInterval = setInterval(() => setShowCursor((p) => !p), 500);
    return () => { clearTimeout(timeout); clearTimeout(timer); clearInterval(cursorInterval); };
  }, [text, delay]);

  return (
    <span className={className}>
      {displayedText}
      <span className={`inline-block w-[2px] h-[1em] ml-0.5 bg-cyan-400 align-middle transition-opacity ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
    </span>
  );
}

// ─── Animated Counter ──────────────────────────────
function AnimatedCounter({ value, suffix = '', label = '' }: { value: number; suffix?: string; label?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = value;
          const increment = end / (2 * 60);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <motion.div ref={ref} whileHover={{ scale: 1.08, y: -3 }} className="text-center px-5 py-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300 cursor-default">
      <div className="text-xl font-black bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">{count}{suffix}</div>
      <div className="text-[10px] font-bold text-white/50 uppercase tracking-wider mt-0.5">{label}</div>
    </motion.div>
  );
}

// ─── 3D Tilt Card ──────────────────────────────────
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 15, y: y * -15 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={className}
      style={{ transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`, transition: 'transform 0.1s ease-out' }}>
      {children}
    </div>
  );
}

// ─── Staggered entrance wrapper ─────────────────────
function StaggeredReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── Section Reveal ─────────────────────────────────
function SectionReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Word-by-word entrance ──────────────────────────
function AnimatedWords({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block mr-[0.15em]"
          style={{ perspective: '600px' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// ─── Main Entry ─────────────────────────────────────
export default function Entry() {
  const navigate = useNavigate();

  const handleSelect = (type: 'viewer' | 'admin') => {
    sessionStorage.setItem('userType', type);
    navigate(type === 'admin' ? '/admin/login' : '/home');
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      <SpotlightEffect />
      <FloatingOrbs />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <FloatingParticles count={25} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-950 opacity-100" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-5xl w-full">
          {/* Hero Section */}
          <motion.div {...fadeInUp} className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 rounded-full text-xs font-bold text-cyan-400 uppercase tracking-widest mb-6 border border-cyan-500/20"
            >
              <Sparkles className="w-3 h-3 animate-pulse" /> Digital Portfolio v2.0
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 leading-[0.95]">
              <AnimatedWords text="Welcome to" className="text-white" />{' '}
              <motion.span
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent inline-block"
              >
                Rohan's Portfolio
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed min-h-[1.5em]"
            >
              <TypewriterText text="AI Engineer Intern & Clean Energy Researcher — bridging full-stack development with renewable energy innovation." delay={1.2} />
            </motion.p>

            {/* Info chips */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="flex flex-wrap justify-center gap-2.5 mt-6"
            >
              {[
                { icon: MapPin, text: 'New Delhi, India' },
                { icon: GraduationCap, text: 'B.Tech Energy Engineering (9.42 GPA)' },
                { icon: Code, text: '14+ Projects' },
                { icon: Award, text: 'Top Performer Aspire Leaders' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.06, y: -2 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-xl text-xs font-medium text-gray-300 border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300 cursor-default"
                >
                  <item.icon className="w-3 h-3 text-cyan-400" /> {item.text}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Animated Stats Counters */}
          <SectionReveal delay={2.0}>
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              <AnimatedCounter value={14} suffix="+" label="Projects Completed" />
              <AnimatedCounter value={30} suffix="+" label="Technologies Mastered" />
              <AnimatedCounter value={9.42} suffix="" label="Cumulative GPA" />
              <AnimatedCounter value={2} suffix="+" label="Years of Experience" />
            </div>
          </SectionReveal>

          {/* Social links */}
          <SectionReveal delay={2.2}>
            <div className="flex items-center justify-center gap-4 mb-16">
              {[
                { icon: Github, href: 'https://github.com/ROHANVASHIST', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/rohanvashist01', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:rohanvashist01@gmail.com', label: 'Email' },
              ].map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/15 hover:border-cyan-500/40 transition-all duration-300 group"
                >
                  <item.icon className="w-4 h-4 text-gray-400 group-hover:text-cyan-300 transition-colors" />
                </motion.a>
              ))}
            </div>
          </SectionReveal>

          {/* Choice cards */}
          <SectionReveal delay={2.4}>
            <div className="text-center mb-8">
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-xs font-bold text-gray-500 uppercase tracking-[0.25em]"
              >
                — How would you like to proceed? —
              </motion.p>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-2 gap-5 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <TiltCard>
                <button
                  onClick={() => handleSelect('viewer')}
                  className="group relative w-full flex flex-col items-center p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-300 relative shadow-lg shadow-cyan-500/5"
                  >
                    <User className="w-8 h-8 text-cyan-400" />
                  </motion.div>
                  <h2 className="text-xl font-bold text-white mb-2 relative">I am a Viewer</h2>
                  <p className="text-sm text-gray-400 text-center leading-relaxed relative max-w-xs">
                    Explore projects, research in clean energy & AI, professional experience, technical skills, and blog articles.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mt-5 relative">
                    {['Projects', 'Research', 'Expertise', 'Blog', 'Resume'].map((tag, idx) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, y: 5 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 2.8 + idx * 0.05 }}
                        className="px-2.5 py-0.5 bg-white/5 rounded-lg text-[10px] font-bold text-gray-500 uppercase tracking-wider group-hover:text-cyan-400 transition-colors"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  <motion.div className="absolute bottom-4 right-4" whileHover={{ x: 3 }}>
                    <ChevronRight className="w-5 h-5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </motion.div>
                </button>
              </TiltCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 2.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <TiltCard>
                <button
                  onClick={() => handleSelect('admin')}
                  className="group relative w-full flex flex-col items-center p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-purple-500/20 group-hover:scale-110 transition-all duration-300 relative shadow-lg shadow-purple-500/5"
                  >
                    <ShieldUser className="w-8 h-8 text-purple-400" />
                  </motion.div>
                  <h2 className="text-xl font-bold text-white mb-2 relative">I am the Admin</h2>
                  <p className="text-sm text-gray-400 text-center leading-relaxed relative max-w-xs">
                    Securely log in to manage portfolio content, update projects, edit pages, and oversee analytics.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mt-5 relative">
                    {['Content', 'Analytics', 'Settings', 'Dashboard'].map((tag, idx) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, y: 5 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 2.9 + idx * 0.05 }}
                        className="px-2.5 py-0.5 bg-white/5 rounded-lg text-[10px] font-bold text-gray-500 uppercase tracking-wider group-hover:text-purple-400 transition-colors"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  <motion.div className="absolute bottom-4 right-4" whileHover={{ x: 3 }}>
                    <ChevronRight className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </motion.div>
                </button>
              </TiltCard>
            </motion.div>
          </div>

          {/* Footer note */}
          <SectionReveal delay={3.0}>
            <motion.p
              className="text-center mt-16 text-[11px] text-gray-600 font-medium tracking-wider"
              whileHover={{ color: '#9ca3af' }}
            >
              Built with precision engineering &middot; Rohan Vashist &copy; {new Date().getFullYear()}
            </motion.p>
          </SectionReveal>
        </div>
      </div>
    </div>
  );
}