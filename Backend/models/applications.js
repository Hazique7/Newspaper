import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  
  // Interview Details
  interviewDate: Date,
  interviewTime: String,
  interviewType: { type: String, enum: ['On-site', 'Online'] },
  interviewLocation: String,
  
  appliedAt: { type: Date, default: Date.now }
}, { timestamps: true }); // <--- ADD THIS (Enables createdAt and updatedAt)

export default mongoose.model('Application', ApplicationSchema);