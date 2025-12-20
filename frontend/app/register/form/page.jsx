import React, { useState } from 'react';
import { 
  Briefcase, Newspaper, PenTool, CheckCircle, User, Mail, Lock, Phone, Camera, LayoutDashboard, Users, Settings, LogOut, Clock, ArrowRight, X
} from 'lucide-react';

// Initial Mock Data
const INITIAL_JOBS = [
  { _id: '1', title: 'Senior Frontend Engineer', category: 'Engineering', location: 'Remote', description: 'We are looking for a React expert to help us build the future of collaborative software.' },
  { _id: '2', title: 'Product Designer', category: 'Design', location: 'New York, NY', description: 'Join our design team to create beautiful, intuitive interfaces.' },
  { _id: '3', title: 'Backend Developer (Go)', category: 'Engineering', location: 'Remote / Europe', description: 'Help us scale our distributed systems with high reliability.' },
  { _id: '4', title: 'Growth Marketer', category: 'Marketing', location: 'Austin, TX', description: 'Drive user acquisition and retention through data-driven experiments.' }
];

const INITIAL_APPLICANTS = [
  { id: '101', name: 'Sarah Chen', email: 'sarah.c@gmail.com', role: 'Senior Frontend Engineer', status: 'In Review', date: '2024-03-15' },
  { id: '102', name: 'James Wilson', email: 'j.wilson@outlook.com', role: 'Product Designer', status: 'Shortlisted', date: '2024-03-14' },
  { id: '103', name: 'Elena Rodriguez', email: 'elena.rod@tech.io', role: 'Backend Developer (Go)', status: 'New', date: '2024-03-16' },
];

const CATEGORIES = ['All', 'Engineering', 'Design', 'Marketing', 'Operations', 'Sports'];

/**
 * Signup View Component
 */
