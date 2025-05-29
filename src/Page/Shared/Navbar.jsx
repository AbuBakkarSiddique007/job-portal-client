import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);

    const handleLogOut = () => {
        signOutUser()
            .then(() => {
                alert("User signed out.");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const navLinks = ({ isActive }) =>
        `transition-all duration-200 px-2 py-1 rounded-md ${isActive
            ? 'text-blue-600 font-bold border-b-2 border-blue-600'
            : 'text-gray-600 hover:text-blue-500'
        }`;

    const links = (
        <>
            <li>
                <NavLink to="/" className={navLinks}>Home</NavLink>
            </li>
            <li>
                <NavLink to="/my-applications" className={navLinks}>My Application</NavLink>
            </li>
            <li>
                <NavLink to="/addJob" className={navLinks}>Add Job</NavLink>
            </li>
            <li>
                <NavLink to="/about" className={navLinks}>About</NavLink>
            </li>
        </>
    );

    return (
        <div className="bg-blue-50">
            <div className="navbar max-w-7xl mx-auto px-4 py-3 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
                            {links}
                        </ul>
                    </div>
                    <Link to="/" className="font-bold text-2xl text-blue-700 px-3">PaisyUI</Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-x-4">
                        {links}
                    </ul>
                </div>

                <div className="navbar-end flex gap-2">
                    {user ? (
                        <button onClick={handleLogOut} className="btn btn-error btn-sm btn-outline">
                            Log Out
                        </button>
                    ) : (
                        <>
                            <Link to="/register">
                                <button className="btn btn-neutral btn-sm">Register</button>
                            </Link>
                            <Link to="/login">
                                <button className="btn btn-outline btn-sm">Login</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
