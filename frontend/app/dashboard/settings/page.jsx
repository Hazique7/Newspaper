"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function SettingsPage() {
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    // Fetch user profile using the protected route
    fetch("http://localhost:5000/api/users/profile", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  return (
    <div className="flex bg-[#F5F5DC] min-h-screen text-black font-sans">
      <Sidebar />
      <main className="flex-1 ml-64 p-12">
        <div className="flex justify-between items-center mb-20">
          <h2 className="text-xl font-bold uppercase tracking-tight">THE DAILY NEWS</h2>
          <div className="bg-white rounded-full px-6 py-2 border border-black/10 flex items-center gap-2">
             <span className="text-gray-400">Search</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-transparent border border-black/20 rounded-[40px] p-20 relative">
          <h1 className="text-5xl font-black text-center mb-16 tracking-tight">Settings</h1>
          
          <div className="space-y-12 text-2xl uppercase font-bold tracking-tighter">
            <div className="flex gap-4">
              <span>COMPANY NAME :</span>
              <span className="font-light">{user.name || "Loading..."}</span>
            </div>
            
            <div className="flex gap-4">
              <span>PASSWORD :</span>
              <span className="font-light">T** ***** ***S</span>
            </div>
            
            <div className="flex gap-4">
              <span>EMAIL :</span>
              <span className="font-light">{user.email || "Loading..."}</span>
            </div>
          </div>

          <div className="flex justify-center mt-20">
            <button className="bg-black text-white px-16 py-3 rounded-full font-black text-lg hover:scale-105 transition-transform">
              SAVE CHANGES
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}