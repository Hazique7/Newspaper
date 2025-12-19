// components/ResumeModal.jsx
export default function ResumeModal({ applicant, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Blurred Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-md" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="relative bg-white/40 border border-white/20 backdrop-blur-xl rounded-[40px] p-10 w-full max-w-2xl shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 text-2xl">×</button>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold">{applicant.applicantId.name}'s Resume</h2>
          <p className="tracking-widest uppercase font-semibold text-sm">
            POSITION/ {applicant.jobId.title}
          </p>
        </div>

        <div className="space-y-4 text-lg">
          <p className="border-b border-black/20 pb-1">Full name: {applicant.applicantId.name}</p>
          <p className="border-b border-black/20 pb-1">EMAIL: {applicant.applicantId.email}</p>
          <p className="border-b border-black/20 pb-1">Education: {applicant.applicantId.profile?.education || 'Bachelors'}</p>
          {/* Add other fields from your User profile schema */}
        </div>
      </div>
    </div>
  );
}