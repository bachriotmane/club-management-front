import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../../../assets/fstsImg.jpg";
import campusImage from "../../../assets/fstsImg.jpg";

const Login = () => {
  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex bg-white/70 backdrop-blur-3xl rounded-xl shadow-lg overflow-hidden w-3/4 md:w-[70%] ">
        <div className="w-full p-6 md:p-8 lg:p-10">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Login</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="text-right mb-4">
              <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                Forgot your password?
              </Link>
            </div>
            <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition">
              Login
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Vous n'avez pas de compte ?{" "}
            <Link to="/sign-up" className="text-blue-500 hover:underline">
              Sign-up
            </Link>
          </p>
          <p className="text-center text-gray-500 text-xs mt-6">
            Copyright ARAMALI Mohammed
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
