import React, { useContext } from 'react';
import AuthContext from '../../Context/AuthContext';
import { FcGoogle } from "react-icons/fc";
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { googleLogin } = useContext(AuthContext);

    const location = useLocation()
    const from = location.state || "/";
    const navigate = useNavigate()


    const handleGoogleSignIn = () => {
        googleLogin()
            .then(result => {
                const user = result.user;
                Swal.fire({
                    title: `Welcome, ${user.displayName || 'User'}!`,
                    text: 'Google sign-in successful!',
                    icon: 'success',
                    confirmButtonText: 'Continue'
                });
                navigate(from)
            })
            .catch(error => {
                Swal.fire({
                    title: 'Google Sign-In Failed',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });

            });
    };

    return (
        <div>
            <div className='text-center my-4 font-semibold'>
                Or
            </div>
            <div className='text-center'>
                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-1/2 btn btn-success mb-5"
                >
                    <FcGoogle className="mr-2" />
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;
