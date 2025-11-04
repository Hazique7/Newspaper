"use client";

import { useState } from "react";
import api from "../lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post(
        "/users/register",
        { name, email, password },
        { withCredentials: true } // ✅ ensure cookies are handled
      );
      setMessage(res.data.message);

      // ✅ redirect to login after success
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        onSubmit={handleRegister}
        className="p-6 border rounded-md shadow-md w-80 bg-white"
      >
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700">
          Register
        </button>
      </form>

      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
    </div>
  );
}
