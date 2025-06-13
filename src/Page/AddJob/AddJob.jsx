import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const AddJob = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleAddJobData = (event) => {
        event.preventDefault();

        const form = event.target;
        const title = form.title.value;
        const company = form.company.value;
        const location = form.location.value;
        const jobType = form.jobType.value;
        const category = form.category.value;
        const applicationDeadline = form.applicationDeadline.value;
        const min = parseInt(form.min.value);
        const max = parseInt(form.max.value);
        const currency = form.currency.value;
        const description = form.description.value;
        const requirements = form.requirements.value.split(',').map(req => req.trim());
        const responsibilities = form.responsibilities.value.split(',').map(res => res.trim());
        const hr_name = form.hr_name.value;
        const hr_email = form.hr_email.value;
        const company_logo = form.company_logo.value;
        const status = form.status.value;

        const newJob = {
            title,
            company,
            location,
            jobType,
            category,
            applicationDeadline,
            salaryRange: {
                min,
                max,
                currency
            },
            description,
            requirements,
            responsibilities,
            hr_name,
            hr_email,
            company_logo,
            status,
            applicationCount: 0
        };

        fetch('https://job-portal-server-drab-iota.vercel.app/jobs', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newJob)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Job created Successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/myPostedJobs");
                }
            });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Post a New Job</h2>

            <form onSubmit={handleAddJobData} className="space-y-4">

                <div>
                    <label className="block font-medium">Job Title</label>
                    <input type="text" name="title" className="input input-bordered w-full" placeholder="Enter your Job title" required />
                </div>

                <div>
                    <label className="block font-medium">Company Name</label>
                    <input type="text" name="company" className="input input-bordered w-full" placeholder="Enter your Company Name" required />
                </div>

                <div>
                    <label className="block font-medium">Job Location</label>
                    <input type="text" name="location" className="input input-bordered w-full" placeholder="Enter the location" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block font-medium">Job Type</label>
                        <select name="jobType" className="select select-bordered w-full" required>
                            <option value="">Select Job Type</option>
                            <option value="Intern">Intern</option>
                            <option value="Remote">Remote</option>
                            <option value="Onsite">Onsite</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-medium">Job Category</label>
                        <select name="category" className="select select-bordered w-full" required>
                            <option value="">Select Category</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Software Engineer">Software Engineer</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Design">Design</option>
                            <option value="Support">Support</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-medium">Application Deadline</label>
                        <input type="date" name="applicationDeadline" className="input input-bordered w-full" defaultValue="2024-12-31" required />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block font-medium">Minimum Salary</label>
                        <input type="number" name="min" className="input input-bordered w-full" placeholder="Min Salary" required />
                    </div>
                    <div>
                        <label className="block font-medium">Maximum Salary</label>
                        <input type="number" name="max" className="input input-bordered w-full" placeholder="Max Salary" required />
                    </div>
                    <div>
                        <label className="block font-medium">Currency</label>
                        <select name="currency" className="select select-bordered w-full" required>
                            <option value="bdt">BDT</option>
                            <option value="usd">USD</option>
                            <option value="eur">EUR</option>
                            <option value="gbp">GBP</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block font-medium">Job Description</label>
                    <textarea name="description" className="textarea textarea-bordered w-full" rows="4" placeholder="Job responsibilities, skills, etc." required></textarea>
                </div>

                <div>
                    <label className="block font-medium">Job Requirements <span className="text-sm text-gray-500">(comma-separated)</span></label>
                    <input type="text" name="requirements" className="input input-bordered w-full" placeholder="JavaScript, React, Node.js, etc." required />
                </div>

                <div>
                    <label className="block font-medium">Job Responsibilities <span className="text-sm text-gray-500">(comma-separated)</span></label>
                    <input type="text" name="responsibilities" className="input input-bordered w-full" placeholder="Develop software, Collaborate with team, etc." required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium">HR Name</label>
                        <input type="text" name="hr_name" className="input input-bordered w-full" placeholder="Enter the HR Name" defaultValue={user?.name || ""} required />
                    </div>
                    <div>
                        <label className="block font-medium">HR Email</label>
                        <input type="email" name="hr_email" defaultValue={user?.email || ""} className="input input-bordered w-full" placeholder="Enter the HR Email" required />
                    </div>
                </div>

                <div>
                    <label className="block font-medium">Company Logo URL</label>
                    <input type="url" name="company_logo" className="input input-bordered w-full" placeholder="https://example.com/logo.png" required />
                </div>

                <div>
                    <label className="block font-medium">Job Status</label>
                    <select name="status" className="select select-bordered w-full" required>
                        <option value="active">Active</option>
                        <option value="closed">Closed</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary mt-4">Submit Job</button>
                </div>
            </form>
        </div>
    );
};

export default AddJob;
