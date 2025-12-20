"use client";

import React from "react";
import { X, User, Mail, BookOpen, ExternalLink, MapPin } from "lucide-react";
import "./ResumeModal.css";

export default function ResumeModal({ applicant, onClose }) {
  if (!applicant) return null;

  // Safely access nested data (in case fields are missing)
  const user = applicant.applicantId || {};
  const profile = user.profile || {};
  const job = applicant.jobId || {};

  return (
    <div className="resume-modal-wrapper">
      <div className="resume-modal-overlay" onClick={onClose}></div>
      <div className="resume-modal-container">
        <button className="resume-modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="resume-modal-header">
          <div className="resume-modal-avatar">
            <User size={32} />
          </div>
          <h2 className="resume-modal-name">{user.name || "Unknown Candidate"}</h2>
          <p className="resume-modal-title">
            APPLICANT FOR / <span>{job.title || "Position"}</span>
          </p>
        </div>

        <div className="resume-modal-details">
          <DetailItem
            label="Email Address"
            value={user.email}
            icon={<Mail size={18} />}
          />
          <DetailItem
            label="Location"
            value={profile.city || "Not Provided"}
            icon={<MapPin size={18} />}
          />
          <DetailItem
            label="Education"
            value={profile.education || "Not Specified"}
            icon={<BookOpen size={18} />}
          />
        </div>

        {/* [NEW] Resume Action Button */}
        <div style={{ padding: "0 30px 30px 30px" }}>
          {profile.resumeLink ? (
            <a 
              href={profile.resumeLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="resume-modal-button"
              style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                gap: "8px", 
                textDecoration: "none",
                textAlign: "center"
              }}
            >
              <ExternalLink size={18} /> View / Download CV
            </a>
          ) : (
            <button 
              className="resume-modal-button" 
              disabled 
              style={{ backgroundColor: "#e2e8f0", color: "#94a3b8", cursor: "not-allowed" }}
            >
              No Resume Uploaded
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

function DetailItem({ label, value, icon }) {
  return (
    <div className="detail-item">
      <div className="detail-item-icon">{icon}</div>
      <div className="detail-item-text">
        <p className="detail-item-label">{label}</p>
        <p className="detail-item-value">{value}</p>
      </div>
    </div>
  );
}