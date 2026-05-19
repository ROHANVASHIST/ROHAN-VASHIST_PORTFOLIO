import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import projectsData from '../data/projects.json';

export default function Projects() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const allTechnologies = useMemo(() => {
    const techs = new Set<string>();
    projectsData.projects.forEach(project => {
      project.technologies.forEach(tech => techs.add(tech));
    });
    return Array.from(techs).sort();
  }, []);

  const filteredProjects = useMemo(() => {
    if (!selectedTech) return projectsData.projects;
    return projectsData.projects.filter(project => 
      project.technologies.includes(selectedTech)
    );
  }, [selectedTech]);

  return (
    <main className="max-w-6xl mx-auto py-20 px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <h1 className="text-4xl font-bold text-gray-800">Projects & Work</h1>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTech(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedTech === null 
                ? 'bg-cyan-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {allTechnologies.map(tech => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTech === tech 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        layout
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project: any) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                scale: 1.02,
                y: -4,
                transition: { duration: 0.2, ease: "easeOut" } 
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow p-6 flex flex-col h-full cursor-pointer"
            >
              <h3 className="text-2xl font-bold mb-2 text-gray-800">{project.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech: string) => (
                  <span key={tech} className="bg-cyan-50 text-cyan-700 px-2.5 py-0.5 rounded-md text-xs font-medium border border-cyan-100">
                    {tech}
                  </span>
                ))}
              </div>
              
              <Link 
                to={`/projects/${project.id}`} 
                className="inline-flex items-center text-cyan-600 hover:text-cyan-700 font-semibold transition-colors"
              >
                View Details
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No projects found for the selected technology.</p>
        </div>
      )}
    </main>
  );
}
