import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Filter, Search } from 'lucide-react';
import projectsData from '../data/projects.json';

export default function Projects() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const allTechnologies = useMemo(() => {
    const techs = new Set<string>();
    projectsData.projects.forEach(project => {
      project.technologies.forEach(tech => techs.add(tech));
    });
    return Array.from(techs).sort();
  }, []);

  const filteredProjects = useMemo(() => {
    return projectsData.projects.filter(project => {
      const matchesTech = !selectedTech || project.technologies.includes(selectedTech);
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           project.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTech && matchesSearch;
    });
  }, [selectedTech, searchQuery]);

  return (
    <main className="max-w-6xl mx-auto py-32 px-6">
      <div className="mb-20">
        <h1 className="text-sm font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-[0.3em] mb-4">Portfolio</h1>
        <h2 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white leading-[0.9] mb-12">
          Case Studies & <br /> <span className="text-gray-400">Technical Work.</span>
        </h2>

        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between py-8 border-y border-gray-100 dark:border-gray-800">
          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center gap-2 mr-4 text-xs font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest">
              <Filter size={14} /> Category:
            </div>
            <button
              onClick={() => setSelectedTech(null)}
              className={`px-6 py-2 rounded-xl text-xs font-black tracking-widest transition-all ${
                selectedTech === null 
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-xl' 
                  : 'bg-gray-50 text-gray-400 dark:bg-white/5 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              ALL
            </button>
            {allTechnologies.map(tech => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-6 py-2 rounded-xl text-xs font-black tracking-widest transition-all ${
                  selectedTech === tech 
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-xl' 
                    : 'bg-gray-50 text-gray-400 dark:bg-white/5 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                }`}
              >
                {tech.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-cyan-600 dark:focus:border-cyan-400 rounded-2xl outline-none text-sm font-bold transition-all text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      <motion.div 
        layout
        className="grid md:grid-cols-2 lg:grid-cols-2 gap-12"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project: any, idx: number) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group"
            >
              <Link to={`/projects/${project.id}`}>
                <div className="aspect-[16/10] bg-gray-100 dark:bg-gray-900 rounded-[3rem] overflow-hidden mb-8 shadow-sm transition-all duration-500 ease-out group-hover:shadow-[0_25px_50px_-12px_rgba(6,182,212,0.18)] dark:group-hover:shadow-[0_25px_50px_-12px_rgba(6,182,212,0.25)] group-hover:-translate-y-2.5 relative">
                  <motion.img 
                    src={project.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80'} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                  />
                  {/* Subtle color overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/20 via-cyan-950/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
                <div className="px-4 transition-all duration-500 ease-out group-hover:scale-[0.985] group-hover:opacity-95 origin-top">
                  <div className="flex flex-wrap gap-1.5 mb-4 max-w-full">
                    {project.technologies.slice(0, 5).map((tech: string) => (
                      <span 
                        key={tech} 
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-cyan-50/80 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 border border-cyan-100/80 dark:border-cyan-900/30 truncate max-w-[140px] transition-colors"
                        title={tech}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 text-lg leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white group-hover:gap-4 transition-all">
                    View Case Study <ArrowRight size={16} className="text-cyan-600" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-40 bg-gray-50 dark:bg-white/5 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-gray-800">
          <p className="text-gray-400 text-xl font-bold">No projects matched your criteria.</p>
          <button 
            onClick={() => { setSelectedTech(null); setSearchQuery(''); }}
            className="mt-6 text-cyan-600 font-black uppercase tracking-widest hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </main>
  );
}
