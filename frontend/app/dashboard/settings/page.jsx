"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../component/layout/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { User, ShieldCheck, Mail, Building2, Link as LinkIcon, Save } from "lucide-react";
import "./SettingsPage.css";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function SettingsPage() {
  const { user, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resumeLink: ""
  });
  
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        resumeLink: user.profile?.resumeLink || "" 
      });
    }
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // ✅ 2. UPDATE: Use Dynamic BASE_URL here
      const res = await fetch(`${BASE_URL}/users/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          profile: {
            resumeLink: formData.resumeLink 
          }
        })
      });

      if (!res.ok) throw new Error("Failed to update profile");
      
      alert("Profile updated successfully!");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  const isJobSeeker = user?.role === "JobSeeker";

  return (
    <div className="settings-page">
      <Sidebar />

      <main className="settings-main">
        <header className="settings-header">
          <div className="settings-user-info">
            <div className="settings-icon-bg">
              <Building2 size={20} className="settings-icon-light" />
            </div>
            <h2 className="settings-username">{formData.name || "User"}</h2>
          </div>
          <div className="settings-user-avatar">
            <User size={20} />
          </div>
        </header>

        <div className="settings-container">
          <h1 className="settings-title">Settings</h1>

          <div className="settings-sections">
            {/* 1. Name Field */}
            <div className="settings-section">
              <div className="settings-section-info">
                <div className="settings-icon-bg">
                  <Building2 size={20} className="settings-icon-light" />
                </div>
                <div style={{ width: '100%' }}>
                  <span className="settings-section-label">
                    {isJobSeeker ? "Full Name" : "Company Name"}
                  </span>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* 2. Email Field */}
            <div className="settings-section">
              <div className="settings-section-info">
                <div className="settings-icon-bg">
                  <Mail size={20} className="settings-icon-light" />
                </div>
                <div style={{ width: '100%' }}>
                  <span className="settings-section-label">Email Address</span>
                  <input 
                    type="email" 
                    className="settings-input"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* 3. Resume Link (Only for Job Seekers) */}
            {isJobSeeker && (
              <div className="settings-section">
                <div className="settings-section-info">
                  <div className="settings-icon-bg">
                    <LinkIcon size={20} className="settings-icon-light" />
                  </div>
                  <div style={{ width: '100%' }}>
                    <span className="settings-section-label">Resume / Portfolio Link</span>
                    <input 
                      type="text" 
                      placeholder="https://drive.google.com/..."
                      className="settings-input"
                      value={formData.resumeLink}
                      onChange={(e) => setFormData({...formData, resumeLink: e.target.value})}
                    />
                    <p style={{fontSize:'0.8rem', color:'#666', marginTop:'5px'}}>
                        Paste a link to your Google Drive PDF or Portfolio website.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Static Status Field */}
            <div className="settings-section">
              <div className="settings-section-info">
                <div className="settings-icon-bg">
                  <ShieldCheck size={20} className="settings-icon-light" />
                </div>
                <div>
                  <span className="settings-section-label">Account Role</span>
                  <p className="settings-section-value">{user?.role}</p>
                </div>
              </div>
              <span className="settings-status-badge">Active</span>
            </div>
          </div>

            <div className="settings-save-btn-wrapper">
            <button 
                className="settings-save-btn" 
                onClick={handleSave} 
                disabled={isSaving}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent:'center'}}
            >
                {isSaving ? "Saving..." : <><Save size={18}/> Save Changes</>}
            </button>
            </div>
        </div>
      </main>
    </div>
  );
}