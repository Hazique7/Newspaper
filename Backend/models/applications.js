// models/Application.js
import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Pending', 'Approve', 'Reject'], default: 'Pending' },
  appliedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Application', ApplicationSchema);