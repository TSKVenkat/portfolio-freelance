import mongoose, { Schema } from 'mongoose';
import { Blog } from '../lib/types';

const BlogSchema = new Schema<Blog>(
    {
        title: {
            type: String,
            required: [true, 'Please provide a title for this blog'],
            maxlength: [100, 'Title cannot be more than 100 characters'],
        },
        content: {
            type: String,
            required: [true, 'Please provide content for this blog'],
        },
        slug: {
            type: String,
            required: [true, 'Please provide a slug for this blog'],
            unique: true,
        },
        excerpt: {
            type: String,
            required: [true, 'Please provide an excerpt for this blog'],
        },
    },
    {
        timestamps: true,
    }
);

const BlogModel = mongoose.models.Blog || mongoose.model<Blog>('Blog', BlogSchema);

export default BlogModel;