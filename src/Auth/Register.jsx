import Lottie from "lottie-react";
import registerLottie from "../assets/lottie/registerLottie.json";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import SocialLogin from "../Page/Shared/SocialLogin";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";


const Register = () => {

    const { createUser } = useContext(AuthContext)

    const location = useLocation()
    const from = location.state || "/";

    const navigate = useNavigate()


    const handleRegisterForm = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const url = form.url.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!passwordRegex.test(password)) {
            return Swal.fire({
                icon: 'warning',
                title: 'Password Requirements',
                text: "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.",
            });
        }

        if (password !== confirmPassword) {
            return Swal.fire({
                icon: 'error',
                title: 'Password Mismatch',
                text: "Password did not match",
            });
        }

        if (password === confirmPassword) {
            Swal.fire({
                icon: 'success',
                title: 'User Created Successfully',
                timer: 2000,
                showConfirmButton: false
            });
        }

        createUser(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate(from)


            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Cool'
                });
            });
    };


    return (
        <div>
            <div className="hero bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <Lottie animationData={registerLottie} ></Lottie>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

                        <div className="flex flex-col justify-center items-center py-5">
                            <p className="text-blue-500 ">
                                Register
                            </p>

                            <h1 className="text-3xl font-bold">
                                Start for free Today
                            </h1>
                            <p className="text-gray-600">
                                Access to all features.
                            </p>
                        </div>

                        <form onSubmit={handleRegisterForm} className="card-body">
                            <fieldset className="fieldset">
                                <input
                                    type="text"
                                    name="name"
                                    className="input"
                                    placeholder="Enter Your Name" />

                                <input
                                    type="url"
                                    name="url"
                                    className="input"
                                    placeholder="Profile Image URL " />

                                <input
                                    type="email"
                                    name="email"
                                    className="input"
                                    placeholder="Enter your Email " />

                                <input
                                    type="password"
                                    name="password"
                                    className="input"
                                    placeholder="Password" />

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="input"
                                    placeholder="Confirm Password" />

                                <div><a className="link link-hover">Forgot password?</a></div>

                                <button className="btn btn-neutral mt-4">Register</button>
                            </fieldset>
                        </form>

                        <div>
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
