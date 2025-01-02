import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../../../assets/fst_background.png";
import campusImage from "../../../assets/fsts-login.png";

import { toast, ToastContainer } from "react-toastify";
import { getUser, login } from "../../../auth/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import apiErrorHandler from "../utili/apiErrorHandler";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(email, password, rememberMe);
      navigate("/"); // Ajustez ce chemin si nécessaire
    } catch (error) {
      const errorMessage = apiErrorHandler(error);
      console.error("Erreur de connexion", errorMessage);
      toast.error(errorMessage);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <ToastContainer />
      <div className="flex bg-white/70 backdrop-blur-3xl rounded-xl shadow-lg overflow-hidden w-3/4 md:w-[70%]">
        <div className="w-full p-6 md:p-8 lg:p-10">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Connexion</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPasswords ? 'text' : 'password'}
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(!showPasswords)}
                  className="absolute inset-y-0 right-0 flex items-center px-3"
                >
                  <FontAwesomeIcon icon={showPasswords ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-700">Se souvenir de moi</label>
              </div>
              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>
            <button type="submit" onClick={handleLogin} className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition">
              Se connecter
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Vous n'avez pas de compte ?{" "}
            <Link to="/sign-up" className="text-blue-500 hover:underline">
              S'inscrire
            </Link>
          </p>
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

export default Login;
