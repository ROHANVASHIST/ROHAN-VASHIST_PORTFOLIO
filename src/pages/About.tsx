import { motion } from 'motion/react';
import defaultProfileData from '../data/profile.json';
import { ArrowRight, Download, GraduationCap, Briefcase, Lightbulb, Target, Users, Award } from 'lucide-react';
import heroImage from '../assets/images/about_hero_banner_1779235498423.png';
import profilePhoto from '../assets/images/profile_photo.jpg';
import { useData } from '../lib/useData';

export default function About() {
  const profileData = useData('profile', defaultProfileData);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="max-w-7xl mx-auto py-20 px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section with Photo */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div variants={itemVariants}>
            <h1 className="text-sm font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-[0.3em] mb-4">
              About Me
            </h1>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-[0.95] mb-6">
              AI Engineer Intern & <br /> <span className="text-gray-400">Clean Energy Researcher</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              An AI Engineer Intern and Researcher with a solid foundation in Energy Engineering, Renewable Energy, and Hydrogen Technologies, seamlessly combined with hands-on experience in full-stack software development. Passionate about advancing clean energy solutions—including data center energy optimization, electrochemical water splitting, and carbon capture. Experienced in building AI-powered productivity tools, SEO generators, and web platforms while demonstrating proven leadership as a global program scholar, campus ambassador, and community volunteer.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/resume" className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black flex items-center gap-2 hover:scale-105 transition-all shadow-xl active:scale-95">
                <Download size={20} /> Download CV
              </a>
              <a href="/contact" className="px-8 py-4 bg-white dark:bg-white/5 text-gray-900 dark:text-white border border-gray-100 dark:border-white/10 rounded-2xl font-black flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-white/10 transition-all active:scale-95">
                Get in Touch <ArrowRight size={20} />
              </a>
            </div>
          </motion.div>

          {/* Profile Photo */}
          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/10 shadow-2xl shadow-gray-200/20 dark:shadow-none aspect-square">
              <img 
                src={profilePhoto} 
                alt="Rohan Vashist - AI Engineer and Energy Engineer" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent pointer-events-none" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-cyan-600 text-white px-6 py-3 rounded-2xl shadow-xl">
              <div className="text-2xl font-black">9.42</div>
              <div className="text-xs font-bold uppercase tracking-wider">GPA</div>
            </div>
          </motion.div>
        </div>

        {/* Bio Section */}
        <motion.section variants={itemVariants} className="mb-24">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-8 text-center">
              My <span className="text-cyan-600">Journey</span>
            </h3>
            <div 
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed prose dark:prose-invert max-w-none text-center"
              dangerouslySetInnerHTML={{ __html: profileData.bio }}
            />
          </div>
        </motion.section>

        {/* What Drives Me - 3 Cards */}
        <motion.section variants={itemVariants} className="mb-24">
          <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-12 text-center">
            What <span className="text-cyan-600">Drives</span> Me
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 hover:border-cyan-600/30 transition-colors group">
              <div className="w-14 h-14 bg-cyan-600/10 rounded-2xl flex items-center justify-center text-cyan-600 mb-6 group-hover:scale-110 transition-transform">
                <Lightbulb size={28} />
              </div>
              <h4 className="text-xl font-black text-gray-900 dark:text-white mb-3">Innovation First</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I'm passionate about creating solutions that don't just solve problems—they redefine what's possible. From AI-powered tools to clean energy systems, I push boundaries.
              </p>
            </div>

            <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 hover:border-cyan-600/30 transition-colors group">
              <div className="w-14 h-14 bg-cyan-600/10 rounded-2xl flex items-center justify-center text-cyan-600 mb-6 group-hover:scale-110 transition-transform">
                <Target size={28} />
              </div>
              <h4 className="text-xl font-black text-gray-900 dark:text-white mb-3">Purpose-Driven</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Every project I take on has a clear purpose: whether it's advancing clean energy, empowering local businesses, or making complex systems accessible through elegant interfaces.
              </p>
            </div>

            <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 hover:border-cyan-600/30 transition-colors group">
              <div className="w-14 h-14 bg-cyan-600/10 rounded-2xl flex items-center justify-center text-cyan-600 mb-6 group-hover:scale-110 transition-transform">
                <Users size={28} />
              </div>
              <h4 className="text-xl font-black text-gray-900 dark:text-white mb-3">Collaborative Spirit</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                As a Campus Ambassador and research intern, I've learned that the best solutions emerge from diverse teams. I thrive in collaborative environments where ideas flow freely.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Education & Focus Side by Side */}
        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          <motion.section variants={itemVariants}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-cyan-600/10 rounded-xl flex items-center justify-center text-cyan-600">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">Education</h3>
            </div>
            <div className="p-8 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[2rem] relative overflow-hidden group hover:border-cyan-600/30 transition-colors">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:rotate-12 transition-transform">
                <GraduationCap size={100} />
              </div>
              <h4 className="text-xl font-black text-gray-900 dark:text-white mb-3 leading-tight">{profileData.education.degree}</h4>
              <p className="text-gray-600 dark:text-gray-400 font-bold mb-3">{profileData.education.institution}</p>
              <span className="text-xs font-black uppercase tracking-[0.2em] bg-white dark:bg-white/10 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 shadow-sm inline-block mb-4">
                Class of {profileData.education.graduationYear}
              </span>
              {profileData.education.gpa && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 font-medium">{profileData.education.gpa}</p>
              )}
            </div>

            {/* Memberships */}
            {profileData.memberships && profileData.memberships.length > 0 && (
              <div className="mt-8">
                <h4 className="text-sm font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-4">Memberships</h4>
                <div className="flex flex-wrap gap-2">
                  {profileData.memberships.map((membership: string) => (
                    <span key={membership} className="px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300">
                      {membership}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.section>

          <motion.section variants={itemVariants}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-cyan-600/10 rounded-xl flex items-center justify-center text-cyan-600">
                <Briefcase size={24} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">Core Focus</h3>
            </div>
            <div className="space-y-4">
              {[
                { title: 'AI & Machine Learning', desc: 'Building intelligent systems that automate workflows, optimize content, and drive business growth through cutting-edge AI/ML technologies.' },
                { title: 'Clean Energy Systems', desc: 'Advancing renewable energy solutions through research in hydrogen technology, electrochemical analysis, and sustainable infrastructure.' },
                { title: 'Full-Stack Development', desc: 'Creating robust, scalable web applications with React, TypeScript, Node.js, and modern cloud infrastructure.' },
                { title: 'Research & Innovation', desc: 'Conducting impactful research in energy engineering, climate change mitigation, and sustainable technology development.' }
              ].map((focus) => (
                <div key={focus.title} className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl hover:border-cyan-600/30 transition-colors group">
                  <h4 className="text-lg font-black text-gray-900 dark:text-white mb-2 group-hover:text-cyan-600 transition-colors">{focus.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{focus.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Achievements */}
        {profileData.achievements && profileData.achievements.length > 0 && (
          <motion.section variants={itemVariants} className="mb-24">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-cyan-600/10 rounded-xl flex items-center justify-center text-cyan-600">
                <Award size={24} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">Achievements & Honors</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {profileData.achievements.map((achievement: string) => (
                <div key={achievement} className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 border border-cyan-100 dark:border-cyan-900/30 rounded-2xl">
                  <Award className="w-8 h-8 text-cyan-600 mb-3" />
                  <p className="font-bold text-gray-900 dark:text-white leading-relaxed">{achievement}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Languages */}
        {profileData.languages && profileData.languages.length > 0 && (
          <motion.section variants={itemVariants}>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-8 text-center">Languages</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {profileData.languages.map((lang: any) => (
                <div key={lang.name} className="px-6 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl">
                  <span className="font-black text-gray-900 dark:text-white mr-2">{lang.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">({lang.level})</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </motion.div>
    </main>
  );
}
