import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="sticky top-0 bg-white shadow-sm z-50">
      <nav className="flex justify-between items-center p-4 max-w-6xl mx-auto">
        <Link to="/" className="text-2xl font-bold text-gray-800">RV</Link>
        <ul className="flex gap-6 text-gray-600">
          <li><Link to="/about" className="hover:text-cyan-600">About</Link></li>
          <li><Link to="/projects" className="hover:text-cyan-600">Projects</Link></li>
          <li><Link to="/expertise" className="hover:text-cyan-600">Expertise</Link></li>
          <li><Link to="/contact" className="hover:text-cyan-600">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
