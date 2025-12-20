"use client";

import React, { useState, FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { Briefcase, Lock } from "lucide-react";
import Link from "next/link";
import "./LoginPage.css";

export default function LoginPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await login({ email: formData.email, password: formData.password });
    } catch (err) {
      console.error("Login failed", err);
      setError("Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-brand">
        <div className="login-brand-icon">
          <Briefcase className="login-brand-icon-inner" size={24} />
        </div>
        <h1 className="login-brand-title">NewsConnect</h1>
      </div>

      <div className="login-container">
        <div className="login-header">
          <div className="login-header-icon">
            <Lock size={32} />
          </div>
          <h2 className="login-title">Login</h2>
          <p className="login-subtitle">Welcome back to the newsroom</p>
        </div>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label>Email Address</label>
            <input
              required
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="login-field">
            <label>Password</label>
            <input
              required
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Verifying..." : "Login"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="login-register-link">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
