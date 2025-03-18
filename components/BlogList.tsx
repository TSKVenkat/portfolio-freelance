import { Blog } from '../lib/types';
import BlogCard from './BlogCard';

interface BlogListProps {
    blogs: Blog[];
}

export default function BlogList({ blogs }: BlogListProps) {
    if (blogs.length === 0) {
        return <p className="text-center text-gray-500">No blogs found.</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
            ))}
        </div>
    );
}