"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../component/layout/DashboardLayout";
import { X, Calendar, MapPin, AlertCircle, CheckCircle2, Bell, Clock } from "lucide-react";
import "./DashboardPage.css"; 

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ applicants: 0, activeJobs: 0 });
  
  // Notification Logic
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState(null);
  
  // Track read notifications IDs
  const [readNotifs, setReadNotifs] = useState(new Set());

  useEffect(() => {
    // Load read status from LocalStorage on mount
    const savedReads = JSON.parse(localStorage.getItem("readNotifications") || "[]");
    setReadNotifs(new Set(savedReads));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      // 1. Newspaper Stats
      if (user.role === 'Newspaper') {
        try {
          const res = await fetch("http://localhost:5000/api/jobs/applicants", { credentials: "include" });
          const data = await res.json();
          if (Array.isArray(data)) setStats({ applicants: data.length, activeJobs: 0 });
        } catch (err) { console.error(err); }
      }

      // 2. Job Seeker Notifications
      if (user.role === 'JobSeeker') {
        try {
          const res = await fetch("http://localhost:5000/api/jobs/my-applications", { credentials: "include" });
          const apps = await res.json();

          if (Array.isArray(apps)) {
            const updates = apps
              .filter(app => app.status === 'Approved' || app.status === 'Rejected' || app.status === 'Reject')
              .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

            setNotifications(updates);

            // Pop up logic (Popup logic kept separate from read logic)
            if (updates.length > 0) {
              const newest = updates[0];
              const hasSeenPopup = sessionStorage.getItem(`seen_popup_${newest._id}`);
              if (!hasSeenPopup) {
                setSelectedNotif(newest);
                sessionStorage.setItem(`seen_popup_${newest._id}`, "true");
                markAsRead(newest._id); // Mark as read if popup opens
              }
            }
          }
        } catch (err) { console.error(err); }
      }
    };
    fetchData();
  }, [user]);

  // Helper to mark a notification as read
  const markAsRead = (id) => {
    if (!readNotifs.has(id)) {
        const newReads = new Set(readNotifs).add(id);
        setReadNotifs(newReads);
        localStorage.setItem("readNotifications", JSON.stringify([...newReads]));
    }
  };

  const handleNotificationClick = (notif) => {
    setSelectedNotif(notif);
    setShowDropdown(false);
    markAsRead(notif._id); // Remove highlight
  };

  // Count unread
  const unreadCount = notifications.filter(n => !readNotifs.has(n._id)).length;

  return (
    <DashboardLayout>
      <div className="dashboard-header-row">
        <div>
          <h1 className="dashboard-title">Overview</h1>
          <p className="dashboard-subtitle">Welcome back, {user?.name}</p>
        </div>

        {/* NOTIFICATION BELL */}
        {user?.role === 'JobSeeker' && (
          <div className="notification-wrapper">
            <button className="notification-btn" onClick={() => setShowDropdown(!showDropdown)}>
              <Bell size={20} />
              {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
            </button>

            {/* DROPDOWN */}
            {showDropdown && (
              <div className="notification-dropdown">
                <div className="notification-header">Notifications</div>
                <div className="notification-list">
                  {notifications.length === 0 ? (
                    <div style={{padding:'20px', textAlign:'center', color:'#999', fontSize:'0.9rem'}}>No new updates</div>
                  ) : (
                    notifications.map((notif) => {
                      const isRead = readNotifs.has(notif._id);
                      return (
                        <div 
                          key={notif._id} 
                          className={`notification-item ${!isRead ? 'unread' : ''}`} // Applies styling based on read state
                          onClick={() => handleNotificationClick(notif)}
                        >
                          <div className={`notif-icon ${notif.status === 'Approved' ? 'text-green-600' : 'text-red-500'}`}>
                             {notif.status === 'Approved' ? <CheckCircle2 size={16}/> : <AlertCircle size={16}/>}
                          </div>
                          <div className="notif-content">
                            <h4>{notif.jobId?.title}</h4>
                            <p>Status updated to {notif.status}</p>
                            <span className="notif-time">{new Date(notif.updatedAt).toLocaleDateString()}</span>
                          </div>
                          {!isRead && <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto"></div>}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="dashboard-stats">
        {user?.role === 'Newspaper' ? (
            <>
              <StatCard label="Total Applicants" value={stats.applicants} colorClass="stat-green" />
              <StatCard label="Role" value="Editor" colorClass="stat-blue" />
            </>
        ) : (
            <>
              <StatCard label="Current Status" value="Active" colorClass="stat-green" />
              <StatCard label="Profile Strength" value={user?.profile?.resumeLink ? "100%" : "50%"} colorClass="stat-purple" />
              <StatCard label="Applications" value={notifications.length} colorClass="stat-blue" />
            </>
        )}
      </div>

      {/* MODAL */}
      {selectedNotif && (
          <div className="modal-overlay">
            <div className="modal-container">
              <div className={`modal-header ${selectedNotif.status === 'Approved' ? 'approved' : 'rejected'}`}>
                <div className="modal-title-row">
                  {selectedNotif.status === 'Approved' ? <><CheckCircle2 size={22}/> Interview Scheduled</> : <><AlertCircle size={22}/> Application Update</>}
                </div>
                <button onClick={() => setSelectedNotif(null)} className="modal-close-btn"><X size={18} /></button>
              </div>

              <div className="modal-body">
                <h3 className="modal-job-title">{selectedNotif.jobId?.title}</h3>
                <p className="modal-job-cat">{selectedNotif.jobId?.category}</p>

                {selectedNotif.status === 'Approved' ? (
                  <>
                    <p className="text-gray-600">Congratulations! Your application has been accepted.</p>
                    <div className="modal-info-box">
                      <div className="modal-detail-row">
                        <Calendar size={18} className="modal-icon"/> 
                        <strong>Date:</strong> {selectedNotif.interviewDate ? new Date(selectedNotif.interviewDate).toDateString() : "TBD"}
                      </div>
                      <div className="modal-detail-row">
                        <Clock size={18} className="modal-icon"/> 
                        <strong>Time:</strong> {selectedNotif.interviewTime || "TBD"}
                      </div>
                      <div className="modal-detail-row" style={{alignItems:'flex-start'}}>
                        <MapPin size={18} className="modal-icon" style={{marginTop:'3px'}}/> 
                        <div>
                          <strong>{selectedNotif.interviewType}</strong>
                          <div className="text-blue-600 text-sm mt-1 break-all">{selectedNotif.interviewLocation}</div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-4 bg-red-50 text-red-800 rounded-lg border border-red-100">
                    We appreciate your interest, but the team has decided not to move forward at this time.
                  </div>
                )}

                <button onClick={() => setSelectedNotif(null)} className={`modal-action-btn ${selectedNotif.status === 'Approved' ? 'approved' : 'rejected'}`}>
                  Close Details
                </button>
              </div>
            </div>
          </div>
      )}
    </DashboardLayout>
  );
}

function StatCard({ label, value, colorClass }) {
  return (
    <div className="stat-card">
      <p className="stat-label">{label}</p>
      <h3 className={`stat-value ${colorClass}`}>{value}</h3>
    </div>
  );
}