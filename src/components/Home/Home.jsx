import React from 'react';
import { Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <div className='bg-base-200 min-h-screen'>
            <div className='bg-sky-300 p-4 text-center text-xl font-bold'>
                <h1>User Management System</h1>
            </div>
            <div className='w-11/12 mx-auto '>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Home;