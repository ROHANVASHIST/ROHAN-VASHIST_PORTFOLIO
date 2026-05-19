import { motion } from 'motion/react';
import { ArrowRight, Code, Database, Globe, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import profileData from '../data/profile.json';
import skillsData from '../data/skills.json';
import projectsData from '../data/projects.json';

export default function Home() {
  const featuredProjects = projectsData.projects.slice(0, 3);
  
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative" 
        style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/profile.jpg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-950 opacity-100" />
        
        <div className="text-center p-6 text-white relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
              {profileData.name}
            </h1>
            <p className="text-xl md:text-2xl text-cyan-100/80 mb-10 max-w-2xl mx-auto font-light">
              {profileData.headline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/projects">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-cyan-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-cyan-600/30 hover:bg-cyan-500 transition-all"
                >
                  Explore My Work <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white backdrop-blur-md rounded-2xl border border-white/20 font-bold hover:bg-white/20 transition-all"
                >
                  Get in Touch
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-3 bg-white/50 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 px-6 bg-white dark:bg-gray-950 transition-colors">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <h2 className="text-sm font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-4">Portfolio</h2>
              <h3 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">Featured Projects</h3>
            </div>
            <Link to="/projects" className="text-cyan-600 dark:text-cyan-400 font-bold flex items-center gap-2 hover:gap-4 transition-all group">
              View All Projects <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative bg-gray-50 dark:bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all"
              >
                <div className="aspect-[16/10] bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <img 
                    src={project.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80'} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8">
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">{project.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span key={tech} className="px-3 py-1 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-black transition-colors relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-cyan-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-purple-600/5 blur-[120px] rounded-full" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6"
            >
              Expertise & Capabilities
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Combining rigorous engineering principles with cutting-edge digital development to build robust, scalable solutions.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Cpu, title: "Precision Engineering", desc: "Modeling and optimization of complex mechanical systems." },
              { icon: Code, title: "Full-Stack Dev", desc: "Building high-performance apps with React, TS, and Node." },
              { icon: Database, title: "Data Systems", desc: "Real-time processing and visualization for scientific data." },
              { icon: Globe, title: "Sustainability", desc: "Clean tech innovations and bio-energy system design." },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-cyan-600/10 dark:bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 text-cyan-600 dark:text-cyan-400">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-cyan-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-cyan-600/20"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.4),transparent)]" />
          <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10 leading-tight">Ready to build something <span className="text-cyan-100 italic">extraordinary?</span></h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
            <Link to="/contact">
              <button className="w-full sm:w-auto px-10 py-5 bg-white text-cyan-600 rounded-2xl font-bold hover:bg-cyan-50 transition-all shadow-xl active:scale-[0.98]">
                Start a Project
              </button>
            </Link>
            <Link to="/services">
              <button className="w-full sm:w-auto px-10 py-5 bg-cyan-700/50 text-white backdrop-blur-md border border-white/20 rounded-2xl font-bold hover:bg-cyan-700 transition-all">
                View My Services
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
