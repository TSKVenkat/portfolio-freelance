import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import BlogList from '../components/BlogList';
import { Blog } from '../lib/types';

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch('/api/blogs');
        if (response.ok) {
          const data = await response.json();
          setBlogs(data.slice(0, 3)); // Only show the 3 most recent blogs
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
    <Layout title="My Portfolio">
      <section className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p className="text-lg text-gray-700">
          I'm a web developer specializing in building modern web applications.
        </p>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Recent Blogs</h2>
          <a href="/blogs" className="text-blue-600 hover:text-blue-800">
            View all →
          </a>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <BlogList blogs={blogs} />
        )}
      </section>
    </Layout>
  );
}
