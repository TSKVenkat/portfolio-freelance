import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Blog } from '../lib/types';

interface BlogEditorProps {
    blog?: Blog;
    isEditing?: boolean;
}

export default function BlogEditor({ blog, isEditing = false }: BlogEditorProps) {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [slug, setSlug] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setContent(blog.content);
            setSlug(blog.slug);
            setExcerpt(blog.excerpt);
        }
    }, [blog]);

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^\w\s]/gi, '')
            .replace(/\s+/g, '-');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        if (!isEditing) {
            setSlug(generateSlug(newTitle));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const blogData = {
            title,
            content,
            slug,
            excerpt,
        };

        try {
            const url = isEditing ? `/api/blogs/${blog?._id}` : '/api/blogs';
            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blogData),
            });

            if (response.ok) {
                router.push('/admin/blogs');
            } else {
                const data = await response.json();
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error submitting blog:', error);
            alert('An error occurred while saving the blog');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-gray-700 mb-1">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={handleTitleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                />
            </div>
            <div>
                <label htmlFor="slug" className="block text-gray-700 mb-1">
                    Slug
                </label>
                <input
                    type="text"
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                />
            </div>
            <div>
                <label htmlFor="excerpt" className="block text-gray-700 mb-1">
                    Excerpt
                </label>
                <input
                    type="text"
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                />
            </div>
            <div>
                <label htmlFor="content" className="block text-gray-700 mb-1">
                    Content
                </label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg h-64"
                    required
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="mr-2 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Create'}
                </button>
            </div>
        </form>
    );
}