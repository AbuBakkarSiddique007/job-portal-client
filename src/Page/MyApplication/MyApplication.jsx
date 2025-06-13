import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyApplication = () => {
    const [jobs, setJobs] = useState([]);
    const { user } = useAuth();

    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        if (!user?.email) return;

        // 1
        // fetch(`http://localhost:5000/job-applications?email=${user.email}`)
        //     .then(res => res.json())
        //     .then(data => setJobs(data))
        //     .catch(err => console.error(err));

        // 2
        // axios.get(`http://localhost:5000/job-applications?email=${user.email}`, { withCredentials: true })
        //     .then(result => setJobs(result.data))

        // 3
        axiosSecure.get(`/job-applications?email=${user.email}`)
            .then(result => setJobs(result.data));

    }, [user.email, axiosSecure]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
                My Applications ({jobs.length})
            </h1>

            <div className="overflow-x-auto">
                <table className="table w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Company</th>
                            <th className="border border-gray-300 px-4 py-2">Job Title</th>
                            <th className="border border-gray-300 px-4 py-2">Location</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {jobs.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    No applications found.
                                </td>
                            </tr>
                        )}

                        {jobs.map(application => (
                            <tr key={application._id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 flex items-center gap-3">
                                    {application.company_logo ? (
                                        <img
                                            src={application.company_logo}
                                            alt={`${application.company} logo`}
                                            className="h-10 w-10 object-contain"
                                        />
                                    ) : (
                                        <div className="h-10 w-10 bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                                            No Logo
                                        </div>
                                    )}
                                    <span>{application.company || 'N/A'}</span>
                                </td>

                                <td className="border border-gray-300 px-4 py-2">{application.title || 'N/A'}</td>
                                <td className="border border-gray-300 px-4 py-2">{application.location || 'N/A'}</td>

                                <td className="border border-gray-300 px-4 py-2">
                                    <button className="btn btn-ghost btn-xs">Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyApplication;
