// app/register/form/page.js
"use client";
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SignupForm() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role'); // Newspaper or JobSeeker
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center p-10">
      <div className="flex flex-col lg:flex-row items-center gap-20 max-w-6xl w-full">
        {/* Newsie Illustration Area */}
        <div className="w-1/2 flex flex-col items-center">
          <img src="/newsie-illustration.png" alt="Newsie" className="w-80 mb-8" />
        </div>

        {/* Form Area */}
        <div className="w-1/2 space-y-8">
          <h2 className="text-3xl font-black mb-10 tracking-tighter uppercase">NEWSCONNECT</h2>
          <div className="space-y-12">
            {["Name", "EMAIL", "Password", "Confirm Password", "Phone Number"].map((label) => (
              <div key={label} className="relative">
                <input 
                  type={label.includes("Password") ? "password" : "text"}
                  placeholder={label === "Name" ? `${role} Name` : label}
                  className="w-full bg-transparent border-b border-black py-2 outline-none placeholder:text-gray-400 text-xl"
                />
              </div>
            ))}
          </div>
          <button className="mt-12 bg-black text-white px-12 py-3 rounded-full font-bold text-lg">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}