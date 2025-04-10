import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  position: string;
  company: string;
  testimonial: string;
  avatarUrl?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    company: { type: String, required: true },
    testimonial: { type: String, required: true },
    avatarUrl: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Prevent overwrite model error when in development
export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema); 