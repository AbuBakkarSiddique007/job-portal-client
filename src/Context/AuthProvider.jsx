import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            if (currentUser?.email) {
                const user = { email: currentUser.email };

                axios.post(`https://job-portal-server-drab-iota.vercel.app/jwt`, user, {
                    withCredentials: true
                }).then(() => {
                    setLoading(false);
                    // toast.success(`Logged in as ${currentUser.email}`, { autoClose: 3000 });
                });
            } else {
                axios.post(`https://job-portal-server-drab-iota.vercel.app/logout`, {}, {
                    withCredentials: true
                }).then(() => {
                    setLoading(false);
                    // toast.info('Logged out successfully', { autoClose: 3000 });
                });
            }
        });

        return () => unsubscribe();
    }, []);

    const userInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signOutUser,
        googleLogin
    };

    return (
        <>
            <AuthContext.Provider value={userInfo}>
                {children}
            </AuthContext.Provider>
            <ToastContainer />
        </>
    );
};

export default AuthProvider;
