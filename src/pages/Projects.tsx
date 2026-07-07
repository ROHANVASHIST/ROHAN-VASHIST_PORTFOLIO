import { useState, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Filter, Search, Calendar, ExternalLink, Github, Tag } from 'lucide-react';
import defaultProjectsData from '../data/projects.json';
import { useData, useDataWithLoading } from '../lib/useData';
import ExpandableDescription from '../components/ExpandableDescription';

export default function Projects() {
  const navigate = useNavigate();
  const { data: projectsData, loading: projectsLoading } = useDataWithLoading('projects', defaultProjectsData);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const allTechnologies = useMemo(() => {
    const techs = new Set<string>();
    projectsData.projects.forEach(project => {
      project.technologies.forEach(tech => techs.add(tech));
    });
    return Array.from(techs).sort();
  }, [projectsData]);

  const filteredProjects = useMemo(() => {
    return projectsData.projects.filter(project => {
      const matchesTech = !selectedTech || project.technologies.includes(selectedTech);
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           project.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTech && matchesSearch;
    });
  }, [selectedTech, searchQuery, projectsData]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400';
      case 'In Development': return 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400';
      case 'In Progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <main className="max-w-7xl mx-auto py-20 px-6">
      {/* Header */}
      <div className="mb-16">
        <h1 className="text-sm font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-[0.3em] mb-4">Portfolio</h1>
        <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white leading-[0.95] mb-6">
          Featured <span className="text-gray-400">Projects</span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
          A collection of AI-powered tools, research projects, and full-stack applications that showcase my expertise in bridging engineering and software development.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between py-8 border-y border-gray-100 dark:border-gray-800 mb-16">
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-2 mr-4 text-xs font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest">
            <Filter size={14} /> Filter:
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

      {/* Projects Grid */}
      <motion.div 
        layout
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {projectsLoading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div 
                key={`skeleton-${idx}`}
                className="bg-gray-50 dark:bg-gray-900 rounded-[2rem] overflow-hidden animate-pulse flex flex-col h-full border border-gray-100 dark:border-gray-800"
              >
                <div className="aspect-[16/10] bg-gray-200/60 dark:bg-gray-800/50 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-xl bg-gray-300 dark:bg-gray-700/60 opacity-20 animate-pulse" />
                </div>
                <div className="p-8 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="h-7 bg-gray-200 dark:bg-gray-800/85 rounded-xl w-3/4" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200/80 dark:bg-gray-800/70 rounded-lg w-full" />
                      <div className="h-4 bg-gray-200/80 dark:bg-gray-800/70 rounded-lg w-5/6" />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800/60 rounded-lg" />
                    <div className="h-6 w-20 bg-gray-200 dark:bg-gray-800/60 rounded-lg" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            filteredProjects.map((project: any, idx: number) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group"
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/projects/${project.id}`)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(`/projects/${project.id}`); }}
                  className="block h-full cursor-pointer"
                >
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl shadow-smooth h-full flex flex-col transition-all duration-500">
                    {/* Project Image */}
                    <div className="aspect-[16/10] bg-gray-100 dark:bg-gray-800 overflow-hidden relative">
                      <img 
                        src={project.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80'} 
                        alt={project.title}
                        className="w-full h-full object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-110 gpu"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Status Badge */}
                      {project.status && (
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Project Content */}
                    <div className="p-8 flex-grow flex flex-col">
                      <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-tight">
                        {project.title}
                      </h3>
                      
                      <ExpandableDescription content={project.description} className="text-gray-600 dark:text-gray-400 mb-6 flex-grow" />

                      {/* Key Features */}
                      {project.keyFeatures && project.keyFeatures.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-xs font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-3">Key Features</h4>
                          <ul className="space-y-2">
                            {project.keyFeatures.slice(0, 3).map((feature: string, i: number) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <span className="text-cyan-600 mt-1">•</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.slice(0, 4).map((tech: string) => (
                          <span key={tech} className="px-3 py-1 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                            <Tag size={10} />
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                        {project.github && (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github size={16} />
                            Code
                          </a>
                        )}
                        {project.demo && (
                          <a 
                            href={project.demo} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink size={16} />
                            Live Demo
                          </a>
                        )}
                        <div className="flex-grow" />
                        <span className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white group-hover:gap-3 transition-all">
                          Details <ArrowRight size={16} className="text-cyan-600" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
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
