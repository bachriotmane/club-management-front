import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../../../auth/axios';
import { getUser, logout } from '../../../auth/auth';

const ChangePasswordPage = () => {
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [showPasswords, setShowPasswords] = useState(false);
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (passwords.newPassword !== passwords.confirmNewPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            await axiosInstance.post('/auth/change-password', {
                email: getUser().sub,
                oldPassword: passwords.currentPassword,
                newPassword: passwords.newPassword
            });

            toast.success('Password changed successfully');
            logout();
            navigate('/login');
            setPasswords({
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            });
        } catch (error) {
            console.error("Error changing password:", error);
            toast.error("An error occurred, please try again");
        }
    };

    const toggleShowPasswords = () => {
        setShowPasswords(prevShowPasswords => !prevShowPasswords);
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
            <ToastContainer />
            <h2 className="text-2xl font-semibold mb-6">Change Password</h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Current Password</label>
                    <div className="relative">
                        <input
                            type={showPasswords ? 'text' : 'password'}
                            name="currentPassword"
                            value={passwords.currentPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <button
                            type="button"
                            onClick={toggleShowPasswords}
                            className="absolute inset-y-0 right-0 flex items-center px-3"
                        >
                            <FontAwesomeIcon icon={showPasswords ? faEyeSlash : faEye} />
                        </button>
                    </div>
                </div>
                <div>
                    <label className="block text-gray-700">New Password</label>
                    <div className="relative">
                        <input
                            type={showPasswords ? 'text' : 'password'}
                            name="newPassword"
                            value={passwords.newPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <button
                            type="button"
                            onClick={toggleShowPasswords}
                            className="absolute inset-y-0 right-0 flex items-center px-3"
                        >
                            <FontAwesomeIcon icon={showPasswords ? faEyeSlash : faEye} />
                        </button>
                    </div>
                </div>
                <div>
                    <label className="block text-gray-700">Confirm NewPassword</label>
                    <div className="relative">
                        <input
                            type={showPasswords ? 'text' : 'password'}
                            name="confirmNewPassword"
                            value={passwords.confirmNewPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <button
                            type="button"
                            onClick={toggleShowPasswords}
                            className="absolute inset-y-0 right-0 flex items-center px-3"
                        >
                            <FontAwesomeIcon icon={showPasswords ? faEyeSlash : faEye} />
                        </button>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                   Change Password
                </button>
            </form>
        </div>
    );
};

export default ChangePasswordPage;
