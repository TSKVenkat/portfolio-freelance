import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db';
import Blog from '../../../models/Blog';
import { authMiddleware } from '../../../lib/auth';

// Handler for GET, PUT, DELETE blog by ID
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  await dbConnect();

  // GET blog by ID
  if (req.method === 'GET') {
    try {
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      
      // If this is a public view, increment the view count
      if (req.headers['x-increment-views']) {
        await Blog.findByIdAndUpdate(id, { $inc: { viewCount: 1 } });
      }
      
      return res.status(200).json(blog);
    } catch (error) {
      console.error('Error fetching blog:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  // PUT update blog
  if (req.method === 'PUT') {
    try {
      const { title, content, slug, excerpt, tags, published, featured, coverImage } = req.body;

      // Check if slug is being changed and if it's already in use
      const existingBlog = await Blog.findOne({ slug, _id: { $ne: id } });
      if (existingBlog) {
        return res.status(400).json({ message: 'A blog with this slug already exists' });
      }

      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { 
          title, 
          content, 
          slug, 
          excerpt,
          tags: tags || [],
          published: published !== undefined ? published : true,
          featured: featured !== undefined ? featured : false,
          ...(coverImage && { coverImage })
        },
        { new: true, runValidators: true }
      );

      if (!updatedBlog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      return res.status(200).json(updatedBlog);
    } catch (error) {
      console.error('Error updating blog:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  // DELETE blog
  if (req.method === 'DELETE') {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(id);
      if (!deletedBlog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      return res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
      console.error('Error deleting blog:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Method not allowed
  return res.status(405).json({ message: 'Method not allowed' });
}

// Wrap the handler with auth middleware for protected routes
export default async function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT' || req.method === 'DELETE') {
    // Use the authMiddleware to protect these routes
    return authMiddleware(
      req,
      res,
      handler
    );
  }
  return handler(req, res);
}