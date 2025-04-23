import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IResume extends Document {
  userId: string;
  title: string;
  fileName: string;
  content: string;  // Store the resume text or a link to it
  role: string;
  feedback?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ResumeSchema = new Schema<IResume>(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    fileName: { type: String, required: true },
    content: { type: String, required: true },
    role: { type: String, required: true },
    feedback: { type: String },
  },
  { timestamps: true }
);

const Resume = models?.Resume || model<IResume>("Resume", ResumeSchema);

export default Resume;
