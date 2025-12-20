"use client";

import { useAuth } from "../../context/AuthContext";
import { LayoutDashboard, Briefcase, Users, Settings, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import "./Sidebar.css";

export default function Sidebar({ isCollapsed, toggleSidebar }) {
  const { user, logout } = useAuth();
  if (!user) return null;

  // Define menu items based on role
  const baseItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/dashboard" },
    { name: "Job Posts", icon: <Briefcase size={20} />, href: "/jobs" },
  ];

  if (user.role === "Newspaper") {
    baseItems.push({ name: "Applicants", icon: <Users size={20} />, href: "/applicants" });
  }

  const menuItems = [
    ...baseItems,
    { name: "Settings", icon: <Settings size={20} />, href: "/dashboard/settings" }
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Header / Toggle */}
      <div className="sidebar-header">
        <div className="sidebar-logo" onClick={toggleSidebar} title="Toggle Menu">
           {/* If collapsed, show Menu icon, else show the Logo/Circle */}
           {isCollapsed ? <Menu size={24} color="white"/> : <div className="sidebar-logo-inner"></div>}
        </div>
        
        {!isCollapsed && (
          <h1 className="sidebar-title">
            Flow <span className="sidebar-version">v.01</span>
          </h1>
        )}
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href} className="sidebar-link" title={isCollapsed ? item.name : ""}>
            <div className="link-icon">{item.icon}</div>
            {!isCollapsed && <span className="sidebar-link-text">{item.name}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button onClick={logout} className="sidebar-logout">
          <LogOut size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}