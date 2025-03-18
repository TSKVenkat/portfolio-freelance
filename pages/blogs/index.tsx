import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import BlogList from '../../components/BlogList';
import { Blog } from '../../lib/types';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchBlogs();
  }, []);

  return (
    <Layout title="Blogs">
      <h1 className="text-3xl font-bold mb-6">All Blogs</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <BlogList blogs={blogs} />
      )}
    </Layout>
  );
}