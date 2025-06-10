import Lottie from "lottie-react";
import userLogin from "../assets/lottie/userLogin.json"
import AuthContext from "../Context/AuthContext";
import { useContext } from "react";
import SocialLogin from "../Page/Shared/SocialLogin";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

    const { signInUser } = useContext(AuthContext)

    const location = useLocation()
    const from = location.state || "/";

    const navigate = useNavigate()

    // console.log("In login page:", location);

    const handleLogin = (event) => {
        event.preventDefault()

        const form = event.target
        const email = form.email.value
        const password = form.password.value

        const userInfo = {
            email,
            password
        }

        console.log("userInfo", userInfo);

        signInUser(email, password)
            .then((userCredential) => {
                const userData = userCredential.user;
                console.log("user:", userData.email);

                const user = { email: email }

                axios.post('http://localhost:5000/jwt', user, { withCredentials: true })
                    .then(result => {
                        console.log(result.data);
                    })
                // navigate(from)
            })

            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);

            });


    }

    return (
        <div>
            <div className="hero bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        {/* <Lottie animationData={registerLottie} ></Lottie> */}
                        <Lottie animationData={userLogin} ></Lottie>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

                        <div className="flex flex-col justify-center items-center py-5">
                            <p className="text-blue-500 ">
                                Welcome back!
                            </p>

                            <h1 className="text-3xl font-bold">
                                Member Login
                            </h1>
                            <p className="text-gray-600">
                                Access to all features.
                            </p>
                        </div>

                        <form onSubmit={handleLogin} className="card-body">
                            <fieldset className="fieldset">


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



                                <div><a className="link link-hover">Forgot password?</a></div>

                                <button className="btn btn-neutral mt-4">Login</button>
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

export default Login;
