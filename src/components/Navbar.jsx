import React, { useEffect, useRef, useState } from 'react';
import { IoPersonOutline } from 'react-icons/io5';
import { FaHome, FaChevronDown } from 'react-icons/fa';
import { TbLayoutDashboardFilled } from 'react-icons/tb';
import { IoIosInformationCircle, IoMdSettings } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/speakTribe-logo.png';
import { FaUserCog } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) setUser(userData);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  // Function to get user initial
  const getUserInitial = () => {
    if (!user) return 'U'; // fallback
    if (user.firstName) return user.firstName.charAt(0).toUpperCase();
    if (user.displayName) return user.displayName.split(' ')[0].charAt(0).toUpperCase();
    return 'U';
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    setShowUserMenu(false);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-10 pb-6 pt-2 max-mobile:px-4 max-mobile:pt-4 backdrop-blur-md bg-white/30 shadow-sm">
      
      {/* Logo */}
      <div>
        <img
          onClick={() => navigate('/home')}
          src={logo}
          alt="logo"
          className="w-[80px] max-mobile:w-[50px] cursor-pointer"
        />
      </div>

      {/* Desktop Navigation */}
      <div className="flex justify-center items-center gap-7 max-mobile:hidden font-semibold cursor-pointer">
        <p onClick={() => navigate('/home')}>Home</p>
        <p onClick={() => navigate('/dashboard')}>Dashboard</p>
        <p onClick={() => navigate('/about')}>About</p>
      </div>

      {/* User Menu */}
      <div ref={menuRef} className="relative flex items-center gap-4 cursor-pointer">
        {/* Desktop Profile Icon */}
        <div
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="rounded-full w-[40px] h-[40px] bg-[#009688] text-white font-bold text-xl flex items-center justify-center hover:bg-white hover:text-[#009688] hover:border-[#009688] hover:border transition-all duration-400 ease-in-out max-mobile:hidden"
        >
          {getUserInitial()}
        </div>

        {/* Mobile Menu Icon */}
        <IoPersonOutline
          onClick={() => setIsOpen(!isOpen)}
          size={20}
          color="#009688"
          className="block max-mobile:block md:hidden"
        />

        {/* Desktop User Dropdown */}
        {showUserMenu && (
<div
  className="absolute right-0 top-14 bg-white rounded-2xl shadow-lg p-5 z-50 border border-[#009688] w-[350px] overflow-hidden"
  onClick={(e) => e.stopPropagation()}
>
  {/* User Info */}
  <div className="flex items-center gap-4 mb-5 pb-4 border-b border-gray-200">
    <div className="rounded-full w-[50px] h-[50px] bg-[#009688] text-white font-bold text-2xl flex items-center justify-center shadow-md">
      {/* Show first letter of displayName */}
      {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
    </div>
    <div>
      {/* Display name here */}
      <p className="font-semibold text-lg text-gray-800">{user?.displayName || 'User'}</p>
      <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
    </div>
  </div>

  {/* Menu Buttons */}
  <div className="flex flex-col gap-2">
    <button
      onClick={() => { navigate('/dashboard'); setShowUserMenu(false); }}
      className="text-left px-4 py-2 rounded-lg hover:bg-[#F0FDF4] transition-colors duration-300 text-gray-700 font-medium"
    >
      Dashboard
    </button>

    <button
      onClick={() => { navigate('/profile'); setShowUserMenu(false); }}
      className="text-left px-4 py-2 rounded-lg hover:bg-[#F0FDF4] transition-colors duration-300 text-gray-700 font-medium"
    >
      Profile Settings
    </button>

    <button
      onClick={handleLogout}
      className="text-left px-4 py-2 rounded-lg hover:bg-[#FEE2E2] transition-colors duration-300 text-red-600 font-medium"
    >
      Logout
    </button>
  </div>
</div>


        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute inset-0 h-screen bg-white px-5 py-5 flex flex-col gap-10 z-50">
          <div className="flex items-center justify-between">
            <img src={logo} alt="logo" className="w-[80px] max-mobile:w-[70px]" />
            <p onClick={() => setIsOpen(false)} className="font-bold text-red-600 text-2xl cursor-pointer">X</p>
          </div>
          <div className="flex flex-col gap-5 text-[#333] text-[14px]">
            <div onClick={() => { navigate('/home'); setIsOpen(false); }} className="flex items-center gap-4 cursor-pointer"><FaHome color="#009688" /> Home</div>
            <div onClick={() => { navigate('/dashboard'); setIsOpen(false); }} className="flex items-center gap-4 cursor-pointer"><TbLayoutDashboardFilled color="#009688" /> Dashboard</div>
            <div onClick={() => { navigate('/about'); setIsOpen(false); }} className="flex items-center gap-4 cursor-pointer"><IoIosInformationCircle color="#009688" /> About</div>
            <div onClick={() => { navigate('/profile'); setIsOpen(false); }} className="flex items-center gap-4 cursor-pointer"><FaUserCog color="#009688" /> Profile Settings</div>

            <div>
              <div onClick={() => setOpen(!open)} className="flex items-center gap-4 cursor-pointer">
                <IoMdSettings color="#009688" /> Language Settings
                <FaChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} color="#009688" />
              </div>
              {open && (
                <div className="mt-3 flex flex-col gap-3 text-[16px] font-semibold">
                  {['Yoruba', 'Hausa', 'Igbo'].map(lang => (
                    <p key={lang} onClick={() => { localStorage.setItem('selectedLanguage', lang); setIsOpen(false); setOpen(false); }}
                       className="hover:bg-[#F5FAF5] w-full pl-4 cursor-pointer rounded transition-colors duration-300">
                      {lang}
                    </p>
                  ))}
                </div>
              )}
              <button onClick={handleLogout} className="w-full bg-[#00968759] my-5 font-semibold px-3 py-2 rounded hover:bg-gray-100 text-red-600">Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
