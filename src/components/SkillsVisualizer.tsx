import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Layers, Zap, GraduationCap, CheckCircle2 } from 'lucide-react';

interface SkillNode {
  name: string;
  level: 'Intermediate' | 'Advanced' | 'Expert';
  score: number; // 1-3 mapped
  desc: string;
}

interface Category {
  categoryName: string;
  icon: string;
  description: string;
  skills: SkillNode[];
}

const SKILL_DATA: Category[] = [
  {
    categoryName: "Thermodynamics & Energy Science",
    icon: "energy",
    description: "Deep mathematical modeling and engineering analyses of physical and thermodynamic cycles.",
    skills: [
      { name: "Hydrogen Economy", level: "Expert", score: 3, desc: "Liquid and metal-hydride storage thermodynamics." },
      { name: "Biomass Gasification", level: "Advanced", score: 2.5, desc: "Transient kinetic modeling and synthesis gas estimation." },
      { name: "Direct Air Capture (DAC)", level: "Expert", score: 3, desc: "Vapor/vacuum thermal swing adsorption pathways." },
      { name: "Fluid Dynamics (CFD)", level: "Intermediate", score: 2, desc: "Transient Navier-Stokes simulation grids." },
      { name: "Electrochemistry", level: "Advanced", score: 2.5, desc: "Nernst equation solving and fuel cell degradation." }
    ]
  },
  {
    categoryName: "Modern Software Systems",
    icon: "software",
    description: "Building resilient physical calculators and digital systems with complete type safety.",
    skills: [
      { name: "TypeScript / React", level: "Expert", score: 3, desc: "Highly dynamic application architectures." },
      { name: "Rust / WASM", level: "Advanced", score: 2.5, desc: "Compile heavy physics-solvers directly to browser threads." },
      { name: "Python / Numerical Data", level: "Expert", score: 3, desc: "Scientific solvers, NumPy, Pandas, gas estimator models." },
      { name: "API & Server-Side Systems", level: "Advanced", score: 2.5, desc: "Secure proxy routers, Express, real-time data streaming." },
      { name: "D3.js / Data Graphics", level: "Expert", score: 3, desc: "Pristine SVG data visualizations." }
    ]
  }
];

