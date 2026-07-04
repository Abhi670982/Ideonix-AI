import mongoose, { Schema, Document } from 'mongoose';

export interface IStartup extends Document {
  founderId: mongoose.Types.ObjectId;
  name: string;
  summary?: string;
  domain?: string;
  stage: string;
  problem?: string;
  solution?: string;
  lookingForTeam: boolean;
  rolesNeeded: string[];
  validationScore: number;
  readinessScore: number;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const startupSchema = new Schema<IStartup>({
  founderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
  domain: {
    type: String,
  },
  stage: {
    type: String,
    default: "Idea",
  },
  problem: {
    type: String,
  },
  solution: {
    type: String,
  },
  lookingForTeam: {
    type: Boolean,
    default: false,
  },
  rolesNeeded: {
    type: [String],
    default: [],
  },
  validationScore: {
    type: Number,
    default: 0,
  },
  readinessScore: {
    type: Number,
    default: 0,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.models.Startup || mongoose.model<IStartup>("Startup", startupSchema);
