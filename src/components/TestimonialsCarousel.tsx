import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Quote, ShieldCheck } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  verified: boolean;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Aris Thorne",
    role: "Director of Energy Systems",
    company: "GreenVantage Labs",
    content: "Rohan's unique bridging of electrochemical modeling with computational web dashboards allowed us to communicate our hydrogen storage efficiencies beautifully to stakeholders. A stellar engineer who codes with utmost precision.",
    rating: 5,
    verified: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Lead Systems Architect",
    company: "Helix Software Solutions",
    content: "We hired Rohan to optimize our real-time multi-threaded web workers. His work on Rust and WebAssembly was exceptionally fast and modular. Perceived user latency dropped by over 45%. Absolute masterclass in performance tuning.",
    rating: 5,
    verified: true,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 3,
    name: "Vikram Mehta",
    role: "General Manager",
    company: "Sustana Bio-Power",
    content: "The biomass production forecasting simulator Rohan designed built confidence across our entire technical team. The interactive D3 data systems made the most complex transient cycles intuitive to comprehend.",
    rating: 5,
    verified: true,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 4,
    name: "Elena Rostova",
    role: "Renewable Integration Lead",
    company: "Vesta Wind & Thermal",
    content: "Expert level thermodynamics skills combined with modern React/TypeScript stack. Rohan delivered our carbon capturing calculator 2 weeks ahead of schedule. We highly recommend his consulting services.",
    rating: 5,
    verified: true,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
  }
];

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const slideWidth = 400; // estimated width for swipe controls

  const handleNext = () => {
    setDirection(1);
    setIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prevIndex) => (prevIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const activeTestimonial = TESTIMONIALS[index];

  return (
    <div id="testimonials-carousel" className="py-16 bg-gray-50/40 dark:bg-gray-900/10 border border-gray-100 dark:border-white/5 rounded-[3rem] px-8 md:px-12 relative overflow-hidden">
      {/* Background abstract overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-600/5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-600/5 blur-3xl rounded-full" />

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <span className="text-[10px] font-black tracking-[0.25em] text-cyan-600 dark:text-cyan-400 uppercase block mb-2">Endorsements</span>
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">What Clients & Peers Say</h3>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-900 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 border border-gray-100 dark:border-white/5 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-900 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 border border-gray-100 dark:border-white/5 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative min-h-[300px] md:min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid md:grid-cols-12 gap-8 items-start"
            >
              <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="relative mb-4">
                  <img 
                    src={activeTestimonial.avatar} 
                    alt={activeTestimonial.name} 
                    className="w-20 h-20 rounded-2xl object-cover border border-gray-100 dark:border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  {activeTestimonial.verified && (
                    <span 
                      className="absolute -bottom-1.5 -right-1.5 bg-cyan-600 text-white rounded-lg p-1 border border-white dark:border-gray-900 flex items-center justify-center shadow-md shadow-cyan-600/10"
                      title="Verified Colleague"
                    >
                      <ShieldCheck size={14} className="stroke-[3]" />
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-lg">{activeTestimonial.name}</h4>
                <p className="text-xs text-cyan-600 dark:text-cyan-400 font-bold mt-1 uppercase tracking-wider">{activeTestimonial.company}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">{activeTestimonial.role}</p>

                <div className="flex gap-1 mt-4">
                  {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
              </div>

              <div className="md:col-span-8 relative">
                <Quote className="absolute -top-4 -left-6 text-cyan-100 dark:text-cyan-950/20 w-16 h-16 pointer-events-none" />
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed relative z-10 pl-2">
                  "{activeTestimonial.content}"
                </p>
                
                {/* Visual quote accent lines */}
                <div className="mt-6 flex items-center gap-3 pl-2">
                  <div className="h-0.5 w-12 bg-cyan-600 rounded-full" />
                  <span className="text-xs font-mono text-gray-400">REF: {(index+1).toString().padStart(2, '0')} // SV_COLLAB</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bullet page Indicators */}
        <div className="flex justify-center md:justify-start gap-2.5 mt-8 border-t border-gray-100 dark:border-white/5 pt-8">
          {TESTIMONIALS.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => {
                setDirection(idx > index ? 1 : -1);
                setIndex(idx);
              }}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                idx === index 
                  ? 'w-8 bg-cyan-600 dark:bg-cyan-400 shadow-md shadow-cyan-600/15' 
                  : 'w-2.5 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
