import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame } from 'motion/react';
import { ArrowRight, Code, Database, Globe, Cpu, Sparkles, ChevronDown, Github, Linkedin, Mail, ExternalLink, Star, MapPin, GraduationCap, Award, BookOpen, Terminal, Braces, Box, Hexagon, Layers, Zap, Pointer, CircleDot, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';
import defaultProfileData from '../data/profile.json';
import defaultSkillsData from '../data/skills.json';
import defaultProjectsData from '../data/projects.json';
import { useData, useDataWithLoading } from '../lib/useData';
import ExpandableDescription from '../components/ExpandableDescription';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import InlineEditor from '../components/InlineEditor';
import AdminEditBar from '../components/AdminEditBar';

// ─── Parallax Layer ───────────────────────────────────────
function ParallaxLayer({ children, speed = 0.3, className = '' }: { children: React.ReactNode; speed?: number; className?: string }) {
  const [offset, setOffset] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setOffset(window.scrollY * speed);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div className={className} style={{ transform: `translateY(${offset}px)` }}>
      {children}
    </div>
  );
}

// ─── Section Reveal ───────────────────────────────────────
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

// ─── Floating Particles ───────────────────────────────────
function FloatingParticles({ count = 20 }: { count?: number }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.5 + 0.1,
    color: i % 3 === 0 ? 'bg-cyan-400' : i % 3 === 1 ? 'bg-purple-400' : 'bg-blue-400',
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${p.color} blur-[1px]`}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -15, 10, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity, p.opacity * 1.5, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

// ─── Animated Gradient Mesh ───────────────────────────────
function AnimatedGradientMesh() {
  const t = useRef(0);
  const [gradient, setGradient] = useState('radial-gradient(circle at 30% 40%, rgba(6,182,212,0.08), transparent 50%), radial-gradient(circle at 70% 60%, rgba(147,51,234,0.06), transparent 50%)');

  useAnimationFrame((delta) => {
    t.current += delta / 10000;
    const x1 = 30 + Math.sin(t.current * 0.7) * 20;
    const y1 = 40 + Math.cos(t.current * 0.5) * 20;
    const x2 = 70 + Math.sin(t.current * 0.6 + 2) * 15;
    const y2 = 60 + Math.cos(t.current * 0.8 + 1) * 15;
    setGradient(
      `radial-gradient(circle at ${x1}% ${y1}%, rgba(6,182,212,0.08), transparent 50%), radial-gradient(circle at ${x2}% ${y2}%, rgba(147,51,234,0.06), transparent 50%)`
    );
  });

  return (
    <div className="absolute inset-0 transition-[background] duration-500 pointer-events-none" style={{ background: gradient }} />
  );
}

// ─── Floating Tech Icons ──────────────────────────────────
function FloatingTechIcons() {
  const icons = [
    { Icon: Braces, label: 'React', color: 'text-cyan-400' },
    { Icon: Terminal, label: 'Python', color: 'text-purple-400' },
    { Icon: Box, label: 'Docker', color: 'text-blue-400' },
    { Icon: Hexagon, label: 'ML', color: 'text-emerald-400' },
    { Icon: Layers, label: 'Linux', color: 'text-amber-400' },
    { Icon: CircleDot, label: 'Node', color: 'text-green-400' },
  ];
  const radius = 220;
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map((item, i) => {
        const angle = (i / icons.length) * Math.PI * 2;
        const orbitSpeed = 0.0003 + i * 0.00004;
        const orbitOffset = i * 1.5;
        return (
          <motion.div
            key={i}
            className={`absolute left-1/2 top-1/2 ${item.color}`}
            animate={{ rotate: 360 }}
            transition={{ duration: 20 + i * 3, repeat: Infinity, ease: 'linear' }}
            style={{ marginLeft: -14, marginTop: -14, originX: 0, originY: 0 }}
          >
            <motion.div
              className="flex flex-col items-center gap-1"
              animate={{ rotate: -360 }}
              transition={{ duration: 20 + i * 3, repeat: Infinity, ease: 'linear' }}
              style={{ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius }}
            >
              <div className="w-8 h-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <item.Icon className="w-4 h-4" />
              </div>
              <span className="text-[8px] font-bold text-white/30 uppercase tracking-wider">{item.label}</span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Glow Trail ──────────────────────────────────────────
function GlowTrail({ count = 8 }: { count?: number }) {
  const trail = useRef<Array<{ x: number; y: number; id: number }>>([]);
  const [points, setPoints] = useState<Array<{ x: number; y: number; id: number; opacity: number }>>([]);

  useEffect(() => {
    let frameId: number;
    let mouse = { x: -100, y: -100 };

    const handleMouse = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouse);

    const tick = () => {
      trail.current.unshift({ ...mouse, id: Date.now() });
      if (trail.current.length > count) trail.current.pop();

      setPoints(
        trail.current.map((p, i) => ({
          ...p,
          opacity: 1 - i / (count + 1),
        }))
      );
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      cancelAnimationFrame(frameId);
    };
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99]">
      {points.map((p, i) => (
        <motion.div
          key={p.id}
          className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400"
          style={{
            left: p.x,
            top: p.y,
            opacity: p.opacity * 0.4,
            boxShadow: '0 0 6px 2px rgba(6,182,212,0.3)',
            scale: 1 - i * 0.08,
          }}
        />
      ))}
    </div>
  );
}

// ─── Rotating Skill Ring ─────────────────────────────────
function RotatingSkillRing() {
  const skills = [
    'React', 'TypeScript', 'Python', 'Node.js', 'Docker', 'Kubernetes',
    'TensorFlow', 'PyTorch', 'MongoDB', 'PostgreSQL', 'Redis', 'AWS',
  ];

  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] pointer-events-none opacity-40 hidden lg:block">
      <motion.div
        className="w-full h-full relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {skills.map((skill, i) => {
          const angle = (i / skills.length) * Math.PI * 2;
          const r = 130;
          const x = Math.cos(angle) * r + 150;
          const y = Math.sin(angle) * r + 150;
          return (
            <motion.span
              key={skill}
              className="absolute text-[10px] font-bold px-2 py-0.5 bg-white/5 rounded-lg border border-white/10 text-white/40 whitespace-nowrap"
              style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            >
              {skill}
            </motion.span>
          );
        })}
      </motion.div>
    </div>
  );
}

// ─── Wave Divider ─────────────────────────────────────────
function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`relative w-full h-24 md:h-32 ${flip ? 'rotate-180' : ''}`}>
      <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <motion.path
          d="M0,60 C320,120 480,0 720,60 C960,120 1120,0 1440,60 L1440,120 L0,120 Z"
          fill="currentColor"
          className="text-white dark:text-gray-950"
          initial={{ d: 'M0,60 C320,120 480,0 720,60 C960,120 1120,0 1440,60 L1440,120 L0,120 Z' }}
          whileInView={{
            d: [
              'M0,60 C320,120 480,0 720,60 C960,120 1120,0 1440,60 L1440,120 L0,120 Z',
              'M0,80 C340,20 500,100 720,40 C940,100 1100,20 1440,80 L1440,120 L0,120 Z',
              'M0,60 C320,120 480,0 720,60 C960,120 1120,0 1440,60 L1440,120 L0,120 Z',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}

// ─── Code Window ──────────────────────────────────────────
function CodeWindow() {
  const codeLines = [
    { text: 'class Portfolio extends React.Component {', color: 'text-white/60', delay: 0 },
    { text: '  constructor() {', color: 'text-white/50', delay: 0.3 },
    { text: '    this.state = {', color: 'text-white/50', delay: 0.6 },
    { text: '      role: "AI Engineer Intern",', color: 'text-cyan-300', delay: 0.9 },
    { text: '      focus: "Clean Energy Research",', color: 'text-cyan-300', delay: 1.2 },
    { text: '      passion: "Building Impact",', color: 'text-purple-300', delay: 1.5 },
    { text: '    }', color: 'text-white/50', delay: 1.8 },
    { text: '  }', color: 'text-white/50', delay: 2.1 },
    { text: '}', color: 'text-white/60', delay: 2.4 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-4 right-4 md:right-12 w-[280px] md:w-[340px] bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-cyan-500/5 hidden lg:block pointer-events-none"
    >
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white/5 border-b border-white/5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
        <span className="ml-3 text-[10px] font-bold text-white/30 uppercase tracking-wider">portfolio.tsx</span>
      </div>
      <div className="p-4 font-mono text-xs leading-6">
        {codeLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: line.delay + 1.8, duration: 0.3 }}
            className={line.color}
          >
            <span className="text-white/20 mr-3 select-none">{i + 1}</span>
            {line.text}
            {i === 3 && <motion.span className="inline-block w-[2px] h-4 bg-cyan-400 ml-0.5 align-middle animate-pulse" />}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Progress Ring Figure ────────────────────────────────
function ProgressRing({ value, label, size = 80, strokeWidth = 5, color = 'stroke-cyan-400' }: { value: number; label: string; size?: number; strokeWidth?: number; color?: string }) {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const r = size / 2 - strokeWidth * 2;
  const circumference = 2 * Math.PI * r;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = value;
          const increment = end / 60;
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setProgress(end);
              clearInterval(timer);
            } else {
              setProgress(start);
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-white/5" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          strokeWidth={strokeWidth} strokeLinecap="round"
          className={color}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          initial={false}
        />
        <motion.text
          x={size / 2} y={size / 2}
          textAnchor="middle" dominantBaseline="central"
          className="fill-white text-xs font-bold"
          transform="rotate(90, 50, 50)"
        >
          {Math.round(progress)}%
        </motion.text>
      </svg>
      <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{label}</span>
    </div>
  );
}

// ─── Hero Stat Figure ─────────────────────────────────────
function HeroStatFigure({ icon: Icon, value, label, color = 'from-cyan-400 to-cyan-600' }: { icon: any; value: string; label: string; color?: string }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.03 }}
      className="flex items-center gap-3 px-4 py-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group cursor-default"
    >
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} p-0.5`}>
        <div className="w-full h-full rounded-[10px] bg-gray-900 flex items-center justify-center">
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>
      <div>
        <motion.div
          className="text-lg font-black text-white leading-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {value}
        </motion.div>
        <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{label}</div>
      </div>
    </motion.div>
  );
}

