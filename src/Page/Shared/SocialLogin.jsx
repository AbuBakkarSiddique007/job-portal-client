import React, { useContext } from 'react';
import AuthContext from '../../Context/AuthContext';
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
    const { googleLogin } = useContext(AuthContext);

    const handleGoogleSignIn = () => {
        googleLogin()
            .then(result => {
                console.log(result.user);
                alert("Google sign-in successful!");
            })
            .catch(error => {
                console.log(error.message);
                alert("Google sign-in failed: " + error.message);
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
