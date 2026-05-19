import { motion } from 'motion/react';
import profileData from '../data/profile.json';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="max-w-4xl mx-auto py-20 px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-4xl font-bold mb-6 text-gray-900 dark:text-white"
        >
          About Me
        </motion.h1>
        
        <motion.section 
          variants={itemVariants}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Professional Summary</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{profileData.bio}</p>
        </motion.section>

        <motion.section 
          variants={itemVariants}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Education</h2>
          <div className="border-l-4 border-cyan-600 pl-4 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-r-2xl">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{profileData.education.degree}</h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">{profileData.education.institution}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2 font-bold">{profileData.education.graduationYear}</p>
          </div>
        </motion.section>
        
        <motion.div variants={itemVariants}>
          <a href="/resume.pdf" download className="mt-8 px-8 py-4 bg-cyan-600 text-white rounded-xl font-bold hover:bg-cyan-700 inline-flex items-center transition-all shadow-lg active:scale-95">
            Download Resume
          </a>
        </motion.div>
      </motion.div>
    </main>
  );
}
