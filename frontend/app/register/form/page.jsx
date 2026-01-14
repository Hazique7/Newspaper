// app/register/form/page.js
"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import { useAuth } from "@/app/context/AuthContext";

// We need a wrapper component for Suspense when using useSearchParams in Next.js
export default function SignupFormWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupFormContent />
    </Suspense>
  );
}

function SignupFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { register } = useAuth();
  
  // 1. Get Role from URL (default to JobSeeker if missing)
  const rawRole = searchParams.get('role');
  const role = rawRole === 'Newspaper' ? 'Newspaper' : 'JobSeeker';

  // 2. State for inputs
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    phone: '' 
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 3. Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 4. Handle Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Basic Client Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    try {
      // Call AuthContext Register
      // Note: We don't send 'phone' or 'confirmPassword' to backend as User.js doesn't have them
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: role, 
      });
      
      // Redirect is handled in AuthContext, or we can force it here
      // router.push('/login'); 
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center p-10">
      <div className="flex flex-col lg:flex-row items-center gap-20 max-w-6xl w-full">
        
        {/* Newsie Illustration Area */}
        <div className="w-1/2 flex flex-col items-center">
           {/* Ensure this image exists in your public folder */}
          <img src="/newsie-illustration.png" alt="Newsie" className="w-80 mb-8" />
        </div>

        {/* Form Area */}
        <div className="w-1/2 space-y-8">
          <h2 className="text-3xl font-black mb-10 tracking-tighter uppercase">
            {role === 'Newspaper' ? 'Newspaper Signup' : 'Join NewsConnect'}
          </h2>

          {error && (
            <div className="p-3 bg-red-100 text-red-600 font-bold text-sm uppercase">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Name */}
            <div className="relative">
              <input 
                name="name"
                type="text"
                required
                placeholder={role === "Newspaper" ? "Publication Name" : "Full Name"}
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-black py-2 outline-none placeholder:text-gray-400 text-xl font-bold"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <input 
                name="email"
                type="email"
                required
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-black py-2 outline-none placeholder:text-gray-400 text-xl font-bold"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input 
                name="password"
                type="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-black py-2 outline-none placeholder:text-gray-400 text-xl font-bold"
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input 
                name="confirmPassword"
                type="password"
                required
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-black py-2 outline-none placeholder:text-gray-400 text-xl font-bold"
              />
            </div>

            {/* Phone (Optional - visual only for now) */}
            <div className="relative">
              <input 
                name="phone"
                type="tel"
                placeholder="Phone Number (Optional)"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-black py-2 outline-none placeholder:text-gray-400 text-xl font-bold"
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="mt-12 bg-black text-white px-12 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform disabled:opacity-50"
            >
              {isSubmitting ? 'Creating Account...' : 'Continue'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}