function SignupView({ onSignupSuccess, onBackToLogin }) {
  const [role, setRole] = useState('JobSeeker'); // 'Newspaper' or 'JobSeeker'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: role
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulating API registration
    setTimeout(() => {
      onSignupSuccess();
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex flex-col items-center justify-center p-6 font-sans text-black relative overflow-hidden">
      <div className="absolute top-10 left-10 flex items-center gap-3">
        <div className="bg-black p-2 rounded-xl">
          <Briefcase className="text-[#F5F5DC]" size={24} />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tighter">NewsConnect</h1>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 max-w-6xl w-full relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        {/* Left Side: Branding/Illustration */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="w-64 h-64 md:w-80 md:h-80 bg-white/30 border-2 border-dashed border-black/10 rounded-[60px] flex flex-col items-center justify-center mb-8 relative">
             <div className="absolute inset-0 bg-[#F5F5DC] blur-3xl -z-10 opacity-50"></div>
             <Newspaper size={80} className="text-black/20 mb-4" strokeWidth={1} />
             <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Newsroom Entry</p>
          </div>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4">
            Join the <br /> <span className="text-gray-400">Network.</span>
          </h2>
          <p className="text-gray-500 font-bold max-w-sm">
            Connecting the world's best journalists with the most prestigious newsrooms.
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 bg-transparent border border-black/20 rounded-[60px] p-8 md:p-16 backdrop-blur-sm">
          <div className="flex gap-2 mb-10">
            {['JobSeeker', 'Newspaper'].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  role === r ? 'bg-black text-white shadow-xl' : 'bg-white/50 text-gray-400 border border-black/5 hover:border-black/20'
                }`}
              >
                {r === 'Newspaper' ? 'Newspaper Co.' : 'Journalist'}
              </button>
            ))}
          </div>

          <p className="font-black text-xs uppercase tracking-[0.2em] text-gray-400 mb-8 border-b border-black/10 pb-4">
            Registering as: <span className="text-black">{role === "Newspaper" ? "Newspaper Company" : "Journalist / Writer"}</span>
          </p>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <User className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                required
                type="text"
                placeholder={role === "Newspaper" ? "Newspaper Name" : "Full Name"}
                className="w-full bg-transparent border-b border-black/20 focus:border-black py-4 pl-8 outline-none placeholder:text-gray-300 font-bold text-lg transition-all"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                required
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent border-b border-black/20 focus:border-black py-4 pl-8 outline-none placeholder:text-gray-300 font-bold text-lg transition-all"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                required
                type="password"
                placeholder="Secure Password"
                className="w-full bg-transparent border-b border-black/20 focus:border-black py-4 pl-8 outline-none placeholder:text-gray-300 font-bold text-lg transition-all"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                type="text"
                placeholder="Phone Number (Optional)"
                className="w-full bg-transparent border-b border-black/20 focus:border-black py-4 pl-8 outline-none placeholder:text-gray-300 font-bold text-lg transition-all"
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8">
              <button 
                type="button"
                onClick={onBackToLogin}
                className="text-[10px] font-black uppercase tracking-widest underline hover:text-gray-500 transition-colors"
              >
                Already registered? Login
              </button>
              <button 
                disabled={isSubmitting}
                type="submit"
                className="w-full md:w-auto bg-black text-[#F5F5DC] px-16 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/10 disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : 'Continue'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/**
 * Login View Component
 */
function LoginView({ onLogin, onRegister }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onLogin(formData.email);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex flex-col items-center justify-center p-6 font-sans text-black relative overflow-hidden">
      <div className="absolute top-10 left-10 flex items-center gap-3">
        <div className="bg-black p-2 rounded-xl">
          <Briefcase className="text-[#F5F5DC]" size={24} />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tighter">NewsConnect</h1>
      </div>

      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-black/5 rounded-full blur-3xl"></div>
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-black/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 bg-transparent border border-black/20 rounded-[60px] p-12 md:p-20 w-full max-w-xl backdrop-blur-sm animate-in zoom-in-95 duration-500">
        <div className="text-center mb-12">
          <div className="inline-flex bg-black text-white p-4 rounded-3xl mb-6 shadow-xl shadow-black/10">
            <Lock size={32} />
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Login</h2>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Welcome back to the newsroom</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2 ml-4">Email Address</label>
            <input 
              required
              type="email" 
              placeholder="enter your email address"
              className="w-full bg-white/50 border border-black/20 focus:border-black rounded-full py-5 px-8 outline-none placeholder:text-gray-300 font-bold transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2 ml-4">Password</label>
            <input 
              required
              type="password" 
              placeholder="enter your password"
              className="w-full bg-white/50 border border-black/20 focus:border-black rounded-full py-5 px-8 outline-none placeholder:text-gray-300 font-bold transition-all"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6">
            <span className="text-[10px] font-black uppercase tracking-widest cursor-pointer underline hover:text-gray-500 transition-colors">
              forgot password?
            </span>
            <button 
              disabled={isSubmitting}
              className="w-full md:w-auto bg-black text-[#F5F5DC] px-16 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/10 disabled:opacity-50"
            >
              {isSubmitting ? 'Verifying...' : 'Login'}
            </button>
          </div>
        </form>

        <div className="mt-12 text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Don&apos;t have an account? <span onClick={onRegister} className="text-black cursor-pointer underline hover:text-gray-600">Register</span>
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Sidebar Component
 */
function Sidebar({ activeView, setActiveView, userRole, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'jobs', label: 'Browse Jobs', icon: Briefcase },
    ...(userRole === 'Newspaper' ? [{ id: 'applicants', label: 'Applicants', icon: Users }] : []),
    { id: 'profile', label: 'User Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-black text-white p-8 flex flex-col z-40 hidden md:flex">
      <div className="flex items-center gap-3 mb-16">
        <div className="bg-[#F5F5DC] p-2 rounded-xl">
          <Briefcase className="text-black" size={24} />
        </div>
        <span className="text-xl font-black uppercase tracking-tighter">Flow</span>
      </div>

      <nav className="flex-1 space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center gap-4 py-4 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeView === item.id 
              ? 'bg-[#F5F5DC] text-black shadow-lg' 
              : 'text-gray-500 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>

      <button 
        onClick={onLogout}
        className="flex items-center gap-4 text-gray-500 hover:text-white mt-auto py-4 px-6 text-[10px] font-black uppercase tracking-widest"
      >
        <LogOut size={18} />
        Sign Out
      </button>
    </aside>
  );
}

/**
 * Applicant Table Component
 */
function ApplicantTable({ applicants, onViewApplicant }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Applicant</th>
            <th className="py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Position</th>
            <th className="py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
            <th className="py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Applied Date</th>
            <th className="py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {applicants.map((app) => (
            <tr key={app.id} className="border-b border-white/5 group hover:bg-white/5 transition-colors">
              <td className="py-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-[#F5F5DC]">
                    {app.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold">{app.name}</p>
                    <p className="text-xs text-gray-500">{app.email}</p>
                  </div>
                </div>
              </td>
              <td className="py-6 font-medium text-sm text-gray-300">{app.role}</td>
              <td className="py-6">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                  app.status === 'Shortlisted' ? 'bg-green-500/20 text-green-400' : 'bg-zinc-800 text-gray-400'
                }`}>
                  {app.status}
                </span>
              </td>
              <td className="py-6 text-sm text-gray-500">{app.date}</td>
              <td className="py-6 text-right">
                <button 
                  onClick={() => onViewApplicant(app)}
                  className="bg-[#F5F5DC] text-black px-4 py-2 rounded-full text-[10px] font-black uppercase hover:bg-white transition-all"
                >
                  View Resume
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Settings Component
 */
function SettingsView({ user }) {
  return (
    <div className="max-w-4xl mx-auto bg-white/40 border border-black/5 backdrop-blur-xl rounded-[60px] p-12 md:p-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-5xl font-black uppercase tracking-tighter text-center mb-16">Settings</h1>
      <div className="space-y-12">
        <div className="flex justify-between items-center border-b border-black/5 pb-6">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Company Name</span>
          <span className="text-2xl font-black tracking-tight">{user.name}</span>
        </div>
        <div className="flex justify-between items-center border-b border-black/5 pb-6">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Email Address</span>
          <span className="text-2xl font-black tracking-tight text-gray-400">{user.email}</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Profile View Component
 */
function ProfileView({ user, onLogout }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white/40 border border-black/5 backdrop-blur-xl rounded-[60px] p-12 md:p-20 relative overflow-hidden text-center">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#F5F5DC] rounded-full blur-3xl opacity-50 -z-10"></div>
        
        <div className="relative inline-block mb-10 group">
          <div className="w-32 h-32 rounded-[40px] bg-black flex items-center justify-center text-[#F5F5DC] shadow-2xl transition-transform group-hover:scale-105 duration-500">
            <User size={64} strokeWidth={1.5} />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#F5F5DC] text-black p-2 rounded-xl shadow-lg border border-black/5">
            <Camera size={16} />
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4">
          Welcome, <br />
          <span className="text-gray-400">{user?.name || "Member"}</span>
        </h1>
        
        <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.3em] mb-16">
          Personal Workspace & Settings
        </p>

        <div className="max-w-md mx-auto space-y-6 text-left mb-16">
           <div className="flex items-center gap-6 bg-white/50 p-6 rounded-[30px] border border-black/5">
              <div className="bg-black p-3 rounded-2xl text-white">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Official Email</p>
                <p className="font-bold text-lg">{user?.email}</p>
              </div>
           </div>

           <div className="flex items-center gap-6 bg-white/50 p-6 rounded-[30px] border border-black/5">
              <div className="bg-black p-3 rounded-2xl text-white">
                <Shield size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Account Access</p>
                <p className="font-bold text-lg uppercase tracking-tight">Verified Member</p>
              </div>
           </div>
        </div>

        <button 
          onClick={onLogout}
          className="bg-black text-[#F5F5DC] px-16 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl active:scale-95 flex items-center gap-3 mx-auto"
        >
          <LogOut size={16} />
          Sign Out of NewsConnect
        </button>
      </div>
    </div>
  );
}

/**
 * Resume Modal Component
 */
function ResumeModal({ applicant, onClose }) {
  if (!applicant) return null;
  const displayData = {
    name: applicant.name || applicant.applicantId?.name,
    email: applicant.email || applicant.applicantId?.email,
    title: applicant.role || applicant.jobId?.title
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[110] p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative bg-white border border-white/40 rounded-[40px] p-10 w-full max-w-xl shadow-2xl animate-in zoom-in-95">
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-400 hover:text-black transition-colors"><X size={24} /></button>
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">{displayData.name}</h2>
          <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Position/ {displayData.title}</p>
        </div>
        <div className="space-y-6">
          <div className="border-b border-black/5 pb-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Email</p>
            <p className="font-bold text-lg">{displayData.email}</p>
          </div>
          <div className="border-b border-black/5 pb-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Education</p>
            <p className="font-bold text-lg">M.S. Applied Engineering</p>
          </div>
        </div>
        <button className="w-full bg-black text-white py-4 rounded-full font-black uppercase mt-8 hover:bg-zinc-800 transition-all">Schedule Interview</button>
      </div>
    </div>
  );
}

/**
 * Post Job Modal
 */
function PostJobModal({ onClose, onPost }) {
  const [jobData, setJobData] = useState({ title: "", category: "Engineering", city: "", description: "" });
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={onClose}></div>
      <form onSubmit={(e) => { e.preventDefault(); onPost({...jobData, _id: Date.now().toString(), location: 'Remote'}); onClose(); }} 
            className="relative bg-white/90 backdrop-blur-2xl rounded-[40px] p-12 w-full max-w-2xl shadow-2xl">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-8">Post a Job</h2>
        <div className="space-y-6">
          <input required placeholder="Job Title" className="w-full bg-transparent border-b-2 border-black/10 focus:border-black py-4 outline-none font-bold text-xl" 
                 onChange={e => setJobData({...jobData, title: e.target.value})} />
          <textarea required placeholder="Description" rows={3} className="w-full bg-transparent border-b-2 border-black/10 focus:border-black py-4 outline-none font-medium"
                    onChange={e => setJobData({...jobData, description: e.target.value})} />
          <button type="submit" className="w-full bg-black text-[#F5F5DC] py-4 rounded-full font-black uppercase tracking-[0.2em] shadow-xl">Confirm Posting</button>
        </div>
      </form>
    </div>
  );
}

/**
 * Job Grid Component
 */
function JobGrid({ jobs, onApply }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {jobs.map((job) => (
        <div key={job._id} className="group bg-black text-white p-8 rounded-[30px] flex flex-col justify-between hover:ring-8 hover:ring-zinc-100 transition-all">
          <div>
            <h4 className="text-2xl font-bold uppercase mb-4 tracking-tighter">{job.title}</h4>
            <div className="flex gap-3 mb-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{job.category}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">•</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{job.location}</span>
            </div>
            <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed mb-8">{job.description}</p>
          </div>
          <button onClick={() => onApply(job.title)} className="bg-[#F5F5DC] text-black py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all flex items-center justify-center gap-2">
            Apply Now <ArrowRight size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

/**
 * Main App Component
 */
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [activeView, setActiveView] = useState('dashboard');
  const [userRole, setUserRole] = useState('Newspaper'); 
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [user, setUser] = useState({ name: "The Daily News", email: "" });

  const handleLogin = (email) => {
    setUser({ ...user, email });
    setIsAuthenticated(true);
    setIsRegistering(false);
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsRegistering(false);
    setUser({ name: "The Daily News", email: "" });
  };

  const handleApply = (title) => {
    setSelectedApplicant({ applicantId: { name: "Sample Candidate", email: "candidate@mail.com" }, jobId: { title } });
  };

  // Auth Flow Handling
  if (!isAuthenticated) {
    if (isRegistering) {
      return (
        <SignupView 
          onSignupSuccess={() => setIsRegistering(false)} 
          onBackToLogin={() => setIsRegistering(false)} 
        />
      );
    }
    return (
      <LoginView 
        onLogin={handleLogin} 
        onRegister={() => setIsRegistering(true)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-black">
      <Sidebar activeView={activeView} setActiveView={setActiveView} userRole={userRole} onLogout={handleLogout} />

      <main className="md:ml-64 min-h-screen p-8 lg:p-12">
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-4">
             <button 
              onClick={() => setActiveView('dashboard')}
              className="md:hidden bg-black p-2 rounded-xl"
             >
               <Briefcase className="text-[#F5F5DC]" size={20} />
             </button>
             <h2 className="text-xl font-black uppercase tracking-tighter">
                {activeView === 'dashboard' ? 'Overview' : activeView}
             </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex bg-zinc-100 px-4 py-2 rounded-2xl gap-2 items-center">
              <span className="text-[10px] font-black uppercase text-gray-400">View as:</span>
              <button onClick={() => setUserRole('Newspaper')} className={`text-[10px] font-black uppercase transition-colors ${userRole === 'Newspaper' ? 'text-black' : 'text-gray-300'}`}>Employer</button>
              <button onClick={() => setUserRole('JobSeeker')} className={`text-[10px] font-black uppercase transition-colors ${userRole === 'JobSeeker' ? 'text-black' : 'text-gray-300'}`}>Seeker</button>
            </div>
            <div 
              onClick={() => setActiveView('profile')}
              className="bg-zinc-100 p-2 rounded-full cursor-pointer hover:bg-zinc-200 transition-all group relative border border-transparent hover:border-black/5"
            >
              <User size={20} />
              <span className="absolute top-full right-0 mt-2 whitespace-nowrap bg-black text-white text-[8px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50">
                View Profile
              </span>
            </div>
          </div>
        </header>

        {activeView === 'dashboard' && (
          <div className="animate-in fade-in duration-700">
            {userRole === 'Newspaper' ? (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                   <h3 className="text-4xl font-black uppercase tracking-tighter">Applicant <br/><span className="text-zinc-300">Management</span></h3>
                   <button 
                     onClick={() => setIsPostModalOpen(true)}
                     className="bg-black text-[#F5F5DC] px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-2xl"
                   >
                     Post a Job!
                   </button>
                </div>
                
                <div className="bg-black rounded-[40px] p-8 md:p-12 shadow-2xl overflow-hidden">
                  <div className="flex items-center gap-3 mb-8 text-[#F5F5DC]">
                    <Clock size={24} />
                    <h3 className="text-2xl font-black uppercase tracking-tight">Recent Applications</h3>
                  </div>
                  <ApplicantTable 
                    applicants={INITIAL_APPLICANTS} 
                    onViewApplicant={(app) => setSelectedApplicant(app)} 
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-12">
                <div className="max-w-2xl">
                  <h3 className="text-6xl font-black uppercase tracking-tighter leading-tight mb-6">Available <br/><span className="text-zinc-300">Opportunities</span></h3>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input placeholder="Search roles..." className="w-full bg-zinc-100 border-none rounded-2xl py-4 pl-12 pr-4 font-bold outline-none" />
                  </div>
                </div>
                <JobGrid jobs={jobs} onApply={handleApply} />
              </div>
            )}
          </div>
        )}

        {activeView === 'jobs' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
             <h3 className="text-4xl font-black uppercase tracking-tighter mb-12">Job Browser</h3>
             <JobGrid jobs={jobs} onApply={handleApply} />
          </div>
        )}

        {activeView === 'settings' && <SettingsView user={user} />}
        
        {activeView === 'profile' && <ProfileView user={user} onLogout={handleLogout} />}

        {activeView === 'applicants' && userRole === 'Newspaper' && (
           <div className="bg-black rounded-[40px] p-12 text-white">
             <h3 className="text-3xl font-black uppercase mb-8 tracking-tighter">Full Applicant Registry</h3>
             <ApplicantTable applicants={INITIAL_APPLICANTS} onViewApplicant={(app) => setSelectedApplicant(app)} />
           </div>
        )}
      </main>

      {/* Modals */}
      {isPostModalOpen && <PostJobModal onClose={() => setIsPostModalOpen(false)} onPost={(newJob) => setJobs(prev => [...prev, newJob])} />}
      {selectedApplicant && <ResumeModal applicant={selectedApplicant} onClose={() => setSelectedApplicant(null)} />}
    </div>
  );
}