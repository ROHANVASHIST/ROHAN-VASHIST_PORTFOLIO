import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../lib/auth';
import { LayoutDashboard, LogOut, Save, FileJson, AlertCircle, Sparkles } from 'lucide-react';
import JsonFormEditor from '../components/JsonFormEditor';
import AdminAiCopilot from '../components/AdminAiCopilot';

const DATA_TYPES = ['profile', 'projects', 'resume', 'services', 'skills', 'messages', 'subscribers'];

function DataEditor({ type }: { type: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetch(`/api/data/${type}`)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => setError('Failed to load data'))
      .finally(() => setLoading(false));
  }, [type]);

  const handleSave = async () => {
    setError('');
    setSuccess('');
    setSaving(true);
    try {
      const res = await fetch(`/api/data/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to save');
      setSuccess('Saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (e: any) {
      setError(e.message || 'Error saving data');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-4 text-gray-500">Loading {type}...</div>;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-black text-gray-900 dark:text-white capitalize flex items-center gap-2">
          <FileJson size={18} className="text-cyan-500" /> {type} Data
        </h3>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all"
        >
          <Save size={14} /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm flex items-center gap-2">
          <AlertCircle size={16} /> {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-sm flex items-center gap-2">
          <AlertCircle size={16} /> {success}
        </div>
      )}

      {data && (
        <JsonFormEditor data={data} onChange={setData} />
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'content' | 'inbox' | 'subscribers' | 'copilot'>('content');

  const CONTENT_TYPES = ['profile', 'projects', 'resume', 'services', 'skills'];

  return (
    <main className="max-w-4xl mx-auto py-32 px-6">
      {/* Admin Panel Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-gray-100 dark:border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-[1.25rem] flex items-center justify-center shadow-xl">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-[0.3em]">System Admin Console</span>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mt-1 leading-none">Content Manager</h1>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button 
            onClick={async () => { await logout(); navigate('/admin/login'); }}
            className="inline-flex items-center gap-2 px-5 py-3.5 bg-gray-100 dark:bg-white/5 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 text-gray-700 dark:text-gray-300 font-bold rounded-2xl text-xs uppercase tracking-widest transition-all cursor-pointer"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-100 dark:border-white/5 pb-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2 font-bold rounded-lg whitespace-nowrap transition-colors ${activeTab === 'content' ? 'bg-cyan-600 text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'}`}
        >
          Site Content
        </button>
        <button
          onClick={() => setActiveTab('copilot')}
          className={`px-4 py-2 font-bold rounded-lg whitespace-nowrap flex items-center gap-1.5 transition-colors ${activeTab === 'copilot' ? 'bg-cyan-600 text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'}`}
        >
          <Sparkles size={14} className={activeTab === 'copilot' ? 'text-white' : 'text-cyan-500'} /> Admin AI Copilot
        </button>
        <button
          onClick={() => setActiveTab('inbox')}
          className={`px-4 py-2 font-bold rounded-lg whitespace-nowrap transition-colors ${activeTab === 'inbox' ? 'bg-cyan-600 text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'}`}
        >
          Inbox (Messages)
        </button>
        <button
          onClick={() => setActiveTab('subscribers')}
          className={`px-4 py-2 font-bold rounded-lg whitespace-nowrap transition-colors ${activeTab === 'subscribers' ? 'bg-cyan-600 text-white' : 'bg-gray-150 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'}`}
        >
          Subscribers
        </button>
      </div>

      {/* Editor Sections */}
      <section className="space-y-2">
        {activeTab === 'content' && (
          <>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
              Modify the raw JSON configuration below to update your portfolio sections in real-time. Make sure to adhere to the existing structure.
            </p>
            {CONTENT_TYPES.map(type => (
              <DataEditor key={type} type={type} />
            ))}
          </>
        )}

        {activeTab === 'copilot' && (
          <AdminAiCopilot />
        )}
        
        {activeTab === 'inbox' && (
          <DataEditor type="messages" />
        )}
        
        {activeTab === 'subscribers' && (
          <DataEditor type="subscribers" />
        )}
      </section>
    </main>
  );
}
