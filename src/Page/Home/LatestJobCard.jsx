import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { BsClock } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
    const {
        _id,
        title,
        location,
        jobType,
        applicationDeadline,
        salaryRange: { min, max, currency },
        description,
        company,
        requirements,
        company_logo,
    } = job;

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 w-full max-w-sm">

            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <img
                        src={company_logo}
                        alt="Company Logo"
                        className="w-12 h-12 object-cover rounded-md"
                    />
                    <div>
                        <h3 className="font-semibold text-base text-gray-800">{company}</h3>
                        <p className="flex items-center text-sm text-gray-500 gap-1">
                            <FaMapMarkerAlt className="text-gray-400" /> {location}
                        </p>
                    </div>
                </div>

                <div className="text-green-500 text-xl">⚡</div>
            </div>

            <h2 className="text-lg font-bold text-gray-900 mt-4">{title}</h2>

            <p className="text-sm text-gray-500 flex items-center gap-2 mt-2">
                <BsClock className="text-gray-400" />
                {jobType} <span>•</span> Posted recently
            </p>

            <p className="text-sm text-gray-600 mt-3 line-clamp-3">
               {
                description
               }
            </p>
            {/* <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                {description.length > 100 ? description.slice(0, 100) + '...' : description}
            </p> */}

            <div className="flex flex-wrap gap-2 mt-4">
                {
                    requirements
                }
            </div>
            {/* <div className="flex flex-wrap gap-2 mt-4">
                {requirements.slice(0, 3).map((tech, index) => (
                    <span
                        key={index}
                        className="bg-gray-100 btn btn-primary text-gray-700 text-xs font-medium px-3 py-1 rounded-lg"
                    >
                        {tech}
                    </span>
                ))}
            </div> */}

            <div className="flex justify-between items-center mt-6">
                <p className="text-indigo-600 text-lg font-bold">
                    {currency === 'bdt' ? '৳' : '$'}
                    {min}
                    <span className="text-sm font-medium text-gray-500"> /Month</span>
                </p>
                {/* <button className="text-indigo-600 bg-indigo-100 hover:bg-indigo-200 text-sm font-medium px-4 py-2 rounded-lg transition">
                    Apply Now
                </button>  */}
                <Link to={`/jobs/${_id}`} className='btn btn-accent' >Apply Now</Link>
            </div>
        </div>
    );
};

export default JobCard;
