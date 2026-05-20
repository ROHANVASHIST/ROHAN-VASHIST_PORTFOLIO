import { motion } from 'motion/react';
import profileData from '../data/profile.json';
import { ArrowRight, Download, GraduationCap, Briefcase } from 'lucide-react';
import heroImage from '../assets/images/about_hero_banner_1779235498423.png';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="max-w-6xl mx-auto py-32 px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-12 mb-10">
            <motion.h1 
              variants={itemVariants}
              className="text-sm font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-[0.3em] mb-4"
            >
              The Story
            </motion.h1>
            <motion.h2 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tight leading-[0.9]"
            >
              Engineer. Developer. <br /> <span className="text-gray-400">Strategist.</span>
            </motion.h2>
          </div>

          {/* Hero Image Banner */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-12 mb-16 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/10 shadow-2xl shadow-gray-200/10 dark:shadow-none aspect-[16/9] md:aspect-[21/9] min-h-[300px] relative group"
          >
            <img 
              src={heroImage} 
              alt="Intersection of Mechanical Engineering and Software: blue blueprint schematics combined with crisp white lines of computer code" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/20 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          <div className="lg:col-span-7">
            <motion.section variants={itemVariants} className="mb-20">
              <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 leading-snug font-medium mb-12">
                {profileData.bio}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8 py-12 border-t border-gray-100 dark:border-gray-800">
                <div>
                  <h4 className="text-xs font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-4">Foundation</h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                    Rooted in Mechanical Engineering, my approach to software development is defined by logical structure, optimization, and system-level thinking.
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-4">Vision</h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                    I believe technology should be hidden—serving user needs through seamless automation and frictionless interfaces.
                  </p>
                </div>
              </div>
            </motion.section>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <a href="/resume" className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black flex items-center gap-2 hover:scale-105 transition-all shadow-xl active:scale-95">
                <Download size={20} /> Download CV
              </a>
              <a href="/contact" className="px-8 py-4 bg-white dark:bg-white/5 text-gray-900 dark:text-white border border-gray-100 dark:border-white/10 rounded-2xl font-black flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-white/10 transition-all active:scale-95">
                Get in Touch <ArrowRight size={20} />
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 space-y-12">
            <motion.section variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-cyan-600/10 rounded-xl flex items-center justify-center text-cyan-600">
                  <GraduationCap size={20} />
                </div>
                <h4 className="text-xs font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest">Education</h4>
              </div>
              <div className="p-8 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[2.5rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:rotate-12 transition-transform">
                  <GraduationCap size={80} />
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 leading-tight">{profileData.education.degree}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-bold mb-4">{profileData.education.institution}</p>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-white dark:bg-white/10 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 shadow-sm">Class of {profileData.education.graduationYear}</span>
              </div>
            </motion.section>

            <motion.section variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-cyan-600/10 rounded-xl flex items-center justify-center text-cyan-600">
                  <Briefcase size={20} />
                </div>
                <h4 className="text-xs font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest">Focus</h4>
              </div>
              <div className="space-y-3">
                {['Computational Modeling', 'Full-stack Architecture', 'Energy Optimisation', 'UX Strategy'].map(focus => (
                  <div key={focus} className="p-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl font-bold text-gray-700 dark:text-gray-300 flex items-center justify-between hover:border-cyan-600 dark:hover:border-cyan-400 transition-colors cursor-default">
                    {focus}
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
                  </div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
