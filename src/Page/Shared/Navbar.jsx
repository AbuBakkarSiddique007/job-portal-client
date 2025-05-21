import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';

const Navbar = () => {

    const { user, signOutUser } = useContext(AuthContext)

    const handleLogOut = () => {
        signOutUser()
            .then(() => {
                console.log("User sign out successfully.");
                alert("User signOut.")

            })
            .catch((error) => {
                console.log(error);
            })
    }

    const navLinks = ({isActive}) => isActive ? "text-blue font-bold" : "text-red"

    const links =
        <>
            <li> <NavLink to={"/"} className={navLinks} >Home </NavLink> </li>
            <li> <NavLink to={"/about"}  className={navLinks} >About </NavLink> </li>
        </>

    return (
        <div>
            <div className="navbar shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {
                                links
                            }
                        </ul>
                    </div>
                    <a className="font-bold px-5 text-xl">PaisyUI</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            links
                        }
                    </ul>
                </div>

                <div className="navbar-end flex gap-2">
                    {
                        user ?
                            <>
                                <button onClick={handleLogOut} className='btn btn-error'>Log Out</button>
                            </>
                            :
                            <>
                                <Link to="/register">
                                    <button className="btn btn-neutral">Register</button>
                                </Link>

                                <Link to="/login">
                                    <button className="btn btn-neutral">Login</button>
                                </Link>
                            </>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;