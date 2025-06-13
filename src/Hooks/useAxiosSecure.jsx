import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const axiosInstance = axios.create({
    baseURL: 'https://job-portal-server-drab-iota.vercel.app',
    withCredentials: true
});

const useAxiosSecure = () => {
    const { signOutUser } = useAuth();
    const navigate = useNavigate();

    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            const status = error?.response?.status;

            if (status === 401 || status === 403) {
                Swal.fire({
                    title: 'Session Expired',
                    text: 'You have been logged out. Please log in again.',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                }).then(() => {
                    signOutUser()
                        .then(() => {
                            navigate('/login');
                        })
                        .catch(() => {
                            // Optional: Handle sign-out errors silently
                        });
                });
            }

            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default useAxiosSecure;
