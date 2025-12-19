// app/dashboard/page.jsx
"use client";
import { useAuth } from "../context/AuthContext"; // Use the context we built
import Sidebar from '../component/Sidebar';
import ApplicantTable from '../component/ApplicantTable';
import JobBoard from '../component/JobBoard'; // You'll need this new component
import { useState,useEffect } from "react";

export default function Dashboard() {
  const { user, loading } = useAuth(); //
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!user) return;

    // Fetch different data based on role
    const endpoint = user.role === 'Newspaper' 
      ? '/jobs/applicants' 
      : '/jobs/all'; // Endpoint for Job Seekers to see jobs

    fetch(`http://localhost:5000/api${endpoint}`, { credentials: "include" })
      .then(res => res.json())
      .then(fetchedData => setData(fetchedData));
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex bg-[#F5F5DC] min-h-screen text-black">
      <Sidebar />
      <main className="flex-1 ml-64 p-10">
        <h2 className="text-xl font-bold mb-10">THE DAILY NEWS</h2>

        {user?.role === 'Newspaper' ? (
          <>
            <button className="bg-black text-white px-8 py-4 rounded-3xl font-bold mb-8 text-xl">
              Post a Job!
            </button>
            <div className="bg-black rounded-[40px] p-10 shadow-2xl">
              <h3 className="text-white text-2xl font-bold mb-2">Applicant Management</h3>
              <ApplicantTable applicants={data} />
            </div>
          </>
        ) : (
          <div className="bg-white rounded-[40px] p-10 shadow-xl border border-black/10">
            <h3 className="text-2xl font-bold mb-6">Available Opportunities</h3>
            {/* Create a JobBoard component to show jobs for JobSeekers */}
            <JobBoard jobs={data} /> 
          </div>
        )}
      </main>
    </div>
  );
}