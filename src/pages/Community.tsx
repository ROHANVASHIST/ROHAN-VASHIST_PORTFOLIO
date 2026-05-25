import React from 'react';
import { motion } from 'motion/react';
import { Award, Heart, Globe, Users, Star, Flame, Sparkles, Navigation } from 'lucide-react';

export default function Community() {
  return (
    <main className="max-w-6xl mx-auto py-32 px-6 font-sans">
      <div className="max-w-3xl mb-16">
        <h1 className="text-sm font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-[0.3em] mb-4">Leadership & Volunteering</h1>
        <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight">
          Mera Yuva Bharat. <br /> Youth Impact & <span className="text-gray-400">Leadership.</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-6 leading-relaxed">
          Believing that technical expertise is only valuable when channeled towards societal growth and regional sustainability. Actively participating in national youth programs and sustainable energy literacy.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Core initiatives */}
        <div className="lg:col-span-8 space-y-12">
          <section className="space-y-6">
            <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <Flame size={14} className="text-cyan-600 animate-pulse" /> National Youth Initiatives
            </h3>
            
            <div className="p-8 bg-gray-50/50 dark:bg-gray-901 border border-gray-100 dark:border-white/5 rounded-[2.5rem] relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-600/5 blur-3xl rounded-full" />
              
              <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-2 group-hover:text-cyan-600 transition-colors">
                Mera Yuva Bharat (MY Bharat) Initiative
              </h4>
              <p className="text-xs text-cyan-650 dark:text-cyan-400 font-bold uppercase tracking-wider mb-6">Active Ambassador & Volunteer Advocate</p>
              
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6 font-semibold">
                Designed to act as a primary interface between young change-makers and nation-building strategies. Collaborated with local energy development bureaus to design solar pump literacy drives for agricultural co-ops, educating local community headers on photovoltiac-grid optimizations.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 border-t border-gray-100 dark:border-white/5 pt-6 text-xs text-gray-400">
                <div className="flex items-start gap-2.5">
                  <Award size={16} className="text-cyan-600 flex-shrink-0" />
                  <span>Advocated sustainable energy literacy programs across rural coordinates.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Users size={16} className="text-cyan-600 flex-shrink-0" />
                  <span>Fostered technical workshops helping local students transition towards STEM roles.</span>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gray-50/50 dark:bg-gray-901 border border-gray-100 dark:border-white/5 rounded-[2.5rem] relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 blur-3xl rounded-full" />
              
              <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-2 group-hover:text-cyan-600 transition-colors">
                Green Tech Educational Pedagogy
              </h4>
              <p className="text-xs text-purple-650 dark:text-purple-400 font-bold uppercase tracking-wider mb-6">Pedagogical Outreach Leader</p>
              
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6 font-semibold">
                Organized and hosted educational seminars explaining fluid thermodynamics limits, Direct Air Captures (DAC), and solar water distillation cycles inside regional polytechnic colleges. Aimed to lower barriers for standard engineers starting carbon capture models.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 border-t border-gray-100 dark:border-white/5 pt-6 text-xs text-gray-400">
                <div className="flex items-start gap-2.5">
                  <Globe size={16} className="text-purple-600 flex-shrink-0" />
                  <span>Reached out to over 300+ students on the topics of engineering sustainability.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Star size={16} className="text-purple-600 flex-shrink-0" />
                  <span>Shared open source models of thermal swing adsorption beds for study.</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Impact stats side bar */}
        <div className="lg:col-span-4 space-y-8">
          <section className="bg-gray-950 text-white rounded-[2.5rem] p-8 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.15),transparent)] pointer-events-none" />
            
            <h3 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-6">Impact Highlights</h3>
            
            <div className="space-y-6">
              {[
                { label: "Community Outreach", metric: "300+", subtitle: "Students & Farmers Literated" },
                { label: "National Ambassadors", metric: "Active", subtitle: "Mera Yuva Bharat Advocate" },
                { label: "STEM Seminars Designed", metric: "5+", subtitle: "Covering solar loops & thermodynamic flows" }
              ].map((m, idx) => (
                <div key={idx} className="border-b border-white/5 last:border-none pb-6 last:pb-0">
                  <p className="text-xs text-gray-400">{m.label}</p>
                  <p className="text-3xl font-black mt-1 text-white">{m.metric}</p>
                  <p className="text-[10px] text-cyan-400/80 mt-0.5">{m.subtitle}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 dark:border-gray-850 dark:bg-gray-901 flex gap-3 text-xs text-gray-500">
            <Sparkles size={16} className="text-cyan-500 flex-shrink-0 mt-0.5" />
            <span>Interested in launching a local climate-tech initiative in your area? Let's join forces and build secure regional tools.</span>
          </section>
        </div>
      </div>
    </main>
  );
}
