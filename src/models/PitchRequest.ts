import mongoose, { Schema, Document } from 'mongoose';

export interface IPitchRequest extends Document {
  founderId: mongoose.Types.ObjectId;
  investorId: mongoose.Types.ObjectId;
  startupId: mongoose.Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const pitchRequestSchema = new Schema<IPitchRequest>({
  founderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  investorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  startupId: {
    type: Schema.Types.ObjectId,
    ref: "Startup",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  }
}, { timestamps: true });

export default mongoose.models.PitchRequest || mongoose.model<IPitchRequest>("PitchRequest", pitchRequestSchema);
