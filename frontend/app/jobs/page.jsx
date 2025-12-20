"use client";
import React from "react";
import DashboardLayout from "../component/layout/DashboardLayout"; // Use the layout wrapper
import JobBoard from "../component/JobBoard";
import { useAuth } from "../context/AuthContext";

export default function JobsPage() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <DashboardLayout>
      {/* The Layout handles Sidebar and spacing automatically */}
      <JobBoard />
    </DashboardLayout>
  );
}