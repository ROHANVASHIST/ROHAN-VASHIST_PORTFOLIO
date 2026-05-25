import { motion } from 'framer-motion';
import { User, ShieldUser } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Entry() {
  const navigate = useNavigate();

  const handleSelect = (type: 'viewer' | 'admin') => {
    sessionStorage.setItem('userType', type);
    if (type === 'admin') {
      navigate('/admin/login');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-6">
      <div className="max-w-xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Welcome to Rohan's Portfolio</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Please select how you would like to proceed.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect('viewer')}
            className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md hover:border-cyan-500/30 transition-all group"
          >
            <div className="w-16 h-16 bg-cyan-50 dark:bg-cyan-950/30 rounded-full flex items-center justify-center mb-4 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-900/50 transition-colors">
              <User className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">I am a Viewer</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Explore Rohan's projects, expertise, and insights.
            </p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect('admin')}
            className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md hover:border-purple-500/30 transition-all group"
          >
            <div className="w-16 h-16 bg-purple-50 dark:bg-purple-950/30 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50 transition-colors">
              <ShieldUser className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">I am the Admin</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Login to edit the portfolio and manage content.
            </p>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
