"use client";
import React, { useState } from "react";
import { Briefcase, Newspaper, User, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext"; // <--- ADD THIS LINE
import "./RegisterPage.css";

export default function RegisterPage() {
  const [role, setRole] = useState("JobSeeker");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get the register function from context
  const { register } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Use the register function from AuthContext
      await register({ ...formData, role });
    } catch (err) {
      alert("Registration Failed: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-branding">
        <div className="branding-logo">
          <Briefcase size={24} />
        </div>
        <h1 className="branding-title">NewsConnect</h1>
      </div>

      <div className="register-content">
        {/* Left side */}
        <div className="register-left">
          <div className="register-left-box">
            <Newspaper size={80} className="register-left-icon" />
            <p className="register-left-text">Newsroom Entry</p>
          </div>
          <h2 className="register-left-heading">
            Join the <br /> <span className="register-left-subheading">Network.</span>
          </h2>
        </div>

        {/* Right side */}
        <div className="register-right">
          <div className="role-buttons">
            {["JobSeeker", "Newspaper"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`role-btn ${role === r ? "active" : ""}`}
              >
                {r === "Newspaper" ? "Newspaper Co." : "Journalist"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="input-group">
              <User className="input-icon" size={18} />
              <input
                required
                placeholder={role === "Newspaper" ? "Newspaper Name" : "Full Name"}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="input-group">
              <Mail className="input-icon" size={18} />
              <input
                required
                type="email"
                placeholder="Email Address"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="input-group">
              <Lock className="input-icon" size={18} />
              <input
                required
                type="password"
                placeholder="Secure Password"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button type="submit" className="register-submit" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Continue"}
            </button>
          </form>

          <p className="register-login">
            <Link href="/login">Already registered? Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}