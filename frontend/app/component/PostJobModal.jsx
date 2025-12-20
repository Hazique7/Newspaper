"use client";

import React, { useState } from "react";
import { X, Send } from "lucide-react";
import "./PostJobModal.css";
import { useAuth } from "../context/AuthContext"; // Import Auth for token handling

export default function PostJobModal({ onClose, onPostSuccess }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState({
    title: "",
    category: "Engineering",
    city: "",
    description: "",
    jobType: "Full-time", // Added default
    locationType: "On-site" // Added default
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        // We include credentials so the cookie (auth token) is sent
        credentials: "include", 
        body: JSON.stringify(jobData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to post job");
      }

      const savedJob = await res.json();
      
      // Notify parent to refresh list
      if (onPostSuccess) onPostSuccess(savedJob); 
      onClose();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-modal-wrapper">
      <div className="job-modal-overlay" onClick={onClose}></div>

      <form onSubmit={handleSubmit} className="job-modal-container">
        <button type="button" onClick={onClose} className="job-modal-close">
          <X size={24} />
        </button>

        <h2 className="job-modal-title">Post a Job</h2>

        <div className="job-modal-fields">
          <div className="job-modal-field">
            <label className="job-modal-label">Job Title</label>
            <input
              required
              type="text"
              className="job-modal-input"
              value={jobData.title}
              onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
            />
          </div>

          <div className="job-modal-field">
            <label className="job-modal-label">Category</label>
            <select 
              className="job-modal-input"
              value={jobData.category}
              onChange={(e) => setJobData({ ...jobData, category: e.target.value })}
            >
              <option>Engineering</option>
              <option>Journalism</option>
              <option>Design</option>
              <option>Marketing</option>
            </select>
          </div>

          <div className="job-modal-field">
            <label className="job-modal-label">Location (City)</label>
            <input
              required
              type="text"
              className="job-modal-input"
              value={jobData.city}
              onChange={(e) => setJobData({ ...jobData, city: e.target.value })}
            />
          </div>

          <div className="job-modal-field">
            <label className="job-modal-label">Description</label>
            <textarea
              required
              rows={3}
              className="job-modal-textarea"
              value={jobData.description}
              onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
            />
          </div>

          <button type="submit" className="job-modal-submit" disabled={loading}>
            {loading ? "Posting..." : <>Confirm Posting <Send size={18} /></>}
          </button>
        </div>
      </form>
    </div>
  );
}