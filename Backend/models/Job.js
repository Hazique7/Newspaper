// models/Job.js
import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Sports Feature Writer"
  category: { type: String, required: true }, // e.g., "Sports"
  jobType: { type: String, required: true }, // e.g., "Full-time"
  city: String,
  locationType: { type: String, enum: ['Remote', 'On-site', 'Hybrid'] },
  description: String,
  responsibilities: String,
  qualificationReq: String,
  salary: String,
  education: { type: String, default: "Bachelors" },
  preferredSkills: [String],
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('Job', JobSchema);