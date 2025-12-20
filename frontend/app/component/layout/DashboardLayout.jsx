"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./DashboardLayout.css"; // We will update this CSS next

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      
      {/* Dynamic Main Content Area */}
      <main 
        className="dashboard-main-content" 
        style={{ marginLeft: isCollapsed ? "80px" : "260px" }} // The Squeeze Effect
      >
        {children}
      </main>
    </div>
  );
}