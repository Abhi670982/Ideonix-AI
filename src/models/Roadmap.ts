import mongoose, { Schema, Document } from 'mongoose';

export interface IStep {
  title: string;
  description?: string;
  duration?: string;
}

export interface IRoadmap extends Document {
  startupId: mongoose.Types.ObjectId;
  timeline?: string;
  phases: {
    phaseName: string;
    duration: string;
    steps: IStep[];
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const stepSchema = new Schema<IStep>({
  title: String,
  description: String,
  duration: String,
});

const roadmapSchema = new Schema<IRoadmap>({
  startupId: {
    type: Schema.Types.ObjectId,
    ref: "Startup",
    required: true,
  },
  timeline: {
    type: String,
  },
  phases: [{
    phaseName: String,
    duration: String,
    steps: [stepSchema]
  }],
}, { timestamps: true });

export default mongoose.models.Roadmap || mongoose.model<IRoadmap>("Roadmap", roadmapSchema);
