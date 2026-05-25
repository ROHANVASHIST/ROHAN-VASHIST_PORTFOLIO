import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { getBlogPosts, BlogPost } from '../lib/blogStore';

export default function BlogDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const posts = getBlogPosts();
    const found = posts.find((p) => p.id === id);
    if (found) {
      setPost(found);
    } else {
      // Post not found
      setPost(null);
    }
  }, [id]);

  if (!post) {
    return (
      <main className="max-w-4xl mx-auto py-32 px-6 text-center">
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Article Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          The publication you are looking for might have been removed or does not exist.
        </p>
        <Link 
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold transition-all active:scale-95 hover:bg-black dark:hover:bg-gray-100"
        >
          <ArrowLeft size={16} /> Back to Insights
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto py-32 px-6">
      {/* Back navigation */}
      <Link 
        to="/blog" 
        className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold mb-10 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
        Back to Insights
      </Link>

      <article>
        {/* Header information */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-xs font-black uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" />
              {post.category}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700" />
            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700" />
            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
              <Calendar className="w-4 h-4" />
              {post.date}
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tight mb-8">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-semibold italic border-l-4 border-cyan-500 pl-6 my-6">
            {post.excerpt}
          </p>
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="w-full aspect-[16/9] rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/10 shadow-xl mb-12 bg-gray-100 dark:bg-gray-900">
            <img 
              src={post.image} 
              alt={post.title} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Markdown Content Section */}
        <div className="markdown-body prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed space-y-6 text-lg">
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className="text-3xl font-black text-gray-900 dark:text-white mt-12 mb-4">{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl font-black text-gray-900 dark:text-white mt-8 mb-4">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-2">{children}</h3>,
              p: ({ children }) => <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">{children}</ol>,
              li: ({ children }) => <li className="pl-1 leading-relaxed">{children}</li>,
              code: ({ children }) => (
                <code className="bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded font-mono text-sm text-cyan-600 dark:text-cyan-400">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-gray-900 text-gray-100 p-6 rounded-2xl font-mono text-sm overflow-x-auto my-6 border border-white/5">
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-cyan-600 bg-gray-50 dark:bg-white/5 pl-6 py-4 pr-4 rounded-r-2xl italic my-6">
                  {children}
                </blockquote>
              )
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* Sharing footer */}
      <section className="mt-20 pt-10 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div>
          <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Written By</h4>
          <p className="font-bold text-gray-900 dark:text-white text-lg">Rohan Vashist</p>
        </div>
        <Link 
          to="/blog"
          className="px-6 py-3 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-800 dark:text-white font-bold rounded-2xl transition-all"
        >
          All Publications
        </Link>
      </section>
    </main>
  );
}
