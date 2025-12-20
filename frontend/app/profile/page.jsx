"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
// CHANGE: Use DashboardLayout instead of manual Sidebar
import DashboardLayout from "../component/layout/DashboardLayout";
import { User, Mail, Shield, LogOut, Camera, Link as LinkIcon, Save, Edit2 } from "lucide-react";
import "./ProfilePage.css";

export default function ProfilePage() {
  const { user, logout, loading } = useAuth();
  
  // State for editing
  const [isEditing, setIsEditing] = useState(false);
  const [resumeLink, setResumeLink] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Load existing link on mount
  useEffect(() => {
    if (user?.profile?.resumeLink) {
      setResumeLink(user.profile.resumeLink);
    }
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          profile: { resumeLink } 
        })
      });
      
      if (res.ok) {
        alert("Resume Link Saved!");
        setIsEditing(false);
        // Force reload to ensure AuthContext gets fresh data
        window.location.reload(); 
      } else {
        alert("Failed to save profile.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return null;

  return (
    <DashboardLayout>
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">
              <User size={64} strokeWidth={1.5} />
            </div>
            <div className="profile-camera">
              <Camera size={16} />
            </div>
          </div>

          <h1 className="profile-title">
            Welcome, <br />
            <span className="profile-subtitle">{user?.name}</span>
          </h1>

          <div className="profile-info">
            {/* Email */}
            <div className="profile-info-item">
              <div className="profile-info-icon"><Mail size={20} /></div>
              <div>
                <p className="profile-info-label">Official Email</p>
                <p className="profile-info-value">{user?.email}</p>
              </div>
            </div>

            {/* Account Status */}
            <div className="profile-info-item">
              <div className="profile-info-icon"><Shield size={20} /></div>
              <div>
                <p className="profile-info-label">Account Access</p>
                <p className="profile-info-value">Verified {user?.role}</p>
              </div>
            </div>

            {/* [RESUME SECTION] */}
            <div className="profile-info-item">
              <div className="profile-info-icon"><LinkIcon size={20} /></div>
              <div style={{ width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p className="profile-info-label">Resume / Portfolio Link</p>
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "4px" }}
                  >
                    <Edit2 size={12}/> {isEditing ? "Cancel" : "Edit"}
                  </button>
                </div>

                {isEditing ? (
                  <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                    <input 
                      type="url" 
                      placeholder="Paste link (Google Drive, LinkedIn...)"
                      value={resumeLink}
                      onChange={(e) => setResumeLink(e.target.value)}
                      style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "0.9rem" }}
                    />
                    <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      style={{ backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "4px", padding: "0 12px", cursor: "pointer" }}
                    >
                      <Save size={16} />
                    </button>
                  </div>
                ) : (
                  <p className="profile-info-value">
                    {resumeLink ? (
                      <a href={resumeLink} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", textDecoration: "underline" }}>
                        View Uploaded Resume
                      </a>
                    ) : (
                      <span style={{ color: "#9ca3af", fontStyle: "italic" }}>No resume added yet</span>
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>

          <button onClick={logout} className="profile-logout-btn">
            <LogOut size={16} /> Sign Out of NewsConnect
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}