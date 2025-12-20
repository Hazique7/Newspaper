"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

// Define the API URL (Update port if needed)
const API_URL = "http://localhost:5000/api/users";

type User = { _id: string; name: string; email: string; role: string };

type AuthContextType = {
  user: User | null;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. Check if user is logged in on initial load (Persistent Session)
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch(`${API_URL}/profile`, {
          credentials: "include", 
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        // CHANGE THIS LINE: Use log instead of error, or just leave empty
        console.log("Guest user - session not found"); 
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  // 2. Login Function
  const login = async ({ email, password }: any) => {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");

    // After login, fetch the profile to get user details
    const profileRes = await fetch(`${API_URL}/profile`, { credentials: "include" });
    const userData = await profileRes.json();
    setUser(userData);
    router.push("/dashboard");
  };

  // 3. Register Function
  const register = async (formData: any) => {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed");
    
    // Redirect to login after success
    router.push("/login");
  };

  // 4. Logout Function
  const logout = async () => {
    await fetch(`${API_URL}/logout`, { method: "POST", credentials: "include" });
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};