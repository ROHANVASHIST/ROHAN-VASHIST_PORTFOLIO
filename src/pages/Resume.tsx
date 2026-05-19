import { motion } from 'motion/react';
import resumeData from '../data/resume.json';
import { Download, ExternalLink, Calendar, MapPin } from 'lucide-react';

export default function Resume() {
  return (
    <main className="max-w-6xl mx-auto py-32 px-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
        <div className="max-w-2xl">
          <h1 className="text-sm font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-[0.3em] mb-4">Curriculum Vitae</h1>
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white leading-[0.9]">
            Professional <br /> Experience.
          </h2>
        </div>
        <button className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black flex items-center gap-2 hover:scale-105 transition-all shadow-xl active:scale-95">
          <Download size={20} /> Download PDF
        </button>
      </div>
      
      <div className="grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-16">
          <section>
            <div className="flex items-center gap-4 mb-10">
              <span className="w-12 h-[1px] bg-gray-200 dark:bg-gray-800" />
              <h3 className="text-xs font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest">Experience</h3>
            </div>
            
            <div className="space-y-12">
              {resumeData.experience.map((exp: any, idx: number) => (
                <motion.div 
                  key={exp.company}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <h4 className="text-2xl font-black text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {exp.role} <span className="text-gray-400 font-medium">@</span> {exp.company}
                    </h4>
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-500 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 px-3 py-1.5 rounded-xl">
                      <Calendar size={14} />
                      {exp.period}
                    </div>
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 pl-0 md:pl-0">
                    {exp.description}
                  </p>
                  <div className="h-px w-full bg-gray-50 dark:bg-gray-900" />
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-10">
              <span className="w-12 h-[1px] bg-gray-200 dark:bg-gray-800" />
              <h3 className="text-xs font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest">Education</h3>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-8">
              {resumeData.education.map((edu: any) => (
                <div key={edu.institution} className="p-8 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[2.5rem] group hover:border-cyan-600/30 transition-colors">
                  <h4 className="text-xl font-black text-gray-900 dark:text-white mb-2">{edu.degree}</h4>
                  <p className="text-gray-600 dark:text-gray-400 font-bold mb-4">{edu.institution}</p>
                  <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest">
                    <Calendar size={12} />
                    Class of {edu.year}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-12">
          <section className="bg-gray-900 dark:bg-white rounded-[2.5rem] p-10 text-white dark:text-gray-900">
            <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-8">Technical Stack</h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill: string) => (
                <span 
                  key={skill} 
                  className="bg-white/10 dark:bg-gray-900/5 text-white dark:text-gray-900 border border-white/10 dark:border-gray-900/10 px-4 py-2 rounded-xl text-sm font-bold hover:bg-white dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="p-10 bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
            <h3 className="text-xs font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-8">Quick Links</h3>
            <div className="space-y-4">
              {[
                { name: 'LinkedIn Profile', href: 'https://linkedin.com/in/rohan' },
                { name: 'GitHub Repos', href: 'https://github.com/rohan' },
                { name: 'Portfolio Site', href: '/' },
              ].map(link => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="flex items-center justify-between p-4 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl font-bold text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors group"
                >
                  {link.name}
                  <ExternalLink size={16} className="opacity-30 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </section>

          <div className="p-10 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-black text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em] mb-4">
              <MapPin size={14} /> New York, NY
            </div>
            <p className="text-gray-400 text-xs italic">References available upon request.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
