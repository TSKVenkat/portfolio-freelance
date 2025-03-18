import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db';
import Blog from '../../../models/Blog';
import { authMiddleware } from '../../../lib/auth';

// Handler for GET all blogs and POST new blog
async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    // GET all blogs
    if (req.method === 'GET') {
        try {
            const blogs = await Blog.find({}).sort({ createdAt: -1 });
            return res.status(200).json(blogs);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // POST new blog (protected)
    if (req.method === 'POST') {
        try {
            const { title, content, slug, excerpt } = req.body;

            // Check if a blog with the same slug already exists
            const existingBlog = await Blog.findOne({ slug });
            if (existingBlog) {
                return res.status(400).json({ message: 'A blog with this slug already exists' });
            }

            const blog = await Blog.create({
                title,
                content,
                slug,
                excerpt,
            });

            return res.status(201).json(blog);
        } catch (error) {
            console.error('Error creating blog:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Method not allowed
    return res.status(405).json({ message: 'Method not allowed' });
}

// Wrap the handler with auth middleware for POST requests
export default async function apiHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        return authMiddleware(handler)(req, res);
    }
    return handler(req, res);
}