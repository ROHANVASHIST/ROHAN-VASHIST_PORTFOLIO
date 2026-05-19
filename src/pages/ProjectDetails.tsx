import { useParams, Link } from 'react-router-dom';
import projectsData from '../data/projects.json';

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const project = projectsData.projects.find((p: any) => p.id.toString() === id);

  if (!project) return <p className="p-20 text-center">Project not found</p>;

  return (
    <main className="max-w-4xl mx-auto py-20 px-6">
      <Link to="/projects" className="text-cyan-600 hover:underline mb-6 block">&larr; Back to projects</Link>
      <h1 className="text-4xl font-bold mb-6 text-gray-800">{project.title}</h1>
      <img src={project.image} alt={project.title} className="w-full rounded-lg shadow-md mb-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Overview</h2>
        <p className="text-gray-700 leading-relaxed">{project.description}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Key Features</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          {project.keyFeatures.map((feature: string) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Learnings</h2>
        <p className="text-gray-700 leading-relaxed">{project.learnings}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Status</h2>
        <p className="text-gray-700 bg-gray-100 p-3 rounded-lg inline-block">{project.status}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Technologies</h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech: string) => (
            <span key={tech} className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-semibold">
              {tech}
            </span>
          ))}
        </div>
      </section>
      
      <div className="flex gap-4 mt-8">
        {project.github && (
          <a href={project.github} className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 font-semibold" target="_blank" rel="noopener noreferrer">View GitHub</a>
        )}
        {project.demo && (
          <a href={project.demo} className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 font-semibold" target="_blank" rel="noopener noreferrer">Live Demo</a>
        )}
      </div>
    </main>
  );
}
