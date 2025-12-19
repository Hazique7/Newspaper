export default function JobBoard({ jobs }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {jobs.map((job) => (
        <div key={job._id} className="bg-black text-white p-8 rounded-[30px] flex flex-col justify-between">
          <div>
            <h4 className="text-2xl font-bold uppercase">{job.title}</h4>
            <p className="text-gray-400 text-sm mb-4">{job.category}</p>
            <p className="text-sm line-clamp-3">{job.description}</p>
          </div>
          <button className="mt-6 bg-[#F5F5DC] text-black py-2 rounded-full font-bold">
            Apply Now
          </button>
        </div>
      ))}
    </div>
  );
}