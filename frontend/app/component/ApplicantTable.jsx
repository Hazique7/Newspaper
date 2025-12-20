"use client";

import React from "react";
import { CheckCircle2, XCircle, Eye } from "lucide-react";
import "./ApplicantTable.css";

export default function ApplicantTable({ applicants, onUpdateStatus, onViewResume }) {
  if (applicants.length === 0) {
    return <div className="p-4 text-gray-500">No applicants found yet.</div>;
  }

  return (
    <div className="applicant-table-wrapper">
      <table className="applicant-table">
        <thead>
          <tr className="applicant-table-header">
            <th>Applicant</th>
            <th>Applying For</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((app) => {
            // SAFE ACCESS: Handle cases where applicantId might be null (deleted user)
            const applicantName = app.applicantId?.name || "Unknown Applicant";
            const applicantEmail = app.applicantId?.email || "No Email";
            const jobTitle = app.jobId?.title || "Unknown Job";
            const statusClass = 
                app.status === "Approve" || app.status === "Approved" ? "status-approved" : 
                app.status === "Reject"  || app.status === "Rejected" ? "status-rejected" : "status-pending";

            return (
              <tr key={app._id} className="applicant-table-row">
                {/* 1. Applicant Info */}
                <td className="applicant-table-cell applicant-table-cell-left">
                  <div className="applicant-info">
                    <div className="applicant-avatar">
                      {applicantName.charAt(0).toUpperCase()}
                    </div>
                    <div className="applicant-details">
                      <button className="applicant-name" onClick={() => onViewResume(app)}>
                        {applicantName}
                      </button>
                      <p className="applicant-email">{applicantEmail}</p>
                    </div>
                  </div>
                </td>

                {/* 2. Job Position */}
                <td className="applicant-table-cell">
                   {jobTitle}
                </td>

                {/* 3. Status Badge */}
                <td className="applicant-table-cell">
                  <span className={`applicant-status ${statusClass}`}>
                    {app.status}
                  </span>
                </td>

                {/* 4. Action Buttons */}
                <td className="applicant-table-cell applicant-table-cell-right">
                  <div className="applicant-actions">
                    <button
                      title="Approve"
                      onClick={() => onUpdateStatus(app._id, "Approved")}
                      className="action-button approve"
                    >
                      <CheckCircle2 size={18} />
                    </button>
                    <button
                      title="Reject"
                      onClick={() => onUpdateStatus(app._id, "Rejected")}
                      className="action-button reject"
                    >
                      <XCircle size={18} />
                    </button>
                    <button
                      title="View Details"
                      onClick={() => onViewResume(app)}
                      className="action-button view"
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}