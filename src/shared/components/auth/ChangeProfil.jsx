import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axiosInstance from '../../../auth/axios';
import { getUser } from '../../../auth/auth';

const ChangeProfile = () => {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        cne: '',
        facebook: '',
        instagram: '',
        whatsapp: ''
    });
    const userId = getUser()?.id;

    const [isLoading, setIsLoading] = useState(true);

    // Fetch user profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get(`/user/${userId}`);
                setProfile(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching profile:", error);
                toast.error("Erreur lors de la récupération des informations du profil");
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // Handle input changes
    const handleInputChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    // Handle profile update
    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        try {
            await axiosInstance.put(`/user/${userId}`, profile);
            toast.success("Profil mis à jour avec succès");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Une erreur s'est produite lors de la mise à jour du profil");
        }
    };

    if (isLoading) {
        return <div className="text-center mt-10">Chargement...</div>;
    }

    return (
        <div className="max-w-lg mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
            <ToastContainer />
            <h2 className="text-2xl font-semibold mb-6">Mon Profil</h2>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Prénom</label>
                    <input
                        type="text"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Nom</label>
                    <input
                        type="text"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">CNE</label>
                    <input
                        type="text"
                        name="cne"
                        value={profile.cne}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Facebook</label>
                    <input
                        type="text"
                        name="facebook"
                        value={profile.facebook}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Instagram</label>
                    <input
                        type="text"
                        name="instagram"
                        value={profile.instagram}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">WhatsApp</label>
                    <input
                        type="text"
                        name="whatsapp"
                        value={profile.whatsapp}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Mettre à jour
                </button>
            </form>
        </div>
    );
};

export default ChangeProfile;
