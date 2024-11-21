import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../../assets/fstsImg.jpg";
import campusImage from "../../../assets/fstsImg.jpg";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../../../auth/axios";

const ForgetPassword = () => {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas !');
      return;
    }

    try {
      await axiosInstance.post('/auth/reset-password', { token: code, password });
      toast.success('Mot de passe réinitialisé avec succès !');
      navigate('/login');
    } catch (error) {
      console.error("Erreur lors de la réinitialisation du mot de passe !", error);
      toast.error("Échec de la réinitialisation du mot de passe.");
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <ToastContainer />
      <div className="flex bg-white/70 backdrop-blur-3xl rounded-xl shadow-lg overflow-hidden w-3/4 md:w-[70%] ">
        <div className="w-full p-6 md:p-8 lg:p-10">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Réinitialiser le mot de passe</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="code" className="block text-gray-700">Code</label>
              <input
                type="text"
                id="code"
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="new_password" className="block text-gray-700">Nouveau mot de passe</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirm_password" className="block text-gray-700">Confirmer le mot de passe</label>
              <input
                type="password"
                id="confirm_password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition">
              Réinitialiser le mot de passe
            </button>
          </form>
          <p className="text-center text-gray-500 text-xs mt-6">
            Copyright FST Settat
          </p>
        </div>
        <div className="hidden md:block md:w-full">
          <img src={campusImage} alt="Campus" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
