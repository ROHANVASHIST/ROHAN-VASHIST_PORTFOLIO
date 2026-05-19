import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 py-16 transition-colors">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Rohan Vashist</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm leading-relaxed mb-6">
              Full-stack engineer specializing in building precision-driven digital solutions for engineering and sustainability.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/rohan" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/rohan" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com/rohan" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <Twitter size={20} />
              </a>
              <a href="mailto:rohanvashist01@gmail.com" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">About</Link></li>
              <li><Link to="/projects" className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Projects</Link></li>
              <li><Link to="/services" className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Services</Link></li>
              <li><Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">FAQ</Link></li>
              <li><Link to="/admin/login" className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Admin Area</Link></li>
              <li><a href="/resume" className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Download CV</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-500">
          <p>&copy; {currentYear} Rohan Vashist. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Built with React & Precision Engineering</p>
        </div>
      </div>
    </footer>
  );
}
