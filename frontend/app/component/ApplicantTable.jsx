// app/component/ApplicantTable.jsx
import api from "../lib/api";

export default function ApplicantTable({ applicants, onViewResume, refreshData }) {
  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/jobs/applications/${id}/status`, { status });
      window.location.reload(); // Simple way to refresh the list
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <table className="w-full text-left border-separate border-spacing-y-2">
      <thead>
        <tr className="text-gray-400 text-sm">
          <th className="pb-4 px-4 font-normal">Applicant</th>
          <th className="pb-4 px-4 font-normal">Position</th>
          <th className="pb-4 px-4 font-normal">Status</th>
          <th className="pb-4 px-4 font-normal text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {applicants.map((app) => (
          <tr key={app._id} className="border-b border-white/10">
            <td onClick={() => onViewResume(app)} className="py-4 px-4 text-white cursor-pointer underline">
              {app.applicantId?.name}
            </td>
            <td className="py-4 px-4 text-white">{app.jobId?.title}</td>
            <td className="py-4 px-4">
              <span className={`px-3 py-1 rounded-md ${app.status === 'Approve' ? 'bg-green-500' : 'bg-red-500'}`}>
                {app.status}
              </span>
            </td>
            <td className="py-4 px-4 flex gap-2 justify-center">
              <button onClick={() => updateStatus(app._id, 'Approve')} className="bg-green-600 px-2 py-1 rounded text-xs">Approve</button>
              <button onClick={() => updateStatus(app._id, 'Reject')} className="bg-red-600 px-2 py-1 rounded text-xs">Reject</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}