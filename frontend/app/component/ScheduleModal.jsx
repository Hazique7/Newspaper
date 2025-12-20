"use client";
import React, { useState } from "react";
import { X, Calendar, Clock, MapPin, Globe } from "lucide-react";
import "./PostJobModal.css"; // We can reuse the modal CSS

export default function ScheduleModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    type: "Online",
    location: ""
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="job-modal-wrapper">
      <div className="job-modal-overlay" onClick={onClose}></div>
      <form onSubmit={handleSubmit} className="job-modal-container">
        <button type="button" onClick={onClose} className="job-modal-close">
          <X size={24} />
        </button>

        <h2 className="job-modal-title">Schedule Interview</h2>
        <p className="text-gray-500 mb-4">Approve candidate and set interview details.</p>

        <div className="job-modal-fields">
          <div className="job-modal-field">
            <label className="job-modal-label"><Calendar size={14}/> Date</label>
            <input 
              required type="date" className="job-modal-input"
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>

          <div className="job-modal-field">
            <label className="job-modal-label"><Clock size={14}/> Time</label>
            <input 
              required type="time" className="job-modal-input"
              onChange={(e) => setFormData({...formData, time: e.target.value})}
            />
          </div>

          <div className="job-modal-field">
            <label className="job-modal-label">Interview Type</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" name="type" value="Online" defaultChecked 
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                /> 
                <Globe size={16}/> Online
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" name="type" value="On-site"
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                /> 
                <MapPin size={16}/> On-site
              </label>
            </div>
          </div>

          <div className="job-modal-field">
            <label className="job-modal-label">
              {formData.type === 'Online' ? 'Meeting Link (Zoom/Meet)' : 'Office Address'}
            </label>
            <input 
              required type="text" className="job-modal-input"
              placeholder={formData.type === 'Online' ? "https://..." : "123 News St."}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>

          <button type="submit" className="job-modal-submit bg-green-600">
            Confirm & Approve
          </button>
        </div>
      </form>
    </div>
  );
}