import { createBrowserRouter } from "react-router-dom";
import Home from "../Page/Home/Home";
import MainLayout from "../Layout/MainLayout";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import JobDetails from "../Page/JobDetails/JobDetails";
import PrivateRoute from "../Context/PrivateRoute";
import JobApply from "../Page/JobApply/JobApply";
import MyApplication from "../Page/MyApplication/MyApplication";
import AddJob from "../Page/AddJob/AddJob";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <h1>Error 404 not founded!!</h1>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/jobs/:id",
                element: <PrivateRoute> <JobDetails></JobDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/jobs/${params.id}`)
            },
            {
                path: "/jobApply/:id",
                element: <PrivateRoute>
                    <JobApply></JobApply>
                </PrivateRoute>
            },
            {
                path: "/my-applications",
                element: <PrivateRoute>
                    <MyApplication></MyApplication>
                </PrivateRoute>
            },
            {
                path: "/addJob",
                element: <PrivateRoute><AddJob></AddJob></PrivateRoute>
            },
            {
                path: "/register",
                element: <Register></Register>

            },
            {
                path: "/login",
                element: <Login></Login>
            }
        ]
    }
])

export default router;