import React, { useEffect, useRef, useState } from 'react';
import { IoPersonOutline } from 'react-icons/io5';
import logo from '../assets/speakTribe-logo.png';
import { FaHome } from 'react-icons/fa';
import { IoIosInformationCircle } from 'react-icons/io';
import { TbLayoutDashboardFilled } from 'react-icons/tb';
import { IoPeople } from 'react-icons/io5';
import { IoMdSettings } from 'react-icons/io';
import { FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { RiRobot3Fill } from "react-icons/ri";
import robot from '../assets/robot.png'

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null); // ✅ reference to the whole menu

  // const getUserInitial = () => "U"; // example

  useEffect(() => {
    const handleClickOutside = (event) => {
      // if click is outside menu, close it
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Get user data
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const getUserInitial = () => {
    if (user?.firstName) {
      return user.firstName.charAt(0).toUpperCase();
    }
    return '';
  };

  return (
    <div className=' fixed top-0 left-0 w-full z-50 flex justify-between items-center px-10 pb-6 pt-2 max-mobile:px-4 max-mobile:pt-4 backdrop-blur-md bg-white/30 shadow-sm'>
      <div>
        <img
          onClick={() => navigate('/home')}
          src={logo}
          alt=''
          className='w-[80px] max-mobile:w-[50px] cursor-pointer'
        />
      </div>

      <div className='flex justify-center items-center gap-7 max-mobile:text-[12px] max-mobile:gap-2 font-semibold cursor-pointer'>
        <p onClick={() => navigate('/home')}>Home</p>
        <p onClick={() => navigate('/dashboard')}>Dashboard</p>
        <p onClick={() => navigate('/about')}>About</p>
      </div>

      <div ref={menuRef} className='relative flex justify-center items-center gap-7 max-mobile:gap-4 cursor-pointer '>
        <IoPersonOutline size={20} color='#009688' className='hidden' />
        {/* <RiRobot3Fill size={20} onClick={() => navigate('/chat')} color='blue' className='hidden max-mobile:block' /> */}
        



        {/* User Profile with Initial */}
        <div
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="rounded-full w-[40px] h-[40px] bg-[#009688] hover:bg-white hover:text-[#009688] hover:border-[#009688] hover:border transition-all duration-400 ease-in-out max-mobile:hidden text-white font-bold text-xl flex items-center justify-center cursor-pointer"
        >
          {getUserInitial()}
        </div>

        <IoPersonOutline
          onClick={() => setIsOpen(!isOpen)}
          size={20}
          color='#009688'
          className='hidden max-mobile:block'
        />

        {/* User Menu Dropdown */}
        {showUserMenu && (
          <div
            className='absolute right-0 top-12 bg-white rounded-lg shadow-xl p-4 w-[350px] z-50 border border-[#009688]'
            onClick={e => e.stopPropagation()}>
            <div className='flex items-center gap-3 mb-4 pb-3 border-b'>
              <div className='rounded-full w-[40px] h-[40px] bg-[#009688] text-white font-bold text-xl flex items-center justify-center'>
                {getUserInitial()}
              </div>
              <div>
                <p className='font-semibold'>{user?.displayName || 'User'}</p>
                <p className='text-sm text-gray-600'>{user?.email || 'user@example.com'}</p>
              </div>
            </div>

            <div className='space-y-2'>
              <button
                onClick={() => {
                  navigate('/dashboard');
                  setShowUserMenu(false);
                }}
                className='w-full text-left px-3 py-2 rounded hover:bg-gray-100'>
                Dashboard
              </button>
              <button
                onClick={() => {
                  // navigate('/profile');
                  setShowUserMenu(false);
                }}
                className='w-full text-left px-3 py-2 rounded hover:bg-gray-100'>
                Profile Settings
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('user');
                  navigate('/');
                  setShowUserMenu(false);
                }}
                className='w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-red-600'>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='absolute inset-0 h-screen bg-white px-5 py-5 gap-10 flex flex-col z-50'>
          <div className='flex items-center justify-between'>
            <img src={logo} alt='' className='w-[80px] max-mobile:w-[70px]' />
            <p
              onClick={() => setIsOpen(!isOpen)}
              className='font-bold text-red-600 text-2xl cursor-pointer'>
              X
            </p>
          </div>

          <div className='text-[#333] flex flex-col gap-5 text-[13px]'>
            <div
              onClick={() => {
                navigate('/home');
                setIsOpen(false);
              }}
              className='flex justify-start items-center gap-4 cursor-pointer'>
              <FaHome color='#009688' />
              Home
            </div>

            <div
              onClick={() => {
                navigate('/dashboard');
                setIsOpen(false);
              }}
              className='flex justify-start items-center gap-4 cursor-pointer'>
              <TbLayoutDashboardFilled color='#009688' />
              Dashboard
            </div>

            <div
              onClick={() => {
                navigate('/about');
                setIsOpen(false);
              }}
              className='flex justify-start items-center gap-4 cursor-pointer'>
              <IoIosInformationCircle color='#009688' />
              About
            </div>

            <div>
              <div
                onClick={() => setOpen(!open)}
                className='flex justify-start items-center gap-4 cursor-pointer'>
                <IoMdSettings color='#009688' />
                Language Settings
                <FaChevronDown
                  className={`transition-transform ${open ? 'rotate-180' : ''}`}
                  color='#009688'
                />
              </div>

              {open && (
                <div className='mt-3 text-[16px] font-semibold flex flex-col gap-3 max-mobile:text-center'>
                  <p
                    onClick={() => {
                      localStorage.setItem('selectedLanguage', 'Yoruba');
                      setIsOpen(false);
                      setOpen(false);
                    }}
                    className='hover:bg-[#F5FAF5] w-full pl-8 transition-colors duration-500 cursor-pointer rounded ease-in-out max-desktop:bg-[#009688] max-desktop:pl-0 max-desktop:py-2'>
                    Yoruba
                  </p>
                  <p
                    onClick={() => {
                      localStorage.setItem('selectedLanguage', 'Hausa');
                      setIsOpen(false);
                      setOpen(false);
                    }}
                    className='hover:bg-[#F5FAF5] w-full pl-8 transition-colors duration-500 cursor-pointer rounded ease-in-out max-desktop:bg-[#009688] max-desktop:pl-0 max-desktop:py-2'>
                    Hausa
                  </p>
                  <p
                    onClick={() => {
                      localStorage.setItem('selectedLanguage', 'Igbo');
                      setIsOpen(false);
                      setOpen(false);
                    }}
                    className='hover:bg-[#F5FAF5] w-full pl-8 transition-colors duration-500 cursor-pointer rounded ease-in-out max-desktop:bg-[#009688] max-desktop:pl-0 max-desktop:py-2'>
                    Igbo
                  </p>
                </div>
              )}

              <button
                onClick={() => {
                  localStorage.removeItem('user');
                  navigate('/');
                  setShowUserMenu(false);
                }}
                className='w-full bg-[#00968759] my-5 font-semibold px-3 py-2 rounded hover:bg-gray-100 text-red-600 text-center'>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
