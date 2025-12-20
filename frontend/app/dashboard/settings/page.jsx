"use client";

import React from "react";
import Sidebar from "../../component/layout/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { User, ShieldCheck, Mail, Building2 } from "lucide-react";
import "./SettingsPage.css";

export default function SettingsPage() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <div className="settings-page">
      {/* Shared Global Sidebar */}
      <Sidebar />

      <main className="settings-main">
        <header className="settings-header">
          <div className="settings-user-info">
            <div className="settings-icon-bg">
              <Building2 size={20} className="settings-icon-light" />
            </div>
            <h2 className="settings-username">{user?.name || "The Daily News"}</h2>
          </div>
          <div className="settings-user-avatar">
            <User size={20} />
          </div>
        </header>

        <div className="settings-container">
          <h1 className="settings-title">Settings</h1>

          <div className="settings-sections">
            {/* Company Name */}
            <div className="settings-section">
              <div className="settings-section-info">
                <div className="settings-icon-bg">
                  <Building2 size={20} className="settings-icon-light" />
                </div>
                <div>
                  <span className="settings-section-label">Company Name</span>
                  <p className="settings-section-value">{user?.name || "Loading..."}</p>
                </div>
              </div>
              <button className="settings-section-action">Edit Name</button>
            </div>

            {/* Email */}
            <div className="settings-section">
              <div className="settings-section-info">
                <div className="settings-icon-bg">
                  <Mail size={20} className="settings-icon-light" />
                </div>
                <div>
                  <span className="settings-section-label">Email Address</span>
                  <p className="settings-section-value">{user?.email || "Loading..."}</p>
                </div>
              </div>
              <button className="settings-section-action">Change Email</button>
            </div>

            {/* Security */}
            <div className="settings-section">
              <div className="settings-section-info">
                <div className="settings-icon-bg">
                  <ShieldCheck size={20} className="settings-icon-light" />
                </div>
                <div>
                  <span className="settings-section-label">Account Status</span>
                  <p className="settings-section-value">Verified Employer</p>
                </div>
              </div>
              <span className="settings-status-badge">Active</span>
            </div>
          </div>

          <div className="settings-save-btn-wrapper">
            <button className="settings-save-btn">Save All Changes</button>
          </div>
        </div>
      </main>
    </div>
  );
}