// ─── Typewriter Effect ────────────────────────────────────
function TypewriterText({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let currentIndex = 0;
    
    const startTyping = () => {
      timeout = setTimeout(() => {
        const interval = setInterval(() => {
          if (currentIndex < text.length) {
            setDisplayedText(text.slice(0, currentIndex + 1));
            currentIndex++;
          } else {
            clearInterval(interval);
          }
        }, 40);
        return () => clearInterval(interval);
      }, delay * 1000);
    };

    startTyping();

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearTimeout(timeout);
      clearInterval(cursorInterval);
    };
  }, [text, delay]);

  return (
    <span className={className}>
      {displayedText}
      <span className={`inline-block w-[2px] h-[1em] ml-1 bg-cyan-400 align-middle transition-opacity ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
    </span>
  );
}

// ─── Animated Counter ─────────────────────────────────────
function AnimatedCounter({ value, suffix = '', label = '', duration = 2 }: { value: number; suffix?: string; label?: string; duration?: number }) {
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
          const increment = end / (duration * 60);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <div ref={ref} className="text-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-black gradient-text-cyan mb-2"
      >
        {count}{suffix}
      </motion.div>
      {label && <div className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">{label}</div>}
    </div>
  );
}

// ─── Spotlight Effect ─────────────────────────────────────
function SpotlightEffect() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
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
      className="fixed pointer-events-none z-[100] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-cyan-500/3 to-purple-500/3 blur-[120px]"
      style={{
        left: springX.get() - 300,
        top: springY.get() - 300,
      }}
    />
  );
}

// ─── 3D Tilt Card ─────────────────────────────────────────
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 20, y: y * -20 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {children}
    </div>
  );
}

// ─── Scroll Progress Bar ─────────────────────────────────
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[70] h-[3px] bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"
      style={{ width, opacity }}
    />
  );
}

// ─── Marquee Skills ──────────────────────────────────────
function MarqueeSkills() {
  const skills = ['React', 'TypeScript', 'Python', 'Node.js', 'Docker', 'TensorFlow', 'PyTorch', 'Kubernetes', 'MongoDB', 'AWS', 'PostgreSQL', 'Redis', 'Go', 'Rust', 'GraphQL', 'Next.js', 'Tailwind', 'Figma'];

  return (
    <div className="absolute bottom-16 left-0 right-0 overflow-hidden pointer-events-none opacity-30">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {[...skills, ...skills].map((s, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-xs font-bold text-white/40 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            {s}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Bento Grid Hero Figure ──────────────────────────────
function BentoGridFigure() {
  const items = [
    { label: 'GitHub', value: '20+ Repos', icon: Github, color: 'from-cyan-500/20 to-blue-500/10', delay: 2.2 },
    { label: 'Commits', value: '500+', icon: Code, color: 'from-purple-500/20 to-pink-500/10', delay: 2.3 },
    { label: 'Papers', value: '3+', icon: BookOpen, color: 'from-emerald-500/20 to-teal-500/10', delay: 2.4 },
    { label: 'Tech Stack', value: 'Full Stack', icon: Layers, color: 'from-amber-500/20 to-orange-500/10', delay: 2.5 },
  ];

  return (
    <div className="hidden md:grid grid-cols-2 gap-2 max-w-[200px] absolute bottom-8 left-8">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: item.delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`bg-gradient-to-br ${item.color} backdrop-blur-sm rounded-xl p-3 border border-white/10`}
        >
          <item.icon className="w-3 h-3 text-white/60 mb-1" />
          <div className="text-xs font-black text-white">{item.value}</div>
          <div className="text-[8px] font-bold text-white/30 uppercase tracking-wider">{item.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Animated Decorative Ring ────────────────────────────
function DecorativeRing() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
      <motion.div
        className="w-[400px] h-[400px] border border-cyan-500/20 rounded-full"
        animate={{ rotate: 360, scale: [1, 1.02, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-4 w-[368px] h-[368px] border border-purple-500/15 rounded-full"
        animate={{ rotate: -360, scale: [1, 1.03, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-8 w-[336px] h-[336px] border border-blue-500/10 rounded-full"
        animate={{ rotate: 360, scale: [1, 1.01, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const r = 200;
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
            style={{
              left: `calc(50% + ${Math.cos(angle) * r}px)`,
              top: `calc(50% + ${Math.sin(angle) * r}px)`,
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + (i % 3),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        );
      })}
    </div>
  );
}

// ─── Main Home Component ──────────────────────────────────
export default function Home() {
  const profileData = useData('profile', defaultProfileData);
  const { data: projectsData, loading: projectsLoading } = useDataWithLoading('projects', defaultProjectsData);
  
  const featuredProjects = [...projectsData.projects].sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1)).slice(0, 3);

  return (
    <main className="overflow-hidden">
      <GlowTrail />
      <ScrollProgressBar />
      <SpotlightEffect />

      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.82), rgba(0, 0, 0, 0.82)), url(/profile.jpg)' }}
      >
        <AnimatedGradientMesh />

        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-blue-500/8 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }} />
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        
        <FloatingParticles count={25} />
        <FloatingTechIcons />
        <RotatingSkillRing />
        <CodeWindow />
        <DecorativeRing />
        <MarqueeSkills />
        <BentoGridFigure />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-950 opacity-100" />
        
        <div className="text-center p-6 text-white relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Headline badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
              <span className="text-sm font-bold text-cyan-100/90">AI Engineering & Clean Energy Innovation</span>
            </motion.div>

            {/* Hero stat figures row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap justify-center gap-2 mb-6"
            >
              <HeroStatFigure icon={Github} value="20+ Repos" label="Open Source" color="from-cyan-400 to-blue-500" />
              <HeroStatFigure icon={Star} value="500+ Commits" label="Contributions" color="from-purple-400 to-pink-500" />
              <HeroStatFigure icon={BookOpen} value="3+ Papers" label="Research" color="from-emerald-400 to-teal-500" />
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-6 leading-[0.95]">
              {profileData.name.split(' ').map((word: string, i: number) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block mr-[0.1em] [perspective:800px]"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl md:text-2xl text-cyan-100/80 mb-3 max-w-2xl mx-auto font-light leading-relaxed"
            >
              <TypewriterText text={profileData.headline} delay={0.8} />
            </motion.p>

            {/* Info chips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="flex flex-wrap justify-center gap-2.5 mb-6"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-xl text-xs font-medium text-cyan-100/70 border border-white/10">
                <MapPin className="w-3 h-3 text-cyan-400" /> {profileData.location}
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-xl text-xs font-medium text-cyan-100/70 border border-white/10">
                <GraduationCap className="w-3 h-3 text-cyan-400" /> {profileData.education.degree}
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-xl text-xs font-medium text-cyan-100/70 border border-white/10">
                <Award className="w-3 h-3 text-cyan-400" /> {profileData.education.gpa}
              </div>
            </motion.div>

            {/* Bio summary */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="text-sm md:text-base text-white/40 max-w-3xl mx-auto leading-relaxed mb-8 line-clamp-3"
            >
              {profileData.bio}
            </motion.p>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              {profileData.github && (
                <a href={profileData.github} target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-300 group"
                >
                  <Github className="w-5 h-5 text-white/60 group-hover:text-white" />
                </a>
              )}
              {profileData.linkedin && (
                <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-300 group"
                >
                  <Linkedin className="w-5 h-5 text-white/60 group-hover:text-white" />
                </a>
              )}
              {profileData.email && (
                <a href={`mailto:${profileData.email}`}
                  className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-300 group"
                >
                  <Mail className="w-5 h-5 text-white/60 group-hover:text-white" />
                </a>
              )}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.05 }}
              className="flex flex-wrap gap-3 justify-center"
            >
              <Link to="/projects">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-7 py-3.5 bg-cyan-600 text-white rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-cyan-600/30 hover:bg-cyan-500 transition-all duration-300 group text-sm"
                >
                  View Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link to="/research">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-7 py-3.5 bg-white/10 text-white backdrop-blur-md rounded-2xl border border-white/20 font-bold hover:bg-white/20 transition-all duration-300 text-sm"
                >
                  Research
                </motion.button>
              </Link>
              <Link to="/expertise">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-7 py-3.5 bg-white/10 text-white backdrop-blur-md rounded-2xl border border-white/20 font-bold hover:bg-white/20 transition-all duration-300 text-sm"
                >
                  Expertise
                </motion.button>
              </Link>
              <Link to="/resume">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-7 py-3.5 bg-white/10 text-white backdrop-blur-md rounded-2xl border border-white/20 font-bold hover:bg-white/20 transition-all duration-300 text-sm"
                >
                  Resume
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-7 py-3.5 bg-white/10 text-white backdrop-blur-md rounded-2xl border border-white/20 font-bold hover:bg-white/20 transition-all duration-300 text-sm"
                >
                  Get in Touch
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="w-1 h-3 bg-white/40 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Wave Divider */}
      <WaveDivider />

      {/* Stats Counter Section */}
      <section className="py-16 md:py-24 px-6 bg-white dark:bg-gray-950 transition-colors relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.05),transparent_50%)]" />
        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <AnimatedCounter value={14} suffix="+" label="Projects Completed" duration={2} />
            <AnimatedCounter value={30} suffix="+" label="Technologies Mastered" duration={2.5} />
            <AnimatedCounter value={2} suffix="+" label="Years of Experience" duration={3} />
            <AnimatedCounter value={9.42} suffix=" GPA" label="Academic Excellence" duration={2} />
          </div>
        </div>
      </section>

      {/* Progress Ring Figures */}
      <SectionReveal>
        <section className="py-12 px-6 bg-white dark:bg-gray-950 transition-colors">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-4 md:grid-cols-4 gap-6 justify-items-center">
              <ProgressRing value={92} label="Code" color="stroke-cyan-400" />
              <ProgressRing value={85} label="DevOps" color="stroke-purple-400" />
              <ProgressRing value={78} label="ML/AI" color="stroke-emerald-400" />
              <ProgressRing value={88} label="Research" color="stroke-amber-400" />
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Wave Divider (flipped) */}
      <WaveDivider flip />

      {/* Featured Projects Section */}
      <section className="py-24 md:py-32 px-6 bg-white dark:bg-gray-950 transition-colors relative">
        {/* Background decorative elements */}
        <div className="absolute top-40 right-0 w-72 h-72 bg-cyan-500/3 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 left-0 w-96 h-96 bg-purple-500/3 rounded-full blur-[130px]" />
        
        <div className="max-w-6xl mx-auto relative">
          <SectionReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-sm font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-4">Portfolio</h2>
                <h3 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-[0.95]">
                  Featured <span className="gradient-text-cyan">Projects</span>
                </h3>
              </div>
              <Link to="/projects" className="text-cyan-600 dark:text-cyan-400 font-bold flex items-center gap-2 hover:gap-4 transition-all duration-300 group shrink-0">
                View All Projects <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {projectsLoading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <div 
                  key={`skeleton-${idx}`}
                  className="bg-gray-50 dark:bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 animate-pulse flex flex-col h-full shimmer"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="aspect-[16/10] bg-gray-200/60 dark:bg-gray-800/50 flex items-center justify-center relative">
                    <div className="w-12 h-12 rounded-xl bg-gray-300 dark:bg-gray-700/60 opacity-20 animate-pulse" />
                  </div>
                  <div className="p-8 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="h-7 bg-gray-200 dark:bg-gray-800/85 rounded-xl w-3/4" />
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200/80 dark:bg-gray-800/70 rounded-lg w-full" />
                        <div className="h-4 bg-gray-200/80 dark:bg-gray-800/70 rounded-lg w-5/6" />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800/60 rounded-lg" />
                      <div className="h-6 w-20 bg-gray-200 dark:bg-gray-800/60 rounded-lg" />
                      <div className="h-6 w-14 bg-gray-200 dark:bg-gray-800/60 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative bg-gray-50 dark:bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl shadow-smooth"
                  whileHover={{ y: -8 }}
                >
                  <TiltCard>
                    <div className="aspect-[16/10] bg-gray-100 dark:bg-gray-800 overflow-hidden relative">
                      <img 
                        src={project.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80'} 
                        alt={project.title}
                        className="w-full h-full object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-110 gpu"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-8">
                      <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">{project.title}</h4>
                      <ExpandableDescription content={project.description} />
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech: string) => (
                          <span key={tech} className="px-3 py-1 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 md:py-32 px-6 bg-gray-50 dark:bg-black transition-colors relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-cyan-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-purple-600/5 blur-[120px] rounded-full" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionReveal>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-100/50 dark:bg-cyan-950/30 rounded-full text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-6">
                <Sparkles className="w-3 h-3" /> Core Competencies
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-[0.95]">
                Expertise & <span className="gradient-text">Capabilities</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Bridging AI and software engineering with renewable energy research to build intelligent, sustainable solutions.
              </p>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Cpu, title: "AI & Software Dev", desc: "Building AI-powered tools, SEO generators, and full-stack platforms with modern tech.", color: "cyan" },
              { icon: Code, title: "Clean Energy Research", desc: "Advancing hydrogen tech, electrochemical water splitting, and carbon capture solutions.", color: "purple" },
              { icon: Database, title: "Data & Analytics", desc: "Analyzing energy systems, performance metrics, and optimizing infrastructure efficiency.", color: "emerald" },
              { icon: Globe, title: "Sustainability", desc: "Driving green hydrogen policy, biomass analysis, and sustainable energy transitions.", color: "amber" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-8 bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl shadow-smooth group"
              >
                <motion.div 
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
                    item.color === 'cyan' ? 'bg-cyan-600/10 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' :
                    item.color === 'purple' ? 'bg-purple-600/10 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400' :
                    item.color === 'emerald' ? 'bg-emerald-600/10 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                    'bg-amber-600/10 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  }`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <item.icon className="w-7 h-7" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Hub Section */}
      <SectionReveal>
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <TestimonialsCarousel />
          </div>
        </section>
      </SectionReveal>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6">
        <SectionReveal>
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-cyan-600/20"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.4),transparent)]" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-[60px]" />
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-cyan-400/10 rounded-full blur-[50px]" />
            <FloatingParticles count={8} />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-white/80 uppercase tracking-widest mb-8 border border-white/20">
                <Sparkles className="w-3 h-3" /> Let's Collaborate
              </div>
              <h2 className="text-4xl md:text-7xl font-black mb-8 leading-[0.95]">
                Ready to build something <br />
                <span className="text-cyan-100 italic">extraordinary?</span>
              </h2>
              <p className="text-lg text-cyan-100/70 max-w-xl mx-auto mb-10 leading-relaxed">
                Whether it's a complex engineering challenge or a digital product, let's bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-10 py-5 bg-white text-cyan-600 rounded-2xl font-bold hover:bg-cyan-50 shadow-xl active:scale-[0.98] transition-all duration-300"
                  >
                    Start a Project
                  </motion.button>
                </Link>
                <Link to="/services">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-10 py-5 bg-cyan-700/50 text-white backdrop-blur-md border border-white/20 rounded-2xl font-bold hover:bg-cyan-700 transition-all duration-300"
                  >
                    View My Services
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </SectionReveal>
      </section>
    </main>
  );
}