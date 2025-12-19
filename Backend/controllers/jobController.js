import Job from "../models/Job.js";
import Application from "../models/applications.js";

// Newspaper posts a job
export const createJob = async (req, res) => {
  try {
    const jobData = { ...req.body, postedBy: req.userId };
    const job = await Job.create(jobData);
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Job Seeker applies for a job
export const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const application = await Application.create({ jobId, applicantId: req.userId });
    res.status(201).json({ message: "Application submitted!", application });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Newspaper views all applicants for their dashboard
export const getJobApplicants = async (req, res) => {
  try {
    // 1. Find all jobs posted by THIS newspaper
    const newspaperJobs = await Job.find({ postedBy: req.userId });
    const jobIds = newspaperJobs.map(job => job._id);

    // 2. Only fetch applications for those specific jobs
    const applicants = await Application.find({ jobId: { $in: jobIds } })
      .populate('applicantId', 'name email profile')
      .populate('jobId', 'title');

    // Ensure we always send an array, even if empty
    res.json(applicants || []); 
  } catch (error) {
    // If this hits, the frontend receives an object, triggering your console error
    res.status(500).json({ error: error.message });
  }
};

// NEW: Update status (Approve/Reject) for the Dashboard buttons
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params; 
    const { status } = req.body; // Expecting 'Approve' or 'Reject'

    const updatedApp = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('applicantId', 'name email');

    if (!updatedApp) return res.status(404).json({ error: "Application not found" });

    res.json(updatedApp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};