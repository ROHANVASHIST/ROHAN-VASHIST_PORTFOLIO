import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initAuth, signInWithProvider } from '../lib/auth';
import { isSupabaseConfigured } from '../lib/supabase';


export default function AdminLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const unsubscribe = initAuth(
      () => navigate('/admin/dashboard'),
      () => setLoading(false)
    );
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [navigate]);

  const handleLogin = async () => {
    if (!isSupabaseConfigured) {
      setError('Cannot authenticate: Supabase is not configured. Config variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) are missing.');
      return;
    }
    try {
      await signInWithProvider();
    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err?.message || 'Authentication failed. Please check your network connection.');
    }
  };

  if (loading && isSupabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 font-sans text-gray-500">
        Authenticating session...
      </div>
    );
  }

  return (
    <main className="max-w-lg mx-auto py-24 px-6 font-sans">
      <div className="bg-white dark:bg-gray-901 border border-gray-100 dark:border-white/5 rounded-3xl p-8 shadow-xl">
        <h1 className="text-3xl font-black mb-2 text-gray-900 dark:text-white">Admin Access Portal</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 border-b dark:border-gray-800 pb-4">
          Authenticate using authorized Google Administrator credentials to manage portfolio contents.
        </p>

        {error && (
          <div className="p-4 mb-6 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border border-red-100 dark:border-red-900/30 rounded-2xl text-xs font-medium leading-relaxed">
            {error}
          </div>
        )}

        {!isSupabaseConfigured ? (
          <div className="p-5 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-2xl space-y-3">
            <h3 className="font-bold text-amber-800 dark:text-amber-400 text-sm flex items-center gap-2">
              Authentication Config Missing
            </h3>
            <p className="text-xs text-amber-700 dark:text-amber-300/80 leading-relaxed">
              Google OAuth authentication requires a Supabase project connection. Please set up and configure the following environment variables in your environment secrets:
            </p>
            <div className="bg-white/55 dark:bg-black/20 p-3 rounded-xl border border-amber-200/50 dark:border-amber-900/20 font-mono text-[11px] text-amber-900 dark:text-amber-200 space-y-1">
              <div>VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL</div>
              <div>VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY</div>
            </div>
            <p className="text-[10px] text-amber-600 dark:text-amber-400">
              The public portfolio sections are fully operational and loaded directly from static local data schemas. You only need to configure Supabase to edit or sign in.
            </p>
          </div>
        ) : (
          <button 
            onClick={handleLogin} 
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-cyan-600/20 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer text-sm"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </main>
  );
}

