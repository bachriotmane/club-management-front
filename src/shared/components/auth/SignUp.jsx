import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import backgroundImage from "../../../assets/fstsImg.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
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

  const {setUserEmail} = useUserContext();

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "Firstname is mandatory";
    if (!formData.lastName) newErrors.lastName = "Lastname is mandatory";
    if (!formData.email) {
      newErrors.email = "Email is mandatory";
    } else if (!/.+@uhp\.ac\.ma/.test(formData.email)) {
      newErrors.email = "Email should end with: @uhp.ac.ma";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not well formatted";
    }
    if (!formData.password) {
      newErrors.password = "Password is mandatory";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password should be 8 characters long minimum";
    }
    if (!formData.passwordConfirmation) {
      newErrors.passwordConfirmation = "Password confirmation is mandatory";
    } else if (formData.password !== formData.passwordConfirmation) {
      newErrors.passwordConfirmation = "Passwords do not match";
    }
    if (!formData.cin) {
      newErrors.cin = "CIN is mandatory";
    } else if (!/[A-Z]{1,2}[0-9]{4,9}/.test(formData.cin)) {
      newErrors.cin =
        "CIN should be 1-2 uppercase letters followed by 4-9 digits";
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
      toast.error("Please fill in the required fields");
      return;
    }

    axiosInstance
      .post("/auth/register", formData)
      .then((response) => {
        if (response.status === 202) {
          toast.success("Account created successfully");
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
          toast.error("An error occurred, please try again");
        }
      })
      .catch((error) => {
        console.error("Signup error", error);
        toast.error("An error occurred, please try again");
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
            Sign Up
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700">
                Last Name
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
                Email
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
                Password
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
                Confirm Password
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
              Sign Up
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
