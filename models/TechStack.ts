import mongoose, { Schema, Document } from 'mongoose';

export interface ITechStack extends Document {
  name: string;
  category: string;
  iconUrl?: string;
  proficiency: number; // 1-5 scale
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TechStackSchema = new Schema<ITechStack>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    iconUrl: { type: String },
    proficiency: { type: Number, required: true, min: 1, max: 5 },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Prevent overwrite model error when in development
export default mongoose.models.TechStack || mongoose.model<ITechStack>('TechStack', TechStackSchema); 