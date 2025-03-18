// pages/admin/index.tsx
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/AdminLayout';
import { checkAdminStatus } from '../../lib/auth';

export default function AdminDashboard() {
  const router = useRouter();
  
  useEffect(() => {
    // Check if user is admin on page load
    if (!checkAdminStatus()) {
      router.push('/login?returnUrl=' + encodeURIComponent(router.asPath));
    }
  }, [router]);

  return (
    <AdminLayout title="Admin Dashboard">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Blog Management</h2>
          <p className="text-gray-600 mb-4">Create, edit, and manage your blog posts.</p>
          <Link 
            href="/admin/blogs" 
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Manage Blogs
          </Link>
        </div>
        
        <div className="p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <div className="space-y-2">
            <p className="text-gray-600">Total Blogs: <span className="font-semibold">Loading...</span></p>
            <p className="text-gray-600">Recent Views: <span className="font-semibold">Loading...</span></p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}