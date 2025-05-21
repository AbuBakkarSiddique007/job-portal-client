import { createBrowserRouter } from "react-router-dom";
import Home from "../Page/Home/Home";
import MainLayout from "../Layout/MainLayout";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

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