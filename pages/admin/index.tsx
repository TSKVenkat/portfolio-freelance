// pages/admin/index.tsx
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import AdminLayout from '../../components/AdminLayout';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function AdminDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [stats, setStats] = useState({ blogs: '—', views: '—' });
  
  useEffect(() => {
    // If not loading and not authenticated, redirect to login
    if (status === 'unauthenticated') {
      router.push('/login?returnUrl=' + encodeURIComponent(router.asPath));
    }
    
    // If authenticated, fetch stats
    if (status === 'authenticated' && session.user.isAdmin) {
      // Here you would fetch stats from your API
      // This is a placeholder for demonstration
      const fetchStats = async () => {
        try {
          // const response = await fetch('/api/admin/stats');
          // const data = await response.json();
          // setStats(data);
          
          // Simulated stats for demonstration
          setTimeout(() => {
            setStats({ 
              blogs: '12', 
              views: '583' 
            });
          }, 1000);
        } catch (error) {
          console.error('Error fetching stats:', error);
        }
      };
      
      fetchStats();
    }
  }, [router, session, status]);

  if (status === 'loading' || status === 'unauthenticated') {
    return null; // ProtectedRoute component will handle loading and unauthorized states
  }

  return (
    <ProtectedRoute>
      <AdminLayout title="Admin Dashboard">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4">Blog Management</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Create, edit, and manage your blog posts.</p>
            <Link 
              href="/admin/blogs" 
              className="inline-block bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded transition-colors"
            >
              Manage Blogs
            </Link>
          </div>
          
          <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">
                Total Blogs: <span className="font-semibold">{stats.blogs}</span>
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Recent Views: <span className="font-semibold">{stats.views}</span>
              </p>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}