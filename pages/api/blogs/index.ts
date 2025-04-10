import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db';
import Blog from '../../../models/Blog';
import { authMiddleware } from '../../../lib/auth';

// Handler for GET, POST blog routes
async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    // GET blogs
    if (req.method === 'GET') {
        try {
            const { limit = 10, page = 1, featured, published, tag } = req.query;
            
            // Build query
            const query: any = {};
            
            // Filter by published status (public API should only show published posts)
            if (published !== undefined) {
                query.published = published === 'true';
            }
            
            // Filter by featured status
            if (featured !== undefined) {
                query.featured = featured === 'true';
            }
            
            // Filter by tag
            if (tag) {
                query.tags = tag;
            }
            
            const skip = (Number(page) - 1) * Number(limit);
            
            const blogs = await Blog.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(Number(limit));
            
            const total = await Blog.countDocuments(query);
            
            return res.status(200).json({ 
                blogs,
                pagination: {
                    total,
                    page: Number(page),
                    pages: Math.ceil(total / Number(limit))
                }
            });
        } catch (error) {
            console.error('Error fetching blogs:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // POST create blog
    if (req.method === 'POST') {
        try {
            const { title, content, slug, excerpt, tags, coverImage, published, featured } = req.body;

            // Check if slug is already in use
            const existingBlog = await Blog.findOne({ slug });
            if (existingBlog) {
                return res.status(400).json({ message: 'A blog with this slug already exists' });
            }

            const blog = await Blog.create({ 
                title, 
                content, 
                slug, 
                excerpt,
                tags: tags || [],
                coverImage,
                published: published !== undefined ? published : true,
                featured: featured !== undefined ? featured : false,
                viewCount: 0
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

// Wrap the handler with auth middleware for protected routes
export default async function apiHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Use the authMiddleware to protect these routes
        return authMiddleware(
            req,
            res,
            handler
        );
    }
    return handler(req, res);
}