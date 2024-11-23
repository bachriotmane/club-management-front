import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../../../assets/fst_background.png";
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
    cne: "",
    facebook: "",
    instagram: "",
    whatsapp: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

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
    if (!formData.cne) {
      newErrors.cne = "Le CNE est obligatoire";
    } else if (!/[A-Z]{1,2}[0-9]{4,9}/.test(formData.cne)) {
      newErrors.cne =
        "Le CNE doit contenir 1-2 lettres majuscules suivies de 4-9 chiffres";
    }
    if (profileImage && profileImage.size > 2 * 1024 * 1024) {
      newErrors.profileImage = "L'image de profil doit être inférieure à 2 Mo";
    }
    if (coverImage && coverImage.size > 2 * 1024 * 1024) {
      newErrors.coverImage = "L'image de couverture doit être inférieure à 2 Mo";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e, setImage, setPreview) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size <= 2 * 1024 * 1024) {
        setImage(file);
        setPreview(URL.createObjectURL(file));
      } else {
        toast.error("L'image doit être inférieure à 2 Mo");
      }
    } else {
      toast.error("Veuillez sélectionner un fichier image valide");
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) {
    toast.error("Veuillez remplir tous les champs requis");
    return;
  }

  const formDataToSubmit = new FormData();

  // Serialize the formData object as JSON and append it to the `request` key
  formDataToSubmit.append("request", new Blob([JSON.stringify(formData)], { type: "application/json" }));

  // Append profile and cover images
  if (profileImage) formDataToSubmit.append("profileImage", profileImage);
  if (coverImage) formDataToSubmit.append("coverImage", coverImage);

  try {
    const response = await axiosInstance.post("/auth/register", formDataToSubmit, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status === 202) {
      toast.success("Compte créé avec succès");
      // Reset the form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        cne: "",
        facebook: "",
        instagram: "",
        whatsapp: "",
      });
      setProfileImage(null);
      setCoverImage(null);
      setProfilePreview(null);
      setCoverPreview(null);
      setUserEmail(formData.email);
      navigate("/confirmation");
    } else {
      toast.error("Une erreur est survenue, veuillez réessayer");
    }
  } catch (error) {
    console.error("Erreur d'inscription", error);
    toast.error("Une erreur est survenue, veuillez réessayer");
  }
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
              <label htmlFor="profileImage" className="block text-gray-700">
                Image de Profil
              </label>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setProfileImage, setProfilePreview)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {profilePreview && (
                <img
                  src={profilePreview}
                  alt="Aperçu de l'image de profil"
                  className="mt-2 w-24 h-24 object-cover rounded-full"
                />
              )}
              {errors.profileImage && (
                <p className="text-red-500 text-xs mt-1">{errors.profileImage}</p>
              )}
            </div>
            <div>
              <label htmlFor="coverImage" className="block text-gray-700">
                Image de Couverture
              </label>
              <input
                type="file"
                id="coverImage"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setCoverImage, setCoverPreview)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {coverPreview && (
                <img
                  src={coverPreview}
                  alt="Aperçu de l'image de couverture"
                  className="mt-2 w-full h-32 object-cover rounded-md"
                />
              )}
              {errors.coverImage && (
                <p className="text-red-500 text-xs mt-1">{errors.coverImage}</p>
              )}
            </div>
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
              <label htmlFor="cne" className="block text-gray-700">
                CNE
              </label>
              <input
                type="text"
                id="cne"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.cne}
                onChange={handleChange}
              />
              {errors.cne && (
                <p className="text-red-500 text-xs mt-1">{errors.cne}</p>
              )}
            </div>
            <div>
              <label htmlFor="facebook" className="block text-gray-700">
                Facebook
              </label>
              <input
                type="text"
                id="facebook"
                value={formData.facebook}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="instagram" className="block text-gray-700">
                Instagram
              </label>
              <input
                type="text"
                id="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="whatsapp" className="block text-gray-700">
                WhatsApp
              </label>
              <input
                type="text"
                id="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Submit Button */}
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
