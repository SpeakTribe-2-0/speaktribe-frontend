import React, { useEffect, useRef, useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { FaHome, FaChevronDown } from "react-icons/fa";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoIosInformationCircle, IoMdSettings } from "react-icons/io";
import { FaUserCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/speakTribe-logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) setUser(userData);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const getUserInitial = () => {
    if (!user) return "U";
    if (user.firstName) return user.firstName.charAt(0).toUpperCase();
    if (user.displayName)
      return user.displayName.split(" ")[0].charAt(0).toUpperCase();
    return "U";
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    setShowUserMenu(false);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-3 backdrop-blur-lg bg-white/40 shadow-md border-b border-white/30">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.img
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/home")}
          src={logo}
          alt="logo"
          className="w-[80px] max-md:w-[60px] cursor-pointer"
        />

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 font-semibold text-gray-700">
          <p
            onClick={() => navigate("/home")}
            className="hover:text-[#009688] transition-colors cursor-pointer"
          >
            Home
          </p>
          <p
            onClick={() => navigate("/dashboard")}
            className="hover:text-[#009688] transition-colors cursor-pointer"
          >
            Dashboard
          </p>
          <p
            onClick={() => navigate("/about")}
            className="hover:text-[#009688] transition-colors cursor-pointer"
          >
            About
          </p>
        </div>

        {/* Profile / Mobile Menu */}
        <div ref={menuRef} className="flex items-center gap-4">
          {/* Profile Icon */}
          <div
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="hidden md:flex rounded-full w-[42px] h-[42px] bg-[#009688] text-white font-bold text-lg items-center justify-center shadow-lg hover:scale-105 transition cursor-pointer"
          >
            {getUserInitial()}
          </div>

          {/* Mobile Icon */}
          <IoPersonOutline
            onClick={() => setIsOpen(!isOpen)}
            size={28}
            color="#009688"
            className="block md:hidden cursor-pointer"
          />

          {/* User Dropdown */}
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-6 top-16 bg-white rounded-2xl shadow-xl p-5 w-[300px] border border-[#009688]/30 z-50"
              >
                <div className="flex items-center gap-4 border-b pb-3 mb-3">
                  <div className="w-[50px] h-[50px] rounded-full bg-[#009688] flex items-center justify-center text-white font-bold text-2xl shadow-md">
                    {user?.displayName
                      ? user.displayName.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-gray-800">
                      {user?.displayName || "User"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      navigate("/dashboard");
                      setShowUserMenu(false);
                    }}
                    className="text-left px-4 py-2 rounded-lg hover:bg-[#F0FDF4] transition"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setShowUserMenu(false);
                    }}
                    className="text-left px-4 py-2 rounded-lg hover:bg-[#F0FDF4] transition"
                  >
                    Profile Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-left px-4 py-2 rounded-lg hover:bg-[#FEE2E2] text-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-screen w-[80%] bg-white shadow-2xl z-50 p-6 flex flex-col gap-6"
          >
            <div className="flex justify-between items-center">
              <img src={logo} alt="logo" className="w-[70px]" />
              <p
                onClick={() => setIsOpen(false)}
                className="font-bold text-red-600 text-2xl cursor-pointer"
              >
                ✕
              </p>
            </div>

            <div className="flex flex-col gap-5 text-gray-700 font-medium mt-6">
              <div
                onClick={() => {
                  navigate("/home");
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 cursor-pointer hover:text-[#009688]"
              >
                <FaHome /> Home
              </div>
              <div
                onClick={() => {
                  navigate("/dashboard");
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 cursor-pointer hover:text-[#009688]"
              >
                <TbLayoutDashboardFilled /> Dashboard
              </div>
              <div
                onClick={() => {
                  navigate("/about");
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 cursor-pointer hover:text-[#009688]"
              >
                <IoIosInformationCircle /> About
              </div>
              <div
                onClick={() => {
                  navigate("/profile");
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 cursor-pointer hover:text-[#009688]"
              >
                <FaUserCog /> Profile Settings
              </div>

              {/* Language Settings */}
              <div>
                <div
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <IoMdSettings /> Language Settings
                  <FaChevronDown
                    className={`transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {open && (
                  <div className="mt-3 flex flex-col gap-2 pl-6">
                    {["Yoruba", "Hausa", "Igbo"].map((lang) => (
                      <p
                        key={lang}
                        onClick={() => {
                          localStorage.setItem("selectedLanguage", lang);
                          setIsOpen(false);
                          setOpen(false);
                        }}
                        className="hover:text-[#009688] cursor-pointer"
                      >
                        {lang}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="mt-6 bg-red-500 text-white py-2 rounded-lg shadow hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
