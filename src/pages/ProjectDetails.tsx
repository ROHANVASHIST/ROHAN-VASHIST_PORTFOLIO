import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import projectsData from "../data/projects.json";

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const project = projectsData.projects.find(
    (p: any) => p.id.toString() === id,
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  if (!project) return <p className="p-20 text-center">Project not found</p>;

  const images =
    project.images && project.images.length > 0
      ? project.images
      : [project.image];

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <main className="max-w-4xl mx-auto py-20 px-6">
      <Link
        to="/projects"
        className="inline-flex items-center text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 mb-8 font-medium transition-colors"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to projects
      </Link>

      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        {project.title}
      </h1>

      {/* Image Gallery */}
      <div className="relative group mb-12">
        <div
          className="aspect-video w-full overflow-hidden rounded-2xl shadow-xl bg-gray-100 dark:bg-gray-900 relative cursor-pointer"
          onClick={() => setFullscreenImage(images[currentImageIndex])}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={`${project.title} - ${currentImageIndex + 1}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full h-full object-contain"
            />
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-gray-800 dark:text-gray-200 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-900"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-gray-800 dark:text-gray-200 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-900"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentImageIndex
                        ? "bg-cyan-600 w-4"
                        : "bg-white/60 dark:bg-white/30"
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
                className={`flex-shrink-0 w-24 aspect-video rounded-lg overflow-hidden border-2 transition-all bg-gray-100 dark:bg-gray-900 ${
                  idx === currentImageIndex
                    ? "border-cyan-600 ring-2 ring-cyan-100 dark:ring-cyan-900/20"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-12 backdrop-blur-md cursor-zoom-out"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setFullscreenImage(null);
            }}
          >
            <X size={24} />
          </button>
          <img
            src={fullscreenImage}
            alt="Fullscreen view"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white border-b dark:border-gray-800 pb-2">
              Overview
            </h2>
            <div 
              className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          </section>

          <div className="grid sm:grid-cols-2 gap-8">
            <section>
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                The Problem
              </h2>
              <div 
                className="text-gray-600 dark:text-gray-400 leading-relaxed prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: project.problem }}
              />
            </section>
            <section>
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                The Solution
              </h2>
              <div 
                className="text-gray-600 dark:text-gray-400 leading-relaxed prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: project.solution }}
              />
            </section>
          </div>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white border-b dark:border-gray-800 pb-2">
              Key Features
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {project.keyFeatures.map((feature: string) => (
                <li key={feature} className="flex items-start">
                  <span className="text-cyan-600 dark:text-cyan-400 mr-2 mt-1">
                    •
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white border-b dark:border-gray-800 pb-2">
              Learnings & Growth
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic border-l-4 border-cyan-500 pl-4 py-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              {project.learnings}
            </p>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              Links
            </h2>
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
                  className="w-full px-6 py-3 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-xl hover:bg-black dark:hover:bg-gray-200 font-semibold transition-all text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source Code
                </a>
              )}
            </div>
          </section>

          <section className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              Technologies
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
            <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
              Project Status
            </h2>
            <div className="flex items-center">
              <span
                className={`w-2 h-2 rounded-full mr-2 ${project.status === "Completed" ? "bg-green-500" : "bg-amber-500 animate-pulse"}`}
              />
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                {project.status}
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
