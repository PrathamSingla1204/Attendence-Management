import React from 'react';
import { Link } from 'react-router-dom';

export const AppBar = () => {
    return (
        <div className="border-b flex justify-between px-10 py-4 bg-black">
            <Link to={'/DashBoard'} className="flex flex-col justify-center cursor-pointer">
                <img src="https://skillsyard.com/public/images/logo.png" alt="Logo" style={{ maxWidth: '100px' }} />
            </Link>
            <div>
                <Link to={`/AddStudent`}>
                    <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">Add New Student</button>
                </Link>
                <Link to={`/AddCourse`}>
                    <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">Add New Course</button>
                </Link>
                
                <Link to={`/AddStudentToCourse`}>
                    <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">Add Student To Course</button>
                </Link>
                <Link to={`/`}>
                    <button type="button" className="mr-4 text-white bg-red-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">Log Out</button>
                </Link>
            </div>
        </div>
    );
}
