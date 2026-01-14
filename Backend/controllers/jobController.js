import Job from "../models/Job.js";
import Application from "../models/applications.js"; 

// 1. Create a Job (Newspaper)
export const createJob = async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, postedBy: req.userId });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Apply to a Job (Job Seeker)
export const applyToJob = async (req, res) => {
  try {
    const app = await Application.create({
      jobId: req.params.jobId,
      applicantId: req.userId,
    });
    res.status(201).json(app);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Get Applicants for a Newspaper's Jobs
export const getJobApplicants = async (req, res) => {
  try {
    // Find jobs posted by this user
    const jobs = await Job.find({ postedBy: req.userId });
    const jobIds = jobs.map(j => j._id);

    // Find applications for those jobs
    const apps = await Application.find({ jobId: { $in: jobIds } })
      .populate("applicantId", "name email profile")
      .populate("jobId", "title");

    res.json(apps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Update Application Status (Approve/Reject + Interview)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, interviewDate, interviewTime, interviewType, interviewLocation } = req.body;

    const updateData = { status };
    
    // Only save interview details if status is Approved
    if (status === 'Approved') {
        updateData.interviewDate = interviewDate;
        updateData.interviewTime = interviewTime;
        updateData.interviewType = interviewType;
        updateData.interviewLocation = interviewLocation;
    }

    const updatedApp = await Application.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate('applicantId', 'name email');

    if (!updatedApp) return res.status(404).json({ error: "Application not found" });

    res.json(updatedApp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5. Get User's Applications (For "Applied" button & Notifications)
export const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicantId: req.userId })
      .populate('jobId', 'title category')
      .sort({ appliedAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 6. Get ALL jobs (For the Job Board)
export const getAllJobs = async (req, res) => {
  try {
    // Sort by newest first
    const jobs = await Job.find().sort({ createdAt: -1 }).populate('postedBy', 'name'); 
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};