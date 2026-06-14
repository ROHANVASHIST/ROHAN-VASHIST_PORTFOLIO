import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Expertise', path: '/expertise' },
  { name: 'Research', path: '/research' },
  { name: 'Community', path: '/community' },
  { name: 'Services', path: '/services' },
  { name: 'Blog', path: '/blog' },
  { name: 'Resume', path: '/resume' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const location = useLocation();
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsScrolled(scrollY > 20);
          setIsAtTop(scrollY < 5);
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    // Set initial state
    setIsScrolled(window.scrollY > 20);
    setIsAtTop(window.scrollY < 5);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 px-4 md:px-8 pt-4 md:pt-6 pointer-events-none`}
    >
      <nav className={`
        mx-auto max-w-6xl w-full pointer-events-auto
        transition-all duration-500 ease-out
        gpu
        ${isScrolled 
          ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl py-2 px-3 md:py-3 md:px-6 rounded-[2rem] shadow-2xl shadow-black/5 border border-white/20 dark:border-white/5' 
          : 'bg-transparent py-4 px-2 rounded-none shadow-none border-transparent'
        }
        flex items-center justify-between
      `}>
        <div className="flex items-center gap-12">
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-cyan-600/20 group-hover:rotate-6 transition-transform duration-300">
              RV
            </div>
            <span className={`hidden sm:block font-black text-xl tracking-tight transition-colors duration-300 ${
              isScrolled 
                ? 'text-gray-900 dark:text-white' 
                : isAtTop 
                  ? 'text-white' 
                  : 'text-gray-900 dark:text-white'
            }`}>
              Rohan Vashist
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path}
                  className={`
                    relative px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200
                    ${location.pathname === link.path 
                      ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-50/50 dark:bg-cyan-900/20' 
                      : `hover:bg-gray-100 dark:hover:bg-white/5 ${isScrolled ? 'text-gray-600 dark:text-gray-400' : isAtTop ? 'text-gray-200' : 'text-gray-600 dark:text-gray-400'}`
                    }
                  `}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-cyan-50/50 dark:bg-cyan-900/20 rounded-xl -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`
              lg:hidden p-2 rounded-2xl transition-all duration-200
              ${isScrolled 
                ? 'bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white' 
                : 'bg-white/10 backdrop-blur-md text-white border border-white/20'
              }
            `}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link to="/contact" className="hidden sm:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                px-6 py-2.5 rounded-2xl font-bold text-sm shadow-xl transition-all duration-200
                bg-cyan-600 text-white shadow-cyan-600/20 hover:bg-cyan-500
              "
            >
              Let's Talk
            </motion.button>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-4 right-4 mt-4 bg-white/95 dark:bg-gray-950/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-white/5 p-6 md:p-8 lg:hidden pointer-events-auto max-h-[calc(100vh-140px)] overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className={`
                      flex items-center justify-between p-4 rounded-3xl transition-all duration-200
                      ${location.pathname === link.path 
                        ? 'bg-cyan-600 text-white shadow-xl shadow-cyan-600/20' 
                        : 'bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
                      }
                    `}
                  >
                    <span className="font-bold text-lg">{link.name}</span>
                    <ChevronRight size={20} className={location.pathname === link.path ? 'opacity-100' : 'opacity-30'} />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}