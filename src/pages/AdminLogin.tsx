import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initAuth, googleSignIn } from '../lib/auth';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initAuth(
      () => navigate('/admin/dashboard'),
      () => setLoading(false)
    );
  }, [navigate]);

  const handleLogin = async () => {
    try {
      await googleSignIn();
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <main className="max-w-lg mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Admin Login</h1>
      <button onClick={handleLogin} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
        Sign in with Google
      </button>
    </main>
  );
}
