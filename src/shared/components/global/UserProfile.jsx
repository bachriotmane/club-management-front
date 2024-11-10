import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../auth/auth';

const UserProfile = ({ user, nom }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const getOut = () => {
        logout();
        navigate('/login');
    };

    const handleToggle = () => setIsOpen(!isOpen);

    return (
        <div className="relative" >
            <button onClick={handleToggle} className="flex items-center space-x-3 focus:outline-none">
                <img src={user.avatar} alt="User Avatar" className="w-12 h-12 rounded-full border-2 border-gray-300" />
                <span className="text-gray-800 font-semibold">{user.name}</span>
                <svg className={`w-5 h-5 transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                    <div className="p-4 border-b border-gray-200">
                        <h3 className="text-gray-900 font-semibold text-lg">{user.name}</h3>
                        <p className="text-gray-600 text-sm">{user.email}</p>
                    </div>
                    <div className="p-2">
                        <Link to={`${nom}/profile`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                            profile
                        </Link>
                        <Link to={`${nom}/change-password`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                            changePassword
                        </Link>
                        <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={getOut}>
                            logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
