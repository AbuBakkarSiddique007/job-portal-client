import React from 'react';
import { data, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const ViewApplications = () => {
    const applications = useLoaderData();

    const handleSelect = (e, id) => {
        const data = {
            status: e.target.value,

        }

        fetch(`https://job-portal-server-drab-iota.vercel.app/job-applications/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    Swal.fire({
                        title: "Status Updated Successfully.",
                        icon: "success",
                        draggable: true
                    });
                }

            })

    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                Job Applications Summary <span className="text-blue-600">({applications.length})</span>
            </h1>

            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="border border-gray-300 px-4 py-2">SL</th>
                            <th className="border border-gray-300 px-4 py-2">Applicant Email</th>
                            <th className="border border-gray-300 px-4 py-2">LinkedIn</th>
                            <th className="border border-gray-300 px-4 py-2">GitHub</th>
                            <th className="border border-gray-300 px-4 py-2">Resume</th>
                            <th className="border border-gray-300 px-4 py-2">Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app, index) => (
                            <tr key={app._id}>
                                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{app.application_email}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <a
                                        href={app.linkedIn}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        LinkedIn
                                    </a>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <a
                                        href={app.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        GitHub
                                    </a>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <a
                                        href={app.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        Resume
                                    </a>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <select
                                        onChange={(e) => handleSelect(e, app._id)}
                                        defaultValue={app.status || "Change Status"}
                                        className="select select-sm">

                                        <option disabled>Change Status</option>
                                        <option>Under Review</option>
                                        <option>Set Interview</option>
                                        <option>Hired</option>
                                        <option>Rejected</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewApplications;
