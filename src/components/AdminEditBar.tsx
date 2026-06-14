import { motion, AnimatePresence } from 'motion/react';
import { Edit3, Eye, LogOut, Save, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAdmin } from '../lib/AdminContext';
import { logout } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface AdminEditBarProps {
  pageData?: {
    type: string;
    data: any;
  };
}

export default function AdminEditBar({ pageData }: AdminEditBarProps) {
  const navigate = useNavigate();
  const { isAdmin, editMode, setEditMode } = useAdmin();
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  if (!isAdmin) return null;

  const handleSave = async () => {
    if (!pageData) return;
    setSaving(true);
    setSaveStatus('saving');
    
    try {
      const response = await fetch(`/api/data/${pageData.type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageData.data),
      });
      
      if (!response.ok) throw new Error('Failed to save');
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (err) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-[200] bg-gray-900 dark:bg-black border-b border-cyan-600/30 backdrop-blur-xl"
      >
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Admin Mode</span>
            <span className="w-px h-4 bg-white/10" />
            <button
              onClick={() => setEditMode(!editMode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                editMode 
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30' 
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {editMode ? (
                <><Eye size={14} /> View Mode</>
              ) : (
                <><Edit3 size={14} /> Edit In Place</>
              )}
            </button>
          </div>

          <div className="flex items-center gap-3">
            {editMode && pageData && (
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all disabled:opacity-50"
              >
                {saveStatus === 'saving' ? (
                  <><RefreshCw size={14} className="animate-spin" /> Saving...</>
                ) : saveStatus === 'success' ? (
                  <><CheckCircle2 size={14} /> Saved!</>
                ) : saveStatus === 'error' ? (
                  <><AlertCircle size={14} /> Error</>
                ) : (
                  <><Save size={14} /> Save Changes</>
                )}
              </button>
            )}
            
            {editMode && (
              <a 
                href="/admin/dashboard"
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Dashboard
              </a>
            )}
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}