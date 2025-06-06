import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { Link } from 'react-router-dom';

const MyPostedJobs = () => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    console.log(jobs);

    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:5000/jobs?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                console.log("Fetched jobs for:", user.email);
                setJobs(data);
            })
            .catch(err => console.error("Failed to fetch jobs:", err));
    }, [user?.email]);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
                My Posted Jobs ({jobs.length})
            </h1>

            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Logo</th>
                            {/* <th className="border border-gray-300 px-4 py-2">Description</th> */}
                            <th className="border border-gray-300 px-4 py-2">Company</th>
                            <th className="border border-gray-300 px-4 py-2">Application Count</th>
                            {/* <th className="border border-gray-300 px-4 py-2">Location</th> */}
                            {/* <th className="border border-gray-300 px-4 py-2">Type</th> */}
                            {/* <th className="border border-gray-300 px-4 py-2">Category</th> */}
                            <th className="border border-gray-300 px-4 py-2">Salary</th>
                            <th className="border border-gray-300 px-4 py-2">Deadline</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                            {/* <th className="border border-gray-300 px-4 py-2">HR Name</th> */}
                            <th className="border border-gray-300 px-4 py-2">HR Email</th>
                            <th className="border border-gray-300 px-4 py-2">Requirements</th>
                            <th className="border border-gray-300 px-4 py-2">Responsibilities</th>
                            <th className="border border-gray-300 px-4 py-2">View Application</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.length === 0 && (
                            <tr>
                                <td colSpan="13" className="text-center py-4">No jobs found</td>
                            </tr>
                        )}
                        {jobs.map((job) => (
                            <tr key={job._id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {job.company_logo ? (
                                        <img
                                            src={job.company_logo}
                                            alt={`${job.company} logo`}
                                            className="h-10 w-10 object-contain mx-auto"
                                        />
                                    ) : (
                                        <span className="text-gray-400">No Logo</span>
                                    )}
                                </td>
                                {/* <td className="border border-gray-300 px-4 py-2">{job.description || "N/A"}</td> */}
                                <td className="border border-gray-300 px-4 py-2">{job.company || "N/A"}</td>
                                <td className="border border-gray-300 px-4 py-2">{job.applicationCount || "N/A"}</td>
                                {/* <td className="border border-gray-300 px-4 py-2">{job.location || "N/A"}</td> */}
                                {/* <td className="border border-gray-300 px-4 py-2">{job.jobType || "N/A"}</td> */}
                                {/* <td className="border border-gray-300 px-4 py-2">{job.category || "N/A"}</td> */}
                                <td className="border border-gray-300 px-4 py-2">
                                    {job.salaryRange
                                        ? `${job.salaryRange.min} - ${job.salaryRange.max} ${job.salaryRange.currency?.toUpperCase()}`
                                        : "N/A"}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{job.applicationDeadline || "N/A"}</td>
                                <td className="border border-gray-300 px-4 py-2">{job.status || "N/A"}</td>
                                {/* <td className="border border-gray-300 px-4 py-2">{job.hr_name || "N/A"}</td> */}
                                <td className="border border-gray-300 px-4 py-2">{job.hr_email || "N/A"}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {job.requirements && job.requirements.length > 0
                                        ? job.requirements.join(", ")
                                        : "N/A"}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {job.responsibilities && job.responsibilities.length > 0
                                        ? job.responsibilities.join(", ")
                                        : "N/A"}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <Link to={`viewApplications/${job._id}`} className='text-blue-500 underline'>
                                        View Application
                                    </Link>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default MyPostedJobs;
