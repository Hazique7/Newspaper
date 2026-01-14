"use client";

import React, { useEffect, useState } from "react";
import { MapPin, ArrowRight, Search, PlusCircle, CheckCircle } from "lucide-react";
import "./JobBoard.css"; 
import { useAuth } from "../context/AuthContext";
import PostJobModal from "./PostJobModal";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function JobBoard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [applying, setApplying] = useState(null);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set()); 
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // ✅ 2. UPDATE: Fetch jobs using BASE_URL
        const jobsRes = await fetch(`${BASE_URL}/jobs`);
        const jobsData = await jobsRes.json();
        if (Array.isArray(jobsData)) setJobs(jobsData);

        if (user && user.role === "JobSeeker") {
          // ✅ 3. UPDATE: Fetch applications using BASE_URL
          const appsRes = await fetch(`${BASE_URL}/jobs/my-applications`, { credentials: "include" });
          if (appsRes.ok) {
            const appsData = await appsRes.json();
            setAppliedJobIds(new Set(appsData.map(app => app.jobId?._id)));
          }
        }
      } catch (error) { console.error(error); } 
      finally { setLoading(false); }
    };
    fetchData();
  }, [user]);

  // Filter Logic
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.city?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApply = async (jobId) => {
    if (!user) return alert("Please login to apply");
    setApplying(jobId);
    try {
      // ✅ 4. UPDATE: Apply using BASE_URL
      const res = await fetch(`${BASE_URL}/jobs/apply/${jobId}`, { method: "POST", credentials: "include" });
      const data = await res.json();
      
      if (res.ok) {
        alert("Application Submitted Successfully!");
        setAppliedJobIds(prev => new Set(prev).add(jobId));
      } else { 
        alert(data.error || "Failed to apply"); 
      }
    } catch(e) { 
        alert("Something went wrong"); 
    } finally { 
        setApplying(null); 
    }
  };

  if (loading) return <div className="jobboard-loading">Loading opportunities...</div>;

  return (
    <div className="jobboard-container">
      
      {/* PROFESSIONAL HEADER ROW */}
      <div className="jobboard-header-row" style={{
        display:'flex', 
        alignItems:'center', 
        gap: '30px', 
        marginBottom:'30px'
      }}>
        {/* Title Section */}
        <div style={{ flexShrink: 0 }}>
            <h2 style={{fontSize:'1.8rem', fontWeight:'700', margin:'0', color:'#111'}}>Opportunities</h2>
            <p style={{color:'#666', marginTop:'4px', fontSize:'0.9rem'}}>Find your next role.</p>
        </div>

        {/* Search Bar */}
        <div style={{position:'relative', width:'350px'}}>
            <Search size={18} style={{position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', color:'#9ca3af'}}/>
            <input 
              type="text" 
              placeholder="Search by title, keyword..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width:'100%', 
                padding:'12px 12px 12px 42px', 
                borderRadius:'10px', 
                border:'1px solid #e2e8f0', 
                backgroundColor:'white',
                fontSize:'0.95rem',
                outline:'none',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}
            />
        </div>

        {/* Post Job Button */}
        {user?.role === "Newspaper" && (
          <button className="post-job-btn" onClick={() => setShowModal(true)} style={{ marginLeft: 'auto' }}>
            <PlusCircle size={18} /> Post Job
          </button>
        )}
      </div>

      {filteredJobs.length === 0 ? (
        <div className="jobboard-empty">
          <Search className="jobboard-empty-icon" />
          <h3 className="jobboard-empty-text">No matching roles found</h3>
        </div>
      ) : (
        <div className="jobboard-grid">
          {filteredJobs.map((job) => {
            const isApplied = appliedJobIds.has(job._id);
            return (
              <div key={job._id} className="jobboard-card">
                <div>
                  <h4 className="jobboard-card-title">{job.title}</h4>
                  <div className="jobboard-card-meta">
                    <span className="jobboard-card-category">{job.category}</span>
                    <div className="jobboard-card-separator"></div>
                    <span className="jobboard-card-location"><MapPin size={12} /> {job.city || "Remote"}</span>
                  </div>
                  <p className="jobboard-card-description">{job.description}</p>
                  
                  <div className="jobboard-posted-by" style={{marginTop:'auto', paddingTop:'15px', fontSize:'0.8rem', color:'#94a3b8'}}>
                     Posted by: {job.postedBy?.name || "Unknown"}
                  </div>
                </div>

                {user?.role !== "Newspaper" && (
                  <button
                    className={`jobboard-card-button ${isApplied ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400' : ''}`}
                    disabled={applying === job._id || isApplied}
                    onClick={() => handleApply(job._id)}
                  >
                    {isApplied ? (
                         <>Applied <CheckCircle size={14} /></>
                    ) : applying === job._id ? (
                         "Sending..."
                    ) : (
                         <>Apply Now <ArrowRight size={14} /></>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <PostJobModal 
            onClose={() => setShowModal(false)} 
            onPostSuccess={(newJob) => { 
                setJobs([newJob, ...jobs]); 
                setShowModal(false); 
            }} 
        />
      )}
    </div>
  );
}