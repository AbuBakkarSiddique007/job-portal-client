import React, { useEffect, useState } from 'react';
import LatestJobCard from './LatestJobCard';

const LatestJobs = () => {
    const [jobs, setJobs] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/jobs")
            .then((result) => result.json())
            .then((data) => {
                setJobs(data)
                console.log(data);
            })

    }, [])


    return (
        <div>
            <div className='py-5'>
                <h1 className='text-4xl font-bold text-center py-3'>
                    Jobs of the day
                </h1>
                <p className='text-xl text-gray-600 text-center'>
                    Search and connect with the right candidates faster.
                </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-5 py-5 gap-5'>
                {
                    jobs.map(job => <LatestJobCard
                        key={job._id}
                        job={job}
                    ></LatestJobCard>)

                }
            </div>

        </div>
    );
};

export default LatestJobs;