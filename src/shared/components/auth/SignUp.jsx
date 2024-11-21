import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../../../assets/fstsImg.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importer le CSS de Toastify
import axiosInstance from "../../../auth/axios";
import { useUserContext } from "../../context/UserContext";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    cin: "",
  });

  const { setUserEmail } = useUserContext();

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "Le prénom est obligatoire";
    if (!formData.lastName) newErrors.lastName = "Le nom est obligatoire";
    if (!formData.email) {
      newErrors.email = "L'adresse email est obligatoire";
    } else if (!/.+@uhp\.ac\.ma/.test(formData.email)) {
      newErrors.email = "L'email doit se terminer par : @uhp.ac.ma";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'adresse email n'est pas bien formatée";
    }
    if (!formData.password) {
      newErrors.password = "Le mot de passe est obligatoire";
    } else if (formData.password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
    }
    if (!formData.passwordConfirmation) {
      newErrors.passwordConfirmation = "La confirmation du mot de passe est obligatoire";
    } else if (formData.password !== formData.passwordConfirmation) {
      newErrors.passwordConfirmation = "Les mots de passe ne correspondent pas";
    }
    if (!formData.cin) {
      newErrors.cin = "Le CIN est obligatoire";
    } else if (!/[A-Z]{1,2}[0-9]{4,9}/.test(formData.cin)) {
      newErrors.cin =
        "Le CIN doit contenir 1-2 lettres majuscules suivies de 4-9 chiffres";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Veuillez remplir tous les champs requis");
      return;
    }

    axiosInstance
      .post("/auth/register", formData)
      .then((response) => {
        if (response.status === 202) {
          toast.success("Compte créé avec succès");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            cin: "",
          });
          setUserEmail(formData.email);
          navigate("/confirmation");
        } else {
          toast.error("Une erreur est survenue, veuillez réessayer");
        }
      })
      .catch((error) => {
        console.error("Erreur d'inscription", error);
        toast.error("Une erreur est survenue, veuillez réessayer");
      });
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex flex-col bg-white/70 backdrop-blur-lg rounded-xl shadow-lg w-11/12 max-w-2xl h-[90%]">
        <div className="p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">
            Inscription
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-gray-700">
                Prénom
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700">
                Nom
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700">
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-gray-700">
                Mot de passe
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute text-lg inset-y-0 right-0 pr-3 top-[42%]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="passwordConfirmation"
                className="block text-gray-700"
              >
                Confirmation du mot de passe
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="passwordConfirmation"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.passwordConfirmation}
                onChange={handleChange}
              />
              {errors.passwordConfirmation && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.passwordConfirmation}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="cin" className="block text-gray-700">
                CIN
              </label>
              <input
                type="text"
                id="cin"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.cin}
                onChange={handleChange}
              />
              {errors.cin && (
                <p className="text-red-500 text-xs mt-1">{errors.cin}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition"
            >
              S'inscrire
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Vous avez déjà un compte ?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Connexion
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
