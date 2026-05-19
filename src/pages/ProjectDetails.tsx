import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import projectsData from '../data/projects.json';

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const project = projectsData.projects.find((p: any) => p.id.toString() === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return <p className="p-20 text-center">Project not found</p>;

  const images = project.images && project.images.length > 0 ? project.images : [project.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <main className="max-w-4xl mx-auto py-20 px-6">
      <Link to="/projects" className="inline-flex items-center text-cyan-600 hover:text-cyan-700 mb-8 font-medium transition-colors">
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to projects
      </Link>

      <h1 className="text-4xl font-bold mb-8 text-gray-900">{project.title}</h1>

      {/* Image Gallery */}
      <div className="relative group mb-12">
        <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-xl bg-gray-100 relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={`${project.title} - ${currentImageIndex + 1}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentImageIndex ? 'bg-cyan-600 w-4' : 'bg-white/60'
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        
        {images.length > 1 && (
          <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
            {images.map((img: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`flex-shrink-0 w-24 aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                  idx === currentImageIndex ? 'border-cyan-600 ring-2 ring-cyan-100' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b pb-2">Overview</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{project.description}</p>
          </section>

          <div className="grid sm:grid-cols-2 gap-8">
            <section>
              <h2 className="text-xl font-bold mb-4 text-gray-900">The Problem</h2>
              <p className="text-gray-600 leading-relaxed">{project.problem}</p>
            </section>
            <section>
              <h2 className="text-xl font-bold mb-4 text-gray-900">The Solution</h2>
              <p className="text-gray-600 leading-relaxed">{project.solution}</p>
            </section>
          </div>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b pb-2">Key Features</h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {project.keyFeatures.map((feature: string) => (
                <li key={feature} className="flex items-start">
                  <span className="text-cyan-600 mr-2 mt-1">•</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b pb-2">Learnings & Growth</h2>
            <p className="text-gray-700 leading-relaxed italic border-l-4 border-cyan-500 pl-4 py-2 bg-gray-50 rounded-r-lg">
              {project.learnings}
            </p>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h2 className="text-lg font-bold mb-4 text-gray-900">Links</h2>
            <div className="flex flex-col gap-3">
              {project.demo && (
                <a 
                  href={project.demo} 
                  className="w-full px-6 py-3 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 font-semibold transition-all text-center shadow-md hover:shadow-lg active:scale-[0.98]" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Live Demo
                </a>
              )}
              {project.github && (
                <a 
                  href={project.github} 
                  className="w-full px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-black font-semibold transition-all text-center" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Source Code
                </a>
              )}
            </div>
          </section>

          <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h2 className="text-lg font-bold mb-4 text-gray-900">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string) => (
                <span key={tech} className="bg-white text-gray-700 border border-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h2 className="text-lg font-bold mb-2 text-gray-900">Project Status</h2>
            <div className="flex items-center">
              <span className={`w-2 h-2 rounded-full mr-2 ${project.status === 'Completed' ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`} />
              <p className="text-gray-700 font-medium">{project.status}</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
