import { Link } from 'react-router-dom';
import projectsData from '../data/projects.json';

export default function Projects() {
  return (
    <main className="max-w-6xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">Projects & Work</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {projectsData.projects.map((project: any) => (
          <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition p-6">
            <h3 className="text-2xl font-bold mb-2 text-gray-800">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech: string) => (
                <span key={tech} className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
            
            <Link to={`/projects/${project.id}`} className="text-cyan-600 hover:underline font-semibold block mt-4">
              View Details &rarr;
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
