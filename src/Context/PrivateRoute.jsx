import React, { useContext } from 'react';
import AuthContext from './AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)

    const location = useLocation()

    if (loading) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center gap-3 bg-white">
                <div className="flex gap-2">
                    <span className="loading loading-bars loading-xs text-primary"></span>
                    <span className="loading loading-bars loading-sm text-primary"></span>
                    <span className="loading loading-bars loading-md text-primary"></span>
                    <span className="loading loading-bars loading-lg text-primary"></span>
                    <span className="loading loading-bars loading-xl text-primary"></span>
                </div>
                <p className="mt-4 text-sm text-gray-500">please wait...</p>
            </div>
        );
    }


    if (user) {
        return children;
    }

    return <Navigate to={`/login`} state={location?.pathname}  ></Navigate>
};

export default PrivateRoute;
