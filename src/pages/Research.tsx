import React from 'react';
import { motion } from 'motion/react';
import { Award, BookOpen, Quote, Cpu, Star, ExternalLink, GraduationCap, ChevronRight } from 'lucide-react';
import ResearchHub from '../components/ResearchHub';

export default function Research() {
  return (
    <main className="max-w-6xl mx-auto py-32 px-6 font-sans">
      <div className="max-w-3xl mb-16">
        <h1 className="text-sm font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-[0.3em] mb-4">Academic Ledger</h1>
        <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight">
          Scientific Rigor. <br /> Thermodynamic <span className="text-gray-400">Complexity.</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-6 leading-relaxed">
          Explorations in physical thermodynamics, low-temperature thermal-swing adsorption carbon capture pathways, and multi-stage desalination loop dynamics. Bridging physical formulas with secure computational software.
        </p>
      </div>

      {/* Grid: Academic Milestones & Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {[
          { 
            title: "Thermodynamic Modeling", 
            value: "2+", 
            desc: "Primary publications centered on Vacuum Temperature Swing Adsorption and water desalination modeling.",
            icon: Cpu
          },
          { 
            title: "Physics Bounds Sized", 
            value: "~125 kWh/t", 
            desc: "Establishing lower thermodynamic thermal bounds for solid sorbent DAC regenerators.",
            icon: BookOpen
          },
          { 
            title: "Academic Citations", 
            value: "APA & BibTeX", 
            desc: "Custom citation formats built-in for instant export across general university registries.",
            icon: Quote
          }
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 bg-gray-50/50 dark:bg-gray-901 border border-gray-100 dark:border-white/5 rounded-3xl"
          >
            <div className="w-10 h-10 bg-cyan-600/10 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-xl flex items-center justify-center mb-6">
              <stat.icon size={18} />
            </div>
            <p className="text-3xl font-black text-gray-900 dark:text-white mb-2">{stat.value}</p>
            <h4 className="font-bold text-gray-800 dark:text-gray-200 text-sm">{stat.title}</h4>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 leading-relaxed">{stat.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Embedded High-Fidelity Research Hub Component */}
      <ResearchHub />

      {/* Future Research Interests Panel */}
      <section className="bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-white/5 p-10 md:p-14 mt-24">
        <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">Future Horizons</h3>
        <h4 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-8">Planned Scientific Investigations</h4>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h5 className="font-bold text-gray-800 dark:text-white text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-600" />
              Solid Sorbent Adsorption Kinetics
            </h5>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-semibold">
              Applying transient mass transfer calculations to model rapid fluid-bed carbon captures.
            </p>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-gray-800 dark:text-white text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-600" />
              Machine Learning in Fluid Mechanics
            </h5>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-semibold">
              Integrating physics-informed neural network structures directly with boundary-layer solvers in Node environments.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
