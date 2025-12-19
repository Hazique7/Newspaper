// app/login/page.js
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-black absolute top-10 left-10 tracking-tight">NEWSCONNECT</h1>
      
      <div className="bg-transparent border border-black/20 rounded-[40px] p-16 w-full max-w-xl text-center">
        <h2 className="text-3xl font-black mb-12 tracking-wide">LOGIN</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            type="email" 
            placeholder="enter your email address"
            className="w-full bg-white/50 border border-black rounded-full py-4 px-8 outline-none placeholder:text-gray-400"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" 
            placeholder="enter your password"
            className="w-full bg-white/50 border border-black rounded-full py-4 px-8 outline-none placeholder:text-gray-400"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <div className="flex justify-between items-center pt-4">
            <span className="text-sm cursor-pointer underline">forgot your password?</span>
            <button className="bg-black text-white px-10 py-3 rounded-full font-bold">LOGIN</button>
          </div>
        </form>
      </div>
    </div>
  );
}