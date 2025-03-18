import Link from 'next/link';
import { Blog } from '../lib/types';

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="bg-gray-500 p-4 rounded-lg shadow mb-4">
      <h2 className="text-xl font-bold mb-2">
        <Link href={`/blogs/${blog.slug}`} className="text-blue-600 hover:text-blue-800">
          {blog.title}
        </Link>
      </h2>
      <p className="text-gray-700 mb-2">{blog.excerpt}</p>
      <div className="text-gray-500 text-sm">
        {blog.updatedAt && (
          <p>Last updated: {new Date(blog.updatedAt).toLocaleDateString()}</p>
        )}
      </div>
    </div>
  );
}