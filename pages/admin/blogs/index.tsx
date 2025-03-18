import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '../../../components/AdminLayout';
import { Blog } from '../../../lib/types';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    try {
      const response = await fetch('/api/blogs');
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteBlog(id: string) {
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Refresh the blogs list
        fetchBlogs();
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('An error occurred while deleting the blog');
    }
  }

  return (
    <AdminLayout title="Manage Blogs">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Blogs</h1>
        <Link href="/admin/blogs/new" className="px-4 py-2 bg-green-500 text-white rounded-lg">
          Create New Blog
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : blogs.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Title</th>
                <th className="border p-2 text-left">Slug</th>
                <th className="border p-2 text-left">Created</th>
                <th className="border p-2 text-left">Updated</th>
                <th className="border p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50">
                  <td className="border p-2">{blog.title}</td>
                  <td className="border p-2">{blog.slug}</td>
                  <td className="border p-2">
                    {blog.createdAt && new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border p-2">
                    {blog.updatedAt && new Date(blog.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="border p-2 text-center">
                    <div className="flex justify-center space-x-2">
                      <Link href={`/blogs/${blog.slug}`} className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                        View
                      </Link>
                      <Link href={`/admin/blogs/${blog._id}/edit`} className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200">
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteBlog(blog._id || '')}
                        className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No blogs found. Create one!</p>
      )}
    </AdminLayout>
  );
}