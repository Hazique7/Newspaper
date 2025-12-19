// components/Sidebar.jsx
"use client";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth(); // Destructure the logout function from your context
  const menuItems = ["Dashboard", "Job Posts", "Applicants", "Company Profile", "Settings", "Help"];
  
  return (
    <div className="w-64 bg-black text-white h-screen fixed left-0 top-0 p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-12">
        <div className="w-8 h-8 border-2 border-white rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>
        <h1 className="text-xl font-bold">Dashboard <span className="text-xs font-light">v.01</span></h1>
      </div>
      
      <nav className="flex-1 space-y-4">
        {menuItems.map((item) => (
          <div 
            key={item} 
            className={`p-3 rounded-xl cursor-pointer hover:bg-white/10 ${item === 'Applicants' ? 'bg-white text-black font-bold' : ''}`}
          >
            {item}
          </div>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-500 rounded-full overflow-hidden">
             <img src="/avatar.jpg" alt="user" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-bold">Evano</p>
            <p className="text-xs text-gray-400">Project Manager</p>
          </div>
        </div>
        
        {/* Fixed Logout Button - Removed the bracket citation */}
        <button 
          onClick={logout} 
          className="w-full bg-white text-black py-2 rounded-full font-bold text-sm active:scale-95 transition-transform"
        >
          logout
        </button>
      </div>
    </div>
  );
}