export default function SkillsVisualizer() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);

  const activeCategory = SKILL_DATA[activeTab];

  // SVG Radar generator variables
  const width = 240;
  const height = 240;
  const cx = width / 2;
  const cy = height / 2;
  const rMax = 95; // Max radius

  // Map skill points into radial coordinate parameters of the polygon
  const numAxes = activeCategory.skills.length;
  
  const axes = activeCategory.skills.map((skill, i) => {
    const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
    // Score ranges from 1 to 3
    const radius = (skill.score / 3) * rMax;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    
    // Label placement
    const labelRadius = rMax + 24;
    const lx = cx + labelRadius * Math.cos(angle);
    const ly = cy + labelRadius * Math.sin(angle);
    
    // Web Grid guide circles at radius levels 1, 2, 3
    return {
      name: skill.name,
      x,
      y,
      lx,
      ly,
      angle,
      skill
    };
  });

  // Polyline points path builder
  const polygonPoints = axes.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div id="skills-visualizer-container" className="grid lg:grid-cols-12 gap-8 items-start my-16 p-8 bg-gray-50/50 dark:bg-gray-900/10 border border-gray-100 dark:border-white/5 rounded-[3rem]">
      {/* Category Sidebar Navigation */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <span className="text-[10px] font-black tracking-[0.25em] text-cyan-600 dark:text-cyan-400 uppercase block mb-2">Technical Matrix</span>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white">Competency Analytics</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Rohan maps mathematical theories straight into code. Select a core field to inspect verified level stats on the interactive Radar.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {SKILL_DATA.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveTab(idx);
                setHoveredSkill(null);
              }}
              className={`p-5 text-left border rounded-2xl transition-all cursor-pointer group flex items-start gap-4 ${
                activeTab === idx
                  ? 'bg-white dark:bg-gray-900 border-cyan-600/30 dark:border-cyan-400/20 shadow-xl shadow-cyan-600/5'
                  : 'bg-transparent border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5'
              }`}
            >
              <div className={`p-2.5 rounded-xl border transition-all ${
                activeTab === idx
                  ? 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 border-cyan-100 dark:border-cyan-900/30'
                  : 'bg-gray-50 dark:bg-white/5 text-gray-400 dark:text-gray-500 border-gray-100 dark:border-white/5 group-hover:scale-105'
              }`}>
                {idx === 0 ? <Zap size={18} /> : <Layers size={18} />}
              </div>
              <div>
                <h4 className={`text-sm font-bold transition-colors ${
                  activeTab === idx ? 'text-gray-950 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {cat.categoryName}
                </h4>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* SVG Interactive Radar Engine */}
      <div className="lg:col-span-7 grid md:grid-cols-12 gap-8 items-center bg-white dark:bg-gray-900/30 border border-gray-100 dark:border-white/5 p-8 rounded-3xl min-h-[380px]">
        {/* Radar Graphic */}
        <div className="md:col-span-7 flex justify-center relative select-none">
          <svg width={width + 50} height={height + 50} className="overflow-visible font-sans">
            <g transform="translate(25, 25)">
              {/* Polar guides (Circles at level 1, 2, 3) */}
              {[1, 2, 3].map((level) => {
                const r = (level / 3) * rMax;
                return (
                  <circle
                    key={level}
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill="none"
                    className="stroke-gray-100 dark:stroke-gray-800"
                    strokeWidth={1}
                    strokeDasharray={level === 3 ? "none" : "3,3"}
                  />
                );
              })}

              {/* Axial Spoke Grid lines */}
              {axes.map((ax, idx) => {
                const outerX = cx + rMax * Math.cos(ax.angle);
                const outerY = cy + rMax * Math.sin(ax.angle);
                return (
                  <line
                    key={idx}
                    x1={cx}
                    y1={cy}
                    x2={outerX}
                    y2={outerY}
                    className="stroke-gray-150 dark:stroke-gray-800"
                    strokeWidth={1}
                  />
                );
              })}

              {/* Level Legend indicators */}
              <text x={cx} y={cy - (1/3)*rMax - 4} className="text-[8px] fill-gray-400 dark:fill-gray-600 font-bold text-center" textAnchor="middle">BASIC</text>
              <text x={cx} y={cy - (2/3)*rMax - 4} className="text-[8px] fill-gray-400 dark:fill-gray-600 font-bold text-center" textAnchor="middle">ADVANCED</text>
              <text x={cx} y={cy - rMax - 4} className="text-[8px] fill-cyan-500/80 font-black text-center" textAnchor="middle">EXPERT</text>

              {/* Closed Polygon area representing actual scores */}
              <polygon
                points={polygonPoints}
                className="fill-cyan-500/10 dark:fill-cyan-400/5 stroke-cyan-600 dark:stroke-cyan-400"
                strokeWidth={2}
                strokeLinejoin="round"
              />

              {/* Clickable Hover Nodes on vertices */}
              {axes.map((ax, idx) => (
                <g 
                  key={idx}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredSkill(ax.skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <circle
                    cx={ax.x}
                    cy={ax.y}
                    r={hoveredSkill?.name === ax.name ? 7 : 4.5}
                    className={`transition-all duration-200 ${
                      hoveredSkill?.name === ax.name 
                        ? 'fill-cyan-600 dark:fill-cyan-400 stroke-white dark:stroke-gray-900' 
                        : 'fill-white dark:fill-gray-900 stroke-cyan-600 dark:stroke-cyan-400'
                    }`}
                    strokeWidth={2}
                  />
                  {/* Subtle Text Axis Label */}
                  <text
                    x={ax.lx}
                    y={ax.ly}
                    className={`text-[9px] font-black tracking-tighter text-center transition-colors ${
                      hoveredSkill?.name === ax.name 
                        ? 'fill-cyan-600 dark:fill-cyan-400 scale-105' 
                        : 'fill-gray-500 dark:fill-gray-400'
                    }`}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                  >
                    {ax.name.split(' ')[0]}
                  </text>
                </g>
              ))}
            </g>
          </svg>
        </div>

        {/* Selected / Tooltip Skill Panel */}
        <div className="md:col-span-5 space-y-4">
          <span className="text-[9px] font-black tracking-widest text-cyan-600 dark:text-cyan-400 uppercase block">Focus Node Details</span>
          
          {hoveredSkill ? (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-cyan-50/45 dark:bg-cyan-950/20 border border-cyan-100/60 dark:border-cyan-950/40 rounded-2xl relative"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-gray-900 dark:text-white text-base leading-tight">{hoveredSkill.name}</h4>
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-cyan-600/10 text-cyan-600 dark:text-cyan-400">
                  {hoveredSkill.level}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                {hoveredSkill.desc}
              </p>
              
              <div className="mt-4 flex items-center justify-between border-t border-cyan-100/40 dark:border-cyan-950/30 pt-3">
                <span className="text-[10px] font-bold text-gray-400">Expertise Rating:</span>
                <div className="flex gap-1">
                  {Array.from({ length: Math.ceil(hoveredSkill.score) }).map((_, i) => (
                    <Award key={i} size={11} className="text-cyan-600 dark:text-cyan-400 fill-cyan-600/10" />
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="p-5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl text-center flex flex-col items-center justify-center min-h-[160px]">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 dark:text-gray-500 mb-3">
                <CheckCircle2 size={18} />
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed font-semibold">
                Hover over any polygon node to inspect professional details and core competencies.
              </p>
            </div>
          )}

          <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl text-[10px] text-gray-400 leading-normal flex gap-2">
            <GraduationCap size={14} className="text-cyan-500 flex-shrink-0 mt-0.5" />
            <span>Levels are self-audited periodically against direct project outcomes and research publications.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
