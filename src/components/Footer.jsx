import React from 'react';
import { FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#009688] text-white px-12 py-8 max-tablet:px-8 max-mobile:px-5 mt-10">
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-0">
        {/* Company & Logo */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
            Speak<span className='  text-2xl'>Tribe</span>
          </h2>
          <p className="text-sm max-w-xs">
            Empowering communities through language learning. Connect, learn, and grow with us.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">Explore</h3>
          <p className="cursor-pointer hover:underline" onClick={() => navigate('/learn')}>
            Learn
          </p>
          <p className="cursor-pointer hover:underline" onClick={() => navigate('/company')}>
            Company
          </p>
          <p className="cursor-pointer hover:underline" onClick={() => navigate('/qrcode')}>
            QR Code
          </p>
        </div>

        {/* Social Media */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">Follow Us</h3>
          <div className="flex gap-4 text-2xl">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <AiFillInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6 border-white/30" />

      {/* Copyright */}
      <div className="text-center text-sm">
        © {new Date().getFullYear()} SpeakTribe. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
