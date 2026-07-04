import mongoose, { Schema, Document } from 'mongoose';

export interface IInvestorProfile extends Document {
  userId: mongoose.Types.ObjectId;
  company: string;
  investmentRange?: string;
  preferredDomains: string[];
  pastInvestments?: string;
  status: 'pending' | 'verified' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const investorProfileSchema = new Schema<IInvestorProfile>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  company: {
    type: String,
    required: true,
  },
  investmentRange: {
    type: String,
  },
  preferredDomains: {
    type: [String],
    default: [],
  },
  pastInvestments: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "verified", "rejected"],
    default: "pending",
  }
}, { timestamps: true });

export default mongoose.models.InvestorProfile || mongoose.model<IInvestorProfile>("InvestorProfile", investorProfileSchema);
