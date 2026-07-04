import mongoose, { Schema, Document } from 'mongoose';

export interface IValidationResult extends Document {
  startupId?: mongoose.Types.ObjectId;
  userId: string; // Clerk userId
  title?: string;
  idea: string; // Description of the idea
  domain?: string; // Industry domain
  stage?: string;
  score?: number;
  targetAudience?: string;
  countryRegion?: string;
  businessModel?: string;
  additionalContext?: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  report?: any; // Storing the full parsed JSON from Grok
  createdAt: Date;
  updatedAt: Date;
}

const validationResultSchema = new Schema<IValidationResult>({
  startupId: {
    type: Schema.Types.ObjectId,
    ref: "Startup",
    required: false,
  },
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  idea: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
  },
  stage: {
    type: String,
  },
  score: {
    type: Number,
  },
  targetAudience: {
    type: String,
  },
  countryRegion: {
    type: String,
  },
  businessModel: {
    type: String,
  },
  additionalContext: {
    type: String,
  },
  strengths: {
    type: [String],
    default: [],
  },
  weaknesses: {
    type: [String],
    default: [],
  },
  suggestions: {
    type: [String],
    default: [],
  },
  report: {
    type: Schema.Types.Mixed,
  }
}, { timestamps: true });

export default mongoose.models.ValidationResult || mongoose.model<IValidationResult>("ValidationResult", validationResultSchema);
