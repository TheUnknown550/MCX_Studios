// src/components/Header.tsx
import React from "react";
import { FaYoutube, FaTiktok } from "react-icons/fa";

const Header: React.FC = () => {
    return (
        <div className="justify-center items-center flex flex-col">

            <header className="w-120 flex flex-col sm:flex-row items-center justify-between p-4 bg-white bg-opacity-60 backdrop-blur-md shadow-md rounded-b-2xl">
                <div className="flex items-center space-x-4">
                    <img
                        src="src/assets/Logo.png" // Replace with your actual profile image path
                        alt="Profile"
                        className="w-14 h-14 rounded-full border border-gray-300 shadow-sm"
                    />
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">MCX_Studios</h1>
                        <p className="text-sm text-gray-500">Explore my creations!</p>
                    </div>
                </div>

                <div className="flex space-x-4 mt-4 sm:mt-0">
                    <a
                        href="https://www.youtube.com/@MCX_Studios24" // replace with your link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-700 transition text-xl"
                    >
                        <FaYoutube />
                    </a>
                    <a
                        href="https://www.tiktok.com/@mcx_studios24" // replace with your link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:text-gray-700 transition text-xl"
                    >
                        <FaTiktok />
                    </a>
                </div>
            </header>
        </div>
    );
};

export default Header;
