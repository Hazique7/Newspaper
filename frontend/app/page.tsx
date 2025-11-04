"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-3xl font-bold">📰 Newspaper Hiring Platform</h1>
      <p className="text-gray-600">
        Connect newspapers with writers, editors, and job seekers.
      </p>

      <div className="flex gap-4">
        <Link href="/register">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Register
          </button>
        </Link>
        <Link href="/login">
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}
