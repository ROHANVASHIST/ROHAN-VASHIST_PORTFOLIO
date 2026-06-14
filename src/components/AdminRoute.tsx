import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ADMIN_EMAILS } from '../lib/adminConfig';
import { Session } from '@supabase/supabase-js'; 

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 text-gray-500">
        Authenticating...
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  const userEmail = session.user?.email;
  const isAdmin = userEmail && ADMIN_EMAILS.includes(userEmail);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
          Your account ({userEmail || 'Unknown'}) is not authorized as an admin. Admin access is granted only after confirmation from rohanvashist01@gmail.com. Until then, you can browse the site as a viewer.
        </p>
        <div className="flex gap-4">
          <a href="/home" className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition">Go to Home</a>
          <button 
            onClick={() => supabase.auth.signOut().then(() => window.location.href = "/")}
            className="px-6 py-2 bg-gray-200 dark:bg-white/10 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-white/20 transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
