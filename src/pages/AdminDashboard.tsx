import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initAuth, logout } from '../lib/auth';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initAuth(
      () => setLoading(false),
      () => navigate('/admin/login')
    );
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <main className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
      <p className="mb-6">Welcome to your dashboard.</p>
      <button onClick={() => { logout(); navigate('/admin/login'); }} className="bg-red-600 text-white py-2 px-4 rounded-lg">
        Logout
      </button>
    </main>
  );
}
