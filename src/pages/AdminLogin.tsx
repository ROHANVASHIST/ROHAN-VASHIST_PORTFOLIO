import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { initAuth, signInWithProvider, signInWithEmail, signUp } from '../lib/auth';
import { isSupabaseConfigured } from '../lib/supabase';
import { Mail, Lock, Loader2, UserPlus, LogIn } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState<string | null>(null);
  const [isSignup, setIsSignup] = useState(false);
  
  // Email/password form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

  const handleGoogleLogin = async () => {
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

  const handleEmailAuth = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    
    if (!email.trim() || password.length < 6) {
      setError('Please enter a valid email and password (min 6 characters).');
      return;
    }

    setSubmitting(true);
    try {
      if (isSignup) {
        await signUp(email, password);
        setSuccessMessage('Registration successful! Check your email for a confirmation link. You can close this message and sign in after confirming.');
        setEmail('');
        setPassword('');
        setIsSignup(false);
      } else {
        await signInWithEmail(email, password);
        navigate('/admin/dashboard');
      }
    } catch (err: any) {
      console.error('Auth failed:', err);
      if (err?.message?.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please try again.');
      } else if (err?.message?.includes('Email not confirmed')) {
        setError('Please confirm your email address. Check your inbox for the confirmation link.');
      } else if (err?.message?.includes('User already registered')) {
        setError('An account with this email already exists. Please sign in instead.');
      } else {
        setError(err?.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setSubmitting(false);
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
    <main className="min-h-screen max-w-lg mx-auto py-24 px-6 font-sans bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-901 border border-gray-100 dark:border-white/5 rounded-3xl p-8 shadow-xl">
        <h1 className="text-3xl font-black mb-2 text-gray-900 dark:text-white">Admin Access Portal</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 border-b dark:border-gray-800 pb-4">
          {isSignup 
            ? 'Create an admin account to manage portfolio contents.' 
            : 'Sign in to manage portfolio contents.'}
        </p>

        {error && (
          <div className="p-4 mb-6 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border border-red-100 dark:border-red-900/30 rounded-2xl text-xs font-medium leading-relaxed">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="p-4 mb-6 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl text-xs font-medium leading-relaxed">
            {successMessage}
          </div>
        )}

        {!isSupabaseConfigured ? (
          <div className="p-5 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-2xl space-y-3">
            <h3 className="font-bold text-amber-800 dark:text-amber-400 text-sm flex items-center gap-2">
              Authentication Config Missing
            </h3>
            <p className="text-xs text-amber-700 dark:text-amber-300/80 leading-relaxed">
              Authentication requires a Supabase project connection. Please set up and configure the following environment variables:
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
          <div className="space-y-6">
            {/* Email/Password Form */}
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="•••••••• (min 6 characters)"
                    minLength={6}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold py-3.5 px-6 rounded-2xl shadow-lg transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer"
              >
                {submitting ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : isSignup ? (
                  <UserPlus size={18} />
                ) : (
                  <LogIn size={18} />
                )}
                {isSignup ? 'Create Account' : 'Sign In with Email'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Or continue with</span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            </div>

            {/* Google Sign In */}
            <button 
              onClick={handleGoogleLogin} 
              className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white font-bold py-3.5 px-6 rounded-2xl shadow-sm transition-all hover:scale-[1.01] active:scale-95 cursor-pointer text-sm"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.339 L -10.684 60.309 L -6.824 60.309 C -4.564 58.039 -3.264 54.979 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.309 L -10.684 57.339 C -11.764 58.089 -13.134 58.579 -14.754 58.579 C -17.884 58.579 -20.534 56.559 -21.484 53.799 L -25.464 53.799 L -25.464 56.639 C -23.494 60.669 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.799 C -21.734 53.099 -21.864 52.359 -21.864 51.599 C -21.864 50.839 -21.724 50.099 -21.484 49.399 L -21.484 46.559 L -25.464 46.559 C -26.284 48.139 -26.754 49.889 -26.754 51.599 C -26.754 53.309 -26.284 55.059 -25.464 56.639 L -21.484 53.799 Z"/>
                  <path fill="#EA4335" d="M -14.754 44.639 C -12.984 44.639 -11.404 45.279 -10.154 46.529 L -6.734 43.109 C -8.804 41.079 -11.514 39.979 -14.754 39.979 C -19.444 39.979 -23.494 42.549 -25.464 46.559 L -21.484 49.399 C -20.534 46.639 -17.884 44.639 -14.754 44.639 Z"/>
                </g>
              </svg>
              Sign in with Google
            </button>

            {/* Toggle Sign Up / Sign In */}
            <div className="text-center pt-2">
              <button
                onClick={() => {
                  setIsSignup(!isSignup);
                  setError(null);
                  setSuccessMessage(null);
                }}
                className="text-xs text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-bold transition cursor-pointer"
              >
                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}