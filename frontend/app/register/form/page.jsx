"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';

function SignupFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = searchParams.get('role') || 'JobSeeker'; 

  // Local state to manage form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: role // Backend requires role
  });

  const handleContinue = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Navigate to login page on success
        router.push('/login');
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center p-10 text-black">
      <div className="flex flex-col lg:flex-row items-center gap-20 max-w-6xl w-full">
        <div className="w-1/2 flex flex-col items-center">
          {/* Newsie Illustration Area */}
          <div className="w-80 h-80 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-black/20">
            <p className="text-gray-400 font-bold">Illustration Here</p>
          </div>
        </div>

        <div className="w-1/2 space-y-8">
          <h2 className="text-3xl font-black tracking-tighter uppercase">NEWSCONNECT</h2>
          <p className="font-bold text-xl border-b border-black pb-2 tracking-tight">
            Registering as: {role === "Newspaper" ? "Newspaper Company" : "Journalist/Writer"}
          </p>
          
          <form className="space-y-8" onSubmit={handleContinue}>
            <input 
              type="text"
              placeholder={role === "Newspaper" ? "Newspaper Name" : "Full Name"}
              className="w-full bg-transparent border-b border-black py-3 outline-none placeholder:text-gray-400 text-xl"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <input 
              type="email"
              placeholder="Email Address"
              className="w-full bg-transparent border-b border-black py-3 outline-none placeholder:text-gray-400 text-xl"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <input 
              type="password"
              placeholder="Password"
              className="w-full bg-transparent border-b border-black py-3 outline-none placeholder:text-gray-400 text-xl"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
            <input 
              type="text"
              placeholder="Phone Number"
              className="w-full bg-transparent border-b border-black py-3 outline-none placeholder:text-gray-400 text-xl"
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            
            <button 
              type="submit"
              className="mt-8 bg-black text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all active:scale-95"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function SignupForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupFormContent />
    </Suspense>
  );
}