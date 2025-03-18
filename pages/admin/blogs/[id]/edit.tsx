import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import AdminLayout from '../../../../components/AdminLayout';
import BlogEditor from '../../../../components/BlogEditor';
import { Blog } from '../../../../lib/types';

export default function EditBlog() {
    const router = useRouter();
    const { id } = router.query;
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBlog() {
            if (!id) return;

            try {
                const response = await fetch(`/api/blogs/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setBlog(data);
                } else {
                    router.push('/admin/blogs');
                }
            } catch (error) {
                console.error('Error fetching blog:', error);
                router.push('/admin/blogs');
            } finally {
                setLoading(false);
            }
        }

        fetchBlog();
    }, [id, router]);

    return (
        <AdminLayout title="Edit Blog">
            <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>
            {loading ? (
                <p>Loading...</p>
            ) : blog ? (
                <BlogEditor blog={blog} isEditing={true} />
            ) : (
                <p>Blog not found</p>
            )}
        </AdminLayout>
    );
}