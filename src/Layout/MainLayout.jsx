import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Page/Shared/Navbar';
import Footer from '../Page/Shared/Footer';

const MainLayout = () => {
    return (
        <div className='max-w-7xl mx-auto border-2 border-gray-600'>

            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>

        </div>
    );
};

export default MainLayout;