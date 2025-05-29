import { Link, useLoaderData } from "react-router-dom";

const JobDetails = () => {
    const jobs = useLoaderData();
    const {
        _id,
        title,
        location,
        jobType,
        category,
        applicationDeadline,
        salaryRange,
        description,
        company,
        requirements,
        responsibilities,
        status,
        hr_email,
        hr_name,
        company_logo
    } = jobs;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 md:p-8 bg-gradient-to-r from-blue-600 to-indigo-700">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <img
                            src={company_logo}
                            alt={`${company} logo`}
                            className="w-20 h-20 rounded-lg object-cover border-2 border-white"
                        />
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
                            <p className="text-lg opacity-90">{company}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                                    📍 {location}
                                </span>
                                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                                    🏢 {jobType}
                                </span>
                                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                                    🏷️ {category}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 md:p-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-blue-800">💵 Salary Range</h3>
                            <p className="text-lg">
                                {salaryRange.min.toLocaleString()} - {salaryRange.max.toLocaleString()} {salaryRange.currency.toUpperCase()}
                            </p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-purple-800">⏰ Deadline</h3>
                            <p className="text-lg">
                                {new Date(applicationDeadline).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-bold mb-3 text-gray-800">📝 Job Description</h2>
                        <p className="text-gray-700 leading-relaxed">{description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h2 className="text-xl font-bold mb-3 text-gray-800">✅ Requirements</h2>
                            <ul className="list-disc pl-5 space-y-2">
                                {requirements.map((req, index) => (
                                    <li key={index} className="text-gray-700">{req}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mb-3 text-gray-800">📌 Responsibilities</h2>
                            <ul className="list-disc pl-5 space-y-2">
                                {responsibilities.map((resp, index) => (
                                    <li key={index} className="text-gray-700">{resp}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h2 className="text-xl font-bold mb-3 text-gray-800">📩 Contact HR</h2>
                        <div className="flex items-center gap-3">
                            <div className="bg-indigo-100 p-3 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold">{hr_name}</p>
                                <a href={`mailto:${hr_email}`} className="text-blue-600 hover:underline">
                                    {hr_email}
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Link to={`/jobApply/${_id}`} >
                            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200">
                                🚀 Apply Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;