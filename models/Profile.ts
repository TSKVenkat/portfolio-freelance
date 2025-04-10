import mongoose, { Schema, Document } from 'mongoose';

export interface IProfile extends Document {
  name: string;
  title: string;
  bio: string;
  avatarUrl?: string;
  email: string;
  phone?: string;
  location?: string;
  resume?: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
    whatsapp?: string;
    [key: string]: string | undefined;
  };
  sectionOrder: string[]; // Array of section ids in order of appearance
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    avatarUrl: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    location: { type: String },
    resume: { type: String },
    socialLinks: {
      linkedin: { type: String },
      github: { type: String },
      twitter: { type: String },
      instagram: { type: String },
      whatsapp: { type: String },
    },
    sectionOrder: { 
      type: [String], 
      default: ['hero', 'about', 'projects', 'techStack', 'testimonials', 'blogs', 'contact'] 
    },
  },
  { timestamps: true }
);

// Prevent overwrite model error when in development
export default mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema); 