import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { FaFacebookF } from "react-icons/fa"; // Facebook icon
import { FaApple } from "react-icons/fa"; // Apple icon

import SignupImage from "../../assets/undraw_explore_kfv3.svg";
import logo from "../../assets/speakTribe-logo.png";

import { supabase } from "../../supabaseClient";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { firstName, lastName, displayName, email, password, confirmPassword } = formData;

    // === Validation ===
    if (!firstName.trim()) return toast.error("First name is required"), setLoading(false);
    if (!lastName.trim()) return toast.error("Last name is required"), setLoading(false);
    if (!displayName.trim()) return toast.error("Display name is required"), setLoading(false);
    if (!email.trim()) return toast.error("Email is required"), setLoading(false);
    if (!password) return toast.error("Password is required"), setLoading(false);
    if (!confirmPassword) return toast.error("Please confirm your password"), setLoading(false);
    if (password !== confirmPassword) return toast.error("Passwords do not match"), setLoading(false);

    // === Supabase signup ===
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password,
        options: {
          data: { firstName, lastName, displayName },
          emailRedirectTo: `${window.location.origin}/verify-otp`,
        },
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      const user = data?.user;

      if (user) {
        const { error: profileError } = await supabase.from("profiles").insert([
          { id: user.id, first_name: firstName, last_name: lastName, display_name: displayName },
        ]);

        if (profileError) {
          toast.error("Error saving profile info: " + profileError.message);
          setLoading(false);
          return;
        }
      }

      toast.success("We sent you a verification code!");
      setTimeout(() => {
        navigate("/verify-otp", { state: { email: formData.email.toLowerCase() } });
      }, 2000);
    } catch (err) {
      toast.error("Something went wrong, try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // === Social login handler ===
  const handleSocialSignIn = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) toast.error(error.message);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 p-5 md:p-10 w-full max-w-6xl">

        {/* Left Side Illustration */}
        <motion.div
          className="flex flex-col gap-5 items-center max-w-[500px] w-full"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="min-w-[150px]">
            <img src={logo} alt="logo" className="w-[150px] md:w-[200px]" />
          </div>
          <img src={SignupImage} alt="signup" className="w-full max-w-[400px]" />
        </motion.div>

        {/* Right Side Form */}
        <motion.div
          className="signup w-full max-w-[450px] flex flex-col gap-5 text-[#263238] font-sans items-center"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="w-full flex flex-col gap-2 justify-center items-center text-center">
            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, delay: 0.5 }}
              className="font-bold text-4xl md:text-5xl text-[#263238]"
            >
              Get Started!
            </motion.h1>
            <p className="font-medium">Become fluent in the native languages of your choice.</p>
            <p className="font-medium text-xl text-[#263238]">Join Now . . .</p>
          </div>

          {/* Social Login Buttons */}
          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={() => handleSocialSignIn("google")}
              className="flex items-center justify-center gap-2 w-full p-2 rounded border hover:bg-gray-100"
            >
              <FcGoogle size={24} />
              Continue with Google
            </button>
            <button
              onClick={() => handleSocialSignIn("facebook")}
              className="flex items-center justify-center gap-2 w-full p-2 rounded border hover:bg-gray-100"
            >
              <FaFacebookF size={24} color="#1877F2" />
              Continue with Facebook
            </button>
            <button
              onClick={() => handleSocialSignIn("apple")}
              className="flex items-center justify-center gap-2 w-full p-2 rounded border hover:bg-gray-100"
            >
              <FaApple size={24} />
              Continue with Apple
            </button>
          </div>

          <p className="text-center font-medium text-gray-500 mt-2">or use your email</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full mx-auto">
            {[{ label: "First Name", name: "firstName", type: "text" },
              { label: "Last Name", name: "lastName", type: "text" },
              { label: "Display Name", name: "displayName", type: "text" },
              { label: "Email", name: "email", type: "email" }].map((field, idx) => (
              <fieldset key={idx}>
                <legend>{field.label}</legend>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="pl-4 py-1.5 w-full"
                />
              </fieldset>
            ))}

            <fieldset className="relative">
              <legend>Password</legend>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="pl-4 py-1.5 w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-0 text-sm"
              >
                {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
              </button>
            </fieldset>

            <fieldset className="relative">
              <legend>Confirm Password</legend>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="pl-4 py-1.5 w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-0 text-sm"
              >
                {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
              </button>
            </fieldset>

            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded p-2 text-[#FFF8E1] ${loading ? "bg-[#80cbc4] cursor-not-allowed" : "bg-[#009688]"}`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
              ) : (
                "Create Account"
              )}
            </button>

            <hr className="w-full mt-3 text-gray-300" />
            <div className="text-center">
              <p className="font-semibold">
                Already have an account?{" "}
                <span className="ml-2 text-[#009688]">
                  <Link to="/login">Login</Link>
                </span>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;
