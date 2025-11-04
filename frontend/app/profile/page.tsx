"use client";

import ProtectedRoute from "../component/ProtectedRoutes";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <div className="p-6 border rounded-md shadow-md">
          <h2 className="text-xl font-bold">Welcome, {user?.name}</h2>
          <p>Email: {user?.email}</p>
        </div>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </ProtectedRoute>
  );
}
