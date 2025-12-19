// frontend/app/component/PostJobModal.jsx
"use client";
import { useState } from "react";
import api from "../lib/api";

export default function PostJobModal({ onClose }) {
  const [jobData, setJobData] = useState({
    title: "Sports Feature Writer",
    category: "Sports",
    jobType: "Full-time",
    city: "",
    locationType: "Remote",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/jobs", jobData);
      alert("Job Posted Successfully!");
      onClose();
    } catch (err) {
      alert("Error posting job: " + err.response?.data?.error);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-md" onClick={onClose}></div>
      <form onSubmit={handleSubmit} className="relative bg-white/30 backdrop-blur-2xl border border-white/20 rounded-[40px] p-12 w-full max-w-4xl shadow-2xl text-black">
        {/* Render your fields here with onChange handlers */}
        <input 
          placeholder="City" 
          className="bg-transparent border-b border-black w-full mb-4"
          onChange={(e) => setJobData({...jobData, city: e.target.value})}
        />
        <textarea 
          placeholder="Description" 
          className="bg-transparent border-b border-black w-full mb-4"
          onChange={(e) => setJobData({...jobData, description: e.target.value})}
        />
        <button type="submit" className="bg-black text-white px-20 py-3 rounded-full font-black">POST</button>
      </form>
    </div>
  );
}