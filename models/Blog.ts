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
        coverImage: {
            type: String,
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
        tags: {
            type: [String],
            default: [],
        },
        published: {
            type: Boolean,
            default: false,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        viewCount: {
            type: Number,
            default: 0,
        },
        readingTime: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

// Helper method to estimate reading time before saving
BlogSchema.pre('save', function(next) {
    if (this.content) {
        // Average reading speed: 200-250 words per minute
        const wordCount = this.content.split(/\s+/).length;
        this.readingTime = Math.ceil(wordCount / 225);
    }
    next();
});

const BlogModel = mongoose.models.Blog || mongoose.model<Blog>('Blog', BlogSchema);

export default BlogModel;