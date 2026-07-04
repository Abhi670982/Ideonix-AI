import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  name?: string;
  username?: string;
  profileImage?: string;
  lastLoginAt: Date;
  credits: number;
  subscription: string;
  plan: string;
  role: 'founder' | 'investor' | 'admin';
  status: 'pending' | 'verified' | 'rejected';
  onboardingCompleted: boolean;
  preferences: Map<string, string>;
  usage: Map<string, number>;
  workspaces: any[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  fullName: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    unique: true,
    sparse: true,
  },
  profileImage: {
    type: String,
    default: "",
  },
  lastLoginAt: {
    type: Date,
    default: Date.now,
  },
  credits: {
    type: Number,
    default: 100,
  },
  subscription: {
    type: String,
    default: "free",
  },
  plan: {
    type: String,
    default: "free",
  },
  role: {
    type: String,
    enum: ["founder", "investor", "admin"],
    default: "founder",
  },
  status: {
    type: String,
    enum: ["pending", "verified", "rejected"],
    default: "verified",
  },
  onboardingCompleted: {
    type: Boolean,
    default: false,
  },
  preferences: {
    type: Map,
    of: String,
    default: {},
  },
  usage: {
    type: Map,
    of: Number,
    default: {},
  },
  workspaces: {
    type: [Schema.Types.Mixed],
    default: [],
  } as any
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>("User", userSchema);
