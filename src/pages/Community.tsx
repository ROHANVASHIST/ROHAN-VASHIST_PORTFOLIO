import React from 'react';
import { motion } from 'motion/react';
import { Award, Heart, Globe, Users, Star, Flame, Sparkles, Navigation, FlaskConical, BookOpen } from 'lucide-react';

export default function Community() {
  return (
    <main className="max-w-6xl mx-auto py-32 px-6 font-sans">
      <div className="max-w-3xl mb-16">
        <h1 className="text-sm font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-[0.3em] mb-4">Leadership & Volunteering</h1>
        <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight">
          MY Bharat. <br /> Youth Impact & <span className="text-gray-400">Leadership.</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-6 leading-relaxed">
          Active National Volunteer under the MY Bharat National Volunteer Framework, leading task execution and community outreach. Believing that technical expertise is only valuable when channeled towards societal growth and regional sustainability.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Core initiatives */}
        <div className="lg:col-span-8 space-y-12">
          <section className="space-y-6">
            <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <Flame size={14} className="text-cyan-600 animate-pulse" /> National Youth Initiatives
            </h3>
            
            <div className="p-8 bg-gray-50/50 dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-[2.5rem] relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-600/5 blur-3xl rounded-full" />
              
              <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-2 group-hover:text-cyan-600 transition-colors">
                MY Bharat National Volunteer Framework
              </h4>
              <p className="text-xs text-cyan-650 dark:text-cyan-400 font-bold uppercase tracking-wider mb-6">Active National Volunteer & Task Lead</p>
              
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6 font-semibold">
                Active National Volunteer under the MY Bharat National Volunteer Framework, leading task execution and community outreach. Collaborated with local energy development bureaus to design solar pump literacy drives for agricultural co-ops, educating local community headers on photovoltaic-grid optimizations. Won the MY Bharat Budget Quest championship (VBYLD2026) as State Champion.
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

            <div className="p-8 bg-gray-50/50 dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-[2.5rem] relative group overflow-hidden">
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

          {/* Campus & Community Leadership */}
          <section className="space-y-6">
            <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <Heart size={14} className="text-rose-600 animate-pulse" /> Campus & Community Leadership
            </h3>

            <div className="p-8 bg-gray-50/50 dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-[2.5rem] relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/5 blur-3xl rounded-full" />

              <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-2 group-hover:text-rose-600 transition-colors">
                Srijan Science Club, GGSIPU
              </h4>
              <p className="text-xs text-rose-600 dark:text-rose-400 font-bold uppercase tracking-wider mb-6">Active Member & Volunteer</p>

              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6 font-semibold">
                Contributing to the university's premier science club by organizing and participating in technical workshops, science exhibitions, and interdisciplinary research discussions. Engaged in knowledge-sharing sessions on renewable energy technologies, fostering scientific temper among peers.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 border-t border-gray-100 dark:border-white/5 pt-6 text-xs text-gray-400">
                <div className="flex items-start gap-2.5">
                  <FlaskConical size={16} className="text-rose-600 flex-shrink-0" />
                  <span>Conducted peer-led workshops on emerging energy technologies and laboratory techniques.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Users size={16} className="text-rose-600 flex-shrink-0" />
                  <span>Collaborated with fellow researchers to promote hands-on learning and innovation culture on campus.</span>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gray-50/50 dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-[2.5rem] relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/5 blur-3xl rounded-full" />

              <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 transition-colors">
                National Service Scheme (NSS), GGSIPU
              </h4>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider mb-6">Active Volunteer</p>

              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6 font-semibold">
                Volunteering under the NSS framework to drive community welfare initiatives, blood donation camps, cleanliness drives, and digital literacy programs in underserved communities. Committed to the motto "Not Me, But You" through regular service activities.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 border-t border-gray-100 dark:border-white/5 pt-6 text-xs text-gray-400">
                <div className="flex items-start gap-2.5">
                  <Heart size={16} className="text-emerald-600 flex-shrink-0" />
                  <span>Participated in community outreach drives promoting health, hygiene, and environmental awareness.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Globe size={16} className="text-emerald-600 flex-shrink-0" />
                  <span>Contributed to campus greening initiatives and sustainable waste management efforts.</span>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gray-50/50 dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-[2.5rem] relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/5 blur-3xl rounded-full" />

              <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-2 group-hover:text-amber-600 transition-colors">
                CSR Club Teaching Initiative
              </h4>
              <p className="text-xs text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider mb-6">Teacher, Unprivileged Students Teaching Course</p>

              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6 font-semibold">
                Serving as a dedicated educator under the CSR Club's teaching initiative, providing free academic instruction to underprivileged students. Designing simplified curricula in science, mathematics, and English to bridge educational gaps and empower students with foundational knowledge for future opportunities.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 border-t border-gray-100 dark:border-white/5 pt-6 text-xs text-gray-400">
                <div className="flex items-start gap-2.5">
                  <BookOpen size={16} className="text-amber-600 flex-shrink-0" />
                  <span>Developed accessible lesson plans tailored to diverse learning levels and backgrounds.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Award size={16} className="text-amber-600 flex-shrink-0" />
                  <span>Mentored students beyond academics, fostering confidence, curiosity, and a growth mindset.</span>
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
                { label: "National Ambassador", metric: "Active", subtitle: "MY Bharat National Volunteer Framework" },
                { label: "State Champion", metric: "VBYLD2026", subtitle: "MY Bharat Budget Quest Championship" }
              ].map((m, idx) => (
                <div key={idx} className="border-b border-white/5 last:border-none pb-6 last:pb-0">
                  <p className="text-xs text-gray-400">{m.label}</p>
                  <p className="text-3xl font-black mt-1 text-white">{m.metric}</p>
                  <p className="text-[10px] text-cyan-400/80 mt-0.5">{m.subtitle}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 dark:bg-gray-900 flex gap-3 text-xs text-gray-500">
            <Sparkles size={16} className="text-cyan-500 flex-shrink-0 mt-0.5" />
            <span>Interested in launching a local climate-tech initiative in your area? Let's join forces and build secure regional tools.</span>
          </section>
        </div>
      </div>
    </main>
  );
}
