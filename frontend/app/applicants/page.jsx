"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../component/layout/DashboardLayout"; 
import ApplicantTable from "../component/ApplicantTable";
import ResumeModal from "../component/resumeModal";
import { useAuth } from "../context/AuthContext";
import ScheduleModal from "../component/ScheduleModal"; 


const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function ApplicantsPage() {
  const { user } = useAuth();
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [candidateToApprove, setCandidateToApprove] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Applicants on Load
  useEffect(() => {
    const fetchApplicants = async () => {
      if (user?.role !== "Newspaper") return;

      try {
        // ✅ 2. USE IT HERE: Replace hardcoded URL
        const res = await fetch(`${BASE_URL}/jobs/applicants`, {
          credentials: "include",
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error("Backend Error:", errorData);
          // alert(`Error: ${errorData.error || "Failed to load applicants"}`); 
          // (Commented out alert to prevent spamming users on load errors)
          return;
        }

        const data = await res.json();
        if (Array.isArray(data)) {
            setApplicants(data);
        } else {
            setApplicants([]);
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchApplicants();
  }, [user]);

  // 2. Shared API Caller (Used for both Approve and Reject)
  const sendStatusUpdate = async (id, bodyData) => {
    try {
        // Optimistic UI Update
        setApplicants((prev) => 
            prev.map((app) => app._id === id ? { ...app, status: bodyData.status } : app)
        );

        // ✅ 3. USE IT HERE: Replace hardcoded URL
        const res = await fetch(`${BASE_URL}/jobs/applications/${id}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(bodyData),
        });

        if (!res.ok) throw new Error("Failed to update");
        
    } catch (error) {
        alert("Failed to update status");
        // Optional: Revert optimistic update here if needed
    }
  };

  // 3. Handle Button Clicks from Table
  const handleUpdateStatus = (id, newStatus) => {
    // If approving, STOP and open the modal first
    if (newStatus === "Approved") {
      setCandidateToApprove(id);
      setScheduleModalOpen(true);
      return;
    }
    
    // If rejecting, send immediately
    if (newStatus === "Rejected") {
        const confirmReject = window.confirm("Are you sure you want to reject this applicant?");
        if (confirmReject) {
            sendStatusUpdate(id, { status: "Reject" });
        }
    }
  };

  // 4. Handle Modal Submission (Interview Details)
  const handleScheduleSubmit = async (interviewData) => {
    await sendStatusUpdate(candidateToApprove, {
      status: "Approved", 
      interviewDate: interviewData.date,
      interviewTime: interviewData.time,
      interviewType: interviewData.type,
      interviewLocation: interviewData.location
    });
    
    // Close modal and reset
    setScheduleModalOpen(false);
    setCandidateToApprove(null);
  };

  if (loading) return <div>Loading Applicants...</div>;
  if (user?.role !== "Newspaper") return <div>Access Denied. Newspaper accounts only.</div>;

  return (
    <DashboardLayout>
      <header style={{ marginBottom: '2rem' }}>
        <h1 className="text-2xl font-bold">Applicant Review</h1>
        <p className="text-gray-600">Manage candidates for your job postings</p>
      </header>

      <ApplicantTable 
        applicants={applicants}
        onUpdateStatus={handleUpdateStatus}
        onViewResume={(app) => setSelectedApplicant(app)}
      />

      {selectedApplicant && (
        <ResumeModal 
          applicant={selectedApplicant} 
          onClose={() => setSelectedApplicant(null)} 
        />
      )}

      <ScheduleModal 
          isOpen={scheduleModalOpen}
          onClose={() => setScheduleModalOpen(false)}
          onSubmit={handleScheduleSubmit}
      />
    </DashboardLayout>
  );
}