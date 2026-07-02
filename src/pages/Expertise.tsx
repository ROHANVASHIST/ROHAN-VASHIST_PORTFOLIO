import { motion } from 'motion/react';
import { Cpu, Code, Database, Zap, Shield, BarChart } from 'lucide-react';
import skillsData from '../data/skills.json';
import InteractiveEnergyLab from '../components/InteractiveEnergyLab';
import SkillsVisualizer from '../components/SkillsVisualizer';

const ICON_MAP: Record<string, any> = {
  "AI & Software Development": Code,
  "Renewable Energy & Hydrogen": Cpu,
  "Analytical & Electrochemical": Database,
  "Soft Skills & Leadership": Shield
};

export default function Expertise() {
  return (
    <main className="max-w-6xl mx-auto py-32 px-6">
      <div className="max-w-3xl mb-20">
        <h1 className="text-sm font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-[0.3em] mb-4">Capabilities</h1>
        <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight">
          Where Engineering Precision meets <span className="text-gray-400">Digital Scalability.</span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {skillsData.categories.map((category: any, catIdx: number) => {
          const Icon = ICON_MAP[category.name] || Cpu;
          return (
            <motion.div 
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-8 md:p-12 shadow-sm relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                <Icon size={160} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-cyan-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-cyan-600/20">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white">{category.name}</h3>
                </div>

                <div className="grid gap-3">
                  {category.skills.map((skill: any) => (
                    <div 
                      key={skill.name} 
                      className="flex justify-between items-center bg-gray-50 dark:bg-white/5 p-5 rounded-2xl border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-all group/item"
                    >
                      <span className="font-bold text-gray-700 dark:text-gray-300 group-hover/item:text-cyan-600 dark:group-hover/item:text-cyan-400 transition-colors">
                        {skill.name}
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="h-1.5 w-16 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: skill.level === 'Expert' ? '100%' : skill.level === 'Advanced' ? '75%' : '50%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-cyan-600"
                          />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/40 px-2 py-1 rounded-lg tabular-nums">
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Skills Matrix Visual Analyser */}
      <SkillsVisualizer />

      {/* Dynamic Multi-Physics Simulator Lab */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-32 space-y-12"
      >
        <div className="max-w-3xl">
          <h2 className="text-sm font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-[0.3em] mb-4">Thermodynamic Lab Sandbox</h2>
          <h3 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-none">Interactive Energy Simulator</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
            In energy science, theory maps directly to computational feedback. Adjust thermodynamic variables in real-time to observe chemical gas state compressibilities, carbon capture adsorption kinetics, and marine solar desalination loops.
          </p>
        </div>
        
        <InteractiveEnergyLab />
      </motion.section>

      <section className="mt-32 p-16 bg-gray-900 rounded-[3rem] text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <h2 className="text-3xl font-bold mb-6 relative z-10">Interested in a deep-dive technical discussion?</h2>
        <p className="text-gray-400 mb-10 max-w-xl mx-auto relative z-10 text-lg leading-relaxed">
          I'm always open to discussing system architecture, thermodynamic modeling, or full-stack performance optimization.
        </p>
        <button className="px-10 py-5 bg-cyan-600 hover:bg-cyan-500 rounded-2xl font-black transition-all shadow-2xl shadow-cyan-600/30 relative z-10 active:scale-95">
          Get Technical Together
        </button>
      </section>
    </main>
  );
}
