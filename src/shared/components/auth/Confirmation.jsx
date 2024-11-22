import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../../../assets/fst_background.png";
import campusImage from "../../../assets/fstsImg.jpg";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../../../auth/axios";
import { useUserContext } from "../../context/UserContext";

const Confirmation = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const navigate = useNavigate();
  const { userEmail } = useUserContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .get("/auth/activate-account", { params: { token: confirmationCode } })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Compte confirmé avec succès");
          navigate("/login");
        } else {
          toast.error("Code de confirmation invalide, veuillez réessayer");
        }
      })
      .catch((error) => {
        console.error("Erreur de confirmation", error);
        toast.error("Une erreur s'est produite, veuillez réessayer");
      });
  };

  const resendCode = () => {
    axiosInstance
      .get("/auth/resend-activation", { params: { email: "aramali.moh.fst@uhp.ac.ma" } })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Code de confirmation envoyé avec succès");
        } else {
          toast.error("Une erreur s'est produite, veuillez réessayer");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la réémission du code", error);
        toast.error("Une erreur s'est produite, veuillez réessayer");
      });
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <ToastContainer />
      <div className="flex bg-white/70 backdrop-blur-3xl rounded-xl shadow-lg overflow-hidden w-3/4 md:w-[70%]">
        <div className="w-full p-6 md:p-8 lg:p-10">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Confirmation de l'email</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="confirmationCode" className="block text-gray-700">Code de confirmation</label>
              <input
                type="text"
                id="confirmationCode"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition">
              Confirmer
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Vous n'avez pas reçu le code ?{" "}
            <span onClick={resendCode} className="text-blue-500 hover:underline cursor-pointer">
              Renvoyer le code
            </span>
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

export default Confirmation;
