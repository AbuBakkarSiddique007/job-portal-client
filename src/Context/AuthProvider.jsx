import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // 01. Create a password-based account
    const createUser = (email, password) => {

        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // 02. Sign in a user with an email address and password
    const signInUser = (email, password) => {
        setLoading(true)

        return signInWithEmailAndPassword(auth, email, password)
    }

    // 04. Google Loign
    const googleLogin = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // 03. To sign out a user
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }


    // Get the currently signed-in user
    // Observe
    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log("State captured", currentUser);


            setLoading(false)
        })
        return () => {
            unsubcribe()
        }
    }
        , [])



    const userInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signOutUser,
        googleLogin
    }

    return (
        <div>
            <AuthContext.Provider value={userInfo}>
                {
                    children
                }
            </AuthContext.Provider>

        </div>
    );
};

export default AuthProvider;