import Lottie from "lottie-react";
import formFillUp from "../../assets/lottie/formFillUp.json"
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const JobApply = () => {
    const { id } = useParams()

    const { user } = useAuth()
    const navigate = useNavigate()

    console.log(id, user);



    const submitJobApply = (event) => {
        event.preventDefault()

        const form = event.target

        const linkedIn = form.linkedIn.value
        const github = form.github.value
        const resume = form.resume.value

        const formInfo = {
            linkedIn,
            github,
            resume
        }
        console.log(formInfo);


        const jobApplication = {
            job_id: id,
            application_email: user.email,
            linkedIn,
            github,
            resume
        }

        fetch("http://localhost:5000/job-applications", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(jobApplication)

        }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log("Job Application Payload:", jobApplication);

                if (data.insertedId) {
                    Swal.fire({
                        title: "Data inserted!",
                        icon: "success",
                        draggable: true
                    });
                    navigate("/my-applications")
                }
            })

    }

    return (
        <div>
            <div className="hero bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">

                        <Lottie animationData={formFillUp} ></Lottie>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

                        <div className="flex flex-col justify-center items-center gap-y-3">
                            <p className="text-blue-500">
                                Ready to get started?
                            </p>

                            <h1 className="text-3xl font-bold">
                                Apply for the Job
                            </h1>

                            <p className="text-gray-600 text-center">
                                Please provide accurate information <br />
                                to complete  the process.
                            </p>
                        </div>


                        <div className="card-body">
                            <form onSubmit={submitJobApply} className="fieldset">
                                <input
                                    type="url"
                                    name="linkedIn"
                                    className="input"
                                    placeholder="Enter your LinkedIn Url " />

                                <input
                                    type="url"
                                    name="github"
                                    className="input"
                                    placeholder="Enter your GitHub Url" />

                                <input
                                    type="url"
                                    name="resume"
                                    className="input"
                                    placeholder="Enter your Resume Url" />

                                {/* <input
                                    type="file"
                                    name="resume"
                                    className="input"
                                    placeholder="Enter Your Resume file" /> */}

                                <button className="btn btn-neutral mt-4">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobApply;
