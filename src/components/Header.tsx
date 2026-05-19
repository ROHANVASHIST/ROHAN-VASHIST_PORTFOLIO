import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="sticky top-0 bg-white dark:bg-gray-900 shadow-sm z-50 border-b border-gray-100 dark:border-gray-800 transition-colors">
      <nav className="flex justify-between items-center p-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">RV</Link>
          <ul className="hidden md:flex gap-6 text-gray-600 dark:text-gray-400 font-medium">
            <li><Link to="/about" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">About</Link></li>
            <li><Link to="/projects" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Projects</Link></li>
            <li><Link to="/expertise" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Expertise</Link></li>
            <li><Link to="/services" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Services</Link></li>
            <li><Link to="/blog" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Blog</Link></li>
            <li><Link to="/resume" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Resume</Link></li>
            <li><Link to="/contact" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button className="md:hidden p-2 text-gray-600 dark:text-gray-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
